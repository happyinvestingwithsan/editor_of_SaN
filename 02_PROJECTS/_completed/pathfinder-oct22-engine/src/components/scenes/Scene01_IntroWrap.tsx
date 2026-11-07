import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene01_IntroWrap: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame: localFrame - 8,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word snap: "end of the video" @ frame 54-68
  const cardSpring = spring({
    frame: localFrame - 50,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  const opacity = interpolate(localFrame, [165, 185], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
      }}
    >
      {/* Top Left Branding Badge (Mobile Optimized: 24px Bold) */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          transform: `translateY(${(1 - badgeSpring) * -30}px) scale(${badgeSpring})`,
          opacity: badgeSpring,
          background: "rgba(11, 15, 25, 0.92)",
          backdropFilter: "blur(14px)",
          border: `2px solid ${theme.colors.goldPrimary}`,
          borderRadius: 36,
          padding: "16px 36px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: theme.shadows.goldCard,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: theme.colors.goldNeon,
            boxShadow: `0 0 14px ${theme.colors.goldNeon}`,
          }}
        />
        <span
          style={{
            color: theme.colors.goldNeon,
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: theme.typography.fontSans,
          }}
        >
          ★ HAPPY INVESTING PATHFINDER
        </span>
      </div>

      {/* Bottom Third Kinetic Label (Mobile Optimized: 22px Tag, 42px Headline!) */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 80,
          transform: `translateY(${(1 - cardSpring) * 30}px)`,
          opacity: cardSpring,
          background: "rgba(11, 15, 25, 0.94)",
          backdropFilter: "blur(18px)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 24,
          padding: "24px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          boxShadow: "0 25px 50px rgba(0,0,0,0.75)",
        }}
      >
        <span
          style={{
            color: theme.colors.emeraldNeon,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          PATHFINDER DEBRIEF
        </span>
        <span
          style={{
            color: "#FFF",
            fontSize: 42,
            fontWeight: 900,
            letterSpacing: "-0.01em",
          }}
        >
          Session Conclusion & Next Steps
        </span>
      </div>
    </div>
  );
};
