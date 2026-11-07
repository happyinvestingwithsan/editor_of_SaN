import React from "react";
import {
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

export interface ThinkSchoolGoldenScaleProps {
  localFrame: number;
}

/**
 * Scene 4: The Golden Balance Scale (Tech Trap vs Cash Engine)
 * Active Timeline: Frames 1937 - 2239 (localFrame 0 to 302 | 64.6s - 74.6s)
 *
 * Spoken Alignment:
 * - localFrame 0 - 177 (F1937 - F2114): "is Jio platform just another tech trap designed to transfer wealth from retail to insiders?"
 * - localFrame 177 - 302 (F2114 - F2239): "Or is this truly a fundamental different cash generating business?"
 */
export const ThinkSchoolGoldenScale: React.FC<ThinkSchoolGoldenScaleProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const cameraScale = interpolate(localFrame, [0, 302], [1.0, 1.03], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1.0),
    extrapolateRight: "clamp",
  });

  // Scale tilt animation:
  // Starts tilting left on "tech trap" (localFrame 40 - 120)
  // Counters with right pan on "cash generating business" (localFrame 180 - 260)
  const scaleTilt = interpolate(localFrame, [40, 120, 180, 260], [0, -10, -10, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const leftPanDrop = interpolate(localFrame, [40, 120, 180, 260], [0, 40, 40, -25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const rightPanRise = interpolate(localFrame, [40, 120, 180, 260], [0, -40, -40, 30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const questionMarkPulse =
    1.0 + Math.sin((localFrame / 30) * Math.PI * 2) * 0.08;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070A11",
        backgroundImage: `
          radial-gradient(circle at 50% 25%, rgba(245, 158, 11, 0.15) 0%, transparent 60%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 60px 60px, 60px 60px",
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "50px 80px 40px 80px",
        boxSizing: "border-box",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Editorial Header */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(245, 158, 11, 0.3)",
          paddingBottom: 18,
          transform: `translateY(${interpolate(entrance, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div>
          <div
            style={{
              color: "#F59E0B",
              fontSize: 13,
              letterSpacing: "0.25em",
              fontWeight: 800,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            ★ THE CRITICAL INVESTOR DILEMMA // VALUATION VS MOAT
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 40, fontWeight: 900 }}>
            The Billion-Dollar Question
          </div>
        </div>

        <div
          style={{
            background: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            borderRadius: 30,
            padding: "8px 22px",
            color: "#FDE68A",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.05em",
          }}
        >
          ALLOCATION VERDICT
        </div>
      </div>

      {/* Center Scale & Dual Thesis Arena */}
      <div
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          padding: "20px 30px",
          paddingLeft: 340, // Leaves room for floating circle facecam on bottom-left!
        }}
      >
        {/* Brass Balance Beam */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "25%",
            right: "15%",
            height: 6,
            background: "linear-gradient(90deg, #EF4444 0%, #F59E0B 50%, #10B981 100%)",
            borderRadius: 3,
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)",
            transform: `rotate(${scaleTilt}deg)`,
            transformOrigin: "center center",
            zIndex: 1,
          }}
        />

        {/* ================= LEFT THESIS: TECH TRAP ================= */}
        <div
          style={{
            width: 400,
            background: "linear-gradient(180deg, rgba(35, 15, 20, 0.9) 0%, rgba(15, 10, 15, 0.95) 100%)",
            border: "2px solid rgba(239, 68, 68, 0.5)",
            borderRadius: 16,
            padding: "30px 28px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
            transform: `translateY(${leftPanDrop}px)`,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              color: "#EF4444",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#EF4444",
                boxShadow: "0 0 10px #EF4444",
              }}
            />
            THESIS A: THE SKEPTIC'S VIEW
          </div>

          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900, marginTop: 6 }}>
            "Another Tech Trap?"
          </div>

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#EF4444", fontSize: 16, fontWeight: 900 }}>✖</span>
              <span style={{ color: "#CBD5E1", fontSize: 14, fontWeight: 600 }}>
                Transfer of wealth from retail to insiders
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#EF4444", fontSize: 16, fontWeight: 900 }}>✖</span>
              <span style={{ color: "#CBD5E1", fontSize: 14, fontWeight: 600 }}>
                VC / PE early investors secondary dumping
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#EF4444", fontSize: 16, fontWeight: 900 }}>✖</span>
              <span style={{ color: "#CBD5E1", fontSize: 14, fontWeight: 600 }}>
                Extreme ₹10 Lakh Cr+ PE Multiple
              </span>
            </div>
          </div>
        </div>

        {/* Center Pulsating Question Mark */}
        <div
          style={{
            position: "absolute",
            left: "60%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${questionMarkPulse})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "radial-gradient(circle, #F59E0B 0%, #B45309 100%)",
              boxShadow: "0 0 40px rgba(245, 158, 11, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              fontWeight: 900,
              fontSize: 42,
            }}
          >
            ?
          </div>
          <div
            style={{
              color: "#FDE68A",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.2em",
              marginTop: 8,
              textTransform: "uppercase",
            }}
          >
            OR
          </div>
        </div>

        {/* ================= RIGHT THESIS: CASH ENGINE ================= */}
        <div
          style={{
            width: 400,
            background: "linear-gradient(180deg, rgba(15, 35, 25, 0.9) 0%, rgba(10, 20, 15, 0.95) 100%)",
            border: "2px solid rgba(16, 185, 129, 0.5)",
            borderRadius: 16,
            padding: "30px 28px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
            transform: `translateY(${rightPanRise}px)`,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              color: "#10B981",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#10B981",
                boxShadow: "0 0 10px #10B981",
              }}
            />
            THESIS B: THE VALUE REALIST
          </div>

          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900, marginTop: 6 }}>
            "True Cash Engine?"
          </div>

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#10B981", fontSize: 16, fontWeight: 900 }}>✔</span>
              <span style={{ color: "#CBD5E1", fontSize: 14, fontWeight: 600 }}>
                490 Million+ paying recurring subscribers
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#10B981", fontSize: 16, fontWeight: 900 }}>✔</span>
              <span style={{ color: "#CBD5E1", fontSize: 14, fontWeight: 600 }}>
                High EBITDA & positive operating cash flow
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#10B981", fontSize: 16, fontWeight: 900 }}>✔</span>
              <span style={{ color: "#CBD5E1", fontSize: 14, fontWeight: 600 }}>
                Capex cycle peaking; free cash generation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtext */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          color: "#94A3B8",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}
      >
        To find the real answer, we must bypass the hype and dissect the audited 400-page DRHP.
      </div>
    </div>
  );
};
