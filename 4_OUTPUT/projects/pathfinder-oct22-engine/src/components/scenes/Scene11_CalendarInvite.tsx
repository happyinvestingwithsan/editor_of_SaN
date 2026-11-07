import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene11_CalendarInvite: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Word Snap: "On November 1st" -> Frame 2141 (localFrame 26)
  const cardSpring = spring({
    frame: localFrame - 26,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word Snap: "Sunday 3 pm" -> Frame 2176-2189 (localFrame 61)
  const timeSpring = spring({
    frame: localFrame - 61,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  const opacity = interpolate(localFrame, [180, 198], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 780,
        top: 100,
        width: 1040,
        height: 880,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          transform: `translateY(${(1 - cardSpring) * 30}px) scale(${cardSpring})`,
          opacity: cardSpring,
          background:
            "linear-gradient(135deg, rgba(20, 26, 40, 0.96) 0%, rgba(10, 14, 22, 0.98) 100%)",
          border: `2.5px solid ${theme.colors.goldPrimary}`,
          borderRadius: 32,
          padding: "52px 60px",
          boxShadow: theme.shadows.goldCard,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 22,
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              border: `1.5px solid ${theme.colors.goldPrimary}`,
              color: theme.colors.goldNeon,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            MARK YOUR CALENDAR
          </div>
          <div
            style={{
              color: theme.colors.emeraldNeon,
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            ● LIVE SESSION
          </div>
        </div>

        <div>
          <div
            style={{
              color: "#FFF",
              fontSize: 54,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Sunday, November 1st
          </div>
          <div
            style={{
              transform: `scale(${timeSpring})`,
              opacity: timeSpring,
              color: theme.colors.goldNeon,
              fontSize: 44,
              fontWeight: 900,
              marginTop: 8,
            }}
          >
            3:00 PM – 6:00 PM IST
          </div>
        </div>

        <div
          style={{
            borderTop: "2px solid rgba(255, 255, 255, 0.15)",
            paddingTop: 24,
            color: theme.colors.textSecondary,
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.45,
          }}
        >
          A single high-focus afternoon that could fundamentally protect and compound
          your wealth-building trajectory.
        </div>
      </div>
    </div>
  );
};
