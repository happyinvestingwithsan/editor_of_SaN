import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface CompanyRelationshipDiagramProps {
  startFrame?: number;
}

export const CompanyRelationshipDiagram: React.FC<
  CompanyRelationshipDiagramProps
> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Exact kinetic sentence snapping from Faster-Whisper:
  // startFrame = 983 (Scene 3)
  // 1. Equitas Bank Card (frame 989: "formal resignation letter") -> relFrame 15
  // 2. Family Connection Hub (frame 1211: "Vasudevan's daughter is a co-promoter") -> relFrame 228
  // 3. Unico Housing Finance Card (frame 1378: "called Unico Housing Finance") -> relFrame 395
  // 4. RBI License Badge (frame 1484: "license from Reserve Bank of India in 2023") -> relFrame 500

  const node1Spring = spring({
    frame: Math.max(0, relFrame - 15),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const edgeSpring = spring({
    frame: Math.max(0, relFrame - 228),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const node2Spring = spring({
    frame: Math.max(0, relFrame - 395),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const rbiBadgeSpring = spring({
    frame: Math.max(0, relFrame - 500),
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
        padding: "40px 30px",
        fontFamily: EQUITAS_THEME.fonts.display,
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Category Heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 36,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "3px",
            color: EQUITAS_THEME.colors.primaryTeal,
            textTransform: "uppercase",
            background: EQUITAS_THEME.colors.softTeal,
            border: `1.5px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
            padding: "8px 24px",
            borderRadius: 30,
            boxShadow: EQUITAS_THEME.shadows.card,
          }}
        >
          FORENSIC RELATIONSHIP MAP
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: EQUITAS_THEME.colors.textSecondary,
          }}
        >
          THE DOCUMENTED FACTS
        </span>
      </div>

      {/* Main Relationship Graph Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 180px 1fr",
          alignItems: "center",
          gap: 24,
          width: "100%",
          maxWidth: 1080, // Utilizes stage space
        }}
      >
        {/* Left Entity: Equitas Small Finance Bank */}
        <div
          style={{
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            padding: "36px 28px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: node1Spring,
            transform: `translateX(${interpolate(node1Spring, [0, 1], [-40, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              height: 56,
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Img
              src={staticFile("assets/equitas/company_logos/equitas_small_finance_bank_logo.svg")}
              style={{ maxHeight: 50, maxWidth: 260 }}
            />
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
              marginBottom: 6,
            }}
          >
            EQUITAS SMALL FINANCE BANK
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: EQUITAS_THEME.colors.primaryTeal,
              letterSpacing: "1px",
              marginBottom: 16,
            }}
          >
            SCHEDULED COMMERCIAL BANK
          </div>

          <div
            style={{
              fontSize: 16,
              color: EQUITAS_THEME.colors.textSecondary,
              background: "rgba(15, 23, 42, 0.04)",
              border: "1px solid rgba(15, 23, 42, 0.06)",
              padding: "10px 18px",
              borderRadius: 12,
              lineHeight: 1.4,
            }}
          >
            P.N. Vasudevan: <strong>Founder & MD/CEO</strong>
          </div>
        </div>

        {/* Center Connecting Hub: Family Tie - Animates on "daughter is co-promoter" */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: edgeSpring,
            transform: `scale(${interpolate(edgeSpring, [0, 1], [0.8, 1])})`,
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: `2px solid ${EQUITAS_THEME.colors.warningAmber}`,
              borderRadius: 18,
              padding: "14px 16px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(217, 119, 6, 0.18)",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "1.5px",
                color: EQUITAS_THEME.colors.warningAmber,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              RELATIONSHIP
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: EQUITAS_THEME.colors.textPrimary,
                lineHeight: 1.25,
              }}
            >
              Daughter is Co-Promoter
            </div>
          </div>

          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: EQUITAS_THEME.colors.textMuted,
              textAlign: "center",
              marginTop: 12,
              lineHeight: 1.3,
            }}
          >
            Zero Cross-Shareholding
          </div>
        </div>

        {/* Right Entity: Unico Housing Finance - Animates on "called Unico Housing Finance" */}
        <div
          style={{
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.warningAmber}`,
            borderRadius: 24,
            padding: "36px 28px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: node2Spring,
            transform: `translateX(${interpolate(node2Spring, [0, 1], [40, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              height: 56,
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Img
              src={staticFile("assets/equitas/company_logos/unico_housing_finance_logo.svg")}
              style={{ maxHeight: 50, maxWidth: 240 }}
            />
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
              marginBottom: 6,
            }}
          >
            UNICO HOUSING FINANCE
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: EQUITAS_THEME.colors.warningAmber,
              letterSpacing: "1px",
              marginBottom: 16,
            }}
          >
            AFFORDABLE HOUSING NBFC
          </div>

          {/* 2023 RBI Registration Pill - Pops on "license from Reserve Bank of India in 2023" */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: EQUITAS_THEME.colors.softTeal,
              border: `1.5px solid ${EQUITAS_THEME.colors.primaryTeal}`,
              padding: "8px 18px",
              borderRadius: 24,
              opacity: rbiBadgeSpring,
              transform: `scale(${interpolate(rbiBadgeSpring, [0, 1], [0.9, 1])})`,
            }}
          >
            <Img
              src={staticFile("assets/equitas/company_logos/rbi_seal.svg")}
              style={{ width: 22, height: 22 }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: EQUITAS_THEME.colors.primaryTeal,
                letterSpacing: "0.5px",
              }}
            >
              2023: LICENSED BY RBI
            </span>
          </div>
        </div>
      </div>

      {/* Qualification Footer */}
      <div
        style={{
          marginTop: 40,
          fontSize: 16, // Larger for mobile readability
          color: EQUITAS_THEME.colors.textSecondary,
          textAlign: "center",
          maxWidth: 850,
          lineHeight: 1.5,
        }}
      >
        Disclosed in statutory regulatory filings: Independent institutional NBFC established in 2023 with RBI approval.
      </div>
    </div>
  );
};
