import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take3DebtPreIpoStageProps {
  localFrame: number;
}

/**
 * Scene 3: Pre-IPO Balance Sheet Debt Reality (Frames 644 - 989 | 21.5s - 33.0s)
 * Layout: SaN is on Right Column (600px, x=1260).
 * Motion Graphics occupy Left Stage (1180px, x=60).
 * Word Sync:
 * - Local Frame 0 (Frame 644): "Let's look at the balance sheet reality before this IPO..." -> Stage enters
 * - Local Frame 115 (Frame 759): "mid-2026..." -> Monolith starts rising
 * - Local Frame 228 (Frame 872): "59,140 crore" -> Counter lands exactly on ₹59,140 CR!
 * - Local Frame 305 (Frame 949): "total external borrowing" -> Warning debt breakdown badges lock in
 */
export const Take3DebtPreIpoStage: React.FC<Take3DebtPreIpoStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Digital counter rolls from Local Frame 115 to 228 (Word: "59,140 crore")
  const debtCounter = Math.round(
    interpolate(localFrame, [115, 228], [0, 59140], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Column height grows from Local Frame 115 to 228
  const columnHeight = interpolate(localFrame, [115, 228], [0, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badges lock in at Local Frame 250+
  const badgesSpring = spring({
    frame: Math.max(0, localFrame - 250),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
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
        padding: "40px 50px",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.4)",
          borderRadius: 20,
          padding: "6px 20px",
          color: "#F87171",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 12,
          opacity: enterSpring,
        }}
      >
        BALANCE SHEET AUDIT // MID-2026 LIABILITIES
      </div>

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
        Reliance Jio Infocomm: <span style={{ color: "#EF4444" }}>₹59,140 Crore</span> External Debt
      </h2>

      {/* Main Arena */}
      <div
        style={{
          marginTop: 40,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: 600,
          padding: "0 40px",
        }}
      >
        {/* Left Side: Counter & Stat Cards */}
        <div
          style={{
            width: 520,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              border: "1.5px solid rgba(239, 68, 68, 0.4)",
              borderRadius: 20,
              padding: "24px 28px",
              boxShadow: "0 10px 30px rgba(239, 68, 68, 0.2)",
            }}
          >
            <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700 }}>
              TOTAL EXTERNAL COMMERCIAL BORROWINGS
            </div>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#EF4444", marginTop: 4 }}>
              ₹{debtCounter.toLocaleString("en-IN")} CR
            </div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>
              Operating Telecom Subsidiary (RJIL)
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              transform: `scale(${badgesSpring})`,
              opacity: badgesSpring,
            }}
          >
            <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 18px", borderRadius: 12, border: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#E2E8F0", fontSize: 14, fontWeight: 600 }}>Commercial Term Loans</span>
              <span style={{ color: "#F87171", fontSize: 14, fontWeight: 800 }}>High Bank Interest</span>
            </div>
            <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 18px", borderRadius: 12, border: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#E2E8F0", fontSize: 14, fontWeight: 600 }}>Non-Convertible Debentures (NCDs)</span>
              <span style={{ color: "#F87171", fontSize: 14, fontWeight: 800 }}>Coupon Liabilities</span>
            </div>
            <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 18px", borderRadius: 12, border: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#E2E8F0", fontSize: 14, fontWeight: 600 }}>Deferred Spectrum Liabilities</span>
              <span style={{ color: "#CBD5E1", fontSize: 14, fontWeight: 800 }}>Sovereign DoT Dues</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Rising Red Architectural Monolith */}
        <div
          style={{
            position: "relative",
            width: 240,
            height: columnHeight,
            background: "linear-gradient(180deg, #DC2626 0%, #7F1D1D 100%)",
            borderRadius: "20px 20px 0 0",
            border: "2px solid rgba(239, 68, 68, 0.8)",
            borderBottom: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 -10px 40px rgba(220, 38, 38, 0.4)",
            marginRight: 60,
          }}
        >
          {columnHeight > 200 && (
            <>
              <div style={{ fontSize: 13, color: "#FECACA", fontWeight: 700, letterSpacing: 1 }}>
                EXTERNAL DEBT
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
                ₹59,140 CR
              </div>
              <div style={{ fontSize: 12, color: "#FCA5A5", fontWeight: 600, marginTop: 4 }}>
                Pre-IPO Load
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
