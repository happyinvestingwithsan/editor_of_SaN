import React from "react";
import {
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

export interface ThinkSchoolCrashAutopsyProps {
  localFrame: number;
}

/**
 * Scene 3: The Tech IPO Autopsy (Paytm, Zomato, Swiggy)
 * Active Timeline: Frames 1226 - 1766 (localFrame 0 to 540 | 40.9s - 58.9s)
 *
 * Spoken Alignment:
 * - localFrame 0 - 94 (F1226 - F1320): "we have seen this movie before also..."
 * - localFrame 94 - 244 (F1320 - F1470): "We have seen in the case of Paytm... only to collapse 70% in few months"
 * - localFrame 244 - 444 (F1470 - F1670): "We saw Zomato also plunge from 169 to 40 before finding its [bottom]"
 * - localFrame 444 - 540 (F1670 - F1766): "and we saw the Swiggy face immediate post listing price discovery"
 */
export const ThinkSchoolCrashAutopsy: React.FC<ThinkSchoolCrashAutopsyProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const cameraScale = interpolate(localFrame, [0, 540], [1.0, 1.04], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1.0),
    extrapolateRight: "clamp",
  });

  // Card 1: Paytm (localFrame 94 ~ F1320 on "Paytm")
  const paytmSpring = spring({
    frame: Math.max(0, localFrame - 94),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Stamp Paytm (localFrame 195 ~ F1421 on "collapse 70%")
  const paytmStamp = spring({
    frame: Math.max(0, localFrame - 195),
    fps,
    config: { damping: 10, mass: 0.6, stiffness: 200 },
  });

  // Card 2: Zomato (localFrame 245 ~ F1471 on "We saw Zomato")
  const zomatoSpring = spring({
    frame: Math.max(0, localFrame - 245),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Card 3: Swiggy (localFrame 445 ~ F1671 on "and we saw Swiggy")
  const swiggySpring = spring({
    frame: Math.max(0, localFrame - 445),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#07080D",
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(220, 38, 38, 0.18) 0%, transparent 65%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 60px 60px, 60px 60px",
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "50px 80px 40px 80px",
        boxSizing: "border-box",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Editorial Header */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(220, 38, 38, 0.3)",
          paddingBottom: 18,
          transform: `translateY(${interpolate(entrance, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div>
          <div
            style={{
              color: "#EF4444",
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
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#EF4444",
                boxShadow: "0 0 10px #EF4444",
              }}
            />
            THE TECH IPO AUTOPSY // HISTORICAL PRECEDENTS
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 38, fontWeight: 900 }}>
            "We Have Seen This Movie Before"
          </div>
        </div>

        <div
          style={{
            background: "rgba(220, 38, 38, 0.15)",
            border: "1px solid rgba(220, 38, 38, 0.4)",
            borderRadius: 8,
            padding: "8px 20px",
            color: "#FCA5A5",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.08em",
          }}
        >
          POST-LISTING DESTRUCTION
        </div>
      </div>

      {/* 3 Casualty Cards in Row (Leaves room on bottom-right for floating facecam) */}
      <div
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          gap: 36,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingRight: 320, // Leaves room for floating facecam on bottom-right!
          paddingTop: 15,
        }}
      >
        {/* ================= CARD 1: PAYTM ================= */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(180deg, rgba(30, 15, 20, 0.85) 0%, rgba(15, 10, 15, 0.95) 100%)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: "32px 26px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
            transform: `translateY(${interpolate(paytmSpring, [0, 1], [40, 0])}px)`,
            opacity: paytmSpring,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ color: "#94A3B8", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            NOV 2021 LISTING
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 900, marginTop: 4 }}>
            Paytm (One97)
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 600 }}>Issue Price: ₹2,150</div>
            <div
              style={{
                color: "#EF4444",
                fontSize: 50,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginTop: 4,
                lineHeight: 1,
              }}
            >
              -70%
            </div>
            <div style={{ color: "#FCA5A5", fontSize: 14, fontWeight: 700, marginTop: 8 }}>
              Collapsed in Just Months
            </div>
          </div>

          {/* Stamp on localFrame 195 (F1421 "collapse 70%") */}
          {localFrame >= 195 && (
            <div
              style={{
                position: "absolute",
                top: "45%",
                left: "15%",
                transform: `rotate(-14deg) scale(${interpolate(paytmStamp, [0, 1], [3.0, 1.0])})`,
                opacity: interpolate(localFrame, [195, 200], [0, 0.95]),
                border: "4px solid #DC2626",
                padding: "8px 18px",
                borderRadius: 8,
                color: "#DC2626",
                fontWeight: 900,
                fontSize: 20,
                letterSpacing: "0.08em",
                background: "rgba(10, 10, 10, 0.9)",
              }}
            >
              CRASHED -70%
            </div>
          )}
        </div>

        {/* ================= CARD 2: ZOMATO ================= */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(180deg, rgba(30, 20, 15, 0.85) 0%, rgba(15, 10, 10, 0.95) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            borderRadius: 16,
            padding: "32px 26px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
            transform: `translateY(${interpolate(zomatoSpring, [0, 1], [40, 0])}px)`,
            opacity: zomatoSpring,
            position: "relative",
          }}
        >
          <div style={{ color: "#94A3B8", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            JULY 2021 LISTING
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 900, marginTop: 4 }}>
            Zomato
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 600 }}>
              Peak High: ₹169
            </div>
            <div
              style={{
                color: "#F59E0B",
                fontSize: 44,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginTop: 4,
                lineHeight: 1,
              }}
            >
              ₹169 → ₹40
            </div>
            <div style={{ color: "#FDE68A", fontSize: 14, fontWeight: 700, marginTop: 8 }}>
              -76% Maximum Drawdown
            </div>
          </div>
        </div>

        {/* ================= CARD 3: SWIGGY ================= */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(180deg, rgba(25, 20, 30, 0.85) 0%, rgba(10, 10, 15, 0.95) 100%)",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            borderRadius: 16,
            padding: "32px 26px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
            transform: `translateY(${interpolate(swiggySpring, [0, 1], [40, 0])}px)`,
            opacity: swiggySpring,
            position: "relative",
          }}
        >
          <div style={{ color: "#94A3B8", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
            NOV 2024 LISTING
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 900, marginTop: 4 }}>
            Swiggy
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 600 }}>
              Listing Day Volatility
            </div>
            <div
              style={{
                color: "#C084FC",
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                marginTop: 4,
                lineHeight: 1.1,
              }}
            >
              PRICE DISCOVERY
            </div>
            <div style={{ color: "#E9D5FF", fontSize: 14, fontWeight: 700, marginTop: 8 }}>
              Immediate Secondary Selloff
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Conviction Bar */}
      <div
        style={{
          width: "100%",
          background: "rgba(15, 23, 42, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 12,
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#E2E8F0", fontSize: 15, fontWeight: 700 }}>
          ⚠️ The Core Danger: Multiple Expansion with Zero Audited Cash Flow
        </span>
        <span style={{ color: "#EF4444", fontSize: 13, fontWeight: 800, letterSpacing: "0.05em" }}>
          HISTORY REPEATS FOR UNPREPARED INVESTORS
        </span>
      </div>
    </div>
  );
};
