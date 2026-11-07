# Lessons Learned: Automated CapCut Rough-Cut & Multi-Layer Editing Pipeline

> **Document Type:** Living Operational & Engineering Knowledge Base  
> **Repository:** `Editor_of_SaN`  
> **Scope:** CapCut Desktop automation, multi-layer timeline synchronization, long-form speech chunking, and deterministic rough cutting.

---

## 1. Core Principles & Engineering Standards

1. **Zero Hallucination Tolerance:** Cut decisions must be derived strictly from verified word-level timestamps and acoustic silence analysis. Never guess or interpolate timestamps without verification.
2. **Audio-Verified Gate (Validator):** Every rough cut must render a lightweight audio preview and be re-transcribed independently to verify that no false starts, stutters, or repeated takes leaked through before writing to CapCut drafts.
3. **Dual-Layer Sync Locking:** In projects containing synced multi-camera/screen recording layers (e.g., Facecam on Track 0, Screen Share on Track 1), cuts must always apply simultaneously across all tracks with microsecond-level synchronization offsets.
4. **Non-Destructive Safe Backups:** Never overwrite existing user drafts in-place without preserving an untouched duplicate.

---

## 2. Chronological Incident & Failure Log

### Incident 001: CapCut Draft Visible on Home Screen but Fails to Open
* **Date:** 2026-10-15
* **Project:** `DMART Pilot - 5Min Rough Cut`
* **Symptom:** The project thumbnail and duration appeared on CapCut's home screen, but clicking it either did nothing or failed to open the timeline.
* **Root Cause Analysis:**
  1. **CapCut v9.6+ Multi-Timeline Structure:** In modern CapCut Desktop versions (v9.6+), projects do not solely read the root `draft_content.json`. CapCut expects an internal multi-timeline directory: `Timelines/<TIMELINE_ID>/draft_content.json`, accompanied by `Timelines/project.json` and `timeline_layout.json`.
  2. **Missing Segment ID Mapping (`attachment_id_mapping.json`):** CapCut assigns every clip segment on the timeline an integer `short_id` (e.g., `1000`, `1001`, `1002`). These are mapped in `common_attachment/attachment_id_mapping.json` and `Timelines/<TIMELINE_ID>/common_attachment/attachment_id_mapping.json`. When external scripts generate new clip segments with random UUIDs without adding them to `attachment_id_mapping.json` and `key_value.json`, CapCut's internal timeline validator crashes or rejects opening the draft.
  3. **Timeline ID Consistency:** `draft_content.json["id"]` must match the parent timeline folder name and `main_timeline_id` in `Timelines/project.json`.
* **Permanent Rule / Prevention:**
  - When cloning a project, retain the native timeline ID (`F87F16A7-E3FF-4950-B734-DFD276423271`) to avoid breaking internal relative paths.
  - Automatically populate `attachment_id_mapping.json` in both root and timeline subfolders for all newly created segment UUIDs with sequential `short_id`s.
  - Update `key_value.json` to reference all new segment IDs.

---

### Incident 002: In-Memory Autosave Overwriting Disk Modifications
* **Date:** 2026-10-15
* **Symptom:** Script writes `draft_content.json` or `root_meta_info.json`, but changes vanish as soon as CapCut exits or switches projects.
* **Root Cause Analysis:**
  - When a project is open in CapCut Desktop, the application holds the timeline state in RAM.
  - CapCut executes a recurring background autosave and flushes its in-memory state to disk on shutdown, completely clobbering any external modifications made while the app was running.
* **Permanent Rule / Prevention:**
  - **The "Home Screen" Rule:** The user does not need to close CapCut entirely; they only need to click `< Projects` (Back to Projects Home Screen). This unloads the active project from RAM and releases write locks.
  - Before running programmatic writes to `root_meta_info.json` or draft files, scripts must verify whether `CapCut.exe` is actively running. If modifying the active draft, processes must either be gracefully stopped or performed while on the Home Screen.

---

### Incident 003: Monolithic Long-Form Processing Risks (1-Hour Hallucinations)
* **Date:** 2026-10-15
* **Challenge:** Processing a 60-minute video in a single monolithic pass leads to LLM context drift, missed stutters, and degraded timestamp precision.
* **Solution / New Approach:**
  - **Chunk-Based Iterative Workflow:** Process the video in 2–5 minute chunks or by natural topic boundaries.
  - **Four-Step Micro-Pipeline per Chunk:**
    1. Fast 16kHz mono audio slice extraction via FFmpeg (< 1s).
    2. Word-level transcription via `faster-whisper` on CPU (int8) with acoustic silence detection.
    3. Take & stumble clustering: identify aborted starts, internal pauses > 1.0s, and phrase repetitions.
    4. Post-Cut Audio Verification: Concatenate kept segments into a preview audio file and transcribe it independently to ensure sentence flow is completely natural before updating the CapCut project.

---

### Incident 004: Multi-Track Synchronization Offset Calculation
* **Date:** 2026-10-15
* **Challenge:** Slicing both Facecam (Layer 1) and Screen Recording (Layer 2) without causing AV desynchronization or visual drift.
* **Solution:**
  - In the user's base project, retrieve the exact starting timeline offset:
    $$\text{OFFSET\_US} = \text{target\_start}_{\text{Facecam}} - \text{source\_start}_{\text{Facecam}} + \text{source\_start}_{\text{Screen}}$$
  - For any cut range $[t_{\text{start}}, t_{\text{end}}]$ in the speaker's audio, generate identical `target_timerange` durations for both tracks, and compute:
    $$\text{source\_start}_{\text{Facecam}} = t_{\text{start}} \times 10^6 + \text{base\_facecam\_us}$$
    $$\text{source\_start}_{\text{Screen}} = t_{\text{start}} \times 10^6 + \text{OFFSET\_US}$$
  - This guarantees microsecond-level synchronization across all layers throughout the full 1-hour timeline.

---

## 3. Maintenance and Update Protocol

Whenever a new issue, crash, or workflow improvement is discovered:
1. Document the **Symptom**, **Root Cause Analysis**, and **Permanent Rule / Prevention**.
2. Update the corresponding automated script in `scripts/` or `src/rough_cut/`.
3. Verify that the change maintains backward compatibility with older CapCut versions and existing project templates.

---

### Incident 005: Headroom & Tailroom Breathing Padding (Human Trim Comparison)
* **Date:** 2026-10-15
* **Observed Difference:**
  - Automated initial cuts were clipped tightly against word start/end boundaries (e.g., Clip 2 started at `141.15s` vs human edit at `140.93s` — adding **220ms pre-pad**; Clip 4 started at `221.00s` vs human edit at `220.87s` — adding **130ms pre-pad**; Clip 5 tail extended by **330ms**).
* **Root Cause & Human Editorial Preference:**
  - Strict VAD/word-boundary cutting clips consonants and natural inhalation/exhalation before sentence onset, feeling slightly abrupt or robotic.
  - Human editor naturally leaves **100ms – 250ms of audio pre-padding** (headroom) before the first phoneme and **150ms – 300ms tail-padding** after the final word.
* **Permanent Rule / Prevention:**
  - Always apply a standard **editorial padding window**:
    - Pre-pad: `+150ms` prior to initial speech onset (ensuring room for the leading consonant).
    - Post-pad: `+200ms` trailing speech cessation (preserving natural reverberation/breath).

---

### Incident 006: SaN Human Review vs AI Baseline (The 133-Second Compression & Style Extraction)
* **Date:** 2026-10-16
* **Project:** `DMART Full Long-Form Cut (66-Minute Master)`
* **Symptom:**
  - Comparison between AI Baseline Cut (`1593.03s` / 26m 33s) and SaN's Reviewed Master (`1459.57s` / 24m 20s) revealed **133.47 seconds (8.38%) of human compression** across 224 clips.
  - 12 baseline clips were completely eliminated (-53.80s), 11 monolithic clips were internally split (-55.20s), 1 new transition bridge was inserted (+12.33s), and the entire Masterclass Chapter was reordered mid-timeline.
* **Root Cause & Human Taste Analysis:**
  1. **Cliché & Meta-Narration Blind Spots:** The AI pipeline preserved generic YouTube filler (*"without wasting time let us get into the video"*) and UI navigation narration (*"on fundamental analysis, I am just opening the screener website"*). To SaN, operational browser friction and viewer-pleading dilute authority.
  2. **Circular Reasoning & Redundant Recaps:** In complex accounting sections (Quarterly Margins, Depreciation + Interest), the speaker circled through multiple attempts. Because these lacked acoustic stutters, the AI kept them; SaN ruthlessly excised the duplicate takes (e.g. dropping Clips 90, 91, 101, 102, 103 for -32.8s).
  3. **Leading Conjunction Drag:** Conversational speech frequently starts with *"So"*, *"And"*, *"Because"*, or *"If"*. SaN consistently pruned these leading syllables to create immediate, punchy sentence onsets.
  4. **Audience Retention Psychology:** Placing the cohort offer at the end of a 26-minute video exposes it to high audience drop-off. SaN moved Chunk 17 forward to the post-analytical climax (~17.5m), keeping high-value tactical execution (Chunks 14 & 15) as the concluding reward.
  5. **Breathing Window Over-Relaxation:** The AI's default `+150ms / +200ms` left trailing exhalations and room noise. Empirical human calibration showed median headroom of **`+136.7ms`** and tailroom of **`+173.3ms`**.
* **Permanent Rule / Prevention:**
    - **Calibrated Breathing Windows:** Set `pre_pad_headroom_ms = 135` and `post_pad_tailroom_ms = 175` (clamping between 110ms and 190ms).
  - **Integer Frame Quantization (The Millisecond Gap Fix):**
    - Never write raw floating-point timestamps to `draft_content.json`.
    - Quantize all boundaries strictly to 30fps video frame units: `frame_idx = round(t_sec * 30.0)`, `t_us = round(frame_idx * 1_000_000 / 30.0)`.
    - Enforce target continuity: `clip[k].target_start = clip[k-1].target_start + clip[k-1].target_duration` with identical duration across Track 0 and Track 1 to guarantee 0 black frames and 0 visual glitches.
  - **The "SaN Content Filter":**
    - Automatically excise banned YouTube clichés (*"without wasting time let us get into the video"*) and mechanical browser narration (*"opening the screener website"*).
    - Strip leading connective conjunctions (*"so"*, *"and"*, *"because"*, *"if"*) when followed by pauses $>150\text{ms}$.
    - Suppress duplicate numerical recaps and time estimates appearing across adjacent takes (e.g. repeated "1.5 to 2 years").
    - Auto-split monolithic clips whenever internal hesitation $>1.5\text{s}$ contains abandoned syllables/false starts.
    - When an author escalates phrasing progressively (e.g. "good stock" -> "better stock"), delete intermediate takes.
  - **Mandatory Transition Bridges:** Flag and insert bridging takes whenever the cut jumps across external websites or distinct analytical domains (e.g., Screener Ratios $\to$ FII Shareholding).
  - **Strategic CTA Placement:** Position high-ticket offers at ~65% timeline completion (immediately following technical conviction climax), not at the timeline terminus.
  - Reference full specification in [`SAN_EDITORIAL_STYLE_PROFILE.md`](file:///D:/AI%20Projects/Editor_of_SaN/work/Dmart_Project/SAN_EDITORIAL_STYLE_PROFILE.md).

---

### Incident 007: Short-Form Vertical (Reels/Shorts) Human Calibration (The 60% to 90% Leap)
* **Date:** 2026-10-19
* **Project:** `US Stocks Zerodha - Short RoughCut` (1080x1920 9:16 Vertical)
* **Symptom & Score:** AI baseline delivered ~60% rough-cut accuracy (37.87s). SaN's reviewed master refined it to **35.80s (-2.07s / 5.5% compression)** across 3 synchronized tracks.
* **Forensic Review Findings & Human Taste Analysis:**
  1. **Ruthless Internal Hesitation Slicing:**
     - In Step 2, the AI baseline preserved a monolithic 7.77s clip (`104.20s - 111.97s`).
     - Inside this clip, between `107.50s` and `109.40s` (1.90s!), the speaker took a breath/pause.
     - SaN split the clip at `107.50s` and resumed at `109.40s`, eliminating the 1.9s dead air entirely. In short-form reels, any internal pause $>0.6\text{s}$ causes immediate audience swipe-away.
  2. **Excising Abandoned Sentence Preambles:**
     - AI baseline kept Backstory Part 1 (`43.87s - 44.97s`: *"If you are also wondering..."*), which was an abandoned false start before the main take at `47.10s`.
     - SaN discarded Part 1 entirely and started directly on the clean take at `47.10s` (*"how to activate it before 15 minutes..."*), saving 1.1s and creating a punchier narrative.
  3. **Vertical Aspect Ratio Auto-Fill (19.5:9 to 9:16):**
     - Smartphone recordings (1080x2340, 19.5:9) placed at `scale: 1.0` leave black pillar-box margins on a 1080x1920 (9:16) canvas.
     - SaN applied **`scale = 1.3233`** (+32.3%) to fill the screen edge-to-edge.
  4. **UI Safe Zone Centering ($Y$-Transform):**
     - For mobile screen action buttons located near the bottom (e.g. "Enable US Investing"), default center placement puts them inside the TikTok/Reels caption and interactive icon danger zone.
     - SaN shifted the Y-transform to **`+0.2298`** (panning up ~220px) to keep the interactive UI element in the optical center.
  5. **Speed Freeze Ramping (`spd = 0.1x`) on Visual Context:**
     - When the spoken voiceover exceeds the duration of a quick on-screen tap/scroll, cutting away or looping feels jarring.
     - SaN applied a **`0.1x` speed ramp** across 0.18s of source footage to freeze-hold the menu state for 1.77s while the dialogue finished explaining.
  6. **Enhanced Audio Separation Track (Track 2):**
     - SaN separated dialogue audio from camera scratch mic, enhanced clarity/frequency balance externally (`US Stocks Zerodha - Short RoughCut-enhanced-v2.wav`), placed it on Track 2 with **+3dB boost (`vol = 1.414`)**, and muted the in-camera mic on Track 0 (`vol = 0.0`).
  7. **Outro Headroom & Tailroom:**
     - AI baseline clipped tightly at `164.70s` right after the last word. SaN extended tailroom by **`+470ms`** (to `165.17s`), preserving the speaker's closing smile and head nod for natural loop closure.
* **Permanent Rules for Vertical Shorts / Reels Pipeline:**
  - **Rule 1 (Shorts Max-Pause Gate):** Auto-split monolithic takes whenever an internal acoustic pause exceeds **`0.50s`**. Never allow pauses $>0.6\text{s}$ in reels.
  - **Rule 2 (Auto-Scale Phone B-Roll):** For 1080x2340 phone screen recordings on 9:16 canvas, automatically set `scale: {x: 1.323, y: 1.323}` to eliminate pillar-boxes.
  - **Rule 3 (Bottom UI Safety Shift):** When B-roll shows bottom buttons/CTAs, set `transform: {x: 0.0, y: 0.22}` to lift buttons above social media caption safe zones.
  - **Rule 4 (Visual Freeze-Hold Ramping):** When narration duration exceeds B-roll action, apply `speed = 0.1` on the final frame to gracefully freeze-hold the visual instead of early cutaways.
  - **Rule 5 (Master Dialogue Stacking):** Always place enhanced/cleaned master dialogue on a dedicated audio track (Track 2) with normalized gain (`vol = 1.41`), muting camera scratch audio on Track 0.
  - **Rule 6 (Outro Smile Retention):** Always append `+450ms` of visual tailroom after the final phoneme of the outro.
  - **Rule 7 (The Pre-Render Local Review Gate):** Never trigger resource-intensive final video renders (e.g., 1,000+ frame full ProRes 4444 passes) before reviewing the draft locally. Always launch the draft in Remotion Studio (`npm run dev`) or present lightweight interactive frames so SaN can review and test the draft timeline locally in real time before spending energy and compute on heavy rendering.



