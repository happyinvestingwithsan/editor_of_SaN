import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneMProps {
  relativeFrame: number; // 0 to 204 (absolute: 5905 to 6109)
}

export const SceneM_EqualContributionTeaser: React.FC<SceneMProps> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame - 15,
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  const teaserSpring = spring({
    frame: Math.max(0, relativeFrame - 75), // Spoken cue "all the businesses did not contribute equally"
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const scale = interpolate(enterSpring, [0, 1], [0.94, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: RELIANCE_THEME.layout.containerTop,
        left: RELIANCE_THEME.layout.leftContentLeft, // SaN on Right, Content on Left
        width: RELIANCE_THEME.layout.cardWidth,
        height: RELIANCE_THEME.layout.cardHeight,
        backgroundColor: RELIANCE_THEME.colors.cardBackground,
        borderRadius: RELIANCE_THEME.layout.borderRadius,
        border: `2px solid ${RELIANCE_THEME.colors.cardBorder}`,
        boxShadow: RELIANCE_THEME.shadows.elevated,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 70px",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        zIndex: 50,
        boxSizing: "border-box",
      }}
    >
      {/* Category Eyebrow */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: RELIANCE_THEME.colors.alertBg,
          border: `1.5px solid ${RELIANCE_THEME.colors.alertBorder}`,
          borderRadius: 8,
          padding: "6px 18px",
          width: "fit-content",
          marginBottom: 24,
        }}
      >
        <span
          style={{
            color: "#B45309",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          CHAPTER 02 TEASER
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: RELIANCE_THEME.typography.mainHeadline,
          fontWeight: 900,
          color: RELIANCE_THEME.colors.darkText,
          lineHeight: 1.15,
          marginBottom: 44,
          letterSpacing: "-0.03em",
        }}
      >
        NOT ALL BUSINESSES CONTRIBUTED EQUALLY
      </div>

      {/* O2C Section Marker Box */}
      <div
        style={{
          backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
          border: `2.5px solid ${RELIANCE_THEME.colors.primaryTeal}`,
          borderRadius: 20,
          padding: "40px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: RELIANCE_THEME.shadows.card,
          transform: `scale(${interpolate(teaserSpring, [0, 1], [0.96, 1])})`,
          opacity: interpolate(teaserSpring, [0, 1], [0.6, 1]),
        }}
      >
        <div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: RELIANCE_THEME.colors.deepTeal,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            DISSECTION TARGET
          </div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.darkText,
              letterSpacing: "-0.02em",
              marginTop: 6,
            }}
          >
            O2C — THE BIG SURPRISE
          </div>
        </div>

        <div
          style={{
            backgroundColor: RELIANCE_THEME.colors.primaryTeal,
            borderRadius: 14,
            padding: "12px 24px",
            color: RELIANCE_THEME.colors.whiteText,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          NEXT CHAPTER
        </div>
      </div>
    </div>
  );
};
