import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelBalanceSheetStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 532,
  durationFrames = 293, // 532 to 825
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;
  const isFullScreenTakeover = localFrame >= 128; // at frame 660 (22.0s)

  // Spring animations
  const scene1Spring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const shieldSpring = spring({
    frame: localFrame - 130,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const stampSpring = spring({
    frame: localFrame - 150,
    fps,
    config: { damping: 10, stiffness: 170 },
  });

  // Exit
  const exitProgress = interpolate(
    localFrame,
    [durationFrames - 15, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (!isFullScreenTakeover) {
    // Mode A (Split - Top Canvas)
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
        {/* Chapter Header */}
        <div
          style={{
            transform: `scale(${scene1Spring})`,
            backgroundColor: "rgba(26, 100, 248, 0.15)",
            border: "1px solid rgba(26, 100, 248, 0.4)",
            borderRadius: 24,
            padding: "6px 20px",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
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
            Chapter 01 / The Balance Sheet
          </span>
        </div>

        {/* The VC Exit Loot Card */}
        <div
          style={{
            transform: `scale(${scene1Spring})`,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "1.5px solid rgba(255, 59, 48, 0.4)",
            borderRadius: 20,
            padding: "24px 32px",
            width: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div>
            <span
              style={{
                color: "#FF3B30",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Past Tech IPO Playbook
            </span>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 28,
                fontWeight: 900,
                marginTop: 4,
              }}
            >
              Offer For Sale (OFS) Cashout
            </div>
            <p
              style={{
                color: "#94A3B8",
                fontSize: 18,
                fontWeight: 600,
                margin: "4px 0 0",
              }}
            >
              Early VCs dump loss-making shares into retail hands.
            </p>
          </div>
          <div
            style={{
              fontSize: 48,
              backgroundColor: "rgba(255, 59, 48, 0.12)",
              padding: "12px 18px",
              borderRadius: 16,
              border: "1px solid #FF3B30",
            }}
          >
            🚪💸
          </div>
        </div>
      </div>
    );
  }

  // Mode B: Full-Screen 0% OFS Takeover
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
        opacity: (1 - exitProgress) * Math.min(1, (localFrame - 128) / 10),
        zIndex: 40,
      }}
    >
      {/* Massive Glowing Green Shield */}
      <div
        style={{
          transform: `scale(${shieldSpring})`,
          backgroundColor: "rgba(19, 25, 36, 0.95)",
          border: "3px solid #00D09C",
          borderRadius: 36,
          padding: "50px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(0, 208, 156, 0.3)",
          marginBottom: 50,
          maxWidth: 920,
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 16 }}>🛡️</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            fontFamily: "'Inter', sans-serif",
            color: "#00D09C",
            letterSpacing: -1,
            textShadow: "0 0 35px rgba(0, 208, 156, 0.5)",
            marginBottom: 10,
          }}
        >
          0% OFS
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          ZERO OFFER FOR SALE
        </div>
        <p
          style={{
            color: "#94A3B8",
            fontSize: 24,
            fontWeight: 600,
            textAlign: "center",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          Promoters & early tech giants are NOT cashing out a single rupee.
        </p>
      </div>

      {/* Audited Fact Rubber Stamp */}
      {localFrame >= 150 && (
        <div
          style={{
            transform: `scale(${stampSpring}) rotate(-5deg)`,
            border: "6px solid #00D09C",
            backgroundColor: "rgba(0, 208, 156, 0.15)",
            borderRadius: 16,
            padding: "16px 48px",
            boxShadow: "0 0 40px rgba(0, 208, 156, 0.4)",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              fontFamily: "'Inter', sans-serif",
              color: "#00D09C",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            100% CAPITAL INTEGRITY
          </div>
        </div>
      )}
    </div>
  );
};
