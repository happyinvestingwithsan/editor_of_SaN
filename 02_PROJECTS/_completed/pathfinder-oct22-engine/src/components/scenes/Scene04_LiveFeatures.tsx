import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene04_LiveFeatures: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // localFrame 0 is global Frame 630

  // Header springs in as scene opens
  const titleSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // EXACT WORD-LEVEL SNAPPING:
  // Word Snap: "making the master class live" -> Frame 655 (localFrame 25)
  const f1Spring = spring({
    frame: localFrame - 25,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Word Snap: "With Q&A if needed" -> Frame 728-739 (localFrame 98)
  const f2Spring = spring({
    frame: localFrame - 98,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Word Snap: "most important thing... live market psychology" -> Frame 775-784 (localFrame 145)
  const f3Spring = spring({
    frame: localFrame - 145,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Blinking Live Dot
  const blink = Math.sin((localFrame / 10) * Math.PI) > 0 ? 1 : 0.3;

  // Fade out starts at localFrame 220 (global Frame 850), complete at localFrame 235 (global Frame 865)
  // Ensures Feature 3 stays on screen with zero flicker and generous dwell time!
  const opacity = interpolate(localFrame, [220, 235], [1, 0], {
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
        gap: 24,
      }}
    >
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
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          WHY TODAY’S LIVE BONUS IS SPECIAL
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: 52,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: "-0.02em",
          }}
        >
          Not Pre-Recorded. 100% Live Cohort.
        </h2>
      </div>

      {/* Feature 1: Live Interactive (Snaps on "live" @ Frame 655) */}
      <div
        style={{
          transform: `translateX(${(1 - f1Spring) * -40}px)`,
          opacity: f1Spring,
          background: "rgba(17, 24, 39, 0.95)",
          backdropFilter: "blur(14px)",
          border: "2.5px solid rgba(239, 68, 68, 0.6)",
          borderRadius: 24,
          padding: "24px 34px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          boxShadow: theme.shadows.glowBox("rgba(239, 68, 68, 0.3)"),
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            backgroundColor: theme.colors.crimson,
            boxShadow: `0 0 18px ${theme.colors.crimson}`,
            opacity: blink,
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              color: "#FFF",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            100% Live Masterclass Stream
          </div>
          <div
            style={{
              color: theme.colors.textSecondary,
              fontSize: 22,
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Real-time interactive session on live charts & balance sheets.
          </div>
        </div>
      </div>

      {/* Feature 2: Direct Q&A with SaN (Snaps on "With Q&A" @ Frame 728) */}
      <div
        style={{
          transform: `translateX(${(1 - f2Spring) * -40}px)`,
          opacity: f2Spring,
          background: "rgba(17, 24, 39, 0.95)",
          backdropFilter: "blur(14px)",
          border: `2.5px solid ${theme.colors.goldPrimary}`,
          borderRadius: 24,
          padding: "24px 34px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          boxShadow: theme.shadows.goldCard,
        }}
      >
        <span style={{ fontSize: 38, flexShrink: 0 }}>🎙️</span>
        <div>
          <div
            style={{
              color: "#FFF",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            Direct Q&A With Santosh
          </div>
          <div
            style={{
              color: theme.colors.textSecondary,
              fontSize: 22,
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Ask your personal portfolio, valuation, and behavioral doubts live.
          </div>
        </div>
      </div>

      {/* Feature 3: Psychology Audit (Snaps on "most important... market psychology" @ Frame 775-784) */}
      <div
        style={{
          transform: `translateX(${(1 - f3Spring) * -40}px)`,
          opacity: f3Spring,
          background: "rgba(17, 24, 39, 0.95)",
          backdropFilter: "blur(14px)",
          border: "2.5px solid rgba(16, 185, 129, 0.7)",
          borderRadius: 24,
          padding: "24px 34px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          boxShadow: theme.shadows.glowBox("rgba(16, 185, 129, 0.3)"),
        }}
      >
        <span style={{ fontSize: 38, flexShrink: 0 }}>🧠</span>
        <div>
          <div
            style={{
              color: "#FFF",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            Live Market Psychology & Traps Audit
          </div>
          <div
            style={{
              color: theme.colors.textSecondary,
              fontSize: 22,
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Deconstruct how institutional smart money liquidates retail FOMO.
          </div>
        </div>
      </div>
    </div>
  );
};
