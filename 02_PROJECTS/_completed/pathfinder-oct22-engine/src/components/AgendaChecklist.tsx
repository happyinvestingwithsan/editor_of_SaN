import React from "react";
import { spring, interpolate } from "remotion";
import { BookOpen } from "lucide-react";

export interface AgendaChecklistProps {
  frame: number;
  fps: number;
}

export const AgendaChecklist: React.FC<AgendaChecklistProps> = ({ frame, fps }) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);
  const translateY = interpolate(enterSpring, [0, 1], [30, 0]);

  // Synchronized strictly to spoken words:
  // Bullet 1: "not to pick the stock for tomorrow" (frame offset ~135)
  // Bullet 2: "how to approach this is what you are going to learn" (frame offset ~250)
  // Bullet 3: "long term perspective over the years" (frame offset ~380)
  const bullets = [
    {
      step: "01",
      title: "Evaluate Real Businesses (Not Daily Tips)",
      desc: "Stop picking stocks for tomorrow. Learn the exact lenses long-term allocators use.",
      delay: 130,
    },
    {
      step: "02",
      title: "The Institutional Decision Approach",
      desc: "Understand operating leverage, balance sheet reality, and structural moats.",
      delay: 245,
    },
    {
      step: "03",
      title: "Multi-Year Compounding Mindset",
      desc: "Disciplined capital allocation over months and years with peaceful sleep at night.",
      delay: 370,
    },
  ];

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
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.94))",
          border: "2px solid rgba(245, 158, 11, 0.4)",
          borderRadius: "24px",
          padding: "36px 42px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(245, 158, 11, 0.15)",
          width: "100%",
          maxWidth: "880px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            color: "#FBBF24",
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "16px",
          }}
        >
          <BookOpen size={16} />
          Masterclass Agenda
        </div>

        <h2
          style={{
            color: "#FFFFFF",
            fontSize: "38px",
            fontWeight: 900,
            letterSpacing: "-0.5px",
            margin: "0 0 28px 0",
            fontFamily: "Inter, sans-serif",
          }}
        >
          What You Will Master in This Session:
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {bullets.map((b, idx) => {
            if (frame < b.delay) {
              return null;
            }

            const bSpring = spring({
              frame: Math.max(0, frame - b.delay),
              fps,
              config: { damping: 13, stiffness: 140 },
            });
            const bOpacity = interpolate(bSpring, [0, 1], [0, 1]);
            const bX = interpolate(bSpring, [0, 1], [40, 0]);

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "18px 24px",
                  borderRadius: "16px",
                  transform: `translate3d(${bX}px, 0, 0)`,
                  opacity: bOpacity,
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(245, 158, 11, 0.2)",
                    border: "1px solid rgba(245, 158, 11, 0.5)",
                    color: "#F59E0B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  {b.step}
                </div>
                <div>
                  <div
                    style={{
                      color: "#F8FAFC",
                      fontSize: "22px",
                      fontWeight: 700,
                      marginBottom: "4px",
                    }}
                  >
                    {b.title}
                  </div>
                  <div style={{ color: "#94A3B8", fontSize: "16px", lineHeight: 1.4 }}>
                    {b.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
