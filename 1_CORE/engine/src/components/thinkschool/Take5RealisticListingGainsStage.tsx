import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take5RealisticListingGainsStageProps {
  localFrame: number;
}

export const Take5RealisticListingGainsStage: React.FC<Take5RealisticListingGainsStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Slider animation (Frame 1581 -> localFrame 0)
  const sliderSpring = spring({
    frame: Math.max(0, localFrame - 15),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Optimistic 20-25% expansion at localFrame 80 (Frame 1787 - 1581 = 206) -> localFrame ~190
  const optSpring = spring({
    frame: Math.max(0, localFrame - 190),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Historical comps stagger at localFrame 50
  const compsSpring = spring({
    frame: Math.max(0, localFrame - 50),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 70,
        width: 1160,
        height: 940,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: "'Inter', system-ui, sans-serif",
        transform: `translateY(${interpolate(enterSpring, [0, 1], [40, 0])}px)`,
        opacity: enterSpring,
      }}
    >
      {/* Top Header Card */}
      <div
        style={{
          backgroundColor: "#0D1322",
          border: "1.5px solid rgba(212, 175, 55, 0.4)",
          borderRadius: 20,
          padding: "20px 28px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              color: "#D4AF37",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Empirical Market Evidence
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#F3F4F6",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Realistic Mega-IPO Listing Expectations
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(212, 175, 55, 0.15)",
            border: "1.5px solid #D4AF37",
            color: "#FDE047",
            fontSize: 13,
            fontWeight: 800,
            padding: "8px 16px",
            borderRadius: 20,
            letterSpacing: "0.06em",
          }}
        >
          5% – 15% REALISTIC BAND
        </div>
      </div>

      {/* Main Center Calibration Stage */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#0B101D",
          border: "1.5px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 24,
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
            STATISTICAL LISTING-DAY RETURN CALIBRATION
          </span>
          <div style={{ color: "#F8FAFC", fontSize: 20, fontWeight: 800, marginTop: 4 }}>
            Historical Distribution for Mega Issues (&gt;₹15,000 Crore)
          </div>
        </div>

        {/* The Precision Calibration Slider */}
        <div style={{ position: "relative", padding: "30px 20px" }}>
          {/* Main Track */}
          <div
            style={{
              width: "100%",
              height: 20,
              backgroundColor: "#1E293B",
              borderRadius: 10,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* The Golden Reality Channel (5% to 15%) */}
            <div
              style={{
                position: "absolute",
                left: "25%",
                width: `${50 * sliderSpring}%`,
                height: "100%",
                background: "linear-gradient(90deg, #00E599, #D4AF37)",
                boxShadow: "0 0 25px rgba(212, 175, 55, 0.8)",
              }}
            />

            {/* Optimistic Extension (20% to 25%) */}
            <div
              style={{
                position: "absolute",
                left: "75%",
                width: `${15 * optSpring}%`,
                height: "100%",
                background: "linear-gradient(90deg, #D4AF37, #F59E0B)",
                opacity: optSpring,
              }}
            />
          </div>

          {/* Golden Highlight Label Box Above Slider */}
          <div
            style={{
              position: "absolute",
              top: -24,
              left: "25%",
              transform: "translateX(10%)",
              backgroundColor: "#0D1322",
              border: "1.5px solid #00E599",
              borderRadius: 12,
              padding: "6px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 20px rgba(0, 229, 153, 0.4)",
              opacity: sliderSpring,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#00E599" }} />
            <span style={{ color: "#00E599", fontSize: 14, fontWeight: 800 }}>
              5% – 15% HISTORICAL CEILING
            </span>
          </div>

          {/* Optimistic Label Box Above Slider */}
          {localFrame >= 190 && (
            <div
              style={{
                position: "absolute",
                top: -24,
                left: "70%",
                backgroundColor: "#0D1322",
                border: "1px dashed #F59E0B",
                borderRadius: 12,
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                opacity: optSpring,
              }}
            >
              <span style={{ color: "#F59E0B", fontSize: 13, fontWeight: 700 }}>
                20% – 25% (Bull Case)
              </span>
            </div>
          )}

          {/* Tick Markers Below Slider */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 16,
              color: "#64748B",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            <span>0% (Flat)</span>
            <span style={{ color: "#00E599" }}>+5%</span>
            <span style={{ color: "#D4AF37" }}>+15%</span>
            <span style={{ color: "#F59E0B" }}>+25%</span>
            <span style={{ color: "#EF4444" }}>+50%+ (Fantasy)</span>
          </div>
        </div>

        {/* Historical Comps Row */}
        <div
          style={{
            display: "flex",
            gap: 16,
            transform: `translateY(${interpolate(compsSpring, [0, 1], [20, 0])}px)`,
            opacity: compsSpring,
          }}
        >
          {/* Comp 1 */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#111827",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 14,
              padding: "12px 16px",
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 12, fontWeight: 600 }}>COAL INDIA (₹15,199 Cr)</div>
            <div style={{ color: "#00E599", fontSize: 20, fontWeight: 800, marginTop: 4 }}>+15.2%</div>
            <div style={{ color: "#64748B", fontSize: 11 }}>Listed at modest gain</div>
          </div>

          {/* Comp 2 */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#111827",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 14,
              padding: "12px 16px",
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 12, fontWeight: 600 }}>LIC OF INDIA (₹21,000 Cr)</div>
            <div style={{ color: "#EF4444", fontSize: 20, fontWeight: 800, marginTop: 4 }}>-7.8%</div>
            <div style={{ color: "#F87171", fontSize: 11 }}>Discount listing shock</div>
          </div>

          {/* Comp 3 */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#111827",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 14,
              padding: "12px 16px",
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 12, fontWeight: 600 }}>HYUNDAI MOTOR (₹27,870 Cr)</div>
            <div style={{ color: "#94A3B8", fontSize: 20, fontWeight: 800, marginTop: 4 }}>-1.5%</div>
            <div style={{ color: "#64748B", fontSize: 11 }}>Flat / Mild discount</div>
          </div>
        </div>

        {/* Bottom Investor Rule Card */}
        <div
          style={{
            backgroundColor: "#0D1526",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: 14,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 18 }}>💡</span>
          <div style={{ color: "#F3F4F6", fontSize: 14, fontWeight: 600 }}>
            Mega IPOs are multi-year business compounders, not Day-1 lottery tickets.
          </div>
        </div>
      </div>
    </div>
  );
};
