import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface MetricOdometerProps {
  /** Target final numeric value */
  value: number;
  /** Starting numeric value (default: 0) */
  startValue?: number;
  /** Prefix string (e.g. "₹", "$") */
  prefix?: string;
  /** Suffix string (e.g. " Cr", "%", "x PE", " Lakh Cr") */
  suffix?: string;
  /** Number of decimal places to format */
  decimals?: number;
  /** Subtitle / descriptor below number */
  label?: string;
  /** Primary number color (default: SAN_TOKENS.colors.gold) */
  color?: string;
  /** Frame duration for counting animation (default: 30 frames / 1.0s) */
  durationFrames?: number;
}

export const MetricOdometer: React.FC<MetricOdometerProps> = ({
  value,
  startValue = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  color = SAN_TOKENS.colors.gold,
  durationFrames = 30,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counting interpolation
  const progress = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentVal = startValue + (value - startValue) * progress;
  const formattedVal = currentVal.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: SAN_TOKENS.springs.snappy,
  });
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: SAN_TOKENS.fonts.numbers,
          fontSize: 84,
          fontWeight: 900,
          color,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textShadow: `0 0 30px ${color}44`,
          display: "flex",
          alignItems: "baseline",
        }}
      >
        {prefix && (
          <span style={{ fontSize: 56, marginRight: 4, fontWeight: 700 }}>
            {prefix}
          </span>
        )}
        <span>{formattedVal}</span>
        {suffix && (
          <span style={{ fontSize: 50, marginLeft: 8, fontWeight: 700, color: SAN_TOKENS.colors.textSecondary }}>
            {suffix}
          </span>
        )}
      </div>

      {label && (
        <div
          style={{
            fontFamily: SAN_TOKENS.fonts.primary,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: SAN_TOKENS.colors.textMuted,
            marginTop: 12,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
