import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HIFY_LIGHT_TOKENS } from "../theme";

interface MarketCapAllocationCardProps {
  startFrame?: number;
}

export const MarketCapAllocationCard: React.FC<MarketCapAllocationCardProps> = ({
  startFrame = 2438,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Timed sequential reveals matching spoken words:
  // Large-cap 5% at frame 2777
  // Mid-cap 3% at frame 2862
  // Small-cap 1.5% at frame 3015
  const largeCapSpring = spring({
    frame: frame - 2770,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const midCapSpring = spring({
    frame: frame - 2860,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const smallCapSpring = spring({
    frame: frame - 3010,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const tiers = [
    {
      category: "Large-Cap",
      allocation: "5.0%",
      amountExample: "₹50,000 on ₹10L",
      probabilityRuin: "Lower Relative Ruin Probability",
      description: "Established balance sheets and deep market presence. Maximum allocation ceiling.",
      springVal: frame >= 2770 ? largeCapSpring : 0.4,
      isHighlighted: frame >= 2770 && frame < 2860,
      accent: HIFY_LIGHT_TOKENS.metricPositive,
      barWidthPercent: 100, // 5% is base 100% of scale
    },
    {
      category: "Mid-Cap",
      allocation: "3.0%",
      amountExample: "₹30,000 on ₹10L",
      probabilityRuin: "Moderate Volatility & Business Risk",
      description: "Higher growth potential with higher earnings variability. Scaled back accordingly.",
      springVal: frame >= 2860 ? midCapSpring : 0.4,
      isHighlighted: frame >= 2860 && frame < 3010,
      accent: HIFY_LIGHT_TOKENS.brandGold,
      barWidthPercent: 60, // 3% / 5% = 60%
    },
    {
      category: "Small-Cap",
      allocation: "1.5%",
      amountExample: "₹15,000 on ₹10L",
      probabilityRuin: "Highest Fragility & Liquidity Risk",
      description: "Substantial downside volatility and business mortality risk. Strict limit enforced.",
      springVal: frame >= 3010 ? smallCapSpring : 0.4,
      isHighlighted: frame >= 3010,
      accent: HIFY_LIGHT_TOKENS.brandGoldMuted,
      barWidthPercent: 30, // 1.5% / 5% = 30%
    },
  ];

  return (
    <div
      style={{
        backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
        borderRadius: 18,
        border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
        padding: "24px 32px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.03)",
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {/* Top Banner: First Principle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 12,
          borderBottom: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
        }}
      >
        <div>
          <span
            style={{
              padding: "3px 8px",
              borderRadius: 6,
              backgroundColor: "rgba(244, 63, 94, 0.08)",
              border: `1px solid rgba(244, 63, 94, 0.25)`,
              fontSize: 11,
              fontWeight: 800,
              color: HIFY_LIGHT_TOKENS.metricNegative,
              textTransform: "uppercase",
            }}
          >
            Capital Survival First Principle
          </span>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary, margin: "4px 0 2px 0" }}>
            Market-Cap Risk Hierarchy: Sized by Mortality Risk
          </h3>
          <p style={{ fontSize: 13, color: HIFY_LIGHT_TOKENS.textSecondary, margin: 0 }}>
            &ldquo;Any stock has the potential to go to zero... that is where we put our maximum allocation percentage.&rdquo;
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: 11, color: HIFY_LIGHT_TOKENS.textMuted, fontStyle: "italic" }}>
            Illustrative framework described by the speaker
          </span>
        </div>
      </div>

      {/* 3 Unified White Cards for Large, Mid, and Small Cap */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {tiers.map((tier) => {
          return (
            <div
              key={tier.category}
              style={{
                backgroundColor: tier.isHighlighted
                  ? HIFY_LIGHT_TOKENS.surfaceCard
                  : HIFY_LIGHT_TOKENS.surfaceCardSubtle,
                borderRadius: 14,
                border: tier.isHighlighted
                  ? `2px solid ${tier.accent}`
                  : `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: tier.isHighlighted ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
                transform: `scale(${interpolate(tier.springVal, [0, 1], [0.97, 1])})`,
                transition: "all 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: HIFY_LIGHT_TOKENS.textPrimary }}>
                    {tier.category}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: tier.accent,
                      fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                    }}
                  >
                    MAX CAP
                  </span>
                </div>

                {/* Big Percentage Metric */}
                <div
                  style={{
                    fontSize: 44,
                    fontWeight: 900,
                    fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics,
                    color: HIFY_LIGHT_TOKENS.textPrimary,
                    margin: "2px 0 6px 0",
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                  }}
                >
                  {tier.allocation}
                </div>

                <div style={{ fontSize: 12, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics, color: HIFY_LIGHT_TOKENS.textMuted, marginBottom: 12 }}>
                  {tier.amountExample}
                </div>

                {/* Relative Visual Size Bar */}
                <div
                  style={{
                    height: 6,
                    backgroundColor: HIFY_LIGHT_TOKENS.borderSubtle,
                    borderRadius: 999,
                    overflow: "hidden",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${tier.barWidthPercent}%`,
                      backgroundColor: tier.accent,
                      borderRadius: 999,
                    }}
                  />
                </div>

                <p style={{ fontSize: 12, color: HIFY_LIGHT_TOKENS.textSecondary, lineHeight: 1.45, margin: 0 }}>
                  {tier.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: 14,
                  padding: "8px 10px",
                  borderRadius: 8,
                  backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
                  border: `1px solid ${HIFY_LIGHT_TOKENS.borderSubtle}`,
                  fontSize: 11,
                  fontWeight: 600,
                  color: HIFY_LIGHT_TOKENS.textSecondary,
                }}
              >
                {tier.probabilityRuin}
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimers & Context */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: HIFY_LIGHT_TOKENS.textMuted }}>
        <span>
          Risk limits reflect risk of default and liquidity fragility across market segments.
        </span>
        <span style={{ fontWeight: 700, color: HIFY_LIGHT_TOKENS.textSecondary }}>
          SPEAKER FRAMEWORK • NOT UNIVERSAL FINANCIAL ADVICE
        </span>
      </div>
    </div>
  );
};
