import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene17_CompoundingFormula: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Snaps right at scene start
  const ytSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word Snap: "Your action," -> Frame 3900 (localFrame 264)
  const b1Spring = spring({
    frame: localFrame - 264,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Word Snap: "it's your discipline," -> Frame 3935 (localFrame 299)
  const b2Spring = spring({
    frame: localFrame - 299,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Word Snap: "it's your practice" -> Frame 3962 (localFrame 326)
  const b3Spring = spring({
    frame: localFrame - 326,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const opacity = interpolate(localFrame, [350, 364], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isThreePillarsPhase = localFrame >= 240;

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
        gap: 22,
      }}
    >
      {!isThreePillarsPhase ? (
        // Phase 1: The YouTube Knowledge Paradox (Frames 3636 - 3876)
        <div
          style={{
            transform: `scale(${ytSpring})`,
            opacity: ytSpring,
            background: "rgba(17, 24, 39, 0.95)",
            border: `2.5px solid ${theme.colors.crimson}`,
            borderRadius: 32,
            padding: "52px 60px",
            boxShadow: theme.shadows.glowBox(theme.colors.crimsonGlow),
          }}
        >
          <div
            style={{
              color: theme.colors.crimson,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            THE RETAIL PARADOX
          </div>
          <h2
            style={{
              margin: "0 0 18px 0",
              fontSize: 54,
              fontWeight: 900,
              color: "#FFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Knowledge Is Everywhere.
            <br />
            Yet Most Lose Money.
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 26,
              color: theme.colors.textSecondary,
              lineHeight: 1.45,
              fontWeight: 600,
            }}
          >
            Thousands of free financial videos sit on YouTube. But knowledge
            alone is not enough—
            <span style={{ color: theme.colors.goldNeon, fontWeight: 900 }}>
              execution builds wealth
            </span>
            .
          </p>
        </div>
      ) : (
        // Phase 2: The 3 Execution Pillars (Snapping to action @ 3900, discipline @ 3935, practice @ 3962)
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: theme.colors.goldNeon,
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            THE 3 PILLARS OF WEALTH CREATION
          </div>
          <h2
            style={{
              margin: "0 0 10px 0",
              fontSize: 52,
              fontWeight: 900,
              color: "#FFF",
              letterSpacing: "-0.02em",
            }}
          >
            What Actually Builds Wealth
          </h2>

          {/* Pillar 1: Action (Snaps @ Frame 3900 "action") */}
          <div
            style={{
              transform: `translateX(${(1 - b1Spring) * -30}px)`,
              opacity: b1Spring,
              background: "rgba(17, 24, 39, 0.95)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 24,
              padding: "24px 36px",
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <span style={{ fontSize: 38 }}>⚡</span>
            <div>
              <div style={{ color: "#FFF", fontSize: 28, fontWeight: 900 }}>
                1. Decisive Action
              </div>
              <div style={{ color: theme.colors.textSecondary, fontSize: 20, fontWeight: 600, marginTop: 4 }}>
                Translating research into calculated portfolio execution.
              </div>
            </div>
          </div>

          {/* Pillar 2: Discipline (Snaps @ Frame 3935 "discipline") */}
          <div
            style={{
              transform: `translateX(${(1 - b2Spring) * -30}px)`,
              opacity: b2Spring,
              background: "rgba(17, 24, 39, 0.95)",
              border: `2px solid ${theme.colors.goldPrimary}`,
              borderRadius: 24,
              padding: "24px 36px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              boxShadow: theme.shadows.goldCard,
            }}
          >
            <span style={{ fontSize: 38 }}>🎯</span>
            <div>
              <div style={{ color: "#FFF", fontSize: 28, fontWeight: 900 }}>
                2. Emotional Discipline
              </div>
              <div style={{ color: theme.colors.textSecondary, fontSize: 20, fontWeight: 600, marginTop: 4 }}>
                Holding high-conviction assets through cycle volatility.
              </div>
            </div>
          </div>

          {/* Pillar 3: Practice (Snaps @ Frame 3962 "practice") */}
          <div
            style={{
              transform: `translateX(${(1 - b3Spring) * -30}px)`,
              opacity: b3Spring,
              background: "rgba(17, 24, 39, 0.95)",
              border: `2px solid ${theme.colors.emeraldNeon}`,
              borderRadius: 24,
              padding: "24px 36px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              boxShadow: theme.shadows.glowBox(theme.colors.emeraldGlow),
            }}
          >
            <span style={{ fontSize: 38 }}>🔁</span>
            <div>
              <div style={{ color: "#FFF", fontSize: 28, fontWeight: 900 }}>
                3. Continuous Practice
              </div>
              <div style={{ color: theme.colors.textSecondary, fontSize: 20, fontWeight: 600, marginTop: 4 }}>
                Reviewing every week with the Happy Investing community.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
