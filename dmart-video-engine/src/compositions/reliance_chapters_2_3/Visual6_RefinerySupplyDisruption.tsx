import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual6_RefinerySupplyDisruption: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [1450, 1494], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  // Progressive reveals for the 3 shock stages
  const stage1Spring = spring({ frame: Math.max(0, relativeFrame - 60), fps: 30, config: { damping: 16 } });
  const stage2Spring = spring({ frame: Math.max(0, relativeFrame - 450), fps: 30, config: { damping: 16 } });
  const stage3Spring = spring({ frame: Math.max(0, relativeFrame - 900), fps: 30, config: { damping: 16 } });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        backgroundColor: RELIANCE_CH2_3_THEME.colors.bgCanvas,
        padding: "70px 100px",
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
            backgroundColor: RELIANCE_CH2_3_THEME.colors.goldBg,
            border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.goldBorder}`,
            borderRadius: 12,
            padding: "8px 24px",
            color: RELIANCE_CH2_3_THEME.colors.gold,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          GLOBAL MACRO CATALYST
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            letterSpacing: "-0.03em",
          }}
        >
          SUPPLY DISRUPTION → TIGHTER AVAILABILITY
        </div>
        <div style={{ fontSize: 26, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText, marginTop: 8 }}>
          How Inelastic Global Demand & Constrained Refining Supply Triggered Margins
        </div>
      </div>

      {/* 3 Step Disruption Blocks */}
      <div style={{ width: "100%", maxWidth: 1680, display: "flex", gap: 32 }}>
        {/* Step 1: Geopolitical Shock */}
        <div
          style={{
            flex: 1,
            backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
            border: `2px solid ${RELIANCE_CH2_3_THEME.colors.cardBorder}`,
            borderRadius: 22,
            padding: "40px 32px",
            boxShadow: RELIANCE_CH2_3_THEME.shadows.card,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: interpolate(stage1Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(stage1Spring, [0, 1], [25, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.gold, letterSpacing: "0.06em" }}>
            PHASE 1 • THE CATALYST
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.darkText }}>
            REFINING OUTAGES
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText, lineHeight: 1.35 }}>
            • Middle East geopolitical tension<br />
            • Drone strikes on Russian refineries<br />
            • Sea freight tanker route delays
          </div>
        </div>

        {/* Step 2: Supply Imbalance */}
        <div
          style={{
            flex: 1,
            backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
            border: `2px solid ${RELIANCE_CH2_3_THEME.colors.cardBorder}`,
            borderRadius: 22,
            padding: "40px 32px",
            boxShadow: RELIANCE_CH2_3_THEME.shadows.card,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: interpolate(stage2Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(stage2Spring, [0, 1], [25, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.negative, letterSpacing: "0.06em" }}>
            PHASE 2 • INVENTORY CRASH
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.darkText }}>
            GLOBAL IMBALANCE
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText, lineHeight: 1.35 }}>
            • Inelastic transport fuel demand<br />
            • Available refining supply drops<br />
            • Global inventories hit multi-year lows
          </div>
        </div>

        {/* Step 3: Margin Expansion */}
        <div
          style={{
            flex: 1,
            backgroundColor: RELIANCE_CH2_3_THEME.colors.lightTeal,
            border: `2.5px solid ${RELIANCE_CH2_3_THEME.colors.primaryTeal}`,
            borderRadius: 22,
            padding: "40px 32px",
            boxShadow: RELIANCE_CH2_3_THEME.shadows.floating,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: interpolate(stage3Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(stage3Spring, [0, 1], [25, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.deepTeal, letterSpacing: "0.06em" }}>
            PHASE 3 • THE OUTCOME
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: RELIANCE_CH2_3_THEME.colors.primaryTeal }}>
            MARGIN EXPANSION
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText, lineHeight: 1.35 }}>
            • Gasoline, Diesel & Jet fuel prices spike<br />
            • Refining crack spreads explode<br />
            • Complex refiners reap record profits
          </div>
        </div>
      </div>
    </div>
  );
};
