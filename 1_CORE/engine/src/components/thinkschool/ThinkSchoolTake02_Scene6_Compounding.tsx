import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface ThinkSchoolTake02_Scene6_CompoundingProps {
  localFrame: number;
}

/**
 * Chunk 7: Whale Insight & The Long-Term Compounding Curve
 * Left 68% Stage (x=60, w=1200) with SaN in Right 32% Tall Frame (x=1300).
 * Relative Frames: 0 to 400 (Master Frames 2684 to 3084 | 89.48s to 102.80s).
 */
export const ThinkSchoolTake02_Scene6_Compounding: React.FC<
  ThinkSchoolTake02_Scene6_CompoundingProps
> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Header entrance
  const headerSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word-synced: Local Frame 38 (Master Frame 2722: "refuse to cash out")
  const insightSpring = spring({
    frame: Math.max(0, localFrame - 30),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Word-synced: Local Frame 314 (Master Frame 2998: "compounding growth is just about to begin")
  const curveDraw = interpolate(localFrame, [280, 390], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const curveBadgeSpring = spring({
    frame: Math.max(0, localFrame - 320),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 50,
        width: 1200,
        height: 980,
        backgroundColor: "rgba(11, 15, 23, 0.95)",
        borderRadius: 24,
        border: "1.5px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Blueprint Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 50,
          right: 50,
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "5px 12px",
            borderRadius: 6,
            background: "rgba(212, 175, 55, 0.15)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            color: "#D4AF37",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}
        >
          THE "SMART MONEY" TRAIL
        </div>
        <h1
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          When Global Monopolies Refuse to Cash Out...
        </h1>
      </div>

      {/* Insight Card (Frame 38) */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 50,
          right: 50,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "2px solid rgba(212, 175, 55, 0.6)",
          borderRadius: 20,
          padding: 26,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          opacity: insightSpring,
          transform: `translateY(${interpolate(insightSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 36 }}>💡</span>
          <div>
            <div style={{ color: "#D4AF37", fontWeight: 800, fontSize: 13, letterSpacing: "0.1em" }}>
              DEEPEST VISIBILITY INTO THE BALANCE SHEET
            </div>
            <div style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 24, marginTop: 4 }}>
              Inside Information vs Retail Speculation
            </div>
          </div>
        </div>

        <p style={{ color: "#CBD5E1", fontSize: 16, marginTop: 14, lineHeight: 1.5 }}>
          Venture capitalists cash out when a company hits peak private valuation before reality hits the public market. But when Meta and Google hold 100% of their equity across 6 years, it proves they see decades of compounding ahead.
        </p>
      </div>

      {/* Golden Compounding Curve SVG (Word-Synced at Frame 314) */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 50,
          right: 50,
          height: 380,
          backgroundColor: "rgba(15, 23, 42, 0.7)",
          border: "1.5px solid rgba(16, 185, 129, 0.3)",
          borderRadius: 20,
          padding: 24,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#10B981", fontSize: 12, fontWeight: 800 }}>INFLECTION POINT</div>
            <div style={{ color: "#FFF", fontSize: 22, fontWeight: 900 }}>Long-Term Compound Growth</div>
          </div>
          <div
            style={{
              backgroundColor: "#10B981",
              color: "#000",
              fontWeight: 900,
              fontSize: 13,
              padding: "4px 12px",
              borderRadius: 6,
              opacity: curveBadgeSpring,
              transform: `scale(${curveBadgeSpring})`,
            }}
          >
            JUST ABOUT TO BEGIN
          </div>
        </div>

        {/* Exponential Curve */}
        <svg
          style={{
            position: "absolute",
            left: 30,
            bottom: 20,
            width: 1040,
            height: 280,
          }}
        >
          <defs>
            <linearGradient id="goldCompGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="60%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
          <path
            d="M 20 250 Q 500 240, 750 140 T 1000 30"
            fill="none"
            stroke="url(#goldCompGrad)"
            strokeWidth="5"
            strokeDasharray="1100"
            strokeDashoffset={`${1100 - (1100 * curveDraw) / 100}`}
          />
        </svg>
      </div>
    </div>
  );
};
