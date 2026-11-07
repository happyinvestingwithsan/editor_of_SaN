import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take3AnnualSavingsOdometerStageProps {
  localFrame: number;
}

/**
 * Scene 6: Permanent Elimination & Annual Savings Odometer (Frames 1828 - 2106 | 60.9s - 70.2s | 278 frames)
 * Starts on the EXACT syllable "permanently eliminated"!
 * Layout: SaN on Right Column (x=1240, w=620).
 * Motion Graphics on Left Stage (x=60, w=1160, h=940).
 * Mobile-Optimized:
 * - Local Frame 0 (Frame 1828): Heavy Green Weld Plate slams "PERMANENTLY ELIMINATED"
 * - Local Frame 169 (Frame 1997): Massive 104px Gold Odometer "+₹3,500 to ₹4,000 CR"
 */
export const Take3AnnualSavingsOdometerStage: React.FC<Take3AnnualSavingsOdometerStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Stamp slam on Local Frame 0 (Word: "permanently eliminated")
  const weldClamp = spring({
    frame: localFrame,
    fps,
    config: { damping: 11, stiffness: 160 },
  });

  // Odometer roll starts on Local Frame 160 (Word: "saving of 3,500 to 4,000 crore")
  const isOdometerPhase = localFrame >= 160;
  const currentSavings = Math.round(
    interpolate(localFrame, [160, 210], [0, 4000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const isOdometerSettled = localFrame >= 210;

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 70,
        width: 1160,
        height: 940,
        backgroundColor: "rgba(10, 15, 25, 0.95)",
        borderRadius: 24,
        border: "2px solid rgba(0, 229, 153, 0.5)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 50px rgba(0, 229, 153, 0.2)",
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
      {/* Background Ambience */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Mobile Category Badge */}
      <div
        style={{
          background: "rgba(16, 185, 129, 0.2)",
          border: "1.5px solid rgba(16, 185, 129, 0.6)",
          borderRadius: 24,
          padding: "8px 28px",
          color: "#34D399",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 2.5,
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        ANNUAL RECURRING BENEFIT // PERMANENT VALUE ACCRETION
      </div>

      {/* Phase 1: Heavy Weld Banner (Frames 0 - 160) */}
      {!isOdometerPhase && (
        <div
          style={{
            background: "linear-gradient(135deg, rgba(6, 78, 59, 0.9), rgba(15, 23, 42, 0.95))",
            border: "3px solid #00E599",
            borderRadius: 24,
            padding: "36px 50px",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(0, 229, 153, 0.3)",
            transform: `scale(${weldClamp})`,
          }}
        >
          <div style={{ fontSize: 44 }}>⚡</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#00E599", marginTop: 8 }}>
            HIGH-COST DEBT PREPAID
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 6 }}>
            Interest Expense Is Permanently Eliminated!
          </div>
        </div>
      )}

      {/* Phase 2: Massive Golden Odometer (Local Frame 160+) */}
      {isOdometerPhase && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: "#E2E8F0" }}>
            Immediate Cashflow Preservation:
          </div>

          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#FFFFFF",
              marginTop: 10,
              letterSpacing: -2,
              textShadow: "0 0 40px rgba(0, 229, 153, 0.5)",
              textAlign: "center",
            }}
          >
            {isOdometerSettled ? (
              <>
                ₹3,500 – <span style={{ color: "#00E599" }}>₹4,000 CR</span>
              </>
            ) : (
              <>₹{currentSavings.toLocaleString("en-IN")} CR</>
            )}
          </div>

          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#6EE7B7",
              marginTop: 4,
              letterSpacing: 1,
            }}
          >
            SAVED EVERY SINGLE YEAR IN PERPETUITY
          </div>

          {/* Monthly Preservation Callout */}
          <div
            style={{
              marginTop: 36,
              background: "rgba(15, 23, 42, 0.95)",
              border: "2px solid #D4AF37",
              borderRadius: 20,
              padding: "16px 36px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.7)",
            }}
          >
            <span style={{ fontSize: 32 }}>💰</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#D4AF37" }}>
                ~₹300+ CRORE / MONTH DIRECT CASH ADDITION
              </div>
              <div style={{ fontSize: 16, color: "#94A3B8", fontWeight: 600 }}>
                Flows directly into operational liquidity instead of debt servicing
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
