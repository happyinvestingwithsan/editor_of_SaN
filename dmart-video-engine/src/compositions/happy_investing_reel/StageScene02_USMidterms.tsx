import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";

export const StageScene02_USMidterms: React.FC = () => {
  const frame = useCurrentFrame();

  const kenBurnsScale = interpolate(frame, [412, 588], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardSlide = interpolate(frame, [430, 460], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardOpacity = interpolate(frame, [430, 455], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < 412 || frame > 588) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 960,
        overflow: "hidden",
        backgroundColor: HI_THEME.colors.darkNavy,
      }}
    >
      {/* Background Image: US Capitol building with Ken Burns */}
      <img
        src={staticFile("images/reel_1106/us_capitol.jpg")}
        alt="US Capitol"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 960,
          objectFit: "cover",
          transform: `scale(${kenBurnsScale})`,
          filter: "brightness(0.5) contrast(1.15)",
        }}
      />

      {/* Dark Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 960,
          background: "linear-gradient(180deg, rgba(16,43,58,0.4) 0%, rgba(16,43,58,0.92) 85%)",
        }}
      />

      {/* Editorial Content Card */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 48,
          right: 48,
          backgroundColor: HI_THEME.colors.glassNavy,
          border: `1.5px solid ${HI_THEME.colors.borderTeal}`,
          borderRadius: 24,
          padding: "36px 36px",
          backdropFilter: "blur(16px)",
          boxShadow: HI_THEME.colors.borderTealGlow,
          transform: `translateY(${cardSlide}px)`,
          opacity: cardOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: 999,
            backgroundColor: "rgba(117, 207, 198, 0.2)",
            color: HI_THEME.colors.primaryLightTeal,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          🏛️ GLOBAL POLITICAL CATALYST
        </div>

        <div
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.2,
            marginBottom: 16,
            fontFamily: HI_THEME.fonts.display,
          }}
        >
          US Midterm Elections: Democrats Gain Control of Congress
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: HI_THEME.colors.secondaryTeal,
            lineHeight: 1.4,
            paddingLeft: 16,
            borderLeft: `4px solid ${HI_THEME.colors.secondaryTeal}`,
          }}
        >
          Major political setback for Trump • Increased regulatory scrutiny on mega tech & AI expansion subsidies
        </div>
      </div>
    </div>
  );
};
