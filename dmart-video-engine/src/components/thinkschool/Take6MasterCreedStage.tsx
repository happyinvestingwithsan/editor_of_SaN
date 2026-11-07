import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take6MasterCreedStageProps {
  localFrame: number;
}

export const Take6MasterCreedStage: React.FC<Take6MasterCreedStageProps> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Screen entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Line 1 reveal on spoken word "afford" (localFrame 20 = Abs Frame 3621)
  const line1Spring = spring({
    frame: Math.max(0, localFrame - 20),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Line 2 reveal on spoken word "greed" (localFrame 96 = Abs Frame 3697)
  const line2Spring = spring({
    frame: Math.max(0, localFrame - 96),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "transparent",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
        opacity: enterSpring,
        pointerEvents: "none",
        zIndex: 60, // Sits comfortably over the full-screen facecam
      }}
    >
      {/* Cinematic Quote Floating Card at Lower Third */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1300,
          background: "rgba(11, 14, 20, 0.88)",
          border: "2px solid rgba(212, 175, 55, 0.6)",
          borderRadius: 24,
          padding: "32px 48px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.2)",
          backdropFilter: "blur(16px)",
          textAlign: "center",
        }}
      >
        {/* Header tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            color: "#D4AF37",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          <span>⚖️</span>
          <span>THE MASTER INVESTOR CREED</span>
        </div>

        {/* Quote Line 1 */}
        <div
          style={{
            color: "#E5E7EB",
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.4,
            opacity: line1Spring,
            transform: `translateY(${interpolate(line1Spring, [0, 1], [15, 0])}px)`,
            marginBottom: 10,
          }}
        >
          "I can always afford to miss an opportunity..."
        </div>

        {/* Quote Line 2 */}
        <div
          style={{
            color: "#FACC15",
            fontSize: 38,
            fontWeight: 900,
            lineHeight: 1.3,
            opacity: line2Spring,
            transform: `scale(${interpolate(line2Spring, [0, 1], [0.95, 1.0])})`,
            textShadow: "0 0 25px rgba(250, 204, 21, 0.4)",
          }}
        >
          "...but I refuse to let greed compromise my discipline."
        </div>
      </div>
    </div>
  );
};
