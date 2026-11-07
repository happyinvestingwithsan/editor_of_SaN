import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface HeadlineBadgeProps {
  /** Small category pill, e.g. "SEBI DRHP SPECIAL INVESTIGATION" */
  category?: string;
  /** Primary bold headline */
  title: string;
  /** Optional secondary explanatory line */
  subtitle?: string;
  /** Optional stamp overlay (e.g. "AVOID", "TRAP", "APPLY", "WHALE MOVE") */
  stamp?: {
    text: string;
    type?: "negative" | "positive" | "warning";
    delayFrames?: number;
  };
}

export const HeadlineBadge: React.FC<HeadlineBadgeProps> = ({
  category,
  title,
  subtitle,
  stamp,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: SAN_TOKENS.springs.snappy,
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [30, 0]);

  // Stamp physics
  const stampDelay = stamp?.delayFrames ?? 15;
  const stampProgress = spring({
    frame: frame - stampDelay,
    fps,
    config: SAN_TOKENS.springs.heavy,
  });
  const stampScale = interpolate(stampProgress, [0, 1], [2.5, 1]);
  const stampOpacity = interpolate(stampProgress, [0, 0.5, 1], [0, 1, 1]);

  const stampColor =
    stamp?.type === "positive"
      ? SAN_TOKENS.colors.positive
      : stamp?.type === "warning"
      ? SAN_TOKENS.colors.warning
      : SAN_TOKENS.colors.negative;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px 32px",
        opacity,
        transform: `translateY(${translateY}px)`,
        position: "relative",
      }}
    >
      {category && (
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: SAN_TOKENS.colors.gold,
            backgroundColor: SAN_TOKENS.colors.goldSubtle,
            border: `1.5px solid ${SAN_TOKENS.colors.gold}`,
            padding: "8px 24px",
            borderRadius: 999,
            marginBottom: 20,
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.25)",
          }}
        >
          {category}
        </div>
      )}

      <h1
        style={{
          fontSize: 60,
          fontWeight: 900,
          lineHeight: 1.15,
          color: SAN_TOKENS.colors.textPrimary,
          margin: 0,
          textShadow: "0 4px 30px rgba(0, 0, 0, 0.8)",
          fontFamily: SAN_TOKENS.fonts.display,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: SAN_TOKENS.colors.textSecondary,
            margin: "16px 0 0 0",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      )}

      {stamp && frame >= stampDelay && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(-12deg) scale(${stampScale})`,
            opacity: stampOpacity,
            border: `6px solid ${stampColor}`,
            color: stampColor,
            padding: "12px 36px",
            borderRadius: 16,
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            backgroundColor: "rgba(11, 15, 25, 0.92)",
            boxShadow: `0 0 40px ${stampColor}66`,
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          {stamp.text}
        </div>
      )}
    </div>
  );
};
