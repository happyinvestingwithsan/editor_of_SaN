import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface CinematicChapterTransitionProps {
  chapterNumber: string;
  title: string;
  subtitle?: string;
  startFrame?: number;
}

export const CinematicChapterTransition: React.FC<
  CinematicChapterTransitionProps
> = ({ chapterNumber, title, subtitle, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  const wipeSpring = spring({
    frame: relFrame,
    fps: 30,
    config: { damping: 20, stiffness: 100 },
  });

  const textSpring = spring({
    frame: Math.max(0, relFrame - 10),
    fps: 30,
    config: { damping: 18, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: EQUITAS_THEME.colors.canvasBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: EQUITAS_THEME.fonts.display,
        zIndex: 50,
        opacity: wipeSpring,
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: "4px",
          color: EQUITAS_THEME.colors.primaryTeal,
          textTransform: "uppercase",
          marginBottom: 20,
          background: "#FFFFFF",
          border: `1.5px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
          padding: "10px 28px",
          borderRadius: 30,
          opacity: textSpring,
          transform: `translateY(${interpolate(textSpring, [0, 1], [-15, 0])}px)`,
          boxShadow: EQUITAS_THEME.shadows.card,
        }}
      >
        {chapterNumber}
      </div>

      <div
        style={{
          fontSize: 64, // Large bold black for mobile
          fontWeight: 900,
          color: EQUITAS_THEME.colors.textPrimary,
          letterSpacing: "-1px",
          textAlign: "center",
          maxWidth: 960,
          lineHeight: 1.15,
          opacity: textSpring,
          transform: `translateY(${interpolate(textSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        {title}
      </div>

      {subtitle && (
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: EQUITAS_THEME.colors.textSecondary,
            marginTop: 20,
            textAlign: "center",
            opacity: textSpring,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
