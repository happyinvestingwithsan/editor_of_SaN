"""
Waveform Zero-Crossing and RMS Silence Boundary Refinement.
Snaps cut boundaries to local acoustic energy minima (zero-crossings/quiet spots)
within a small search window (±100ms) with strict speech boundary protection:
NEVER allows refinement to move a boundary into a required spoken word.
"""

import wave
from typing import List, Dict, Any, Optional
import numpy as np


MIN_WORD_CLEARANCE = 0.05  # 50ms absolute clearance before first word / after last word


def refine_boundaries_with_waveform(
    wav_path: str,
    kept_segments: List[Dict[str, Any]],
    search_window: float = 0.10
) -> List[Dict[str, Any]]:
    """
    Search near proposed boundaries for local minimum RMS energy to avoid clicks and pops.
    Strictly constrained so boundaries NEVER encroach on spoken speech.
    """
    with wave.open(wav_path, "rb") as wf:
        rate = wf.getframerate()
        n_frames = wf.getnframes()
        raw_frames = wf.readframes(n_frames)
        audio = np.frombuffer(raw_frames, dtype=np.int16)

    total_sec = len(audio) / rate

    def find_silence_near(target_sec: float, min_allowed: float, max_allowed: float) -> float:
        center_idx = int(target_sec * rate)
        half_w = int(search_window * rate)
        start_idx = max(int(min_allowed * rate), center_idx - half_w)
        end_idx = min(int(max_allowed * rate), center_idx + half_w)

        if start_idx >= end_idx:
            return round(min(max(target_sec, min_allowed), max_allowed), 3)

        sub_audio = audio[start_idx:end_idx]
        block_size = int(0.015 * rate)  # 15ms analysis block
        min_rms = float("inf")
        best_pos = target_sec

        for i in range(0, len(sub_audio) - block_size, max(1, block_size // 2)):
            block = sub_audio[i:i + block_size].astype(np.float64)
            rms = np.sqrt(np.mean(block ** 2))
            if rms < min_rms:
                min_rms = rms
                best_pos = (start_idx + i + block_size // 2) / rate

        # Clamp strictly within safety bounds
        best_pos = max(min_allowed, min(max_allowed, best_pos))
        return round(best_pos, 3)

    refined = []
    current_playhead = 0.0

    for s in kept_segments:
        s_start = float(s["source_start"])
        s_end = float(s["source_end"])

        # Determine strict word boundaries if known
        speech_start = float(s.get("speech_start", s_start))
        speech_end = float(s.get("speech_end", s_end))

        # Start boundary safety bounds:
        # Cannot be earlier than 0.0, cannot be later than (speech_start - MIN_WORD_CLEARANCE)
        max_start = max(0.0, speech_start - MIN_WORD_CLEARANCE)
        min_start = max(0.0, s_start - search_window)
        if s_start > 0.3:
            s_start = find_silence_near(s_start, min_allowed=min_start, max_allowed=max_start)

        # End boundary safety bounds:
        # Cannot be earlier than (speech_end + MIN_WORD_CLEARANCE), cannot exceed total media duration
        min_end = min(total_sec, speech_end + MIN_WORD_CLEARANCE)
        max_end = min(total_sec, s_end + search_window)
        if s_end < total_sec - 0.3:
            s_end = find_silence_near(s_end, min_allowed=min_end, max_allowed=max_end)

        dur = round(s_end - s_start, 3)
        if dur > 0.25:
            item = dict(s)
            item["clip_index"] = len(refined) + 1
            item["source_start"] = s_start
            item["source_end"] = s_end
            item["duration"] = dur
            item["leading_handle"] = round(max(0.0, speech_start - s_start), 3)
            item["trailing_handle"] = round(max(0.0, s_end - speech_end), 3)
            item["draft_start"] = round(current_playhead, 3)
            item["draft_end"] = round(current_playhead + dur, 3)
            current_playhead += dur
            refined.append(item)

    return refined
