import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface OutroVerifiedBadgeProps {
  startFrame?: number;
  durationFrames?: number;
  title?: string;
  subtitle?: string;
}

export const OutroVerifiedBadge: React.FC<OutroVerifiedBadgeProps> = ({
  startFrame = 894,
  durationFrames = 156, // frames 894 to 1050
  title = "✔ SEBI REGISTERED & RBI LRS COMPLIANT",
  subtitle = "DIRECT US INVESTING • 100% REGULATED",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  // Bouncy spring slam entrance
  const slamSpring = spring({
    frame: elapsed,
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Scale down from 1.6 to 1.0 (slam onto canvas)
  const scale = interpolate(slamSpring, [0, 1], [1.6, 1.0]);

  // Gentle floating pulse after impact
  const floatY = Math.sin(elapsed / 12) * 4;

  // Exit animation in final 10 frames
  const exitProgress = interpolate(
    frame - (startFrame + durationFrames - 10),
    [0, 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = interpolate(exitProgress, [0, 1], [Math.min(1, slamSpring * 1.5), 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 280,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 42,
        opacity,
        transform: `translateY(${floatY}px) scale(${scale}) rotate(-1.5deg)`,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(11, 15, 23, 0.94)",
          backdropFilter: "blur(16px)",
          border: "2px solid #00D09C",
          borderRadius: 16,
          padding: "20px 36px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 208, 156, 0.35)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          textAlign: "center",
        }}
      >
        {/* Stamp Label */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#00D09C",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textShadow: "0 0 20px rgba(0, 208, 156, 0.6)",
          }}
        >
          {title}
        </div>

        {/* Subtitle / Verification Tag */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#94A3B8",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
};
