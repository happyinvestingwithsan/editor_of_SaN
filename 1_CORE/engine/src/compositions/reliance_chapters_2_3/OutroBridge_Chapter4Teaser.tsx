import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const OutroBridge_Chapter4Teaser: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [85, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  // Pulse animation for cliffhanger
  const pulse = Math.sin((relativeFrame / 30) * Math.PI * 2) * 0.05 + 1;

  return (
    <div
      style={{
        position: "absolute",
        left: RELIANCE_CH2_3_THEME.layout.rightZone.left,
        top: RELIANCE_CH2_3_THEME.layout.rightZone.top,
        width: RELIANCE_CH2_3_THEME.layout.rightZone.width,
        height: RELIANCE_CH2_3_THEME.layout.rightZone.height,
        backgroundColor: RELIANCE_CH2_3_THEME.colors.white,
        borderRadius: RELIANCE_CH2_3_THEME.layout.borderRadius,
        border: `2px solid ${RELIANCE_CH2_3_THEME.colors.goldBorder}`,
        boxShadow: RELIANCE_CH2_3_THEME.shadows.floating,
        padding: "48px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity,
        transform: `translateY(${translateY}px)`,
        boxSizing: "border-box",
      }}
    >
      <div>
        <div
          style={{
            display: "inline-block",
            backgroundColor: RELIANCE_CH2_3_THEME.colors.goldBg,
            border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.goldBorder}`,
            borderRadius: 10,
            padding: "6px 18px",
            color: RELIANCE_CH2_3_THEME.colors.gold,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          CLIFFHANGER TEASER
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          BUT WAIT...
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: RELIANCE_CH2_3_THEME.colors.secondaryText,
            lineHeight: 1.35,
          }}
        >
          There is something even more interesting than this.
        </div>
      </div>

      {/* Chapter 4 Teaser Box */}
      <div
        style={{
          backgroundColor: RELIANCE_CH2_3_THEME.colors.bgCanvas,
          border: `2px dashed ${RELIANCE_CH2_3_THEME.colors.primaryTeal}`,
          borderRadius: 20,
          padding: "36px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          transform: `scale(${pulse})`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: RELIANCE_CH2_3_THEME.colors.primaryTeal,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          NEXT IN CHAPTER 04
        </div>

        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            lineHeight: 1.25,
          }}
        >
          The Russian Crude Discount Arbitrage
        </div>

        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: RELIANCE_CH2_3_THEME.colors.secondaryText,
            lineHeight: 1.4,
          }}
        >
          How discounted feedstock created an unassailable margin moat.
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
          color: RELIANCE_CH2_3_THEME.colors.textMuted,
          letterSpacing: "0.04em",
        }}
      >
        HAPPY INVESTING FORENSICS
      </div>
    </div>
  );
};
