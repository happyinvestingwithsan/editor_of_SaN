import os
import sys
import json
from faster_whisper import WhisperModel

audio_path = r"D:\QuickShare\Reliance\Out\Video - after adobe\1106.WAV"
out_dir = r"D:\AI Projects\Editor_of_SaN\work\happy_investing_reel_1106"

print("Loading small.en...")
model = WhisperModel("small.en", device="cpu", compute_type="int8")

print("Transcribing with beam_size=1...")
segments, info = model.transcribe(
    audio_path,
    beam_size=1,
    word_timestamps=True,
    language="en",
    vad_filter=True,
    vad_parameters=dict(min_silence_duration_ms=400),
)

words_list = []
segments_list = []
transcript_lines = []
fps = 30.0

for s_idx, seg in enumerate(segments):
    seg_data = {
        "id": s_idx,
        "start": round(seg.start, 3),
        "end": round(seg.end, 3),
        "startFrame": round(seg.start * fps),
        "endFrame": round(seg.end * fps),
        "text": seg.text.strip(),
        "words": []
    }
    
    line = f"[{seg.start:06.2f}s -> {seg.end:06.2f}s] (frames {round(seg.start * fps):05d}-{round(seg.end * fps):05d}) {seg.text.strip()}"
    transcript_lines.append(line)
    print(line, flush=True)
    
    if seg.words:
        for w in seg.words:
            w_obj = {
                "word": w.word.strip(),
                "start": round(w.start, 3),
                "end": round(w.end, 3),
                "startFrame": round(w.start * fps),
                "endFrame": round(w.end * fps),
                "probability": round(w.probability, 3)
            }
            words_list.append(w_obj)
            seg_data["words"].append(w_obj)
            
    segments_list.append(seg_data)

words_path = os.path.join(out_dir, "transcription_words_fast.json")
with open(words_path, "w", encoding="utf-8") as f:
    json.dump(words_list, f, indent=2, ensure_ascii=False)

segs_path = os.path.join(out_dir, "transcription_segments_fast.json")
with open(segs_path, "w", encoding="utf-8") as f:
    json.dump(segments_list, f, indent=2, ensure_ascii=False)

txt_path = os.path.join(out_dir, "transcript_fast.txt")
with open(txt_path, "w", encoding="utf-8") as f:
    f.write("\n".join(transcript_lines))

print(f"Done! {len(words_list)} words, {len(segments_list)} segments.", flush=True)
