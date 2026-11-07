"""
SaN Video Production Tool: Reslice Equitas SFB Masterclass Intro
Location: src/san_tools/reslice_equitas_intro.py
"""

import os
import sys
import json
import subprocess
import time

def main():
    source_video = r"D:\QuickShare\Equitas SFB\20261030_182048.mp4"
    if not os.path.exists(source_video):
        print(f"Error: Source video not found: {source_video}")
        sys.exit(1)

    output_video = r"dmart-video-engine\public\video\equitas_intro_proxy.mp4"
    output_audio = r"dmart-video-engine\public\audio\equitas_intro_audio_48k.wav"

    os.makedirs(os.path.dirname(output_video), exist_ok=True)
    os.makedirs(os.path.dirname(output_audio), exist_ok=True)

    # 11 Segments verified from CapCut draft_content.json (in seconds)
    segments = [
        (24.500000, 24.700000), # Seg 00: 24.5s -> 49.2s (741f)
        (50.966666, 15.300001), # Seg 01: 50.967s -> 66.267s (459f)
        (84.300000,  5.566666), # Seg 02: 84.3s -> 89.867s (167f)
        (90.900000, 11.333333), # Seg 03: 90.9s -> 102.233s (340f)
        (111.833333, 14.466667), # Seg 04: 111.833s -> 126.3s (434f)
        (140.766667, 21.499999), # Seg 05: 140.767s -> 162.267s (645f)
        (174.133333,  9.300000), # Seg 06: 174.133s -> 183.433s (279f)
        (192.566667, 14.000000), # Seg 07: 192.567s -> 206.567s (420f)
        (236.266667, 24.466666), # Seg 08: 236.267s -> 260.733s (734f)
        (266.000000, 13.633333), # Seg 09: 266.0s -> 279.633s (409f)
        (307.100000,  5.733334), # Seg 10: 307.1s -> 312.833s (172f)
    ]

    total_expected_dur = sum(dur for _, dur in segments)
    total_expected_frames = sum(round(dur * 30.0) for _, dur in segments)
    print(f"Target Segments: {len(segments)}")
    print(f"Total Target Duration: {total_expected_dur:.6f}s")
    print(f"Total Target Frames: {total_expected_frames} frames @ 30.000 fps")

    n = len(segments)
    filter_parts = []
    
    # 1. Split video and audio into n branches with 30fps CFR locking
    v_splits = "".join([f"[v{i}in]" for i in range(n)])
    a_splits = "".join([f"[a{i}in]" for i in range(n)])
    filter_parts.append(f"[0:v]fps=fps=30,split={n}{v_splits};")
    filter_parts.append(f"[0:a]asplit={n}{a_splits};")

    # 2. Trim each branch with PTS reset
    concat_inputs = ""
    for i, (start, dur) in enumerate(segments):
        filter_parts.append(f"[v{i}in]trim=start={start:.6f}:duration={dur:.6f},setpts=PTS-STARTPTS[v{i}];")
        filter_parts.append(f"[a{i}in]atrim=start={start:.6f}:duration={dur:.6f},asetpts=PTS-STARTPTS[a{i}];")
        concat_inputs += f"[v{i}][a{i}]"

    # 3. Concat all branches into unified outv and outa
    filter_parts.append(f"{concat_inputs}concat=n={n}:v=1:a=1[outv][outa]")
    filter_complex = "".join(filter_parts)

    cmd = [
        "ffmpeg", "-y",
        "-i", source_video,
        "-filter_complex", filter_complex,
        # Output 1: All-Intra 30fps CFR proxy without audio
        "-map", "[outv]",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-g", "1",
        "-keyint_min", "1",
        "-crf", "20",
        "-r", "30",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-an",
        output_video,
        # Output 2: Uncompressed 48kHz 16-bit PCM Stereo WAV
        "-map", "[outa]",
        "-c:a", "pcm_s16le",
        "-ar", "48000",
        "-ac", "2",
        output_audio,
    ]

    print("\nStarting FFmpeg unified slice & render pass...")
    t0 = time.time()
    proc = subprocess.run(cmd, capture_output=True, text=True)
    elapsed = time.time() - t0

    if proc.returncode != 0:
        print("FFmpeg Error! Return code:", proc.returncode)
        print("Stderr log:", proc.stderr[-2000:])
        sys.exit(proc.returncode)

    print(f"Pass completed successfully in {elapsed:.1f}s!")

if __name__ == "__main__":
    main()
