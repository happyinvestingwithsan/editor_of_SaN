import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export interface StartupCrashDossierProps {
  absoluteFrame?: number;
}

const FLUID_SPRING = {
  damping: 16,
  mass: 0.9,
  stiffness: 120,
};

const STAMP_SPRING = {
  damping: 12,
  mass: 0.6,
  stiffness: 180,
};

/**
 * StartupCrashDossier:
 * Authentic 2.5D Editorial Newspaper & Financial Autopsy Dossier
 * Sits in Left Box (Left 80px, Top 100px, Width 860px, Height 880px)
 * Covers Beat 2, 3, 4 of Clip 2:
 * - Frames 72-248: Paytm (-71%)
 * - Frames 248-476: Zomato (-76%)
 * - Frames 476-626: Swiggy (-22%) & 3-Startup Summary
 */
export const StartupCrashDossier: React.FC<StartupCrashDossierProps> = ({
  absoluteFrame,
}) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame = absoluteFrame !== undefined ? absoluteFrame : localFrame;

  // Global Dossier entrance (starts at Frame 60 as host begins docking)
  const entrance = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: FLUID_SPRING,
  });

  const dossierY = interpolate(entrance, [0, 1], [40, 0]);
  const dossierOpacity = interpolate(frame, [60, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow Ken Burns camera drift
  const pushIn = interpolate(frame, [60, 626], [1.0, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  });

  // -------------------------------------------------------------------------
  // BEAT 2: PAYTM (Frames 72 -> 248)
  // -------------------------------------------------------------------------
  const paytmEntrance = spring({
    frame: Math.max(0, frame - 72),
    fps,
    config: FLUID_SPRING,
  });
  const paytmOpacity = interpolate(frame, [72, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Paytm Stamp slam at Frame 115
  const paytmStampSpring = spring({
    frame: Math.max(0, frame - 115),
    fps,
    config: STAMP_SPRING,
  });
  const paytmStampScale = interpolate(paytmStampSpring, [0, 1], [2.2, 1.0]);
  const paytmStampOpacity = frame >= 115 ? interpolate(frame, [115, 120], [0, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 0;

  // Paytm Yellow Marker Sweep (Frames 130 - 155)
  const paytmHighlight = interpolate(frame, [130, 155], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // -------------------------------------------------------------------------
  // BEAT 3: ZOMATO (Frames 248 -> 476)
  // -------------------------------------------------------------------------
  const zomatoEntrance = spring({
    frame: Math.max(0, frame - 248),
    fps,
    config: FLUID_SPRING,
  });
  const zomatoOpacity = interpolate(frame, [248, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Zomato Stamp slam at Frame 295
  const zomatoStampSpring = spring({
    frame: Math.max(0, frame - 295),
    fps,
    config: STAMP_SPRING,
  });
  const zomatoStampScale = interpolate(zomatoStampSpring, [0, 1], [2.2, 1.0]);
  const zomatoStampOpacity = frame >= 295 ? interpolate(frame, [295, 300], [0, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 0;

  // Zomato Yellow Marker Sweep (Frames 315 - 340)
  const zomatoHighlight = interpolate(frame, [315, 340], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // -------------------------------------------------------------------------
  // BEAT 4: SWIGGY & SYNTHESIS (Frames 476 -> 626)
  // -------------------------------------------------------------------------
  const swiggyEntrance = spring({
    frame: Math.max(0, frame - 476),
    fps,
    config: FLUID_SPRING,
  });
  const swiggyOpacity = interpolate(frame, [476, 490], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bannerEntrance = spring({
    frame: Math.max(0, frame - 510),
    fps,
    config: FLUID_SPRING,
  });
  const bannerOpacity = interpolate(frame, [510, 525], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < 60) {
    return null;
  }

  return (
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
        pointerEvents: "none",
        perspective: 1400,
      }}
    >
      {/* Physical 2.5D Newsprint Sheet */}
      <div
        style={{
          width: 820,
          height: 840,
          opacity: dossierOpacity,
          transform: `translateY(${dossierY}px) scale(${entrance * pushIn}) rotateX(2.5deg) rotateY(-1.5deg)`,
          backgroundColor: "#F7F5EE", // Natural warm newsprint paper
          color: "#18181B",
          borderRadius: 10,
          padding: "36px 42px",
          boxShadow:
            "0 35px 80px rgba(0, 0, 0, 0.75), 0 6px 20px rgba(0, 0, 0, 0.35)",
          border: "1px solid rgba(0, 0, 0, 0.16)",
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "'Georgia', 'Times New Roman', serif",
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

        {/* ------------------------------------------------------------- */}
        {/* HEADER: Masthead & Investigation Banner                      */}
        {/* ------------------------------------------------------------- */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderBottom: "3px double #18181B",
              paddingBottom: 10,
              marginBottom: 14,
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Playfair Display', 'Times New Roman', serif",
                  fontSize: 28,
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                  color: "#18181B",
                  display: "block",
                  lineHeight: 1.0,
                }}
              >
                THE FINANCIAL CHRONICLE
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "#71717A",
                  textTransform: "uppercase",
                  marginTop: 4,
                  display: "block",
                }}
              >
                SPECIAL INVESTIGATION • POST-LISTING DRAWDOWN AUTOPSY
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: "#991B1B",
                backgroundColor: "rgba(185, 28, 28, 0.1)",
                border: "1px solid #991B1B",
                padding: "4px 10px",
                borderRadius: 4,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              ⚠ HISTORICAL PRECEDENT
            </div>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 23,
              fontWeight: 800,
              lineHeight: 1.22,
              color: "#111827",
              margin: 0,
              marginBottom: 16,
            }}
          >
            "We Have Seen This Movie Before": Lessons from India’s Celebrated Tech IPOs
          </h2>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3-ROW EDITORIAL AUTOPSY CARDS                                */}
        {/* ------------------------------------------------------------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* 1. PAYTM (One97 Communications) */}
          <div
            style={{
              opacity: paytmOpacity,
              transform: `translateX(${interpolate(paytmEntrance, [0, 1], [-20, 0])}px)`,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderLeft: "5px solid #991B1B",
              borderRadius: 6,
              padding: "12px 18px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "#6B7280",
                    textTransform: "uppercase",
                  }}
                >
                  2021 LISTING • ISSUE ₹2,150
                </span>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#18181B",
                  }}
                >
                  One97 Communications (Paytm)
                </div>
              </div>

              {/* Drawdown Metric Pill */}
              <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, fontFamily: "'Inter', sans-serif", color: "#6B7280", fontWeight: 600 }}>
                    LOW ₹438
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#991B1B",
                      lineHeight: 1,
                    }}
                  >
                    -71%
                  </div>
                </div>

                {/* Rubber Ink Stamp: CRASHED */}
                {frame >= 115 && (
                  <div
                    style={{
                      opacity: paytmStampOpacity,
                      transform: `scale(${paytmStampScale}) rotate(-8deg)`,
                      border: "3px solid #991B1B",
                      color: "#991B1B",
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 900,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      backgroundColor: "rgba(254, 226, 226, 0.8)",
                      boxShadow: "0 2px 8px rgba(153, 27, 27, 0.25)",
                    }}
                  >
                    COLLAPSED
                  </div>
                )}
              </div>
            </div>

            {/* Highlighter Annotation */}
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
                color: "#374151",
                lineHeight: 1.4,
                position: "relative",
              }}
            >
              <span style={{ position: "relative", zIndex: 2 }}>
                Early venture funds and institutions offloaded billions via Offer For Sale (OFS).
              </span>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${paytmHighlight}%`,
                  backgroundColor: "#FDE047",
                  mixBlendMode: "multiply",
                  opacity: 0.65,
                  zIndex: 1,
                  borderRadius: 2,
                }}
              />
            </div>
          </div>

          {/* 2. ZOMATO */}
          <div
            style={{
              opacity: zomatoOpacity,
              transform: `translateX(${interpolate(zomatoEntrance, [0, 1], [-20, 0])}px)`,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderLeft: "5px solid #DC2626",
              borderRadius: 6,
              padding: "12px 18px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "#6B7280",
                    textTransform: "uppercase",
                  }}
                >
                  2021 LISTING • PEAK ₹169
                </span>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#18181B",
                  }}
                >
                  Zomato Limited
                </div>
              </div>

              {/* Drawdown Metric Pill */}
              <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, fontFamily: "'Inter', sans-serif", color: "#6B7280", fontWeight: 600 }}>
                    PLUNGE TO ₹40
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#DC2626",
                      lineHeight: 1,
                    }}
                  >
                    -76%
                  </div>
                </div>

                {/* Rubber Ink Stamp: PLUNGED */}
                {frame >= 295 && (
                  <div
                    style={{
                      opacity: zomatoStampOpacity,
                      transform: `scale(${zomatoStampScale}) rotate(-6deg)`,
                      border: "3px solid #DC2626",
                      color: "#DC2626",
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 900,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      backgroundColor: "rgba(254, 226, 226, 0.8)",
                      boxShadow: "0 2px 8px rgba(220, 38, 38, 0.25)",
                    }}
                  >
                    -76% PLUNGE
                  </div>
                )}
              </div>
            </div>

            {/* Highlighter Annotation */}
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
                color: "#374151",
                lineHeight: 1.4,
                position: "relative",
              }}
            >
              <span style={{ position: "relative", zIndex: 2 }}>
                Pre-IPO anchor lock-in expired; violent panic selling before operational turnaround.
              </span>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${zomatoHighlight}%`,
                  backgroundColor: "#FDE047",
                  mixBlendMode: "multiply",
                  opacity: 0.65,
                  zIndex: 1,
                  borderRadius: 2,
                }}
              />
            </div>
          </div>

          {/* 3. SWIGGY */}
          <div
            style={{
              opacity: swiggyOpacity,
              transform: `translateX(${interpolate(swiggyEntrance, [0, 1], [-20, 0])}px)`,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderLeft: "5px solid #D97706",
              borderRadius: 6,
              padding: "12px 18px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "#6B7280",
                    textTransform: "uppercase",
                  }}
                >
                  2024 LISTING • ISSUE ₹390
                </span>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#18181B",
                  }}
                >
                  Swiggy Limited
                </div>
              </div>

              {/* Status */}
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, fontFamily: "'Inter', sans-serif", color: "#6B7280", fontWeight: 600 }}>
                  PRICE DISCOVERY
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#D97706",
                    lineHeight: 1,
                  }}
                >
                  -22%
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
                color: "#4B5563",
                lineHeight: 1.3,
              }}
            >
              Heavy ₹6,800 Cr OFS cash-out by early funds; retail absorbed immediate market volatility.
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* FOOTER: Synthesis & Warning Banner                            */}
        {/* ------------------------------------------------------------- */}
        <div
          style={{
            opacity: bannerOpacity,
            transform: `translateY(${interpolate(bannerEntrance, [0, 1], [15, 0])}px)`,
            borderTop: "2px solid #18181B",
            paddingTop: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 800,
                color: "#18181B",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              THE CORE TAKEAWAY
            </div>
            <div
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: 13,
                fontStyle: "italic",
                color: "#4B5563",
                marginTop: 2,
              }}
            >
              "When early venture capitalists dump shares via OFS, retail pays the tuition."
            </div>
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "#18181B",
              border: "1px solid #18181B",
              padding: "4px 10px",
              borderRadius: 4,
              backgroundColor: "#FAF9F5",
              letterSpacing: "0.05em",
            }}
          >
            HAPPY INVESTING RADICAL HONESTY
          </div>
        </div>
      </div>
    </div>
  );
};
