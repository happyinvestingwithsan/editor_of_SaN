import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene11_FallingKnife: React.FC<SceneProps> = ({
  startFrame = 2090,
  durationFrames = 230,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Disclaimer entrance snaps to frame 0 (abs 2090: "This is not a buy or sell recommendation...")
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Left card: Falling Knife snaps strictly to frame 149 (abs 2239: "Is this a falling knife...")
  const leftSpring = spring({
    frame: localFrame - 149,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Right card: Massive Opportunity snaps strictly to frame 185 (abs 2275: "or a massive opportunity?")
  const rightSpring = spring({
    frame: localFrame - 185,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Center VS badge snaps at frame 170
  const vsSpring = spring({
    frame: localFrame - 170,
    fps,
    config: { damping: 10, stiffness: 160 },
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
        height: 718,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 36px 14px",
        boxSizing: "border-box",
        opacity: (1 - exitProgress) * interpolate(entrance, [0, 1], [0, 1]),
        transform: `translateY(${exitProgress * -20}px)`,
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {/* 1. Disclaimer Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1.5px solid rgba(255, 255, 255, 0.25)",
          padding: "8px 24px",
          borderRadius: 999,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 800, color: "#CBD5E1", letterSpacing: "0.08em" }}>
          ⚠️ NOT A BUY OR SELL RECOMMENDATION • EDUCATIONAL STUDY
        </span>
      </div>

      {/* 2. Duel Comparison Arena (Large Mobile Cards) */}
      <div
        style={{
          position: "relative",
          width: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Left Side: Falling Knife */}
        <div
          style={{
            width: 460,
            backgroundColor: "rgba(23, 27, 33, 0.98)",
            borderRadius: 26,
            padding: "36px 28px",
            border: "2.5px solid #FF3B30",
            boxShadow: "0 20px 45px rgba(255, 59, 48, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 14,
            transform: `translateX(${interpolate(leftSpring, [0, 1], [-50, 0])}px)`,
            opacity: interpolate(leftSpring, [0, 1], [0, 1]),
          }}
        >
          <span style={{ fontSize: 56 }}>🗡️</span>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#FF3B30" }}>FALLING KNIFE?</div>
          <div style={{ fontSize: 20, color: "#CBD5E1", lineHeight: 1.4, fontWeight: 600 }}>
            Market panic, technical breakdown, further downside risk
          </div>
        </div>

        {/* Center VS Badge */}
        {localFrame >= 170 && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: `translate(-50%, 0) scale(${interpolate(vsSpring, [0, 1], [0, 1])})`,
              opacity: interpolate(vsSpring, [0, 1], [0, 1]),
              width: 72,
              height: 72,
              borderRadius: "50%",
              backgroundColor: "#FFB020",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(255, 176, 32, 0.7)",
              zIndex: 10,
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 900, color: "#0B0F17" }}>VS</span>
          </div>
        )}

        {/* Right Side: Massive Opportunity */}
        <div
          style={{
            width: 460,
            backgroundColor: "rgba(23, 27, 33, 0.98)",
            borderRadius: 26,
            padding: "36px 28px",
            border: "2.5px solid #00D09C",
            boxShadow: "0 20px 45px rgba(0, 208, 156, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 14,
            transform: `translateX(${interpolate(rightSpring, [0, 1], [50, 0])}px)`,
            opacity: interpolate(rightSpring, [0, 1], [0, 1]),
          }}
        >
          <span style={{ fontSize: 56 }}>💎</span>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#00D09C" }}>OPPORTUNITY?</div>
          <div style={{ fontSize: 20, color: "#CBD5E1", lineHeight: 1.4, fontWeight: 600 }}>
            15% discount to book value, record profits, zero fraud
          </div>
        </div>
      </div>
    </div>
  );
};
