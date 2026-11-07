import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface CinematicTitleProps {
  line1: string;
  line2?: string;
  category?: string;
  startFrame?: number;
  variant?: "dark" | "light";
}

export const CinematicTitle: React.FC<CinematicTitleProps> = ({
  line1,
  line2,
  category,
  startFrame = 0,
  variant = "dark",
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  const catSpring = spring({
    frame: relFrame,
    fps: 30,
    config: { damping: 18, stiffness: 120 },
  });

  const line1Spring = spring({
    frame: Math.max(0, relFrame - 8),
    fps: 30,
    config: { damping: 18, stiffness: 120 },
  });

  const line2Spring = spring({
    frame: Math.max(0, relFrame - 16),
    fps: 30,
    config: { damping: 18, stiffness: 120 },
  });

  const catY = interpolate(catSpring, [0, 1], [-20, 0]);
  const line1Y = interpolate(line1Spring, [0, 1], [30, 0]);
  const line2Y = interpolate(line2Spring, [0, 1], [30, 0]);

  const isDark = variant === "dark";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {category && (
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "4px",
            color: isDark ? "#38BDF8" : EQUITAS_THEME.colors.primaryTeal,
            textTransform: "uppercase",
            marginBottom: 16,
            opacity: catSpring,
            transform: `translateY(${catY}px)`,
            background: isDark ? "rgba(15, 23, 42, 0.85)" : "#FFFFFF",
            border: isDark
              ? "1.5px solid rgba(56, 189, 248, 0.4)"
              : `1.5px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
            padding: "8px 26px",
            borderRadius: 30,
            boxShadow: isDark
              ? "0 8px 30px rgba(0, 0, 0, 0.6)"
              : EQUITAS_THEME.shadows.card,
            backdropFilter: isDark ? "blur(12px)" : "none",
          }}
        >
          {category}
        </div>
      )}

      <div
        style={{
          fontSize: 84, // Punchy large for mobile readability
          fontWeight: 900,
          color: isDark ? "#FFFFFF" : EQUITAS_THEME.colors.textPrimary,
          letterSpacing: "-1px",
          lineHeight: 1.15,
          opacity: line1Spring,
          transform: `translateY(${line1Y}px)`,
          textShadow: isDark
            ? "0 10px 40px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.8)"
            : "none",
        }}
      >
        {line1}
      </div>

      {line2 && (
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: isDark ? "#38BDF8" : EQUITAS_THEME.colors.primaryTeal,
            letterSpacing: "-1px",
            lineHeight: 1.15,
            opacity: line2Spring,
            transform: `translateY(${line2Y}px)`,
            textShadow: isDark
              ? "0 0 45px rgba(56, 189, 248, 0.6), 0 10px 30px rgba(0, 0, 0, 0.8)"
              : "none",
          }}
        >
          {line2}
        </div>
      )}
    </div>
  );
};
