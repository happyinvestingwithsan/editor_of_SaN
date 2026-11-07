import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const OpeningHeading: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 15 to 145
  if (frame < 15 || frame > 145) {
    return null;
  }

  const enterSpring = spring({
    frame: frame - 15,
    fps: 30,
    config: { damping: 16, stiffness: 100 },
  });

  const exitProgress = interpolate(frame, [130, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 80,
        backgroundColor: OUTRO_THEME.colors.cardBg,
        borderRadius: 20,
        padding: "16px 28px",
        boxShadow: OUTRO_THEME.shadows.cardElevated,
        border: `1.5px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        fontFamily: OUTRO_THEME.fonts.heading,
        zIndex: 25,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: OUTRO_THEME.colors.primaryTeal,
          boxShadow: OUTRO_THEME.shadows.glowTeal,
        }}
      />
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: OUTRO_THEME.colors.primaryTeal,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Equitas Small Finance Bank
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: OUTRO_THEME.colors.mainText,
            letterSpacing: "0.02em",
          }}
        >
          MY PERSONAL INVESTMENT THESIS
        </div>
      </div>
    </div>
  );
};
