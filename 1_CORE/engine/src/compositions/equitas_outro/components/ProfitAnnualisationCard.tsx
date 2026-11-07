import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const ProfitAnnualisationCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 700 to 956
  if (frame < 700 || frame > 956) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - 700,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [942, 956], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Four quarterly blocks sequential reveal
  const q1Spring = spring({
    frame: Math.max(0, frame - 715),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const q2Spring = spring({
    frame: Math.max(0, frame - 740),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const q3Spring = spring({
    frame: Math.max(0, frame - 765),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const q4Spring = spring({
    frame: Math.max(0, frame - 790),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  // 800+ Crore annualised run-rate reveal at frame 836
  const annualSpring = spring({
    frame: Math.max(0, frame - 836),
    fps: 30,
    config: { damping: 15, stiffness: 95 },
  });

  const quarters = [
    { label: "Quarter 1", value: "₹200+ Cr", sub: "Q1 Operating PAT", springVal: q1Spring },
    { label: "Quarter 2", value: "₹200+ Cr", sub: "Q2 Operating PAT", springVal: q2Spring },
    { label: "Quarter 3", value: "₹200+ Cr", sub: "Q3 Operating PAT", springVal: q3Spring },
    { label: "Quarter 4", value: "₹200+ Cr", sub: "Q4 Operating PAT", springVal: q4Spring },
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
            Operating Profitability
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: OUTRO_THEME.colors.mainText,
            lineHeight: 1.15,
            marginBottom: 36,
          }}
        >
          QUARTERLY PROFIT RUN RATE
        </div>

        {/* 4 Quarterly Blocks */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 18,
            marginBottom: 36,
          }}
        >
          {quarters.map((q) => {
            const s = q.springVal;
            return (
              <div
                key={q.label}
                style={{
                  backgroundColor: OUTRO_THEME.colors.tealMist,
                  border: `2px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
                  borderRadius: 20,
                  padding: "24px 16px",
                  textAlign: "center",
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})`,
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: OUTRO_THEME.colors.secondaryText,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 8,
                  }}
                >
                  {q.label}
                </div>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    fontFamily: OUTRO_THEME.fonts.mono,
                    color: OUTRO_THEME.colors.primaryTeal,
                    marginBottom: 4,
                  }}
                >
                  {q.value}
                </div>
                <div style={{ fontSize: 13, color: OUTRO_THEME.colors.secondaryText, fontWeight: 600 }}>
                  {q.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Combined Annualised Card */}
        <div
          style={{
            backgroundColor: OUTRO_THEME.colors.softTeal,
            borderRadius: 24,
            padding: "32px 36px",
            border: `2px solid ${OUTRO_THEME.colors.primaryTeal}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: interpolate(annualSpring, [0, 1], [0, 1]),
            transform: `translate3d(0, ${interpolate(annualSpring, [0, 1], [15, 0])}px, 0)`,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: OUTRO_THEME.colors.deepTeal,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Illustrative Annualised Run Rate
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                fontFamily: OUTRO_THEME.fonts.mono,
                color: OUTRO_THEME.colors.deepTeal,
                lineHeight: 1,
              }}
            >
              ₹800+ CRORE
            </div>
          </div>
          <div
            style={{
              backgroundColor: OUTRO_THEME.colors.primaryTeal,
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: 800,
              padding: "14px 26px",
              borderRadius: 14,
              textAlign: "center",
            }}
          >
            ~₹200 Cr × 4 Quarters
          </div>
        </div>
      </div>

      {/* Footnote */}
      <div
        style={{
          fontSize: 14,
          color: OUTRO_THEME.colors.secondaryText,
          lineHeight: 1.4,
          borderTop: `1px solid ${OUTRO_THEME.colors.cardBorder}`,
          paddingTop: 16,
        }}
      >
        * Illustrative run-rate extrapolation from quarterly operational performance, not audited full-year guidance.
      </div>
    </div>
  );
};
