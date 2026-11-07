import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";

export const StageScene04_WallStreetCrash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card 1 Entrance at f1170 (on "NASDAQ crashed 5.5%")
  const nasdaqSpring = spring({
    frame: frame - 1170,
    fps,
    config: HI_THEME.springs.heavy,
  });

  // Card 2 Entrance at f1230 (on "and S&P fell around 4.4%")
  const spSpring = spring({
    frame: frame - 1230,
    fps,
    config: HI_THEME.springs.heavy,
  });

  if (frame < 1132 || frame > 1337) {
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
        padding: "40px 48px",
        background: `radial-gradient(circle at 50% 35%, rgba(255, 59, 48, 0.18) 0%, ${HI_THEME.colors.darkNavy} 85%)`,
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          padding: "8px 22px",
          borderRadius: 999,
          backgroundColor: "rgba(255, 59, 48, 0.2)",
          border: `1.5px solid ${HI_THEME.colors.negativeRed}`,
          color: "#FF8080",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        📉 WALL STREET SELL-OFF (5 NOVEMBER)
      </div>

      <div
        style={{
          fontSize: 44,
          fontWeight: 900,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 36,
          fontFamily: HI_THEME.fonts.display,
        }}
      >
        Massive Technology Valuation Compression
      </div>

      {/* Two Separate Major Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          maxWidth: 940,
        }}
      >
        {/* Card 1: NASDAQ (Appears exactly on word at f1170) */}
        {frame >= 1165 && (
          <div
            style={{
              backgroundColor: HI_THEME.colors.glassNavy,
              border: `2px solid ${HI_THEME.colors.negativeRed}`,
              borderRadius: 22,
              padding: "26px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `scale(${nasdaqSpring})`,
              boxShadow: "0 10px 30px rgba(255, 59, 48, 0.25)",
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.05em" }}>
                INDEX CRASH
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#FFFFFF" }}>
                NASDAQ COMPOSITE
              </div>
            </div>
            <div
              style={{
                fontSize: 66,
                fontWeight: 900,
                color: HI_THEME.colors.negativeRed,
                fontFamily: HI_THEME.fonts.numbers,
              }}
            >
              -5.5%
            </div>
          </div>
        )}

        {/* Card 2: S&P 500 (Appears exactly on word at f1230) */}
        {frame >= 1225 && (
          <div
            style={{
              backgroundColor: HI_THEME.colors.glassNavy,
              border: `2px solid ${HI_THEME.colors.negativeRed}`,
              borderRadius: 22,
              padding: "26px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `scale(${spSpring})`,
              boxShadow: "0 10px 30px rgba(255, 59, 48, 0.25)",
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.05em" }}>
                BROAD MARKET DIP
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#FFFFFF" }}>
                S&P 500
              </div>
            </div>
            <div
              style={{
                fontSize: 66,
                fontWeight: 900,
                color: HI_THEME.colors.negativeRed,
                fontFamily: HI_THEME.fonts.numbers,
              }}
            >
              -4.4%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
