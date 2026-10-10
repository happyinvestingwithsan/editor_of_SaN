#!/usr/bin/env python
"""
Deploy verified rough-cut timeline to CapCut Desktop drafts.
Ensures both the primary project and a clean v2 project exist with 135.74s (02:15).
"""

import json
import os
import sys
import subprocess

# Ensure project root is on path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.rough_cut.audio_extractor import probe_video
from src.rough_cut.capcut_builder import build_capcut_draft, get_capcut_draft_root

def is_capcut_running() -> bool:
    try:
        out = subprocess.check_output(["tasklist", "/fi", "imagename eq CapCut.exe"], text=True)
        return "CapCut.exe" in out
    except Exception:
        return False

def deploy():
    video_path = r"D:\AI Projects\Video_Editing\input\Test_v10.mp4"
    edl_path = r"D:\AI Projects\Editor_of_SaN\work\HappyInvesting_Test_v10\HappyInvesting_Test_v10_edl.json"

    if not os.path.exists(edl_path):
        print(f"[ERROR] EDL file not found at {edl_path}")
        return False

    with open(edl_path, "r", encoding="utf-8") as f:
        edl = json.load(f)

    v_info = probe_video(video_path)
    kept = edl["kept_segments"]
    total_s = sum(s["duration"] for s in kept)
    print(f"Kept clips: {len(kept)}, Total duration: {total_s:.2f}s ({int(total_s//60)}m {int(total_s%60):02d}s)")

    capcut_open = is_capcut_running()
    if capcut_open:
        print("[WARNING] CapCut Desktop is currently running!")
        print("          CapCut Desktop holds open projects in memory and will overwrite disk files on auto-save/exit.")
        print("          For best results, CLOSE CapCut Desktop completely before running this deploy.")

    # 1. Primary draft
    res1 = build_capcut_draft(
        project_name="HappyInvesting_Test_v10",
        video_path=video_path,
        raw_duration_s=v_info["duration"],
        kept_segments=kept,
        width=v_info["width"],
        height=v_info["height"],
        fps=v_info["fps"]
    )
    print(f"[OK] Built primary draft: {res1['project_name']} -> {res1['tab1_name']}")

    # 2. V2 draft (safe from any existing CapCut in-memory draft lock)
    res2 = build_capcut_draft(
        project_name="HappyInvesting_Test_v10_v2",
        video_path=video_path,
        raw_duration_s=v_info["duration"],
        kept_segments=kept,
        width=v_info["width"],
        height=v_info["height"],
        fps=v_info["fps"]
    )
    print(f"[OK] Built secondary draft: {res2['project_name']} -> {res2['tab1_name']}")

    # 3. Synchronize root_meta_info.json
    draft_root = get_capcut_draft_root()
    root_meta_path = os.path.join(draft_root, "root_meta_info.json")
    if os.path.exists(root_meta_path):
        with open(root_meta_path, "r", encoding="utf-8") as f:
            meta = json.load(f)

        dur_us = int(round(total_s * 1000000))
        for item in meta.get("all_draft_store", []):
            if item.get("draft_name") in ["HappyInvesting_Test_v10", "HappyInvesting_Test_v10_v2"]:
                item["tm_duration"] = dur_us

        with open(root_meta_path, "w", encoding="utf-8") as f:
            json.dump(meta, f, indent=2, ensure_ascii=False)
        print(f"[OK] Updated root_meta_info.json entries to {dur_us} us (02:15)")

    return True

if __name__ == "__main__":
    deploy()
