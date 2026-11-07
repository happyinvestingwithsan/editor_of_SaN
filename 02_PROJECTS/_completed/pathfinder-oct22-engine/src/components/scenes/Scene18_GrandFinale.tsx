import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene18_GrandFinale: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Word Snap: "Thanks for your time... See you in the master class" -> Frame 4141-4196 (localFrame 141)
  const bannerSpring = spring({
    frame: localFrame - 141,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Final graceful fade out in last 25 frames (Frames 4233-4258 -> localFrame 233-258)
  const fadeOut = interpolate(localFrame, [235, 258], [1, 0], {
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
        opacity: fadeOut,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 60,
      }}
    >
      {/* Lower Third Masterclass Ribbon (Keeps SaN 100% Full Canvas Dominant!) */}
      <div
        style={{
          transform: `translateY(${(1 - bannerSpring) * 30}px) scale(${bannerSpring})`,
          opacity: bannerSpring,
          background:
            "linear-gradient(135deg, rgba(20, 26, 40, 0.96) 0%, rgba(10, 14, 22, 0.98) 100%)",
          border: `2.5px solid ${theme.colors.goldPrimary}`,
          borderRadius: 28,
          padding: "24px 56px",
          display: "flex",
          alignItems: "center",
          gap: 28,
          boxShadow: theme.shadows.goldCard,
        }}
      >
        <span style={{ fontSize: 42 }}>★</span>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: theme.colors.goldNeon,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            FREE LIVE MASTERCLASS
          </div>
          <div
            style={{
              color: "#FFF",
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: "-0.01em",
              marginTop: 4,
            }}
          >
            Sunday, November 1st @ 3:00 PM IST
          </div>
          <div
            style={{
              color: theme.colors.emeraldNeon,
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            Happy Investing Community • See You Inside
          </div>
        </div>
        <span style={{ fontSize: 42 }}>★</span>
      </div>
    </div>
  );
};
