import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take5SatelliteBroadbandStageProps {
  localFrame: number;
}

/**
 * Take5SatelliteBroadbandStage:
 * Active from Global Frame 2202 to 2687 (Duration: 485 frames / 16.2s)
 * Occupies Left 65% stage (x: 60, y: 70, w: 1160, h: 940)
 * SaN is in Right Column (31% width, x: 1260, y: 70)
 *
 * Micro-Word Timings:
 * - localFrame 0 - 58 (2202 - 2260): Header establishes on "Third is future competition"
 * - localFrame 58 (Global 2260 / words: "With Elon Musk Starlink"):
 *     • ONLY Starlink card appears!
 * - localFrame 100 (Global 2302 / words: "and Amazon's project Kuiper"):
 *     • Amazon Project Kuiper card appears!
 * - localFrame 170 (Global 2372 / words: "actively pushing for satellite spectrum in India"):
 *     • Spectrum Allocation Tag lights up!
 * - localFrame 253 (Global 2455 / words: "high-end enterprise broadband pricing battles"):
 *     • Enterprise Pricing Battle Bar appears!
 * - localFrame 386 (Global 2588 / words: "But still, Jio can win it. I have confidence on that"):
 *     • Jio AirFiber & Scale Defense Shield locks in!
 */
export const Take5SatelliteBroadbandStage: React.FC<Take5SatelliteBroadbandStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // 1. STARLINK ENTERS at localFrame 58 (Global Frame 2260: "Elon Musk Starlink")
  const starlinkSpring = spring({
    frame: Math.max(0, localFrame - 58),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // 2. AMAZON KUIPER ENTERS at localFrame 100 (Global Frame 2302: "and Amazon's project Kuiper")
  const kuiperSpring = spring({
    frame: Math.max(0, localFrame - 100),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // 3. SPECTRUM PUSH TAG at localFrame 170 (Global Frame 2372: "actively pushing for satellite spectrum in India")
  const spectrumTagSpring = spring({
    frame: Math.max(0, localFrame - 170),
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // 4. ENTERPRISE PRICING BATTLES at localFrame 253 (Global Frame 2455: "pricing battles over next 5 years")
  const battleSpring = spring({
    frame: Math.max(0, localFrame - 253),
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // 5. JIO DEFENSE SHIELD at localFrame 386 (Global Frame 2588: "But still, Jio can win it")
  const defenseSpring = spring({
    frame: Math.max(0, localFrame - 386),
    fps,
    config: { damping: 11, stiffness: 140 },
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
            Risk Factor 03 • Next-Gen Telecom Threat
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#F3F4F6",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Satellite Broadband & LEO Disruption
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(168, 85, 247, 0.15)",
            border: "1.5px solid #A855F7",
            color: "#C084FC",
            fontSize: 13,
            fontWeight: 800,
            padding: "8px 16px",
            borderRadius: 20,
            letterSpacing: "0.06em",
          }}
        >
          GLOBAL TECH GIANTS VS JIO
        </div>
      </div>

      {/* Main Satellite Space Arena */}
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
        {/* Top Space Label & Spectrum Tag */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
              LOW EARTH ORBIT (LEO) CONSTELLATIONS
            </span>
            <div style={{ color: "#F8FAFC", fontSize: 20, fontWeight: 800, marginTop: 4 }}>
              Next-Gen Enterprise Wireless Backhaul
            </div>
          </div>

          {/* Spectrum Tag reveals at localFrame 170 */}
          {localFrame >= 170 && (
            <div
              style={{
                backgroundColor: "rgba(0, 229, 255, 0.12)",
                border: "1px solid #00E5FF",
                borderRadius: 12,
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transform: `scale(${interpolate(spectrumTagSpring, [0, 1], [0.9, 1])})`,
                opacity: spectrumTagSpring,
              }}
            >
              <span style={{ fontSize: 16 }}>📡</span>
              <span style={{ color: "#00E5FF", fontSize: 12, fontWeight: 800, letterSpacing: "0.05em" }}>
                INDIAN SPECTRUM ALLOCATION RACE
              </span>
            </div>
          )}
        </div>

        {/* Dual Competitor Cards (Starlink at 58, Kuiper at 100) */}
        <div style={{ display: "flex", gap: 20 }}>
          {/* Card 1: Starlink (Word: "Elon Musk Starlink" at localFrame 58) */}
          <div
            style={{
              flex: 1,
              backgroundColor: localFrame >= 58 ? "#111827" : "#0D1322",
              border: localFrame >= 58 ? "1.5px solid #00E5FF" : "1.5px dashed rgba(255, 255, 255, 0.1)",
              borderRadius: 18,
              padding: "20px 24px",
              boxShadow: localFrame >= 58 ? "0 10px 30px rgba(0, 229, 255, 0.2)" : "none",
              transform: `scale(${interpolate(starlinkSpring, [0, 1], [0.94, 1])})`,
              opacity: 0.2 + 0.8 * starlinkSpring,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: localFrame >= 58 ? "#00E5FF" : "#475569", fontSize: 14, fontWeight: 800 }}>SPACEX</span>
              <span style={{ fontSize: 22 }}>🛰️</span>
            </div>
            <div style={{ color: localFrame >= 58 ? "#F8FAFC" : "#475569", fontSize: 22, fontWeight: 900, marginTop: 8 }}>
              Starlink
            </div>
            <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 4 }}>
              Led by Elon Musk • 6,000+ active satellites in LEO orbit
            </div>
            <div
              style={{
                marginTop: 12,
                backgroundColor: localFrame >= 58 ? "rgba(0, 229, 255, 0.1)" : "transparent",
                color: localFrame >= 58 ? "#00E5FF" : "#475569",
                padding: "6px 12px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                display: "inline-block",
              }}
            >
              Enterprise & Maritime Target
            </div>
          </div>

          {/* Card 2: Amazon Project Kuiper (Word: "Amazon's project Kuiper" at localFrame 100) */}
          <div
            style={{
              flex: 1,
              backgroundColor: localFrame >= 100 ? "#111827" : "#0D1322",
              border: localFrame >= 100 ? "1.5px solid #F97316" : "1.5px dashed rgba(255, 255, 255, 0.1)",
              borderRadius: 18,
              padding: "20px 24px",
              boxShadow: localFrame >= 100 ? "0 10px 30px rgba(249, 115, 22, 0.2)" : "none",
              transform: `scale(${interpolate(kuiperSpring, [0, 1], [0.94, 1])})`,
              opacity: 0.2 + 0.8 * kuiperSpring,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: localFrame >= 100 ? "#F97316" : "#475569", fontSize: 14, fontWeight: 800 }}>AMAZON</span>
              <span style={{ fontSize: 22 }}>📡</span>
            </div>
            <div style={{ color: localFrame >= 100 ? "#F8FAFC" : "#475569", fontSize: 22, fontWeight: 900, marginTop: 8 }}>
              Project Kuiper
            </div>
            <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 4 }}>
              Backed by Jeff Bezos • $10 Billion constellation investment
            </div>
            <div
              style={{
                marginTop: 12,
                backgroundColor: localFrame >= 100 ? "rgba(249, 115, 22, 0.1)" : "transparent",
                color: localFrame >= 100 ? "#F97316" : "#475569",
                padding: "6px 12px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                display: "inline-block",
              }}
            >
              AWS Enterprise Cloud Integration
            </div>
          </div>
        </div>

        {/* Pricing Battle Warning Bar (Word: "pricing battles" at localFrame 253) */}
        <div
          style={{
            backgroundColor: localFrame >= 253 ? "#1A1423" : "#0D1322",
            border: localFrame >= 253 ? "1.5px solid #A855F7" : "1.5px dashed rgba(255, 255, 255, 0.1)",
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: localFrame >= 253 ? "0 10px 25px rgba(168, 85, 247, 0.2)" : "none",
            transform: `translateY(${interpolate(battleSpring, [0, 1], [15, 0])}px)`,
            opacity: 0.2 + 0.8 * battleSpring,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 22 }}>⚔️</span>
            <div>
              <div style={{ color: localFrame >= 253 ? "#C084FC" : "#64748B", fontSize: 14, fontWeight: 800 }}>
                HIGH-END ENTERPRISE PRICING BATTLES (2026 – 2030)
              </div>
              <div style={{ color: localFrame >= 253 ? "#CBD5E1" : "#475569", fontSize: 13, marginTop: 2 }}>
                High-ARPU business broadband will face competitive price wars as satellite capacity floods in
              </div>
            </div>
          </div>
          <span style={{ color: localFrame >= 253 ? "#A855F7" : "#475569", fontSize: 13, fontWeight: 700 }}>5-YR HORIZON</span>
        </div>

        {/* Jio Counter-Defense Badge (Word: "But still, Jio can win it" at localFrame 386) */}
        <div
          style={{
            backgroundColor: localFrame >= 386 ? "#064E3B" : "#0A1E18",
            border: localFrame >= 386 ? "2px solid #00E599" : "1.5px dashed rgba(0, 229, 153, 0.2)",
            borderRadius: 16,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: localFrame >= 386 ? "0 10px 25px rgba(0, 229, 153, 0.3)" : "none",
            transform: `scale(${interpolate(defenseSpring, [0, 1], [0.95, 1])})`,
            opacity: 0.2 + 0.8 * defenseSpring,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 24 }}>🛡️</span>
            <div>
              <div style={{ color: localFrame >= 386 ? "#00E599" : "#34D399", fontSize: 15, fontWeight: 900 }}>
                JIO SCALE ADVANTAGE: AIRFIBER & TERRESTRIAL FIBER MOAT
              </div>
              <div style={{ color: localFrame >= 386 ? "#D1FAE5" : "#6EE7B7", fontSize: 13 }}>
                Jio's 1.3 Lakh route-km fiber backbone and 53 Cr subscriber pricing power provides deep domestic defense.
              </div>
            </div>
          </div>
          <span
            style={{
              backgroundColor: localFrame >= 386 ? "#00E599" : "#064E3B",
              color: localFrame >= 386 ? "#064E3B" : "#34D399",
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            CONFIDENCE
          </span>
        </div>
      </div>
    </div>
  );
};
