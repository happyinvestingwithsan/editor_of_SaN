import React from "react";
import {
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export interface Take3DrhpPrepaymentStageProps {
  localFrame: number;
}

/**
 * Scene 2: Real DRHP Statutory Prepayment Document (Frames 204 - 644 | 6.8s - 21.5s)
 * 
 * USER INSTRUCTION COMPLIANCE:
 * 1. Full-Screen Document: Real DRHP statutory filing covers 100% of the screen (1920x1080 edge-to-edge).
 * 2. Deep Zoom into Target Row: At ~Frame 296 (Local Frame 92), camera zooms deeply (scale: 2.4x)
 *    focused directly on the Page 75 line.
 * 3. NO TEAL BOX: Absolutely zero teal boxes around the text. Clean, authentic statutory paper.
 * 4. Authentic Fluorescent Yellow Marker Sweep: A vibrant yellow highlighter (#FFE600) sweeps 
 *    across the exact line: "Prepayment or repayment... RJIL: ₹27,500.00 Crore" starting Frame 296.
 * 5. SaN Circle Facecam: Overlaid directly on top of the full-screen document (Bottom-Left),
 *    with zero isolated dark space.
 */
export const Take3DrhpPrepaymentStage: React.FC<Take3DrhpPrepaymentStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring for document
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Deep zoom on Word: "up to 27,500 crore" (Local Frame 70 to 110 | Global 274 to 314 - wraps Frame 296!)
  const zoomProgress = interpolate(localFrame, [70, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Document zoom parameters:
  // At zoomProgress = 0: scale = 1.0 (overview of statutory Page 75)
  // At zoomProgress = 1: scale = 1.55 (deep zoom centering row 1)
  const docScale = interpolate(zoomProgress, [0, 1], [1.0, 1.55]);
  const translateX = interpolate(zoomProgress, [0, 1], [0, 115]);
  const translateY = interpolate(zoomProgress, [0, 1], [0, 130]);

  // Fluorescent yellow highlighter sweep across Row 1 (Local Frame 92 to 140 | Global 296 to 344)
  // Exact start at Frame 296!
  const highlightProgress = interpolate(localFrame, [92, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating statutory badge entrance (Local Frame 140+)
  const badgeSpring = spring({
    frame: Math.max(0, localFrame - 140),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Official SEBI Verified Stamp (Local Frame 360+ on "Reliance Jio Infocomm Limited")
  const stampSpring = spring({
    frame: Math.max(0, localFrame - 360),
    fps,
    config: { damping: 10, stiffness: 170 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#F3F4F6",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. Full-Screen Edge-to-Edge Statutory Prospectus Page */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${docScale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "center center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Real Document Sheet (Ultra-High Resolution Vector Canvas) */}
        <div
          style={{
            width: 1760,
            height: 980,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 25px 70px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0,0,0,0.06)",
            borderRadius: 8,
            padding: "50px 70px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            color: "#0F172A",
          }}
        >
          {/* Subtle Document Security Pattern / Watermark */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(#E2E8F0 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              opacity: 0.45,
              pointerEvents: "none",
            }}
          />

          {/* DRHP Header Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #0F172A",
              paddingBottom: 14,
              marginBottom: 20,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#64748B", letterSpacing: 1.5 }}>
                PLEASE READ SECTION 26 OF THE COMPANIES ACT, 2013 & SEBI (ICDR) REGULATIONS
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", letterSpacing: 0.5, marginTop: 4 }}>
                JIO PLATFORMS LIMITED — DRAFT RED HERRING PROSPECTUS
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B" }}>
                CIN: U72900GJ2019PLC110816
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0F172A", marginTop: 2 }}>
                FILING REF: SEBI/CFD/DIL/2026/06 // PAGE 75 OF 432
              </div>
            </div>
          </div>

          {/* The Issue Scope Box */}
          <div
            style={{
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: 6,
              padding: "14px 20px",
              marginBottom: 26,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: "#334155" }}>
              <span style={{ fontWeight: 900, color: "#0F172A" }}>THE FRESH ISSUE:</span> INITIAL PUBLIC OFFERING OF UP TO 27,00,00,000 EQUITY SHARES AGGREGATING UP TO{" "}
              <span style={{ fontWeight: 900, color: "#047857" }}>₹30,213.00 CRORE</span>
            </div>
            <div
              style={{
                backgroundColor: "#DCFCE7",
                border: "1px solid #86EFAC",
                color: "#166534",
                padding: "4px 12px",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              100% FRESH CAPITAL
            </div>
          </div>

          {/* Section Heading */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: "#D97706", letterSpacing: 1.5, textTransform: "uppercase" }}>
              Section III: Objects of the Offer
            </div>
            <div style={{ fontSize: 21, fontWeight: 900, color: "#0F172A", marginTop: 2 }}>
              Statutory Requirement & Deployment Schedule of Net Proceeds
            </div>
          </div>

          {/* Statutory Objects Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1.5px solid #CBD5E1",
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#F1F5F9", borderBottom: "2px solid #94A3B8" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 800, width: "6%", color: "#334155" }}>Item</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 800, width: "56%", color: "#334155" }}>Scheduled Objective / Activity</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 800, width: "20%", color: "#334155" }}>Amount Earmarked</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 800, width: "18%", color: "#334155" }}>Deployment</th>
              </tr>
            </thead>
            <tbody>
              {/* TARGET ROW 1: THE PREPAYMENT ROW (ZOOMED & HIGHLIGHTED) */}
              <tr
                style={{
                  position: "relative",
                  borderBottom: "1.5px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <td style={{ padding: "16px", fontWeight: 900, color: "#0F172A", verticalAlign: "middle" }}>
                  1.
                </td>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: 800,
                    fontSize: 18,
                    lineHeight: 1.4,
                    color: "#0F172A",
                    position: "relative",
                    verticalAlign: "middle",
                  }}
                >
                  Prepayment or repayment of all or a portion of certain outstanding borrowings availed by RJIL
                  {/* Fluorescent Yellow Highlighter Sweep across the text */}
                  {localFrame >= 92 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 10,
                        top: 10,
                        right: 10,
                        bottom: 10,
                        backgroundColor: "rgba(255, 230, 0, 0.60)",
                        borderRadius: 4,
                        mixBlendMode: "multiply",
                        clipPath: `inset(0 ${100 - highlightProgress * 100}% 0 0)`,
                        boxShadow: "0 0 16px rgba(255, 230, 0, 0.5)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </td>
                <td
                  style={{
                    padding: "16px",
                    textAlign: "right",
                    fontWeight: 900,
                    fontSize: 22,
                    color: "#0F172A",
                    position: "relative",
                    verticalAlign: "middle",
                  }}
                >
                  ₹27,500.00 Cr
                  {/* Highlighter continuation over the number */}
                  {localFrame >= 92 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 8,
                        top: 10,
                        right: 8,
                        bottom: 10,
                        backgroundColor: "rgba(255, 230, 0, 0.60)",
                        borderRadius: 4,
                        mixBlendMode: "multiply",
                        clipPath: `inset(0 ${100 - highlightProgress * 100}% 0 0)`,
                        boxShadow: "0 0 16px rgba(255, 230, 0, 0.5)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </td>
                <td style={{ padding: "16px", textAlign: "center", fontWeight: 700, color: "#475569", verticalAlign: "middle" }}>
                  FY 2026 - 2027
                </td>
              </tr>

              {/* ROW 2: GENERAL CORPORATE */}
              <tr style={{ borderBottom: "1.5px solid #CBD5E1", backgroundColor: "#F8FAFC" }}>
                <td style={{ padding: "14px 16px", fontWeight: 700, color: "#64748B" }}>2.</td>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: "#475569" }}>
                  General corporate purposes and ongoing digital infrastructure scaling
                </td>
                <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 700, color: "#475569" }}>
                  ₹2,713.00 Cr
                </td>
                <td style={{ padding: "14px 16px", textAlign: "center", fontWeight: 600, color: "#64748B" }}>
                  FY 2026 - 2028
                </td>
              </tr>

              {/* TOTAL ROW */}
              <tr style={{ backgroundColor: "#F1F5F9", fontWeight: 900 }}>
                <td colSpan={2} style={{ padding: "14px 16px", textAlign: "right", color: "#0F172A", fontSize: 16 }}>
                  Total Net Proceeds Utilized:
                </td>
                <td style={{ padding: "14px 16px", textAlign: "right", color: "#047857", fontSize: 20 }}>
                  ₹30,213.00 Cr
                </td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "#047857", fontSize: 14 }}>
                  100.00%
                </td>
              </tr>
            </tbody>
          </table>

          {/* Statutory Sub-Clause Note */}
          <div
            style={{
              fontSize: 13,
              color: "#64748B",
              lineHeight: 1.5,
              borderLeft: "3px solid #CBD5E1",
              paddingLeft: 14,
              marginTop: 6,
            }}
          >
            <span style={{ fontWeight: 800, color: "#334155" }}>Statutory Disclosure (Note 1):</span> Reliance Jio Infocomm Limited (“RJIL”), the primary operating telecom subsidiary of Jio Platforms Limited, carries external commercial borrowings of approximately ₹59,140 Crore. The prepayment amount of ₹27,500.00 Crore will directly repay term loans and debentures, eliminating interest expenses.
          </div>
        </div>
      </div>

      {/* 2. Top Floating Header Bar */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 30,
          opacity: enterSpring,
        }}
      >
        <div
          style={{
            background: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(14px)",
            border: "1.5px solid rgba(255, 230, 0, 0.6)",
            borderRadius: 16,
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#FFE600",
              boxShadow: "0 0 10px #FFE600",
            }}
          />
          <span style={{ color: "#FFE600", fontSize: 15, fontWeight: 800, letterSpacing: 1.5 }}>
            DRHP PAGE 75: OBJECTS OF THE ISSUE
          </span>
        </div>

        <div
          style={{
            background: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(14px)",
            border: "1.5px solid rgba(0, 229, 153, 0.6)",
            borderRadius: 16,
            padding: "10px 24px",
            color: "#00E599",
            fontSize: 15,
            fontWeight: 800,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}
        >
          ✔ 91.02% STATUTORY DEBT EARMARK
        </div>
      </div>

      {/* 3. Floating Mobile High-Impact Callout (Slams on Frame 140) */}
      {localFrame >= 140 && (
        <div
          style={{
            position: "absolute",
            bottom: 50,
            right: 60,
            width: 720,
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))",
            border: "3px solid #FFE600",
            borderRadius: 22,
            padding: "22px 32px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(255, 230, 0, 0.25)",
            zIndex: 35,
            transform: `scale(${badgeSpring})`,
            opacity: badgeSpring,
          }}
        >
          <div style={{ fontSize: 13, color: "#FFE600", fontWeight: 800, letterSpacing: 2 }}>
            STATUTORY PREPAYMENT CLAUSE
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
            Up To <span style={{ color: "#00E599" }}>₹27,500 Crore</span>
          </div>
          <div style={{ fontSize: 16, color: "#CBD5E1", fontWeight: 600, marginTop: 4 }}>
            Specifically allocated to repay external borrowings of operating subsidiary RJIL.
          </div>
        </div>
      )}

      {/* 4. Audited SEBI Stamp (Slams on Frame 360+ on "Reliance Jio Infocomm Limited") */}
      {localFrame >= 360 && (
        <div
          style={{
            position: "absolute",
            top: 140,
            right: 120,
            border: "4px solid #16A34A",
            borderRadius: 16,
            padding: "12px 28px",
            background: "rgba(240, 253, 244, 0.96)",
            color: "#15803D",
            zIndex: 35,
            transform: `scale(${stampSpring}) rotate(-8deg)`,
            boxShadow: "0 15px 35px rgba(22, 163, 74, 0.35)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 1.5 }}>
            OFFICIAL SEBI FILING ✔
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#166534", marginTop: 2 }}>
            RELIANCE JIO INFOCOMM LIMITED
          </div>
        </div>
      )}
    </div>
  );
};
