import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneLProps {
  relativeFrame: number; // 0 to 925 (absolute: 4980 to 5905)
}

export const SceneL_Q2Results: React.FC<SceneLProps> = ({ relativeFrame }) => {
  // Phase 0: f0 - f180: Q2 FY27 Results Announcement Header
  // Phase 1: f180 - f400: Card 1 (Revenue ₹3.62 Lakh Cr, +27.8% YoY)
  // Phase 2: f400 - f580: Card 2 (EBITDA ₹62,409 Cr, +23.9% YoY)
  // Phase 3: f580 - f800: Card 3 (PAT ₹29,550 Cr, +33.8% YoY)
  // Phase 4: f800 - f925: Record Quarterly Numbers Climax Card

  const enterSpring = spring({
    frame: relativeFrame - 15,
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  const card1Spring = spring({
    frame: Math.max(0, relativeFrame - 180),
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  const card2Spring = spring({
    frame: Math.max(0, relativeFrame - 400),
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  const card3Spring = spring({
    frame: Math.max(0, relativeFrame - 580),
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  const climaxSpring = spring({
    frame: Math.max(0, relativeFrame - 800),
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const scale = interpolate(enterSpring, [0, 1], [0.94, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Determine current active metric card
  let activeCard = "intro";
  if (relativeFrame >= 800) activeCard = "climax";
  else if (relativeFrame >= 580) activeCard = "pat";
  else if (relativeFrame >= 400) activeCard = "ebitda";
  else if (relativeFrame >= 180) activeCard = "revenue";

  return (
    <div
      style={{
        position: "absolute",
        top: RELIANCE_THEME.layout.containerTop,
        left: RELIANCE_THEME.layout.rightContentLeft, // SaN on Left, Content on Right
        width: RELIANCE_THEME.layout.cardWidth,
        height: RELIANCE_THEME.layout.cardHeight,
        backgroundColor: RELIANCE_THEME.colors.cardBackground,
        borderRadius: RELIANCE_THEME.layout.borderRadius,
        border: `2px solid ${RELIANCE_THEME.colors.cardBorder}`,
        boxShadow: RELIANCE_THEME.shadows.elevated,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 70px",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        zIndex: 50,
        boxSizing: "border-box",
      }}
    >
      {/* Date Marker & Filing Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            backgroundColor: RELIANCE_THEME.colors.positiveBg,
            border: `1.5px solid ${RELIANCE_THEME.colors.positiveBorder}`,
            borderRadius: 8,
            padding: "6px 18px",
            color: RELIANCE_THEME.colors.deepTeal,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Q2 FY27 RESULTS
        </div>
        <div
          style={{
            color: RELIANCE_THEME.colors.secondaryText,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          ANNOUNCED 30 OCTOBER 2026
        </div>
      </div>

      {/* Intro Subtitle */}
      <div
        style={{
          fontSize: RELIANCE_THEME.typography.mainHeadline,
          fontWeight: 900,
          color: RELIANCE_THEME.colors.darkText,
          lineHeight: 1.15,
          marginBottom: 44,
          letterSpacing: "-0.03em",
        }}
      >
        THE RESULTS CHANGED THE NARRATIVE
      </div>

      {/* METRIC CARD 1: REVENUE */}
      {activeCard === "revenue" && (
        <div
          style={{
            backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
            border: `2.5px solid ${RELIANCE_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            padding: "44px 50px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: interpolate(card1Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(card1Spring, [0, 1], [24, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 800, color: RELIANCE_THEME.colors.deepTeal, letterSpacing: "0.08em" }}>
            CONSOLIDATED REVENUE
          </div>
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.darkText,
              fontFamily: RELIANCE_THEME.fonts.monoData,
              lineHeight: 1,
            }}
          >
            ₹3.62 LAKH CR
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: RELIANCE_THEME.colors.positive, fontSize: 32, fontWeight: 800 }}>
            <span style={{ fontSize: 40 }}>↑</span>
            <span>+27.8% YoY GROWTH</span>
          </div>
        </div>
      )}

      {/* METRIC CARD 2: EBITDA */}
      {activeCard === "ebitda" && (
        <div
          style={{
            backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
            border: `2.5px solid ${RELIANCE_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            padding: "44px 50px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: interpolate(card2Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(card2Spring, [0, 1], [24, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 800, color: RELIANCE_THEME.colors.deepTeal, letterSpacing: "0.08em" }}>
            CONSOLIDATED EBITDA
          </div>
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.darkText,
              fontFamily: RELIANCE_THEME.fonts.monoData,
              lineHeight: 1,
            }}
          >
            ₹62,409 CR
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: RELIANCE_THEME.colors.positive, fontSize: 32, fontWeight: 800 }}>
            <span style={{ fontSize: 40 }}>↑</span>
            <span>+23.9% YoY GROWTH</span>
          </div>
        </div>
      )}

      {/* METRIC CARD 3: PROFIT AFTER TAX */}
      {activeCard === "pat" && (
        <div
          style={{
            backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
            border: `2.5px solid ${RELIANCE_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            padding: "44px 50px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: interpolate(card3Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(card3Spring, [0, 1], [24, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 800, color: RELIANCE_THEME.colors.deepTeal, letterSpacing: "0.08em" }}>
            NET PROFIT (PAT)
          </div>
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.primaryTeal,
              fontFamily: RELIANCE_THEME.fonts.monoData,
              lineHeight: 1,
            }}
          >
            ₹29,550 CR
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: RELIANCE_THEME.colors.positive, fontSize: 32, fontWeight: 800 }}>
            <span style={{ fontSize: 40 }}>↑</span>
            <span>+33.8% YoY SURGE</span>
          </div>
        </div>
      )}

      {/* PHASE 4: RECORD QUARTERLY NUMBERS CLIMAX */}
      {activeCard === "climax" && (
        <div
          style={{
            backgroundColor: RELIANCE_THEME.colors.white,
            border: `2px solid ${RELIANCE_THEME.colors.cardBorderStrong}`,
            borderRadius: 24,
            padding: "40px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: RELIANCE_THEME.shadows.floating,
            opacity: interpolate(climaxSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(climaxSpring, [0, 1], [0.95, 1])})`,
          }}
        >
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: RELIANCE_THEME.colors.positive, letterSpacing: "0.08em" }}>
              ALL-TIME HIGH RUN RATE
            </div>
            <div style={{ fontSize: 50, fontWeight: 900, color: RELIANCE_THEME.colors.darkText, lineHeight: 1.15, marginTop: 4 }}>
              RECORD QUARTERLY NUMBERS
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, color: RELIANCE_THEME.colors.secondaryText, marginTop: 6 }}>
              Market responded dramatically with +11.6% rally
            </div>
          </div>
        </div>
      )}

      {/* Bottom Pacing Guide */}
      {activeCard === "intro" && (
        <div
          style={{
            backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
            borderRadius: 18,
            padding: "32px 36px",
            color: RELIANCE_THEME.colors.secondaryText,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          Revealing audited consolidated figures...
        </div>
      )}
    </div>
  );
};
