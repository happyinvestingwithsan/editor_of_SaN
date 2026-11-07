"""
SaN Video Pipeline - Ingest & Proxy Module
Generates All-Intra lightweight video proxies and uncompressed 48kHz WAV audio tracks.
"""

import os
import subprocess
from typing import Optional, Dict


def extract_pcm_audio(
    source_path: str,
    output_wav_path: str,
    start_sec: Optional[float] = None,
    duration_sec: Optional[float] = None,
    sample_rate: int = 48000,
) -> str:
    """Extract pristine uncompressed PCM WAV audio at 48kHz."""
    os.makedirs(os.path.dirname(os.path.abspath(output_wav_path)), exist_ok=True)
    cmd = ["ffmpeg", "-y"]
    if start_sec is not None:
        cmd.extend(["-ss", str(round(start_sec, 3))])
    if duration_sec is not None:
        cmd.extend(["-t", str(round(duration_sec, 3))])
    cmd.extend([
        "-i", source_path,
        "-vn",
        "-acodec", "pcm_s16le",
        "-ar", str(sample_rate),
        "-ac", "2",
        output_wav_path,
    ])

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"FFmpeg audio extraction failed:\n{res.stderr}")
    return output_wav_path


def create_fast_proxy(
    source_path: str,
    output_mp4_path: str,
    start_sec: Optional[float] = None,
    duration_sec: Optional[float] = None,
    crf: int = 22,
    fps: int = 30,
) -> str:
    """
    Generate an All-Intra H.264 video proxy optimized for Remotion Studio & Chrome DOM.
    -g 1 guarantees every frame is an I-frame (seeking is < 1ms).
    +faststart places moov atom at beginning of MP4 container.
    """
    os.makedirs(os.path.dirname(os.path.abspath(output_mp4_path)), exist_ok=True)
    cmd = ["ffmpeg", "-y"]
    if start_sec is not None:
        cmd.extend(["-ss", str(round(start_sec, 3))])
    if duration_sec is not None:
        cmd.extend(["-t", str(round(duration_sec, 3))])
    cmd.extend([
        "-i", source_path,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", str(crf),
        "-g", "1",
        "-keyint_min", "1",
        "-movflags", "+faststart",
        "-r", str(fps),
        "-pix_fmt", "yuv420p",
        "-an",
        output_mp4_path,
    ])

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"FFmpeg proxy generation failed:\n{res.stderr}")
    return output_mp4_path


def ingest_master(
    source_path: str,
    target_dir: str,
    prefix: str = "master_take",
    start_sec: Optional[float] = None,
    duration_sec: Optional[float] = None,
) -> Dict[str, str]:
    """Ingest master camera take: produces synchronized proxy mp4 and 48kHz wav."""
    video_out = os.path.join(target_dir, f"{prefix}_fast.mp4")
    audio_out = os.path.join(target_dir, f"{prefix}_audio.wav")

    print(f">> Ingesting master: {source_path}")
    print(f"   Slice: start={start_sec}s, duration={duration_sec}s")

    print(">> Extracting 48kHz PCM WAV audio...")
    extract_pcm_audio(source_path, audio_out, start_sec=start_sec, duration_sec=duration_sec)

    print(">> Generating All-Intra faststart video proxy...")
    create_fast_proxy(source_path, video_out, start_sec=start_sec, duration_sec=duration_sec)

    print("[OK] Ingest complete.")
    return {
        "video": video_out,
        "audio": audio_out,
    }
