import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface ThinkSchoolTake02_Scene1_GraveyardProps {
  localFrame: number;
}

export const ThinkSchoolTake02_Scene1_Graveyard: React.FC<
  ThinkSchoolTake02_Scene1_GraveyardProps
> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Entrance spring for headline (Frame 0 - 30)
  const headlineSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Plunging trajectory draw (Frames 30 - 180)
  const pathDraw = interpolate(localFrame, [20, 180], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Crash cards pop down precisely as SaN says "destroyed retailer's wealth" (Frame 211)
  const paytmSpring = spring({
    frame: Math.max(0, localFrame - 190),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const nykaaSpring = spring({
    frame: Math.max(0, localFrame - 210),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const swiggySpring = spring({
    frame: Math.max(0, localFrame - 230),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // Bottom alert banner (Frame 240)
  const bannerSpring = spring({
    frame: Math.max(0, localFrame - 240),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 660,
        top: 50,
        width: 1200,
        height: 980,
        backgroundColor: "rgba(11, 15, 23, 0.95)",
        borderRadius: 24,
        border: "1.5px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Blueprint Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header Tag & Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 50,
          right: 50,
          opacity: headlineSpring,
          transform: `translateY(${interpolate(headlineSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "5px 12px",
            borderRadius: 6,
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            color: "#EF4444",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}
        >
          HISTORICAL AUTOPSY // 2021 – 2024 TECH IPOS
        </div>
        <h1
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Why Past Startup IPOs{" "}
          <span style={{ color: "#EF4444", textDecoration: "underline" }}>
            Destroyed Retail Wealth
          </span>
        </h1>
      </div>

      {/* Plunging Trajectory SVG */}
      <svg
        style={{
          position: "absolute",
          left: 50,
          top: 170,
          width: 1100,
          height: 240,
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="60%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>
        <path
          d="M 20 20 Q 350 15, 600 100 T 1050 200"
          fill="none"
          stroke="url(#curveGrad)"
          strokeWidth="4"
          strokeDasharray="1100"
          strokeDashoffset={`${1100 - (1100 * pathDraw) / 100}`}
        />
      </svg>

      {/* 3 Crash Dossier Cards (Staggered on Frame 211) */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 50,
          right: 50,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {/* Paytm */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1.5px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: 20,
            opacity: paytmSpring,
            transform: `translateY(${interpolate(paytmSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#FFF", fontSize: 22, fontWeight: 900 }}>PAYTM</span>
            <span
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "#EF4444",
                fontWeight: 900,
                fontSize: 20,
                padding: "3px 10px",
                borderRadius: 6,
              }}
            >
              -71%
            </span>
          </div>
          <div style={{ marginTop: 12, color: "#94A3B8", fontSize: 14 }}>
            Issue: ₹2,150 ➔ Bottom: <strong style={{ color: "#EF4444" }}>₹438</strong>
          </div>
          <div style={{ marginTop: 10, color: "#EF4444", fontSize: 12, fontWeight: 600 }}>
            ⚠️ 100% Loss-Making OFS Dump
          </div>
        </div>

        {/* Nykaa */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1.5px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: 20,
            opacity: nykaaSpring,
            transform: `translateY(${interpolate(nykaaSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#FFF", fontSize: 22, fontWeight: 900 }}>NYKAA</span>
            <span
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "#EF4444",
                fontWeight: 900,
                fontSize: 20,
                padding: "3px 10px",
                borderRadius: 6,
              }}
            >
              -60%
            </span>
          </div>
          <div style={{ marginTop: 12, color: "#94A3B8", fontSize: 14 }}>
            Peak: ₹420+ ➔ Drawdown: <strong style={{ color: "#EF4444" }}>₹125</strong>
          </div>
          <div style={{ marginTop: 10, color: "#EF4444", fontSize: 12, fontWeight: 600 }}>
            ⚠️ PE Post-Listing Liquidity Exit
          </div>
        </div>

        {/* Swiggy */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1.5px solid rgba(245, 158, 11, 0.4)",
            borderRadius: 16,
            padding: 20,
            opacity: swiggySpring,
            transform: `translateY(${interpolate(swiggySpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#FFF", fontSize: 22, fontWeight: 900 }}>SWIGGY</span>
            <span
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                color: "#F59E0B",
                fontWeight: 900,
                fontSize: 16,
                padding: "3px 10px",
                borderRadius: 6,
              }}
            >
              SUBDUED
            </span>
          </div>
          <div style={{ marginTop: 12, color: "#94A3B8", fontSize: 14 }}>
            OFS Component: <strong style={{ color: "#F59E0B" }}>₹6,828 Cr (60%)</strong>
          </div>
          <div style={{ marginTop: 10, color: "#F59E0B", fontSize: 12, fontWeight: 600 }}>
            ⚠️ Massive Pre-IPO VC Cashout
          </div>
        </div>
      </div>

      {/* Aggregate Wealth Damage Alert Banner */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 50,
          right: 50,
          backgroundColor: "rgba(239, 68, 68, 0.12)",
          border: "1.5px solid rgba(239, 68, 68, 0.5)",
          borderRadius: 14,
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: bannerSpring,
          transform: `translateY(${interpolate(bannerSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 28 }}>🚨</span>
          <div>
            <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: 18 }}>
              AGGREGATE RETAIL WEALTH EROSION
            </div>
            <div style={{ color: "#FDA4AF", fontSize: 14 }}>
              Over ₹1,50,000 Crore disappeared within 12 months of public listing
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#EF4444",
            color: "#FFF",
            fontWeight: 900,
            fontSize: 14,
            padding: "8px 16px",
            borderRadius: 8,
            letterSpacing: "0.05em",
          }}
        >
          RETAIL TRAP
        </div>
      </div>
    </div>
  );
};
