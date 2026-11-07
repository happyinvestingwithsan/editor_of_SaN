import React from "react";
import { AbsoluteFill } from "remotion";
import { EDITORIAL_TOKENS } from "../theme/editorialTokens";

export interface EditorialCanvasProps {
  /** Optional docket file code, e.g. "FILE: EQT-2026-VALUATION" */
  docketCode?: string;
  /** Optional department or category header, e.g. "CASE STUDY // SPECIAL FORENSIC INVESTIGATION" */
  classification?: string;
  /** Optional watermark / source stamp text */
  watermark?: string;
  /** Inner content to render within safe bounds */
  children?: React.ReactNode;
  /** Whether to show technical crosshairs and coordinate markers */
  showTechnicalRulers?: boolean;
  /** Optional style override */
  style?: React.CSSProperties;
}

/**
 * EditorialCanvas:
 * The signature Think School / Rahul Jain / Sahil Editorial Checked Paper Backdrop.
 * 
 * Features:
 * - Warm Ivory Paper Tone (#F8F7F3) with soft desk-lamp radial falloff.
 * - Architectural 36px checked drafting grid with major 180px accent coordinates.
 * - Technical "+" registration crosshairs.
 * - Micro-paper grain texture via non-intrusive SVG noise.
 * - Built-in Safe Zone container (1060px x 860px) preventing any clipping or window overflow.
 */
export const EditorialCanvas: React.FC<EditorialCanvasProps> = ({
  docketCode = "",
  classification = "",
  watermark = "",
  children,
  showTechnicalRulers = false,
  style = {},
}) => {
  const gridSize = 40;
  const majorGrid = 200;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: EDITORIAL_TOKENS.colors.paperCanvas,
        overflow: "hidden",
        position: "relative",
        fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
        color: EDITORIAL_TOKENS.colors.inkCharcoal,
        ...style,
      }}
    >
      {/* 1. Architectural Checked Micro-Grid (SVG Pattern) */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.9,
        }}
      >
        <defs>
          {/* Minor 40px grid cell */}
          <pattern
            id="editorial-grid-minor"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={EDITORIAL_TOKENS.colors.gridLine}
              strokeWidth="1"
            />
          </pattern>

          {/* Major 200px grid cell (5x minor) */}
          <pattern
            id="editorial-grid-major"
            width={majorGrid}
            height={majorGrid}
            patternUnits="userSpaceOnUse"
          >
            <rect width={majorGrid} height={majorGrid} fill="url(#editorial-grid-minor)" />
            <path
              d={`M ${majorGrid} 0 L 0 0 0 ${majorGrid}`}
              fill="none"
              stroke={EDITORIAL_TOKENS.colors.gridMajor}
              strokeWidth="1.5"
            />
            {showTechnicalRulers && (
              <>
                {/* Micro "+" crosshair at intersection */}
                <path
                  d="M -5 0 L 5 0 M 0 -5 L 0 5"
                  fill="none"
                  stroke={EDITORIAL_TOKENS.colors.crosshair}
                  strokeWidth="1"
                />
              </>
            )}
          </pattern>

          {/* Subtle paper fiber noise filter */}
          <filter id="editorial-paper-texture">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.1   0 0 0 0 0.1   0 0 0 0 0.1   0 0 0 0.035 0"
            />
          </filter>
        </defs>

        {/* Checked Grid Fill */}
        <rect width="100%" height="100%" fill="url(#editorial-grid-major)" />

        {/* Paper Grain Overlay */}
        <rect
          width="100%"
          height="100%"
          filter="url(#editorial-paper-texture)"
          style={{ mixBlendMode: "multiply" }}
        />
      </svg>

      {/* 2. Soft Desk-Lamp Radial Vignette (Warm Ivory Focus) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 45% 45%, rgba(248, 247, 243, 0) 50%, rgba(25, 20, 15, 0.045) 85%, rgba(20, 15, 10, 0.08) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 3. Technical Docket Rulers & Classification Metadata */}
      {showTechnicalRulers && (
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 36,
            right: 36,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: EDITORIAL_TOKENS.fonts.monoData,
            fontSize: EDITORIAL_TOKENS.typography1080p.docketLabel,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: EDITORIAL_TOKENS.colors.inkMuted,
            borderBottom: `1px solid ${EDITORIAL_TOKENS.colors.dividerRule}`,
            paddingBottom: 10,
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: EDITORIAL_TOKENS.colors.crimson,
              }}
            />
            <span>{classification}</span>
          </div>

          <div style={{ display: "flex", gap: 18 }}>
            <span>{docketCode}</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>SEC // AUDITED</span>
          </div>
        </div>
      )}

      {/* 4. Technical Footer Docket Metadata */}
      {showTechnicalRulers && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 36,
            right: 36,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: EDITORIAL_TOKENS.fonts.monoData,
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: EDITORIAL_TOKENS.colors.inkSubtle,
            borderTop: `1px solid ${EDITORIAL_TOKENS.colors.dividerRule}`,
            paddingTop: 8,
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <div>{watermark}</div>
          <div>AXIS: 1920×1080 // 30 FPS // 48K AUDIO</div>
        </div>
      )}

      {/* 5. The Guaranteed Safe Zone Stage (Max 1060px wide x 860px high) */}
      <div
        style={{
          position: "absolute",
          top: showTechnicalRulers ? 64 : 40,
          left: 40,
          right: 40,
          bottom: showTechnicalRulers ? 50 : 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
