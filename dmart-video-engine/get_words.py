import whisper
import json

model = whisper.load_model("base")
result = model.transcribe("D:/AI Projects/Editor_of_SaN/dmart-video-engine/public/facecam_interval06.mp4", word_timestamps=True)

words_after_55 = []
for segment in result["segments"]:
    print(f"[{segment['start']:.2f}s -> {segment['end']:.2f}s] {segment['text']}")
    for w in segment.get("words", []):
        if w["start"] >= 55.0:
            words_after_55.append({
                "word": w["word"],
                "start": round(w["start"], 2),
                "end": round(w["end"], 2),
                "start_frame": int(w["start"] * 30),
                "end_frame": int(w["end"] * 30),
            })

with open("D:/AI Projects/Editor_of_SaN/dmart-video-engine/transcript_i6_end.json", "w") as f:
    json.dump(words_after_55, f, indent=2)

print(f"Dumped {len(words_after_55)} words after 55s.")
