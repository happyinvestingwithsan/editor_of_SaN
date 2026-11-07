import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene02_ChannelEngagement: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Header reveals right as segment starts
  const titleSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // EXACT WORD-LEVEL SNAPPING:
  // "like," is spoken at Frame 244 -> localFrame 58
  const likeSpring = spring({
    frame: localFrame - 58,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // "share," is spoken at Frame 266 -> localFrame 80
  const shareSpring = spring({
    frame: localFrame - 80,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // "subscribe" is spoken at Frame 278 -> localFrame 92
  const subSpring = spring({
    frame: localFrame - 92,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // Smooth fade out between localFrame 155 and 170 (global frames 341 - 356)
  const opacity = interpolate(localFrame, [155, 170], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 100,
        width: 1040,
        height: 880,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* Header Pill & Title (Mobile Optimized) */}
      <div
        style={{
          transform: `translateY(${(1 - titleSpring) * -20}px)`,
          opacity: titleSpring,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px 24px",
            borderRadius: 24,
            background: "rgba(245, 158, 11, 0.18)",
            border: `1.5px solid ${theme.colors.goldPrimary}`,
            color: theme.colors.goldNeon,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          COMMUNITY SUPPORT
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 56,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Found Value In Today’s Analysis?
        </h1>
        <p
          style={{
            margin: "12px 0 0 0",
            fontSize: 28,
            color: theme.colors.textSecondary,
            fontWeight: 600,
          }}
        >
          Support the mission of disciplined retail investing.
        </p>
      </div>

      {/* 3 Kinetic Word-Snapped Buttons (Trigger exactly as SaN says them!) */}
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
        }}
      >
        {/* LIKE (Snaps @ Frame 244) */}
        <div
          style={{
            transform: `scale(${likeSpring})`,
            opacity: likeSpring,
            padding: "24px 42px",
            borderRadius: 22,
            background: "rgba(17, 24, 39, 0.95)",
            border: "2.5px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
          }}
        >
          <span style={{ fontSize: 36 }}>👍</span>
          <span
            style={{
              color: "#FFF",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: "0.05em",
            }}
          >
            LIKE
          </span>
        </div>

        {/* SHARE (Snaps @ Frame 266) */}
        <div
          style={{
            transform: `scale(${shareSpring})`,
            opacity: shareSpring,
            padding: "24px 42px",
            borderRadius: 22,
            background: "rgba(17, 24, 39, 0.95)",
            border: "2.5px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
          }}
        >
          <span style={{ fontSize: 36 }}>↗</span>
          <span
            style={{
              color: "#FFF",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: "0.05em",
            }}
          >
            SHARE
          </span>
        </div>

        {/* SUBSCRIBE (Snaps @ Frame 278) */}
        <div
          style={{
            transform: `scale(${subSpring})`,
            opacity: subSpring,
            padding: "24px 46px",
            borderRadius: 22,
            background: theme.colors.crimson,
            border: "2.5px solid #FF8080",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: theme.shadows.glowBox(theme.colors.crimsonGlow),
          }}
        >
          <span style={{ fontSize: 36 }}>🔔</span>
          <span
            style={{
              color: "#FFF",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: "0.05em",
            }}
          >
            SUBSCRIBE
          </span>
        </div>
      </div>

      {/* Reassurance Callout */}
      <div
        style={{
          color: theme.colors.textMuted,
          fontSize: 22,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ color: theme.colors.goldNeon }}>★</span>
        <span>Every like helps reach more retail investors to prevent unforced trading losses.</span>
      </div>
    </div>
  );
};
