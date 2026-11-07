import React from "react";
import { interpolate, spring } from "remotion";
import { ShieldCheck, RotateCcw } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene09_Action1_RadicalHonesty: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping:
  // "accepted a big loss of 224 crores": frame 2015 - 2080 (rel sceneFrame 155 - 220)
  const cardSpring = spring({
    frame: Math.max(0, sceneFrame - 165),
    fps: 30,
    config: { damping: 18, stiffness: 95 },
  });

  // "They cleaned up all their bad loans in one go": frame 2120 - 2200 (rel sceneFrame 260)
  // Stamp slams down exactly on "in one go"
  const stampSpring = spring({
    frame: Math.max(0, sceneFrame - 250),
    fps: 30,
    config: { damping: 14, stiffness: 180 },
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
          <span>Management Action 01: Honesty</span>
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
          Action 1: Cleaned Up In One Go
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
          In mid-2025, Equitas accepted a ₹224 crore loss to write off bad microfinance loans completely instead of hiding a multi-year backlog.
        </p>
      </div>

      {/* Main Upfront Kitchen-Sink Card (Enlarged & Mobile Legible) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `2px solid ${ESFB2_THEME.colors.primaryTeal}`,
          borderRadius: 24,
          padding: "36px 44px",
          boxShadow: ESFB2_THEME.shadows.elevated,
          position: "relative",
          overflow: "hidden",
          margin: "14px 0",
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: ESFB2_THEME.colors.primaryTeal,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Mid-2025 Recognized Loss
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                color: ESFB2_THEME.colors.textPrimary,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              -₹224 Cr
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: ESFB2_THEME.colors.textSecondary,
                marginTop: 8,
              }}
            >
              Aggressive 100% upfront provisioning on stressed microfinance borrowers
            </div>
          </div>

          {/* Rubber Stamp Badge */}
          <div
            style={{
              padding: "18px 30px",
              border: `4px solid ${ESFB2_THEME.colors.positive}`,
              borderRadius: 14,
              color: ESFB2_THEME.colors.positive,
              fontWeight: 900,
              fontSize: 24,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              transform: `rotate(-6deg) scale(${interpolate(stampSpring, [0, 1], [2.0, 1])})`,
              opacity: stampSpring,
              backgroundColor: ESFB2_THEME.colors.positiveBg,
              boxShadow: "0 6px 16px rgba(36, 155, 121, 0.25)",
            }}
          >
            ✓ CLEANED IN ONE GO
          </div>
        </div>

        {/* Dual Comparison Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginTop: 28,
            paddingTop: 24,
            borderTop: `2px solid ${ESFB2_THEME.colors.divider}`,
          }}
        >
          <div
            style={{
              padding: "18px 24px",
              borderRadius: 16,
              backgroundColor: "#FFF9F8",
              border: `1.5px solid ${ESFB2_THEME.colors.negativeBorder}`,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: ESFB2_THEME.colors.negative, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              The Wrong Strategy
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary, marginTop: 4 }}>
              Hide problem as 3-year zombie backlog
            </div>
          </div>

          <div
            style={{
              padding: "18px 24px",
              borderRadius: 16,
              backgroundColor: ESFB2_THEME.colors.positiveBg,
              border: `1.5px solid ${ESFB2_THEME.colors.positiveBorder}`,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: ESFB2_THEME.colors.positive, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              The Equitas Execution
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary, marginTop: 4 }}>
              Rip off the band-aid, reset balance sheet
            </div>
          </div>
        </div>
      </div>

      {/* Forensic Takeaway (Mobile Legible 21px) */}
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
        <RotateCcw size={26} color={ESFB2_THEME.colors.primaryTeal} />
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.4,
          }}
        >
          Outcome: By taking the hit immediately, future quarters were completely freed from legacy NPA drag.
        </span>
      </div>
    </div>
  );
};
