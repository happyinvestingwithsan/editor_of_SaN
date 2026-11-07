import React from "react";
import { interpolate, spring } from "remotion";
import { HelpCircle, XCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene08_ManagementHonestyQuestion: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping:
  // "Did they try to hide their bad loans?": frame 1725 - 1789 (rel sceneFrame 90 - 154)
  const path1Spring = spring({
    frame: Math.max(0, sceneFrame - 90),
    fps: 30,
    config: { damping: 18, stiffness: 95 },
  });

  // "No, not actually.": frame 1808 - 1850 (rel sceneFrame 173 - 215)
  // Equitas upfront honesty reveals right on the spoken denial
  const path2Spring = spring({
    frame: Math.max(0, sceneFrame - 173),
    fps: 30,
    config: { damping: 16, stiffness: 100 },
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
            backgroundColor: ESFB2_THEME.colors.tealSoftBg,
            border: `1.5px solid ${ESFB2_THEME.colors.cardBorderStrong}`,
            color: ESFB2_THEME.colors.deepTeal,
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          <HelpCircle size={18} />
          <span>Governance & Integrity Audit</span>
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
          Did Management Try To Hide Bad Loans?
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
          When crises hit, the difference between a high-integrity bank and a dangerous value trap lies in how management handles bad debt.
        </p>
      </div>

      {/* Two Paths Comparison (Enlarged & Mobile Legible) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          margin: "14px 0",
        }}
      >
        {/* Path 1: The Evergreening Trap */}
        <div
          style={{
            backgroundColor: "#FFF9F8",
            border: `2px solid ${ESFB2_THEME.colors.negativeBorder}`,
            borderRadius: 22,
            padding: "34px 38px",
            boxShadow: ESFB2_THEME.shadows.card,
            opacity: path1Spring,
            transform: `translateY(${interpolate(path1Spring, [0, 1], [25, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <XCircle size={32} color={ESFB2_THEME.colors.negative} strokeWidth={2.5} />
            <span style={{ fontSize: 16, fontWeight: 800, color: ESFB2_THEME.colors.negative, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Typical Weak Management
            </span>
          </div>

          <div style={{ fontSize: 26, fontWeight: 900, color: ESFB2_THEME.colors.textPrimary, marginBottom: 10 }}>
            Evergreen & Conceal
          </div>

          <p style={{ fontSize: 18, color: ESFB2_THEME.colors.textSecondary, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
            Extend fresh loans to repay old defaults, hide toxic assets off balance sheet, and drag the pain out for 3 to 4 years.
          </p>

          <div
            style={{
              marginTop: 22,
              padding: "8px 18px",
              borderRadius: 10,
              backgroundColor: "rgba(217, 120, 105, 0.15)",
              color: ESFB2_THEME.colors.negative,
              fontWeight: 800,
              fontSize: 15,
              display: "inline-block",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            ❌ What Equitas Refused To Do
          </div>
        </div>

        {/* Path 2: Radical Upfront Clean-up */}
        <div
          style={{
            backgroundColor: ESFB2_THEME.colors.canvasSecondary,
            border: `2px solid ${ESFB2_THEME.colors.primaryTeal}`,
            borderRadius: 22,
            padding: "34px 38px",
            boxShadow: ESFB2_THEME.shadows.elevated,
            opacity: path2Spring,
            transform: `translateY(${interpolate(path2Spring, [0, 1], [25, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <CheckCircle2 size={32} color={ESFB2_THEME.colors.positive} strokeWidth={2.5} />
            <span style={{ fontSize: 16, fontWeight: 800, color: ESFB2_THEME.colors.primaryTeal, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Equitas Reality
            </span>
          </div>

          <div style={{ fontSize: 26, fontWeight: 900, color: ESFB2_THEME.colors.textPrimary, marginBottom: 10 }}>
            &ldquo;No. Not Actually.&rdquo;
          </div>

          <p style={{ fontSize: 18, color: ESFB2_THEME.colors.textSecondary, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
            Management refused to hide the problem. They chose radical transparency, recognized bad debts immediately, and cleaned house.
          </p>

          <div
            style={{
              marginTop: 22,
              padding: "8px 18px",
              borderRadius: 10,
              backgroundColor: ESFB2_THEME.colors.positiveBg,
              color: ESFB2_THEME.colors.positive,
              fontWeight: 800,
              fontSize: 15,
              display: "inline-block",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            ✓ Upfront Clean-Up in One Go
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
        <ShieldCheck size={26} color={ESFB2_THEME.colors.primaryTeal} />
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.4,
          }}
        >
          Key Forensic Lesson: A transparent one-time loss is a sign of management courage, not banking insolvency.
        </span>
      </div>
    </div>
  );
};
