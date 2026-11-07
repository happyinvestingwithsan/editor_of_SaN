import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";

export const StageScene07_FearVsGreed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left card entrance at f3175
  const fearSpring = spring({
    frame: frame - 3175,
    fps,
    config: HI_THEME.springs.smooth,
  });

  // Right card entrance at f3220
  const greedSpring = spring({
    frame: frame - 3220,
    fps,
    config: HI_THEME.springs.smooth,
  });

  // Bottom synthesis rule at f3300
  const ruleSpring = spring({
    frame: frame - 3300,
    fps,
    config: HI_THEME.springs.snappy,
  });

  if (frame < 3175 || frame > 3430) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 960,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "36px 40px",
        background: `radial-gradient(circle at 50% 30%, ${HI_THEME.colors.darkNavyElevated} 0%, ${HI_THEME.colors.darkNavy} 100%)`,
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          padding: "8px 22px",
          borderRadius: 999,
          backgroundColor: "rgba(255, 215, 0, 0.15)",
          border: `1.5px solid ${HI_THEME.colors.gold}`,
          color: HI_THEME.colors.gold,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        🧠 THE PSYCHOLOGICAL TRAP
      </div>

      <div
        style={{
          fontSize: 42,
          fontWeight: 900,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 24,
          fontFamily: HI_THEME.fonts.display,
        }}
      >
        Market Emotions vs Investor Reality
      </div>

      {/* Duel Comparison */}
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {/* Left: Fear Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 59, 48, 0.08)",
            border: `2px solid ${HI_THEME.colors.negativeRed}`,
            borderRadius: 20,
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transform: `scale(${fearSpring})`,
            boxShadow: "0 10px 30px rgba(255, 59, 48, 0.2)",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 4 }}>😱</div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: HI_THEME.colors.negativeRed,
              marginBottom: 8,
            }}
          >
            FEAR
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF", marginBottom: 10 }}>
            FALLING MARKET
          </div>
          <div style={{ fontSize: 17, color: "#CBD5E1", lineHeight: 1.35 }}>
            Hesitation • Panic Selling at bottoms • Paralysis when value is highest
          </div>
        </div>

        {/* Right: Greed Card */}
        {frame >= 3215 && (
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 208, 156, 0.08)",
              border: `2px solid ${HI_THEME.colors.positiveGreen}`,
              borderRadius: 20,
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transform: `scale(${greedSpring})`,
              boxShadow: "0 10px 30px rgba(0, 208, 156, 0.2)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 4 }}>🤑</div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: HI_THEME.colors.positiveGreen,
                marginBottom: 8,
              }}
            >
              GREED / FOMO
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF", marginBottom: 10 }}>
              RISING MARKET
            </div>
            <div style={{ fontSize: 17, color: "#CBD5E1", lineHeight: 1.35 }}>
              Chasing momentum • Buying overvalued peaks • Confused decision-making
            </div>
          </div>
        )}
      </div>

      {/* Synthesis Golden Rule */}
      {frame >= 3300 && (
        <div
          style={{
            marginTop: 24,
            padding: "14px 30px",
            borderRadius: 14,
            backgroundColor: HI_THEME.colors.glassNavy,
            border: `2px solid ${HI_THEME.colors.gold}`,
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: 800,
            textAlign: "center",
            transform: `scale(${ruleSpring})`,
            boxShadow: "0 8px 30px rgba(255, 215, 0, 0.25)",
          }}
        >
          <span style={{ color: HI_THEME.colors.negativeRed }}>FEAR ≠ DECISION</span> •{" "}
          <span style={{ color: HI_THEME.colors.positiveGreen }}>GREED ≠ DECISION</span>
          <div style={{ fontSize: 20, color: HI_THEME.colors.primaryLightTeal, marginTop: 4 }}>
            FRAMEWORK = DISCIPLINE
          </div>
        </div>
      )}
    </div>
  );
};
