import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";
import {
  GraduationCap,
  Search,
  AlertTriangle,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { BRIDGE_THEME } from "./theme";

interface EducationalDisclaimerProps {
  startFrame?: number;
}

/**
 * ============================================================================
 * SCENE 5: STATUTORY EDUCATIONAL DISCLAIMER & DUE DILIGENCE MANDATE
 * ============================================================================
 * Active: Frames 1585 - 2729
 * Position: Right Container (Left: 770px, Top: 50px, Width: 1100px, Height: 980px)
 * ZERO OVERLAP with SaN's Left Container (50px, 50px, 680px, 980px)!
 *
 * Full-height elegant light-theme card:
 * - Header: 32px bold ("Educational Study & Statutory Disclosure") with ShieldCheck icon
 *   and "HAPPY INVESTING COMMUNITY" badge.
 * - 3 large, beautifully padded structured items (24px bold headers, 19px descriptions, 32px icons):
 *   1. 🎓 Educational Frameworks Only
 *   2. 🔍 Personal Research & Opinions
 *   3. ⚠️ Not a Buy / Sell Recommendation (dynamically highlighted with amber/red badge at frame 2260)
 * - Bottom Callout: "INDEPENDENT DUE DILIGENCE MANDATE" in 24px bold with CheckCircle icon.
 * ============================================================================
 */
export const EducationalDisclaimer: React.FC<
  EducationalDisclaimerProps
> = () => {
  const frame = useCurrentFrame();

  // Active range: frame 1585 to 2729
  if (frame < 1585) return null;

  // ---------------------------------------------------------------------------
  // SPRINGS & ANIMATIONS
  // ---------------------------------------------------------------------------

  // Card Entrance (frame 1585)
  // SaN: "But strictly, this is a disclaimer... educational video..."
  const cardSpring = spring({
    frame: Math.max(0, frame - 1585),
    fps: 30,
    config: { damping: 16, stiffness: 110, mass: 0.8 },
  });

  // Dynamic Highlight on "Not a buy/sell recommendation" (frame 2260 - 2380)
  // SaN: "this is not a buy or a sell recommendation"
  const notBuySellHighlight =
    frame >= 2260 && frame < 2380
      ? spring({
          frame: frame - 2260,
          fps: 30,
          config: { damping: 12, stiffness: 150 },
        })
      : 0;

  // Dynamic Highlight on "Due Diligence" (frame 2630 - 2720)
  // SaN: "do your due diligence before taking any buy or sell decision"
  const dueDiligenceSpring =
    frame >= 2630
      ? spring({
          frame: frame - 2630,
          fps: 30,
          config: { damping: 12, stiffness: 150 },
        })
      : 0;

  // Final Subtle Fade Out (frames 2715 - 2728)
  const exitSpring = spring({
    frame: Math.max(0, frame - 2715),
    fps: 30,
    config: { damping: 16, stiffness: 120 },
  });

  const overallOpacity = interpolate(exitSpring, [0, 1], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        fontFamily: BRIDGE_THEME.fonts.heading,
        zIndex: 25,
        opacity: overallOpacity,
      }}
    >
      {/* =====================================================================
          FULL-HEIGHT DISCLAIMER CARD (FRAMES 1585 - 2729)
          Position: Right Container (Left: 770px, Top: 50px, Width: 1100px, Height: 980px)
          SaN is in Left Container (50px, 50px, 680px, 980px) -> ZERO OVERLAP!
          ===================================================================== */}
      <div
        style={{
          position: "absolute",
          left: 770,
          top: 50,
          width: 1100,
          height: 980,
          background: "#FFFFFF",
          borderRadius: 24,
          padding: "36px 40px",
          border: "1.5px solid rgba(15, 143, 135, 0.20)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: interpolate(cardSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.96, 1])})`,
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1.5px solid rgba(24, 37, 43, 0.08)",
            paddingBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 14,
                background: BRIDGE_THEME.colors.bgSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
              }}
            >
              <ShieldCheck size={32} color={BRIDGE_THEME.colors.primaryTeal} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: BRIDGE_THEME.colors.deepTeal,
                }}
              >
                Statutory Transparency & Integrity
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: BRIDGE_THEME.colors.textPrimary,
                  letterSpacing: "-0.01em",
                }}
              >
                Educational Study & Statutory Disclosure
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "10px 20px",
              background: BRIDGE_THEME.colors.bgSoft,
              borderRadius: 24,
              fontSize: 16,
              fontWeight: 800,
              color: BRIDGE_THEME.colors.primaryTeal,
              border: "1.5px solid rgba(15, 143, 135, 0.25)",
              letterSpacing: "0.04em",
            }}
          >
            HAPPY INVESTING COMMUNITY
          </div>
        </div>

        {/* 3 Structured Large Content Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1, marginTop: 22, marginBottom: 22 }}>
          {/* Item 1: Educational Purpose */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
              padding: "20px 24px",
              background: BRIDGE_THEME.colors.bgSoft,
              borderRadius: 18,
              border: "1.5px solid rgba(15, 143, 135, 0.18)",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: BRIDGE_THEME.colors.primaryTeal,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
                boxShadow: "0 4px 14px rgba(15, 143, 135, 0.25)",
              }}
            >
              <GraduationCap size={32} color="#FFFFFF" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: BRIDGE_THEME.colors.textPrimary,
                }}
              >
                1. EDUCATIONAL PURPOSE & FRAMEWORKS ONLY
              </div>
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 500,
                  color: BRIDGE_THEME.colors.textSecondary,
                  lineHeight: 1.5,
                  marginTop: 6,
                }}
              >
                Sharing fundamental Screener data and technical candlestick frameworks purely for community financial literacy and case study exploration.
              </div>
            </div>
          </div>

          {/* Item 2: Personal Research & Opinions */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
              padding: "20px 24px",
              background: "#FFFFFF",
              borderRadius: 18,
              border: "1.5px solid rgba(24, 37, 43, 0.12)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: BRIDGE_THEME.colors.bgSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
                border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
              }}
            >
              <Search size={30} color={BRIDGE_THEME.colors.primaryTeal} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: BRIDGE_THEME.colors.textPrimary,
                }}
              >
                2. PERSONAL RESEARCH & INDEPENDENT OPINIONS
              </div>
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 500,
                  color: BRIDGE_THEME.colors.textSecondary,
                  lineHeight: 1.5,
                  marginTop: 6,
                }}
              >
                All perspectives reflect personal thesis and independent public data analysis — strictly non-sponsored, non-institutional, and open to community debate.
              </div>
            </div>
          </div>

          {/* Item 3: Not a Buy / Sell Recommendation */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
              padding: "20px 24px",
              background:
                notBuySellHighlight > 0
                  ? BRIDGE_THEME.colors.redSoftBg
                  : "rgba(220, 38, 38, 0.05)",
              borderRadius: 18,
              border:
                notBuySellHighlight > 0
                  ? `2.5px solid ${BRIDGE_THEME.colors.redAccent}`
                  : "1.5px solid rgba(220, 38, 38, 0.22)",
              transform: `scale(${notBuySellHighlight > 0 ? 1.02 : 1.0})`,
              boxShadow:
                notBuySellHighlight > 0
                  ? "0 0 30px rgba(220, 38, 38, 0.25)"
                  : "none",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: BRIDGE_THEME.colors.redAccent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
                boxShadow: "0 4px 14px rgba(220, 38, 38, 0.25)",
              }}
            >
              <AlertTriangle size={32} color="#FFFFFF" />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: BRIDGE_THEME.colors.redAccent,
                  }}
                >
                  3. NOT A BUY OR SELL RECOMMENDATION
                </div>
                {notBuySellHighlight > 0 && (
                  <div
                    style={{
                      padding: "4px 12px",
                      background: BRIDGE_THEME.colors.redAccent,
                      color: "#FFFFFF",
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                    }}
                  >
                    ★ STATUTORY CAUTION
                  </div>
                )}
              </div>
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 500,
                  color: BRIDGE_THEME.colors.textSecondary,
                  lineHeight: 1.5,
                  marginTop: 6,
                }}
              >
                Strictly non-advisory. Never treat any commentary, price charts, or financial ratios as direct investment advice or buy/sell triggers.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Diligence Callout Bar */}
        <div
          style={{
            padding: "20px 28px",
            background:
              dueDiligenceSpring > 0
                ? BRIDGE_THEME.colors.bgSoft
                : "rgba(15, 143, 135, 0.08)",
            borderRadius: 18,
            border:
              dueDiligenceSpring > 0
                ? `2.5px solid ${BRIDGE_THEME.colors.primaryTeal}`
                : "1.5px dashed rgba(15, 143, 135, 0.35)",
            boxShadow:
              dueDiligenceSpring > 0
                ? "0 0 35px rgba(15, 143, 135, 0.35)"
                : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${dueDiligenceSpring > 0 ? 1.02 : 1.0})`,
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <CheckCircle
              size={30}
              color={BRIDGE_THEME.colors.primaryTeal}
              style={{ flexShrink: 0 }}
            />
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: BRIDGE_THEME.colors.deepTeal,
                  letterSpacing: "-0.01em",
                }}
              >
                INDEPENDENT DUE DILIGENCE MANDATE
              </div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: BRIDGE_THEME.colors.textSecondary,
                  marginTop: 3,
                }}
              >
                Always consult a SEBI registered investment advisor and verify audited filings before executing trades.
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "8px 18px",
              background: BRIDGE_THEME.colors.primaryTeal,
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "0.04em",
              flexShrink: 0,
            }}
          >
            HAPPY INVESTING
          </div>
        </div>
      </div>
    </div>
  );
};
