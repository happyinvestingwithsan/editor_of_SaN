import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HIFY_LIGHT_TOKENS } from "../theme";

interface GTTPlanInterfaceProps {
  startFrame?: number;
}

export const GTTPlanInterface: React.FC<GTTPlanInterfaceProps> = ({
  startFrame = 3130,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Tranche 1 condition revealed at frame 3480
  const trigger1Spring = spring({
    frame: frame - 3480,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Tranche 2 condition revealed at frame 3570
  const trigger2Spring = spring({
    frame: frame - 3570,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  return (
    <div
      style={{
        backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
        borderRadius: 18,
        border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
        padding: "24px 32px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.03)",
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: 6,
                backgroundColor: HIFY_LIGHT_TOKENS.brandGoldSubtle,
                border: `1px solid ${HIFY_LIGHT_TOKENS.brandGold}`,
                fontSize: 11,
                fontWeight: 800,
                color: HIFY_LIGHT_TOKENS.brandGoldMuted,
                textTransform: "uppercase",
              }}
            >
              Systematic Execution
            </span>
            <span style={{ fontSize: 12, color: HIFY_LIGHT_TOKENS.textMuted }}>
              Good-Till-Triggered (GTT) Conditional Plan
            </span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary, margin: 0 }}>
            Automated Risk Execution Framework
          </h3>
        </div>

        <div
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            border: `1px solid ${HIFY_LIGHT_TOKENS.metricPositive}`,
            color: HIFY_LIGHT_TOKENS.metricPositive,
            fontSize: 11,
            fontWeight: 800,
            fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
          }}
        >
          ● EMOTIONAL DECOUPLING
        </div>
      </div>

      {/* Sequence of Planned Conditions (Light Theme Cards) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* CONDITION #1 */}
        <div
          style={{
            backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
            borderRadius: 12,
            border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: frame >= 3480 ? trigger1Spring : 0.65,
            transform: `scale(${frame >= 3480 ? interpolate(trigger1Spring, [0, 1], [0.98, 1]) : 0.98})`,
            transition: "all 0.2s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
                border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
                fontSize: 11,
                fontWeight: 800,
                fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                color: HIFY_LIGHT_TOKENS.brandGoldMuted,
              }}
            >
              PLAN A
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary }}>
                Trigger Condition: Price Drops -10% from Support
              </div>
              <div style={{ fontSize: 12, color: HIFY_LIGHT_TOKENS.textSecondary, marginTop: 2 }}>
                Pre-planned action: Deploy Tranche 2 (+1% capital consideration / ₹10,000)
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                padding: "4px 8px",
                borderRadius: 4,
                backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
                border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
                color: HIFY_LIGHT_TOKENS.textSecondary,
              }}
            >
              PLANNED TRIGGER CONDITION
            </span>
            <div style={{ fontSize: 10, color: HIFY_LIGHT_TOKENS.textMuted, marginTop: 4 }}>
              Awaits Market Trigger
            </div>
          </div>
        </div>

        {/* CONDITION #2 */}
        <div
          style={{
            backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
            borderRadius: 12,
            border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: frame >= 3570 ? trigger2Spring : 0.65,
            transform: `scale(${frame >= 3570 ? interpolate(trigger2Spring, [0, 1], [0.98, 1]) : 0.98})`,
            transition: "all 0.2s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
                border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
                fontSize: 11,
                fontWeight: 800,
                fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                color: HIFY_LIGHT_TOKENS.metricPositive,
              }}
            >
              PLAN B
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary }}>
                Trigger Condition: Price Drops -20% from Support
              </div>
              <div style={{ fontSize: 12, color: HIFY_LIGHT_TOKENS.textSecondary, marginTop: 2 }}>
                Pre-planned action: Deploy Tranche 3 (evaluate remaining capacity within 5% ceiling)
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                padding: "4px 8px",
                borderRadius: 4,
                backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
                border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
                color: HIFY_LIGHT_TOKENS.textSecondary,
              }}
            >
              PLANNED TRIGGER CONDITION
            </span>
            <div style={{ fontSize: 10, color: HIFY_LIGHT_TOKENS.textMuted, marginTop: 4 }}>
              Deep Margin of Safety
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Tenets */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 4 }}>
        <div
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
            border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: HIFY_LIGHT_TOKENS.brandGoldMuted, textTransform: "uppercase" }}>
            1. PRE-DECIDED RULES
          </div>
          <div style={{ fontSize: 12, color: HIFY_LIGHT_TOKENS.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
            Entry criteria defined in advance during objective fundamental analysis.
          </div>
        </div>

        <div
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
            border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: HIFY_LIGHT_TOKENS.metricPositive, textTransform: "uppercase" }}>
            2. ZERO EMOTION
          </div>
          <div style={{ fontSize: 12, color: HIFY_LIGHT_TOKENS.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
            Removes real-time market panic, second-guessing, and compulsive chart watching.
          </div>
        </div>

        <div
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
            border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary, textTransform: "uppercase" }}>
            3. CONDITIONAL DISCIPLINE
          </div>
          <div style={{ fontSize: 12, color: HIFY_LIGHT_TOKENS.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
            Conditions remain dormant unless market price reaches the specified scenario zone.
          </div>
        </div>
      </div>

      {/* Regulatory Disclaimers */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11,
          color: HIFY_LIGHT_TOKENS.textMuted,
          paddingTop: 4,
        }}
      >
        <span>
          Illustrative interface demonstrating conditional planning — trigger conditions do not guarantee market execution.
        </span>
        <span style={{ fontWeight: 700 }}>
          NOT AN ACTUAL ORDER CONFIRMATION
        </span>
      </div>
    </div>
  );
};
