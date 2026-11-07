import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface ThinkSchoolTake02_Scene6_TreasuryVaultProps {
  localFrame: number;
}

export const ThinkSchoolTake02_Scene6_TreasuryVault: React.FC<
  ThinkSchoolTake02_Scene6_TreasuryVaultProps
> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Entrance spring
  const headerSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });


  // Staggered points
  const p1 = spring({
    frame: Math.max(0, localFrame - 40),
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const p2 = spring({
    frame: Math.max(0, localFrame - 70),
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const p3 = spring({
    frame: Math.max(0, localFrame - 100),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Golden Stamp slam
  const stampSpring = spring({
    frame: Math.max(0, localFrame - 140),
    fps,
    config: { damping: 11, stiffness: 180 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070B14",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header Banner */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 100,
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: 6,
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#10B981",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}
        >
          CHAPTER 2 CONCLUSION // 100% CAPITAL INTEGRITY
        </div>
        <h1
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Every Single Rupee Enters the{" "}
          <span style={{ color: "#10B981" }}>Company's Own Account</span>
        </h1>
      </div>

      {/* Main Treasury Flow Graphic (Left to Center-Right) */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 100,
          width: 1360,
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 40,
        }}
      >
        {/* Left: ₹30,000 Cr Issue Inflow Box */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(16, 185, 129, 0.6)",
            borderRadius: 20,
            padding: 30,
            boxShadow: "0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(16, 185, 129, 0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ color: "#10B981", fontSize: 14, fontWeight: 800, letterSpacing: "0.1em" }}>
            PUBLIC ISSUE CAPITAL
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 46, fontWeight: 900, marginTop: 8 }}>
            ₹30,000 CRORE
          </div>
          <div style={{ color: "#A7F3D0", fontSize: 16, fontWeight: 600, marginTop: 6 }}>
            100% Fresh Issue Proceeds
          </div>

          <div
            style={{
              marginTop: 24,
              padding: 16,
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              borderRadius: 12,
              border: "1px dashed rgba(16, 185, 129, 0.4)",
              color: "#E2E8F0",
              fontSize: 14,
            }}
          >
            Bank Escrow: <strong>SBI & HDFC Bank</strong>
            <br />
            Destination: <strong>Reliance Jio Infocomm Treasury</strong>
          </div>
        </div>

        {/* Right: The 3 Statutory Realities */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Point 1: Zero to Promoters */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1.5px solid rgba(239, 68, 68, 0.4)",
              borderRadius: 14,
              padding: "18px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: p1,
              transform: `translateX(${interpolate(p1, [0, 1], [30, 0])}px)`,
            }}
          >
            <div>
              <div style={{ color: "#FFF", fontSize: 18, fontWeight: 800 }}>Mukesh Ambani & Promoters</div>
              <div style={{ color: "#94A3B8", fontSize: 13 }}>No pocketing of public wealth</div>
            </div>
            <span
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "#EF4444",
                fontWeight: 900,
                fontSize: 18,
                padding: "6px 16px",
                borderRadius: 8,
              }}
            >
              ₹0 RECEIVED
            </span>
          </div>

          {/* Point 2: Zero to Silicon Valley */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1.5px solid rgba(239, 68, 68, 0.4)",
              borderRadius: 14,
              padding: "18px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: p2,
              transform: `translateX(${interpolate(p2, [0, 1], [30, 0])}px)`,
            }}
          >
            <div>
              <div style={{ color: "#FFF", fontSize: 18, fontWeight: 800 }}>Meta & Google Monopolies</div>
              <div style={{ color: "#94A3B8", fontSize: 13 }}>Zero emergency exit dump</div>
            </div>
            <span
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "#EF4444",
                fontWeight: 900,
                fontSize: 18,
                padding: "6px 16px",
                borderRadius: 8,
              }}
            >
              ₹0 RECEIVED
            </span>
          </div>

          {/* Point 3: 100% Fresh Issue into Debt Prepayment */}
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "2px solid #10B981",
              borderRadius: 14,
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: p3,
              transform: `translateX(${interpolate(p3, [0, 1], [30, 0])}px)`,
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.25)",
            }}
          >
            <div>
              <div style={{ color: "#FFF", fontSize: 20, fontWeight: 900 }}>
                100% Deployed into Balance Sheet
              </div>
              <div style={{ color: "#A7F3D0", fontSize: 14, marginTop: 2 }}>
                Prepaying ₹27,500 Cr Debt ➔ Eliminates ₹3,500 Cr/yr interest!
              </div>
            </div>
            <span
              style={{
                backgroundColor: "#10B981",
                color: "#000",
                fontWeight: 900,
                fontSize: 18,
                padding: "6px 18px",
                borderRadius: 8,
              }}
            >
              100% ACCRETIVE
            </span>
          </div>
        </div>
      </div>

      {/* Rubber Stamp Slam (Frame 140+) */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 100,
          transform: `rotate(-4deg) scale(${interpolate(stampSpring, [0, 1], [3, 1])})`,
          opacity: stampSpring,
          backgroundColor: "#10B981",
          color: "#000",
          border: "4px solid #FFFFFF",
          padding: "16px 36px",
          borderRadius: 14,
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: "0.08em",
          boxShadow: "0 20px 50px rgba(16, 185, 129, 0.6)",
          zIndex: 30,
        }}
      >
        ✔ ZERO PROMOTER CASHOUT // 100% BALANCE SHEET FORTIFIED
      </div>
    </div>
  );
};
