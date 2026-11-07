import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene07_PillarPsychology: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // localFrame 0 is global Frame 1320

  // Card reveals as section begins
  const cardSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word Snap: "interact with me live" -> Frame 1338-1363 (localFrame 18)
  const bullet1Spring = spring({
    frame: localFrame - 18,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // Word Snap: "market psychology" -> Frame 1441-1462 (localFrame 121)
  const bullet2Spring = spring({
    frame: localFrame - 121,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // Fade out starts at localFrame 180 (Frame 1500), ends at localFrame 195 (Frame 1515)
  // Ensures bullet 2 stays visible for ~60 frames (2 seconds)
  const opacity = interpolate(localFrame, [180, 195], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 90,
        width: 1040,
        height: 900,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          transform: `translateY(${(1 - cardSpring) * 30}px)`,
          opacity: cardSpring,
          background: "rgba(17, 24, 39, 0.95)",
          border: `2.5px solid ${theme.colors.crimson}`,
          borderRadius: 32,
          padding: "48px 56px",
          boxShadow: theme.shadows.glowBox(theme.colors.crimsonGlow),
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 20,
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              border: `1.5px solid ${theme.colors.crimson}`,
              color: "#FFAAA8",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            PILLAR 01 • INVESTOR PSYCHOLOGY
          </div>
          <div style={{ color: theme.colors.crimson, fontSize: 24, fontWeight: 900 }}>
            CRITICAL FOUNDATION
          </div>
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 48,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Why Smart Investors Fail In Euphoria
        </h2>

        {/* Bullet 1: Live Interactive (Snaps @ Frame 1338) */}
        <div
          style={{
            transform: `translateX(${(1 - bullet1Spring) * -30}px)`,
            opacity: bullet1Spring,
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            background: "rgba(255, 255, 255, 0.04)",
            padding: "20px 24px",
            borderRadius: 20,
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span style={{ fontSize: 32 }}>💬</span>
          <div>
            <div style={{ color: "#FFF", fontSize: 26, fontWeight: 800 }}>
              Direct Live Interaction
            </div>
            <div style={{ color: theme.colors.textSecondary, fontSize: 20, fontWeight: 600, marginTop: 4 }}>
              Engage directly in real-time — not a passive recorded video.
            </div>
          </div>
        </div>

        {/* Bullet 2: Market Psychology Audit (Snaps @ Frame 1441) */}
        <div
          style={{
            transform: `translateX(${(1 - bullet2Spring) * -30}px)`,
            opacity: bullet2Spring,
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            background: "rgba(239, 68, 68, 0.12)",
            padding: "20px 24px",
            borderRadius: 20,
            border: `1.5px solid ${theme.colors.crimson}`,
          }}
        >
          <span style={{ fontSize: 32 }}>⚡</span>
          <div>
            <div style={{ color: "#FFF", fontSize: 26, fontWeight: 800 }}>
              The Cognitive Traps That Drain Portfolios
            </div>
            <div style={{ color: theme.colors.textSecondary, fontSize: 20, fontWeight: 600, marginTop: 4 }}>
              Learn why emotional chasing destroys compounding faster than bad stock picks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
