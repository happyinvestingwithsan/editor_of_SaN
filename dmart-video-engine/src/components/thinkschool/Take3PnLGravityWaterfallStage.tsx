import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take3PnLGravityWaterfallStageProps {
  localFrame: number;
}

/**
 * Scene 7: Rethought Mobile-First P&L Waterfall & De-leveraging Sequence
 * Duration: Frames 2106 - 2640 (Local Frames 0 - 534 | 70.2s - 88.0s)
 * 
 * USER INSTRUCTION COMPLIANCE:
 * 1. Space Utilized 100% Effectively for Mobile (Massive 64px-76px numbers, high contrast).
 * 2. ZERO premature boxes! Animation STRICTLY follows spoken words.
 * 3. SaN in Rectangular Canvas:
 *    - Phase 1 (Local Frames 0 - 203 | 2106 - 2309): 
 *      SaN in Left Column (x=60, w=620), Stage on Right (x=720, w=1140).
 *      Interest Dissolves on "disappears" -> Liquid Gold Waterfall on "flows down" -> Net Profit surges on "into net profit".
 *    - Phase 2 & 3 (Local Frames 203 - 534 | 2309 - 2640):
 *      SaN in Right Column (x=1240, w=620), Stage on Left (x=60, w=1140).
 *      Card 1 slams on "single mobile subscriber" (0 Users) -> Card 2 slams on "even 1 rupee" (₹0.00 Hike) -> Formula slams on "mathematically expands" -> Stamp on "de-leveraged".
 */
export const Take3PnLGravityWaterfallStage: React.FC<Take3PnLGravityWaterfallStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // ==========================================
  // PHASE 1: P&L Cashflow Waterfall (Frames 0 - 203 | 2106 - 2309)
  // Layout: Stage on Right (x=720, w=1140)
  // ==========================================
  const isPhase1 = localFrame < 203;

  // Header entrance spring
  const phase1HeaderSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Step 1: The Interest Expense Card appears on Frame 20, then dissolves on Word "disappears" (Local Frame 38 to 68)
  const isInterestAppeared = localFrame >= 15;
  const interestSpring = spring({
    frame: Math.max(0, localFrame - 15),
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const interestDissolveProgress = interpolate(localFrame, [38, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const interestOpacity = interpolate(interestDissolveProgress, [0, 1], [1, 0]);
  const interestScale = interpolate(interestDissolveProgress, [0, 1], [1, 0.75]);
  const interestBlur = interpolate(interestDissolveProgress, [0, 1], [0, 14]);

  // Step 2: Liquid Gold Waterfall Stream pours on Word "flows down through P&L" (Local Frame 70 to 166)
  const isCashFlowing = localFrame >= 70;
  const cashStreamProgress = interpolate(localFrame, [70, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Step 3: Net Profit Card SLAMS on Word "into the net profit" (Local Frame 166 to 203)
  const isNetProfitSurge = localFrame >= 166;
  const netProfitSpring = spring({
    frame: Math.max(0, localFrame - 166),
    fps,
    config: { damping: 11, stiffness: 160 },
  });
  const netProfitNumber = Math.round(
    interpolate(localFrame, [166, 200], [26000, 30000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // ==========================================
  // PHASE 2 & 3: Shocking Constraints & Equation (Frames 203 - 534 | 2309 - 2640)
  // Layout: Stage on Left (x=60, w=1140)
  // ==========================================
  // Header entrance spring
  const phase2HeaderSpring = spring({
    frame: Math.max(0, localFrame - 203),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Card 1: 0 Subscribers Added (Slams on Word: "single new mobile subscriber" @ Local Frame 220)
  const isCard1 = localFrame >= 220;
  const card1Spring = spring({
    frame: Math.max(0, localFrame - 220),
    fps,
    config: { damping: 11, stiffness: 170 },
  });

  // Card 2: ₹0.00 Recharge Hike (Slams on Word: "even 1 rupee" @ Local Frame 298)
  const isCard2 = localFrame >= 298;
  const card2Spring = spring({
    frame: Math.max(0, localFrame - 298),
    fps,
    config: { damping: 11, stiffness: 170 },
  });

  // Phase 3: Mathematical Expansion Equation (Slams on Word: "mathematically expands" @ Local Frame 405)
  const isEquationPhase = localFrame >= 405;
  const equationSpring = spring({
    frame: Math.max(0, localFrame - 405),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Stamp on Word: "balance sheet was de-leveraged" @ Local Frame 485
  const isDeleveragedStamp = localFrame >= 485;
  const stampSpring = spring({
    frame: Math.max(0, localFrame - 485),
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* =========================================================================
          PHASE 1: RIGHT STAGE (P&L Waterfall | Frames 2106 - 2309)
          SaN is in Left Column (x=60, w=620)
          ========================================================================= */}
      {isPhase1 && (
        <div
          style={{
            position: "absolute",
            left: 720,
            top: 70,
            width: 1140,
            height: 940,
            backgroundColor: "rgba(10, 15, 26, 0.96)",
            borderRadius: 24,
            border: "2px solid rgba(0, 229, 153, 0.45)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(0, 229, 153, 0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "36px 40px",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {/* Top Category Badge */}
          <div
            style={{
              background: "rgba(0, 229, 153, 0.15)",
              border: "1.5px solid rgba(0, 229, 153, 0.6)",
              borderRadius: 20,
              padding: "8px 24px",
              color: "#00E599",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              transform: `scale(${phase1HeaderSpring})`,
            }}
          >
            P&L WATERFALL // DIRECT BOTTOM-LINE EXPANSION
          </div>

          {/* Dynamic Content Container */}
          <div
            style={{
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {/* Step 1: The Interest Expense Block (Enters on 15, dissolves on 38) */}
            <div
              style={{
                width: "92%",
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isInterestAppeared && (
                <div
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, rgba(153, 27, 27, 0.95), rgba(30, 41, 59, 0.95))",
                    border: "2.5px solid #EF4444",
                    borderRadius: 20,
                    padding: "20px 32px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transform: `scale(${interestSpring * interestScale})`,
                    opacity: interestOpacity,
                    filter: `blur(${interestBlur}px)`,
                    boxShadow: "0 12px 35px rgba(239, 68, 68, 0.35)",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15, color: "#FCA5A5", fontWeight: 800, letterSpacing: 1.5 }}>
                      ANNUAL INTEREST EXPENSE
                    </div>
                    <div style={{ fontSize: 46, fontWeight: 900, color: "#EF4444", marginTop: 2 }}>
                      -₹8,000 CRORE
                    </div>
                  </div>
                  <div
                    style={{
                      background: localFrame >= 38 ? "rgba(239, 68, 68, 0.35)" : "rgba(239, 68, 68, 0.2)",
                      color: "#FCA5A5",
                      padding: "10px 20px",
                      borderRadius: 12,
                      fontWeight: 900,
                      fontSize: 16,
                      letterSpacing: 1,
                    }}
                  >
                    {localFrame >= 38 ? "DISAPPEARING... 💨" : "DRAINING PROFIT"}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: The Golden Waterfall Stream (Flows on Frame 70 on "flows down") */}
            <div
              style={{
                width: "92%",
                height: 180,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {isCashFlowing && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "linear-gradient(180deg, rgba(212, 175, 55, 0.25), rgba(15, 23, 42, 0.9))",
                    border: "2px solid #D4AF37",
                    borderRadius: 18,
                    padding: "20px 32px",
                    boxShadow: "0 0 40px rgba(212, 175, 55, 0.35)",
                    clipPath: `inset(0 0 ${100 - cashStreamProgress * 100}% 0)`,
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ fontSize: 30, fontWeight: 900, color: "#FDE68A", letterSpacing: 1 }}>
                    ↓ +₹4,000 CRORE CASH STREAM ↓
                  </div>
                  <div style={{ fontSize: 18, color: "#D4AF37", fontWeight: 800, marginTop: 6, letterSpacing: 1.5 }}>
                    FLOWING STRAIGHT DOWN THROUGH THE P&L
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Net Profit Surge Card (Slams on Frame 166 on "into net profit") */}
            <div
              style={{
                width: "92%",
                height: 190,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isNetProfitSurge && (
                <div
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, rgba(6, 78, 59, 0.98), rgba(15, 23, 42, 0.98))",
                    border: "3px solid #00E599",
                    borderRadius: 22,
                    padding: "22px 34px",
                    boxShadow: "0 20px 50px rgba(0, 229, 153, 0.45)",
                    transform: `scale(${netProfitSpring})`,
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 16, color: "#A7F3D0", fontWeight: 800, letterSpacing: 1.5 }}>
                      CONSOLIDATED NET PROFIT (PAT)
                    </span>
                    <span
                      style={{
                        background: "rgba(0, 229, 153, 0.25)",
                        color: "#00E599",
                        padding: "6px 16px",
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 900,
                        letterSpacing: 1,
                      }}
                    >
                      +₹4,000 CR SURGE ✔
                    </span>
                  </div>
                  <div style={{ fontSize: 68, fontWeight: 900, color: "#FFFFFF", marginTop: 4, letterSpacing: -1 }}>
                    ₹{netProfitNumber.toLocaleString("en-IN")}+ <span style={{ color: "#00E599" }}>CR</span>
                  </div>
                  <div style={{ fontSize: 17, color: "#6EE7B7", fontWeight: 700, marginTop: 2 }}>
                    Expanded mathematically without operational changes!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 2 & 3: LEFT STAGE (The Zero-Burden Constraints & Formula | Frames 2309 - 2640)
          SaN is in Right Column (x=1240, w=620)
          ========================================================================= */}
      {!isPhase1 && (
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 70,
            width: 1140,
            height: 940,
            backgroundColor: "rgba(10, 15, 26, 0.96)",
            borderRadius: 24,
            border: "2px solid rgba(212, 175, 55, 0.5)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(212, 175, 55, 0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "36px 40px",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {/* Top Category Badge */}
          <div
            style={{
              background: "rgba(212, 175, 55, 0.15)",
              border: "1.5px solid rgba(212, 175, 55, 0.6)",
              borderRadius: 20,
              padding: "8px 26px",
              color: "#D4AF37",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              transform: `scale(${phase2HeaderSpring})`,
            }}
          >
            THE DE-LEVERAGING PARADOX // ZERO CUSTOMER BURDEN
          </div>

          {/* Cards Container */}
          <div
            style={{
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {/* Card 1: New Mobile Subscribers = 0 (Slams at Local Frame 220 on "single mobile subscriber") */}
            <div
              style={{
                width: "92%",
                height: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isCard1 && (
                <div
                  style={{
                    width: "100%",
                    background: "rgba(15, 23, 42, 0.95)",
                    border: "2.5px solid #EF4444",
                    borderRadius: 22,
                    padding: "22px 34px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.7)",
                    transform: `scale(${card1Spring})`,
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 16, color: "#94A3B8", fontWeight: 800, letterSpacing: 1.5 }}>
                      NEW MOBILE SUBSCRIBERS ADDED
                    </div>
                    <div style={{ fontSize: 72, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
                      0 USERS
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.2)",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      color: "#EF4444",
                      padding: "12px 24px",
                      borderRadius: 14,
                      fontSize: 17,
                      fontWeight: 900,
                      letterSpacing: 1,
                    }}
                  >
                    ZERO USER BURDEN
                  </div>
                </div>
              )}
            </div>

            {/* Card 2: Recharge Price Hike = ₹0.00 (Slams at Local Frame 298 on "even 1 rupee") */}
            <div
              style={{
                width: "92%",
                height: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isCard2 && (
                <div
                  style={{
                    width: "100%",
                    background: "rgba(15, 23, 42, 0.95)",
                    border: "2.5px solid #EF4444",
                    borderRadius: 22,
                    padding: "22px 34px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.7)",
                    transform: `scale(${card2Spring})`,
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 16, color: "#94A3B8", fontWeight: 800, letterSpacing: 1.5 }}>
                      RECHARGE PRICE INCREASE
                    </div>
                    <div style={{ fontSize: 72, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
                      ₹0.00
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.2)",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      color: "#EF4444",
                      padding: "12px 24px",
                      borderRadius: 14,
                      fontSize: 17,
                      fontWeight: 900,
                      letterSpacing: 1,
                    }}
                  >
                    ZERO TARIFF HIKE
                  </div>
                </div>
              )}
            </div>

            {/* Card 3: The Golden Mathematical Outcome (Slams at Local Frame 405 on "mathematically expands") */}
            <div
              style={{
                width: "92%",
                height: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isEquationPhase && (
                <div
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, rgba(212, 175, 55, 0.22), rgba(15, 23, 42, 0.98))",
                    border: "3px solid #D4AF37",
                    borderRadius: 22,
                    padding: "22px 34px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 20px 50px rgba(212, 175, 55, 0.35)",
                    transform: `scale(${equationSpring})`,
                    boxSizing: "border-box",
                    position: "relative",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15, color: "#FDE68A", fontWeight: 800, letterSpacing: 1.5 }}>
                      THE MATHEMATICAL RESULT
                    </div>
                    <div style={{ fontSize: 40, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
                      Net Profit Expands By <span style={{ color: "#00E599" }}>+₹4,000 CR</span>
                    </div>
                    <div style={{ fontSize: 17, color: "#CBD5E1", fontWeight: 600, marginTop: 4 }}>
                      Simply because balance sheet debt was permanently eliminated.
                    </div>
                  </div>

                  {/* Stamp on Word: "de-leveraged" @ Local Frame 485 */}
                  {isDeleveragedStamp && (
                    <div
                      style={{
                        border: "3.5px solid #00E599",
                        borderRadius: 16,
                        padding: "12px 24px",
                        background: "rgba(6, 78, 59, 0.98)",
                        transform: `scale(${stampSpring}) rotate(-5deg)`,
                        textAlign: "center",
                        boxShadow: "0 10px 30px rgba(0, 229, 153, 0.4)",
                      }}
                    >
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#00E599", letterSpacing: 1.5 }}>
                        DE-LEVERAGED ✔
                      </div>
                      <div style={{ fontSize: 13, color: "#A7F3D0", fontWeight: 700, marginTop: 2 }}>
                        PURE VALUE CREATION
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
