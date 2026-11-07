import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";
import { InvestigationHeader } from "./InvestigationHeader";

interface InstitutionalDisclosureProps {
  startFrame?: number;
}

export const InstitutionalDisclosure: React.FC<
  InstitutionalDisclosureProps
> = ({ startFrame = 2390 }) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Exact kinetic sentence snapping from Faster-Whisper:
  // startFrame = 2390 (Scene 5)
  // 2518: "The answer is no for that also" (relFrame 128) -> Verified badge
  // 2664: "to both the board of directors" (relFrame 274) -> Pillar 1 (Board)
  // 2720: "and the RBI" (relFrame 330) -> Pillar 2 (RBI)
  // 2750: "under strict banking compliance rules" (relFrame 360) -> Formal Disclosure Stamp

  const boardSpring = spring({
    frame: Math.max(0, relFrame - 274),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const rbiSpring = spring({
    frame: Math.max(0, relFrame - 330),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const stampSpring = spring({
    frame: Math.max(0, relFrame - 360),
    fps: 30,
    config: { damping: 14, stiffness: 140 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "40px 50px",
        fontFamily: EQUITAS_THEME.fonts.display,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <InvestigationHeader
        dossierNo="INVESTIGATION 02"
        question="WAS THERE ANY REGULATORY VIOLATION?"
        statusBadge={relFrame >= 128 ? "VERIFIED: ZERO REGULATORY VIOLATION" : undefined}
        isAffirmative={true}
        startFrame={startFrame}
      />

      {/* Dual Institutional Pillars */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
          marginTop: 40,
        }}
      >
        {/* Pillar 1: Board of Directors - Pops on "board of directors" */}
        <div
          style={{
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            padding: "32px 28px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            opacity: boardSpring,
            transform: `translateY(${interpolate(boardSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: EQUITAS_THEME.colors.softTeal,
              border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Img
              src={staticFile("assets/equitas/company_logos/equitas_small_finance_bank_symbol.svg")}
              style={{ width: 36, height: 36 }}
            />
          </div>

          <div
            style={{
              fontSize: 24, // Bold for mobile
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
              marginBottom: 6,
            }}
          >
            BOARD OF DIRECTORS
          </div>

          <div
            style={{
              fontSize: 15,
              color: EQUITAS_THEME.colors.primaryTeal,
              fontWeight: 800,
              letterSpacing: "1px",
              marginBottom: 14,
            }}
          >
            EQUITAS SFB GOVERNANCE COMMITTEE
          </div>

          <div
            style={{
              fontSize: 16,
              color: EQUITAS_THEME.colors.textSecondary,
              lineHeight: 1.45,
            }}
          >
            Formal prior intimation submitted under SEBI & Companies Act LODR statutory governance.
          </div>
        </div>

        {/* Pillar 2: Reserve Bank of India - Pops on "and the RBI" */}
        <div
          style={{
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            opacity: rbiSpring,
            transform: `translateY(${interpolate(rbiSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          {/* Authentic Photograph of RBI Headquarters */}
          <div
            style={{
              width: "100%",
              height: 120,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Img
              src={staticFile("assets/equitas/photographs/rbi_headquarters_mumbai.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 12,
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                padding: "4px 10px",
                borderRadius: 6,
                fontSize: 12,
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              RBI HQ, Mumbai
            </div>
          </div>

          <div style={{ padding: "20px 24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 6,
              }}
            >
              <Img
                src={staticFile("assets/equitas/company_logos/rbi_seal.svg")}
                style={{ width: 26, height: 26 }}
              />
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: EQUITAS_THEME.colors.textPrimary,
                }}
              >
                RESERVE BANK OF INDIA
              </span>
            </div>

            <div
              style={{
                fontSize: 15,
                color: EQUITAS_THEME.colors.primaryTeal,
                fontWeight: 800,
                letterSpacing: "1px",
                marginBottom: 10,
              }}
            >
              BANKING SUPERVISION & REGULATION
            </div>

            <div
              style={{
                fontSize: 16,
                color: EQUITAS_THEME.colors.textSecondary,
                lineHeight: 1.45,
              }}
            >
              Full formal disclosure registered in advance under strict banking compliance rules.
            </div>
          </div>
        </div>
      </div>

      {/* Formal Disclosure Stamp Slam - Pops on "strict banking compliance rules" */}
      {relFrame >= 355 && (
        <div
          style={{
            marginTop: 36,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: `2.5px solid ${EQUITAS_THEME.colors.primaryTeal}`,
              borderRadius: 18,
              padding: "16px 40px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: stampSpring,
              transform: `scale(${interpolate(stampSpring, [0, 1], [1.2, 1])})`,
              boxShadow: "0 15px 35px rgba(0, 89, 83, 0.20)",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: EQUITAS_THEME.colors.primaryTeal,
              }}
            />
            <div
              style={{
                fontSize: 20, // Bold mobile font
                fontWeight: 900,
                letterSpacing: "1.5px",
                color: EQUITAS_THEME.colors.primaryTeal,
                textTransform: "uppercase",
              }}
            >
              PRIOR FORMAL DISCLOSURE ON STATUTORY RECORD
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
