import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const PersonalPositionAllocation: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 1280 to 1820
  if (frame < 1280 || frame > 1820) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - 1280,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [1805, 1820], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [30, 0]) - exitProgress * 20;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Allocation bar fill animation at frame 1510
  const fillSpring = spring({
    frame: Math.max(0, frame - 1510),
    fps: 30,
    config: { damping: 18, stiffness: 80 },
  });

  // "Cash Reserved" pulse at frame 1680
  const reservedSpring = spring({
    frame: Math.max(0, frame - 1680),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const filledPercent = interpolate(fillSpring, [0, 1], [0, 25]);

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
            Personal Transparency
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
          MY PERSONAL POSITION
        </div>
        <div
          style={{
            fontSize: 18,
            color: OUTRO_THEME.colors.secondaryText,
            fontWeight: 600,
            marginBottom: 36,
          }}
        >
          Capital Allocation for Equitas SFB Basket
        </div>

        {/* Capital Allocation Visual Bar */}
        <div style={{ marginBottom: 36 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 16,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            <span style={{ color: OUTRO_THEME.colors.primaryTeal }}>
              INITIAL ENTRY (~25% DEPLOYED)
            </span>
            <span style={{ color: OUTRO_THEME.colors.secondaryText }}>
              CASH RESERVED (~75% HELD)
            </span>
          </div>

          {/* Progress Bar Container */}
          <div
            style={{
              height: 48,
              backgroundColor: "#F1F5F9",
              borderRadius: 16,
              border: `2px solid ${OUTRO_THEME.colors.cardBorder}`,
              overflow: "hidden",
              position: "relative",
              display: "flex",
            }}
          >
            {/* Filled Bar (Initial Entry) */}
            <div
              style={{
                width: `${filledPercent}%`,
                height: "100%",
                backgroundColor: OUTRO_THEME.colors.primaryTeal,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: 16,
                letterSpacing: "0.05em",
                transition: "width 0.2s ease-out",
              }}
            >
              {filledPercent > 10 && "DEPLOYED"}
            </div>

            {/* Reserved Pool Bar */}
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: OUTRO_THEME.colors.secondaryText,
                fontWeight: 900,
                fontSize: 16,
                letterSpacing: "0.05em",
                backgroundColor: frame >= 1680 ? "#E0F2FE" : "transparent",
              }}
            >
              CASH HELD READY IN RESERVE
            </div>
          </div>
        </div>

        {/* 2 Breakdown Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 28,
          }}
        >
          {/* Card 1: Small Initial Entry */}
          <div
            style={{
              backgroundColor: OUTRO_THEME.colors.tealMist,
              border: `2px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
              borderRadius: 20,
              padding: "26px 30px",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: OUTRO_THEME.colors.primaryTeal,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 8,
              }}
            >
              Status: Active Entry
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: OUTRO_THEME.colors.mainText,
                marginBottom: 8,
              }}
            >
              SMALL INITIAL QUANTITY
            </div>
            <div style={{ fontSize: 15, color: OUTRO_THEME.colors.secondaryText, fontWeight: 500, lineHeight: 1.4 }}>
              Participating in deep discount without overexposing capital or taking premature concentration risk.
            </div>
          </div>

          {/* Card 2: Cash Reserved */}
          <div
            style={{
              backgroundColor: frame >= 1680 ? "#F0F9FF" : "#F8FAFC",
              border: `2px solid ${frame >= 1680 ? "#38BDF8" : OUTRO_THEME.colors.cardBorder}`,
              borderRadius: 20,
              padding: "26px 30px",
              transform: `scale(${interpolate(reservedSpring, [0, 1], [0.96, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: frame >= 1680 ? "#0284C7" : OUTRO_THEME.colors.secondaryText,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 8,
              }}
            >
              Strategy: Capital Preservation
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: OUTRO_THEME.colors.mainText,
                marginBottom: 8,
              }}
            >
              CAPITAL STILL RESERVED
            </div>
            <div style={{ fontSize: 15, color: OUTRO_THEME.colors.secondaryText, fontWeight: 500, lineHeight: 1.4 }}>
              Preserving liquid ammunition for subsequent market price discovery and staged accumulation.
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div
        style={{
          fontSize: 14,
          color: OUTRO_THEME.colors.mutedText,
          fontStyle: "italic",
          borderTop: `1px solid ${OUTRO_THEME.colors.cardBorder}`,
          paddingTop: 16,
        }}
      >
        * Illustrative allocation framework of capital budgeted for this specific stock, not total portfolio net worth.
      </div>
    </div>
  );
};
