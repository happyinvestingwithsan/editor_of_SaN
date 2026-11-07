import React from "react";
import { interpolate, spring } from "remotion";
import { AlertTriangle, TrendingDown, TrendingUp, HelpCircle } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene01_ProfitCollapse: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping:
  // "Why did the profit": frame 16 (rel sceneFrame 16) -> reveals FY24 baseline card
  const card1Spring = spring({
    frame: Math.max(0, sceneFrame - 16),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  // "dipped so drastically": frame 66 (rel sceneFrame 66) -> reveals -₹224 Cr plunge card
  const card2Spring = spring({
    frame: Math.max(0, sceneFrame - 66),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  // "Many retail investors would have thought the bank is collapsing": frame 150 (rel sceneFrame 150)
  const panicSpring = spring({
    frame: Math.max(0, sceneFrame - 145),
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
          <AlertTriangle size={18} />
          <span>Retail Sentiment & Earnings Shock</span>
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
          Why Did Profits Collapse?
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
          Retail investors feared the bank was collapsing when quarterly net profit cratered from historic peaks into a sudden loss.
        </p>
      </div>

      {/* Side-by-Side Comparison Cards (Enlarged & Mobile-First) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          margin: "18px 0",
        }}
      >
        {/* Card 1: Peak Profit Baseline */}
        <div
          style={{
            backgroundColor: ESFB2_THEME.colors.canvasSecondary,
            border: `2px solid ${ESFB2_THEME.colors.cardBorder}`,
            borderRadius: 22,
            padding: "32px 36px",
            boxShadow: ESFB2_THEME.shadows.card,
            opacity: card1Spring,
            transform: `translateY(${interpolate(card1Spring, [0, 1], [24, 0])}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: ESFB2_THEME.colors.primaryTeal,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              FY24 All-Time Peak
            </span>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: ESFB2_THEME.colors.positiveBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: ESFB2_THEME.colors.positive,
              }}
            >
              <TrendingUp size={22} strokeWidth={2.5} />
            </div>
          </div>

          <div
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: ESFB2_THEME.colors.primaryTeal,
              lineHeight: 1,
              marginBottom: 10,
              letterSpacing: "-0.03em",
            }}
          >
            ₹799 Cr
          </div>

          <div
            style={{
              fontSize: 20,
              color: ESFB2_THEME.colors.textSecondary,
              fontWeight: 600,
            }}
          >
            Over ₹200 Cr net profit every quarter consistently
          </div>
        </div>

        {/* Card 2: The Shock Loss */}
        <div
          style={{
            backgroundColor: "#FFF9F8",
            border: `2px solid ${ESFB2_THEME.colors.negativeBorder}`,
            borderRadius: 22,
            padding: "32px 36px",
            boxShadow: ESFB2_THEME.shadows.card,
            opacity: card2Spring,
            transform: `translateY(${interpolate(card2Spring, [0, 1], [24, 0])}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: ESFB2_THEME.colors.negative,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Mid-2025 Sudden Loss
            </span>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: ESFB2_THEME.colors.negativeBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: ESFB2_THEME.colors.negative,
              }}
            >
              <TrendingDown size={22} strokeWidth={2.5} />
            </div>
          </div>

          <div
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: ESFB2_THEME.colors.negative,
              lineHeight: 1,
              marginBottom: 10,
              letterSpacing: "-0.03em",
            }}
          >
            -₹224 Cr
          </div>

          <div
            style={{
              fontSize: 20,
              color: ESFB2_THEME.colors.textSecondary,
              fontWeight: 600,
            }}
          >
            Shock quarterly loss triggering panic across retail holders
          </div>
        </div>
      </div>

      {/* Panic Speech Bubble / Investor Dilemma (Mobile Legible) */}
      <div
        style={{
          backgroundColor: ESFB2_THEME.colors.canvasTealTint,
          border: `1.5px solid ${ESFB2_THEME.colors.cardBorderStrong}`,
          borderRadius: 20,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: panicSpring,
          transform: `scale(${interpolate(panicSpring, [0, 1], [0.96, 1])})`,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            backgroundColor: "#FFFFFF",
            border: `1.5px solid ${ESFB2_THEME.colors.cardBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: ESFB2_THEME.colors.alert,
            flexShrink: 0,
            boxShadow: ESFB2_THEME.shadows.subtle,
          }}
        >
          <HelpCircle size={32} strokeWidth={2.5} />
        </div>

        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: ESFB2_THEME.colors.primaryTeal,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Retail Concern vs Institutional Diligence
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: ESFB2_THEME.colors.textPrimary,
              lineHeight: 1.35,
            }}
          >
            &ldquo;Many retail investors thought the bank is collapsing, right? But here is what the smart investor would do...&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
};
