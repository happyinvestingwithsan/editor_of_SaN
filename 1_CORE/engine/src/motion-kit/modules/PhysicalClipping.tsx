import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EDITORIAL_TOKENS } from "../theme/editorialTokens";

export interface PhysicalClippingProps {
  /** Publication masthead (e.g., "THE ECONOMIC TIMES", "FINANCIAL EXPRESS", "MINT") */
  source?: string;
  /** Sub-masthead or edition string, e.g. "MARKETS SPECIAL // MUMBAI EDITION" */
  edition?: string;
  /** Publication date, e.g. "OCTOBER 2026" */
  date?: string;
  /** Main news headline */
  headline: string;
  /** Subtitle or lead paragraph snippet */
  snippet?: string;
  /** Key words to highlight with realistic marker */
  highlightPhrase?: string;
  /** Frame delay before highlighter begins sweeping */
  highlightStartFrame?: number;
  /** Highlighter ink tint */
  highlighterColor?: string;
  /** Physical rotation angle in degrees (default: -1.2 for tangible realism) */
  rotationAngle?: number;
  /** Maximum width of paper clipping */
  maxWidth?: number;
  /** Stamp overlay to slap on top (e.g. "CONFIRMED", "VERIFIED", "EXIT") */
  stampSlot?: React.ReactNode;
}

/**
 * PhysicalClipping:
 * The signature Think School / Johnny Harris scanned newspaper clipping.
 * 
 * Features:
 * - Scanned warm newsprint paper texture (#FBF9F4) with multi-layered physical desk drop shadows.
 * - Classic broadsheet masthead with double rule lines and publication metadata.
 * - Deep obsidian ink serif typography (Playfair / Georgia).
 * - Authentic Stabilo Boss marker sweep with multiply blend mode (ink visible through marker).
 * - Physical desk tilt & damped document slide entrance.
 */
export const PhysicalClipping: React.FC<PhysicalClippingProps> = ({
  source = "THE ECONOMIC TIMES",
  edition = "MARKETS FORENSICS // SPECIAL INVESTIGATION",
  date = "OCTOBER 2026",
  headline,
  snippet,
  highlightPhrase,
  highlightStartFrame = 16,
  highlighterColor = EDITORIAL_TOKENS.colors.highlighterYellow,
  rotationAngle = -1.2,
  maxWidth = 920,
  stampSlot,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Physical document slide-in spring
  const slideProgress = spring({
    frame,
    fps,
    config: EDITORIAL_TOKENS.springs.documentSlide,
  });

  const translateY = interpolate(slideProgress, [0, 1], [50, 0]);
  const scale = interpolate(slideProgress, [0, 1], [0.94, 1.0]);
  const opacity = interpolate(slideProgress, [0, 0.4, 1], [0, 1, 1]);

  // Marker highlight sweep
  const highlightProgress = interpolate(
    frame - highlightStartFrame,
    [0, 20],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Physical Paper Sheet */}
      <div
        style={{
          width: "100%",
          backgroundColor: EDITORIAL_TOKENS.colors.paperNewsprint,
          color: EDITORIAL_TOKENS.colors.inkCharcoal,
          padding: "36px 44px",
          borderRadius: 4,
          border: `1px solid ${EDITORIAL_TOKENS.colors.borderMedium}`,
          boxShadow: EDITORIAL_TOKENS.shadows.paperElevated,
          transform: `scale(${scale}) translateY(${translateY}px) rotate(${rotationAngle}deg)`,
          opacity,
          position: "relative",
          fontFamily: EDITORIAL_TOKENS.fonts.editorialSerif,
          boxSizing: "border-box",
        }}
      >
        {/* Paper Tape / Clip Illusion (Top Center) */}
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 22,
            backgroundColor: "rgba(220, 215, 200, 0.75)",
            backdropFilter: "blur(2px)",
            borderRadius: 2,
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        />

        {/* 1. Authentic Broadsheet Masthead */}
        <div
          style={{
            borderTop: `3px solid ${EDITORIAL_TOKENS.colors.inkCharcoal}`,
            borderBottom: `1px solid ${EDITORIAL_TOKENS.colors.inkCharcoal}`,
            padding: "8px 0",
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* Metadata Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: EDITORIAL_TOKENS.fonts.monoData,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: EDITORIAL_TOKENS.colors.inkMuted,
            }}
          >
            <span>{edition}</span>
            <span>{date}</span>
          </div>

          {/* Master Masthead Name */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textAlign: "center",
              color: EDITORIAL_TOKENS.colors.inkCharcoal,
              fontFamily: EDITORIAL_TOKENS.fonts.editorialSerif,
            }}
          >
            {source}
          </div>
        </div>

        {/* 2. Main News Headline */}
        <h1
          style={{
            fontFamily: EDITORIAL_TOKENS.fonts.editorialSerif,
            fontSize: EDITORIAL_TOKENS.typography1080p.sectionHeader,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: EDITORIAL_TOKENS.colors.inkCharcoal,
            margin: "0 0 16px 0",
          }}
        >
          {headline}
        </h1>

        {/* 3. Lead Snippet with Realistic Stabilo Boss Highlighter Sweep */}
        {snippet && (
          <div
            style={{
              fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
              fontSize: EDITORIAL_TOKENS.typography1080p.bodyText,
              lineHeight: 1.5,
              color: EDITORIAL_TOKENS.colors.inkSlate,
              position: "relative",
              borderTop: `1px solid ${EDITORIAL_TOKENS.colors.dividerRule}`,
              paddingTop: 14,
            }}
          >
            {highlightPhrase && snippet.includes(highlightPhrase) ? (
              (() => {
                const parts = snippet.split(highlightPhrase);
                return (
                  <span>
                    {parts[0]}
                    <span
                      style={{
                        position: "relative",
                        display: "inline-block",
                        color: EDITORIAL_TOKENS.colors.inkCharcoal,
                        fontWeight: 700,
                        padding: "0 4px",
                      }}
                    >
                      {/* Semi-transparent marker wash */}
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "-2px",
                          bottom: "-2px",
                          width: `${highlightProgress}%`,
                          backgroundColor: highlighterColor,
                          mixBlendMode: "multiply",
                          zIndex: 1,
                          pointerEvents: "none",
                          borderRadius: 2,
                        }}
                      />
                      <span style={{ position: "relative", zIndex: 2 }}>
                        {highlightPhrase}
                      </span>
                    </span>
                    {parts[1]}
                  </span>
                );
              })()
            ) : (
              <span>{snippet}</span>
            )}
          </div>
        )}

        {/* 4. Tangible Rubber Stamp Slot (if mounted) */}
        {stampSlot && (
          <div
            style={{
              position: "absolute",
              right: 30,
              bottom: 20,
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {stampSlot}
          </div>
        )}
      </div>
    </div>
  );
};
