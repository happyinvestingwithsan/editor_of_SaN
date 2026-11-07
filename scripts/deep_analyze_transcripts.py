import os
import glob
import re

BASE_DIR = os.path.join("work", "mosidd_study")
folders = sorted([d for d in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, d))])

def clean_srt(srt_path):
    with open(srt_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    # Remove SRT timing lines and numbers
    lines = content.split('\n')
    text_lines = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        if re.match(r'^\d+$', line):
            continue
        if '-->' in line:
            continue
        text_lines.append(line)
    
    # Deduplicate repetitive lines from YouTube auto-subs
    cleaned = []
    for t in text_lines:
        if not cleaned or cleaned[-1] != t:
            cleaned.append(t)
    return " ".join(cleaned)

for f in folders:
    f_path = os.path.join(BASE_DIR, f)
    srt_files = glob.glob(os.path.join(f_path, "*.srt"))
    if not srt_files:
        continue
    full_text = clean_srt(srt_files[0])
    out_txt = os.path.join(f_path, "full_transcript.txt")
    with open(out_txt, 'w', encoding='utf-8') as out_f:
        out_f.write(full_text)
    
    print(f"Processed transcript for {f}: {len(full_text.split())} words saved to {out_txt}")
