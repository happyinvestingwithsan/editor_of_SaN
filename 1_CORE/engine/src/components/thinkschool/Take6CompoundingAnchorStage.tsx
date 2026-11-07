import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take6CompoundingAnchorStageProps {
  localFrame: number;
}

export const Take6CompoundingAnchorStage: React.FC<Take6CompoundingAnchorStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Screen entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Card 1 entrance on the word "quota" (localFrame 160 = Abs Frame 881)
  const card1Spring = spring({
    frame: Math.max(0, localFrame - 160),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Card 2 entrance on the word "anchor compounding" (localFrame 276 = Abs Frame 997)
  const card2Spring = spring({
    frame: Math.max(0, localFrame - 276),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Stamp / Rational Choice pill on the word "rational choice" (localFrame 357 = Abs Frame 1078)
  const rationalPillSpring = spring({
    frame: Math.max(0, localFrame - 357),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

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
      {/* Background Subtle Tech Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* Main Content Area on Right 65% (Facecam is on Left) */}
      <div
        style={{
          position: "absolute",
          left: 720,
          top: 90,
          width: 1120,
        }}
      >
        {/* Category Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            borderRadius: 12,
            padding: "10px 22px",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 20 }}>🌿</span>
          <span
            style={{
              color: "#10B981",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            INVESTOR STRATEGY // PATHWAY A
          </span>
        </div>

        <h2
          style={{
            color: "#F3F4F6",
            fontSize: 42,
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 32,
          }}
        >
          The 5 to 10 Year Anchor Compounding Asset
        </h2>

        {/* Card 1: Allotment & Shareholder Quota */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 20,
            padding: "26px 32px",
            marginBottom: 22,
            opacity: card1Spring,
            transform: `translateX(${interpolate(card1Spring, [0, 1], [40, 0])}px)`,
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                🎟️
              </div>
              <div>
                <div style={{ color: "#F3F4F6", fontSize: 24, fontWeight: 700 }}>
                  Regular & RIL Shareholder Quota
                </div>
                <div style={{ color: "#9CA3AF", fontSize: 17, marginTop: 4 }}>
                  Eligible RIL shareholders apply under dedicated 10% carved-out quota
                </div>
              </div>
            </div>
            <div
              style={{
                color: "#60A5FA",
                background: "rgba(59, 130, 246, 0.12)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                padding: "8px 16px",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              ALLOTMENT EDGE
            </div>
          </div>
        </div>

        {/* Card 2: 5 to 10 Year Compounding Horizon */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 20,
            padding: "26px 32px",
            marginBottom: 26,
            opacity: card2Spring,
            transform: `translateX(${interpolate(card2Spring, [0, 1], [40, 0])}px)`,
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                📈
              </div>
              <div>
                <div style={{ color: "#F3F4F6", fontSize: 24, fontWeight: 700 }}>
                  Horizon: 5 to 10 Years
                </div>
                <div style={{ color: "#9CA3AF", fontSize: 17, marginTop: 4 }}>
                  Hold as core blue-chip bedrock asset; ignore short-term listing noise
                </div>
              </div>
            </div>
            <div
              style={{
                color: "#10B981",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                padding: "8px 16px",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              COMPOUNDER
            </div>
          </div>
        </div>

        {/* Verdict Badge: Entirely a Rational Choice */}
        <div
          style={{
            background: "linear-gradient(90deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))",
            border: "2px solid rgba(16, 185, 129, 0.6)",
            borderRadius: 18,
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: rationalPillSpring,
            transform: `scale(${interpolate(rationalPillSpring, [0, 1], [0.95, 1.0])})`,
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)",
          }}
        >
          <span style={{ fontSize: 32 }}>✅</span>
          <div>
            <div style={{ color: "#10B981", fontSize: 22, fontWeight: 800 }}>
              VERDICT FOR LONG-TERM ALLOTTEES:
            </div>
            <div style={{ color: "#F3F4F6", fontSize: 18, marginTop: 4 }}>
              "Holding Jio for 5 to 10 years as an anchor compounding asset is an entirely rational choice."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
