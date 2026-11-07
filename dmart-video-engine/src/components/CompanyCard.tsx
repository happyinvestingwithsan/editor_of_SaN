import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

const FLUID_SLIDE = {
  damping: 18,
  mass: 0.9,
  stiffness: 120,
};

export interface CompanyCardProps {
  absoluteFrame?: number;
}

/**
 * Beat 2: Authentic 2.5D Newspaper Press Clipping Stage
 * Natural, realistic newsprint texture on warm paper tone (#F7F5EE).
 * Real editorial serif typography, physical yellow marker sweep, and authentic SEBI stamp.
 * Zero flashy website backgrounds, zero robotic pills.
 * Dimensions: Left 80px, Top 100px, Width 860px, Height 880px
 */
export const CompanyCard: React.FC<CompanyCardProps> = ({ absoluteFrame }) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const compFrame = absoluteFrame !== undefined ? absoluteFrame : localFrame + 137;
  const relFrame = Math.max(0, compFrame - 137);

  // Natural paper entrance slide & 3D tilt
  const entrance = spring({
    frame: relFrame,
    fps,
    config: FLUID_SLIDE,
  });
  const paperY = interpolate(entrance, [0, 1], [40, 0]);
  const paperScale = interpolate(entrance, [0, 1], [0.94, 1.0]);
  const paperOpacity = interpolate(relFrame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow Ken Burns camera drift
  const pushIn = interpolate(relFrame, [0, 150], [1.0, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  });

  // Authentic Yellow Marker Highlighter Sweep (Frames 160 - 182)
  const markerRelFrame = Math.max(0, compFrame - 160);
  const highlightWidth = interpolate(markerRelFrame, [0, 22], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Rubber ink stamp slam at frame 195
  const stampRelFrame = Math.max(0, compFrame - 195);
  const stampSpring = spring({
    frame: stampRelFrame,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.6 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [2.2, 1.0]);
  const stampOpacity = compFrame >= 195 ? interpolate(stampRelFrame, [0, 4], [0, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 0;

  // Outro transition before Beat 3 begins at frame 284
  const stageOutro = interpolate(compFrame, [274, 284], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: stageOutro,
        perspective: 1400,
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* Left Stage Container (860px x 880px at Top 100px)             */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 80,
          width: 860,
          height: 880,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Physical 2.5D Newspaper Cutout Sheet */}
        <div
          style={{
            width: 820,
            height: 840,
            opacity: paperOpacity,
            transform: `translateY(${paperY}px) scale(${paperScale * pushIn}) rotateX(3deg) rotateY(-2deg)`,
            backgroundColor: "#F7F5EE", // Natural warm newsprint paper
            color: "#18181B",
            borderRadius: 8,
            padding: "40px 48px",
            boxShadow:
              "0 35px 80px rgba(0, 0, 0, 0.75), 0 6px 20px rgba(0, 0, 0, 0.35)",
            border: "1px solid rgba(0, 0, 0, 0.15)",
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Subtle Paper Texture Lines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 6px)",
              pointerEvents: "none",
            }}
          />

          {/* Top Newspaper Masthead */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderBottom: "3px double #18181B",
                paddingBottom: 12,
                marginBottom: 20,
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'Playfair Display', 'Times New Roman', serif",
                    fontSize: 32,
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                    color: "#18181B",
                    display: "block",
                    lineHeight: 1.0,
                  }}
                >
                  THE ECONOMIC TIMES
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#71717A",
                    textTransform: "uppercase",
                    marginTop: 4,
                    display: "block",
                  }}
                >
                  MUMBAI • FINANCIAL CAPITAL DISPATCH • OCT 2026
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#B91C1C",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                SPECIAL EDITION
              </span>
            </div>

            {/* Editorial Category Kicker */}
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.16em",
                color: "#1D4ED8",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              CAPITAL MARKETS // INITIAL PUBLIC OFFERING
            </div>

            {/* Main Newspaper Headline with Marker Sweep */}
            <h2
              style={{
                margin: 0,
                fontSize: 38,
                fontWeight: 800,
                lineHeight: 1.25,
                color: "#0F172A",
                letterSpacing: "-0.02em",
              }}
            >
              Reliance Jio Platforms Files DRHP For India’s Biggest IPO at{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline",
                  color: "#000000",
                  fontWeight: 900,
                  background: `linear-gradient(to right, rgba(255, 230, 0, 0.65) 0%, rgba(255, 230, 0, 0.65) ${highlightWidth}%, transparent ${highlightWidth}%, transparent 100%)`,
                  padding: "2px 6px",
                  borderRadius: 4,
                  boxDecorationBreak: "clone",
                  WebkitBoxDecorationBreak: "clone",
                }}
              >
                ₹30,213 Crore
              </span>
            </h2>
          </div>

          {/* Sub-Article News Columns (Realistic Print Newspaper Feel) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 28,
              marginTop: 18,
              paddingTop: 18,
              borderTop: "1px solid rgba(0, 0, 0, 0.15)",
              fontFamily: "'Georgia', serif",
              fontSize: 15,
              lineHeight: 1.5,
              color: "#334155",
            }}
          >
            <div>
              <p style={{ margin: 0 }}>
                <strong>MUMBAI:</strong> In a landmark regulatory milestone,
                Reliance Jio Platforms Limited has formally submitted its Draft
                Red Herring Prospectus (DRHP) to the Securities and Exchange
                Board of India (SEBI).
              </p>
              <p style={{ margin: "10px 0 0 0" }}>
                The offering represents the single largest primary issue in the
                history of the Indian capital markets, eclipsing all previous state-owned
                and multinational listings.
              </p>
            </div>
            <div>
              <p style={{ margin: 0 }}>
                The public issue will raise <strong>₹30,213 Crore</strong> exclusively
                through a 100% fresh issue. Promoter Reliance Industries will not offload
                shares via Offer for Sale.
              </p>
              <p style={{ margin: "10px 0 0 0" }}>
                The proceeds are earmarked to prepay high-cost debt and fund 5G network
                infrastructure expansion across telecom circles.
              </p>
            </div>
          </div>

          {/* Bottom Footer & Rubber Stamp */}
          <div
            style={{
              borderTop: "1px solid rgba(0, 0, 0, 0.2)",
              paddingTop: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: "#64748B",
              }}
            >
              SOURCE: AUDITED DRHP FILING WITH SEBI // REGULATORY RECORDS
            </div>

            {/* Authentic Red Rubber Ink Stamp (Slams at Frame 195) */}
            {compFrame >= 195 && (
              <div
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: -10,
                  transform: `scale(${stampScale}) rotate(-9deg)`,
                  opacity: stampOpacity,
                  border: "3px solid #DC2626",
                  color: "#DC2626",
                  padding: "6px 16px",
                  borderRadius: 6,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  mixBlendMode: "multiply",
                  boxShadow: "0 0 4px rgba(220, 38, 38, 0.3)",
                }}
              >
                ✔ SEBI FILED 2026
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
