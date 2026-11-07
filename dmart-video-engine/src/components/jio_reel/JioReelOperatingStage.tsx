import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelOperatingStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 1478,
  durationFrames = 231, // 1478 to 1709
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const pillSpring1 = spring({ frame: localFrame - 15, fps, config: { damping: 12, stiffness: 130 } });
  const pillSpring2 = spring({ frame: localFrame - 35, fps, config: { damping: 12, stiffness: 130 } });

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
        height: 720,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 40px 20px",
        opacity: (1 - exitProgress) * Math.min(1, localFrame / 10),
        transform: `translateY(${-exitProgress * 40}px)`,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      <div
        style={{
          transform: `scale(${entrance})`,
          backgroundColor: "rgba(0, 208, 156, 0.15)",
          border: "1.5px solid rgba(0, 208, 156, 0.4)",
          borderRadius: 24,
          padding: "6px 20px",
          marginBottom: 12,
        }}
      >
        <span
          style={{
            color: "#00D09C",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Chapter 02 / The Numbers
        </span>
      </div>

      {/* Main Row: 53 Cr Users + 50% Margin + ARPU 219 in one unified dashboard */}
      <div
        style={{
          display: "flex",
          gap: 16,
          width: 900,
          transform: `scale(${entrance})`,
        }}
      >
        {/* User Base Card */}
        <div
          style={{
            flex: 1.2,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "1.5px solid rgba(0, 92, 171, 0.5)",
            borderRadius: 20,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }}
        >
          <span style={{ color: "#94A3B8", fontSize: 14, fontWeight: 700, textTransform: "uppercase" }}>
            Subscribers
          </span>
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#FFFFFF",
              marginTop: 2,
            }}
          >
            53 CRORE
          </div>
          <span style={{ color: "#00D09C", fontSize: 15, fontWeight: 700 }}>
            Active Users
          </span>
        </div>

        {/* Operating Margin */}
        <div
          style={{
            flex: 1,
            transform: `scale(${pillSpring1})`,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "1.5px solid rgba(0, 208, 156, 0.4)",
            borderRadius: 20,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ color: "#94A3B8", fontSize: 14, fontWeight: 700 }}>
            EBITDA Margin
          </span>
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#00D09C",
              marginTop: 2,
            }}
          >
            50%
          </div>
          <span style={{ color: "#94A3B8", fontSize: 14 }}>Operating</span>
        </div>

        {/* ARPU */}
        <div
          style={{
            flex: 1,
            transform: `scale(${pillSpring2})`,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "1.5px solid rgba(255, 176, 32, 0.4)",
            borderRadius: 20,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ color: "#94A3B8", fontSize: 14, fontWeight: 700 }}>
            ARPU
          </span>
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#FFB020",
              marginTop: 2,
            }}
          >
            ₹219 ▲
          </div>
          <span style={{ color: "#94A3B8", fontSize: 14 }}>Rising Trend</span>
        </div>
      </div>
    </div>
  );
};
