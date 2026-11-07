import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take6ListingDayCasinoStageProps {
  localFrame: number;
}

export const Take6ListingDayCasinoStage: React.FC<Take6ListingDayCasinoStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Screen entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Zero 1: Technical History on spoken word "history" (localFrame 78 = Abs Frame 2585)
  const zero1Spring = spring({
    frame: Math.max(0, localFrame - 78),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Zero 2: Moving Averages on spoken word "averages" (localFrame 116 = Abs Frame 2623)
  const zero2Spring = spring({
    frame: Math.max(0, localFrame - 116),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Zero 3: Price Discovery on spoken word "discovery" (localFrame 162 = Abs Frame 2669)
  const zero3Spring = spring({
    frame: Math.max(0, localFrame - 162),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Clash Banner: Bankers vs Flippers on spoken word "bankers" (localFrame 293 = Abs Frame 2800)
  const clashSpring = spring({
    frame: Math.max(0, localFrame - 293),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Whales quote on spoken words "letting the great fight... whales" (localFrame 370 = Abs Frame 2877)
  const whalesSpring = spring({
    frame: Math.max(0, localFrame - 370),
    fps,
    config: { damping: 14, stiffness: 110 },
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

      {/* Main Content Area on Left 65% (Facecam is on Right) */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 80,
          width: 1120,
        }}
      >
        {/* Category Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 12,
            padding: "10px 22px",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 20 }}>🎰</span>
          <span
            style={{
              color: "#EF4444",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            DAY 1 REALITY // WHY LISTING DAY IS A GAMBLE
          </span>
        </div>

        <h2
          style={{
            color: "#F3F4F6",
            fontSize: 42,
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 28,
          }}
        >
          The "Three Zeroes" of Listing Day
        </h2>

        {/* 3 Strike-Through Pillar Cards */}
        <div style={{ display: "flex", gap: 16, marginBottom: 26 }}>
          {/* Card 1 */}
          <div
            style={{
              flex: 1,
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 18,
              padding: "22px 24px",
              textAlign: "center",
              opacity: zero1Spring,
              transform: `translateY(${interpolate(zero1Spring, [0, 1], [30, 0])}px)`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ color: "#EF4444", fontSize: 36, fontWeight: 900, marginBottom: 8 }}>
              0
            </div>
            <div style={{ color: "#F3F4F6", fontSize: 18, fontWeight: 700 }}>
              Technical History
            </div>
            <div style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>
              Zero chart candles
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              flex: 1,
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 18,
              padding: "22px 24px",
              textAlign: "center",
              opacity: zero2Spring,
              transform: `translateY(${interpolate(zero2Spring, [0, 1], [30, 0])}px)`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ color: "#EF4444", fontSize: 36, fontWeight: 900, marginBottom: 8 }}>
              0
            </div>
            <div style={{ color: "#F3F4F6", fontSize: 18, fontWeight: 700 }}>
              Moving Averages
            </div>
            <div style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>
              No 200 DMA, 50 DMA
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              flex: 1,
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 18,
              padding: "22px 24px",
              textAlign: "center",
              opacity: zero3Spring,
              transform: `translateY(${interpolate(zero3Spring, [0, 1], [30, 0])}px)`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ color: "#EF4444", fontSize: 36, fontWeight: 900, marginBottom: 8 }}>
              0
            </div>
            <div style={{ color: "#F3F4F6", fontSize: 18, fontWeight: 700 }}>
              Price Discovery
            </div>
            <div style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>
              Pure liquidity casino
            </div>
          </div>
        </div>

        {/* Clash Banner: Investment Bankers vs Short-Term Flippers */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(15, 23, 42, 0.9))",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 20,
            padding: "24px 32px",
            marginBottom: 20,
            opacity: clashSpring,
            transform: `translateX(${interpolate(clashSpring, [0, 1], [-30, 0])}px)`,
          }}
        >
          <div style={{ color: "#9CA3AF", fontSize: 15, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
            THE EMOTIONAL TUG-OF-WAR
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 28 }}>🏦</span>
              <span style={{ color: "#F3F4F6", fontSize: 20, fontWeight: 800 }}>
                Investment Bankers
              </span>
            </div>
            <div style={{ color: "#EF4444", fontSize: 22, fontWeight: 900 }}>
              ⚔️ VS ⚔️
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ color: "#F3F4F6", fontSize: 20, fontWeight: 800 }}>
                Short-Term Flippers
              </span>
              <span style={{ fontSize: 28 }}>⚡</span>
            </div>
          </div>
        </div>

        {/* Whales Quote */}
        <div
          style={{
            background: "rgba(212, 175, 55, 0.12)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            borderRadius: 14,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: whalesSpring,
          }}
        >
          <span style={{ fontSize: 24 }}>🐋</span>
          <span style={{ color: "#FACC15", fontSize: 18, fontWeight: 700 }}>
            "I am completely comfortable letting the whales fight on listing day."
          </span>
        </div>
      </div>
    </div>
  );
};
