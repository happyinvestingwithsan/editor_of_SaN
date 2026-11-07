import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take4EbitdaProfitStageProps {
  localFrame: number; // 0 at Frame 850 of Master
}

export const Take4EbitdaProfitStage: React.FC<Take4EbitdaProfitStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Stage entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Hero EBITDA Speedometer sweeps immediately from frame 0
  const ebitdaSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Revenue card ONLY enters at localFrame 170 (Frame 1020 abs: "over 1.28 lakh crore in revenue")
  const revSpring = spring({
    frame: Math.max(0, localFrame - 170),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Net Profit card ONLY enters at localFrame 270 (Frame 1120 abs: "over 26,000 crore in net profit")
  const patSpring = spring({
    frame: Math.max(0, localFrame - 270),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  const animatedEbitda = (interpolate(ebitdaSpring, [0, 1], [0, 50.1])).toFixed(1);
  const gaugeRotation = interpolate(ebitdaSpring, [0, 1], [-90, 30]);

  // Only show revenue card after frame 170
  const showRevenue = localFrame >= 170;
  // Only show PAT card after frame 270
  const showPAT = localFrame >= 270;

  return (
    <div
      style={{
        position: "absolute",
        left: 700,
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
      {/* Stage Header */}
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
            OPERATING METRIC 02
          </span>
          <div style={{ color: "#FFF", fontSize: 24, fontWeight: 700, marginTop: 4 }}>
            Operational Machine Profitability & Run-Rate
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
          GLOBAL TOP TIER
        </div>
      </div>

      {/* Hero EBITDA Margin Card (Occupies main stage while talking about operating margin) */}
      <div
        style={{
          backgroundColor: "#080C16",
          border: "2px solid rgba(0, 229, 153, 0.6)",
          borderRadius: 20,
          padding: "36px 44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 20px 50px rgba(0, 229, 153, 0.18)",
          flex: !showRevenue ? 1 : undefined, // Takes full height until revenue is mentioned!
        }}
      >
        <div>
          <div style={{ color: "#9CA3AF", fontSize: 16, fontWeight: 600 }}>
            OPERATIONAL MARGIN PROFILE
          </div>
          <div style={{ color: "#FFF", fontSize: 56, fontWeight: 900, marginTop: 4 }}>
            {animatedEbitda}%{" "}
            <span style={{ fontSize: 24, fontWeight: 700, color: "#00E599" }}>
              EBITDA MARGIN
            </span>
          </div>
          <div
            style={{
              color: "#D1D5DB",
              fontSize: 16,
              marginTop: 8,
              maxWidth: 480,
              lineHeight: 1.4,
            }}
          >
            For a telecom utility, an operating margin above 50% represents extraordinary operational efficiency.
          </div>
        </div>

        {/* Speedometer Visual Gauge */}
        <div
          style={{
            position: "relative",
            width: 220,
            height: 120,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "16px solid rgba(255,255,255,0.1)",
              borderTopColor: "#00E599",
              borderRightColor: "#00E599",
              transform: "rotate(-45deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: 8,
              height: 90,
              backgroundColor: "#FFF",
              transformOrigin: "bottom center",
              transform: `rotate(${gaugeRotation}deg)`,
              borderRadius: 4,
              boxShadow: "0 0 15px rgba(255,255,255,0.8)",
            }}
          />
        </div>
      </div>

      {/* Dual Revenue & PAT Cards (Appear ONLY when spoken! Zero premature boxes below) */}
      {showRevenue && (
        <div style={{ display: "flex", gap: 20, flex: 1 }}>
          {/* Revenue Card (Enters only at localFrame 170 on "1.28 lakh crore") */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#0D1322",
              border: "2px solid rgba(56, 189, 248, 0.8)",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 0 35px rgba(56, 189, 248, 0.25)",
              transform: `scale(${interpolate(revSpring, [0, 1], [0.92, 1])})`,
              opacity: revSpring,
            }}
          >
            <div style={{ color: "#38BDF8", fontSize: 14, fontWeight: 800, letterSpacing: "0.1em" }}>
              TOTAL ANNUAL REVENUE
            </div>
            <div>
              <div style={{ color: "#FFF", fontSize: 40, fontWeight: 900 }}>
                &gt; ₹1.28 LAKH CR
              </div>
              <div style={{ color: "#93C5FD", fontSize: 15, marginTop: 4 }}>
                $15.4 Billion Annual Intake
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(56, 189, 248, 0.12)",
                padding: "8px 12px",
                borderRadius: 8,
                color: "#38BDF8",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Largest revenue in Indian digital history
            </div>
          </div>

          {/* Net Profit Card (Enters ONLY at localFrame 270 on "over 26,000 crore") */}
          {showPAT && (
            <div
              style={{
                flex: 1,
                backgroundColor: "#0D1322",
                border: "2px solid rgba(212, 175, 55, 0.8)",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 0 35px rgba(212, 175, 55, 0.25)",
                transform: `scale(${interpolate(patSpring, [0, 1], [0.92, 1])})`,
                opacity: patSpring,
              }}
            >
              <div style={{ color: "#D4AF37", fontSize: 14, fontWeight: 800, letterSpacing: "0.1em" }}>
                CONSOLIDATED NET PROFIT (PAT)
              </div>
              <div>
                <div style={{ color: "#FFF", fontSize: 40, fontWeight: 900 }}>
                  &gt; ₹26,000 CR
                </div>
                <div style={{ color: "#FDE68A", fontSize: 15, marginTop: 4 }}>
                  Net Profit Per Year
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.15)",
                  padding: "8px 12px",
                  borderRadius: 8,
                  color: "#D4AF37",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Consistently expanding bottom-line
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
