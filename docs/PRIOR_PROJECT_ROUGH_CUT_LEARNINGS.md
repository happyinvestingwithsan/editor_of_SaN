# Prior Project Rough-Cut Learnings

**Investigation Date:** 2026-10-10  
**Source Codebase Inspected:** `D:\AI Projects\Video_Editing` (Last active: September 25–26, 2026; recent scratch files: October 6, 2026)  
**Reference Editorial Specifications:** `analysis/EDITORIAL_STYLE_SPEC_V1.md`, `analysis/EDITORIAL_STYLE_SPEC_V2.md`, `AGENTS.md`  
**Working Implementations Inspected:** `auto_edit.py`, `edit_engine.py`, `editorial_plan.py`, `analyze.py`, and `scratch/test_vad_bursts.py`

---

## 1. Project Identification and Candidate Evaluation

A comprehensive audit was conducted across sibling directories in `D:\AI Projects` and historical commits.
The candidate projects evaluated:
1. `D:\AI Projects\Zenvestor` — Telegram/market alert bot (not a video editing pipeline).
2. `D:\AI Projects\Youtube Assistant` — Script drafting and orchestration markdown notes (no video cutting code).
3. `D:\AI Projects\Video_Editing` — **The authoritative candidate project**. Contains complete autonomous rough-cut video pipelines, VAD burst splitting, empirical human-alignment datasets (`training_01`, `training_02`), and the golden editorial specifications `EDITORIAL_STYLE_SPEC_V1.md` and `V2.md`.

### Why `Video_Editing` Produced Better Rough Cuts
In `Video_Editing`, rough cutting was designed around **Macro Thought Blocks** and **Take Resolution Harvesting (Rule ES-01)** rather than micro-silence stripping:
- In human edits studied in that project (`CapCut 0918` and `0906`), cuts averaged **~2.2 cuts per minute of raw footage**.
- Over **84% to 91% of all excised time came from macro cuts (>10 seconds)** — removing abandoned thoughts, rehearsals, and multi-sentence false starts.
- Micro-cuts (<3.0s) accounted for **less than 1.5% of removed time**.
- The pipeline did not rely on single-pass silence detectors or adjacent word comparisons. It recognized that **when an unscripted speaker stumbles, they don't stutter adjacent words—they abandon the entire thought and re-record it 10 to 60 seconds later**.

---

## 2. Core Technical Mechanisms of the Earlier Successful Pipeline

### A. Transcription & The Whisper Speech-Merging Solution
In `auto_edit.py` and `scratch/test_vad_bursts.py`, the system identified a fundamental flaw in standard Whisper:
> **The Whisper Speech-Merging Trap (Golden Rule B in `AGENTS.md`):**  
> *"Faster-Whisper / Whisper can smooth over short pauses (0.2s - 0.6s) and merge an aborted false start and its clean retake into a single text sentence in the JSON output, effectively hiding the false start from the transcript."*

**How `Video_Editing` Solved This:**
1. **Acoustic Burst Pre-Segmentation (`test_vad_bursts.py` & `auto_edit.py:101-155`):**
   - It ran Silero VAD (`faster_whisper.vad.get_speech_timestamps`) directly on the raw audio waveform with `min_silence_duration_ms=200` and `speech_pad_ms=50`.
   - It inspected internal pauses $\ge 250\text{ms}$ between bursts inside each Whisper segment.
   - When internal pauses existed, it clustered bursts and **transcribed each burst cluster independently** with `beam_size=1` or `5`.
   - This exposed swallowed retakes and micro-restarts that standard continuous transcription blended away.

### B. Identification of False Starts, Repetitions, and Winning Retakes
In `EDITORIAL_STYLE_SPEC_V2.md` and `auto_edit.py`, retakes were handled through two complementary engines:

1. **Rule ES-01: Take Resolution Harvesting:**
   - Instead of checking if word $N$ matches word $N+1$, the system mapped speech into **Thematic Paragraph Blocks**.
   - When multi-take clusters appeared (e.g. 4 attempts at a hook or CTA), the earlier pipeline evaluated **energy, duration, and semantic resolution**.
   - It discarded all precursor attempts ($1 \dots N-1$) in a single contiguous macro cut and retained **only the final resolved take** with natural leading/trailing breath cushions (150ms–250ms).
   - **Crucial Rule:** It explicitly forbade splicing the start of Take 1 to the end of Take 2 (a classic Frankenstein cut).

2. **Rule ES-06: Natural Cadence Protection (Anti-Micro-Slicing):**
   - *"Never run naive silence-stripping scripts. Pauses that occur within a coherent thought block are essential for comprehension, pacing, and human dignity. Cuts belong at thought boundaries, not inside breaths."*
   - In `Video_Editing`, pauses inside a valid thought block (0.6s to 1.2s) were **intentionally protected**.
   - Increased pacing was achieved not by jump-cutting breaths every 1.8s, but by **global playback velocity (e.g. 1.30x speed)**.

3. **Rule ES-15: Rhetorical Setup Protection:**
   - Protected rhetorical questions (e.g. *"A 52-week low for a stock does not mean the stock is cheap... Great opportunity? Not necessarily."*) from being misclassified as false starts.

### C. Audio Continuity & Cut Boundary Snapping
In `edit_engine.py` and `auto_edit.py`:
- Cut points were never placed directly on Whisper word boundaries.
- The waveform refiner searched a $\pm 150\text{ms}$ window around speech onsets and offsets for **local RMS energy minima and zero-crossings**.
- Speech onsets were given **150ms–200ms of leading headroom** to preserve initial plosives and consonants (preventing words like "In", "A", or "For" from being cut in half).
- Speech offsets were given **200ms–250ms of trailing tail** before the cut, preventing sudden gate-drop clicks.

### D. Separation of Rough-Cut Logic from CapCut Assembly
In `Video_Editing`, the workflow strictly separated **Editorial Decision Making** from **Timeline Construction**:
1. **Pass 1: Semantic & Acoustic Decision Engine:**
   - Raw video $\rightarrow$ Audio extraction $\rightarrow$ VAD burst transcription $\rightarrow$ Macro thought block parsing $\rightarrow$ Take resolution selection $\rightarrow$ High-confidence EDL.
   - The EDL was purely time-based (`source_start`, `source_end`, `reason`, `action`).
2. **Pass 2: CapCut Dual-Timeline Construction:**
   - Took the verified EDL.
   - Built a master draft with Track 0 containing the kept clips.
   - Built Tab 2 with the raw footage.
   - Kept video transform at $(0, 0)$ and scale at $1.0$.

---

## 3. Comparison: Prior Project (`Video_Editing`) vs. Current Workspace (`Editor_of_SaN`)

| Dimension | Earlier Project (`Video_Editing`) | Current Pipeline (`Editor_of_SaN`) |
| :--- | :--- | :--- |
| **Editorial Philosophy** | **Macro Thought Blocks**: Excise large abandoned takes (84-91% of cut time in cuts >10s). Leave natural pauses intact. | **Micro Pause Shortening**: Treats every pause >1.8s as an isolated silence to shorten to 0.50s, regardless of narrative context. |
| **Multi-Take Handling** | **Take Resolution Harvesting (ES-01)**: Recognizes distant takes across 30-100s windows; deletes all precursor attempts $1 \dots N-1$. | **Local Adjacent Matching**: Only compares adjacent segments $i$ and $i+1$. Fails when takes are separated by >1.8s pauses. |
| **Pacing Strategy** | Preserves 0.6s-1.2s breaths for natural human cadence; relies on global 1.30x speedup for Shorts pacing. | Aggressively chops every conversational pause down to 0.50s, producing robotic cadence and audio pops. |
| **VAD & Burst Handling** | Uses acoustic burst pre-segmentation to isolate swallowed stumbles before transcribing. | Transcribes full audio first; relies on downstream text regex for stumbles. |
| **Speech Preservation** | Explicit 150ms-250ms breath cushions on all speech boundaries; verifies zero-crossings. | Word boundaries trimmed tightly with asymmetric padding, clipping initial syllables (e.g. "In this tool"). |

---

## 4. Assets and Reusable Modules from `Video_Editing`

The following algorithms and specs from `D:\AI Projects\Video_Editing` are directly applicable to solving the current crisis in `Editor_of_SaN`:

1. **`EDITORIAL_STYLE_SPEC_V2.md`:**
   - Contains the exact mathematical distribution of human cuts (2.2 cuts/min, 90% macro cuts >10s, <1.5% micro cuts).
   - Formulates the exact rules for Take Resolution Harvesting (ES-01), Natural Cadence Protection (ES-06), and Rhetorical Protection (ES-15).
2. **`auto_edit.py` (VAD Burst Segmentation, lines 101–155):**
   - The clustering algorithm that splits audio into independent acoustic speech bursts before passing to Whisper, preventing sentence-merging.
3. **`scratch/test_vad_bursts.py`:**
   - Standalone acoustic burst verification script to inspect whether speech exists in candidate cut regions before committing cuts.
4. **`edit-plans/Test_v10_edit_plan.json`:**
   - The prior edit plan for this exact video that successfully identified the 6 master segments and 5 macro cuts (excluding all Take 1, 2, and 3 stumbles in a single 98-second excision).
