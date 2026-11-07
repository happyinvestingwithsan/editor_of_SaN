import React from "react";
import { spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";

export const StageScene05_IndiaCatalysts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Point 1: f1586 to f1955 (starts strictly at "First, global AI trade...")
  const isPhase1 = frame >= 1586 && frame < 1955;
  // Point 2: f1955 to f2300 (starts strictly at "Second, crude oil prices...")
  const isPhase2 = frame >= 1955 && frame < 2300;
  // Point 3: f2300 to f2644 (starts strictly at "And third, India's earning outlook...")
  const isPhase3 = frame >= 2300 && frame <= 2644;

  // Animation for Phase 1
  const phase1Card = spring({
    frame: frame - 1586,
    fps,
    config: HI_THEME.springs.smooth,
  });

  // Staggered items for Phase 2 (Crude Flowchart)
  const tier1Spring = spring({ frame: frame - 1965, fps, config: HI_THEME.springs.snappy });
  const tier2Spring = spring({ frame: frame - 2040, fps, config: HI_THEME.springs.snappy });
  const tier3Spring = spring({ frame: frame - 2110, fps, config: HI_THEME.springs.snappy });
  const tier4Spring = spring({ frame: frame - 2180, fps, config: HI_THEME.springs.snappy });

  // Animation for Phase 3
  const phase3Spring = spring({
    frame: frame - 2307,
    fps,
    config: HI_THEME.springs.smooth,
  });

  if (frame < 1586 || frame > 2644) {
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
      {/* POINT 1: Capital Rotation (f1586 - f1955) */}
      {isPhase1 && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src={staticFile("images/reel_1106/capital_rotation_world.jpg")}
            alt="Capital Rotation"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1080,
              height: 960,
              objectFit: "cover",
              filter: "brightness(0.55) contrast(1.1)",
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

          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 48,
              right: 48,
              backgroundColor: HI_THEME.colors.glassNavy,
              border: `2px solid ${HI_THEME.colors.borderTeal}`,
              borderRadius: 24,
              padding: "36px 36px",
              boxShadow: HI_THEME.colors.borderTealGlow,
              transform: `scale(${phase1Card})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 18px",
                borderRadius: 999,
                backgroundColor: "rgba(0, 208, 156, 0.2)",
                color: HI_THEME.colors.positiveGreen,
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "0.08em",
                marginBottom: 14,
              }}
            >
              1. GLOBAL CAPITAL ROTATION
            </div>

            <div
              style={{
                fontSize: 40,
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.25,
                marginBottom: 16,
                fontFamily: HI_THEME.fonts.display,
              }}
            >
              Global AI Trade Gets Crowded: Money Moves to India
            </div>

            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: HI_THEME.colors.primaryLightTeal,
                lineHeight: 1.45,
                borderLeft: `4px solid ${HI_THEME.colors.secondaryTeal}`,
                paddingLeft: 16,
              }}
            >
              With diversified sectors and lower dependency on speculative AI chips, India emerges as a resilient value destination for global funds.
            </div>
          </div>
        </div>
      )}

      {/* POINT 2: Crude Oil & US Yields Flowchart (f1955 - f2300) */}
      {isPhase2 && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src={staticFile("images/reel_1106/crude_oil_shipping.jpg")}
            alt="Crude Oil Shipping"
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
              background: "linear-gradient(180deg, rgba(16,43,58,0.5) 0%, rgba(16,43,58,0.96) 90%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 36,
              left: 48,
              right: 48,
              display: "flex",
              flexDirection: "column",
              gap: 12,
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
                alignSelf: "flex-start",
              }}
            >
              2. MACRO ECONOMIC RELIEF
            </div>

            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.2,
                fontFamily: HI_THEME.fonts.display,
              }}
            >
              Crude Oil Cooling & US Yields Easing
            </div>

            {/* 4-Tier Visual Flowchart */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              {/* Step 1 */}
              <div
                style={{
                  backgroundColor: HI_THEME.colors.glassNavy,
                  border: `1.5px solid ${HI_THEME.colors.secondaryTeal}`,
                  borderRadius: 14,
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  transform: `scale(${tier1Spring})`,
                }}
              >
                <div style={{ fontSize: 26 }}>🛢️</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>
                  COOLING CRUDE OIL & EASING US BOND YIELDS
                </div>
              </div>

              {/* Arrow */}
              <div style={{ textAlign: "center", color: HI_THEME.colors.secondaryTeal, fontSize: 18 }}>▼</div>

              {/* Step 2 */}
              {frame >= 2040 && (
                <div
                  style={{
                    backgroundColor: HI_THEME.colors.glassNavy,
                    border: `1.5px solid ${HI_THEME.colors.secondaryTeal}`,
                    borderRadius: 14,
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    transform: `scale(${tier2Spring})`,
                  }}
                >
                  <div style={{ fontSize: 26 }}>📉</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>
                    LOWER IMPORT BILL FOR INDIA
                  </div>
                </div>
              )}

              {/* Arrow */}
              {frame >= 2040 && <div style={{ textAlign: "center", color: HI_THEME.colors.secondaryTeal, fontSize: 18 }}>▼</div>}

              {/* Step 3 */}
              {frame >= 2110 && (
                <div
                  style={{
                    backgroundColor: HI_THEME.colors.glassNavy,
                    border: `1.5px solid ${HI_THEME.colors.secondaryTeal}`,
                    borderRadius: 14,
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    transform: `scale(${tier3Spring})`,
                  }}
                >
                  <div style={{ fontSize: 26 }}>🛡️</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>
                    REDUCED INFLATION PRESSURE
                  </div>
                </div>
              )}

              {/* Arrow */}
              {frame >= 2110 && <div style={{ textAlign: "center", color: HI_THEME.colors.positiveGreen, fontSize: 18 }}>▼</div>}

              {/* Step 4 */}
              {frame >= 2180 && (
                <div
                  style={{
                    backgroundColor: "rgba(0, 208, 156, 0.15)",
                    border: `2px solid ${HI_THEME.colors.positiveGreen}`,
                    borderRadius: 14,
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    transform: `scale(${tier4Spring})`,
                    boxShadow: "0 8px 25px rgba(0, 208, 156, 0.25)",
                  }}
                >
                  <div style={{ fontSize: 26 }}>📈</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: HI_THEME.colors.positiveGreen }}>
                    EXPANDED CORPORATE EARNINGS MARGINS
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* POINT 3: Synthesis Card (f2300 - f2644) */}
      {isPhase3 && (
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
            padding: "40px 48px",
            background: `radial-gradient(circle at 50% 30%, ${HI_THEME.colors.darkNavyElevated} 0%, ${HI_THEME.colors.darkNavy} 100%)`,
            transform: `scale(${phase3Spring})`,
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
              alignSelf: "flex-start",
              marginBottom: 16,
            }}
          >
            3. THE MACRO CONVERGENCE
          </div>

          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.2,
              marginBottom: 28,
              fontFamily: HI_THEME.fonts.display,
            }}
          >
            Not Just Chasing Rallies: 3 Forces Fueling India
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                backgroundColor: HI_THEME.colors.glassNavy,
                border: `1.5px solid ${HI_THEME.colors.borderTeal}`,
                borderRadius: 18,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 30 }}>🌐</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}>
                1. Global Capital Rotation Away From Expensive Tech
              </div>
            </div>

            <div
              style={{
                backgroundColor: HI_THEME.colors.glassNavy,
                border: `1.5px solid ${HI_THEME.colors.borderTeal}`,
                borderRadius: 18,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 30 }}>⚓</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}>
                2. India Macro Pressure Easing (Crude Oil & US Yields)
              </div>
            </div>

            <div
              style={{
                backgroundColor: HI_THEME.colors.glassNavy,
                border: `2px solid ${HI_THEME.colors.positiveGreen}`,
                borderRadius: 18,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 8px 30px rgba(0, 208, 156, 0.2)",
              }}
            >
              <div style={{ fontSize: 30 }}>📊</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: HI_THEME.colors.positiveGreen }}>
                3. Corporate Earnings Outlook Improving
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
