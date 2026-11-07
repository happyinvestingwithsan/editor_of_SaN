import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_CH2_3_THEME } from "./theme";

export const Visual5_O2CStoryConclusion: React.FC<{ relativeFrame: number }> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  const exitOpacity = interpolate(relativeFrame, [480, 510], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

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
        border: `2px solid ${RELIANCE_CH2_3_THEME.colors.cardBorderStrong}`,
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
            backgroundColor: RELIANCE_CH2_3_THEME.colors.positiveBg,
            border: `1.5px solid ${RELIANCE_CH2_3_THEME.colors.positiveBorder}`,
            borderRadius: 10,
            padding: "6px 18px",
            color: RELIANCE_CH2_3_THEME.colors.deepTeal,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          EARNINGS LOCOMOTIVE
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          THE O2C STORY
        </div>
      </div>

      {/* Synthesis Insight Card */}
      <div
        style={{
          backgroundColor: RELIANCE_CH2_3_THEME.colors.lightTeal,
          border: `2px solid ${RELIANCE_CH2_3_THEME.colors.primaryTeal}`,
          borderRadius: 20,
          padding: "32px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.deepTeal }}>
          INCREMENTAL EARNINGS ENGINE
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: RELIANCE_CH2_3_THEME.colors.darkText,
            lineHeight: 1.25,
          }}
        >
          O2C & Jio Drove Over 90% of Growth
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.secondaryText }}>
          Traditional energy infrastructure delivered the quarterly record.
        </div>
      </div>

      {/* Bridge Teaser */}
      <div
        style={{
          backgroundColor: RELIANCE_CH2_3_THEME.colors.bgCanvas,
          border: `1.5px dashed ${RELIANCE_CH2_3_THEME.colors.primaryTeal}`,
          borderRadius: 16,
          padding: "20px 24px",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_CH2_3_THEME.colors.primaryTeal }}>
          NEXT: CHAPTER 03
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: RELIANCE_CH2_3_THEME.colors.darkText, marginTop: 4 }}>
          How global crisis became Reliance's multi-billion dollar opportunity.
        </div>
      </div>
    </div>
  );
};
