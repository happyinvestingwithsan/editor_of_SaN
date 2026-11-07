import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneGProps {
  relativeFrame: number; // 0 to 56 (absolute: 2956 to 3012)
}

export const SceneG_ChapterTransition: React.FC<SceneGProps> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const exitOpacity = interpolate(relativeFrame, [44, 56], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [30, 0]);
  const scale = interpolate(enterSpring, [0, 1], [0.96, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        backgroundColor: "rgba(247, 250, 249, 0.94)", // Light teal frosted backdrop
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        zIndex: 60,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >
        {/* Chapter Pill */}
        <div
          style={{
            backgroundColor: RELIANCE_THEME.colors.tealSoftBg,
            border: `1.5px solid ${RELIANCE_THEME.colors.cardBorderStrong}`,
            borderRadius: 12,
            padding: "8px 24px",
            color: RELIANCE_THEME.colors.deepTeal,
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          CHAPTER 01
        </div>

        {/* Company Title */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: RELIANCE_THEME.colors.secondaryText,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          RELIANCE INDUSTRIES
        </div>

        {/* Main Chapter Heading */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: RELIANCE_THEME.colors.darkText,
            letterSpacing: "-0.03em",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          BEYOND THE 11.6% RALLY
        </div>

        <div
          style={{
            height: 4,
            width: 120,
            backgroundColor: RELIANCE_THEME.colors.primaryTeal,
            borderRadius: 2,
            marginTop: 8,
          }}
        />
      </div>
    </div>
  );
};
