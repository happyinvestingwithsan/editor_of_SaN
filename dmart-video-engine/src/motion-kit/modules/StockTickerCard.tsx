import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface StockTickerCardProps {
  /** Company name, e.g. "Reliance Industries" or "Bharti Airtel" */
  companyName: string;
  /** Ticker symbol, e.g. "RELIANCE" or "BHARTIARTL" */
  ticker: string;
  /** Exchange badge, e.g. "NSE", "BSE", "NASDAQ" */
  exchange?: string;
  /** Stock price, e.g. "₹1,420.50" */
  price: string;
  /** Percentage change, e.g. "+3.4%" or "-18.2%" */
  changePercent: string;
  /** Whether the movement is positive or negative */
  isPositive?: boolean;
  /** Key valuation multiple or note (e.g. "PE: 34x" or "M-Cap: ₹10.3L Cr") */
  metricBadge?: string;
}

export const StockTickerCard: React.FC<StockTickerCardProps> = ({
  companyName,
  ticker,
  exchange = "NSE",
  price,
  changePercent,
  isPositive = true,
  metricBadge,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: SAN_TOKENS.springs.smooth,
  });

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const accentColor = isPositive
    ? SAN_TOKENS.colors.positive
    : SAN_TOKENS.colors.negative;

  return (
    <div
      style={{
        backgroundColor: SAN_TOKENS.colors.surfaceCard,
        border: `1.5px solid ${SAN_TOKENS.colors.borderGlow}`,
        borderRadius: 20,
        padding: "24px 32px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 720,
        boxShadow: `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px ${accentColor}22`,
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: SAN_TOKENS.fonts.primary,
      }}
    >
      {/* Top Row: Symbol & Exchange Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: SAN_TOKENS.colors.gold,
              backgroundColor: SAN_TOKENS.colors.goldSubtle,
              padding: "4px 10px",
              borderRadius: 6,
              letterSpacing: "0.08em",
            }}
          >
            {exchange}
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: SAN_TOKENS.colors.textPrimary,
              letterSpacing: "0.04em",
            }}
          >
            {ticker}
          </span>
        </div>

        {metricBadge && (
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: SAN_TOKENS.colors.cyan,
              backgroundColor: SAN_TOKENS.colors.cyanSubtle,
              padding: "6px 14px",
              borderRadius: 8,
              fontFamily: SAN_TOKENS.fonts.numbers,
            }}
          >
            {metricBadge}
          </span>
        )}
      </div>

      {/* Middle Row: Company Full Name */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: SAN_TOKENS.colors.textMuted,
          marginBottom: 16,
        }}
      >
        {companyName}
      </div>

      {/* Bottom Row: Live Price & Performance Pill */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: SAN_TOKENS.colors.textPrimary,
            fontFamily: SAN_TOKENS.fonts.numbers,
          }}
        >
          {price}
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: isPositive
              ? SAN_TOKENS.colors.positiveSubtle
              : SAN_TOKENS.colors.negativeSubtle,
            border: `1px solid ${accentColor}`,
            padding: "8px 18px",
            borderRadius: 12,
            boxShadow: `0 0 15px ${accentColor}33`,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: accentColor,
              fontFamily: SAN_TOKENS.fonts.numbers,
            }}
          >
            {changePercent}
          </span>
        </div>
      </div>
    </div>
  );
};
