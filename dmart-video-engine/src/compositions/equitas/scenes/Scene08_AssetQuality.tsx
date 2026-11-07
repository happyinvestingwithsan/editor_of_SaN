import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene08_AssetQuality: React.FC<SceneProps> = ({
  startFrame = 1610,
  durationFrames = 160,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Entrance snaps to frame 0 (abs 1610: "And look at the bad loans...")
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Net NPA drop starts strictly at frame 41 (abs 1651: "Just dropped to 0.7%...")
  const npaVal = interpolate(localFrame, [41, 95], [2.1, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge spring snaps strictly to frame 70 (abs 1680)
  const badgeSpring = spring({
    frame: localFrame - 70,
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
        padding: "30px 40px 16px",
        boxSizing: "border-box",
        opacity: (1 - exitProgress) * interpolate(entrance, [0, 1], [0, 1]),
        transform: `translateY(${exitProgress * -20}px)`,
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {/* 1. Header Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          backgroundColor: "rgba(0, 208, 156, 0.18)",
          border: "1.5px solid rgba(0, 208, 156, 0.5)",
          padding: "8px 24px",
          borderRadius: 999,
        }}
      >
        <span style={{ fontSize: 22 }}>🛡️</span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#00D09C",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          ASSET QUALITY & CREDIT HEALTH
        </span>
      </div>

      {/* 2. Main Card with Large Mobile Typography */}
      <div
        style={{
          width: 980,
          backgroundColor: "rgba(23, 27, 33, 0.96)",
          borderRadius: 26,
          padding: "32px 40px",
          border: "2px solid rgba(0, 208, 156, 0.45)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(0, 208, 156, 0.25)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#94A3B8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              NET NON-PERFORMING ASSETS (BAD LOANS)
            </div>
            <div
              style={{
                fontSize: 76,
                fontWeight: 900,
                fontFamily: EQUITAS_THEME.fonts.mono,
                color: "#00D09C",
                lineHeight: 1.05,
                textShadow: "0 0 30px rgba(0, 208, 156, 0.6)",
                marginTop: 4,
              }}
            >
              {npaVal.toFixed(2)}%
            </div>
          </div>

          {/* Badge */}
          {localFrame >= 70 && (
            <div
              style={{
                backgroundColor: "rgba(0, 208, 156, 0.22)",
                border: "2.5px solid #00D09C",
                borderRadius: 20,
                padding: "14px 28px",
                transform: `scale(${interpolate(badgeSpring, [0, 1], [0.8, 1])})`,
                opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 900, color: "#00D09C" }}>▼ DROPPED</div>
              <div style={{ fontSize: 16, color: "#FFFFFF", fontWeight: 800 }}>MULTI-YEAR LOW</div>
            </div>
          )}
        </div>

        {/* Comparison Range Bar */}
        <div
          style={{
            backgroundColor: "rgba(11, 15, 23, 0.8)",
            borderRadius: 18,
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              fontWeight: 800,
              color: "#94A3B8",
              marginBottom: 10,
            }}
          >
            <span>Peak Bad Loans: 2.10%</span>
            <span style={{ color: "#00D09C" }}>Current Clean Level: 0.70%</span>
          </div>

          <div
            style={{
              height: 18,
              backgroundColor: "rgba(255,255,255,0.12)",
              borderRadius: 9,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${(npaVal / 2.5) * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #00D09C 0%, #FFB020 100%)",
                borderRadius: 9,
                transition: "width 0.1s ease",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
