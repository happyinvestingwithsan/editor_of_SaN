import json

with open("D:/AI Projects/Editor_of_SaN/work/Dmart_Project/interval_7_word_by_word.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Total clips: {len(data['clips'])}")
for i, clip in enumerate(data['clips']):
    words = " ".join(w['word'] for w in clip['words'])
    f_start = clip['words'][0]['remotion_frame_start'] if clip['words'] else int(clip['rel_start'] * 30)
    f_end = clip['words'][-1]['remotion_frame_end'] if clip['words'] else int(clip['rel_end'] * 30)
    print(f"Clip {clip['clip_index']:3d} | Frames [{f_start:4d} - {f_end:4d}] ({clip['rel_start']:6.2f}s - {clip['rel_end']:6.2f}s): {words}")
