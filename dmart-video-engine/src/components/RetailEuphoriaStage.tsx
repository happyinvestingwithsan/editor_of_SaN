import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export interface RetailEuphoriaStageProps {
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
 * RetailEuphoriaStage:
 * Authentic 2.5D Editorial Newspaper & Retail Sentiment Radar
 * Sits in Left Box (Left 80px, Top 100px, Width 860px, Height 880px)
 * Covers Clip 1.1 (Frames 75 to 536):
 * - Frames 90-260: Social Media & Brokerage Euphoria
 * - Frames 260-460: "Apply with Every Family Account" Hype
 * - Frames 460-536: The Reality Check Bridge to Clip 2
 */
export const RetailEuphoriaStage: React.FC<RetailEuphoriaStageProps> = ({
  absoluteFrame,
}) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame = absoluteFrame !== undefined ? absoluteFrame : localFrame;

  // Entrance spring (starts as host docks around frame 75)
  const entrance = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: FLUID_SPRING,
  });

  const dossierY = interpolate(entrance, [0, 1], [40, 0]);
  const dossierOpacity = interpolate(frame, [75, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow Ken Burns camera drift
  const pushIn = interpolate(frame, [75, 536], [1.0, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  });

  // -------------------------------------------------------------------------
  // BEAT 1: SOCIAL MEDIA & BROKERAGE HYPE (Frames 90 -> 260)
  // -------------------------------------------------------------------------
  const hypeEntrance = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: FLUID_SPRING,
  });
  const hypeOpacity = interpolate(frame, [90, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Yellow Marker Sweep across brokerage hype (Frames 120 - 150)
  const hypeHighlight = interpolate(frame, [120, 150], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // -------------------------------------------------------------------------
  // BEAT 2: FAMILY ACCOUNT FRENZY (Frames 260 -> 460)
  // -------------------------------------------------------------------------
  const familyEntrance = spring({
    frame: Math.max(0, frame - 260),
    fps,
    config: FLUID_SPRING,
  });
  const familyOpacity = interpolate(frame, [260, 275], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stamp slam at Frame 310
  const stampSpring = spring({
    frame: Math.max(0, frame - 310),
    fps,
    config: STAMP_SPRING,
  });
  const stampScale = interpolate(stampSpring, [0, 1], [2.2, 1.0]);
  const stampOpacity = frame >= 310 ? interpolate(frame, [310, 315], [0, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 0;

  // Yellow Marker Sweep across family accounts (Frames 325 - 355)
  const familyHighlight = interpolate(frame, [325, 355], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // -------------------------------------------------------------------------
  // BEAT 3: FOOTER REALITY CHECK (Frames 450 -> 536)
  // -------------------------------------------------------------------------
  const footerEntrance = spring({
    frame: Math.max(0, frame - 450),
    fps,
    config: FLUID_SPRING,
  });
  const footerOpacity = interpolate(frame, [450, 465], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < 75) {
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
        {/* HEADER: Masthead & Sentiment Radar Banner                     */}
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
                  fontFamily: "'Playfair Display', serif",
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
                SPECIAL DISPATCH • RETAIL SENTIMENT & FOMO RADAR
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: "#B45309",
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                border: "1px solid #B45309",
                padding: "4px 10px",
                borderRadius: 4,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              ⚠ SENTIMENT ALERT
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
            "The Deafening Noise": Social Media Frenzy & Guaranteed Listing Gains
          </h2>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2-ROW EDITORIAL CARDS                                        */}
        {/* ------------------------------------------------------------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Card 1: Social Media & Brokerage Push Notifications */}
          <div
            style={{
              opacity: hypeOpacity,
              transform: `translateX(${interpolate(hypeEntrance, [0, 1], [-20, 0])}px)`,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderLeft: "5px solid #B45309",
              borderRadius: 6,
              padding: "16px 20px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#B45309",
                  textTransform: "uppercase",
                }}
              >
                PHASE 01 • SOCIAL MEDIA & BROKERAGE NOTIFICATIONS
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#B45309",
                }}
              >
                EUPHORIA LEVEL: PEAK
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 800,
                color: "#18181B",
                marginTop: 4,
              }}
            >
              "Apply with 100% of Your Savings"
            </div>

            {/* Highlighter Annotation */}
            <div
              style={{
                marginTop: 8,
                fontSize: 13,
                fontFamily: "'Inter', sans-serif",
                color: "#374151",
                lineHeight: 1.4,
                position: "relative",
              }}
            >
              <span style={{ position: "relative", zIndex: 2 }}>
                Social feeds, YouTube influencers, and brokerage apps creating artificial FOMO.
              </span>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${hypeHighlight}%`,
                  backgroundColor: "#FDE047",
                  mixBlendMode: "multiply",
                  opacity: 0.65,
                  zIndex: 1,
                  borderRadius: 2,
                }}
              />
            </div>
          </div>

          {/* Card 2: The Multi-Account Family Push */}
          <div
            style={{
              opacity: familyOpacity,
              transform: `translateX(${interpolate(familyEntrance, [0, 1], [-20, 0])}px)`,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderLeft: "5px solid #991B1B",
              borderRadius: 6,
              padding: "16px 20px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#991B1B",
                  textTransform: "uppercase",
                }}
              >
                PHASE 02 • THE ALLOTMENT LOTTERY ILLUSION
              </span>

              {/* Rubber Ink Stamp: EUPHORIA SPIKE */}
              {frame >= 310 && (
                <div
                  style={{
                    opacity: stampOpacity,
                    transform: `scale(${stampScale}) rotate(-6deg)`,
                    border: "3px solid #991B1B",
                    color: "#991B1B",
                    padding: "4px 10px",
                    borderRadius: 4,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    backgroundColor: "rgba(254, 226, 226, 0.9)",
                    boxShadow: "0 2px 8px rgba(153, 27, 27, 0.25)",
                  }}
                >
                  ⚠ EUPHORIA SPIKE
                </div>
              )}
            </div>

            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 800,
                color: "#18181B",
                marginTop: 4,
              }}
            >
              "Apply with Every Family Demat Account"
            </div>

            {/* Highlighter Annotation */}
            <div
              style={{
                marginTop: 8,
                fontSize: 13,
                fontFamily: "'Inter', sans-serif",
                color: "#374151",
                lineHeight: 1.4,
                position: "relative",
              }}
            >
              <span style={{ position: "relative", zIndex: 2 }}>
                Retail told to max out PAN cards for listing pops, ignoring fundamental downside risk.
              </span>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${familyHighlight}%`,
                  backgroundColor: "#FDE047",
                  mixBlendMode: "multiply",
                  opacity: 0.65,
                  zIndex: 1,
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* FOOTER: Reality Check & Bridge to Clip 2                      */}
        {/* ------------------------------------------------------------- */}
        <div
          style={{
            opacity: footerOpacity,
            transform: `translateY(${interpolate(footerEntrance, [0, 1], [15, 0])}px)`,
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
              MARKET RULE OF THUMB
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
              "When an IPO is pitched as a sure-shot lottery, retail absorbs the downside."
            </div>
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "#991B1B",
              border: "1px solid #991B1B",
              padding: "4px 10px",
              borderRadius: 4,
              backgroundColor: "#FEF2F2",
              letterSpacing: "0.05em",
            }}
          >
            LESSONS UP NEXT ➔
          </div>
        </div>
      </div>
    </div>
  );
};
