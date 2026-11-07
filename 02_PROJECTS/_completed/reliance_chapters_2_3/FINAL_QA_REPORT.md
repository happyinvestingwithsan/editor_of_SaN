# Reliance Industries Masterclass: Chapters 2 & 3
## Motion Graphics Overlay Production & CapCut Composite Integration Report

---

### Executive Production Summary

| Parameter | Specification | Verification Status |
| :--- | :--- | :--- |
| **Source Master Video** | `d:\QuickShare\Reliance\Out\Video - after adobe\My Edit - WIP - dont touch.mov` | Verified (207.333s / 6,220 frames @ 30.0 fps) |
| **Source Master Audio** | `d:\QuickShare\Reliance\Out\Part 2.WAV` | Verified (207.354s / 44.1kHz Stereo PCM) |
| **Chapters Covered** | Chapter 2 ("Where Did Profit Come From?") + Chapter 3 ("Global Crisis as Opportunity") + Teaser Bridge | Verified (11 Scenes complete) |
| **Master Composition** | `Reliance-Chapters2-3-Overlay` | Registered in `dmart-video-engine/src/Root.tsx` |
| **Primary Render Format** | Apple ProRes 4444 (`.mov`) with 12-bit Alpha (`yuva444p10le`) | Active (`FINAL_RELIANCE_CH2_3_OVERLAY_TRANSPARENT.mov`) |
| **Fallback Format** | Chroma Green (`#00FF00`) H.264 MP4 (`CRF 18`) | Configured (`Reliance-Chapters2-3-GreenScreen`) |
| **Screen Resolution** | 1920 × 1080 (16:9 Landscape) | Matched |
| **Timeline Synchronization** | 100% exact 1:1 timeline match with `My Edit - WIP - dont touch.mov` | Quantized to 30fps frames, zero time drift |

---

### Spatial Layout Architecture & Presenter Protection

To preserve SaN's camera visibility across the entire video:
1. **Left Graphics Zone (`x=60–640`):** Used for split-screen comparison cards, metric odometers, retail headwind autopsy dossiers, and crack-spread expansion gauges.
2. **Central Presenter Protection Zone (`x=650–1270`):** **Strictly 100% unobstructed and transparent**. SaN's chest-up framing remains fully visible with zero clutter.
3. **Right Graphics Zone (`x=1280–1860`):** Alternating information cards (Jio Platforms growth pillar, O2C Synthesis, Chapter 4 Cliffhanger Teaser) to refresh visual interest and reset viewer retention.
4. **Full-Screen Conceptual Diagrams (`1920×1080`):** High-clarity educational diagrams (Visuals 6, 7A, 7B, 9, 10) with Happy Investing soft canvas backing (`#F7FAF9`), used strictly for explaining complex industrial flows (Jamnagar refining schematic, geopolitical supply shock, crack-spread mathematical equation, operational flexibility flywheel).

---

### 11-Scene Edit Decision List (EDL) & Frame Map

| Scene # | Visual Anchor | Time Range | Frame Range | Duration | Layout Zone | Narrative Treatment |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| **01** | Visual 1: Three Business Comparison | `000.00s - 005.60s` | `f0000 - f0168` | `168f (5.60s)` | Left Zone | 3-Pillar Macro Matrix: O2C (+67.9%), Jio (+16.6%), Retail (-8.6%) |
| **02** | Visual 2: O2C Is The Big Surprise | `005.60s - 017.33s` | `f0168 - f0520` | `352f (11.73s)` | Left Zone | Giant `+67.9%` rolling odometer, ₹25,203 Cr O2C EBITDA surge |
| **03** | Visual 3: Jio Platforms Growth | `017.33s - 030.00s` | `f0520 - f0900` | `380f (12.67s)` | Right Zone | Jio Cyan card, `+16.6%` EBITDA (₹21,879 Cr), 3 growth drivers |
| **04** | Visual 4: Reliance Retail Headwinds | `030.00s - 051.00s` | `f0900 - f1530` | `630f (21.00s)` | Left Zone | Revenue ₹86,400 Cr vs EBITDA ₹6,228 Cr (-8.6%), 3 headwind tags |
| **05** | Visual 5: The O2C Story Conclusion | `051.00s - 068.00s` | `f1530 - f2040` | `510f (17.00s)` | Right Zone | Synthesis card: O2C & Jio delivered >90% incremental growth |
| **06** | Visual 7A: Jamnagar Refining Flow | `068.00s - 096.20s` | `f2040 - f2886` | `846f (28.20s)` | Fullscreen | Global Crude Tankers → Jamnagar Complex → Pure Distillates & Polymers |
| **07** | Visual 6: Global Supply Disruption | `096.20s - 146.00s` | `f2886 - f4380` | `1494f (49.80s)`| Fullscreen | Middle East & Russian refinery strikes, supply constriction & margin spike |
| **08** | Visual 8: Crack Spread Multipliers | `146.00s - 160.80s` | `f4380 - f4824` | `444f (14.80s)` | Left Zone | Official commentary: Gasoline 3.0x, Diesel 3.5x, Jet Fuel 3.7x |
| **09** | Visual 7B: Crack Spread Equation | `160.80s - 190.00s` | `f4824 - f5700` | `876f (29.20s)` | Fullscreen | Selling Value − Crude Cost = Crack Spread (Operating leverage demonstration) |
| **10A**| Visual 9: Reliance Captures Opportunity| `190.00s - 199.00s` | `f5700 - f5970` | `270f (9.00s)`  | Fullscreen | 4-Stage Arbitrage Pipeline (Sourcing → Refining → Products → Global Markets)|
| **10B**| Visual 10: Operational Flexibility | `199.00s - 204.00s` | `f5970 - f6120` | `150f (5.00s)`  | Fullscreen | 4 Strategic Pillars + Central 'OPERATIONAL FLEXIBILITY' Master Verdict |
| **11** | Outro Bridge: Chapter 4 Teaser | `204.00s - 207.33s` | `f6120 - f6220` | `100f (3.33s)`  | Right Zone | Amber cliffhanger card: "BUT WAIT... Russian Crude Discount Arbitrage" |

---

### Step-by-Step CapCut Track 2 Integration Protocol

1. **Open CapCut Project:**
   - Open your project containing the master cut `My Edit - WIP - dont touch.mov` on **Track 1** (Main Video Track).
2. **Import Overlay Master:**
   - Drag `FINAL_RELIANCE_CH2_3_OVERLAY_TRANSPARENT.mov` into the CapCut media bin.
3. **Align to Timeline Track 2:**
   - Drag the `.mov` clip onto **Track 2** (directly above the main video).
   - Snap its in-point (`00:00:00:00`) to the **exact start (0.00s)** of `My Edit - WIP - dont touch.mov`.
   - Because the overlay was rendered with identical length (6,220 frames / 207.33s), its end will snap flush to the video cut point.
4. **Alpha Transparency Handling:**
   - CapCut PC automatically recognizes Apple ProRes 4444 alpha channels. SaN will instantly appear through the central protection corridor and transparent regions. Zero keying is required.
   - If using the Chroma Green fallback `.mp4`, select the clip on Track 2, navigate to `Video` -> `Cutout` -> enable `Chroma Key`, use the color picker to sample `#00FF00`, and set `Strength` to ~12–15.
5. **Volume Settings:**
   - The overlay track contains no audio; ensure Track 1 contains master audio.
