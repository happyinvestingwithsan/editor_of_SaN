import React from "react";
import { spring, interpolate } from "remotion";
import { Compass, HeartHandshake, BookOpen, Briefcase } from "lucide-react";

export interface FounderBioCardProps {
  frame: number;
  fps: number;
}

export const FounderBioCard: React.FC<FounderBioCardProps> = ({ frame, fps }) => {
  // Box 1: Santhosh (Frame 0 of scene = ~1937)
  const spring1 = spring({
    frame: Math.max(0, frame - 0),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const x1 = interpolate(spring1, [0, 1], [60, 0]);
  const o1 = interpolate(spring1, [0, 1], [0, 1]);

  // Box 2: Happy Investing with SaN (Frame ~28 of scene = ~1965)
  const spring2 = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const x2 = interpolate(spring2, [0, 1], [60, 0]);
  const o2 = interpolate(spring2, [0, 1], [0, 1]);

  // Box 3: Teaching 6 Years (Frame ~90 of scene = ~2027)
  const spring3 = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const x3 = interpolate(spring3, [0, 1], [60, 0]);
  const o3 = interpolate(spring3, [0, 1], [0, 1]);

  // Box 4: Serious Career Path (Frame ~250 of scene = ~2188)
  const spring4 = spring({
    frame: Math.max(0, frame - 250),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const x4 = interpolate(spring4, [0, 1], [60, 0]);
  const o4 = interpolate(spring4, [0, 1], [0, 1]);

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
        gap: "18px",
      }}
    >
      {/* Box 1: Santhosh */}
      <div
        style={{
          transform: `translate3d(${x1}px, 0, 0)`,
          opacity: o1,
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
          border: "2px solid rgba(245, 158, 11, 0.5)",
          borderRadius: "20px",
          padding: "20px 28px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
          maxWidth: "880px",
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            border: "1px solid rgba(245, 158, 11, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F59E0B",
          }}
        >
          <Compass size={30} />
        </div>
        <div>
          <div style={{ color: "#FBBF24", fontSize: "14px", fontWeight: 800, textTransform: "uppercase" }}>
            Creator & Allocator
          </div>
          <div style={{ color: "#FFFFFF", fontSize: "38px", fontWeight: 900, letterSpacing: "-1px" }}>
            Santhosh (SaN)
          </div>
        </div>
      </div>

      {/* Box 2: Happy Investing with SaN */}
      {frame >= 25 && (
        <div
          style={{
            transform: `translate3d(${x2}px, 0, 0)`,
            opacity: o2,
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
            border: "2px solid rgba(16, 185, 129, 0.5)",
            borderRadius: "20px",
            padding: "20px 28px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
            maxWidth: "880px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1px solid rgba(16, 185, 129, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#34D399",
            }}
          >
            <HeartHandshake size={30} />
          </div>
          <div>
            <div style={{ color: "#34D399", fontSize: "14px", fontWeight: 800, textTransform: "uppercase" }}>
              Private Community
            </div>
            <div style={{ color: "#FFFFFF", fontSize: "32px", fontWeight: 800 }}>
              Happy Investing with SaN
            </div>
          </div>
        </div>
      )}

      {/* Box 3: Teaching 6 Years Experience */}
      {frame >= 85 && (
        <div
          style={{
            transform: `translate3d(${x3}px, 0, 0)`,
            opacity: o3,
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
            border: "2px solid rgba(59, 130, 246, 0.5)",
            borderRadius: "20px",
            padding: "20px 28px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
            maxWidth: "880px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              border: "1px solid rgba(59, 130, 246, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#60A5FA",
            }}
          >
            <BookOpen size={30} />
          </div>
          <div>
            <div style={{ color: "#60A5FA", fontSize: "14px", fontWeight: 800, textTransform: "uppercase" }}>
              Practical Mentorship
            </div>
            <div style={{ color: "#FFFFFF", fontSize: "26px", fontWeight: 700 }}>
              Teaching 6 Years of Real Market Learnings
            </div>
          </div>
        </div>
      )}

      {/* Box 4: Serious Career Path */}
      {frame >= 240 && (
        <div
          style={{
            transform: `translate3d(${x4}px, 0, 0)`,
            opacity: o4,
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
            border: "2px solid rgba(168, 85, 247, 0.5)",
            borderRadius: "20px",
            padding: "20px 28px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
            maxWidth: "880px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "rgba(168, 85, 247, 0.2)",
              border: "1px solid rgba(168, 85, 247, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C084FC",
            }}
          >
            <Briefcase size={30} />
          </div>
          <div>
            <div style={{ color: "#C084FC", fontSize: "14px", fontWeight: 800, textTransform: "uppercase" }}>
              Professional Dedication
            </div>
            <div style={{ color: "#FFFFFF", fontSize: "26px", fontWeight: 700 }}>
              Stock Market as a Serious Career Path
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
