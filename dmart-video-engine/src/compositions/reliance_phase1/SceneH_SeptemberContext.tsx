import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneHProps {
  relativeFrame: number; // 0 to 657 (absolute: 3012 to 3669)
}

export const SceneH_SeptemberContext: React.FC<SceneHProps> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame - 15,
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  const timelineDraw = spring({
    frame: Math.max(0, relativeFrame - 45),
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
      {/* Date Marker Badge */}
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
          HISTORICAL CONTEXT • SEPTEMBER 2026
        </span>
      </div>

      {/* Main Headline */}
      <div
        style={{
          fontSize: RELIANCE_THEME.typography.mainHeadline,
          fontWeight: 900,
          color: RELIANCE_THEME.colors.darkText,
          lineHeight: 1.15,
          marginBottom: 40,
          letterSpacing: "-0.03em",
        }}
      >
        THE 52-WEEK DRAWDOWN
      </div>

      {/* Two-Point Price Timeline */}
      <div
        style={{
          backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
          borderRadius: 20,
          border: `1.5px solid ${RELIANCE_THEME.colors.cardBorder}`,
          padding: "36px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
          marginBottom: 32,
        }}
      >
        {/* Point 1: 52-Week High */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: RELIANCE_THEME.colors.secondaryText }}>
              JANUARY 2026 • 52-WEEK HIGH
            </div>
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: RELIANCE_THEME.colors.darkText,
                fontFamily: RELIANCE_THEME.fonts.monoData,
                lineHeight: 1.1,
              }}
            >
              ₹1,611.80
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(100, 115, 113, 0.12)",
              borderRadius: 10,
              padding: "6px 16px",
              color: RELIANCE_THEME.colors.secondaryText,
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            PEAK
          </div>
        </div>

        {/* Animated Connecting Divider */}
        <div style={{ position: "relative", height: 6, backgroundColor: RELIANCE_THEME.colors.cardBorderMuted, borderRadius: 3 }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${interpolate(timelineDraw, [0, 1], [0, 100])}%`,
              backgroundColor: RELIANCE_THEME.colors.negative,
              borderRadius: 3,
            }}
          />
        </div>

        {/* Point 2: 52-Week Low */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_THEME.colors.negative }}>
              OCTOBER 2026 • 52-WEEK LOW
            </div>
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: RELIANCE_THEME.colors.negative,
                fontFamily: RELIANCE_THEME.fonts.monoData,
                lineHeight: 1.1,
              }}
            >
              ₹1,152.20
            </div>
          </div>
          <div
            style={{
              backgroundColor: RELIANCE_THEME.colors.negativeBg,
              border: `1.5px solid ${RELIANCE_THEME.colors.negativeBorder}`,
              borderRadius: 10,
              padding: "6px 16px",
              color: RELIANCE_THEME.colors.negative,
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            -28.5% CRASH
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: RELIANCE_THEME.typography.supportingText,
          fontWeight: 600,
          color: RELIANCE_THEME.colors.secondaryText,
        }}
      >
        Widespread retail despair and institutional skepticism before earnings.
      </div>
    </div>
  );
};
