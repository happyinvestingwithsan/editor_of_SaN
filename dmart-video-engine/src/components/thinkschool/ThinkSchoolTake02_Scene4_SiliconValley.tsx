import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface ThinkSchoolTake02_Scene4_SiliconValleyProps {
  localFrame: number;
}

/**
 * Chunk 5: Silicon Valley 2020 Pandemic Alliance
 * Left 68% Stage (x=60, w=1200) with SaN in Right 32% Tall Frame (x=1300).
 * Relative Frames: 0 to 607 (Master Frames 1597 to 2204 | 53.24s to 73.46s).
 */
export const ThinkSchoolTake02_Scene4_SiliconValley: React.FC<
  ThinkSchoolTake02_Scene4_SiliconValleyProps
> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Header entrance
  const headerSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word-synced: Local Frame 289 (Master Frame 1886: "Meta invested 43,574 crore")
  const metaSpring = spring({
    frame: Math.max(0, localFrame - 270),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Word-synced: Local Frame 383 (Master Frame 1980: "Google invested 33,737 crore")
  const googleSpring = spring({
    frame: Math.max(0, localFrame - 360),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Word-synced: Local Frame 561 (Master Frame 2158: "65 billion dollars")
  const counterVal = Math.round(
    interpolate(localFrame, [540, 580], [0, 65], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const bracketSpring = spring({
    frame: Math.max(0, localFrame - 540),
    fps,
    config: { damping: 11, stiffness: 150 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 50,
        width: 1200,
        height: 980,
        backgroundColor: "rgba(11, 15, 23, 0.95)",
        borderRadius: 24,
        border: "1.5px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Blueprint Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header Banner */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 50,
          right: 50,
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "5px 12px",
            borderRadius: 6,
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            color: "#60A5FA",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}
        >
          2020 MID-PANDEMIC CAPITAL ALLIANCE
        </div>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          When Silicon Valley Backed Jio:{" "}
          <span style={{ color: "#D4AF37" }}>The $65B Deal</span>
        </h1>
      </div>

      {/* Dual Deal Dossiers */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 50,
          right: 50,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        {/* Meta Dossier (Frame 289) */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(6, 104, 225, 0.6)",
            borderRadius: 20,
            padding: 24,
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 104, 225, 0.15)",
            opacity: metaSpring,
            transform: `translateY(${interpolate(metaSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "#60A5FA", fontWeight: 800, fontSize: 12, letterSpacing: "0.08em" }}>
                ROUND 01: APRIL 2020
              </div>
              <div style={{ color: "#FFF", fontSize: 26, fontWeight: 900 }}>META (FACEBOOK)</div>
            </div>
            <span
              style={{
                backgroundColor: "rgba(6, 104, 225, 0.2)",
                color: "#60A5FA",
                fontWeight: 900,
                fontSize: 14,
                padding: "4px 12px",
                borderRadius: 8,
              }}
            >
              9.99% STAKE
            </span>
          </div>

          <div
            style={{
              marginTop: 18,
              padding: 16,
              backgroundColor: "rgba(6, 104, 225, 0.1)",
              borderRadius: 12,
              border: "1px dashed rgba(6, 104, 225, 0.4)",
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 13 }}>Capital Deployed</div>
            <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900, marginTop: 4 }}>
              ₹43,574 CRORE
            </div>
            <div style={{ color: "#93C5FD", fontSize: 15, fontWeight: 700, marginTop: 2 }}>
              ≈ $5.7 Billion USD
            </div>
          </div>

          <div style={{ marginTop: 14, color: "#94A3B8", fontSize: 13 }}>
            Signatory: <strong style={{ color: "#FFF" }}>Mark Zuckerberg</strong>
          </div>
        </div>

        {/* Google Dossier (Frame 383) */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(66, 133, 244, 0.6)",
            borderRadius: 20,
            padding: 24,
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(66, 133, 244, 0.15)",
            opacity: googleSpring,
            transform: `translateY(${interpolate(googleSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "#93C5FD", fontWeight: 800, fontSize: 12, letterSpacing: "0.08em" }}>
                ROUND 02: JULY 2020
              </div>
              <div style={{ color: "#FFF", fontSize: 26, fontWeight: 900 }}>GOOGLE (ALPHABET)</div>
            </div>
            <span
              style={{
                backgroundColor: "rgba(66, 133, 244, 0.2)",
                color: "#93C5FD",
                fontWeight: 900,
                fontSize: 14,
                padding: "4px 12px",
                borderRadius: 8,
              }}
            >
              7.73% STAKE
            </span>
          </div>

          <div
            style={{
              marginTop: 18,
              padding: 16,
              backgroundColor: "rgba(66, 133, 244, 0.1)",
              borderRadius: 12,
              border: "1px dashed rgba(66, 133, 244, 0.4)",
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 13 }}>Capital Deployed</div>
            <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900, marginTop: 4 }}>
              ₹33,737 CRORE
            </div>
            <div style={{ color: "#BFDBFE", fontSize: 15, fontWeight: 700, marginTop: 2 }}>
              ≈ $4.5 Billion USD
            </div>
          </div>

          <div style={{ marginTop: 14, color: "#94A3B8", fontSize: 13 }}>
            Signatory: <strong style={{ color: "#FFF" }}>Sundar Pichai</strong>
          </div>
        </div>
      </div>

      {/* Valuation Bracket (Word-Synced Frame 561) */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 50,
          right: 50,
          backgroundColor: "rgba(30, 41, 59, 0.95)",
          border: "2px solid rgba(212, 175, 55, 0.7)",
          borderRadius: 16,
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
          opacity: bracketSpring,
          transform: `scale(${bracketSpring})`,
        }}
      >
        <div>
          <div style={{ color: "#D4AF37", fontWeight: 800, fontSize: 13, letterSpacing: "0.1em" }}>
            2020 BASELINE VALUATION
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, marginTop: 2 }}>
            Jio Platforms Implied Valuation in 2020:
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#FBBF24", fontSize: 44, fontWeight: 900 }}>
            ${counterVal} BILLION
          </div>
          <div style={{ color: "#94A3B8", fontSize: 14, fontWeight: 600 }}>
            ≈ ₹4.91 Lakh Crore Market Value
          </div>
        </div>
      </div>
    </div>
  );
};
