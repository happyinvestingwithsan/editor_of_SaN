import subprocess
import os

SRC_VIDEO = "D:/QuickShare/Dmart/20261015_060621.mp4"
PUBLIC_DIR = "D:/AI Projects/Editor_of_SaN/dmart-video-engine/public"
OUTPUT_FILE = os.path.join(PUBLIC_DIR, "facecam_interval06.mp4")

CLIPS = [
    (3614.77, 3621.70), # 157: 6.93s
    (3621.93, 3624.90), # 158: 2.97s
    (3665.17, 3673.20), # 159: 8.03s
    (3675.10, 3680.60), # 160: 5.50s
    (3680.77, 3696.07), # 161: 15.30s
    (3696.07, 3698.97), # 162: 2.90s
    (3721.47, 3728.37), # 163: 6.90s
    (3728.37, 3737.43), # 164: 9.06s
    (3751.13, 3752.60), # 165: 1.47s
    (3757.03, 3761.50), # 166: 4.47s
    (3790.83, 3808.07), # 167: 17.24s
]

parts = []
for i, (start, end) in enumerate(CLIPS):
    part_file = os.path.join(PUBLIC_DIR, f"part_i6_{i}.mp4")
    parts.append(part_file)
    print(f"Extracting clip {i}: {start}s -> {end}s (dur {end-start:.2f}s)...")
    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start),
        "-to", str(end),
        "-i", SRC_VIDEO,
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
        "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
        "-r", "30",
        part_file
    ]
    subprocess.run(cmd, check=True)

concat_list_file = os.path.join(PUBLIC_DIR, "concat_list_i6.txt")
with open(concat_list_file, "w") as f:
    for p in parts:
        escaped_p = p.replace("\\", "/")
        f.write(f"file '{escaped_p}'\n")

print("Concatenating clips into single seamless video...")
concat_cmd = [
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", concat_list_file,
    "-c", "copy",
    OUTPUT_FILE
]
subprocess.run(concat_cmd, check=True)

# Cleanup parts
for p in parts:
    try:
        os.remove(p)
    except Exception:
        pass
try:
    os.remove(concat_list_file)
except Exception:
    pass

print(f"Done! Created: {OUTPUT_FILE}")
