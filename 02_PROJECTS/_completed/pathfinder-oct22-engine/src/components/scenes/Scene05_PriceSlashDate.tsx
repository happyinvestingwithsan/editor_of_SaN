import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene05_PriceSlashDate: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // localFrame 0 is global Frame 865

  const headerSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word Snap: "on November 1st" -> Frame 914-925 (localFrame 49)
  const dateSpring = spring({
    frame: localFrame - 49,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Price box container springs in right before "completely free" @ localFrame 65
  const priceBoxSpring = spring({
    frame: localFrame - 65,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Kinetic Slash Animation across 14 frames: draws from localFrame 71 to 85 (Frames 936 to 950)
  const slashWidth = interpolate(localFrame, [71, 85], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Word Snap: "completely free." -> Frame 952 (localFrame 87)
  const freeExplode = spring({
    frame: localFrame - 87,
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  // Generous dwell time: stays 100% visible until localFrame 215 (global Frame 1080)
  // then fades out smoothly to localFrame 235 (global Frame 1100)
  const opacity = interpolate(localFrame, [215, 235], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 90,
        width: 1040,
        height: 900,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 28,
      }}
    >
      {/* Header Badge */}
      <div
        style={{
          transform: `translateY(${(1 - headerSpring) * -20}px)`,
          opacity: headerSpring,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 26px",
            borderRadius: 22,
            background: "rgba(245, 158, 11, 0.18)",
            border: `1.5px solid ${theme.colors.goldPrimary}`,
            color: theme.colors.goldNeon,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          COMMUNITY INVITATION
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 52,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: "-0.02em",
          }}
        >
          Live Masterclass Date & Cost
        </h1>
      </div>

      {/* Date Lock Card (Snaps @ Frame 914 "November 1st") */}
      <div
        style={{
          transform: `translateY(${(1 - dateSpring) * 25}px)`,
          opacity: dateSpring,
          background: "rgba(17, 24, 39, 0.95)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 28,
          padding: "26px 38px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          boxShadow: "0 18px 40px rgba(0,0,0,0.65)",
        }}
      >
        <span style={{ fontSize: 50, flexShrink: 0 }}>📅</span>
        <div>
          <div
            style={{
              color: theme.colors.emeraldNeon,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            OFFICIAL DATE LOCKED
          </div>
          <div
            style={{
              color: "#FFF",
              fontSize: 40,
              fontWeight: 900,
              letterSpacing: "-0.01em",
              marginTop: 2,
            }}
          >
            Sunday, November 1st, 2026
          </div>
          <div
            style={{
              color: theme.colors.textSecondary,
              fontSize: 22,
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Live cohort session stream with interactive Q&A.
          </div>
        </div>
      </div>

      {/* Price Slash & Free Explosion (Slash @ Frame 940, Free Stamp @ Frame 952 on "completely free") */}
      <div
        style={{
          transform: `scale(${priceBoxSpring})`,
          opacity: priceBoxSpring,
          background:
            "linear-gradient(135deg, rgba(20, 26, 40, 0.98) 0%, rgba(10, 14, 22, 0.99) 100%)",
          border: `2.5px solid ${theme.colors.goldPrimary}`,
          borderRadius: 28,
          padding: "36px 46px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: theme.shadows.goldCard,
        }}
      >
        {/* Struck through Regular Price */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              color: theme.colors.textMuted,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            REGULAR PORTAL FEE
          </div>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              color: "#9CA3AF",
              fontSize: 64,
              fontWeight: 900,
            }}
          >
            ₹333
            {/* Animated Red Slash Line */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: -8,
                width: `${slashWidth}%`,
                height: 6,
                backgroundColor: theme.colors.crimson,
                borderRadius: 3,
                boxShadow: `0 0 12px ${theme.colors.crimson}`,
                transform: "rotate(-12deg)",
                transformOrigin: "left center",
              }}
            />
          </div>
        </div>

        {/* Dynamic Transition Arrow */}
        <div
          style={{
            fontSize: 44,
            color: theme.colors.goldNeon,
            opacity: freeExplode,
            transform: `scale(${freeExplode})`,
          }}
        >
          ➔
        </div>

        {/* ₹0 Explosion (Snaps on "completely free") */}
        <div
          style={{
            transform: `scale(${freeExplode})`,
            opacity: freeExplode,
            textAlign: "right",
          }}
        >
          <div
            style={{
              color: theme.colors.emeraldNeon,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            PATHFINDER SPECIAL
          </div>
          <div
            style={{
              color: theme.colors.emeraldNeon,
              fontSize: 70,
              fontWeight: 900,
              lineHeight: 1,
              textShadow: "0 0 35px rgba(16, 185, 129, 0.7)",
            }}
          >
            ₹0
          </div>
          <div
            style={{
              color: "#FFF",
              fontSize: 22,
              fontWeight: 800,
              marginTop: 6,
            }}
          >
            100% Free Bonus For Attendees
          </div>
        </div>
      </div>
    </div>
  );
};
