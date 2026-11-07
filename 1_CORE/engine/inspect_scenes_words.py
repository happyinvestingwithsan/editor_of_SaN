import json

with open("D:/AI Projects/Editor_of_SaN/work/Dmart_Project/interval_7_word_by_word.json", "r", encoding="utf-8") as f:
    data = json.load(f)

scenes = [
    ("Scene 1: Capital Allocation", 0, 723),
    ("Scene 2: PE Valuation & Initial Exposure", 723, 1956),
    ("Scene 3: Staged Downside Scenarios", 1956, 2438),
    ("Scene 4: Market-Cap Allocation", 2438, 3130),
    ("Scene 5: GTT Execution", 3130, 3804),
]

for name, s_frame, e_frame in scenes:
    print(f"\n==========================================")
    print(f"{name} (Frames {s_frame} - {e_frame})")
    print(f"==========================================")
    for clip in data['clips']:
        # check if clip intersects
        clip_words = clip['words']
        if not clip_words:
            continue
        c_start = clip_words[0]['remotion_frame_start']
        c_end = clip_words[-1]['remotion_frame_end']
        if c_end >= s_frame and c_start <= e_frame:
            words_str = " ".join(w['word'] for w in clip_words)
            print(f"  Clip {clip['clip_index']} [{c_start:4d} - {c_end:4d}] ({clip['rel_start']:5.2f}s - {clip['rel_end']:5.2f}s): {words_str}")
            # print notable words
            for w in clip_words:
                if any(k in w['word'].lower() for k in ['5', '10', '50', 'pe', '70', '65', '64', '63', '62', '1', '2', '3', 'gtt', 'small', 'mid', 'large', 'zero']):
                    print(f"      * '{w['word']}' at frame {w['remotion_frame_start']}-{w['remotion_frame_end']} ({w['rel_start']:.2f}s)")
