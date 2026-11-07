"""
Preview Generator for Rough Cut Verification.
Generates:
1. Preview audio WAV (deterministic filter-based join for transition / boundary verification)
2. Preview video MP4 (filter-based frame-accurate render preserving PTS and A/V sync)
3. Synchronization measurement tool for multi-point A/V verification.
"""

import json
import os
import subprocess
from typing import List, Dict, Any, Optional, Tuple


def build_filter_script(
    kept_segments: List[Dict[str, Any]],
    scale_height: Optional[int] = None,
    include_video: bool = True,
    fade_duration: float = 0.015
) -> str:
    """
    Build FFmpeg filter_complex script lines using filter-based trimming and concatenation.
    Normalizes segment timestamps with setpts/asetpts PTS-STARTPTS.
    Applies boundary audio fades ONLY when valid source handles exist.
    """
    filter_lines = []
    v_inputs = []
    a_inputs = []

    for i, s in enumerate(kept_segments):
        start = float(s["source_start"])
        end = float(s["source_end"])
        dur = end - start

        # Check handles for audio fade safety
        # Audio fades must only occur if there is a silence cushion, NEVER over spoken words
        lead_handle = None
        trail_handle = None

        if "speech_start" in s and s["speech_start"] is not None:
            lead_handle = float(s["speech_start"]) - start
        elif "leading_handle" in s and s["leading_handle"] is not None:
            lead_handle = float(s["leading_handle"])

        if "speech_end" in s and s["speech_end"] is not None:
            trail_handle = end - float(s["speech_end"])
        elif "trailing_handle" in s and s["trailing_handle"] is not None:
            trail_handle = float(s["trailing_handle"])

        # Determine audio fade filters: requires at least (fade_duration + 10ms) cushion
        fade_filters = ""
        min_cushion = fade_duration + 0.010
        if lead_handle is not None and lead_handle >= min_cushion:
            fade_filters += f",afade=t=in:st=0:d={fade_duration:.3f}"

        if trail_handle is not None and trail_handle >= min_cushion and dur > fade_duration:
            fade_out_st = max(0.0, dur - fade_duration)
            fade_filters += f",afade=t=out:st={fade_out_st:.3f}:d={fade_duration:.3f}"

        # Audio stream filter for segment i
        filter_lines.append(
            f"[0:a]atrim=start={start:.3f}:end={end:.3f},asetpts=PTS-STARTPTS{fade_filters}[a{i}]"
        )
        a_inputs.append(f"[a{i}]")

        # Video stream filter for segment i
        if include_video:
            if scale_height:
                scale_flt = f",scale=-2:{scale_height}"
            else:
                scale_flt = ""
            filter_lines.append(
                f"[0:v]trim=start={start:.3f}:end={end:.3f},setpts=PTS-STARTPTS{scale_flt}[v{i}]"
            )
            v_inputs.append(f"[v{i}]")

    n = len(kept_segments)
    if include_video:
        concat_in = "".join(f"{v_inputs[i]}{a_inputs[i]}" for i in range(n))
        filter_lines.append(f"{concat_in}concat=n={n}:v=1:a=1[outv][outa]")
    else:
        concat_in = "".join(a_inputs)
        filter_lines.append(f"{concat_in}concat=n={n}:v=0:a=1[outa]")

    return ";\n".join(filter_lines)


def generate_audio_preview(
    video_path: str,
    kept_segments: List[Dict[str, Any]],
    output_wav_path: str,
    fade_duration: float = 0.015
) -> str:
    """Generate stitched audio preview from kept segments using FFmpeg filter_complex script."""
    os.makedirs(os.path.dirname(os.path.abspath(output_wav_path)), exist_ok=True)
    if not kept_segments:
        raise ValueError("Cannot generate audio preview with zero kept segments.")

    script_content = build_filter_script(
        kept_segments=kept_segments,
        include_video=False,
        fade_duration=fade_duration
    )

    script_path = output_wav_path + ".filter.txt"
    with open(script_path, "w", encoding="utf-8") as f:
        f.write(script_content)

    try:
        cmd = [
            "ffmpeg", "-y",
            "-i", video_path,
            "-filter_complex_script", script_path,
            "-map", "[outa]",
            "-ac", "1",
            "-ar", "16000",
            output_wav_path
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            raise RuntimeError(f"FFmpeg audio preview generation failed: {res.stderr[:500]}")
    finally:
        if os.path.exists(script_path):
            try:
                os.remove(script_path)
            except Exception:
                pass

    return os.path.abspath(output_wav_path)


def generate_video_preview(
    video_path: str,
    kept_segments: List[Dict[str, Any]],
    output_mp4_path: str,
    scale_height: int = 720,
    fps: int = 30,
    fade_duration: float = 0.015
) -> str:
    """
    Generate stitched video preview using filter-based trimming and concatenation.
    Ensures frame-accurate cuts, normalized PTS, and continuous audio/video timing.
    """
    os.makedirs(os.path.dirname(os.path.abspath(output_mp4_path)), exist_ok=True)
    if not kept_segments:
        raise ValueError("Cannot generate video preview with zero kept segments.")

    script_content = build_filter_script(
        kept_segments=kept_segments,
        scale_height=scale_height,
        include_video=True,
        fade_duration=fade_duration
    )

    script_path = output_mp4_path + ".filter.txt"
    with open(script_path, "w", encoding="utf-8") as f:
        f.write(script_content)

    try:
        cmd = [
            "ffmpeg", "-y",
            "-i", video_path,
            "-filter_complex_script", script_path,
            "-map", "[outv]",
            "-map", "[outa]",
            "-c:v", "libx264",
            "-preset", "veryfast",
            "-crf", "23",
            "-r", str(fps),
            "-fps_mode", "cfr",
            "-c:a", "aac",
            "-b:a", "128k",
            "-ar", "48000",
            output_mp4_path
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            raise RuntimeError(f"FFmpeg video preview generation failed: {res.stderr[:500]}")
    finally:
        if os.path.exists(script_path):
            try:
                os.remove(script_path)
            except Exception:
                pass

    return os.path.abspath(output_mp4_path)


def measure_preview_sync(
    preview_mp4_path: str,
    check_points_s: Optional[List[float]] = None
) -> Dict[str, Any]:
    """
    Measure A/V duration drift and synchronization at multiple points across the preview.
    Uses ffprobe to inspect stream durations and packet timestamps.
    """
    if not os.path.exists(preview_mp4_path):
        raise FileNotFoundError(f"Preview file not found: {preview_mp4_path}")

    # 1. Inspect stream durations
    probe_cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "stream=index,codec_type,duration,nb_frames,r_frame_rate,sample_rate",
        "-of", "json",
        preview_mp4_path
    ]
    probe_res = subprocess.run(probe_cmd, capture_output=True, text=True, check=True)
    probe_data = json.loads(probe_res.stdout)

    v_stream = next((s for s in probe_data.get("streams", []) if s.get("codec_type") == "video"), None)
    a_stream = next((s for s in probe_data.get("streams", []) if s.get("codec_type") == "audio"), None)

    if not v_stream or not a_stream:
        raise ValueError("Preview must contain both a video and an audio stream.")

    v_dur = float(v_stream.get("duration", 0.0))
    a_dur = float(a_stream.get("duration", 0.0))
    duration_drift_s = round(abs(v_dur - a_dur), 4)

    # 2. Determine check points across start, middle, end, and user-provided points
    min_dur = min(v_dur, a_dur)
    points = [0.5, round(min_dur / 2.0, 2), max(0.5, round(min_dur - 1.0, 2))]
    if check_points_s:
        for p in check_points_s:
            if 0.0 <= p <= min_dur and p not in points:
                points.append(round(p, 2))
    points.sort()

    point_measurements = []
    for pt in points:
        read_start = max(0.0, pt - 0.25)
        read_end = min(min_dur, pt + 0.25)
        interval_str = f"{read_start:.2f}%{read_end:.2f}"

        # Probe video packet near pt
        v_pkt_cmd = [
            "ffprobe", "-v", "error",
            "-select_streams", "v:0",
            "-read_intervals", interval_str,
            "-show_entries", "packet=pts_time,dts_time,duration_time",
            "-of", "json",
            preview_mp4_path
        ]
        v_res = subprocess.run(v_pkt_cmd, capture_output=True, text=True)
        v_pkts = json.loads(v_res.stdout).get("packets", []) if v_res.returncode == 0 else []

        # Probe audio packet near pt
        a_pkt_cmd = [
            "ffprobe", "-v", "error",
            "-select_streams", "a:0",
            "-read_intervals", interval_str,
            "-show_entries", "packet=pts_time,dts_time,duration_time",
            "-of", "json",
            preview_mp4_path
        ]
        a_res = subprocess.run(a_pkt_cmd, capture_output=True, text=True)
        a_pkts = json.loads(a_res.stdout).get("packets", []) if a_res.returncode == 0 else []

        closest_v = None
        closest_a = None
        if v_pkts:
            v_times = [float(p["pts_time"]) for p in v_pkts if "pts_time" in p]
            if v_times:
                closest_v = min(v_times, key=lambda t: abs(t - pt))

        if a_pkts:
            a_times = [float(p["pts_time"]) for p in a_pkts if "pts_time" in p]
            if a_times:
                closest_a = min(a_times, key=lambda t: abs(t - pt))

        delta_ms = None
        if closest_v is not None and closest_a is not None:
            delta_ms = round(abs(closest_v - closest_a) * 1000.0, 2)

        point_measurements.append({
            "target_time_s": pt,
            "closest_v_pts_s": closest_v,
            "closest_a_pts_s": closest_a,
            "pts_delta_ms": delta_ms,
            "sync_ok": (delta_ms is not None and delta_ms < 35.0)  # Within ~1 video frame at 30fps
        })

    all_points_ok = all(m["sync_ok"] for m in point_measurements)
    nominal_sync_ok = duration_drift_s < 0.05  # Within 50ms total drift

    return {
        "video_duration_s": v_dur,
        "audio_duration_s": a_dur,
        "duration_drift_s": duration_drift_s,
        "duration_drift_ms": round(duration_drift_s * 1000.0, 1),
        "nominal_sync_ok": nominal_sync_ok,
        "multi_point_sync_ok": all_points_ok,
        "is_synchronized": nominal_sync_ok and all_points_ok,
        "check_points": point_measurements
    }
