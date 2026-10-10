# Workstream 1: Happy Investing Face-Camera Rough-Cut Pilot Report

## 1. Executive Summary

This pilot established a production-grade, deterministic and traceable rough-cut automation pipeline for **Happy Investing face-camera stock-market educational videos**, adapting and replacing the faceless-video architecture previously seeded in the repository.

The pipeline was tested on an authentic raw 4K face-camera recording of SaN explaining the 52-week low investment framework (`Test_v10.mp4`). It successfully transcribed the spoken words with word-level timestamps, identified false starts, stumbling fragments, and dead air pauses, refined cut boundaries using acoustic zero-crossings, and produced an editable dual-timeline CapCut project registered at Index 0 in CapCut Desktop.

---

## 2. Test Recording and Duration Metrics

- **Recording File:** `D:\AI Projects\Video_Editing\input\Test_v10.mp4`
- **Footage Specifications:** 3840x2160 (4K UHD), 30.0 fps H.264, 48kHz Stereo AAC
- **Original Raw Duration:** `03:45.11` (225.11 seconds)
- **Rough-Cut Edited Duration:** `02:39.23` (159.23 seconds)
- **Total Duration Removed:** `01:05.88` (65.88 seconds)
- **Trimming Efficiency:** **29.3% dead air and false takes removed**
- **Clips Retained in Master Timeline:** 9 clips
- **Editorial Cuts Executed:** 10 cuts
- **Original Source Integrity:** Verified 100% unchanged (`1,357,659,451 bytes`, mtime `2026-08-31 20:36:22`)

---

## 3. Files Reused and Changed

### Existing Faceless Architecture Inspected:
- `capcut-editing-automation/capcut-editing-automation/scripts/`:
  - `align_vo.py`: Inspected. Used for TTS voiceover alignment to script text; unsuitable for raw camera speech editing.
  - `analyze_audio.py` & `common.py`: Reused concepts for audio decoding, ffmpeg runner, and loudness calculations.
  - `build_capcut.py`: Inspected. Built for image zoom keyframes and stickman captions. Replaced with video-track dual-timeline builder.
  - `install_to_project.py`: Reused safe backup and verification patterns.

### New Modules Implemented in `src/rough_cut/`:
1. `src/rough_cut/env_helper.py`: Automates Windows CUDA / cuBLAS DLL discovery for Python 3.13 CTranslate2.
2. `src/rough_cut/audio_extractor.py`: Deterministic ffprobe video metadata extraction and 16kHz mono WAV extraction.
3. `src/rough_cut/transcriber.py`: Runs GPU-accelerated `faster-whisper` (`small` float16) with word-level timestamps, VAD burst refinement, and ffmpeg acoustic silence detection (`-af silencedetect`).
4. `src/rough_cut/analyzer.py`: Identifies leading/trailing dead air, inter-word hesitations (> 1.8s), n-gram repeated phrases, and aborted sentence starts.
5. `src/rough_cut/editorial_reasoner.py`: Shapes detections into high-confidence editorial decisions. Shortens dead air pauses to natural ~0.50s breathing breaks (leaving 0.25s padding on speech boundaries) and eliminates false starts while preserving intentional delivery.
6. `src/rough_cut/waveform_refiner.py`: Local RMS energy minimum / zero-crossing boundary refinement (±150ms window) to prevent clipped consonants or audio pops.
7. `src/rough_cut/capcut_builder.py`: Constructs a clean, native dual-timeline Windows CapCut project draft with automatic backups and promotes the draft to Index 0 of `root_meta_info.json`.
8. `src/rough_cut/preview_generator.py`: Fast-renders stitched preview audio (`.wav`) and 720p preview video (`.mp4`) using FFmpeg concat demuxer for deterministic review.
9. `src/rough_cut/edl_reporter.py`: Produces structured Markdown and JSON Edit Decision Lists (EDL).

### CLI Runner and Tests:
- `scripts/run_rough_cut.py`: End-to-end command line orchestrator.
- `tests/test_rough_cut.py`: Unit and regression test suite (5 passing tests).

---

## 4. Commands and Dependencies Used

### Environment:
- **Operating System:** Windows 11
- **Python Version:** 3.13.5 (64-bit)
- **FFmpeg Version:** 8.1-full_build (with CUDA/NVDEC/whisper support)
- **CapCut Desktop:** Version 8.7.0.3685
- **PyPI Dependencies:** `faster-whisper 1.2.1`, `ctranslate2 4.7.1`, `torch 2.11.0`, `torchaudio 2.11.0`, `numpy 2.3.4`, `scipy 1.17.1`

### Execution Command:
```bash
python scripts/run_rough_cut.py --video "D:\AI Projects\Video_Editing\input\Test_v10.mp4" --name "HappyInvesting_Test_v10" --out-dir "work"
```

---

## 5. Sections Removed and Editorial Rationale

| Cut # | Raw Source Timecode | Duration | Action | Category | Reason |
| :--- | :------------------ | :------- | :----- | :------- | :----- |
| **#01** | `00:00.00 - 00:06.48` | 6.48s | `TRIM_START` | `dead_air` + `false_start` | Removed leading room tone dead air AND initial aborted false start *"A 52 week"*, cutting directly into the clean retake *"A 52 week low for a stock does not mean the stock is cheap."* |
| **#02** | `00:10.76 - 00:12.51` | 1.75s | `SHORTEN_PAUSE` | `dead_air` | Shortened hesitation (2.25s) to a comfortable 0.50s breathing pause before *"very interesting like now in HDFC Bank..."* |
| **#03** | `00:22.22 - 00:27.80` | 5.58s | `REMOVE_TAKE` | `abandoned_fragment` | Removed stumbling fragment *"Companies."* and surrounding dead air hesitation (5.33s) before the clear retake *"I tracked 23 large cap stocks using a simple 52 week high-low framework in this tool."* |
| **#04** | `00:34.66 - 00:39.38` | 4.72s | `SHORTEN_PAUSE` | `dead_air` | Shortened dead air (5.22s) before tool walkthrough explanation. |
| **#05** | `02:01.49 - 02:16.28` | 14.79s | `SHORTEN_PAUSE` | `dead_air` | Trimmed 15.29s of silence/freeze while speaker was looking at notes or transitioning. |
| **#06** | `02:24.71 - 02:26.87` | 2.16s | `SHORTEN_PAUSE` | `dead_air` | Shortened dead air pause between call-to-action clauses. |
| **#07** | `02:31.45 - 02:52.97` | 21.52s | `REMOVE_TAKE` | `retake_replacement` | Removed multiple false starts and stumbles (*"I am currently watching 5 stocks which I have explained..."*) and trimmed dead air pauses, retaining the polished, comprehensive retake (*"I am currently watching 5 stocks including HDFC and Reliance..."*). |
| **#08** | `03:19.27 - 03:25.57` | 6.30s | `SHORTEN_PAUSE` | `dead_air` | Shortened dead air hesitation before outro instructions. |
| **#09** | `03:34.11 - 03:35.59` | 1.48s | `SHORTEN_PAUSE` | `dead_air` | Shortened pause before concluding CTA (*"For your reference I will attach the link in the bio."*). |
| **#10** | `03:43.83 - 03:45.11` | 1.28s | `TRIM_END` | `dead_air` | Trimmed trailing dead air after final sign-off (*"Happy investing."*). |

---

## 6. Master Timeline Playhead <---> Raw Source Mapping

| Clip # | CapCut Draft Playhead | Raw Source Range | Duration | Spoken Content Summary |
| :--- | :-------------------- | :--------------- | :------- | :--------------------- |
| **#01** | `00:00.00 - 00:04.33` | `00:06.55 - 00:10.88` | 4.33s | *"A 52 week low for a stock does not mean the stock is cheap."* |
| **#02** | `00:04.33 - 00:14.01` | `00:12.53 - 00:22.21` | 9.68s | *"very interesting like now in HDFC Bank, Lens and few more stocks which I will discuss."* |
| **#03** | `00:14.01 - 00:20.84` | `00:27.78 - 00:34.61` | 6.83s | *"I tracked 23 large cap stocks using a simple 52 week high-low framework in this tool."* |
| **#04** | `00:20.84 - 01:42.85` | `00:39.34 - 02:01.35` | 82.01s | *"In this tool hits its 52 week low, I don't go on immediately buy them. First I check..."* |
| **#05** | `01:42.85 - 01:51.29` | `02:16.40 - 02:24.84` | 8.44s | *"what you have to do? to climb this tool. to watch the full video on the YouTube..."* |
| **#06** | `01:51.29 - 01:55.92` | `02:26.90 - 02:31.53` | 4.63s | *"where I have explained step by step how you can go and climb it."* |
| **#07** | `01:55.92 - 02:22.38` | `02:52.94 - 03:19.40` | 26.46s | *"I am currently watching 5 stocks including HDFC and Reliance and 3 more stocks..."* |
| **#08** | `02:22.38 - 02:30.91` | `03:25.57 - 03:34.10` | 8.53s | *"for the full video just go to the YouTube channel and find the latest video."* |
| **#09** | `02:30.91 - 02:39.23` | `03:35.59 - 03:43.91` | 8.32s | *"For your reference I will attach the link in the bio. See you in the next one. Happy investing."* |

---

## 7. CapCut Compatibility Findings

1. **Format Validation:** Verified that installed CapCut Desktop (v8.7.0.3685 on Windows) uses plain UTF-8 JSON (`draft_content.json`, `draft_meta_info.json`, `project.json`). No encryption was encountered.
2. **Dual-Timeline Architecture:** The builder successfully created:
   - **Tab 1:** `V3 Master Edit (2m 39s)` with 9 video clips mapped cleanly on Track 0.
   - **Tab 2:** `Raw Footage (3m 45s)` with the full unedited video for 1-click editorial reference.
3. **Safety Backups:** Before creating/overwriting any draft, existing drafts and `root_meta_info.json` are automatically copied to timestamped `.bak` files.
4. **Registry Promotion:** Project promoted to index 0 of `all_draft_store` in `root_meta_info.json`, ensuring it appears as the first card when CapCut Desktop is launched.
5. **Lock Prevention:** `.locked` files are proactively cleaned up.

---

## 8. Actual Failures, Diagnoses, and Workarounds

1. **Initial Orphan Slice Issue:**
   - *Failure:* In early cut merging, a 0.25s gap between the leading silence and the first aborted take was left unmerged, creating a meaningless 0.43s orphan clip (#01) before the main retake.
   - *Workaround:* Increased close-cut merge proximity to 0.40s and added a minimum usable clip threshold (`dur >= 0.60s`), successfully merging the leading dead air with the aborted take into a single clean start.
2. **FFmpeg 4K Complex Filter Scaling Limit:**
   - *Failure:* Initial `generate_video_preview` attempted to instantiate 10 parallel 4K video `trim` and `scale` filters simultaneously in a single `filter_complex`, leading to an FFmpeg exit error.
   - *Workaround:* Switched video preview generation to the FFmpeg concat demuxer (`-f concat -safe 0` with timestamp `inpoint`/`outpoint` entries). This reduced memory footprint and rendered the 720p preview video in under 40 seconds.

---

## 9. Remaining Work for Subsequent Workstreams

- **Workstream 2:** Fine-tuning cut boundaries with silence detection thresholds customized for speaker cadence (breaths vs hesitations).
- **Workstream 3:** Dynamic punch-ins and subtle framing shifts on jump cuts between takes to create visual continuity.
- **Workstream 4:** B-roll / chart insertions and automated screen-recording overlays for mentioned stock tickers (e.g. HDFC Bank, Reliance).
