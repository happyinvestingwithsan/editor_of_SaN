import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take4ArpuLeverageStageProps {
  localFrame: number;
}

export const Take4ArpuLeverageStage: React.FC<Take4ArpuLeverageStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Base ARPU ₹219 at localFrame 120 (~Frame 3050-3071 abs)
  const baseSpring = spring({
    frame: Math.max(0, localFrame - 120),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Target ARPU ₹300 at localFrame 180 (~Frame 3110-3129 abs)
  const targetSpring = spring({
    frame: Math.max(0, localFrame - 180),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // +₹10 hike bracket at localFrame 230 (~Frame 3160-3173 abs)
  const hikeSpring = spring({
    frame: Math.max(0, localFrame - 230),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // ₹5,000 Cr EBITDA Rocket at localFrame 310 (~Frame 3240-3265 abs)
  const ebitdaSpring = spring({
    frame: Math.max(0, localFrame - 310),
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.7 },
  });

  // Sahil 500ms Kinetic Slide Wipe at localFrame 439 (15 frames: 439 - 454)
  const wipeFrame = Math.max(0, localFrame - 439);
  const wipeProgress = interpolate(wipeFrame, [0, 15], [-1920, 1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showWipe = wipeFrame > 0;

  return (
    <>
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
                color: "#00E599",
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              OPERATING LEVERAGE MACHINE
            </span>
            <div style={{ color: "#FFF", fontSize: 24, fontWeight: 700, marginTop: 4 }}>
              ARPU Expansion & High-Operating-Leverage Flow
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
            FIXED COST BENEFIT
          </div>
        </div>

        {/* Main ARPU Leverage Container */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#080C16",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "36px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
          }}
        >
          {/* ARPU Staircase Step Progression */}
          <div style={{ display: "flex", gap: 24 }}>
            {/* Base Step: ₹219 */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#0D1322",
                border: "1.5px solid rgba(255,255,255,0.15)",
                borderRadius: 16,
                padding: 20,
                transform: `scale(${interpolate(baseSpring, [0, 1], [0.92, 1])})`,
                opacity: baseSpring,
              }}
            >
              <div style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 700 }}>
                CURRENT BASELINE
              </div>
              <div style={{ color: "#FFF", fontSize: 36, fontWeight: 800, marginTop: 4 }}>
                ₹219 <span style={{ fontSize: 16, color: "#9CA3AF" }}>/ month</span>
              </div>
              <div style={{ color: "#93C5FD", fontSize: 13, marginTop: 4 }}>
                Pre-tariff revision ARPU
              </div>
            </div>

            {/* Target Step: ₹300 */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#0D1322",
                border: "2px solid rgba(212, 175, 55, 0.6)",
                borderRadius: 16,
                padding: 20,
                transform: `scale(${interpolate(targetSpring, [0, 1], [0.92, 1])})`,
                opacity: targetSpring,
                boxShadow: "0 10px 30px rgba(212, 175, 55, 0.15)",
              }}
            >
              <div style={{ color: "#D4AF37", fontSize: 13, fontWeight: 800 }}>
                INDUSTRY TARGET HORIZON
              </div>
              <div style={{ color: "#FFF", fontSize: 36, fontWeight: 800, marginTop: 4 }}>
                ₹300 <span style={{ fontSize: 16, color: "#D4AF37" }}>/ month</span>
              </div>
              <div style={{ color: "#FDE68A", fontSize: 13, marginTop: 4 }}>
                Target telecom equilibrium
              </div>
            </div>
          </div>

          {/* Mathematical Multiplier Bracket */}
          <div
            style={{
              backgroundColor: "#0D1322",
              border: "1.5px solid rgba(56, 189, 248, 0.4)",
              borderRadius: 16,
              padding: "18px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `scale(${interpolate(hikeSpring, [0, 1], [0.92, 1])})`,
              opacity: hikeSpring,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  backgroundColor: "rgba(56, 189, 248, 0.2)",
                  color: "#38BDF8",
                  padding: "8px 16px",
                  borderRadius: 10,
                  fontSize: 20,
                  fontWeight: 900,
                }}
              >
                +₹10 ARPU
              </div>
              <div>
                <div style={{ color: "#FFF", fontSize: 17, fontWeight: 700 }}>
                  Incremental Tariff Step
                </div>
                <div style={{ color: "#93C5FD", fontSize: 14 }}>
                  53.3 Crore Users × ₹10/mo × 12 mo = ~₹6,400 Cr Gross Revenue
                </div>
              </div>
            </div>
            <div style={{ color: "#38BDF8", fontSize: 14, fontWeight: 700 }}>
              Zero marginal tower cost
            </div>
          </div>

          {/* Direct EBITDA Accretion Hero Banner */}
          <div
            style={{
              backgroundColor: "rgba(0, 229, 153, 0.12)",
              border: "3px solid #00E599",
              borderRadius: 18,
              padding: "24px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `scale(${interpolate(ebitdaSpring, [0, 1], [0.85, 1])})`,
              opacity: ebitdaSpring,
              boxShadow: "0 0 50px rgba(0, 229, 153, 0.3)",
            }}
          >
            <div>
              <div style={{ color: "#FFF", fontSize: 40, fontWeight: 900 }}>
                &gt; ₹5,000 CRORE
              </div>
              <div style={{ color: "#A7F3D0", fontSize: 16, marginTop: 4, fontWeight: 600 }}>
                Incremental Operating EBITDA Flowing Directly Into Bottom-Line
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
              }}
            >
              PURE OPERATING LEVERAGE
            </div>
          </div>
        </div>
      </div>

      {/* Sahil 500ms Kinetic Slide Wipe to Chapter 05 */}
      {showWipe && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1920,
            height: 1080,
            backgroundColor: "#EF4444",
            transform: `translateX(${wipeProgress}px)`,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "-20px 0 60px rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ textAlign: "center", color: "#FFF" }}>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.2em" }}>
              CHAPTER 05
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                marginTop: 8,
                letterSpacing: "-0.01em",
              }}
            >
              THE 4 HIDDEN RISKS NOBODY IS TELLING YOU
            </div>
          </div>
        </div>
      )}
    </>
  );
};
