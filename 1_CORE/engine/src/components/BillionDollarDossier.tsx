import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export interface BillionDollarDossierProps {
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
 * BillionDollarDossier:
 * The 2-Hypothesis Editorial Ledger Stage for Clip 3.
 * - Frames 175 - 350: Hypothesis A (The Tech Trap) in LEFT BOX (Left 80px, Top 100px, 860x880)
 * - Frames 350 - 464: Hypothesis B (The Cash Machine) in RIGHT BOX (Left 980px, Top 100px, 860x880)
 */
export const BillionDollarDossier: React.FC<BillionDollarDossierProps> = ({
  absoluteFrame,
}) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame = absoluteFrame !== undefined ? absoluteFrame : localFrame;

  // -------------------------------------------------------------------------
  // HYPOTHESIS A: THE TECH TRAP (Frames 175 -> 350) - In Left Box
  // -------------------------------------------------------------------------
  const techTrapRel = Math.max(0, frame - 175);
  const techTrapEntrance = spring({
    frame: techTrapRel,
    fps,
    config: FLUID_SPRING,
  });
  const techTrapY = interpolate(techTrapEntrance, [0, 1], [40, 0]);
  const techTrapOpacity = interpolate(frame, [175, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const techTrapOutro = interpolate(frame, [340, 350], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tech Trap Stamp at Frame 210
  const trapStampRel = Math.max(0, frame - 210);
  const trapStampSpring = spring({
    frame: trapStampRel,
    fps,
    config: STAMP_SPRING,
  });
  const trapStampScale = interpolate(trapStampSpring, [0, 1], [2.2, 1.0]);
  const trapStampOpacity = frame >= 210 ? interpolate(frame, [210, 215], [0, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 0;

  // Yellow Marker highlight for Tech Trap (Frames 225 - 250)
  const trapHighlight = interpolate(frame, [225, 250], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // -------------------------------------------------------------------------
  // HYPOTHESIS B: THE CASH MACHINE (Frames 350 -> 464) - In Right Box
  // -------------------------------------------------------------------------
  const cashMachineRel = Math.max(0, frame - 350);
  const cashMachineEntrance = spring({
    frame: cashMachineRel,
    fps,
    config: FLUID_SPRING,
  });
  const cashMachineY = interpolate(cashMachineEntrance, [0, 1], [40, 0]);
  const cashMachineOpacity = interpolate(frame, [350, 365], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cash Machine Stamp at Frame 380
  const cashStampRel = Math.max(0, frame - 380);
  const cashStampSpring = spring({
    frame: cashStampRel,
    fps,
    config: STAMP_SPRING,
  });
  const cashStampScale = interpolate(cashStampSpring, [0, 1], [2.2, 1.0]);
  const cashStampOpacity = frame >= 380 ? interpolate(frame, [380, 385], [0, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 0;

  // Green Marker highlight for Cash Machine (Frames 395 - 420)
  const cashHighlight = interpolate(frame, [395, 420], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <>
      {/* =================================================================== */}
      {/* LEFT BOX: HYPOTHESIS A (Frames 175 -> 350)                           */}
      {/* =================================================================== */}
      {frame >= 175 && frame <= 350 && (
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
            opacity: techTrapOutro,
            perspective: 1400,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 820,
              height: 840,
              opacity: techTrapOpacity,
              transform: `translateY(${techTrapY}px) scale(${techTrapEntrance}) rotateX(2.5deg) rotateY(-1.5deg)`,
              backgroundColor: "#F7F5EE", // Natural warm newsprint
              color: "#18181B",
              borderRadius: 10,
              padding: "36px 42px",
              boxShadow:
                "0 35px 80px rgba(0, 0, 0, 0.75), 0 6px 20px rgba(0, 0, 0, 0.35)",
              border: "1px solid rgba(0, 0, 0, 0.16)",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontFamily: "'Georgia', serif",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Paper Texture Lines */}
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
                    FINANCIAL DILEMMA DOSSIER
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
                    CAPITAL ALLOCATION FORENSIC • HYPOTHESIS 01
                  </span>
                </div>

                {frame >= 210 && (
                  <div
                    style={{
                      opacity: trapStampOpacity,
                      transform: `scale(${trapStampScale}) rotate(-6deg)`,
                      border: "3px solid #991B1B",
                      color: "#991B1B",
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 900,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      backgroundColor: "rgba(254, 226, 226, 0.9)",
                      boxShadow: "0 2px 8px rgba(153, 27, 27, 0.25)",
                    }}
                  >
                    ⚠ THE TECH TRAP?
                  </div>
                )}
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#991B1B",
                  lineHeight: 1.2,
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Is Jio Designed to Transfer Wealth from Retail to Insiders?
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
                  Classic tech listing mechanics that destroyed investor capital in 2021–2024:
                </span>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${trapHighlight}%`,
                    backgroundColor: "#FDE047",
                    mixBlendMode: "multiply",
                    opacity: 0.65,
                    zIndex: 1,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>

            {/* Evidence Table */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderLeft: "4px solid #991B1B",
                  borderRadius: 6,
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#991B1B", textTransform: "uppercase" }}>
                  ❌ SYMPTOM 1: MASSIVE OFFER FOR SALE (OFS)
                </div>
                <div style={{ fontSize: 13, fontFamily: "'Inter', sans-serif", color: "#374151", marginTop: 4 }}>
                  Early venture capitalists dump shares at peak valuation. Proceeds bypass company treasury and go straight into private pockets.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderLeft: "4px solid #991B1B",
                  borderRadius: 6,
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#991B1B", textTransform: "uppercase" }}>
                  ❌ SYMPTOM 2: NO BALANCE SHEET BENEFIT
                </div>
                <div style={{ fontSize: 13, fontFamily: "'Inter', sans-serif", color: "#374151", marginTop: 4 }}>
                  Zero new equity capital enters the operating business. The company remains saddled with debt and continues burning operational cash.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderLeft: "4px solid #991B1B",
                  borderRadius: 6,
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#991B1B", textTransform: "uppercase" }}>
                  ❌ SYMPTOM 3: POST-LISTING RETAIL DRAWDOWN
                </div>
                <div style={{ fontSize: 13, fontFamily: "'Inter', sans-serif", color: "#374151", marginTop: 4 }}>
                  Once the 30–90 day anchor lock-in expires, supply floods the market, resulting in violent 50% to 75% corrections.
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
                SECTOR PRECEDENTS: PAYTM • NYKAA • SWIGGY
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 800, color: "#991B1B" }}>
                HIGH RISK PROFILE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* RIGHT BOX: HYPOTHESIS B (Frames 350 -> 464)                          */}
      {/* =================================================================== */}
      {frame >= 350 && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 980,
            width: 860,
            height: 880,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            perspective: 1400,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 820,
              height: 840,
              opacity: cashMachineOpacity,
              transform: `translateY(${cashMachineY}px) scale(${cashMachineEntrance}) rotateX(2.5deg) rotateY(1.5deg)`,
              backgroundColor: "#F7F5EE", // Natural warm newsprint
              color: "#18181B",
              borderRadius: 10,
              padding: "36px 42px",
              boxShadow:
                "0 35px 80px rgba(0, 0, 0, 0.75), 0 6px 20px rgba(0, 0, 0, 0.35)",
              border: "1px solid rgba(0, 0, 0, 0.16)",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontFamily: "'Georgia', serif",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Paper Texture Lines */}
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
                    FINANCIAL DILEMMA DOSSIER
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
                    CAPITAL ALLOCATION FORENSIC • HYPOTHESIS 02
                  </span>
                </div>

                {frame >= 380 && (
                  <div
                    style={{
                      opacity: cashStampOpacity,
                      transform: `scale(${cashStampScale}) rotate(4deg)`,
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
                    ✔ THE CASH MACHINE
                  </div>
                )}
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#065F46",
                  lineHeight: 1.2,
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Or Is Jio a Fundamentally Different Cash-Generating Moat?
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
                  Audited financial reality from the official 400-page DRHP prospectus:
                </span>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${cashHighlight}%`,
                    backgroundColor: "#BBF7D0",
                    mixBlendMode: "multiply",
                    opacity: 0.65,
                    zIndex: 1,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>

            {/* Evidence Table */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderLeft: "4px solid #065F46",
                  borderRadius: 6,
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#065F46", textTransform: "uppercase" }}>
                  ✔ PROOF 1: 100% FRESH ISSUE • ZERO OFS (PAGE 68)
                </div>
                <div style={{ fontSize: 13, fontFamily: "'Inter', sans-serif", color: "#374151", marginTop: 4 }}>
                  Not a single share sold by Mukesh Ambani, Reliance, Meta, or Google. 100% of ₹30,213 Cr enters Jio's bank account.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderLeft: "4px solid #065F46",
                  borderRadius: 6,
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#065F46", textTransform: "uppercase" }}>
                  ✔ PROOF 2: EXTRAORDINARY CASH FLOW (2.62x PAT)
                </div>
                <div style={{ fontSize: 13, fontFamily: "'Inter', sans-serif", color: "#374151", marginTop: 4 }}>
                  Generates ₹26,000+ Cr real net profit with 50.1% EBITDA margin. Operating cash flow is 2.62x reported accounting profit.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderLeft: "4px solid #065F46",
                  borderRadius: 6,
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#065F46", textTransform: "uppercase" }}>
                  ✔ PROOF 3: DE-LEVERAGING THE BALANCE SHEET
                </div>
                <div style={{ fontSize: 13, fontFamily: "'Inter', sans-serif", color: "#374151", marginTop: 4 }}>
                  ₹27,500 Cr debt prepayment eliminates high-cost borrowings, saving ~₹3,500–4,000 Cr in finance costs annually.
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
                SOURCE: SEBI DRHP AUDITED FINANCIALS
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 800, color: "#065F46" }}>
                STRUCTURAL MOAT
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
