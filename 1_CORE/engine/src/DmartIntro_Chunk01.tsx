import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  staticFile,
  Video,
  Audio,
  Sequence,
} from "remotion";
import {
  Search,
  TrendingDown,
  Zap,
  Building2,
  Compass,
  Layers,
  Shield,
  AlertTriangle,
  BarChart3,
  Flame,
  ArrowDownRight,
  Sparkles,
  Newspaper,
} from "lucide-react";

// =============================================================================
// HIFY BRAND DESIGN TOKENS
// =============================================================================
const TOKENS = {
  backgroundObsidian: "#121214",
  surfaceCard: "#18181B",
  surfaceCardSecondary: "#1F1F24",
  borderHairline: "#2E2E33",
  borderActive: "#3E3E47",
  textPrimary: "#EDEDED",
  textSecondary: "#A1A1AA",
  brandGold: "#C8A951", // Strict Budget <= 4%
  metricNegative: "#F43F5E", // Rose Red
  metricPositive: "#10B981", // Emerald Green
  fonts: {
    ui: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    metrics: "'JetBrains Mono', monospace",
  },
};

// =============================================================================
// REAL CANDLESTICK DATA (ATH ₹5,900 -> CMP ₹3,325 Waterfall)
// =============================================================================
interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  label?: string;
}

const CANDLES_ATH_FALL: Candle[] = [
  { open: 5350, high: 5900, low: 5300, close: 5850, volume: 85, label: "ATH ₹5,900" },
  { open: 5850, high: 5890, low: 5400, close: 5460, volume: 95 },
  { open: 5460, high: 5540, low: 5120, close: 5180, volume: 110 },
  { open: 5180, high: 5250, low: 4800, close: 4860, volume: 105 },
  { open: 4860, high: 4950, low: 4620, close: 4710, volume: 85 },
  { open: 4710, high: 4760, low: 4320, close: 4380, volume: 135 },
  { open: 4380, high: 4460, low: 4150, close: 4200, volume: 120 },
  { open: 4200, high: 4280, low: 3950, close: 3990, volume: 140 },
  { open: 3990, high: 4050, low: 3750, close: 3790, volume: 155 },
  { open: 3790, high: 3850, low: 3580, close: 3620, volume: 170 },
  { open: 3620, high: 3650, low: 3420, close: 3450, volume: 195 },
  { open: 3450, high: 3480, low: 3325, close: 3340, volume: 220, label: "CMP ₹3,325" },
];

// Candles specifically breaking down through 52-Week Low (₹3,600 support)
const CANDLES_52W_BREAKDOWN: Candle[] = [
  { open: 4100, high: 4180, low: 3920, close: 3960, volume: 110 },
  { open: 3960, high: 4020, low: 3780, close: 3820, volume: 125 },
  { open: 3820, high: 3860, low: 3640, close: 3680, volume: 140 },
  { open: 3680, high: 3720, low: 3620, close: 3650, volume: 160 }, // Hovering at 52W floor
  { open: 3650, high: 3660, low: 3480, close: 3510, volume: 210 }, // Violating 52W floor
  { open: 3510, high: 3530, low: 3380, close: 3410, volume: 245 }, // Breakdown continuation
  { open: 3410, high: 3440, low: 3325, close: 3335, volume: 280 }, // Capitulation low
];

export const DmartIntro_Chunk01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // CONTINUOUS HOST FACECAM CHOREOGRAPHY (WITH BRAND GOLD BEZEL)
  // Single continuous <Video> stream for zero drift and natural transitions
  // =========================================================================
  let hostContainerStyle: React.CSSProperties = {
    position: "absolute",
    overflow: "hidden",
    zIndex: 20,
    transition: "none",
    boxSizing: "border-box",
  };

  if (frame < 42) {
    // PHASE 1: Full-Screen Center Host (Frames 0 -> 42 | 0.0s - 1.4s)
    // "D-Mart, yes..." -> 100% CLEAN, no dark shades, no overlapping elements
    hostContainerStyle = {
      ...hostContainerStyle,
      boxSizing: "border-box",
      left: 0,
      top: 0,
      width: 1920,
      height: 1080,
      borderRadius: 0,
      border: "2px solid transparent",
      boxShadow: "none",
    };
  } else if (frame >= 42 && frame < 1180) {
    // PHASE 2, 3 & 4: Host Glides into LEFT Dock with Brand HIFY Gold Bezel
    // Frames 42 -> 1180 (1.4s -> 39.3s)
    // Smoothly morphs from full screen into: Left: 70px, Top: 140px, Width: 580px, Height: 800px
    const dockSpring = spring({
      frame: frame - 42,
      fps,
      config: { damping: 16, stiffness: 90 },
    });

    const cardLeft = interpolate(dockSpring, [0, 1], [0, 70]);
    const cardTop = interpolate(dockSpring, [0, 1], [0, 140]);
    const cardWidth = interpolate(dockSpring, [0, 1], [1920, 580]);
    const cardHeight = interpolate(dockSpring, [0, 1], [1080, 800]);
    const cardRadius = interpolate(dockSpring, [0, 1], [0, 22]);
    const borderAlpha = interpolate(dockSpring, [0.1, 0.9], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const shadowAlpha = interpolate(dockSpring, [0.1, 0.9], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    hostContainerStyle = {
      ...hostContainerStyle,
      boxSizing: "border-box",
      left: cardLeft,
      top: cardTop,
      width: cardWidth,
      height: cardHeight,
      borderRadius: cardRadius,
      border: `2px solid rgba(200, 169, 81, ${borderAlpha})`, // Gold Bezel
      boxShadow: `0 25px 60px rgba(0, 0, 0, ${shadowAlpha * 0.85}), 0 0 35px rgba(200, 169, 81, ${borderAlpha * 0.2})`,
    };
  } else {
    // PHASE 5: Host Glides from LEFT Dock to RIGHT Dock in Full Vertical Mode!
    // Frames 1180 -> 1581 (39.3s -> 52.7s)
    // Retains exact same vertical dimensions: Left: 1270px, Top: 140px, Width: 580px, Height: 800px
    // Complete with Brand HIFY Gold Bezel!
    const glideRightSpring = spring({
      frame: frame - 1180,
      fps,
      config: { damping: 16, stiffness: 85 },
    });

    const hostX = interpolate(glideRightSpring, [0, 1], [70, 1270]);

    hostContainerStyle = {
      ...hostContainerStyle,
      boxSizing: "border-box",
      left: hostX,
      top: 140,
      width: 580,
      height: 800,
      borderRadius: 22,
      border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
      boxShadow: `0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(200, 169, 81, 0.25)`,
    };
  }

  // =========================================================================
  // ANIMATION TIMINGS & SPRINGS
  // =========================================================================

  // --- SECTION 1: ALL-TIME HIGH FULL RIGHT STAGE (Frames 58 -> 225) ---
  // Starts at Frame 58 once host is safely glided to the left dock (0 overlap!)
  const sec1Active = frame >= 56 && frame < 230;
  const sec1Entrance = spring({
    frame: frame - 58,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  const priceProgress = interpolate(frame, [72, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentPrice = Math.round(
    interpolate(priceProgress, [0, 1], [5900, 3325])
  );

  const athBadgeSpring = spring({
    frame: frame - 82,
    fps,
    config: { damping: 10, stiffness: 140, mass: 0.8 },
  });

  const peakBadgeSpring = spring({
    frame: frame - 132,
    fps,
    config: { damping: 11, stiffness: 130 },
  });

  const sec1Exit = interpolate(frame, [218, 228], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- SECTION 2: 52-WEEK LOW TRADINGVIEW BREAKDOWN (Frames 225 -> 405) ---
  const sec2Active = frame >= 225 && frame < 415;
  const sec2Entrance = spring({
    frame: frame - 228,
    fps,
    config: { damping: 14, stiffness: 95 },
  });

  // Frame 282: Spoken words "it is breaching and going down"
  const breakdownSpring = spring({
    frame: frame - 282,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const sec2Exit = interpolate(frame, [395, 412], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- SECTION 3 & 4: 3D SEARCH BAR & 4 NEWSPAPER CLIPPINGS (Frames 400 -> 975) ---
  const secNewsActive = frame >= 400 && frame < 985;
  const searchBarSpring = spring({
    frame: frame - 405,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const searchQuery = "Why DMart shares are falling?";
  const typedCount = Math.floor(
    interpolate(frame, [425, 530], [0, searchQuery.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayedQuery = searchQuery.slice(0, typedCount);

  // Staggered triggers for the 4 panic cards:
  const tile1Spring = spring({
    frame: frame - 674, // "Margin pressure and profitness"
    fps,
    config: { damping: 13, stiffness: 105 },
  });
  const tile2Spring = spring({
    frame: frame - 737, // "intense quick commerce competition"
    fps,
    config: { damping: 13, stiffness: 105 },
  });
  const tile3Spring = spring({
    frame: frame - 786, // "and higher cost and debt"
    fps,
    config: { damping: 13, stiffness: 105 },
  });
  const tile4Spring = spring({
    frame: frame - 817, // "and cautious brokerage ratings"
    fps,
    config: { damping: 13, stiffness: 105 },
  });

  // Frame 958 -> 978: EXACT AUDIO SYNC FOR "But today, we will cut through the noise"
  const sweepProgress = interpolate(frame, [958, 978], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sweepX = interpolate(sweepProgress, [0, 1], [670, 1920]);
  const newsDissolve = interpolate(sweepProgress, [0.1, 0.85], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- SECTION 5: TWO CARDS: "CURRENT SITUATION" & "HOW HAPPY INVESTING SEES IT" ---
  // (Frames 980 -> 1180 | Spoken words: 996s -> 1160s)
  const sec5Active = frame >= 980 && frame < 1185;

  // Card 1: "Current Situation of DMart" (Spoken at Frame 996)
  const situationCardSpring = spring({
    frame: frame - 996,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  // Card 2: "How Happy Investing Sees It" (Spoken at Frame 1059)
  const happyInvestingCardSpring = spring({
    frame: frame - 1059,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  // Exit right before host glides to the right at Frame 1175
  const sec5Exit = interpolate(frame, [1165, 1180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- SECTION 6: THE 3-DIMENSIONAL AUDIT ON THE LEFT (Frames 1220 -> 1581) ---
  const sec6Active = frame >= 1220;
  const roadmapEntrance = spring({
    frame: frame - 1230,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const pillar1Spring = spring({
    frame: frame - 1319,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const pillar2Spring = spring({
    frame: frame - 1366,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const pillar3Spring = spring({
    frame: frame - 1445,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: TOKENS.backgroundObsidian,
        fontFamily: TOKENS.fonts.ui,
        color: TOKENS.textPrimary,
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700;800;900&display=swap');
        `}
      </style>

      {/* ================================================================= */}
      {/* 1. MASTER FACECAM VIDEO ELEMENT (100% UNINTERRUPTED AUDIO STREAM) */}
      {/* ================================================================= */}
      <div style={hostContainerStyle}>
        <Video
          src={staticFile("facecam_chunk01.mp4")}
          volume={0.80} // Calibrated dialogue level for broadcast clarity
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 22%",
          }}
        />
      </div>

      {/* ================================================================= */}
      {/* 2. SYNCHRONIZED AUDIO SFX SOUNDSCAPE (Crisp, High-Presence UI SFX) */}
      {/* ================================================================= */}
      {/* Frame 82: Drawdown -43.6% badge slam */}
      <Sequence from={82} durationInFrames={15}>
        <Audio src={staticFile("sfx/impact.wav")} volume={1.1} />
      </Sequence>

      {/* Frame 132: Recent Peak -30.0% badge pop */}
      <Sequence from={132} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frame 282: 52-Week Low floor fracture */}
      <Sequence from={282} durationInFrames={20}>
        <Audio src={staticFile("sfx/fracture.wav")} volume={1.0} />
      </Sequence>

      {/* Frame 405: Search bar entry */}
      <Sequence from={405} durationInFrames={12}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frames 674, 737, 786, 817: 4 News Newspaper Wire Clippings pop in */}
      <Sequence from={674} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>
      <Sequence from={737} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>
      <Sequence from={786} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>
      <Sequence from={817} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frame 958: 'Cut through the noise' Razor sweep whoosh */}
      <Sequence from={958} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={1.2} />
      </Sequence>

      {/* Frames 996 & 1059: Two Transition Cards */}
      <Sequence from={996} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>
      <Sequence from={1059} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frames 1319, 1366, 1445: The 3 Roadmap Pillars */}
      <Sequence from={1319} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>
      <Sequence from={1366} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>
      <Sequence from={1445} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Ambient Grid Background (Permanent backplate, zero frame-mount flicker) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 75% 30%, rgba(200, 169, 81, 0.04) 0%, transparent 60%),
            radial-gradient(circle at 85% 75%, rgba(244, 63, 94, 0.035) 0%, transparent 50%),
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 65px 65px, 65px 65px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ================================================================= */}
      {/* SECTION 1: ALL-TIME HIGH FULL RIGHT STAGE (Frames 58 -> 225)      */}
      {/* Starts after host has glided left (Left: 730px, Right: 70px)      */}
      {/* ================================================================= */}
      {sec1Active && (
        <div
          style={{
            position: "absolute",
            left: 730,
            top: 140,
            right: 70,
            height: 800,
            opacity: sec1Entrance * sec1Exit,
            transform: `translateX(${(1 - sec1Entrance) * 35}px)`,
            zIndex: 30,
            backgroundColor: TOKENS.surfaceCard,
            borderRadius: 22,
            border: `1.5px solid ${TOKENS.borderHairline}`,
            padding: "32px 38px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top Row: Asset Ticker & Badges */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
                borderBottom: `1px solid ${TOKENS.borderHairline}`,
                paddingBottom: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: TOKENS.metricNegative,
                    boxShadow: `0 0 10px ${TOKENS.metricNegative}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: TOKENS.fonts.metrics,
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: 2,
                    color: TOKENS.textSecondary,
                    textTransform: "uppercase",
                  }}
                >
                  AVENUE SUPERMARTS (DMART) · NSE
                </span>
              </div>
              <div
                style={{
                  fontFamily: TOKENS.fonts.metrics,
                  fontSize: 12,
                  fontWeight: 800,
                  color: TOKENS.brandGold,
                  backgroundColor: "rgba(200, 169, 81, 0.12)",
                  padding: "4px 12px",
                  borderRadius: 6,
                  border: `1px solid rgba(200, 169, 81, 0.3)`,
                }}
              >
                1W TIMEFRAME · ATH PEAK TO CURRENT
              </div>
            </div>

            {/* Price Stats Comparison */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              {/* ATH Stat */}
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: TOKENS.textSecondary,
                    textTransform: "uppercase",
                  }}
                >
                  All-Time High (ATH)
                </div>
                <div
                  style={{
                    fontFamily: TOKENS.fonts.metrics,
                    fontSize: 44,
                    fontWeight: 900,
                    color: TOKENS.textPrimary,
                  }}
                >
                  ₹5,900
                </div>
              </div>

              <div style={{ fontSize: 32, color: TOKENS.brandGold }}>➔</div>

              {/* Current Price Stat */}
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: TOKENS.metricNegative,
                    textTransform: "uppercase",
                  }}
                >
                  Current Market Price (CMP)
                </div>
                <div
                  style={{
                    fontFamily: TOKENS.fonts.metrics,
                    fontSize: 52,
                    fontWeight: 900,
                    color: TOKENS.metricNegative,
                    letterSpacing: -1,
                  }}
                >
                  ₹{currentPrice.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Badges Container */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Primary -43.6% Drawdown Badge */}
                <div
                  style={{
                    opacity: athBadgeSpring,
                    transform: `scale(${athBadgeSpring})`,
                    transformOrigin: "right center",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: "rgba(244, 63, 94, 0.16)",
                    border: `2px solid ${TOKENS.metricNegative}`,
                    padding: "8px 18px",
                    borderRadius: 10,
                    boxShadow: "0 0 25px rgba(244, 63, 94, 0.35)",
                  }}
                >
                  <ArrowDownRight size={26} color={TOKENS.metricNegative} />
                  <span
                    style={{
                      fontFamily: TOKENS.fonts.metrics,
                      fontSize: 24,
                      fontWeight: 900,
                      color: TOKENS.metricNegative,
                    }}
                  >
                    -43.6% FROM ATH
                  </span>
                </div>

                {/* Secondary -30% Recent Peak Badge */}
                {frame >= 125 && (
                  <div
                    style={{
                      opacity: peakBadgeSpring,
                      transform: `scale(${peakBadgeSpring})`,
                      transformOrigin: "right center",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(200, 169, 81, 0.14)",
                      border: `1.5px solid ${TOKENS.brandGold}`,
                      padding: "6px 14px",
                      borderRadius: 10,
                    }}
                  >
                    <TrendingDown size={20} color={TOKENS.brandGold} />
                    <span
                      style={{
                        fontFamily: TOKENS.fonts.metrics,
                        fontSize: 18,
                        fontWeight: 800,
                        color: TOKENS.brandGold,
                      }}
                    >
                      -30.0% RECENT PEAK
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Area: Large Vertical Candlestick Waterfall */}
          <div
            style={{
              backgroundColor: "rgba(20, 20, 23, 0.8)",
              borderRadius: 16,
              border: `1px solid ${TOKENS.borderHairline}`,
              padding: "16px 20px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* SVG Candlestick Waterfall */}
            <svg width="100%" height="450" style={{ overflow: "visible" }}>
              {/* Horizontal Price Gridlines */}
              {[5900, 5200, 4500, 3900, 3325].map((p) => {
                const y = 430 - ((p - 3200) / (6000 - 3200)) * 390 - 20;
                const isKey = p === 5900 || p === 3325;
                return (
                  <g key={p}>
                    <line
                      x1={0}
                      y1={y}
                      x2={980}
                      y2={y}
                      stroke={isKey ? "rgba(244, 63, 94, 0.5)" : "#2E2E33"}
                      strokeDasharray={isKey ? "4 4" : "2 2"}
                      strokeWidth={isKey ? 1.5 : 1}
                    />
                    <text
                      x={980}
                      y={y - 5}
                      fill={isKey ? (p === 5900 ? TOKENS.brandGold : TOKENS.metricNegative) : TOKENS.textSecondary}
                      fontSize={13}
                      fontFamily={TOKENS.fonts.metrics}
                      fontWeight={800}
                      textAnchor="end"
                    >
                      ₹{p}
                    </text>
                  </g>
                );
              })}

              {/* Candles */}
              {CANDLES_ATH_FALL.map((c, i) => {
                const candleRevealFrame = 65 + i * 4;
                if (frame < candleRevealFrame) return null;

                const candleSpring = spring({
                  frame: frame - candleRevealFrame,
                  fps,
                  config: { damping: 12, stiffness: 120 },
                });

                const spacing = 980 / (CANDLES_ATH_FALL.length + 1);
                const cx = spacing * (i + 1);
                const isBull = c.close >= c.open;
                const candleColor = isBull ? TOKENS.metricPositive : TOKENS.metricNegative;

                const yHigh = 430 - ((c.high - 3200) / (6000 - 3200)) * 390 - 20;
                const yLow = 430 - ((c.low - 3200) / (6000 - 3200)) * 390 - 20;
                const yOpen = 430 - ((c.open - 3200) / (6000 - 3200)) * 390 - 20;
                const yClose = 430 - ((c.close - 3200) / (6000 - 3200)) * 390 - 20;

                const bodyTop = Math.min(yOpen, yClose);
                const bodyHeight = Math.max(Math.abs(yClose - yOpen), 6);
                const candleW = 28;

                return (
                  <g key={i} opacity={candleSpring}>
                    {/* Wick */}
                    <line
                      x1={cx}
                      y1={yHigh}
                      x2={cx}
                      y2={yLow}
                      stroke={candleColor}
                      strokeWidth={2.5}
                    />
                    {/* Candle Body */}
                    <rect
                      x={cx - candleW / 2}
                      y={bodyTop}
                      width={candleW}
                      height={bodyHeight}
                      fill={candleColor}
                      rx={3}
                    />
                    {/* Volume Bar */}
                    <rect
                      x={cx - candleW / 2 + 3}
                      y={430 - (c.volume / 240) * 80}
                      width={candleW - 6}
                      height={(c.volume / 240) * 80}
                      fill={candleColor}
                      opacity={0.35}
                      rx={2}
                    />

                    {/* ATH Callout on Candle 0 */}
                    {i === 0 && (
                      <g>
                        <circle cx={cx} cy={yHigh} r={6} fill={TOKENS.brandGold} />
                        <rect
                          x={cx - 65}
                          y={yHigh - 38}
                          width={130}
                          height={28}
                          rx={6}
                          fill="#18181B"
                          stroke={TOKENS.brandGold}
                          strokeWidth={1.5}
                        />
                        <text
                          x={cx}
                          y={yHigh - 20}
                          fill={TOKENS.brandGold}
                          fontSize={13}
                          fontFamily={TOKENS.fonts.metrics}
                          fontWeight={800}
                          textAnchor="middle"
                        >
                          ATH ₹5,900
                        </text>
                      </g>
                    )}

                    {/* CMP Callout on Last Candle */}
                    {i === CANDLES_ATH_FALL.length - 1 && frame >= 115 && (
                      <g>
                        <circle cx={cx} cy={yLow} r={6} fill={TOKENS.metricNegative} />
                        <rect
                          x={cx - 70}
                          y={yLow + 14}
                          width={140}
                          height={28}
                          rx={6}
                          fill="#18181B"
                          stroke={TOKENS.metricNegative}
                          strokeWidth={1.5}
                        />
                        <text
                          x={cx}
                          y={yLow + 33}
                          fill={TOKENS.metricNegative}
                          fontSize={13}
                          fontFamily={TOKENS.fonts.metrics}
                          fontWeight={800}
                          textAnchor="middle"
                        >
                          CMP ₹3,325
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SECTION 2: 52-WEEK LOW TRADINGVIEW BREAKDOWN (Frames 225 -> 405)  */}
      {/* Real TradingView Chart of DMart breaching 52-Week Low floor       */}
      {/* ================================================================= */}
      {sec2Active && (
        <div
          style={{
            position: "absolute",
            left: 730,
            top: 140,
            right: 70,
            height: 800,
            opacity: sec2Entrance * sec2Exit,
            transform: `translateY(${(1 - sec2Entrance) * 30}px)`,
            zIndex: 30,
            backgroundColor: TOKENS.surfaceCard,
            borderRadius: 22,
            border: `1.5px solid ${frame >= 282 ? "rgba(244, 63, 94, 0.45)" : TOKENS.borderHairline}`,
            padding: "32px 38px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top Bar: TradingView Chart Header */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
                borderBottom: `1px solid ${TOKENS.borderHairline}`,
                paddingBottom: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <BarChart3 size={20} color={TOKENS.brandGold} />
                <span
                  style={{
                    fontFamily: TOKENS.fonts.metrics,
                    fontSize: 16,
                    fontWeight: 800,
                    color: TOKENS.textPrimary,
                  }}
                >
                  TRADINGVIEW · DMART 1D / 1W STRUCTURAL CHART
                </span>
              </div>
              <div
                style={{
                  fontFamily: TOKENS.fonts.metrics,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  padding: "6px 14px",
                  borderRadius: 8,
                  backgroundColor:
                    frame >= 282 ? "rgba(244, 63, 94, 0.2)" : "rgba(200, 169, 81, 0.15)",
                  border: `1.5px solid ${frame >= 282 ? TOKENS.metricNegative : TOKENS.brandGold}`,
                  color: frame >= 282 ? TOKENS.metricNegative : TOKENS.brandGold,
                }}
              >
                {frame >= 282 ? "52-WEEK LOW BREACHED" : "TESTING 52-WEEK LOW SUPPORT"}
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: TOKENS.textPrimary,
                letterSpacing: -0.5,
              }}
            >
              52-WEEK LOW SUPPORT BREACH
            </div>
            <div
              style={{
                fontSize: 16,
                color: TOKENS.textSecondary,
                marginTop: 4,
              }}
            >
              Structural demand zone at ₹3,600 breached with heavy follow-through volume:
            </div>
          </div>

          {/* Interactive TradingView Chart Surface */}
          <div
            style={{
              backgroundColor: "rgba(18, 18, 20, 0.95)",
              borderRadius: 16,
              border: `1px solid ${TOKENS.borderHairline}`,
              padding: "20px 24px",
              flex: 1,
              marginTop: 18,
              position: "relative",
            }}
          >
            <svg width="100%" height="480" style={{ overflow: "visible" }}>
              {/* Horizontal Price Gridlines */}
              {[4200, 3900, 3600, 3325].map((p) => {
                const y = 450 - ((p - 3200) / (4300 - 3200)) * 400 - 30;
                const isSupport = p === 3600;
                return (
                  <g key={p}>
                    <line
                      x1={0}
                      y1={y}
                      x2={980}
                      y2={y}
                      stroke={
                        isSupport
                          ? (frame >= 282 ? TOKENS.metricNegative : TOKENS.brandGold)
                          : "#2E2E33"
                      }
                      strokeDasharray={isSupport ? (frame >= 282 ? "6 6" : "none") : "2 2"}
                      strokeWidth={isSupport ? 2.5 : 1}
                    />
                    <text
                      x={980}
                      y={y - 8}
                      fill={
                        isSupport
                          ? (frame >= 282 ? TOKENS.metricNegative : TOKENS.brandGold)
                          : TOKENS.textSecondary
                      }
                      fontSize={14}
                      fontFamily={TOKENS.fonts.metrics}
                      fontWeight={800}
                      textAnchor="end"
                    >
                      {isSupport ? `52-WEEK LOW FLOOR: ₹${p}` : `₹${p}`}
                    </text>
                  </g>
                );
              })}

              {/* Candles */}
              {CANDLES_52W_BREAKDOWN.map((c, i) => {
                const candleRevealFrame = 230 + i * 8;
                if (frame < candleRevealFrame) return null;

                const cSpring = spring({
                  frame: frame - candleRevealFrame,
                  fps,
                  config: { damping: 12, stiffness: 120 },
                });

                const spacing = 980 / (CANDLES_52W_BREAKDOWN.length + 1);
                const cx = spacing * (i + 1);
                const isBull = c.close >= c.open;
                const candleColor = isBull ? TOKENS.metricPositive : TOKENS.metricNegative;

                const yHigh = 450 - ((c.high - 3200) / (4300 - 3200)) * 400 - 30;
                const yLow = 450 - ((c.low - 3200) / (4300 - 3200)) * 400 - 30;
                const yOpen = 450 - ((c.open - 3200) / (4300 - 3200)) * 400 - 30;
                const yClose = 450 - ((c.close - 3200) / (4300 - 3200)) * 400 - 30;

                const bodyTop = Math.min(yOpen, yClose);
                const bodyHeight = Math.max(Math.abs(yClose - yOpen), 8);
                const candleW = 34;

                return (
                  <g key={i} opacity={cSpring}>
                    {/* Wick */}
                    <line
                      x1={cx}
                      y1={yHigh}
                      x2={cx}
                      y2={yLow}
                      stroke={candleColor}
                      strokeWidth={3}
                    />
                    {/* Candle Body */}
                    <rect
                      x={cx - candleW / 2}
                      y={bodyTop}
                      width={candleW}
                      height={bodyHeight}
                      fill={candleColor}
                      rx={4}
                    />
                    {/* Volume Bar */}
                    <rect
                      x={cx - candleW / 2 + 4}
                      y={450 - (c.volume / 300) * 110}
                      width={candleW - 8}
                      height={(c.volume / 300) * 110}
                      fill={candleColor}
                      opacity={0.4}
                      rx={2}
                    />

                    {/* Breakdown Breach Arrow & Alert on Candle 4 (Frame 282) */}
                    {i === 4 && frame >= 282 && (
                      <g opacity={breakdownSpring}>
                        <line
                          x1={cx}
                          y1={yLow}
                          x2={cx}
                          y2={yLow + 45}
                          stroke={TOKENS.metricNegative}
                          strokeWidth={3}
                        />
                        <polygon
                          points={`${cx - 8},${yLow + 40} ${cx + 8},${yLow + 40} ${cx},${yLow + 55}`}
                          fill={TOKENS.metricNegative}
                        />
                        <rect
                          x={cx - 95}
                          y={yLow + 62}
                          width={190}
                          height={30}
                          rx={6}
                          fill="#18181B"
                          stroke={TOKENS.metricNegative}
                          strokeWidth={1.5}
                        />
                        <text
                          x={cx}
                          y={yLow + 82}
                          fill={TOKENS.metricNegative}
                          fontSize={12}
                          fontFamily={TOKENS.fonts.metrics}
                          fontWeight={900}
                          textAnchor="middle"
                        >
                          ▼ VIOLATING 52W SUPPORT
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SECTION 3 & 4: 3D SEARCH BAR & 4 NEWSPAPER CLIPPINGS              */}
      {/* Larger Search Font (36px); Compact Consistent Boxes; NO Brokerage */}
      {/* ================================================================= */}
      {secNewsActive && (
        <div
          style={{
            position: "absolute",
            left: 730,
            top: 140,
            right: 70,
            height: 800,
            opacity: newsDissolve,
            zIndex: 35,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* RETAINED SEARCH BAR AT TOP WITH LARGER HEADLINE FONT (36px) */}
          <div
            style={{
              height: 84,
              backgroundColor: "rgba(24, 24, 27, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: 18,
              border: `2px solid ${frame >= 558 ? TOKENS.brandGold : TOKENS.borderActive}`,
              padding: "0 32px",
              display: "flex",
              alignItems: "center",
              gap: 22,
              boxShadow: "0 18px 45px rgba(0, 0, 0, 0.7)",
              opacity: searchBarSpring,
              transform: `scale(${searchBarSpring})`,
            }}
          >
            <Search size={34} color={TOKENS.brandGold} />
            <div
              style={{
                fontSize: 34, // Prominent Headline Font Size
                fontWeight: 800,
                color: TOKENS.textPrimary,
                letterSpacing: -0.5,
                flex: 1,
              }}
            >
              {displayedQuery}
              {frame % 14 < 7 && frame < 580 && (
                <span style={{ color: TOKENS.brandGold, marginLeft: 3 }}>|</span>
              )}
            </div>
            <span
              style={{
                fontFamily: TOKENS.fonts.metrics,
                fontSize: 13,
                fontWeight: 800,
                color: TOKENS.brandGold,
                padding: "6px 14px",
                borderRadius: 6,
                backgroundColor: "rgba(200, 169, 81, 0.1)",
                border: `1px solid rgba(200, 169, 81, 0.3)`,
              }}
            >
              RETAIL SEARCH WIRE
            </span>
          </div>

          {/* 4 COMPACT NEWSPAPER CLIPPINGS (MATCHING YOUR EXACT SPOKEN WORDS) */}
          {frame >= 650 && (
            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: 16,
              }}
            >
              {/* Box 1: MARGIN PRESSURE AND PROFIT DECLINE (Spoken words) */}
              <div
                style={{
                  opacity: tile1Spring,
                  transform: `scale(${tile1Spring})`,
                  backgroundColor: TOKENS.surfaceCard,
                  borderRadius: 18,
                  border: `1.5px solid ${TOKENS.borderHairline}`,
                  padding: "22px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.65)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: TOKENS.brandGold,
                      }}
                    >
                      <Newspaper size={15} color={TOKENS.brandGold} />
                      FINANCIAL PRESS WIRE
                    </span>
                    <TrendingDown size={22} color={TOKENS.metricNegative} />
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: TOKENS.textPrimary,
                      lineHeight: 1.2,
                    }}
                  >
                    MARGIN PRESSURE & PROFIT DECLINE
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: TOKENS.textSecondary,
                      marginTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    General merchandise & apparel contribution shrinks; gross margin declines.
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: TOKENS.fonts.metrics,
                      fontSize: 13,
                      fontWeight: 800,
                      color: TOKENS.brandGold,
                      padding: "5px 12px",
                      borderRadius: 6,
                      backgroundColor: "rgba(200, 169, 81, 0.1)",
                      border: "1px solid rgba(200, 169, 81, 0.3)",
                    }}
                  >
                    -80 BPS MARGIN COMPRESSION
                  </span>
                </div>
              </div>

              {/* Box 2: INTENSE QUICK COMMERCE COMPETITION (Spoken words) */}
              <div
                style={{
                  opacity: tile2Spring,
                  transform: `scale(${tile2Spring})`,
                  backgroundColor: TOKENS.surfaceCard,
                  borderRadius: 18,
                  border: `1.5px solid ${TOKENS.borderHairline}`,
                  padding: "22px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.65)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: TOKENS.brandGold,
                      }}
                    >
                      <Newspaper size={15} color={TOKENS.brandGold} />
                      RETAIL DISRUPTION WIRE
                    </span>
                    <Zap size={22} color={TOKENS.brandGold} />
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: TOKENS.textPrimary,
                      lineHeight: 1.2,
                    }}
                  >
                    INTENSE QUICK COMMERCE COMPETITION
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: TOKENS.textSecondary,
                      marginTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    Blinkit, Zepto & Swiggy rapid 10-minute delivery erodes metro grocery baskets.
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: TOKENS.fonts.metrics,
                      fontSize: 13,
                      fontWeight: 800,
                      color: TOKENS.brandGold,
                      padding: "5px 12px",
                      borderRadius: 6,
                      backgroundColor: "rgba(200, 169, 81, 0.1)",
                      border: "1px solid rgba(200, 169, 81, 0.3)",
                    }}
                  >
                    3,500+ METRO DARK STORES
                  </span>
                </div>
              </div>

              {/* Box 3: HIGHER COST AND CAPITAL OVERHANG (Spoken words) */}
              <div
                style={{
                  opacity: tile3Spring,
                  transform: `scale(${tile3Spring})`,
                  backgroundColor: TOKENS.surfaceCard,
                  borderRadius: 18,
                  border: `1.5px solid ${TOKENS.borderHairline}`,
                  padding: "22px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.65)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: TOKENS.brandGold,
                      }}
                    >
                      <Newspaper size={15} color={TOKENS.brandGold} />
                      CAPEX & EXPANSION WIRE
                    </span>
                    <Building2 size={22} color={TOKENS.brandGold} />
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: TOKENS.textPrimary,
                      lineHeight: 1.2,
                    }}
                  >
                    HIGHER COST & CAPITAL OVERHANG
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: TOKENS.textSecondary,
                      marginTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    100% store ownership model locks heavy upfront capital before revenues unlock.
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: TOKENS.fonts.metrics,
                      fontSize: 13,
                      fontWeight: 800,
                      color: TOKENS.brandGold,
                      padding: "5px 12px",
                      borderRadius: 6,
                      backgroundColor: "rgba(200, 169, 81, 0.1)",
                      border: "1px solid rgba(200, 169, 81, 0.3)",
                    }}
                  >
                    ₹1,624 CR WORK-IN-PROGRESS
                  </span>
                </div>
              </div>

              {/* Box 4: CAUTIOUS BROKERAGE RATINGS (Spoken words) */}
              <div
                style={{
                  opacity: tile4Spring,
                  transform: `scale(${tile4Spring})`,
                  backgroundColor: TOKENS.surfaceCard,
                  borderRadius: 18,
                  border: `1.5px solid ${TOKENS.borderHairline}`,
                  padding: "22px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.65)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: TOKENS.brandGold,
                      }}
                    >
                      <Newspaper size={15} color={TOKENS.brandGold} />
                      MARKET CONSENSUS WIRE
                    </span>
                    <Flame size={22} color={TOKENS.brandGold} />
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: TOKENS.textPrimary,
                      lineHeight: 1.2,
                    }}
                  >
                    CAUTIOUS BROKERAGE RATINGS
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: TOKENS.textSecondary,
                      marginTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    Institutional analysts turn cautious with aggressive multiple compression.
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: TOKENS.fonts.metrics,
                      fontSize: 13,
                      fontWeight: 800,
                      color: TOKENS.brandGold,
                      padding: "5px 12px",
                      borderRadius: 6,
                      backgroundColor: "rgba(200, 169, 81, 0.1)",
                      border: "1px solid rgba(200, 169, 81, 0.3)",
                    }}
                  >
                    CONSENSUS PE CUT: 115x ➔ 68x
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ELECTRIC HIFY GOLD RAZOR SWEEP (Frames 958 -> 978 on "cut through the noise") */}
      {frame >= 954 && frame <= 982 && (
        <div
          style={{
            position: "absolute",
            top: -60,
            bottom: -60,
            left: sweepX,
            width: 5,
            backgroundColor: TOKENS.brandGold,
            boxShadow: `0 0 50px 14px ${TOKENS.brandGold}, 0 0 100px 35px rgba(200, 169, 81, 0.5)`,
            transform: "rotate(8deg)",
            zIndex: 60,
          }}
        />
      )}

      {/* ================================================================= */}
      {/* SECTION 5: TWO ELEGANT CARDS (UNIFIED DESIGN, NO CLUTTERED PILLS) */}
      {/* "Current Situation of DMart" & "How Happy Investing Sees It"       */}
      {/* ================================================================= */}
      {sec5Active && (
        <div
          style={{
            position: "absolute",
            left: 730,
            top: 140,
            right: 70,
            height: 800,
            opacity: sec5Exit,
            transform: `translateX(${(1 - sec5Exit) * 50}px)`,
            zIndex: 35,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {/* Card 1: "Current Situation of DMart" (Spoken at Frame 996) */}
          <div
            style={{
              flex: 1,
              backgroundColor: TOKENS.surfaceCard,
              borderRadius: 22,
              border: `1.5px solid ${TOKENS.borderHairline}`,
              padding: "36px 42px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75)",
              opacity: situationCardSpring,
              transform: `translateY(${(1 - situationCardSpring) * 30}px)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    backgroundColor: "rgba(200, 169, 81, 0.1)",
                    border: `1px solid rgba(200, 169, 81, 0.3)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AlertTriangle size={20} color={TOKENS.brandGold} />
                </div>
                <span
                  style={{
                    fontFamily: TOKENS.fonts.metrics,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: TOKENS.brandGold,
                  }}
                >
                  01 / RETAIL NARRATIVE
                </span>
              </div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: TOKENS.textPrimary,
                  letterSpacing: -0.5,
                }}
              >
                Current Situation of DMart
              </div>
              <div
                style={{
                  fontSize: 17,
                  color: TOKENS.textSecondary,
                  marginTop: 10,
                  lineHeight: 1.5,
                }}
              >
                Avenue Supermarts faces margin compression, quick commerce disruption, and a severe -43.6% drawdown breaching multi-year support levels.
              </div>
            </div>
            <div
              style={{
                fontFamily: TOKENS.fonts.metrics,
                fontSize: 13,
                fontWeight: 800,
                color: TOKENS.brandGold,
                backgroundColor: "rgba(200, 169, 81, 0.1)",
                padding: "8px 16px",
                borderRadius: 8,
                border: `1px solid rgba(200, 169, 81, 0.3)`,
                display: "inline-block",
                alignSelf: "flex-start",
              }}
            >
              MACRO HEADWINDS & CAPITAL WITHDRAWAL
            </div>
          </div>

          {/* Card 2: "How Happy Investing Sees It" (Spoken at Frame 1059) */}
          <div
            style={{
              flex: 1,
              backgroundColor: TOKENS.surfaceCard,
              borderRadius: 22,
              border: `1.5px solid ${TOKENS.borderHairline}`,
              padding: "36px 42px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75)",
              opacity: happyInvestingCardSpring,
              transform: `translateY(${(1 - happyInvestingCardSpring) * 30}px)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    backgroundColor: "rgba(200, 169, 81, 0.1)",
                    border: `1px solid rgba(200, 169, 81, 0.3)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Sparkles size={20} color={TOKENS.brandGold} />
                </div>
                <span
                  style={{
                    fontFamily: TOKENS.fonts.metrics,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: TOKENS.brandGold,
                  }}
                >
                  02 / INSTITUTIONAL MOAT THESIS
                </span>
              </div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: TOKENS.textPrimary,
                  letterSpacing: -0.5,
                }}
              >
                How Happy Investing Sees It
              </div>
              <div
                style={{
                  fontSize: 17,
                  color: TOKENS.textSecondary,
                  marginTop: 10,
                  lineHeight: 1.5,
                }}
              >
                Zero debt, 100% real estate ownership moat, and cluster expansion store economics create an asymmetric risk-reward for disciplined long-term capital.
              </div>
            </div>
            <div
              style={{
                fontFamily: TOKENS.fonts.metrics,
                fontSize: 13,
                fontWeight: 800,
                color: TOKENS.brandGold,
                backgroundColor: "rgba(200, 169, 81, 0.1)",
                padding: "8px 16px",
                borderRadius: 8,
                border: `1px solid rgba(200, 169, 81, 0.3)`,
                display: "inline-block",
                alignSelf: "flex-start",
              }}
            >
              LONG-TERM COMPOUNDING OPPORTUNITY
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SECTION 6: THE 3-DIMENSIONAL AUDIT ON THE LEFT (Frames 1220 -> 1581)*/}
      {/* 100% UNIFIED FONT & COMPONENT CONSISTENCY ACROSS ALL 3 PILLARS    */}
      {/* ================================================================= */}
      {sec6Active && (
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 140,
            width: 1160,
            height: 800,
            opacity: roadmapEntrance,
            zIndex: 35,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header Title */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 999,
                backgroundColor: "rgba(200, 169, 81, 0.12)",
                border: `1px solid ${TOKENS.brandGold}`,
                color: TOKENS.brandGold,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              <span>SYSTEMATIC DECISION ROADMAP</span>
            </div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 900,
                letterSpacing: -1,
                color: TOKENS.textPrimary,
                textTransform: "uppercase",
              }}
            >
              THE 3-DIMENSIONAL AUDIT
            </div>
            <div
              style={{
                fontSize: 17,
                color: TOKENS.textSecondary,
                marginTop: 4,
              }}
            >
              A complete institutional blueprint across 3 structured pillars:
            </div>
          </div>

          {/* 3 EQUAL HEIGHT MONOLITH CARDS (100% CONSISTENT TYPOGRAPHY & TAGS) */}
          <div
            style={{
              flex: 1,
              marginTop: 18,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Pillar 01: Technical Confluence (Frame 1319) */}
            <div
              style={{
                flex: 1,
                position: "relative",
                opacity: pillar1Spring,
                transform: `translateX(${(1 - pillar1Spring) * -40}px)`,
                backgroundColor: TOKENS.surfaceCard,
                borderRadius: 20,
                border: `1.5px solid ${TOKENS.borderHairline}`,
                padding: "24px 34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflow: "hidden",
                boxShadow: "0 18px 40px rgba(0, 0, 0, 0.55)",
              }}
            >
              {/* Watermark Numeral */}
              <div
                style={{
                  position: "absolute",
                  right: 210,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontFamily: TOKENS.fonts.metrics,
                  fontSize: 110,
                  fontWeight: 900,
                  color: TOKENS.brandGold,
                  opacity: 0.12,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                01
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${TOKENS.borderHairline}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: TOKENS.brandGold,
                  }}
                >
                  <Compass size={30} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: TOKENS.textPrimary,
                      letterSpacing: -0.3,
                    }}
                  >
                    01 / TECHNICAL CONFLUENCE
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      color: TOKENS.textSecondary,
                      marginTop: 4,
                    }}
                  >
                    5-Year Structural Support & Historic Valuation PE Sweet Spot
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontFamily: TOKENS.fonts.metrics,
                  fontSize: 13,
                  fontWeight: 800,
                  color: TOKENS.brandGold,
                  backgroundColor: "rgba(200, 169, 81, 0.1)",
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: `1px solid rgba(200, 169, 81, 0.3)`,
                }}
              >
                PILLAR 01
              </div>
            </div>

            {/* Pillar 02: Fundamental Reality (Frame 1366) */}
            <div
              style={{
                flex: 1,
                position: "relative",
                opacity: pillar2Spring,
                transform: `translateX(${(1 - pillar2Spring) * -40}px)`,
                backgroundColor: TOKENS.surfaceCard,
                borderRadius: 20,
                border: `1.5px solid ${TOKENS.borderHairline}`,
                padding: "24px 34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflow: "hidden",
                boxShadow: "0 18px 40px rgba(0, 0, 0, 0.55)",
              }}
            >
              {/* Watermark Numeral */}
              <div
                style={{
                  position: "absolute",
                  right: 210,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontFamily: TOKENS.fonts.metrics,
                  fontSize: 110,
                  fontWeight: 900,
                  color: TOKENS.brandGold,
                  opacity: 0.12,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                02
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${TOKENS.borderHairline}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: TOKENS.brandGold, // Unified Gold Icon!
                  }}
                >
                  <Layers size={30} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: TOKENS.textPrimary,
                      letterSpacing: -0.3,
                    }}
                  >
                    02 / FUNDAMENTAL REALITY
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      color: TOKENS.textSecondary,
                      marginTop: 4,
                    }}
                  >
                    Fixed Assets, CWIP Pipeline & 100% Land Ownership Moat
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontFamily: TOKENS.fonts.metrics,
                  fontSize: 13,
                  fontWeight: 800,
                  color: TOKENS.brandGold, // Unified Gold Tag!
                  backgroundColor: "rgba(200, 169, 81, 0.1)",
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: `1px solid rgba(200, 169, 81, 0.3)`,
                }}
              >
                PILLAR 02
              </div>
            </div>

            {/* Pillar 03: Capital Execution & Risk (Frame 1445) */}
            <div
              style={{
                flex: 1,
                position: "relative",
                opacity: pillar3Spring,
                transform: `translateX(${(1 - pillar3Spring) * -40}px)`,
                backgroundColor: TOKENS.surfaceCard,
                borderRadius: 20,
                border: `1.5px solid ${TOKENS.borderHairline}`,
                padding: "24px 34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflow: "hidden",
                boxShadow: "0 18px 40px rgba(0, 0, 0, 0.55)",
              }}
            >
              {/* Watermark Numeral */}
              <div
                style={{
                  position: "absolute",
                  right: 210,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontFamily: TOKENS.fonts.metrics,
                  fontSize: 110,
                  fontWeight: 900,
                  color: TOKENS.brandGold,
                  opacity: 0.12,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                03
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${TOKENS.borderHairline}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: TOKENS.brandGold,
                  }}
                >
                  <Shield size={30} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: TOKENS.textPrimary,
                      letterSpacing: -0.3,
                    }}
                  >
                    03 / CAPITAL EXECUTION & RISK MANAGEMENT
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      color: TOKENS.textSecondary,
                      marginTop: 4,
                    }}
                  >
                    5% Total Portfolio Allocation Cap & 1% Tranche Pyramiding
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontFamily: TOKENS.fonts.metrics,
                  fontSize: 13,
                  fontWeight: 800,
                  color: TOKENS.brandGold,
                  backgroundColor: "rgba(200, 169, 81, 0.1)",
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: `1px solid rgba(200, 169, 81, 0.3)`,
                }}
              >
                PILLAR 03
              </div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
