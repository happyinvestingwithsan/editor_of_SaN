# Rough-Cut Pipeline Failure Analysis & Technical Audit

**Audit Date:** 2026-10-10  
**Repository / Branch:** `Editor_of_SaN` / `fix/rough-cut-completeness`  
**Test Media:** `D:\AI Projects\Video_Editing\input\Test_v10.mp4` (Duration: 225.12s, 3840x2160, 30fps)  
**Execution Command Tested:** `python scripts/run_rough_cut.py --video "D:\AI Projects\Video_Editing\input\Test_v10.mp4" --name "HappyInvesting_Test_v10" --out-dir "work"`

---

## 1. Executive Pipeline Audit Map

The rough-cut pipeline was audited across each sequential stage:

```
[Raw 4K MP4]
     │
     ▼
[Stage 1: Audio Extraction] (audio_extractor.py: FFmpeg 16kHz Mono WAV) ──► PASS (Clean mono stream)
     │
     ▼
[Stage 2: Transcription] (transcriber.py: faster-whisper small float16) ──► PASS (Accurate timestamps)
     │
     ▼
[Stage 3: Pause & Anomaly Analysis] (analyzer.py) ─────────────────────────► CRITICAL FAILURE (Local bias)
     │
     ▼
[Stage 4: Editorial Reasoning & Cuts] (editorial_reasoner.py) ──────────────► CRITICAL FAILURE (Fragmented cuts)
     │
     ▼
[Stage 5: Boundary Refinement] (waveform_refiner.py) ──────────────────────► HIGH FAILURE (Syllable clipping)
     │
     ▼
[Stage 6: EDL Construction] (edl_reporter.py) ─────────────────────────────► DISCREPANCY (False completeness)
     │
     ▼
[Stage 7: CapCut Dual-Timeline Draft] (capcut_builder.py) ─────────────────► MINOR DISCREPANCY (Subdraft vs Project)
     │
     ▼
[Stage 8: Preview Generation] (preview_generator.py) ──────────────────────► HIGH FAILURE (Audio/Video A/V drift)
```

---

## 2. Root Cause Candidates, Evidence, and Severity

### Candidate 1: Retained False Starts & Duplicate Takes (Take Fragmentation Trap)
- **Failure Symptom:** The rough cut retains 5 distinct stumbling precursor takes (Take 1 pitch, Take 1 bonus, Take 2 tool pitch, Take 2 CTA stumble, duplicate outro signoff), repeating the same value proposition 2.5 times.
- **Root Cause:**
  1. In `src/rough_cut/analyzer.py`, `find_repetitions_and_false_starts()` primarily compares adjacent segments ($s_i$ and $s_{i+1}$) or checks for exact 4-word identical string prefixes across distant segments.
  2. In unscripted speech, when a speaker makes a mistake at 75s, they stop, pause for 10–15s, try again at 109s, pause for 15s, and finally deliver the perfect take at 173s.
  3. Because the takes are separated by pauses and slight lexical variations (*"HTFC Bank, Reliance"* vs *"HTFC and Reliance"*), `analyzer.py` returns **0 retake clusters** (verified empirically: `retake_clusters count: 0` in `HappyInvesting_Test_v10_analysis.json`).
  4. Consequently, `editorial_reasoner.py` never marks the precursor takes for removal. Instead, it processes each intervening pause as an independent hesitation to be shortened to 0.50s, mechanically stitching all 4 broken attempts together.
- **Severity:** **CRITICAL**. Completely destroys the quality and meaning of the rough cut.
- **Smallest Test to Confirm:**
  Run `analyzer.py` on the transcript segments between 70s and 200s and inspect `retake_clusters`. The output list is empty.

---

### Candidate 2: Inadvertent Speech Clipping at Cut Boundaries (Plosive / Consonant Amputation)
- **Failure Symptom:** Spoken words at the starts and ends of clips are clipped mid-phoneme (e.g. *"In this tool"* missing *"In"*; transitional *"For"* cut in half at 196.48s; audible boundary pops).
- **Root Cause:**
  1. In `src/rough_cut/editorial_reasoner.py`, when a pause is shortened, cut points are computed as `source_start = pause_start + 0.25` and `source_end = pause_end - 0.25`.
  2. If Whisper's word boundary onset begins earlier than the acoustic silence offset, or if the speaker inhales / begins an unvoiced consonant (like /f/, /s/, /p/, /ɪ/) within the 250ms window, the cut boundary clips directly into the initial speech phoneme.
  3. `src/rough_cut/waveform_refiner.py` only refines within a $\pm 150\text{ms}$ window using a simple energy threshold without ensuring that the cut point remains strictly *outside* the word's acoustic boundary.
- **Severity:** **HIGH**. Produces distracting, amateur-sounding audio transitions and clipped words.
- **Smallest Test to Confirm:**
  Extract the 500ms audio slice centered at `source_start = 39.23s` (the boundary between Cut #03 and Clip #03). Playback reveals the word "In" is truncated to an audible pop.

---

### Candidate 3: Audio/Video Desynchronization and Duration Discrepancy in Preview Generation
- **Failure Symptom:** Video and audio become unsynchronised towards the middle and end of the preview MP4. Audio finishes at a different timestamp than video.
- **Root Cause:**
  1. `preview_generator.py` uses two completely different FFmpeg mechanisms for generating the audio preview and the video preview:
     - **Audio Preview (`generate_audio_preview`):** Uses `ffmpeg -filter_complex` with `atrim=start=...:end=...,asetpts=PTS-STARTPTS` and `concat=a=1`. This computes sample-accurate audio cuts based on 16kHz audio sample counts (exact duration: **135.742s**).
     - **Video Preview (`generate_video_preview`):** Uses the FFmpeg **concat demuxer** (`-f concat -safe 0` with a text file containing `inpoint` and `outpoint`).
  2. The raw video `Test_v10.mp4` has keyframes spaced approximately 1.0 second apart (GOP size = 30 frames).
  3. FFmpeg's concat demuxer with `inpoint` and `outpoint` on H.264 video streams can only seek to packet keyframes unless every segment is explicitly re-encoded from exact PTS. When concatenated without filter-graph stream sync, video frames drop or duplicate across each cut point, while the audio stream plays continuously.
  4. Inspection of the generated `HappyInvesting_Test_v10_preview.mp4`:
     - Video stream duration: **135.367 seconds** (40.61 frames / 11 frames short).
     - Audio stream duration: **136.217 seconds**.
     - Audio/video duration drift: **850 milliseconds of pure A/V desync**.
- **Severity:** **HIGH**. The preview MP4 does not accurately reflect either the preview WAV or the true CapCut timeline.
- **Smallest Test to Confirm:**
  Run `ffprobe` on `HappyInvesting_Test_v10_preview.mp4` inspecting stream durations:
  ```powershell
  ffprobe -v error -select_streams v:0 -show_entries stream=duration -of csv=p=0 work\HappyInvesting_Test_v10\HappyInvesting_Test_v10_preview.mp4
  # Returns 135.366667
  ffprobe -v error -select_streams a:0 -show_entries stream=duration -of csv=p=0 work\HappyInvesting_Test_v10\HappyInvesting_Test_v10_preview.mp4
  # Returns 136.217000
  ```

---

### Candidate 4: Misleading EDL Completeness and Lack of Multi-Pass Verification
- **Failure Symptom:** The pipeline logs 10 cuts and claims to have trimmed 29.3% of the video, giving the illusion of a successful rough cut while leaving broken speech intact.
- **Root Cause:**
  1. The pipeline lacks an end-to-end **Verification Pass**.
  2. In `Video_Editing`, `auto_edit.py` executed `test_vad_bursts.py` and compared the assembled transcript against the source transcript.
  3. In `Editor_of_SaN`, `run_rough_cut.py` simply passes the cuts from the reasoner directly to the builder and writes the markdown report without performing an acoustic or semantic integrity check on the resulting edit.
- **Severity:** **MEDIUM**. Prevents automated CI/CD and self-healing.
- **Smallest Test to Confirm:**
  Check `scripts/run_rough_cut.py`. There is no verification step that validates whether any words in the kept clips are duplicates or stumbles.

---

## 3. Discrepancy Matrix: EDL vs. Preview vs. CapCut Timeline

| Component | Number of Cuts / Clips | Total Duration | Handling of Media | Audio/Video Sync |
| :--- | :--- | :--- | :--- | :--- |
| **EDL Specification** (`edl.json`) | 11 kept clips, 12 cuts | 135.74s (sum of clips) | Mathematical microsecond intervals | Perfectly synchronous by definition |
| **Audio Preview** (`preview.wav`) | 11 concatenated clips | 135.742s | Sample-accurate FFmpeg `atrim` | Audio only (matches EDL to 2ms) |
| **Video Preview** (`preview.mp4`) | 11 concatenated clips | 135.367s (V) / 136.22s (A) | FFmpeg concat demuxer (`inpoint`/`outpoint`) | **Broken (850ms A/V desync across 10 cut points)** |
| **CapCut Master Draft** (`draft_content.json`) | 11 video segments on Track 0 | 135.740s | CapCut native frame-accurate player | Synchronous (CapCut handles source GOP decoding) |

---

## 4. Technical Audit Conclusions

1. **Transcription is NOT the primary cause of failure.** Whisper accurately identified all words and timestamps in `Test_v10.mp4`.
2. **The primary cause of failure is the Lack of Macro-Thought Take Harvesting.** The pipeline operates like a mechanical silence-trimmer rather than an editorial brain. It tries to save 1.5s of dead air between sentences while leaving 80 seconds of discarded, stuttering rehearsal takes intact.
3. **The secondary cause of failure is the Preview Concat Demuxer.** Generating previews with the concat demuxer without filter-graph synchronization introduces visible audio-video drift that misleads reviewers into thinking the edit has sync defects that may not exist in CapCut.
