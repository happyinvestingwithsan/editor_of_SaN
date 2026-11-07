import React from "react";
import { interpolate, spring } from "remotion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene15_FinalPerspectiveConclusion: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 95 },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 50,
        left: 100,
        right: 100,
        zIndex: 40,
        opacity: enterSpring,
        transform: `translateY(${interpolate(enterSpring, [0, 1], [40, 0])}px)`,
      }}
    >
      {/* Elegant Bottom Editorial Banner (Zero Tracking / Slashes / Docket Clutter) */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(18px)",
          border: `2px solid ${ESFB2_THEME.colors.primaryTeal}`,
          borderRadius: 24,
          padding: "32px 48px",
          boxShadow: ESFB2_THEME.shadows.floating,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 1050 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 8,
              backgroundColor: ESFB2_THEME.colors.positiveBg,
              color: ESFB2_THEME.colors.positive,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            <CheckCircle2 size={18} />
            <span>Analytical Takeaway</span>
          </div>

          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: ESFB2_THEME.colors.textPrimary,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}
          >
            &ldquo;Only that small microfinancing part was hurting them — and they fixed it.&rdquo;
          </div>

          <div
            style={{
              fontSize: 20,
              color: ESFB2_THEME.colors.textSecondary,
              marginTop: 6,
              fontWeight: 600,
            }}
          >
            With the stressed 15% MFI book recognized and cleaned, the core 85% secured engine was ready for a dramatic rebound.
          </div>
        </div>

        {/* Up Next Teaser Pill */}
        <div
          style={{
            padding: "18px 30px",
            borderRadius: 18,
            backgroundColor: ESFB2_THEME.colors.primaryTeal,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 8px 24px rgba(15, 143, 135, 0.35)",
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.9 }}>
              Next Chapter
            </div>
            <div style={{ fontSize: 20, fontWeight: 900 }}>
              The Phoenix Rebound
            </div>
          </div>
          <ArrowRight size={24} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};
