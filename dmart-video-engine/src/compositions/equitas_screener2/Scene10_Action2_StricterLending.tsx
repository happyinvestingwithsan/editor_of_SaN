import React from "react";
import { interpolate, spring } from "remotion";
import { Ban, Lock, CheckCircle2, UserX } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene10_Action2_StricterLending: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping:
  // "the bank simply said no for the new loans": frame 2542 - 2567 (rel sceneFrame 222 - 247)
  // The red declination gate slams shut exactly on "simply said no"
  const gateSpring = spring({
    frame: Math.max(0, sceneFrame - 215),
    fps: 30,
    config: { damping: 16, stiffness: 120 },
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
          <Lock size={18} color={ESFB2_THEME.colors.alert} />
          <span>Management Action 02: Stricter Lending</span>
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
          Action 2: The Bank Simply Said &ldquo;NO&rdquo;
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
          Equitas instituted ironclad lending rules: If an applicant already had too many active microfinance loans, credit was strictly denied.
        </p>
      </div>

      {/* Credit Decision Engine Box (Enlarged & Mobile Legible) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 32,
          backgroundColor: ESFB2_THEME.colors.canvasSecondary,
          border: `2px solid ${ESFB2_THEME.colors.cardBorder}`,
          borderRadius: 24,
          padding: "36px 44px",
          boxShadow: ESFB2_THEME.shadows.card,
          margin: "14px 0",
          alignItems: "center",
        }}
      >
        {/* Left: Strict Underwriting Rules */}
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: ESFB2_THEME.colors.primaryTeal,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 14,
            }}
          >
            New Underwriting Mandate
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ marginTop: 3 }}>
                <Ban size={24} color={ESFB2_THEME.colors.negative} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: ESFB2_THEME.colors.textPrimary, lineHeight: 1.35 }}>
                Over-indebted borrowers carrying ≥ 3 loans barred automatically.
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ marginTop: 3 }}>
                <CheckCircle2 size={24} color={ESFB2_THEME.colors.positive} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: ESFB2_THEME.colors.textPrimary, lineHeight: 1.35 }}>
                Strict adherence to genuine household cash flow surplus.
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ marginTop: 3 }}>
                <CheckCircle2 size={24} color={ESFB2_THEME.colors.positive} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: ESFB2_THEME.colors.textPrimary, lineHeight: 1.35 }}>
                Eliminated reliance on peer guarantees without verified ability to repay.
              </span>
            </div>
          </div>
        </div>

        {/* Right: The Red Declination Gate */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: `2.5px solid ${ESFB2_THEME.colors.negativeBorder}`,
            borderRadius: 22,
            padding: "32px 28px",
            textAlign: "center",
            boxShadow: ESFB2_THEME.shadows.elevated,
            opacity: gateSpring,
            transform: `scale(${interpolate(gateSpring, [0, 1], [0.92, 1])})`,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: ESFB2_THEME.colors.negativeBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ESFB2_THEME.colors.negative,
              margin: "0 auto 16px auto",
            }}
          >
            <UserX size={36} />
          </div>

          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: ESFB2_THEME.colors.negative,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            System Check Status
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: ESFB2_THEME.colors.negative,
              lineHeight: 1.2,
            }}
          >
            LOAN DECLINED
          </div>

          <div
            style={{
              fontSize: 17,
              color: ESFB2_THEME.colors.textSecondary,
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            Cross-institution credit limit exceeded
          </div>
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
        <Lock size={26} color={ESFB2_THEME.colors.primaryTeal} />
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.4,
          }}
        >
          The Disciplinary Shift: Refusing loans to bad credit risks is the hallmark of a conservative, long-term bank.
        </span>
      </div>
    </div>
  );
};
