import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual8_CrackSpreadMultipliers: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [415, 444], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  const cracks = [
    { product: "GASOLINE (PETROL)", mult: "3.0x", color: RELIANCE_CH2_3_THEME.colors.gold },
    { product: "DIESEL (GASOIL)", mult: "3.5x", color: RELIANCE_CH2_3_THEME.colors.positive },
    { product: "AVIATION FUEL (ATF)", mult: "3.7x", color: RELIANCE_CH2_3_THEME.colors.primaryTeal },
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
            display: "inline-block",
            backgroundColor: RELIANCE_CH2_3_THEME.colors.positiveBg,
            border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.positiveBorder}`,
            borderRadius: 10,
            padding: "6px 18px",
            color: RELIANCE_CH2_3_THEME.colors.deepTeal,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          OFFICIAL MANAGEMENT COMMENTARY
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            lineHeight: 1.15,
          }}
        >
          CRACK SPREAD EXPANSION
        </div>
      </div>

      {/* 3 Multipliers */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {cracks.map((c, idx) => {
          const itemSpring = spring({
            frame: Math.max(0, relativeFrame - idx * 45),
            fps: 30,
            config: { damping: 16, stiffness: 90 },
          });

          return (
            <div
              key={idx}
              style={{
                backgroundColor: RELIANCE_CH2_3_THEME.colors.lightTeal,
                border: `1.5px solid ${c.color}`,
                borderRadius: 18,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: interpolate(itemSpring, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(itemSpring, [0, 1], [-20, 0])}px)`,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.darkText }}>
                {c.product}
              </div>
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 900,
                  color: c.color,
                  fontFamily: RELIANCE_CH2_3_THEME.fonts.monoData,
                  lineHeight: 1,
                }}
              >
                {c.mult}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: RELIANCE_CH2_3_THEME.colors.secondaryText,
          textAlign: "center",
        }}
      >
        Year-on-Year Expansion of Product Margins
      </div>
    </div>
  );
};
