"""
Video probing and audio extraction utilities using FFmpeg / FFprobe.
"""

import json
import os
import subprocess
from typing import Dict, Any


def probe_video(video_path: str) -> Dict[str, Any]:
    """Extract format and video stream metadata using ffprobe."""
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")

    cmd = [
        "ffprobe", "-v", "error",
        "-select_streams", "v:0",
        "-show_entries", "stream=width,height,r_frame_rate,codec_name",
        "-show_entries", "format=duration,format_name,size",
        "-of", "json",
        video_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, check=True)
    info = json.loads(res.stdout)

    stream = info["streams"][0] if info.get("streams") else {}
    width = int(stream.get("width", 1920))
    height = int(stream.get("height", 1080))
    r_fps = stream.get("r_frame_rate", "30/1")
    fps = eval(r_fps) if "/" in r_fps else float(r_fps)
    duration = float(info["format"]["duration"])

    return {
        "video_path": os.path.abspath(video_path),
        "filename": os.path.basename(video_path),
        "width": width,
        "height": height,
        "fps": round(fps, 3),
        "duration": round(duration, 3),
        "codec": stream.get("codec_name", "unknown"),
        "filesize_bytes": int(info["format"].get("size", 0))
    }


def extract_audio(video_path: str, wav_path: str, sample_rate: int = 16000) -> str:
    """Extract 16kHz mono 16-bit PCM WAV from source video using ffmpeg."""
    os.makedirs(os.path.dirname(os.path.abspath(wav_path)), exist_ok=True)
    cmd = [
        "ffmpeg", "-y", "-i", video_path,
        "-vn", "-ac", "1", "-ar", str(sample_rate),
        "-c:a", "pcm_s16le",
        wav_path
    ]
    subprocess.run(cmd, capture_output=True, check=True)
    return os.path.abspath(wav_path)
