"""
Preview Generator for Rough Cut Verification.
Generates:
1. Preview audio WAV (instant deterministic join for transition / boundary verification)
2. Preview video MP4 (fast-transcode 720p/1080p video with timestamps)
"""

import json
import os
import subprocess
from typing import List, Dict, Any


def generate_audio_preview(
    video_path: str,
    kept_segments: List[Dict[str, Any]],
    output_wav_path: str
) -> str:
    """Generate stitched audio preview from kept segments using FFmpeg filter_complex."""
    os.makedirs(os.path.dirname(os.path.abspath(output_wav_path)), exist_ok=True)

    filter_chunks = []
    concat_inputs = []

    for i, s in enumerate(kept_segments):
        start = s["source_start"]
        end = s["source_end"]
        filter_chunks.append(f"[0:a]atrim=start={start}:end={end},asetpts=PTS-STARTPTS[a{i}]")
        concat_inputs.append(f"[a{i}]")

    concat_filter = f"{''.join(concat_inputs)}concat=n={len(kept_segments)}:v=0:a=1[outa]"
    full_filter = f"{';'.join(filter_chunks)};{concat_filter}"

    cmd = [
        "ffmpeg", "-y", "-i", video_path,
        "-filter_complex", full_filter,
        "-map", "[outa]",
        "-ac", "1", "-ar", "16000",
        output_wav_path
    ]
    subprocess.run(cmd, capture_output=True, check=True)
    return os.path.abspath(output_wav_path)


def generate_video_preview(
    video_path: str,
    kept_segments: List[Dict[str, Any]],
    output_mp4_path: str,
    scale_height: int = 720
) -> str:
    """Generate stitched video preview using FFmpeg concat demuxer."""
    os.makedirs(os.path.dirname(os.path.abspath(output_mp4_path)), exist_ok=True)
    concat_list_path = output_mp4_path + ".concat.txt"
    norm_path = os.path.abspath(video_path).replace("\\", "/")

    with open(concat_list_path, "w", encoding="utf-8") as f:
        for s in kept_segments:
            f.write(f"file '{norm_path}'\n")
            f.write(f"inpoint {s['source_start']:.3f}\n")
            f.write(f"outpoint {s['source_end']:.3f}\n")

    cmd = [
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", concat_list_path,
        "-vf", f"scale=-2:{scale_height}",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
        "-c:a", "aac", "-b:a", "128k",
        output_mp4_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        # Fallback if concat inpoint is unsupported by codec: render segments and concat
        raise RuntimeError(f"FFmpeg concat preview generation failed: {res.stderr[:500]}")

    if os.path.exists(concat_list_path):
        try:
            os.remove(concat_list_path)
        except Exception:
            pass

    return os.path.abspath(output_mp4_path)
