import os
import subprocess
import json

VIDEOS = [
    {"id": "f393grXJn9E", "folder": "01_full_remotion_tutorial", "title": "Full Remotion Tutorial to Create Insane Motion Graphics"},
    {"id": "xOhh274Ayac", "folder": "02_viral_reel_remotion_claude", "title": "I Made This Viral Reel Using ONLY Remotion & Claude Code"},
    {"id": "dv3ADYu74DE", "folder": "03_vox_animated_charts", "title": "Vox-Style Animated Charts With ONE PROMPT (Remotion + Claude Code)"},
    {"id": "aSNYHAzPEKc", "folder": "04_claude_fable_collage_animation", "title": "Claude Fable 5 + Remotion Built This $1,000 Collage Animation"},
    {"id": "Y6mOBK5peDU", "folder": "05_vox_explainer_no_plugins", "title": "I Built a Vox Explainer Using Claude Code & Remotion (No Plugins)"},
    {"id": "7wuYBfE131U", "folder": "06_vox_motion_graphics_claude", "title": "I Made Vox-Style Motion Graphics Using Only Claude Code & Remotion"},
]

BASE_DIR = os.path.join("work", "mosidd_study")
os.makedirs(BASE_DIR, exist_ok=True)

for v in VIDEOS:
    v_dir = os.path.join(BASE_DIR, v["folder"])
    os.makedirs(v_dir, exist_ok=True)
    print(f"Fetching metadata and subs for: {v['title']} ({v['id']})...")
    
    # 1. Fetch description and metadata
    cmd_meta = [
        "python", "-m", "yt_dlp",
        "--skip-download",
        "--write-description",
        "--write-info-json",
        "--write-sub", "--write-auto-sub",
        "--sub-lang", "en",
        "--convert-subs", "srt",
        "-o", os.path.join(v_dir, "%(id)s.%(ext)s"),
        f"https://www.youtube.com/watch?v={v['id']}"
    ]
    subprocess.run(cmd_meta, check=False)
    print(f"Finished metadata for {v['folder']}")

print("All metadata and subs fetched.")
