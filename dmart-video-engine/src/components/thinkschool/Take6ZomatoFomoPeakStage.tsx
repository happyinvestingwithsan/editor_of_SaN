import React from "react";
import { interpolate, spring, staticFile, useVideoConfig } from "remotion";

export interface Take6ZomatoFomoPeakStageProps {
  localFrame: number;
}

export const Take6ZomatoFomoPeakStage: React.FC<Take6ZomatoFomoPeakStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Screen entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Top header badge appears smoothly right from scene onset
  const headerSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Listing 115 reveal on exact spoken word "115" (localFrame 237 = Abs Frame 1883)
  const listSpring = spring({
    frame: Math.max(0, localFrame - 237),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Peak 169 reveal on exact spoken word "169" (localFrame 292 = Abs Frame 1938)
  const peakSpring = spring({
    frame: Math.max(0, localFrame - 292),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Intense FOMO alert on spoken word "FOMO" (localFrame 396 = Abs Frame 2042)
  const fomoAlertSpring = spring({
    frame: Math.max(0, localFrame - 396),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Camera slow push-in for background chart
  const pushIn = interpolate(localFrame, [0, 450], [1.0, 1.03], { extrapolateRight: "clamp" });

  // =========================================================================
  // ANIMATED GRAPH LINE CALCULATION (Exact sync with speech)
  // Phase 1 (Issue ₹76 -> Listing ₹115): localFrame 140 -> 237
  // Phase 2 (Listing ₹115 -> Peak ₹169): localFrame 237 -> 292
  // =========================================================================
  const p0 = { x: 88, y: 760 };  // ₹76 Issue Base
  const p1 = { x: 88, y: 520 };  // ₹115 Listed
  const p2 = { x: 1045, y: 145 }; // ₹169 Peak

  // Normalized draw progress 0 -> 1 -> 2
  let headX = p0.x;
  let headY = p0.y;
  let currentPath = `M ${p0.x} ${p0.y}`;

  if (localFrame < 140) {
    headX = p0.x;
    headY = p0.y;
    currentPath = `M ${p0.x} ${p0.y}`;
  } else if (localFrame >= 140 && localFrame < 237) {
    const t = interpolate(localFrame, [140, 237], [0, 1], { extrapolateRight: "clamp" });
    headX = interpolate(t, [0, 1], [p0.x, p1.x]);
    headY = interpolate(t, [0, 1], [p0.y, p1.y]);
    currentPath = `M ${p0.x} ${p0.y} L ${headX} ${headY}`;
  } else if (localFrame >= 237) {
    const t = interpolate(localFrame, [237, 292], [0, 1], { extrapolateRight: "clamp" });
    headX = interpolate(t, [0, 1], [p1.x, p2.x]);
    headY = interpolate(t, [0, 1], [p1.y, p2.y]);
    currentPath = `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${headX} ${headY}`;
  }

  // Shaded area path below the line
  const areaPath = `${currentPath} L ${headX} 850 L ${p0.x} 850 Z`;

  // Beacon pulse at peak ₹169 after frame 292
  const peakPulse =
    localFrame >= 292 ? 1 + Math.sin((localFrame - 292) * 0.25) * 0.2 : 1;

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
      {/* Background TradingView Screen on Right 65% (Facecam is on Left) */}
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
        {/* Background TradingView Authentic Screenshot (1180x940 native) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${pushIn})`,
            transformOrigin: "center center",
          }}
        >
          <img
            src={staticFile("jio_assets/06_zomato_200dma_charts/01_zomato_ipo_surge_tradingview_1180x940.png")}
            alt="Zomato TradingView Chart"
            style={{ width: "100%", height: "100%", objectFit: "fill", opacity: 1.0 }}
          />
        </div>

        {/* =========================================================================
            DYNAMIC SVG ANIMATED GRAPH LINE LAYER
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
            <linearGradient id="greenAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
            <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#10B981" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Area fill under graph line */}
          {localFrame >= 140 && (
            <path d={areaPath} fill="url(#greenAreaGrad)" />
          )}

          {/* The Glowing Neon Surge Line */}
          {localFrame >= 140 && (
            <path
              d={currentPath}
              fill="none"
              stroke="#10B981"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#greenGlow)"
            />
          )}

          {/* Leading Arrow / Glowing Beacon Head */}
          {localFrame >= 140 && (
            <circle
              cx={headX}
              cy={headY}
              r="7"
              fill="#FFFFFF"
              stroke="#10B981"
              strokeWidth="3"
              filter="url(#greenGlow)"
            />
          )}

          {/* Issue Price Base Node */}
          {localFrame >= 140 && (
            <circle cx={p0.x} cy={p0.y} r="6" fill="#10B981" />
          )}
        </svg>

        {/* Top Header Badge */}
        <div style={{ position: "absolute", top: 30, left: 30, opacity: headerSpring }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(19, 23, 34, 0.9)",
              border: "1px solid rgba(239, 68, 68, 0.5)",
              borderRadius: 10,
              padding: "8px 16px",
              backdropFilter: "blur(10px)",
            }}
          >
            <span style={{ fontSize: 18 }}>🔥</span>
            <span style={{ color: "#EF4444", fontSize: 16, fontWeight: 800, letterSpacing: 1 }}>
              JULY 2021 // THE MEDIA EUPHORIA SPIKE
            </span>
          </div>
        </div>

        {/* Issue Price Pin at ₹76 */}
        {localFrame >= 140 && (
          <div
            style={{
              position: "absolute",
              top: p0.y - 45,
              left: p0.x + 20,
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#9CA3AF",
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Issue ₹76
          </div>
        )}

        {/* Listing Price Callout at ₹115 (Pops at localFrame 237 on "115") */}
        <div
          style={{
            position: "absolute",
            top: p1.y - 50,
            left: p1.x + 25,
            opacity: listSpring,
            transform: `translateY(${interpolate(listSpring, [0, 1], [15, 0])}px)`,
          }}
        >
          <div
            style={{
              background: "rgba(16, 185, 129, 0.95)",
              color: "#FFF",
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 800,
              boxShadow: "0 8px 25px rgba(16, 185, 129, 0.5)",
              border: "1px solid #FFF",
            }}
          >
            Listed @ ₹115 (+51% Pop)
          </div>
        </div>

        {/* Peak Callout at ₹169 (Pops at localFrame 292 on "169") */}
        <div
          style={{
            position: "absolute",
            top: p2.y - 45,
            left: p2.x - 220,
            opacity: peakSpring,
            transform: `scale(${interpolate(peakSpring, [0, 1], [0.8, 1.0]) * peakPulse})`,
          }}
        >
          <div
            style={{
              background: "rgba(239, 68, 68, 0.95)",
              color: "#FFF",
              padding: "10px 22px",
              borderRadius: 10,
              fontSize: 22,
              fontWeight: 900,
              boxShadow: "0 10px 35px rgba(239, 68, 68, 0.6)",
              border: "2px solid #FFF",
              textAlign: "center",
            }}
          >
            <div>Peak @ ₹169</div>
            <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9 }}>+122% Frenzy</div>
          </div>
        </div>

        {/* Retail FOMO Alert Banner (Slides in at localFrame 396 on "FOMO") */}
        <div
          style={{
            position: "absolute",
            bottom: 35,
            left: 35,
            right: 35,
            opacity: fomoAlertSpring,
            transform: `translateY(${interpolate(fomoAlertSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "2px solid #EF4444",
              borderRadius: 16,
              padding: "18px 26px",
              display: "flex",
              alignItems: "center",
              gap: 18,
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8)",
            }}
          >
            <span style={{ fontSize: 32 }}>⚠️</span>
            <div>
              <div style={{ color: "#EF4444", fontSize: 20, fontWeight: 800 }}>
                INTENSE RETAIL FOMO TRAP
              </div>
              <div style={{ color: "#E5E7EB", fontSize: 16, marginTop: 4 }}>
                Millions of retail buyers chased the euphoria at the absolute top (₹169).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
