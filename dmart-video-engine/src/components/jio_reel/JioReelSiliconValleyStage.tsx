import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelSiliconValleyStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 825,
  durationFrames = 165, // 825 to 990
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Cards entrance
  const cardSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Lock snap (frame 25)
  const lockSpring = spring({
    frame: localFrame - 25,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  // Exit
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
      {/* Category Pill */}
      <div
        style={{
          transform: `scale(${cardSpring})`,
          backgroundColor: "rgba(26, 100, 248, 0.15)",
          border: "1px solid rgba(26, 100, 248, 0.4)",
          borderRadius: 24,
          padding: "6px 20px",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 18 }}>🔒</span>
        <span
          style={{
            color: "#1A64F8",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Silicon Valley Institutional Whales
        </span>
      </div>

      <div
        style={{
          fontSize: 36,
          fontWeight: 900,
          color: "#FFFFFF",
          fontFamily: "'Inter', sans-serif",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        META & GOOGLE ARE <span style={{ color: "#00D09C" }}>NOT SELLING</span>
      </div>

      {/* Side by side corporate lock cards */}
      <div
        style={{
          display: "flex",
          gap: 20,
          width: "100%",
          maxWidth: 900,
          transform: `scale(${cardSpring})`,
        }}
      >
        {/* Meta Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "1.5px solid rgba(26, 100, 248, 0.4)",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
            position: "relative",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 900, color: "#1877F2", marginBottom: 6 }}>
            Meta
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#FFFFFF",
              marginBottom: 4,
            }}
          >
            9.99%
          </div>
          <span style={{ color: "#94A3B8", fontSize: 16, fontWeight: 700 }}>
            Shareholding Kept 100%
          </span>
          {localFrame >= 25 && (
            <div
              style={{
                position: "absolute",
                top: -12,
                right: -12,
                transform: `scale(${lockSpring})`,
                fontSize: 28,
                backgroundColor: "#0B0F17",
                borderRadius: "50%",
                padding: "4px",
                border: "2px solid #00D09C",
              }}
            >
              🔒
            </div>
          )}
        </div>

        {/* Google Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "1.5px solid rgba(26, 100, 248, 0.4)",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
            position: "relative",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 900, color: "#EA4335", marginBottom: 6 }}>
            Google
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#FFFFFF",
              marginBottom: 4,
            }}
          >
            7.73%
          </div>
          <span style={{ color: "#94A3B8", fontSize: 16, fontWeight: 700 }}>
            Shareholding Kept 100%
          </span>
          {localFrame >= 25 && (
            <div
              style={{
                position: "absolute",
                top: -12,
                right: -12,
                transform: `scale(${lockSpring})`,
                fontSize: 28,
                backgroundColor: "#0B0F17",
                borderRadius: "50%",
                padding: "4px",
                border: "2px solid #00D09C",
              }}
            >
              🔒
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
