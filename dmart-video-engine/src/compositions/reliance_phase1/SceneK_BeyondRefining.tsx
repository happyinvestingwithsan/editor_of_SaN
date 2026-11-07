import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneKProps {
  relativeFrame: number; // 0 to 392 (absolute: 4588 to 4980)
}

export const SceneK_BeyondRefining: React.FC<SceneKProps> = ({ relativeFrame }) => {
  // Revealed at relative f40 (approx 1.3s after "Why?" pause)
  if (relativeFrame < 30) return null;

  const enterSpring = spring({
    frame: relativeFrame - 30,
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // Exit smoothly before Scene L
  const exitOpacity = interpolate(relativeFrame, [330, 380], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const scale = interpolate(enterSpring, [0, 1], [0.94, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  return (
    <div
      style={{
        position: "absolute",
        top: RELIANCE_THEME.layout.containerTop,
        left: RELIANCE_THEME.layout.leftContentLeft, // SaN on Right, Content on Left
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
          backgroundColor: RELIANCE_THEME.colors.tealSoftBg,
          border: `1.5px solid ${RELIANCE_THEME.colors.cardBorderStrong}`,
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
          INSTITUTIONAL EXPECTATION
        </span>
      </div>

      {/* Main Headline */}
      <div
        style={{
          fontSize: RELIANCE_THEME.typography.mainHeadline,
          fontWeight: 900,
          color: RELIANCE_THEME.colors.darkText,
          lineHeight: 1.15,
          marginBottom: 44,
          letterSpacing: "-0.03em",
        }}
      >
        THE MARKET WANTED MORE THAN O2C GROWTH
      </div>

      {/* 3 Portfolio Pillars Scrutinized */}
      <div style={{ display: "flex", gap: 24, marginBottom: 36 }}>
        <div
          style={{
            flex: 1,
            backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
            borderRadius: 16,
            border: `1.5px solid ${RELIANCE_THEME.colors.cardBorder}`,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 900, color: RELIANCE_THEME.colors.primaryTeal }}>RETAIL</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_THEME.colors.secondaryText }}>
            Consumption Margins
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
            borderRadius: 16,
            border: `1.5px solid ${RELIANCE_THEME.colors.cardBorder}`,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 900, color: RELIANCE_THEME.colors.primaryTeal }}>JIO TELECOM</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_THEME.colors.secondaryText }}>
            ARPU & 5G Monetization
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
            borderRadius: 16,
            border: `1.5px solid ${RELIANCE_THEME.colors.cardBorder}`,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 900, color: RELIANCE_THEME.colors.primaryTeal }}>NEW ENERGY</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_THEME.colors.secondaryText }}>
            Capex Return Timeline
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: RELIANCE_THEME.typography.supportingText,
          fontWeight: 600,
          color: RELIANCE_THEME.colors.secondaryText,
          lineHeight: 1.35,
        }}
      >
        Would earnings prove strength across the entire conglomerate?
      </div>
    </div>
  );
};
