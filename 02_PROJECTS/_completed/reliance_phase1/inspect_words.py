import json

with open("reliance_phase1/transcription_words.json", encoding="utf-8") as f:
    words = json.load(f)

print(f"Total words: {len(words)}")

def find_phrase(target):
    target_lower = target.lower().split()
    for i in range(len(words) - len(target_lower) + 1):
        match = True
        for j, tw in enumerate(target_lower):
            w = words[i+j]["word"].lower().strip(".,!?")
            if tw not in w:
                match = False
                break
        if match:
            return words[i], words[i+len(target_lower)-1]
    return None, None

queries = [
    "surged almost",
    "largest companies",
    "one level deeper",
    "interesting contradiction",
    "global war",
    "52-week low",
    "oil to chemical",
    "temporary",
    "almost 12",
    "before discussing",
    "take you back",
    "1,152",
    "questioning",
    "refining margin",
    "why",
    "entire business",
    "october 30",
    "3.6",
    "62,409",
    "29,550",
    "not contribute equally"
]

for q in queries:
    start_w, end_w = find_phrase(q)
    if start_w and end_w:
        print(f"{q:25} -> start_frame={start_w['startFrame']:5} ({start_w['start']:6.2f}s) | end_frame={end_w['endFrame']:5} ({end_w['end']:6.2f}s)")
    else:
        print(f"{q:25} -> NOT FOUND")
