import React from "react";
import { spring, interpolate } from "remotion";
import { ShieldAlert, Award } from "lucide-react";

export interface TimelineJourneyProps {
  frame: number;
  fps: number;
}

export const TimelineJourney: React.FC<TimelineJourneyProps> = ({ frame, fps }) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);
  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);

  // Timeline line draw
  const lineProgress = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "20px",
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.4)",
          color: "#F87171",
          padding: "6px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "16px",
          width: "fit-content",
          alignSelf: "center",
        }}
      >
        The 6-Year Reality Check
      </div>

      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "42px",
          fontWeight: 900,
          letterSpacing: "-1px",
          margin: "0 0 36px 0",
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
        }}
      >
        Why Struggle Alone in the Markets?
      </h1>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "880px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {/* Animated Connecting Vertical Line */}
        <div
          style={{
            position: "absolute",
            left: "29px",
            top: "30px",
            width: "3px",
            height: `${lineProgress * 150}px`,
            background: "linear-gradient(to bottom, #EF4444, #F59E0B, #10B981)",
            zIndex: 1,
          }}
        />

        {/* Phase 1: 2018-2021 Struggle */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "24px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#1E293B",
              border: "3px solid #EF4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
            }}
          >
            <ShieldAlert size={28} color="#EF4444" />
          </div>
          <div
            style={{
              flex: 1,
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "16px",
              padding: "20px 26px",
            }}
          >
            <div style={{ color: "#EF4444", fontWeight: 800, fontSize: "16px" }}>
              2018 – 2021: Solo Trial & Costly Errors ⚠️
            </div>
            <div style={{ color: "#F8FAFC", fontSize: "22px", fontWeight: 700, marginTop: "4px" }}>
              Struggling with Information Overload
            </div>
            <div style={{ color: "#94A3B8", fontSize: "15px", marginTop: "4px" }}>
              Listening to noise, unverified media targets, and paying heavy tuition fees to Mr. Market.
            </div>
          </div>
        </div>

        {/* Phase 2: 2021-Present Framework */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "24px",
            position: "relative",
            zIndex: 2,
            opacity: lineProgress > 0.6 ? 1 : 0.4,
            transition: "opacity 0.3s ease",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#1E293B",
              border: "3px solid #10B981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
            }}
          >
            <Award size={28} color="#10B981" />
          </div>
          <div
            style={{
              flex: 1,
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              borderRadius: "16px",
              padding: "20px 26px",
            }}
          >
            <div style={{ color: "#34D399", fontWeight: 800, fontSize: "16px" }}>
              2021 – 2026: Institutional Community Framework 🛡️
            </div>
            <div style={{ color: "#F8FAFC", fontSize: "22px", fontWeight: 700, marginTop: "4px" }}>
              Systematized Process & Capital Protection
            </div>
            <div style={{ color: "#94A3B8", fontSize: "15px", marginTop: "4px" }}>
              Compressing 6 years of painful learning into 90-minute structured sessions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
