import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface InvestigationHeaderProps {
  dossierNo: string;
  question: string;
  statusBadge?: string;
  isAffirmative?: boolean;
  startFrame?: number;
}

export const InvestigationHeader: React.FC<InvestigationHeaderProps> = ({
  dossierNo,
  question,
  statusBadge,
  isAffirmative = true,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  const headerSpring = spring({
    frame: relFrame,
    fps: 30,
    config: { damping: 18, stiffness: 120 },
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
        gap: 16,
        fontFamily: EQUITAS_THEME.fonts.display,
        opacity: headerSpring,
        transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "3px",
            color: EQUITAS_THEME.colors.primaryTeal,
            textTransform: "uppercase",
            background: EQUITAS_THEME.colors.softTeal,
            border: `1.5px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
            padding: "8px 20px",
            borderRadius: 8,
            boxShadow: EQUITAS_THEME.shadows.card,
          }}
        >
          {dossierNo}
        </span>

        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "2px",
            color: EQUITAS_THEME.colors.textSecondary,
            textTransform: "uppercase",
          }}
        >
          STATUTORY FORENSIC AUDIT
        </span>
      </div>

      <div
        style={{
          fontSize: 48, // Bold high-contrast for mobile readability
          fontWeight: 900,
          color: EQUITAS_THEME.colors.textPrimary,
          letterSpacing: "-0.5px",
          lineHeight: 1.15,
        }}
      >
        {question}
      </div>

      {statusBadge && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "#FFFFFF",
            border: `2px solid ${
              isAffirmative
                ? EQUITAS_THEME.colors.primaryTeal
                : EQUITAS_THEME.colors.warningAmber
            }`,
            padding: "10px 24px",
            borderRadius: 30,
            width: "fit-content",
            opacity: badgeSpring,
            transform: `scale(${interpolate(badgeSpring, [0, 1], [0.95, 1])})`,
            boxShadow: isAffirmative
              ? "0 10px 25px rgba(0, 89, 83, 0.15)"
              : "0 10px 25px rgba(217, 119, 6, 0.15)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: isAffirmative
                ? EQUITAS_THEME.colors.primaryTeal
                : EQUITAS_THEME.colors.warningAmber,
            }}
          />
          <span
            style={{
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: "1px",
              color: isAffirmative
                ? EQUITAS_THEME.colors.primaryTeal
                : EQUITAS_THEME.colors.warningAmber,
              textTransform: "uppercase",
            }}
          >
            {statusBadge}
          </span>
        </div>
      )}
    </div>
  );
};
