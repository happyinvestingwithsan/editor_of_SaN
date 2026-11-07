import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneAProps {
  relativeFrame: number; // 0 to 420
}

export const SceneA_SurgeCard: React.FC<SceneAProps> = ({ relativeFrame }) => {
  // Reveal starts at frame 245 (approx 8.1s) when SaN says "surged almost 11.6%"
  if (relativeFrame < 240) return null;

  const enterSpring = spring({
    frame: relativeFrame - 245,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Fade out smoothly between frame 380 and 415
  const exitOpacity = interpolate(relativeFrame, [380, 415], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [50, 0]);
  const scale = interpolate(enterSpring, [0, 1], [0.92, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  // Restrained count-up: 0% -> 11.6%
  const countUp = interpolate(enterSpring, [0, 1], [0, 11.6]);
  const displayNum = `+${countUp.toFixed(1)}%`;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        right: 80,
        width: 820,
        height: 240,
        backgroundColor: RELIANCE_THEME.colors.white,
        borderRadius: RELIANCE_THEME.layout.borderRadius,
        border: `2px solid ${RELIANCE_THEME.colors.cardBorderStrong}`,
        boxShadow: RELIANCE_THEME.shadows.floating,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 48px",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        zIndex: 50,
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            backgroundColor: RELIANCE_THEME.colors.positiveBg,
            border: `1.5px solid ${RELIANCE_THEME.colors.positiveBorder}`,
            borderRadius: 8,
            padding: "4px 14px",
            color: RELIANCE_THEME.colors.deepTeal,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          SINGLE TRADING SESSION
        </div>
        <div
          style={{
            color: RELIANCE_THEME.colors.secondaryText,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          RELIANCE INDUSTRIES
        </div>
      </div>

      {/* Hero Stat & Trend */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 24,
        }}
      >
        <span
          style={{
            fontSize: RELIANCE_THEME.typography.importantNumber,
            fontWeight: 900,
            color: RELIANCE_THEME.colors.primaryTeal,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            fontFamily: RELIANCE_THEME.fonts.monoData,
          }}
        >
          {displayNum}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: RELIANCE_THEME.colors.positive,
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
          <span>HISTORIC SINGLE-DAY RALLY</span>
        </div>
      </div>
    </div>
  );
};
