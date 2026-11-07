import json

with open("dmart-video-engine/src/equitas_screener2_words.json", "r", encoding="utf-8") as f:
    words = json.load(f)

print(f"Total words: {len(words)}")

# Group words into sentences based on punctuation or pauses
sentences = []
current_sentence = []

for i, w in enumerate(words):
    current_sentence.append(w)
    is_last = (i == len(words) - 1)
    word_text = w["word"]
    
    # Check pause to next word
    pause = 0
    if not is_last:
        next_w = words[i+1]
        pause = next_w["start"] - w["end"]
    
    if word_text.endswith((".", "?", "!")) or pause > 0.8 or is_last:
        text = " ".join([x["word"] for x in current_sentence])
        start_f = current_sentence[0]["startFrame"]
        end_f = current_sentence[-1]["endFrame"]
        start_s = current_sentence[0]["start"]
        end_s = current_sentence[-1]["end"]
        sentences.append({
            "text": text,
            "startFrame": start_f,
            "endFrame": end_f,
            "start_s": start_s,
            "end_s": end_s,
            "words": current_sentence
        })
        current_sentence = []

for idx, s in enumerate(sentences):
    print(f"[{idx+1:02d}] {s['startFrame']:4d} - {s['endFrame']:4d} ({s['start_s']:5.2f}s - {s['end_s']:5.2f}s): {s['text']}")
