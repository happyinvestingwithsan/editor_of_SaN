import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EDITORIAL_TOKENS } from "../theme/editorialTokens";

export interface EditorialStatCardProps {
  /** Metric category label, e.g. "48-HOUR DRAWDOWN" or "TOTAL VALUATION LOSS" */
  label: string;
  /** Primary metric value display, e.g. "-34%" or "₹30,213 Cr" */
  value: string | number;
  /** Numeric value for animated counter (optional) */
  numericValue?: number;
  /** Prefix for numeric counter (e.g. "₹" or "-") */
  prefix?: string;
  /** Suffix for numeric counter (e.g. "%" or " Cr") */
  suffix?: string;
  /** Subtitle or forensic breakdown, e.g. "DAY 1: -20% | DAY 2: -14% SELL-OFF" */
  breakdown?: string;
  /** Institutional tone: "crimson" (loss/alert), "emerald" (growth/recovery), or "neutral" */
  tone?: "crimson" | "emerald" | "neutral" | "brass";
  /** Tag badge in top right, e.g. "52-WK LOW", "NSE", "AUDITED" */
  badgeText?: string;
  /** Counter animation duration in frames (default: 35) */
  counterFrames?: number;
  /** Maximum container width (default: 920) */
  maxWidth?: number;
  /** Optional container style override */
  style?: React.CSSProperties;
}

/**
 * EditorialStatCard:
 * Clean, institutional financial metric display on crisp archival bond paper.
 * 
 * Features:
 * - Crisp bond paper surface (#FFFFFF) with multi-tiered physical desk shadows.
 * - Restrained institutional typography (charcoal labels, mono numeric data).
 * - Animated numerical counter with smooth mathematical easing.
 * - Status indicator pill with subdued institutional tint (zero neon gradients).
 * - Strictly budgeted vertical footprint (fits safely within the 860px safe height).
 */
export const EditorialStatCard: React.FC<EditorialStatCardProps> = ({
  label,
  value,
  numericValue,
  prefix = "",
  suffix = "",
  breakdown,
  tone = "crimson",
  badgeText,
  counterFrames = 35,
  maxWidth = 920,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: EDITORIAL_TOKENS.springs.documentSlide,
  });

  const translateY = interpolate(entrance, [0, 1], [35, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Color mapping based on tone
  const accentColor =
    tone === "emerald"
      ? EDITORIAL_TOKENS.colors.emerald
      : tone === "brass"
      ? EDITORIAL_TOKENS.colors.brass
      : tone === "neutral"
      ? EDITORIAL_TOKENS.colors.inkCharcoal
      : EDITORIAL_TOKENS.colors.crimson;

  const tintColor =
    tone === "emerald"
      ? EDITORIAL_TOKENS.colors.emeraldTint
      : tone === "brass"
      ? EDITORIAL_TOKENS.colors.brassTint
      : tone === "neutral"
      ? "rgba(15, 23, 42, 0.05)"
      : EDITORIAL_TOKENS.colors.crimsonTint;

  const borderColor =
    tone === "emerald"
      ? EDITORIAL_TOKENS.colors.emeraldBorder
      : tone === "brass"
      ? EDITORIAL_TOKENS.colors.brassBorder
      : tone === "neutral"
      ? EDITORIAL_TOKENS.colors.borderMedium
      : EDITORIAL_TOKENS.colors.crimsonBorder;

  // Animated counter calculation if numericValue provided
  let displayValue: string | number = value;
  if (numericValue !== undefined) {
    const progress = interpolate(frame, [0, counterFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const currentVal = Math.round(numericValue * progress);
    displayValue = `${prefix}${Math.abs(currentVal)}${suffix}`;
    if (numericValue < 0 && !prefix.includes("-")) {
      displayValue = `-${displayValue}`;
    }
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth,
        margin: "0 auto",
        backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
        borderRadius: 8,
        border: `1.5px solid ${borderColor}`,
        boxShadow: EDITORIAL_TOKENS.shadows.paperElevated,
        padding: "26px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transform: `translateY(${translateY}px)`,
        opacity,
        fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* Top Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${EDITORIAL_TOKENS.colors.dividerRule}`,
          paddingBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: accentColor,
            }}
          />
          <span
            style={{
              fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
              fontSize: EDITORIAL_TOKENS.typography1080p.cardSubheading,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: EDITORIAL_TOKENS.colors.inkCharcoal,
            }}
          >
            {label}
          </span>
        </div>

        {badgeText && (
          <span
            style={{
              fontFamily: EDITORIAL_TOKENS.fonts.monoData,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: 4,
              backgroundColor: tintColor,
              color: accentColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Hero Metric & Breakdown Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: EDITORIAL_TOKENS.fonts.monoData,
              fontSize: EDITORIAL_TOKENS.typography1080p.heroMetric,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: accentColor,
              display: "block",
            }}
          >
            {displayValue}
          </span>
        </div>

        {breakdown && (
          <div
            style={{
              fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
              fontSize: EDITORIAL_TOKENS.typography1080p.bodyText,
              fontWeight: 600,
              color: EDITORIAL_TOKENS.colors.inkMuted,
              textAlign: "right",
              maxWidth: 480,
              lineHeight: 1.35,
            }}
          >
            {breakdown}
          </div>
        )}
      </div>
    </div>
  );
};
