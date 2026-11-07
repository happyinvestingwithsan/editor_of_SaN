import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take5SpeedboatVsTankerStageProps {
  localFrame: number;
}

export const Take5SpeedboatVsTankerStage: React.FC<Take5SpeedboatVsTankerStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // PART A: SMALLCAP SPEEDBOAT (Frames 0 - 330, relative to 956)
  // Frame 956 -> localFrame 0
  const smallcapSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // Smallcap rocket surge at localFrame 54 (Frame 1010)
  const surgeSpring = spring({
    frame: Math.max(0, localFrame - 54),
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Multiplier pills at localFrame 90
  const pillsSpring = spring({
    frame: Math.max(0, localFrame - 90),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // PART B: SUPERTANKER CAPITAL GRAVITY (Frames 330 - 625, relative to 956, starting at Frame 1286)
  // Transition occurs at localFrame 330 (Frame 1286)
  const isPartB = localFrame >= 330;
  const partBFrame = Math.max(0, localFrame - 330);

  const tankerSpring = spring({
    frame: partBFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Phantom pillar flicker and hover at partBFrame 56 (Frame 1360 - 1286 = 74)
  const phantomSpring = spring({
    frame: Math.max(0, partBFrame - 65),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Padlock clamp at partBFrame 176 (Frame 1480 - 1286 = 194)
  const lockSpring = spring({
    frame: Math.max(0, partBFrame - 180),
    fps,
    config: { damping: 9, stiffness: 170 },
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
        gap: 20,
        fontFamily: "'Inter', system-ui, sans-serif",
        transform: `translateY(${interpolate(enterSpring, [0, 1], [40, 0])}px)`,
        opacity: enterSpring,
      }}
    >
      {/* Top Header Card */}
      <div
        style={{
          backgroundColor: "#0D1322",
          border: "1.5px solid rgba(212, 175, 55, 0.4)",
          borderRadius: 20,
          padding: "20px 28px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              color: "#D4AF37",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Liquidity Physics
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#F3F4F6",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {isPartB ? "The ₹10 Lakh Crore Capital Trap" : "The Smallcap Agility Illusion"}
          </div>
        </div>

        <div
          style={{
            backgroundColor: isPartB ? "rgba(239, 68, 68, 0.15)" : "rgba(0, 229, 153, 0.15)",
            border: `1.5px solid ${isPartB ? "#EF4444" : "#00E599"}`,
            color: isPartB ? "#F87171" : "#00E599",
            fontSize: 13,
            fontWeight: 700,
            padding: "8px 16px",
            borderRadius: 20,
            letterSpacing: "0.06em",
          }}
        >
          {isPartB ? "MASSIVE CAPITAL BARRIER" : "TINY LIQUIDITY NEEDED"}
        </div>
      </div>

      {/* Main Canvas Body */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#0B101D",
          border: "1.5px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 24,
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* SUB-SCENE 3A: SMALLCAP SPEEDBOAT (localFrame < 330) */}
        {!isPartB && (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#9CA3AF", fontSize: 14, fontWeight: 600 }}>
                SCENARIO A: SMALLCAP LISTING DAY (₹500 CRORE VALUATION)
              </div>
              <div style={{ color: "#00E599", fontSize: 13, fontWeight: 700 }}>
                HIGH VELOCITY ASCENT
              </div>
            </div>

            {/* Visual Physics Area */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "20px 0",
              }}
            >
              {/* The Smallcap Pillar */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 280,
                  transform: `scale(${interpolate(smallcapSpring, [0, 1], [0.9, 1])})`,
                  opacity: smallcapSpring,
                }}
              >
                <div style={{ color: "#00E599", fontSize: 24, fontWeight: 900, marginBottom: 8 }}>
                  ₹500 CRORE
                </div>
                <div
                  style={{
                    width: 180,
                    height: 180 + 160 * surgeSpring,
                    background: "linear-gradient(to top, #064E3B, #00E599)",
                    border: "2px solid #00E599",
                    borderRadius: "16px 16px 0 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 35px rgba(0, 229, 153, 0.4)",
                  }}
                >
                  <span style={{ color: "#064E3B", fontSize: 18, fontWeight: 900 }}>
                    SMALLCAP
                  </span>
                  <span style={{ color: "#064E3B", fontSize: 13, fontWeight: 700 }}>
                    Tiny Float
                  </span>
                </div>
              </div>

              {/* Dynamic Rocket Multipliers & Liquidity Droplet */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 440 }}>
                <div
                  style={{
                    backgroundColor: "rgba(0, 229, 153, 0.12)",
                    border: "1.5px solid #00E599",
                    borderRadius: 16,
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    transform: `scale(${interpolate(pillsSpring, [0, 1], [0.9, 1])})`,
                    opacity: pillsSpring,
                  }}
                >
                  <span style={{ fontSize: 28 }}>⚡</span>
                  <div>
                    <div style={{ color: "#00E599", fontSize: 18, fontWeight: 800 }}>
                      +100% (2X) to +200% (3X) Surge
                    </div>
                    <div style={{ color: "#CBD5E1", fontSize: 13 }}>
                      Requires only ~₹100 Cr – ₹200 Cr fresh buying volume
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#111827",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 14,
                    padding: "14px 18px",
                    color: "#94A3B8",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  Because floating supply is tiny, even modest institutional inflows push the stock price into immediate upper circuits.
                </div>
              </div>
            </div>

            {/* Bottom Insight Pill */}
            <div
              style={{
                backgroundColor: "#0D1526",
                border: "1px solid rgba(0, 229, 153, 0.3)",
                borderRadius: 14,
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 18 }}>💡</span>
              <div style={{ color: "#F3F4F6", fontSize: 14, fontWeight: 600 }}>
                Low market cap + low liquidity = explosive Day-1 percentage gains.
              </div>
            </div>
          </div>
        )}

        {/* SUB-SCENE 3B: THE SUPERTANKER GRAVITY TRAP (localFrame >= 330) */}
        {isPartB && (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: tankerSpring,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#EF4444", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em" }}>
                SCENARIO B: JIO MEGA-CAP (₹10.3 LAKH CRORE VALUATION)
              </div>
              <div style={{ color: "#D4AF37", fontSize: 13, fontWeight: 700 }}>
                UNMATCHED GRAVITY
              </div>
            </div>

            {/* The Huge Monolith + Phantom Block */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "10px 0",
              }}
            >
              {/* Stacked Columns */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 320,
                  position: "relative",
                }}
              >
                {/* Phantom Required Capital (Flickering Block) */}
                <div
                  style={{
                    width: 240,
                    height: 160 * phantomSpring,
                    border: "2px dashed #EF4444",
                    backgroundColor: "rgba(239, 68, 68, 0.08)",
                    borderRadius: "16px 16px 0 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: interpolate(phantomSpring, [0, 1], [0, 0.85]),
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#EF4444", fontSize: 15, fontWeight: 800 }}>
                    +₹10 LAKH CRORE
                  </span>
                  <span style={{ color: "#FCA5A5", fontSize: 11, textAlign: "center", padding: "0 10px" }}>
                    FRESH CAPITAL NEEDED TO DOUBLE
                  </span>
                </div>

                {/* Base Goliath Monolith */}
                <div
                  style={{
                    width: 240,
                    height: 200,
                    background: "linear-gradient(to top, #1E293B, #0F172A)",
                    border: "2.5px solid #60A5FA",
                    borderRadius: "0 0 16px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 35px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <span style={{ color: "#60A5FA", fontSize: 20, fontWeight: 900 }}>
                    ₹10.3 LAKH CR
                  </span>
                  <span style={{ color: "#94A3B8", fontSize: 13, fontWeight: 700 }}>
                    Jio Listing Base Mass
                  </span>
                </div>
              </div>

              {/* Padlock and Reality Check Right Side */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 440 }}>
                {/* Padlock Banner */}
                <div
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.15)",
                    border: "2px solid #EF4444",
                    borderRadius: 16,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
                    transform: `scale(${interpolate(lockSpring, [0, 1], [1.3, 1])})`,
                    opacity: lockSpring,
                  }}
                >
                  <span style={{ fontSize: 36 }}>🔒</span>
                  <div>
                    <div style={{ color: "#EF4444", fontSize: 18, fontWeight: 900, letterSpacing: "0.08em" }}>
                      IMPOSSIBLE ON LISTING DAY
                    </div>
                    <div style={{ color: "#FCA5A5", fontSize: 13, marginTop: 4 }}>
                      ₹10 Lakh Cr is equal to years of entire Indian equity mutual fund inflows!
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#111827",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 14,
                    padding: "14px 18px",
                    color: "#94A3B8",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  No market maker, institutional consortium, or sovereign fund can inject ₹10 Lakh Crore on Day 1. The stock must compound gradually through operational cash earnings.
                </div>
              </div>
            </div>

            {/* Bottom Insight Pill */}
            <div
              style={{
                backgroundColor: "#0D1526",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: 14,
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 18 }}>⚓</span>
              <div style={{ color: "#F3F4F6", fontSize: 14, fontWeight: 600 }}>
                Mega-caps move like supertankers by quarters and macro cycles, never by Day-1 speculative momentum.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
