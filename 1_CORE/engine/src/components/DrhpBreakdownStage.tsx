import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export interface DrhpBreakdownStageProps {
  absoluteFrame?: number;
}

const FLUID_SPRING = {
  damping: 16,
  mass: 0.9,
  stiffness: 120,
};

const STAMP_SPRING = {
  damping: 12,
  mass: 0.6,
  stiffness: 180,
};

/**
 * DrhpBreakdownStage:
 * Authentic 2.5D Regulatory DRHP Prospectus Breakdown Stage for Clip 4.
 * Sits in Left Box (Left 80px, Top 100px, 860x880).
 * Duration: 302 frames (10.07s).
 */
export const DrhpBreakdownStage: React.FC<DrhpBreakdownStageProps> = ({
  absoluteFrame,
}) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame = absoluteFrame !== undefined ? absoluteFrame : localFrame;

  // Entrance spring (starts at frame 15)
  const entrance = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: FLUID_SPRING,
  });

  const cardY = interpolate(entrance, [0, 1], [35, 0]);
  const cardOpacity = interpolate(frame, [15, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow Ken Burns camera drift
  const pushIn = interpolate(frame, [15, 302], [1.0, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  });

  // Official SEBI Stamp slam at Frame 65
  const stampSpring = spring({
    frame: Math.max(0, frame - 65),
    fps,
    config: STAMP_SPRING,
  });
  const stampScale = interpolate(stampSpring, [0, 1], [2.2, 1.0]);
  const stampOpacity = frame >= 65 ? interpolate(frame, [65, 70], [0, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 0;

  // Yellow Marker Sweep across key DRHP finding (Frames 80 - 110)
  const markerHighlight = interpolate(frame, [80, 110], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  if (frame < 15) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        left: 80,
        width: 860,
        height: 880,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        perspective: 1400,
      }}
    >
      <div
        style={{
          width: 820,
          height: 840,
          opacity: cardOpacity,
          transform: `translateY(${cardY}px) scale(${entrance * pushIn}) rotateX(2.5deg) rotateY(-1.5deg)`,
          backgroundColor: "#F7F5EE", // Natural warm paper tone
          color: "#18181B",
          borderRadius: 10,
          padding: "36px 42px",
          boxShadow:
            "0 35px 80px rgba(0, 0, 0, 0.75), 0 6px 20px rgba(0, 0, 0, 0.35)",
          border: "1px solid rgba(0, 0, 0, 0.16)",
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "'Georgia', serif",
        }}
      >
        {/* Subtle Paper Grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 6px)",
            pointerEvents: "none",
          }}
        />

        {/* Header */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderBottom: "3px double #18181B",
              paddingBottom: 10,
              marginBottom: 16,
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#18181B",
                  display: "block",
                  lineHeight: 1.0,
                }}
              >
                REGULATORY FORENSIC DOSSIER
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  color: "#71717A",
                  textTransform: "uppercase",
                  marginTop: 4,
                  display: "block",
                }}
              >
                SECURITIES AND EXCHANGE BOARD OF INDIA (SEBI) FILING
              </span>
            </div>

            {frame >= 65 && (
              <div
                style={{
                  opacity: stampOpacity,
                  transform: `scale(${stampScale}) rotate(-5deg)`,
                  border: "3px solid #065F46",
                  color: "#065F46",
                  padding: "4px 10px",
                  borderRadius: 4,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: "rgba(209, 250, 229, 0.9)",
                  boxShadow: "0 2px 8px rgba(6, 95, 70, 0.25)",
                }}
              >
                ✔ 400-PAGE DRHP AUDITED
              </div>
            )}
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.2,
              margin: 0,
              marginBottom: 8,
            }}
          >
            Dissecting the Real Balance-Sheet Transformation Behind the Numbers
          </h2>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "#52525B",
              marginBottom: 16,
              position: "relative",
            }}
          >
            <span style={{ position: "relative", zIndex: 2 }}>
              We analyzed every page of the prospectus to identify capital flows vs accounting profits:
            </span>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${markerHighlight}%`,
                backgroundColor: "#FDE047",
                mixBlendMode: "multiply",
                opacity: 0.65,
                zIndex: 1,
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        {/* DRHP Core Scans & Ledger Points */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderLeft: "5px solid #065F46",
              borderRadius: 6,
              padding: "14px 18px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  color: "#065F46",
                  textTransform: "uppercase",
                }}
              >
                CHAPTER 01 • PROSPECTUS DISSECTION
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: "#18181B" }}>
                PAGE 1 – 400
              </span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 800, color: "#18181B", marginTop: 4 }}>
              Audited Financials & Capital Utilization Structure
            </div>
            <div style={{ fontSize: 12, fontFamily: "'Inter', sans-serif", color: "#4B5563", marginTop: 4 }}>
              Zero promoter OFS. 100% of capital entering treasury for debt reduction.
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderLeft: "5px solid #2563EB",
              borderRadius: 6,
              padding: "14px 18px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  color: "#2563EB",
                  textTransform: "uppercase",
                }}
              >
                CHAPTER 02 • BALANCE SHEET SHIFT
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: "#18181B" }}>
                ₹27,500 CR
              </span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 800, color: "#18181B", marginTop: 4 }}>
              Prepayment of Commercial Infrastructure Debt
            </div>
            <div style={{ fontSize: 12, fontFamily: "'Inter', sans-serif", color: "#4B5563", marginTop: 4 }}>
              Retires high-cost borrowings, saving ~₹3,500–4,000 Cr annual interest costs straight to PAT.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "2px solid #18181B",
            paddingTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B7280" }}>
            OFFICIAL SEBI FILING AUDIT
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 800, color: "#18181B" }}>
            HIGH INSTITUTIONAL INTEGRITY
          </span>
        </div>
      </div>
    </div>
  );
};
