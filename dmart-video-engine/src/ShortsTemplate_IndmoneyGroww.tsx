import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FinancialLineChart } from "./components/FinancialLineChart";
import { NewspaperHeadline } from "./components/NewspaperHeadline";
import { StockTickerBadge } from "./components/StockTickerBadge";
import { KineticWordCaptions } from "./components/KineticWordCaptions";
import { ComparisonVersus } from "./components/ComparisonVersus";

export const ShortsTemplate_IndmoneyGroww: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background subtle pulse / radial glow
  const bgGlow = interpolate(
    Math.sin(frame / 20),
    [-1, 1],
    [0.15, 0.25]
  );

  // Hook Title Entrance
  const hookSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Sample caption sequence aligned with the flow
  const sampleCaptions = [
    {
      start: 5,
      end: 45,
      words: [
        { word: "DMart", start: 5, end: 12 },
        { word: "is", start: 13, end: 18 },
        { word: "down", start: 19, end: 26 },
        { word: "43%", start: 27, end: 36 },
        { word: "already!", start: 37, end: 45 },
      ],
    },
    {
      start: 48,
      end: 95,
      words: [
        { word: "Even", start: 48, end: 55 },
        { word: "with", start: 56, end: 62 },
        { word: "18%", start: 63, end: 72 },
        { word: "sales", start: 73, end: 82 },
        { word: "growth...", start: 83, end: 95 },
      ],
    },
    {
      start: 98,
      end: 160,
      words: [
        { word: "Look", start: 98, end: 106 },
        { word: "at", start: 107, end: 114 },
        { word: "this", start: 115, end: 124 },
        { word: "brutal", start: 125, end: 138 },
        { word: "breakdown!", start: 139, end: 160 },
      ],
    },
    {
      start: 165,
      end: 240,
      words: [
        { word: "Is", start: 165, end: 175 },
        { word: "it", start: 176, end: 185 },
        { word: "an", start: 186, end: 195 },
        { word: "OPPORTUNITY", start: 196, end: 218 },
        { word: "or", start: 219, end: 228 },
        { word: "a", start: 229, end: 234 },
        { word: "TRAP?", start: 235, end: 240 },
      ],
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0F17",
        width: 1080,
        height: 1920,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Radial Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          background: `radial-gradient(circle, rgba(0, 208, 156, ${bgGlow}) 0%, rgba(26, 100, 248, ${bgGlow * 0.6}) 40%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Grid Pattern Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Top Header & Hook Headline (Y: 180 - 380) */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 60,
          right: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 20,
          transform: `scale(${hookSpring})`,
          opacity: hookSpring,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 59, 48, 0.15)",
            border: "1px solid rgba(255, 59, 48, 0.4)",
            color: "#FF3B30",
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: "0.12em",
            padding: "6px 16px",
            borderRadius: 100,
            textTransform: "uppercase",
          }}
        >
          Special Market Breakdown
        </div>

        <h1
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#FFFFFF",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.15,
            fontFamily: "'Inter', sans-serif",
            textShadow: "0 6px 20px rgba(0,0,0,0.8)",
          }}
        >
          IS DMART STILL <span style={{ color: "#00D09C" }}>EXPENSIVE?</span>
        </h1>

        {/* Stock Ticker Pill */}
        <div style={{ marginTop: 4 }}>
          <StockTickerBadge
            symbol="DMART"
            name="Avenue Supermarts"
            price={3940.5}
            changePercent={-43.2}
            startFrame={10}
          />
        </div>
      </div>

      {/* Center Dynamic Stage (Y: 580 - 1380) */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 15,
        }}
      >
        {/* Stage 1: Newspaper Article (Frames 0 to 110) */}
        {frame < 110 && (
          <NewspaperHeadline
            publication="THE ECONOMIC TIMES"
            date="MARKET UPDATE 2026"
            headlinePre="DMart Stock Crashes 43% From Highs, Even As "
            highlightedText="Revenue Jumps 18% YoY"
            headlinePost=" — Is Quick Commerce Eating Its High Margin Moat?"
            startFrame={0}
            highlightStartFrame={18}
            highlightDuration={24}
          />
        )}

        {/* Stage 2: Financial Line Chart (Frames 110 to 220) */}
        {frame >= 110 && frame < 220 && (
          <FinancialLineChart
            title="AVENUE SUPERMARTS (DMART)"
            subtitle="Drawdown Trajectory"
            lineColor="#FF3B30"
            isPositive={false}
            metricChange="-43.2%"
            startFrame={110}
            durationFrames={40}
            points={[
              { x: 50, y: 80 },
              { x: 220, y: 110 },
              { x: 420, y: 190 },
              { x: 620, y: 260 },
              { x: 780, y: 310 },
              { x: 920, y: 360 },
            ]}
            milestones={[
              { index: 0, label: "₹5,480", subtext: "All-Time High", isNegative: false },
              { index: 3, label: "Q2 Margin Hit", subtext: "-140 bps", isNegative: true },
              { index: 5, label: "₹3,940", subtext: "Crucial Support", isNegative: true },
            ]}
          />
        )}

        {/* Stage 3: Comparison / Battle Dilemma (Frames 220 onwards) */}
        {frame >= 220 && (
          <ComparisonVersus
            itemA={{
              name: "BULL CASE",
              points: ["Zero Debt Balance Sheet", "Consistent 18% Sales", "Store Count +45/Year"],
              verdict: "APPLY",
              isWinner: true,
            }}
            itemB={{
              name: "BEAR RISK",
              points: ["Blinkit/Zepto Pressure", "P/E Still Above 85x", "Margin Compression"],
              verdict: "AVOID",
              isWinner: false,
            }}
            startFrame={220}
            stampFrame={260}
          />
        )}
      </div>

      {/* Kinetic Word-by-Word Captions (Y: 1560) */}
      <KineticWordCaptions
        captions={sampleCaptions}
        highlightColor="#00D09C"
        fontSize={46}
        bottomPosition={260}
      />
    </AbsoluteFill>
  );
};
