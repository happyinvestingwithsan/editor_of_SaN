import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take6GoldenRuleStageProps {
  localFrame: number;
}

export const Take6GoldenRuleStage: React.FC<Take6GoldenRuleStageProps> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Screen entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Swing Trading badge at localFrame 170 (Abs Frame 1255 on "swing")
  const swingSpring = spring({
    frame: Math.max(0, localFrame - 170),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Master Rule Golden Card on spoken word "200DMA" (localFrame 277 = Abs Frame 1362)
  const ruleCardSpring = spring({
    frame: Math.max(0, localFrame - 277),
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // "I will NEVER take a decision" stamp on spoken word "never" (localFrame 389 = Abs Frame 1474)
  const neverDecideSpring = spring({
    frame: Math.max(0, localFrame - 389),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Zomato Case study dossier on spoken word "Zomato" (localFrame 543 = Abs Frame 1628)
  const zomatoDossierSpring = spring({
    frame: Math.max(0, localFrame - 543),
    fps,
    config: { damping: 14, stiffness: 100 },
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

      {/* Main Content Area on Left 65% (Facecam is on Right) */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 90,
          width: 1120,
        }}
      >
        {/* Category Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(212, 175, 55, 0.15)",
            border: "1px solid rgba(212, 175, 55, 0.5)",
            borderRadius: 12,
            padding: "10px 22px",
            marginBottom: 20,
            opacity: swingSpring,
          }}
        >
          <span style={{ fontSize: 20 }}>⚔️</span>
          <span
            style={{
              color: "#FACC15",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            DISCIPLINE FRAMEWORK // PATHWAY B
          </span>
        </div>

        <h2
          style={{
            color: "#F3F4F6",
            fontSize: 42,
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 28,
          }}
        >
          My Non-Negotiable Technical Discipline
        </h2>

        {/* Master Rule Golden Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(15, 23, 42, 0.9))",
            border: "2px solid rgba(212, 175, 55, 0.7)",
            borderRadius: 22,
            padding: "32px 40px",
            marginBottom: 24,
            opacity: ruleCardSpring,
            transform: `translateY(${interpolate(ruleCardSpring, [0, 1], [30, 0])}px)`,
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(212, 175, 55, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>⚡</span>
            <div
              style={{
                color: "#FACC15",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              TECHNICAL INVARIANT #1
            </div>
          </div>

          <div
            style={{
              color: "#FFFFFF",
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: 1,
              marginBottom: 16,
              textShadow: "0 0 25px rgba(212, 175, 55, 0.4)",
            }}
          >
            "NO 200 DMA = NO ENTRY."
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: neverDecideSpring,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#EF4444",
              }}
            />
            <div style={{ color: "#E5E7EB", fontSize: 20, fontWeight: 600 }}>
              Without seeing 200 DMA on the chart, I will <span style={{ color: "#EF4444", fontWeight: 800 }}>NEVER</span> take a decision.
            </div>
          </div>
        </div>

        {/* Real-World Case Study Teaser Card */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 18,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: zomatoDossierSpring,
            transform: `translateX(${interpolate(zomatoDossierSpring, [0, 1], [-30, 0])}px)`,
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              📊
            </div>
            <div>
              <div style={{ color: "#F3F4F6", fontSize: 22, fontWeight: 700 }}>
                Real-World Proof: The Case Study of ZOMATO
              </div>
              <div style={{ color: "#9CA3AF", fontSize: 16, marginTop: 4 }}>
                July 2021 IPO Frenzy ➔ Devastating 76% Crash ➔ 200 DMA Breakout to ₹280+
              </div>
            </div>
          </div>
          <div
            style={{
              color: "#EF4444",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              padding: "8px 18px",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            DISSECTING THE TRAP
          </div>
        </div>
      </div>
    </div>
  );
};
