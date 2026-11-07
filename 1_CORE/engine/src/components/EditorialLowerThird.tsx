import React from "react";
import { HIFY_LIGHT_TOKENS } from "../theme";

interface EditorialLowerThirdProps {
  quote: string;
  subtext?: string;
  badge?: string;
  badgeColor?: string;
}

export const EditorialLowerThird: React.FC<EditorialLowerThirdProps> = ({
  quote,
  subtext,
  badge = "KEY TAKEAWAY",
  badgeColor = HIFY_LIGHT_TOKENS.brandGoldMuted,
}) => {
  return (
    <div
      style={{
        backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
        borderRadius: 14,
        border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            padding: "4px 8px",
            borderRadius: 6,
            backgroundColor: HIFY_LIGHT_TOKENS.surfaceCardSubtle,
            border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
            fontSize: 10,
            fontWeight: 800,
            color: badgeColor,
            fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {badge}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: HIFY_LIGHT_TOKENS.textPrimary }}>
          &ldquo;{quote}&rdquo;
        </div>
      </div>

      {subtext && (
        <div
          style={{
            fontSize: 11,
            fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
            fontWeight: 700,
            color: HIFY_LIGHT_TOKENS.textMuted,
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
};
