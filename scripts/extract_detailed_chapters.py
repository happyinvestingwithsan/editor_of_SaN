import os
import json
import glob
import re

BASE_DIR = os.path.join("work", "mosidd_study")
folders = sorted([d for d in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, d))])

def parse_srt(srt_path):
    with open(srt_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    blocks = re.split(r'\n\n+', content.strip())
    entries = []
    for b in blocks:
        lines = b.split('\n')
        if len(lines) >= 3:
            time_match = re.search(r'(\d+):(\d+):(\d+)[,\.](\d+)\s*-->\s*(\d+):(\d+):(\d+)[,\.](\d+)', lines[1])
            if time_match:
                h1, m1, s1, _ = map(int, time_match.groups()[:4])
                start_sec = h1 * 3600 + m1 * 60 + s1
                text = " ".join(lines[2:])
                entries.append((start_sec, text))
    return entries

for f in folders:
    f_path = os.path.join(BASE_DIR, f)
    info_files = glob.glob(os.path.join(f_path, "*.info.json"))
    srt_files = glob.glob(os.path.join(f_path, "*.srt"))
    if not info_files or not srt_files:
        continue
    
    with open(info_files[0], 'r', encoding='utf-8') as jf:
        info = json.load(jf)
    chapters = info.get("chapters", [])
    srt_entries = parse_srt(srt_files[0])
    
    chapter_text_file = os.path.join(f_path, "chapter_breakdown.md")
    with open(chapter_text_file, 'w', encoding='utf-8') as cf:
        cf.write(f"# {info.get('title')}\n\n")
        cf.write(f"**Duration**: {info.get('duration')}s\n\n")
        
        if not chapters:
            # Group into 2-minute chunks
            dur = int(info.get('duration', 300))
            for chunk_start in range(0, dur, 120):
                chunk_end = min(chunk_start + 120, dur)
                chunk_texts = [t for s, t in srt_entries if chunk_start <= s < chunk_end]
                cf.write(f"## Segment {chunk_start}s - {chunk_end}s\n\n")
                cf.write(" ".join(chunk_texts) + "\n\n")
        else:
            for idx, ch in enumerate(chapters):
                ch_start = int(ch.get('start_time', 0))
                ch_end = int(chapters[idx+1].get('start_time', info.get('duration', ch_start + 300))) if idx + 1 < len(chapters) else int(info.get('duration', ch_start + 300))
                ch_title = ch.get('title')
                
                ch_texts = [t for s, t in srt_entries if ch_start <= s < ch_end]
                # Deduplicate consecutive words/phrases
                deduped = []
                for t in ch_texts:
                    if not deduped or deduped[-1] != t:
                        deduped.append(t)
                
                cf.write(f"## [{ch_start}s - {ch_end}s] {ch_title}\n\n")
                cf.write(" ".join(deduped) + "\n\n")
                
    print(f"Generated chapter breakdown for {f}: {chapter_text_file}")
