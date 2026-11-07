import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";
import { InvestigationHeader } from "./InvestigationHeader";

interface EvidenceCounterProps {
  startFrame?: number;
}

export const EvidenceCounter: React.FC<EvidenceCounterProps> = ({
  startFrame = 2000,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Exact kinetic sentence snapping from Faster-Whisper:
  // startFrame = 2000 (Scene 4)
  // 2144: "The answer I found was no" (relFrame 144)
  // 2179: "zero loans" (relFrame 179)
  // 2217: "zero line of credits" (relFrame 217)
  // 2258: "zero inter-corporate deposits" (relFrame 258)

  const c1Spring = spring({
    frame: Math.max(0, relFrame - 179),
    fps: 30,
    config: { damping: 15, stiffness: 140 },
  });

  const c2Spring = spring({
    frame: Math.max(0, relFrame - 217),
    fps: 30,
    config: { damping: 15, stiffness: 140 },
  });

  const c3Spring = spring({
    frame: Math.max(0, relFrame - 258),
    fps: 30,
    config: { damping: 15, stiffness: 140 },
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
      }}
    >
      <InvestigationHeader
        dossierNo="INVESTIGATION 01"
        question="WAS THERE ANY ILLEGAL FUND DIVERSION?"
        statusBadge={relFrame >= 144 ? "VERIFIED: NO FUND DIVERSION REPORTED" : undefined}
        isAffirmative={true}
        startFrame={startFrame}
      />

      {/* Triple Zero Counter Display in Light Theme */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 28,
          marginTop: 48,
        }}
      >
        {/* Counter 1: Loans - Pops on "zero loans" */}
        <div
          style={{
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            padding: "36px 24px",
            textAlign: "center",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: c1Spring,
            transform: `scale(${interpolate(c1Spring, [0, 1], [0.85, 1])})`,
          }}
        >
          <div
            style={{
              fontSize: 104, // Enormous bold metric for mobile readability
              fontWeight: 900,
              color: EQUITAS_THEME.colors.primaryTeal,
              lineHeight: 1,
              fontFamily: EQUITAS_THEME.fonts.mono,
              marginBottom: 12,
            }}
          >
            0
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "1px",
              color: EQUITAS_THEME.colors.textPrimary,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            LOANS
          </div>
          <div
            style={{
              fontSize: 16,
              color: EQUITAS_THEME.colors.textSecondary,
              lineHeight: 1.4,
            }}
          >
            Zero Direct Loans or Credit Facilities
          </div>
        </div>

        {/* Counter 2: Lines of Credit - Pops on "zero line of credits" */}
        <div
          style={{
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            padding: "36px 24px",
            textAlign: "center",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: c2Spring,
            transform: `scale(${interpolate(c2Spring, [0, 1], [0.85, 1])})`,
          }}
        >
          <div
            style={{
              fontSize: 104,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.primaryTeal,
              lineHeight: 1,
              fontFamily: EQUITAS_THEME.fonts.mono,
              marginBottom: 12,
            }}
          >
            0
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "1px",
              color: EQUITAS_THEME.colors.textPrimary,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            LINES OF CREDIT
          </div>
          <div
            style={{
              fontSize: 16,
              color: EQUITAS_THEME.colors.textSecondary,
              lineHeight: 1.4,
            }}
          >
            Zero Overdraft or Treasury Lines
          </div>
        </div>

        {/* Counter 3: Inter-Corporate Deposits - Pops on "zero inter-corporate deposits" */}
        <div
          style={{
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 24,
            padding: "36px 24px",
            textAlign: "center",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: c3Spring,
            transform: `scale(${interpolate(c3Spring, [0, 1], [0.85, 1])})`,
          }}
        >
          <div
            style={{
              fontSize: 104,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.primaryTeal,
              lineHeight: 1,
              fontFamily: EQUITAS_THEME.fonts.mono,
              marginBottom: 12,
            }}
          >
            0
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "0.5px",
              color: EQUITAS_THEME.colors.textPrimary,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            INTER-CORP DEPOSITS
          </div>
          <div
            style={{
              fontSize: 16,
              color: EQUITAS_THEME.colors.textSecondary,
              lineHeight: 1.4,
            }}
          >
            Zero ICDs or Capital Transfers
          </div>
        </div>
      </div>

      {/* Qualification Footer */}
      <div
        style={{
          marginTop: 36,
          fontSize: 16, // Clear on mobile
          color: EQUITAS_THEME.colors.textSecondary,
          textAlign: "center",
        }}
      >
        Source: Equitas SFB Statutory Audit Filings & Confirmed Zero Mutual Financial Balance
      </div>
    </div>
  );
};
