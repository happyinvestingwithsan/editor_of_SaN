import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene12_ConnectInquiry: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Snaps as question is asked ("How do we actually connect with you")
  const bubbleSpring = spring({
    frame: localFrame - 20,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // Word Snap: "Santosh? Yeah, we have an opportunity" -> Frame 2443-2461 (localFrame 130)
  const replySpring = spring({
    frame: localFrame - 130,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const opacity = interpolate(localFrame, [190, 208], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 780,
        top: 140,
        width: 1040,
        height: 800,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 32,
      }}
    >
      {/* Viewer Question Bubble */}
      <div
        style={{
          transform: `scale(${bubbleSpring}) translateY(${(1 - bubbleSpring) * 20}px)`,
          opacity: bubbleSpring,
          background: "rgba(17, 24, 39, 0.95)",
          backdropFilter: "blur(16px)",
          border: `2px solid ${theme.colors.goldPrimary}`,
          borderRadius: 28,
          padding: "36px 44px",
          boxShadow: theme.shadows.goldCard,
        }}
      >
        <div
          style={{
            color: theme.colors.goldNeon,
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          COMMUNITY INQUIRY
        </div>
        <div
          style={{
            color: "#FFF",
            fontSize: 38,
            fontWeight: 900,
            lineHeight: 1.25,
          }}
        >
          “How do we actually connect with you, Santosh?”
        </div>
      </div>

      {/* SaN Answer Indicator (Snaps @ Frame 2443) */}
      <div
        style={{
          transform: `scale(${replySpring}) translateY(${(1 - replySpring) * 20}px)`,
          opacity: replySpring,
          background: "rgba(16, 185, 129, 0.22)",
          backdropFilter: "blur(14px)",
          border: `2.5px solid ${theme.colors.emeraldNeon}`,
          borderRadius: 24,
          padding: "28px 38px",
          color: "#FFF",
          display: "flex",
          alignItems: "center",
          gap: 22,
          boxShadow: theme.shadows.glowBox(theme.colors.emeraldGlow),
        }}
      >
        <span style={{ fontSize: 44 }}>👉</span>
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
            THE REGISTRATION ROUTE
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, marginTop: 4 }}>
            Follow This 2-Step Route On Screen ↓
          </div>
        </div>
      </div>
    </div>
  );
};
