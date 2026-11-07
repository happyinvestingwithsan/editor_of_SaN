import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const SuccessionAndMarketCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 1825 to 2155
  if (frame < 1825 || frame > 2155) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - 1825,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [2140, 2155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Milestone springs
  const ceoSpring = spring({
    frame: Math.max(0, frame - 1850),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const marketSpring = spring({
    frame: Math.max(0, frame - 2040),
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
            Risk Management Thesis
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: OUTRO_THEME.colors.mainText,
            lineHeight: 1.15,
            marginBottom: 32,
          }}
        >
          WHY NOT INVEST EVERYTHING NOW?
        </div>

        {/* 2 Core Rationales */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 28 }}>
          {/* Rationale 1: Succession Timeline */}
          <div
            style={{
              backgroundColor: OUTRO_THEME.colors.tealMist,
              borderRadius: 20,
              padding: "26px 30px",
              border: `2px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
              opacity: interpolate(ceoSpring, [0, 1], [0, 1]),
              transform: `translate3d(${interpolate(ceoSpring, [0, 1], [20, 0])}px, 0, 0)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
              <span style={{ fontSize: 28 }}>⏳</span>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: OUTRO_THEME.colors.mainText,
                }}
              >
                SUCCESSION PROCESS: TIME REQUIRED
              </div>
            </div>
            <div
              style={{
                fontSize: 16,
                color: OUTRO_THEME.colors.secondaryText,
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              MD &amp; CEO search and RBI approval typically requires 4–6 months. Institutional uncertainty persists until formal leadership transition is completed.
            </div>
          </div>

          {/* Rationale 2: Price Discovery */}
          <div
            style={{
              backgroundColor: "#F8FAFC",
              borderRadius: 20,
              padding: "26px 30px",
              border: `2px solid ${OUTRO_THEME.colors.cardBorder}`,
              opacity: interpolate(marketSpring, [0, 1], [0, 1]),
              transform: `translate3d(${interpolate(marketSpring, [0, 1], [20, 0])}px, 0, 0)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
              <span style={{ fontSize: 28 }}>📉</span>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: OUTRO_THEME.colors.mainText,
                }}
              >
                PRICE DISCOVERY: MARKET SETTLEMENT
              </div>
            </div>
            <div
              style={{
                fontSize: 16,
                color: OUTRO_THEME.colors.secondaryText,
                lineHeight: 1.5,
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              Post-crash markets rarely reverse in a straight line. Volatility allows opportunities to enter in stages at the same or lower price bands.
            </div>

            {/* Illustrative Price Line */}
            <div
              style={{
                height: 52,
                backgroundColor: "#FFFFFF",
                borderRadius: 14,
                border: `1.5px solid ${OUTRO_THEME.colors.cardBorder}`,
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 800, color: OUTRO_THEME.colors.negative }}>
                Sharp Crash (-30%)
              </span>
              <span style={{ fontSize: 20, color: OUTRO_THEME.colors.mutedText }}>➔</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: OUTRO_THEME.colors.warning }}>
                Consolidation Wave
              </span>
              <span style={{ fontSize: 20, color: OUTRO_THEME.colors.mutedText }}>➔</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: OUTRO_THEME.colors.primaryTeal }}>
                Base Formation
              </span>
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
        * Illustrative market pattern. Not a price forecast or timing guarantee.
      </div>
    </div>
  );
};
