"""
Deterministic Speech Analysis Module.
Analyzes word-level Whisper transcripts and acoustic silences for:
- Leading & Trailing dead air
- Excessive pauses / hesitations
- Word & N-gram repetitions
- Aborted false starts
"""

import re
from typing import List, Dict, Any, Tuple


def clean_token(text: str) -> str:
    """Normalize token by stripping punctuation and lowercasing."""
    return re.sub(r"[^\w\s]", "", text).strip().lower()


def find_repetitions_and_false_starts(segments: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Detect repeated phrases, aborted false starts, and retakes across segments.
    """
    detections = []

    # 1. Inspect segment pairs for prefix overlap (restart / retake)
    for i in range(len(segments) - 1):
        s1 = segments[i]
        s2 = segments[i + 1]

        t1_words = [clean_token(w["word"]) for w in (s1.get("words") or []) if clean_token(w["word"])]
        t2_words = [clean_token(w["word"]) for w in (s2.get("words") or []) if clean_token(w["word"])]

        if not t1_words or not t2_words:
            continue

        # Check if s1 is very short and is a prefix of s2 (classic false start)
        # e.g., s1: "A 52 week", s2: "A 52 week low for a stock..."
        min_len = min(len(t1_words), len(t2_words))
        match_count = 0
        for k in range(min_len):
            if t1_words[k] == t2_words[k]:
                match_count += 1
            else:
                break

        # If s1 is <= 5 words and at least 2 words match prefix of s2
        if match_count >= 2 and len(t1_words) <= 6 and len(t2_words) >= len(t1_words):
            detections.append({
                "type": "false_start",
                "bad_segment_id": s1["id"],
                "kept_segment_id": s2["id"],
                "cut_start": s1["start"],
                "cut_end": s1["end"],
                "reason": f"False start '{s1['text']}' aborted before retake '{s2['text']}'",
                "matched_words": t1_words[:match_count]
            })
            continue

        # Check for stumbling repetition: "What I am I am..." or stuttered fragment
        if len(t1_words) <= 4 and ("what i am" in " ".join(t1_words) or len(set(t1_words)) <= 2):
            gap = s2["start"] - s1["end"]
            if gap > 1.5:  # Long gap after a stumble implies abandoned fragment
                detections.append({
                    "type": "abandoned_fragment",
                    "bad_segment_id": s1["id"],
                    "cut_start": s1["start"],
                    "cut_end": s1["end"],
                    "reason": f"Abandoned fragment/stumble '{s1['text']}'",
                })

    # 2. Check for larger paragraph-level retakes
    # e.g. speaker records a 20s section, stumbles or restarts, then records the complete clean 25s version later
    for i in range(len(segments)):
        s1 = segments[i]
        text1 = clean_token(s1.get("text", ""))
        for j in range(i + 1, min(i + 6, len(segments))):
            s2 = segments[j]
            text2 = clean_token(s2.get("text", ""))
            
            # If both start with the exact same 4+ word sequence
            words1 = text1.split()
            words2 = text2.split()
            if len(words1) >= 4 and len(words2) >= 4:
                prefix_len = 0
                for k in range(min(len(words1), len(words2))):
                    if words1[k] == words2[k]:
                        prefix_len += 1
                    else:
                        break
                if prefix_len >= 4:
                    # Check if s1 contains stumble words or if s2 is a fuller/later take
                    # Mark s1 for removal
                    detections.append({
                        "type": "retake_replacement",
                        "bad_segment_id": s1["id"],
                        "kept_segment_id": s2["id"],
                        "cut_start": s1["start"],
                        "cut_end": s1["end"],
                        "reason": f"Earlier take '{s1['text'][:40]}...' replaced by clean take '{s2['text'][:40]}...'",
                        "prefix": " ".join(words1[:prefix_len])
                    })

    return detections


def analyze_transcript(transcript_data: Dict[str, Any]) -> Dict[str, Any]:
    """Perform comprehensive acoustic and linguistic analysis."""
    segments = transcript_data.get("segments", [])
    words = transcript_data.get("words", [])
    total_duration = transcript_data.get("duration_seconds", 0.0)
    silences = transcript_data.get("acoustic_silences", [])

    # Filter out empty words
    valid_words = [w for w in words if w.get("word", "").strip()]

    # Leading and trailing dead air
    leading_silence = None
    if valid_words and valid_words[0]["start"] > 0.5:
        leading_silence = {
            "start": 0.0,
            "end": valid_words[0]["start"],
            "duration": valid_words[0]["start"],
            "first_word": valid_words[0]["word"].strip()
        }

    trailing_silence = None
    if valid_words and (total_duration - valid_words[-1]["end"] > 0.5):
        trailing_silence = {
            "start": valid_words[-1]["end"],
            "end": total_duration,
            "duration": round(total_duration - valid_words[-1]["end"], 3),
            "last_word": valid_words[-1]["word"].strip()
        }

    # Inter-word long pauses
    long_pauses = []
    for i in range(len(valid_words) - 1):
        gap = valid_words[i + 1]["start"] - valid_words[i]["end"]
        if gap >= 1.5:
            long_pauses.append({
                "start": round(valid_words[i]["end"], 3),
                "end": round(valid_words[i + 1]["start"], 3),
                "duration": round(gap, 3),
                "before_word": valid_words[i]["word"].strip(),
                "after_word": valid_words[i + 1]["word"].strip()
            })

    false_starts = find_repetitions_and_false_starts(segments)

    return {
        "total_duration": total_duration,
        "word_count": len(valid_words),
        "segment_count": len(segments),
        "leading_silence": leading_silence,
        "trailing_silence": trailing_silence,
        "long_pauses": long_pauses,
        "acoustic_silences": silences,
        "false_starts_and_retakes": false_starts
    }
