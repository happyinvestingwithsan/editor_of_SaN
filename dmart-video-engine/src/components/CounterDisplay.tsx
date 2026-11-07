import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

const SNAPPY_SPRING = {
  damping: 15,
  mass: 0.8,
  stiffness: 140,
};

export interface CounterDisplayProps {
  absoluteFrame?: number;
}

/**
 * Beat 3: Natural Financial Editorial Target Stage
 * Modeled on Financial Times / Bloomberg data dossiers.
 * Exact Dimensions: Right 980px, Top 100px, Width 860px, Height 880px
 * Zero flashy neon glows, zero robotic pills. Clean editorial ledger.
 */
export const CounterDisplay: React.FC<CounterDisplayProps> = ({ absoluteFrame }) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame = absoluteFrame !== undefined ? absoluteFrame : localFrame + 284;
  const relFrame = Math.max(0, frame - 284);

  // Entrance slide from right
  const cardSpring = spring({
    frame: relFrame,
    fps,
    config: SNAPPY_SPRING,
  });
  const cardX = interpolate(cardSpring, [0, 1], [40, 0]);
  const cardOpacity = interpolate(relFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated Counter: 0 -> 30,213 (Frames 292 - 350)
  const val = Math.round(
    interpolate(frame, [292, 350], [0, 30213], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );

  // Underline progress
  const underlineProgress = interpolate(frame, [296, 350], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Outro transition before Beat 4
  const sceneOutro = interpolate(frame, [370, 376], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: sceneOutro,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* Right Stage Container (860px x 880px at Top 100px)            */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 980,
          width: 860,
          height: 880,
          opacity: cardOpacity,
          transform: `translateX(${cardX}px)`,
          borderRadius: 12,
          overflow: "hidden",
          background: "#0D1117",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 30px 70px rgba(0, 0, 0, 0.75)",
          padding: "44px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header */}
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#F59E0B",
              textTransform: "uppercase",
              borderLeft: "3px solid #F59E0B",
              paddingLeft: 10,
              marginBottom: 10,
            }}
          >
            RECORD CAPITAL ISSUE // DRHP TARGET
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            Largest Primary Offering in Indian History
          </h2>

          {/* Monumental Counter Number */}
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#F59E0B",
              lineHeight: 1.05,
              marginTop: 18,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ₹{val.toLocaleString("en-IN")} Cr
          </div>

          {/* Clean Editorial Rule Underline */}
          <div
            style={{
              width: "100%",
              height: 3,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 2,
              overflow: "hidden",
              marginTop: 14,
            }}
          >
            <div
              style={{
                width: `${underlineProgress}%`,
                height: "100%",
                backgroundColor: "#F59E0B",
              }}
            />
          </div>
        </div>

        {/* Clean Editorial Financial Ledger Breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Row 1: Fresh Issue */}
          <div
            style={{
              padding: "18px 22px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderLeft: "4px solid #10B981",
              borderRadius: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", color: "#10B981", textTransform: "uppercase" }}>
                100% Fresh Issue
              </span>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF" }}>
                ₹30,213 Cr
              </span>
            </div>
            <p style={{ margin: "4px 0 0 0", fontSize: 14, color: "#94A3B8", lineHeight: 1.35 }}>
              Proceeds fund 5G standalone network infrastructure and debt prepayment. Zero cash leakage.
            </p>
          </div>

          {/* Row 2: OFS */}
          <div
            style={{
              padding: "18px 22px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderLeft: "4px solid #38BDF8",
              borderRadius: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", color: "#38BDF8", textTransform: "uppercase" }}>
                Offer for Sale (OFS)
              </span>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#38BDF8" }}>
                NIL (₹0)
              </span>
            </div>
            <p style={{ margin: "4px 0 0 0", fontSize: 14, color: "#94A3B8", lineHeight: 1.35 }}>
              Zero promoter cashout. Promoters and strategic partners (Meta & Google) retain 100% conviction.
            </p>
          </div>

          {/* Row 3: Implied Valuation */}
          <div
            style={{
              padding: "18px 22px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderLeft: "4px solid #F59E0B",
              borderRadius: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", color: "#F59E0B", textTransform: "uppercase" }}>
                Implied Market Cap
              </span>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#F59E0B" }}>
                ₹10.3 Lakh Cr ($120B)
              </span>
            </div>
            <p style={{ margin: "4px 0 0 0", fontSize: 14, color: "#94A3B8", lineHeight: 1.35 }}>
              Commands an enterprise value rivaling global tech leaders; Top 5 listed Indian giant.
            </p>
          </div>
        </div>

        {/* Clean Ledger Footnote */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#64748B",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: 12,
          }}
        >
          SOURCE: OFFICIAL PROSPECTUS FILED WITH SEBI • PRIMARY MARKET AUDIT
        </div>
      </div>
    </div>
  );
};
