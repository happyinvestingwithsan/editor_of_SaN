import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface UIRippleHighlightProps {
  x?: number;
  y?: number;
  startFrame?: number;
  durationFrames?: number;
  color?: string;
  label?: string;
}

export const UIRippleHighlight: React.FC<UIRippleHighlightProps> = ({
  x = 1000,
  y = 1435,
  startFrame = 670,
  durationFrames = 40,
  color = "#00D09C", // Groww Mint Green
  label = "TAP TO ACTIVATE",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  // Entrance spring for label/pointer
  const entrance = spring({
    frame: elapsed,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Looping radar ripple (period = 20 frames)
  const rippleProgress1 = (elapsed % 24) / 24;
  const rippleRadius1 = interpolate(rippleProgress1, [0, 1], [10, 65]);
  const rippleOpacity1 = interpolate(rippleProgress1, [0, 0.7, 1], [0.85, 0.4, 0]);

  const rippleProgress2 = ((elapsed + 12) % 24) / 24;
  const rippleRadius2 = interpolate(rippleProgress2, [0, 1], [10, 65]);
  const rippleOpacity2 = interpolate(rippleProgress2, [0, 0.7, 1], [0.85, 0.4, 0]);

  // Overall exit fade in final 6 frames
  const exitProgress = interpolate(
    frame - (startFrame + durationFrames - 6),
    [0, 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const overallOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 45,
        opacity: overallOpacity,
      }}
    >
      {/* Radar Ripple Waves */}
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        style={{
          position: "absolute",
          left: -80,
          top: -80,
          overflow: "visible",
        }}
      >
        {/* Ripple 1 */}
        <circle
          cx="80"
          cy="80"
          r={rippleRadius1}
          fill="none"
          stroke={color}
          strokeWidth="3"
          opacity={rippleOpacity1}
        />
        {/* Ripple 2 */}
        <circle
          cx="80"
          cy="80"
          r={rippleRadius2}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          opacity={rippleOpacity2}
        />

        {/* Central Glowing Pulse Core */}
        <circle cx="80" cy="80" r="16" fill={color} opacity="0.3" />
        <circle cx="80" cy="80" r="8" fill={color} />
        <circle cx="80" cy="80" r="4" fill="#FFFFFF" />
      </svg>

      {/* Directing Focus Callout Label */}
      <div
        style={{
          position: "absolute",
          right: 70,
          top: -18,
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: "#0B0F17",
          border: `1.5px solid ${color}`,
          borderRadius: 100,
          padding: "8px 16px",
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.7), 0 0 16px ${color}66`,
          transform: `scale(${entrance})`,
          opacity: entrance,
          whiteSpace: "nowrap",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 900,
            color,
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 16,
            color: "#FFFFFF",
            fontWeight: 900,
          }}
        >
          ➔
        </span>
      </div>
    </div>
  );
};
