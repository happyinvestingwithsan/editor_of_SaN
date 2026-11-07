import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface StockTickerBadgeProps {
  symbol?: string;
  name?: string;
  price?: number;
  changePercent?: number;
  startFrame?: number;
  currencySymbol?: string;
  style?: React.CSSProperties;
}

export const StockTickerBadge: React.FC<StockTickerBadgeProps> = ({
  symbol = "DMART",
  name = "Avenue Supermarts",
  price = 3940.5,
  changePercent = -4.35,
  startFrame = 0,
  currencySymbol = "$",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 110 },
  });

  const isPositive = changePercent >= 0;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        backgroundColor: "#131924",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 100,
        padding: "10px 24px 10px 14px",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4)",
        transform: `scale(${entrance})`,
        opacity: entrance,
        fontFamily: "'Inter', sans-serif",
        ...style,
      }}
    >
      {/* Ticker Icon Circle */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          backgroundColor: isPositive ? "#00D09C" : "#FF3B30",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
          fontWeight: 900,
          fontSize: 18,
        }}
      >
        {symbol.slice(0, 2)}
      </div>

      {/* Symbol & Name */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 18, fontWeight: 900, color: "#FFFFFF" }}>{symbol}</span>
        <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>{name}</span>
      </div>

      {/* Price */}
      <span
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: "#FFFFFF",
          fontFamily: "'JetBrains Mono', monospace",
          fontVariantNumeric: "tabular-nums",
          marginLeft: 12,
        }}
      >
        {currencySymbol}{price.toLocaleString(currencySymbol === "₹" ? "en-IN" : "en-US", { minimumFractionDigits: 2 })}
      </span>

      {/* Pill Badge */}
      <div
        style={{
          backgroundColor: isPositive ? "rgba(0, 208, 156, 0.18)" : "rgba(255, 59, 48, 0.18)",
          border: `1px solid ${isPositive ? "#00D09C" : "#FF3B30"}`,
          borderRadius: 100,
          padding: "4px 12px",
          color: isPositive ? "#00D09C" : "#FF3B30",
          fontWeight: 800,
          fontSize: 14,
        }}
      >
        {isPositive ? "▲ +" : "▼ "}
        {Math.abs(changePercent).toFixed(2)}%
      </div>
    </div>
  );
};
