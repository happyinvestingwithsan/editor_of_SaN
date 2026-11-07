import React from "react";
import { interpolate, spring } from "remotion";
import { Sun, MapPin, Flame, AlertOctagon } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene05_RegionalStressHeatwaves: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping:
  // "in a place like Karnataka": frame 944 - 973 (rel sceneFrame 74 - 103)
  const shock1Spring = spring({
    frame: Math.max(0, sceneFrame - 80),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  // "and heat waves disrupted the rural wages": frame 992 - 1054 (rel sceneFrame 122 - 184)
  const shock2Spring = spring({
    frame: Math.max(0, sceneFrame - 120),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  // "defaults exploded": frame 1072 - 1106 (rel sceneFrame 202 - 236)
  const explosionSpring = spring({
    frame: Math.max(0, sceneFrame - 200),
    fps: 30,
    config: { damping: 16, stiffness: 110 },
  });

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
          <Flame size={18} />
          <span>Macro Shocks Collide</span>
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
          Regional Stress & Heatwaves
        </h1>

        <p
          style={{
            fontSize: 22,
            color: ESFB2_THEME.colors.textSecondary,
            margin: 0,
            lineHeight: 1.45,
            maxWidth: 980,
          }}
        >
          When fragile household incomes were hit by dual external shocks, defaults exploded across the entire microfinance industry.
        </p>
      </div>

      {/* Two Macro Shock Cards (Enlarged for Mobile Legibility) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
          margin: "14px 0",
        }}
      >
        {/* Shock 1: Karnataka Collection Friction */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: `2px solid ${ESFB2_THEME.colors.cardBorderMuted}`,
            borderRadius: 22,
            padding: "32px 36px",
            boxShadow: ESFB2_THEME.shadows.card,
            opacity: shock1Spring,
            transform: `translateY(${interpolate(shock1Spring, [0, 1], [20, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: ESFB2_THEME.colors.alertBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: ESFB2_THEME.colors.alert,
              }}
            >
              <MapPin size={26} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: ESFB2_THEME.colors.alert, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Regional Hub Friction
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: ESFB2_THEME.colors.textPrimary }}>
                Karnataka Collection Stress
              </div>
            </div>
          </div>
          <p style={{ fontSize: 18, color: ESFB2_THEME.colors.textSecondary, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
            Localized political resistance and collection friction halted daily microfinance recoveries across key districts.
          </p>
        </div>

        {/* Shock 2: Severe Summer Heatwaves */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: `2px solid ${ESFB2_THEME.colors.cardBorderMuted}`,
            borderRadius: 22,
            padding: "32px 36px",
            boxShadow: ESFB2_THEME.shadows.card,
            opacity: shock2Spring,
            transform: `translateY(${interpolate(shock2Spring, [0, 1], [20, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: ESFB2_THEME.colors.negativeBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: ESFB2_THEME.colors.negative,
              }}
            >
              <Sun size={26} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: ESFB2_THEME.colors.negative, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Climate Disruption
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: ESFB2_THEME.colors.textPrimary }}>
                Severe Heatwaves & Wages
              </div>
            </div>
          </div>
          <p style={{ fontSize: 18, color: ESFB2_THEME.colors.textSecondary, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
            Scorching summer heat disrupted agricultural labor and daily rural wages, breaking borrower repayment capacity.
          </p>
        </div>
      </div>

      {/* Explosion Banner (Mobile Legible) */}
      <div
        style={{
          backgroundColor: "#FFF9F8",
          border: `2px solid ${ESFB2_THEME.colors.negativeBorder}`,
          borderRadius: 20,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: explosionSpring,
          transform: `scale(${interpolate(explosionSpring, [0, 1], [0.96, 1])})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              backgroundColor: ESFB2_THEME.colors.negativeBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ESFB2_THEME.colors.negative,
            }}
          >
            <AlertOctagon size={32} />
          </div>

          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: ESFB2_THEME.colors.negative, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Industry-Wide Contagion
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary, marginTop: 4 }}>
              Defaults exploded across the entire microfinance industry — not just Equitas.
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "10px 22px",
            borderRadius: 12,
            backgroundColor: ESFB2_THEME.colors.negative,
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Industry Wave
        </div>
      </div>
    </div>
  );
};
