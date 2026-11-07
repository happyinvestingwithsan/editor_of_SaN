import React from "react";
import { interpolate, spring } from "remotion";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene06_CreditCostShock: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping to Spoken Audio:
  // "from 2.3% in FY24": 2.3% spoken at frame 1292 (rel sceneFrame 112)
  const bar1Spring = spring({
    frame: Math.max(0, sceneFrame - 110),
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // "to a staggering 11.37% in FY25": 11.37% spoken at frame 1388 - 1431 (rel sceneFrame 208)
  const bar2Spring = spring({
    frame: Math.max(0, sceneFrame - 208),
    fps: 30,
    config: { damping: 16, stiffness: 85 },
  });

  // Multiplier "Almost 5x" pops right as 11.37% finishes around frame 1420 (rel sceneFrame 240)
  const multiplierSpring = spring({
    frame: Math.max(0, sceneFrame - 238),
    fps: 30,
    config: { damping: 14, stiffness: 120 },
  });

  // Dynamic animated numbers
  const num23 = interpolate(bar1Spring, [0, 1], [0, 2.3]).toFixed(2);
  const num1137 = interpolate(bar2Spring, [0, 1], [0, 11.37]).toFixed(2);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "44px 50px",
        boxSizing: "border-box",
        opacity: enterSpring,
        transform: `translateY(${interpolate(enterSpring, [0, 1], [30, 0])}px)`,
      }}
    >
      {/* Top Header Badge & Title (Zero Tracking / Slashes) */}
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 20px",
            borderRadius: 999,
            backgroundColor: ESFB2_THEME.colors.negativeBg,
            border: `1.5px solid ${ESFB2_THEME.colors.negativeBorder}`,
            color: ESFB2_THEME.colors.negative,
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          <AlertTriangle size={18} />
          <span>MFI Credit Cost Explosion</span>
        </div>

        <h1
          style={{
            fontSize: 50,
            fontWeight: 900,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.15,
            margin: "0 0 10px 0",
            letterSpacing: "-0.02em",
          }}
        >
          Credit Cost Shot Up Nearly 5x
        </h1>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#FFFFFF",
            border: `1.5px solid ${ESFB2_THEME.colors.cardBorder}`,
            padding: "8px 18px",
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 800,
            color: ESFB2_THEME.colors.textPrimary,
          }}
        >
          <span style={{ color: ESFB2_THEME.colors.primaryTeal }}>2.30% (FY24)</span>
          <span style={{ color: ESFB2_THEME.colors.textSecondary }}>➔</span>
          <span style={{ color: ESFB2_THEME.colors.negative }}>11.37% (FY25)</span>
          <span style={{ fontSize: 16, color: ESFB2_THEME.colors.textSecondary, fontWeight: 600 }}>
            • Microfinance Credit Cost
          </span>
        </div>
      </div>

      {/* Vertical Bar Chart Comparison with Generous Padding to Enclose All Labels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "end",
          gap: 36,
          backgroundColor: ESFB2_THEME.colors.canvasSecondary,
          border: `2px solid ${ESFB2_THEME.colors.cardBorder}`,
          borderRadius: 24,
          padding: "36px 44px 32px 44px",
          boxShadow: ESFB2_THEME.shadows.card,
          minHeight: 410,
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* FY24 Normal Bar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", justifyContent: "flex-end" }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: ESFB2_THEME.colors.primaryTeal,
              marginBottom: 10,
              lineHeight: 1,
            }}
          >
            {num23}%
          </div>
          <div
            style={{
              width: "100%",
              maxWidth: 220,
              height: interpolate(bar1Spring, [0, 1], [6, 85]),
              backgroundColor: ESFB2_THEME.colors.primaryTeal,
              borderRadius: "14px 14px 4px 4px",
              boxShadow: ESFB2_THEME.shadows.subtle,
            }}
          />
          <div
            style={{
              marginTop: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary }}>
              FY24 Baseline
            </div>
            <div style={{ fontSize: 16, color: ESFB2_THEME.colors.textSecondary, fontWeight: 600, marginTop: 4 }}>
              Healthy credit cost
            </div>
          </div>
        </div>

        {/* Central Multiplier Indicator */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 80,
            opacity: multiplierSpring,
            transform: `scale(${interpolate(multiplierSpring, [0, 1], [0.6, 1])})`,
          }}
        >
          <div
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              backgroundColor: ESFB2_THEME.colors.negative,
              color: "#FFFFFF",
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: "0.04em",
              boxShadow: "0 8px 24px rgba(217, 120, 105, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ArrowUpRight size={22} strokeWidth={3} />
            <span>ALMOST 5X SHOCK</span>
          </div>
        </div>

        {/* FY25 Shock Bar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", justifyContent: "flex-end" }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: ESFB2_THEME.colors.negative,
              marginBottom: 10,
              lineHeight: 1,
            }}
          >
            {num1137}%
          </div>
          <div
            style={{
              width: "100%",
              maxWidth: 220,
              height: interpolate(bar2Spring, [0, 1], [6, 255]),
              backgroundColor: ESFB2_THEME.colors.negative,
              borderRadius: "14px 14px 4px 4px",
              boxShadow: "0 12px 32px rgba(217, 120, 105, 0.3)",
            }}
          />
          <div
            style={{
              marginTop: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: ESFB2_THEME.colors.negative }}>
              FY25 Staggering Spike
            </div>
            <div style={{ fontSize: 16, color: ESFB2_THEME.colors.textSecondary, fontWeight: 600, marginTop: 4 }}>
              +9.07% credit provisions
            </div>
          </div>
        </div>
      </div>

      {/* Forensic Takeaway Footnote (Mobile Legible 21px) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "18px 28px",
          borderRadius: 16,
          backgroundColor: ESFB2_THEME.colors.canvasTealTint,
          border: `1.5px solid ${ESFB2_THEME.colors.cardBorderStrong}`,
        }}
      >
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.4,
          }}
        >
          Analytical Reality: Microfinance credit cost jumped from a manageable 2.30% to an alarming 11.37%, wiping out operational profitability.
        </span>
      </div>
    </div>
  );
};
