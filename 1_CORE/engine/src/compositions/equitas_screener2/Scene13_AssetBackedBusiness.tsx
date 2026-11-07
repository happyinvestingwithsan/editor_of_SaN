import React from "react";
import { interpolate, spring } from "remotion";
import { Home, Truck, Store, ShieldCheck, CheckCircle2 } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene13_AssetBackedBusiness: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping:
  // "like property": frame 3187 - 3203 (rel sceneFrame 127 - 143)
  const cardPropertySpring = spring({
    frame: Math.max(0, sceneFrame - 125),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  // "shops": frame 3220 - 3221 (rel sceneFrame 160)
  const cardShopsSpring = spring({
    frame: Math.max(0, sceneFrame - 158),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  // "and commercial vehicles": frame 3237 - 3260 (rel sceneFrame 177 - 200)
  const cardVehiclesSpring = spring({
    frame: Math.max(0, sceneFrame - 175),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
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
            backgroundColor: ESFB2_THEME.colors.positiveBg,
            border: `1.5px solid ${ESFB2_THEME.colors.positiveBorder}`,
            color: ESFB2_THEME.colors.positive,
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          <ShieldCheck size={18} />
          <span>Core Franchise Strength: Tangible Collateral</span>
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
          85% Backed By Hard Real Assets
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
          Equitas&rsquo; main engine is backed by physical assets that generate daily cash flow and retain high liquidation recovery value.
        </p>
      </div>

      {/* 3 Physical Asset Pillars (Mobile Legible & High Contrast) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          margin: "14px 0",
        }}
      >
        {/* Pillar 1: Property / Mortgages */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: `2px solid ${ESFB2_THEME.colors.cardBorder}`,
            borderRadius: 22,
            padding: "32px 28px",
            boxShadow: ESFB2_THEME.shadows.card,
            opacity: cardPropertySpring,
            transform: `translateY(${interpolate(cardPropertySpring, [0, 1], [25, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: ESFB2_THEME.colors.canvasTealTint,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ESFB2_THEME.colors.primaryTeal,
              marginBottom: 18,
            }}
          >
            <Home size={32} />
          </div>

          <div style={{ fontSize: 24, fontWeight: 900, color: ESFB2_THEME.colors.textPrimary, marginBottom: 8 }}>
            Property & LAP
          </div>

          <p style={{ fontSize: 17, color: ESFB2_THEME.colors.textSecondary, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
            Residential houses & commercial properties with conservative 50% loan-to-value limits.
          </p>
        </div>

        {/* Pillar 2: Shops & Micro Enterprises */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: `2px solid ${ESFB2_THEME.colors.cardBorder}`,
            borderRadius: 22,
            padding: "32px 28px",
            boxShadow: ESFB2_THEME.shadows.card,
            opacity: cardShopsSpring,
            transform: `translateY(${interpolate(cardShopsSpring, [0, 1], [25, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: ESFB2_THEME.colors.canvasTealTint,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ESFB2_THEME.colors.darkTeal,
              marginBottom: 18,
            }}
          >
            <Store size={32} />
          </div>

          <div style={{ fontSize: 24, fontWeight: 900, color: ESFB2_THEME.colors.textPrimary, marginBottom: 8 }}>
            Shops & Merchants
          </div>

          <p style={{ fontSize: 17, color: ESFB2_THEME.colors.textSecondary, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
            Kirana stores, pharmacies & hardware shops with continuous daily cash footfall and turnover.
          </p>
        </div>

        {/* Pillar 3: Commercial Vehicles */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: `2px solid ${ESFB2_THEME.colors.cardBorder}`,
            borderRadius: 22,
            padding: "32px 28px",
            boxShadow: ESFB2_THEME.shadows.card,
            opacity: cardVehiclesSpring,
            transform: `translateY(${interpolate(cardVehiclesSpring, [0, 1], [25, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: ESFB2_THEME.colors.canvasTealTint,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ESFB2_THEME.colors.deepTeal,
              marginBottom: 18,
            }}
          >
            <Truck size={32} />
          </div>

          <div style={{ fontSize: 24, fontWeight: 900, color: ESFB2_THEME.colors.textPrimary, marginBottom: 8 }}>
            Commercial Vehicles
          </div>

          <p style={{ fontSize: 17, color: ESFB2_THEME.colors.textSecondary, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
            Small commercial vehicles & used trucks generating active transport freight revenue.
          </p>
        </div>
      </div>

      {/* Forensic Seal (Mobile Legible 21px) */}
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
        <CheckCircle2 size={26} color={ESFB2_THEME.colors.positive} />
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.4,
          }}
        >
          Underwriting Reality: Secured asset backing means near-zero ultimate loan losses even during a broader economic slowdown.
        </span>
      </div>
    </div>
  );
};
