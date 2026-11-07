import os
import glob
from PIL import Image

BASE_DIR = os.path.join("work", "mosidd_study")

# Let's inspect the key screenshot timestamps for each video
key_moments = {
    "01_full_remotion_tutorial": [50, 186, 410, 422, 455, 500, 545, 672, 700, 864, 910, 955, 1000],
    "02_viral_reel_remotion_claude": [35, 67, 100, 140, 180, 210, 245, 280, 315, 350, 420, 500, 560, 630, 725],
    "03_vox_animated_charts": [20, 32, 65, 105, 140, 160, 200, 222, 250, 285],
    "04_claude_fable_collage_animation": [40, 75, 115, 150, 185, 230, 300, 340, 375],
    "05_vox_explainer_no_plugins": [33, 60, 100, 140, 165, 200, 230, 320, 360, 410, 440, 490, 540],
    "06_vox_motion_graphics_claude": [40, 93, 130, 146, 200, 250, 320, 380, 450, 520, 600, 661, 705]
}

print("Cataloging key screenshots...")
catalog = {}
for folder, times in key_moments.items():
    f_dir = os.path.join(BASE_DIR, folder, "screenshots")
    catalog[folder] = []
    for t in times:
        # find closest frame
        matches = glob.glob(os.path.join(f_dir, f"frame_{t:04d}s.jpg"))
        if not matches:
            # find closest
            all_frames = sorted(glob.glob(os.path.join(f_dir, "*.jpg")))
            best = None
            min_diff = 9999
            for af in all_frames:
                fname = os.path.basename(af)
                sec = int(fname.replace("frame_", "").replace("s.jpg", ""))
                diff = abs(sec - t)
                if diff < min_diff:
                    min_diff = diff
                    best = af
            if best and min_diff < 15:
                catalog[folder].append((t, best))
        else:
            catalog[folder].append((t, matches[0]))

for folder, items in catalog.items():
    print(f"\n{folder}: {len(items)} key frames identified")
    for t, p in items[:5]:
        print(f"  {t}s -> {os.path.basename(p)}")
