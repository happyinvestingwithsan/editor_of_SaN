import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene09_CommunityEthos: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // localFrame 0 is global Frame 1720

  // Header springs in
  const headerSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word Snap: "Happy investing community" -> Frame 1762 (localFrame 42)
  const card1Spring = spring({
    frame: localFrame - 42,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // Word Snap: "There will be no push" -> Frame 1874-1885 (localFrame 154)
  const card2Spring = spring({
    frame: localFrame - 154,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Fade out starts at localFrame 180 (Frame 1900), ends at localFrame 194 (Frame 1914)
  const opacity = interpolate(localFrame, [180, 194], [1, 0], {
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
        gap: 28,
      }}
    >
      {/* Header (Mobile Optimized) */}
      <div
        style={{
          transform: `translateY(${(1 - headerSpring) * -20}px)`,
          opacity: headerSpring,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: 20,
            background: "rgba(245, 158, 11, 0.18)",
            border: `1.5px solid ${theme.colors.goldPrimary}`,
            color: theme.colors.goldNeon,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          COMMUNITY ETHOS
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 54,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          No Push. No Tips. Pure Value.
        </h1>
      </div>

      {/* Card 1: Happy Investing Community Philosophy */}
      <div
        style={{
          transform: `translateX(${(1 - card1Spring) * -40}px)`,
          opacity: card1Spring,
          background: "rgba(17, 24, 39, 0.95)",
          backdropFilter: "blur(16px)",
          border: `2.5px solid ${theme.colors.emeraldNeon}`,
          borderRadius: 28,
          padding: "32px 42px",
          display: "flex",
          alignItems: "center",
          gap: 28,
          boxShadow: theme.shadows.glowBox(theme.colors.emeraldGlow),
        }}
      >
        <span style={{ fontSize: 48, flexShrink: 0 }}>🛡️</span>
        <div>
          <div
            style={{
              color: "#FFF",
              fontSize: 34,
              fontWeight: 900,
              lineHeight: 1.2,
            }}
          >
            100% Unbiased Financial Education
          </div>
          <div
            style={{
              color: theme.colors.textSecondary,
              fontSize: 24,
              fontWeight: 600,
              marginTop: 6,
            }}
          >
            Empowering retail investors to audit balance sheets and buy at fair value.
          </div>
        </div>
      </div>

      {/* Card 2: Zero Sales Push / Zero Tips (Snaps @ Frame 1874-1885 on "no push") */}
      <div
        style={{
          transform: `translateX(${(1 - card2Spring) * -40}px)`,
          opacity: card2Spring,
          background: "rgba(17, 24, 39, 0.95)",
          backdropFilter: "blur(16px)",
          border: `2.5px solid ${theme.colors.crimson}`,
          borderRadius: 28,
          padding: "32px 42px",
          display: "flex",
          alignItems: "center",
          gap: 28,
          boxShadow: theme.shadows.glowBox(theme.colors.crimsonGlow),
        }}
      >
        <span style={{ fontSize: 48, flexShrink: 0 }}>🚫</span>
        <div>
          <div
            style={{
              color: "#FFF",
              fontSize: 34,
              fontWeight: 900,
              lineHeight: 1.2,
            }}
          >
            Zero Sales Push • Zero Stock Tips
          </div>
          <div
            style={{
              color: theme.colors.textSecondary,
              fontSize: 24,
              fontWeight: 600,
              marginTop: 6,
            }}
          >
            No high-pressure sales calls, no paid signals, no speculative hype.
          </div>
        </div>
      </div>
    </div>
  );
};
