import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";

export const StageScene06_FIIBuying: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card 1 Entrance at f2650
  const card1Spring = spring({
    frame: frame - 2650,
    fps,
    config: HI_THEME.springs.heavy,
  });

  // Stamp slam at f2750
  const stampSpring = spring({
    frame: frame - 2750,
    fps,
    config: HI_THEME.springs.pop,
  });

  // Card 2 Entrance at f2863
  const card2Spring = spring({
    frame: frame - 2863,
    fps,
    config: HI_THEME.springs.heavy,
  });

  // Rolling odometer 1 (0 to 15,000 Cr)
  const count1 = Math.round(
    interpolate(frame, [2660, 2730], [0, 15000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Rolling odometer 2 (0 to 13,750 Cr)
  const count2 = Math.round(
    interpolate(frame, [2870, 2940], [0, 13750], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  if (frame < 2644 || frame > 3104) {
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
        padding: "36px 48px",
        background: `radial-gradient(circle at 50% 35%, rgba(0, 208, 156, 0.18) 0%, ${HI_THEME.colors.darkNavy} 85%)`,
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          padding: "8px 22px",
          borderRadius: 999,
          backgroundColor: "rgba(0, 208, 156, 0.2)",
          border: `1.5px solid ${HI_THEME.colors.positiveGreen}`,
          color: HI_THEME.colors.positiveGreen,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        🌊 INSTITUTIONAL CAPITAL FLOOD
      </div>

      <div
        style={{
          fontSize: 44,
          fontWeight: 900,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 24,
          fontFamily: HI_THEME.fonts.display,
        }}
      >
        Foreign Institutional Investors Flood India
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          width: "100%",
          maxWidth: 940,
        }}
      >
        {/* Card 1: November 5 Buying */}
        <div
          style={{
            backgroundColor: HI_THEME.colors.glassNavy,
            border: `2px solid ${HI_THEME.colors.positiveGreen}`,
            borderRadius: 20,
            padding: "22px 30px",
            display: "flex",
            flexDirection: "column",
            transform: `scale(${card1Spring})`,
            boxShadow: "0 10px 30px rgba(0, 208, 156, 0.25)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: HI_THEME.colors.secondaryTeal }}>
                FII NET BUYING — 5 NOVEMBER
              </div>
              <div
                style={{
                  fontSize: 62,
                  fontWeight: 900,
                  color: HI_THEME.colors.positiveGreen,
                  fontFamily: HI_THEME.fonts.numbers,
                  letterSpacing: "-0.02em",
                }}
              >
                +₹{count1.toLocaleString("en-IN")} CR
              </div>
            </div>
            <div style={{ fontSize: 44 }}>🚀</div>
          </div>

          {/* Stamp Badge */}
          {frame >= 2750 && (
            <div
              style={{
                marginTop: 8,
                padding: "6px 16px",
                borderRadius: 6,
                backgroundColor: HI_THEME.colors.gold,
                color: HI_THEME.colors.darkNavy,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                alignSelf: "flex-start",
                transform: `rotate(-1.5deg) scale(${stampSpring})`,
                boxShadow: "0 4px 15px rgba(255, 215, 0, 0.4)",
              }}
            >
              ⭐ BIGGEST SINGLE-DAY BUY IN NEARLY 6 YEARS
            </div>
          )}
        </div>

        {/* Card 2: Today (Nov 6) Buying */}
        {frame >= 2860 && (
          <div
            style={{
              backgroundColor: HI_THEME.colors.glassNavy,
              border: `2px solid ${HI_THEME.colors.positiveGreen}`,
              borderRadius: 20,
              padding: "22px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transform: `scale(${card2Spring})`,
              boxShadow: "0 10px 30px rgba(0, 208, 156, 0.25)",
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: HI_THEME.colors.secondaryTeal }}>
                FII NET BUYING — TODAY (6 NOVEMBER)
              </div>
              <div
                style={{
                  fontSize: 62,
                  fontWeight: 900,
                  color: HI_THEME.colors.positiveGreen,
                  fontFamily: HI_THEME.fonts.numbers,
                  letterSpacing: "-0.02em",
                }}
              >
                +₹{count2.toLocaleString("en-IN")} CR
              </div>
            </div>
            <div style={{ fontSize: 44 }}>💰</div>
          </div>
        )}

        {/* Cumulative 48-Hour Banner */}
        {frame >= 2980 && (
          <div
            style={{
              alignSelf: "center",
              padding: "10px 28px",
              borderRadius: 999,
              backgroundColor: "rgba(117, 207, 198, 0.15)",
              border: `1.5px solid ${HI_THEME.colors.secondaryTeal}`,
              color: "#FFFFFF",
              fontSize: 22,
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            ⚡ OVER <span style={{ color: HI_THEME.colors.gold }}>₹28,750 CRORE</span> PUMPED IN 48 HOURS
          </div>
        )}
      </div>
    </div>
  );
};
