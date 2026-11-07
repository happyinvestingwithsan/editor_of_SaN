import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene06_Fundamentals: React.FC<SceneProps> = ({
  startFrame = 1180,
  durationFrames = 160,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Header entrance snaps to frame 17 (abs 1197: "Fact number 2")
  const entrance = spring({
    frame: localFrame - 17,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Radar scan line motion
  const scanPos = (localFrame * 3.5) % 100;

  // "Look at the numbers" pulse snaps strictly to frame 136 (abs 1316: "Look at the numbers")
  const pulseSpring = spring({
    frame: localFrame - 136,
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
        height: 718,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "36px 40px 16px",
        boxSizing: "border-box",
        opacity: (1 - exitProgress) * interpolate(entrance, [0, 1], [0, 1]),
        transform: `translateY(${exitProgress * -20}px)`,
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {/* 1. Fact Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            backgroundColor: "#FFB020",
            color: "#0B0F17",
            padding: "6px 20px",
            borderRadius: 10,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "0.08em",
          }}
        >
          FACT #02
        </span>
        <span
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "0.04em",
          }}
        >
          FINANCIAL HEALTH AUDIT
        </span>
      </div>

      {/* 2. Analytical Diagnostic Card */}
      <div
        style={{
          position: "relative",
          width: 980,
          backgroundColor: "rgba(23, 27, 33, 0.96)",
          borderRadius: 26,
          padding: "40px 44px",
          border: "2px solid rgba(15, 143, 135, 0.5)",
          boxShadow: `0 20px 50px rgba(0,0,0,0.8), ${EQUITAS_THEME.shadows.glowTeal}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Radar Scanner Beam */}
        <div
          style={{
            position: "absolute",
            top: `${scanPos}%`,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent 0%, #0F8F87 50%, transparent 100%)",
            boxShadow: "0 0 20px #0F8F87",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#94A3B8",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          CORE INVESTOR QUESTION
        </div>

        <h2
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: "4px 0 28px",
            lineHeight: 1.2,
          }}
        >
          IS THE BANK FAILING FUNDAMENTALLY?
        </h2>

        {/* Callout Prompt: LOOK AT THE NUMBERS (Snaps strictly to frame 136) */}
        {localFrame >= 136 && (
          <div
            style={{
              backgroundColor: "rgba(15, 143, 135, 0.25)",
              border: "2.5px solid #00D09C",
              borderRadius: 20,
              padding: "18px 42px",
              display: "flex",
              alignItems: "center",
              gap: 18,
              transform: `scale(${interpolate(pulseSpring, [0, 1], [0.85, 1])})`,
              opacity: interpolate(pulseSpring, [0, 1], [0, 1]),
              boxShadow: "0 10px 35px rgba(0, 208, 156, 0.4)",
            }}
          >
            <span style={{ fontSize: 36 }}>🔍</span>
            <span
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#00D09C",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              LOOK AT THE NUMBERS
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
