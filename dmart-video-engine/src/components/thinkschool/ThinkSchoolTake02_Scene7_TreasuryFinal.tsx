import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface ThinkSchoolTake02_Scene7_TreasuryFinalProps {
  localFrame: number;
}

/**
 * Chunk 8: 100% Treasury Inflow Vault (Chapter 2 Climax)
 * Right 68% Stage (x=660, w=1200) with SaN in Left 32% Tall Frame (x=40).
 * Relative Frames: 0 to 238 (Master Frames 3084 to 3322 | 102.80s to 110.72s).
 */
export const ThinkSchoolTake02_Scene7_TreasuryFinal: React.FC<
  ThinkSchoolTake02_Scene7_TreasuryFinalProps
> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Header entrance
  const headerSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word-synced: Local Frame 0 (Master Frame 3084: "Every single rupee raised in this 30,000 crore issue")
  const vaultCardSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // Word-synced: Local Frame 80 (Master Frame 3164: "fresh issue capital")
  const p1 = spring({
    frame: Math.max(0, localFrame - 50),
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const p2 = spring({
    frame: Math.max(0, localFrame - 75),
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const p3 = spring({
    frame: Math.max(0, localFrame - 100),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Word-synced: Local Frame 174 (Master Frame 3258: "into the company's own bank account")
  const stampSpring = spring({
    frame: Math.max(0, localFrame - 150),
    fps,
    config: { damping: 11, stiffness: 180 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 660,
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

      {/* Header */}
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
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#10B981",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}
        >
          CHAPTER 2 CONCLUSION // 100% CAPITAL INTEGRITY
        </div>
        <h1
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Entering the <span style={{ color: "#10B981" }}>Company's Own Account</span>
        </h1>
      </div>

      {/* Main Treasury Graphic */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 50,
          right: 50,
          display: "grid",
          gridTemplateColumns: "1.1fr 1.3fr",
          gap: 28,
        }}
      >
        {/* Left: ₹30,000 Cr Issue Inflow Box */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(16, 185, 129, 0.6)",
            borderRadius: 20,
            padding: 26,
            boxShadow: "0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(16, 185, 129, 0.2)",
            opacity: vaultCardSpring,
            transform: `scale(${vaultCardSpring})`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ color: "#10B981", fontSize: 13, fontWeight: 800, letterSpacing: "0.1em" }}>
            100% FRESH ISSUE CAPITAL
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 44, fontWeight: 900, marginTop: 8 }}>
            ₹30,000 CRORE
          </div>
          <div style={{ color: "#A7F3D0", fontSize: 15, fontWeight: 600, marginTop: 4 }}>
            Zero Shares Sold by Insiders
          </div>

          <div
            style={{
              marginTop: 20,
              padding: 14,
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              borderRadius: 12,
              border: "1px dashed rgba(16, 185, 129, 0.4)",
              color: "#E2E8F0",
              fontSize: 13,
            }}
          >
            Designated Escrow: <strong>SBI & HDFC Bank</strong>
            <br />
            Operating Company: <strong>Reliance Jio Infocomm Ltd</strong>
          </div>
        </div>

        {/* Right: The 3 Statutory Realities */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Point 1 */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1.5px solid rgba(239, 68, 68, 0.4)",
              borderRadius: 14,
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: p1,
              transform: `translateX(${interpolate(p1, [0, 1], [30, 0])}px)`,
            }}
          >
            <div>
              <div style={{ color: "#FFF", fontSize: 16, fontWeight: 800 }}>Mukesh Ambani & Promoters</div>
              <div style={{ color: "#94A3B8", fontSize: 12 }}>No extraction of wealth</div>
            </div>
            <span
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "#EF4444",
                fontWeight: 900,
                fontSize: 16,
                padding: "4px 14px",
                borderRadius: 6,
              }}
            >
              ₹0 RECEIVED
            </span>
          </div>

          {/* Point 2 */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1.5px solid rgba(239, 68, 68, 0.4)",
              borderRadius: 14,
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: p2,
              transform: `translateX(${interpolate(p2, [0, 1], [30, 0])}px)`,
            }}
          >
            <div>
              <div style={{ color: "#FFF", fontSize: 16, fontWeight: 800 }}>Meta & Google Monopolies</div>
              <div style={{ color: "#94A3B8", fontSize: 12 }}>Zero emergency exit dump</div>
            </div>
            <span
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "#EF4444",
                fontWeight: 900,
                fontSize: 16,
                padding: "4px 14px",
                borderRadius: 6,
              }}
            >
              ₹0 RECEIVED
            </span>
          </div>

          {/* Point 3 */}
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "2px solid #10B981",
              borderRadius: 14,
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: p3,
              transform: `translateX(${interpolate(p3, [0, 1], [30, 0])}px)`,
            }}
          >
            <div>
              <div style={{ color: "#FFF", fontSize: 18, fontWeight: 900 }}>Prepay ₹27,500 Cr Debt</div>
              <div style={{ color: "#A7F3D0", fontSize: 12 }}>Eliminates ₹3,500 Cr/yr interest expense!</div>
            </div>
            <span
              style={{
                backgroundColor: "#10B981",
                color: "#000",
                fontWeight: 900,
                fontSize: 16,
                padding: "5px 14px",
                borderRadius: 6,
              }}
            >
              100% ACCRETIVE
            </span>
          </div>
        </div>
      </div>

      {/* Climax Stamp (Word-Synced at Frame 174) */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 50,
          transform: `rotate(-3deg) scale(${interpolate(stampSpring, [0, 1], [3, 1])})`,
          opacity: stampSpring,
          backgroundColor: "#10B981",
          color: "#000",
          border: "4px solid #FFFFFF",
          padding: "14px 32px",
          borderRadius: 12,
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: "0.08em",
          boxShadow: "0 20px 50px rgba(16, 185, 129, 0.6)",
          zIndex: 30,
        }}
      >
        ✔ 100% BALANCE SHEET ACCRETIVE CAPITAL
      </div>
    </div>
  );
};
