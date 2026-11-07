import subprocess
import os

VIDEOS = [
    {"id": "f393grXJn9E", "folder": "01_full_remotion_tutorial"},
    {"id": "xOhh274Ayac", "folder": "02_viral_reel_remotion_claude"},
    {"id": "dv3ADYu74DE", "folder": "03_vox_animated_charts"},
    {"id": "aSNYHAzPEKc", "folder": "04_claude_fable_collage_animation"},
    {"id": "Y6mOBK5peDU", "folder": "05_vox_explainer_no_plugins"},
    {"id": "7wuYBfE131U", "folder": "06_vox_motion_graphics_claude"},
]

BASE_DIR = os.path.join("work", "mosidd_study")

for v in VIDEOS:
    v_dir = os.path.join(BASE_DIR, v["folder"])
    target_mp4 = os.path.join(v_dir, "video.mp4")
    if os.path.exists(target_mp4) and os.path.getsize(target_mp4) > 1000000:
        print(f"Already downloaded: {v['folder']}")
        continue
    
    print(f"Downloading {v['folder']} ({v['id']})...")
    cmd = [
        "python", "-m", "yt_dlp",
        "-f", "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720]/best",
        "-o", target_mp4,
        f"https://www.youtube.com/watch?v={v['id']}"
    ]
    subprocess.run(cmd, check=True)
    print(f"Finished {v['folder']}")

print("All videos downloaded successfully!")
