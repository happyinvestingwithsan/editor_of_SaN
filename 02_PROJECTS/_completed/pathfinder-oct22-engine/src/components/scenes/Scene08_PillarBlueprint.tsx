import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene08_PillarBlueprint: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // localFrame 0 is global Frame 1515

  // Snaps as scene starts
  const cardSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word Snap: "wealth-building journey" -> Frame 1588-1602 (localFrame 73)
  const bullet1Spring = spring({
    frame: localFrame - 73,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // Word Snap: "cover from top to bottom" -> Frame 1633-1676 (localFrame 118)
  const bullet2Spring = spring({
    frame: localFrame - 118,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // Fade out starts at localFrame 190 (Frame 1705), ends at localFrame 205 (Frame 1720)
  // Ensures bullet 2 stays visible for ~72 frames (2.4 seconds)
  const opacity = interpolate(localFrame, [190, 205], [1, 0], {
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
          border: `2.5px solid ${theme.colors.emeraldNeon}`,
          borderRadius: 32,
          padding: "48px 56px",
          boxShadow: theme.shadows.glowBox(theme.colors.emeraldGlow),
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
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: `1.5px solid ${theme.colors.emeraldNeon}`,
              color: theme.colors.emeraldNeon,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            PILLAR 02 • WEALTH BLUEPRINT
          </div>
          <div style={{ color: theme.colors.emeraldNeon, fontSize: 24, fontWeight: 900 }}>
            COMPLETE SYSTEM
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
          Institutional Portfolio Framework
        </h2>

        {/* Bullet 1: Wealth-Building Journey (Snaps @ Frame 1588) */}
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
          <span style={{ fontSize: 32 }}>📈</span>
          <div>
            <div style={{ color: "#FFF", fontSize: 26, fontWeight: 800 }}>
              The Long-Term Wealth Journey
            </div>
            <div style={{ color: theme.colors.textSecondary, fontSize: 20, fontWeight: 600, marginTop: 4 }}>
              How to transition from random stock trading to compounding generational wealth.
            </div>
          </div>
        </div>

        {/* Bullet 2: Top to Bottom Coverage (Snaps @ Frame 1633) */}
        <div
          style={{
            transform: `translateX(${(1 - bullet2Spring) * -30}px)`,
            opacity: bullet2Spring,
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            background: "rgba(16, 185, 129, 0.12)",
            padding: "20px 24px",
            borderRadius: 20,
            border: `1.5px solid ${theme.colors.emeraldNeon}`,
          }}
        >
          <span style={{ fontSize: 32 }}>🔬</span>
          <div>
            <div style={{ color: "#FFF", fontSize: 26, fontWeight: 800 }}>
              Top-To-Bottom Auditing Checklist
            </div>
            <div style={{ color: theme.colors.textSecondary, fontSize: 20, fontWeight: 600, marginTop: 4 }}>
              Audited ROE, Free Cash Flow conversion, Capex cycles, and Debt covenants.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
