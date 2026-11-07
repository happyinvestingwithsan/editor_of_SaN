import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene12_YoutubeCTA: React.FC<SceneProps> = ({
  startFrame = 2320,
  durationFrames = 519,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Entrance spring snaps to frame 0 (abs 2320: "I just released a complete step-by-step deep dive video...")
  const cardEntrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Checklist 1 snaps strictly to frame 101 (abs 2421: "We analyze balance sheet...")
  const item1Spring = spring({
    frame: localFrame - 101,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Checklist 2 snaps strictly to frame 154 (abs 2474: "understand the chart pattern...")
  const item2Spring = spring({
    frame: localFrame - 154,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Checklist 3 snaps strictly to frame 197 (abs 2517: "exact risk management strategy...")
  const item3Spring = spring({
    frame: localFrame - 197,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Link in bio / pinned comment button snaps strictly to frame 342 (abs 2662: "click the link in the bio...")
  const ctaSpring = spring({
    frame: localFrame - 342,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const buttonPulse = 1 + Math.sin(localFrame * 0.18) * 0.04;

  // Fade out transition at frame 480 (abs 2800) when SaN punches to full facecam for "See you in the next one"
  const fadeOutForFullFacecam = interpolate(
    localFrame,
    [475, 485],
    [1, 0],
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
        padding: "24px 36px 14px",
        boxSizing: "border-box",
        opacity: fadeOutForFullFacecam * interpolate(cardEntrance, [0, 1], [0, 1]),
        transform: `scale(${interpolate(cardEntrance, [0, 1], [0.94, 1])})`,
        fontFamily: EQUITAS_THEME.fonts.display,
        zIndex: 35,
      }}
    >
      {/* 1. YouTube Stream Header Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 24px",
          backgroundColor: "rgba(255, 0, 0, 0.18)",
          border: "2px solid #FF0000",
          borderRadius: 999,
          boxShadow: "0 0 25px rgba(255, 0, 0, 0.4)",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 22,
            height: 16,
            backgroundColor: "#FF0000",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "3.5px solid transparent",
              borderBottom: "3.5px solid transparent",
              borderLeft: "7px solid #FFFFFF",
            }}
          />
        </div>
        <span style={{ fontSize: 18, fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.1em" }}>
          NOW STREAMING ON YOUTUBE
        </span>
      </div>

      {/* 2. Main YouTube CTA Card (Fitting 1080x718 Top Stage) */}
      <div
        style={{
          width: 980,
          backgroundColor: "rgba(23, 27, 33, 0.98)",
          borderRadius: 24,
          padding: "24px 36px",
          border: "2px solid rgba(15, 143, 135, 0.5)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.85), 0 0 35px rgba(15, 143, 135, 0.25)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxSizing: "border-box",
        }}
      >
        {/* Channel & Video Title Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#0F8F87",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              H
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF" }}>Happy Investing</div>
              <div style={{ fontSize: 15, color: "#00D09C", fontWeight: 700 }}>Full Masterclass Breakdown</div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 176, 32, 0.2)",
              border: "1.5px solid #FFB020",
              color: "#FFB020",
              padding: "6px 16px",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 900,
            }}
          >
            YOUTUBE DEEP DIVE
          </div>
        </div>

        {/* 3 Core Learning Points Checklist (Large Mobile Text) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
          {/* Item 1: Balance Sheet (Snaps to frame 101) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "10px 18px",
              borderRadius: 14,
              transform: `translateX(${interpolate(item1Spring, [0, 1], [-30, 0])}px)`,
              opacity: interpolate(item1Spring, [0, 1], [0, 1]),
            }}
          >
            <span style={{ fontSize: 22, color: "#00D09C", fontWeight: 900 }}>✓</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF" }}>
              Complete Audited Balance Sheet Forensic Audit
            </span>
          </div>

          {/* Item 2: Chart Patterns & 200 DMA (Snaps to frame 154) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "10px 18px",
              borderRadius: 14,
              transform: `translateX(${interpolate(item2Spring, [0, 1], [-30, 0])}px)`,
              opacity: interpolate(item2Spring, [0, 1], [0, 1]),
            }}
          >
            <span style={{ fontSize: 22, color: "#00D09C", fontWeight: 900 }}>✓</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF" }}>
              Chart Patterns & 200 DMA Key Reversal Levels
            </span>
          </div>

          {/* Item 3: Risk Management (Snaps to frame 197) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "10px 18px",
              borderRadius: 14,
              transform: `translateX(${interpolate(item3Spring, [0, 1], [-30, 0])}px)`,
              opacity: interpolate(item3Spring, [0, 1], [0, 1]),
            }}
          >
            <span style={{ fontSize: 22, color: "#00D09C", fontWeight: 900 }}>✓</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF" }}>
              Exact Risk Management & Position Sizing Strategy
            </span>
          </div>
        </div>

        {/* Action Button: Click Link in Bio / Pinned Comment (Snaps to frame 342) */}
        {localFrame >= 342 && (
          <div
            style={{
              marginTop: 4,
              backgroundColor: "#0F8F87",
              borderRadius: 16,
              padding: "14px 28px",
              boxShadow: "0 10px 30px rgba(15, 143, 135, 0.6), 0 0 25px rgba(0, 208, 156, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              border: "2px solid #00D09C",
              transform: `scale(${interpolate(ctaSpring, [0, 1], [0.85, 1]) * buttonPulse})`,
              opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
            }}
          >
            <span style={{ fontSize: 26 }}>👉</span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              CLICK LINK IN BIO / PINNED COMMENT
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
