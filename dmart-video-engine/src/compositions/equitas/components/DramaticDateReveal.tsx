import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface DramaticDateRevealProps {
  date: string;
  tagline: string;
  badge?: string;
  startFrame?: number;
}

export const DramaticDateReveal: React.FC<DramaticDateRevealProps> = ({
  date,
  tagline,
  badge = "ABRUPT STEP DOWN",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  const popSpring = spring({
    frame: relFrame,
    fps: 30,
    config: { damping: 14, stiffness: 140 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 48px",
        background: "#FFFFFF",
        border: `2px solid ${EQUITAS_THEME.colors.warningAmber}`,
        borderRadius: 24,
        boxShadow: "0 20px 45px -10px rgba(217, 119, 6, 0.20)",
        fontFamily: EQUITAS_THEME.fonts.display,
        opacity: popSpring,
        transform: `scale(${interpolate(popSpring, [0, 1], [0.85, 1])})`,
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: "3px",
          color: EQUITAS_THEME.colors.warningAmber,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {badge}
      </div>

      <div
        style={{
          fontSize: 54, // Large bold for mobile
          fontWeight: 900,
          color: EQUITAS_THEME.colors.textPrimary,
          marginBottom: 8,
          lineHeight: 1,
        }}
      >
        {date}
      </div>

      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: EQUITAS_THEME.colors.warningAmber,
        }}
      >
        {tagline}
      </div>
    </div>
  );
};
