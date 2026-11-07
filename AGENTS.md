# Editor of SaN - Agent Operating Guidelines & Project Memory



## 1. Remotion Motion Graphics & Editing Workflow



### Mandatory Pre-Render Local Review Gate

Whenever creating, modifying, or integrating a Remotion motion graphics edit:

1. **Zero Upfront Heavy Renders:**

   - **Never** trigger resource-heavy, time-consuming final renders (e.g., full 1,000+ frame ProRes 4444 lossless exports, full-length ProRes renders) before SaN has reviewed the draft locally.

2. **Local Review First:**

   - Always run the draft locally (via Remotion Studio: `npm run dev` / `remotion studio` or lightweight frame previews).

   - Let SaN inspect, play, and test the draft timeline locally in real-time.

3. **Explicit User Approval Gate:**

   - Ask SaN for feedback and test confirmation before spending energy and compute on the final full-resolution / ProRes render passes.



---



## 2. Core Editing Standards

- **Zero Microsecond Gaps:** Always quantize clip cuts strictly to 30fps video frame units (`round(t_sec * 30.0)`).

- **Dual-Layer & Multi-Track Sync:** Synchronize Facecam, Phone B-Roll, Overlays, and Master Dialogue with microsecond-level precision.

- **Audio Integrity:** Keep master enhanced dialogue on a dedicated track (+3dB normalized gain) and keep camera scratch audio muted (`vol = 0.0`).

- **CapCut In-Memory Autosave Lock:** Before modifying `draft_content.json` on disk, ensure CapCut is on the Home Screen or closed to prevent in-memory autosave clobber.



---



## 3. Content Intelligence & Topic Selection Standards (Groww & INDmoney Framework)



### The 6 Viral Financial Archetypes (Only These Qualify):

1. **Consumer Platform Utility & Direct Action:** (e.g. Zerodha US Stocks, Groww UPI, SEBI T+0) — "Finally Here / How to Activate".

2. **Shocking Drawdown Panic:** (e.g. Yes Bank -18%, Cyient DLM -15%) — "Opportunity or Trap?".

3. **Valuation Paradox:** (e.g. Colgate down 55% despite 80% ROE, 10x PE stock with 100% profit) — "Why X despite Y?".

4. **Mega IPO & RHP Deconstruction:** (e.g. Jio ₹30,213 Cr IPO) — "Apply or Avoid? We read the 400-page RHP".

5. **Regulatory Threat & Rule Shock:** (e.g. SEBI CAS rules, F&O expiry ban) — "What changed for you?".

6. **Smart Money & Institutional Trail:** (e.g. FIIs buying 63% down leader) — "What are whales buying?".



### The "Boring Corporate Filter" (Ruthless Rejection):

- **Never** surface routine quarterly EPS updates with single-digit growth (e.g. PGHH up 2%), minor statutory GST disputes (e.g. Saraswati Saree), board appointments, or daily index noise.

- Every short must contain a strong retail emotional or actionable catalyst.



### The "Happy Investing" Lens:

- **Zero Fear:** Explain structural market moves calmly without catastrophic clickbait.

- **Zero Greed:** Strip 100x multibagger hype; ground analysis in balance sheets, margins, and valuation multiples.

- **Timing & Velocity:** Aim for the 7:00 PM – 9:30 PM IST golden window.



### The Tri-Tier Benchmark Architecture (Editing References vs. True Competitors):

- **Institutional Giants (`@Groww`, `@INDmoney`):** Visual & motion graphics reference ONLY. Never compare view counts (distorted by corporate ad budgets and app notifications).

- **Mega Influencer Educators (`Akshat`, `Pranjal`, `Asset Yogi`, `Shankar Nath`, `@financewizardcl`):** Narrative flow, 5-part script anatomy, and pacing reference ONLY. Never compare view counts (distorted by 1M–5M built-in subscribers).

- **Emerging Niche Creators (10k–50k Subscribers):** **OUR TRUE ALGORITHMIC BENCHMARK.** When a 15k creator hits a 5x–50x Outlier with high VPH (> 150), it provides 100% empirical proof that the topic and packaging triggered the algorithm without subscriber inertia. (Full manual codified in [`vidiq/`](file:///D:/AI%20Projects/Editor_of_SaN/vidiq/README.md)).



### Continuous Feedback & Stability Loops (Format Strictness):

- **9:16 Vertical Shorts / Reels:** Logged strictly in [`docs/REEL_LEARNING_LEDGER.md`](file:///D:/AI%20Projects/Editor_of_SaN/docs/REEL_LEARNING_LEDGER.md) (INDmoney/Groww/Chandrika framework, hook velocity, 37.5%/62.5% split, standalone logos, and outro conversion loops).

- **16:9 Long-Form Masterclasses & Forensic Films:** Logged strictly in [`docs/MASTERCLASS_LEARNING_LEDGER.md`](file:///D:/AI%20Projects/Editor_of_SaN/docs/MASTERCLASS_LEARNING_LEDGER.md) (Macro Thought Block invariants, acoustic snapping, 30–32% split layout, chapter motion graphics, and full master exports).

- **NEVER cross-contaminate:** Never log 16:9 Long-Form masterclass rough-cuts, chapter graphics, or master exports in `REEL_LEARNING_LEDGER.md`. Keep the two production memories strictly separated.



---



## 4. Scripting Invariants & Deep Value Streaming Mandate



### The Clean Teleprompter Script Invariant:

- **Always deliver a 100% clean, un-cluttered spoken teleprompter script first** before presenting editing cues, Remotion code, or production storyboards.

- The teleprompter script must contain **zero visual tags, zero camera cues, zero brackets, and zero timestamps** inside the reading block so SaN can immediately read it aloud and evaluate narrative rhythm.

- Spoken length must be calibrated for **150 – 175 words** (~55–60 seconds at natural 160–180 WPM delivery).



### The Deep Value Streaming Mandate ("No Value, No Views, No Viral"):

- Pure narration or superficial news recitation is strictly prohibited.

- Every short or long-form video must stream **deep, structural financial education** (e.g. audited balance sheet reality, operational cash flow vs accounting profit, Offer-for-Sale cashouts vs Fresh Issue debt reduction, or tax/regulatory arithmetic).

- **Happy Investing Core Ethos:** Ground the conclusion in emotional discipline (e.g., SaN's strict rule: *"No 200 DMA chart = No entry. I am okay to miss an opportunity, but I refuse to be greedy."*).



---



## 5. Long-Form Rough-Cut & Pacing Invariants (Equitas SFB & Jio Calibration)

- **Macro Thought Block Invariant (No Mid-Sentence Jump Cuts):**

  - In 16:9 Long-Form masterclasses, a coherent thought or paragraph is **strictly atomic**.

  - **Never** slice video using Faster-Whisper subtitle/comma segment boundaries.

  - Natural $0.4\text{s} - 1.0\text{s}$ breath and emphasis pauses between spoken clauses must be preserved. They provide gravitas and comprehension time for complex financial education.

  - Average long-form clip duration should be **$10\text{s} - 25\text{s}$** (not $3\text{s} - 4\text{s}$ micro-clips).

  - Cuts belong strictly at: (1) abandoned precursor stumbles/false starts, and (2) transitions between distinct macro thoughts.

- **Backward-Scanning Take Resolution (Anchor to Winning Take):**

  - When SaN retakes a line, stumbles, or resets, **never scan forward (left-to-right)**.

  - Always identify the **final, resolved winning take** in that cluster and anchor there, then backward-scan to excise all precursor stumbles, false starts, and dead air leading up to it.

- **True Acoustic Snapping & In-Point Calibration (Eliminating Pre-Speech Lip-Smacks & Resets):**
  - **The Lip-Smack & Breath False-Positive Trap:** Inhales and mouth clicks reach $\text{RMS} \approx 800 - 1,200$, whereas true spoken vocal energy explodes at $\text{RMS} \ge 2,500 - 4,000$. Setting thresholds too low captures $300\text{ms} - 750\text{ms}$ of awkward mouth breathing and staring before speech launches.
  - **Vocal Burst Onset:** Snap in-points strictly to the **true vocal resonant envelope ($\text{RMS} \ge 2,500$)**, tightly bounded by **$10\text{ms} - 30\text{ms}$ pre-roll** (just enough to preserve opening plosive consonants 'P', 'T', 'K', 'B' with zero audible inhale).
  - **Post-Abortion Reset Snapping (Zero Dead-Air Front Slop):** When an in-point follows an aborted take or reset, **never start in the trailing dead air** (as occurred in Clip 15 with 3.73s of dead silence). Snap strictly to the first phoneme of the resolved winning take.
  - **Trailing Decay Post-Roll:** Keep **$250\text{ms} - 350\text{ms}$ natural acoustic post-roll** after trailing word cessations to avoid clipping syllable decay.
- **Whisper Timestamp Stretch Guard:** Beware of Whisper stretching word durations over trailing silence (e.g. stretching *"accounting"* by +1.9s) or grouping aborted takes into single blocks. Always verify speech cessation with RMS energy.

- **Camera Improv Whitelist:** Never drop camera improv that introduces core concepts (*"duopoly"*, *"Bharti Airtel"*, *"watch till end"*) merely because it deviates from a teleprompter or planned script.



---



## 6. Remotion Production SOP & Anti-Pattern Guardrails (Mandatory for ALL New Chats)

*Full Post-Mortem & SOP Documented at [`docs/REMOTION_PRODUCTION_PLAYBOOK_AND_POST_MORTEM.md`](file:///D:/AI%20Projects/Editor_of_SaN/docs/REMOTION_PRODUCTION_PLAYBOOK_AND_POST_MORTEM.md).*



### The Core Golden Rules of Remotion Production:

1. **Master Cut as Single Source of Truth:**

   - **Never** slice raw unedited phone camera takes (`20261020_*.mp4`).

   - **Always** slice both video and audio directly from the master cut: `D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov` using identical `-ss` and `-t` parameters.

2. **Transcript-First Consent Gate:**

   - **Never** write Remotion code before presenting a 2-Column Storyboard Table (Dialogue vs Visual Concept & Screen Split) and receiving SaN's explicit approval.

3. **Pre-flight Media Engineering (Zero DOM Lag & Faststart):**

   - **Never** feed raw Long-GOP camera masters into Remotion.

   - **Always** generate an All-Intra proxy with faststart:

     `ffmpeg -y -ss [START] -t [DURATION] -i "D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov" -c:v libx264 -preset veryfast -g 1 -keyint_min 1 -crf 22 -movflags +faststart -r 30 -pix_fmt yuv420p -an "dmart-video-engine\public\video\master_takeX_facecam.mp4"`

   - **Always** extract an uncompressed 48kHz WAV audio track (`master_takeX.wav`).

4. **Single Persistent `<Video>` Architecture:**

   - Exactly **ONE** `<Video>` element must stay mounted across 100% of the timeline to prevent black flashes, decoder thrashing, and audio stutter.

   - Animate container position, scale, and border-radius using GPU `translate3d` transforms; never animate `width`/`height` directly on `<video>`.

5. **The 30–32% Facecam Real Estate Rule (No Perpetual Circles):**

   - **Never** trap SaN inside a perpetual small circle across the entire video.

   - SaN must occupy **30–32% screen real estate** (Chest-up tall frame: `580px × 980px`, radius `24px`, subtle gold bezel) for 70%+ of the video.

   - Alternate SaN between Left and Right every 15–20 seconds to reset viewer retention.

   - Circle PIP (`320px × 320px`) is strictly reserved for full-canvas documents (scanned DRHP pages, full-width plumbing diagrams).

6. **Word-Level Kinetic Snapping (Faster-Whisper):**

   - **Never** estimate visual timings by eye or word count averages.

   - Run Faster-Whisper on `master_takeX.wav` first, export words to JSON, and quantize every graphic reveal to exact speech frame boundaries (`round(t_sec * 30.0)`).

7. **No Automated Guessing of Face Centering:**

   - **Never** run autonomous Python OpenCV skin-detection heuristics to guess crops (the "Lamp Fiasco").

   - Always use SaN's locked calibration coordinates (`origX = 914.5px, origY = 542.7px`), or provide a live interactive HUD.

   - Always suppress dev HUD controls (`showHUD: false`) before rendering.

8. **Composition Registry Hygiene:**

   - Never register duplicate composition IDs in `Root.tsx` to prevent Puppeteer dev bundler collisions.

9. **Studio-First Live Review & Tiered Strategy (Zero Disk MP4 Bloat):**

   - **Never** trigger intermediate MP4 disk renders during drafting and iterative review passes.

   - Rely 100% on Remotion Studio (`http://localhost:3000` / `npm run dev`) for instant real-time inspection via Hot Module Reloading.

   - Tier 1: 1-Frame Stills (`remotion still`) only if static visual inspection is needed.

   - Final master render pass is triggered **strictly after explicit approval from SaN**.

10. **Zero Premature Docking (Anti-White-Screen Invariant):**

   - **Never** shrink or dock the presenter into split-screen mode ahead of time while waiting for an animation that triggers seconds later.

   - The presenter must remain in 100% fullscreen facecam until the exact frame where the visual catalyst/content card animates in.

   - Trigger the facecam dock and the content card reveal simultaneously to ensure zero dead white space on screen.



---



## 7. The SaN Video OS Standard Architecture & Reusable Motion Kit

*Full Standard Specification Documented at [docs/SAN_VIDEO_DESIGN_SYSTEM_AND_EDITING_STANDARD.md](file:///D:/AI%20Projects/Editor_of_SaN/docs/SAN_VIDEO_DESIGN_SYSTEM_AND_EDITING_STANDARD.md).*



### Core Structural Mandates:

1. **Modular Reusable Architecture (dmart-video-engine/src/motion-kit/):**

   - **Zero Ad-Hoc Inline Re-coding:** Never rewrite bespoke layout positioning, styling, or animations from scratch for new videos.

   - **Always Import from Motion Kit:** Use standardized components (HeadlineBadge, NewspaperClipping, MetricOdometer, StockTickerCard, ComparisonDuel, FinancialChart, AutopsyDossier, InteractiveCTA, KineticSubtitles, SFXPlayer).

2. **Canonical Composition Templates:**

   - **9:16 Shorts/Reels:** Always use StandardShortReel.tsx (MobileSplitLayout.tsx) with locked seam at Y = 718px, 	ranslateY(-600px) for facecam headroom, and centered eye-level subtitle seam bridge at 	op: 660px.

   - **16:9 Long-Form:** Always use StandardLongformChapter.tsx (LongformSplitLayout.tsx) adhering to the 30–32% screen real estate rule (580px × 980px, radius 24px, subtle gold border) alternating Left/Right every 15–20s.

3. **Clean Workspace & Consolidated Tooling:**

   - **Never create one-off Python scripts in root or scripts/.**

   - Use the unified CLI and standard entry points:

     - Ingest: python scripts/ingest.py

     - Transcription: python scripts/transcribe.py

     - Tiered Rendering: python scripts/render.py

   - Keep root clean; temporary active files live strictly in work/, and historical exploration code is safely preserved in archive/legacy_scripts/.

4. **Strict Zero-Corner-Clutter Mandate (No Fake Docket / Corner Metadata Text):**

   - **Never** render arbitrary corner text, mock case dockets (e.g. FILE: EQUITAS-BNK-2026), classification banners (SPECIAL FORENSIC REPORT), technical axis indicators (AXIS: 1920x1080 // 30 FPS // 48K AUDIO), or artificial corner watermarks.

   - Screen edges, borders, and margins must remain 100% clean, distraction-free, and uncluttered.

   - Branding or watermarks may **only** be added if explicitly provided and requested by SaN.



---



## 8. Autonomous Rough-Cut Subagent & Mother-Chat Invariant

*Full Standard Specification & Prompt Documented at [`docs/AUTOMATED_ROUGH_CUT_PLAYBOOK_AND_PROMPT.md`](file:///D:/AI%20Projects/Editor_of_SaN/docs/AUTOMATED_ROUGH_CUT_PLAYBOOK_AND_PROMPT.md).*



### Core Invariants:

1. **Mandatory Interactive Confirmation Gate (Never Assume Pacing):**

   - Before executing a rough cut, the agent must ask SaN to confirm:

     a. **Pacing Standard:** 16:9 Long-Form Macro Thought Blocks (10s–25s continuous takes, preserving breath pauses) vs 9:16 Short-Form Snappy Jump-Cuts (<0.5s pause limit).

     b. **Take Resolution Table:** Present the high-level proposed Thought Blocks and excised retakes for SaN's quick sign-off before assembling CapCut drafts.

2. **Zero Mother-Chat Context Bloat (Mandatory Subagent Delegation):**

   - The mother chat must **never** execute raw audio extraction, Faster-Whisper loops, acoustic RMS scans, or JSON timeline writing directly in its context window.

   - All compute, intermediate logs, and transcription iterations must be delegated to an isolated worker subagent (`rough-cut-engineer` or `self`).

   - The mother chat only receives and reports the concise completion summary (duration, compression ratio, verified transcript, and CapCut project path).

2. **Interactive Ingestion Gate:**

   - When a new edit is requested without complete details, always ask SaN:

     1. Raw video footage path / folder.

     2. CapCut draft target (New draft name vs Amend/append to existing draft).

     3. Confirm aspect ratio (auto-detected via ffprobe if omitted).

3. **Aspect Ratio Auto-Routing:**

   - **16:9 Landscape:** Long-form rules apply (max 1.0s silence, cadence protection, macro thought block excising, 1920x1080 canvas).

   - **9:16 Vertical:** Short/Reel rules apply (max 0.50s silence, 1.323x edge-to-edge scaling, +0.22 UI safety zone shift, +450ms outro smile cushion).

4. **The Audio-Verified Gate & CapCut Architecture:**

   - Always render and re-transcribe preview audio to verify 100% clean flow before writing CapCut files.

   - Always quantize cuts strictly to 30fps frames (`round(t * 30.0)`) with zero microsecond gaps.

   - Always build dual timelines: Tab 1 = Master Edit, Tab 2 = Raw Footage, and register at Index 0 in `root_meta_info.json`.
- **The 5 CapCut Loading Invariants (Never Skip):**
  1. *Timeline ID Synchronization:* `draft_content.json["id"]` in root and `Timelines/<ID>/` must strictly match `main_timeline_id` in `Timelines/project.json`.
  2. *The 52-Key `draft_meta_info.json` Invariant:* Must preserve all 52 template keys (never construct `{}` from scratch).
  3. *Bi-Directional Video Mapping:* Video material `id` in `draft_content.json["materials"]["videos"]` must match `draft_meta_info.json["draft_materials"][0]["value"][0]["id"]`.
  4. *Attachment ID Overwrite:* Overwrite `common_attachment/attachment_id_mapping.json` in both root and timeline subfolders with the new timeline segment UUIDs.
  5. *Clean State Hygiene:* Reset `config["export_range"] = None` and `materials["material_animations"] = []`.

