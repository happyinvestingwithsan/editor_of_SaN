import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HIFY_LIGHT_TOKENS } from "../theme";

interface AllocationBarProps {
  startFrame?: number;
}

export const AllocationBar: React.FC<AllocationBarProps> = ({ startFrame = 280 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slotSpring = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const slotsCount = 20; // 20 slots * 5% = 100%

  return (
    <div
      style={{
        backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
        borderRadius: 18,
        border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
        padding: "24px 32px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.03)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Portfolio Structure
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary, margin: "2px 0 0 0" }}>
            20 Independent 5% Position Slots
          </h3>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: HIFY_LIGHT_TOKENS.brandGold }} />
            <span style={{ color: HIFY_LIGHT_TOKENS.brandGoldMuted, fontWeight: 700 }}>Single Stock Max (5%)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle, border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}` }} />
            <span style={{ color: HIFY_LIGHT_TOKENS.textMuted, fontWeight: 600 }}>Protected Capital (95%)</span>
          </div>
        </div>
      </div>

      {/* Grid of 20 discrete 5% blocks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 1fr)",
          gap: 6,
          backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
          padding: 12,
          borderRadius: 12,
          border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
        }}
      >
        {Array.from({ length: slotsCount }).map((_, i) => {
          const isAllocated = i === 0;
          const blockProgress = interpolate(
            slotSpring,
            [i * 0.03, (i + 1) * 0.03 + 0.1],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                height: 48,
                borderRadius: 6,
                backgroundColor: isAllocated
                  ? HIFY_LIGHT_TOKENS.brandGoldSubtle
                  : HIFY_LIGHT_TOKENS.surfaceCard,
                border: isAllocated
                  ? `1.5px solid ${HIFY_LIGHT_TOKENS.brandGold}`
                  : `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: blockProgress,
                transform: `scale(${interpolate(blockProgress, [0, 1], [0.85, 1])})`,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                  fontWeight: isAllocated ? 800 : 600,
                  color: isAllocated ? HIFY_LIGHT_TOKENS.brandGoldMuted : HIFY_LIGHT_TOKENS.textMuted,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: isAllocated ? HIFY_LIGHT_TOKENS.brandGoldMuted : "#A1A1AA",
                  marginTop: 2,
                }}
              >
                5%
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          color: HIFY_LIGHT_TOKENS.textSecondary,
          paddingTop: 4,
        }}
      >
        <span>
          Even if any single holding undergoes catastrophic distress, <strong>95% of total portfolio capital</strong> remains insulated.
        </span>
        <span
          style={{
            fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
            color: HIFY_LIGHT_TOKENS.metricPositive,
            fontWeight: 700,
          }}
        >
          ● DIVERSIFICATION DISCIPLINE
        </span>
      </div>
    </div>
  );
};
