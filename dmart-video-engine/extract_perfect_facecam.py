import subprocess
import os
import json

SRC_VIDEO = "D:/QuickShare/Dmart/20261015_060621.mp4"
PUBLIC_DIR = "D:/AI Projects/Editor_of_SaN/dmart-video-engine/public"
OUTPUT_FILE = os.path.join(PUBLIC_DIR, "facecam_interval06.mp4")

CLIPS = [
    (3614.766666, 6.933333),  # 156 (208 frames)
    (3621.933333, 2.966667),  # 157 (89 frames)
    (3665.166666, 8.033334),  # 158 (241 frames)
    (3675.100000, 5.499999),  # 159 (165 frames)
    (3680.766666, 15.300000), # 160 (459 frames)
    (3696.066666, 2.900000),  # 161 (87 frames)
    (3721.466666, 6.900000),  # 162 (207 frames)
    (3728.366666, 9.066667),  # 163 (272 frames)
    (3751.133333, 1.466666),  # 164 (44 frames)
    (3757.033333, 4.466667),  # 165 (134 frames)
    (3790.833333, 17.233333), # 166 (517 frames)
]

parts = []
for i, (start, dur) in enumerate(CLIPS):
    part_file = os.path.join(PUBLIC_DIR, f"clean_part_{i}.mp4")
    parts.append(part_file)
    
    # Fast seek to 5s before, then exact frame-accurate seek
    pre_seek = max(0, start - 5.0)
    exact_seek = start - pre_seek
    
    cmd = [
        "ffmpeg", "-y",
        "-ss", f"{pre_seek:.6f}",
        "-i", SRC_VIDEO,
        "-ss", f"{exact_seek:.6f}",
        "-t", f"{dur:.6f}",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "16",
        "-g", "1",               # All-Intra: Every single frame is a keyframe (ZERO seek flickering)
        "-keyint_min", "1",
        "-r", "30",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        "-ar", "48000",
        "-avoid_negative_ts", "make_zero",
        part_file
    ]
    print(f"Extracting clip {i} (dur {dur:.2f}s)...")
    subprocess.run(cmd, check=True)

concat_list = os.path.join(PUBLIC_DIR, "concat_clean.txt")
with open(concat_list, "w") as f:
    for p in parts:
        f.write(f"file '{p.replace('\\', '/')}'\n")

print("Concatenating into seamless facecam_interval06.mp4...")
concat_cmd = [
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", concat_list,
    "-c", "copy",
    OUTPUT_FILE
]
subprocess.run(concat_cmd, check=True)

# Probe final file
probe_cmd = [
    "ffprobe", "-v", "error",
    "-select_streams", "v:0",
    "-count_packets",
    "-show_entries", "stream=nb_read_packets,duration,r_frame_rate",
    "-of", "json",
    OUTPUT_FILE
]
res = subprocess.run(probe_cmd, capture_output=True, text=True, check=True)
print("Probe output:", res.stdout)

# Clean up temporary parts
for p in parts:
    try:
        os.remove(p)
    except Exception:
        pass
try:
    os.remove(concat_list)
except Exception:
    pass
print("Extraction complete!")
