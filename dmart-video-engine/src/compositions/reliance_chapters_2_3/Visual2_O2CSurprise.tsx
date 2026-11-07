import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual2_O2CSurprise: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [325, 352], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  // Kinetic count-up from 0% to 67.9%
  const countUp = interpolate(enterSpring, [0, 1], [0, 67.9]);

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
            backgroundColor: RELIANCE_CH2_3_THEME.colors.positiveBg,
            border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.positiveBorder}`,
            borderRadius: 10,
            padding: "6px 18px",
            color: RELIANCE_CH2_3_THEME.colors.deepTeal,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          THE BIG SURPRISE
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            lineHeight: 1.15,
          }}
        >
          O2C EBITDA GROWTH
        </div>
      </div>

      {/* Hero Metric Box */}
      <div
        style={{
          backgroundColor: RELIANCE_CH2_3_THEME.colors.lightTeal,
          border: `2px solid ${RELIANCE_CH2_3_THEME.colors.primaryTeal}`,
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
            color: RELIANCE_CH2_3_THEME.colors.primaryTeal,
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
          ₹25,203 CR
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: RELIANCE_CH2_3_THEME.colors.positive }}>
          ↑ +₹10,187 Cr Incremental Gain
        </div>
      </div>

      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: RELIANCE_CH2_3_THEME.colors.secondaryText,
          lineHeight: 1.35,
        }}
      >
        Refining crack spreads and petrochemical margin recovery powered the surge.
      </div>
    </div>
  );
};
