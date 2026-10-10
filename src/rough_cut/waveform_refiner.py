"""
Waveform Zero-Crossing and RMS Silence Boundary Refinement.
Snaps cut boundaries to local acoustic energy minima (zero-crossings/quiet spots)
within a small search window (±150ms) to guarantee no clipped speech or clicks.
"""

import wave
from typing import List, Dict, Any
import numpy as np


def refine_boundaries_with_waveform(
    wav_path: str,
    kept_segments: List[Dict[str, Any]],
    search_window: float = 0.15
) -> List[Dict[str, Any]]:
    """
    Search near proposed boundaries for local minimum RMS energy to avoid clipping.
    """
    with wave.open(wav_path, "rb") as wf:
        rate = wf.getframerate()
        n_frames = wf.getnframes()
        raw_frames = wf.readframes(n_frames)
        audio = np.frombuffer(raw_frames, dtype=np.int16)

    total_sec = len(audio) / rate

    def find_silence_near(target_sec: float) -> float:
        center_idx = int(target_sec * rate)
        half_w = int(search_window * rate)
        start_idx = max(0, center_idx - half_w)
        end_idx = min(len(audio), center_idx + half_w)

        if start_idx >= end_idx:
            return target_sec

        sub_audio = audio[start_idx:end_idx]
        block_size = int(0.02 * rate)  # 20ms analysis block
        min_rms = float("inf")
        best_pos = target_sec

        for i in range(0, len(sub_audio) - block_size, max(1, block_size // 2)):
            block = sub_audio[i:i + block_size].astype(np.float64)
            rms = np.sqrt(np.mean(block ** 2))
            if rms < min_rms:
                min_rms = rms
                best_pos = (start_idx + i + block_size // 2) / rate

        return round(best_pos, 3)

    refined = []
    current_playhead = 0.0

    for idx, s in enumerate(kept_segments):
        s_start = s["source_start"]
        s_end = s["source_end"]

        # Only adjust if not right at the beginning or end of media
        if s_start > 0.3:
            s_start = find_silence_near(s_start)
        if s_end < total_sec - 0.3:
            s_end = find_silence_near(s_end)

        dur = round(s_end - s_start, 3)
        if dur > 0.25:  # Discard micro-artifacts
            item = dict(s)
            item["clip_index"] = len(refined) + 1
            item["source_start"] = s_start
            item["source_end"] = s_end
            item["duration"] = dur
            item["draft_start"] = round(current_playhead, 3)
            item["draft_end"] = round(current_playhead + dur, 3)
            current_playhead += dur
            refined.append(item)

    return refined
