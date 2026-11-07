import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual9_RelianceCapturesOpportunity: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [245, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  const stages = [
    { num: "01", title: "FLEXIBLE SOURCING", desc: "Ability to process discount heavy crude grades" },
    { num: "02", title: "JAMNAGAR COMPLEXITY", desc: "Nelson Index > 21.1 maximizes high-value cut" },
    { num: "03", title: "PREMIUM PRODUCTS", desc: "Euro-VI clean petrol, high-octane diesel & ATF" },
    { num: "04", title: "GLOBAL ARBITRAGE", desc: "Exporting directly to deficit western markets" },
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
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div
          style={{
            display: "inline-block",
            backgroundColor: RELIANCE_CH2_3_THEME.colors.positiveBg,
            border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.positiveBorder}`,
            borderRadius: 12,
            padding: "8px 24px",
            color: RELIANCE_CH2_3_THEME.colors.deepTeal,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          COMPETITIVE ADVANTAGE
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            letterSpacing: "-0.03em",
          }}
        >
          HOW RELIANCE CAPTURED THE OPPORTUNITY
        </div>
      </div>

      {/* 4 Pipeline Stages */}
      <div style={{ width: "100%", maxWidth: 1680, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
        {stages.map((s, idx) => {
          const itemSpring = spring({
            frame: Math.max(0, relativeFrame - idx * 25),
            fps: 30,
            config: { damping: 16, stiffness: 90 },
          });

          return (
            <div
              key={idx}
              style={{
                backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
                border: `2px solid ${RELIANCE_CH2_3_THEME.colors.cardBorder}`,
                borderRadius: 20,
                padding: "36px 28px",
                boxShadow: RELIANCE_CH2_3_THEME.shadows.card,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                opacity: interpolate(itemSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(itemSpring, [0, 1], [20, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: RELIANCE_CH2_3_THEME.colors.lightTeal,
                  color: RELIANCE_CH2_3_THEME.colors.deepTeal,
                  fontSize: 22,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.darkText, lineHeight: 1.2 }}>
                {s.title}
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText, lineHeight: 1.35 }}>
                {s.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
