import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SIPGrowthCalculatorProps {
  monthlyInvestment?: number;
  durationYears?: number;
  expectedReturnRate?: number;
  startFrame?: number;
}

export const SIPGrowthCalculator: React.FC<SIPGrowthCalculatorProps> = ({
  monthlyInvestment = 10000,
  durationYears = 15,
  expectedReturnRate = 14,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Calculate compound return: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
  const i = expectedReturnRate / 12 / 100;
  const n = durationYears * 12;
  const investedAmount = monthlyInvestment * n;
  const totalValue = Math.round(
    monthlyInvestment * (((Math.pow(1 + i, n) - 1) / i) * (1 + i))
  );
  const estimatedReturns = totalValue - investedAmount;

  // Rolling counter interpolation (over 50 frames)
  const counterProgress = interpolate(
    frame - startFrame,
    [10, 60],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const displayedTotal = Math.round(totalValue * counterProgress);
  const displayedInvested = Math.round(investedAmount * counterProgress);
  const displayedWealthGain = Math.round(estimatedReturns * counterProgress);

  return (
    <div
      style={{
        width: 920,
        backgroundColor: "#131924",
        borderRadius: 24,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "36px 40px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
        opacity: entrance,
        transform: `scale(${entrance})`,
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", margin: 0 }}>
          SIP COMPOUNDING ENGINE
        </h3>
        <span
          style={{
            backgroundColor: "rgba(0, 208, 156, 0.15)",
            color: "#00D09C",
            fontWeight: 800,
            fontSize: 14,
            padding: "6px 14px",
            borderRadius: 100,
          }}
        >
          ₹{monthlyInvestment.toLocaleString("en-IN")}/Month @ {expectedReturnRate}%
        </span>
      </div>

      {/* Main Wealth Total Card */}
      <div
        style={{
          backgroundColor: "#0B0F17",
          borderRadius: 18,
          padding: "24px 28px",
          border: "1px solid rgba(0, 208, 156, 0.3)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700, letterSpacing: "0.08em" }}>
          ESTIMATED TOTAL WEALTH (15 YEARS)
        </span>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#00D09C",
            fontFamily: "'JetBrains Mono', monospace",
            margin: "8px 0 0 0",
          }}
        >
          ₹{displayedTotal.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Split Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ backgroundColor: "#1A2230", padding: "18px 22px", borderRadius: 14 }}>
          <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700 }}>AMOUNT INVESTED</span>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", marginTop: 4 }}>
            ₹{displayedInvested.toLocaleString("en-IN")}
          </div>
        </div>

        <div style={{ backgroundColor: "#1A2230", padding: "18px 22px", borderRadius: 14 }}>
          <span style={{ fontSize: 13, color: "#00D09C", fontWeight: 700 }}>WEALTH GAINED</span>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#00D09C", marginTop: 4 }}>
            ₹{displayedWealthGain.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </div>
  );
};
