# Remotion Production Playbook & Forensic Post-Mortem
**Standard Operating Procedure (SOP) for High-Retention Financial Video Production**
*Project Memory & Invariant Rules for Antigravity & AI Pair Programming with SaN*

---

## 1. Executive Summary & Core Mandate
This document codifies the lessons, architectural breakthroughs, and mistakes uncovered during the production of the **Jio ₹30,213 Cr Mega IPO Masterclass (Take 1)**.

Every future chat, agent, or engineer working on this codebase **MUST read and follow this playbook**. Deviations from these guidelines result in audio stutter, broken lip-sync, ruined framing, wasted compute, and review friction.

---

## 2. Forensic Autopsy: What Went Wrong & What NOT to Do

### ❌ Mistake 1: The "Python Blind Guessing" Trap (The Lamp Fiasco)
* **What Happened:** When attempting to center SaN's face in the circular facecam, the agent ran automated Python OpenCV skin-color segmentation (`cv2.inRange`) and contour heuristics. The script mistook the warm ambient glow of an incandescent room lamp (`X ≈ 433px`) for skin tone, anchoring the camera crop directly onto the lamp while completely excising SaN's head from the frame.
* **Why It Failed:** Computer vision heuristics without human review make disastrous assumptions in uneven lighting. SaN had to step in: *"Totally face is out only lamp is visible. Do not go to python again."*
* **⛔ WHAT NOT TO DO:** 
  - **NEVER** write autonomous Python CV scripts to guess face crops or camera positioning without direct interactive confirmation.
  - **NEVER** iterate blindly in terminal without visual feedback.
* **✅ WHAT TO DO INSTEAD:**
  - Build an on-screen interactive calibration HUD (pointer drag + wheel zoom) or use SaN's verified ground-truth face coordinates (`origX = 914.5px, origY = 542.7px`).

---

### ❌ Mistake 2: Feeding Raw Long-GOP Masters to Browser DOM (Lip-Sync Lag)
* **What Happened:** The raw master camera recording was a high-bitrate Long-GOP file (`Jio_Mega_IPO_8Min_Master-full video.mov`) with 200+ frame keyframe intervals (P-frames).
* **Why It Failed:** In Remotion Studio inside Chrome, scrubbing or playing an HTML5 `<video>` element with distant keyframes forced Chrome's decoding thread to decode hundreds of preceding P-frames sequentially. The browser's video frame display lagged 200–400ms behind the Web Audio API, creating the illusion of broken lip sync.
* **⛔ WHAT NOT TO DO:**
  - **NEVER** reference raw camera masters directly in `<Video src="..." />` during development or Studio preview.
  - **NEVER** use lossy MP3s for master voice tracks (MP3 introduces 30–50ms encoder priming delay that desynchronizes syllables).
* **✅ WHAT TO DO INSTEAD:**
  - **Always generate an All-Intra H.264 proxy** where **every single frame is an I-frame** (`-g 1 -keyint_min 1 -r 30`). Seeking is instantaneous (< 1ms per frame).
  - **Always extract an uncompressed 48kHz 16-bit PCM WAV** (`master_takeX.wav`) with zero priming delay.

---

### ❌ Mistake 3: Unmounting `<Video>` & Layout Thrashing (Black Flashes & Stutter)
* **What Happened:** Early components attempted to conditionally render different `<Video>` tags for full-screen vs picture-in-picture modes, or animated `width` and `height` properties on `<video>` containers.
* **Why It Failed:** Every time a `<video>` element unmounts or re-mounts, the browser tears down hardware video decoders, causing a black flash and audio glitch. Animating `width` or `height` triggers costly layout reflows on the main thread, causing audio playback stutter.
* **⛔ WHAT NOT TO DO:**
  - **NEVER** mount and unmount multiple `<Video>` elements across a composition timeline.
  - **NEVER** animate `width`, `height`, `left`, or `top` directly on the `<video>` element itself.
* **✅ WHAT TO DO INSTEAD:**
  - Implement a **Persistent Single `<Video>` Architecture**: exactly ONE `<Video>` element remains mounted across the entire 100% of the timeline.
  - Handle all camera moves, scale shifts, and screen relocations using **GPU-accelerated CSS transforms** (`translate3d`, `scale`) on an outer clipping container.

---

### ❌ Mistake 4: Coding Detailed Graphics Before Storyboard & Layout Consent
* **What Happened:** Monolith podiums and roadmap boxes were built with full details assuming a default bottom-right floating circle everywhere. Later, SaN specified: *"Keep my face right in rectangle with increased height making it center right side in screen, and show boxed one by one in left 60%"*. This required rewriting Scene 1 and Scene 5.
* **Why It Failed:** Building high-fidelity components before SaN confirms the screen real-estate allocation creates rework.
* **⛔ WHAT NOT TO DO:**
  - **NEVER** write production Remotion graphics without presenting a visual storyboard blueprint and receiving explicit consent first.
* **✅ WHAT TO DO INSTEAD:**
  - Follow the **Transcript-First Consent Gate** (detailed below) before writing any Remotion component code.

---

### ❌ Mistake 5: Leaving Interactive Dev HUD in Export Builds
* **What Happened:** The calibration drag HUD remained in the DOM, leaving SaN to wonder: *"Will the zoom button render if I approve?"*
* **⛔ WHAT NOT TO DO:**
  - **NEVER** leave development controls, drag handles, or debug overlays active in production render paths.
* **✅ WHAT TO DO INSTEAD:**
  - Suppress all HUDs completely once coordinates are locked, or gate them behind `process.env.NODE_ENV !== "production"` and explicit boolean flags.

---

### ❌ Mistake 6: Public Directory Bloat Slowing Render Starts
* **What Happened:** 2.1 GB of raw footage sat in `dmart-video-engine/public/`. Every time `remotion render` or `remotion still` was invoked, Webpack/Vite spent 30–45 seconds copying the entire 2.1 GB directory to a temp cache before rendering a single frame.
* **⛔ WHAT NOT TO DO:**
  - **NEVER** store raw multi-gigabyte camera files inside `public/`.
* **✅ WHAT TO DO INSTEAD:**
  - Store raw files in `assets/raw/` or `D:/QuickShare/`. Only place lightweight proxies (< 200MB), audio WAVs, and required image textures inside `public/`.

---

### ❌ Mistake 7: Slicing Raw Camera Takes Instead of the Master Export Draft (Source of Truth Error)
* **What Happened in Take 2:** The agent mistakenly sliced raw phone footage (`20261020_141418.mp4`) instead of the edited master export draft that SaN provided (`D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov`).
* **Why It Failed:** The raw phone camera had un-cut takes, restarts, and scratch audio. The master draft was already trimmed, color-graded, enhanced, and locked.
* **⛔ WHAT NOT TO DO:**
  - **NEVER** reach for raw unedited camera takes (`20261020_*.mp4`) when a master project cut exists in `D:\QuickShare\JIO IPO\`.
* **✅ WHAT TO DO INSTEAD:**
  - **Strict Single Source of Truth:** Always slice both video and audio directly from `D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov` using identical `-ss` and `-t` arguments.

---

### ❌ Mistake 8: The "Perpetual Circle" Facecam Trap (Under-allocating SaN's Screen Presence)
* **What Happened in Take 2:** The agent trapped SaN inside a small circular PIP (`320px × 320px`) across all scenes. SaN intervened: *"Circle face is only needed when you prefer to use full space of the screen if not you should give good amount of space for me in face cam... most of the places my face can be used to put in 30% of left or right and keep moving the motion to keep viewer retention for every 20 sec max"*.
* **Why It Failed:** Long-form YouTube audiences connect with the human host. Squeezing the host into a corner makes the video feel like a faceless slideshow, driving down viewer retention.
* **⛔ WHAT NOT TO DO:**
  - **NEVER** keep the host in a tiny circle PIP for standard talking-head scenes.
* **✅ WHAT TO DO INSTEAD:**
  - **The 30–32% Screen Real Estate Rule:** Allocate 30–32% width to SaN (`580px × 980px`, radius `24px`, subtle 24K gold border) with chest-up framing.
  - **Dynamic Retention Alternation:** Alternate SaN between Left and Right sides every 15–20 seconds to re-anchor visual attention.
  - **Reserved Circle PIP:** Circle PIP is strictly reserved for full-canvas documents (scanned DRHP filings, full-canvas plumbing diagrams).

---

### ❌ Mistake 9: Non-Sync Motion Graphics (Visual Timings Disconnected from Speech)
* **What Happened in Take 2:** Motion graphics appeared and transitioned based on arbitrary second intervals or text estimations, causing SaN's spoken words to lag or lead the graphics on screen. SaN noted: *"words are not synced with the motion graphics totally non sync what is use of spending this much efforts?"*.
* **Why It Failed:** In financial video essays, cognitive dissonance spikes when the screen shows "₹43,574 Cr" seconds before or after the host utters the number.
* **⛔ WHAT NOT TO DO:**
  - **NEVER** guess visual entrance timestamps or divide scenes by arbitrary math.
* **✅ WHAT TO DO INSTEAD:**
  - **Mandatory Word Alignment Scan:** Always run Faster-Whisper on the exact audio slice before coding. Extract word-level boundaries into JSON.
  - **Frame Quantization:** Set `f_start = Math.round(word.start * 30.0)` for every single kinetic tag, chart reveal, and headline highlight.

---

### ❌ Mistake 10: Missing `-movflags +faststart` Causing Chrome Demuxer Crash
* **What Happened in Take 2:** FFmpeg transcoded the All-Intra proxy without `+faststart`. The MP4 index (`moov` atom) was placed at byte 438,000,000 at the end of the file. Remotion Studio in Chrome crashed with: `PipelineStatus::DEMUXER_ERROR_COULD_NOT_OPEN: Code 4`.
* **Why It Failed:** Chromium's HTML5 media engine requires the `moov` atom at the very start of the file (byte offset 40) to stream video chunks locally over HTTP without downloading the entire 438MB file into RAM.
* **⛔ WHAT NOT TO DO:**
  - **NEVER** encode an MP4 proxy for Remotion without `-movflags +faststart`.
  - **NEVER** use CRF 18 on a 1080p proxy (bloats to >400MB).
* **✅ WHAT TO DO INSTEAD:**
  - **The Golden Proxy Command:**
    ```bash
    ffmpeg -y -ss [START] -t [DURATION] -i "D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov" -c:v libx264 -preset veryfast -g 1 -keyint_min 1 -crf 22 -movflags +faststart -r 30 -pix_fmt yuv420p -an "dmart-video-engine\public\video\master_takeX_facecam.mp4"
    ```
    This produces a lightweight (~100–180MB) file that demuxes instantly at byte 40 with zero seek latency.

---

### ❌ Mistake 11: Duplicate Composition Registrations in `Root.tsx`
* **What Happened in Take 2:** Previous automated script updates inserted multiple `<Composition id="ThinkSchool-Take04-FullVideo" />` blocks into `Root.tsx`, causing Puppeteer bundling crashes: `ProtocolError: Multiple composition with id are registered`.
* **⛔ WHAT NOT TO DO:**
  - **NEVER** blindly append `<Composition>` blocks to `Root.tsx` without checking existing registrations.
* **✅ WHAT TO DO INSTEAD:**
  - Keep `Root.tsx` strictly deduplicated. Always verify composition IDs before starting development or rendering.

---

## 3. The New Proactive Workflow: 5-Stage Production Pipeline

```
  ┌─────────────────────────────────────────────────────────────┐
  │ STAGE 1: Spoken Transcript & Word-Level Timing Extraction   │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ STAGE 2: Two-Column Visual Storyboard & SaN Consent Gate 1   │
  │ (Spoken Words vs Layout Allocation: Left/Right Split & Face)│
  └──────────────────────────────┬──────────────────────────────┘
                                 │ [Consent Received]
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ STAGE 3: Engineering Pre-flight (All-Intra Proxy + Master   │
  │ PCM WAV + Persistent Facecam Mount)                         │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ STAGE 4: Remotion First-Cut Blockout (Live Studio Review)   │
  │ (Low-fidelity wireframes, camera glides, kinetic rhythm)    │
  └──────────────────────────────┬──────────────────────────────┘
                                 │ [SaN Studio Confirmation]
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ STAGE 5: Production Polish & Rapid Tiered Render            │
  │ (Tier 1: Stills ➔ Tier 2: 20s Check ➔ Tier 3: Concat Master)│
  └─────────────────────────────────────────────────────────────┘
```

---

### Stage 1: Spoken Transcript & Word-Level Timing Extraction
1. Take raw audio and run Whisper/audio alignment to produce an accurate, micro-aligned word transcript.
2. Group spoken dialogue into clear semantic beats (e.g. Opening Hook, Catalyst 1, Comparison, Dilemma, Climax).

---

### Stage 2: Two-Column Visual Storyboard & SaN Consent Gate
Before writing any Remotion component, present SaN with a structured markdown storyboard table:

| Frame Range / Time | Spoken Dialogue | Visual Concept (Think School Style) | Facecam Layout | Screen Split |
| :--- | :--- | :--- | :--- | :--- |
| **0 – 148** (0.0s – 4.9s) | *"Reliance Jio Platforms is officially launching..."* | Lower Third: "SEBI DRHP Special Investigation" | Full-Screen A-Roll | 100% Full Video |
| **148 – 742** (4.9s – 24.7s) | *"raising ₹30,213 Cr... surpasses LIC and Hyundai..."* | Dalal Street Titanium Monoliths + Red Stamp | Tall Rectangle | Right 40% (Face) / Left 60% (Monoliths) |
| **742 – 1226** (24.7s – 40.9s) | *"Retail investors told to apply with family accounts..."* | 2.5D Newspaper Clipping + Marker Highlight + Broker Alerts | Bottom-Left Circle | Centered Graphics / Floating Cam |
| **1226 – 1766** (40.9s – 58.9s) | *"Paytm crashed 70%, Zomato fell from 169 to 40..."* | Tech IPO Graveyard Red Autopsy Dossiers | Bottom-Right Circle | Centered Graphics / Floating Cam |
| **1766 – 1937** (58.9s – 64.6s) | *"So the billion-dollar question is..."* | Climax Hook Banner: "Tech Trap or Cash Engine?" | Full-Screen A-Roll | 100% Full Video |
| **1937 – 2239** (64.6s – 74.6s) | *"Tech multiple trap versus real cash engine..."* | Brass Balance Scale with dynamic physics tilt | Bottom-Left Circle | Centered Graphics / Floating Cam |
| **2239 – 2825** (74.6s – 94.2s) | *"Dissect audited DRHP, balance sheet, compare Airtel..."* | 4 Investigation Chapters appearing one-by-one | Tall Rectangle | Right 40% (Face) / Left 60% (4 Chapters) |
| **2825 – 2869** (94.2s – 95.6s) | *"Stay until the end of the video..."* | Final Roadmap Banner: "DRHP Breakdown & Strategy" | Full-Screen A-Roll | 100% Full Video |

> [!IMPORTANT]
> **Consent Gate 1:** Ask SaN: *"Does this visual allocation, screen split, and facecam placement match your vision?"*  
> Do **NOT** begin coding Remotion components until SaN approves or modifies the storyboard.

---

### Stage 3: Engineering Pre-flight (Proxy & Persistent Video)
Execute the exact 2 commands below to guarantee zero seek lag and sample-accurate audio:
```bash
# 1. Uncompressed 48kHz Master Audio Track
ffmpeg -y -ss 0 -t {DURATION} -i "D:/QuickShare/JIO IPO/{MASTER}.mov" -vn -acodec pcm_s16le -ar 48000 "public/audio/master_take1.wav"

# 2. All-Intra Keyframe Fast Proxy (Every single frame is an I-frame, -g 1)
ffmpeg -y -ss 0 -t {DURATION} -i "D:/QuickShare/JIO IPO/{MASTER}.mov" -c:v libx264 -preset veryfast -crf 17 -g 1 -keyint_min 1 -r 30 -pix_fmt yuv420p -an "public/video/facecam_take1_fast.mp4"
```

---

### Stage 4: Remotion First-Cut Blockout (Live Studio Review)
1. Mount the `ThinkSchoolFloatingFacecam` with the verified coordinate constants:
   - **Circle Mode:** `cropX = -236px, cropY = -75px, cropScale = 0.433`
   - **Tall Rectangle Mode:** `left: 1160px, top: 80px, width: 700px, height: 920px, borderRadius: 24px` with native 1080p center framing (`vidLeft: -565px, vidTop: -80px`).
2. Build placeholder blockouts for graphics (simple cards with correct text, timings, and spring entrances).
3. Have SaN inspect playback at `http://localhost:3000`.
4. **Consent Gate 2:** SaN confirms spatial pacing and visual transitions before styling high-detail graphics.

---

### Stage 5: Rapid Tiered Rendering Strategy
Never trigger a blind 10-minute full render. Follow the **3-Tier Acceleration Method**:

* **Tier 1: Instant Stills (2 seconds):**  
  Verify visual composition at critical frames:
  ```bash
  npx remotion still src/index.ts ThinkSchool-Take01-FullVideo out/preview_test/frame_300.png --frame=300
  ```
* **Tier 2: 20-Second Chunk Validation (~90 seconds):**  
  Render the first 600 frames to confirm lip-sync, spring physics, and audio muxing in an actual video player:
  ```bash
  npx remotion render src/index.ts ThinkSchool-Take01-FullVideo out/ThinkSchool_Take01_First20s.mp4 --frames=0-599
  ```
* **Tier 3: Chunk-Render & Instant Concat:**  
  Render subsequent chunks (`--frames=600-1226`, `--frames=1226-2868`), then losslessly concatenate them with FFmpeg in **0.8 seconds**:
  ```bash
  ffmpeg -y -f concat -safe 0 -i concat_take1.txt -c copy out/ThinkSchool_Take01_Full_Master.mp4
  ```

---

## 4. Cheat Sheet: What To Do vs What NOT To Do

| Area | ⛔ WHAT NOT TO DO | ✅ WHAT TO DO |
| :--- | :--- | :--- |
| **Source Media** | Slicing raw unedited phone camera takes (`20261020_*.mp4`). | Slice strictly from master cut (`Jio_Mega_IPO_8Min_Master-full video.mov`). |
| **Facecam Positioning** | Guessing crops via Python skin detection / computer vision. | Use SaN's calibrated offsets (`origX = 914, origY = 542`) or interactive HUD. |
| **Facecam Real Estate** | Trapping SaN in a tiny circle PIP across all scenes. | Give SaN 30–32% screen real estate (Tall Frame) alternating Left/Right; Circle PIP reserved for full-screen DRHP docs only. |
| **Motion Pacing & Sync** | Dividing graphics by arbitrary timers or text estimation. | Scan audio with Faster-Whisper; quantize every visual cue to exact spoken words (`Math.round(t*30)`). |
| **Browser Video Playback** | Using raw Long-GOP files or omitting `-movflags +faststart`. | Transcode All-Intra (`-g 1 -keyint_min 1 -r 30 -crf 22 -movflags +faststart`) proxy. |
| **Audio Sync** | Relying on MP3s or browser DOM `<video>` audio. | Use uncompressed 48kHz WAV audio with zero priming delay. |
| **Component Architecture** | Unmounting `<Video>` or animating `width`/`height` on `<video>`. | Single persistent `<Video>` element with GPU `translate3d` transforms. |
| **Creative Process** | Writing Remotion code before confirming layout with SaN. | Present 2-Column Transcript Storyboard table and get approval first. |
| **Composition Registry** | Blindly appending `<Composition>` tags to `Root.tsx`. | Verify composition ID uniqueness before running dev server or render. |
| **Rendering Protocol** | Launching full 3,000+ frame renders without review. | Tier 1 Stills ➔ Tier 2 20s test ➔ Tier 3 Chunked + Instant Concat. |
| **Directory Management** | Leaving 2GB+ raw video files inside `public/`. | Keep `public/` lean (< 200MB) to eliminate Webpack bundling delay. |

---

## 5. Verification Checklist for Future Agents

Before reporting any Remotion edit as ready to SaN, confirm:
- [ ] Source of Truth: Video & Audio cut strictly from `D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov`.
- [ ] Word Alignment: Faster-Whisper run on the audio slice and exact sentence/word frame indices mapped in JSON.
- [ ] Transcript Storyboard Table presented to SaN (showing Left/Right screen allocation & spoken cues) and approved.
- [ ] Video proxy encoded with `-g 1 -keyint_min 1 -r 30 -crf 22 -movflags +faststart -pix_fmt yuv420p -an`.
- [ ] Audio extracted as 48kHz uncompressed PCM WAV.
- [ ] Only ONE `<Video>` element mounted across the entire composition timeline.
- [ ] SaN has 30–32% screen real estate (Tall Frame) in 70%+ of scenes, alternating Left/Right every 15–20s; Circle PIP reserved for full-canvas documents.
- [ ] All interactive HUD / zoom buttons suppressed (`showHUD: false`).
- [ ] `Root.tsx` has no duplicate composition IDs.
- [ ] TypeScript passes with 0 errors (`npx tsc --noEmit`).
- [ ] Tier 2 validation clip (first 10–20 seconds) rendered to `out/` for instant lip-sync verification in VLC.
- [ ] Remotion Studio runs live on `http://localhost:3000` for SaN's pre-render inspection.
