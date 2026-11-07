import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual3_JioGrowth: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [350, 380], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  const countUp = interpolate(enterSpring, [0, 1], [0, 16.6]);

  const drivers = [
    "SUBSCRIBER ADDITION",
    "HIGHER ARPU (TARIFF HIKES)",
    "IMPROVING OPERATING MARGINS",
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: RELIANCE_CH2_3_THEME.layout.rightZone.left,
        top: RELIANCE_CH2_3_THEME.layout.rightZone.top,
        width: RELIANCE_CH2_3_THEME.layout.rightZone.width,
        height: RELIANCE_CH2_3_THEME.layout.rightZone.height,
        backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
        borderRadius: RELIANCE_CH2_3_THEME.layout.borderRadius,
        border: `2px solid ${RELIANCE_CH2_3_THEME.colors.cardBorderStrong}`,
        boxShadow: RELIANCE_CH2_3_THEME.shadows.floating,
        padding: "48px 40px",
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
            display: "inline-block",
            backgroundColor: RELIANCE_CH2_3_THEME.colors.jioBlueBg,
            border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.jioBlueBorder}`,
            borderRadius: 10,
            padding: "6px 18px",
            color: RELIANCE_CH2_3_THEME.colors.jioBlue,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          TELECOM ENGINE
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            lineHeight: 1.15,
          }}
        >
          JIO PLATFORMS
        </div>
      </div>

      {/* Jio Metric Box */}
      <div
        style={{
          backgroundColor: RELIANCE_CH2_3_THEME.colors.jioBlueBg,
          border: `2px solid ${RELIANCE_CH2_3_THEME.colors.jioBlue}`,
          borderRadius: 20,
          padding: "36px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <span
          style={{
            fontSize: 92,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.jioBlue,
            fontFamily: RELIANCE_CH2_3_THEME.fonts.monoData,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          +{countUp.toFixed(1)}%
        </span>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            fontFamily: RELIANCE_CH2_3_THEME.fonts.monoData,
          }}
        >
          ₹21,879 CR
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: RELIANCE_CH2_3_THEME.colors.positive }}>
          ↑ Resilient Operating Growth
        </div>
      </div>

      {/* 3 Drivers */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {drivers.map((d, i) => (
          <div
            key={i}
            style={{
              backgroundColor: RELIANCE_CH2_3_THEME.colors.bgCanvas,
              borderRadius: 10,
              padding: "10px 18px",
              fontSize: 20,
              fontWeight: 800,
              color: RELIANCE_CH2_3_THEME.colors.darkText,
              border: `1px solid ${RELIANCE_CH2_3_THEME.colors.cardBorder}`,
            }}
          >
            • {d}
          </div>
        ))}
      </div>
    </div>
  );
};
