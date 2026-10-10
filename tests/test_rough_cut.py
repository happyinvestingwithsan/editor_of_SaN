"""
Unit and integration tests for the Rough Cut Pilot modules.
"""

import json
import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.rough_cut.analyzer import clean_token, find_repetitions_and_false_starts, analyze_transcript
from src.rough_cut.editorial_reasoner import create_editorial_plan
from src.rough_cut.edl_reporter import format_tc, generate_edl_report
from src.rough_cut.capcut_builder import get_capcut_draft_root, find_template_dir


class TestRoughCutModules(unittest.TestCase):

    def test_clean_token(self):
        self.assertEqual(clean_token("  Hello, World!  "), "hello world")
        self.assertEqual(clean_token("52-week"), "52week")

    def test_format_tc(self):
        self.assertEqual(format_tc(0.0), "00:00.00")
        self.assertEqual(format_tc(65.5), "01:05.50")
        self.assertEqual(format_tc(225.12), "03:45.12")

    def test_false_start_detection(self):
        segments = [
            {
                "id": 0,
                "start": 1.87,
                "end": 2.96,
                "text": "A 52 week",
                "words": [
                    {"word": "A", "start": 1.87, "end": 2.01},
                    {"word": "52", "start": 2.01, "end": 2.29},
                    {"word": "week", "start": 2.29, "end": 2.69}
                ]
            },
            {
                "id": 1,
                "start": 6.73,
                "end": 10.74,
                "text": "A 52 week low for a stock does not mean the stock is cheap.",
                "words": [
                    {"word": "A", "start": 6.73, "end": 6.83},
                    {"word": "52", "start": 6.83, "end": 7.09},
                    {"word": "week", "start": 7.09, "end": 7.45},
                    {"word": "low", "start": 7.45, "end": 7.87},
                    {"word": "for", "start": 7.87, "end": 8.25},
                    {"word": "a", "start": 8.25, "end": 8.40},
                    {"word": "stock", "start": 8.40, "end": 8.80}
                ]
            }
        ]

        detections = find_repetitions_and_false_starts(segments)
        self.assertEqual(len(detections), 1)
        self.assertEqual(detections[0]["type"], "false_start")
        self.assertEqual(detections[0]["bad_segment_id"], 0)
        self.assertEqual(detections[0]["kept_segment_id"], 1)

    def test_editorial_plan_creation(self):
        transcript_data = {
            "duration_seconds": 30.0,
            "segments": [
                {"id": 0, "start": 2.0, "end": 3.0, "text": "Take one"},
                {"id": 1, "start": 6.0, "end": 12.0, "text": "Take one is the real sentence that we speak here."},
                {"id": 2, "start": 20.0, "end": 28.0, "text": "Ending sentence of this video recording."}
            ],
            "words": [
                {"word": "Take", "start": 2.0, "end": 2.5},
                {"word": "one", "start": 2.5, "end": 3.0},
                {"word": "Take", "start": 6.0, "end": 6.5},
                {"word": "one", "start": 6.5, "end": 7.0},
                {"word": "is", "start": 7.0, "end": 7.3},
                {"word": "the", "start": 7.3, "end": 7.5},
                {"word": "real", "start": 7.5, "end": 8.0},
                {"word": "sentence", "start": 8.0, "end": 9.0},
                {"word": "Ending", "start": 20.0, "end": 20.5},
                {"word": "sentence", "start": 20.5, "end": 21.0},
                {"word": "recording", "start": 27.0, "end": 28.0}
            ]
        }
        analysis = analyze_transcript(transcript_data)
        plan = create_editorial_plan(transcript_data, analysis)

        self.assertGreater(plan["raw_duration"], plan["edited_duration"])
        self.assertGreater(len(plan["cuts"]), 0)
        self.assertGreater(len(plan["kept_segments"]), 0)

    def test_capcut_draft_paths(self):
        draft_root = get_capcut_draft_root()
        self.assertTrue(os.path.exists(draft_root), f"Draft root should exist: {draft_root}")
        template_dir = find_template_dir(draft_root)
        self.assertTrue(os.path.exists(template_dir), f"Template dir should exist: {template_dir}")
        self.assertTrue(os.path.exists(os.path.join(template_dir, "draft_content.json")))


    def test_phrase_preservation_regression(self):
        """Regression test: Ensure 'but it can tell you something' is never cut as dead air."""
        words = [
            {"word": "cheap", "start": 10.27, "end": 10.61},
            {"word": "but", "start": 11.19, "end": 11.45},
            {"word": "it", "start": 11.45, "end": 11.91},
            {"word": "can", "start": 11.91, "end": 12.07},
            {"word": "tell", "start": 12.07, "end": 12.23},
            {"word": "you", "start": 12.23, "end": 12.37},
            {"word": "something", "start": 12.37, "end": 12.79},
            {"word": "very", "start": 12.79, "end": 13.27},
            {"word": "interesting", "start": 13.27, "end": 13.77}
        ]
        segments = [
            {
                "id": 0,
                "start": 6.58,
                "end": 12.79,
                "text": "A 52 week low for a stock does not mean the stock is cheap, but it can tell you something",
                "words": words[:7]
            },
            {
                "id": 1,
                "start": 12.79,
                "end": 19.10,
                "text": "very interesting. Like now in HDFC Bank, Reliance and few more stocks which I will discuss.",
                "words": words[7:]
            }
        ]
        transcript_data = {
            "duration_seconds": 25.0,
            "segments": segments,
            "words": words,
            "acoustic_silences": []
        }
        analysis = analyze_transcript(transcript_data)
        plan = create_editorial_plan(transcript_data, analysis)

        # Assert no cut overlaps ANY part of 'but it can tell you something' (10.61 to 13.77)
        for cut in plan["cuts"]:
            self.assertFalse(
                11.0 <= cut["source_start"] <= 13.0 or 11.0 <= cut["source_end"] <= 13.0,
                f"Cut {cut} unlawfully cuts through the preserved phrase!"
            )

        # Assert phrase is completely inside a kept segment
        kept = plan["kept_segments"]
        phrase_kept = any(
            k["source_start"] <= 11.19 and k["source_end"] >= 12.79
            for k in kept
        )
        self.assertTrue(phrase_kept, "Preserved phrase 'but it can tell you something' must be inside a kept segment!")

    def test_pause_cut_rejected_if_overlapping_words(self):
        """Ensure candidate pause cut is rejected if it collides with spoken words."""
        transcript_data = {
            "duration_seconds": 20.0,
            "segments": [
                {"id": 0, "start": 2.0, "end": 5.0, "text": "First sentence.", "words": [{"word": "First", "start": 2.0, "end": 3.0}, {"word": "sentence", "start": 3.0, "end": 5.0}]},
                {"id": 1, "start": 8.0, "end": 12.0, "text": "Second sentence.", "words": [{"word": "Second", "start": 8.0, "end": 9.0}, {"word": "sentence", "start": 9.0, "end": 12.0}]}
            ],
            "words": [
                {"word": "First", "start": 2.0, "end": 3.0},
                {"word": "sentence", "start": 3.0, "end": 5.0},
                # Soft spoken word in the middle of what an imperfect transcript might think is silence
                {"word": "quietly", "start": 6.0, "end": 6.8},
                {"word": "Second", "start": 8.0, "end": 9.0},
                {"word": "sentence", "start": 9.0, "end": 12.0}
            ],
            "acoustic_silences": []
        }
        # Fake an analysis claiming a long pause from 5.0 to 8.0
        analysis = {
            "leading_silence": None,
            "trailing_silence": None,
            "long_pauses": [
                {"start": 5.0, "end": 8.0, "duration": 3.0, "before_word": "sentence", "after_word": "Second", "acoustic_verified": False}
            ],
            "false_starts_and_retakes": []
        }
        plan = create_editorial_plan(transcript_data, analysis)

        # Because 'quietly' is at 6.0 - 6.8, cutting 5.25 - 7.75 would clip it.
        # Validation must reject cutting through 'quietly'!
        for cut in plan["cuts"]:
            if cut["action"] == "SHORTEN_PAUSE":
                self.assertFalse(
                    cut["source_start"] <= 6.0 and cut["source_end"] >= 6.8,
                    "Validation must reject any pause cut that clips spoken word 'quietly'!"
                )

    def test_repetition_safety_flags_uncertain_retakes(self):
        """Ensure distant retakes with unique content are flagged as uncertain for review."""
        segments = [
            {"id": 0, "start": 10.0, "end": 20.0, "text": "I am currently watching five stocks with great dividend yield and high margins."},
            {"id": 1, "start": 22.0, "end": 30.0, "text": "Some completely different topic explaining inflation."},
            {"id": 2, "start": 32.0, "end": 40.0, "text": "Another topic explaining interest rates."},
            {"id": 3, "start": 42.0, "end": 50.0, "text": "A fourth topic explaining valuation metrics."},
            {"id": 4, "start": 52.0, "end": 60.0, "text": "A fifth topic explaining cash flows."},
            {"id": 5, "start": 62.0, "end": 70.0, "text": "A sixth topic explaining debt levels."},
            {"id": 6, "start": 72.0, "end": 85.0, "text": "I am currently watching five stocks including HDFC and Reliance for long term growth."}
        ]
        detections = find_repetitions_and_false_starts(segments)
        self.assertGreater(len(detections), 0)
        distant_detection = next((d for d in detections if d.get("bad_segment_id") == 0), None)
        self.assertIsNotNone(distant_detection)
        # Distant retake without stumble markers must be flagged as uncertain
        self.assertTrue(distant_detection.get("uncertain"), "Distant retake without stumble marker must be flagged uncertain")


if __name__ == "__main__":
    unittest.main()
