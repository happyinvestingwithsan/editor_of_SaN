import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take5MarketCapOlympusStageProps {
  localFrame: number;
}

/**
 * Take5MarketCapOlympusStage:
 * Active from Global Frame 521 to 956 (Duration: 435 frames / 14.5s)
 * Left 65% stage (x: 60, y: 70, w: 1160, h: 940)
 *
 * Micro-Aligned Word Sync:
 * - localFrame 0 - 52 (521 - 573): Header and empty podium base establish.
 * - localFrame 52 - 134 (573 - 655 / words: "At a valuation of 10.3 lakh crore Jio platform"):
 *     • JIO RISES FIRST as the hero column!
 *     • Ticking counter clocks to ₹10.30 L Cr.
 *     • Gold crown badge: "#4 LARGEST IN INDIA".
 * - localFrame 333 (Global 854 / word: "Reliance"):
 *     • RELIANCE column animates in with vibrant color & highlight glow!
 * - localFrame 370 (Global 891 / word: "TCS"):
 *     • TCS column animates in with vibrant color & highlight glow!
 * - localFrame 403 (Global 924 / words: "and HDFC Bank"):
 *     • HDFC BANK column animates in with vibrant color & highlight glow!
 * - localFrame 419 (Global 940):
 *     • Combined Top 4 insight card snaps: ">₹58 Lakh Cr (~25% of Nifty)".
 */
export const Take5MarketCapOlympusStage: React.FC<Take5MarketCapOlympusStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring for main stage container
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // 1. JIO RISES FIRST at localFrame 52 (Global Frame 573: "At a valuation of 10.3 lakh crore")
  const jioSpring = spring({
    frame: Math.max(0, localFrame - 52),
    fps,
    config: { damping: 13, stiffness: 95 },
  });

  // Jio Crown pops at localFrame 95 (Global Frame 616)
  const crownSpring = spring({
    frame: Math.max(0, localFrame - 95),
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  // Rapid counter for Jio valuation (0 to 10.3)
  const jioCounter = interpolate(localFrame, [52, 115], [0, 10.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. RELIANCE HIGHLIGHT at localFrame 333 (Global Frame 854: "Reliance")
  const relianceSpring = spring({
    frame: Math.max(0, localFrame - 333),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // 3. TCS HIGHLIGHT at localFrame 370 (Global Frame 891: "TCS")
  const tcsSpring = spring({
    frame: Math.max(0, localFrame - 370),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // 4. HDFC BANK HIGHLIGHT at localFrame 403 (Global Frame 924: "and HDFC Bank")
  const hdfcSpring = spring({
    frame: Math.max(0, localFrame - 403),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // 5. Footnote card at localFrame 415
  const noteSpring = spring({
    frame: Math.max(0, localFrame - 415),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  return (
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
            Risk Factor 01 • Scale Paradox
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#F3F4F6",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            The Law of Large Numbers
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(0, 102, 255, 0.15)",
            border: "1.5px solid #0066FF",
            color: "#60A5FA",
            fontSize: 13,
            fontWeight: 700,
            padding: "8px 16px",
            borderRadius: 20,
            letterSpacing: "0.05em",
          }}
        >
          INDIA'S TOP 4 TITANS
        </div>
      </div>

      {/* Main Center Stage: The 4 Titans Podium */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#0B101D",
          border: "1.5px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 24,
          padding: "24px 32px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Background Grid Lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#9CA3AF", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em" }}>
            MARKET CAPITALIZATION RANKING (DALAL STREET)
          </span>
          <span style={{ color: "#D4AF37", fontSize: 13, fontWeight: 700 }}>
            ₹ LAKH CRORE VALUATION
          </span>
        </div>

        {/* The 4 Architectural Columns */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            height: 520,
            paddingBottom: 10,
          }}
        >
          {/* Column 1: Reliance Industries (Lights up on word 'Reliance' at localFrame 333) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 210,
            }}
          >
            <div
              style={{
                color: localFrame >= 333 ? "#38BDF8" : "#475569",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                transition: "color 0.2s ease",
              }}
            >
              RANK #1
            </div>
            <div
              style={{
                color: localFrame >= 333 ? "#F8FAFC" : "#334155",
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 8,
                transition: "color 0.2s ease",
              }}
            >
              ₹20.0 L Cr
            </div>
            <div
              style={{
                width: "100%",
                height: 440 * (0.2 + 0.8 * relianceSpring),
                backgroundColor: localFrame >= 333 ? "#1E3A8A" : "#131C2E",
                border: localFrame >= 333 ? "2px solid #38BDF8" : "1.5px dashed rgba(100, 116, 139, 0.2)",
                borderRadius: "14px 14px 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 16,
                boxShadow: localFrame >= 333 ? "0 0 30px rgba(56, 189, 248, 0.4)" : "none",
                opacity: 0.35 + 0.65 * relianceSpring,
              }}
            >
              <span style={{ color: localFrame >= 333 ? "#F8FAFC" : "#64748B", fontSize: 15, fontWeight: 800, textAlign: "center" }}>
                RELIANCE IND.
              </span>
              <span style={{ color: localFrame >= 333 ? "#93C5FD" : "#475569", fontSize: 12, marginTop: 4 }}>
                Energy / Conglomerate
              </span>
            </div>
          </div>

          {/* Column 2: TCS (Lights up on word 'TCS' at localFrame 370) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 210,
            }}
          >
            <div
              style={{
                color: localFrame >= 370 ? "#38BDF8" : "#475569",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              RANK #2
            </div>
            <div
              style={{
                color: localFrame >= 370 ? "#F8FAFC" : "#334155",
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              ₹15.2 L Cr
            </div>
            <div
              style={{
                width: "100%",
                height: 350 * (0.2 + 0.8 * tcsSpring),
                backgroundColor: localFrame >= 370 ? "#0369A1" : "#131C2E",
                border: localFrame >= 370 ? "2px solid #38BDF8" : "1.5px dashed rgba(100, 116, 139, 0.2)",
                borderRadius: "14px 14px 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 16,
                boxShadow: localFrame >= 370 ? "0 0 30px rgba(3, 105, 161, 0.4)" : "none",
                opacity: 0.35 + 0.65 * tcsSpring,
              }}
            >
              <span style={{ color: localFrame >= 370 ? "#F8FAFC" : "#64748B", fontSize: 15, fontWeight: 800, textAlign: "center" }}>
                TCS
              </span>
              <span style={{ color: localFrame >= 370 ? "#BAE6FD" : "#475569", fontSize: 12, marginTop: 4 }}>
                IT Services
              </span>
            </div>
          </div>

          {/* Column 3: HDFC Bank (Lights up on words 'and HDFC Bank' at localFrame 403) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 210,
            }}
          >
            <div
              style={{
                color: localFrame >= 403 ? "#38BDF8" : "#475569",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              RANK #3
            </div>
            <div
              style={{
                color: localFrame >= 403 ? "#F8FAFC" : "#334155",
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              ₹13.1 L Cr
            </div>
            <div
              style={{
                width: "100%",
                height: 290 * (0.2 + 0.8 * hdfcSpring),
                backgroundColor: localFrame >= 403 ? "#1D4ED8" : "#131C2E",
                border: localFrame >= 403 ? "2px solid #38BDF8" : "1.5px dashed rgba(100, 116, 139, 0.2)",
                borderRadius: "14px 14px 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 16,
                boxShadow: localFrame >= 403 ? "0 0 30px rgba(29, 78, 216, 0.4)" : "none",
                opacity: 0.35 + 0.65 * hdfcSpring,
              }}
            >
              <span style={{ color: localFrame >= 403 ? "#F8FAFC" : "#64748B", fontSize: 15, fontWeight: 800, textAlign: "center" }}>
                HDFC BANK
              </span>
              <span style={{ color: localFrame >= 403 ? "#BFDBFE" : "#475569", fontSize: 12, marginTop: 4 }}>
                Private Banking
              </span>
            </div>
          </div>

          {/* Column 4: JIO PLATFORMS (HERO ARRIVAL - RISES FIRST at localFrame 52) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 230,
              position: "relative",
            }}
          >
            {/* Gold Crown Crest */}
            <div
              style={{
                position: "absolute",
                top: -68,
                backgroundColor: "rgba(212, 175, 55, 0.2)",
                border: "2px solid #D4AF37",
                borderRadius: 20,
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)",
                transform: `scale(${interpolate(crownSpring, [0, 1], [0.6, 1])})`,
                opacity: crownSpring,
              }}
            >
              <span style={{ fontSize: 14 }}>👑</span>
              <span style={{ color: "#FDE047", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em" }}>
                INSTANT #4
              </span>
            </div>

            <div style={{ color: "#60A5FA", fontSize: 13, fontWeight: 800, marginBottom: 6 }}>
              RANK #4 (NEW IPO)
            </div>
            <div
              style={{
                color: "#00E5FF",
                fontSize: 24,
                fontWeight: 900,
                marginBottom: 8,
                textShadow: "0 0 15px rgba(0, 229, 255, 0.5)",
              }}
            >
              ₹{jioCounter.toFixed(2)} L Cr
            </div>
            <div
              style={{
                width: "100%",
                height: 230 * jioSpring,
                background: "linear-gradient(to top, #0A2558, #0066FF)",
                border: "2.5px solid #00E5FF",
                borderRadius: "16px 16px 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 16,
                boxShadow: "0 0 35px rgba(0, 102, 255, 0.6)",
              }}
            >
              <span style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 900, textAlign: "center" }}>
                JIO PLATFORMS
              </span>
              <span
                style={{
                  color: "#D4AF37",
                  fontSize: 12,
                  fontWeight: 700,
                  marginTop: 4,
                  backgroundColor: "rgba(0,0,0,0.4)",
                  padding: "2px 8px",
                  borderRadius: 6,
                }}
              >
                ₹10.3 Lakh Cr
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Statutory Insight Card */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            backgroundColor: "#0D1526",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: 14,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `translateY(${interpolate(noteSpring, [0, 1], [15, 0])}px)`,
            opacity: noteSpring,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20 }}>💡</span>
            <div style={{ color: "#E2E8F0", fontSize: 14, fontWeight: 600 }}>
              Jio enters public trading with gargantuan mass: <strong>Top 4 Titans control ~25% of India's total Nifty weight.</strong>
            </div>
          </div>
          <span style={{ color: "#D4AF37", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>
            SCALE INERTIA
          </span>
        </div>
      </div>
    </div>
  );
};
