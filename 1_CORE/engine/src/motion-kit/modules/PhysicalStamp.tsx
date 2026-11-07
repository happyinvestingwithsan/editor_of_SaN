import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EDITORIAL_TOKENS } from "../theme/editorialTokens";

export interface PhysicalStampProps {
  /** Primary stamp text, e.g. "52-WK LOW", "CRISIS TRAP", "APPLY", "AVOID" */
  text: string;
  /** Secondary classification subtext, e.g. "FORENSIC AUDIT // VERIFIED" */
  subText?: string;
  /** Color tone: "crimson" (negative/warning), "emerald" (positive/framework), or "brass" (neutral/attention) */
  tone?: "crimson" | "emerald" | "brass";
  /** Exact custom color override */
  customColor?: string;
  /** Natural stamping angle in degrees (default: -8) */
  rotationAngle?: number;
  /** Frame at which the stamp hits the paper */
  triggerFrame?: number;
  /** Font size for primary text (default: 38) */
  fontSize?: number;
  /** Optional container style override */
  style?: React.CSSProperties;
}

/**
 * PhysicalStamp:
 * Authentic rubber ink stamp pressed onto paper.
 * 
 * Features:
 * - Transparent background with mixBlendMode: multiply (absorbs into paper/clipping).
 * - Authentic double-line rubber stamp border with distressed ink look.
 * - Heavy physical downward slam physics (scale 2.2 -> 1.0 with micro-rebound).
 * - Restrained institutional ink tones (Carmine Crimson #B91C1C, Forest Emerald #15803D).
 * - Zero glowing neon dropshadows or website card wrappers.
 */
export const PhysicalStamp: React.FC<PhysicalStampProps> = ({
  text,
  subText,
  tone = "crimson",
  customColor,
  rotationAngle = -8,
  triggerFrame = 0,
  fontSize = 38,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - triggerFrame);
  if (frame < triggerFrame) return null;

  // Heavy tactile stamp slam spring
  const slamProgress = spring({
    frame: relFrame,
    fps,
    config: EDITORIAL_TOKENS.springs.stampSlam,
  });

  const scale = interpolate(slamProgress, [0, 1], [2.2, 1.0]);
  const opacity = interpolate(slamProgress, [0, 0.2, 1], [0, 1, 1]);
  const translateY = interpolate(slamProgress, [0, 1], [-25, 0]);

  // Determine ink color
  const inkColor =
    customColor ??
    (tone === "emerald"
      ? EDITORIAL_TOKENS.colors.emerald
      : tone === "brass"
      ? EDITORIAL_TOKENS.colors.brass
      : EDITORIAL_TOKENS.colors.crimson);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotationAngle}deg)`,
        opacity,
        mixBlendMode: "multiply", // Absorbs directly into paper grain
        pointerEvents: "none",
        ...style,
      }}
    >
      {/* Outer Weathered Rubber Frame */}
      <div
        style={{
          border: `3.5px solid ${inkColor}`,
          padding: "8px 24px",
          borderRadius: 6,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)", // Subtle porous ink bleed
          boxShadow: EDITORIAL_TOKENS.shadows.stampPress,
        }}
      >
        {/* Inner Fine Border */}
        <div
          style={{
            position: "absolute",
            inset: 3,
            border: `1.2px solid ${inkColor}`,
            borderRadius: 3,
            pointerEvents: "none",
            opacity: 0.85,
          }}
        />

        {/* Primary Stamp Word */}
        <span
          style={{
            fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
            fontSize,
            fontWeight: 900,
            color: inkColor,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            textAlign: "center",
            display: "block",
            padding: "2px 8px",
          }}
        >
          {text}
        </span>

        {/* Optional Secondary Classification Line */}
        {subText && (
          <span
            style={{
              fontFamily: EDITORIAL_TOKENS.fonts.monoData,
              fontSize: Math.max(11, Math.round(fontSize * 0.28)),
              fontWeight: 700,
              color: inkColor,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginTop: 3,
              borderTop: `1px solid ${inkColor}`,
              paddingTop: 3,
              display: "block",
              width: "100%",
              textAlign: "center",
              opacity: 0.9,
            }}
          >
            {subText}
          </span>
        )}
      </div>
    </div>
  );
};
