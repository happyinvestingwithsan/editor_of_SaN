import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual10_OperationalFlexibility: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  const stampSpring = spring({
    frame: Math.max(0, relativeFrame - 35),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const pillars = [
    "1. GLOBAL SUPPLY DISRUPTION",
    "2. HIGHER PRODUCT PRICES",
    "3. FLEXIBLE SOURCING",
    "4. BETTER MARKET REALISATION",
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        backgroundColor: RELIANCE_CH2_3_THEME.colors.bgCanvas,
        padding: "80px 100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
        boxSizing: "border-box",
        zIndex: 50,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            letterSpacing: "-0.02em",
          }}
        >
          CHAPTER 03 CORE VERDICT
        </div>
      </div>

      {/* 4 Pillars Horizontal Bar */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 50,
        }}
      >
        {pillars.map((p, i) => (
          <div
            key={i}
            style={{
              backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
              border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.cardBorder}`,
              borderRadius: 14,
              padding: "16px 24px",
              fontSize: 20,
              fontWeight: 800,
              color: RELIANCE_CH2_3_THEME.colors.secondaryText,
            }}
          >
            {p}
          </div>
        ))}
      </div>

      {/* Final Hero Emphasis Stamp */}
      <div
        style={{
          backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
          border: `3px solid ${RELIANCE_CH2_3_THEME.colors.primaryTeal}`,
          borderRadius: 24,
          padding: "48px 80px",
          textAlign: "center",
          boxShadow: RELIANCE_CH2_3_THEME.shadows.floating,
          transform: `scale(${interpolate(stampSpring, [0, 1], [0.85, 1])})`,
          opacity: interpolate(stampSpring, [0, 1], [0, 1]),
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.deepTeal, letterSpacing: "0.12em" }}>
          THE STRUCTURAL MOAT
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.primaryTeal,
            letterSpacing: "-0.03em",
            marginTop: 8,
          }}
        >
          OPERATIONAL FLEXIBILITY
        </div>
        <div style={{ fontSize: 26, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText, marginTop: 8 }}>
          The capability to switch crudes, optimize yields, and export globally in real time.
        </div>
      </div>
    </div>
  );
};
