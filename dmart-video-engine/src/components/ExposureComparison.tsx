import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HIFY_LIGHT_TOKENS } from "../theme";

interface ExposureComparisonProps {
  startFrame?: number;
}

export const ExposureComparison: React.FC<ExposureComparisonProps> = ({ startFrame = 730 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 20,
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
      }}
    >
      {/* Current Deployed Exposure Card */}
      <div
        style={{
          backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
          borderRadius: 18,
          border: `1.5px solid ${HIFY_LIGHT_TOKENS.brandGold}`,
          padding: "24px 28px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.03)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: 6,
                backgroundColor: HIFY_LIGHT_TOKENS.brandGoldSubtle,
                fontSize: 11,
                fontWeight: 800,
                color: HIFY_LIGHT_TOKENS.brandGoldMuted,
                textTransform: "uppercase",
              }}
            >
              Current Deployed Scout
            </span>
            <span style={{ fontSize: 12, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics, color: HIFY_LIGHT_TOKENS.brandGoldMuted, fontWeight: 700 }}>
              TRANCHE 1
            </span>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary, margin: "4px 0 8px 0" }}>
            Initial 1% Exposure
          </h3>

          <p style={{ fontSize: 13, color: HIFY_LIGHT_TOKENS.textSecondary, lineHeight: 1.5, margin: 0 }}>
            Because current valuation is elevated near 70 PE, the speaker begins with only 1% initial capital rather than a standard entry.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginTop: 18,
              padding: "12px 16px",
              backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
              borderRadius: 10,
              border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 900,
                fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                color: HIFY_LIGHT_TOKENS.textPrimary,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              1.0%
            </span>
            <span style={{ fontSize: 13, color: HIFY_LIGHT_TOKENS.textMuted, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics }}>
              (₹10,000 on ₹10L capital)
            </span>
          </div>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: HIFY_LIGHT_TOKENS.textMuted }}>
          Leaves 4% (₹40,000) reserved for lower valuation levels.
        </div>
      </div>

      {/* Usual Starting Range Card */}
      <div
        style={{
          backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
          borderRadius: 18,
          border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
          padding: "24px 28px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.03)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: 6,
                backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
                border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
                fontSize: 11,
                fontWeight: 700,
                color: HIFY_LIGHT_TOKENS.textSecondary,
                textTransform: "uppercase",
              }}
            >
              Baseline Framework
            </span>
            <span style={{ fontSize: 12, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics, color: HIFY_LIGHT_TOKENS.textMuted }}>
              CONVENTIONAL
            </span>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary, margin: "4px 0 8px 0" }}>
            Usual 2% to 3% Starting Exposure
          </h3>

          <p style={{ fontSize: 13, color: HIFY_LIGHT_TOKENS.textSecondary, lineHeight: 1.5, margin: 0 }}>
            Under standard or moderate valuations, starting with 2%–3% is customary. Here, prudence dictates a lighter first tranche.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginTop: 18,
              padding: "12px 16px",
              backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
              borderRadius: 10,
              border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                color: HIFY_LIGHT_TOKENS.textSecondary,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              2.0% – 3.0%
            </span>
            <span style={{ fontSize: 13, color: HIFY_LIGHT_TOKENS.textMuted, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics }}>
              (₹20k–₹30k normal base)
            </span>
          </div>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: HIFY_LIGHT_TOKENS.textMuted }}>
          Maximum allowable allocation remains capped at 5% in all scenarios.
        </div>
      </div>
    </div>
  );
};
