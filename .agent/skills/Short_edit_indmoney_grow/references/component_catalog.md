# Remotion Financial Short Component Catalog

This catalog documents the reusable Remotion components provided by the `Short_edit_indmoney_grow` skill for generating high-retention vertical financial shorts (1080x1920).

---

## 1. `FinancialLineChart`
- **Location**: `src/components/FinancialLineChart.tsx`
- **Purpose**: Animates dynamic stock price histories, index movements, or drawdown trajectories.
- **Key Features**:
  - Smooth SVG cubic bezier curve interpolation.
  - Linear gradient area fill underneath the curve.
  - Animated pulsing tracker dot attached to the leading curve coordinate.
  - Staggered milestone pop-up markers (`label`, `subtext`, `isNegative`).
- **Props**:
  - `title`: Main title (e.g., `"RELIANCE SHARE PRICE"`).
  - `subtitle`: Subtitle tag (e.g., `"1-Year Historical Trend"`).
  - `metricChange`: Percentage string (e.g., `"+28.4%"`).
  - `isPositive`: Boolean indicating whether green or red color scheme is used.
  - `lineColor`: Primary stroke color (default: `#00D09C`).
  - `points`: Array of `{ x, y }` coordinates.
  - `milestones`: Array of `{ index, label, subtext, isNegative }`.
  - `startFrame`, `durationFrames`: Animation timing controls.

---

## 2. `NewspaperHeadline`
- **Location**: `src/components/NewspaperHeadline.tsx`
- **Purpose**: Presents real-world proof (press releases, SEBI circulars, financial newspaper clippings) with realistic paper physics.
- **Key Features**:
  - 2.5D tilted perspective (`perspective: 1200, rotateX: 6deg, rotateY: -3deg`).
  - Custom newspaper masthead with date stamp.
  - Realistic paper fold textures.
  - **Animated Marker Pen Highlighter**: Sweeps a translucent neon yellow (`rgba(255, 230, 0, 0.55)`) stroke across the target text.
  - Camera slow push-in (`scale: 1.0 -> 1.08`).
- **Props**:
  - `publication`: Header publication name (e.g., `"THE ECONOMIC TIMES"`, `"MINT"`, `"SEBI CIRCULAR"`).
  - `date`: Publication date.
  - `headlinePre`, `highlightedText`, `headlinePost`: Three-part headline allowing the middle chunk to be highlighted.
  - `highlightStartFrame`, `highlightDuration`: Timing for the highlighter pen sweep.

---

## 3. `StockTickerBadge`
- **Location**: `src/components/StockTickerBadge.tsx`
- **Purpose**: Prominent stock ticker pill showing company logo circle, symbol, live price, and percent change pill.
- **Props**:
  - `symbol`: Stock ticker (e.g., `"DMART"`, `"TCS"`, `"JIO"`).
  - `name`: Company name.
  - `price`: Live numeric price (automatically formatted in `en-IN` rupees).
  - `changePercent`: Numeric change percentage (e.g., `-4.35` or `+18.2`).
  - `startFrame`: Spring entrance trigger frame.

---

## 4. `KineticWordCaptions`
- **Location**: `src/components/KineticWordCaptions.tsx`
- **Purpose**: Word-by-word synced kinetic subtitles.
- **Key Features**:
  - Automatically isolates active word cluster (3 to 5 words).
  - Highlights active spoken word in Groww Mint (`#00D09C`) or IND Blue (`#1A64F8`) with `scale(1.12)` bounce.
  - Sits safely at `bottom: 260px` to avoid YouTube Shorts UI occlusion.
- **Props**:
  - `captions`: Word-level timestamp array matching Whisper / audio transcript JSON.
  - `highlightColor`: Color token for active word.
  - `fontSize`: Caption font size (default `44px`).
  - `bottomPosition`: Distance from screen bottom.

---

## 5. `SIPGrowthCalculator`
- **Location**: `src/components/SIPGrowthCalculator.tsx`
- **Purpose**: Visualizes compounding returns and wealth accumulation.
- **Key Features**:
  - Rolling number counter animating with `toLocaleString('en-IN')`.
  - Side-by-side comparison card: "Amount Invested" vs "Wealth Gained".
  - Clean fintech card with dark slate background.
- **Props**:
  - `monthlyInvestment`: Monthly SIP deposit (default `10000`).
  - `durationYears`: Compounding horizon (default `15`).
  - `expectedReturnRate`: Annualized CAGR (default `14`).

---

## 6. `ComparisonVersus`
- **Location**: `src/components/ComparisonVersus.tsx`
- **Purpose**: "VS Battle" dilemma breakdown (e.g., Jio vs Airtel, Bull Case vs Bear Risk, Apply vs Avoid).
- **Key Features**:
  - 2-column comparison card with green checkmarks and red crosses.
  - Animated rubber-stamp verdict (`"APPLY"`, `"AVOID"`, `"HOLD"`) slamming into position with bounce overshoot.
