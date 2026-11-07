import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EDITORIAL_TOKENS } from "../theme/editorialTokens";

export interface EditorialHeadlineBadgeProps {
  /** Top classification tag, e.g. "CRISIS ALERT" or "SEBI FORENSIC DOSSIER" */
  category?: string;
  /** Primary headline title, e.g. "EQUITAS SMALL FINANCE BANK" */
  title: string;
  /** Explanatory sub-premise, e.g. "48 HOURS: 34% MARKET VALUATION WIPEOUT" */
  subtitle?: string;
  /** Tone accent: "crimson" | "emerald" | "brass" | "neutral" */
  tone?: "crimson" | "emerald" | "brass" | "neutral";
  /** Maximum width (default: 960) */
  maxWidth?: number;
  /** Optional container style */
  style?: React.CSSProperties;
}

/**
 * EditorialHeadlineBadge:
 * Restrained, high-impact editorial title badge for documentary chapters.
 * 
 * Features:
 * - High-contrast obsidian ink (#0F172A) on warm ivory background.
 * - Architectural hairline borders and category indicator dot.
 * - Strictly bounded vertical footprint (~100-110px height).
 * - Zero glowing neon dropshadows or website pill clutter.
 */
export const EditorialHeadlineBadge: React.FC<EditorialHeadlineBadgeProps> = ({
  category = "FORENSIC CASE STUDY",
  title,
  subtitle,
  tone = "crimson",
  maxWidth = 960,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: EDITORIAL_TOKENS.springs.documentSlide,
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [25, 0]);

  const accentColor =
    tone === "emerald"
      ? EDITORIAL_TOKENS.colors.emerald
      : tone === "brass"
      ? EDITORIAL_TOKENS.colors.brass
      : tone === "neutral"
      ? EDITORIAL_TOKENS.colors.inkSlate
      : EDITORIAL_TOKENS.colors.crimson;

  const tintColor =
    tone === "emerald"
      ? EDITORIAL_TOKENS.colors.emeraldTint
      : tone === "brass"
      ? EDITORIAL_TOKENS.colors.brassTint
      : tone === "neutral"
      ? "rgba(15, 23, 42, 0.05)"
      : EDITORIAL_TOKENS.colors.crimsonTint;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        maxWidth,
        margin: "0 auto",
        padding: "16px 24px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(4px)",
        borderRadius: 6,
        border: `1px solid ${EDITORIAL_TOKENS.colors.borderMedium}`,
        borderLeft: `5px solid ${accentColor}`,
        boxShadow: EDITORIAL_TOKENS.shadows.paperFlat,
        transform: `translateY(${translateY}px)`,
        opacity,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* Category Tag */}
      {category && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: EDITORIAL_TOKENS.fonts.monoData,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accentColor,
            backgroundColor: tintColor,
            padding: "2px 8px",
            borderRadius: 3,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: accentColor,
            }}
          />
          <span>{category}</span>
        </div>
      )}

      {/* Main Title */}
      <h2
        style={{
          fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
          fontSize: EDITORIAL_TOKENS.typography1080p.sectionHeader,
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: EDITORIAL_TOKENS.colors.inkCharcoal,
          margin: 0,
        }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <span
          style={{
            fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
            fontSize: EDITORIAL_TOKENS.typography1080p.bodyText,
            fontWeight: 600,
            color: EDITORIAL_TOKENS.colors.inkMuted,
            letterSpacing: "0.01em",
            marginTop: 4,
            display: "block",
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};
