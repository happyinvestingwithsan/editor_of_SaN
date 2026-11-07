import React from "react";
import { spring, interpolate } from "remotion";
import { ShieldCheck, Users, FileSpreadsheet } from "lucide-react";

export interface CommunityAuditPassProps {
  frame: number;
  fps: number;
}

export const CommunityAuditPass: React.FC<CommunityAuditPassProps> = ({ frame, fps }) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 110 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [60, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  const items = [
    {
      icon: <FileSpreadsheet size={24} color="#34D399" />,
      title: "Audited Balance Sheets & ROCE Verification",
      desc: "Every claim cross-checked against statutory regulatory filings.",
      delay: 5,
    },
    {
      icon: <Users size={24} color="#FBBF24" />,
      title: "Real-Time Member Q&A (Unfiltered)",
      desc: "Community members debating entries, exits, and capital allocation.",
      delay: 15,
    },
    {
      icon: <ShieldCheck size={24} color="#60A5FA" />,
      title: "Strict Risk Guardrails Before Capital Allocation",
      desc: "No 200 DMA chart = No entry. Capital preservation first.",
      delay: 25,
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
        transform: `translate3d(0, ${translateY}px, 0)`,
        opacity,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
          border: "2px solid rgba(245, 158, 11, 0.4)",
          borderRadius: "24px",
          padding: "36px 40px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.6), 0 0 30px rgba(245, 158, 11, 0.15)",
          width: "100%",
          maxWidth: "880px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            color: "#FBBF24",
            padding: "6px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "16px",
          }}
        >
          Evaluation Standard
        </div>

        <h2
          style={{
            color: "#FFFFFF",
            fontSize: "36px",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            margin: "0 0 24px 0",
            fontFamily: "Inter, sans-serif",
          }}
        >
          How to Evaluate the Pathfinder Community:
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {items.map((item, idx) => {
            const itemSpring = spring({
              frame: Math.max(0, frame - item.delay),
              fps,
              config: { damping: 14, stiffness: 120 },
            });
            const itemOpacity = interpolate(itemSpring, [0, 1], [0, 1]);
            const itemX = interpolate(itemSpring, [0, 1], [40, 0]);

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "18px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "18px 22px",
                  borderRadius: "16px",
                  transform: `translate3d(${itemX}px, 0, 0)`,
                  opacity: itemOpacity,
                }}
              >
                <div style={{ marginTop: "2px" }}>{item.icon}</div>
                <div>
                  <div
                    style={{
                      color: "#F8FAFC",
                      fontSize: "20px",
                      fontWeight: 700,
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ color: "#94A3B8", fontSize: "16px", lineHeight: 1.4 }}>
                    {item.desc}
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
