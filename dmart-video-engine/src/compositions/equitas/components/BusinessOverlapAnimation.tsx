import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface BusinessOverlapAnimationProps {
  startFrame?: number;
}

export const BusinessOverlapAnimation: React.FC<
  BusinessOverlapAnimationProps
> = ({ startFrame = 1550 }) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Exact kinetic word snapping from Faster-Whisper:
  // startFrame = 1550 (Scene 3 second half)
  // 1553 - 1652: "Because Equitas bank also provides affordable housing loans" -> Cards enter
  // 1663 - 1778: "certain institutional investors began questioning" -> Market concerns banner (relFrame 140 / frame 1690)
  // 1868 - 1900: "or a potential competition between the bank and his family's NBFC" -> Convergence & Overlap Badge (relFrame 318 / frame 1868)

  const leftCardSpring = spring({
    frame: relFrame,
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const rightCardSpring = spring({
    frame: Math.max(0, relFrame - 50),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const concernBannerSpring = spring({
    frame: Math.max(0, relFrame - 140),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  // Cards slide closer strictly at "potential competition" (frame 1868 / relFrame 318)
  const convergence = spring({
    frame: Math.max(0, relFrame - 318),
    fps: 30,
    config: { damping: 20, stiffness: 90 },
  });

  const overlapBadgeSpring = spring({
    frame: Math.max(0, relFrame - 318),
    fps: 30,
    config: { damping: 15, stiffness: 130 },
  });

  const leftX = interpolate(convergence, [0, 1], [-40, 15]);
  const rightX = interpolate(convergence, [0, 1], [40, -15]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        fontFamily: EQUITAS_THEME.fonts.display,
        boxSizing: "border-box",
        position: "relative",
        padding: "40px 30px",
      }}
    >
      {/* Top Category Badge */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: "3px",
          color: EQUITAS_THEME.colors.warningAmber,
          textTransform: "uppercase",
          background: EQUITAS_THEME.colors.softAmber,
          border: `1.5px solid ${EQUITAS_THEME.colors.warningAmber}`,
          padding: "8px 24px",
          borderRadius: 30,
          marginBottom: 32,
          boxShadow: EQUITAS_THEME.shadows.card,
        }}
      >
        PRODUCT SEGMENT OVERLAP
      </div>

      {/* Two Overlapping Cards */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: 1060, // Utilizes stage space
          position: "relative",
        }}
      >
        {/* Left Card: Equitas Bank */}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            padding: "40px 32px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            transform: `translateX(${leftX}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 2,
            opacity: leftCardSpring,
          }}
        >
          <div style={{ height: 50, display: "flex", alignItems: "center", marginBottom: 20 }}>
            <Img
              src={staticFile(
                "assets/equitas/company_logos/equitas_small_finance_bank_logo.svg"
              )}
              style={{ maxHeight: 46, maxWidth: 260 }}
            />
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
              marginBottom: 12,
            }}
          >
            EQUITAS BANK
          </div>

          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: EQUITAS_THEME.colors.primaryTeal,
              background: EQUITAS_THEME.colors.softTeal,
              padding: "10px 22px",
              borderRadius: 12,
              border: `1.5px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
            }}
          >
            Affordable Housing Loans
          </div>
        </div>

        {/* Center Overlap Warning - Pops strictly on "potential competition" (frame 1868) */}
        {relFrame >= 315 && (
          <div
            style={{
              position: "absolute",
              zIndex: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              opacity: overlapBadgeSpring,
              transform: `scale(${interpolate(overlapBadgeSpring, [0, 1], [0.85, 1])})`,
            }}
          >
            <div
              style={{
                background: "#FFFFFF",
                border: `2.5px solid ${EQUITAS_THEME.colors.warningAmber}`,
                borderRadius: 18,
                padding: "16px 28px",
                boxShadow: "0 15px 35px rgba(217, 119, 6, 0.25)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: "2px",
                  color: EQUITAS_THEME.colors.warningAmber,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                ⚠️ PERCEIVED PARADOX
              </div>
              <div
                style={{
                  fontSize: 22, // Large bold black for mobile
                  fontWeight: 900,
                  color: EQUITAS_THEME.colors.textPrimary,
                  letterSpacing: "-0.5px",
                }}
              >
                POTENTIAL COMPETITION
              </div>
            </div>
          </div>
        )}

        {/* Right Card: Unico Housing Finance */}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.warningAmber}`,
            borderRadius: 24,
            padding: "40px 32px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            transform: `translateX(${rightX}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 2,
            opacity: rightCardSpring,
          }}
        >
          <div style={{ height: 50, display: "flex", alignItems: "center", marginBottom: 20 }}>
            <Img
              src={staticFile("assets/equitas/company_logos/unico_housing_finance_logo.svg")}
              style={{ maxHeight: 46, maxWidth: 240 }}
            />
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
              marginBottom: 12,
            }}
          >
            UNICO HOUSING FINANCE
          </div>

          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: EQUITAS_THEME.colors.warningAmber,
              background: EQUITAS_THEME.colors.softAmber,
              padding: "10px 22px",
              borderRadius: 12,
              border: `1.5px solid rgba(217, 119, 6, 0.3)`,
            }}
          >
            Affordable Housing Finance
          </div>
        </div>
      </div>

      {/* Investor Concerns Callout Banner - Animates on "certain institutional investors began questioning" */}
      <div
        style={{
          marginTop: 40,
          background: "#FFFFFF",
          border: `1.5px solid ${EQUITAS_THEME.colors.warningAmber}`,
          borderLeft: `6px solid ${EQUITAS_THEME.colors.warningAmber}`,
          borderRadius: 16,
          padding: "16px 36px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: concernBannerSpring,
          transform: `translateY(${interpolate(concernBannerSpring, [0, 1], [20, 0])}px)`,
          boxShadow: EQUITAS_THEME.shadows.card,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "2px",
            color: EQUITAS_THEME.colors.warningAmber,
            textTransform: "uppercase",
          }}
        >
          MARKET QUERY:
        </span>
        <span
          style={{
            fontSize: 18, // Large high contrast black
            fontWeight: 700,
            color: EQUITAS_THEME.colors.textPrimary,
          }}
        >
          Institutional Investors Raised Governance Questions on Potential Overlap
        </span>
      </div>
    </div>
  );
};
