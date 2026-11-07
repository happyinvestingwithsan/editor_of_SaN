import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HIFY_LIGHT_TOKENS } from "../theme";

interface CapitalReserveProps {
  startFrame?: number;
}

export const CapitalReserve: React.FC<CapitalReserveProps> = ({ startFrame = 800 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const barFill = interpolate(entrance, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
        transform: `translateY(${interpolate(entrance, [0, 1], [15, 0])}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 800, color: HIFY_LIGHT_TOKENS.metricPositive, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Capital Capacity Allocation
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary, margin: "2px 0 0 0" }}>
            Deployed Scout vs Capital Reserve
          </h3>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 12, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: HIFY_LIGHT_TOKENS.metricPositive }} />
            <span style={{ fontWeight: 700, color: HIFY_LIGHT_TOKENS.metricPositive }}>Deployed: 1.0% (₹10,000)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: HIFY_LIGHT_TOKENS.brandGold }} />
            <span style={{ fontWeight: 700, color: HIFY_LIGHT_TOKENS.brandGoldMuted }}>Reserve Ammo: 4.0% (₹40,000)</span>
          </div>
        </div>
      </div>

      {/* Visual Capacity Bar */}
      <div
        style={{
          height: 32,
          borderRadius: 8,
          backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
          border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
          display: "flex",
          overflow: "hidden",
          padding: 3,
        }}
      >
        {/* Deployed 1% (20% of the 5% max cap) */}
        <div
          style={{
            width: `${20 * barFill}%`,
            backgroundColor: HIFY_LIGHT_TOKENS.metricPositive,
            borderRadius: "6px 0 0 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontSize: 11,
            fontWeight: 800,
            fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          1% Deployed
        </div>

        {/* Reserve 4% (80% of the 5% max cap) */}
        <div
          style={{
            width: `${80 * barFill}%`,
            backgroundColor: "rgba(200, 169, 81, 0.25)",
            border: `1px dashed ${HIFY_LIGHT_TOKENS.brandGold}`,
            borderRadius: "0 6px 6px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: HIFY_LIGHT_TOKENS.brandGoldMuted,
            fontSize: 11,
            fontWeight: 800,
            fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          4% Reserved Ammo (₹40,000 Capacity Available)
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: HIFY_LIGHT_TOKENS.textSecondary }}>
        <span>
          Preserving <strong>80% of the position budget</strong> allows methodical accumulation if valuation compresses further.
        </span>
        <span style={{ color: HIFY_LIGHT_TOKENS.brandGoldMuted, fontWeight: 700 }}>
          PREVENTS FOMO ALL-IN RISK
        </span>
      </div>
    </div>
  );
};
