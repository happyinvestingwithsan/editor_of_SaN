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


if __name__ == "__main__":
    unittest.main()
