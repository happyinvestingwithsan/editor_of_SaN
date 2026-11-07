import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const InvestmentThesisCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 960 to 1275
  if (frame < 960 || frame > 1275) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - 960,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [1260, 1275], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Sequential card springs
  const c1Spring = spring({
    frame: Math.max(0, frame - 970),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const c2Spring = spring({
    frame: Math.max(0, frame - 1005),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const c3Spring = spring({
    frame: Math.max(0, frame - 1070),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const synthSpring = spring({
    frame: Math.max(0, frame - 1130),
    fps: 30,
    config: { damping: 15, stiffness: 95 },
  });
  const tempPainSpring = spring({
    frame: Math.max(0, frame - 1225),
    fps: 30,
    config: { damping: 14, stiffness: 110 },
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
            Investment Rationale
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: OUTRO_THEME.colors.mainText,
            lineHeight: 1.15,
            marginBottom: 28,
          }}
        >
          THE 3-PILLAR THESIS
        </div>

        {/* 3 Sequential Pillar Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 24 }}>
          {/* Pillar 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: OUTRO_THEME.colors.tealMist,
              borderRadius: 20,
              padding: "20px 28px",
              border: `2px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
              opacity: interpolate(c1Spring, [0, 1], [0, 1]),
              transform: `translate3d(${interpolate(c1Spring, [0, 1], [20, 0])}px, 0, 0)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: OUTRO_THEME.colors.primaryTeal,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 20,
                }}
              >
                1
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: OUTRO_THEME.colors.mainText }}>
                  PROFITABLE BANK
                </div>
                <div style={{ fontSize: 15, color: OUTRO_THEME.colors.secondaryText, fontWeight: 600 }}>
                  Consistent quarterly operating PAT (~₹200+ Cr run rate)
                </div>
              </div>
            </div>
            <span
              style={{
                backgroundColor: OUTRO_THEME.colors.softTeal,
                color: OUTRO_THEME.colors.deepTeal,
                fontWeight: 800,
                fontSize: 16,
                padding: "8px 18px",
                borderRadius: 10,
              }}
            >
              ₹200+ Cr / Qtr
            </span>
          </div>

          {/* Pillar 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: OUTRO_THEME.colors.tealMist,
              borderRadius: 20,
              padding: "20px 28px",
              border: `2px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
              opacity: interpolate(c2Spring, [0, 1], [0, 1]),
              transform: `translate3d(${interpolate(c2Spring, [0, 1], [20, 0])}px, 0, 0)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: OUTRO_THEME.colors.primaryTeal,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 20,
                }}
              >
                2
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: OUTRO_THEME.colors.mainText }}>
                  BAD-LOAN TREND DOWN
                </div>
                <div style={{ fontSize: 15, color: OUTRO_THEME.colors.secondaryText, fontWeight: 600 }}>
                  Gross &amp; Net NPA under structural control across secured books
                </div>
              </div>
            </div>
            <span
              style={{
                backgroundColor: OUTRO_THEME.colors.softTeal,
                color: OUTRO_THEME.colors.positive,
                fontWeight: 800,
                fontSize: 16,
                padding: "8px 18px",
                borderRadius: 10,
              }}
            >
              Asset Quality
            </span>
          </div>

          {/* Pillar 3 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: OUTRO_THEME.colors.tealMist,
              borderRadius: 20,
              padding: "20px 28px",
              border: `2px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
              opacity: interpolate(c3Spring, [0, 1], [0, 1]),
              transform: `translate3d(${interpolate(c3Spring, [0, 1], [20, 0])}px, 0, 0)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: OUTRO_THEME.colors.primaryTeal,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 20,
                }}
              >
                3
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: OUTRO_THEME.colors.mainText }}>
                  VALUATION DISCOUNT
                </div>
                <div style={{ fontSize: 15, color: OUTRO_THEME.colors.secondaryText, fontWeight: 600 }}>
                  Trading below book value (P/B &lt; 0.88x) following market selloff
                </div>
              </div>
            </div>
            <span
              style={{
                backgroundColor: OUTRO_THEME.colors.softTeal,
                color: OUTRO_THEME.colors.deepTeal,
                fontWeight: 800,
                fontSize: 16,
                padding: "8px 18px",
                borderRadius: 10,
              }}
            >
              12–14% Below BV
            </span>
          </div>
        </div>

        {/* Synthesis Banner */}
        <div
          style={{
            backgroundColor: OUTRO_THEME.colors.softTeal,
            borderRadius: 18,
            padding: "18px 24px",
            border: `1.5px solid ${OUTRO_THEME.colors.primaryTeal}`,
            textAlign: "center",
            fontSize: 18,
            fontWeight: 800,
            color: OUTRO_THEME.colors.deepTeal,
            letterSpacing: "0.04em",
            opacity: interpolate(synthSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(synthSpring, [0, 1], [0.95, 1])})`,
          }}
        >
          VALUATION + PROFITABILITY + RISK ASSESSMENT
        </div>

        {/* Temporary Pain Callout */}
        {frame >= 1225 && (
          <div
            style={{
              marginTop: 18,
              display: "flex",
              alignItems: "center",
              gap: 16,
              backgroundColor: "#FFFBEB",
              border: `2px solid ${OUTRO_THEME.colors.warning}`,
              borderRadius: 18,
              padding: "16px 24px",
              opacity: interpolate(tempPainSpring, [0, 1], [0, 1]),
              transform: `translate3d(0, ${interpolate(tempPainSpring, [0, 1], [10, 0])}px, 0)`,
            }}
          >
            <span style={{ fontSize: 26 }}>⚠️</span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 900, color: "#92400E" }}>
                CATALYST: TEMPORARY LEADERSHIP PAIN
              </div>
              <div style={{ fontSize: 14, color: "#B45309", fontWeight: 600 }}>
                CEO transition introduces uncertainty; underlying operational fundamentals remain intact.
              </div>
            </div>
          </div>
        )}
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
        * Synthesized personal investment framework based on publicly reported financial metrics.
      </div>
    </div>
  );
};
