import json

with open("reliance_phase1/transcription_segments.json", "r", encoding="utf-8") as f:
    segs = json.load(f)

for i, s in enumerate(segs):
    print(f"{i:02d}: [{s['start']:06.2f}s -> {s['end']:06.2f}s] (F:{s['startFrame']:4d}-{s['endFrame']:4d}) {s['text']}")
