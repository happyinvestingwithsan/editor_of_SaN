import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface ThinkSchoolTake02_Scene2_OFSDefinitionProps {
  localFrame: number;
}

export const ThinkSchoolTake02_Scene2_OFSDefinition: React.FC<
  ThinkSchoolTake02_Scene2_OFSDefinitionProps
> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Master entrance
  const headerSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word-synced: Frame 97 is Frame 374 in master timeline ("Paytm, Swiggy, Zomato, Nykaa")
  const cardsSpring = spring({
    frame: Math.max(0, localFrame - 80),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Word-synced: Frame 233 is Frame 510 in master timeline ("Offer for Sale / OFS")
  const ofsCalloutSpring = spring({
    frame: Math.max(0, localFrame - 210),
    fps,
    config: { damping: 11, stiffness: 160 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 660,
        top: 50,
        width: 1200,
        height: 980,
        backgroundColor: "rgba(11, 15, 23, 0.95)",
        borderRadius: 24,
        border: "1.5px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Blueprint Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 50,
          right: 50,
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "5px 12px",
            borderRadius: 6,
            background: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            color: "#F59E0B",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}
        >
          THE STRUCTURAL VEHICLE
        </div>
        <h1
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          In Almost Every Loss-Making Tech Listing...
        </h1>
      </div>

      {/* 4 Tech Listing Cards (Paytm, Swiggy, Zomato, Nykaa) */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 50,
          right: 50,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          opacity: cardsSpring,
          transform: `scale(${interpolate(cardsSpring, [0, 1], [0.95, 1])})`,
        }}
      >
        {/* Paytm Card */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "1.5px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: "#FFF", fontSize: 22, fontWeight: 900 }}>PAYTM</div>
            <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 4 }}>
              Total IPO: ₹18,300 Cr
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#EF4444", fontSize: 20, fontWeight: 900 }}>₹10,000 Cr OFS</div>
            <div style={{ color: "#FCA5A5", fontSize: 12 }}>55% Was OFS Exit</div>
          </div>
        </div>

        {/* Swiggy Card */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "1.5px solid rgba(245, 158, 11, 0.4)",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: "#FFF", fontSize: 22, fontWeight: 900 }}>SWIGGY</div>
            <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 4 }}>
              Total IPO: ₹11,327 Cr
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#F59E0B", fontSize: 20, fontWeight: 900 }}>₹6,828 Cr OFS</div>
            <div style={{ color: "#FDE68A", fontSize: 12 }}>60% Was OFS Exit</div>
          </div>
        </div>

        {/* Zomato Card */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "1.5px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: "#FFF", fontSize: 22, fontWeight: 900 }}>ZOMATO</div>
            <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 4 }}>
              Total IPO: ₹9,375 Cr
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#EF4444", fontSize: 20, fontWeight: 900 }}>Crash ₹169 ➔ ₹40</div>
            <div style={{ color: "#FCA5A5", fontSize: 12 }}>Post-Listing Panic</div>
          </div>
        </div>

        {/* Nykaa Card */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "1.5px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: "#FFF", fontSize: 22, fontWeight: 900 }}>NYKAA</div>
            <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 4 }}>
              Total IPO: ₹5,352 Cr
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#EF4444", fontSize: 20, fontWeight: 900 }}>₹4,722 Cr OFS</div>
            <div style={{ color: "#FCA5A5", fontSize: 12 }}>88% Was OFS Exit!</div>
          </div>
        </div>
      </div>

      {/* Giant Golden OFS Reveal Badge (Word-Synced at Frame 510) */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 50,
          right: 50,
          backgroundColor: "rgba(30, 41, 59, 0.95)",
          border: "2.5px solid #D4AF37",
          borderRadius: 20,
          padding: "26px 36px",
          boxShadow: "0 20px 50px rgba(212, 175, 55, 0.3)",
          opacity: ofsCalloutSpring,
          transform: `scale(${interpolate(ofsCalloutSpring, [0, 1], [0.85, 1])})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 40 }}>⚠️</span>
          <div>
            <div style={{ color: "#D4AF37", fontWeight: 900, fontSize: 14, letterSpacing: "0.1em" }}>
              THE CORE FINANCIAL MECHANIC
            </div>
            <div style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 28, marginTop: 2 }}>
              The Primary Vehicle: Offer for Sale (OFS)
            </div>
            <div style={{ color: "#E2E8F0", fontSize: 16, marginTop: 6, lineHeight: 1.4 }}>
              An OFS is <strong>NOT</strong> company expansion capital. It is an arrangement where existing investors sell their old shares to retail buyers and walk away with the cash.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
