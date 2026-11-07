import subprocess
import os

SRC_VIDEO = "D:/QuickShare/Dmart/20261015_060621.mp4"
PUBLIC_DIR = "D:/AI Projects/Editor_of_SaN/dmart-video-engine/public"
OUTPUT_FILE = os.path.join(PUBLIC_DIR, "facecam_chunk01.mp4")

CLIPS = [
    (117.433, 136.967),
    (140.933, 161.100),
    (163.767, 166.733),
    (220.867, 231.267),
]

parts = []
for i, (start, end) in enumerate(CLIPS):
    part_file = os.path.join(PUBLIC_DIR, f"part_{i}.mp4")
    parts.append(part_file)
    print(f"Extracting clip {i}: {start}s -> {end}s...")
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

# Create concat list
concat_list_file = os.path.join(PUBLIC_DIR, "concat_list.txt")
with open(concat_list_file, "w") as f:
    for p in parts:
        escaped_p = p.replace("\\", "/")
        f.write(f"file '{escaped_p}'\n")

print("Concatenating clips...")
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
    if os.path.exists(os.path.join(PUBLIC_DIR, "part0.mp4")):
        os.remove(os.path.join(PUBLIC_DIR, "part0.mp4"))
except Exception:
    pass

print(f"Done! Created: {OUTPUT_FILE}")
