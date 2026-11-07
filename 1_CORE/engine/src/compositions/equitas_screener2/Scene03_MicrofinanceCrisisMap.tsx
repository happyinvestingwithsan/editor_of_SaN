import React from "react";
import { interpolate, spring } from "remotion";
import { Globe, ArrowRight, Building2, Smartphone, Users, AlertCircle } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene03_MicrofinanceCrisisMap: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping:
  // "Lender has flooded the rural and semi-urban borrowers": frame 596 - 734 (rel sceneFrame 146 - 284)
  // The multi-lender credit flow triggers exactly on "Lender has flooded"
  const flowSpring = spring({
    frame: Math.max(0, sceneFrame - 146),
    fps: 30,
    config: { damping: 16, stiffness: 95 },
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
            backgroundColor: ESFB2_THEME.colors.alertBg,
            border: `1.5px solid ${ESFB2_THEME.colors.alertBorder}`,
            color: ESFB2_THEME.colors.darkTeal,
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          <Globe size={18} color={ESFB2_THEME.colors.alert} />
          <span>Industry Over-Lending Crisis</span>
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
          The Indian Microfinance Crisis
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
          Across India, lenders flooded rural and semi-urban borrowers with easy, unsecured microfinance loans.
        </p>
      </div>

      {/* Multi-Lender Flow Diagram (Enlarged for Mobile Legibility) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.4fr 1.3fr",
          alignItems: "center",
          gap: 28,
          backgroundColor: ESFB2_THEME.colors.canvasSecondary,
          border: `2px solid ${ESFB2_THEME.colors.cardBorder}`,
          borderRadius: 24,
          padding: "36px 42px",
          boxShadow: ESFB2_THEME.shadows.card,
          margin: "14px 0",
        }}
      >
        {/* Left Column: The 3 Aggressive Lenders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: ESFB2_THEME.colors.primaryTeal,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 2,
            }}
          >
            Competing Credit Sources
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 20px",
              borderRadius: 16,
              backgroundColor: "#FFFFFF",
              border: `1.5px solid ${ESFB2_THEME.colors.cardBorderMuted}`,
              boxShadow: ESFB2_THEME.shadows.subtle,
            }}
          >
            <Building2 size={26} color={ESFB2_THEME.colors.primaryTeal} />
            <span style={{ fontSize: 20, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary }}>
              Aggressive NBFC-MFIs
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 20px",
              borderRadius: 16,
              backgroundColor: "#FFFFFF",
              border: `1.5px solid ${ESFB2_THEME.colors.cardBorderMuted}`,
              boxShadow: ESFB2_THEME.shadows.subtle,
            }}
          >
            <Building2 size={26} color={ESFB2_THEME.colors.deepTeal} />
            <span style={{ fontSize: 20, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary }}>
              Small Finance Banks (SFBs)
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 20px",
              borderRadius: 16,
              backgroundColor: "#FFFFFF",
              border: `1.5px solid ${ESFB2_THEME.colors.cardBorderMuted}`,
              boxShadow: ESFB2_THEME.shadows.subtle,
            }}
          >
            <Smartphone size={26} color={ESFB2_THEME.colors.alert} />
            <span style={{ fontSize: 20, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary }}>
              Fintech Instant Loan Apps
            </span>
          </div>
        </div>

        {/* Center: Converging Flow Arrows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            opacity: flowSpring,
            transform: `scale(${interpolate(flowSpring, [0, 1], [0.8, 1])})`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: ESFB2_THEME.colors.negativeBg,
              border: `2px solid ${ESFB2_THEME.colors.negativeBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ESFB2_THEME.colors.negative,
            }}
          >
            <ArrowRight size={30} strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: ESFB2_THEME.colors.negative,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Credit Over-Supply
          </span>
        </div>

        {/* Right Column: Saturated Target Borrowers */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: `2.5px dashed ${ESFB2_THEME.colors.negativeBorder}`,
            borderRadius: 22,
            padding: "32px 34px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              backgroundColor: ESFB2_THEME.colors.negativeBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ESFB2_THEME.colors.negative,
              margin: "0 auto 16px auto",
            }}
          >
            <Users size={36} />
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: ESFB2_THEME.colors.textPrimary,
              marginBottom: 10,
            }}
          >
            Rural & Semi-Urban Borrowers
          </div>

          <p
            style={{
              fontSize: 18,
              color: ESFB2_THEME.colors.textSecondary,
              lineHeight: 1.45,
              margin: 0,
              fontWeight: 500,
            }}
          >
            Households with fragile cash flows bombarded by 4 to 5 lenders simultaneously.
          </p>
        </div>
      </div>

      {/* Forensic Alert Card (Mobile Legible 21px) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "18px 28px",
          borderRadius: 16,
          backgroundColor: "#FFF9F8",
          border: `1.5px solid ${ESFB2_THEME.colors.negativeBorder}`,
        }}
      >
        <AlertCircle size={26} color={ESFB2_THEME.colors.negative} />
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.4,
          }}
        >
          Systemic Trap: When multiple institutions chase the same borrower group, underwriting discipline breaks down.
        </span>
      </div>
    </div>
  );
};
