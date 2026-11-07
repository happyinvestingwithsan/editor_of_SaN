import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const ValuationComparisonCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 150 to 698
  if (frame < 150 || frame > 698) {
    return null;
  }

  // Card slide-in spring
  const enterSpring = spring({
    frame: frame - 150,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [682, 698], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Milestone springs for synchronized spoken word reveals
  // 1. Book Value reveal at frame 230 ("book value... around 57 rupees")
  const bvSpring = spring({
    frame: Math.max(0, frame - 230),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  // 2. Market Price reveal at frame 355 ("trading around somewhere around 49 or 50")
  const cmpSpring = spring({
    frame: Math.max(0, frame - 355),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  // 3. Discount calculation reveal at frame 505 ("discount of 50%... corrected to 12-14%")
  const discountSpring = spring({
    frame: Math.max(0, frame - 505),
    fps: 30,
    config: { damping: 15, stiffness: 95 },
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
        {/* Header Tag */}
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
            Valuation Assessment
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
          EQUITAS — SIMPLE VALUATION
        </div>

        {/* Comparison Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
            marginBottom: 36,
          }}
        >
          {/* Book Value Card */}
          <div
            style={{
              backgroundColor: OUTRO_THEME.colors.tealMist,
              borderRadius: 20,
              padding: "28px 32px",
              border: `2px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
              opacity: interpolate(bvSpring, [0, 1], [0, 1]),
              transform: `scale(${interpolate(bvSpring, [0, 1], [0.92, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: OUTRO_THEME.colors.secondaryText,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Book Value
            </div>
            <div
              style={{
                fontSize: 68,
                fontWeight: 900,
                fontFamily: OUTRO_THEME.fonts.mono,
                color: OUTRO_THEME.colors.primaryTeal,
                lineHeight: 1,
              }}
            >
              ₹57
            </div>
            <div
              style={{
                fontSize: 16,
                color: OUTRO_THEME.colors.secondaryText,
                marginTop: 10,
                fontWeight: 600,
              }}
            >
              Reported Net Worth / Share
            </div>
          </div>

          {/* Market Price Card */}
          <div
            style={{
              backgroundColor: "#F8FAFC",
              borderRadius: 20,
              padding: "28px 32px",
              border: `2px solid ${OUTRO_THEME.colors.cardBorder}`,
              opacity: interpolate(cmpSpring, [0, 1], [0, 1]),
              transform: `scale(${interpolate(cmpSpring, [0, 1], [0.92, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: OUTRO_THEME.colors.secondaryText,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Market Price at Entry
            </div>
            <div
              style={{
                fontSize: 68,
                fontWeight: 900,
                fontFamily: OUTRO_THEME.fonts.mono,
                color: OUTRO_THEME.colors.mainText,
                lineHeight: 1,
              }}
            >
              ₹49–50
            </div>
            <div
              style={{
                fontSize: 16,
                color: OUTRO_THEME.colors.secondaryText,
                marginTop: 10,
                fontWeight: 600,
              }}
            >
              Post-30% Crash Trading Range
            </div>
          </div>
        </div>

        {/* Visual Discount Bar & Verified Arithmetic */}
        {frame >= 505 && (
          <div
            style={{
              opacity: interpolate(discountSpring, [0, 1], [0, 1]),
              transform: `translate3d(0, ${interpolate(discountSpring, [0, 1], [15, 0])}px, 0)`,
            }}
          >
            {/* Discount Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: OUTRO_THEME.colors.softTeal,
                borderRadius: 20,
                padding: "22px 28px",
                border: `2px solid ${OUTRO_THEME.colors.primaryTeal}`,
                marginBottom: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: OUTRO_THEME.colors.deepTeal,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Actual Verified Discount
                </div>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: OUTRO_THEME.colors.primaryTeal,
                    fontFamily: OUTRO_THEME.fonts.mono,
                  }}
                >
                  APPROX. 12% – 14% BELOW BOOK VALUE
                </div>
              </div>
              <div
                style={{
                  backgroundColor: OUTRO_THEME.colors.primaryTeal,
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: 800,
                  padding: "10px 22px",
                  borderRadius: 12,
                }}
              >
                P/B &lt; 0.88x
              </div>
            </div>

            {/* Bar Diagram */}
            <div
              style={{
                position: "relative",
                height: 18,
                backgroundColor: "#E2E8F0",
                borderRadius: 9,
                overflow: "hidden",
                marginBottom: 12,
              }}
            >
              {/* Book value marker (100%) */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: OUTRO_THEME.colors.primaryTeal,
                  borderRadius: 9,
                }}
              />
              {/* Price overlay (~86%) */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "86%",
                  height: "100%",
                  backgroundColor: OUTRO_THEME.colors.mainText,
                  borderRadius: 9,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 15,
                fontWeight: 700,
                color: OUTRO_THEME.colors.secondaryText,
              }}
            >
              <span>Market Price (₹49-50)</span>
              <span style={{ color: OUTRO_THEME.colors.primaryTeal, fontWeight: 800 }}>
                Book Value (₹57)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footnote */}
      <div
        style={{
          fontSize: 14,
          color: OUTRO_THEME.colors.mutedText,
          fontStyle: "italic",
          borderTop: `1px solid ${OUTRO_THEME.colors.cardBorder}`,
          paddingTop: 16,
        }}
      >
        * Illustrative historical figures from recording date. Not live market prices.
      </div>
    </div>
  );
};
