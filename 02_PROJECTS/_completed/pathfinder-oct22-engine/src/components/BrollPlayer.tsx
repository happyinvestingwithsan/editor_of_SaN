import React from "react";
import { Video, staticFile, spring, interpolate } from "remotion";
import { ShieldCheck } from "lucide-react";

export interface BrollPlayerProps {
  frame: number;
  fps: number;
  src: string;
  badge: string;
  title: string;
  highlightRow?: boolean;
}

export const BrollPlayer: React.FC<BrollPlayerProps> = ({
  frame,
  fps,
  src,
  badge,
  title,
  highlightRow = true,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  const scale = interpolate(enterSpring, [0, 1], [0.92, 1.0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Highlight box draw progress (starts at frame 15, takes 15 frames)
  const highlightProgress = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          borderRadius: "20px",
          overflow: "hidden",
          border: "2px solid rgba(245, 158, 11, 0.4)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.2)",
          transform: `scale(${scale})`,
          opacity,
          backgroundColor: "#0F172A",
          position: "relative",
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.95)",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#EF4444",
                boxShadow: "0 0 10px #EF4444",
              }}
            />
            <span style={{ color: "#F8FAFC", fontSize: "20px", fontWeight: 700 }}>
              {title}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(16, 185, 129, 0.2)",
              color: "#34D399",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 700,
              border: "1px solid rgba(16, 185, 129, 0.4)",
            }}
          >
            <ShieldCheck size={16} />
            {badge}
          </div>
        </div>

        {/* Video Screen Capture */}
        <div style={{ position: "relative", width: "100%", height: "540px", overflow: "hidden" }}>
          <Video
            src={staticFile(src)}
            volume={0}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Dynamic Highlight Box */}
          {highlightRow && (
            <div
              style={{
                position: "absolute",
                top: "42%",
                left: "8%",
                width: `${interpolate(highlightProgress, [0, 1], [0, 84])}%`,
                height: "56px",
                border: "3px solid #FACC15",
                borderRadius: "8px",
                backgroundColor: "rgba(250, 204, 21, 0.15)",
                boxShadow: "0 0 25px rgba(250, 204, 21, 0.5)",
                pointerEvents: "none",
                display: highlightProgress > 0.05 ? "block" : "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-28px",
                  right: "12px",
                  backgroundColor: "#FACC15",
                  color: "#0F172A",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Audited Focus Metric
              </div>
            </div>
          )}
        </div>

        {/* Bottom Subtext */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.95)",
            padding: "12px 24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#94A3B8",
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          <span>Live Session Recording • Morning 5:30 AM - 7:00 AM IST</span>
          <span style={{ color: "#F59E0B", fontWeight: 700 }}>Unfiltered Mastermind</span>
        </div>
      </div>
    </div>
  );
};
