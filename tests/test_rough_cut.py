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
from src.rough_cut.preview_generator import build_filter_script, generate_audio_preview, generate_video_preview, measure_preview_sync
from src.rough_cut.waveform_refiner import refine_boundaries_with_waveform


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

    def test_preview_filter_script_fades_and_boundaries(self):
        """Phase 1 test: Boundary fades only added when handles exist, never on speech."""
        segments_with_handles = [
            {
                "source_start": 10.0,
                "source_end": 15.0,
                "speech_start": 10.20,  # 200ms handle before speech
                "speech_end": 14.80,    # 200ms handle after speech
            }
        ]
        script_with = build_filter_script(segments_with_handles, scale_height=720, include_video=True)
        self.assertIn("afade=t=in", script_with)
        self.assertIn("afade=t=out", script_with)
        self.assertIn("setpts=PTS-STARTPTS", script_with)
        self.assertIn("asetpts=PTS-STARTPTS", script_with)
        self.assertIn("trim=start=10.000:end=15.000", script_with)

        # Segments with tight boundaries (no handles): MUST NOT fade speech away
        segments_without_handles = [
            {
                "source_start": 10.0,
                "source_end": 15.0,
                "speech_start": 10.01,  # Only 10ms cushion - must NOT fade
                "speech_end": 14.99,    # Only 10ms cushion - must NOT fade
            }
        ]
        script_without = build_filter_script(segments_without_handles, scale_height=720, include_video=True)
        self.assertNotIn("afade=t=in", script_without)
        self.assertNotIn("afade=t=out", script_without)

    def test_preview_sync_and_duration_regression(self):
        """Phase 1 test: Verify expected vs actual duration and multi-point A/V sync."""
        fixture_path = r"D:\AI Projects\Video_Editing\input\Test_v10.mp4"
        if not os.path.exists(fixture_path):
            self.skipTest(f"Fixture video not found: {fixture_path}")

        test_out = os.path.abspath("work/test_preview_sync.mp4")
        segments = [
            {"source_start": 6.58, "source_end": 8.58, "duration": 2.00, "speech_start": 6.68, "speech_end": 8.48},
            {"source_start": 27.80, "source_end": 29.80, "duration": 2.00, "speech_start": 27.90, "speech_end": 29.70}
        ]
        expected_duration = 4.00

        try:
            generate_video_preview(fixture_path, segments, test_out, scale_height=360, fps=30)
            self.assertTrue(os.path.exists(test_out), "Preview MP4 should be generated")

            sync_metrics = measure_preview_sync(test_out, check_points_s=[1.0, 2.0, 3.0])
            self.assertTrue(sync_metrics["nominal_sync_ok"], f"A/V duration drift exceeded tolerance: {sync_metrics['duration_drift_ms']}ms")
            self.assertTrue(sync_metrics["multi_point_sync_ok"], "A/V desync detected at one or more check points across preview")
            self.assertTrue(sync_metrics["is_synchronized"], "Preview should be fully synchronized")
            self.assertAlmostEqual(sync_metrics["video_duration_s"], expected_duration, delta=0.08)
            self.assertAlmostEqual(sync_metrics["audio_duration_s"], expected_duration, delta=0.08)
        finally:
            if os.path.exists(test_out):
                try:
                    os.remove(test_out)
                except Exception:
                    pass

    def test_clipped_consonants_waveform_safety(self):
        """Phase 3 test: Boundary refinement CANNOT move into a spoken word (e.g. initial 'In')."""
        import tempfile
        import wave
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tf:
            wav_path = tf.name

        try:
            with wave.open(wav_path, "wb") as wf:
                wf.setnchannels(1)
                wf.setsampwidth(2)
                wf.setframerate(16000)
                # 4 seconds total
                wf.writeframes(bytearray(16000 * 4 * 2))

            # Segment where spoken word starts at 1.00s and ends at 2.50s
            # Proposed boundary is 0.85s (150ms cushion)
            kept = [{
                "clip_index": 1,
                "source_start": 0.85,
                "source_end": 2.65,
                "speech_start": 1.00,
                "speech_end": 2.50,
                "duration": 1.80
            }]
            refined = refine_boundaries_with_waveform(wav_path, kept, search_window=0.15)
            # Refined start MUST be <= speech_start - 0.05 (strictly before speech onset)
            self.assertLessEqual(
                refined[0]["source_start"], 0.95,
                "Waveform refinement must never encroach on speech onset (protects initial consonants)!"
            )
            # Refined end MUST be >= speech_end + 0.05 (strictly after speech offset)
            self.assertGreaterEqual(
                refined[0]["source_end"], 2.55,
                "Waveform refinement must never encroach on speech offset!"
            )
        finally:
            if os.path.exists(wav_path):
                os.remove(wav_path)

    def test_missing_initial_words_protection(self):
        """Phase 3 test: Valid speech onsets have breath cushions and are never cut."""
        transcript_path = "work/HappyInvesting_Test_v10/HappyInvesting_Test_v10_transcript.json"
        if not os.path.exists(transcript_path):
            self.skipTest("Reference transcript not found")

        with open(transcript_path, "r", encoding="utf-8") as f:
            transcript_data = json.load(f)

        analysis = analyze_transcript(transcript_data)
        plan = create_editorial_plan(transcript_data, analysis)

        # Segment containing 'In this tool, when a stock hits its 52 week low...'
        # Speech onset for 'In' is 39.48s
        framework_clip = next((k for k in plan["kept_segments"] if "when a stock hits" in k["text_summary"]), None)
        self.assertIsNotNone(framework_clip, "Framework clip must be kept")
        self.assertLessEqual(
            framework_clip["source_start"], 39.45,
            "Framework clip must retain breath cushion before 'In this tool' onset (no clipped word)!"
        )

    def test_orphan_clauses_elimination(self):
        """Phase 3 test: Broken orphan clauses (e.g. 'and using the same framework and I have explained the...') do not survive."""
        transcript_path = "work/HappyInvesting_Test_v10/HappyInvesting_Test_v10_transcript.json"
        if not os.path.exists(transcript_path):
            self.skipTest("Reference transcript not found")

        with open(transcript_path, "r", encoding="utf-8") as f:
            transcript_data = json.load(f)

        analysis = analyze_transcript(transcript_data)
        plan = create_editorial_plan(transcript_data, analysis)

        # Assert no kept segment contains the broken clause at 80.65s - 84.51s
        for k in plan["kept_segments"]:
            self.assertFalse(
                k["source_start"] <= 81.0 and k["source_end"] >= 84.0,
                f"Broken orphan clause surviving in kept clip {k}!"
            )

    def test_natural_pause_preservation(self):
        """Phase 3 test: Conversational pauses within valid continuous thought blocks are protected."""
        transcript_path = "work/HappyInvesting_Test_v10/HappyInvesting_Test_v10_transcript.json"
        if not os.path.exists(transcript_path):
            self.skipTest("Reference transcript not found")

        with open(transcript_path, "r", encoding="utf-8") as f:
            transcript_data = json.load(f)

        analysis = analyze_transcript(transcript_data)
        plan = create_editorial_plan(transcript_data, analysis)

        # Framework core runs from ~39.48 to ~74.80s continuously
        # Pauses at 45.86-46.30 (0.44s) and 52.68-53.10 (0.42s) MUST NOT be cut
        for cut in plan["cuts"]:
            self.assertFalse(
                45.0 <= cut["source_start"] <= 74.0 and cut["action"] == "SHORTEN_PAUSE",
                f"Natural conversational pause inside framework unlawfully cut: {cut}"
            )

    def test_no_incorrect_joining_of_abandoned_takes(self):
        """Phase 3 test: Multiple precursor takes (Takes 1-3) are excised as a single macro cut, not stitched together."""
        transcript_path = "work/HappyInvesting_Test_v10/HappyInvesting_Test_v10_transcript.json"
        if not os.path.exists(transcript_path):
            self.skipTest("Reference transcript not found")

        with open(transcript_path, "r", encoding="utf-8") as f:
            transcript_data = json.load(f)

        analysis = analyze_transcript(transcript_data)
        plan = create_editorial_plan(transcript_data, analysis)

        # Assert that the entire interval from ~75.0s to ~173.5s is removed in a macro cut
        pitch_cut = next((c for c in plan["cuts"] if c["action"] == "REMOVE_SUPERSEDED_TAKES"), None)
        self.assertIsNotNone(pitch_cut, "Precursor pitch takes must be removed in a single macro cut")
        self.assertGreater(pitch_cut["duration"], 80.0, "Precursor pitch cut should span >80s of failed rehearsals")


if __name__ == "__main__":
    unittest.main()
