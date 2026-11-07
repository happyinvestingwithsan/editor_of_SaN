import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface ThinkSchoolTake02_Scene2_OFSPlumbingProps {
  localFrame: number;
}

/**
 * Chunk 3: The Emergency Exit Door Plumbing
 * Full Canvas Mode with SaN in Circle PIP (Bottom-Left: x=60, y=700).
 * Relative Frames: 0 to 519 (Master Frames 632 to 1151 | 21.08s to 38.36s).
 */
export const ThinkSchoolTake02_Scene2_OFSPlumbing: React.FC<
  ThinkSchoolTake02_Scene2_OFSPlumbingProps
> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Master entrance
  const headerSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word-synced: Frame 155 (Master Frame 787: "who have entered at pennies")
  const penniesSpring = spring({
    frame: Math.max(0, localFrame - 140),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Word-synced: Frame 190 (Master Frame 822: "emergency exit door")
  const exitDoorSpring = spring({
    frame: Math.max(0, localFrame - 175),
    fps,
    config: { damping: 11, stiffness: 160 },
  });

  // Word-synced: Frame 326 (Master Frame 958: "dumping millions of inflated shares onto retail")
  const gateSpring = spring({
    frame: Math.max(0, localFrame - 300),
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  // Word-synced: Frame 439 (Master Frame 1071: "burning thousands of crores in cash")
  const burnSpring = spring({
    frame: Math.max(0, localFrame - 410),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070A10",
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
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header (Positioned at Top-Center) */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 450,
          right: 100,
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
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
          THE WEALTH TRANSFER MECHANISM
        </div>
        <h1
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          How OFS Functions as an{" "}
          <span style={{ color: "#22C55E" }}>"Emergency Exit Door"</span>
        </h1>
      </div>

      {/* =========================================================================
          THE PLUMBING CANVAS (Left 420px to 1840px)
          ========================================================================= */}
      
      {/* Retail Buyer Vault (Left side of diagram) */}
      <div
        style={{
          position: "absolute",
          left: 420,
          top: 180,
          width: 340,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "2px solid rgba(16, 185, 129, 0.5)",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32 }}>👨‍👩‍👧‍👦</span>
          <div>
            <div style={{ color: "#10B981", fontWeight: 800, fontSize: 12, letterSpacing: "0.08em" }}>
              RETAIL BIDDERS
            </div>
            <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: 20 }}>
              Optimistic Public Buyers
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            padding: 14,
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            borderRadius: 12,
            border: "1px dashed rgba(16, 185, 129, 0.3)",
          }}
        >
          <div style={{ color: "#94A3B8", fontSize: 13 }}>Capital Inflow</div>
          <div style={{ color: "#10B981", fontSize: 28, fontWeight: 900 }}>₹10,000+ Cr</div>
          <div style={{ color: "#A7F3D0", fontSize: 12, marginTop: 4 }}>
            Applying at inflated listing valuations
          </div>
        </div>
      </div>

      {/* SVG Connecting Flow Pipes */}
      <svg
        style={{
          position: "absolute",
          left: 760,
          top: 160,
          width: 320,
          height: 520,
          pointerEvents: "none",
        }}
      >
        {/* Pipe to VCs (Upper Path) */}
        <path
          d="M 20 120 C 120 120, 160 50, 300 50"
          fill="none"
          stroke="#22C55E"
          strokeWidth="8"
          strokeDasharray="12 6"
        />

        {/* Pipe to Company (Lower Path) */}
        <path
          d="M 20 120 C 120 120, 160 300, 300 300"
          fill="none"
          stroke="#475569"
          strokeWidth="8"
          strokeDasharray="8 6"
        />

        {/* Junction Circle */}
        <circle cx="20" cy="120" r="14" fill="#10B981" />
      </svg>

      {/* VC & PE Emergency Exit Destination (Upper Right) */}
      <div
        style={{
          position: "absolute",
          left: 1080,
          top: 150,
          right: 80,
          backgroundColor: "rgba(30, 27, 75, 0.85)",
          border: "2px solid rgba(34, 197, 94, 0.6)",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 24px 48px rgba(0,0,0,0.7)",
          transform: `scale(${interpolate(exitDoorSpring, [0, 1], [0.95, 1])})`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 30 }}>💼</span>
            <div>
              <div style={{ color: "#4ADE80", fontWeight: 800, fontSize: 12, letterSpacing: "0.1em" }}>
                WHERE 100% OF OFS CASH ESCAPES
              </div>
              <div style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 24 }}>
                Early VC & PE Funds
              </div>
            </div>
          </div>

          {/* Emergency Exit Sign (Lights up at Frame 190) */}
          <div
            style={{
              backgroundColor: "#16A34A",
              border: "2px solid #86EFAC",
              borderRadius: 8,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 20px rgba(22, 163, 74, 0.7)",
              opacity: exitDoorSpring,
            }}
          >
            <span style={{ fontSize: 16 }}>🏃</span>
            <span style={{ color: "#FFF", fontWeight: 900, fontSize: 13, letterSpacing: "0.05em" }}>
              EMERGENCY EXIT
            </span>
          </div>
        </div>

        {/* Pricing comparison */}
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.06)",
              opacity: penniesSpring,
              transform: `scale(${penniesSpring})`,
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 12 }}>Early Entry Price (Pennies)</div>
            <div style={{ color: "#FFF", fontSize: 22, fontWeight: 900 }}>₹5 – ₹15 / share</div>
          </div>
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              borderRadius: 10,
              border: "1px solid rgba(239, 68, 68, 0.3)",
              opacity: exitDoorSpring,
              transform: `scale(${exitDoorSpring})`,
            }}
          >
            <div style={{ color: "#FCA5A5", fontSize: 12 }}>Public Dump Price</div>
            <div style={{ color: "#EF4444", fontSize: 22, fontWeight: 900 }}>₹1,500 – ₹2,150 (150x)</div>
          </div>
        </div>

        <div style={{ marginTop: 12, color: "#FDA4AF", fontSize: 13, fontWeight: 600 }}>
          ⚡ Millions of shares offloaded directly into retail portfolios.
        </div>
      </div>

      {/* The Actual Operating Business (Bottom Right Path) */}
      <div
        style={{
          position: "absolute",
          left: 1080,
          top: 420,
          right: 80,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "2px solid rgba(148, 163, 184, 0.3)",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🏢</span>
            <div>
              <div style={{ color: "#94A3B8", fontWeight: 800, fontSize: 12, letterSpacing: "0.1em" }}>
                THE ACTUAL OPERATING COMPANY
              </div>
              <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: 22 }}>
                Company Bank Account
              </div>
            </div>
          </div>

          {/* Red Slammed Gate (Frame 326) */}
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              border: "1.5px solid #EF4444",
              borderRadius: 8,
              padding: "6px 14px",
              color: "#EF4444",
              fontWeight: 900,
              fontSize: 14,
              transform: `scale(${interpolate(gateSpring, [0, 1], [1.5, 1])})`,
              opacity: gateSpring,
            }}
          >
            ⛔ ₹0 RECEIVED
          </div>
        </div>

        {/* Furnace Cash Burn (Frame 439) */}
        <div
          style={{
            marginTop: 16,
            padding: "12px 16px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderRadius: 10,
            border: "1px dashed rgba(239, 68, 68, 0.3)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: burnSpring,
            transform: `scale(${burnSpring})`,
          }}
        >
          <div>
            <div style={{ color: "#94A3B8", fontSize: 12 }}>Underlying Cash Burn</div>
            <div style={{ color: "#EF4444", fontSize: 20, fontWeight: 900 }}>
              -₹2,000 to -₹4,000 Cr / Year (Burning Cash)
            </div>
          </div>
          <span style={{ fontSize: 28 }}>🔥</span>
        </div>
      </div>
    </div>
  );
};
