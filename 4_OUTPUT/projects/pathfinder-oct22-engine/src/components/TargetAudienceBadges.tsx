import React from "react";
import { spring, interpolate } from "remotion";
import { Target, TrendingUp } from "lucide-react";

export interface TargetAudienceBadgesProps {
  frame: number;
  fps: number;
}

export const TargetAudienceBadges: React.FC<TargetAudienceBadgesProps> = ({ frame, fps }) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const scale = interpolate(enterSpring, [0, 1], [0.9, 1.0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "20px",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: "rgba(16, 185, 129, 0.15)",
          border: "1px solid rgba(16, 185, 129, 0.4)",
          color: "#34D399",
          padding: "6px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "16px",
          width: "fit-content",
          alignSelf: "center",
        }}
      >
        Ideal Community Fit
      </div>

      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "44px",
          fontWeight: 900,
          letterSpacing: "-1px",
          margin: "0 0 32px 0",
          fontFamily: "Inter, sans-serif",
          lineHeight: 1.15,
          textAlign: "center",
        }}
      >
        Built Specifically For:
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "860px" }}>
        {/* Card 1: Beginners */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))",
            border: "2px solid rgba(59, 130, 246, 0.4)",
            borderRadius: "20px",
            padding: "26px 32px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(59, 130, 246, 0.5)",
            }}
          >
            <Target size={32} color="#60A5FA" />
          </div>
          <div>
            <div style={{ color: "#FFFFFF", fontSize: "26px", fontWeight: 800 }}>
              Beginner Investors (0 – 2 Years)
            </div>
            <div style={{ color: "#94A3B8", fontSize: "16px", marginTop: "4px" }}>
              Eliminate costly rookie blunders, avoid penny-stock traps, and build conviction from Day 1.
            </div>
          </div>
        </div>

        {/* Card 2: Intermediates */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))",
            border: "2px solid rgba(245, 158, 11, 0.4)",
            borderRadius: "20px",
            padding: "26px 32px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(245, 158, 11, 0.5)",
            }}
          >
            <TrendingUp size={32} color="#FBBF24" />
          </div>
          <div>
            <div style={{ color: "#FFFFFF", fontSize: "26px", fontWeight: 800 }}>
              Intermediate Investors (2 – 5 Years)
            </div>
            <div style={{ color: "#94A3B8", fontSize: "16px", marginTop: "4px" }}>
              Refine valuation models, master operating leverage, and scale from single stocks to portfolio construction.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
