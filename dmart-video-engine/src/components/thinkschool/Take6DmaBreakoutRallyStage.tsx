import React from "react";
import { interpolate, spring, staticFile, useVideoConfig } from "remotion";

export interface Take6DmaBreakoutRallyStageProps {
  localFrame: number;
}

export const Take6DmaBreakoutRallyStage: React.FC<Take6DmaBreakoutRallyStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Screen entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // 200 DMA Header & Line on spoken word "200DMA come" (localFrame 223 = Abs Frame 3194)
  const dmaHeaderSpring = spring({
    frame: Math.max(0, localFrame - 223),
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // Breakout @ 65 beacon on spoken word "strategies / opportunity" (localFrame 330 = Abs Frame 3301)
  const breakout65Spring = spring({
    frame: Math.max(0, localFrame - 330),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Rally to 280+ badge on spoken words "strategy says yes, this is the time" (localFrame 479 = Abs Frame 3450)
  const rally280Spring = spring({
    frame: Math.max(0, localFrame - 479),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Discipline vs Gambling contrast pill (localFrame 520 = Abs Frame 3491)
  const contrastSpring = spring({
    frame: Math.max(0, localFrame - 520),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // =========================================================================
  // ANIMATED GRAPH LINE 1: THE 200-DAY MOVING AVERAGE LINE (Orange Curve)
  // Draws from (78, 520) -> (575, 690) -> (1045, 390) between localFrame 180 and 320
  // =========================================================================
  const dmaPoints = [
    { x: 78, y: 520 },
    { x: 300, y: 640 },
    { x: 575, y: 690 },
    { x: 800, y: 560 },
    { x: 1045, y: 390 },
  ];

  const dmaProgress = interpolate(localFrame, [180, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Draw portion of 200 DMA curve
  const currentDmaEndX = interpolate(dmaProgress, [0, 1], [dmaPoints[0].x, dmaPoints[4].x]);
  const currentDmaEndY = interpolate(dmaProgress, [0, 1], [dmaPoints[0].y, dmaPoints[4].y]);
  const dmaPath = `M ${dmaPoints[0].x} ${dmaPoints[0].y} Q 300 640, ${currentDmaEndX} ${currentDmaEndY}`;

  // =========================================================================
  // ANIMATED GRAPH LINE 2: THE 200 DMA BREAKOUT & RALLY CURVE (Emerald Green)
  // Starts base from (78, 550) -> Breakout at (575, 690) [₹65] -> Top (1045, 140) [₹282]
  // Phase 1 (Base to Breakout): localFrame 260 -> 330
  // Phase 2 (Breakout to ₹280): localFrame 330 -> 479
  // =========================================================================
  const r0 = { x: 78, y: 550 };   // Base
  const r1 = { x: 300, y: 760 };  // Rounding Base @ ₹40
  const r2 = { x: 575, y: 690 };  // Breakout @ ₹65 (crosses 200 DMA)
  const r3 = { x: 1045, y: 140 }; // Rally Peak @ ₹282

  let rallyHeadX = r0.x;
  let rallyHeadY = r0.y;
  let rallyPath = `M ${r0.x} ${r0.y}`;

  if (localFrame < 260) {
    rallyHeadX = r0.x;
    rallyHeadY = r0.y;
    rallyPath = `M ${r0.x} ${r0.y}`;
  } else if (localFrame >= 260 && localFrame < 330) {
    const t = interpolate(localFrame, [260, 330], [0, 1], { extrapolateRight: "clamp" });
    rallyHeadX = interpolate(t, [0, 1], [r0.x, r2.x]);
    rallyHeadY = interpolate(t, [0, 1], [r0.y, r2.y]);
    rallyPath = `M ${r0.x} ${r0.y} Q ${r1.x} ${r1.y}, ${rallyHeadX} ${rallyHeadY}`;
  } else if (localFrame >= 330) {
    const t = interpolate(localFrame, [330, 479], [0, 1], { extrapolateRight: "clamp" });
    rallyHeadX = interpolate(t, [0, 1], [r2.x, r3.x]);
    rallyHeadY = interpolate(t, [0, 1], [r2.y, r3.y]);
    rallyPath = `M ${r0.x} ${r0.y} Q ${r1.x} ${r1.y}, ${r2.x} ${r2.y} Q 800 360, ${rallyHeadX} ${rallyHeadY}`;
  }

  const rallyAreaPath = `${rallyPath} L ${rallyHeadX} 850 L ${r0.x} 850 Z`;

  // Camera slow push-in
  const zoomScale = interpolate(localFrame, [0, 600], [1.0, 1.03], { extrapolateRight: "clamp" });

  // Pulsing beacon on ₹65 breakout point
  const breakoutPulse =
    localFrame >= 330 ? 1 + Math.sin((localFrame - 330) * 0.25) * 0.25 : 1;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070B12",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
        opacity: enterSpring,
      }}
    >
      {/* Background TradingView 200 DMA Chart on Right 65% (Facecam on Left) */}
      <div
        style={{
          position: "absolute",
          left: 680,
          top: 70,
          width: 1180,
          height: 940,
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
          backgroundColor: "#131722",
        }}
      >
        {/* Background TradingView Image (1180x940 native) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${zoomScale})`,
            transformOrigin: "center center",
          }}
        >
          <img
            src={staticFile("jio_assets/06_zomato_200dma_charts/03_zomato_200dma_breakout_tradingview_1180x940.png")}
            alt="Zomato 200 DMA Chart"
            style={{ width: "100%", height: "100%", objectFit: "fill", opacity: 1.0 }}
          />
        </div>

        {/* =========================================================================
            DYNAMIC SVG ANIMATED GRAPH LINES LAYER (200 DMA + RALLY PATH)
            ========================================================================= */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient id="rallyGreenArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#F59E0B" floodOpacity="0.9" />
            </filter>
            <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#10B981" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* 1. Shaded Green Area below Rally Path */}
          {localFrame >= 260 && (
            <path d={rallyAreaPath} fill="url(#rallyGreenArea)" />
          )}

          {/* 2. THE ANIMATED 200 DMA ORANGE CURVE */}
          {localFrame >= 180 && (
            <path
              d={dmaPath}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeDasharray="8 6"
              strokeLinecap="round"
              filter="url(#goldGlow)"
            />
          )}

          {/* 200 DMA Leading Indicator Head */}
          {localFrame >= 180 && (
            <circle
              cx={currentDmaEndX}
              cy={currentDmaEndY}
              r="6"
              fill="#FFFFFF"
              stroke="#F59E0B"
              strokeWidth="3"
              filter="url(#goldGlow)"
            />
          )}

          {/* 3. THE CLEAN MULTI-BAGGER RALLY GRAPH LINE */}
          {localFrame >= 260 && (
            <path
              d={rallyPath}
              fill="none"
              stroke="#10B981"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#emeraldGlow)"
            />
          )}

          {/* Rally Leading Head */}
          {localFrame >= 260 && (
            <circle
              cx={rallyHeadX}
              cy={rallyHeadY}
              r="8"
              fill="#FFFFFF"
              stroke="#10B981"
              strokeWidth="4"
              filter="url(#emeraldGlow)"
            />
          )}

          {/* Breakout Node at ₹65 */}
          {localFrame >= 330 && (
            <circle
              cx={r2.x}
              cy={r2.y}
              r="8"
              fill="#10B981"
              stroke="#FFFFFF"
              strokeWidth="3"
              filter="url(#emeraldGlow)"
            />
          )}
        </svg>

        {/* Top Header Pill (Pops at localFrame 223 on "200DMA come") */}
        <div style={{ position: "absolute", top: 30, left: 30, opacity: dmaHeaderSpring }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(19, 23, 34, 0.95)",
              border: "1px solid rgba(245, 158, 11, 0.6)",
              borderRadius: 10,
              padding: "8px 18px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            }}
          >
            <span style={{ fontSize: 18 }}>📈</span>
            <span style={{ color: "#FACC15", fontSize: 16, fontWeight: 800, letterSpacing: 1 }}>
              MID-2023 // 200-DAY MOVING AVERAGE FORMED
            </span>
          </div>
        </div>

        {/* 200 DMA Line Floating Label */}
        {localFrame >= 220 && (
          <div
            style={{
              position: "absolute",
              top: dmaPoints[1].y - 35,
              left: dmaPoints[1].x,
              background: "rgba(245, 158, 11, 0.95)",
              color: "#000",
              padding: "4px 12px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 900,
              boxShadow: "0 4px 15px rgba(245, 158, 11, 0.5)",
            }}
          >
            200 DMA Line
          </div>
        )}

        {/* Breakout Callout @ ₹65 (Pops at localFrame 330 on "strategy / opportunity") */}
        <div
          style={{
            position: "absolute",
            top: r2.y - 65,
            left: r2.x - 70,
            opacity: breakout65Spring,
            transform: `scale(${interpolate(breakout65Spring, [0, 1], [0.8, 1.0]) * breakoutPulse})`,
          }}
        >
          <div
            style={{
              background: "rgba(16, 185, 129, 0.95)",
              color: "#FFF",
              padding: "10px 20px",
              borderRadius: 10,
              fontSize: 19,
              fontWeight: 900,
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.6)",
              border: "2px solid #FFF",
              textAlign: "center",
            }}
          >
            <div>★ 200 DMA Breakout @ ₹65</div>
            <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.9 }}>Institutional Accumulation</div>
          </div>
        </div>

        {/* Rally Target Callout @ ₹280+ (Pops at localFrame 479 on "strategy says yes") */}
        <div
          style={{
            position: "absolute",
            top: 110,
            right: 70,
            opacity: rally280Spring,
            transform: `scale(${interpolate(rally280Spring, [0, 1], [0.8, 1.0])})`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #10B981, #059669)",
              color: "#FFF",
              padding: "16px 28px",
              borderRadius: 16,
              fontSize: 26,
              fontWeight: 900,
              boxShadow: "0 15px 45px rgba(16, 185, 129, 0.6)",
              border: "2px solid rgba(255, 255, 255, 0.9)",
              textAlign: "center",
            }}
          >
            <div>Rallied to ₹280+</div>
            <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.9 }}>
              +330% Stress-Free Compounding
            </div>
          </div>
        </div>

        {/* Bottom Contrast Pill (Pops at localFrame 520) */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 30,
            right: 30,
            opacity: contrastSpring,
            transform: `translateY(${interpolate(contrastSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 16,
              padding: "16px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#EF4444", fontSize: 18, fontWeight: 800 }}>❌ Guessing ₹40 Bottom:</span>
              <span style={{ color: "#9CA3AF", fontSize: 16 }}>Blind Gamble & Year of Fear</span>
            </div>
            <div style={{ width: 1, height: 24, backgroundColor: "rgba(255,255,255,0.2)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#10B981", fontSize: 18, fontWeight: 800 }}>✅ Entering ₹65 on 200 DMA:</span>
              <span style={{ color: "#F3F4F6", fontSize: 16, fontWeight: 700 }}>Institutional Accumulation Proof</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
