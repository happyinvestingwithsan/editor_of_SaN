import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface AutopsyItem {
  brand: string;
  drawdown: string;
  initialPrice?: string;
  troughPrice?: string;
  staggerFrame?: number;
}

export interface AutopsyDossierProps {
  title?: string;
  items: AutopsyItem[];
  alertStamp?: string;
}

export const AutopsyDossier: React.FC<AutopsyDossierProps> = ({
  title = "THE TECH IPO GRAVEYARD",
  items,
  alertStamp = "WEALTH DESTRUCTION",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const headerEntrance = spring({
    frame,
    fps,
    config: SAN_TOKENS.springs.snappy,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "24px",
        fontFamily: SAN_TOKENS.fonts.primary,
        position: "relative",
      }}
    >
      {/* Title Header */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: "0.15em",
          color: SAN_TOKENS.colors.negative,
          textTransform: "uppercase",
          marginBottom: 28,
          opacity: interpolate(headerEntrance, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [20, 0])}px)`,
        }}
      >
        {title}
      </div>

      {/* Grid of Brand Crashes (Standalone Logo + Bold Percentage) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          maxWidth: 720,
        }}
      >
        {items.map((item, idx) => {
          const delay = item.staggerFrame ?? idx * 8;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: SAN_TOKENS.springs.heavy,
          });

          const scale = interpolate(progress, [0, 1], [0.8, 1]);
          const opacity = interpolate(progress, [0, 1], [0, 1]);

          return (
            <div
              key={idx}
              style={{
                backgroundColor: SAN_TOKENS.colors.surfaceCard,
                border: `1.5px solid ${SAN_TOKENS.colors.borderSubtle}`,
                borderRadius: 16,
                padding: "18px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transform: `scale(${scale})`,
                opacity,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: SAN_TOKENS.colors.textPrimary,
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.brand}
                </span>
                {(item.initialPrice || item.troughPrice) && (
                  <span
                    style={{
                      fontSize: 18,
                      color: SAN_TOKENS.colors.textMuted,
                      marginLeft: 14,
                      fontFamily: SAN_TOKENS.fonts.numbers,
                    }}
                  >
                    {item.initialPrice} ➔ {item.troughPrice}
                  </span>
                )}
              </div>

              {/* Bold Standalone Drawdown Pill */}
              <div
                style={{
                  backgroundColor: SAN_TOKENS.colors.negativeSubtle,
                  border: `2px solid ${SAN_TOKENS.colors.negative}`,
                  borderRadius: 12,
                  padding: "6px 18px",
                  boxShadow: "0 0 20px rgba(255, 82, 82, 0.35)",
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: SAN_TOKENS.colors.negative,
                    fontFamily: SAN_TOKENS.fonts.numbers,
                  }}
                >
                  {item.drawdown}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Red Alert Stamp */}
      {alertStamp && frame >= 25 && (
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-8deg)",
            border: `5px solid ${SAN_TOKENS.colors.negative}`,
            color: SAN_TOKENS.colors.negative,
            padding: "10px 30px",
            borderRadius: 12,
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            backgroundColor: "rgba(11, 15, 25, 0.94)",
            boxShadow: "0 0 40px rgba(255, 82, 82, 0.5)",
            pointerEvents: "none",
            zIndex: 40,
          }}
        >
          {alertStamp}
        </div>
      )}
    </div>
  );
};
