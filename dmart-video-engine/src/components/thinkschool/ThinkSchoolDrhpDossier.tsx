import React from "react";
import {
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

export interface ThinkSchoolDrhpDossierProps {
  localFrame: number;
}

/**
 * Scene 5: The 4-Part DRHP Roadmap & Reveal Hook
 * Active Timeline: Frames 2239 - 2825 (localFrame 0 to 586 | 74.6s - 94.2s)
 * Layout: Left 60% Stage (4 Dossier Cards shown one by one) + Right 40% Tall Rectangle Facecam
 *
 * Spoken Alignment:
 * - localFrame 0 - 205 (F2239 - F2444): "In this comprehensive deep-dive, we will dissect the audited numbers from the 400-page DRHP"
 * - localFrame 205 - 295 (F2444 - F2534): "break down the real balance-sheet transformation"
 * - localFrame 295 - 405 (F2534 - F2644): "compare Jio side-by-side with Bharti Airtel"
 * - localFrame 405 - 586 (F2644 - F2825): "and reveal what I am planning to do differently and why I do that towards the end of the video, so stay till end of the video"
 */
export const ThinkSchoolDrhpDossier: React.FC<ThinkSchoolDrhpDossierProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const cameraScale = interpolate(localFrame, [0, 586], [1.0, 1.03], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1.0),
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // STEP 1: 400-Page DRHP Breakdown (localFrame 25)
  // ---------------------------------------------------------------------------
  const step1Spring = spring({
    frame: Math.max(0, localFrame - 25),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const step1Active = localFrame >= 25 && localFrame < 205;

  // ---------------------------------------------------------------------------
  // STEP 2: Balance Sheet Transformation (localFrame 205)
  // ---------------------------------------------------------------------------
  const step2Spring = spring({
    frame: Math.max(0, localFrame - 205),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const step2Active = localFrame >= 205 && localFrame < 295;

  // ---------------------------------------------------------------------------
  // STEP 3: Jio vs Bharti Airtel Comparison (localFrame 295)
  // ---------------------------------------------------------------------------
  const step3Spring = spring({
    frame: Math.max(0, localFrame - 295),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const step3Active = localFrame >= 295 && localFrame < 405;

  // ---------------------------------------------------------------------------
  // STEP 4: Personal Strategy & Climax Hook (localFrame 405)
  // ---------------------------------------------------------------------------
  const step4Spring = spring({
    frame: Math.max(0, localFrame - 405),
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#080B12",
        backgroundImage: `
          radial-gradient(circle at 35% 15%, rgba(59, 130, 246, 0.18) 0%, transparent 60%),
          radial-gradient(circle at 45% 85%, rgba(245, 158, 11, 0.12) 0%, transparent 50%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 50px 50px, 50px 50px",
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "50px 60px 40px 60px",
        boxSizing: "border-box",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Editorial Header (Constrained to Left 60%) */}
      <div
        style={{
          width: 1040,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          paddingBottom: 16,
          transform: `translateY(${interpolate(entrance, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div>
          <div
            style={{
              color: "#38BDF8",
              fontSize: 13,
              letterSpacing: "0.25em",
              fontWeight: 800,
              textTransform: "uppercase",
              marginBottom: 6,
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
                backgroundColor: "#38BDF8",
                boxShadow: "0 0 10px #38BDF8",
              }}
            />
            THE MASTERCLASS ROADMAP // 4-PART FORENSIC BLUEPRINT
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 36, fontWeight: 900 }}>
            What We Will Dissect In This Video
          </div>
        </div>

        <div
          style={{
            background: "rgba(56, 189, 248, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 30,
            padding: "8px 18px",
            color: "#BAE6FD",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.08em",
          }}
        >
          400-PAGE DRHP AUDIT
        </div>
      </div>

      {/* 4 Investigation Chapter Cards (Stacked vertically in Left 60%, showing one by one) */}
      <div
        style={{
          width: 1040,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
          padding: "16px 0",
        }}
      >
        {/* CARD 1: DRHP Breakdown (localFrame 25) */}
        {localFrame >= 25 && (
          <div
            style={{
              width: "100%",
              height: 118,
              background: step1Active
                ? "linear-gradient(90deg, rgba(30, 58, 138, 0.45) 0%, rgba(15, 23, 42, 0.85) 100%)"
                : "rgba(15, 23, 42, 0.8)",
              border: step1Active
                ? "2px solid #38BDF8"
                : "1px solid rgba(56, 189, 248, 0.35)",
              borderLeft: step1Active ? "6px solid #38BDF8" : "1px solid rgba(56, 189, 248, 0.35)",
              borderRadius: 14,
              padding: "18px 24px",
              boxSizing: "border-box",
              boxShadow: step1Active
                ? "0 15px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.25)"
                : "0 10px 25px rgba(0, 0, 0, 0.5)",
              transform: `translateX(${interpolate(step1Spring, [0, 1], [-40, 0])}px)`,
              opacity: step1Spring,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
                  boxShadow: "0 0 18px rgba(2, 132, 199, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 20,
                  color: "#FFFFFF",
                  flexShrink: 0,
                }}
              >
                01
              </div>
              <div>
                <div style={{ color: "#38BDF8", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em" }}>
                  CHAPTER 1 // FORENSIC AUDIT
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 21, fontWeight: 800, marginTop: 2 }}>
                  The 400-Page DRHP Breakdown
                </div>
                <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 3 }}>
                  Audited financials, 100% Fresh Issue reality, and zero promoter OFS cashout.
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(56, 189, 248, 0.12)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                color: "#BAE6FD",
                fontSize: 11,
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: 20,
                letterSpacing: "0.08em",
                flexShrink: 0,
              }}
            >
              SEBI DRHP FILING
            </div>
          </div>
        )}

        {/* CARD 2: Balance Sheet Transformation (localFrame 205) */}
        {localFrame >= 205 && (
          <div
            style={{
              width: "100%",
              height: 118,
              background: step2Active
                ? "linear-gradient(90deg, rgba(6, 78, 59, 0.45) 0%, rgba(15, 23, 42, 0.85) 100%)"
                : "rgba(15, 23, 42, 0.8)",
              border: step2Active
                ? "2px solid #34D399"
                : "1px solid rgba(16, 185, 129, 0.35)",
              borderLeft: step2Active ? "6px solid #34D399" : "1px solid rgba(16, 185, 129, 0.35)",
              borderRadius: 14,
              padding: "18px 24px",
              boxSizing: "border-box",
              boxShadow: step2Active
                ? "0 15px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(52, 211, 153, 0.25)"
                : "0 10px 25px rgba(0, 0, 0, 0.5)",
              transform: `translateX(${interpolate(step2Spring, [0, 1], [-40, 0])}px)`,
              opacity: step2Spring,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                  boxShadow: "0 0 18px rgba(5, 150, 105, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 20,
                  color: "#FFFFFF",
                  flexShrink: 0,
                }}
              >
                02
              </div>
              <div>
                <div style={{ color: "#34D399", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em" }}>
                  CHAPTER 2 // CAPITAL STRUCTURE
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 21, fontWeight: 800, marginTop: 2 }}>
                  Balance Sheet Transformation
                </div>
                <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 3 }}>
                  ₹25,000 Cr debt prepayment and its explosive ripple effect on Net Profit (PAT).
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#A7F3D0",
                fontSize: 11,
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: 20,
                letterSpacing: "0.08em",
                flexShrink: 0,
              }}
            >
              ₹25,000 CR DEBT PREPAYMENT
            </div>
          </div>
        )}

        {/* CARD 3: Jio vs Airtel Comparison (localFrame 295) */}
        {localFrame >= 295 && (
          <div
            style={{
              width: "100%",
              height: 118,
              background: step3Active
                ? "linear-gradient(90deg, rgba(120, 53, 15, 0.45) 0%, rgba(15, 23, 42, 0.85) 100%)"
                : "rgba(15, 23, 42, 0.8)",
              border: step3Active
                ? "2px solid #FBBF24"
                : "1px solid rgba(245, 158, 11, 0.35)",
              borderLeft: step3Active ? "6px solid #FBBF24" : "1px solid rgba(245, 158, 11, 0.35)",
              borderRadius: 14,
              padding: "18px 24px",
              boxSizing: "border-box",
              boxShadow: step3Active
                ? "0 15px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(251, 191, 36, 0.25)"
                : "0 10px 25px rgba(0, 0, 0, 0.5)",
              transform: `translateX(${interpolate(step3Spring, [0, 1], [-40, 0])}px)`,
              opacity: step3Spring,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
                  boxShadow: "0 0 18px rgba(217, 119, 6, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 20,
                  color: "#FFFFFF",
                  flexShrink: 0,
                }}
              >
                03
              </div>
              <div>
                <div style={{ color: "#FBBF24", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em" }}>
                  CHAPTER 3 // DUOPOLY BENCHMARK
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 21, fontWeight: 800, marginTop: 2 }}>
                  Jio vs Bharti Airtel Duel
                </div>
                <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 3 }}>
                  ARPU trajectory, subscriber market share, 5G Capex cycles, and return ratios.
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "#FDE68A",
                fontSize: 11,
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: 20,
                letterSpacing: "0.08em",
                flexShrink: 0,
              }}
            >
              ARPU & ROCE DUEL
            </div>
          </div>
        )}

        {/* CARD 4: SaN's Strategy & Climax Hook (localFrame 405) */}
        {localFrame >= 405 && (
          <div
            style={{
              width: "100%",
              height: 118,
              background: "linear-gradient(90deg, rgba(120, 53, 15, 0.6) 0%, rgba(20, 15, 10, 0.95) 100%)",
              border: "2px solid #F59E0B",
              borderLeft: "6px solid #F59E0B",
              borderRadius: 14,
              padding: "18px 24px",
              boxSizing: "border-box",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.35)",
              transform: `translateX(${interpolate(step4Spring, [0, 1], [-40, 0])}px)`,
              opacity: step4Spring,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  boxShadow: "0 0 20px rgba(245, 158, 11, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 22,
                  color: "#000000",
                  flexShrink: 0,
                }}
              >
                ★
              </div>
              <div>
                <div style={{ color: "#F59E0B", fontSize: 12, fontWeight: 900, letterSpacing: "0.15em" }}>
                  CHAPTER 4 // CLIMAX STRATEGY
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 21, fontWeight: 900, marginTop: 2 }}>
                  What I Am Planning Differently & Why
                </div>
                <div style={{ color: "#FDE68A", fontSize: 13, marginTop: 3, fontWeight: 600 }}>
                  Revealed towards the end of the video — strict 200 DMA capital protection discipline.
                </div>
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                color: "#000000",
                fontSize: 11,
                fontWeight: 900,
                padding: "6px 14px",
                borderRadius: 20,
                letterSpacing: "0.08em",
                boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
                flexShrink: 0,
              }}
            >
              ★ PERSONAL PLAYBOOK
            </div>
          </div>
        )}
      </div>

      {/* Bottom Retention Anchor (Left 60%) */}
      <div
        style={{
          width: 1040,
          background: "linear-gradient(90deg, rgba(245, 158, 11, 0.15) 0%, rgba(56, 189, 248, 0.15) 100%)",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          borderRadius: 12,
          padding: "12px 24px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700 }}>
          💡 "Stay until the end to see the real numbers before risking your hard-earned money."
        </span>
        <span
          style={{
            background: "#F59E0B",
            color: "#000",
            fontWeight: 900,
            fontSize: 12,
            padding: "5px 14px",
            borderRadius: 6,
            letterSpacing: "0.08em",
          }}
        >
          WATCH TILL END
        </span>
      </div>
    </div>
  );
};
