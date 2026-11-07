import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelTrapStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 184,
  durationFrames = 176, // 184 to 360
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Cards entrance
  const cardEntrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Stamp entrance (slams at frame 60)
  const stampSpring = spring({
    frame: localFrame - 50,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  // Screen shake calculation around stamp impact (localFrame 50 to 65)
  const shakeIntensity =
    localFrame >= 50 && localFrame <= 65
      ? Math.sin((localFrame - 50) * 1.5) * (65 - localFrame) * 0.8
      : 0;

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
        backgroundColor: "rgba(11, 15, 23, 0.94)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 40px",
        opacity: (1 - exitProgress) * Math.min(1, localFrame / 10),
        transform: `translate(${shakeIntensity}px, ${shakeIntensity * 0.5}px)`,
        zIndex: 40,
      }}
    >
      {/* Alert Header Pill */}
      <div
        style={{
          transform: `scale(${cardEntrance})`,
          backgroundColor: "rgba(255, 59, 48, 0.15)",
          border: "1.5px solid rgba(255, 59, 48, 0.5)",
          borderRadius: 30,
          padding: "10px 28px",
          marginBottom: 36,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 26 }}>⚠️</span>
        <span
          style={{
            color: "#FF3B30",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Recent Tech IPO Carnage
        </span>
      </div>

      {/* Warning Headline */}
      <div
        style={{
          fontSize: 54,
          fontWeight: 900,
          fontFamily: "'Inter', sans-serif",
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 50,
          maxWidth: 900,
        }}
      >
        ANOTHER TECH IPO <span style={{ color: "#FF3B30" }}>TRAP?</span>
      </div>

      {/* Side by side crash cards */}
      <div
        style={{
          display: "flex",
          gap: 28,
          width: "100%",
          maxWidth: 980,
          marginBottom: 60,
          transform: `scale(${cardEntrance})`,
        }}
      >
        {/* Paytm Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "1.5px solid rgba(255, 59, 48, 0.35)",
            borderRadius: 24,
            padding: "36px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#00BAF2",
              marginBottom: 16,
              letterSpacing: 0.5,
            }}
          >
            Paytm
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 59, 48, 0.15)",
              border: "1px solid #FF3B30",
              color: "#FF3B30",
              fontSize: 48,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              borderRadius: 16,
              padding: "8px 20px",
              marginBottom: 12,
            }}
          >
            -71%
          </div>
          <span style={{ color: "#94A3B8", fontSize: 20, fontWeight: 700 }}>
            Post-Listing Crash
          </span>
        </div>

        {/* Swiggy Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "1.5px solid rgba(255, 59, 48, 0.35)",
            borderRadius: 24,
            padding: "36px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#FC8019",
              marginBottom: 16,
              letterSpacing: 0.5,
            }}
          >
            Swiggy
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 59, 48, 0.15)",
              border: "1px solid #FF3B30",
              color: "#FF3B30",
              fontSize: 48,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              borderRadius: 16,
              padding: "8px 20px",
              marginBottom: 12,
            }}
          >
            -50%
          </div>
          <span style={{ color: "#94A3B8", fontSize: 20, fontWeight: 700 }}>
            Deep Drawdown Risk
          </span>
        </div>
      </div>

      {/* Massive Angled Distressed Rubber Stamp */}
      {localFrame >= 50 && (
        <div
          style={{
            transform: `scale(${stampSpring}) rotate(-8deg)`,
            border: "8px solid #FF3B30",
            backgroundColor: "rgba(255, 59, 48, 0.15)",
            borderRadius: 16,
            padding: "16px 48px",
            boxShadow: "0 0 50px rgba(255, 59, 48, 0.5)",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              fontFamily: "'Inter', sans-serif",
              color: "#FF3B30",
              letterSpacing: 4,
              textTransform: "uppercase",
              textShadow: "0 0 20px rgba(255,59,48,0.6)",
            }}
          >
            TRAP OR OPPORTUNITY?
          </div>
        </div>
      )}
    </div>
  );
};
