"""
Editorial Approval Gate & Contract Enforcement Engine.
Enforces the strict approval barrier defined in REUSABLE_TRANSCRIPT_APPROVAL_WORKFLOW_PROPOSAL.md:
- Pre-edit review and contract serialization
- Cryptographic SHA-256 contract hash binding
- Rejection of unapproved, pending, or modified transcript contracts
- Deterministic extraction of verified kept segments and EDL
"""

import hashlib
import json
import os
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional

from .edl_reporter import generate_edl_report, format_tc


class UnapprovedTranscriptError(Exception):
    """Raised when an unapproved transcript contract is supplied to EDL generation or rendering."""
    pass


class ContractTamperedError(UnapprovedTranscriptError):
    """Raised when an approved transcript contract has been altered after approval."""
    pass


def compute_contract_hash(contract_data: Dict[str, Any]) -> str:
    """
    Compute deterministic SHA-256 hash of the canonical contract content.
    Includes recording_id, source_file, and retained_blocks.
    """
    canonical_payload = {
        "recording_id": contract_data.get("recording_id"),
        "source_file": contract_data.get("source_file"),
        "retained_blocks": contract_data.get("retained_blocks", [])
    }
    canonical_json = json.dumps(canonical_payload, sort_keys=True, separators=(',', ':'))
    return hashlib.sha256(canonical_json.encode("utf-8")).hexdigest()


def create_proposed_contract(
    recording_id: str,
    source_video_path: str,
    total_duration_seconds: float,
    retained_blocks: List[Dict[str, Any]],
    rejected_ranges: Optional[List[Dict[str, Any]]] = None,
    review_version: str = "V2.2"
) -> Dict[str, Any]:
    """Create a new proposed contract in AWAITING_APPROVAL state."""
    return {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "contract_version": "1.0.0",
        "recording_id": recording_id,
        "source_file": {
            "path": source_video_path,
            "filename": os.path.basename(source_video_path),
            "total_duration_seconds": round(total_duration_seconds, 3)
        },
        "review_version": review_version,
        "approval_status": "AWAITING_APPROVAL",
        "approval_metadata": None,
        "retained_blocks": retained_blocks,
        "rejected_ranges": rejected_ranges or [],
        "summary_metrics": {
            "total_blocks": len(retained_blocks)
        }
    }


def approve_contract(
    contract_data: Dict[str, Any],
    approved_by: str = "USER",
    playback_speed_target: float = 1.0
) -> Dict[str, Any]:
    """
    Freeze and approve contract data, calculating the cryptographic content hash.
    Returns the updated contract dict.
    """
    contract_data["approval_status"] = "APPROVED"
    # Compute content hash before injecting approval metadata
    content_hash = compute_contract_hash(contract_data)

    contract_data["approval_metadata"] = {
        "approved_by": approved_by,
        "approved_at": datetime.now(timezone.utc).isoformat(),
        "contract_content_hash": content_hash,
        "playback_speed_target": playback_speed_target
    }
    return contract_data


def verify_contract_approval(
    contract_or_path: Any,
    expected_recording_id: Optional[str] = None
) -> Dict[str, Any]:
    """
    Verify that a transcript contract is formally approved and untampered.
    Raises UnapprovedTranscriptError or ContractTamperedError if invalid.
    """
    if isinstance(contract_or_path, str):
        if not os.path.exists(contract_or_path):
            raise FileNotFoundError(f"Transcript contract not found: {contract_or_path}")
        with open(contract_or_path, "r", encoding="utf-8") as f:
            contract_data = json.load(f)
    elif isinstance(contract_or_path, dict):
        contract_data = contract_or_path
    else:
        raise TypeError(f"Expected file path or dict, got {type(contract_or_path)}")

    status = contract_data.get("approval_status")
    if status != "APPROVED":
        raise UnapprovedTranscriptError(
            f"Transcript contract for '{contract_data.get('recording_id')}' is in state '{status}', not APPROVED. "
            f"EDL generation and rendering are strictly frozen until explicit approval."
        )

    metadata = contract_data.get("approval_metadata")
    if not metadata or not metadata.get("contract_content_hash"):
        raise UnapprovedTranscriptError(
            f"Transcript contract for '{contract_data.get('recording_id')}' lacks approval metadata or content hash."
        )

    expected_hash = metadata.get("contract_content_hash")
    actual_hash = compute_contract_hash(contract_data)
    if actual_hash != expected_hash:
        raise ContractTamperedError(
            f"Editorial contract content has been modified since approval! "
            f"Approved hash: {expected_hash} | Current computed hash: {actual_hash}. "
            f"Approval is invalidated."
        )

    if expected_recording_id and contract_data.get("recording_id") != expected_recording_id:
        raise ValueError(
            f"Contract recording_id '{contract_data.get('recording_id')}' does not match expected '{expected_recording_id}'"
        )

    return contract_data


def contract_to_kept_segments(contract_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Deterministically convert approved retained blocks into chronological kept segments.
    Groups contiguous blocks sharing identical clip_index / clip_bounds.
    """
    retained_blocks = contract_data.get("retained_blocks", [])
    if not retained_blocks:
        raise ValueError("Contract contains zero retained blocks.")

    # Group by clip_index if present, or group contiguous clip bounds
    clip_map: Dict[int, Dict[str, Any]] = {}
    next_clip_idx = 1

    for block in retained_blocks:
        clip_idx = block.get("clip_index")
        bounds = block.get("clip_bounds", {})
        s_start = float(bounds.get("source_start_seconds", bounds.get("source_start", 0.0)))
        s_end = float(bounds.get("source_end_seconds", bounds.get("source_end", 0.0)))

        sp_range = block.get("speech_range", {})
        sp_start = float(sp_range.get("start_seconds", sp_range.get("start", s_start)))
        sp_end = float(sp_range.get("end_seconds", sp_range.get("end", s_end)))

        spoken_text = block.get("spoken_text", "").strip()

        if clip_idx is None:
            # Check if abuts previous
            if clip_map and abs(clip_map[next_clip_idx - 1]["source_end"] - s_start) < 0.001:
                clip_idx = next_clip_idx - 1
            else:
                clip_idx = next_clip_idx
                next_clip_idx += 1

        if clip_idx not in clip_map:
            clip_map[clip_idx] = {
                "clip_index": clip_idx,
                "source_start": s_start,
                "source_end": s_end,
                "speech_start": sp_start,
                "speech_end": sp_end,
                "texts": [spoken_text] if spoken_text else [],
                "blocks": [block.get("block_id", len(clip_map) + 1)]
            }
        else:
            entry = clip_map[clip_idx]
            entry["source_start"] = min(entry["source_start"], s_start)
            entry["source_end"] = max(entry["source_end"], s_end)
            entry["speech_start"] = min(entry["speech_start"], sp_start)
            entry["speech_end"] = max(entry["speech_end"], sp_end)
            if spoken_text:
                entry["texts"].append(spoken_text)
            entry["blocks"].append(block.get("block_id"))

    # Convert to sorted list and assign timeline playhead
    sorted_clips = sorted(clip_map.values(), key=lambda c: c["source_start"])
    playhead = 0.0
    result = []

    for idx, c in enumerate(sorted_clips):
        c_idx = idx + 1
        dur = round(c["source_end"] - c["source_start"], 3)
        lead_h = round(max(0.0, c["speech_start"] - c["source_start"]), 3)
        trail_h = round(max(0.0, c["source_end"] - c["speech_end"]), 3)
        full_text = " ".join(c["texts"])
        text_summary = full_text[:60] + ("..." if len(full_text) > 60 else "")

        seg = {
            "clip_index": c_idx,
            "source_start": round(c["source_start"], 3),
            "source_end": round(c["source_end"], 3),
            "duration": dur,
            "speech_start": round(c["speech_start"], 3),
            "speech_end": round(c["speech_end"], 3),
            "leading_handle": lead_h,
            "trailing_handle": trail_h,
            "draft_start": round(playhead, 3),
            "draft_end": round(playhead + dur, 3),
            "text_summary": text_summary,
            "retained_blocks": c["blocks"]
        }
        playhead += dur
        result.append(seg)

    return result


def generate_edl_from_approved_contract(
    contract_data: Dict[str, Any],
    output_dir: str
) -> Dict[str, str]:
    """
    Generate EDL JSON and Markdown reports strictly from verified contract.
    """
    # Verify contract
    verified = verify_contract_approval(contract_data)
    project_name = verified.get("recording_id", "project")
    total_dur = verified.get("source_file", {}).get("total_duration_seconds", 0.0)

    kept_segments = contract_to_kept_segments(verified)
    edited_duration = round(sum(s["duration"] for s in kept_segments), 3)
    removed_duration = round(total_dur - edited_duration, 3)

    # Derive cut intervals
    cuts = []
    cursor = 0.0
    for s in kept_segments:
        if s["source_start"] > cursor + 0.01:
            c_start = round(cursor, 3)
            c_end = round(s["source_start"], 3)
            cuts.append({
                "action": "REMOVE_INTERVAL",
                "source_start": c_start,
                "source_end": c_end,
                "duration": round(c_end - c_start, 3),
                "reason": "Excised per approved editorial contract",
                "category": "contract_excised",
                "confidence": 1.00,
                "review_required": False
            })
        cursor = s["source_end"]

    if total_dur > cursor + 0.01:
        c_start = round(cursor, 3)
        c_end = round(total_dur, 3)
        cuts.append({
            "action": "TRIM_END",
            "source_start": c_start,
            "source_end": c_end,
            "duration": round(c_end - c_start, 3),
            "reason": "Trailing silence/dead air after final sign-off",
            "category": "dead_air",
            "confidence": 1.00,
            "review_required": False
        })

    # Prepare editorial decisions list from contract blocks
    editorial_decisions = []
    for b in verified.get("retained_blocks", []):
        editorial_decisions.append({
            "thought_block": f"Block {b.get('block_id', 0):02d}: {b.get('label', '')}",
            "candidate_takes": "Documented in Review V2.2",
            "selected_take": b.get("spoken_text", "")[:50],
            "rejected_source_ranges": "Excised",
            "reason": f"Approved contract block {b.get('block_id')}",
            "confidence": b.get("confidence", 1.00),
            "review_required": False
        })

    plan = {
        "raw_duration": total_dur,
        "edited_duration": edited_duration,
        "removed_duration": removed_duration,
        "cut_percentage": round((removed_duration / total_dur) * 100, 1) if total_dur else 0.0,
        "editorial_decisions": editorial_decisions,
        "cuts": cuts,
        "kept_segments": kept_segments,
        "contract_hash": verified.get("approval_metadata", {}).get("contract_content_hash")
    }

    return generate_edl_report(plan, output_dir, project_name)
