import React from "react";
import {
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

export interface ThinkSchoolPodiumChartProps {
  localFrame: number;
}

/**
 * Scene 1: The Dalal Street Titanium Monoliths
 * Active Timeline: Frames 148 - 742 (localFrame 0 to 594 | 4.9s - 24.7s)
 * Layout: Left 60% Stage (Pillars Arena) + Right 40% Tall Rectangle Facecam
 *
 * Spoken Alignment:
 * - localFrame 0 - 222 (F148 - F370): "Reliance Jio Platforms is officially launching its Initial Public Offering, raising the ₹30,213 Crore"
 * - localFrame 228 - 354 (F376 - F502): "That easily surpasses LIC’s ₹21,000 Crore issue"
 * - localFrame 354 - 456 (F502 - F604): "and Hyundai Motor India’s ₹27,870 Crore offering"
 * - localFrame 456 - 594 (F604 - F742): "making it the single largest public issue in the history of Indian capital markets"
 */
export const ThinkSchoolPodiumChart: React.FC<ThinkSchoolPodiumChartProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring for the stage
  const stageEntrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  const stageOpacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow documentary camera push-in
  const cameraScale = interpolate(localFrame, [0, 594], [1.0, 1.04], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1.0),
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // 1. RELIANCE JIO (Spoken first: localFrame 0 - 222)
  // ---------------------------------------------------------------------------
  const jioProgress = interpolate(localFrame, [20, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.05)),
  });
  const jioHeight = jioProgress * 560;

  // Kinetic Counter for Jio: counts up on "raising ₹30,213 Crore" (localFrame 130 - 220)
  const jioCounterValue = Math.round(
    interpolate(localFrame, [130, 220], [0, 30213], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );

  // ---------------------------------------------------------------------------
  // 2. LIC (Spoken second: localFrame 228 - 354 | "surpasses LIC’s ₹21,000 Crore issue")
  // ---------------------------------------------------------------------------
  const licProgress = interpolate(localFrame, [230, 315], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const licHeight = licProgress * 350;

  // ---------------------------------------------------------------------------
  // 3. HYUNDAI MOTOR (Spoken third: localFrame 354 - 456 | "and Hyundai Motor India’s ₹27,870 Crore")
  // ---------------------------------------------------------------------------
  const hyundaiProgress = interpolate(localFrame, [354, 435], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const hyundaiHeight = hyundaiProgress * 450;

  // ---------------------------------------------------------------------------
  // 4. RED STAMP SLAM (Spoken fourth: localFrame 480 | "single largest public issue")
  // ---------------------------------------------------------------------------
  const stampSpring = spring({
    frame: Math.max(0, localFrame - 480),
    fps,
    config: { damping: 11, mass: 0.5, stiffness: 220 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [3.2, 1.0]);
  const stampOpacity = interpolate(localFrame, [480, 485], [0, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shake effect on stamp hit (localFrame 480 - 495)
  const shake =
    localFrame >= 480 && localFrame <= 495
      ? Math.sin((localFrame - 480) * 2.5) * (495 - localFrame) * 0.7
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070A10",
        backgroundImage: `
          radial-gradient(ellipse 90% 60% at 35% 15%, rgba(30, 58, 138, 0.25) 0%, transparent 70%),
          radial-gradient(circle at 45% 45%, rgba(245, 158, 11, 0.12) 0%, transparent 50%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 60px 60px, 60px 60px",
        overflow: "hidden",
        opacity: stageOpacity,
        transform: `scale(${cameraScale}) translateY(${shake}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "50px 60px 40px 60px",
        boxSizing: "border-box",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Editorial Header (Constrained to Left 60% so it never collides with Right-Side Facecam) */}
      <div
        style={{
          width: 1040,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: 18,
          transform: `translateY(${interpolate(stageEntrance, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div>
          <div
            style={{
              color: "#F59E0B",
              fontSize: 13,
              letterSpacing: "0.25em",
              fontWeight: 800,
              textTransform: "uppercase",
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#F59E0B",
                boxShadow: "0 0 10px #F59E0B",
              }}
            />
            Dalal Street Historical Record // Public Issues
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            India's Largest IPOs in History
          </div>
        </div>

        {/* Live Indicator Pill */}
        <div
          style={{
            background: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            borderRadius: 30,
            padding: "8px 18px",
            color: "#FDE68A",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>SEBI DRHP</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
          <span style={{ color: "#FFFFFF" }}>ALL-TIME RANK</span>
        </div>
      </div>

      {/* Center 3D-Styled Pillars Arena (Contained completely inside Left 60%) */}
      <div
        style={{
          width: 1040,
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          gap: 35,
          paddingBottom: 40,
          position: "relative",
        }}
      >
        {/* Baseline Horizon Line */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            width: 1040,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25) 15%, rgba(255, 255, 255, 0.25) 85%, transparent)",
          }}
        />

        {/* ----------------- PILLAR 1: LIC (Left) ----------------- */}
        <div
          style={{
            width: 270,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: interpolate(licProgress, [0, 0.3], [0, 1]),
          }}
        >
          <div
            style={{
              marginBottom: 14,
              textAlign: "center",
              transform: `translateY(${(1 - licProgress) * 20}px)`,
              opacity: licProgress,
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>
              MAY 2022
            </div>
            <div style={{ color: "#E2E8F0", fontSize: 19, fontWeight: 800 }}>
              LIC of India
            </div>
            <div
              style={{
                color: "#60A5FA",
                fontSize: 30,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                marginTop: 2,
              }}
            >
              ₹21,000 CR
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: licHeight,
              background: "linear-gradient(180deg, #1E3A8A 0%, #0F172A 100%)",
              borderTop: "3px solid #3B82F6",
              borderLeft: "1px solid rgba(59, 130, 246, 0.3)",
              borderRight: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "8px 8px 0 0",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 18,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "rgba(15, 23, 42, 0.8)",
                border: "2px solid rgba(59, 130, 246, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#93C5FD",
                fontWeight: 900,
                fontSize: 16,
              }}
            >
              #3
            </div>
          </div>
        </div>

        {/* ----------------- PILLAR 2: HYUNDAI MOTOR (Middle) ----------------- */}
        <div
          style={{
            width: 270,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: interpolate(hyundaiProgress, [0, 0.3], [0, 1]),
          }}
        >
          <div
            style={{
              marginBottom: 14,
              textAlign: "center",
              transform: `translateY(${(1 - hyundaiProgress) * 20}px)`,
              opacity: hyundaiProgress,
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>
              OCT 2024
            </div>
            <div style={{ color: "#E2E8F0", fontSize: 19, fontWeight: 800 }}>
              Hyundai Motor India
            </div>
            <div
              style={{
                color: "#38BDF8",
                fontSize: 30,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                marginTop: 2,
              }}
            >
              ₹27,870 CR
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: hyundaiHeight,
              background: "linear-gradient(180deg, #1E293B 0%, #090D16 100%)",
              borderTop: "3px solid #38BDF8",
              borderLeft: "1px solid rgba(56, 189, 248, 0.3)",
              borderRight: "1px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "8px 8px 0 0",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 18,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "rgba(15, 23, 42, 0.8)",
                border: "2px solid rgba(56, 189, 248, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#BAE6FD",
                fontWeight: 900,
                fontSize: 16,
              }}
            >
              #2
            </div>
          </div>
        </div>

        {/* ----------------- PILLAR 3: RELIANCE JIO (Tallest Champion) ----------------- */}
        <div
          style={{
            width: 330,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: interpolate(jioProgress, [0, 0.3], [0, 1]),
            position: "relative",
          }}
        >
          {/* Golden Spotlight effect behind Jio */}
          <div
            style={{
              position: "absolute",
              top: -60,
              width: 380,
              height: 680,
              background: "radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.22) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Crown Badge */}
          <div
            style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              color: "#000000",
              fontWeight: 900,
              fontSize: 11,
              letterSpacing: "0.15em",
              padding: "4px 14px",
              borderRadius: 20,
              marginBottom: 10,
              boxShadow: "0 4px 20px rgba(245, 158, 11, 0.4)",
            }}
          >
            ★ ALL-TIME RECORD BREAKER
          </div>

          <div
            style={{
              marginBottom: 14,
              textAlign: "center",
              transform: `translateY(${(1 - jioProgress) * 20}px)`,
              opacity: jioProgress,
            }}
          >
            <div style={{ color: "#FBBF24", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>
              UPCOMING 2026
            </div>
            <div style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 900 }}>
              Reliance Jio Platforms
            </div>
            <div
              style={{
                color: "#F59E0B",
                fontSize: 40,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                marginTop: 2,
                textShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
              }}
            >
              ₹{jioCounterValue.toLocaleString("en-IN")} CR
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: jioHeight,
              background: "linear-gradient(180deg, #78350F 0%, #1E1205 100%)",
              borderTop: "4px solid #F59E0B",
              borderLeft: "2px solid rgba(245, 158, 11, 0.5)",
              borderRight: "2px solid rgba(245, 158, 11, 0.5)",
              borderRadius: "10px 10px 0 0",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 18,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
                boxShadow: "0 0 25px rgba(245, 158, 11, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000000",
                fontWeight: 900,
                fontSize: 18,
              }}
            >
              #1
            </div>
          </div>
        </div>
      </div>

      {/* Slamming Red Ink Stamp on localFrame 480 (F628 "single largest public issue") */}
      {localFrame >= 480 && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: 540,
            transform: `translate(-50%, -50%) rotate(-12deg) scale(${stampScale})`,
            opacity: stampOpacity,
            border: "4px solid #DC2626",
            padding: "12px 28px",
            borderRadius: 10,
            color: "#DC2626",
            fontFamily: "'Anton', 'Impact', sans-serif",
            fontSize: 34,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 0 35px rgba(220, 38, 38, 0.5)",
            background: "rgba(10, 10, 10, 0.92)",
            pointerEvents: "none",
            zIndex: 10,
            whiteSpace: "nowrap",
          }}
        >
          ✔ LARGEST IN INDIAN CAPITAL MARKETS
        </div>
      )}
    </div>
  );
};
