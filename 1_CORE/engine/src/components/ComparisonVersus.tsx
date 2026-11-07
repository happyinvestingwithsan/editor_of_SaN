import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ComparisonItem {
  name: string;
  points: string[];
  verdict: "APPLY" | "AVOID" | "HOLD";
  isWinner: boolean;
}

export interface ComparisonVersusProps {
  itemA?: ComparisonItem;
  itemB?: ComparisonItem;
  startFrame?: number;
  stampFrame?: number;
}

export const ComparisonVersus: React.FC<ComparisonVersusProps> = ({
  itemA = {
    name: "JIO IPO",
    points: ["₹30,213 Cr Scale", "450M+ Subscribers", "ARPU Growing 12%"],
    verdict: "APPLY",
    isWinner: true,
  },
  itemB = {
    name: "PEER TELECOM",
    points: ["High Debt Load", "Capex Strain", "Stagnant ARPU"],
    verdict: "AVOID",
    isWinner: false,
  },
  startFrame = 0,
  stampFrame = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEntrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const stampEntrance = spring({
    frame: frame - stampFrame,
    fps,
    config: { damping: 9, stiffness: 150 }, // Bouncy rubber-stamp slam
  });

  return (
    <div
      style={{
        width: 960,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        opacity: cardEntrance,
        transform: `translateY(${interpolate(cardEntrance, [0, 1], [30, 0])}px)`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Item A (Winner) */}
      <div
        style={{
          backgroundColor: "#131924",
          border: "2px solid rgba(0, 208, 156, 0.4)",
          borderRadius: 24,
          padding: "32px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h3 style={{ fontSize: 28, fontWeight: 900, color: "#00D09C", margin: "0 0 16px 0" }}>
          {itemA.name}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {itemA.points.map((pt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: "#FFFFFF", fontWeight: 700 }}>
              <span style={{ color: "#00D09C", fontSize: 18 }}>✔</span>
              <span>{pt}</span>
            </div>
          ))}
        </div>

        {/* Rubber Stamp */}
        {frame >= stampFrame && (
          <div
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
              border: "4px solid #00D09C",
              color: "#00D09C",
              fontWeight: 900,
              fontSize: 28,
              padding: "6px 18px",
              borderRadius: 8,
              transform: `scale(${stampEntrance}) rotate(-12deg)`,
              opacity: stampEntrance,
              letterSpacing: "0.1em",
            }}
          >
            {itemA.verdict}
          </div>
        )}
      </div>

      {/* Item B (Avoid) */}
      <div
        style={{
          backgroundColor: "#131924",
          border: "2px solid rgba(255, 59, 48, 0.4)",
          borderRadius: 24,
          padding: "32px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h3 style={{ fontSize: 28, fontWeight: 900, color: "#FF3B30", margin: "0 0 16px 0" }}>
          {itemB.name}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {itemB.points.map((pt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: "#94A3B8", fontWeight: 700 }}>
              <span style={{ color: "#FF3B30", fontSize: 18 }}>✖</span>
              <span>{pt}</span>
            </div>
          ))}
        </div>

        {/* Rubber Stamp */}
        {frame >= stampFrame && (
          <div
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
              border: "4px solid #FF3B30",
              color: "#FF3B30",
              fontWeight: 900,
              fontSize: 28,
              padding: "6px 18px",
              borderRadius: 8,
              transform: `scale(${stampEntrance}) rotate(14deg)`,
              opacity: stampEntrance,
              letterSpacing: "0.1em",
            }}
          >
            {itemB.verdict}
          </div>
        )}
      </div>
    </div>
  );
};
