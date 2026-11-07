import subprocess
import os
import json

SRC_VIDEO = "D:/QuickShare/Dmart/20261015_060621.mp4"
PUBLIC_DIR = "D:/AI Projects/Editor_of_SaN/dmart-video-engine/public"
OUTPUT_FILE = os.path.join(PUBLIC_DIR, "facecam_interval07.mp4")

with open("D:/AI Projects/Editor_of_SaN/work/Dmart_Project/no_broll_screen_recording_intervals.json", "r", encoding="utf-8") as f:
    intervals = json.load(f)

it7 = [it for it in intervals if it.get("interval_id") == 7][0]
clips = []
for seg in it7["segments"]:
    src = seg["source_range"]
    clips.append((src[0], src[1]))

print(f"Loaded {len(clips)} clips for Interval 7. Total expected duration: {it7['timeline_duration_s']:.2f}s")

parts = []
for i, (start, end) in enumerate(clips):
    part_file = os.path.join(PUBLIC_DIR, f"part_i7_{i:02d}.mp4")
    parts.append(part_file)
    print(f"Extracting clip {i:02d}: {start:.3f}s -> {end:.3f}s (dur {end-start:.3f}s)...")
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

concat_list_file = os.path.join(PUBLIC_DIR, "concat_list_i7.txt")
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
