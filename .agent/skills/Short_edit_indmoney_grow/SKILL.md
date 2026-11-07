---
name: Short_edit_indmoney_grow
description: Comprehensive financial short-form video editing guide and Remotion motion graphics framework modeled on the top 50+ viral shorts from INDmoney and Groww. Covers animated financial charts, 2.5D newspaper press clippings with marker highlighters, stock tickers, ratio grids, SIP calculators, and kinetic captions.
---

# INDmoney & Groww Financial Shorts Editing Framework

This skill establishes the production standards, motion design tokens, narrative pacing, and Remotion implementation recipes distilled from analyzing the top 50+ viral financial shorts produced by **INDmoney** and **Groww**.

---

## 1. Editorial Philosophy & The Anatomy of a High-Retention Short

Both INDmoney and Groww achieve 80%+ Average View Duration (AVD) by transforming dry financial reports (RHPs, SEBI circulars, quarterly earnings, P/E ratios) into high-velocity visual narratives.

### Core Tenets:
1. **The 0-3 Second Hook (The "Loss Aversion / Curiosity Gap" Hook)**:
   - *INDmoney pattern*: "We read the 400-page RHP so you don't have to!", "YES BANK drops 18%: Opportunity or Trap?", "₹30,213 Crore Jio IPO!".
   - *Groww pattern*: "Why is Colgate down 55% despite 80% ROE?", "A 10x PE stock with 100% profit growth", "Don't rush to buy this falling stock".
   - *Visual trigger*: The first frame must contain a bold graphic element (a falling stock line hitting a red crash badge, a rubber-stamped document, or a huge currency figure). Never start with a slow talking head intro.
2. **Visual Pacing (The 1.5-Second Rule)**:
   - A visual shift, camera punch, highlighter sweep, or graphical pop must occur every **1.2 to 2.0 seconds**.
   - No static screen state is allowed. Numbers always tick up/down; charts draw continuously; cards have subtle floating or 2.5D parallax.
3. **Evidence-Based Visuals (The "Proof" Requirement)**:
   - Whenever an argument is made ("Sales grew 18%"), the video immediately displays the source: an animated newspaper headline (The Economic Times, Mint), a corporate filing snippet, or an official SEBI document with an animated marker pen highlighter.
4. **Mobile 9:16 Safe Zones (1080 x 1920)**:
   - **Top Dead Zone (0 - 240px)**: Clear of essential content (covered by YouTube Shorts search icon and channel header).
   - **Main Visual Canvas (240px - 1440px)**: Primary focus area for charts, newspaper cards, split comparisons, and facecam cutout.
   - **Kinetic Subtitle Zone (1440px - 1720px)**: Word-by-word dynamic captions centered horizontally (when not using the seam bridge layout).
   - **Bottom & Right Dead Zone (1720px - 1920px and X > 880px in bottom half)**: Clear of text/metrics (covered by video title, audio track pill, subscribe button, like/comment buttons).

5. **The 37.5% HUD / 62.5% Presenter Split Architecture (Calibrated Golden Standard)**:
   - When editing talking-head shorts with persistent motion graphics, **never divide the screen 50/50 (`Y = 960px` or `Y = 1000px`)**.
   - A 50/50 division pushes the creator's face too low into the lower third of the mobile screen, wasting 350px–400px of dead wall headroom while creating an unnecessarily massive empty void in the top graphics area.
   - **The Calibrated Coordinate Standard:**
     - **Top Canvas (Motion HUD):** `Y = 0px` to `Y = 718px` (`37.4%` vertical real estate). Houses dynamic data cards, 3D filing snippets, odometer counters, and duel podiums.
     - **Dividing Seam Line:** Locked at **`Y = 718px`** (`borderTop: '2px solid rgba(255, 255, 255, 0.12)'` or glowing gold/cyan accent line).
     - **Bottom Canvas (Facecam Presenter):** `Y = 718px` to `Y = 1920px` (`height: 1202px`, `62.6%` vertical real estate).
     - **Internal Facecam Translation:** The `<Video>` element inside the presenter window must be shifted upwards by **`transform: 'translateY(-600px)'`**. Since the presenter's hair in typical 1080×1920 phone takes is at `Y ≈ 660px`, this translation places the top of the head at ~`Y = 60px` below the dividing seam, eliminating dead wall space while keeping facial expressions prominent and natural.
     - **Kinetic Subtitle Seam Bridge (`top: 660px`):** Position dynamic word captions centered at `top: 660px`, directly straddling the dividing seam line. The viewer's gaze effortlessly unifies reading dialogue with watching the presenter's facial cadence below and tracking the animated financial cards above.
     - **Dynamic Full-Screen Takeovers:** When presenting dense statutory balance sheets, 0% OFS locks, or multi-asset drawdown graveyards, dynamically drop the presenter container (`showPresenter: false`) to grant the motion graphics 100% full-screen canvas (`Y = 0` to `1920px`), then smoothly restore the split layout when dialogue returns to conversational analysis.

---

## 2. Design Tokens & Color Palette

### Visual Themes:
Choose between **Fintech Dark Mode** (signature INDmoney/Groww trading feel) and **Fintech Clean Light** (approachable, high-contrast editorial look).

| Token | Dark Mode (Default) | Light Mode | Purpose |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#0B0F17` (Obsidian) | `#F8FAFC` (Slate Canvas) | Base video backdrop |
| **Card Surface** | `#131924` (Deep Slate) | `#FFFFFF` (Pure Card) | Floating cards, charts, clippings |
| **Card Border** | `rgba(255, 255, 255, 0.08)` | `#E2E8F0` | Subtle hairline borders |
| **Groww Mint Green** | `#00D09C` | `#00B386` | Bullish gains, upward charts, Groww brand |
| **IND Electric Blue** | `#1A64F8` | `#0B57D0` | Institutional data, trust, INDmoney brand |
| **Drawdown / Risk Red** | `#FF3B30` | `#DC2626` | Crashes, dips, avoid stamps, warnings |
| **Highlighter Yellow** | `rgba(255, 230, 0, 0.45)`| `rgba(255, 214, 0, 0.50)`| Marker sweep over news headlines |
| **Milestone Amber/Gold** | `#FFB020` | `#D97706` | P/E ratio, IPO GMP, milestone stars |
| **Primary Text** | `#FFFFFF` | `#0F172A` | Headlines and primary metrics |
| **Secondary Text** | `#94A3B8` | `#64748B` | Labels, subtitles, source credits |

### Typography Rules:
- **Headlines & Hook Text**: `Montserrat`, `Poppins`, or `Inter`, font-weight `800` or `900`, uppercase for hooks.
- **Numbers, Prices, Ratios**: `JetBrains Mono` or `Inter` with `fontVariantNumeric: 'tabular-nums'` to prevent jitter during counter animations.
- **Subtitles**: Bold sans-serif (`700`), 42px - 52px size, subtle drop-shadow (`0 4px 16px rgba(0,0,0,0.8)`).

---

## 3. Element-by-Element Visual Guide

### A. Financial Graphs & Line Charts
- **Structure**: Smooth SVG cubic bezier curve (`M ... C ...`) rather than jagged polylines.
- **Underfill**: Linear gradient transitioning from brand green (`rgba(0, 208, 156, 0.35)`) at the top to transparent (`rgba(0, 208, 156, 0.0)`) at the bottom.
- **Draw Animation**: Animated using SVG `strokeDasharray` and `strokeDashoffset` driven by Remotion's `interpolate()` or `spring()`.
- **Tracker Ping (The Leading Dot)**: A glowing circle attached to the leading edge coordinate `(x, y)` of the path that pulses with a semi-transparent ping ring.
- **Milestone Callout Tags**: Pop-up pill badges (`"₹2,450 52-Week High"`, `"Crash -36%"`) that spring in with a small overshoot (`stiffness: 120, damping: 12`) when the line reaches that key frame.

### B. News Articles & Press Clippings (The "Evidence" Element)
- **3D Perspective Card**: Rotated slightly on the X and Y axes (`perspective(1200px) rotateX(6deg) rotateY(-4deg)`) to give tactile depth.
- **Header Badge**: Features publication masthead (e.g. *The Economic Times*, *Mint*, *Moneycontrol*, *SEBI Circular*, *Draft Red Herring Prospectus*).
- **The Animated Marker Highlighter**:
  - A colored highlight box (`rgba(255, 230, 0, 0.45)` or cyan `rgba(0, 229, 255, 0.35)`) sits directly behind or over the key phrase.
  - Its `width` animates from `0%` to `100%` with a slight tilt/skew (`skewX(-6deg)`), mimicking a human highlighter pen sliding across paper in exact sync with the spoken word.
- **Camera Push-In**: Scale moves from `1.0` to `1.10` over 45 frames to create forward momentum.

### C. Stock Ticker Badges & Financial Ratios
- **Stock Ticker Pill**:
  - Displays Company Logo + Ticker (e.g. `DMART`, `JIO`, `TCS`, `HDFCBANK`) + Current Price + Return badge (`+18.4% ▲` in Mint Green or `-24.6% ▼` in Crimson Red).
- **Ratio Matrix Grid**:
  - 2x2 or 3x2 grid of key valuation metrics (P/E Ratio, ROE %, Sales Growth %, Debt-to-Equity, Order Book).
  - Each metric card enters sequentially with a 3-4 frame stagger (`spring({ frame: frame - index * 4 })`).

### D. The Compounding & SIP Calculator
- **Rolling Number Counter**: Uses animated linear or eased interpolation (`interpolate(frame, [start, end], [0, targetValue])`) formatted with `toLocaleString('en-IN')` to show Indian currency denominations (`₹10,000`, `₹1.5 Lakh`, `₹3.2 Crore`).
- **Interactive Slider Bar**: An animated thumb slider tracking across a progress track while the output value compounds exponentially.

### E. The "VS Battle" & Comparison Layout
- **Split Screen**: Left vs Right or Top vs Bottom comparison (e.g. `Jio vs Airtel`, `SIP vs Lumpsum`, `Apply vs Avoid`).
- **Checklist Battle**: Green checkmark icons for advantages and red 'X' icons for risks/drawbacks that spring into place one by one.
- **The Rubber Stamp Verdict**: A large angled rectangular stamp (`"APPLY"`, `"AVOID"`, `"OVERVALUED"`, `"MULTIBAGGER"`) with heavy borders that slams onto the card with camera shake (`translate(shakeX, shakeY)`).

### F. Kinetic Word-by-Word Captions
- Display only **3 to 5 words** at a time to prevent visual clutter.
- The currently active word scales to `1.12x` and switches color to Groww Mint Green (`#00D09C`) or IND Blue (`#1A64F8`).
- Inactive words remain clean white or soft silver.
- Contained within a translucent frosted pill (`backdropFilter: 'blur(10px)'`).
- In split-screen format, anchor at **`top: 660px`** across the dividing seam line.

### G. Standalone Brand Logos vs Nested Boxes (Mobile Legibility Invariant)
- **The Anti-Pattern (Nested Box Clutter):** Wrapping brand logos inside colored card containers with borders (e.g., Zomato text inside a red rounded box inside a dark card). On a 6-inch mobile smartphone, nested cards blur into muddy, unreadable color blocks.
- **The Standalone Logo Invariant:**
  - Float clean, standalone vector logos directly on the dark canvas (`filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))'`).
  - Example: Zomato italic red wordmark (`#E23744`), Swiggy orange locator pin + wordmark (`#FC8019`), Paytm white/cyan wordmark (`#00BAF2`).
  - Pair each logo directly with a bold standalone metric or drawdown pill (`-65%`, `-50%`, `-71%`) directly underneath.
  - Apply clean entrance stagger (`spring({ frame: frame - index * 6 })`) for rhythmic visual impact.

### H. Interactive Outro Conversion Loop (High-Conversion Callout Architecture)
To convert viewer retention into subscribers, comments, and long-form channel traffic, choreograph a 4-part interactive outro sequence synchronized to spoken cues:
1. **Interactive Search Bar (Frame ~3200):**
   - Render a mock YouTube search bar.
   - Animate the query typing character-by-character (`"Happy Investing with SaN"`) with a blinking cursor in exact sync with the spoken phrase *"If you want the full numbers..."*.
2. **Latest Video Teaser Drop (Frame ~3340):**
   - Slide down a mini video thumbnail preview card on the words *"breaking down the 400-page DRHP"*.
3. **Simulated Comment Input Box (Frame ~3520):**
   - Render a comment pill with user avatar and placeholder.
   - Type `"JIO"` into the box with a glowing cyan send button on *"comment Jio below"*.
4. **Multi-Destination Link Badge (Frame ~3580):**
   - Slam a high-visibility badge: `"🔗 LINK IN BIO • DESCRIPTION • PINNED COMMENT"` on *"drop you the link"*.
5. **Channel Identity Outro Signature (Frame ~3670):**
   - Conclude with the official branding kit logo (`Happy_Investing_Logo_2026.png`) using spring scale overshoot (`[0, 1.12, 1.0]`) and a warm gold radial glow on *"Happy investing"*.

---

## 4. Sound Design (SFX) Engineering Matrix

Sound effects are compulsory for every motion graphics transition. In Remotion, audio triggers are aligned with component start frames:

| Visual Trigger | Audio Effect | Remotion Frame Alignment |
| :--- | :--- | :--- |
| **Hook Headline Slam** | Heavy Bass Thud / Low Boom | `frame === hookStartFrame` |
| **Newspaper Card Slide-In** | Paper Rustle / Fast Swoosh | `frame === newsStartFrame` |
| **Marker Highlighter Sweep** | Soft Pen Squeak / Marker Stroke | `frame === highlightStartFrame` |
| **Chart Line Drawing** | Rising High-Frequency Shimmer / Ticks | Throughout chart draw interval |
| **Stock Ticker Pop / Badge** | Clean Pop / Bubble Click | `frame === badgeStartFrame` |
| **Number Counter Rolling** | Rapid Geigercounter / Wheel Click | During `frame` interpolation |
| **Positive Metric / Checkmark** | Crisp Cash Register Bell / High Chime | `frame === checkmarkFrame` |
| **Negative Metric / Cross / Drop**| Dull Glitch Buzz / Low Woodblock | `frame === crossFrame` |
| **Rubber Stamp Slam** | Heavy Mechanical Stamp / Thump | `frame === stampImpactFrame` |

---

## 5. Reusable Remotion Components

The following production-grade React components are built for standard Remotion 1080x1920 vertical format. They are ready to import and use in any financial video composition.

### Component 1: `FinancialLineChart.tsx`
*Animated SVG spline line chart with area gradient, moving pulse tracker, and milestone callouts.*

```tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ChartPoint {
  x: number;
  y: number;
}

interface Milestone {
  index: number;
  label: string;
  subtext?: string;
  isNegative?: boolean;
}

interface FinancialLineChartProps {
  points?: ChartPoint[];
  milestones?: Milestone[];
  startFrame?: number;
  durationFrames?: number;
  lineColor?: string;
  title?: string;
  subtitle?: string;
  metricChange?: string;
  isPositive?: boolean;
}

export const FinancialLineChart: React.FC<FinancialLineChartProps> = ({
  points = [
    { x: 50, y: 320 },
    { x: 180, y: 290 },
    { x: 320, y: 350 },
    { x: 480, y: 220 },
    { x: 620, y: 260 },
    { x: 760, y: 140 },
    { x: 920, y: 80 },
  ],
  milestones = [
    { index: 3, label: "Q2 Results", subtext: "+15% Sales" },
    { index: 6, label: "₹3,450", subtext: "52-Week High", isNegative: false },
  ],
  startFrame = 0,
  durationFrames = 45,
  lineColor = "#00D09C",
  title = "RELIANCE SHARE PRICE",
  subtitle = "1-Year Historical Trend",
  metricChange = "+28.4%",
  isPositive = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(
    frame - startFrame,
    [0, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cardEntrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Build SVG path
  const dPath = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, "");

  // Area path (closed at bottom)
  const lastPt = points[points.length - 1];
  const firstPt = points[0];
  const areaPath = `${dPath} L ${lastPt.x} 400 L ${firstPt.x} 400 Z`;

  // Total approximate path length for stroke dash
  const totalLength = 1200;
  const strokeDashoffset = totalLength * (1 - progress);

  // Active tip point calculation
  const activeIdx = Math.min(
    points.length - 1,
    Math.floor(progress * (points.length - 1))
  );
  const currentPt = points[activeIdx];

  return (
    <div
      style={{
        width: 960,
        backgroundColor: "#131924",
        borderRadius: 24,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "36px 40px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
        opacity: cardEntrance,
        transform: `translateY(${interpolate(cardEntrance, [0, 1], [40, 0])}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em" }}>
            {subtitle.toUpperCase()}
          </span>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF", margin: "4px 0 0 0" }}>
            {title}
          </h2>
        </div>
        <div
          style={{
            backgroundColor: isPositive ? "rgba(0, 208, 156, 0.15)" : "rgba(255, 59, 48, 0.15)",
            border: `1px solid ${isPositive ? "rgba(0, 208, 156, 0.4)" : "rgba(255, 59, 48, 0.4)"}`,
            padding: "8px 16px",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: isPositive ? "#00D09C" : "#FF3B30" }}>
            {isPositive ? "▲" : "▼"} {metricChange}
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div style={{ width: "100%", height: 420, position: "relative" }}>
        <svg viewBox="0 0 960 420" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.4} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[100, 200, 300].map((y) => (
            <line
              key={y}
              x1="40"
              y1={y}
              x2="920"
              y2={y}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area Fill */}
          <path
            d={areaPath}
            fill="url(#chartGradient)"
            style={{ opacity: progress }}
          />

          {/* Line Stroke */}
          <path
            d={dPath}
            fill="none"
            stroke={lineColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={totalLength}
            strokeDashoffset={strokeDashoffset}
          />

          {/* Pulsing Tip Point */}
          {progress > 0 && currentPt && (
            <g transform={`translate(${currentPt.x}, ${currentPt.y})`}>
              <circle r={18} fill={lineColor} opacity={0.25} />
              <circle r={8} fill={lineColor} />
              <circle r={4} fill="#FFFFFF" />
            </g>
          )}

          {/* Milestone markers */}
          {milestones.map((m) => {
            const pt = points[m.index];
            const appearsAt = (m.index / points.length) * durationFrames + startFrame;
            if (frame < appearsAt) return null;

            const mSpring = spring({
              frame: frame - appearsAt,
              fps,
              config: { damping: 12, stiffness: 120 },
            });

            return (
              <g
                key={m.index}
                transform={`translate(${pt.x}, ${pt.y - 45}) scale(${mSpring})`}
                style={{ transformOrigin: `${pt.x}px ${pt.y - 45}px` }}
              >
                <rect
                  x="-60"
                  y="-28"
                  width="120"
                  height="42"
                  rx="8"
                  fill="#1E293D"
                  stroke={m.isNegative ? "#FF3B30" : lineColor}
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="-10"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="13"
                  fontWeight="800"
                >
                  {m.label}
                </text>
                {m.subtext && (
                  <text
                    x="0"
                    y="6"
                    textAnchor="middle"
                    fill={m.isNegative ? "#FF3B30" : lineColor}
                    fontSize="10"
                    fontWeight="700"
                  >
                    {m.subtext}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
```

---

### Component 2: `NewspaperHeadline.tsx`
*2.5D tilted newspaper clipping with realistic paper shadow, source header, animated yellow marker highlight, and push-in camera effect.*

```tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NewspaperHeadlineProps {
  publication?: string;
  date?: string;
  headlinePre?: string;
  highlightedText?: string;
  headlinePost?: string;
  startFrame?: number;
  highlightStartFrame?: number;
  highlightDuration?: number;
}

export const NewspaperHeadline: React.FC<NewspaperHeadlineProps> = ({
  publication = "THE ECONOMIC TIMES",
  date = "OCTOBER 18, 2026",
  headlinePre = "TCS Q2 Revenue Jumps 12%, While Profit Reaches ",
  highlightedText = "₹12,450 Crore All-Time High",
  headlinePost = " driven by multi-year cloud and enterprise AI contracts.",
  startFrame = 0,
  highlightStartFrame = 12,
  highlightDuration = 22,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D Card tilt and zoom entrance
  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  // Slow camera push-in
  const pushIn = interpolate(
    frame - startFrame,
    [0, 90],
    [1.0, 1.08],
    { extrapolateRight: "clamp" }
  );

  // Yellow marker sweep
  const highlightProgress = interpolate(
    frame - highlightStartFrame,
    [0, highlightDuration],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        perspective: 1200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1000,
      }}
    >
      <div
        style={{
          width: 920,
          backgroundColor: "#FAF9F5", // Warm newspaper paper tone
          borderRadius: 16,
          padding: "36px 44px",
          color: "#18181B",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.65), 0 4px 16px rgba(0, 0, 0, 0.2)",
          transform: `scale(${entrance * pushIn}) rotateX(6deg) rotateY(-3deg)`,
          border: "1px solid rgba(0, 0, 0, 0.12)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Paper Texture Lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* Newspaper Masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #18181B",
            paddingBottom: 12,
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: "#DC2626",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "0.1em",
                color: "#18181B",
              }}
            >
              {publication}
            </span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#71717A", fontFamily: "'Inter', sans-serif" }}>
            {date}
          </span>
        </div>

        {/* Headline Body with Highlighter */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.35,
            color: "#18181B",
          }}
        >
          <span>{headlinePre}</span>
          <span
            style={{
              position: "relative",
              display: "inline",
              color: "#000000",
              fontWeight: 900,
            }}
          >
            {/* Animated marker pen highlight layer */}
            <span
              style={{
                position: "absolute",
                left: -4,
                bottom: 2,
                height: "92%",
                width: `${highlightProgress}%`,
                backgroundColor: "rgba(255, 230, 0, 0.55)", // Neon Highlighter Yellow
                borderRadius: 4,
                zIndex: 0,
                transform: "skewX(-6deg)",
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>{highlightedText}</span>
          </span>
          <span>{headlinePost}</span>
        </div>

        {/* Evidence Verification Stamp */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            fontWeight: 700,
            color: "#52525B",
          }}
        >
          <span style={{ color: "#16A34A" }}>✔ VERIFIED FILING</span>
          <span>•</span>
          <span>SOURCE: OFFICIAL COMPANY DISCLOSURE</span>
        </div>
      </div>
    </div>
  );
};
```

---

### Component 3: `StockTickerBadge.tsx`
*INDmoney/Groww style floating ticker badge with live price, company logo pill, and percentage change.*

```tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface StockTickerBadgeProps {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  startFrame?: number;
}

export const StockTickerBadge: React.FC<StockTickerBadgeProps> = ({
  symbol = "DMART",
  name = "Avenue Supermarts",
  price = 3940.50,
  changePercent = -4.35,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 110 },
  });

  const isPositive = changePercent >= 0;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        backgroundColor: "#131924",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 100,
        padding: "10px 24px 10px 14px",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4)",
        transform: `scale(${entrance})`,
        opacity: entrance,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Ticker Icon Circle */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          backgroundColor: isPositive ? "#00D09C" : "#FF3B30",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
          fontWeight: 900,
          fontSize: 18,
        }}
      >
        {symbol.slice(0, 2)}
      </div>

      {/* Symbol & Name */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 18, fontWeight: 900, color: "#FFFFFF" }}>{symbol}</span>
        <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>{name}</span>
      </div>

      {/* Price */}
      <span
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: "#FFFFFF",
          fontFamily: "'JetBrains Mono', monospace",
          fontVariantNumeric: "tabular-nums",
          marginLeft: 12,
        }}
      >
        ₹{price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </span>

      {/* Pill Badge */}
      <div
        style={{
          backgroundColor: isPositive ? "rgba(0, 208, 156, 0.18)" : "rgba(255, 59, 48, 0.18)",
          border: `1px solid ${isPositive ? "#00D09C" : "#FF3B30"}`,
          borderRadius: 100,
          padding: "4px 12px",
          color: isPositive ? "#00D09C" : "#FF3B30",
          fontWeight: 800,
          fontSize: 14,
        }}
      >
        {isPositive ? "▲ +" : "▼ "}
        {Math.abs(changePercent).toFixed(2)}%
      </div>
    </div>
  );
};
```

---

### Component 4: `KineticWordCaptions.tsx`
*High-velocity word-by-word synced caption component with Groww Mint and IND Blue highlight active pops.*

```tsx
import React from "react";
import { useCurrentFrame } from "remotion";

export interface WordToken {
  word: string;
  start: number;
  end: number;
}

export interface CaptionBlock {
  words: WordToken[];
  start: number;
  end: number;
}

interface KineticWordCaptionsProps {
  captions: CaptionBlock[];
  highlightColor?: string;
  fontSize?: number;
  bottomPosition?: number;
}

export const KineticWordCaptions: React.FC<KineticWordCaptionsProps> = ({
  captions,
  highlightColor = "#00D09C", // Groww Mint Green (or #1A64F8 for INDmoney)
  fontSize = 44,
  bottomPosition = 280, // Safe zone: above YouTube Shorts title/channel overlay
}) => {
  const frame = useCurrentFrame();

  const activeBlock = captions.find(
    (b) => frame >= b.start - 2 && frame <= b.end + 4
  );

  if (!activeBlock) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: bottomPosition,
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
        pointerEvents: "none",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(11, 15, 23, 0.88)",
          backdropFilter: "blur(14px)",
          borderRadius: 20,
          padding: "16px 28px",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6)",
          textAlign: "center",
          maxWidth: 960,
        }}
      >
        <span
          style={{
            fontSize,
            fontWeight: 800,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.35,
            color: "#E2E8F0",
          }}
        >
          {activeBlock.words.map((w, idx) => {
            const isActive = frame >= w.start && frame <= w.end;
            return (
              <span
                key={idx}
                style={{
                  color: isActive ? highlightColor : "#FFFFFF",
                  fontWeight: isActive ? 900 : 700,
                  transform: isActive ? "scale(1.12)" : "scale(1.0)",
                  display: "inline-block",
                  margin: "0 5px",
                  transition: "color 0.08s ease, transform 0.08s ease",
                  textShadow: isActive
                    ? `0 0 20px ${highlightColor}66`
                    : "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {w.word}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};
```

---

### Component 5: `SIPGrowthCalculator.tsx`
*Visualizer for compounding wealth showing rolling Indian Rupee numbers and an animated growth slider.*

```tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SIPGrowthCalculatorProps {
  monthlyInvestment?: number;
  durationYears?: number;
  expectedReturnRate?: number;
  startFrame?: number;
}

export const SIPGrowthCalculator: React.FC<SIPGrowthCalculatorProps> = ({
  monthlyInvestment = 10000,
  durationYears = 15,
  expectedReturnRate = 14,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Calculate compound return: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
  const i = expectedReturnRate / 12 / 100;
  const n = durationYears * 12;
  const investedAmount = monthlyInvestment * n;
  const totalValue = Math.round(
    monthlyInvestment * (((Math.pow(1 + i, n) - 1) / i) * (1 + i))
  );
  const estimatedReturns = totalValue - investedAmount;

  // Rolling counter interpolation (over 50 frames)
  const counterProgress = interpolate(
    frame - startFrame,
    [10, 60],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const displayedTotal = Math.round(totalValue * counterProgress);
  const displayedInvested = Math.round(investedAmount * counterProgress);
  const displayedWealthGain = Math.round(estimatedReturns * counterProgress);

  return (
    <div
      style={{
        width: 920,
        backgroundColor: "#131924",
        borderRadius: 24,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "36px 40px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
        opacity: entrance,
        transform: `scale(${entrance})`,
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", margin: 0 }}>
          SIP COMPOUNDING ENGINE
        </h3>
        <span
          style={{
            backgroundColor: "rgba(0, 208, 156, 0.15)",
            color: "#00D09C",
            fontWeight: 800,
            fontSize: 14,
            padding: "6px 14px",
            borderRadius: 100,
          }}
        >
          ₹{monthlyInvestment.toLocaleString("en-IN")}/Month @ {expectedReturnRate}%
        </span>
      </div>

      {/* Main Wealth Total Card */}
      <div
        style={{
          backgroundColor: "#0B0F17",
          borderRadius: 18,
          padding: "24px 28px",
          border: "1px solid rgba(0, 208, 156, 0.3)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700, letterSpacing: "0.08em" }}>
          ESTIMATED TOTAL WEALTH (15 YEARS)
        </span>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#00D09C",
            fontFamily: "'JetBrains Mono', monospace",
            margin: "8px 0 0 0",
          }}
        >
          ₹{displayedTotal.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Split Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ backgroundColor: "#1A2230", padding: "18px 22px", borderRadius: 14 }}>
          <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700 }}>AMOUNT INVESTED</span>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", marginTop: 4 }}>
            ₹{displayedInvested.toLocaleString("en-IN")}
          </div>
        </div>

        <div style={{ backgroundColor: "#1A2230", padding: "18px 22px", borderRadius: 14 }}>
          <span style={{ fontSize: 13, color: "#00D09C", fontWeight: 700 }}>WEALTH GAINED</span>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#00D09C", marginTop: 4 }}>
            ₹{displayedWealthGain.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

### Component 6: `ComparisonVersus.tsx`
*VS Battle split layout with pros/cons checkmarks and an animated rubber-stamp verdict.*

```tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ComparisonItem {
  name: string;
  points: string[];
  verdict: "APPLY" | "AVOID" | "HOLD";
  isWinner: boolean;
}

interface ComparisonVersusProps {
  itemA: ComparisonItem;
  itemB: ComparisonItem;
  startFrame?: number;
  stampFrame?: number;
}

export const ComparisonVersus: React.FC<ComparisonVersusProps> = ({
  itemA = {
    name: "JIO IPO",
    points: ["₹30,213 Cr Scale", "450M+ Subscribers", "ARPU Growing 12%"],
    verdict: "APPLY",
    isWinner: true,
  },
  itemB = {
    name: "PEER TELECOM",
    points: ["High Debt Load", "Capex Strain", "Stagnant ARPU"],
    verdict: "AVOID",
    isWinner: false,
  },
  startFrame = 0,
  stampFrame = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEntrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const stampEntrance = spring({
    frame: frame - stampFrame,
    fps,
    config: { damping: 9, stiffness: 150 }, // Bouncy rubber-stamp slam
  });

  return (
    <div
      style={{
        width: 960,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        opacity: cardEntrance,
        transform: `translateY(${interpolate(cardEntrance, [0, 1], [30, 0])}px)`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Item A (Winner) */}
      <div
        style={{
          backgroundColor: "#131924",
          border: "2px solid rgba(0, 208, 156, 0.4)",
          borderRadius: 24,
          padding: "32px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h3 style={{ fontSize: 28, fontWeight: 900, color: "#00D09C", margin: "0 0 16px 0" }}>
          {itemA.name}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {itemA.points.map((pt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: "#FFFFFF", fontWeight: 700 }}>
              <span style={{ color: "#00D09C", fontSize: 18 }}>✔</span>
              <span>{pt}</span>
            </div>
          ))}
        </div>

        {/* Rubber Stamp */}
        {frame >= stampFrame && (
          <div
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
              border: "4px solid #00D09C",
              color: "#00D09C",
              fontWeight: 900,
              fontSize: 28,
              padding: "6px 18px",
              borderRadius: 8,
              transform: `scale(${stampEntrance}) rotate(-12deg)`,
              opacity: stampEntrance,
              letterSpacing: "0.1em",
            }}
          >
            {itemA.verdict}
          </div>
        )}
      </div>

      {/* Item B (Avoid) */}
      <div
        style={{
          backgroundColor: "#131924",
          border: "2px solid rgba(255, 59, 48, 0.4)",
          borderRadius: 24,
          padding: "32px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h3 style={{ fontSize: 28, fontWeight: 900, color: "#FF3B30", margin: "0 0 16px 0" }}>
          {itemB.name}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {itemB.points.map((pt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: "#94A3B8", fontWeight: 700 }}>
              <span style={{ color: "#FF3B30", fontSize: 18 }}>✖</span>
              <span>{pt}</span>
            </div>
          ))}
        </div>

        {/* Rubber Stamp */}
        {frame >= stampFrame && (
          <div
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
              border: "4px solid #FF3B30",
              color: "#FF3B30",
              fontWeight: 900,
              fontSize: 28,
              padding: "6px 18px",
              borderRadius: 8,
              transform: `scale(${stampEntrance}) rotate(14deg)`,
              opacity: stampEntrance,
              letterSpacing: "0.1em",
            }}
          >
            {itemB.verdict}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 6. Pre-Flight Quality Checklist for Rendering

Before rendering any short with this framework, verify every checkbox:

- [ ] **Pre-Render Local Review Gate (Mandatory)**: Never trigger heavy video renders (e.g. full ProRes 4444 / MP4 sequences) before reviewing the draft locally in Remotion Studio (`npm run dev`) or lightweight frame previews. Allow SaN to test and approve the draft timeline locally before expending compute and energy on full rendering.
- [ ] **Retention Hook**: A bold visual hook occurs in frames 0 to 45 (0-1.5s).
- [ ] **Mobile Safe Zones**: No text is higher than `Y = 240px` or lower than `Y = 1720px`. The bottom-right `(X > 880px, Y > 1200px)` quadrant is clear.
- [ ] **Tabular Numerics**: Every animated financial metric uses `fontVariantNumeric: 'tabular-nums'` to eliminate horizontal jitter.
- [ ] **Highlighter Sync**: Newspaper marker sweep starts within 2 frames of the speaker saying the key word/number.
- [ ] **Semantic Color Separation**:
  - Positive profits, returns, and breakout lines **MUST** use Groww Mint Green (`#00D09C`).
  - Losses, drawdowns, risks, and avoid verdicts **MUST** use Crimson Red (`#FF3B30`).
  - Institutional citations and app actions **MUST** use IND Electric Blue (`#1A64F8`).
- [ ] **Sound Effect Alignment**: Every spring entrance has a corresponding SFX cue mapped on the audio timeline.
- [ ] **Split-Screen Calibration (The Seam Line Standard)**: If using Presenter + HUD split, verify dividing seam is at `Y = 718px` and the presenter `<Video>` child has `transform: translateY(-600px)` so headroom is minimal and the face is prominent.
- [ ] **Seam-Line Dynamic Captions**: Dynamic captions sit at `top: 660px` centered across the dividing seam line.
- [ ] **Mobile Logo Legibility**: Brand logos use standalone vector elements with drop shadows, never nested inside colored box cards.
- [ ] **Brand Spelling Verification**: STT transcripts checked and sanitized for brand names (e.g. Swiggy, Zomato, Paytm) before rendering.
