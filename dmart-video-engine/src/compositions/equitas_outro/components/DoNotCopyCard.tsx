import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const DoNotCopyCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 2505 to 2660
  if (frame < 2505 || frame > 2660) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - 2505,
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [2640, 2660], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: "50%",
        transform: `translate3d(-50%, ${cardTranslateY}px, 0)`,
        backgroundColor: OUTRO_THEME.colors.cardBg,
        borderRadius: 20,
        padding: "20px 40px",
        boxShadow: OUTRO_THEME.shadows.cardElevated,
        border: `2px solid ${OUTRO_THEME.colors.warning}`,
        opacity: cardOpacity,
        fontFamily: OUTRO_THEME.fonts.heading,
        zIndex: 25,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "#FEF3C7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}
      >
        ⚠️
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: OUTRO_THEME.colors.mainText,
          letterSpacing: "0.02em",
        }}
      >
        DO NOT <span style={{ color: "#D97706" }}>BLINDLY</span> COPY MY TRADE
      </div>
    </div>
  );
};
