import React from "react";
import { spring, interpolate, staticFile, Img } from "remotion";
import { ShieldCheck } from "lucide-react";

export interface FloatingStockCardProps {
  frame: number;
  fps: number;
  ticker: string;
  name: string;
  sector: string;
  badge: string;
  logoSrc?: string;
  delayFrames?: number;
  yOffset?: number;
}

export const FloatingStockCard: React.FC<FloatingStockCardProps> = ({
  frame,
  fps,
  ticker,
  name,
  sector,
  badge,
  logoSrc,
  delayFrames = 0,
  yOffset = 0,
}) => {
  if (frame < delayFrames) {
    return null;
  }

  const enterSpring = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const translateX = interpolate(enterSpring, [0, 1], [600, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translate3d(${translateX}px, ${yOffset}px, 0)`,
        opacity,
        background: "linear-gradient(135deg, rgba(17, 24, 39, 0.96), rgba(30, 41, 59, 0.94))",
        border: "2px solid rgba(245, 158, 11, 0.45)",
        borderRadius: "22px",
        padding: "24px 30px",
        boxShadow: "0 20px 45px rgba(0,0,0,0.6), 0 0 30px rgba(245, 158, 11, 0.18)",
        width: "95%",
        maxWidth: "920px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(16px)",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
        {/* Company Logo Container */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "18px",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {logoSrc ? (
            <Img
              src={staticFile(logoSrc)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <span style={{ color: "#0B0F19", fontWeight: 900, fontSize: "28px" }}>
              {ticker.slice(0, 2)}
            </span>
          )}
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "30px",
                fontWeight: 900,
                letterSpacing: "-0.5px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {name}
            </span>
            <span
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                color: "#FBBF24",
                padding: "4px 12px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 800,
                letterSpacing: "0.5px",
                border: "1px solid rgba(245, 158, 11, 0.5)",
              }}
            >
              NSE: {ticker}
            </span>
          </div>
          <div
            style={{
              color: "#94A3B8",
              fontSize: "17px",
              marginTop: "6px",
              fontWeight: 500,
            }}
          >
            {sector}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(16, 185, 129, 0.18)",
          border: "1px solid rgba(16, 185, 129, 0.5)",
          padding: "10px 18px",
          borderRadius: "12px",
          color: "#34D399",
          fontWeight: 800,
          fontSize: "16px",
          flexShrink: 0,
        }}
      >
        <ShieldCheck size={20} />
        {badge}
      </div>
    </div>
  );
};
