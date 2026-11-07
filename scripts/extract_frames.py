import os
import subprocess
import json
import glob

VIDEOS = [
    {"folder": "01_full_remotion_tutorial", "interval": 45},
    {"folder": "02_viral_reel_remotion_claude", "interval": 35},
    {"folder": "03_vox_animated_charts", "interval": 20},
    {"folder": "04_claude_fable_collage_animation", "interval": 25},
    {"folder": "05_vox_explainer_no_plugins", "interval": 30},
    {"folder": "06_vox_motion_graphics_claude", "interval": 35},
]

BASE_DIR = os.path.join("work", "mosidd_study")

for v in VIDEOS:
    v_dir = os.path.join(BASE_DIR, v["folder"])
    video_mp4 = os.path.join(v_dir, "video.mp4")
    if not os.path.exists(video_mp4):
        print(f"Skipping {v['folder']}, video.mp4 not found yet.")
        continue
    
    shots_dir = os.path.join(v_dir, "screenshots")
    os.makedirs(shots_dir, exist_ok=True)
    
    # Read duration and chapters if available
    info_files = glob.glob(os.path.join(v_dir, "*.info.json"))
    duration = 300
    chapter_starts = []
    if info_files:
        with open(info_files[0], 'r', encoding='utf-8') as f:
            data = json.load(f)
            duration = int(data.get("duration", 300))
            for ch in data.get("chapters", []):
                st = int(ch.get("start_time", 0))
                chapter_starts.extend([st + 3, st + 12, st + 25])
    
    # Generate timestamp list
    timestamps = set()
    # Add regular interval
    for t in range(5, duration - 5, v["interval"]):
        timestamps.add(t)
    for c in chapter_starts:
        if 0 < c < duration:
            timestamps.add(c)
    
    timestamps = sorted(list(timestamps))
    print(f"Extracting {len(timestamps)} screenshots for {v['folder']}...")
    
    for t in timestamps:
        out_img = os.path.join(shots_dir, f"frame_{t:04d}s.jpg")
        if os.path.exists(out_img):
            continue
        cmd = [
            "ffmpeg", "-y",
            "-ss", str(t),
            "-i", video_mp4,
            "-frames:v", "1",
            "-q:v", "3",
            out_img
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    print(f"Done screenshots for {v['folder']}: {len(os.listdir(shots_dir))} frames generated.")

print("All frame extractions complete!")
