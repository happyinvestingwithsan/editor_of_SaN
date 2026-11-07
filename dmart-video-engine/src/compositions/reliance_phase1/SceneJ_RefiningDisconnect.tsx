import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneJProps {
  relativeFrame: number; // 0 to 212 (absolute: 4376 to 4588)
}

export const SceneJ_RefiningDisconnect: React.FC<SceneJProps> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame - 15,
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  const arrowSpring = spring({
    frame: Math.max(0, relativeFrame - 40),
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  const whySpring = spring({
    frame: Math.max(0, relativeFrame - 140), // "Why?" spoken at ~f145 (4.8s)
    fps: 30,
    config: { damping: 15, stiffness: 100 },
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
          backgroundColor: RELIANCE_THEME.colors.alertBg,
          border: `1.5px solid ${RELIANCE_THEME.colors.alertBorder}`,
          borderRadius: 8,
          padding: "6px 18px",
          width: "fit-content",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            color: "#B45309",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          THE MARKET DISCONNECT
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
        DISCONNECT: BUSINESS VS STOCK
      </div>

      {/* Divergence Duel Box */}
      <div style={{ display: "flex", gap: 32, marginBottom: 36 }}>
        {/* Metric 1: Refining Margins UP */}
        <div
          style={{
            flex: 1,
            backgroundColor: RELIANCE_THEME.colors.positiveBg,
            border: `2.5px solid ${RELIANCE_THEME.colors.positiveBorder}`,
            borderRadius: 20,
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_THEME.colors.primaryTeal, letterSpacing: "0.06em" }}>
            OPERATING METRIC
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: RELIANCE_THEME.colors.darkText, lineHeight: 1.15 }}>
            REFINING MARGINS
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: RELIANCE_THEME.colors.positive,
              fontSize: 34,
              fontWeight: 900,
              transform: `translateY(${interpolate(arrowSpring, [0, 1], [15, 0])}px)`,
            }}
          >
            <span style={{ fontSize: 44 }}>↑</span>
            <span>EXPANDING</span>
          </div>
        </div>

        {/* Metric 2: Reliance Share Price DOWN */}
        <div
          style={{
            flex: 1,
            backgroundColor: RELIANCE_THEME.colors.negativeBg,
            border: `2.5px solid ${RELIANCE_THEME.colors.negativeBorder}`,
            borderRadius: 20,
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_THEME.colors.negative, letterSpacing: "0.06em" }}>
            MARKET SENTIMENT
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: RELIANCE_THEME.colors.darkText, lineHeight: 1.15 }}>
            RELIANCE SHARE PRICE
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: RELIANCE_THEME.colors.negative,
              fontSize: 34,
              fontWeight: 900,
              transform: `translateY(${interpolate(arrowSpring, [0, 1], [-15, 0])}px)`,
            }}
          >
            <span style={{ fontSize: 44 }}>↓</span>
            <span>APPROACHING 52W LOW</span>
          </div>
        </div>
      </div>

      {/* "Why?" Stamp Reveal */}
      {relativeFrame >= 135 && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: RELIANCE_THEME.colors.darkText,
            color: RELIANCE_THEME.colors.whiteText,
            padding: "12px 28px",
            borderRadius: 14,
            width: "fit-content",
            transform: `scale(${interpolate(whySpring, [0, 1], [0.8, 1])})`,
            opacity: interpolate(whySpring, [0, 1], [0, 1]),
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 900, color: RELIANCE_THEME.colors.primaryTeal }}>WHY?</span>
          <span style={{ fontSize: 24, fontWeight: 700 }}>THE MARKET SOUGHT HOLISTIC PORTFOLIO PROOF</span>
        </div>
      )}
    </div>
  );
};
