import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual7A_JamnagarRefineryFlow: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [810, 846], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  const flowSpring = spring({
    frame: Math.max(0, relativeFrame - 45),
    fps: 30,
    config: { damping: 20, stiffness: 70 },
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
      {/* Top Header */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
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
          CORE REFINING ECONOMICS
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            letterSpacing: "-0.03em",
          }}
        >
          JAMNAGAR: THE WORLD'S LARGEST INTEGRATED COMPLEX
        </div>
        <div style={{ fontSize: 28, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText, marginTop: 8 }}>
          Processing 1.4 Million Barrels Per Day with Extreme Complexity
        </div>
      </div>

      {/* 3-Stage Process Flow Diagram */}
      <div
        style={{
          width: "100%",
          maxWidth: 1680,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        {/* Stage 1: Crude Oil Inflow */}
        <div
          style={{
            flex: 1,
            backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
            border: `2px solid ${RELIANCE_CH2_3_THEME.colors.cardBorder}`,
            borderRadius: 20,
            padding: "40px 32px",
            boxShadow: RELIANCE_CH2_3_THEME.shadows.card,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.deepTeal, letterSpacing: "0.06em" }}>
            STAGE 1 • RAW INPUT
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.darkText }}>
            CRUDE OIL INFLOW
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText }}>
            Sourced via global supertankers from Middle East, Russia & Africa
          </div>
        </div>

        {/* Arrow 1 */}
        <div style={{ color: RELIANCE_CH2_3_THEME.colors.primaryTeal, fontSize: 44, fontWeight: 900 }}>
          →
        </div>

        {/* Stage 2: Jamnagar Super-Complex */}
        <div
          style={{
            flex: 1.2,
            backgroundColor: RELIANCE_CH2_3_THEME.colors.lightTeal,
            border: `2.5px solid ${RELIANCE_CH2_3_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            padding: "44px 36px",
            boxShadow: RELIANCE_CH2_3_THEME.shadows.floating,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            transform: `scale(${interpolate(flowSpring, [0, 1], [0.96, 1])})`,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.deepTeal, letterSpacing: "0.08em" }}>
            STAGE 2 • PROCESSING ENGINE
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.darkText }}>
            JAMNAGAR REFINERY
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText }}>
            Dual complex: Nelson Complexity Index &gt; 21.1 (converts heavy sour crude into pure distillates)
          </div>
        </div>

        {/* Arrow 2 */}
        <div style={{ color: RELIANCE_CH2_3_THEME.colors.primaryTeal, fontSize: 44, fontWeight: 900 }}>
          →
        </div>

        {/* Stage 3: Finished Output */}
        <div
          style={{
            flex: 1,
            backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
            border: `2px solid ${RELIANCE_CH2_3_THEME.colors.cardBorder}`,
            borderRadius: 20,
            padding: "40px 32px",
            boxShadow: RELIANCE_CH2_3_THEME.shadows.card,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.deepTeal, letterSpacing: "0.06em" }}>
            STAGE 3 • FINISHED PRODUCTS
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.primaryTeal }}>
            PETROL • DIESEL • ATF
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText }}>
            + Petrochemicals: Polymers, Plastics & Synthetic Fibres
          </div>
        </div>
      </div>
    </div>
  );
};
