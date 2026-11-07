# SaN Video Design System & Production Standards (SaN Video OS)

**Author:** Antigravity AI Pair Programmer & SaN  
**Standard Version:** 2.0.0 (Production Master Standard)  
**Applicability:** Mandatory across all future short-form (9:16) and long-form (16:9) video productions.

---

## 1. Executive Vision & Core Philosophy

Our video production was previously fragmented: dozens of ad-hoc python scripts, disparate Remotion compositions, and bespoke styling rewritten for each new take. 

**The SaN Video OS eliminates this friction.**

1. **Modules Over Monoliths:** Every recurring visual motif (Newspaper clipping, Stock ticker, Odometer counter, Comparison duel, Financial chart, Autopsy dossier, Interactive CTA) is a standardized, reusable component in `src/motion-kit/`.
2. **Templates Over Scratch Code:** Every video is rendered through one of two proven, locked layouts:
   - **`StandardShortReel` (9:16 Mobile Split)**
   - **`StandardLongformChapter` (16:9 Landscape Split)**
3. **Preservation of Battle-Tested Lessons:**
   - Single persistent `<Video>` element (Zero audio stutter / zero decoder thrashing).
   - All-Intra proxies with `-g 1 -keyint_min 1 -movflags +faststart` (Zero seek lag).
   - Uncompressed 48kHz PCM WAV audio.
   - True acoustic speech onset snapping (RMS > 1,000 minus 45ms).
   - Internal silence splitting (>1.0s pause excision).
   - Eye-level seam-bridge subtitles (`top: 660px` in 9:16).
   - 30–32% Facecam real estate rule in 16:9 (Alternating Left/Right every 15–20s).

---

## 2. Standard Layout Architectures

```
9:16 VIRAL REEL LAYOUT (1080x1920)         16:9 MASTERCLASS LAYOUT (1920x1080)
┌─────────────────────────────────┐        ┌──────────────────────┬───────────────┐
│     MOTION GRAPHICS HUD         │        │                      │               │
│        (Top 37.4%)              │        │   GRAPHICS STAGE     │  FACECAM (32%)│
│       Y: 0px – 718px            │        │     (Left 68%)       │ (Right Tall)  │
├─────────────────────────────────┤        │   W: 1140px          │ W: 580px      │
│ [CAPTION SEAM BRIDGE @ Y=660px] │        │   H: 980px           │ H: 980px      │
├─────────────────────────────────┤        │                      │ R: 24px       │
│                                 │        │                      │               │
│     PRESENTER FACECAM           │        │                      │               │
│        (Bottom 62.6%)           │        ├──────────────────────┴───────────────┤
│       Y: 718px – 1920px         │        │ *Host alternates Left/Right every 20s│
│    (translateY = -600px)        │        │ *Circle PIP (320x320) for documents  │
└─────────────────────────────────┘        └──────────────────────────────────────┘
```

### Layout Standard A: 9:16 Mobile Split (`MobileSplitLayout.tsx`)
- **Seam Invariant:** The dividing seam is locked at **`Y = 718px`** (top 37.4% HUD, bottom 62.6% Presenter).
- **Headroom Invariant:** SaN's facecam `<Video>` is translated by **`translateY(-600px)`**, anchoring SaN upper-center with clean 60px professional headroom.
- **Seam Bridge Subtitles:** Subtitle pill floats at **`top: 660px`**, bridging the seam so viewer reads text at eye level while making eye contact with SaN.
- **Three Orchestrated Modes:**
  1. `standard_split`: 37.4% Graphics HUD + 62.6% Presenter.
  2. `full_graphics_takeover`: Full 1080×1920 canvas takeover (Facecam opacity fades to 0).
  3. `facecam_punch`: Host punch-in full screen (Scale 1.05, height 1920px).

### Layout Standard B: 16:9 Long-Form Masterclass (`LongformSplitLayout.tsx`)
- **30–32% Host Real Estate:** Host frame is sized at **`580px × 980px`**, border radius **`24px`**, subtle gold bezel (`1.5px solid rgba(255,215,0,0.35)`).
- **Dynamic Retention Alternation:** SaN alternates between **`right_tall`** and **`left_tall`** every 15–20 seconds to reset visual fatigue.
- **Document Circle PIP:** Circle PIP (**`320px × 320px`**) is strictly reserved for full-canvas documents (scanned DRHP pages, Screener, TradingView).
- **Zero Decoder Thrashing:** Exactly ONE `<Video>` tag stays mounted 100% of the timeline; transitions are purely GPU CSS transforms.

---

## 3. The Reusable Motion Kit Module Registry (`src/motion-kit/`)

All modules are imported directly from `../motion-kit`:

```tsx
import {
  StandardShortReel,
  StandardLongformChapter,
  HeadlineBadge,
  NewspaperClipping,
  MetricOdometer,
  StockTickerCard,
  ComparisonDuel,
  FinancialChart,
  AutopsyDossier,
  InteractiveCTA,
  KineticSubtitles,
  SFXPlayer,
  SAN_TOKENS,
} from "../motion-kit";
```

| Module | Purpose & Retention Function | Key Props & Capabilities |
| :--- | :--- | :--- |
| **`HeadlineBadge`** | Opening Hook & Chapter Banners | `category`, `title`, `subtitle`, `stamp` ("AVOID", "APPLY", "TRAP") |
| **`NewspaperClipping`** | Statutory filing & Press clipping anchor | `source`, `date`, `headline`, `snippet`, `highlightPhrase` (Animated yellow marker sweep) |
| **`MetricOdometer`** | Rolling financial valuation numbers | `value`, `prefix` ("₹"), `suffix` (" Cr", "%", "x PE"), `decimals`, `durationFrames` |
| **`StockTickerCard`** | Clean NSE/BSE stock badge & price | `ticker`, `companyName`, `exchange`, `price`, `changePercent`, `isPositive`, `metricBadge` |
| **`ComparisonDuel`** | 2-column head-to-head showdown | `leftCompetitor`, `rightCompetitor`, animated VS badge, winner highlight |
| **`FinancialChart`** | Animated line / 200 DMA breakout | `dataPoints`, `strokeColor`, `drawDurationFrames`, `dma200Level`, glowing tip dot |
| **`AutopsyDossier`** | Startup wealth destruction dossiers | `items` (brand logos + bold standalone % pills), `alertStamp` |
| **`InteractiveCTA`** | 4-stage high-conversion outro | `searchQuery` (typing bar), `videoTitle` (teaser card), `commentKeyword` (DM automation) |
| **`KineticSubtitles`** | Faster-Whisper eye-level caption pill | `blocks` (word-level timestamps, brand normalization, active word gold glow) |
| **`SFXPlayer`** | Frame-accurate audio SFX triggers | `cues` (whoosh, sub bass drop, stamp slam, interface click, cash chime) |

---

## 4. The Unified 5-Stage Production Workflow

Every new video follows this exact 5-stage pipeline:

```
  Stage 1: Media Ingest & Proxy ➔ Stage 2: Whisper & Acoustic Alignment ➔ Stage 3: Storyboard Blueprint Gate
                                                                                   │ [SaN Approval]
  Stage 5: Tiered Rendering    ◄── Stage 4: Declarative Remotion Composition ◄─────┘
```

### Stage 1: Media Ingest & Proxy Generation
```bash
python scripts/ingest.py "D:/QuickShare/JIO IPO/Master.mov" --start 0 --duration 120 --out-dir work --prefix master_take
```
- Extracts uncompressed 48kHz WAV audio (`master_take_audio.wav`).
- Generates All-Intra H.264 proxy with `-g 1 -keyint_min 1 -movflags +faststart` (`master_take_fast.mp4`).

### Stage 2: Faster-Whisper Transcription & Brand Normalization
```bash
python scripts/transcribe.py work/master_take_audio.wav --words-out work/words.json --blocks-out work/caption_blocks.json
```
- Quantizes speech to exact 30fps video frame units.
- Auto-corrects Indian market brands (Swiggy, Zomato, Zerodha, SEBI, DRHP, OFS, 200 DMA).

### Stage 3: Two-Column Visual Storyboard (SaN Approval Gate 1)
- Present the 2-Column Storyboard table to SaN (Spoken Words vs Motion Kit Module vs Layout Allocation).
- **Mandatory Consent Gate:** No Remotion code is written before SaN approves the storyboard.

### Stage 4: Declarative Remotion Composition
Assemble the video in minutes using the standard templates:

```tsx
export const MyNewReel: React.FC = () => (
  <StandardShortReel
    videoProxySrc="video/master_take_fast.mp4"
    audioSrc="audio/master_take_audio.wav"
    captionBlocks={captionBlocks}
    stages={[
      { id: "hook", startFrame: 0, endFrame: 150, component: <HeadlineBadge ... /> },
      { id: "drhp", startFrame: 151, endFrame: 360, component: <NewspaperClipping ... /> },
      { id: "duel", startFrame: 361, endFrame: 600, component: <ComparisonDuel ... /> },
      { id: "outro", startFrame: 601, endFrame: 900, component: <InteractiveCTA ... /> },
    ]}
  />
);
```

### Stage 5: Tiered Rendering Strategy
Never trigger an unreviewed full render. Always render in 3 tiers:
```bash
# Tier 1: Still image preview in ~2s
python scripts/render.py MyNewReel --tier 1 --frame 120

# Tier 2: 20-second validation MP4 in ~90s (Verify lip-sync in VLC)
python scripts/render.py MyNewReel --tier 2

# Tier 3: Master render (Only after SaN explicit consent)
python scripts/render.py MyNewReel --tier 3 --out out/MyNewReel_FinalMaster.mp4
```

---

## 5. Canonical Design Tokens (`SAN_TOKENS`)

- **Canvas Background:** Deep Navy `#070B12` / `#0B0F19`
- **Surface Cards:** `#121926` (elevated `#162133`) with border `#1E293B` or `#2A3B57`
- **Signature Accents:**
  - 24K Gold: `#FFD700` (Pills fill: `rgba(255, 215, 0, 0.15)`)
  - Electric Cyan: `#00D2FF`
- **Financial Status Colors:**
  - Positive / Profit / Breakout: `#00E676`
  - Negative / Drawdown / Trap: `#FF5252`
  - Warning / Caution: `#F59E0B`
- **Typography:**
  - Primary UI: `'Inter', sans-serif`
  - Display / Headlines: `'Montserrat', sans-serif`
  - Numeric Metrics: `'JetBrains Mono', monospace`
- **Spring Physics Presets:**
  - `snappy`: `{ damping: 14, stiffness: 180, mass: 0.6 }` (Pills, badges)
  - `smooth`: `{ damping: 20, stiffness: 100, mass: 1.0 }` (Cards, glides)
  - `pop`: `{ damping: 12, stiffness: 240, mass: 0.5 }` (Alerts, stamps)
  - `heavy`: `{ damping: 26, stiffness: 80, mass: 1.4 }` (Padlocks, dossiers)
