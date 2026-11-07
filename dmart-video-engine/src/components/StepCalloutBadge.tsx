import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface StepCalloutBadgeProps {
  stepNumber: string;
  title: string;
  subtitle?: string;
  startFrame: number;
  durationFrames: number;
  badgeColor?: string;
  topPosition?: number;
}

export const StepCalloutBadge: React.FC<StepCalloutBadgeProps> = ({
  stepNumber,
  title,
  subtitle,
  startFrame,
  durationFrames,
  badgeColor = "#00D09C", // Groww Mint Green
  topPosition = 280, // Safe zone: clear of YouTube Shorts top header (0-240px)
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation
  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Exit animation (last 10 frames)
  const exitProgress = interpolate(
    frame - (startFrame + durationFrames - 10),
    [0, 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const opacity = interpolate(exitProgress, [0, 1], [entrance, 0]);
  const translateX = interpolate(
    entrance,
    [0, 1],
    [-60, 0]
  ) - interpolate(exitProgress, [0, 1], [0, 40]);

  return (
    <div
      style={{
        position: "absolute",
        top: topPosition,
        left: 50,
        zIndex: 40,
        opacity,
        transform: `translateX(${translateX}px)`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        backgroundColor: "rgba(11, 15, 23, 0.92)",
        backdropFilter: "blur(14px)",
        borderRadius: 100,
        padding: "10px 24px 10px 10px",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.55), 0 0 24px rgba(0, 208, 156, 0.15)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Step Pill */}
      <div
        style={{
          backgroundColor: badgeColor,
          color: "#0B0F17",
          fontWeight: 900,
          fontSize: 14,
          letterSpacing: "0.06em",
          padding: "6px 14px",
          borderRadius: 100,
          boxShadow: `0 4px 12px ${badgeColor}4D`,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span>STEP</span>
        <span style={{ fontSize: 16 }}>{stepNumber}</span>
      </div>

      {/* Title & Subtitle */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#94A3B8",
              letterSpacing: "0.02em",
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
