import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface ThinkSchoolTake02_Scene5_ValuationVaultProps {
  localFrame: number;
}

/**
 * Chunk 6: $120B Podiums & Unbooked Gains Vault
 * Right 68% Stage (x=660, w=1200) with SaN in Left 32% Tall Frame (x=40).
 * Relative Frames: 0 to 480 (Master Frames 2204 to 2684 | 73.46s to 89.48s).
 */
export const ThinkSchoolTake02_Scene5_ValuationVault: React.FC<
  ThinkSchoolTake02_Scene5_ValuationVaultProps
> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Header entrance
  const headerSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word-synced: Local Frame 50 (Master Frame 2254: "valued at over 120 billion dollars")
  const podium2026 = spring({
    frame: Math.max(0, localFrame - 30),
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Word-synced: Local Frame 288 (Master Frame 2492: "billions of unbooked profit")
  const profitSpring = spring({
    frame: Math.max(0, localFrame - 260),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Word-synced: Local Frame 452 (Master Frame 2656: "has not pressed the selling button")
  const vaultSpring = spring({
    frame: Math.max(0, localFrame - 430),
    fps,
    config: { damping: 11, stiffness: 180 },
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

      {/* Header Banner */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 50,
          right: 50,
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "5px 12px",
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
          2020 VS 2026 VALUATION EXPANSION
        </div>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          From <span style={{ color: "#94A3B8" }}>$65 Billion</span> to Over{" "}
          <span style={{ color: "#10B981" }}>$120 Billion</span>
        </h1>
      </div>

      {/* 3D Valuation Podiums (Left half of stage) */}
      <div
        style={{
          position: "absolute",
          left: 50,
          bottom: 80,
          width: 440,
          height: 520,
          display: "flex",
          alignItems: "flex-end",
          gap: 20,
        }}
      >
        {/* 2020 Baseline */}
        <div
          style={{
            width: 190,
            height: 260,
            backgroundColor: "#1E293B",
            border: "2px solid #475569",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 18,
          }}
        >
          <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 700 }}>2020 ENTRY</div>
          <div style={{ color: "#FFF", fontSize: 32, fontWeight: 900, marginTop: 4 }}>$65 B</div>
          <div style={{ color: "#64748B", fontSize: 12, marginTop: 2 }}>₹4.9 Lakh Cr</div>
        </div>

        {/* 2026 IPO Podium (Surges on Frame 50) */}
        <div
          style={{
            width: 230,
            height: interpolate(podium2026, [0, 1], [0, 460]),
            background: "linear-gradient(180deg, rgba(16, 185, 129, 0.3) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "2.5px solid #10B981",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 22,
            boxShadow: "0 20px 50px rgba(16, 185, 129, 0.3)",
          }}
        >
          <span
            style={{
              backgroundColor: "#10B981",
              color: "#000",
              fontWeight: 900,
              fontSize: 12,
              padding: "3px 10px",
              borderRadius: 6,
            }}
          >
            UPPER BAND ₹1,119
          </span>
          <div style={{ color: "#FFF", fontSize: 44, fontWeight: 900, marginTop: 10 }}>$120 B+</div>
          <div style={{ color: "#A7F3D0", fontSize: 15, fontWeight: 700, marginTop: 2 }}>
            ≈ ₹10.3 Lakh Cr
          </div>
          <div
            style={{
              marginTop: 18,
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              color: "#34D399",
              fontWeight: 800,
              fontSize: 15,
              padding: "5px 12px",
              borderRadius: 6,
            }}
          >
            ▲ +85% SURGE (~2X)
          </div>
        </div>
      </div>

      {/* Unbooked Profit Cards (Right half of stage) */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 530,
          right: 50,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          opacity: profitSpring,
          transform: `translateX(${interpolate(profitSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        {/* Meta Profit */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1.5px solid rgba(6, 104, 225, 0.5)",
            borderRadius: 14,
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: "#60A5FA", fontSize: 13, fontWeight: 800 }}>META PLATFORMS</div>
            <div style={{ color: "#94A3B8", fontSize: 13 }}>₹43,574 Cr ➔ ₹82,400 Cr+</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#34D399", fontSize: 22, fontWeight: 900 }}>+₹38,826 Cr</div>
            <div style={{ color: "#94A3B8", fontSize: 11 }}>Unbooked Profit</div>
          </div>
        </div>

        {/* Google Profit */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1.5px solid rgba(66, 133, 244, 0.5)",
            borderRadius: 14,
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: "#93C5FD", fontSize: 13, fontWeight: 800 }}>GOOGLE (ALPHABET)</div>
            <div style={{ color: "#94A3B8", fontSize: 13 }}>₹33,737 Cr ➔ ₹63,800 Cr+</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#34D399", fontSize: 22, fontWeight: 900 }}>+₹30,063 Cr</div>
            <div style={{ color: "#94A3B8", fontSize: 11 }}>Unbooked Profit</div>
          </div>
        </div>

        {/* Combined Profit Badge */}
        <div
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            border: "2px solid #10B981",
            borderRadius: 14,
            padding: 18,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#FFF", fontSize: 16, fontWeight: 800 }}>Combined Unbooked Profit:</span>
            <span style={{ color: "#10B981", fontSize: 26, fontWeight: 900 }}>&gt; ₹68,800 CRORE</span>
          </div>
          <div style={{ color: "#A7F3D0", fontSize: 13, marginTop: 4 }}>
            ≈ $8.25 Billion in pure profit ready to cash out today.
          </div>
        </div>
      </div>

      {/* Massive Vault Door Slam (Word-Synced at Frame 452) */}
      <div
        style={{
          position: "absolute",
          top: 410,
          left: 530,
          right: 50,
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          border: "2.5px solid #D4AF37",
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 20px 50px rgba(0,0,0,0.85), 0 0 30px rgba(212, 175, 55, 0.3)",
          transform: `scale(${interpolate(vaultSpring, [0, 1], [0.8, 1])})`,
          opacity: vaultSpring,
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 32 }}>🔒</span>
          <div>
            <div style={{ color: "#D4AF37", fontWeight: 900, fontSize: 13, letterSpacing: "0.1em" }}>
              ZERO SELLOFF PROTOCOL
            </div>
            <div style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 22, marginTop: 2 }}>
              Neither Meta Nor Google Sold 1 Share
            </div>
          </div>
        </div>
        <div style={{ marginTop: 10, color: "#CBD5E1", fontSize: 14, lineHeight: 1.4 }}>
          When global tech monopolies refuse to take ₹68,000 Cr profit, it proves they believe the compounding has just begun.
        </div>
      </div>
    </div>
  );
};
