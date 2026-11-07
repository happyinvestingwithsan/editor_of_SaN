"""
Unit tests for the Editorial Approval Gate and Post-Render Validator.
"""

import json
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.rough_cut.editorial_gate import (
    create_proposed_contract,
    approve_contract,
    verify_contract_approval,
    contract_to_kept_segments,
    compute_contract_hash,
    UnapprovedTranscriptError,
    ContractTamperedError
)
from src.rough_cut.validator import normalize_text


class TestEditorialApprovalGate(unittest.TestCase):

    def setUp(self):
        self.sample_blocks = [
            {
                "block_id": 1,
                "clip_index": 1,
                "label": "Hook Premise",
                "spoken_text": "A 52 week low for a stock does not mean the stock is cheap",
                "speech_range": {"start_seconds": 6.584, "end_seconds": 12.784},
                "clip_bounds": {"source_start_seconds": 6.800, "source_end_seconds": 19.500},
                "confidence": 0.98
            },
            {
                "block_id": 2,
                "clip_index": 1,
                "label": "Hook Continuation",
                "spoken_text": "very interesting. Like now in HDFC Bank, Reliance",
                "speech_range": {"start_seconds": 12.784, "end_seconds": 19.104},
                "clip_bounds": {"source_start_seconds": 6.800, "source_end_seconds": 19.500},
                "confidence": 0.98
            },
            {
                "block_id": 3,
                "clip_index": 2,
                "label": "Screen Walkthrough",
                "spoken_text": "In this tool, when a stock hits its 52 week low",
                "speech_range": {"start_seconds": 39.480, "end_seconds": 52.680},
                "clip_bounds": {"source_start_seconds": 39.633, "source_end_seconds": 53.000},
                "confidence": 0.95
            }
        ]

    def test_unapproved_contract_raises_error(self):
        """Unapproved contract must raise UnapprovedTranscriptError."""
        contract = create_proposed_contract(
            recording_id="Test_Video",
            source_video_path="input/test.mp4",
            total_duration_seconds=60.0,
            retained_blocks=self.sample_blocks
        )
        self.assertEqual(contract["approval_status"], "AWAITING_APPROVAL")
        with self.assertRaises(UnapprovedTranscriptError):
            verify_contract_approval(contract)

    def test_approve_contract_and_verify(self):
        """Approved contract must have valid hash and pass verification."""
        contract = create_proposed_contract(
            recording_id="Test_Video",
            source_video_path="input/test.mp4",
            total_duration_seconds=60.0,
            retained_blocks=self.sample_blocks
        )
        app_contract = approve_contract(contract, approved_by="TEST_USER", playback_speed_target=1.0)
        self.assertEqual(app_contract["approval_status"], "APPROVED")
        self.assertIsNotNone(app_contract["approval_metadata"]["contract_content_hash"])

        verified = verify_contract_approval(app_contract, expected_recording_id="Test_Video")
        self.assertEqual(verified["recording_id"], "Test_Video")

    def test_tampered_contract_invalidates_approval(self):
        """Modifying any timestamp or block after approval MUST raise ContractTamperedError."""
        contract = create_proposed_contract(
            recording_id="Test_Video",
            source_video_path="input/test.mp4",
            total_duration_seconds=60.0,
            retained_blocks=self.sample_blocks
        )
        app_contract = approve_contract(contract, approved_by="TEST_USER", playback_speed_target=1.0)

        # Tamper with a single timestamp
        app_contract["retained_blocks"][0]["clip_bounds"]["source_start_seconds"] = 6.999

        with self.assertRaises(ContractTamperedError):
            verify_contract_approval(app_contract)

    def test_contract_to_kept_segments_grouping(self):
        """Blocks sharing the same clip_index must be merged into a single timeline clip."""
        contract = create_proposed_contract(
            recording_id="Test_Video",
            source_video_path="input/test.mp4",
            total_duration_seconds=60.0,
            retained_blocks=self.sample_blocks
        )
        app_contract = approve_contract(contract)
        segments = contract_to_kept_segments(app_contract)

        # 3 blocks but only 2 clips because block 1 and 2 share clip_index 1
        self.assertEqual(len(segments), 2)
        self.assertEqual(segments[0]["clip_index"], 1)
        self.assertEqual(segments[0]["source_start"], 6.800)
        self.assertEqual(segments[0]["source_end"], 19.500)
        self.assertAlmostEqual(segments[0]["duration"], 12.700, places=3)
        self.assertEqual(segments[0]["draft_start"], 0.0)
        self.assertAlmostEqual(segments[0]["draft_end"], 12.700, places=3)

        self.assertEqual(segments[1]["clip_index"], 2)
        self.assertEqual(segments[1]["draft_start"], 12.700)

    def test_normalize_text(self):
        """Validator text normalization removes punctuation and excess whitespace."""
        self.assertEqual(
            normalize_text("  A 52-week low... does NOT mean!  "),
            "a 52 week low does not mean"
        )


if __name__ == "__main__":
    unittest.main()
