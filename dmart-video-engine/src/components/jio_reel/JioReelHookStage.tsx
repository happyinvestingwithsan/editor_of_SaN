import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelHookStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 0,
  durationFrames = 184,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Title entrance
  const titleSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Counter animation (0 to 30,000)
  const counterVal = Math.round(
    interpolate(localFrame, [10, 75], [0, 30000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Badge entrance
  const badgeSpring = spring({
    frame: localFrame - 45,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Exit fade/slide
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
        opacity: 1 - exitProgress,
        transform: `translateY(${-exitProgress * 40}px)`,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          transform: `scale(${titleSpring})`,
          backgroundColor: "rgba(255, 176, 32, 0.15)",
          border: "1px solid rgba(255, 176, 32, 0.4)",
          borderRadius: 24,
          padding: "6px 20px",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 20 }}>⚡</span>
        <span
          style={{
            color: "#FFB020",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Historic Market Event
        </span>
      </div>

      {/* Main Massive Hook Title */}
      <div
        style={{
          transform: `scale(${titleSpring})`,
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            fontFamily: "'Inter', sans-serif",
            color: "#FFFFFF",
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}
        >
          INDIA'S BIGGEST{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FFB020 0%, #00D09C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            IPO IN HISTORY
          </span>
        </div>
      </div>

      {/* 30,000 Crore Ticker Card + Jio Pill in Compact Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          transform: `scale(${titleSpring})`,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "1.5px solid rgba(255, 176, 32, 0.4)",
            borderRadius: 20,
            padding: "14px 32px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 16px 40px rgba(0,0,0,0.5), 0 0 24px rgba(255,176,32,0.15)",
          }}
        >
          <span
            style={{
              color: "#94A3B8",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Size:
          </span>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', 'Inter', monospace",
              fontVariantNumeric: "tabular-nums",
              color: "#FFB020",
              letterSpacing: -0.5,
            }}
          >
            ₹{counterVal.toLocaleString("en-IN")}{" "}
            <span style={{ fontSize: 28, color: "#FFFFFF" }}>CR</span>
          </div>
        </div>

        {/* Jio Platforms Pill Badge */}
        {localFrame >= 45 && (
          <div
            style={{
              transform: `scale(${badgeSpring})`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "#005CAB",
              borderRadius: 30,
              padding: "12px 22px",
              boxShadow: "0 10px 30px rgba(0, 92, 171, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: "#E11B22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: "#FFFFFF",
                fontSize: 14,
              }}
            >
              Jio
            </div>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 0.5,
              }}
            >
              JIO PLATFORMS
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
