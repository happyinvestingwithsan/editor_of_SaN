import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface FounderPortraitProps {
  startFrame?: number;
  showTenureBadge?: boolean;
}

export const FounderPortrait: React.FC<FounderPortraitProps> = ({
  startFrame = 0,
  showTenureBadge = true,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  const slideSpring = spring({
    frame: relFrame,
    fps: 30,
    config: { damping: 20, stiffness: 100 },
  });

  const photoScale = interpolate(relFrame, [0, 200], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  const badgeSpring = spring({
    frame: Math.max(0, relFrame - 15),
    fps: 30,
    config: { damping: 18, stiffness: 120 },
  });

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
        opacity: slideSpring,
        transform: `translateY(${interpolate(slideSpring, [0, 1], [30, 0])}px)`,
      }}
    >
      {/* Dominating Editorial Founder Dossier Card */}
      <div
        style={{
          position: "relative",
          width: 760, // Dominating presence filling stage
          height: 860,
          borderRadius: 28,
          overflow: "hidden",
          border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
          boxShadow: EQUITAS_THEME.shadows.cardElevated,
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Upper Frame: 100% Crisp Authentic Photograph (Zero facial occlusion or blur) */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 560,
            overflow: "hidden",
            backgroundColor: "#F3EDE2",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${photoScale})`,
              transition: "transform 0.1s linear",
            }}
          >
            <Img
              src={staticFile("assets/equitas/portraits/pn_vasudevan_founder_ceo_authentic.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 12%",
                filter: "contrast(1.05) brightness(1.02)",
              }}
            />
          </div>

          {/* Official Equitas Logo Pill in Top Corner */}
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              padding: "10px 22px",
              borderRadius: 16,
              border: `1.5px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Img
              src={staticFile("assets/equitas/company_logos/equitas_small_finance_bank_logo.svg")}
              style={{
                height: 38,
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Lower Editorial Bio Plaque (Solid clean white background, high-contrast typography) */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            padding: "26px 36px 32px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderTop: `1.5px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                letterSpacing: "3px",
                fontWeight: 800,
                color: EQUITAS_THEME.colors.primaryTeal,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              THE ARCHITECT & FOUNDER
            </div>

            <div
              style={{
                fontSize: 44, // Bold high-contrast black heading for mobile
                fontWeight: 900,
                color: EQUITAS_THEME.colors.textPrimary,
                letterSpacing: "-0.5px",
                lineHeight: 1.1,
                marginBottom: 6,
              }}
            >
              P. N. VASUDEVAN
            </div>

            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: EQUITAS_THEME.colors.textSecondary,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span>FOUNDER & MANAGING DIRECTOR</span>
              <span style={{ color: EQUITAS_THEME.colors.primaryTeal }}>•</span>
              <span style={{ color: EQUITAS_THEME.colors.primaryTeal, fontWeight: 800 }}>
                EQUITAS SFB
              </span>
            </div>
          </div>

          {showTenureBadge && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: EQUITAS_THEME.colors.softTeal,
                border: `1.5px solid ${EQUITAS_THEME.colors.primaryTeal}`,
                padding: "10px 22px",
                borderRadius: 24,
                width: "fit-content",
                opacity: badgeSpring,
                boxShadow: "0 4px 14px rgba(0, 89, 83, 0.12)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: EQUITAS_THEME.colors.primaryTeal,
                }}
              />
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: EQUITAS_THEME.colors.primaryTeal,
                  letterSpacing: "1px",
                }}
              >
                19-YEAR FOUNDING TENURE (2007 – 2026)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
