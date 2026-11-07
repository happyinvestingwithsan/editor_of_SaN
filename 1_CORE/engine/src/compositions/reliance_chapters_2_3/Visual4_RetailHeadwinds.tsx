import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual4_RetailHeadwinds: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [595, 630], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  // Progressive label triggers
  const tag1Spring = spring({ frame: Math.max(0, relativeFrame - 150), fps: 30, config: { damping: 16 } });
  const tag2Spring = spring({ frame: Math.max(0, relativeFrame - 260), fps: 30, config: { damping: 16 } });
  const tag3Spring = spring({ frame: Math.max(0, relativeFrame - 380), fps: 30, config: { damping: 16 } });

  const tags = [
    { title: "HIGHER OPERATING COSTS", desc: "Store expansion and inflation", springVal: tag1Spring },
    { title: "DIGITAL INVESTMENTS", desc: "Scaling quick commerce & JioMart", springVal: tag2Spring },
    { title: "FESTIVE-SEASON SHIFT", desc: "Diwali sales shifted into Q3", springVal: tag3Spring },
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
            backgroundColor: RELIANCE_CH2_3_THEME.colors.negativeBg,
            border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.negativeBorder}`,
            borderRadius: 10,
            padding: "6px 18px",
            color: RELIANCE_CH2_3_THEME.colors.negative,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          TEMPORARY HEADWIND
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            lineHeight: 1.15,
          }}
        >
          RELIANCE RETAIL
        </div>
      </div>

      {/* Retail Metric Box */}
      <div
        style={{
          backgroundColor: RELIANCE_CH2_3_THEME.colors.negativeBg,
          border: `2px solid ${RELIANCE_CH2_3_THEME.colors.negative}`,
          borderRadius: 20,
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: RELIANCE_CH2_3_THEME.colors.negative,
              fontFamily: RELIANCE_CH2_3_THEME.fonts.monoData,
              lineHeight: 1,
            }}
          >
            -8.6%
          </span>
          <span style={{ fontSize: 24, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.secondaryText }}>
            YoY EBITDA
          </span>
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            fontFamily: RELIANCE_CH2_3_THEME.fonts.monoData,
          }}
        >
          ₹6,228 CR
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: RELIANCE_CH2_3_THEME.colors.secondaryText }}>
          Revenue: ₹86,400 Cr (+6.4%)
        </div>
      </div>

      {/* 3 Progressive Explanatory Labels */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {tags.map((t, i) => (
          <div
            key={i}
            style={{
              backgroundColor: RELIANCE_CH2_3_THEME.colors.bgCanvas,
              border: `1px solid ${RELIANCE_CH2_3_THEME.colors.cardBorder}`,
              borderRadius: 12,
              padding: "12px 18px",
              opacity: interpolate(t.springVal, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(t.springVal, [0, 1], [15, 0])}px)`,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.darkText }}>
              • {t.title}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText }}>
              {t.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
