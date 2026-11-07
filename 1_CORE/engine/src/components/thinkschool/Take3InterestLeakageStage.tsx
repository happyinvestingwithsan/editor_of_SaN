import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take3InterestLeakageStageProps {
  localFrame: number;
}

/**
 * Scene 5: The > ₹8,000 Cr Annual Interest Leak (Frames 1570 - 1828 | 52.3s - 60.9s | 258 frames)
 * Starts on the EXACT syllable "over 8,000 crore"!
 * Layout: SaN on Left Column (x=60, w=620).
 * Motion Graphics on Right Stage (x=700, w=1160, h=940).
 * Mobile-Optimized:
 * - Massive 96px bold typography for "> ₹8,000 CRORE"
 * - 24px high-contrast amber daily drain badge
 * - Zero tiny text or small crowded pipes
 */
export const Take3InterestLeakageStage: React.FC<Take3InterestLeakageStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring on exact frame 1570
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Pulse effect on the 8,000 Cr number
  const pulse = Math.sin(localFrame * 0.25) * 0.05 + 1;

  // Counter rapid roll to 8,000 Cr in first 20 frames
  const costCounter = Math.round(
    interpolate(localFrame, [0, 25], [0, 8000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 700,
        top: 70,
        width: 1160,
        height: 940,
        backgroundColor: "rgba(10, 15, 25, 0.95)",
        borderRadius: 24,
        border: "2px solid rgba(239, 68, 68, 0.5)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 50px rgba(239, 68, 68, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
        transform: `scale(${enterSpring})`,
        opacity: enterSpring,
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Mobile-Readable Pill */}
      <div
        style={{
          background: "rgba(239, 68, 68, 0.2)",
          border: "1.5px solid rgba(239, 68, 68, 0.6)",
          borderRadius: 24,
          padding: "8px 28px",
          color: "#FCA5A5",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 2.5,
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        ANNUAL P&L FRICTION // THE DEBT PENALTY
      </div>

      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: "#E2E8F0",
          textAlign: "center",
        }}
      >
        Servicing Infrastructure Debt Cost Jio:
      </div>

      {/* The Giant Mobile-Optimized ₹8,000 Cr Number */}
      <div
        style={{
          fontSize: 104,
          fontWeight: 900,
          color: "#EF4444",
          marginTop: 12,
          letterSpacing: -2,
          textShadow: "0 0 40px rgba(239, 68, 68, 0.6)",
          transform: `scale(${pulse})`,
          textAlign: "center",
        }}
      >
        &gt; ₹{costCounter.toLocaleString("en-IN")} CR
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: "#FECACA",
          marginTop: 4,
          letterSpacing: 1,
        }}
      >
        IN ANNUAL FINANCE & INTEREST CHARGES
      </div>

      {/* High-Impact Daily Bleed Callout Badge */}
      <div
        style={{
          marginTop: 36,
          background: "rgba(15, 23, 42, 0.95)",
          border: "2px solid #F59E0B",
          borderRadius: 20,
          padding: "16px 36px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.7)",
        }}
      >
        <span style={{ fontSize: 32 }}>🚨</span>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#F59E0B" }}>
            ~₹21.9 CRORE DRAINED EVERY 24 HOURS
          </div>
          <div style={{ fontSize: 16, color: "#94A3B8", fontWeight: 600 }}>
            Paid directly to commercial banks before reaching shareholders
          </div>
        </div>
      </div>
    </div>
  );
};
