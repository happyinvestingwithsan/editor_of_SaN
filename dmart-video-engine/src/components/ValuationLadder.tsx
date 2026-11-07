import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HIFY_LIGHT_TOKENS } from "../theme";

interface ValuationLadderProps {
  startFrame?: number;
}

export const ValuationLadder: React.FC<ValuationLadderProps> = ({ startFrame = 1448 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Highlight progression matching exact spoken word frames:
  // 70 at 1500, 65 at 1588, 64 at 1617, 63 at 1638, 62 at 1658
  const currentPe = interpolate(
    frame,
    [1480, 1588, 1617, 1638, 1660],
    [70.0, 65.0, 64.0, 63.0, 62.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const steps = [
    { pe: 70, label: "Initial Reference", sub: "Elevated Valuation Level", triggerFrame: 1480 },
    { pe: 65, label: "Compression Step 1", sub: "Potential Downside Level", triggerFrame: 1588 },
    { pe: 64, label: "Compression Step 2", sub: "Incremental Contraction", triggerFrame: 1617 },
    { pe: 63, label: "Compression Step 3", sub: "Further Margin Expansion", triggerFrame: 1638 },
    { pe: 62, label: "Compression Step 4", sub: "Deeper Valuation Reset", triggerFrame: 1658 },
  ];

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
        gap: 18,
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
              Valuation Multiples
            </span>
            <span style={{ fontSize: 12, color: HIFY_LIGHT_TOKENS.textMuted }}>
              Historical P/E Contraction Scenario
            </span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary, margin: 0 }}>
            P/E Progression: 70 → 65 → 64 → 63 → 62
          </h3>
        </div>

        {/* Live Multiples Counter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            borderRadius: 10,
            backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
            border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: HIFY_LIGHT_TOKENS.textMuted }}>
            SIMULATED P/E:
          </span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 900,
              fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
              color: currentPe <= 65 ? HIFY_LIGHT_TOKENS.metricPositive : HIFY_LIGHT_TOKENS.brandGoldMuted,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {currentPe.toFixed(1)}x
          </span>
        </div>
      </div>

      {/* Horizontal Step Ladder */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
        }}
      >
        {steps.map((step) => {
          const isReached = frame >= step.triggerFrame;
          const isCurrent = Math.abs(currentPe - step.pe) < 0.6;

          return (
            <div
              key={step.pe}
              style={{
                backgroundColor: isCurrent
                  ? HIFY_LIGHT_TOKENS.surfaceCard
                  : HIFY_LIGHT_TOKENS.surfaceCardSubtle,
                borderRadius: 12,
                border: isCurrent
                  ? `2px solid ${HIFY_LIGHT_TOKENS.brandGold}`
                  : isReached
                  ? `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`
                  : `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.2s ease",
                boxShadow: isCurrent ? "0 4px 16px rgba(200, 169, 81, 0.15)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: isCurrent
                    ? HIFY_LIGHT_TOKENS.brandGoldMuted
                    : isReached
                    ? HIFY_LIGHT_TOKENS.textSecondary
                    : HIFY_LIGHT_TOKENS.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {step.label}
              </div>

              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                  color: isCurrent
                    ? HIFY_LIGHT_TOKENS.brandGoldMuted
                    : isReached
                    ? HIFY_LIGHT_TOKENS.textPrimary
                    : HIFY_LIGHT_TOKENS.textMuted,
                  margin: "8px 0 4px 0",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                PE {step.pe}
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: isCurrent ? HIFY_LIGHT_TOKENS.textPrimary : HIFY_LIGHT_TOKENS.textMuted,
                  lineHeight: 1.3,
                }}
              >
                {step.sub}
              </div>

              {/* Status Pill */}
              <div
                style={{
                  marginTop: 10,
                  padding: "3px 8px",
                  borderRadius: 999,
                  fontSize: 9,
                  fontWeight: 800,
                  fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                  backgroundColor: isCurrent
                    ? HIFY_LIGHT_TOKENS.brandGoldSubtle
                    : isReached
                    ? "rgba(16, 185, 129, 0.1)"
                    : HIFY_LIGHT_TOKENS.surfaceCardSubtle,
                  color: isCurrent
                    ? HIFY_LIGHT_TOKENS.brandGoldMuted
                    : isReached
                    ? HIFY_LIGHT_TOKENS.metricPositive
                    : HIFY_LIGHT_TOKENS.textMuted,
                }}
              >
                {isCurrent ? "ACTIVE DISCUSSION" : isReached ? "CONSIDERED" : "POTENTIAL"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Editorial Footnote */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderRadius: 8,
          backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
          fontSize: 12,
          color: HIFY_LIGHT_TOKENS.textSecondary,
        }}
      >
        <span>
          &ldquo;When that is actually happening, you need the capital allocation to support.&rdquo;
        </span>
        <span style={{ fontSize: 11, color: HIFY_LIGHT_TOKENS.textMuted, fontStyle: "italic" }}>
          Illustrative valuation levels — not a market price target
        </span>
      </div>
    </div>
  );
};
