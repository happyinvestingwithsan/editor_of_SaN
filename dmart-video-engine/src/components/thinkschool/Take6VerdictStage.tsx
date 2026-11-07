import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take6VerdictStageProps {
  localFrame: number;
}

export const Take6VerdictStage: React.FC<Take6VerdictStageProps> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Screen entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Lower Third for Opening (localFrame 0 - 241)
  const lowerThirdSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Frame 241: Exact frame the word "NO." is spoken
  const stampSpring = spring({
    frame: Math.max(0, localFrame - 241),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Camera micro-shake on the stamp slam (frames 241 - 251)
  const shakeOffset =
    localFrame >= 241 && localFrame <= 251
      ? Math.sin((localFrame - 241) * 2.5) * (251 - localFrame) * 0.8
      : 0;

  // Jio Asset Scorecard entrance at localFrame 355 ("My decision not to apply...")
  const scorecardSpring = spring({
    frame: Math.max(0, localFrame - 355),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Item 1: Dominance at localFrame 526 (word: "dominant")
  const item1Spring = spring({
    frame: Math.max(0, localFrame - 526),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Item 2: Cash Machine at localFrame 555 (word: "cash")
  const item2Spring = spring({
    frame: Math.max(0, localFrame - 555),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Item 3: Valuation at localFrame 592 (word: "valued")
  const item3Spring = spring({
    frame: Math.max(0, localFrame - 592),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070B12",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
        opacity: enterSpring,
        transform: `translateY(${shakeOffset}px)`,
      }}
    >
      {/* Background Subtle Tech Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* PHASE 1: Lower Third Badge (Frames 0 - 241) */}
      {localFrame < 241 && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: "50%",
            transform: `translateX(-50%) translateY(${interpolate(
              lowerThirdSpring,
              [0, 1],
              [40, 0]
            )}px)`,
            opacity: lowerThirdSpring,
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "rgba(11, 14, 20, 0.85)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            borderRadius: 16,
            padding: "16px 32px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              boxShadow: "0 0 12px #EF4444",
            }}
          />
          <span
            style={{
              color: "#F3F4F6",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            FINAL VERDICT // RELIANCE JIO IPO
          </span>
        </div>
      )}

      {/* PHASE 2: The "NO" Stamp Slam (Frames 241 - 355) */}
      {localFrame >= 241 && localFrame < 355 && (
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 260,
            width: 980,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              transform: `scale(${interpolate(stampSpring, [0, 1], [2.2, 1.0])}) rotate(${interpolate(
                stampSpring,
                [0, 1],
                [-8, -3]
              )}deg)`,
              opacity: interpolate(stampSpring, [0, 0.2, 1], [0, 1, 1]),
              border: "6px solid #EF4444",
              borderRadius: 24,
              padding: "36px 64px",
              background: "rgba(239, 68, 68, 0.08)",
              boxShadow: "0 20px 60px rgba(239, 68, 68, 0.3), inset 0 0 40px rgba(239, 68, 68, 0.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#9CA3AF",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 3,
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              WILL I APPLY FOR JIO IPO?
            </div>
            <div
              style={{
                color: "#EF4444",
                fontSize: 108,
                fontWeight: 900,
                letterSpacing: 6,
                textShadow: "0 0 30px rgba(239, 68, 68, 0.6)",
              }}
            >
              ❌ NO.
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: Jio Asset Scorecard (Frames 355 - 721) */}
      {localFrame >= 355 && (
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 100,
            width: 1100,
            opacity: scorecardSpring,
            transform: `translateX(${interpolate(scorecardSpring, [0, 1], [-40, 0])}px)`,
          }}
        >
          {/* Header pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(212, 175, 55, 0.15)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              borderRadius: 12,
              padding: "10px 22px",
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 22 }}>⭐</span>
            <span
              style={{
                color: "#FACC15",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              ASSET INTEGRITY: 100% UNQUESTIONED
            </span>
          </div>

          <h2
            style={{
              color: "#F3F4F6",
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: 36,
            }}
          >
            India's Most Dominant Mega-Cap Asset
          </h2>

          {/* 3 Metric Pillar Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Card 1: Dominance */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 18,
                padding: "24px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: item1Spring,
                transform: `translateX(${interpolate(item1Spring, [0, 1], [30, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 36 }}>👑</span>
                <div>
                  <div style={{ color: "#F3F4F6", fontSize: 26, fontWeight: 700 }}>
                    Market Dominance
                  </div>
                  <div style={{ color: "#9CA3AF", fontSize: 18 }}>
                    #1 Digital & Telecom Titan (53+ Cr Subscribers)
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10B981",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  padding: "8px 18px",
                  borderRadius: 12,
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                UNRIVALED
              </div>
            </div>

            {/* Card 2: Cash Machine */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 18,
                padding: "24px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: item2Spring,
                transform: `translateX(${interpolate(item2Spring, [0, 1], [30, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 36 }}>💰</span>
                <div>
                  <div style={{ color: "#F3F4F6", fontSize: 26, fontWeight: 700 }}>
                    Cash Machine
                  </div>
                  <div style={{ color: "#9CA3AF", fontSize: 18 }}>
                    ₹65,000+ Cr Operating EBITDA Run-rate
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "rgba(212, 175, 55, 0.15)",
                  color: "#FACC15",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  padding: "8px 18px",
                  borderRadius: 12,
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                CASH RICH
              </div>
            </div>

            {/* Card 3: Fair Valuation */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 18,
                padding: "24px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: item3Spring,
                transform: `translateX(${interpolate(item3Spring, [0, 1], [30, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 36 }}>⚖️</span>
                <div>
                  <div style={{ color: "#F3F4F6", fontSize: 26, fontWeight: 700 }}>
                    Fair Valuation Multiples
                  </div>
                  <div style={{ color: "#9CA3AF", fontSize: 18 }}>
                    ~10.3 Lakh Cr Market Cap (12-14x EV/EBITDA vs Global 15x+)
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "rgba(59, 130, 246, 0.15)",
                  color: "#60A5FA",
                  border: "1px solid rgba(59, 130, 246, 0.4)",
                  padding: "8px 18px",
                  borderRadius: 12,
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                FAIR MULTIPLE
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
