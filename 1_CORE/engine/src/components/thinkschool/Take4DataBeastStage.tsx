import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take4DataBeastStageProps {
  localFrame: number;
}

export const Take4DataBeastStage: React.FC<Take4DataBeastStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Odometer counter starts climbing at localFrame 20 (~Frame 2733 abs)
  const counterSpring = spring({
    frame: Math.max(0, localFrame - 20),
    fps,
    config: { damping: 13, stiffness: 85 },
  });

  // Global comparison pill pops at localFrame 150 (~Frame 2860 abs)
  const pillSpring = spring({
    frame: Math.max(0, localFrame - 150),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const animatedGB = (interpolate(counterSpring, [0, 1], [0, 43.7])).toFixed(1);

  return (
    <div
      style={{
        position: "absolute",
        left: 700,
        top: 70,
        width: 1160,
        height: 940,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: "'Inter', system-ui, sans-serif",
        transform: `translateY(${interpolate(enterSpring, [0, 1], [40, 0])}px)`,
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
              color: "#38BDF8",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            OPERATING METRIC 03
          </span>
          <div style={{ color: "#FFF", fontSize: 24, fontWeight: 700, marginTop: 4 }}>
            User Data Consumption & Network Monetization
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            border: "1px solid #38BDF8",
            color: "#38BDF8",
            padding: "8px 16px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          GLOBAL RECORD
        </div>
      </div>

      {/* Main Odometer Stage */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#080C16",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "48px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
          position: "relative",
        }}
      >
        <div style={{ color: "#9CA3AF", fontSize: 18, fontWeight: 600, letterSpacing: "0.1em" }}>
          AVERAGE MONTHLY DATA CONSUMPTION
        </div>

        {/* Hero Gigabytes Counter */}
        <div
          style={{
            color: "#FFF",
            fontSize: 108,
            fontWeight: 900,
            marginTop: 8,
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            textShadow: "0 0 50px rgba(56, 189, 248, 0.4)",
          }}
        >
          {animatedGB}
          <span style={{ fontSize: 44, fontWeight: 800, color: "#38BDF8" }}>GB</span>
        </div>

        <div style={{ color: "#BAE6FD", fontSize: 22, fontWeight: 700, marginTop: -8 }}>
          Per Active User / Month
        </div>

        {/* Global Benchmark Comparison Card */}
        <div
          style={{
            marginTop: 40,
            backgroundColor: "#0D1322",
            border: "1.5px solid rgba(212, 175, 55, 0.6)",
            borderRadius: 16,
            padding: "20px 32px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            transform: `scale(${interpolate(pillSpring, [0, 1], [0.9, 1])})`,
            opacity: pillSpring,
            boxShadow: "0 10px 30px rgba(212, 175, 55, 0.15)",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.2)",
              color: "#D4AF37",
              fontSize: 24,
              fontWeight: 900,
              padding: "12px 18px",
              borderRadius: 12,
            }}
          >
            ~3x
          </div>
          <div>
            <div style={{ color: "#D4AF37", fontSize: 18, fontWeight: 800 }}>
              Triple the Global Average (~12 - 15 GB/mo)
            </div>
            <div style={{ color: "#E5E7EB", fontSize: 14, marginTop: 4 }}>
              Jio operates as the essential digital backbone for streaming, payments, and commerce in India.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
