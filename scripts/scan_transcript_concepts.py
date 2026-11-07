import os
import glob
import re

BASE_DIR = os.path.join("work", "mosidd_study")
folders = sorted([d for d in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, d))])

KEYWORDS = [
    "prompt", "claude code", "skill", "agent",
    "spring", "interpolate", "sequence", "series", "d3", "topojson", "map",
    "chart", "bar chart", "parliament", "timeline", "reel", "collage",
    "posterize", "paper", "texture", "sound", "foley", "elevenlabs"
]

for f in folders:
    f_path = os.path.join(BASE_DIR, f)
    txt_path = os.path.join(f_path, "full_transcript.txt")
    if not os.path.exists(txt_path):
        continue
    with open(txt_path, 'r', encoding='utf-8') as tf:
        text = tf.read()
    
    print(f"\n==========================================")
    print(f"ANALYSIS: {f}")
    
    # Extract sentences with keywords
    sentences = re.split(r'(?<=[.!?]) +', text)
    found_concepts = {}
    for kw in KEYWORDS:
        matches = [s for s in sentences if kw in s.lower()]
        if matches:
            found_concepts[kw] = matches[:2] # top 2 quotes
            
    print(f"Key Concepts matched: {list(found_concepts.keys())}")
    for kw, quotes in found_concepts.items():
        print(f"\n--- [{kw.upper()}] ({len(quotes)} samples) ---")
        for q in quotes:
            print(f"  > {q.strip()[:180]}...")
