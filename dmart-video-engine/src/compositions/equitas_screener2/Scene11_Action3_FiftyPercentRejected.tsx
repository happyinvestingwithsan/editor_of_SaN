import React from "react";
import { interpolate, spring } from "remotion";
import { Shield, CheckCircle2, XCircle, Award } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene11_Action3_FiftyPercentRejected: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping:
  // "rejected almost half": frame 2633 - 2672 (rel sceneFrame 33 - 72)
  const heroSpring = spring({
    frame: Math.max(0, sceneFrame - 30),
    fps: 30,
    config: { damping: 16, stiffness: 95 },
  });

  // "They chose safety over the risky growth": frame 2762 - 2846 (rel sceneFrame 162 - 246)
  // At frame 2791, this spring is smoothly animating the trade-off cards!
  const tradeSpring = spring({
    frame: Math.max(0, sceneFrame - 160),
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
          <Award size={18} />
          <span>Underwriting Discipline & Capital Defense</span>
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
          Rejected ~50% Of Risky Borrowers
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
          Equitas consciously rejected nearly half of all loan requests from vulnerable borrowers, choosing safety over risky book expansion.
        </p>
      </div>

      {/* Dominant Hero Stat & Strategic Trade-off Grid (Optimized for Mobile Legibility) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.35fr",
          gap: 36,
          backgroundColor: "#FFFFFF",
          border: `2px solid ${ESFB2_THEME.colors.primaryTeal}`,
          borderRadius: 24,
          padding: "36px 44px",
          boxShadow: ESFB2_THEME.shadows.elevated,
          margin: "12px 0",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Giant Hero Stat */}
        <div
          style={{
            textAlign: "center",
            borderRight: `2px solid ${ESFB2_THEME.colors.divider}`,
            paddingRight: 36,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: ESFB2_THEME.colors.primaryTeal,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            Rejection Rate
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 900,
              color: ESFB2_THEME.colors.primaryTeal,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              opacity: heroSpring,
              transform: `scale(${interpolate(heroSpring, [0, 1], [0.9, 1])})`,
            }}
          >
            ~50%
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: ESFB2_THEME.colors.textPrimary,
              marginTop: 12,
            }}
          >
            Over-Leveraged Borrowers Denied
          </div>
        </div>

        {/* Strategic Trade-off Grid (Enlarged for Mobile Legibility) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            opacity: tradeSpring,
            transform: `translateY(${interpolate(tradeSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          {/* Priority Card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "20px 24px",
              borderRadius: 18,
              backgroundColor: ESFB2_THEME.colors.positiveBg,
              border: `2px solid ${ESFB2_THEME.colors.positiveBorder}`,
            }}
          >
            <CheckCircle2 size={32} color={ESFB2_THEME.colors.positive} strokeWidth={2.5} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: ESFB2_THEME.colors.positive, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Equitas Priority
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary, marginTop: 4 }}>
                Balance Sheet Safety & Capital Defense
              </div>
            </div>
          </div>

          {/* Sacrificed Card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "20px 24px",
              borderRadius: 18,
              backgroundColor: "#FFF9F8",
              border: `2px solid ${ESFB2_THEME.colors.negativeBorder}`,
            }}
          >
            <XCircle size={32} color={ESFB2_THEME.colors.negative} strokeWidth={2.5} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: ESFB2_THEME.colors.negative, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Deliberately Sacrificed
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: ESFB2_THEME.colors.textSecondary, marginTop: 4 }}>
                Blind AUM Growth & Dangerous Targets
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forensic Takeaway (Enlarged to 21px) */}
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
        <Shield size={26} color={ESFB2_THEME.colors.primaryTeal} />
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.4,
          }}
        >
          Core Ethos: Saying NO to 50% of applicants takes true banking discipline — and preserves capital for shareholders.
        </span>
      </div>
    </div>
  );
};
