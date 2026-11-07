import React from "react";
import { spring, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface PositiveNegativeSplitProps {
  activePillar: "positive" | "negative" | "both";
  startFrame?: number;
}

export const PositiveNegativeSplit: React.FC<PositiveNegativeSplitProps> = ({
  activePillar,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  const splitSpring = spring({
    frame: relFrame,
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const isPos = activePillar === "positive" || activePillar === "both";
  const isNeg = activePillar === "negative" || activePillar === "both";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        width: "100%",
        height: "100%",
        padding: "40px",
        fontFamily: EQUITAS_THEME.fonts.display,
        boxSizing: "border-box",
        opacity: splitSpring,
      }}
    >
      {/* Left Pillar: The Positive Scenario */}
      <div
        style={{
          flex: 1,
          height: "100%",
          maxHeight: 560,
          background: "#FFFFFF",
          border: `2.5px solid ${
            isPos ? EQUITAS_THEME.colors.primaryTeal : "rgba(15, 23, 42, 0.08)"
          }`,
          borderRadius: 24,
          padding: "36px 32px",
          display: "flex",
          flexDirection: "column",
          boxShadow: isPos ? EQUITAS_THEME.shadows.cardElevated : "none",
          transition: "all 0.4s ease",
          opacity: isPos ? 1 : 0.35,
          transform: `scale(${isPos ? 1.02 : 0.98})`,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "3px",
            color: EQUITAS_THEME.colors.primaryTeal,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          SCENARIO 01
        </div>

        <div
          style={{
            fontSize: 32, // Large bold black for mobile
            fontWeight: 900,
            color: EQUITAS_THEME.colors.textPrimary,
            marginBottom: 24,
            lineHeight: 1.15,
          }}
        >
          THE POSITIVE SCENARIO
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ color: EQUITAS_THEME.colors.primaryTeal, fontSize: 24, lineHeight: 1 }}>✔</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: EQUITAS_THEME.colors.textPrimary }}>
                Orderly Leadership Transition
              </div>
              <div style={{ fontSize: 16, color: EQUITAS_THEME.colors.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
                Vasudevan remains active MD & CEO on board request until RBI approves successor.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ color: EQUITAS_THEME.colors.primaryTeal, fontSize: 24, lineHeight: 1 }}>✔</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: EQUITAS_THEME.colors.textPrimary }}>
                Permanent Conflict Resolution
              </div>
              <div style={{ fontSize: 16, color: EQUITAS_THEME.colors.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
                Search committee initiated; permanently removes the multi-year perceived conflict overhang.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ color: EQUITAS_THEME.colors.primaryTeal, fontSize: 24, lineHeight: 1 }}>✔</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: EQUITAS_THEME.colors.textPrimary }}>
                Professional Institutional Reins
              </div>
              <div style={{ fontSize: 16, color: EQUITAS_THEME.colors.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
                Paves the way for institutional corporate governance and professional leadership.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pillar: The Negative Risk Scenario */}
      <div
        style={{
          flex: 1,
          height: "100%",
          maxHeight: 560,
          background: "#FFFFFF",
          border: `2.5px solid ${
            isNeg ? EQUITAS_THEME.colors.riskRed : "rgba(15, 23, 42, 0.08)"
          }`,
          borderRadius: 24,
          padding: "36px 32px",
          display: "flex",
          flexDirection: "column",
          boxShadow: isNeg ? "0 25px 60px -12px rgba(220, 38, 38, 0.18)" : "none",
          transition: "all 0.4s ease",
          opacity: isNeg ? 1 : 0.35,
          transform: `scale(${isNeg ? 1.02 : 0.98})`,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "3px",
            color: EQUITAS_THEME.colors.riskRed,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          SCENARIO 02
        </div>

        <div
          style={{
            fontSize: 32, // Large bold black for mobile
            fontWeight: 900,
            color: EQUITAS_THEME.colors.textPrimary,
            marginBottom: 24,
            lineHeight: 1.15,
          }}
        >
          THE NEGATIVE SCENARIO
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ color: EQUITAS_THEME.colors.riskRed, fontSize: 24, lineHeight: 1 }}>⚠</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: EQUITAS_THEME.colors.textPrimary }}>
                Founder Transition Friction
              </div>
              <div style={{ fontSize: 16, color: EQUITAS_THEME.colors.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
                Banking founder departures historically carry operational friction and cultural risk.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ color: EQUITAS_THEME.colors.riskRed, fontSize: 24, lineHeight: 1 }}>⚠</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: EQUITAS_THEME.colors.textPrimary }}>
                Institutional Uncertainty
              </div>
              <div style={{ fontSize: 16, color: EQUITAS_THEME.colors.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
                Funds dislike management ambiguity; brokerages cut ratings until new CEO proves credit discipline.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ color: EQUITAS_THEME.colors.riskRed, fontSize: 24, lineHeight: 1 }}>⚠</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: EQUITAS_THEME.colors.textPrimary }}>
                Execution Discipline Test
              </div>
              <div style={{ fontSize: 16, color: EQUITAS_THEME.colors.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
                Upcoming leadership must maintain microfinance underwriting quality and growth dynamics.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
