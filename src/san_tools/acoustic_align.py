"""
SaN Video Pipeline - Acoustic Snapping & Silence Excision Module
Codifies the Jio Masterclass Calibration:
1. True Acoustic Snapping: Snaps in-points to true acoustic speech energy onset
   (RMS > 1,000) minus strictly 40-50ms (never blindly subtract 135ms).
2. Internal Silence Splitting (The Max 1.0s Rule): Detects internal pauses where
   RMS < 400 for > 1.0s and splits the clip to eliminate dead air.
"""

import math
import wave
import numpy as np
from typing import List, Dict, Tuple


def calculate_rms_profile(wav_path: str, hop_ms: float = 10.0) -> Tuple[np.ndarray, int]:
    """Calculate the RMS audio energy profile over small time windows."""
    with wave.open(wav_path, "rb") as wf:
        n_channels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        rate = wf.getframerate()
        n_frames = wf.getnframes()
        raw_bytes = wf.readframes(n_frames)

    if sampwidth == 2:
        dtype = np.int16
    elif sampwidth == 4:
        dtype = np.int32
    else:
        raise ValueError(f"Unsupported sample width: {sampwidth}")

    samples = np.frombuffer(raw_bytes, dtype=dtype)
    if n_channels > 1:
        samples = samples.reshape(-1, n_channels).mean(axis=1)

    window_size = int(rate * (hop_ms / 1000.0))
    n_windows = len(samples) // window_size

    rms_values = np.zeros(n_windows)
    for i in range(n_windows):
        chunk = samples[i * window_size:(i + 1) * window_size]
        rms_values[i] = np.sqrt(np.mean(chunk.astype(np.float64) ** 2))

    return rms_values, rate


def find_acoustic_onset(
    rms_profile: np.ndarray,
    search_start_sec: float,
    hop_ms: float = 10.0,
    rms_threshold: float = 1000.0,
    pre_roll_ms: float = 45.0,
) -> float:
    """
    Find true speech energy onset (RMS > threshold) and back up by strictly pre_roll_ms.
    Eliminates awkward mouth-breathing dead air while protecting opening plosives.
    """
    start_idx = max(0, int((search_start_sec * 1000.0) / hop_ms))
    for i in range(start_idx, len(rms_profile)):
        if rms_profile[i] >= rms_threshold:
            onset_sec = (i * hop_ms) / 1000.0
            return max(0.0, onset_sec - (pre_roll_ms / 1000.0))

    return search_start_sec


def scan_internal_silences(
    rms_profile: np.ndarray,
    clip_start_sec: float,
    clip_end_sec: float,
    hop_ms: float = 10.0,
    silence_threshold_rms: float = 400.0,
    min_silence_sec: float = 1.0,
) -> List[Dict[str, float]]:
    """
    Detect pauses within a take where RMS < silence_threshold for > min_silence_sec.
    Returns list of silence intervals to be excised.
    """
    start_idx = int((clip_start_sec * 1000.0) / hop_ms)
    end_idx = min(len(rms_profile), int((clip_end_sec * 1000.0) / hop_ms))

    silences = []
    in_silence = False
    silence_start_idx = 0

    for i in range(start_idx, end_idx):
        val = rms_profile[i]
        if val < silence_threshold_rms and not in_silence:
            in_silence = True
            silence_start_idx = i
        elif val >= silence_threshold_rms and in_silence:
            in_silence = False
            duration_sec = ((i - silence_start_idx) * hop_ms) / 1000.0
            if duration_sec >= min_silence_sec:
                silences.append({
                    "start": round((silence_start_idx * hop_ms) / 1000.0, 3),
                    "end": round((i * hop_ms) / 1000.0, 3),
                    "duration": round(duration_sec, 3),
                })

    if in_silence:
        duration_sec = ((end_idx - silence_start_idx) * hop_ms) / 1000.0
        if duration_sec >= min_silence_sec:
            silences.append({
                "start": round((silence_start_idx * hop_ms) / 1000.0, 3),
                "end": round((end_idx * hop_ms) / 1000.0, 3),
                "duration": round(duration_sec, 3),
            })

    return silences
