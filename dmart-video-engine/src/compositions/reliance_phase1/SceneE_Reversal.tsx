import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneEProps {
  relativeFrame: number; // 0 to 318 (absolute: 1790 to 2108)
}

export const SceneE_Reversal: React.FC<SceneEProps> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame - 15,
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  const highlightSpring = spring({
    frame: Math.max(0, relativeFrame - 80), // Highlight O2C when spoken
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const scale = interpolate(enterSpring, [0, 1], [0.94, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: RELIANCE_THEME.layout.containerTop,
        left: RELIANCE_THEME.layout.rightContentLeft,
        width: RELIANCE_THEME.layout.cardWidth,
        height: RELIANCE_THEME.layout.cardHeight,
        backgroundColor: RELIANCE_THEME.colors.cardBackground,
        borderRadius: RELIANCE_THEME.layout.borderRadius,
        border: `2px solid ${RELIANCE_THEME.colors.cardBorder}`,
        boxShadow: RELIANCE_THEME.shadows.elevated,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 70px",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        zIndex: 50,
        boxSizing: "border-box",
      }}
    >
      {/* Category Eyebrow */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: RELIANCE_THEME.colors.positiveBg,
          border: `1.5px solid ${RELIANCE_THEME.colors.positiveBorder}`,
          borderRadius: 8,
          padding: "6px 18px",
          width: "fit-content",
          marginBottom: 24,
        }}
      >
        <span
          style={{
            color: RELIANCE_THEME.colors.deepTeal,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          THE STRUCTURAL PIVOT
        </span>
      </div>

      {/* Main Opposing Headings */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: RELIANCE_THEME.colors.secondaryText,
            letterSpacing: "-0.02em",
          }}
        >
          SAME GLOBAL DISRUPTION
        </div>
        <div
          style={{
            fontSize: RELIANCE_THEME.typography.mainHeadline,
            fontWeight: 900,
            color: RELIANCE_THEME.colors.darkText,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          DIFFERENT OUTCOME
        </div>
      </div>

      {/* O2C Highlight Box */}
      <div
        style={{
          backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
          border: `2.5px solid ${RELIANCE_THEME.colors.primaryTeal}`,
          borderRadius: 20,
          padding: "36px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: RELIANCE_THEME.shadows.card,
          transform: `scale(${interpolate(highlightSpring, [0, 1], [0.96, 1])})`,
          opacity: interpolate(highlightSpring, [0, 1], [0.6, 1]),
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: RELIANCE_THEME.colors.deepTeal,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            CORE VALUE ENGINE
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.darkText,
              letterSpacing: "-0.02em",
            }}
          >
            O2C — OIL TO CHEMICALS
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, color: RELIANCE_THEME.colors.secondaryText }}>
            Refining Margins Expanded Across Jamnagar Super-Complex
          </div>
        </div>

        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            backgroundColor: RELIANCE_THEME.colors.primaryTeal,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: RELIANCE_THEME.colors.whiteText,
            flexShrink: 0,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};
