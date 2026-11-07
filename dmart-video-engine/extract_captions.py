import json

with open("D:/AI Projects/Editor_of_SaN/work/Dmart_Project/interval_7_word_by_word.json", "r", encoding="utf-8") as f:
    data = json.load(f)

captions = []
for clip in data['clips']:
    if not clip['words']:
        continue
    c_start = clip['words'][0]['remotion_frame_start']
    c_end = clip['words'][-1]['remotion_frame_end']
    text = " ".join(w['word'] for w in clip['words'])
    words_list = []
    for w in clip['words']:
        words_list.append({
            "word": w['word'],
            "start": w['remotion_frame_start'],
            "end": w['remotion_frame_end']
        })
    captions.append({
        "clipIndex": clip['clip_index'],
        "start": c_start,
        "end": c_end,
        "text": text,
        "words": words_list
    })

with open("D:/AI Projects/Editor_of_SaN/dmart-video-engine/src/data_interval7_captions.json", "w", encoding="utf-8") as f:
    json.dump(captions, f, indent=2)

print(f"Extracted {len(captions)} caption clips")
