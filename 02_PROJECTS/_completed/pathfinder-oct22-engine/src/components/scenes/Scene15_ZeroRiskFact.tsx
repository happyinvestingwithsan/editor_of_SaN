import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene15_ZeroRiskFact: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Word Snap: "no cost to explore" -> Frame 3031-3037 (localFrame 26)
  const aSpring = spring({
    frame: localFrame - 26,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word Snap: "all the facts presented" -> Frame 3182-3187 (localFrame 177)
  const bSpring = spring({
    frame: localFrame - 177,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const opacity = interpolate(localFrame, [285, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 100,
        width: 1040,
        height: 880,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 28,
      }}
    >
      {/* Card 1: Zero Cost to Explore (Snaps @ Frame 3031) */}
      <div
        style={{
          transform: `translateY(${(1 - aSpring) * 30}px)`,
          opacity: aSpring,
          background: "rgba(17, 24, 39, 0.95)",
          border: `2.5px solid ${theme.colors.emeraldNeon}`,
          borderRadius: 28,
          padding: "36px 48px",
          boxShadow: theme.shadows.glowBox(theme.colors.emeraldGlow),
        }}
      >
        <div
          style={{
            color: theme.colors.emeraldNeon,
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          ZERO RISK EXPLORATION
        </div>
        <h2
          style={{
            margin: "0 0 12px 0",
            fontSize: 48,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: "-0.02em",
          }}
        >
          No Cost to Explore The Truth
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 24,
            color: theme.colors.textSecondary,
            lineHeight: 1.4,
            fontWeight: 600,
          }}
        >
          Everything shared in the masterclass is grounded in audited balance
          sheets and real regulatory data. Zero speculation.
        </p>
      </div>

      {/* Card 2: Inspect All Facts (Snaps @ Frame 3182) */}
      <div
        style={{
          transform: `translateY(${(1 - bSpring) * 30}px)`,
          opacity: bSpring,
          background: "rgba(17, 24, 39, 0.95)",
          border: `2.5px solid ${theme.colors.goldPrimary}`,
          borderRadius: 28,
          padding: "36px 48px",
          boxShadow: theme.shadows.goldCard,
        }}
      >
        <div
          style={{
            color: theme.colors.goldNeon,
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          INDEPENDENT DECISION
        </div>
        <h2
          style={{
            margin: "0 0 12px 0",
            fontSize: 48,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: "-0.02em",
          }}
        >
          Inspect The Facts. You Decide.
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 24,
            color: theme.colors.textSecondary,
            lineHeight: 1.4,
            fontWeight: 600,
          }}
        >
          Take all the frameworks presented in the session. You decide whether
          this path of disciplined investing fits your life.
        </p>
      </div>
    </div>
  );
};
