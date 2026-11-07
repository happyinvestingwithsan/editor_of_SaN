import json
import os

words_in = r"D:\AI Projects\Editor_of_SaN\work\happy_investing_reel_1106\transcription_words_fast.json"
segs_in = r"D:\AI Projects\Editor_of_SaN\work\happy_investing_reel_1106\transcription_segments_fast.json"

with open(words_in, "r", encoding="utf-8") as f:
    words = json.load(f)

with open(segs_in, "r", encoding="utf-8") as f:
    segs = json.load(f)

# Acoustic phonetic corrections for financial terms
replacements = {
    "FIA": "FII",
    "fia": "FII",
    "FIA's": "FIIs",
    "FIAs": "FIIs",
    "DRI": "Greed",
    "US-born": "US bond",
    "input bill": "import bill",
    "number 5th": "November 5th",
    "FIA stock": "fear stopped",
}

for w in words:
    raw = w["word"].strip()
    if raw in replacements:
        w["word"] = replacements[raw]
    elif raw.upper() == "FIA":
        w["word"] = "FII"

for s in segs:
    text = s["text"]
    for k, v in replacements.items():
        text = text.replace(k, v)
    text = text.replace("FIA", "FII")
    s["text"] = text
    for w in s.get("words", []):
        raw = w["word"].strip()
        if raw in replacements:
            w["word"] = replacements[raw]
        elif raw.upper() == "FIA":
            w["word"] = "FII"

out_words_dest = r"D:\AI Projects\Editor_of_SaN\dmart-video-engine\src\happy_investing_1106_words.json"
with open(out_words_dest, "w", encoding="utf-8") as f:
    json.dump(words, f, indent=2)

out_segs_dest = r"D:\AI Projects\Editor_of_SaN\dmart-video-engine\src\happy_investing_1106_segments.json"
with open(out_segs_dest, "w", encoding="utf-8") as f:
    json.dump(segs, f, indent=2)

print(f"Normalized {len(words)} words and {len(segs)} segments written to dmart-video-engine/src/")
