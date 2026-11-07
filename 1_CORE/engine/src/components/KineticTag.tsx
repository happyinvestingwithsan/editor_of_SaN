import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SNAPPY_SPRING = {
  damping: 15,
  mass: 0.8,
  stiffness: 140,
};

export interface KineticTagProps {
  absoluteFrame?: number;
}

/**
 * Beat 1: Natural Editorial Lower-Third (Frames 0 - 137)
 * Warm, cinematic, documentary-grade financial journalism typography.
 * Zero neon glitches, zero robotic pills.
 */
export const KineticTag: React.FC<KineticTagProps> = ({ absoluteFrame }) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const frame = absoluteFrame !== undefined ? absoluteFrame : localFrame;

  // 1. Subtle top documentary kicker (Frames 0 - 47)
  const metaSpring = spring({
    frame,
    fps,
    config: SNAPPY_SPRING,
  });
  const metaY = interpolate(metaSpring, [0, 1], [-15, 0]);
  const metaOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Outro fade before Beat 2 begins at frame 137
  const sceneOutro = interpolate(frame, [130, 137], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Editorial Title Reveal at Frame 91 ("biggest IPO")
  const titleSpring = spring({
    frame: Math.max(0, frame - 91),
    fps,
    config: SNAPPY_SPRING,
  });
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);
  const titleOpacity = frame >= 91 ? interpolate(frame, [91, 98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: sceneOutro,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top documentary kicker */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          opacity: metaOpacity,
          transform: `translateY(${metaY}px)`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#94A3B8",
            textTransform: "uppercase",
            borderLeft: "3px solid #EAB308",
            paddingLeft: 10,
          }}
        >
          FINANCIAL DISPATCH • SPECIAL COVERAGE
        </span>
      </div>

      {/* Clean Editorial Lower-Third */}
      {frame >= 91 && (
        <div
          style={{
            position: "absolute",
            bottom: 90,
            left: 80,
            right: 80,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "26px 36px",
            background: "rgba(13, 17, 23, 0.94)",
            borderLeft: "5px solid #F59E0B",
            borderRadius: "0 12px 12px 0",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85)",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.18em",
              color: "#F59E0B",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            HISTORIC CAPITAL EVENT
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
              lineHeight: 1.15,
            }}
          >
            THE BIGGEST IPO IN INDIAN HISTORY
          </h1>
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: 17,
              fontWeight: 500,
              color: "#94A3B8",
            }}
          >
            Reliance Jio Platforms Ltd • ₹30,213 Crore DRHP Prospectus Filed with SEBI
          </p>
        </div>
      )}
    </div>
  );
};
