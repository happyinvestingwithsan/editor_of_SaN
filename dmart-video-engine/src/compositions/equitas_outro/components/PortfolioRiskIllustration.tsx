import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const PortfolioRiskIllustration: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 3220 to 3470
  if (frame < 3220 || frame > 3470) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - 3220,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [3450, 3470], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Containment highlight spring at frame 3290
  const containSpring = spring({
    frame: Math.max(0, frame - 3290),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 770,
        top: 50,
        width: 1100,
        height: 980,
        backgroundColor: OUTRO_THEME.colors.cardBg,
        borderRadius: 24,
        padding: "48px 56px",
        boxShadow: OUTRO_THEME.shadows.cardElevated,
        border: `1.5px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
        opacity: cardOpacity,
        transform: `translate3d(0, ${cardTranslateY}px, 0)`,
        fontFamily: OUTRO_THEME.fonts.heading,
        zIndex: 25,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div>
        {/* Category Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: OUTRO_THEME.colors.softTeal,
            padding: "8px 20px",
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: OUTRO_THEME.colors.primaryTeal,
            }}
          />
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: OUTRO_THEME.colors.deepTeal,
              textTransform: "uppercase",
            }}
          >
            Portfolio Protection
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: OUTRO_THEME.colors.mainText,
            lineHeight: 1.15,
            marginBottom: 8,
          }}
        >
          LIMIT CONCENTRATION RISK
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: OUTRO_THEME.colors.secondaryText,
            marginBottom: 36,
          }}
        >
          Preventing Single-Stock Bleeding Across Aggregate Portfolio
        </div>

        {/* Conceptual Portfolio Containment Graphic */}
        <div
          style={{
            backgroundColor: OUTRO_THEME.colors.tealMist,
            border: `2px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
            borderRadius: 24,
            padding: "36px 32px",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 16,
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            <span style={{ color: OUTRO_THEME.colors.mainText }}>
              100% TOTAL PORTFOLIO EXPOSURE
            </span>
            <span style={{ color: OUTRO_THEME.colors.primaryTeal }}>
              98.5% CAPITAL INSULATED
            </span>
          </div>

          {/* Visual Bar Split */}
          <div
            style={{
              height: 52,
              backgroundColor: "#E2E8F0",
              borderRadius: 16,
              overflow: "hidden",
              display: "flex",
              position: "relative",
              marginBottom: 24,
            }}
          >
            {/* Contained Single Holding (1.5%) */}
            <div
              style={{
                width: "12%",
                height: "100%",
                backgroundColor: "#EF4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: "0.04em",
              }}
            >
              1.5%
            </div>

            {/* Insulated Portfolio (98.5%) */}
            <div
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: OUTRO_THEME.colors.primaryTeal,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: "0.06em",
              }}
            >
              98.5% PROTECTED IN DIVERSIFIED ASSETS
            </div>
          </div>

          {/* Containment Arithmetic Callout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              opacity: interpolate(containSpring, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px 24px",
                borderRadius: 16,
                border: `1.5px solid ${OUTRO_THEME.colors.cardBorder}`,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: OUTRO_THEME.colors.secondaryText, marginBottom: 4 }}>
                If Equitas SFB Drops Another -20%:
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: OUTRO_THEME.colors.negative,
                  fontFamily: OUTRO_THEME.fonts.mono,
                }}
              >
                Only -0.30% Impact
              </div>
              <div style={{ fontSize: 13, color: OUTRO_THEME.colors.secondaryText, marginTop: 4 }}>
                $1.5\% \times -20\% = -0.30\%$ of total net worth
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px 24px",
                borderRadius: 16,
                border: `2px solid ${OUTRO_THEME.colors.primaryTeal}`,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: OUTRO_THEME.colors.secondaryText, marginBottom: 4 }}>
                Aggregate Capital Security:
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: OUTRO_THEME.colors.primaryTeal,
                  fontFamily: OUTRO_THEME.fonts.mono,
                }}
              >
                99.70% Preserved
              </div>
              <div style={{ fontSize: 13, color: OUTRO_THEME.colors.secondaryText, marginTop: 4 }}>
                Zero systemic bleed into aggregate portfolio
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: 14,
          color: OUTRO_THEME.colors.mutedText,
          fontStyle: "italic",
          borderTop: `1px solid ${OUTRO_THEME.colors.cardBorder}`,
          paddingTop: 16,
        }}
      >
        * Sizing ensures no single adverse event threatens aggregate capital security or sleep at night.
      </div>
    </div>
  );
};
