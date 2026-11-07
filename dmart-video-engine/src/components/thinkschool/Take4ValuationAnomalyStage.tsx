import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take4ValuationAnomalyStageProps {
  localFrame: number;
}

export const Take4ValuationAnomalyStage: React.FC<Take4ValuationAnomalyStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Advantage 1: Market share at localFrame 20 (~Frame 2328 abs)
  const adv1Spring = spring({
    frame: Math.max(0, localFrame - 20),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Advantage 2: 5G Standalone at localFrame 80 (~Frame 2388 abs)
  const adv2Spring = spring({
    frame: Math.max(0, localFrame - 80),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Advantage 3: Net profit at localFrame 150 (~Frame 2458 abs)
  const adv3Spring = spring({
    frame: Math.max(0, localFrame - 150),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // 30% Discount Hero Badge at localFrame 260 (~Frame 2568-2650 abs)
  const discountSpring = spring({
    frame: Math.max(0, localFrame - 260),
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.7 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 70,
        width: 1160,
        height: 940,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: "'Inter', system-ui, sans-serif",
        transform: `translateY(${interpolate(enterSpring, [0, 1], [25, 0])}px)`,
        opacity: enterSpring,
      }}
    >
      {/* Header Tag */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#0D1322",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "18px 28px",
        }}
      >
        <div>
          <span
            style={{
              color: "#00E599",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            THE VALUATION PARADOX
          </span>
          <div style={{ color: "#FFF", fontSize: 24, fontWeight: 700, marginTop: 4 }}>
            Dominant Market Leader Coming at an Arbitrage Discount
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(0, 229, 153, 0.15)",
            border: "1px solid #00E599",
            color: "#00E599",
            padding: "8px 16px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          RARE ARBITRAGE
        </div>
      </div>

      {/* Main Analysis Container */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#080C16",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "32px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
        }}
      >
        {/* 3 Pillars of Superiority */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Pillar 1 */}
          <div
            style={{
              backgroundColor: "#0D1322",
              border: "1.5px solid rgba(0, 102, 255, 0.5)",
              borderRadius: 14,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `translateX(${interpolate(adv1Spring, [0, 1], [-20, 0])}px)`,
              opacity: adv1Spring,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "#00E599", fontSize: 22, fontWeight: 900 }}>✔</span>
              <div>
                <div style={{ color: "#FFF", fontSize: 18, fontWeight: 700 }}>
                  Higher Absolute Market Share
                </div>
                <div style={{ color: "#93C5FD", fontSize: 14, marginTop: 2 }}>
                  53.3 Crore Subscribers (~40% of India) vs Airtel's 40.5 Crore
                </div>
              </div>
            </div>
            <span
              style={{
                backgroundColor: "rgba(0, 102, 255, 0.2)",
                color: "#38BDF8",
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              #1 POSITION
            </span>
          </div>

          {/* Pillar 2 */}
          <div
            style={{
              backgroundColor: "#0D1322",
              border: "1.5px solid rgba(0, 102, 255, 0.5)",
              borderRadius: 14,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `translateX(${interpolate(adv2Spring, [0, 1], [-20, 0])}px)`,
              opacity: adv2Spring,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "#00E599", fontSize: 22, fontWeight: 900 }}>✔</span>
              <div>
                <div style={{ color: "#FFF", fontSize: 18, fontWeight: 700 }}>
                  Largest True 5G Standalone (SA) Network
                </div>
                <div style={{ color: "#93C5FD", fontSize: 14, marginTop: 2 }}>
                  Pure Standalone 5G Core Architecture across 100% of Indian circles
                </div>
              </div>
            </div>
            <span
              style={{
                backgroundColor: "rgba(0, 102, 255, 0.2)",
                color: "#38BDF8",
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              TECH LEADER
            </span>
          </div>

          {/* Pillar 3 */}
          <div
            style={{
              backgroundColor: "#0D1322",
              border: "1.5px solid rgba(0, 102, 255, 0.5)",
              borderRadius: 14,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `translateX(${interpolate(adv3Spring, [0, 1], [-20, 0])}px)`,
              opacity: adv3Spring,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "#00E599", fontSize: 22, fontWeight: 900 }}>✔</span>
              <div>
                <div style={{ color: "#FFF", fontSize: 18, fontWeight: 700 }}>
                  Higher Consolidated Net Profits
                </div>
                <div style={{ color: "#93C5FD", fontSize: 14, marginTop: 2 }}>
                  Over ₹26,000 Crore annual PAT with industry-leading cash conversion
                </div>
              </div>
            </div>
            <span
              style={{
                backgroundColor: "rgba(0, 102, 255, 0.2)",
                color: "#38BDF8",
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              MAX CASHFLOW
            </span>
          </div>
        </div>

        {/* The 30% Valuation Discount Hero Banner */}
        <div
          style={{
            backgroundColor: "rgba(0, 229, 153, 0.12)",
            border: "3px solid #00E599",
            borderRadius: 18,
            padding: "24px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${interpolate(discountSpring, [0, 1], [0.85, 1])})`,
            opacity: discountSpring,
            boxShadow: "0 0 50px rgba(0, 229, 153, 0.3)",
          }}
        >
          <div>
            <div style={{ color: "#FFF", fontSize: 36, fontWeight: 900 }}>
              ~30% Valuation Discount
            </div>
            <div style={{ color: "#A7F3D0", fontSize: 16, marginTop: 4, fontWeight: 600 }}>
              Jio enters public market at 34x-35x P/E vs Bharti Airtel's 48x-52x trading multiple
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#00E599",
              color: "#000",
              padding: "10px 22px",
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.05em",
            }}
          >
            ~30% CHEAPER
          </div>
        </div>
      </div>
    </div>
  );
};
