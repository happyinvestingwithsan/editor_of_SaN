import json

data = json.load(open('D:/AI Projects/Editor_of_SaN/work/Jio_Mega_IPO_Project/long_form_8min/intermediate/master_full_transcript.json'))

print("=== TAKE 3 TRANSCRIPT SEGMENTS IN MASTER VIDEO ===")
for i, s in enumerate(data['segments']):
    st, et = s['start'], s['end']
    text = s['text']
    if st >= 205.0 and et <= 302.0:
        print(f"\n[{st:7.3f}s -> {et:7.3f}s] (Dur: {et-st:5.2f}s) Segment #{i}")
        print(f"  Text: {text.strip()}")
        words = s.get('words', [])
        word_strs = [f"{w['word']}({w['start']:.2f}-{w['end']:.2f})" for w in words]
        print(f"  Words: {' '.join(word_strs)}")
