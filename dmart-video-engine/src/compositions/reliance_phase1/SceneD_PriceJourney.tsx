import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneDProps {
  relativeFrame: number; // 0 to 204 (absolute: 1586 to 1790)
}

export const SceneD_PriceJourney: React.FC<SceneDProps> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame - 15,
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  const pathProgress = spring({
    frame: Math.max(0, relativeFrame - 35),
    fps: 30,
    config: { damping: 20, stiffness: 70 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const scale = interpolate(enterSpring, [0, 1], [0.94, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: RELIANCE_THEME.layout.containerTop,
        left: RELIANCE_THEME.layout.leftContentLeft, // Left Content Card (1100px wide)
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
      {/* Eyebrow */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: RELIANCE_THEME.colors.tealSoftBg,
          border: `1.5px solid ${RELIANCE_THEME.colors.cardBorder}`,
          borderRadius: 8,
          padding: "6px 18px",
          width: "fit-content",
          marginBottom: 20,
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
          PRICE JOURNEY • WEEKS TO HOURS
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
        52-WEEK LOW → TODAY'S RALLY
      </div>

      {/* SVG Connecting Journey Line */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 200,
          backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
          borderRadius: 20,
          border: `1.5px solid ${RELIANCE_THEME.colors.cardBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          boxSizing: "border-box",
          marginBottom: 36,
        }}
      >
        {/* SVG Rising Line */}
        <svg
          style={{
            position: "absolute",
            left: 200,
            right: 200,
            top: 40,
            width: "calc(100% - 400px)",
            height: 120,
          }}
          viewBox="0 0 500 120"
          fill="none"
        >
          <path
            d="M 10 95 C 180 95, 280 25, 480 25"
            stroke={RELIANCE_THEME.colors.primaryTeal}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="600"
            strokeDashoffset={interpolate(pathProgress, [0, 1], [600, 0])}
          />
        </svg>

        {/* Point 1: 52-Week Low */}
        <div style={{ zIndex: 10, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: RELIANCE_THEME.colors.negative,
              letterSpacing: "0.06em",
              marginBottom: 4,
            }}
          >
            OCTOBER LOW
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.darkText,
              fontFamily: RELIANCE_THEME.fonts.monoData,
              lineHeight: 1,
            }}
          >
            ₹1,152
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_THEME.colors.secondaryText, marginTop: 4 }}>
            Struggling near 52W Low
          </div>
        </div>

        {/* Point 2: Today's Rally */}
        <div style={{ zIndex: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: RELIANCE_THEME.colors.positive,
              letterSpacing: "0.06em",
              marginBottom: 4,
            }}
          >
            TODAY'S CLOSE
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.primaryTeal,
              fontFamily: RELIANCE_THEME.fonts.monoData,
              lineHeight: 1,
            }}
          >
            ₹1,300
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: RELIANCE_THEME.colors.positive, marginTop: 4 }}>
            +11.6% Surge (+₹148)
          </div>
        </div>
      </div>

      {/* Supporting Editorial Caption */}
      <div
        style={{
          fontSize: RELIANCE_THEME.typography.supportingText,
          fontWeight: 600,
          color: RELIANCE_THEME.colors.secondaryText,
          lineHeight: 1.35,
        }}
      >
        A sharp sentiment reversal following record Q2 operational earnings.
      </div>
    </div>
  );
};
