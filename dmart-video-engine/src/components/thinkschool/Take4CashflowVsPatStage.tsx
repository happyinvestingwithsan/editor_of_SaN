import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take4CashflowVsPatStageProps {
  localFrame: number;
}

export const Take4CashflowVsPatStage: React.FC<Take4CashflowVsPatStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Stage Entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // OCF Card reveals at localFrame 51 (Frame 1255 abs: "Jio's cash flow from operations")
  const ocfSpring = spring({
    frame: Math.max(0, localFrame - 51),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // 2.62x Multiplier Hero Banner reveals at localFrame 123 (Frame 1327 abs: "was 2.62 times higher")
  const multiplierSpring = spring({
    frame: Math.max(0, localFrame - 123),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Reported Accounting Profit card reveals ONLY at localFrame 177 (Frame 1381 abs: "than its reported accounting profit")
  const patSpring = spring({
    frame: Math.max(0, localFrame - 177),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Stamp at localFrame 290 (Frame 1494 abs: "real cash collection")
  const stampSpring = spring({
    frame: Math.max(0, localFrame - 290),
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.6 },
  });

  // Red line strike at localFrame 360 (Frame 1564 abs: "not paper accounting")
  const strikeSpring = spring({
    frame: Math.max(0, localFrame - 360),
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const showOCF = localFrame >= 51;
  const showMultiplier = localFrame >= 123;
  const showPAT = localFrame >= 177;
  const showStamp = localFrame >= 290;

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 70,
        width: 1160,
        height: 940,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: "'Inter', system-ui, sans-serif",
        transform: `translateY(${interpolate(enterSpring, [0, 1], [25, 0])}px)`,
        opacity: enterSpring,
      }}
    >
      {/* Header Tag */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#0D1322",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "18px 28px",
        }}
      >
        <div>
          <span
            style={{
              color: "#00E599",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            FINANCIAL FORENSIC
          </span>
          <div style={{ color: "#FFF", fontSize: 24, fontWeight: 700, marginTop: 4 }}>
            Cash Flow from Operations vs Reported Accounting Profit
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(0, 229, 153, 0.15)",
            border: "1px solid #00E599",
            color: "#00E599",
            padding: "8px 16px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          CASH IS KING
        </div>
      </div>

      {/* Main Dual Vault Comparison */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#080C16",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "32px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          position: "relative",
          boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
        }}
      >
        {/* Top 2.62x Multiplier Hero Banner (Appears only at localFrame 123 on "was 2.62 times higher") */}
        {showMultiplier && (
          <div
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.12)",
              border: "2px solid rgba(212, 175, 55, 0.8)",
              borderRadius: 16,
              padding: "18px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `scale(${interpolate(multiplierSpring, [0, 1], [0.95, 1])})`,
              boxShadow: "0 10px 30px rgba(212, 175, 55, 0.2)",
            }}
          >
            <div>
              <div style={{ color: "#D4AF37", fontSize: 28, fontWeight: 900 }}>
                Operating Cash Flow is 2.62x Higher Than Accounting Profit
              </div>
              <div style={{ color: "#E5E7EB", fontSize: 14, marginTop: 4 }}>
                Proving earnings are backed by immediate daily cash inflows, not paper accruals
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#D4AF37",
                color: "#000",
                padding: "8px 18px",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 900,
              }}
            >
              2.62x CASH RATIO
            </div>
          </div>
        )}

        {/* Side-by-Side Comparison Container (Appears when OCF is spoken at localFrame 51) */}
        {showOCF && (
          <div style={{ display: "flex", gap: 24, flex: 1 }}>
            {/* Left: Accounting Net Profit (ENTERS ONLY at localFrame 177 on "than its reported accounting profit") */}
            {showPAT && (
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#0D1322",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  borderRadius: 16,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transform: `scale(${interpolate(patSpring, [0, 1], [0.92, 1])})`,
                  opacity: patSpring,
                }}
              >
                <div>
                  <div style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
                    REPORTED ACCOUNTING PROFIT (PAT)
                  </div>
                  <div style={{ color: "#E5E7EB", fontSize: 40, fontWeight: 900, marginTop: 8 }}>
                    ₹26,000 Cr
                  </div>
                  <div
                    style={{
                      color: "#9CA3AF",
                      fontSize: 15,
                      marginTop: 6,
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    Subject to Non-Cash Accounting Accruals
                    {/* Red Strike Line */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        width: `${interpolate(strikeSpring, [0, 1], [0, 100])}%`,
                        height: 3,
                        backgroundColor: "#EF4444",
                        boxShadow: "0 0 10px rgba(239, 68, 68, 0.8)",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    padding: "12px 16px",
                    borderRadius: 10,
                    color: "#9CA3AF",
                    fontSize: 14,
                    lineHeight: 1.4,
                  }}
                >
                  Paper profit after subtracting ₹20,000+ Cr of statutory depreciation and non-cash amortisation charges.
                </div>
              </div>
            )}

            {/* Right: Real Cash Flow from Operations (Enters at localFrame 51 on "cash flow from operations") */}
            <div
              style={{
                flex: showPAT ? 1.35 : 1,
                backgroundColor: "rgba(0, 229, 153, 0.08)",
                border: "2.5px solid #00E599",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 0 40px rgba(0, 229, 153, 0.25)",
                transform: `scale(${interpolate(ocfSpring, [0, 1], [0.95, 1])})`,
                opacity: ocfSpring,
              }}
            >
              <div>
                <div style={{ color: "#00E599", fontSize: 14, fontWeight: 800, letterSpacing: "0.1em" }}>
                  CASH FLOW FROM OPERATIONS (OCF)
                </div>
                <div style={{ color: "#FFF", fontSize: 48, fontWeight: 900, marginTop: 8 }}>
                  &gt; ₹68,120 Cr
                </div>
                <div style={{ color: "#A7F3D0", fontSize: 16, marginTop: 6, fontWeight: 600 }}>
                  Actual Liquid Cash Collected in Bank Accounts
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(0, 229, 153, 0.15)",
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: "1px solid rgba(0, 229, 153, 0.4)",
                  color: "#00E599",
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}
              >
                Backstopped by 53+ Crore users paying upfront mobile recharges with zero default credit risk.
              </div>
            </div>
          </div>
        )}

        {/* Rubber Stamp Slam (appears exactly on "backed by real cash collection") */}
        {showStamp && (
          <div
            style={{
              position: "absolute",
              bottom: 45,
              right: 55,
              transform: `scale(${interpolate(stampSpring, [0, 1], [2.2, 1])}) rotate(-5deg)`,
              opacity: stampSpring,
              border: "4px solid #00E599",
              color: "#00E599",
              borderRadius: 12,
              padding: "10px 24px",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              backgroundColor: "rgba(8, 12, 22, 0.95)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
              pointerEvents: "none",
            }}
          >
            ✔ 100% REAL CASH COLLECTION
          </div>
        )}
      </div>
    </div>
  );
};
