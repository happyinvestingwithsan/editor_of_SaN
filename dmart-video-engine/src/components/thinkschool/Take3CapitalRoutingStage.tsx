import React from "react";
import { spring, useVideoConfig } from "remotion";

export interface Take3CapitalRoutingStageProps {
  localFrame: number;
}

/**
 * Scene 1: The Capital Routing Hub (Frames 0 - 204 | 0.0s - 6.8s)
 * Layout: SaN is on Left Column (600px, x=60).
 * Motion Graphics occupy Right Stage (1180px, x=680).
 * Word Sync:
 * - Frame 0 - 90: "So if promoter or not taking the money out..." -> Route A (OFS) visible
 * - Frame 90: "taking the money out" -> Iron Gate Slams on Route A (0.00% OFS)
 * - Frame 143: "where does this 30,000 crore" -> Central Vault illuminates ₹30,000 CR
 * - Frame 173: "actually go?" -> Route B pulsing amber question mark ignites
 */
export const Take3CapitalRoutingStage: React.FC<Take3CapitalRoutingStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Lock gate slam (Word: "taking money out" @ Frame 90)
  const lockGateSlam = spring({
    frame: Math.max(0, localFrame - 85),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // Vault illumination (Word: "30,000 crore" @ Frame 143)
  const vaultGlow = spring({
    frame: Math.max(0, localFrame - 135),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Question mark pulse (Word: "actually go?" @ Frame 173+)
  const questionPulse = localFrame >= 170 ? Math.sin((localFrame - 170) * 0.25) * 0.12 + 1 : 0.8;

  return (
    <div
      style={{
        position: "absolute",
        left: 680,
        top: 70,
        width: 1180,
        height: 940,
        backgroundColor: "rgba(10, 15, 25, 0.95)",
        borderRadius: 24,
        border: "1.5px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "44px 50px",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Top Category Badge */}
      <div
        style={{
          background: "rgba(212, 175, 55, 0.12)",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          borderRadius: 20,
          padding: "6px 20px",
          color: "#D4AF37",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 14,
          opacity: enterSpring,
        }}
      >
        CAPITAL ALLOCATION FORENSIC // CHAPTER 3
      </div>

      {/* Main Headline */}
      <h2
        style={{
          fontSize: 38,
          fontWeight: 800,
          color: "#FFFFFF",
          margin: 0,
          textAlign: "center",
          opacity: enterSpring,
        }}
      >
        Where Does Your <span style={{ color: "#D4AF37" }}>₹30,000 Crore</span> Actually Go?
      </h2>

      {/* Top Central Vault (Illuminates on frame 143) */}
      <div
        style={{
          marginTop: 36,
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
          border: `2px solid ${localFrame >= 143 ? "#D4AF37" : "rgba(255, 255, 255, 0.2)"}`,
          borderRadius: 20,
          padding: "20px 48px",
          textAlign: "center",
          boxShadow: localFrame >= 143
            ? "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(212, 175, 55, 0.4)"
            : "0 10px 30px rgba(0, 0, 0, 0.6)",
          transform: `scale(${vaultGlow})`,
          opacity: vaultGlow,
          transition: "all 0.3s ease",
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700, letterSpacing: 1.5 }}>
          TOTAL IPO PROCEEDS INFLOW
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, color: "#D4AF37", marginTop: 2 }}>
          ₹30,213 CRORE
        </div>
        <div style={{ fontSize: 13, color: "#00E599", fontWeight: 700, marginTop: 2 }}>
          100% FRESH CAPITAL
        </div>
      </div>

      {/* Dual Route Split Cards */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          gap: 30,
        }}
      >
        {/* ROUTE A: Promoter OFS (LOCKED at Frame 85) */}
        <div
          style={{
            flex: 1,
            position: "relative",
            background: "rgba(239, 68, 68, 0.08)",
            border: "1.5px solid rgba(239, 68, 68, 0.3)",
            borderRadius: 20,
            padding: "24px",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#EF4444", fontWeight: 700 }}>ROUTE A: INSIDERS</span>
            <span style={{ background: "rgba(239, 68, 68, 0.2)", color: "#EF4444", padding: "2px 8px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
              OFS: 0.00%
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#F87171", marginTop: 10 }}>
            ₹0 TO PROMOTERS
          </div>
          <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 8, lineHeight: 1.4 }}>
            Mukesh Ambani, RIL, Meta, and Google are taking exactly zero rupees out.
          </p>

          {/* Gate Slam Overlay */}
          {localFrame >= 85 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15, 23, 42, 0.92)",
                backdropFilter: "blur(4px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${lockGateSlam})`,
                opacity: lockGateSlam,
                border: "2px solid #EF4444",
              }}
            >
              <div style={{ fontSize: 36 }}>🔒</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#EF4444", marginTop: 4 }}>
                EXIT DOOR LOCKED
              </div>
              <div style={{ fontSize: 12, color: "#CBD5E1" }}>Zero Secondary Extraction</div>
            </div>
          )}
        </div>

        {/* ROUTE B: Real Destination (Pulsing Question at Frame 170) */}
        <div
          style={{
            flex: 1,
            position: "relative",
            background: "linear-gradient(135deg, rgba(6, 78, 59, 0.25), rgba(15, 23, 42, 0.8))",
            border: "2px solid #00E599",
            borderRadius: 20,
            padding: "24px",
            boxShadow: "0 0 30px rgba(0, 229, 153, 0.15)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#00E599", fontWeight: 700 }}>ROUTE B: THE REAL USE</span>
            <span style={{ background: "rgba(0, 229, 153, 0.2)", color: "#00E599", padding: "2px 8px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
              91.7% OF ISSUE
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#00E599", marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
            <span>₹27,500 CRORE</span>
            <span style={{ color: "#F59E0B", transform: `scale(${questionPulse})`, display: "inline-block" }}>
              ?
            </span>
          </div>
          <p style={{ fontSize: 13, color: "#CBD5E1", marginTop: 8, lineHeight: 1.4 }}>
            Direct infusion into Reliance Jio Infocomm to repay high-cost bank debt.
          </p>
        </div>
      </div>
    </div>
  );
};
