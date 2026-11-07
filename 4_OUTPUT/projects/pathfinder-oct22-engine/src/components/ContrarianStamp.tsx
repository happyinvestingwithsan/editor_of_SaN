import React from "react";
import { spring, interpolate } from "remotion";
import { XCircle } from "lucide-react";

export interface ContrarianStampProps {
  frame: number;
  fps: number;
}

export const ContrarianStamp: React.FC<ContrarianStampProps> = ({ frame, fps }) => {
  // Slam down physics
  const slamSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 10, stiffness: 220 },
  });

  const scale = interpolate(slamSpring, [0, 1], [2.2, 1.0]);
  const opacity = interpolate(slamSpring, [0, 1], [0, 1]);
  const rotate = interpolate(slamSpring, [0, 1], [-12, -4]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "40px",
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          opacity,
          border: "4px solid #EF4444",
          backgroundColor: "rgba(239, 68, 68, 0.12)",
          padding: "36px 50px",
          borderRadius: "24px",
          boxShadow: "0 0 60px rgba(239, 68, 68, 0.4), inset 0 0 40px rgba(239, 68, 68, 0.2)",
          backdropFilter: "blur(16px)",
          textAlign: "center",
          maxWidth: "840px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            color: "#EF4444",
            fontSize: "22px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "3px",
            marginBottom: "12px",
          }}
        >
          <XCircle size={28} />
          Strict Market Invariant
        </div>

        <div
          style={{
            color: "#FFFFFF",
            fontSize: "52px",
            fontWeight: 900,
            letterSpacing: "-1px",
            lineHeight: 1.15,
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
          }}
        >
          NOT Stock Tips. <br />
          <span style={{ color: "#EF4444" }}>ZERO Speculative Hype.</span>
        </div>

        <div
          style={{
            marginTop: "18px",
            fontSize: "20px",
            color: "#E2E8F0",
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          We do NOT trade on noise or chatroom recommendations. <br />
          We execute <span style={{ color: "#F59E0B" }}>Audited Institutional Due Diligence</span>.
        </div>
      </div>
    </div>
  );
};
