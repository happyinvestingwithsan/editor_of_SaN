"""
Transcription and acoustic silence detection pipeline.
Uses faster-whisper on CUDA with word-level timestamps and acoustic silence detection.
"""

import json
import os
import re
import subprocess
import wave
from typing import Dict, Any, List

import numpy as np

from .env_helper import setup_cuda_env

setup_cuda_env()


def detect_acoustic_silences(
    wav_path: str,
    min_duration: float = 0.4,
    noise_db: str = "-30dB"
) -> List[Dict[str, float]]:
    """Detect silences using ffmpeg silencedetect filter."""
    cmd = [
        "ffmpeg", "-y", "-i", wav_path,
        "-af", f"silencedetect=noise={noise_db}:d={min_duration}",
        "-f", "null", "-"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    silences = []
    cur_start = None

    for line in res.stderr.splitlines():
        if "silence_start:" in line:
            m = re.search(r"silence_start:\s*([0-9.]+)", line)
            if m:
                cur_start = float(m.group(1))
        elif "silence_end:" in line and cur_start is not None:
            m = re.search(r"silence_end:\s*([0-9.]+)\s*\|\s*silence_duration:\s*([0-9.]+)", line)
            if m:
                silences.append({
                    "start": round(cur_start, 3),
                    "end": round(float(m.group(1)), 3),
                    "duration": round(float(m.group(2)), 3)
                })
                cur_start = None

    return silences


def transcribe_audio(
    wav_path: str,
    output_json_path: str = None,
    model_size: str = "small",
    device: str = "cuda",
    compute_type: str = "float16",
    use_vad_refinement: bool = True
) -> Dict[str, Any]:
    """Transcribe audio with word-level timestamps using faster-whisper."""
    from faster_whisper import WhisperModel
    from faster_whisper.vad import get_speech_timestamps, VadOptions

    # Fallback to cpu/int8 if CUDA is not available or fails
    try:
        model = WhisperModel(model_size, device=device, compute_type=compute_type)
    except Exception as e:
        print(f"[!] Warning: CUDA initialization failed ({e}), falling back to CPU.")
        model = WhisperModel(model_size, device="cpu", compute_type="int8")
        device = "cpu"
        compute_type = "int8"

    segments_gen, info = model.transcribe(
        wav_path,
        word_timestamps=True,
        vad_filter=False
    )
    base_segs = list(segments_gen)

    with wave.open(wav_path, "rb") as w:
        sr = w.getframerate()
        raw_frames = w.readframes(w.getnframes())
        audio_np = np.frombuffer(raw_frames, dtype=np.int16).astype(np.float32) / 32768.0

    refined_segments = []
    all_words = []
    seg_id = 0

    if use_vad_refinement:
        vad_opts = VadOptions(min_silence_duration_ms=200, speech_pad_ms=50, threshold=0.5)
        speech_ts = get_speech_timestamps(audio_np, vad_opts)

        for s in base_segs:
            bursts = [
                b for b in speech_ts
                if (b["start"] / sr >= s.start - 0.15 and b["end"] / sr <= s.end + 0.15)
            ]

            has_internal_pause = False
            for j in range(len(bursts) - 1):
                if (bursts[j + 1]["start"] - bursts[j]["end"]) / sr >= 0.25:
                    has_internal_pause = True
                    break

            if has_internal_pause and len(bursts) > 1:
                clusters = []
                cur_cluster = [bursts[0]]
                for j in range(len(bursts) - 1):
                    gap = (bursts[j + 1]["start"] - bursts[j]["end"]) / sr
                    if gap >= 0.25:
                        clusters.append(cur_cluster)
                        cur_cluster = [bursts[j + 1]]
                    else:
                        cur_cluster.append(bursts[j + 1])
                clusters.append(cur_cluster)

                for c in clusters:
                    c_start_s = c[0]["start"] / sr
                    c_end_s = c[-1]["end"] / sr
                    c_chunk = audio_np[c[0]["start"]:c[-1]["end"]]
                    sub_segs, _ = model.transcribe(
                        c_chunk,
                        language=info.language,
                        word_timestamps=True,
                        beam_size=1
                    )
                    for sub_s in sub_segs:
                        words = [
                            {
                                "word": w.word,
                                "start": round(c_start_s + w.start, 3),
                                "end": round(c_start_s + w.end, 3),
                                "prob": round(w.probability, 3)
                            }
                            for w in (sub_s.words or [])
                        ]
                        all_words.extend(words)
                        refined_segments.append({
                            "id": seg_id,
                            "start": round(c_start_s + sub_s.start, 3),
                            "end": round(c_start_s + sub_s.end, 3),
                            "text": sub_s.text.strip(),
                            "words": words
                        })
                        seg_id += 1
                continue

            words = [
                {
                    "word": w.word,
                    "start": round(w.start, 3),
                    "end": round(w.end, 3),
                    "prob": round(w.probability, 3)
                }
                for w in (s.words or [])
            ]
            all_words.extend(words)
            refined_segments.append({
                "id": seg_id,
                "start": round(s.start, 3),
                "end": round(s.end, 3),
                "text": s.text.strip(),
                "words": words
            })
            seg_id += 1
    else:
        for s in base_segs:
            words = [
                {
                    "word": w.word,
                    "start": round(w.start, 3),
                    "end": round(w.end, 3),
                    "prob": round(w.probability, 3)
                }
                for w in (s.words or [])
            ]
            all_words.extend(words)
            refined_segments.append({
                "id": seg_id,
                "start": round(s.start, 3),
                "end": round(s.end, 3),
                "text": s.text.strip(),
                "words": words
            })
            seg_id += 1

    acoustic_silences = detect_acoustic_silences(wav_path, min_duration=0.4)

    transcript_data = {
        "audio_path": os.path.abspath(wav_path),
        "duration_seconds": round(info.duration, 3),
        "language": info.language,
        "language_probability": round(info.language_probability, 4),
        "device": device,
        "compute_type": compute_type,
        "model_size": model_size,
        "segments": refined_segments,
        "words": all_words,
        "acoustic_silences": acoustic_silences
    }

    if output_json_path:
        os.makedirs(os.path.dirname(os.path.abspath(output_json_path)), exist_ok=True)
        with open(output_json_path, "w", encoding="utf-8") as f:
            json.dump(transcript_data, f, indent=2, ensure_ascii=False)

    return transcript_data
