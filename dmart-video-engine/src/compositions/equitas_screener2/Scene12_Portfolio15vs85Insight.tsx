import React from "react";
import { interpolate, spring } from "remotion";
import { ShieldCheck, Layers } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene12_Portfolio15vs85Insight: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping to Spoken Audio:
  // "in 100% of the business": frame 2913 - 2940 (rel sceneFrame 63 - 90) -> draws the 85% core
  const chart85Spring = spring({
    frame: Math.max(0, sceneFrame - 65),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // "only 15% is actually attributed to this risk": frame 2972 - 3000 (rel sceneFrame 122) -> reveals 15% coral slice
  const chart15Spring = spring({
    frame: Math.max(0, sceneFrame - 120),
    fps: 30,
    config: { damping: 15, stiffness: 100 },
  });

  // Side cards reveal on rhythm
  const cardsSpring = spring({
    frame: Math.max(0, sceneFrame - 85),
    fps: 30,
    config: { damping: 16, stiffness: 100 },
  });

  // Animated stroke offset for dominant doughnut
  // Radius r = 135 -> Perimeter = 2 * PI * 135 = 848.23
  const perimeter = 848.23;
  const progress85 = interpolate(chart85Spring, [0, 1], [0, 0.85]);
  const progress15 = interpolate(chart15Spring, [0, 1], [0, 0.15]);

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
          <Layers size={18} />
          <span>Portfolio Architecture Breakdown</span>
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
          The 15% vs 85% Reality
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
          In 100% of Equitas&rsquo; total business, only 15% was attributed to this microfinance crisis. The remaining 85% was completely separate.
        </p>
      </div>

      {/* Dominant Hero Doughnut Chart & Breakdown Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          alignItems: "center",
          gap: 48,
          backgroundColor: "#FFFFFF",
          border: `2px solid ${ESFB2_THEME.colors.cardBorder}`,
          borderRadius: 24,
          padding: "36px 44px",
          boxShadow: ESFB2_THEME.shadows.card,
          minHeight: 410,
          boxSizing: "border-box",
        }}
      >
        {/* Dominant SVG Doughnut Graphic (Enlarged to 340px) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: 340,
            height: 340,
          }}
        >
          <svg width="340" height="340" viewBox="0 0 340 340">
            {/* Background Track */}
            <circle
              cx="170"
              cy="170"
              r="135"
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth="38"
            />
            {/* 85% Main Core Business Arc (Primary Teal) */}
            <circle
              cx="170"
              cy="170"
              r="135"
              fill="transparent"
              stroke={ESFB2_THEME.colors.primaryTeal}
              strokeWidth="38"
              strokeDasharray={perimeter}
              strokeDashoffset={perimeter * (1 - progress85)}
              strokeLinecap="round"
              transform="rotate(-90 170 170)"
            />
            {/* 15% Microfinance Stressed Arc (Coral Shock) */}
            <circle
              cx="170"
              cy="170"
              r="135"
              fill="transparent"
              stroke={ESFB2_THEME.colors.negative}
              strokeWidth="38"
              strokeDasharray={perimeter}
              strokeDashoffset={perimeter * (1 - progress15)}
              strokeLinecap="round"
              transform={`rotate(${-90 + 360 * 0.85} 170 170)`}
            />
          </svg>

          {/* Central Dominant Label */}
          <div
            style={{
              position: "absolute",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 800, color: ESFB2_THEME.colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Total Loan Book
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: ESFB2_THEME.colors.textPrimary, lineHeight: 1.05 }}>
              100%
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: ESFB2_THEME.colors.primaryTeal, marginTop: 4 }}>
              ₹35,000+ Cr AUM
            </div>
          </div>
        </div>

        {/* Two High-Contrast Breakdown Cards (Mobile Legible) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            opacity: cardsSpring,
          }}
        >
          {/* 85% Core Business Card */}
          <div
            style={{
              backgroundColor: ESFB2_THEME.colors.canvasSecondary,
              border: `2px solid ${ESFB2_THEME.colors.primaryTeal}`,
              borderRadius: 20,
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: ESFB2_THEME.shadows.subtle,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: ESFB2_THEME.colors.primaryTeal, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                Main Core Lending (Secured)
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary }}>
                Property, Shops & Commercial Vehicles
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: ESFB2_THEME.colors.textSecondary, marginTop: 4 }}>
                Uncompromised collection discipline & real collateral
              </div>
            </div>
            <div
              style={{
                fontSize: 58,
                fontWeight: 900,
                color: ESFB2_THEME.colors.primaryTeal,
                lineHeight: 1,
                paddingLeft: 20,
              }}
            >
              85%
            </div>
          </div>

          {/* 15% Stressed Microfinance Card */}
          <div
            style={{
              backgroundColor: "#FFF9F8",
              border: `2px solid ${ESFB2_THEME.colors.negative}`,
              borderRadius: 20,
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 8px 24px rgba(217, 120, 105, 0.15)",
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: ESFB2_THEME.colors.negative, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                Microfinance Segment (Unsecured)
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: ESFB2_THEME.colors.negative }}>
                Isolated Stress Contained & Cleaned
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: ESFB2_THEME.colors.textSecondary, marginTop: 4 }}>
                The only part causing quarterly volatility
              </div>
            </div>
            <div
              style={{
                fontSize: 58,
                fontWeight: 900,
                color: ESFB2_THEME.colors.negative,
                lineHeight: 1,
                paddingLeft: 20,
              }}
            >
              15%
            </div>
          </div>
        </div>
      </div>

      {/* Forensic Takeaway Footnote (Mobile Legible 21px) */}
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
          Crucial Discovery: 85% of Equitas was untouched by the microfinance crisis!
        </span>
      </div>
    </div>
  );
};
