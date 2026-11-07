import os
import sys
import json
import torch

from faster_whisper import WhisperModel

audio_path = r"D:\AI Projects\Editor_of_SaN\reliance_phase1\master_audio.wav"
out_dir = r"D:\AI Projects\Editor_of_SaN\reliance_phase1"

device = "cuda" if torch.cuda.is_available() else "cpu"
compute_type = "float16" if device == "cuda" else "int8"
print(f"Device: {device}, compute_type: {compute_type}")

# We use medium or small model for great accuracy and speed
model_size = "medium"
print(f"Loading Faster-Whisper ({model_size})...")
try:
    model = WhisperModel(model_size, device=device, compute_type=compute_type)
except Exception as e:
    print(f"Failed with {model_size}, falling back to base: {e}")
    model = WhisperModel("base", device=device, compute_type=compute_type)

print("Transcribing audio...")
segments, info = model.transcribe(
    audio_path,
    beam_size=5,
    word_timestamps=True,
    language="en",
    vad_filter=True,
    vad_parameters=dict(min_silence_duration_ms=500),
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
    
    line = f"[{seg.start:06.2f}s -> {seg.end:06.2f}s] {seg.text.strip()}"
    transcript_lines.append(line)
    
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

# Save transcription_words.json
words_path = os.path.join(out_dir, "transcription_words.json")
with open(words_path, "w", encoding="utf-8") as f:
    json.dump(words_list, f, indent=2, ensure_ascii=False)
print(f"Saved {len(words_list)} words to {words_path}")

# Save transcription_segments.json
segs_path = os.path.join(out_dir, "transcription_segments.json")
with open(segs_path, "w", encoding="utf-8") as f:
    json.dump(segments_list, f, indent=2, ensure_ascii=False)
print(f"Saved {len(segments_list)} segments to {segs_path}")

# Save transcript.txt
txt_path = os.path.join(out_dir, "transcript.txt")
with open(txt_path, "w", encoding="utf-8") as f:
    f.write("\n".join(transcript_lines))
print(f"Saved human-readable transcript to {txt_path}")

print("Done transcription!")
