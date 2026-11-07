# Happy Investing: Long-Form Masterclass Engineering & Editorial Learning Ledger

> **Document Type:** Living Masterclass Production Ledger & Long-Form Editorial Memory  
> **Repository:** `Editor_of_SaN`  
> **Format:** 16:9 Landscape YouTube Masterclasses, Concall Breakdowns, and Forensic Educational Films  
> **Purpose:** Document empirical calibrations, rough-cut rules, pacing invariants, CapCut timeline loading architectures, and Remotion motion graphics standards specifically for 16:9 long-form content.

---

## 1. Core Long-Form Masterclass Invariants

1. **Macro Thought Block Invariant (No Mid-Sentence Jump Cuts):**
   - In 16:9 Long-Form masterclasses, a coherent thought or paragraph is **strictly atomic**.
   - **Never** slice video using Faster-Whisper subtitle/comma segment boundaries.
   - Natural $0.4\text{s} - 1.0\text{s}$ breath and emphasis pauses between spoken clauses must be preserved. They provide gravitas and comprehension time for complex financial education.
   - Average long-form clip duration should be **$10\text{s} - 25\text{s}$** (not $3\text{s} - 4\text{s}$ micro-clips).
   - Cuts belong strictly at: (1) abandoned precursor stumbles/false starts, and (2) transitions between distinct macro thoughts.

2. **Backward-Scanning Take Resolution (Anchor to Winning Take):**
   - When SaN retakes a line, stumbles, or resets, **never scan forward (left-to-right)**.
   - Always identify the **final, resolved winning take** in that cluster and anchor there, then backward-scan to excise all precursor stumbles, false starts, and dead air leading up to it.

3. **True Acoustic Snapping & In-Point Calibration:**
   - **Vocal Burst Onset:** Snap in-points strictly to the **true vocal resonant envelope ($\text{RMS} \ge 2,500$)**, tightly bounded by **$10\text{ms} - 30\text{ms}$ pre-roll** (just enough to preserve opening plosive consonants 'P', 'T', 'K', 'B' with zero audible inhale or mouth click).
   - **Post-Abortion Reset Snapping (Zero Dead-Air Front Slop):** When an in-point follows an aborted take or reset, **never start in the trailing dead air**. Snap strictly to the first phoneme of the resolved winning take.
   - **Trailing Decay Post-Roll:** Keep **$250\text{ms} - 350\text{ms}$ natural acoustic post-roll** after trailing word cessations to avoid clipping syllable decay.

4. **Zero-Corner-Clutter Mandate:**
   - **Never** render arbitrary corner text, mock case dockets (`FILE: EQUITAS-BNK-2026`), classification banners (`SPECIAL FORENSIC REPORT`), technical axis indicators (`AXIS: 1920x1080 // 30 FPS`), or artificial corner watermarks.
   - Margins, borders, and canvas edges must remain 100% clean, distraction-free, and uncluttered.

5. **The 30–32% Facecam Real Estate Rule (Long-Form Split):**
   - SaN occupies **30–32% screen real estate** (Chest-up tall frame: `580px × 980px`, radius `24px`, subtle paper bezel) for 70%+ of the video.
   - Alternate SaN between Left and Right every 15–20 seconds to reset viewer retention.
   - Full-canvas takeovers are strictly reserved for high-density document inspection (balance sheets, DRHP filings, visual allegories).

6. **The 5 CapCut Loading Invariants (Zero Corrupted Drafts):**
   1. *Timeline ID Synchronization:* `draft_content.json["id"]` in root and `Timelines/<ID>/` must strictly match `main_timeline_id` in `Timelines/project.json`.
   2. *The 52-Key `draft_meta_info.json` Invariant:* Must preserve all 52 template keys (never construct `{}` from scratch).
   3. *Bi-Directional Video Mapping:* Video material `id` in `draft_content.json["materials"]["videos"]` must match `draft_meta_info.json["draft_materials"][0]["value"][0]["id"]`.
   4. *Attachment ID Overwrite:* Overwrite `common_attachment/attachment_id_mapping.json` in both root and timeline subfolders with the new timeline segment UUIDs.
   5. *Clean State Hygiene:* Reset `config["export_range"] = None` and `materials["material_animations"] = []`.

---

## 2. Masterclass Production & Calibration Log

### Masterclass #001: Reliance Jio Mega IPO (₹30,213 Crore) — Complete 6-Take Master Rough Cut
- **Date Assembled:** 2026-10-20 | **Target Duration:** 8–12 Minutes
- **CapCut Project:** `Jio_Mega_IPO_8Min_Master`
- **Dual-Timeline Architecture:**
  - **Tab 1: `V3 Master Edit`:** 725.33s (12m 05s) across 62 continuous rough-cut clips (0 microsecond gaps, quantized to 30.0fps integer frames).
  - **Tab 2: `Raw Footage`:** 1,827.91s (30m 28s) across all 6 raw takes.
- **Compression & Pacing Ratio:** 60.3% of raw pauses, false starts, and duplicate takes excised.
- **SaN's Master Post-Review Calibration (2026-10-20):**
  - **AI Initial Rough Cut:** 725.33s (12m 05s) across 62 clips.
  - **SaN's Final Master Cut:** 653.03s (10m 53s) across 65 clips.
  - **Delta:** SaN excised an additional **72.30 seconds** of dead air, sluggish pauses, and weak takes.
  - **Root Cause & Stabilized Algorithm Upgrades:**
    1. *Ghost Headroom Inflation (+500ms):* Whisper word-starts already include pre-speech mouth noise. AI's additional `-135ms` pre-pad added dead air before every clip. **New Rule:** Snap clip in-points to true acoustic energy onset (RMS > 1,000) minus max 40–50ms.
    2. *Monolithic Clip Blindness:* AI created 20–32s monolithic clips that concealed 2–4s internal pauses (e.g., Take 4 Clip 7 had a 4.2s pause inside; Take 2 Clip 6 had a 2.0s pause inside). **New Rule:** Mandatory acoustic silence scanning; auto-split whenever internal acoustic pause > 1.0s.
    3. *Improv Sentence Dropping:* AI rigidly dropped SaN's natural camera improv (e.g., Take 4: *"Here telecom is strictly a duopoly, one is Reliance Jio and another is Bharti Airtel"*). **New Rule:** Context-flow alignment over rigid teleprompter matching.
    4. *Sluggish Middle Excision:* SaN eliminated redundant explanations in Take 6 (jumping straight from 76% Zomato crash to *"Because on listing day..."*), saving 32 seconds of audience fatigue.

---

### Masterclass #001 Take 02: The DRHP Forensic & 0% OFS Whale Proof (Motion Graphics Chapter 2)
- **Date Assembled:** 2026-10-21 | **Duration:** 110.74s (3,322 frames @ 30fps)
- **Composition:** `ThinkSchool-Take02-FullVideo`
- **Source of Truth Slice:** `D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov` (Timeline: `96.43s` to `207.27s`)
- **Key Visual Milestones:**
  1. *Startup Wealth Destruction Graveyard:* Paytm (-72%), Nykaa (-61%), Swiggy (-38%) red cards.
  2. *OFS Definition & Silicon Valley Cash-Burn Exit Plumbing Diagram.*
  3. *Real DRHP Scanned Table (Page 68):* Debt prepayment proof with 2.5D tilt & gold laser highlighter (`01_real_drhp_debt_prepayment_table.png`).
  4. *Meta & Google 2020 Deal Dossier ($65B valuation) vs $120B IPO Multiple Podiums.*
  5. *Whale Conviction Compounding & ₹30,000 Cr Treasury Inflow Vault.*
- **SaN's Feedback & Breakthrough Calibrations:**
  1. *Source Media Lock:* AI initially cut from raw camera file (`20261020_141418.mp4`). SaN locked rule: Always cut directly from the master edited draft `D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov`.
  2. *Facecam Real Estate (The 30–32% Screen Rule):* Trapping SaN in a small circle was rejected. SaN was elevated to 32% screen real estate (chest-up tall presenter frame: `580px × 980px` with 24K gold bezel), alternating Left and Right every 15–20s. Circle PIP (`320px × 320px`) was restricted to high-density full-canvas documents.
  3. *Word-Level Kinetic Snapping:* Ran Faster-Whisper on master audio and quantized all 23 sentence beats to exact frame boundaries, resolving visual non-sync.
  4. *Proxy Faststart (`+faststart`):* Fixed Chrome `DEMUXER_ERROR_COULD_NOT_OPEN: Code 4` by moving the MP4 `moov` atom to byte 40.
  5. *Root Composition Hygiene:* Deduplicated 8 stray copies of `ThinkSchool-Take04` in `Root.tsx`.
  6. *Tier 2 Validation Verification:* Rendered a 10s MP4 (`Take2_LipSync_Validation.mp4`) in 55s to verify 100% lip-sync in VLC before rendering the full 110.7s video.

---

### Masterclass #001 Take 03: The ₹27,500 Crore Debt Destruction & P&L Expansion (Motion Graphics Chapter 3)
- **Date Assembled:** 2026-10-21 | **Duration:** 88.00s (2,640 frames @ 30fps)
- **Composition:** `ThinkSchool-Take03-FullVideo`
- **Output Render:** `dmart-video-engine/out/Take3_Master_FullVideo.mp4` (58.15 MB, H.264/AAC @ 5.28 Mbps)
- **Source of Truth Slice:** `D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov` (Timeline: `207.08s` to `295.06s`)
- **Key Visual Milestones:**
  1. *Opening Hook (0–120):* Full-Screen A-Roll on *"So if the promoters are not taking money out..."*
  2. *Capital Routing Hub (120–204):* Fresh Issue capital flow to RJIL. SaN in Left Rectangular Canvas (35%).
  3. *DRHP Page 75 Objects Table (204–644):* Full-screen edge-to-edge statutory document. Camera zooms deeply into Row 1; vibrant yellow marker highlighter sweeps across *"Prepayment or repayment... RJIL: ₹27,500.00 Cr"* on Frame 296. Calibrated Circle PIP overlaid in bottom-left over document. Zero teal boxes.
  4. *Pre-IPO Debt Monolith (738–989):* ₹59,140 Cr external borrowing counter. SaN in Right Rectangular Canvas.
  5. *50% Cyan Laser Decapitation (989–1318):* Cyan laser cuts monolith at Frame 1130 on *"nearly half"*. SaN in Circle PIP.
  6. *Interest Leakage (1570–1828):* > ₹8,000 Cr annual bleed card enters at Frame 1570 on *"over 8,000 crore"*. Full-Screen A-Roll prior (zero premature graphics).
  7. *Savings Odometer (1828–2106):* Permanent steel weld + ₹4,000 Cr gold odometer.
  8. *P&L Gravity Waterfall (2106–2309):* SaN in Left Rectangular Canvas. Interest card dissolves into vapor on *"disappears"* $\to$ Liquid gold stream flows on *"flows down"* $\to$ Net profit card surges to ₹30,000+ Cr on *"into net profit"*.
  9. *The Zero-Burden Paradox (2309–2640):* SaN switches to Right Rectangular Canvas. Card 1 (`0 USERS`) slams on *"single new mobile subscriber"* $\to$ Card 2 (`₹0.00 HIKE`) slams on *"even 1 rupee"* $\to$ Multiplier formula and green audit stamp (`DE-LEVERAGED ✔`) slam on *"mathematically expands"*.

---

### Masterclass #001 Take 04: The Operational Machine & Duopoly Valuation Benchmark (Motion Graphics Chapter 4)
- **Date Assembled:** 2026-10-21 | **Duration:** 112.77s (3,383 frames @ 30fps)
- **Composition:** `ThinkSchool-Take04-FullVideo`
- **Output Render:** `dmart-video-engine/out/Take4_Master_FullVideo.mp4` (76.11 MB, H.264/AAC @ 5.40 Mbps)
- **Source of Truth Slice:** `D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov` (Timeline: `295.38s` to `408.15s`)
- **Key Visual Milestones:**
  1. *Opening A-Roll (0–272):* Full-Screen Facecam on investing isolation hook.
  2. *Duopoly Battlefield (272–424):* SaN in Left Column (35%). Jio Cyan vs Airtel Crimson battle cards pop at F360 & F401.
  3. *Extended Bridge A-Roll (424–560):* Full-Screen Facecam on *"Let's look at raw operating metrics... Jio commands an empire of over..."* (Zero empty boxes).
  4. *Subscriber Empire (560–850):* SaN in Right Column (35%). Jio 53.3 Cr Tower rises on F560 $\to$ 40% Share Badge on F674 $\to$ Airtel 40.5 Cr Tower on F766 $\to$ +12.8 Cr Advantage Bracket clamps on F826.
  5. *50.1% EBITDA Margin Profile (850–1204):* SaN in Left Column. Hero 50.1% EBITDA Speedometer sweeps alone (bottom row hidden) $\to$ Revenue Card (`> ₹1.28L Cr`) enters on F1020 $\to$ Net Profit Card (`> ₹26,000 Cr`) enters on F1120.
  6. *Cash Flow Forensic (1204–1592):* SaN in Right Column. OCF Card (`> ₹68,120 Cr`) enters on F1255 $\to$ 2.62x Multiplier Banner on F1327 $\to$ Reported Accounting Profit (`₹26,000 Cr`) on F1381 $\to$ Rubber Stamp `✔ 100% REAL CASH COLLECTION` slams on F1513 $\to$ Red cancellation line strikes on F1564.
  7. *Screener.in Valuation Shootout (1592–2308):* SaN in Calibrated Circle PIP at Bottom-Left (`x: 60, y: 700`, `cropX: -236px, cropY: -75px, cropScale: 0.433x`). Jio 34x–35x P/E Podium horizontally & vertically centered in right 60% viewing space $\to$ Airtel 48x–52x Podium enters on F2158 into side-by-side comparison.
  8. *~30% Discount Arbitrage (2308–2713):* SaN in Right Column. 3 Checkmark Badges $\to$ Gold Discount Banner on F2621.
  9. *43.7 GB/Month Data Beast (2713–2929):* SaN in Left Column. Glowing blue liquid cylinder burst on F2864.
  10. *ARPU Leverage Rocket & Slide Wipe (2929–3383):* SaN in Right Column. ARPU climbs from ₹219 to ₹300 $\to$ Rocket lever (+₹10 ARPU = +₹5,000 Cr EBITDA) $\to$ Seamless Chapter 5 Slide Wipe transition.

---

### Masterclass #002: Pathfinder Session Conclusion & Live Masterclass Funnel (Oct 22)
- **Date Assembled & Rendered:** 2026-10-22 | **Duration:** 141.95s (4,258 frames @ 30fps)
- **Composition:** `PathfinderOct22Outro`
- **Output Render:** `pathfinder-oct22-engine/out/Pathfinder_Oct22_Outro_Master.mp4` (95.47 MB, 1080p H.264/AAC @ 5.64 Mbps)
- **QuickShare Deployment:** `D:\QuickShare\Pathfinder Oc 22nd\Oct22_Path_Outro\Pathfinder_Oct22_Outro_Master.mp4`
- **Source of Truth Slice:** `D:\QuickShare\Pathfinder Oc 22nd\Oct22_Path_Outro\Oct22_Path_Outro.mov` (141.94s)
- **Funnel Objective:** Concludes morning Pathfinder stock analysis (Jio Financial Services, Dixon Technologies, Tube Investments of India) and funnels viewers into the **Free Live Masterclass on Sunday, November 1st @ 3:00 PM IST**.
- **Key Breakthrough Calibrations & SaN Feedback Implemented:**
  1. *Elimination of Premature Scene Exits & Millisecond Flickers:*
     - **Frame 792 ("Live Market Psychology"):** Extended Scene 4 boundary to Frame 865. Feature 3 enters @ Frame 775–780 and stays mounted through Frame 850 (**75 frames / 2.5s dwell time**).
     - **Frame 2110 ("3 HOURS WITH SANTOSH"):** Unified Scene 10 & 11 across Frames 1914–2313. `₹0 FINANCIAL COST` stamps @ Frame 2045, `3 HOURS` stamps @ Frame 2100, and `Sunday, Nov 1st @ 3:00 PM` illuminates @ Frame 2141. All three stay mounted together until Frame 2295 (**195 frames / 6.5s of continuous dwell time**).
     - **Bonus & Masterclass Sequence (Frames 356–630):** Teaser enters on *"Coming back to the bonus part"* (@ 356); VIP Masterclass Pass and Gold Seal slam in right on *"is the MASTER CLASS"* (@ 485) and dwell until Frame 616 (**131 frames / 4.4s**).
  2. *Mobile Legibility Upgrade (Frames 72 & 1881):*
     - Upgraded all body and badge typography for mobile viewports: main headlines `50px–56px`, cards `32px–34px` bold, badges `18px–24px` ultra-bold. Zero unreadable micro-text.
  3. *Facecam Side Stability (The 60-Second Rule):*
     - Eliminated rapid left/right ping-ponging; anchored SaN in extended blocks:
       - Frames 0–186 (6.2s): Full Facecam
       - Frames 186–1914 (~58s steady): Fixed on Right
       - Frames 1914–3005 (~36s steady): Fixed on Left
       - Frames 3005–4000 (~33s steady): Fixed on Right
       - Frames 4000–4258 (~9s): 100% Full Canvas Facecam
  4. *Correct Domain & 280px Elite QR Code (Frame 1248):*
     - Corrected domain to **`www.happy-investing.in`**.
     - Upgraded QR code to a prominent **280px × 280px** card on white background with precision corner reticles and green scanning radar beam, active and prominently scannable across 130 frames (4.3s).
  5. *Custom Member & WhatsApp Image Zoom Route (Frame 2539):*
     - Embedded `Whatsap image.png` with cinematic keyframed camera motion: Overview $\to$ Zoom-in to Member Section (@ Frame 2606–2656) $\to$ Zoom-out $\to$ Zoom-in to WhatsApp Icon Arrow (@ Frame 2676–2731).
  6. *Branding & Price Slash Consistency:*
     - Strictly branded as **`★ HAPPY INVESTING PATHFINDER`**.
     - Regular price of `~~₹333~~` dynamically struck through with animated red slash $\to$ explodes into `₹0 (100% FREE BONUS)`.
  7. *Full Facecam Dominance for Finale:*
     - From Frame 4000 to 4258, SaN occupies **100% full screen** with an elegant floating lower-third gold ribbon for the final sign-off.

---

### Masterclass #003: Equitas Small Finance Bank Long-Form Rough-Cut (2026-10-30)
- **Format:** 16:9 Long-Form Educational Masterclass (7 Video Takes + 2 OBS Screen Recordings, 61m 03s raw footage)
- **Target Draft:** `Equitas SFB draft`
- **Reviewed Calibration Benchmark:** `Equitas SFB draft SaN Reviewed` -> `Reviewed - First part` (11 clips | 160.00s)
- **The AI Initial Error (The 25-Clip Jump-Cut Fiasco):**
  - AI produced 25 micro-clips (162.63s) by blindly applying the Short-Form silence rule (cutting internal pauses > 0.4s) and slicing video at Faster-Whisper subtitle/comma boundaries.
  - Forward-scanning failure: The AI kept the flawed, abandoned take at `66.4s - 71.8s` (Yes Bank stumble) and dropped SaN's clean winning take at `84.3s`. It also kept the false start at `128.7s` (Category 2) instead of excising it before `140.7s`.
- **SaN's Master Benchmark & Calibrated Invariants:**
  1. **Macro Thought Block Invariant:** A coherent thought or paragraph in 16:9 Long-Form is **strictly atomic**. Never slice using Whisper comma/segment breaks. Preserve natural $0.4\text{s} - 1.0\text{s}$ breath and emphasis pauses between clauses. Average long-form clip duration must be **$10\text{s} - 25\text{s}$**.
  2. **Backward-Scanning Take Resolution:** Never scan forward. Always anchor to the **final, resolved winning take** in any cluster, then backward-scan to excise all precursor stumbles, false starts, and dead air leading up to it.
  3. **Acoustic Snapping & Boundaries:** Snap in-points to true acoustic speech onset (RMS $\ge 800$) minus strictly $40\text{ms} - 50\text{ms}$ pre-roll (eliminating mouth breathing while preserving initial consonants). Add **$250\text{ms} - 350\text{ms}$ natural acoustic post-roll** after trailing word cessations before cutting.
  4. **The Mandatory Interactive Confirmation Gate:** Before writing CapCut timelines, the agent must ask SaN to confirm:
     - *Confirmation A: Format & Pacing Mode* (16:9 Macro Thought Blocks vs 9:16 Snappy Shorts).
     - *Confirmation B: Thought Block Cut Sheet* (Presenting the proposed macro clips and excised retakes for SaN's quick sign-off).

---

### Masterclass Calibration #003-B: In-Point Acoustic Snapping & Reset Excision (2026-10-31)
- **Calibration Benchmark:** `Equitas SFB draft-R2` -> `Master Edit (23m 56s)`
- **Inspected Empirical Delta (Clips 12-15):**
  - **Clip 12:** In-point trimmed from `5.800s` $\to$ `6.233s` (**+433ms trimmed**). Excised pre-speech inhale and mouth click before *"Let's begin the story..."*.
  - **Clip 13:** In-point trimmed from `61.933s` $\to$ `62.667s` (**+733ms trimmed**). Excised awkward dead-air pause before *"Just a few months ago..."*.
  - **Clip 14:** In-point trimmed from `75.133s` $\to$ `75.467s` (**+333ms trimmed**). Excised pre-speech breath before *"In his formal resignation letter..."*.
  - **Clip 15:** In-point trimmed from `98.000s` $\to$ `101.733s` (**+3.733s trimmed!**). Excised massive 3.73-second dead-air pause after an aborted sentence before *"Equitas Bank also provides..."*.
  - **Out-Point Delta:** Strictly **0.000s across all clips**. The macro duration and clip endings were 100% sound.
- **Root Cause & Stabilized Invariants:**
  1. **The Inhale & Lip-Smack False Positive:** Low thresholds ($\text{RMS} \ge 800$) triggered on non-speech mouth clicks ($\text{RMS} \approx 800 - 1,200$) instead of speech bursts ($\text{RMS} \ge 2,500 - 12,000$). New Invariant: Trigger on $\text{RMS} \ge 2,500$ with $10\text{ms} - 30\text{ms}$ tightly bounded pre-roll.
  2. **Aborted Take Reset Blindness:** When an aborted take occurs, never position the in-point in the preceding dead-air gap. Always backward-snap strictly to the true start of the resolved winning take.

---

### Masterclass #004: Layoff Reality & Second Income Rough-Cut & CapCut Loading Architecture (2026-10-31)
- **Raw Master:** `D:\QuickShare\20261031_091005.mp4` (4K 16:9 Landscape @ 30fps, 191.90s / 3m 12s)
- **Target Draft:** `Second Income & Layoff Reality draft`
- **Output:** Master Edit (2m 23s / 143.47s) | 6 Macro Thought Blocks | 1.338x Compression Ratio
- **The Issue Reported:** User could not open draft in CapCut Desktop.
- **Root Cause Forensic Diagnosis:**
  1. *Timeline ID Mismatch:* Subagent generated new UUIDs for `Timelines/project.json` and timeline directories, but did not update `master_dc["id"]` or `raw_dc["id"]` in `draft_content.json`, leaving stale IDs from the template (`9D0258DD-C060-490b-A02A-5264894C1C8F`).
  2. *52-Key `draft_meta_info.json` Omission:* Subagent created `draft_meta_info.json` from an empty dictionary `{}` with only 6 keys, omitting 46 essential CapCut keys—most critically `draft_materials` and `draft_root_path`.
  3. *Video Material ID Sync Failure:* CapCut requires each video material in `draft_content.json["materials"]["videos"]` to have a matching entry in `draft_meta_info.json["draft_materials"][0]["value"]` with identical `id`.
  4. *Stale `attachment_id_mapping.json`:* Root `common_attachment/attachment_id_mapping.json` retained 26 stale template UUIDs instead of mapping the new project's 6 segments.
  5. *Config Export Range Past Timeline Duration:* Template retained an export range starting at `156.16s` while the video ends at `143.47s`.
- **Stabilized CapCut Loading Invariants (The 5 Golden Rules):**
  1. **Strict ID Alignment:** Root and timeline `draft_content.json["id"]` MUST strictly equal `timeline_master_id` and `main_timeline_id` in `Timelines/project.json`.
  2. **52-Key Template Integrity:** Always copy full `draft_meta_info.json` dictionary from a valid template; never construct it from scratch.
  3. **Bi-Directional Video Material Mapping:** The UUID in `materials.videos[0].id` must match `draft_materials[0].value[0].id`.
  4. **Attachment ID Overwrite:** Overwrite `attachment_id_mapping.json` in both root and timeline subfolders.
  5. **Clean State Hygiene:** Reset `config.export_range` to `None` and `materials.material_animations` to `[]`.

---

### Masterclass #005: Equitas SFB Masterclass Intro Frame-by-Frame Motion Graphics & Master Export (2026-10-31)
- **Master Input:** `D:\QuickShare\Pathfinder Oc 22nd\Equitas SFB draft-R2(1) - part 1.mov` (160.00s / 4,800 frames @ 30fps)
- **Master Composition:** `dmart-video-engine/src/compositions/EquitasSFB_Masterclass_Intro_V2.tsx`
- **Output Master Export:**
  - Workspace File: `work/EquitasSFB_Masterclass_Intro_V2_master.mp4` (264.68 MB)
  - QuickShare File: `D:\QuickShare\Equitas SFB\EquitasSFB_Masterclass_Intro_V2_master.mp4`
  - Specifications: 1920×1080 | 30.0 fps CFR | 4,800 frames | Exactly 160.00s | H.264 CRF 18 | 48kHz Stereo AAC
- **Reviewed Calibration Items & Learnings:**
  1. **Strict Zero-Corner Clutter Mandate:** Screen edges, margins, and borders must remain 100% clean. Stripped all artificial corner docket text, mock file IDs (`FILE: EQUITAS-BNK-2026`), classification banners (`SPECIAL FORENSIC REPORT`), and fake axis text.
  2. **Screen Recording Playback Delay (TradingView Fall):** When sliding in dynamic screen recordings (`fall_in_tradingview.mp4`), never start video playback before the container enters. Container animates in at frame 138; video playback starts strictly at frame 165.
  3. **Visual Timing Alignment to Spoken Thought Chunks (Category 2 & Due Diligence):**
     - *Investor Deflecting Noise Visual:* Must stay active from speech onset (`frame 2348` / *"does not listen to news..."*) all the way until the end of the thought chunk (`frame 2473` / *"...created by them"*).
     - *Due Diligence Visual:* Launches in full screen first at `frame 2473` (*"They take a deep breath and sit down,"*), then smoothly transitions to the right-hand card at `frame 2540` while SaN appears on the left (*"they open actual financial ledgers..."*) before the 3 Questions begin at `frame 2745`.
  4. **Dynamic Typography Sizing & Outro Reinforcement:**
     - Roadmap card footer text enlarged from 18px to 24px/26px bold (`Make sure you watch till the very end` & `Happy Investing`) with warm golden bezel.
     - Spoken outro at frame 4647–4796 reinforced with a centered frosted pill badge at screen bottom.
  5. **Removal of Redundant Script Artifacts:** Stripped hardcoded 200 DMA rules from fundamental due diligence blocks to preserve strict focus on banking turnaround metrics and concall analysis.

---

### Masterclass #006: Equitas SFB CEO Resignation Investigation (Part 2) — 9-Scene Master Assembly & Pre-Flight Review (2026-10-31)
- **Master Input:** `D:\QuickShare\Pathfinder Oc 22nd\Equitas SFB draft-R2(1) - part 2.mov` (180.67s / 5,420 frames @ 30fps)
- **Master Composition:** `dmart-video-engine/src/compositions/equitas/EquitasSFB_CEO_Resignation_Master.tsx` (`EquitasSFB-CEO-Resignation-Master`, 1920x1080 @ 30fps)
- **Output Master Export:**
  - Production Master: `dmart-video-engine/out/EquitasSFB_CEO_Resignation_Master.mp4` (180.4 MB)
  - Specifications: 1920×1080 | 30.0 fps CFR | 5,420 frames | Exactly 180.67s | H.264 CRF 18 (7.99 Mbps) | 48kHz Stereo AAC
- **Component Subsystem:** 11 specialized forensic modular components in `dmart-video-engine/src/compositions/equitas/components/`.
- **Pre-Flight Asset Alignment & Path Hardening:**
  1. *Subfolder Path Audit:* Fixed asset path mismatches where components referenced direct filenames instead of organized subdirectories (`assets/equitas/company_logos/`, `assets/equitas/portraits/`, `assets/equitas/photographs/`, `assets/equitas/generated_images/`).
  2. *Verified TypeScript Compilation:* `npx tsc --noEmit` cleanly passed with 0 errors.
  3. *Tier 1 Still Verification:* Validated key timeline anchors (`out/equitas_fixed_f50.png`, `out/equitas_fixed_f70.png`, `out/equitas_fixed_f397_centered.png`, `out/equitas_fixed_f940.png`) using `npx remotion still` with entry point `src/index.ts`.
  4. *Zero Upfront Heavy Render Mandate:* No full-length ProRes/MP4 exports run prior to local timeline sign-off. Live Remotion Studio dev server active on `http://localhost:3000` for SaN's real-time review.
- **SaN Editorial Calibration & Upgrades (2026-10-31 Review):**
  1. *Clean Light Theme Conversion:* Transitioned narrative stages from dark mode to clean warm editorial light theme (`#F7F6F2` canvas, pure `#FFFFFF` elevated cards, `#0F172A` high-contrast rich slate black typography, `#005953` authentic Equitas Teal, `#F58220` Equitas Orange). Solved logo visibility where authentic bank and NBFC logos previously had poor contrast on dark backgrounds.
  2. *Elephant in the Room Cinematic Hook Preserved:* Restored opening hook (Scene 01) to cinematic dark background (`#0A0F1D`) with radial vignette, pure white typography (`#FFFFFF`) for `"THE ELEPHANT"`, glowing electric cyan (`#38BDF8`) for `"IN THE ROOM."`, and dark frosted glass pill for `"FORENSIC INVESTIGATION"`.
  3. *Founder Portrait Facial Clarity (Zero Scrim Occlusion):* Replaced tall white gradient overlay with an executive split-card layout (`760px × 860px`): upper 560px window displays 100% unobstructed, crystal-clear photograph of P.N. Vasudevan with zero facial blur or wash over his chin/mouth, while lower 300px white plaque houses mobile-first bio typography and official Equitas logo pill.
  4. *Sentence-Synchronized Kinetic Snapping:* Fixed premature graphic triggers. In Scene 3 (`BusinessOverlapAnimation`), the "POTENTIAL COMPETITION / OVERLAP" badge previously popped at frame 1505 (360 frames / 12 seconds early while discussing RBI license). Now quantized strictly to frame 1868 when SaN speaks the exact words *"or a potential competition between the bank and his family's NBFC"*.
  5. *Frame 982 Interruption Banner Presence (4.3s Screen Time):* Relocated `isInterrupted` trigger in `HistoricalTimeline.tsx` to frame 855 (`relFrame 415`), exactly when SaN asks *"why he stepped down abruptly in October 2026?"*, expanding on-screen duration from 13 frames (0.4s) to 128 frames (4.3s) before Scene 03.
  6. *Host Facecam Centering Calibration:* Eliminated nested `div` with `center center` transform origin. Directly applied `<Video>` with `transformOrigin: "top left"` and calibrated translation `translate(-625px, -85px) scale(1.04)` to center SaN with balanced shoulder margins inside the 580px tall container.
  7. *Mobile-First Typography & Stage Utilization:* Expanded card layouts to eliminate dead screen voids across the 1140×980 graphics stage. Enlarged metric numerals to 88px–104px, headings to 24px–48px bold black, and body descriptions to 16px–20px for crystal-clear readability on mobile devices (which represent 99% of audience impressions).
  8. *Climax Question HUD Synchronization:* In Scene 8, question banner now arrives on *"multi-million dollar question"* (frame 4845), "FUNDAMENTALLY STRONG?" pops on *"strong"* (frame 5010), and "OR FUNDAMENTALLY WEAK?" pops on *"weak"* (frame 5065). All rendered on crisp white elevated cards.

---

### Masterclass #007: Equitas SFB Screener Part 1 — YoY & QoQ Forensic Story (2026-10-31)
- **Master Input:** `D:\QuickShare\Equitas SFB\Capcut\Equitas SFB draft- r2 Review.mov` (66.50s / 1,995 frames @ 30fps)
- **Master Composition:** `dmart-video-engine/src/compositions/EquitasSFB_Screener_Part1.tsx` (`ESFB-Screenr-1-Video`, 1920×1080 @ 30fps)
- **Output Master Export:**
  - QuickShare Master: `D:\QuickShare\Equitas SFB\ESFB_Screener_1_Master.mp4` (78.86 MB)
  - Specifications: 1920×1080 | 30.0 fps CFR | 1,995 frames | Exactly 66.50s | H.264 CRF 18 (9.48 Mbps) | 48kHz Stereo AAC
- **Key Visual & Engineering Milestones:**
  1. *Single Persistent `<Video>` Architecture:* SaN starts full-screen for the hook (0–198f / 6.6s), then smoothly springs to Left-Tall (`580×980`, radius `24px`, calibrated centering `translate(-681px, -85px) scale(1.05)`).
  2. *Right-Side Big Screener Window (`1180×980`):* Authentic Mac window title bar with dynamic URL pill (`screener.in / EQUITASBNK / profit-loss` or `quarters`) and live status tag.
  3. *Deterministic Viewport Centering Formula:* Overcomes CSS `transformOrigin` clipping by calculating `translateX = viewCenterX - targetX * scale` and `translateY = viewCenterY - targetY * scale` to keep target data and vertical year headers dead-center in the 1180px viewport.
  4. *Scene 1 YoY Highlights (`esfb_screener_yoy_799.png`):*
     - Vertical year retention headers (`Mar 2023`, `Mar 2024`) preserved at the top of the viewport.
     - Frame 476: Green animated stroke box sweeps around `FY23 (574)` + `FY23: ₹574 Cr` badge.
     - Frame 635: Amber pulsing stroke box locks onto `FY24 (799)` + `★ Peak: ₹799 Cr` badge.
  5. *Scene 2 QoQ 200 Cr Run (`esfb_screener_qoq_200cr.png`):*
     - Frame 703: Smooth crossfade to quarterly statement. Green stroke wraps first 3 columns (`Sep 23: 198`, `Dec 23: 202`, `Mar 24: 208`) + badge: `✓ Reliably Printing > ₹200 Cr / Quarter`.
     - Frames 866–1198: 3 frosted glass kinetic metric cards pop along the bottom (`NIM: 7.7%`, `ROA: ~2.0%`, `Stock: > ₹84`).
  6. *Scene 3 QoQ Crash & Shock Loss:*
     - Frame 1198: Camera pans rightward to FY25 collapse columns.
     - Frame 1406: Stable reference highlight on `Mar 2024: 208`.
     - Frame 1528: Amber stroke box snaps onto `Jun 2024: 26` + badge: `Jun 24: ₹26 Cr` (-87.5% crash).
     - Frame 1653: Rose stroke box snaps onto `Sep 2024: 13` + badge: `Sep 24: ₹13 Cr`.
     - Frame 1778: Pulsing Signal Red stroke box locks onto `Jun 2025: -224` + cinematic boom SFX + prominent warning banner: `SHOCK LOSS: -₹224 Cr`.
  7. *Flexible Calibration HUD:* Exported `SCREENER_CONFIG` with `SHOW_CALIBRATION_HUD` for instant hot-reloadable coordinate adjustments at `http://localhost:3000`.

---

### Masterclass #008: Equitas SFB Screener Part 3 — The Phoenix Rebound & Record Earnings Power (2026-10-31)
- **Master Input:** `D:\QuickShare\Equitas SFB\Capcut\ESFB - Screenr - 3 - video.mov` (63.50s / 1,905 frames @ 30fps)
- **Master Composition:** `dmart-video-engine/src/compositions/EquitasSFB_Screener_Part3.tsx` (`ESFB-Screenr-3-Video`, 1920×1080 @ 30fps)
- **Output Master Export:**
  - QuickShare Master: `D:\QuickShare\Equitas SFB\ESFB_Screener_3_Master.mp4` (69.33 MB)
  - Specifications: 1920×1080 | 30.0 fps CFR | 1,905 frames | Exactly 63.50s | H.264 CRF 18 (8.73 Mbps) | 48kHz Stereo AAC
- **Key Visual & Editorial Milestones:**
  1. *Hook Delivery (Frames 0–156):* SaN starts full-screen introducing the thesis (*"Now look at the Phoenix rebound because they took a medicine upfront..."*).
  2. *Split-Screen Transition (Frame 156):* SaN springs into Left-Tall (`580×980`, radius `24px`, subtle border & shadow) with chest-up centering (`translate(-681px, -85px) scale(1.05)`). Screener browser window springs in on the Right (`1180×980`).
  3. *Deterministic Framing of Rebound Columns (`esfb_screener_qoq_200cr.png`):*
     - Viewport centered at `targetX = 1470, targetY = 410, scale = 1.25`, keeping both year headers (`Dec 25`, `Mar 26`, `Jun 26`, `Sep 26`) and metric rows (`Net Profit`, `Gross NPA`, `Net NPA`) visible simultaneously.
  4. *Sentence-Quantized Net Profit Highlights:*
     - Frame 249: Emerald stroke box sweeps around **Dec 2025: ₹90 Cr** (`x: 1325, y: 498`) + `Dec 25: ₹90 Cr (Recovered)` badge.
     - Frame 383: Box highlights **Mar 2026: ₹213 Cr** (`x: 1435, y: 498`) + `Mar 26: ₹213 Cr (+136% QoQ)` badge.
     - Frame 523: Box highlights **Jun 2026: ₹184 Cr** (`x: 1545, y: 498`) + `Jun 26: ₹184 Cr (Momentum)` badge.
     - Frame 708: Pulsing glowing gold/emerald box locks onto **Sep 2026: ₹218 Cr** (`x: 1655, y: 498`) + `★ All-Time Peak: ₹218 Cr (+803% YoY)` badge + cash chime SFX.
  5. *Asset Quality Lockdown (Frames 1206–1519):*
     - Dual Cyan stroke boxes snap onto **Gross NPA: 2.29%** (`y: 566`) and **Net NPA: 0.70%** (`y: 598`).
     - Safety Shield badge highlights record-low Net NPA well below the 1% safe threshold.
  6. *Milestone & Fundamental Thesis (Frames 1519–1905):*
     - Frame 1519: `₹1,00,000 Cr Total Business Landmark` card springs into the viewport with cinematic impact SFX.
     - Frame 1652: Emerald thesis ribbon confirms `✓ Credit Cycle Absorbed · Firing at Peak Earnings Power`.
  7. *Audio Replacement Invariant:* When SaN supplied an updated master cut `ESFB - Screenr - 3 - video.mov` to fix an audio glitch, re-generated the All-Intra proxy and uncompressed 48kHz WAV audio, re-aligned Faster-Whisper word timestamps, and verified 100% sync before the final Tier 3 master render.


---

### Masterclass #009: Equitas SFB Screener Part 2 — Kinetic Alignment, Dominant Visuals & Mobile Optimization (2026-10-31)
- **Master Input:** `D:\QuickShare\Equitas SFB\Capcut\ESFB - Screenr - 2 - Video.mov` (118.13s / 3,544 frames @ 30fps)
- **Master Composition:** `dmart-video-engine/src/compositions/EquitasSFB_Screener_Part2.tsx` (`ESFB-Screenr-2-Video`, 1920×1080 @ 30fps)
- **SaN Review Feedback & Operational Upgrades:**
  1. **Kinetic Word-Alignment Gate (Zero Anticipatory Pop-in Mandate):**
     - *Root Cause Diagnosed:* Subagent set arbitrary early offsets (`sceneFrame - 15`, `sceneFrame - 35`), causing graphic elements to pop into view 50–200 frames (2–7 seconds) before SaN pronounced the corresponding financial figure.
     - *Empirical Rectification:*
       - Scene 01: FY24 Peak ₹799 Cr snaps to frame 16 (*"profit"*); -₹224 Cr drop snaps to frame 66 (*"drastically"*); Panic card snaps to frame 145 (*"bank is collapsing"*).
       - Scene 02: Concall filing snaps to frame 355 (*"conference called Transcript"*); Highlighter sweep snaps to frame 405 (*"the reason was very specific"*).
       - Scene 03: Multi-lender flow snaps to frame 596 (*"Lender has flooded..."*).
       - Scene 04: 5 stacked loan cards cascade sequentially from frames 760–830 as SaN speaks (*"taking four to five different loans"*); Total debt trap box slams on frame 845 (*"simultaneously"*).
       - Scene 05: Karnataka shock card snaps to frame 950 (*"Karnataka"*); Heatwave card snaps to frame 990 (*"heat waves disrupted"*); Domino contagion banner snaps to frame 1070 (*"defaults exploded"*).
       - Scene 06: FY24 2.30% bar grows at frame 1290 (*"from 2.3%"*); FY25 11.37% bar explodes at frame 1388 (*"to a staggering 11.37%"*); Almost 5x multiplier badge pops at frame 1420.
       - Scene 07: ₹630 Cr hero metric reveals at frame 1545 (*"over 630 crores"*); Rubber stamp slams at frame 1600 (*"operating profits"*).
       - Scene 08: Weak management trap snaps to frame 1725 (*"hide their bad loans"*); Equitas honesty card snaps to frame 1808 (*"No, not actually"*).
       - Scene 09: Loss recognized card snaps to frame 2015 (*"accepted a big loss of 224 crores"*); Cleaned in one go stamp slams to frame 2120 (*"cleaned up all their bad loans in one go"*).
       - Scene 10: Red underwriting gate slams to frame 2540 (*"bank simply said no for the new loans"*).
       - Scene 11: Rejection rate stat snaps to frame 2630 (*"rejected almost half"*); Safety over growth trade-off cards snap to frame 2760 (*"chose safety over the risky growth"*).
       - Scene 12: Doughnut chart draws 85% core at frame 2913 (*"overall in 100% of the business"*); Stressed 15% coral section highlights at frame 2972 (*"only 15% is actually attributed to this risk"*).
       - Scene 13: 3 Asset cards pop sequentially on words: Property (frame 3185), Shops (frame 3218), Commercial Vehicles (frame 3235).
       - Scene 14: 12 monthly EMI checkmarks sweep across calendar from frame 3323 onwards (*"almost everyone pays the EMI properly on time"*).
  2. **Mobile-First Legibility Standard (Eliminating Small Text):**
     - Scaled all secondary badge labels from 12px–14px up to 16px–18px bold uppercase.
     - Body descriptions and takeaway footnotes increased from 16px–18px up to 20px–22px bold.
     - Main comparison card headings increased from 18px–20px up to 24px–28px bold.
     - Hero numerals scaled to 58px–104px bold slate/teal/coral for effortless mobile comprehension.
  3. **Dominant Hero Visuals (The 15% vs 85% Doughnut Chart):**
     - In Scene 12, enlarged the SVG doughnut chart diameter from 240px to 340px with a bold 38px stroke and a dominant 52px central "100% / TOTAL LOAN BOOK" numeral.
     - Flanked with large, high-contrast 58px metric cards (85% Core vs 15% Stressed MFI).
  4. **Strict Zero Tracking / No Fake Docket Text Mandate:**
     - Completely scrubbed all `//` slashes, case dockets, and tracking tags (e.g. `// Screener Part 2`, `// The Forensic Audit`, `// The Domino Effect`). Replaced with clean, professional editorial badges.
  5. **Card Padding & Layout Clearance:**
     - Enforced generous container min-height (410px+) and 32px–44px internal padding in Scene 06 so "FY24 Baseline" and "Healthy credit cost" labels are 100% enclosed with breathing room.


---

### Masterclass #010: Complete 12-Take Reliance Industries Masterclass — The 12% Rally Forensic Breakdown (2026-11-02)
- **Format:** 16:9 Long-Form Educational Masterclass (12 4K Video Takes, 43m 20s / 2,599.73s raw footage)
- **Raw Masters (12 Takes in Chronological Order):**
  1. `D:\QuickShare\Reliance\20261102_213849.mp4` (203.86s) — Hook, Size Context, Happy Investing Ethos, 4 Core Questions
  2. `D:\QuickShare\Reliance\20261102_214848.mp4` (342.76s) — September 1152 Low Flashback, Multi-front Storm, Q2 FY25 Headline Results
  3. `D:\QuickShare\Reliance\20261102_220052.mp4` (130.80s) — Segment Breakdown: O2C +68% to ₹25.2k Cr, Jio +17%, Retail Reality
  4. `D:\QuickShare\Reliance\20261102_220403.mp4` (297.55s) — Refinery Economics & Crack Spreads (Gasoline 3x, Diesel 3.5x, ATF 3.7x)
  5. `D:\QuickShare\Reliance\20261102_221045.mp4` (243.58s) — Operational Flexibility & Sourcing Arbitrage (Africa 50% Share & Mediterranean)
  6. `D:\QuickShare\Reliance\20261102_221934.mp4` (267.02s) — Petrochemical Deep-Dive: US Ethane vs Asian Naphtha ($557/ton Moat & VLEC Fleet)
  7. `D:\QuickShare\Reliance\20261102_222539.mp4` (69.17s) — Forensic Methodology: Screener.in + Concall Transcripts + Better AI Questions
  8. `D:\QuickShare\Reliance\20261102_222713.mp4` (39.62s) — Family Vacation Trip Context & Raw Authenticity
  9. `D:\QuickShare\Reliance\20261102_223013.mp4` (142.89s) — Energy Integration Moat: Petcoke Gasification & Syngas Independence
  10. `D:\QuickShare\Reliance\20261102_223309.mp4` (209.79s) — Cyclical Spike vs Permanent Moats & Management ₹80,000 Cr EBITDA Guidance
  11. `D:\QuickShare\Reliance\20261102_223720.mp4` (456.22s) — 52-Week Strategy, Trader Short Covering / FOMO Anatomy & Fundamental Checklist
  12. `D:\QuickShare\Reliance\20261102_224535.mp4` (196.46s) — The Happy Investing Framework, Masterclass Invitation & Outro
- **Target Draft:** `Reliance Masterclass draft` (`%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft\Reliance Masterclass draft`)
- **Output:** Master Edit (25m 47s / 1,546.93s) | 50 Macro Thought Blocks | 1.68x Compression Ratio (40.5% excised / 1,052.80s removed)
- **Dual-Timeline Architecture:**
  - **Tab 1: `Master Edit (25m 47s)`:** 50 sequenced macro thought blocks across all 12 takes (0 microsecond gaps, quantized to 30.0fps integer frames).
  - **Tab 2: `Raw Footage (43m 20s)`:** All 12 raw takes sequenced uncut in chronological order.
- **SaN Human-in-the-Loop Post-Review Calibration & Merge (2026-11-02):**
  - **Source Project:** SaN manually fine-tuned the rough cuts for Takes 1 and 2 in CapCut Desktop under `Rel - frist 2 video`.
  - **Target Project:** Merged SaN's 13 refined cuts seamlessly into `Reliance Masterclass draft`, replacing the initial 12 AI cuts while keeping all remaining 37 cuts (Takes 3 through 12) seamlessly attached.
  - **Empirical Calibration & Timing Analysis:**
    1. *Block 04 (Take 1 Cut 5) Internal Stumble Excision & Atomic Split:*
       - AI initial cut was monolithic from `166.80s` to `199.87s` (33.07s).
       - SaN trimmed the head by `2.83s` (moving in-point from `166.80s` to `169.63s`, eliminating pre-speech throat clearing/hesitation).
       - SaN then split Block 04 into two atomic sub-blocks: Cut 05A (`169.63s – 194.63s`, 25.0s) and Cut 05B (`196.53s – 199.87s`, 3.33s).
       - In between, SaN excised `1.90s` (`194.63s – 196.53s`), which was an internal hesitation and dead-air pause preceding the final question.
    2. *Head-Slop Elimination on Take 2 In-Points (The 500ms–900ms Human Comfort Threshold):*
       - **Block 06 (Take 2 Cut 6):** In-point trimmed by **733ms** (from `1.500s` to `2.233s`), eliminating preparatory breathing before launching into *"Flashback to September..."*.
       - **Block 07 (Take 2 Cut 7):** In-point trimmed by **500ms** (from `33.200s` to `33.700s`), eliminating pre-vocal lip parting.
       - **Block 09 (Take 2 Cut 9):** In-point trimmed by **767ms** (from `148.200s` to `148.967s`), eliminating hesitation before the refining margins comparison.
       - **Block 10 (Take 2 Cut 10):** In-point trimmed by **767ms** (from `169.500s` to `170.267s`), excising dead air before announcing the September quarter results arrival.
       - **Block 11 (Take 2 Cut 11):** In-point trimmed by **933ms** (from `294.000s` to `294.933s`), eliminating nearly 1 second of visual preparation/respiration before announcing the ₹3.93 lakh Cr record revenue figure.
       - **Block 12 (Take 2 Cut 12):** In-point trimmed by **633ms** (from `326.400s` to `327.033s`), eliminating mouth movement before vocal delivery of the conclusion.
    3. *Generalizable Invariant Learned:* While automated acoustic snapping at $\text{RMS} \ge 2,500$ catches vocal burst onset, human presenters often exhibit subtle preparatory visual cues (mouth opening, chest rise) in the $500\text{ms} - 900\text{ms}$ preceding full vocal resonance. SaN prefers snapping aggressively to the immediate rising edge of the first spoken syllable.
- **SaN Calibration Rules Implemented Across All 10 Chapters:**
  1. **Strict Final-Take Anchor Rule:** Where multiple retakes occurred across all 12 takes (e.g. Take 1 Questions, Take 2 Q2 Numbers, Take 3 Retail EBITDA, Take 4 Crack Spreads, Take 5 Africa Redirection, Take 6 Ethane Differential, Take 9 Petcoke Discussion, Take 10 Cyclical Normalization, Take 11 FOMO / Short Covering, Take 12 Framework & Outro), anchored 100% to the final resolved take and backward-excised all precursor stumbles.
  2. **Vocal Burst Onset Snapping:** Snapped clip in-points to true vocal burst energy ($\text{RMS} \ge 2,500$) with $10\text{ms} - 30\text{ms}$ pre-roll, excising hundreds of pre-speech lip clicks, mouth smacks, and staring dead air across all takes.
  3. **Duplicate Question & Phrase Excision (Audio-Verified Gate):** Independent Faster-Whisper re-transcription passes flagged duplicate takes (e.g. Take 1/2 question slop, Take 3 O2C EBITDA repeat at 25,000, Take 11 fundamental checklist repeat, Take 12 allocation/config repeat, Take 12 website link repeat). Recalibrated boundaries to eliminate all duplicate phrasing.
  4. **The 5 CapCut Loading Invariants (12 Video Materials):**
     - Synced `draft_content.json["id"]` with `timeline_master_id` and `Timelines/project.json["main_timeline_id"]`.
     - Preserved all 52 keys from `Second Income & Layoff Reality draft` template in `draft_meta_info.json`.
     - Mapped all 12 video materials bi-directionally between `materials["videos"]` and `draft_meta_info.json["draft_materials"][0]["value"]` with identical UUIDs and durations.
     - Overwrote `attachment_id_mapping.json` across root and timeline folders with 50 segment UUIDs for Master and 12 UUIDs for Raw.
     - Reset `export_range = None`, `material_animations = []`, and purged all `.locked` or `.tmp` files.
     - Promoted project to Index 0 in `root_meta_info.json`.

- **Video 3 Forensic Invariant Calibration (2026-11-03):**
  - **Issue Identified:** Automated cut had sliced through O2C EBITDA at 20.9s, chopped off Jio at 44.1s mid-sentence, and dropped the full spoken introduction of Reliance Retail at 79.4s.
  - **Empirical Resolution:**
    1. *Cut 1 (0.733s – 10.167s / 9.43s):* Atomic intro to 3 businesses ("This is where the real surprise came from").
    2. *Cut 2 (20.900s – 42.100s / 21.20s):* Winning take of O2C EBITDA (+68% to 25,203 Cr) and Jio platform growth (+17%, ARPU, improving margins), ending cleanly at 42.10s before the abandoned retail stumble.
    3. *Cut 3 (78.933s – 100.067s / 21.13s):* Clean resolved take of Reliance Retail ("And third, Reliance Retail. Here the picture was not so encouraging..."), preserving the full segment introduction and operational context.
    4. *Cut 4 (110.767s – 127.367s / 16.60s):* Winning outro bridge ("What really surprised the market... hidden business story"), excising the trailing false start at 127.4s.
  - **Stand-alone Test Project Deployed:** `Reliance - Video 3 Alone test` (68.37s / 4 cuts) with dual timelines (Master Edit + Raw Video 3).

---

### Masterclass #006: Reliance Industries (Intro + Chapter 1) — Remotion Motion Graphics & Studio Review
- **Date Assembled:** 2026-11-03 | **Duration:** 203.633s (6,109 frames @ 30fps)
- **Master Composition:** `Reliance-Masterclass-Phase1` (`dmart-video-engine/src/compositions/reliance_phase1/`)
- **Key Engineering Invariants Codified:**
  1. **Zero Premature Docking / Anti-White-Screen Invariant:**
     - *Issue:* In initial drafts, the presenter docked into a 31% split container at 27.8s (`frame 835`), whereas the visual animation card (*"THE BIG CONTRADICTION"*) did not trigger until 37.3s (`frame 1120`), leaving ~9.5 seconds of empty white background on the right.
     - *Rule:* **Never dock or shrink the presenter into split mode until the exact frame where the visual catalyst/card actually animates in.**
     - *Resolution:* Keep presenter in 100% fullscreen facecam through frames 0–1120 (0.0s – 37.33s), punching in subtly on *"one level deeper"* (`1.06x`). Trigger the split dock and the card reveal simultaneously at frame 1120.
  2. **Studio-First Live Review Protocol (Zero Disk MP4 Bloat):**
     - Per SaN mandate, avoid repetitive intermediate MP4 disk renders during drafting and iterative review.
     - Rely 100% on Remotion Studio (`http://localhost:3000`) with instant Hot Module Reloading (HMR) for real-time review and frame-accurate inspection.

---

### Masterclass #007: Reliance Industries (Chapters 2 & 3) — Graphics-Only Transparent Overlay Workflow
- **Date Assembled:** 2026-11-03 | **Duration:** 207.333s (6,220 frames @ 30.0fps)
- **Source Footage:** `d:\QuickShare\Reliance\Out\Video - after adobe\My Edit - WIP - dont touch.mov` (207.333s)
- **Source Audio:** `d:\QuickShare\Reliance\Out\Part 2.WAV` (207.354s)
- **Master Composition:** `Reliance-Chapters2-3-Overlay`
- **Output Render:** `d:\QuickShare\Reliance\Out\FINAL_RELIANCE_CH2_3_OVERLAY_TRANSPARENT.mov` (3.45 GB, ProRes 4444 @ 30fps)
- **Key Engineering Invariants Codified:**
  1. **Graphics-Only Transparent Composite Architecture:**
     - Instead of forcing Remotion to decode, re-encode, and scale 4K/1080p Long-GOP presenter footage, Remotion is deployed purely as a motion graphics compositing engine.
     - Remotion renders solely the animated graphic cards and full-screen diagrams on a 100% transparent alpha channel.
     - The output ProRes 4444 `.mov` is dropped onto **Track 2** of CapCut directly above the master camera cut on Track 1, achieving instant native transparency with zero CPU/GPU rendering overhead on the presenter footage.
  2. **Remotion Apple ProRes 4444 Alpha Protocol:**
     - When rendering transparent video with `--codec=prores --prores-profile=4444 --pixel-format=yuva444p10le`, Remotion strictly requires `--image-format=png`.
     - Output stream verification confirms true `yuva444p12le` 12-bit alpha channel preservation.
  3. **Presenter Safe Corridor Protocol (Central x=650–1270):**
     - In all side-flank scenes (Visuals 1, 2, 3, 4, 5, 8, Outro Bridge), the central 620px corridor (`x=650–1270`) remains 100% transparent and unobstructed.
     - Graphic cards are strictly contained within the Left Zone (`x=60–640`, width 580px) and Right Zone (`x=1280–1860`, width 580px), alternating between Left and Right to maintain retention without covering SaN.
  4. **Live Audio-Synced Review Architecture (`Reliance-Chapters2-3-AudioTest`):**
     - To allow instantaneous local review with audio while keeping the master overlay clean, created a dedicated audio-test composition in Remotion Studio.
     - Integrates converted 256kbps web MP3 (`reliance_part2.mp3`) with dashed visual guides for the presenter safe corridor, allowing SaN to inspect audio cadence, kinetic subtitle snapping, and card animations in real time at `http://localhost:3000`.
