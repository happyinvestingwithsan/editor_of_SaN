import json

words_file = r"D:\AI Projects\Editor_of_SaN\dmart-video-engine\src\happy_investing_1106_words.json"
with open(words_file, "r", encoding="utf-8") as f:
    words = json.load(f)

# Group words into clean 3-5 word subtitle chunks
chunks = []
current_chunk = []
MAX_WORDS_PER_CHUNK = 4

for w in words:
    current_chunk.append(w)
    
    # Check if we should split:
    # 1. Chunk reached max words
    # 2. Word ends with punctuation (., ?, !)
    # 3. Pause to next word is > 0.4s (12 frames)
    word_text = w["word"].strip()
    ends_sentence = word_text.endswith((".", "?", "!", ","))
    
    if len(current_chunk) >= MAX_WORDS_PER_CHUNK or (len(current_chunk) >= 2 and ends_sentence):
        start_frame = current_chunk[0]["startFrame"]
        end_frame = current_chunk[-1]["endFrame"]
        text = " ".join([item["word"] for item in current_chunk])
        
        chunks.append({
            "id": f"sub_{len(chunks)}",
            "start": start_frame,
            "end": end_frame + 4, # small cushion
            "text": text,
            "words": [
                {
                    "word": item["word"],
                    "startFrame": item["startFrame"],
                    "endFrame": item["endFrame"]
                }
                for item in current_chunk
            ]
        })
        current_chunk = []

if current_chunk:
    start_frame = current_chunk[0]["startFrame"]
    end_frame = current_chunk[-1]["endFrame"]
    text = " ".join([item["word"] for item in current_chunk])
    chunks.append({
        "id": f"sub_{len(chunks)}",
        "start": start_frame,
        "end": end_frame + 6,
        "text": text,
        "words": [
            {
                "word": item["word"],
                "startFrame": item["startFrame"],
                "endFrame": item["endFrame"]
            }
            for item in current_chunk
        ]
    })

out_path = r"D:\AI Projects\Editor_of_SaN\dmart-video-engine\src\happy_investing_1106_caption_blocks.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(chunks, f, indent=2)

print(f"Generated {len(chunks)} kinetic subtitle blocks at {out_path}")
