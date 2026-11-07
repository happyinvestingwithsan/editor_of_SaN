import os
import sys
import json
import glob

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.join("work", "mosidd_study")
folders = sorted([d for d in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, d))])

for f in folders:
    f_path = os.path.join(BASE_DIR, f)
    desc_files = glob.glob(os.path.join(f_path, "*.description"))
    info_files = glob.glob(os.path.join(f_path, "*.info.json"))
    srt_files = glob.glob(os.path.join(f_path, "*.srt"))
    
    print(f"\n==========================================")
    print(f"FOLDER: {f}")
    if info_files:
        with open(info_files[0], 'r', encoding='utf-8') as jf:
            info = json.load(jf)
            print(f"Title: {info.get('title')}")
            print(f"Duration: {info.get('duration')}s")
            chapters = info.get('chapters')
            if chapters:
                print("Chapters:")
                for ch in chapters:
                    print(f"  {ch.get('start_time')}s - {ch.get('title')}")
            else:
                print("No chapters found in metadata")
    if desc_files:
        with open(desc_files[0], 'r', encoding='utf-8') as df:
            desc = df.read()
            lines = desc.strip().split("\n")
            print(f"Description Preview (first 10 lines):")
            for line in lines[:10]:
                print(f"  {line}")
    if srt_files:
        print(f"SRT file present: {os.path.basename(srt_files[0])}")
