import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";

export const StageScene08_PersonalStrategy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Allocation Meter (f3527 - f3928)
  const isAllocationPhase = frame >= 3527 && frame < 3928;
  // Phase 2: Geographic Pivot (f3928 - f4089)
  const isGeographicPhase = frame >= 3928 && frame < 4089;
  // Phase 3: The Creed (f4089 - f4342)
  const isCreedPhase = frame >= 4089 && frame <= 4342;

  // Meter progress for allocation (fills from 60% to 100%)
  const meterProgress = interpolate(frame, [3540, 3680], [60, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Creed entrance at f4095
  const creedSpring = spring({
    frame: frame - 4095,
    fps,
    config: HI_THEME.springs.heavy,
  });

  const formulaSpring = spring({
    frame: frame - 4220,
    fps,
    config: HI_THEME.springs.snappy,
  });

  if (frame < 3527 || frame > 4342) {
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
      {/* PHASE 1: Allocation Meter (f3527 - f3928) */}
      {isAllocationPhase && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080,
            height: 960,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "36px 48px",
            background: `radial-gradient(circle at 50% 30%, ${HI_THEME.colors.darkNavyElevated} 0%, ${HI_THEME.colors.darkNavy} 100%)`,
          }}
        >
          <div
            style={{
              padding: "6px 18px",
              borderRadius: 999,
              backgroundColor: "rgba(117, 207, 198, 0.2)",
              border: `1.5px solid ${HI_THEME.colors.secondaryTeal}`,
              color: HI_THEME.colors.primaryLightTeal,
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            PERSONAL PORTFOLIO DISCIPLINE
          </div>

          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.2,
              marginBottom: 30,
              fontFamily: HI_THEME.fonts.display,
            }}
          >
            Bought Aggressively in Sep–Oct Fear: Allocation Now Full
          </div>

          {/* Allocation Progress Meter Card */}
          <div
            style={{
              width: "100%",
              maxWidth: 920,
              backgroundColor: HI_THEME.colors.glassNavy,
              border: `2px solid ${HI_THEME.colors.borderTeal}`,
              borderRadius: 24,
              padding: "30px 32px",
              boxShadow: HI_THEME.colors.borderTealGlow,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}>
                PLANNED INDIA ALLOCATION
              </span>
              <span style={{ fontSize: 28, fontWeight: 900, color: HI_THEME.colors.positiveGreen }}>
                {Math.round(meterProgress)}% (TARGET REACHED)
              </span>
            </div>

            {/* Progress Track */}
            <div
              style={{
                width: "100%",
                height: 20,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 999,
                overflow: "hidden",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: `${meterProgress}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${HI_THEME.colors.secondaryTeal} 0%, ${HI_THEME.colors.positiveGreen} 100%)`,
                  borderRadius: 999,
                  boxShadow: "0 0 16px rgba(0, 208, 156, 0.5)",
                }}
              />
            </div>

            <div style={{ fontSize: 20, color: HI_THEME.colors.primaryLightTeal, lineHeight: 1.4 }}>
              ✅ Target allocation complete • Zero FOMO chasing • Waiting for target valuations to book profits
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2 & 3: Background with Disciplined Investor study */}
      {(isGeographicPhase || isCreedPhase) && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src={staticFile("images/reel_1106/disciplined_investor_study.jpg")}
            alt="Disciplined Investor"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1080,
              height: 960,
              objectFit: "cover",
              filter: "brightness(0.4) contrast(1.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1080,
              height: 960,
              background: "linear-gradient(180deg, rgba(16,43,58,0.4) 0%, rgba(16,43,58,0.95) 85%)",
            }}
          />

          {isGeographicPhase && (
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: 48,
                right: 48,
                backgroundColor: HI_THEME.colors.glassNavy,
                border: `2px solid ${HI_THEME.colors.borderTeal}`,
                borderRadius: 24,
                padding: "36px 36px",
                boxShadow: HI_THEME.colors.borderTealGlow,
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
                  marginBottom: 14,
                }}
              >
                GEOGRAPHIC VALUATION HUNTING
              </div>
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.2,
                  marginBottom: 14,
                  fontFamily: HI_THEME.fonts.display,
                }}
              >
                INDIA ➔ UNITED STATES
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: HI_THEME.colors.gold }}>
                SAME FRAMEWORK • SAME DISCIPLINE
              </div>
            </div>
          )}

          {isCreedPhase && (
            <div
              style={{
                position: "absolute",
                bottom: 60,
                left: 48,
                right: 48,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Creed Card */}
              <div
                style={{
                  backgroundColor: HI_THEME.colors.glassNavy,
                  border: `2.5px solid ${HI_THEME.colors.gold}`,
                  borderRadius: 24,
                  padding: "30px 32px",
                  boxShadow: "0 12px 40px rgba(255, 215, 0, 0.25)",
                  transform: `scale(${creedSpring})`,
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: HI_THEME.colors.gold,
                    letterSpacing: "0.1em",
                    marginBottom: 8,
                  }}
                >
                  THE INVESTING CREED
                </div>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 900,
                    color: "#FFFFFF",
                    lineHeight: 1.25,
                    fontFamily: HI_THEME.fonts.display,
                  }}
                >
                  Opportunity Doesn't Belong to One Country: It Lies Where There Is Fear!
                </div>
              </div>

              {/* The 3-Part Equation */}
              {frame >= 4210 && (
                <div
                  style={{
                    backgroundColor: "rgba(0, 208, 156, 0.15)",
                    border: `2px solid ${HI_THEME.colors.positiveGreen}`,
                    borderRadius: 18,
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: `scale(${formulaSpring})`,
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF", textAlign: "center" }}>
                    QUALITY BUSINESS + MARGIN OF SAFETY + DISCIPLINE
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
