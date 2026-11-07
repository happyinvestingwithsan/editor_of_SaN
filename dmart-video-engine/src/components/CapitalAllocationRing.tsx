import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HIFY_LIGHT_TOKENS } from "../theme";

interface CapitalAllocationRingProps {
  totalCapital?: number; // default 1000000
  allocationPercent?: number; // default 5
  startFrame?: number;
  highlightFrame?: number;
}

export const CapitalAllocationRing: React.FC<CapitalAllocationRingProps> = ({
  totalCapital = 1000000,
  allocationPercent = 5,
  startFrame = 45,
  highlightFrame = 260,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const highlightSpring = spring({
    frame: frame - highlightFrame,
    fps,
    config: { damping: 12, stiffness: 110 },
  });

  // Numbers reveal
  const animatedCapital =
    entrance >= 0.99
      ? totalCapital
      : Math.floor(
          interpolate(entrance, [0, 1], [0, totalCapital], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        );

  const allocationAmount = (totalCapital * allocationPercent) / 100;
  const animatedAllocation =
    frame < highlightFrame
      ? 0
      : highlightSpring >= 0.99
      ? allocationAmount
      : Math.floor(
          interpolate(highlightSpring, [0, 1], [0, allocationAmount], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        );

  // SVG Ring Calculations
  const size = 200;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 5% slice arc length
  const targetPercent = allocationPercent / 100;
  const fillProgress = interpolate(highlightSpring, [0, 1], [0, targetPercent], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strokeDashoffset = circumference * (1 - fillProgress);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
        borderRadius: 18,
        border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
        padding: "24px 32px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              padding: "3px 8px",
              borderRadius: 6,
              backgroundColor: HIFY_LIGHT_TOKENS.brandGoldSubtle,
              border: `1px solid ${HIFY_LIGHT_TOKENS.brandGold}`,
              fontSize: 11,
              fontWeight: 800,
              color: HIFY_LIGHT_TOKENS.brandGoldMuted,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Portfolio Ceiling
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: HIFY_LIGHT_TOKENS.textMuted }}>
            Maximum Risk Boundary
          </span>
        </div>

        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: HIFY_LIGHT_TOKENS.textPrimary,
            fontFamily: HIFY_LIGHT_TOKENS.fonts.ui,
            margin: "4px 0 2px 0",
            letterSpacing: "-0.02em",
          }}
        >
          The 5% Capital Allocation Rule
        </h2>

        <p
          style={{
            fontSize: 14,
            color: HIFY_LIGHT_TOKENS.textSecondary,
            margin: 0,
            lineHeight: 1.45,
            maxWidth: 620,
          }}
        >
          For any large-scale company, only 5% is the maximum capital allocation limit. This boundary prevents concentrated ruin regardless of how lucrative an opportunity appears.
        </p>

        {/* Monetary Summary */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: 12,
            padding: "10px 16px",
            borderRadius: 10,
            backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
            border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: HIFY_LIGHT_TOKENS.textMuted, fontWeight: 700 }}>
              TOTAL PORTFOLIO
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                color: HIFY_LIGHT_TOKENS.textPrimary,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ₹{animatedCapital.toLocaleString("en-IN")}
            </div>
          </div>

          <div style={{ fontSize: 16, color: HIFY_LIGHT_TOKENS.textMuted, fontWeight: 600 }}>×</div>

          <div>
            <div style={{ fontSize: 11, color: HIFY_LIGHT_TOKENS.brandGoldMuted, fontWeight: 700 }}>
              MAX ALLOCATION
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                color: HIFY_LIGHT_TOKENS.brandGoldMuted,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              5.0%
            </div>
          </div>

          <div style={{ fontSize: 16, color: HIFY_LIGHT_TOKENS.textMuted, fontWeight: 600 }}>=</div>

          <div>
            <div style={{ fontSize: 11, color: HIFY_LIGHT_TOKENS.metricPositive, fontWeight: 700 }}>
              ALLOCATION LIMIT
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                color: HIFY_LIGHT_TOKENS.metricPositive,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ₹{animatedAllocation.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      {/* Circular Allocation Ring Graphic */}
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* Neutral Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={HIFY_LIGHT_TOKENS.borderSubtle}
            strokeWidth={strokeWidth}
          />
          {/* Active 5% Segment */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={HIFY_LIGHT_TOKENS.brandGold}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Percentage Display */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 34,
              fontWeight: 900,
              fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
              color: HIFY_LIGHT_TOKENS.textPrimary,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            5%
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: HIFY_LIGHT_TOKENS.brandGoldMuted,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginTop: 4,
            }}
          >
            Max Cap
          </span>
        </div>
      </div>
    </div>
  );
};
