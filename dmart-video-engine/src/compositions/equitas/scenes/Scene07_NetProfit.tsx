import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene07_NetProfit: React.FC<SceneProps> = ({
  startFrame = 1340,
  durationFrames = 270,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Header entrance snaps to frame 20 (abs 1360: "In last quarter...")
  const entrance = spring({
    frame: localFrame - 20,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Profit counter starts strictly at frame 60 (abs 1400: "Equitas printed 218 crores...")
  const profitCounter = Math.round(
    interpolate(localFrame, [60, 110], [0, 218], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Quarterly Bars rise progress starts at frame 60 along with spoken words
  const bar1 = interpolate(localFrame, [60, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar2 = interpolate(localFrame, [70, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar3 = interpolate(localFrame, [80, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar4 = interpolate(localFrame, [90, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Trophy badge entrance snaps strictly to frame 186 (abs 1526: "highest profit in the bank's entire history")
  const trophySpring = spring({
    frame: localFrame - 186,
    fps,
    config: { damping: 11, stiffness: 150 },
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
        justifyContent: "space-between",
        padding: "24px 36px 14px",
        boxSizing: "border-box",
        opacity: (1 - exitProgress) * interpolate(entrance, [0, 1], [0, 1]),
        transform: `translateY(${exitProgress * -20}px)`,
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {/* 1. Top Row: Record Profit Header & Trophy (No enclosed nested box) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#94A3B8",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            LATEST QUARTER NET PROFIT (PAT)
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
            ₹{profitCounter} <span style={{ fontSize: 44, color: "#FFFFFF" }}>CRORES</span>
          </div>
        </div>

        {/* Trophy Badge (Snaps strictly to frame 186: 'highest profit') */}
        {localFrame >= 186 && (
          <div
            style={{
              backgroundColor: "rgba(255, 176, 32, 0.2)",
              border: "2.5px solid #FFB020",
              borderRadius: 20,
              padding: "14px 28px",
              textAlign: "center",
              transform: `scale(${interpolate(trophySpring, [0, 1], [0.75, 1])})`,
              opacity: interpolate(trophySpring, [0, 1], [0, 1]),
              boxShadow: "0 0 35px rgba(255, 176, 32, 0.5)",
            }}
          >
            <div style={{ fontSize: 36 }}>🏆</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#FFB020", marginTop: 4 }}>
              ALL-TIME RECORD
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF" }}>
              HIGHEST IN HISTORY
            </div>
          </div>
        )}
      </div>

      {/* 2. Unboxed Open Visual Quarterly Bar Graph (Directly articulated across canvas) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: 380,
          padding: "0 16px 10px",
          boxSizing: "border-box",
        }}
      >
        {[
          { q: "Q1 FY24", val: 191, progress: bar1, color: "#334155", h: 200, highlight: false },
          { q: "Q2 FY24", val: 198, progress: bar2, color: "#334155", h: 225, highlight: false },
          { q: "Q3 FY24", val: 202, progress: bar3, color: "#334155", h: 250, highlight: false },
          { q: "Q4 RECORD", val: 218, progress: bar4, color: "#00D09C", h: 310, highlight: true },
        ].map((bar, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              width: 220,
            }}
          >
            {/* Value Label Above Bar (Large Mobile Font) */}
            <div
              style={{
                fontSize: bar.highlight ? 32 : 26,
                fontWeight: 900,
                fontFamily: EQUITAS_THEME.fonts.mono,
                color: bar.highlight ? "#00D09C" : "#94A3B8",
                opacity: bar.progress,
                textShadow: bar.highlight ? "0 0 20px rgba(0, 208, 156, 0.8)" : "none",
                transform: `scale(${bar.progress})`,
              }}
            >
              ₹{bar.val} Cr
            </div>

            {/* Pillar Bar (Wide & Open) */}
            <div
              style={{
                width: 140,
                height: bar.h * bar.progress,
                background: bar.highlight
                  ? "linear-gradient(180deg, #00D09C 0%, #0F8F87 100%)"
                  : "linear-gradient(180deg, #475569 0%, #1E293B 100%)",
                borderRadius: "16px 16px 6px 6px",
                border: bar.highlight ? "2.5px solid #00D09C" : "1.5px solid rgba(255,255,255,0.1)",
                boxShadow: bar.highlight ? "0 0 35px rgba(0, 208, 156, 0.7)" : "none",
                transition: "height 0.1s ease",
              }}
            />

            {/* Quarter Label (Large Mobile Font) */}
            <div
              style={{
                fontSize: bar.highlight ? 26 : 22,
                fontWeight: bar.highlight ? 900 : 700,
                color: bar.highlight ? "#FFFFFF" : "#64748B",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {bar.q}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
