import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene09_BookValue: React.FC<SceneProps> = ({
  startFrame = 1770,
  durationFrames = 170,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Entrance snaps to frame 8 (abs 1778: "The stock is selling...")
  const entrance = spring({
    frame: localFrame - 8,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Discount percentage counter starts strictly at frame 47 (abs 1817: "15% discount...")
  const discountVal = Math.round(
    interpolate(localFrame, [47, 85], [0, 15], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // PB Ratio (1.00x -> 0.87x: 50 / 57.3 = 0.87)
  const pbRatio = interpolate(localFrame, [47, 85], [1.0, 0.87], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // PB badge entrance snaps to frame 70 (abs 1840: "discount")
  const badgeSpring = spring({
    frame: localFrame - 70,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Valuation comparison cards snap to frame 100 (abs 1870: "to its actual net worth of book value")
  const comparisonSpring = spring({
    frame: localFrame - 100,
    fps,
    config: { damping: 13, stiffness: 120 },
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
          backgroundColor: "rgba(255, 176, 32, 0.18)",
          border: "1.5px solid rgba(255, 176, 32, 0.5)",
          padding: "8px 24px",
          borderRadius: 999,
        }}
      >
        <span style={{ fontSize: 22 }}>💎</span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#FFB020",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          VALUATION ANOMALY • BOOK VALUE
        </span>
      </div>

      {/* 2. Main Card with Large Mobile Typography */}
      <div
        style={{
          width: 980,
          backgroundColor: "rgba(23, 27, 33, 0.96)",
          borderRadius: 26,
          padding: "32px 40px",
          border: "2px solid rgba(255, 176, 32, 0.5)",
          boxShadow: `0 20px 50px rgba(0,0,0,0.8), ${EQUITAS_THEME.shadows.glowAmber}`,
          display: "flex",
          flexDirection: "column",
          gap: 22,
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
              DISCOUNT TO AUDITED NET WORTH
            </div>
            <div
              style={{
                fontSize: 76,
                fontWeight: 900,
                fontFamily: EQUITAS_THEME.fonts.mono,
                color: "#FFB020",
                lineHeight: 1.05,
                textShadow: "0 0 30px rgba(255, 176, 32, 0.6)",
                marginTop: 4,
              }}
            >
              {discountVal}% <span style={{ fontSize: 44, color: "#FFFFFF" }}>DISCOUNT</span>
            </div>
          </div>

          {/* PB Ratio Badge (Snaps to frame 70) */}
          {localFrame >= 70 && (
            <div
              style={{
                backgroundColor: "rgba(255, 176, 32, 0.22)",
                border: "2.5px solid #FFB020",
                borderRadius: 20,
                padding: "14px 28px",
                textAlign: "center",
                transform: `scale(${interpolate(badgeSpring, [0, 1], [0.8, 1])})`,
                opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
              }}
            >
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  fontFamily: EQUITAS_THEME.fonts.mono,
                  color: "#FFB020",
                }}
              >
                {pbRatio.toFixed(2)}x
              </div>
              <div style={{ fontSize: 16, color: "#FFFFFF", fontWeight: 800 }}>P/B RATIO</div>
            </div>
          )}
        </div>

        {/* Dual Comparison Blocks: Actual Price 50 vs Book Value 57.3 (Snaps to frame 100) */}
        {localFrame >= 90 && (
          <div
            style={{
              display: "flex",
              gap: 20,
              transform: `translateY(${interpolate(comparisonSpring, [0, 1], [30, 0])}px)`,
              opacity: interpolate(comparisonSpring, [0, 1], [0, 1]),
            }}
          >
            {/* Actual Price */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(11, 15, 23, 0.85)",
                borderRadius: 18,
                padding: "18px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1.5px solid rgba(255, 59, 48, 0.4)",
              }}
            >
              <div>
                <div style={{ fontSize: 16, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase" }}>
                  Actual Market Price
                </div>
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 900,
                    fontFamily: EQUITAS_THEME.fonts.mono,
                    color: "#FF5C4D",
                    marginTop: 2,
                  }}
                >
                  ₹50.00
                </div>
              </div>
              <span style={{ fontSize: 32 }}>📉</span>
            </div>

            {/* Book Value */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(11, 15, 23, 0.85)",
                borderRadius: 18,
                padding: "18px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "2px solid #00D09C",
                boxShadow: "0 0 25px rgba(0, 208, 156, 0.25)",
              }}
            >
              <div>
                <div style={{ fontSize: 16, color: "#00D09C", fontWeight: 800, textTransform: "uppercase" }}>
                  Audited Book Value
                </div>
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 900,
                    fontFamily: EQUITAS_THEME.fonts.mono,
                    color: "#00D09C",
                    marginTop: 2,
                  }}
                >
                  ₹57.30
                </div>
              </div>
              <span style={{ fontSize: 32 }}>📚</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
