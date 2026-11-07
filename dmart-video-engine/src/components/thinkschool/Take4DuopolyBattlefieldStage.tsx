import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take4DuopolyBattlefieldStageProps {
  localFrame: number;
}

export const Take4DuopolyBattlefieldStage: React.FC<Take4DuopolyBattlefieldStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Active from Frame 180 onwards (when SaN glides from Full-Screen into Left Column)
  if (localFrame < 180) {
    return null;
  }

  const activeFrame = localFrame - 180;

  // Entrance spring for main stage container
  const enterSpring = spring({
    frame: activeFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Frame 180 + 10: Rule card reveals right away
  const ruleCardSpring = spring({
    frame: activeFrame,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Frame 318 (activeFrame 138): Duopoly title and split divider
  const duopolySpring = spring({
    frame: Math.max(0, activeFrame - 130),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Frame 360 (activeFrame 180): Jio Card lights up
  const jioCardSpring = spring({
    frame: Math.max(0, activeFrame - 175),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Frame 413 (activeFrame 233): Airtel Card lights up
  const airtelCardSpring = spring({
    frame: Math.max(0, activeFrame - 228),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

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
        gap: 24,
        fontFamily: "'Inter', system-ui, sans-serif",
        transform: `translateY(${interpolate(enterSpring, [0, 1], [40, 0])}px)`,
        opacity: enterSpring,
      }}
    >
      {/* Top Editorial Rule Card */}
      <div
        style={{
          backgroundColor: "#0D1322",
          border: "1.5px solid rgba(212, 175, 55, 0.4)",
          borderRadius: 20,
          padding: "24px 32px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          transform: `scale(${interpolate(ruleCardSpring, [0, 1], [0.95, 1])})`,
          opacity: ruleCardSpring,
        }}
      >
        <div
          style={{
            color: "#D4AF37",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Institutional Investing Rule #1
        </div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F3F4F6",
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          "Never evaluate an asset in isolation; evaluate it against its closest listed alternative."
        </div>
      </div>

      {/* Duopoly Battlefield Cards */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#090E1A",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          boxShadow: "0 20px 45px rgba(0,0,0,0.7)",
        }}
      >
        {/* Arena Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: 16,
            opacity: duopolySpring,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                backgroundColor: "#EF4444",
                color: "#FFF",
                padding: "4px 12px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.1em",
              }}
            >
              DUOPOLY
            </span>
            <span style={{ color: "#E5E7EB", fontSize: 22, fontWeight: 700 }}>
              The Indian Telecom Arena
            </span>
          </div>
          <span style={{ color: "#9CA3AF", fontSize: 15 }}>
            Strict 2-Player Monopolistic Competition
          </span>
        </div>

        {/* 2-Titan Comparative Grid */}
        <div style={{ display: "flex", gap: 20, flex: 1 }}>
          {/* Reliance Jio Card */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 102, 255, 0.08)",
              border: "2px solid rgba(0, 102, 255, 0.6)",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform: `scale(${interpolate(jioCardSpring, [0, 1], [0.92, 1])})`,
              opacity: jioCardSpring,
              boxShadow: "0 0 30px rgba(0, 102, 255, 0.2)",
            }}
          >
            <div>
              <div
                style={{
                  color: "#38BDF8",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  marginBottom: 6,
                }}
              >
                THE MARKET LEADER (UPCOMING IPO)
              </div>
              <div style={{ color: "#FFF", fontSize: 32, fontWeight: 800 }}>
                Reliance Jio
              </div>
              <div style={{ color: "#93C5FD", fontSize: 16, marginTop: 4 }}>
                Jio Platforms Limited
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(0, 102, 255, 0.15)",
                padding: 16,
                borderRadius: 12,
                border: "1px solid rgba(0, 102, 255, 0.3)",
              }}
            >
              <div style={{ color: "#93C5FD", fontSize: 14 }}>Status</div>
              <div style={{ color: "#FFF", fontSize: 18, fontWeight: 700, marginTop: 2 }}>
                Mega Unlisted Tech Monopoly
              </div>
            </div>
          </div>

          {/* Versus Center Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#D4AF37",
              fontWeight: 900,
              fontSize: 20,
              opacity: duopolySpring,
            }}
          >
            VS
          </div>

          {/* Bharti Airtel Card */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              border: "2px solid rgba(239, 68, 68, 0.6)",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform: `scale(${interpolate(airtelCardSpring, [0, 1], [0.92, 1])})`,
              opacity: airtelCardSpring,
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.2)",
            }}
          >
            <div>
              <div
                style={{
                  color: "#F87171",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  marginBottom: 6,
                }}
              >
                THE LISTED BENCHMARK
              </div>
              <div style={{ color: "#FFF", fontSize: 32, fontWeight: 800 }}>
                Bharti Airtel
              </div>
              <div style={{ color: "#FCA5A5", fontSize: 16, marginTop: 4 }}>
                NSE / BSE: BHARTIARTL
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                padding: 16,
                borderRadius: 12,
                border: "1px solid rgba(239, 68, 68, 0.3)",
              }}
            >
              <div style={{ color: "#FCA5A5", fontSize: 14 }}>Status</div>
              <div style={{ color: "#FFF", fontSize: 18, fontWeight: 700, marginTop: 2 }}>
                Public Listed Benchmark
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
