# CapCut Placement & Editorial Implementation Guide

**Project:** Flipkart Sale vs Stock Market (52-Week Low)  
**Target Audiences & Formats:**
- **9:16 Vertical Master:** YouTube Shorts, Instagram Reels, TikTok (1080×1920)
- **16:9 Horizontal Master:** YouTube Full Video, Desktop / Web Master (1920×1080)

---

## 1. Aspect-Ratio Selection Rules

### When to Use 9:16 Portrait Assets
Use the `assets/broll/flipkart_value/9x16/` assets whenever editing vertical short-form video (1080×1920):
1. **Upper-Stage Split-Screen (The Rahul Jain / Reference Method):**
   - The reference edit (`flipkart_vs_stock_market_torahulj_style_9x16.mp4`) scales the talking-head presenter to anchor the lower half of the frame (`y = 960 to 1920`), while the B-roll asset dominates the upper half (`y = 0 to 960`).
   - For Scenes **S01** (Sale rush) and **S02** (Phone deal), place the 9:16 asset in the upper stage. The viewer sees both the energetic visual evidence and the presenter's expressive speaking delivery simultaneously.
2. **Full-Screen Vertical Cutaways:**
   - For Scene **S03** (52-week-low fear) and Scene **S07** (closing study desk / CTA), place the 9:16 image full-screen across all 1920 vertical pixels to maximize immersive drama and mobile screen fill.
3. **Safe Margin Compliance:**
   - Keep all CapCut text overlays between `y = 350` and `y = 1500` to avoid YouTube Shorts / Reels UI collisions (like right-side like/comment buttons and bottom caption bars).

### When to Use 16:9 Landscape Assets
Use the `assets/broll/flipkart_value/16x9/` assets whenever editing horizontal video (1920×1080) or YouTube long-form cuts:
1. **Full-Screen Narrative Cutaways:**
   - Cut directly from the talking head to the 16:9 image on the exact recommended start timestamp.
   - For Scene **S04** (Price vs Value scale), let the 16:9 image hold for the full 6.0 seconds (`00:46.80` to `00:52.80`) with a subtle slow push-in (`scale: 100% -> 106%`).
2. **Lower-Third & Panel Overlays:**
   - Add clean text panels on the right or left uncluttered third of the widescreen image, utilizing the generous negative space engineered into each prompt.

---

## 2. Track & Layer Architecture in CapCut

```
TRACK 4: [Text Overlays & Kinetic Typography]  (MRP / 52-Week Low / Price ≠ Value)
TRACK 3: [Sound FX Bed]                        (Whooshes, Chimes, Sub-bass Drops)
TRACK 2: [B-Roll Overlay Track]                (assets/broll/flipkart_value/...)
TRACK 1: [Main Dialogue Rough Cut]             (Talking Head Master with 15ms Fades)
TRACK 0: [Subtle Background Music Bed]         (Volume: -22 dB / 0.07)
```

---

## 3. Scene-by-Scene CapCut Recipe

### Scene 1 — S01: Shopping Impulse
- **Track 2 Asset:** `S01_shopping_impulse_9x16.png` or `16x9.png`
- **Timeline Window:** `00:01.20` – `00:05.40` (Duration: `4.2s`)
- **Action:** Upper stage overlay.
- **CapCut Text (Track 4):**
  - Font: Bold Sans-Serif (The Bold Font or Arial Black), Upper Case.
  - Text: `THE GREAT SALE RUSH` (Yellow/White with subtle drop shadow).
- **Sound Effect (Track 3):** `cash_register.mp3` or shopping chime at `00:01.50`.

### Scene 2 — S02: Phone Price Comparison
- **Track 2 Asset:** `S02_phone_price_comparison_9x16.png` or `16x9.png`
- **Timeline Window:** `00:13.90` – `00:19.50` (Duration: `5.6s`)
- **Action:** Upper stage overlay with 3-beat animated typographic cards.
- **CapCut Text Beats:**
  - Beat 1 (`00:14.00`): `MRP ₹1,00,000` (Strikethrough or red pill).
  - Beat 2 (`00:15.50`): `OFFER ₹50,000` (Teal `#14B8A6` badge).
  - Beat 3 (`00:17.50`): `COMPARE. TRACK. DECIDE.`
- **Sound Effect:** Light `whoosh.wav` on each text pop.

### Scene 3 — S03: 52-Week-Low Anxiety
- **Track 2 Asset:** `S03_52_week_low_9x16.png` or `16x9.png`
- **Timeline Window:** `00:30.50` – `00:34.80` (Duration: `4.3s`)
- **Action:** Full-screen cutaway.
- **Crucial Rule:** Let presenter say *"No, not at all."* on camera (`00:29.12` – `00:30.50`), then cut to this dark monitor image.
- **CapCut Text:**
  - `52-WEEK LOW` in red accent.
  - Animate drops: `−10%?` then `−20%?`.
- **Sound Effect:** Low tension drone / sub-bass rumble at `00:30.50`.

### Scene 4 — S04: Price vs Intrinsic Value
- **Track 2 Asset:** `S04_price_vs_value_16x9.png` (or 9:16 standby card)
- **Timeline Window:** `00:46.80` – `00:52.80` (Duration: `6.0s`)
- **Action:** Hero conceptual cutaway. Slow push-in zoom (100% to 105%).
- **Crucial Rule:** Presenter delivers *"We know the price, but we don't know the value"* on camera, then cut to balance scale.
- **CapCut Text:**
  - `PRICE ≠ VALUE` (Large centered teal/white header).
  - Secondary: `LOW PRICE ≠ BARGAIN`.
- **Sound Effect:** Gentle resonant bell ding / chime at `00:47.00`.

### Scene 5 — S05: Business Evaluation & Risk
- **Track 2 Asset:** `S05_business_risk_9x16.png` or `16x9.png`
- **Timeline Window:** `01:07.40` – `01:12.10` (Duration: `4.7s`)
- **Action:** Desk cutaway with clean sequential tags.
- **Crucial Rule:** Presenter says *"That's why valuation alone isn't enough"* on camera before B-roll appears.
- **CapCut Text:**
  - Tag 1: `1. UNDERSTAND THE BUSINESS`
  - Tag 2: `2. ESTIMATE THE VALUE`
  - Tag 3: `3. MANAGE THE RISK`

### Scene 6 — S06: Two-Strategy Framework
- **Track 2 Asset:** `S06_two_strategy_framework_16x9.png` (or 9:16 standby card)
- **Timeline Window:** `01:16.80` – `01:22.00` (Duration: `5.2s`)
- **Action:** Educational paper display.
- **CapCut Text:**
  - Panel 1: `52-WEEK HIGH / LOW`
  - Panel 2: `FUNDAMENTALS + MARKET PSYCHOLOGY`
  - Header: `A SYSTEMATIC APPROACH`

### Scene 7 — S07: Investor Confidence & CTA
- **Track 2 Asset:** `S07_hify_cta_9x16.png` or `16x9.png`
- **Timeline Window:** `01:39.20` – `01:44.20` (Duration: `5.0s`)
- **Action:** Calm study desk cutaway leading into closing branded end card.
- **Crucial Rule:** Presenter says *"So don't look for the discount, learn to identify the value with Happy Investing"* directly to camera.
- **CapCut Text:**
  - Beat 1: `DON'T LOOK FOR THE DISCOUNT`
  - Beat 2: `LEARN TO IDENTIFY VALUE`
  - Final Branded Card (hold to 01:46.49):
    - `HAPPY INVESTING`
    - `happyinvesting.in`
    - `Explore the Masterclass`
