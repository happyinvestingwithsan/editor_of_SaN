import React from "react";
import { Img, interpolate, spring, staticFile } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneBProps {
  relativeFrame: number; // 0 to 415 (absolute: 420 to 835)
}

export const SceneB_HeroScale: React.FC<SceneBProps> = ({ relativeFrame }) => {
  // Spoken cue "one of the largest companies" begins at frame 140 of Scene B (approx absolute frame 560 / 18.7s)
  if (relativeFrame < 130) return null;

  const enterSpring = spring({
    frame: relativeFrame - 130,
    fps: 30,
    config: { damping: 17, stiffness: 85 },
  });

  const exitOpacity = interpolate(relativeFrame, [340, 390], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const scale = interpolate(enterSpring, [0, 1], [0.94, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 80,
        width: 860,
        height: 240,
        backgroundColor: RELIANCE_THEME.colors.white,
        borderRadius: RELIANCE_THEME.layout.borderRadius,
        border: `2px solid ${RELIANCE_THEME.colors.cardBorderStrong}`,
        boxShadow: RELIANCE_THEME.shadows.floating,
        display: "flex",
        alignItems: "center",
        gap: 36,
        padding: "0 44px",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        zIndex: 50,
      }}
    >
      {/* Official Reliance Crest / Logo */}
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: 20,
          backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
          border: `1.5px solid ${RELIANCE_THEME.colors.cardBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Img
          src={staticFile("brand/reliance_crest.png")}
          style={{
            width: 100,
            height: 100,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Editorial Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: RELIANCE_THEME.colors.tealSoftBg,
            border: `1px solid ${RELIANCE_THEME.colors.cardBorder}`,
            borderRadius: 8,
            padding: "4px 14px",
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: RELIANCE_THEME.colors.primaryTeal,
            }}
          />
          <span
            style={{
              color: RELIANCE_THEME.colors.deepTeal,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            MARKET BENCHMARK
          </span>
        </div>

        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: RELIANCE_THEME.colors.darkText,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          INDIA'S LARGEST LISTED COMPANY
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: RELIANCE_THEME.colors.secondaryText,
          }}
        >
          WEIGHT HEAVYWEIGHT • NIFTY 50 ANCHOR
        </div>
      </div>
    </div>
  );
};
