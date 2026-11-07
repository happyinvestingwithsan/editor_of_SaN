import json

with open('dmart-video-engine/src/esfb_bridge_words.json', 'r', encoding='utf-8') as f:
    words = json.load(f)

print(f"Total words: {len(words)}")

# Print sentence blocks / segments
# Let's see blocks
with open('dmart-video-engine/src/esfb_bridge_blocks.json', 'r', encoding='utf-8') as f:
    blocks = json.load(f)

for b in blocks:
    print(f"[{b['start']} - {b['end']}] {b['text']}")
