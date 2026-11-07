import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take5TwoVariableGambleStageProps {
  localFrame: number;
}

/**
 * Take5TwoVariableGambleStage:
 * Active from Global Frame 2687 to 3150 (Duration: 463 frames / 15.4s)
 * Occupies Right 65% stage (x: 700, y: 70, w: 1160, h: 940)
 * SaN is in Left Column (31% width, x: 60, y: 70)
 *
 * Micro-Word Timings:
 * - localFrame 0 - 127 (2687 - 2814): Header establishes on "And fourth is fundamental reality of day 1 IPO investing"
 * - localFrame 127 (Global 2814 / words: "always an unhedged gamble onto two unknown variables"):
 *     • Dual variable containers establish in silhouette.
 * - localFrame 263 (Global 2950 / words: "your allotment lottery luck"):
 *     • VARIABLE 1 (Lottery Luck) illuminates with full color and 1-in-15 odds!
 * - localFrame 323 (Global 3010 / words: "emotional mood of foreign institutional investors"):
 *     • VARIABLE 2 (Morning FII Mood) illuminates with oscillating pendulum!
 * - localFrame 403 (Global 3090 / words: "on the listing morning"):
 *     • Heavy warning clamp slams: "AN UNHEDGED SPECULATIVE GAMBLE"!
 * - localFrame 423 (Global 3110):
 *     • Concluding Happy Investing Ethos Card locks in.
 */
export const Take5TwoVariableGambleStage: React.FC<Take5TwoVariableGambleStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Variable 1 (Lottery Luck) reveals at localFrame 263 (Global Frame 2950)
  const var1Spring = spring({
    frame: Math.max(0, localFrame - 263),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Variable 2 (FII Sentiment) reveals at localFrame 323 (Global Frame 3010)
  const var2Spring = spring({
    frame: Math.max(0, localFrame - 323),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Pendulum swing for FII mood
  const fiiAngle = Math.sin(localFrame * 0.14) * 28;

  // Warning clamp slams at localFrame 403 (Global Frame 3090: "listing morning")
  const clampSpring = spring({
    frame: Math.max(0, localFrame - 403),
    fps,
    config: { damping: 9, stiffness: 170 },
  });

  // Ethos card at localFrame 423
  const ethosSpring = spring({
    frame: Math.max(0, localFrame - 423),
    fps,
    config: { damping: 14, stiffness: 110 },
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
            Risk Factor 04 • The Speculative Anatomy
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#F3F4F6",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            The Day-1 Two-Variable Gamble
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1.5px solid #EF4444",
            color: "#F87171",
            fontSize: 13,
            fontWeight: 800,
            padding: "8px 16px",
            borderRadius: 20,
            letterSpacing: "0.06em",
          }}
        >
          AN UNHEDGED BET
        </div>
      </div>

      {/* Main Center Roulette Stage */}
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
        <div>
          <span style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
            DAY 1 IPO GAINS ARE MATHEMATICALLY UNCONTROLLABLE
          </span>
          <div style={{ color: "#F8FAFC", fontSize: 20, fontWeight: 800, marginTop: 4 }}>
            Dependent on Two High-Variance External Variables
          </div>
        </div>

        {/* The Two Variable Chambers */}
        <div style={{ display: "flex", gap: 24 }}>
          {/* Variable 1: Allotment Lottery (Word: "allotment lottery luck" at localFrame 263) */}
          <div
            style={{
              flex: 1,
              backgroundColor: localFrame >= 263 ? "#111827" : "#0D1322",
              border: localFrame >= 263 ? "1.5px solid #F59E0B" : "1.5px dashed rgba(255, 255, 255, 0.1)",
              borderRadius: 18,
              padding: "22px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: localFrame >= 263 ? "0 10px 30px rgba(245, 158, 11, 0.2)" : "none",
              transform: `scale(${interpolate(var1Spring, [0, 1], [0.94, 1])})`,
              opacity: 0.25 + 0.75 * var1Spring,
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: localFrame >= 263 ? "#F59E0B" : "#475569", fontSize: 13, fontWeight: 800 }}>VARIABLE 01</span>
                <span style={{ fontSize: 24 }}>🎲</span>
              </div>
              <div style={{ color: localFrame >= 263 ? "#F8FAFC" : "#475569", fontSize: 22, fontWeight: 900, marginTop: 8 }}>
                Allotment Lottery Luck
              </div>
              <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 6, lineHeight: 1.4 }}>
                With massive retail over-subscription, receiving even 1 lot is purely random probabilistic chance.
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                backgroundColor: localFrame >= 263 ? "rgba(245, 158, 11, 0.12)" : "transparent",
                border: `1px solid ${localFrame >= 263 ? "#F59E0B" : "#334155"}`,
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: localFrame >= 263 ? "#CBD5E1" : "#475569", fontSize: 12, fontWeight: 600 }}>Expected Retail Odds:</span>
              <span style={{ color: localFrame >= 263 ? "#F59E0B" : "#475569", fontSize: 14, fontWeight: 800 }}>~1 in 15 Lots</span>
            </div>
          </div>

          {/* Variable 2: Morning FII Mood (Word: "emotional mood of foreign institutional investors" at localFrame 323) */}
          <div
            style={{
              flex: 1,
              backgroundColor: localFrame >= 323 ? "#111827" : "#0D1322",
              border: localFrame >= 323 ? "1.5px solid #EF4444" : "1.5px dashed rgba(255, 255, 255, 0.1)",
              borderRadius: 18,
              padding: "22px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: localFrame >= 323 ? "0 10px 30px rgba(239, 68, 68, 0.2)" : "none",
              transform: `scale(${interpolate(var2Spring, [0, 1], [0.94, 1])})`,
              opacity: 0.25 + 0.75 * var2Spring,
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: localFrame >= 323 ? "#EF4444" : "#475569", fontSize: 13, fontWeight: 800 }}>VARIABLE 02</span>
                <span style={{ fontSize: 24 }}>📊</span>
              </div>
              <div style={{ color: localFrame >= 323 ? "#F8FAFC" : "#475569", fontSize: 22, fontWeight: 900, marginTop: 8 }}>
                Listing Morning FII Sentiment
              </div>
              <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 6, lineHeight: 1.4 }}>
                Global cues, dollar index, and morning algorithmic block selling dictate 9:15 AM opening price.
              </div>
            </div>

            {/* Dynamic Sentiment Pendulum Barometer */}
            <div
              style={{
                marginTop: 16,
                backgroundColor: localFrame >= 323 ? "rgba(239, 68, 68, 0.12)" : "transparent",
                border: `1px solid ${localFrame >= 323 ? "#EF4444" : "#334155"}`,
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: localFrame >= 323 ? "#CBD5E1" : "#475569", fontSize: 12, fontWeight: 600 }}>Morning Mood Swing:</span>
              <span
                style={{
                  color: localFrame >= 323 ? (fiiAngle > 0 ? "#00E599" : "#EF4444") : "#475569",
                  fontSize: 14,
                  fontWeight: 800,
                  transform: `rotate(${localFrame >= 323 ? fiiAngle * 0.4 : 0}deg)`,
                  display: "inline-block",
                }}
              >
                {localFrame >= 323 ? (fiiAngle > 0 ? "🟢 Risk-On Wave" : "🔴 Risk-Off Dump") : "Neutral"}
              </span>
            </div>
          </div>
        </div>

        {/* Heavy Warning Clamp Banner (Word: "on the listing morning" at localFrame 403) */}
        <div
          style={{
            backgroundColor: localFrame >= 403 ? "rgba(239, 68, 68, 0.18)" : "transparent",
            border: localFrame >= 403 ? "2.5px solid #EF4444" : "1.5px dashed rgba(255, 255, 255, 0.1)",
            borderRadius: 16,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            boxShadow: localFrame >= 403 ? "0 0 35px rgba(239, 68, 68, 0.4)" : "none",
            transform: `scale(${interpolate(clampSpring, [0, 1], [1.3, 1])})`,
            opacity: 0.15 + 0.85 * clampSpring,
          }}
        >
          <span style={{ fontSize: 28 }}>⚠️</span>
          <span style={{ color: localFrame >= 403 ? "#EF4444" : "#475569", fontSize: 18, fontWeight: 900, letterSpacing: "0.1em" }}>
            CONCLUSION: DAY-1 LISTING IS AN UNHEDGED SPECULATIVE GAMBLE
          </span>
        </div>

        {/* Bottom Concluding Ethos Card */}
        <div
          style={{
            backgroundColor: "#0D1526",
            border: "1.5px solid rgba(212, 175, 55, 0.4)",
            borderRadius: 14,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            transform: `translateY(${interpolate(ethosSpring, [0, 1], [15, 0])}px)`,
            opacity: ethosSpring,
          }}
        >
          <span style={{ fontSize: 20 }}>👑</span>
          <div style={{ color: "#FDE047", fontSize: 14, fontWeight: 700 }}>
            "Disciplined investors never gamble on listing-day lottery luck. We invest in structural 5-year business moats."
          </div>
        </div>
      </div>
    </div>
  );
};
