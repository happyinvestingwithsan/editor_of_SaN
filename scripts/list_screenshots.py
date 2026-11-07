import os
import glob

BASE_DIR = os.path.join("work", "mosidd_study")
folders = sorted([d for d in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, d))])

for f in folders:
    shots = sorted(glob.glob(os.path.join(BASE_DIR, f, "screenshots", "*.jpg")))
    print(f"\n==========================================")
    print(f"FOLDER: {f} (Total screenshots: {len(shots)})")
    # print sample of screenshot timestamps
    sample_names = [os.path.basename(s) for s in shots]
    print(f"Sample frames: {sample_names[:8]} ... {sample_names[-4:]}")
