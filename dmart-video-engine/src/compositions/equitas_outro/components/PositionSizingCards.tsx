import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const PositionSizingCards: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 2915 to 3215
  if (frame < 2915 || frame > 3215) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - 2915,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [3195, 3215], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Milestone springs
  const smallCapSpring = spring({
    frame: Math.max(0, frame - 2980),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const midCapSpring = spring({
    frame: Math.max(0, frame - 3060),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const largeCapSpring = spring({
    frame: Math.max(0, frame - 3100),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const tiers = [
    {
      category: "SMALL CAP",
      percentage: "1.5%",
      barHeight: 150,
      color: "#0F8F87",
      bgColor: "#E8F5F3",
      springVal: smallCapSpring,
      sub: "e.g. Equitas SFB Basket",
      allocationDesc: "High volatility / Growth cap",
    },
    {
      category: "MID CAP",
      percentage: "3.0%",
      barHeight: 270,
      color: "#08736D",
      bgColor: "#CCEDE8",
      springVal: midCapSpring,
      sub: "Quality Growth Compounders",
      allocationDesc: "Proven operating track record",
    },
    {
      category: "LARGE CAP",
      percentage: "5.0%",
      barHeight: 390,
      color: "#044E4A",
      bgColor: "#B2E5DE",
      springVal: largeCapSpring,
      sub: "Blue-Chip Core Anchors",
      allocationDesc: "Balance sheet fortress",
    },
  ];

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
            Position Sizing Hierarchy
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
          MY PORTFOLIO RISK LIMITS
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: OUTRO_THEME.colors.secondaryText,
            marginBottom: 36,
          }}
        >
          Maximum Capital Allocated to Any Single Stock
        </div>

        {/* 3 Proportional Vertical Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
            alignItems: "end",
            height: 440,
            marginBottom: 32,
            paddingBottom: 16,
            borderBottom: `2px solid ${OUTRO_THEME.colors.cardBorder}`,
          }}
        >
          {tiers.map((t) => {
            const s = t.springVal;
            const currentH = interpolate(s, [0, 1], [0, t.barHeight]);
            return (
              <div
                key={t.category}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  height: "100%",
                }}
              >
                {/* Value Pill Above Bar */}
                <div
                  style={{
                    fontSize: 44,
                    fontWeight: 900,
                    fontFamily: OUTRO_THEME.fonts.mono,
                    color: t.color,
                    marginBottom: 12,
                    opacity: interpolate(s, [0, 1], [0, 1]),
                  }}
                >
                  {t.percentage}
                </div>

                {/* Vertical Proportional Bar */}
                <div
                  style={{
                    width: "100%",
                    height: currentH,
                    backgroundColor: t.color,
                    borderRadius: 18,
                    boxShadow: `0 10px 25px ${t.color}33`,
                  }}
                />

                {/* Label Below Bar */}
                <div
                  style={{
                    marginTop: 16,
                    fontSize: 18,
                    fontWeight: 900,
                    color: OUTRO_THEME.colors.mainText,
                    textAlign: "center",
                  }}
                >
                  {t.category}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: OUTRO_THEME.colors.secondaryText,
                    textAlign: "center",
                    marginTop: 4,
                  }}
                >
                  {t.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Management Banner */}
        <div
          style={{
            backgroundColor: OUTRO_THEME.colors.softTeal,
            borderRadius: 18,
            padding: "18px 26px",
            border: `2px solid ${OUTRO_THEME.colors.primaryTeal}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 24 }}>🛡️</span>
            <span style={{ fontSize: 18, fontWeight: 900, color: OUTRO_THEME.colors.deepTeal }}>
              DISCIPLINED RISK MANAGEMENT FRAMEWORK
            </span>
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: OUTRO_THEME.colors.secondaryText,
              fontStyle: "italic",
            }}
          >
            My own portfolio rules
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
        * Personal framework for position sizing. Individual allocation should match your risk tolerance.
      </div>
    </div>
  );
};
