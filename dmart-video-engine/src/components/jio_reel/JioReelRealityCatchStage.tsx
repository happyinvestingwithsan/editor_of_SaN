import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelRealityCatchStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 2053,
  durationFrames = 342, // 2053 to 2395
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  const entrance = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 110 } });
  const diceSpring = spring({ frame: localFrame - 80, fps, config: { damping: 12, stiffness: 130 } });

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
          backgroundColor: "rgba(255, 176, 32, 0.15)",
          border: "1.5px solid rgba(255, 176, 32, 0.4)",
          borderRadius: 24,
          padding: "6px 20px",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 18 }}>⚠️</span>
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
          Chapter 03 / The Reality Catch
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
        MEGA CAPS <span style={{ color: "#FF3B30" }}>DON'T DOUBLE</span> ON LISTING
      </div>

      {/* Reality Warning Card */}
      <div
        style={{
          transform: `scale(${entrance})`,
          backgroundColor: "rgba(19, 25, 36, 0.95)",
          border: "1.5px solid rgba(255, 176, 32, 0.4)",
          borderRadius: 20,
          padding: "16px 28px",
          width: 900,
          display: "flex",
          alignItems: "center",
          gap: 18,
          boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ fontSize: 44 }}>🚢</div>
        <div>
          <div style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 800 }}>
            ₹10 Lakh Crore Market Giant
          </div>
          <p style={{ color: "#94A3B8", fontSize: 16, fontWeight: 600, margin: "2px 0 0" }}>
            Massive aircraft carriers move steadily — they do not drift like speedboats.
          </p>
        </div>
      </div>

      {/* Two gamble variables */}
      {localFrame >= 80 && (
        <div
          style={{
            transform: `scale(${diceSpring})`,
            display: "flex",
            gap: 16,
            width: 900,
            marginTop: 12,
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "1px solid rgba(255, 59, 48, 0.3)",
              borderRadius: 16,
              padding: "10px 16px",
              textAlign: "center",
            }}
          >
            <span style={{ color: "#FF3B30", fontSize: 16, fontWeight: 800 }}>
              🎲 Variable 1: Allotment Luck
            </span>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "1px solid rgba(255, 59, 48, 0.3)",
              borderRadius: 16,
              padding: "10px 16px",
              textAlign: "center",
            }}
          >
            <span style={{ color: "#FF3B30", fontSize: 16, fontWeight: 800 }}>
              🌊 Variable 2: Market Sentiment
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
