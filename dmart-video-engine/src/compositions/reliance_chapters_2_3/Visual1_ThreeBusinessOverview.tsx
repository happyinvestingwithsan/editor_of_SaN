import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual1_ThreeBusinessOverview: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [145, 168], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  const businesses = [
    {
      name: "OIL-TO-CHEMICALS (O2C)",
      ebitda: "₹25,203 CR",
      growth: "+67.9% YoY",
      isPrimary: true,
      color: RELIANCE_CH2_3_THEME.colors.primaryTeal,
      bg: RELIANCE_CH2_3_THEME.colors.lightTeal,
    },
    {
      name: "JIO PLATFORMS",
      ebitda: "₹21,879 CR",
      growth: "+16.6% YoY",
      isPrimary: false,
      color: RELIANCE_CH2_3_THEME.colors.jioBlue,
      bg: RELIANCE_CH2_3_THEME.colors.jioBlueBg,
    },
    {
      name: "RELIANCE RETAIL",
      ebitda: "₹6,228 CR",
      growth: "-8.6% YoY",
      isPrimary: false,
      color: RELIANCE_CH2_3_THEME.colors.negative,
      bg: RELIANCE_CH2_3_THEME.colors.negativeBg,
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: RELIANCE_CH2_3_THEME.layout.leftZone.left,
        top: RELIANCE_CH2_3_THEME.layout.leftZone.top,
        width: RELIANCE_CH2_3_THEME.layout.leftZone.width,
        height: RELIANCE_CH2_3_THEME.layout.leftZone.height,
        backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
        borderRadius: RELIANCE_CH2_3_THEME.layout.borderRadius,
        border: `2px solid ${RELIANCE_CH2_3_THEME.colors.cardBorderStrong}`,
        boxShadow: RELIANCE_CH2_3_THEME.shadows.floating,
        padding: "44px 36px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity,
        transform: `translateY(${translateY}px)`,
        boxSizing: "border-box",
      }}
    >
      <div>
        <div
          style={{
            color: RELIANCE_CH2_3_THEME.colors.deepTeal,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          EARNINGS DIVERGENCE
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            lineHeight: 1.15,
          }}
        >
          THREE CORE PILLARS
        </div>
      </div>

      {/* 3 Pillar Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {businesses.map((b, i) => (
          <div
            key={i}
            style={{
              backgroundColor: b.bg,
              border: `1.5px solid ${b.color}`,
              borderRadius: 16,
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: b.color, letterSpacing: "0.04em" }}>
              {b.name}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <span
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  color: RELIANCE_CH2_3_THEME.colors.darkText,
                  fontFamily: RELIANCE_CH2_3_THEME.fonts.monoData,
                }}
              >
                {b.ebitda}
              </span>
              <span style={{ fontSize: 22, fontWeight: 800, color: b.color }}>
                {b.growth}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: RELIANCE_CH2_3_THEME.colors.secondaryText,
          textAlign: "center",
        }}
      >
        Audited Q2 FY27 Segment Performance
      </div>
    </div>
  );
};
