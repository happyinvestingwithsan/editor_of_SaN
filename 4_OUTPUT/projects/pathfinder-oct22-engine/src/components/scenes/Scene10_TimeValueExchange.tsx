import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene10_TimeValueExchange: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // localFrame 0 is global Frame 1914
  // Spans from Frame 1914 to 2313 (399 frames total)
  // Left side has persistent Facecam; this is positioned on the Right (left: 780)

  const titleSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // EXACT WORD-LEVEL SNAPPING:
  // Word Snap: "understand at cost of zero" -> Frame 2045 (localFrame 131)
  const zeroSpring = spring({
    frame: localFrame - 131,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Word Snap: "spend three hours with me" -> Frame 2095-2100 (localFrame 186)
  const hoursSpring = spring({
    frame: localFrame - 186,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Word Snap: "on November 1st" -> Frame 2141 (localFrame 227)
  const calendarDateSpring = spring({
    frame: localFrame - 227,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Word Snap: "Sunday 3 pm" -> Frame 2176-2189 (localFrame 262)
  const calendarTimeSpring = spring({
    frame: localFrame - 262,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Generous dwell time: stays 100% visible until localFrame 380 (global Frame 2294)
  // then fades out smoothly to localFrame 399 (global Frame 2313)
  // Ensures "3 HOURS" is visible continuously from Frame 2100 to 2295 (6.5 SECONDS)!
  const opacity = interpolate(localFrame, [380, 399], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 780,
        top: 80,
        width: 1060,
        height: 920,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {/* Header Pill & Title */}
      <div
        style={{
          transform: `translateY(${(1 - titleSpring) * -20}px)`,
          opacity: titleSpring,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: 20,
            background: "rgba(245, 158, 11, 0.18)",
            border: `1.5px solid ${theme.colors.goldPrimary}`,
            color: theme.colors.goldNeon,
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          THE VALUE PROPOSITION
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 50,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: "-0.02em",
          }}
        >
          What Does It Cost You?
        </h1>
      </div>

      {/* Two Comparison Metrics: Cost vs Time */}
      <div
        style={{
          background: "rgba(17, 24, 39, 0.95)",
          border: `2.5px solid ${theme.colors.goldPrimary}`,
          borderRadius: 28,
          padding: "36px 44px",
          boxShadow: theme.shadows.goldCard,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Cost of Zero (Snaps @ Frame 2045) */}
        <div
          style={{
            transform: `scale(${zeroSpring})`,
            opacity: zeroSpring,
            flex: 1,
            textAlign: "center",
            padding: "16px 20px",
            borderRadius: 20,
            background: "rgba(16, 185, 129, 0.12)",
            border: "1.5px solid rgba(16, 185, 129, 0.4)",
          }}
        >
          <div
            style={{
              color: theme.colors.emeraldNeon,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            FINANCIAL COST
          </div>
          <div
            style={{
              color: theme.colors.emeraldNeon,
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.1,
              marginTop: 4,
            }}
          >
            ₹0
          </div>
          <div
            style={{
              color: "#FFF",
              fontSize: 20,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            100% Free Masterclass
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 2,
            height: 120,
            background: "rgba(255, 255, 255, 0.15)",
          }}
        />

        {/* 3 Hours With Santosh (Snaps @ Frame 2100 on "three hours with me") */}
        <div
          style={{
            transform: `scale(${hoursSpring})`,
            opacity: hoursSpring,
            flex: 1,
            textAlign: "center",
            padding: "16px 20px",
            borderRadius: 20,
            background: "rgba(245, 158, 11, 0.15)",
            border: `2px solid ${theme.colors.goldPrimary}`,
            boxShadow: "0 0 25px rgba(245, 158, 11, 0.25)",
          }}
        >
          <div
            style={{
              color: theme.colors.goldNeon,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            YOUR INVESTMENT
          </div>
          <div
            style={{
              color: theme.colors.goldNeon,
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.1,
              marginTop: 4,
            }}
          >
            3 HOURS
          </div>
          <div
            style={{
              color: "#FFF",
              fontSize: 20,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            High-Focus Session
          </div>
        </div>
      </div>

      {/* Integrated Live Calendar Lock (Snaps on "November 1st Sunday 3 pm") */}
      <div
        style={{
          transform: `translateY(${(1 - calendarDateSpring) * 25}px)`,
          opacity: calendarDateSpring,
          background: "rgba(17, 24, 39, 0.95)",
          border: "2px solid rgba(255, 255, 255, 0.25)",
          borderRadius: 28,
          padding: "28px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 18px",
              borderRadius: 16,
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              border: `1.5px solid ${theme.colors.goldPrimary}`,
              color: theme.colors.goldNeon,
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            OFFICIAL SCHEDULE
          </div>
          <div
            style={{
              color: theme.colors.emeraldNeon,
              fontSize: 18,
              fontWeight: 900,
            }}
          >
            ● LIVE WEBINAR
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div
            style={{
              color: "#FFF",
              fontSize: 40,
              fontWeight: 900,
              letterSpacing: "-0.01em",
            }}
          >
            Sunday, November 1st
          </div>
          <div
            style={{
              transform: `scale(${calendarTimeSpring})`,
              opacity: calendarTimeSpring,
              color: theme.colors.goldNeon,
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            3:00 PM – 6:00 PM IST
          </div>
        </div>

        <div
          style={{
            borderTop: "1.5px solid rgba(255, 255, 255, 0.12)",
            paddingTop: 12,
            color: theme.colors.textSecondary,
            fontSize: 22,
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          An afternoon dedicated to changing your wealth-building journey with structural discipline.
        </div>
      </div>
    </div>
  );
};
