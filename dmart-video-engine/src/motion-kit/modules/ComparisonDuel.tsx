import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface CompetitorData {
  name: string;
  badge?: string;
  metrics: Array<{ label: string; value: string; isHighlight?: boolean }>;
  isWinner?: boolean;
}

export interface ComparisonDuelProps {
  leftCompetitor: CompetitorData;
  rightCompetitor: CompetitorData;
  title?: string;
}

export const ComparisonDuel: React.FC<ComparisonDuelProps> = ({
  leftCompetitor,
  rightCompetitor,
  title,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left card slides from left
  const leftEntrance = spring({
    frame,
    fps,
    config: SAN_TOKENS.springs.smooth,
  });
  const leftX = interpolate(leftEntrance, [0, 1], [-60, 0]);
  const leftOpacity = interpolate(leftEntrance, [0, 1], [0, 1]);

  // Right card slides from right
  const rightEntrance = spring({
    frame: frame - 6,
    fps,
    config: SAN_TOKENS.springs.smooth,
  });
  const rightX = interpolate(rightEntrance, [0, 1], [60, 0]);
  const rightOpacity = interpolate(rightEntrance, [0, 1], [0, 1]);

  // VS badge pop
  const vsEntrance = spring({
    frame: frame - 12,
    fps,
    config: SAN_TOKENS.springs.pop,
  });
  const vsScale = interpolate(vsEntrance, [0, 1], [0, 1]);

  const renderCard = (data: CompetitorData, transform: string, opacity: number) => {
    const borderColor = data.isWinner
      ? SAN_TOKENS.colors.gold
      : SAN_TOKENS.colors.borderSubtle;
    const shadowGlow = data.isWinner
      ? "0 0 30px rgba(255, 215, 0, 0.2)"
      : "0 15px 40px rgba(0, 0, 0, 0.5)";

    return (
      <div
        style={{
          flex: 1,
          backgroundColor: SAN_TOKENS.colors.surfaceCard,
          border: `2px solid ${borderColor}`,
          borderRadius: 20,
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          transform,
          opacity,
          boxShadow: shadowGlow,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 32, fontWeight: 900, color: SAN_TOKENS.colors.textPrimary, margin: 0 }}>
            {data.name}
          </h3>
          {data.badge && (
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: data.isWinner ? SAN_TOKENS.colors.gold : SAN_TOKENS.colors.textMuted,
                backgroundColor: data.isWinner ? SAN_TOKENS.colors.goldSubtle : SAN_TOKENS.colors.surfaceHighlight,
                padding: "4px 12px",
                borderRadius: 999,
              }}
            >
              {data.badge}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {data.metrics.map((m, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "10px 14px",
                borderRadius: 10,
                backgroundColor: m.isHighlight ? "rgba(255, 215, 0, 0.08)" : "transparent",
                borderBottom: `1px solid ${SAN_TOKENS.colors.borderSubtle}`,
              }}
            >
              <span style={{ fontSize: 18, color: SAN_TOKENS.colors.textMuted, fontWeight: 500 }}>
                {m.label}
              </span>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: m.isHighlight ? SAN_TOKENS.colors.gold : SAN_TOKENS.colors.textPrimary,
                  fontFamily: SAN_TOKENS.fonts.numbers,
                }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "20px",
        fontFamily: SAN_TOKENS.fonts.primary,
        position: "relative",
      }}
    >
      {title && (
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: SAN_TOKENS.colors.cyan,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 20,
          }}
        >
          {title}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "stretch",
          position: "relative",
        }}
      >
        {renderCard(leftCompetitor, `translateX(${leftX}px)`, leftOpacity)}

        {/* Center VS Badge */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${vsScale})`,
            zIndex: 10,
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: SAN_TOKENS.colors.bgDark,
            border: `2px solid ${SAN_TOKENS.colors.gold}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)",
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: SAN_TOKENS.colors.gold,
              fontFamily: SAN_TOKENS.fonts.display,
            }}
          >
            VS
          </span>
        </div>

        {renderCard(rightCompetitor, `translateX(${rightX}px)`, rightOpacity)}
      </div>
    </div>
  );
};
