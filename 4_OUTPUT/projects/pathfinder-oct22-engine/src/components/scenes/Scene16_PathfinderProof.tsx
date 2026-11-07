import React from "react";
import { interpolate, spring, staticFile, useVideoConfig, Video } from "remotion";
import { theme } from "../../theme";

export const Scene16_PathfinderProof: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Snaps right at scene start
  const aSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word Snap: "proof of what we are doing" -> Frame 3350 (localFrame 45)
  const badgeSpring = spring({
    frame: localFrame - 45,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Word Snap: "one and a half hour session" -> Frame 3426 (localFrame 121)
  const statSpring = spring({
    frame: localFrame - 121,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  const opacity = interpolate(localFrame, [315, 331], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 80,
        width: 1040,
        height: 920,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
      }}
    >
      {/* Top Ticker Badges (Snaps @ Frame 3350 "proof") */}
      <div
        style={{
          transform: `scale(${badgeSpring})`,
          opacity: badgeSpring,
          display: "flex",
          gap: 16,
        }}
      >
        <div
          style={{
            padding: "10px 22px",
            borderRadius: 16,
            backgroundColor: "rgba(245, 158, 11, 0.22)",
            border: `2px solid ${theme.colors.goldPrimary}`,
            color: theme.colors.goldNeon,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.08em",
          }}
        >
          ★ JIO FINANCE
        </div>
        <div
          style={{
            padding: "10px 22px",
            borderRadius: 16,
            backgroundColor: "rgba(16, 185, 129, 0.22)",
            border: `2px solid ${theme.colors.emeraldNeon}`,
            color: theme.colors.emeraldNeon,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.08em",
          }}
        >
          ★ DIXON TECH PLI
        </div>
        <div
          style={{
            padding: "10px 22px",
            borderRadius: 16,
            backgroundColor: "rgba(6, 182, 212, 0.22)",
            border: `2px solid ${theme.colors.cyan}`,
            color: theme.colors.cyan,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.08em",
          }}
        >
          ★ TII INDIA
        </div>
      </div>

      {/* Real Pathfinder Session Screen Recording */}
      <div
        style={{
          transform: `scale(${aSpring})`,
          opacity: aSpring,
          width: 1040,
          height: 640,
          borderRadius: 28,
          overflow: "hidden",
          border: `2.5px solid ${theme.colors.goldPrimary}`,
          boxShadow: theme.shadows.goldCard,
          position: "relative",
          backgroundColor: "#0B0F19",
        }}
      >
        <Video
          src={staticFile("video/broll_technical.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Live Session Badge Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            padding: "12px 24px",
            borderRadius: 16,
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255, 255, 255, 0.25)",
            color: "#FFF",
            fontSize: 18,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              boxShadow: "0 0 10px #EF4444",
            }}
          />
          PATHFINDER LIVE RESEARCH PROOF (5:30 AM SESSION)
        </div>
      </div>

      {/* Bottom Proof Metric Banner (Snaps @ Frame 3426 "1.5 hour session") */}
      <div
        style={{
          transform: `translateY(${(1 - statSpring) * 20}px)`,
          opacity: statSpring,
          background: "rgba(11, 15, 25, 0.94)",
          border: `2px solid ${theme.colors.emeraldNeon}`,
          borderRadius: 22,
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: theme.shadows.glowBox(theme.colors.emeraldGlow),
        }}
      >
        <span style={{ color: "#FFF", fontSize: 22, fontWeight: 800 }}>
          📊 90 Minutes Of Live Uncut Auditing
        </span>
        <span
          style={{
            color: theme.colors.emeraldNeon,
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          REAL COMMUNITY DEPTH
        </span>
      </div>
    </div>
  );
};
