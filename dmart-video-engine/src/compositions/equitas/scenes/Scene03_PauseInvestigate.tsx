import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene03_PauseInvestigate: React.FC<SceneProps> = ({
  startFrame = 555,
  durationFrames = 135,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Entrance spring
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Breathing pulse animation for "Take a breath"
  const breathScale = 1 + Math.sin(localFrame * 0.09) * 0.06;

  // Exit transition
  const exitProgress = interpolate(
    localFrame,
    [durationFrames - 15, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 160,
        opacity: (1 - exitProgress) * interpolate(entrance, [0, 1], [0, 1]),
        zIndex: 35,
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {/* 1. Serene Calming Top Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: "rgba(15, 143, 135, 0.22)",
          border: "2px solid #0F8F87",
          borderRadius: 999,
          padding: "14px 36px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 40px rgba(15, 143, 135, 0.4)",
          transform: `scale(${breathScale})`,
        }}
      >
        <span style={{ fontSize: 32 }}>🧘</span>
        <span
          style={{
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: "0.14em",
            color: "#FFFFFF",
            textTransform: "uppercase",
          }}
        >
          PAUSE & TAKE A BREATH
        </span>
      </div>

      {/* 2. Sub-card: Happy Investing Forensic Investigation */}
      <div
        style={{
          marginTop: 24,
          backgroundColor: "rgba(17, 24, 32, 0.85)",
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 18,
          padding: "12px 30px",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#00D09C",
            boxShadow: "0 0 10px #00D09C",
          }}
        />
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#E2E8F0",
            letterSpacing: "0.08em",
          }}
        >
          UNDERSTAND THE FACTS WITH HAPPY INVESTING
        </span>
      </div>
    </div>
  );
};
