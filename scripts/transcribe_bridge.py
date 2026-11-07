import sys
import os
import json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.san_tools.transcribe import transcribe_and_align

audio_path = "dmart-video-engine/public/audio/esfb_bridge_audio.wav"
words_json = "dmart-video-engine/src/esfb_bridge_words.json"
blocks_json = "dmart-video-engine/src/esfb_bridge_blocks.json"

print(f"Transcribing {audio_path}...")
result = transcribe_and_align(
    audio_path=audio_path,
    output_words_json=words_json,
    output_blocks_json=blocks_json,
    model_size="base",
    fps=30
)

print(f"Transcription complete: {result['total_words']} words.")
print(f"Text: {result['text']}")
