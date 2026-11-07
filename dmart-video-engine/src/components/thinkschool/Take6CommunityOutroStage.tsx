import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take6CommunityOutroStageProps {
  localFrame: number;
}

export const Take6CommunityOutroStage: React.FC<Take6CommunityOutroStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Screen entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Card 1: Subscribe on spoken word "subscribe" (localFrame 55 = Abs Frame 3824)
  const subSpring = spring({
    frame: Math.max(0, localFrame - 55),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Card 2: Share on spoken word "share" (localFrame 150 = Abs Frame 3919)
  const shareSpring = spring({
    frame: Math.max(0, localFrame - 150),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Card 3: Comments on spoken word "comments" (localFrame 294 = Abs Frame 4063)
  const commentSpring = spring({
    frame: Math.max(0, localFrame - 294),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Happy Investing seal on spoken words "happy investing" (localFrame 406 = Abs Frame 4175)
  const sealSpring = spring({
    frame: Math.max(0, localFrame - 406),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Bell wiggle animation
  const bellWiggle =
    localFrame >= 55 && localFrame <= 155
      ? Math.sin((localFrame - 55) * 0.4) * 12
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070B12",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
        opacity: enterSpring,
      }}
    >
      {/* Background Subtle Tech Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* Main Content Area on Left 65% (Facecam is on Right) */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 90,
          width: 1120,
        }}
      >
        {/* Category Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(212, 175, 55, 0.15)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            borderRadius: 12,
            padding: "10px 22px",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 20 }}>🌿</span>
          <span
            style={{
              color: "#FACC15",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            COMMUNITY & NEXT STEPS
          </span>
        </div>

        <h2
          style={{
            color: "#F3F4F6",
            fontSize: 42,
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 30,
          }}
        >
          Join the Discipline-First Investor Circle
        </h2>

        {/* Card 1: Subscribe Button Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(15, 23, 42, 0.9))",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 18,
            padding: "22px 30px",
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: subSpring,
            transform: `translateX(${interpolate(subSpring, [0, 1], [-30, 0])}px)`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                backgroundColor: "#EF4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                transform: `rotate(${bellWiggle}deg)`,
                boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
              }}
            >
              🔔
            </div>
            <div>
              <div style={{ color: "#F3F4F6", fontSize: 22, fontWeight: 700 }}>
                Hit the Subscribe Button
              </div>
              <div style={{ color: "#9CA3AF", fontSize: 16 }}>
                100% Free of Cost • Deep Value Institutional Research
              </div>
            </div>
          </div>
          <div
            style={{
              background: "#EF4444",
              color: "#FFF",
              padding: "10px 22px",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 800,
              boxShadow: "0 8px 25px rgba(239, 68, 68, 0.4)",
            }}
          >
            SUBSCRIBE
          </div>
        </div>

        {/* Card 2: Share with a Friend */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 18,
            padding: "22px 30px",
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: shareSpring,
            transform: `translateX(${interpolate(shareSpring, [0, 1], [-30, 0])}px)`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
              }}
            >
              👥
            </div>
            <div>
              <div style={{ color: "#F3F4F6", fontSize: 22, fontWeight: 700 }}>
                Share with an Investor Friend
              </div>
              <div style={{ color: "#9CA3AF", fontSize: 16 }}>
                Help them make a rational, un-hyped decision on the Jio IPO
              </div>
            </div>
          </div>
          <div
            style={{
              color: "#60A5FA",
              background: "rgba(59, 130, 246, 0.12)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              padding: "10px 20px",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            SHARE
          </div>
        </div>

        {/* Card 3: Comments & Happy Investing Seal */}
        <div
          style={{
            background: "linear-gradient(90deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.85))",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            borderRadius: 18,
            padding: "22px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: commentSpring,
            transform: `translateX(${interpolate(commentSpring, [0, 1], [-30, 0])}px)`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
              }}
            >
              💬
            </div>
            <div>
              <div style={{ color: "#F3F4F6", fontSize: 22, fontWeight: 700 }}>
                Drop Your Questions Below
              </div>
              <div style={{ color: "#9CA3AF", fontSize: 16 }}>
                Will YOU apply for Jio or wait for the 200 DMA?
              </div>
            </div>
          </div>

          {/* Happy Investing Emblem */}
          <div
            style={{
              opacity: sealSpring,
              transform: `scale(${interpolate(sealSpring, [0, 1], [0.8, 1.0])})`,
              background: "linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(16, 185, 129, 0.2))",
              border: "2px solid #D4AF37",
              padding: "10px 22px",
              borderRadius: 12,
              color: "#FACC15",
              fontSize: 18,
              fontWeight: 900,
              boxShadow: "0 0 25px rgba(212, 175, 55, 0.3)",
              letterSpacing: 1,
            }}
          >
            HAPPY INVESTING! 🌿
          </div>
        </div>
      </div>
    </div>
  );
};
