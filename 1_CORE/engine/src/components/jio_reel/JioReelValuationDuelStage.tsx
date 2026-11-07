import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelValuationDuelStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 1709,
  durationFrames = 344, // 1709 to 2053
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;
  const isFullScreenDuel = localFrame >= 136; // frame 1845 (61.5s)

  // Spring animations
  const spring1 = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 110 } });
  const springDuel = spring({ frame: localFrame - 136, fps, config: { damping: 12, stiffness: 120 } });
  const discountSpring = spring({ frame: localFrame - 165, fps, config: { damping: 10, stiffness: 150 } });

  // Exit
  const exitProgress = interpolate(
    localFrame,
    [durationFrames - 15, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (!isFullScreenDuel) {
    // Mode A: Top Canvas Valuation Overview
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
          opacity: Math.min(1, localFrame / 10),
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        {/* Header */}
        <div
          style={{
            transform: `scale(${spring1})`,
            backgroundColor: "rgba(255, 176, 32, 0.15)",
            border: "1.5px solid rgba(255, 176, 32, 0.4)",
            borderRadius: 24,
            padding: "6px 20px",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              color: "#FFB020",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            Valuation Multiples
          </span>
        </div>

        <div
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          JIO PLATFORMS @ <span style={{ color: "#00D09C" }}>₹1,119</span>
        </div>

        {/* Market Cap Card */}
        <div
          style={{
            transform: `scale(${spring1})`,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "2px solid rgba(255, 176, 32, 0.4)",
            borderRadius: 20,
            padding: "20px 36px",
            width: 900,
            textAlign: "center",
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}
        >
          <span
            style={{
              color: "#94A3B8",
              fontSize: 16,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Implied Total Enterprise Valuation
          </span>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#FFB020",
              marginTop: 4,
            }}
          >
            ₹10.3 LAKH CRORE
          </div>
        </div>
      </div>
    );
  }

  // Mode B: Full-Screen Valuation Duel
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        backgroundColor: "rgba(11, 15, 23, 0.96)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 40px",
        opacity: (1 - exitProgress) * Math.min(1, (localFrame - 136) / 10),
        zIndex: 40,
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 900,
          color: "#FFFFFF",
          fontFamily: "'Inter', sans-serif",
          textAlign: "center",
          marginBottom: 40,
          transform: `scale(${springDuel})`,
        }}
      >
        THE DUOPOLY VALUATION <span style={{ color: "#00D09C" }}>BATTLE</span>
      </div>

      {/* Side by side duel cards */}
      <div
        style={{
          display: "flex",
          gap: 28,
          width: "100%",
          maxWidth: 960,
          marginBottom: 44,
          transform: `scale(${springDuel})`,
        }}
      >
        {/* Jio Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "2.5px solid #00D09C",
            borderRadius: 24,
            padding: "36px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 20px 60px rgba(0, 208, 156, 0.25)",
          }}
        >
          <span style={{ fontSize: 30, fontWeight: 900, color: "#FFFFFF", marginBottom: 12 }}>
            JIO
          </span>
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#00D09C",
              marginBottom: 10,
            }}
          >
            34x PE
          </div>
          <span
            style={{
              backgroundColor: "rgba(0, 208, 156, 0.2)",
              color: "#00D09C",
              fontSize: 18,
              fontWeight: 800,
              padding: "6px 14px",
              borderRadius: 20,
            }}
          >
            CHEAPER
          </span>
        </div>

        {/* Airtel Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "1.5px solid rgba(255, 176, 32, 0.4)",
            borderRadius: 24,
            padding: "36px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <span style={{ fontSize: 30, fontWeight: 900, color: "#FFFFFF", marginBottom: 12 }}>
            BHARTI AIRTEL
          </span>
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#FFB020",
              marginBottom: 10,
            }}
          >
            50x PE
          </div>
          <span
            style={{
              backgroundColor: "rgba(255, 176, 32, 0.2)",
              color: "#FFB020",
              fontSize: 18,
              fontWeight: 800,
              padding: "6px 14px",
              borderRadius: 20,
            }}
          >
            EXPENSIVE
          </span>
        </div>
      </div>

      {/* Discount Badge */}
      {localFrame >= 165 && (
        <div
          style={{
            transform: `scale(${discountSpring})`,
            backgroundColor: "#00D09C",
            borderRadius: 30,
            padding: "16px 40px",
            boxShadow: "0 10px 40px rgba(0, 208, 156, 0.4)",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              fontFamily: "'Inter', sans-serif",
              color: "#0B0F17",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            ✓ 32% VALUATION DISCOUNT
          </div>
        </div>
      )}
    </div>
  );
};
