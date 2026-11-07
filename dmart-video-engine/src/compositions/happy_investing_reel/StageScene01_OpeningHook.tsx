import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";

export const StageScene01_OpeningHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for Duel Podium (appears at f119 on "celebrating, Wall Street...")
  const podiumEntrance = spring({
    frame: frame - 119,
    fps,
    config: HI_THEME.springs.snappy,
  });

  const duelOpacity = interpolate(frame, [119, 128], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chart line draw animation
  const lineProgress = interpolate(frame, [130, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < 118 || frame > 250) {
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "36px 40px",
        background: `radial-gradient(circle at 50% 30%, ${HI_THEME.colors.darkNavyElevated} 0%, ${HI_THEME.colors.darkNavy} 100%)`,
        opacity: duelOpacity,
        transform: `scale(${podiumEntrance})`,
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 22px",
          borderRadius: 999,
          backgroundColor: "rgba(117, 207, 198, 0.15)",
          border: `1.5px solid ${HI_THEME.colors.secondaryTeal}`,
          color: HI_THEME.colors.primaryLightTeal,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        <span>⚡ GLOBAL MARKET DIVERGENCE</span>
      </div>

      {/* Main Duel Title */}
      <div
        style={{
          fontSize: 46,
          fontWeight: 900,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.15,
          marginBottom: 28,
          fontFamily: HI_THEME.fonts.display,
        }}
      >
        INDIA CELEBRATES vs WALL STREET CRASH
      </div>

      {/* Two Column Battle Podium */}
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: 24,
          justifyContent: "center",
        }}
      >
        {/* Left Side: India Green Rally */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 208, 156, 0.08)",
            border: `2px solid ${HI_THEME.colors.positiveGreen}`,
            borderRadius: 20,
            padding: "26px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(0, 208, 156, 0.2)",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: HI_THEME.colors.positiveGreen,
              letterSpacing: "0.05em",
              marginBottom: 4,
            }}
          >
            🇮🇳 NIFTY & SENSEX
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#FFFFFF",
              fontFamily: HI_THEME.fonts.numbers,
              marginBottom: 8,
            }}
          >
            +4.8%
          </div>
          <div
            style={{
              padding: "4px 14px",
              borderRadius: 6,
              backgroundColor: HI_THEME.colors.positiveGreen,
              color: HI_THEME.colors.darkNavy,
              fontSize: 18,
              fontWeight: 900,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            STRONGEST IN 5 YEARS
          </div>

          <svg width="300" height="90" viewBox="0 0 300 90">
            <path
              d="M 15 75 Q 100 68 180 35 T 285 15"
              fill="none"
              stroke={HI_THEME.colors.positiveGreen}
              strokeWidth="5"
              strokeDasharray="350"
              strokeDashoffset={350 * (1 - lineProgress)}
              strokeLinecap="round"
            />
            <circle cx="285" cy="15" r="6" fill={HI_THEME.colors.positiveGreen} opacity={lineProgress} />
          </svg>
        </div>

        {/* Right Side: Wall Street Red Crash */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 59, 48, 0.08)",
            border: `2px solid ${HI_THEME.colors.negativeRed}`,
            borderRadius: 20,
            padding: "26px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(255, 59, 48, 0.2)",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: HI_THEME.colors.negativeRed,
              letterSpacing: "0.05em",
              marginBottom: 4,
            }}
          >
            🇺🇸 NASDAQ TECH
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#FFFFFF",
              fontFamily: HI_THEME.fonts.numbers,
              marginBottom: 8,
            }}
          >
            -5.5%
          </div>
          <div
            style={{
              padding: "4px 14px",
              borderRadius: 6,
              backgroundColor: HI_THEME.colors.negativeRed,
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: 900,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            TECH CRASH
          </div>

          <svg width="300" height="90" viewBox="0 0 300 90">
            <path
              d="M 15 20 Q 100 25 180 55 T 285 80"
              fill="none"
              stroke={HI_THEME.colors.negativeRed}
              strokeWidth="5"
              strokeDasharray="350"
              strokeDashoffset={350 * (1 - lineProgress)}
              strokeLinecap="round"
            />
            <circle cx="285" cy="80" r="6" fill={HI_THEME.colors.negativeRed} opacity={lineProgress} />
          </svg>
        </div>
      </div>
    </div>
  );
};
