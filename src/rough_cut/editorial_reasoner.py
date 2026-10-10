"""
Editorial Reasoning Engine.
Applies editorial intelligence rules for Happy Investing stock market face-camera videos:
- Tighter but natural pacing (preserves breathing room and natural cadence).
- Removes false starts, aborted fragments, and repeated takes.
- Shortens excessive dead air (> 2.0s) to natural pauses (~0.5s) instead of hard abrupt cuts.
- Preserves intentional questions, emphasis, and context framing.
- Generates an immutable, traceable Edit Decision List (EDL).
"""

import json
from typing import List, Dict, Any, Tuple


NATURAL_BREATH_PAD = 0.25    # Audio padding around words to preserve breath and prevent clipping
TARGET_RESIDUAL_PAUSE = 0.50 # Residual silence duration left when shortening long dead air


def create_editorial_plan(
    transcript_data: Dict[str, Any],
    analysis_data: Dict[str, Any]
) -> Dict[str, Any]:
    """Generate candidate cuts and calculate kept segments."""
    total_duration = transcript_data.get("duration_seconds", 0.0)
    segments = transcript_data.get("segments", [])
    words = transcript_data.get("words", [])
    valid_words = [w for w in words if w.get("word", "").strip()]

    cuts = []

    # 1. Leading silence
    if analysis_data.get("leading_silence"):
        ls = analysis_data["leading_silence"]
        cut_end = max(0.0, ls["end"] - 0.35)
        if cut_end > 0.2:
            cuts.append({
                "action": "TRIM_START",
                "source_start": 0.0,
                "source_end": round(cut_end, 3),
                "duration": round(cut_end, 3),
                "reason": "Leading dead air before speaker begins",
                "category": "dead_air",
                "confidence": 0.99
            })

    # 2. Trailing silence
    if analysis_data.get("trailing_silence"):
        ts = analysis_data["trailing_silence"]
        cut_start = ts["start"] + 0.45
        if total_duration - cut_start > 0.3:
            cuts.append({
                "action": "TRIM_END",
                "source_start": round(cut_start, 3),
                "source_end": round(total_duration, 3),
                "duration": round(total_duration - cut_start, 3),
                "reason": "Trailing dead air after speaker finishes",
                "category": "dead_air",
                "confidence": 0.99
            })

    # 3. False starts and retakes
    # For segments flagged as false starts / replaced takes
    bad_segment_ids = set()
    for item in analysis_data.get("false_starts_and_retakes", []):
        bad_id = item.get("bad_segment_id")
        if bad_id is not None:
            bad_segment_ids.add(bad_id)
            # Find the segment
            seg = next((s for s in segments if s["id"] == bad_id), None)
            if seg:
                # Find preceding and following silence boundaries
                c_start = max(0.0, seg["start"] - 0.1)
                c_end = seg["end"] + 0.1
                cuts.append({
                    "action": "REMOVE_TAKE",
                    "source_start": round(c_start, 3),
                    "source_end": round(c_end, 3),
                    "duration": round(c_end - c_start, 3),
                    "reason": item.get("reason", "False start / aborted take"),
                    "category": item.get("type", "false_start"),
                    "confidence": 0.95,
                    "bad_text": seg.get("text", "")
                })

    # 4. Long pauses (> 2.0s) between valid kept speech
    for p in analysis_data.get("long_pauses", []):
        gap = p["duration"]
        if gap > 1.8:
            # Check if this pause is already inside a cut take
            p_mid = (p["start"] + p["end"]) / 2.0
            inside_cut = any(c["source_start"] <= p_mid <= c["source_end"] for c in cuts)
            if not inside_cut:
                trim_start = p["start"] + NATURAL_BREATH_PAD
                trim_end = p["end"] - (TARGET_RESIDUAL_PAUSE - NATURAL_BREATH_PAD)
                if trim_end - trim_start > 0.4:
                    cuts.append({
                        "action": "SHORTEN_PAUSE",
                        "source_start": round(trim_start, 3),
                        "source_end": round(trim_end, 3),
                        "duration": round(trim_end - trim_start, 3),
                        "reason": f"Shorten dead air ({gap:.2f}s) to natural {TARGET_RESIDUAL_PAUSE:.2f}s breath pause",
                        "category": "dead_air",
                        "confidence": 0.95
                    })

    # Sort cuts chronologically
    cuts.sort(key=lambda x: x["source_start"])

    # Merge overlapping or touching/close cuts (within 0.4s)
    merged_cuts = []
    for c in cuts:
        if not merged_cuts:
            merged_cuts.append(c)
        else:
            prev = merged_cuts[-1]
            if c["source_start"] <= prev["source_end"] + 0.40:
                # Close or overlapping: extend prev
                new_end = max(prev["source_end"], c["source_end"])
                prev["source_end"] = round(new_end, 3)
                prev["duration"] = round(new_end - prev["source_start"], 3)
                prev["reason"] = f"{prev['reason']} + {c['reason']}"
            else:
                merged_cuts.append(c)

    # Compute kept segments (the inverted complement of merged_cuts)
    raw_kept = []
    cursor = 0.0
    for idx, c in enumerate(merged_cuts):
        if c["source_start"] > cursor + 0.15:
            k_start = round(cursor, 3)
            k_end = round(c["source_start"], 3)
            dur = round(k_end - k_start, 3)
            if dur >= 0.6:  # Minimum usable kept clip
                span_words = [w["word"].strip() for w in valid_words if k_start <= w["start"] and w["end"] <= k_end]
                raw_kept.append({
                    "source_start": k_start,
                    "source_end": k_end,
                    "duration": dur,
                    "text_summary": " ".join(span_words[:12]) + ("..." if len(span_words) > 12 else "")
                })
        cursor = c["source_end"]

    # Trailing keep if any
    if cursor + 0.15 < total_duration:
        k_start = round(cursor, 3)
        k_end = round(total_duration, 3)
        dur = round(k_end - k_start, 3)
        if dur >= 0.6:
            span_words = [w["word"].strip() for w in valid_words if k_start <= w["start"] and w["end"] <= k_end]
            raw_kept.append({
                "source_start": k_start,
                "source_end": k_end,
                "duration": dur,
                "text_summary": " ".join(span_words[:12]) + ("..." if len(span_words) > 12 else "")
            })

    # Number clips and compute playhead
    kept_segments = []
    playhead = 0.0
    for idx, k in enumerate(raw_kept):
        k["clip_index"] = idx + 1
        k["draft_start"] = round(playhead, 3)
        k["draft_end"] = round(playhead + k["duration"], 3)
        playhead += k["duration"]
        kept_segments.append(k)

    edited_duration = round(playhead, 3)

    return {
        "raw_duration": round(total_duration, 3),
        "edited_duration": edited_duration,
        "removed_duration": round(total_duration - edited_duration, 3),
        "cut_percentage": round(((total_duration - edited_duration) / total_duration) * 100, 1) if total_duration else 0.0,
        "cuts": merged_cuts,
        "kept_segments": kept_segments
    }
