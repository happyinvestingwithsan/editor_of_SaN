import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface MarketOverhangAnimationProps {
  startFrame?: number;
}

export const MarketOverhangAnimation: React.FC<
  MarketOverhangAnimationProps
> = ({ startFrame = 2810 }) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Exact kinetic sentence snapping from Faster-Whisper:
  // startFrame = 2810 (Scene 6)
  // 2813 - 2968: "In his conference call... everything is 100% legal" -> Concall statement card (relFrame 10)
  // 2983: "market rumours" -> Card 1 (relFrame 173)
  // 3016: "and analysts questioned" -> Card 2 (relFrame 206)
  // 3076: "were creating an overhang on the bank's stock price" -> Card 3 (relFrame 266)
  // 3240: "decided to step down... to clear the air" -> Resolution banner (relFrame 430)

  const concallSpring = spring({
    frame: Math.max(0, relFrame - 10),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const b1Spring = spring({
    frame: Math.max(0, relFrame - 173),
    fps: 30,
    config: { damping: 16, stiffness: 120 },
  });

  const b2Spring = spring({
    frame: Math.max(0, relFrame - 206),
    fps: 30,
    config: { damping: 16, stiffness: 120 },
  });

  const b3Spring = spring({
    frame: Math.max(0, relFrame - 266),
    fps: 30,
    config: { damping: 16, stiffness: 120 },
  });

  const bannerSpring = spring({
    frame: Math.max(0, relFrame - 430),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "40px 50px",
        fontFamily: EQUITAS_THEME.fonts.display,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Top Concall Statement Header - Enters on "In his conference call... 100% legal" */}
      <div
        style={{
          background: "#FFFFFF",
          border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
          borderRadius: 24,
          padding: "28px 48px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          boxShadow: EQUITAS_THEME.shadows.cardElevated,
          opacity: concallSpring,
          transform: `translateY(${interpolate(concallSpring, [0, 1], [-20, 0])}px)`,
          maxWidth: 980,
          width: "100%",
        }}
      >
        <Img
          src={staticFile("assets/equitas/company_logos/equitas_small_finance_bank_logo.svg")}
          style={{ height: 44, width: "auto" }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "2.5px",
              color: EQUITAS_THEME.colors.primaryTeal,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            OFFICIAL MD INVESTOR CONCALL
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
            }}
          >
            "Everything is 100% Legal & Disclosed"
          </div>
        </div>
      </div>

      {/* Floating Rumor & Analyst Overhang Cards - Pops as words are spoken */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          width: "100%",
          maxWidth: 1040,
          marginTop: 36,
        }}
      >
        {/* Card 1: Market Rumors - Pops on "market rumours" (relFrame 173) */}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.warningAmber}`,
            borderRadius: 20,
            padding: "24px 20px",
            boxShadow: "0 10px 25px rgba(217, 119, 6, 0.15)",
            opacity: b1Spring,
            transform: `translateY(${interpolate(b1Spring, [0, 1], [30, 0])}px)`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: EQUITAS_THEME.colors.warningAmber, marginBottom: 6 }}>
            MARKET PERCEPTION
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: EQUITAS_THEME.colors.textPrimary }}>
            Persistent Rumors
          </div>
        </div>

        {/* Card 2: Analyst Questions - Pops on "analysts questioned" (relFrame 206) */}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.warningAmber}`,
            borderRadius: 20,
            padding: "24px 20px",
            boxShadow: "0 10px 25px rgba(217, 119, 6, 0.15)",
            opacity: b2Spring,
            transform: `translateY(${interpolate(b2Spring, [0, 1], [30, 0])}px)`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: EQUITAS_THEME.colors.warningAmber, marginBottom: 6 }}>
            GOVERNANCE CONCERN
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: EQUITAS_THEME.colors.textPrimary }}>
            Analyst Scrutiny
          </div>
        </div>

        {/* Card 3: Stock Price Overhang - Pops on "overhang on the bank's stock price" (relFrame 266) */}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.riskRed}`,
            borderRadius: 20,
            padding: "24px 20px",
            boxShadow: "0 10px 25px rgba(220, 38, 38, 0.15)",
            opacity: b3Spring,
            transform: `translateY(${interpolate(b3Spring, [0, 1], [30, 0])}px)`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: EQUITAS_THEME.colors.riskRed, marginBottom: 6 }}>
            VALUATION IMPACT
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: EQUITAS_THEME.colors.textPrimary }}>
            Stock Price Overhang
          </div>
        </div>
      </div>

      {/* Resolution Banner - Pops on "decided to step down to clear the air" (relFrame 430) */}
      <div
        style={{
          marginTop: 40,
          background: "#FFFFFF",
          border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
          borderLeft: `8px solid ${EQUITAS_THEME.colors.primaryTeal}`,
          borderRadius: 20,
          padding: "24px 36px",
          textAlign: "left",
          opacity: bannerSpring,
          transform: `scale(${interpolate(bannerSpring, [0, 1], [0.95, 1])})`,
          boxShadow: EQUITAS_THEME.shadows.cardElevated,
          maxWidth: 1040,
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: 26, // Bold mobile font
            fontWeight: 900,
            color: EQUITAS_THEME.colors.primaryTeal,
            letterSpacing: "-0.5px",
            marginBottom: 6,
          }}
        >
          VOLUNTARY STEP DOWN: TO CLEAR THE AIR ONCE & FOR ALL
        </div>
        <div
          style={{
            fontSize: 18,
            color: EQUITAS_THEME.colors.textSecondary,
            lineHeight: 1.4,
          }}
        >
          Vasudevan: "I stepped down to eliminate market overhang and protect shareholder value."
        </div>
      </div>
    </div>
  );
};
