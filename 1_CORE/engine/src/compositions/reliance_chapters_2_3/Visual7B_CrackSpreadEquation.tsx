import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual7B_CrackSpreadEquation: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [840, 876], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  const formulaSpring = spring({
    frame: Math.max(0, relativeFrame - 60),
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

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
            backgroundColor: RELIANCE_CH2_3_THEME.colors.lightTeal,
            border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.cardBorderStrong}`,
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
          FINANCIAL MECHANICS
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            letterSpacing: "-0.03em",
          }}
        >
          WHAT IS A CRACK SPREAD?
        </div>
        <div style={{ fontSize: 26, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText, marginTop: 8 }}>
          The Fundamental Driver of Oil-to-Chemicals Profitability
        </div>
      </div>

      {/* The Kinetic Formula */}
      <div
        style={{
          width: "100%",
          maxWidth: 1680,
          backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
          border: `2.5px solid ${RELIANCE_CH2_3_THEME.colors.cardBorderStrong}`,
          borderRadius: 24,
          padding: "50px 60px",
          boxShadow: RELIANCE_CH2_3_THEME.shadows.floating,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          transform: `scale(${interpolate(formulaSpring, [0, 1], [0.96, 1])})`,
          boxSizing: "border-box",
          marginBottom: 36,
        }}
      >
        {/* Term 1 */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.deepTeal }}>
            OUTPUT VALUE
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.darkText, marginTop: 6 }}>
            SELLING VALUE OF PRODUCT
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText }}>
            (Petrol / Diesel / Jet Fuel)
          </div>
        </div>

        {/* Minus Sign */}
        <div style={{ fontSize: 56, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.negative }}>
          −
        </div>

        {/* Term 2 */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.negative }}>
            INPUT COST
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.darkText, marginTop: 6 }}>
            COST OF CRUDE OIL
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText }}>
            (Feedstock Barrel Inflow)
          </div>
        </div>

        {/* Equals Sign */}
        <div style={{ fontSize: 56, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.primaryTeal }}>
          =
        </div>

        {/* Result: Crack Spread */}
        <div
          style={{
            flex: 1.2,
            backgroundColor: RELIANCE_CH2_3_THEME.colors.lightTeal,
            border: `2px solid ${RELIANCE_CH2_3_THEME.colors.primaryTeal}`,
            borderRadius: 20,
            padding: "24px 28px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.primaryTeal }}>
            GROSS MARGIN
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.darkText, marginTop: 4 }}>
            CRACK SPREAD
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: RELIANCE_CH2_3_THEME.colors.deepTeal }}>
            Before Opex & Energy Costs
          </div>
        </div>
      </div>

      {/* Supporting Operating Leverage Explanation */}
      <div
        style={{
          width: "100%",
          maxWidth: 1680,
          backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
          border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.cardBorder}`,
          borderRadius: 18,
          padding: "24px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.darkText }}>
          OPERATING LEVERAGE DYNAMICS:
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText }}>
          Since refinery operating expenses stay relatively fixed, every $1 widening in crack spread flows directly to EBITDA.
        </div>
      </div>
    </div>
  );
};
