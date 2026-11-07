import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";

export const StageScene03_AIDataCenter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background zoom
  const kenBurns = interpolate(frame, [658, 1132], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Electricity card entrance at f749 (on "electricity")
  const powerCardSpring = spring({
    frame: frame - 749,
    fps,
    config: HI_THEME.springs.snappy,
  });

  // Water card entrance at f805 (on "water")
  const waterCardSpring = spring({
    frame: frame - 805,
    fps,
    config: HI_THEME.springs.snappy,
  });

  // Stamp slam at f850 (on "restriction on their expansion")
  const stampSpring = spring({
    frame: frame - 850,
    fps,
    config: HI_THEME.springs.heavy,
  });

  // Part 2: ROI Question Card entrance at f930
  const roiCardSpring = spring({
    frame: frame - 930,
    fps,
    config: HI_THEME.springs.smooth,
  });

  if (frame < 658 || frame > 1132) {
    return null;
  }

  const isRoiPhase = frame >= 920;

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
      {/* Background: Generated cinematic AI Data Center */}
      <img
        src={staticFile("images/reel_1106/datacenter_ai_power.jpg")}
        alt="AI Data Center"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 960,
          objectFit: "cover",
          transform: `scale(${kenBurns})`,
          filter: "brightness(0.55) contrast(1.15)",
        }}
      />

      {/* Atmospheric Shade */}
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

      {!isRoiPhase ? (
        /* Phase 1: Electricity, Water & Expansion Bans */
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 48,
            right: 48,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Top Header */}
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              backgroundColor: "rgba(117, 207, 198, 0.2)",
              border: `1.5px solid ${HI_THEME.colors.secondaryTeal}`,
              color: HI_THEME.colors.primaryLightTeal,
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "0.08em",
              alignSelf: "flex-start",
            }}
          >
            DATA CENTER BOTTLENECKS
          </div>

          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.2,
              fontFamily: HI_THEME.fonts.display,
            }}
          >
            Growing Scrutiny on AI Infrastructure
          </div>

          {/* Metric Card 1: Electricity (Exact sync at f749) */}
          {frame >= 745 && (
            <div
              style={{
                backgroundColor: HI_THEME.colors.glassNavy,
                border: `2px solid ${HI_THEME.colors.gold}`,
                borderRadius: 18,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 18,
                transform: `scale(${powerCardSpring})`,
                boxShadow: "0 8px 30px rgba(255, 215, 0, 0.2)",
              }}
            >
              <div style={{ fontSize: 42 }}>⚡</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: HI_THEME.colors.gold }}>
                  ENORMOUS ELECTRICITY DEMAND
                </div>
                <div style={{ fontSize: 20, color: "#E2E8F0" }}>
                  Power grids maxing out capacity across key states
                </div>
              </div>
            </div>
          )}

          {/* Metric Card 2: Water (Exact sync at f805) */}
          {frame >= 800 && (
            <div
              style={{
                backgroundColor: HI_THEME.colors.glassNavy,
                border: `2px solid ${HI_THEME.colors.secondaryTeal}`,
                borderRadius: 18,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 18,
                transform: `scale(${waterCardSpring})`,
                boxShadow: HI_THEME.colors.borderTealGlow,
              }}
            >
              <div style={{ fontSize: 42 }}>💧</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: HI_THEME.colors.secondaryTeal }}>
                  MASSIVE WATER COOLING REQUIREMENTS
                </div>
                <div style={{ fontSize: 20, color: "#E2E8F0" }}>
                  Billions of gallons required for chip thermal dissipation
                </div>
              </div>
            </div>
          )}

          {/* Warning Rubber Stamp (Exact sync at f850) */}
          {frame >= 850 && (
            <div
              style={{
                alignSelf: "center",
                marginTop: 10,
                border: `4px solid ${HI_THEME.colors.negativeRed}`,
                borderRadius: 14,
                padding: "12px 30px",
                color: HI_THEME.colors.negativeRed,
                fontSize: 28,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                backgroundColor: "rgba(255, 59, 48, 0.18)",
                transform: `rotate(-3deg) scale(${stampSpring})`,
                boxShadow: "0 0 30px rgba(255, 59, 48, 0.4)",
              }}
            >
              🛑 RESTRICTIONS ON EXPANSION
            </div>
          )}
        </div>
      ) : (
        /* Phase 2: ROI Question Card */
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 48,
            right: 48,
            backgroundColor: HI_THEME.colors.glassNavy,
            border: `2px solid ${HI_THEME.colors.secondaryTeal}`,
            borderRadius: 24,
            padding: "36px 36px",
            boxShadow: HI_THEME.colors.borderTealGlow,
            transform: `scale(${roiCardSpring})`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: HI_THEME.colors.gold,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            THE $500 BILLION QUESTION
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.25,
              marginBottom: 16,
              fontFamily: HI_THEME.fonts.display,
            }}
          >
            Will Massive AI Capex Generate the Expected Returns?
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: HI_THEME.colors.primaryLightTeal,
              lineHeight: 1.4,
              paddingLeft: 16,
              borderLeft: `4px solid ${HI_THEME.colors.secondaryTeal}`,
            }}
          >
            Investors question payback timelines as hyperscaler spending surges without immediate revenue parity.
          </div>
        </div>
      )}
    </div>
  );
};
