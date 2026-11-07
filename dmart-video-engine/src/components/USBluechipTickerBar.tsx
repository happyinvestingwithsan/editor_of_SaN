import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { StockTickerBadge } from "./StockTickerBadge";

export interface USBluechipTickerBarProps {
  startFrame?: number;
  durationFrames?: number;
}

export const USBluechipTickerBar: React.FC<USBluechipTickerBarProps> = ({
  startFrame = 60,
  durationFrames = 100, // frames 60 to 160
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  // Header badges spring
  const headerSpring = spring({
    frame: elapsed,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Exit animation in final 12 frames
  const exitProgress = interpolate(
    frame - (startFrame + durationFrames - 12),
    [0, 12],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const translateY = interpolate(exitProgress, [0, 1], [0, 40]);

  // Floating oscillation
  const floatY1 = Math.sin((elapsed) / 10) * 3;
  const floatY2 = Math.sin((elapsed + 8) / 10) * 3;
  const floatY3 = Math.sin((elapsed + 16) / 10) * 3;

  return (
    <div
      style={{
        position: "absolute",
        top: 260,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        zIndex: 35,
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Electric Blue Trust Badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
        }}
      >
        <div
          style={{
            backgroundColor: "#1A64F8", // IND Electric Blue
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: "0.1em",
            padding: "6px 16px",
            borderRadius: 100,
            boxShadow: "0 8px 24px rgba(26, 100, 248, 0.5)",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 10, color: "#93C5FD" }}>●</span>
          NEW FEATURE LIVE
        </div>

        <div
          style={{
            backgroundColor: "rgba(26, 100, 248, 0.15)",
            border: "1px solid rgba(26, 100, 248, 0.45)",
            color: "#60A5FA",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.08em",
            padding: "6px 16px",
            borderRadius: 100,
            textTransform: "uppercase",
          }}
        >
          DIRECT NASDAQ ACCESS
        </div>
      </div>

      {/* Stock Tickers Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
          maxWidth: 1000,
        }}
      >
        <div style={{ transform: `translateY(${floatY1}px)` }}>
          <StockTickerBadge
            symbol="AAPL"
            name="Apple Inc."
            price={235.5}
            changePercent={1.8}
            currencySymbol="$"
            startFrame={startFrame + 5}
            style={{
              padding: "8px 18px 8px 12px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)",
            }}
          />
        </div>

        <div style={{ transform: `translateY(${floatY2}px)` }}>
          <StockTickerBadge
            symbol="NVDA"
            name="Nvidia Corp."
            price={142.0}
            changePercent={3.4}
            currencySymbol="$"
            startFrame={startFrame + 14}
            style={{
              padding: "8px 18px 8px 12px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)",
            }}
          />
        </div>

        <div style={{ transform: `translateY(${floatY3}px)` }}>
          <StockTickerBadge
            symbol="TSLA"
            name="Tesla Inc."
            price={220.1}
            changePercent={4.2}
            currencySymbol="$"
            startFrame={startFrame + 23}
            style={{
              padding: "8px 18px 8px 12px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
