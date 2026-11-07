import json

with open("dmart-video-engine/src/esfb_outro_words.json", "r", encoding="utf-8") as f:
    words = json.load(f)

print(f"Total words: {len(words)}")

# Print sentence chunks by punctuation or breath
current_sentence = []
for w in words:
    current_sentence.append(w)
    if any(p in w["word"] for p in [".", "?", "!"]):
        start_f = current_sentence[0]["startFrame"]
        end_f = current_sentence[-1]["endFrame"]
        start_s = current_sentence[0]["start"]
        end_s = current_sentence[-1]["end"]
        text = " ".join(x["word"] for x in current_sentence)
        print(f"[{start_f:4d} - {end_f:4d}] ({start_s:6.2f}s - {end_s:6.2f}s): {text}")
        current_sentence = []

if current_sentence:
    start_f = current_sentence[0]["startFrame"]
    end_f = current_sentence[-1]["endFrame"]
    text = " ".join(x["word"] for x in current_sentence)
    print(f"[{start_f:4d} - {end_f:4d}]: {text}")
