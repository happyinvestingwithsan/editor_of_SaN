import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelGoldenRuleStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 2395,
  durationFrames = 768, // 2395 to 3163
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Sub-phases:
  // Phase 1 (0 to 125): Will I apply? NO (Mode C - Lower Third Badge on full facecam)
  // Phase 2 (125 to 260): Business Quality 10/10 Excellent (Mode A - Top Canvas)
  // Phase 3 (260 to 398): 200 DMA Technical Barrier (Mode B - Full Screen)
  // Phase 4 (398 to 545): Zomato / Swiggy / Paytm Crash Autopsy with STANDALONE LOGOS (Mode A)
  // Phase 5 (545 to 768): Price Discovery > Listing Gamble (Mode A)

  const isPhase1 = localFrame < 125;
  const isPhase2 = localFrame >= 125 && localFrame < 260;
  const isPhase3 = localFrame >= 260 && localFrame < 398;
  const isPhase4 = localFrame >= 398 && localFrame < 545;
  const isPhase5 = localFrame >= 545;

  const spring1 = spring({ frame: localFrame, fps, config: { damping: 10, stiffness: 180 } });
  const spring2 = spring({ frame: localFrame - 125, fps, config: { damping: 14, stiffness: 120 } });
  const spring3 = spring({ frame: localFrame - 260, fps, config: { damping: 12, stiffness: 130 } });
  const spring4 = spring({ frame: localFrame - 398, fps, config: { damping: 14, stiffness: 110 } });
  const spring5 = spring({ frame: localFrame - 545, fps, config: { damping: 14, stiffness: 110 } });

  const exitProgress = interpolate(
    localFrame,
    [durationFrames - 15, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 1: Mode C Full-Screen Facecam Lower Third
  if (isPhase1) {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 60,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            transform: `scale(${spring1})`,
            backgroundColor: "rgba(11, 15, 23, 0.94)",
            border: "3px solid #FF3B30",
            borderRadius: 30,
            padding: "20px 48px",
            boxShadow: "0 20px 60px rgba(255, 59, 48, 0.5)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              fontFamily: "'Inter', sans-serif",
              color: "#FFFFFF",
              letterSpacing: 2,
            }}
          >
            WILL I APPLY? <span style={{ color: "#FF3B30" }}>NO.</span>
          </div>
        </div>
      </div>
    );
  }

  // Phase 3: Mode B Full-Screen 200 DMA Barrier
  if (isPhase3) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundColor: "rgba(11, 15, 23, 0.96)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 40px",
          opacity: Math.min(1, (localFrame - 260) / 10),
          zIndex: 40,
        }}
      >
        <div
          style={{
            transform: `scale(${spring3})`,
            backgroundColor: "rgba(19, 25, 36, 0.95)",
            border: "2px solid rgba(26, 100, 248, 0.4)",
            borderRadius: 32,
            padding: "44px 40px",
            width: 940,
            boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
            marginBottom: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: 16,
              marginBottom: 24,
            }}
          >
            <span style={{ color: "#1A64F8", fontSize: 24, fontWeight: 900 }}>
              TRADINGVIEW TECHNICAL FRAMEWORK
            </span>
            <span style={{ color: "#94A3B8", fontSize: 20, fontFamily: "'JetBrains Mono', monospace" }}>
              200-DAY MOVING AVERAGE
            </span>
          </div>

          <div
            style={{
              height: 220,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <svg width="800" height="180">
              <path
                d="M 50 140 Q 250 110 450 70 T 750 40"
                fill="none"
                stroke="#1A64F8"
                strokeWidth="6"
                strokeDasharray="6 6"
              />
              <circle cx="750" cy="40" r="10" fill="#00D09C" />
            </svg>
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 30,
                backgroundColor: "#1A64F8",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 900,
                borderRadius: 12,
                padding: "6px 14px",
              }}
            >
              200 DMA LINE
            </div>
          </div>
        </div>

        <div
          style={{
            transform: `scale(${spring3})`,
            backgroundColor: "rgba(255, 59, 48, 0.15)",
            border: "3px solid #FF3B30",
            borderRadius: 30,
            padding: "18px 48px",
            boxShadow: "0 0 50px rgba(255, 59, 48, 0.4)",
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              fontFamily: "'Inter', sans-serif",
              color: "#FFFFFF",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            NO 200 DMA = <span style={{ color: "#FF3B30" }}>NO ENTRY</span>
          </div>
        </div>
      </div>
    );
  }

  // Phase 2, 4, 5: Top Canvas (Mode A: Height 720px)
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 720,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 40px 10px",
        opacity: (1 - exitProgress) * Math.min(1, localFrame / 10),
        transform: `translateY(${-exitProgress * 40}px)`,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {/* Phase 2: Business Quality 10/10 */}
      {isPhase2 && (
        <div
          style={{
            transform: `scale(${spring2})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 208, 156, 0.15)",
              border: "1.5px solid #00D09C",
              borderRadius: 24,
              padding: "6px 20px",
              marginBottom: 12,
            }}
          >
            <span style={{ color: "#00D09C", fontSize: 18, fontWeight: 900, letterSpacing: 1.5 }}>
              BUSINESS IS PHENOMENAL
            </span>
          </div>
          <div
            style={{
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "2px solid #00D09C",
              borderRadius: 20,
              padding: "20px 36px",
              width: 900,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 4 }}>⭐ 10 / 10 BUSINESS</div>
            <p style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, margin: 0 }}>
              Great Business ≠ Blind Day-1 IPO Entry
            </p>
          </div>
        </div>
      )}

      {/* Phase 4: Zomato, Swiggy, Paytm Crash Autopsy with STANDALONE LOGOS (NO NESTED BOXES) */}
      {isPhase4 && (
        <div
          style={{
            transform: `scale(${spring4})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Header Tag */}
          <div
            style={{
              backgroundColor: "rgba(255, 59, 48, 0.15)",
              border: "1.5px solid #FF3B30",
              borderRadius: 24,
              padding: "6px 20px",
              marginBottom: 20,
            }}
          >
            <span style={{ color: "#FF3B30", fontSize: 18, fontWeight: 800 }}>
              Post-Listing Carnage Before 200 DMA
            </span>
          </div>

          {/* 3 Standalone Brand Logos Row (Clean, High-Contrast, No Cluttering Boxes) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: 960,
            }}
          >
            {/* 1. Standalone Zomato Logo */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  fontStyle: "italic",
                  fontFamily: "'Inter', sans-serif",
                  color: "#E23744",
                  letterSpacing: -1.5,
                  textShadow: "0 0 25px rgba(226, 55, 68, 0.5)",
                }}
              >
                zomato
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255, 59, 48, 0.18)",
                  border: "1.5px solid #FF3B30",
                  borderRadius: 14,
                  padding: "6px 18px",
                  color: "#FF3B30",
                  fontSize: 28,
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                  boxShadow: "0 4px 20px rgba(255, 59, 48, 0.3)",
                }}
              >
                -65%
              </div>
            </div>

            {/* 2. Standalone Swiggy Logo (Vector Pin + Wordmark) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Authentic Swiggy Orange Pin Icon */}
                <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
                  <path
                    d="M17 0C7.61 0 0 7.61 0 17C0 26.39 17 42 17 42C17 42 34 26.39 34 17C34 7.61 26.39 0 17 0Z"
                    fill="#FC8019"
                  />
                  <path
                    d="M17 10C13.13 10 10 13.13 10 17C10 19.7 11.53 22.06 13.8 23.2L17 28L20.2 23.2C22.47 22.06 24 19.7 24 17C24 13.13 20.87 10 17 10Z"
                    fill="#FFFFFF"
                  />
                </svg>
                <span
                  style={{
                    fontSize: 38,
                    fontWeight: 900,
                    color: "#FC8019",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: 1.5,
                    textShadow: "0 0 25px rgba(252, 128, 25, 0.5)",
                  }}
                >
                  SWIGGY
                </span>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255, 59, 48, 0.18)",
                  border: "1.5px solid #FF3B30",
                  borderRadius: 14,
                  padding: "6px 18px",
                  color: "#FF3B30",
                  fontSize: 28,
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                  boxShadow: "0 4px 20px rgba(255, 59, 48, 0.3)",
                }}
              >
                -50%
              </div>
            </div>

            {/* 3. Standalone Paytm Dark-Mode Logo */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: -1,
                  textShadow: "0 0 25px rgba(0, 186, 242, 0.4)",
                }}
              >
                <span style={{ color: "#FFFFFF" }}>Pay</span>
                <span style={{ color: "#00BAF2" }}>tm</span>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255, 59, 48, 0.18)",
                  border: "1.5px solid #FF3B30",
                  borderRadius: 14,
                  padding: "6px 18px",
                  color: "#FF3B30",
                  fontSize: 28,
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                  boxShadow: "0 4px 20px rgba(255, 59, 48, 0.3)",
                }}
              >
                -71%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 5: Price Discovery > Listing Gamble */}
      {isPhase5 && (
        <div
          style={{
            transform: `scale(${spring5})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 208, 156, 0.15)",
              border: "1.5px solid #00D09C",
              borderRadius: 24,
              padding: "6px 20px",
              marginBottom: 12,
            }}
          >
            <span style={{ color: "#00D09C", fontSize: 18, fontWeight: 800 }}>
              Disciplined Patience
            </span>
          </div>
          <div
            style={{
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "2px solid #00D09C",
              borderRadius: 20,
              padding: "20px 36px",
              width: 900,
              textAlign: "center",
              boxShadow: "0 16px 40px rgba(0, 208, 156, 0.2)",
            }}
          >
            <div style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 900, marginBottom: 4 }}>
              PRICE DISCOVERY &gt; LISTING GAMBLE
            </div>
            <p style={{ color: "#94A3B8", fontSize: 18, fontWeight: 600, margin: 0 }}>
              Okay to miss early listing gains. Refuse to break discipline.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
