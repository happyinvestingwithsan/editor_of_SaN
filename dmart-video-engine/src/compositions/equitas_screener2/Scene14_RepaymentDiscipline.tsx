import React from "react";
import { interpolate, spring } from "remotion";
import { CalendarCheck, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene14_RepaymentDiscipline: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

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
          <CalendarCheck size={18} />
          <span>Collection Efficiency & Repayment Track</span>
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
          In The Main Business, Everyone Pays On Time
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
          In the 85% secured lending book, borrowers maintain disciplined, uninterrupted monthly repayments.
        </p>
      </div>

      {/* Monthly EMI Calendar Grid Card (Enlarged & Mobile Legible) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `2px solid ${ESFB2_THEME.colors.cardBorder}`,
          borderRadius: 24,
          padding: "36px 44px",
          boxShadow: ESFB2_THEME.shadows.card,
          margin: "14px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: ESFB2_THEME.colors.primaryTeal, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Collection Health Tracker
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: ESFB2_THEME.colors.textPrimary, marginTop: 4 }}>
              Continuous Monthly EMI Flow
            </div>
          </div>

          <div
            style={{
              padding: "10px 24px",
              borderRadius: 14,
              backgroundColor: ESFB2_THEME.colors.positiveBg,
              color: ESFB2_THEME.colors.positive,
              fontSize: 20,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Sparkles size={22} />
            <span>&gt; 99% Collection Efficiency</span>
          </div>
        </div>

        {/* 12 Months Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 18,
          }}
        >
          {months.map((m, idx) => {
            // Kinetic Snapping:
            // "almost everyone pays the EMI properly on time": frame 3322 - 3403 (rel sceneFrame 57 - 138)
            // Checks tick across each month as SaN speaks
            const checkSpring = spring({
              frame: Math.max(0, sceneFrame - 58 - idx * 5),
              fps: 30,
              config: { damping: 14, stiffness: 140 },
            });

            return (
              <div
                key={m}
                style={{
                  backgroundColor: ESFB2_THEME.colors.canvasSecondary,
                  border: `1.5px solid ${ESFB2_THEME.colors.cardBorderMuted}`,
                  borderRadius: 16,
                  padding: "18px 14px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary }}>
                  {m}
                </span>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    backgroundColor: ESFB2_THEME.colors.positiveBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: ESFB2_THEME.colors.positive,
                    opacity: checkSpring,
                    transform: `scale(${interpolate(checkSpring, [0, 1], [0.4, 1])})`,
                  }}
                >
                  <CheckCircle2 size={24} strokeWidth={3} />
                </div>
              </div>
            );
          })}
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
        <ShieldCheck size={26} color={ESFB2_THEME.colors.primaryTeal} />
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.4,
          }}
        >
          Borrower Psychology: Because real homes and business assets are on the line, defaults in this core book remain exceptionally low.
        </span>
      </div>
    </div>
  );
};
