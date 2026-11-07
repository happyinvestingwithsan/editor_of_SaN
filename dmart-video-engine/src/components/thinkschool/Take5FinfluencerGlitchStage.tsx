import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take5FinfluencerGlitchStageProps {
  localFrame: number;
}

/**
 * Take5FinfluencerGlitchStage:
 * Frames 0 - 521: Overlays on top of Full-Screen Facecam.
 * Zero premature lists, zero collapsed sidebars.
 *
 * Spoken Word Sync:
 * - 0 - 110: Clean full facecam (SaN: "At this point of video...")
 * - 110 - 240: Retail mindset banner appears when SaN says "100% of our savings invested in Jio IPO"
 * - 180: Red stamp slams: "BLIND HERD HYPE: REJECTED"
 * - 240 - 255: Smooth fade out
 * - 255 - 488: SaN full facecam with subtle gold lower-third: "HAPPY INVESTING • RADICAL INTELLECTUAL HONESTY"
 * - 488 - 521: SaN says "First is the law of large numbers" -> Pill switches to "RISK 01: THE LAW OF LARGE NUMBERS"
 */
export const Take5FinfluencerGlitchStage: React.FC<Take5FinfluencerGlitchStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Phase 1: 100% Apply Retail Mindset Banner (Frames 110 - 240)
  const isPhase1 = localFrame >= 110 && localFrame < 240;
  const p1Spring = spring({
    frame: Math.max(0, localFrame - 110),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Stamp slam at Frame 180
  const stampSpring = spring({
    frame: Math.max(0, localFrame - 180),
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  // Fade out for Phase 1 (Frames 225 - 240)
  const p1Fade = interpolate(localFrame, [225, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Radical Intellectual Honesty Lower-Third (Frames 255 - 488)
  const isPhase2 = localFrame >= 255 && localFrame < 488;
  const p2Spring = spring({
    frame: Math.max(0, localFrame - 255),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Phase 3: Law of Large Numbers Announcement (Frames 488 - 521)
  const isPhase3 = localFrame >= 488 && localFrame < 521;
  const p3Spring = spring({
    frame: Math.max(0, localFrame - 488),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 60, // Sits in front of full-screen facecam as an elegant overlay
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* 1. RETAIL MINDSET FLOATING BANNER (Frames 110 - 240) */}
      {isPhase1 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: `translateX(-50%) translateY(${interpolate(p1Spring, [0, 1], [40, 0])}px) scale(${interpolate(p1Spring, [0, 1], [0.92, 1])})`,
            opacity: p1Spring * p1Fade,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              backdropFilter: "blur(16px)",
              border: "2px solid #EF4444",
              borderRadius: 20,
              padding: "18px 36px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(239, 68, 68, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 20,
              position: "relative",
            }}
          >
            <span style={{ fontSize: 36 }}>🚨</span>
            <div>
              <div style={{ color: "#EF4444", fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Mainstream Retail Finfluencer Advice
              </div>
              <div style={{ color: "#F8FAFC", fontSize: 26, fontWeight: 900, marginTop: 4 }}>
                "Blind-Apply With 100% Of Your Savings!"
              </div>
            </div>

            {/* Red Stamp Slam across banner at Frame 180 */}
            {localFrame >= 180 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.65)",
                  borderRadius: 18,
                }}
              >
                <div
                  style={{
                    border: "4px solid #EF4444",
                    borderRadius: 10,
                    padding: "8px 24px",
                    color: "#EF4444",
                    fontSize: 24,
                    fontWeight: 900,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    transform: `scale(${interpolate(stampSpring, [0, 1], [2.0, 1])}) rotate(-5deg)`,
                    boxShadow: "0 0 30px rgba(239, 68, 68, 0.8)",
                  }}
                >
                  ✖ BLIND HERD HYPE: REJECTED
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. RADICAL INTELLECTUAL HONESTY LOWER-THIRD (Frames 255 - 488) */}
      {isPhase2 && (
        <div
          style={{
            position: "absolute",
            bottom: 70,
            left: 70,
            transform: `translateY(${interpolate(p2Spring, [0, 1], [30, 0])}px)`,
            opacity: p2Spring,
            backgroundColor: "rgba(13, 19, 34, 0.92)",
            backdropFilter: "blur(16px)",
            border: "1.5px solid rgba(212, 175, 55, 0.6)",
            borderRadius: 18,
            padding: "16px 28px",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(212, 175, 55, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "rgba(212, 175, 55, 0.15)",
              border: "1.5px solid #D4AF37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            ⚖️
          </div>
          <div>
            <div
              style={{
                color: "#D4AF37",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Happy Investing Ethos
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#F3F4F6",
                fontSize: 24,
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              Radical Intellectual Honesty
            </div>
            <div style={{ color: "#9CA3AF", fontSize: 13, marginTop: 2 }}>
              Uncovering the 4 critical structural risks nobody is telling you
            </div>
          </div>
        </div>
      )}

      {/* 3. RISK 01: THE LAW OF LARGE NUMBERS ANNOUNCEMENT (Frames 488 - 521) */}
      {isPhase3 && (
        <div
          style={{
            position: "absolute",
            bottom: 70,
            left: 70,
            transform: `translateY(${interpolate(p3Spring, [0, 1], [30, 0])}px)`,
            opacity: p3Spring,
            backgroundColor: "rgba(13, 19, 34, 0.95)",
            backdropFilter: "blur(16px)",
            border: "2px solid #00E5FF",
            borderRadius: 18,
            padding: "16px 32px",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 229, 255, 0.35)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 26 }}>🔢</span>
          <div>
            <div style={{ color: "#00E5FF", fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Hazard Assessment #01
            </div>
            <div style={{ color: "#F8FAFC", fontSize: 26, fontWeight: 900, marginTop: 2 }}>
              The Law of Large Numbers
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
