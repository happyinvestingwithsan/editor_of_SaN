import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene10_PersonalInvestment: React.FC<SceneProps> = ({
  startFrame = 1940,
  durationFrames = 150,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Entrance spring snaps to frame 0 (abs 1940: "Yes, I have bought a small portion today...")
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Card 2 pop snaps strictly to frame 50 (abs 1990: "but I have not put my all money in one go")
  const card2Spring = spring({
    frame: localFrame - 50,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

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
        paddingTop: 150,
        opacity: (1 - exitProgress) * interpolate(entrance, [0, 1], [0, 1]),
        zIndex: 35,
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {/* 1. Transparency Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: "rgba(17, 24, 32, 0.94)",
          border: "2.5px solid #FFB020",
          borderRadius: 999,
          padding: "16px 36px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 40px rgba(255, 176, 32, 0.4)",
        }}
      >
        <span style={{ fontSize: 32 }}>💼</span>
        <span
          style={{
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: "#FFFFFF",
            textTransform: "uppercase",
          }}
        >
          PERSONAL SKIN IN THE GAME
        </span>
      </div>

      {/* 2. Tactical Execution Pills (Large Mobile Typography) */}
      <div
        style={{
          marginTop: 28,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 208, 156, 0.22)",
            border: "2px solid #00D09C",
            borderRadius: 20,
            padding: "16px 36px",
            backdropFilter: "blur(14px)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
          }}
        >
          <span style={{ fontSize: 28, color: "#00D09C" }}>✓</span>
          <span style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF" }}>
            BOUGHT A SMALL TRANCHE TODAY
          </span>
        </div>

        {localFrame >= 50 && (
          <div
            style={{
              backgroundColor: "rgba(255, 59, 48, 0.25)",
              border: "2.5px solid #FF3B30",
              borderRadius: 20,
              padding: "16px 40px",
              backdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              gap: 16,
              transform: `scale(${interpolate(card2Spring, [0, 1], [0.85, 1])})`,
              opacity: interpolate(card2Spring, [0, 1], [0, 1]),
              boxShadow: "0 10px 35px rgba(255, 59, 48, 0.5)",
            }}
          >
            <span style={{ fontSize: 30 }}>🛑</span>
            <span style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.04em" }}>
              NEVER PUT ALL MONEY IN ONE GO
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
