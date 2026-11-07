import React from "react";
import { spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";

export const StageScene09_MasterclassCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPillarsPhase = frame >= 4342 && frame < 4571;
  const isMasterclassPhase = frame >= 4571 && frame < 5069;

  // Staggered springs for 3 Pillars
  const pillar1Spring = spring({ frame: frame - 4450, fps, config: HI_THEME.springs.snappy });
  const pillar2Spring = spring({ frame: frame - 4485, fps, config: HI_THEME.springs.snappy });
  const pillar3Spring = spring({ frame: frame - 4520, fps, config: HI_THEME.springs.snappy });

  // Masterclass card spring at f4580
  const masterclassSpring = spring({
    frame: frame - 4580,
    fps,
    config: HI_THEME.springs.heavy,
  });

  const qrSpring = spring({
    frame: frame - 4603,
    fps,
    config: HI_THEME.springs.snappy,
  });

  if (frame < 4342 || frame > 5069) {
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
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 48px",
        background: `radial-gradient(circle at 50% 30%, ${HI_THEME.colors.darkNavyElevated} 0%, ${HI_THEME.colors.darkNavy} 100%)`,
      }}
    >
      {/* PHASE 1: The 3 Framework Pillars (f4342 - f4571) */}
      {isPillarsPhase && (
        <div style={{ width: "100%", maxWidth: 940, display: "flex", flexDirection: "column", gap: 16 }}>
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
              alignSelf: "center",
            }}
          >
            THE 3 ESSENTIAL QUESTIONS
          </div>

          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.2,
              marginBottom: 12,
              fontFamily: HI_THEME.fonts.display,
            }}
          >
            A Framework That Guides Every Decision
          </div>

          {/* Pillar 1 */}
          <div
            style={{
              backgroundColor: HI_THEME.colors.glassNavy,
              border: `2px solid ${HI_THEME.colors.secondaryTeal}`,
              borderRadius: 18,
              padding: "18px 28px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              transform: `scale(${pillar1Spring})`,
            }}
          >
            <div style={{ fontSize: 32 }}>🎯</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF" }}>
              1. WHAT TO BUY <span style={{ fontSize: 20, color: HI_THEME.colors.primaryLightTeal }}>(Quality Filter)</span>
            </div>
          </div>

          {/* Pillar 2 */}
          {frame >= 4480 && (
            <div
              style={{
                backgroundColor: HI_THEME.colors.glassNavy,
                border: `2px solid ${HI_THEME.colors.gold}`,
                borderRadius: 18,
                padding: "18px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                transform: `scale(${pillar2Spring})`,
              }}
            >
              <div style={{ fontSize: 32 }}>🏷️</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: HI_THEME.colors.gold }}>
                2. AT WHAT PRICE TO BUY <span style={{ fontSize: 20, color: "#FFFFFF" }}>(Margin of Safety)</span>
              </div>
            </div>
          )}

          {/* Pillar 3 */}
          {frame >= 4515 && (
            <div
              style={{
                backgroundColor: HI_THEME.colors.glassNavy,
                border: `2px solid ${HI_THEME.colors.positiveGreen}`,
                borderRadius: 18,
                padding: "18px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                transform: `scale(${pillar3Spring})`,
              }}
            >
              <div style={{ fontSize: 32 }}>🛡️</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: HI_THEME.colors.positiveGreen }}>
                3. HOW MUCH RISK TO TAKE <span style={{ fontSize: 20, color: "#FFFFFF" }}>(Position Sizing)</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: Free Diwali Masterclass Showcase with QR Code (f4571 - f5069) */}
      {isMasterclassPhase && (
        <div
          style={{
            width: "100%",
            maxWidth: 980,
            backgroundColor: HI_THEME.colors.glassNavy,
            border: `2.5px solid ${HI_THEME.colors.gold}`,
            borderRadius: 28,
            padding: "28px 36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 16px 50px rgba(255, 215, 0, 0.25)",
            transform: `scale(${masterclassSpring})`,
          }}
        >
          {/* Top Tag & Title */}
          <div
            style={{
              padding: "6px 20px",
              borderRadius: 999,
              backgroundColor: HI_THEME.colors.positiveGreen,
              color: HI_THEME.colors.darkNavy,
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            🎉 SPECIAL DIWALI GIFT • 100% FREE
          </div>

          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.15,
              marginBottom: 18,
              fontFamily: HI_THEME.fonts.display,
            }}
          >
            3-Hour Happy Investing Masterclass
          </div>

          {/* Middle Row: QR Code on Left, Offer Details on Right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 36,
              width: "100%",
              marginBottom: 16,
            }}
          >
            {/* QR Code Container */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "12px",
                borderRadius: 20,
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `scale(${qrSpring})`,
              }}
            >
              <img
                src={staticFile("images/reel_1106/qr_happy_investing.png")}
                alt="QR Code"
                style={{
                  width: 170,
                  height: 170,
                  objectFit: "contain",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: HI_THEME.colors.darkNavy,
                  marginTop: 4,
                  letterSpacing: "0.05em",
                }}
              >
                SCAN TO ENROLL
              </span>
            </div>

            {/* Details Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Golden Coupon Pill */}
              <div
                style={{
                  padding: "12px 24px",
                  borderRadius: 16,
                  backgroundColor: "rgba(255, 215, 0, 0.15)",
                  border: `2px dashed ${HI_THEME.colors.gold}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: "#E2E8F0" }}>
                  COUPON CODE
                </div>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 900,
                    color: HI_THEME.colors.gold,
                    letterSpacing: "0.08em",
                    fontFamily: HI_THEME.fonts.numbers,
                  }}
                >
                  HAPPYDIWALI
                </div>
              </div>

              {/* Exact Website URL */}
              <div
                style={{
                  backgroundColor: "rgba(117, 207, 198, 0.15)",
                  border: `1.5px solid ${HI_THEME.colors.secondaryTeal}`,
                  borderRadius: 14,
                  padding: "10px 20px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 14, color: HI_THEME.colors.primaryLightTeal, fontWeight: 700 }}>
                  OFFICIAL WEBSITE
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF" }}>
                  www.happy-investing.in
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Destination Link */}
          <div style={{ fontSize: 20, color: "#94A3B8", textAlign: "center" }}>
            🔗 Link in Bio • Description • Pinned Comment
          </div>
        </div>
      )}
    </div>
  );
};
