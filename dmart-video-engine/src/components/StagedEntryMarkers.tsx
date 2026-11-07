import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HIFY_LIGHT_TOKENS } from "../theme";

interface StagedEntryMarkersProps {
  startFrame?: number;
}

export const StagedEntryMarkers: React.FC<StagedEntryMarkersProps> = ({
  startFrame = 1970,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const t2Spring = spring({
    frame: frame - 2040,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const t3Spring = spring({
    frame: frame - 2160,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const stages = [
    {
      title: "Tranche 1: Initial Scout",
      condition: "At Initial Support Zone",
      allocation: "1.0% (₹10,000)",
      cumulative: "1.0% Deployed",
      status: "Active Initial Entry",
      accent: HIFY_LIGHT_TOKENS.metricPositive,
      springVal: 1,
    },
    {
      title: "Tranche 2: Staged Addition",
      condition: "If Price Falls -10% from Support",
      allocation: "+1.0% (₹10,000)",
      cumulative: "2.0% Cumulative",
      status: frame >= 2040 ? "Strategically Armed" : "Planned Condition",
      accent: HIFY_LIGHT_TOKENS.brandGold,
      springVal: frame >= 2040 ? t2Spring : 0,
    },
    {
      title: "Tranche 3: Value Expansion",
      condition: "If Price Falls -20% (Margin of Safety)",
      allocation: "Evaluate Further Allocation",
      cumulative: "Up to 5.0% Cap Limit",
      status: frame >= 2160 ? "Deep Margin Consideration" : "Planned Condition",
      accent: HIFY_LIGHT_TOKENS.brandGoldMuted,
      springVal: frame >= 2160 ? t3Spring : 0,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [15, 0])}px)`,
      }}
    >
      {stages.map((stage, i) => {
        return (
          <div
            key={i}
            style={{
              backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
              borderRadius: 16,
              border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
              padding: "20px 22px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.02)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: interpolate(stage.springVal, [0, 1], [0.65, 1]),
              transform: `scale(${interpolate(stage.springVal, [0, 1], [0.98, 1])})`,
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: stage.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Step {i + 1}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                    fontWeight: 700,
                    color: HIFY_LIGHT_TOKENS.textMuted,
                  }}
                >
                  {stage.status}
                </span>
              </div>

              <h4 style={{ fontSize: 16, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary, margin: "2px 0 6px 0" }}>
                {stage.title}
              </h4>

              <div style={{ fontSize: 12, color: HIFY_LIGHT_TOKENS.textSecondary, marginBottom: 12, lineHeight: 1.4 }}>
                {stage.condition}
              </div>
            </div>

            <div
              style={{
                backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
                borderRadius: 10,
                padding: "10px 14px",
                border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 9, color: HIFY_LIGHT_TOKENS.textMuted, fontWeight: 700 }}>
                  CONSIDERATION
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics, color: HIFY_LIGHT_TOKENS.textPrimary }}>
                  {stage.allocation}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, color: HIFY_LIGHT_TOKENS.textMuted, fontWeight: 700 }}>
                  TOTAL CAP
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics, color: stage.accent }}>
                  {stage.cumulative}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
