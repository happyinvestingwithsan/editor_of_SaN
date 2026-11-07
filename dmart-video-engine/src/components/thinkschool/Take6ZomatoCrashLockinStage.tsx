import React from "react";
import { interpolate, spring, staticFile, useVideoConfig } from "remotion";

export interface Take6ZomatoCrashLockinStageProps {
  localFrame: number;
}

export const Take6ZomatoCrashLockinStage: React.FC<Take6ZomatoCrashLockinStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Screen entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Pre-IPO Lock-in badge on spoken word "anchor Lock-in" (localFrame 67 = Abs Frame 2164)
  const lockinSpring = spring({
    frame: Math.max(0, localFrame - 67),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Crash -76% badge on spoken word "crashed 76%" (localFrame 154 = Abs Frame 2251)
  const crashSpring = spring({
    frame: Math.max(0, localFrame - 154),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Devastating low ₹40 on spoken word "40 rupees" (localFrame 265 = Abs Frame 2362)
  const low40Spring = spring({
    frame: Math.max(0, localFrame - 265),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Sheer panic banner on spoken word "panic" (localFrame 395 = Abs Frame 2492)
  const panicSpring = spring({
    frame: Math.max(0, localFrame - 395),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // =========================================================================
  // ANIMATED CASCADING CRASH GRAPH LINE
  // Plunges from (100, 140) [₹169] -> (920, 550) [Lock-in] -> (1680, 885) [₹40]
  // Phase 1 (Peak to Lock-in): localFrame 30 -> 154
  // Phase 2 (Lock-in to Low ₹40): localFrame 154 -> 265
  // =========================================================================
  const c0 = { x: 100, y: 140 };   // ₹169 Peak
  const c1 = { x: 920, y: 550 };   // Lock-in break
  const c2 = { x: 1680, y: 885 };  // ₹40 Low

  let crashHeadX = c0.x;
  let crashHeadY = c0.y;
  let crashPath = `M ${c0.x} ${c0.y}`;

  if (localFrame < 30) {
    crashHeadX = c0.x;
    crashHeadY = c0.y;
    crashPath = `M ${c0.x} ${c0.y}`;
  } else if (localFrame >= 30 && localFrame < 154) {
    const t = interpolate(localFrame, [30, 154], [0, 1], { extrapolateRight: "clamp" });
    crashHeadX = interpolate(t, [0, 1], [c0.x, c1.x]);
    crashHeadY = interpolate(t, [0, 1], [c0.y, c1.y]);
    crashPath = `M ${c0.x} ${c0.y} L ${crashHeadX} ${crashHeadY}`;
  } else if (localFrame >= 154) {
    const t = interpolate(localFrame, [154, 265], [0, 1], { extrapolateRight: "clamp" });
    crashHeadX = interpolate(t, [0, 1], [c1.x, c2.x]);
    crashHeadY = interpolate(t, [0, 1], [c1.y, c2.y]);
    crashPath = `M ${c0.x} ${c0.y} L ${c1.x} ${c1.y} L ${crashHeadX} ${crashHeadY}`;
  }

  // Shaded red danger area under crash line
  const crashAreaPath = `${crashPath} L ${crashHeadX} 980 L ${c0.x} 980 Z`;

  // Camera slow cinematic push-in
  const pushIn = interpolate(localFrame, [0, 410], [1.0, 1.03], { extrapolateRight: "clamp" });

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
      {/* Full Canvas TradingView Chart Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${pushIn})`,
          transformOrigin: "center center",
        }}
      >
        <img
          src={staticFile("jio_assets/06_zomato_200dma_charts/02_zomato_crash_lockin_tradingview_1920x1080.png")}
          alt="Zomato Crash Chart"
          style={{ width: "100%", height: "100%", objectFit: "fill", opacity: 1.0 }}
        />
      </div>

      {/* Subtle Focus Vignette (Keeps Axes & Toolbar 100% Legible) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(7, 11, 18, 0.25) 0%, rgba(7, 11, 18, 0.0) 25%, rgba(7, 11, 18, 0.0) 75%, rgba(7, 11, 18, 0.35) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* =========================================================================
          DYNAMIC SVG ANIMATED CASCADING CRASH GRAPH LINE
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
          <linearGradient id="redCrashArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
          </linearGradient>
          <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#EF4444" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Shaded Red Plunge Area */}
        {localFrame >= 30 && (
          <path d={crashAreaPath} fill="url(#redCrashArea)" />
        )}

        {/* Vertical Dashed Lock-In Marker Line */}
        {localFrame >= 67 && (
          <line
            x1={c1.x}
            y1={120}
            x2={c1.x}
            y2={850}
            stroke="#FACC15"
            strokeWidth="2"
            strokeDasharray="6 6"
            opacity={0.8}
          />
        )}

        {/* The Violent Plunge Curve */}
        {localFrame >= 30 && (
          <path
            d={crashPath}
            fill="none"
            stroke="#EF4444"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#redGlow)"
          />
        )}

        {/* Leading Red Crash Head */}
        {localFrame >= 30 && (
          <circle
            cx={crashHeadX}
            cy={crashHeadY}
            r="8"
            fill="#FFFFFF"
            stroke="#EF4444"
            strokeWidth="4"
            filter="url(#redGlow)"
          />
        )}

        {/* Origin Peak Point */}
        {localFrame >= 30 && (
          <circle cx={c0.x} cy={c0.y} r="6" fill="#EF4444" />
        )}
      </svg>

      {/* TOP HEADER: Pre-IPO Lock-in Expiry Alert (Pops at localFrame 67 on "anchor Lock-in") */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          opacity: lockinSpring,
          transform: `translateY(${interpolate(lockinSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(250, 204, 21, 0.6)",
            borderRadius: 14,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FACC15",
              boxShadow: "0 0 10px #FACC15",
            }}
          />
          <span style={{ color: "#F3F4F6", fontSize: 20, fontWeight: 800 }}>
            CATALYST: PRE-IPO ANCHOR LOCK-IN EXPIRY (12 MONTHS)
          </span>
        </div>
      </div>

      {/* GIANT CENTER -76% DRAWDOWN BADGE (Pops at localFrame 154 on "crashed 76%") */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 450,
          opacity: crashSpring,
          transform: `scale(${interpolate(crashSpring, [0, 1], [0.8, 1.0])})`,
        }}
      >
        <div
          style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "3px solid #EF4444",
            borderRadius: 24,
            padding: "24px 44px",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(239, 68, 68, 0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              color: "#FCA5A5",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            VIOLENT CRASH FROM ₹169 TOP
          </div>
          <div
            style={{
              color: "#EF4444",
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: 2,
              textShadow: "0 0 40px rgba(239, 68, 68, 0.7)",
              lineHeight: 1.1,
            }}
          >
            -76%
          </div>
        </div>
      </div>

      {/* BOTTOM FLOOR: Devastating Low ₹40 (Pops at localFrame 265 on "40 rupees") */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 120,
          opacity: low40Spring,
          transform: `translateY(${interpolate(low40Spring, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #EF4444",
            borderRadius: 16,
            padding: "16px 28px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 10px 40px rgba(0,0,0,0.7)",
          }}
        >
          <span style={{ fontSize: 28 }}>📉</span>
          <div>
            <div style={{ color: "#EF4444", fontSize: 24, fontWeight: 900 }}>
              DEVASTATING LOW: ₹40
            </div>
            <div style={{ color: "#9CA3AF", fontSize: 16 }}>
              Down from ₹169 peak in just 12 months
            </div>
          </div>
        </div>
      </div>

      {/* SHEER PANIC BANNER (Pops at localFrame 395 on "panic") */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 120,
          width: 800,
          opacity: panicSpring,
          transform: `translateY(${interpolate(panicSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.5)",
            borderRadius: 12,
            padding: "14px 22px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 20 }}>😱</span>
          <span style={{ color: "#FCA5A5", fontSize: 17, fontWeight: 700 }}>
            "Investors who bought the hype spent a full year in sheer panic."
          </span>
        </div>
      </div>
    </div>
  );
};
