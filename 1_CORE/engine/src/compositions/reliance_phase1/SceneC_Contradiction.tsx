import React from "react";
import { Img, interpolate, spring, staticFile } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneCProps {
  relativeFrame: number; // 0 to 751 (absolute: 835 to 1586)
}

export const SceneC_Contradiction: React.FC<SceneCProps> = ({ relativeFrame }) => {
  // Phase 1 (f0 - f285 / abs f835 - f1120 / 27.8s - 37.33s): Fullscreen SaN + Subtle "Happy Investing Lens: One Level Deeper" badge
  // Phase 2 (f285 - f751 / abs f1120 - f1586 / 37.33s - 52.87s): "The Big Contradiction" Opposing Split Card

  const showContradiction = relativeFrame >= 285;

  // Spring for Phase 1 badge
  const badgeSpring = spring({
    frame: relativeFrame - 40,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const badgeExit = interpolate(relativeFrame, [250, 280], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spring for Phase 2 Contradiction Card
  const cardSpring = spring({
    frame: Math.max(0, relativeFrame - 285),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  const cardTranslateY = interpolate(cardSpring, [0, 1], [40, 0]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.94, 1]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  return (
    <>
      {/* Phase 1: Happy Investing One Level Deeper Badge */}
      {relativeFrame < 290 && relativeFrame >= 40 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 20,
            backgroundColor: RELIANCE_THEME.colors.white,
            padding: "16px 32px",
            borderRadius: 18,
            border: `2px solid ${RELIANCE_THEME.colors.cardBorderStrong}`,
            boxShadow: RELIANCE_THEME.shadows.card,
            opacity: interpolate(badgeSpring, [0, 1], [0, 1]) * badgeExit,
            transform: `translateY(${interpolate(badgeSpring, [0, 1], [20, 0])}px)`,
            zIndex: 50,
          }}
        >
          <Img
            src={staticFile("brand/Happy_Investing_Logo_2026.png")}
            style={{ width: 44, height: 44, objectFit: "contain" }}
          />
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: RELIANCE_THEME.colors.deepTeal }}>
              HAPPY INVESTING FORENSIC LENS
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, color: RELIANCE_THEME.colors.secondaryText }}>
              GOING ONE LEVEL DEEPER THAN HEADLINES
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: The Big Contradiction Opposing Split Card */}
      {showContradiction && (
        <div
          style={{
            position: "absolute",
            top: RELIANCE_THEME.layout.containerTop,
            left: RELIANCE_THEME.layout.rightContentLeft,
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
            opacity: cardOpacity,
            transform: `translateY(${cardTranslateY}px) scale(${cardScale})`,
            zIndex: 50,
            boxSizing: "border-box",
          }}
        >
          {/* Card Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: RELIANCE_THEME.colors.alertBg,
              border: `1.5px solid ${RELIANCE_THEME.colors.alertBorder}`,
              borderRadius: 8,
              padding: "6px 18px",
              width: "fit-content",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                color: "#B45309",
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              KEY RETENTION MOMENT
            </span>
          </div>

          {/* Main Headline */}
          <div
            style={{
              fontSize: RELIANCE_THEME.typography.mainHeadline,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.darkText,
              lineHeight: 1.15,
              marginBottom: 48,
              letterSpacing: "-0.03em",
            }}
          >
            THE BIG CONTRADICTION
          </div>

          {/* Dual Opposing Split Blocks */}
          <div style={{ display: "flex", gap: 32 }}>
            {/* Left Block: Global Disruption */}
            <div
              style={{
                flex: 1,
                backgroundColor: RELIANCE_THEME.colors.negativeBg,
                border: `2px solid ${RELIANCE_THEME.colors.negativeBorder}`,
                borderRadius: 20,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  color: RELIANCE_THEME.colors.negative,
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                PREVAILING MARKET FEAR
              </div>
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: RELIANCE_THEME.colors.darkText,
                  lineHeight: 1.15,
                }}
              >
                GLOBAL DISRUPTION
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  color: RELIANCE_THEME.colors.secondaryText,
                }}
              >
                War • Supply Shocks • Uncertainty
              </div>
            </div>

            {/* Right Block: Reliance O2C Boom */}
            <div
              style={{
                flex: 1,
                backgroundColor: RELIANCE_THEME.colors.positiveBg,
                border: `2px solid ${RELIANCE_THEME.colors.positiveBorder}`,
                borderRadius: 20,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  color: RELIANCE_THEME.colors.primaryTeal,
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                OPERATIONAL REALITY
              </div>
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: RELIANCE_THEME.colors.deepTeal,
                  lineHeight: 1.15,
                }}
              >
                RELIANCE'S O2C BOOM
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  color: RELIANCE_THEME.colors.secondaryText,
                }}
              >
                Refining Margins • Feedstock Agility
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
