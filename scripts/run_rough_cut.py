#!/usr/bin/env python
"""
Happy Investing Face-Camera Rough-Cut Pilot Runner.
Executes the full rough cut pipeline from a raw video file to an editable CapCut project.
"""

import argparse
import json
import os
import sys

# Ensure src is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.rough_cut.audio_extractor import probe_video, extract_audio
from src.rough_cut.transcriber import transcribe_audio
from src.rough_cut.analyzer import analyze_transcript
from src.rough_cut.editorial_reasoner import create_editorial_plan
from src.rough_cut.waveform_refiner import refine_boundaries_with_waveform
from src.rough_cut.capcut_builder import build_capcut_draft
from src.rough_cut.edl_reporter import generate_edl_report
from src.rough_cut.preview_generator import generate_audio_preview, generate_video_preview


def main():
    parser = argparse.ArgumentParser(description="Happy Investing Face-Camera Rough-Cut Pipeline")
    parser.add_argument("--video", required=True, help="Path to raw source video")
    parser.add_argument("--name", help="Project name (defaults to video filename slug)")
    parser.add_argument("--out-dir", default="work", help="Output directory for work files")
    parser.add_argument("--transcript", help="Optional pre-existing transcript JSON (skips transcription)")
    parser.add_argument("--force-transcribe", action="store_true", help="Force re-running transcription even if transcript exists")
    parser.add_argument("--model", default="small", help="Whisper model size (small, medium, large-v3)")
    parser.add_argument("--no-video-preview", action="store_true", help="Skip MP4 video preview generation")
    parser.add_argument("--skip-capcut", action="store_true", help="Skip CapCut project generation")

    args = parser.parse_args()

    video_path = os.path.abspath(args.video)
    if not os.path.exists(video_path):
        print(f"[ERROR] Source video not found: {video_path}")
        sys.exit(1)

    project_name = args.name or os.path.splitext(os.path.basename(video_path))[0]
    work_dir = os.path.abspath(os.path.join(args.out_dir, project_name))
    os.makedirs(work_dir, exist_ok=True)

    print("=" * 70)
    print(f"  HAPPY INVESTING FACE-CAMERA ROUGH-CUT PILOT: {project_name}")
    print("=" * 70)

    # 1. Probe video
    print(f"\n[1/7] Probing source video: {video_path}")
    v_info = probe_video(video_path)
    print(f"      Duration: {v_info['duration']:.2f}s | Resolution: {v_info['width']}x{v_info['height']} @ {v_info['fps']} fps")

    # 2. Extract Audio
    wav_path = os.path.join(work_dir, f"{project_name}_16k.wav")
    if not os.path.exists(wav_path):
        print(f"\n[2/7] Extracting 16kHz mono WAV...")
        extract_audio(video_path, wav_path)
        print(f"      Extracted -> {wav_path}")
    else:
        print(f"\n[2/7] Audio already extracted: {wav_path}")

    # 3. Transcribe & silence detection
    transcript_path = os.path.join(work_dir, f"{project_name}_transcript.json")
    if args.transcript and os.path.exists(args.transcript):
        print(f"\n[3/7] Loading provided transcript: {args.transcript}")
        with open(args.transcript, "r", encoding="utf-8") as f:
            transcript_data = json.load(f)
    elif os.path.exists(transcript_path) and not args.force_transcribe:
        print(f"\n[3/7] Loading existing transcript: {transcript_path}")
        with open(transcript_path, "r", encoding="utf-8") as f:
            transcript_data = json.load(f)
    else:
        print(f"\n[3/7] Running faster-whisper transcription (model: {args.model})...")
        transcript_data = transcribe_audio(
            wav_path=wav_path,
            output_json_path=transcript_path,
            model_size=args.model
        )
        print(f"      Transcribed {len(transcript_data.get('segments', []))} speech segments -> {transcript_path}")

    # 4. Analyze speech and pauses
    print(f"\n[4/7] Analyzing speech patterns, dead air, and candidate thought blocks...")
    analysis_data = analyze_transcript(transcript_data)
    analysis_path = os.path.join(work_dir, f"{project_name}_analysis.json")
    with open(analysis_path, "w", encoding="utf-8") as f:
        json.dump(analysis_data, f, indent=2, ensure_ascii=False)
    n_blocks = len(analysis_data.get("thought_blocks", []))
    n_clusters = len(analysis_data.get("thought_clusters", []))
    print(f"      Identified {n_blocks} thought blocks across {n_clusters} semantic narrative clusters.")

    # 5. Editorial Reasoning & Plan
    print(f"\n[5/7] Formulating evidence-based editorial rough-cut plan...")
    plan = create_editorial_plan(transcript_data, analysis_data)
    print(f"      Initial plan: {len(plan['kept_segments'])} clips, {len(plan['cuts'])} cuts.")
    if plan.get("editorial_decisions"):
        print("      Editorial Decisions:")
        for d in plan["editorial_decisions"]:
            print(f"        - {d['thought_block']}: {d['reason']}")

    # Boundary refinement with waveform
    print(f"      Refining cut boundaries with acoustic zero-crossing (speech protected)...")
    refined_clips = refine_boundaries_with_waveform(wav_path, plan["kept_segments"])
    plan["kept_segments"] = refined_clips

    # Recalculate duration metrics
    edit_d = sum(c["duration"] for c in refined_clips)
    plan["edited_duration"] = round(edit_d, 3)
    plan["removed_duration"] = round(plan["raw_duration"] - edit_d, 3)
    plan["cut_percentage"] = round((plan["removed_duration"] / plan["raw_duration"]) * 100, 1)

    # 6. Generate EDL Reports
    print(f"\n[6/7] Generating reviewable EDL reports...")
    edl_files = generate_edl_report(plan, work_dir, project_name)
    print(f"      Markdown EDL -> {edl_files['md_path']}")
    print(f"      JSON EDL     -> {edl_files['json_path']}")

    # 7. Previews & CapCut
    print(f"\n[7/7] Generating QA deliverables...")

    # Audio preview
    preview_wav = os.path.join(work_dir, f"{project_name}_preview.wav")
    print(f"      Building audio preview...")
    generate_audio_preview(video_path, refined_clips, preview_wav)
    print(f"      Audio preview -> {preview_wav}")

    # Video preview
    if not args.no_video_preview:
        preview_mp4 = os.path.join(work_dir, f"{project_name}_preview.mp4")
        print(f"      Rendering 720p rough-cut MP4 preview (filter-based PTS sync)...")
        generate_video_preview(video_path, refined_clips, preview_mp4, scale_height=720, fps=int(round(v_info.get("fps", 30))))
        print(f"      Video preview -> {preview_mp4}")
        try:
            from src.rough_cut.preview_generator import measure_preview_sync
            sync_metrics = measure_preview_sync(preview_mp4)
            print(f"      A/V Sync Verification: drift {sync_metrics['duration_drift_ms']}ms | Multi-point sync: {'PASS' if sync_metrics['multi_point_sync_ok'] else 'FAIL'}")
        except Exception as e:
            print(f"      A/V Sync Verification warning: {e}")

    # CapCut Project
    if not args.skip_capcut:
        print(f"      Building CapCut dual-timeline project...")
        capcut_res = build_capcut_draft(
            project_name=project_name,
            video_path=video_path,
            raw_duration_s=v_info["duration"],
            kept_segments=refined_clips,
            width=v_info["width"],
            height=v_info["height"],
            fps=v_info["fps"]
        )
        print(f"      CapCut project installed -> {capcut_res['target_dir']}")
        print(f"      Tab 1: {capcut_res['tab1_name']}")
        print(f"      Tab 2: {capcut_res['tab2_name']}")

    # Print summary table
    print("\n" + "=" * 75)
    print(f"  ROUGH CUT RESULTS SUMMARY")
    print("=" * 75)
    print(f"  Raw Duration:      {plan['raw_duration']:.2f}s ({int(plan['raw_duration']//60)}m {int(plan['raw_duration']%60):02d}s)")
    print(f"  Edited Duration:   {plan['edited_duration']:.2f}s ({int(plan['edited_duration']//60)}m {int(plan['edited_duration']%60):02d}s)")
    print(f"  Removed:           {plan['removed_duration']:.2f}s ({plan['cut_percentage']}%)")
    print(f"  Kept Clips:        {len(plan['kept_segments'])}")
    print(f"  Editorial Cuts:    {len(plan['cuts'])}")
    print("=" * 75)

    print("\nDraft Playhead <---> Raw Source Mapping:")
    print(f"{'Clip':<6} | {'Draft Playhead':<18} | {'Raw Source':<18} | {'Duration':<8} | {'Spoken Preview'}")
    print("-" * 75)
    for c in refined_clips:
        d_range = f"{c['draft_start']:.2f}s - {c['draft_end']:.2f}s"
        s_range = f"{c['source_start']:.2f}s - {c['source_end']:.2f}s"
        print(f"#{c['clip_index']:02d}   | {d_range:<18} | {s_range:<18} | {c['duration']:<6.2f}s | {c['text_summary'][:30]}")
    print("=" * 75 + "\n")


if __name__ == "__main__":
    main()
