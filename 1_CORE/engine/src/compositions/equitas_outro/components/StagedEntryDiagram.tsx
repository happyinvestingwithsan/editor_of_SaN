import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const StagedEntryDiagram: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 2160 to 2490
  if (frame < 2160 || frame > 2490) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - 2160,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [2475, 2490], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Stage springs
  const s1Spring = spring({
    frame: Math.max(0, frame - 2170),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const s2Spring = spring({
    frame: Math.max(0, frame - 2260),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const s3Spring = spring({
    frame: Math.max(0, frame - 2300),
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
            Capital Deployment Strategy
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
          3-STAGE ACCUMULATION PLAN
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: OUTRO_THEME.colors.secondaryText,
            marginBottom: 32,
          }}
        >
          Conditional Staged Entries — Never All-In Upfront
        </div>

        {/* 3 Stages Vertical Hierarchy */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
          {/* Stage 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: OUTRO_THEME.colors.softTeal,
              borderRadius: 20,
              padding: "22px 28px",
              border: `2px solid ${OUTRO_THEME.colors.primaryTeal}`,
              opacity: interpolate(s1Spring, [0, 1], [0, 1]),
              transform: `translate3d(${interpolate(s1Spring, [0, 1], [20, 0])}px, 0, 0)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: OUTRO_THEME.colors.primaryTeal,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 20,
                }}
              >
                01
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: OUTRO_THEME.colors.mainText }}>
                  STAGE 1: INITIAL POSITION
                </div>
                <div style={{ fontSize: 15, color: OUTRO_THEME.colors.deepTeal, fontWeight: 600 }}>
                  Initial pilot buy at ₹49–50 post-crash
                </div>
              </div>
            </div>
            <span
              style={{
                backgroundColor: OUTRO_THEME.colors.primaryTeal,
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: 16,
                padding: "8px 20px",
                borderRadius: 10,
              }}
            >
              ACTIVE (~25%)
            </span>
          </div>

          {/* Stage 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: frame >= 2260 ? "#F0FDF4" : "#F8FAFC",
              borderRadius: 20,
              padding: "22px 28px",
              border: `2px solid ${frame >= 2260 ? OUTRO_THEME.colors.positive : OUTRO_THEME.colors.cardBorder}`,
              opacity: interpolate(s2Spring, [0, 1], [0, 1]),
              transform: `translate3d(${interpolate(s2Spring, [0, 1], [20, 0])}px, 0, 0)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: frame >= 2260 ? OUTRO_THEME.colors.positive : "#94A3B8",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 20,
                }}
              >
                02
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: OUTRO_THEME.colors.mainText }}>
                  STAGE 2: POTENTIAL ADDITION (-10%)
                </div>
                <div style={{ fontSize: 15, color: OUTRO_THEME.colors.secondaryText, fontWeight: 600 }}>
                  If price retests lower levels (~₹44–45 band)
                </div>
              </div>
            </div>
            <span
              style={{
                backgroundColor: frame >= 2260 ? "#DCFCE7" : "#E2E8F0",
                color: frame >= 2260 ? "#15803D" : "#64748B",
                fontWeight: 800,
                fontSize: 16,
                padding: "8px 20px",
                borderRadius: 10,
              }}
            >
              CASH RESERVED
            </span>
          </div>

          {/* Stage 3 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: frame >= 2300 ? "#F0FDF4" : "#F8FAFC",
              borderRadius: 20,
              padding: "22px 28px",
              border: `2px solid ${frame >= 2300 ? OUTRO_THEME.colors.positive : OUTRO_THEME.colors.cardBorder}`,
              opacity: interpolate(s3Spring, [0, 1], [0, 1]),
              transform: `translate3d(${interpolate(s3Spring, [0, 1], [20, 0])}px, 0, 0)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: frame >= 2300 ? OUTRO_THEME.colors.positive : "#94A3B8",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 20,
                }}
              >
                03
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: OUTRO_THEME.colors.mainText }}>
                  STAGE 3: FINAL POSITION (-20%)
                </div>
                <div style={{ fontSize: 15, color: OUTRO_THEME.colors.secondaryText, fontWeight: 600 }}>
                  If deep panic retest occurs (~₹39–40 band)
                </div>
              </div>
            </div>
            <span
              style={{
                backgroundColor: frame >= 2300 ? "#DCFCE7" : "#E2E8F0",
                color: frame >= 2300 ? "#15803D" : "#64748B",
                fontWeight: 800,
                fontSize: 16,
                padding: "8px 20px",
                borderRadius: 10,
              }}
            >
              CASH RESERVED
            </span>
          </div>
        </div>

        {/* Plan Note Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFBEB",
            border: `2px solid ${OUTRO_THEME.colors.warning}`,
            borderRadius: 16,
            padding: "16px 24px",
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 800, color: "#92400E" }}>
            ⚠️ MY PERSONAL PLAN — NOT A BUY RECOMMENDATION
          </span>
          <span style={{ fontSize: 15, color: "#B45309", fontWeight: 700 }}>
            Conditional On Market Action
          </span>
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
        * Illustrative accumulation strategy. Never an automatic trigger or investment advice.
      </div>
    </div>
  );
};
