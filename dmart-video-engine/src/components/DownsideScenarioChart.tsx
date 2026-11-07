import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HIFY_LIGHT_TOKENS } from "../theme";

interface DownsideScenarioChartProps {
  startFrame?: number;
}

export const DownsideScenarioChart: React.FC<DownsideScenarioChartProps> = ({
  startFrame = 1956,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Scenario 1 trigger: -10% spoken around frame 2016-2034
  const scenario1Active = frame >= 2010;
  const s1Progress = spring({
    frame: frame - 2010,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Scenario 2 trigger: -20% spoken around frame 2158-2173
  const scenario2Active = frame >= 2150;
  const s2Progress = spring({
    frame: frame - 2150,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const width = 1140;
  const height = 280;

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
                backgroundColor: "rgba(244, 63, 94, 0.1)",
                border: `1px solid rgba(244, 63, 94, 0.3)`,
                fontSize: 11,
                fontWeight: 800,
                color: HIFY_LIGHT_TOKENS.metricNegative,
                textTransform: "uppercase",
              }}
            >
              Downside Scenarios
            </span>
            <span style={{ fontSize: 12, color: HIFY_LIGHT_TOKENS.textMuted }}>
              Staged Consideration Methodology
            </span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary, margin: 0 }}>
            Downside Scenario Pathway & Margin of Safety
          </h3>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 11, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 2, backgroundColor: HIFY_LIGHT_TOKENS.metricPositive }} />
            <span style={{ color: HIFY_LIGHT_TOKENS.textSecondary }}>Initial Support Zone</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 2, backgroundColor: HIFY_LIGHT_TOKENS.metricNegative }} />
            <span style={{ color: HIFY_LIGHT_TOKENS.metricNegative }}>Decline Scenarios (-10%, -20%)</span>
          </div>
        </div>
      </div>

      {/* SVG Scenario Canvas */}
      <div
        style={{
          width: "100%",
          height: height,
          backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
          borderRadius: 14,
          border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Subtle Horizontal Grid lines */}
          <line x1="60" y1="50" x2={width - 60} y2="50" stroke={HIFY_LIGHT_TOKENS.borderSubtle} strokeDasharray="4 4" />
          <line x1="60" y1="130" x2={width - 60} y2="130" stroke={HIFY_LIGHT_TOKENS.borderSubtle} strokeDasharray="4 4" />
          <line x1="60" y1="210" x2={width - 60} y2="210" stroke={HIFY_LIGHT_TOKENS.borderSubtle} strokeDasharray="4 4" />

          {/* Level Labels on Left */}
          <text x="50" y="54" fill={HIFY_LIGHT_TOKENS.textMuted} fontSize="11" fontFamily={HIFY_LIGHT_TOKENS.fonts.metrics} textAnchor="end">
            Base
          </text>
          <text x="50" y="134" fill={HIFY_LIGHT_TOKENS.metricNegative} fontSize="11" fontFamily={HIFY_LIGHT_TOKENS.fonts.metrics} textAnchor="end">
            -10%
          </text>
          <text x="50" y="214" fill={HIFY_LIGHT_TOKENS.metricNegative} fontSize="11" fontFamily={HIFY_LIGHT_TOKENS.fonts.metrics} textAnchor="end">
            -20%
          </text>

          {/* Conceptual Support Zone Area */}
          <rect x="80" y="16" width="200" height="22" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.25)" />
          <text x="180" y="31" fill={HIFY_LIGHT_TOKENS.metricPositive} fontSize="11" fontWeight="700" textAnchor="middle">
            Support Area / Reference Zone
          </text>

          {/* Scenario Connecting Line 1 (Base -> -10%) */}
          <path
            d="M 180 50 C 300 50, 400 130, 540 130"
            fill="none"
            stroke={HIFY_LIGHT_TOKENS.metricNegative}
            strokeWidth="2.5"
            strokeDasharray={scenario1Active ? "none" : "6 4"}
            opacity={scenario1Active ? 1 : 0.4}
          />

          {/* Scenario Connecting Line 2 (-10% -> -20%) */}
          <path
            d="M 540 130 C 660 130, 740 210, 860 210"
            fill="none"
            stroke={HIFY_LIGHT_TOKENS.metricNegative}
            strokeWidth="2.5"
            strokeDasharray={scenario2Active ? "none" : "6 4"}
            opacity={scenario2Active ? 1 : 0.4}
          />

          {/* POINT 1: Initial Entry Marker */}
          <circle cx="180" cy="50" r="8" fill={HIFY_LIGHT_TOKENS.metricPositive} stroke="#FFFFFF" strokeWidth="2.5" />
          <g transform="translate(110, 75)">
            <rect x="0" y="0" width="140" height="36" rx="6" fill={HIFY_LIGHT_TOKENS.surfaceCard} stroke={HIFY_LIGHT_TOKENS.borderHairline} />
            <text x="70" y="16" fill={HIFY_LIGHT_TOKENS.textPrimary} fontSize="11" fontWeight="800" textAnchor="middle">
              Tranche 1 (1% Scout)
            </text>
            <text x="70" y="28" fill={HIFY_LIGHT_TOKENS.textMuted} fontSize="9" textAnchor="middle">
              Initial Position
            </text>
          </g>

          {/* POINT 2: -10% Decline Marker */}
          <circle
            cx="540"
            cy="130"
            r={scenario1Active ? 9 : 6}
            fill={scenario1Active ? HIFY_LIGHT_TOKENS.brandGold : "#D4D4D8"}
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <g transform={`translate(460, ${scenario1Active ? 150 : 145})`} opacity={scenario1Active ? s1Progress : 0.5}>
            <rect
              x="0"
              y="0"
              width="160"
              height="44"
              rx="6"
              fill={HIFY_LIGHT_TOKENS.surfaceCard}
              stroke={scenario1Active ? HIFY_LIGHT_TOKENS.brandGold : HIFY_LIGHT_TOKENS.borderHairline}
            />
            <text x="80" y="18" fill={HIFY_LIGHT_TOKENS.metricNegative} fontSize="11" fontWeight="800" textAnchor="middle">
              -10% Price Decline
            </text>
            <text x="80" y="32" fill={HIFY_LIGHT_TOKENS.brandGoldMuted} fontSize="10" fontWeight="700" textAnchor="middle">
              Consider +1% Tranche 2
            </text>
          </g>

          {/* POINT 3: -20% Decline Marker */}
          <circle
            cx="860"
            cy="210"
            r={scenario2Active ? 10 : 6}
            fill={scenario2Active ? HIFY_LIGHT_TOKENS.metricPositive : "#D4D4D8"}
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <g transform={`translate(770, ${scenario2Active ? 135 : 140})`} opacity={scenario2Active ? s2Progress : 0.5}>
            <rect
              x="0"
              y="0"
              width="180"
              height="48"
              rx="6"
              fill={HIFY_LIGHT_TOKENS.surfaceCard}
              stroke={scenario2Active ? HIFY_LIGHT_TOKENS.metricPositive : HIFY_LIGHT_TOKENS.borderHairline}
            />
            <text x="90" y="18" fill={HIFY_LIGHT_TOKENS.metricNegative} fontSize="11" fontWeight="800" textAnchor="middle">
              -20% Price Decline
            </text>
            <text x="90" y="32" fill={HIFY_LIGHT_TOKENS.metricPositive} fontSize="11" fontWeight="800" textAnchor="middle">
              Enhanced Margin of Safety
            </text>
            <text x="90" y="43" fill={HIFY_LIGHT_TOKENS.textMuted} fontSize="9" textAnchor="middle">
              Evaluate Further Tranche
            </text>
          </g>
        </svg>
      </div>

      {/* Narrative Caveat */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: HIFY_LIGHT_TOKENS.textSecondary }}>
        <span>
          Decline percentages reflect <strong>hypothetical scenario markers</strong> from conceptual support, not guaranteed price trajectories.
        </span>
        <span style={{ fontSize: 11, color: HIFY_LIGHT_TOKENS.textMuted }}>
          * Additional allocation subject to capacity & ongoing conviction
        </span>
      </div>
    </div>
  );
};
