#!/usr/bin/env python3
"""
Reference Video Downloader Utility.
Downloads YouTube, Shorts, or Instagram reference/inspiration videos for analysis.
Uses yt-dlp to download video, audio, and captions into 3_WORKSPACE/references/.
"""
import argparse
import os
import subprocess
import sys
from pathlib import Path

def download_reference(url: str, name: str = None, extract_audio: bool = False):
    repo_root = Path(__file__).resolve().parent.parent.parent
    target_dir = repo_root / "3_WORKSPACE" / "references"
    if name:
        target_dir = target_dir / name
    target_dir.mkdir(parents=True, exist_ok=True)

    output_template = str(target_dir / "%(title).50s.%(ext)s")
    
    print(f"📥 Downloading reference from: {url}")
    print(f"📁 Saving to: {target_dir}")

    cmd = [
        sys.executable, "-m", "yt_dlp",
        "--no-playlist",
        "-f", "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[height<=1080]/best",
        "-o", output_template,
        "--write-subs",
        "--sub-lang", "en",
        "--convert-subs", "vtt",
        url
    ]

    if extract_audio:
        cmd.extend(["--extract-audio", "--audio-format", "mp3"])

    try:
        subprocess.run(cmd, check=True)
        print(f"✅ Successfully downloaded reference video to: {target_dir}")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error downloading reference video: {e}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Download inspiration/reference video for editing analysis.")
    parser.add_argument("--url", required=True, help="YouTube, Short, or Instagram URL")
    parser.add_argument("--name", help="Folder name inside 3_WORKSPACE/references/", default="ref_clip")
    parser.add_argument("--audio-only", action="store_true", help="Extract audio only")
    args = parser.parse_args()

    download_reference(args.url, args.name, args.audio_only)

if __name__ == "__main__":
    main()
