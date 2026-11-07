import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelDrhpStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 360,
  durationFrames = 172, // 360 to 532
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // 3D booklet entrance
  const bookletSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Highlighter sweep (animates width 0% to 100% between localFrame 20 and 55)
  const highlightWidth = interpolate(localFrame, [20, 55], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge entrance
  const badgeSpring = spring({
    frame: localFrame - 45,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Exit
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
      {/* 2.5D Perspective DRHP Document Card */}
      <div
        style={{
          transform: `perspective(1200px) rotateX(8deg) rotateY(-4deg) scale(${bookletSpring})`,
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          padding: "24px 36px",
          width: 900,
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0, 208, 156, 0.2)",
          border: "2px solid rgba(226, 232, 240, 0.9)",
          marginBottom: 16,
        }}
      >
        {/* SEBI Header Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1.5px solid #E2E8F0",
            paddingBottom: 10,
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: "#0B57D0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              §
            </div>
            <span
              style={{
                color: "#0B57D0",
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: 1.5,
              }}
            >
              SEBI OFFICIAL REGULATORY FILING
            </span>
          </div>
          <span
            style={{
              color: "#64748B",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            REF: DRHP/2026/041
          </span>
        </div>

        {/* Highlighted Headline */}
        <div style={{ position: "relative", marginBottom: 8 }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: `${highlightWidth}%`,
              backgroundColor: "rgba(255, 230, 0, 0.45)",
              borderRadius: 6,
              transform: "skewX(-6deg)",
              transition: "width 0.05s linear",
            }}
          />
          <h2
            style={{
              margin: 0,
              color: "#0F172A",
              fontSize: 30,
              fontWeight: 900,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.2,
              position: "relative",
              zIndex: 2,
            }}
          >
            400-PAGE DRAFT RED HERRING PROSPECTUS
          </h2>
        </div>

        <p
          style={{
            margin: 0,
            color: "#475569",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.35,
          }}
        >
          Forensic audited balance sheet, fresh capital deployment & OFS reconciliation.
        </p>
      </div>

      {/* 90 Seconds Breakdown Timer Badge */}
      {localFrame >= 45 && (
        <div
          style={{
            transform: `scale(${badgeSpring})`,
            backgroundColor: "#131924",
            border: "1.5px solid #00D09C",
            borderRadius: 24,
            padding: "8px 26px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 8px 30px rgba(0, 208, 156, 0.25)",
          }}
        >
          <span style={{ fontSize: 20 }}>⚡</span>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 0.5,
            }}
          >
            COMPLETE BREAKDOWN IN{" "}
            <span style={{ color: "#00D09C", fontWeight: 900 }}>90 SECONDS</span>
          </span>
        </div>
      )}
    </div>
  );
};
