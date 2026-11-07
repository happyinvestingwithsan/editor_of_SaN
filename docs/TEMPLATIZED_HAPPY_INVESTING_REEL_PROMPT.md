# Happy Investing — High-Retention Financial Documentary Reel: Master System & Templatized Prompt

> **Purpose:** Use this document whenever initiating a new vertical (9:16) financial documentary reel for the Happy Investing channel.  
> **Workflow Guarantee:** The AI assistant ingests the raw footage from your local path, extracts audio, generates word-level Faster-Whisper alignment, builds the complete Remotion motion graphics composition using the standardized 50/50 architecture, and launches **Remotion Studio on localhost for interactive review without rendering heavy MP4s upfront**.

---

# PART 1: THE TEMPLATIZED MASTER PROMPT
*(Copy and paste everything inside this codeblock into a new chat with your AI assistant whenever you have a new video to edit)*

```markdown
# TASK: HAPPY INVESTING — HIGH-RETENTION FINANCIAL DOCUMENTARY REEL (DRAFT & LOCAL REVIEW)

Act as an elite financial documentary editor, motion graphics director, Remotion developer, and retention specialist for the **Happy Investing** channel.

Transform the provided talking-head recording into a high-retention, 9:16 vertical financial documentary reel using Remotion.

### Inputs for this project:
- **Raw Master Video Path:** "[INSERT_RAW_VIDEO_PATH_HERE]" (e.g. D:\QuickShare\Video.mov)
- **Enhanced Audio Path (Optional):** "[INSERT_AUDIO_PATH_HERE]" (if separate WAV exists, else extract from video)
- **Official Domain:** www.happy-investing.in
- **Campaign Coupon:** [INSERT_COUPON_HERE or "HAPPYDIWALI"]

---

## 1. Operating Rules & Pre-Render Review Gate (MANDATORY)

1. **Zero Upfront Heavy Renders:**
   - NEVER trigger final MP4 renders (`remotion render`) upfront.
   - Your primary deliverable is a fully working Remotion draft running live on Remotion Studio (`http://localhost:3000/[CompositionID]`) for local interactive scrubbing and review.
2. **Audio is the Single Source of Truth:**
   - Inspect the actual audio. Do not assume spoken words match a script. Build all visual timings around the actual speech cadence.
3. **Pre-flight Media Engineering:**
   - Extract uncompressed 48kHz WAV audio (`public/audio/...`).
   - Generate a 30fps All-Intra proxy with faststart (`-g 1 -keyint_min 1 -movflags +faststart -r 30 -pix_fmt yuv420p -an`) to eliminate DOM playback lag.
4. **Single Persistent `<Video>` Architecture:**
   - Exactly ONE `<Video>` element must stay mounted across 100% of the timeline to prevent black flashes, decoder thrashing, and audio stutter.
5. **Zero Corner Clutter:**
   - NEVER place arbitrary corner pills, fake docket numbers, or classification badges on screen edges. Margins must remain 100% clean.

---

## 2. Standardized Layout & Facecam Framing Architecture

Canvas: **1080 × 1920 (9:16 Vertical @ 30fps)**

### A. Layout A — Full-Screen Presenter
Use this for:
- Opening hook line.
- Rhetorical curiosity questions ("What's happening globally? Why is foreign money returning?").
- Strategic pauses & question marks ("Why does this matter to markets?").
- Narrative setups before graphics trigger.
- Emotional anchors ("So what should you do? Let me share what I am personally doing").
- Final sign-off and outro signature.
- **Framing:** Container `top: 0, height: 1920`, internal video translated `translateY(-60px) scale(1.04)` to trim excess ceiling and place the presenter at natural upper-third eye-level.

### B. Layout B — 50/50 Split-Screen Documentary Mode
Use this for all explanatory, evidence-based, and metric breakdown sections:
- **Upper 50% ($Y = 0\text{px}$ to $960\text{px}$):** Motion graphics, SVG charts, rolling odometers, duel cards, and cinematic visuals.
- **Dividing Seam Line ($Y = 960\text{px}$):** Thin glowing teal seam line (`2px solid #75CFC6` with cyan drop shadow).
- **Lower 50% ($Y = 960\text{px}$ to $1920\text{px}$):** Presenter window (`height: 960px`).
- **Internal Video Translation:** The `<Video>` element inside the presenter window must be translated by **`transform: translateY(-580px)`**. This cuts out the top 30–35% of blank wall/cupboard in raw phone footage, positioning the presenter's head naturally below the seam with full chest and expressive hand gestures visible.

### C. Buttery Smooth Mathematical Transition (Zero Flicker Invariant)
- NEVER use CSS transitions for layout switching.
- Calculate continuous layout progress using Remotion `interpolate()` with a Hermite smoothstep cubic curve (`t * t * (3 - 2 * t)`) over an 8-frame ($\sim 260\text{ms}$) window:
  - `containerTop`: $0\text{px} \rightarrow 960\text{px}$
  - `containerHeight`: $1920\text{px} \rightarrow 960\text{px}$
  - `videoTranslateY`: $-60\text{px} \rightarrow -580\text{px}$
  - `videoScale`: $1.04 \rightarrow 1.0$
  - `seamOpacity`: $0 \rightarrow 1$
  - `upperStageOpacity`: $0 \rightarrow 1$
  - `subtitleTop`: $1520\text{px} \rightarrow 910\text{px}$

### D. Anti-Premature-Docking Invariant
- NEVER dock into split screen while waiting for an animation that triggers seconds later.
- If words have not arrived or no animation is planned, keep the presenter in **100% full-screen facecam**.
- Graphics must appear strictly on the exact frame where the corresponding concept is spoken.

---

## 3. Kinetic Subtitle Standards
- **Font Size:** Large mobile-first typography ($42\text{px} - 46\text{px}$, active word $48\text{px}$).
- **Active Spoken Word:** Highlighted in Groww Mint Green (`#00D09C`) or Light Teal (`#BFEDE8`) with soft glow and $1.08\text{x}$ scale.
- **Inactive Words:** Pure bright white (`#FFFFFF`).
- **Container:** Dark navy pill (`rgba(10, 25, 38, 0.94)`), frosted blur (`16px`), $2\text{px}$ secondary teal border, $34\text{px}$ padding.
- **Placement:** Straddles the seam at **`top: 910px`** during split-screen mode, and sits at **`top: 1520px`** during full-screen facecam.

---

## 4. Visual Design System — Happy Investing Light Teal Theme
- **Primary Light Teal:** `#BFEDE8`
- **Secondary Teal:** `#75CFC6`
- **Deep Teal:** `#087E78`
- **Dark Navy:** `#102B3A`
- **Canvas Backdrop:** `#070B12` / `#16384C` radial gradients
- **Positive / Inflow / Gains:** `#00D09C` (Mint Green)
- **Negative / Crash / Risk:** `#FF3B30` (Crimson Red)
- **Milestone / Value:** `#FFD700` (Gold)
- **Typography:** Display headlines in bold sans-serif (`Montserrat`/`Inter`), financial numerals in `JetBrains Mono` with tabular numerals (`tabular-nums`).

---

## 5. Standardized Happy Investing CTA & Outro Blueprint
Whenever the script transitions into the conclusion/masterclass CTA:
1. **The 3-Question Framework:** Display sequentially:
   - `1. WHAT TO BUY (Quality Filter)`
   - `2. AT WHAT PRICE TO BUY (Margin of Safety)`
   - `3. HOW MUCH RISK TO TAKE (Position Sizing)`
2. **Masterclass Showcase Card:**
   - Official Logo: `Happy_Investing_Logo_2026.png`.
   - Title: `3-Hour Happy Investing Masterclass`.
   - Special Offer Tag: `100% COMPLETELY FREE THIS DIWALI` (or active promotion).
   - Golden Coupon Card: `COUPON: [COUPON_CODE]`.
   - QR Code: High-resolution QR code pointing to `https://www.happy-investing.in` with label `SCAN TO ENROLL`. The QR code MUST animate in at the exact frame the presenter begins speaking about the website.
   - Exact Website Domain: `www.happy-investing.in`.
   - Destination: `🔗 Link in Bio • Description • Pinned Comment`.
3. **Closing Signature:** Return to full facecam for closing words ("Don't chase the market, learn to evaluate opportunities. Happy Investing!").

---

## 6. Execution Workflow Checklist
1. **Ingest & Transcribe:** Run Faster-Whisper to extract word-level timestamps and segment boundaries.
2. **Pre-flight Proxy:** Generate All-Intra 30fps proxy and 48kHz WAV audio into `public/`.
3. **Visual Curation:** Source authentic editorial photos (or generate clean, text-free 9:16 documentary backgrounds via image generator).
4. **Build Scene Stages:** Create modular scene components strictly scaled to the $960\text{px}$ upper stage with zero dead empty space.
5. **Assemble Master:** Mount persistent `<Video>`, master audio, SFX player, and kinetic captions.
6. **Register & Typecheck:** Register composition in `Root.tsx` and run `npx tsc --noEmit` to verify clean compilation.
7. **Launch Studio Preview:** Start Remotion Studio on localhost (`npm run dev`) and present the direct preview URL (`http://localhost:3000/[CompositionID]`). Stop and invite user review.
```

---

# PART 2: CHATGPT REVIEW & CRITIQUE PROMPT
*(Copy and paste the prompt below into ChatGPT, along with the text from Part 1, to get an expert critique and refinement of this template)*

```markdown
# PROMPT FOR CHATGPT: SYSTEM PROMPT REVIEW & REFINEMENT

Hi ChatGPT,

I am building an autonomous AI video editing workflow for my financial education channel, **Happy Investing**. 

### What We Are Trying to Achieve:
I record raw talking-head videos on my phone (vertical 9:16 format). I then want an autonomous AI coding assistant (like Antigravity / Claude Code) to take my local raw video file path, automatically process the media, transcribe it with word-level accuracy (Faster-Whisper), design bespoke financial documentary motion graphics in Remotion (React-based programmatic video), and present an interactive draft in Remotion Studio (`http://localhost:3000`) for my visual review — **without wasting time or compute on heavy MP4 renders upfront**.

I have created a **Templatized Master Prompt** (pasted below) that encapsulates all our hard-won design tokens, architectural rules, layout math, and workflow gates.

### Please Review and Critique this Templatized Prompt Against the Following Criteria:
1. **Clarity & LLM Steerability:** Is the prompt clear, unambiguous, and deterministic enough for an AI agent to execute end-to-end without getting confused or hallucinating?
2. **Edge Cases & Failure Modes:** What blind spots, edge cases, or potential failure points might an AI agent run into when executing this on a brand-new video (e.g. video orientation, audio sample rates, font loading, missing assets, aspect ratio drift)?
3. **Visual Pacing & Retention Polish:** Does the 50/50 split layout, camera framing math (`translateY(-580px)` to cut empty ceiling), and anti-premature docking rule sound soundly engineered for high mobile retention on Instagram Reels and YouTube Shorts?
4. **Prompt Optimization & Structure:** How can I make this prompt even more bulletproof, concise, and structured so any LLM follows it with 100% compliance?

---
### [PASTE THE TEMPLATIZED MASTER PROMPT FROM PART 1 HERE]
---

Please provide your detailed critique, followed by an improved/enhanced version of the template if you spot areas for higher reliability and impact.
```
