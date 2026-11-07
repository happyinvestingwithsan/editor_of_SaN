import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const InvestorResponsibilityCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 3680 to 4195
  if (frame < 3680 || frame > 4195) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - 3680,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [4175, 4195], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Sequential springs for 3 responsibilities
  const item1Spring = spring({
    frame: Math.max(0, frame - 3825),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const item2Spring = spring({
    frame: Math.max(0, frame - 3870),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const item3Spring = spring({
    frame: Math.max(0, frame - 3950),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const steps = [
    {
      step: "01",
      title: "VERIFY THE NUMBERS",
      desc: "Cross-check audited balance sheet, net worth (₹57 BV), and quarterly PAT in official exchange filings.",
      springVal: item1Spring,
      icon: "📊",
    },
    {
      step: "02",
      title: "DO YOUR OWN DUE DILIGENCE",
      desc: "Assess your personal risk capacity, time horizon, and position-sizing discipline before committing capital.",
      springVal: item2Spring,
      icon: "🔍",
    },
    {
      step: "03",
      title: "CONSULT A CERTIFIED ADVISOR",
      desc: "Seek tailored guidance from a registered financial advisor aligned with your unique economic situation.",
      springVal: item3Spring,
      icon: "⚖️",
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
            Investor Responsibility
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
          TAKE THE FRAMEWORK
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: OUTRO_THEME.colors.secondaryText,
            marginBottom: 32,
          }}
        >
          Educational Framework &amp; Analytical Diligence Principles
        </div>

        {/* 3 Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 28 }}>
          {steps.map((st) => {
            const s = st.springVal;
            return (
              <div
                key={st.step}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  backgroundColor: OUTRO_THEME.colors.tealMist,
                  borderRadius: 20,
                  padding: "24px 28px",
                  border: `2px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translate3d(${interpolate(s, [0, 1], [20, 0])}px, 0, 0)`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    backgroundColor: OUTRO_THEME.colors.primaryTeal,
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    flexShrink: 0,
                  }}
                >
                  {st.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: OUTRO_THEME.colors.mainText,
                      marginBottom: 6,
                    }}
                  >
                    {st.step}. {st.title}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      color: OUTRO_THEME.colors.secondaryText,
                      lineHeight: 1.45,
                      fontWeight: 500,
                    }}
                  >
                    {st.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regulatory Badge */}
      <div
        style={{
          backgroundColor: "#F8FAFC",
          borderRadius: 16,
          padding: "16px 24px",
          border: `1px solid ${OUTRO_THEME.colors.cardBorder}`,
          fontSize: 14,
          color: OUTRO_THEME.colors.secondaryText,
          textAlign: "center",
        }}
      >
        Strictly for educational and analytical purposes. No commercial endorsement or SEBI advisory relationship.
      </div>
    </div>
  );
};
