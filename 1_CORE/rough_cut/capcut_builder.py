"""
CapCut Dual-Timeline Project Builder.
Generates a fully editable, production-grade CapCut project:
- Tab 1: V3 Master Edit (Rough-cut clips assembled on track 0)
- Tab 2: Raw Footage (Full uncut source file for editorial reference)
- Safe project backup before write
- Safe root_meta_info.json promotion to Index 0 (with backup)
- Clean project lock removal
"""

import json
import os
import shutil
import time
import uuid
from typing import List, Dict, Any


def get_capcut_draft_root() -> str:
    """Return local Windows CapCut drafts directory."""
    return os.path.expandvars(r"%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft")


def find_template_dir(draft_root: str) -> str:
    """Find a suitable template project directory."""
    candidates = ["0918 (1)", "0918", "Test_v10", "1009", "AGY Trial"]
    for c in candidates:
        p = os.path.join(draft_root, c)
        if os.path.exists(p) and os.path.exists(os.path.join(p, "draft_content.json")):
            return p

    # If none of the preferred candidates exist, search any directory with draft_content.json
    for item in os.listdir(draft_root):
        p = os.path.join(draft_root, item)
        if os.path.isdir(p) and os.path.exists(os.path.join(p, "draft_content.json")):
            return p

    raise FileNotFoundError(f"No valid CapCut template project found in {draft_root}")


def build_capcut_draft(
    project_name: str,
    video_path: str,
    raw_duration_s: float,
    kept_segments: List[Dict[str, Any]],
    width: int = 1920,
    height: int = 1080,
    fps: float = 30.0
) -> Dict[str, Any]:
    """
    Build dual-timeline CapCut draft for the rough cut.
    """
    draft_root = get_capcut_draft_root()
    if not os.path.exists(draft_root):
        raise FileNotFoundError(f"CapCut drafts root does not exist: {draft_root}")

    src_template_dir = find_template_dir(draft_root)
    target_dir = os.path.join(draft_root, project_name)

    # Backup existing project if present
    if os.path.exists(target_dir):
        backup_dir = os.path.join(draft_root, f"{project_name}_backup_{int(time.time())}")
        shutil.copytree(target_dir, backup_dir)
        shutil.rmtree(target_dir, ignore_errors=True)

    os.makedirs(target_dir, exist_ok=True)

    # Copy auxiliary asset directories and config files from template
    for sub in ["adjust_mask", "assets", "common_attachment", "matting", "qr_upload", "Resources", "smart_crop", "subdraft"]:
        s_p = os.path.join(src_template_dir, sub)
        d_p = os.path.join(target_dir, sub)
        if os.path.exists(s_p):
            shutil.copytree(s_p, d_p, dirs_exist_ok=True)

    for f_name in ["draft_cover.jpg", "draft_settings", "draft_agency_config.json", "draft_biz_config.json", "key_value.json", "performance_opt_info.json"]:
        s_f = os.path.join(src_template_dir, f_name)
        d_f = os.path.join(target_dir, f_name)
        if os.path.exists(s_f):
            shutil.copy2(s_f, d_f)

    # Read base draft content
    with open(os.path.join(src_template_dir, "draft_content.json"), "r", encoding="utf-8") as f:
        base_dc = json.load(f)

    base_video_mat = base_dc["materials"]["videos"][0].copy() if base_dc["materials"].get("videos") else {}
    base_canvas = base_dc["materials"]["canvases"][0].copy() if base_dc["materials"].get("canvases") else {}
    base_speed = base_dc["materials"]["speeds"][0].copy() if base_dc["materials"].get("speeds") else {}
    base_sound = base_dc["materials"]["sound_channel_mappings"][0].copy() if base_dc["materials"].get("sound_channel_mappings") else {}
    base_color = base_dc["materials"]["material_colors"][0].copy() if base_dc["materials"].get("material_colors") else {}
    base_placeholder = base_dc["materials"]["placeholder_infos"][0].copy() if base_dc["materials"].get("placeholder_infos") else {}
    base_vocal = base_dc["materials"]["vocal_separations"][0].copy() if base_dc["materials"].get("vocal_separations") else {}
    proto_seg = base_dc["tracks"][0]["segments"][0].copy() if base_dc.get("tracks") and base_dc["tracks"][0].get("segments") else {}

    canvas_cfg = {"ratio": "original", "width": width, "height": height, "background": None}
    raw_duration_us = int(round(raw_duration_s * 1000000))

    project_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"agy.project.{project_name}")).upper()
    timeline_edit_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{project_id}.timeline.edit")).upper()
    timeline_raw_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{project_id}.timeline.raw")).upper()

    total_edited_s = sum(s["duration"] for s in kept_segments)
    edit_min = int(total_edited_s // 60)
    edit_sec = int(total_edited_s % 60)
    tab1_name = f"V3 Master Edit ({edit_min}m {edit_sec:02d}s)"

    raw_min = int(raw_duration_s // 60)
    raw_sec = int(raw_duration_s % 60)
    tab2_name = f"Raw Footage ({raw_min}m {raw_sec:02d}s)"

    # ----------------- TIMELINE 1: MASTER EDIT -----------------
    edit_dc = json.loads(json.dumps(base_dc))
    edit_dc["id"] = timeline_edit_id
    edit_dc["name"] = tab1_name
    edit_dc["canvas_config"] = canvas_cfg
    edit_dc["fps"] = fps

    for mat_key in ["videos", "canvases", "placeholder_infos", "speeds", "sound_channel_mappings", "material_colors", "vocal_separations"]:
        if mat_key in edit_dc["materials"]:
            edit_dc["materials"][mat_key] = []

    new_edit_segments = []
    current_target_us = 0
    norm_video_path = os.path.abspath(video_path).replace("\\", "/")

    for idx, s in enumerate(kept_segments):
        src_start_us = int(round(s["source_start"] * 1000000))
        src_dur_us = int(round(s["duration"] * 1000000))
        tgt_start_us = current_target_us
        current_target_us += src_dur_us

        seg_seed = f"{timeline_edit_id}.seg.{idx}"
        seg_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, seg_seed)).upper()
        vid_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.vid")).upper()
        spd_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.spd")).upper()
        can_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.can")).upper()
        plc_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.plc")).upper()
        snd_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.snd")).upper()
        col_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.col")).upper()
        voc_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.voc")).upper()

        v_mat = base_video_mat.copy()
        v_mat["id"] = vid_id
        v_mat["path"] = norm_video_path
        v_mat["material_name"] = os.path.basename(video_path)
        v_mat["width"] = width
        v_mat["height"] = height
        v_mat["duration"] = raw_duration_us
        edit_dc["materials"]["videos"].append(v_mat)

        s_mat = base_speed.copy()
        s_mat["id"] = spd_id
        s_mat["speed"] = 1.0
        edit_dc["materials"]["speeds"].append(s_mat)

        c_mat = base_canvas.copy()
        c_mat["id"] = can_id
        edit_dc["materials"]["canvases"].append(c_mat)

        p_mat = base_placeholder.copy()
        p_mat["id"] = plc_id
        edit_dc["materials"]["placeholder_infos"].append(p_mat)

        snd_mat = base_sound.copy()
        snd_mat["id"] = snd_id
        edit_dc["materials"]["sound_channel_mappings"].append(snd_mat)

        col_mat = base_color.copy()
        col_mat["id"] = col_id
        edit_dc["materials"]["material_colors"].append(col_mat)

        voc_mat = base_vocal.copy()
        voc_mat["id"] = voc_id
        edit_dc["materials"]["vocal_separations"].append(voc_mat)

        new_seg = proto_seg.copy()
        new_seg["id"] = seg_id
        new_seg["material_id"] = vid_id
        new_seg["source_timerange"] = {"start": src_start_us, "duration": src_dur_us}
        new_seg["target_timerange"] = {"start": tgt_start_us, "duration": src_dur_us}
        new_seg["render_timerange"] = {"start": 0, "duration": 0}
        new_seg["desc"] = f"Clip #{idx+1}: {s.get('text_summary', '')[:30]}"
        new_seg["clip"] = {"scale": {"x": 1.0, "y": 1.0}, "rotation": 0.0, "transform": {"x": 0.0, "y": 0.0}, "flip": {"vertical": False, "horizontal": False}, "alpha": 1.0}
        new_seg["uniform_scale"] = {"on": True, "value": 1.0}
        new_seg["extra_material_refs"] = [spd_id, plc_id, can_id, snd_id, col_id, voc_id]
        new_seg["speed"] = 1.0
        new_seg["volume"] = 1.0
        new_edit_segments.append(new_seg)

    edit_track_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{timeline_edit_id}.track.0")).upper()
    edit_dc["tracks"] = [{
        "id": edit_track_id,
        "type": "video",
        "flag": 0,
        "segments": new_edit_segments
    }]
    edit_dc["duration"] = current_target_us

    # ----------------- TIMELINE 2: RAW FOOTAGE -----------------
    raw_dc = json.loads(json.dumps(base_dc))
    raw_dc["id"] = timeline_raw_id
    raw_dc["name"] = tab2_name
    raw_dc["canvas_config"] = canvas_cfg
    raw_dc["fps"] = fps

    for mat_key in ["videos", "canvases", "placeholder_infos", "speeds", "sound_channel_mappings", "material_colors", "vocal_separations"]:
        if mat_key in raw_dc["materials"]:
            raw_dc["materials"][mat_key] = []

    raw_seg_seed = f"{timeline_raw_id}.seg.0"
    raw_seg_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, raw_seg_seed)).upper()
    raw_vid_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seg_seed}.vid")).upper()
    raw_spd_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seg_seed}.spd")).upper()
    raw_can_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seg_seed}.can")).upper()
    raw_plc_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seg_seed}.plc")).upper()
    raw_snd_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seg_seed}.snd")).upper()
    raw_col_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seg_seed}.col")).upper()
    raw_voc_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seg_seed}.voc")).upper()

    v_mat_raw = base_video_mat.copy()
    v_mat_raw["id"] = raw_vid_id
    v_mat_raw["path"] = norm_video_path
    v_mat_raw["material_name"] = os.path.basename(video_path)
    v_mat_raw["width"] = width
    v_mat_raw["height"] = height
    v_mat_raw["duration"] = raw_duration_us
    raw_dc["materials"]["videos"].append(v_mat_raw)

    s_mat_raw = base_speed.copy()
    s_mat_raw["id"] = raw_spd_id
    s_mat_raw["speed"] = 1.0
    raw_dc["materials"]["speeds"].append(s_mat_raw)

    c_mat_raw = base_canvas.copy()
    c_mat_raw["id"] = raw_can_id
    raw_dc["materials"]["canvases"].append(c_mat_raw)

    p_mat_raw = base_placeholder.copy()
    p_mat_raw["id"] = raw_plc_id
    raw_dc["materials"]["placeholder_infos"].append(p_mat_raw)

    snd_mat_raw = base_sound.copy()
    snd_mat_raw["id"] = raw_snd_id
    raw_dc["materials"]["sound_channel_mappings"].append(snd_mat_raw)

    col_mat_raw = base_color.copy()
    col_mat_raw["id"] = raw_col_id
    raw_dc["materials"]["material_colors"].append(col_mat_raw)

    voc_mat_raw = base_vocal.copy()
    voc_mat_raw["id"] = raw_voc_id
    raw_dc["materials"]["vocal_separations"].append(voc_mat_raw)

    raw_seg = proto_seg.copy()
    raw_seg["id"] = raw_seg_id
    raw_seg["material_id"] = raw_vid_id
    raw_seg["source_timerange"] = {"start": 0, "duration": raw_duration_us}
    raw_seg["target_timerange"] = {"start": 0, "duration": raw_duration_us}
    raw_seg["render_timerange"] = {"start": 0, "duration": 0}
    raw_seg["desc"] = f"Raw Footage (0.00s - {raw_duration_s:.2f}s)"
    raw_seg["clip"] = {"scale": {"x": 1.0, "y": 1.0}, "rotation": 0.0, "transform": {"x": 0.0, "y": 0.0}, "flip": {"vertical": False, "horizontal": False}, "alpha": 1.0}
    raw_seg["uniform_scale"] = {"on": True, "value": 1.0}
    raw_seg["extra_material_refs"] = [raw_spd_id, raw_plc_id, raw_can_id, raw_snd_id, raw_col_id, raw_voc_id]
    raw_seg["speed"] = 1.0
    raw_seg["volume"] = 1.0

    raw_track_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{timeline_raw_id}.track.0")).upper()
    raw_dc["tracks"] = [{
        "id": raw_track_id,
        "type": "video",
        "flag": 0,
        "segments": [raw_seg]
    }]
    raw_dc["duration"] = raw_duration_us

    # ----------------- WRITE DRAFT FILES -----------------
    with open(os.path.join(target_dir, "draft_content.json"), "w", encoding="utf-8") as f:
        json.dump(edit_dc, f, indent=2, ensure_ascii=False)
    with open(os.path.join(target_dir, "template-2.tmp"), "w", encoding="utf-8") as f:
        json.dump(edit_dc, f, indent=2, ensure_ascii=False)

    timelines_dir = os.path.join(target_dir, "Timelines")
    os.makedirs(timelines_dir, exist_ok=True)

    edit_tl_dir = os.path.join(timelines_dir, timeline_edit_id)
    os.makedirs(edit_tl_dir, exist_ok=True)
    with open(os.path.join(edit_tl_dir, "draft_content.json"), "w", encoding="utf-8") as f:
        json.dump(edit_dc, f, indent=2, ensure_ascii=False)
    with open(os.path.join(edit_tl_dir, "template-2.tmp"), "w", encoding="utf-8") as f:
        json.dump(edit_dc, f, indent=2, ensure_ascii=False)

    raw_tl_dir = os.path.join(timelines_dir, timeline_raw_id)
    os.makedirs(raw_tl_dir, exist_ok=True)
    with open(os.path.join(raw_tl_dir, "draft_content.json"), "w", encoding="utf-8") as f:
        json.dump(raw_dc, f, indent=2, ensure_ascii=False)
    with open(os.path.join(raw_tl_dir, "template-2.tmp"), "w", encoding="utf-8") as f:
        json.dump(raw_dc, f, indent=2, ensure_ascii=False)

    now_us = int(time.time() * 1000000)
    project_json = {
        "config": {"color_space": -1, "render_index_track_mode_on": False, "use_float_render": False},
        "create_time": now_us,
        "id": project_id,
        "main_timeline_id": timeline_edit_id,
        "timelines": [
            {"create_time": now_us, "id": timeline_edit_id, "is_marked_delete": False, "name": tab1_name, "update_time": now_us},
            {"create_time": now_us, "id": timeline_raw_id, "is_marked_delete": False, "name": tab2_name, "update_time": now_us}
        ],
        "update_time": now_us,
        "version": 0
    }
    with open(os.path.join(timelines_dir, "project.json"), "w", encoding="utf-8") as f:
        json.dump(project_json, f, indent=2, ensure_ascii=False)

    layout = {
        "dockItems": [{
            "dockIndex": 0, "ratio": 1.0,
            "timelineIds": [timeline_edit_id, timeline_raw_id],
            "timelineNames": [tab1_name, tab2_name]
        }],
        "layoutOrientation": 1
    }
    with open(os.path.join(target_dir, "timeline_layout.json"), "w", encoding="utf-8") as f:
        json.dump(layout, f, indent=2, ensure_ascii=False)

    with open(os.path.join(src_template_dir, "draft_meta_info.json"), "r", encoding="utf-8") as f:
        meta = json.load(f)
    meta["draft_id"] = project_id
    meta["draft_name"] = project_name
    meta["draft_fold_path"] = target_dir.replace("\\", "/")
    meta["tm_duration"] = current_target_us
    meta["tm_draft_create"] = now_us
    meta["tm_draft_modified"] = now_us

    if "draft_materials" in meta and len(meta["draft_materials"]) > 0:
        for d_mat in meta["draft_materials"]:
            if "value" in d_mat and len(d_mat["value"]) > 0:
                for v_item in d_mat["value"]:
                    v_item["file_Path"] = norm_video_path
                    v_item["metetype"] = "video"
                    v_item["extra_info"] = os.path.basename(video_path)

    with open(os.path.join(target_dir, "draft_meta_info.json"), "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)

    # ----------------- SAFE ROOT META REGISTRY PROMOTION -----------------
    root_meta_path = os.path.join(draft_root, "root_meta_info.json")
    if os.path.exists(root_meta_path):
        # Backup root_meta_info.json
        shutil.copy2(root_meta_path, root_meta_path + ".bak")

        with open(root_meta_path, "r", encoding="utf-8") as f:
            root_meta = json.load(f)

        existing_idx = None
        for i, item in enumerate(root_meta.get("all_draft_store", [])):
            if item.get("draft_name") == project_name or item.get("draft_id") == project_id:
                existing_idx = i
                break

        store_prototype = root_meta["all_draft_store"][0].copy() if root_meta.get("all_draft_store") else {}
        new_entry = store_prototype.copy()
        new_entry["draft_id"] = project_id
        new_entry["draft_name"] = project_name
        new_entry["draft_fold_path"] = target_dir.replace("\\", "/")
        new_entry["draft_json_file"] = os.path.join(target_dir, "draft_content.json").replace("\\", "/")
        new_entry["tm_duration"] = current_target_us
        new_entry["tm_draft_create"] = now_us
        new_entry["tm_draft_modified"] = now_us

        if existing_idx is not None:
            root_meta["all_draft_store"][existing_idx] = new_entry
            items = root_meta["all_draft_store"]
            item = items.pop(existing_idx)
            items.insert(0, item)
        else:
            root_meta["all_draft_store"].insert(0, new_entry)

        with open(root_meta_path, "w", encoding="utf-8") as f:
            json.dump(root_meta, f, ensure_ascii=False, indent=2)

    # Remove .locked file if exists
    locked_file = os.path.join(target_dir, ".locked")
    if os.path.exists(locked_file):
        try:
            os.remove(locked_file)
        except Exception:
            pass

    return {
        "project_name": project_name,
        "project_id": project_id,
        "target_dir": target_dir,
        "edited_duration_s": total_edited_s,
        "clip_count": len(new_edit_segments),
        "tab1_name": tab1_name,
        "tab2_name": tab2_name
    }


def amend_capcut_draft(
    project_name: str,
    video_path: str,
    raw_duration_s: float,
    new_kept_segments: List[Dict[str, Any]],
    fps: float = 30.0
) -> Dict[str, Any]:
    """
    Incrementally amend an existing CapCut draft:
    - Back up existing draft folder with timestamp
    - Append new video material and rough-cut clips onto Master Timeline (Track 0)
    - Enforce strict continuity: clip[k].target_start = clip[k-1].target_start + clip[k-1].target_duration
    - Append raw take to Raw Footage Timeline (Tab 2)
    - Update Timelines/project.json, timeline_layout.json, draft_meta_info.json
    - Safely promote draft to Index 0 in root_meta_info.json
    - Clean .locked file
    """
    draft_root = get_capcut_draft_root()
    target_dir = os.path.join(draft_root, project_name)

    if not os.path.exists(target_dir):
        raise FileNotFoundError(f"Cannot amend non-existent CapCut project: {target_dir}")

    # Timestamped backup of existing project
    backup_dir = os.path.join(draft_root, f"{project_name}_backup_{int(time.time())}")
    shutil.copytree(target_dir, backup_dir)

    timelines_dir = os.path.join(target_dir, "Timelines")
    pj_file = os.path.join(timelines_dir, "project.json")
    with open(pj_file, "r", encoding="utf-8") as f:
        pj_data = json.load(f)

    project_id = pj_data["id"]
    timeline_edit_id = pj_data["timelines"][0]["id"]
    timeline_raw_id = pj_data["timelines"][1]["id"] if len(pj_data["timelines"]) > 1 else None

    # Load master edit timeline
    edit_dc_file = os.path.join(target_dir, "draft_content.json")
    with open(edit_dc_file, "r", encoding="utf-8") as f:
        edit_dc = json.load(f)

    # Prototypes
    proto_vid = edit_dc["materials"]["videos"][-1].copy() if edit_dc["materials"].get("videos") else {}
    proto_spd = edit_dc["materials"]["speeds"][-1].copy() if edit_dc["materials"].get("speeds") else {}
    proto_can = edit_dc["materials"]["canvases"][-1].copy() if edit_dc["materials"].get("canvases") else {}
    proto_plc = edit_dc["materials"]["placeholder_infos"][-1].copy() if edit_dc["materials"].get("placeholder_infos") else {}
    proto_snd = edit_dc["materials"]["sound_channel_mappings"][-1].copy() if edit_dc["materials"].get("sound_channel_mappings") else {}
    proto_col = edit_dc["materials"]["material_colors"][-1].copy() if edit_dc["materials"].get("material_colors") else {}
    proto_voc = edit_dc["materials"]["vocal_separations"][-1].copy() if edit_dc["materials"].get("vocal_separations") else {}
    proto_seg = edit_dc["tracks"][0]["segments"][-1].copy() if edit_dc.get("tracks") and edit_dc["tracks"][0].get("segments") else {}

    existing_segments = edit_dc["tracks"][0].get("segments", [])
    if existing_segments:
        last_seg = existing_segments[-1]
        current_target_us = last_seg["target_timerange"]["start"] + last_seg["target_timerange"]["duration"]
    else:
        current_target_us = 0

    norm_video_path = os.path.abspath(video_path).replace("\\", "/")
    raw_duration_us = int(round(raw_duration_s * 1000000))
    start_clip_idx = len(existing_segments)

    width = proto_vid.get("width", 1920)
    height = proto_vid.get("height", 1080)

    for idx, s in enumerate(new_kept_segments):
        clip_global_idx = start_clip_idx + idx
        src_start_us = s.get("source_start_us", int(round(s["source_start"] * 1000000)))
        src_dur_us = s.get("duration_us", int(round(s["duration"] * 1000000)))
        tgt_start_us = current_target_us
        current_target_us += src_dur_us

        seg_seed = f"{timeline_edit_id}.seg.{clip_global_idx}"
        seg_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, seg_seed)).upper()
        vid_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.vid")).upper()
        spd_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.spd")).upper()
        can_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.can")).upper()
        plc_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.plc")).upper()
        snd_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.snd")).upper()
        col_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.col")).upper()
        voc_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{seg_seed}.voc")).upper()

        v_mat = proto_vid.copy()
        v_mat["id"] = vid_id
        v_mat["path"] = norm_video_path
        v_mat["material_name"] = os.path.basename(video_path)
        v_mat["width"] = width
        v_mat["height"] = height
        v_mat["duration"] = raw_duration_us
        edit_dc["materials"]["videos"].append(v_mat)

        s_mat = proto_spd.copy()
        s_mat["id"] = spd_id
        s_mat["speed"] = 1.0
        edit_dc["materials"]["speeds"].append(s_mat)

        c_mat = proto_can.copy()
        c_mat["id"] = can_id
        edit_dc["materials"]["canvases"].append(c_mat)

        p_mat = proto_plc.copy()
        p_mat["id"] = plc_id
        edit_dc["materials"]["placeholder_infos"].append(p_mat)

        snd_mat = proto_snd.copy()
        snd_mat["id"] = snd_id
        edit_dc["materials"]["sound_channel_mappings"].append(snd_mat)

        col_mat = proto_col.copy()
        col_mat["id"] = col_id
        edit_dc["materials"]["material_colors"].append(col_mat)

        voc_mat = proto_voc.copy()
        voc_mat["id"] = voc_id
        edit_dc["materials"]["vocal_separations"].append(voc_mat)

        new_seg = proto_seg.copy()
        new_seg["id"] = seg_id
        new_seg["material_id"] = vid_id
        new_seg["source_timerange"] = {"start": src_start_us, "duration": src_dur_us}
        new_seg["target_timerange"] = {"start": tgt_start_us, "duration": src_dur_us}
        new_seg["render_timerange"] = {"start": 0, "duration": 0}
        new_seg["desc"] = f"Clip #{clip_global_idx+1}: {s.get('text_summary', '')[:30]}"
        new_seg["clip"] = {"scale": {"x": 1.0, "y": 1.0}, "rotation": 0.0, "transform": {"x": 0.0, "y": 0.0}, "flip": {"vertical": False, "horizontal": False}, "alpha": 1.0}
        new_seg["uniform_scale"] = {"on": True, "value": 1.0}
        new_seg["extra_material_refs"] = [spd_id, plc_id, can_id, snd_id, col_id, voc_id]
        new_seg["speed"] = 1.0
        new_seg["volume"] = 1.0
        existing_segments.append(new_seg)

    total_edited_s = current_target_us / 1000000.0
    edit_min = int(total_edited_s // 60)
    edit_sec = int(total_edited_s % 60)
    tab1_name = f"V3 Master Edit ({edit_min}m {edit_sec:02d}s)"

    edit_dc["name"] = tab1_name
    edit_dc["duration"] = current_target_us

    # Update Tab 2 (Raw Footage) if present
    tab2_name = "Raw Footage"
    if timeline_raw_id:
        raw_dc_file = os.path.join(timelines_dir, timeline_raw_id, "draft_content.json")
        if os.path.exists(raw_dc_file):
            with open(raw_dc_file, "r", encoding="utf-8") as f:
                raw_dc = json.load(f)

            raw_seg_count = len(raw_dc["tracks"][0].get("segments", []))
            raw_target_us = sum(s["target_timerange"]["duration"] for s in raw_dc["tracks"][0].get("segments", []))

            raw_seed = f"{timeline_raw_id}.seg.{raw_seg_count}"
            r_seg_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, raw_seed)).upper()
            r_vid_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seed}.vid")).upper()
            r_spd_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seed}.spd")).upper()
            r_can_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seed}.can")).upper()
            r_plc_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seed}.plc")).upper()
            r_snd_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seed}.snd")).upper()
            r_col_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seed}.col")).upper()
            r_voc_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{raw_seed}.voc")).upper()

            v_mat_raw = proto_vid.copy()
            v_mat_raw["id"] = r_vid_id
            v_mat_raw["path"] = norm_video_path
            v_mat_raw["material_name"] = os.path.basename(video_path)
            v_mat_raw["width"] = width
            v_mat_raw["height"] = height
            v_mat_raw["duration"] = raw_duration_us
            raw_dc["materials"]["videos"].append(v_mat_raw)

            s_mat_raw = proto_spd.copy()
            s_mat_raw["id"] = r_spd_id
            raw_dc["materials"]["speeds"].append(s_mat_raw)

            c_mat_raw = proto_can.copy()
            c_mat_raw["id"] = r_can_id
            raw_dc["materials"]["canvases"].append(c_mat_raw)

            p_mat_raw = proto_plc.copy()
            p_mat_raw["id"] = r_plc_id
            raw_dc["materials"]["placeholder_infos"].append(p_mat_raw)

            snd_mat_raw = proto_snd.copy()
            snd_mat_raw["id"] = r_snd_id
            raw_dc["materials"]["sound_channel_mappings"].append(snd_mat_raw)

            col_mat_raw = proto_col.copy()
            col_mat_raw["id"] = r_col_id
            raw_dc["materials"]["material_colors"].append(col_mat_raw)

            voc_mat_raw = proto_voc.copy()
            voc_mat_raw["id"] = r_voc_id
            raw_dc["materials"]["vocal_separations"].append(voc_mat_raw)

            new_raw_seg = proto_seg.copy()
            new_raw_seg["id"] = r_seg_id
            new_raw_seg["material_id"] = r_vid_id
            new_raw_seg["source_timerange"] = {"start": 0, "duration": raw_duration_us}
            new_raw_seg["target_timerange"] = {"start": raw_target_us, "duration": raw_duration_us}
            new_raw_seg["render_timerange"] = {"start": 0, "duration": 0}
            new_raw_seg["desc"] = f"Raw Footage #{raw_seg_count+1} ({os.path.basename(video_path)})"
            new_raw_seg["clip"] = {"scale": {"x": 1.0, "y": 1.0}, "rotation": 0.0, "transform": {"x": 0.0, "y": 0.0}, "flip": {"vertical": False, "horizontal": False}, "alpha": 1.0}
            new_raw_seg["uniform_scale"] = {"on": True, "value": 1.0}
            new_raw_seg["extra_material_refs"] = [r_spd_id, r_plc_id, r_can_id, r_snd_id, r_col_id, r_voc_id]
            new_raw_seg["speed"] = 1.0
            new_raw_seg["volume"] = 1.0
            raw_dc["tracks"][0]["segments"].append(new_raw_seg)

            total_raw_us = raw_target_us + raw_duration_us
            raw_dc["duration"] = total_raw_us
            raw_min = int((total_raw_us / 1000000.0) // 60)
            raw_sec = int((total_raw_us / 1000000.0) % 60)
            tab2_name = f"Raw Footage ({raw_min}m {raw_sec:02d}s)"
            raw_dc["name"] = tab2_name

            with open(raw_dc_file, "w", encoding="utf-8") as f:
                json.dump(raw_dc, f, indent=2, ensure_ascii=False)
            with open(os.path.join(timelines_dir, timeline_raw_id, "template-2.tmp"), "w", encoding="utf-8") as f:
                json.dump(raw_dc, f, indent=2, ensure_ascii=False)

    # Write edit timeline files
    with open(edit_dc_file, "w", encoding="utf-8") as f:
        json.dump(edit_dc, f, indent=2, ensure_ascii=False)
    with open(os.path.join(target_dir, "template-2.tmp"), "w", encoding="utf-8") as f:
        json.dump(edit_dc, f, indent=2, ensure_ascii=False)

    edit_tl_dir = os.path.join(timelines_dir, timeline_edit_id)
    with open(os.path.join(edit_tl_dir, "draft_content.json"), "w", encoding="utf-8") as f:
        json.dump(edit_dc, f, indent=2, ensure_ascii=False)
    with open(os.path.join(edit_tl_dir, "template-2.tmp"), "w", encoding="utf-8") as f:
        json.dump(edit_dc, f, indent=2, ensure_ascii=False)

    now_us = int(time.time() * 1000000)
    pj_data["update_time"] = now_us
    pj_data["timelines"][0]["name"] = tab1_name
    pj_data["timelines"][0]["update_time"] = now_us
    if len(pj_data["timelines"]) > 1 and timeline_raw_id:
        pj_data["timelines"][1]["name"] = tab2_name
        pj_data["timelines"][1]["update_time"] = now_us

    with open(pj_file, "w", encoding="utf-8") as f:
        json.dump(pj_data, f, indent=2, ensure_ascii=False)

    layout_file = os.path.join(target_dir, "timeline_layout.json")
    if os.path.exists(layout_file):
        with open(layout_file, "r", encoding="utf-8") as f:
            layout = json.load(f)
        if "dockItems" in layout and len(layout["dockItems"]) > 0:
            layout["dockItems"][0]["timelineNames"] = [tab1_name, tab2_name]
        with open(layout_file, "w", encoding="utf-8") as f:
            json.dump(layout, f, indent=2, ensure_ascii=False)

    meta_file = os.path.join(target_dir, "draft_meta_info.json")
    if os.path.exists(meta_file):
        with open(meta_file, "r", encoding="utf-8") as f:
            meta = json.load(f)
        meta["tm_duration"] = current_target_us
        meta["tm_draft_modified"] = now_us
        with open(meta_file, "w", encoding="utf-8") as f:
            json.dump(meta, f, indent=2, ensure_ascii=False)

    # Promote in root_meta_info.json
    root_meta_path = os.path.join(draft_root, "root_meta_info.json")
    if os.path.exists(root_meta_path):
        shutil.copy2(root_meta_path, root_meta_path + ".bak")
        with open(root_meta_path, "r", encoding="utf-8") as f:
            root_meta = json.load(f)

        existing_idx = None
        for i, item in enumerate(root_meta.get("all_draft_store", [])):
            if item.get("draft_name") == project_name or item.get("draft_id") == project_id:
                existing_idx = i
                break

        if existing_idx is not None:
            entry = root_meta["all_draft_store"].pop(existing_idx)
            entry["tm_duration"] = current_target_us
            entry["tm_draft_modified"] = now_us
            root_meta["all_draft_store"].insert(0, entry)

        with open(root_meta_path, "w", encoding="utf-8") as f:
            json.dump(root_meta, f, ensure_ascii=False, indent=2)

    # Remove .locked file if exists
    locked_file = os.path.join(target_dir, ".locked")
    if os.path.exists(locked_file):
        try:
            os.remove(locked_file)
        except Exception:
            pass

    return {
        "project_name": project_name,
        "project_id": project_id,
        "target_dir": target_dir,
        "cumulative_duration_s": total_edited_s,
        "clip_count": len(existing_segments),
        "tab1_name": tab1_name,
        "tab2_name": tab2_name
    }

