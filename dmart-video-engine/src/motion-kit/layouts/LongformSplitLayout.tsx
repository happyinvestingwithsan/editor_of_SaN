import React from "react";
import { AbsoluteFill, Video } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";
import { EDITORIAL_TOKENS } from "../theme/editorialTokens";

export type FacecamPosition =
  | "right_tall"
  | "left_tall"
  | "circle_bottom_left"
  | "circle_bottom_right"
  | "full_screen";

export interface LongformSplitLayoutProps {
  /** Video proxy source URL */
  videoSrc?: string;
  /** Audio track component */
  audioTrack?: React.ReactNode;
  /** Active layout framing position for host */
  facecamPosition: FacecamPosition;
  /** Host face alignment coordinates in source video (default: SaN's locked calibration origX=914.5, origY=542.7) */
  faceOriginX?: number;
  faceOriginY?: number;
  /** Custom GPU translate for facecam video element */
  customVideoTranslate?: string;
  /** Theme mode: 'editorial' (Think School warm checked paper desk) or 'dark' (classic high-contrast dark) */
  theme?: "dark" | "editorial";
  /** Whether the embedded video should be muted (defaults to true to avoid double-audio) */
  videoMuted?: boolean;
  /** Optional docket header metadata (editorial theme) */
  classification?: string;
  docketCode?: string;
  /** Optional docket footer metadata (editorial theme) */
  watermark?: string;
  /** Graphics Stage content (rendered in remaining 68% space) */
  children?: React.ReactNode;
  /** Lower third / ticker bar / watermark slot */
  overlaySlot?: React.ReactNode;
}

/**
 * LongformSplitLayout:
 * Canonical 16:9 layout for YouTube Masterclasses.
 * Enforces the 30-32% Facecam Real Estate Rule and GPU-accelerated Persistent Video transitions.
 * Fully supports the Think School / Rahul Jain / Sahil Editorial Checked Canvas standard.
 */
export const LongformSplitLayout: React.FC<LongformSplitLayoutProps> = ({
  videoSrc,
  audioTrack,
  facecamPosition,
  customVideoTranslate,
  theme = "editorial",
  videoMuted = true,
  classification = "FORENSIC CASE STUDY // Dalal Street Valuation",
  docketCode = "SAN FINANCIAL LABS // MASTERCLASS ARCHIVE",
  watermark = "STRICTLY FOR FINANCIAL EDUCATION // HAPPY INVESTING",
  children,
  overlaySlot,
}) => {
  const isEditorial = theme === "editorial";

  // Calibrated SaN Facecam Translation (Centered Chest-up in 580x980 container)
  // Measured: Face X=950.0px, Hair top Y=150.0px in 1920x1080 source.
  const defaultCalibratedTranslate = "translate(-681px, -85px) scale(1.05)";
  const activeTranslate = customVideoTranslate || defaultCalibratedTranslate;

  // Base container style for Facecam
  let containerStyle: React.CSSProperties = {
    position: "absolute",
    overflow: "hidden",
    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    zIndex: 20,
    boxShadow: isEditorial
      ? "0 16px 40px -8px rgba(15, 23, 42, 0.16), 0 0 1px rgba(15, 23, 42, 0.25)"
      : "0 20px 50px rgba(0, 0, 0, 0.7)",
  };

  let videoTranslate: string = "translate(0px, 0px) scale(1)";
  let graphicsContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: 50,
    height: 980,
    zIndex: 10,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (facecamPosition === "right_tall") {
    containerStyle = {
      ...containerStyle,
      top: 50,
      left: 1260,
      width: SAN_TOKENS.layout.longform16x9.presenterWidth,
      height: SAN_TOKENS.layout.longform16x9.presenterHeight,
      borderRadius: SAN_TOKENS.layout.longform16x9.presenterBorderRadius,
      border: isEditorial
        ? "2px solid rgba(15, 23, 42, 0.12)"
        : SAN_TOKENS.layout.longform16x9.presenterBorder,
    };
    videoTranslate = activeTranslate;
    graphicsContainerStyle = {
      ...graphicsContainerStyle,
      left: 80,
      width: 1140,
    };
  } else if (facecamPosition === "left_tall") {
    containerStyle = {
      ...containerStyle,
      top: 50,
      left: 80,
      width: SAN_TOKENS.layout.longform16x9.presenterWidth,
      height: SAN_TOKENS.layout.longform16x9.presenterHeight,
      borderRadius: SAN_TOKENS.layout.longform16x9.presenterBorderRadius,
      border: isEditorial
        ? "2px solid rgba(15, 23, 42, 0.12)"
        : SAN_TOKENS.layout.longform16x9.presenterBorder,
    };
    videoTranslate = activeTranslate;
    graphicsContainerStyle = {
      ...graphicsContainerStyle,
      left: 700,
      width: 1140,
    };
  } else if (facecamPosition === "circle_bottom_left") {
    const size = SAN_TOKENS.layout.longform16x9.circlePipSize;
    containerStyle = {
      ...containerStyle,
      bottom: 50,
      left: 80,
      width: size,
      height: size,
      borderRadius: "50%",
      border: isEditorial ? "3px solid #0F172A" : "3px solid #FFD700",
    };
    videoTranslate = "translate(-251px, -35px) scale(0.433)";
    graphicsContainerStyle = {
      ...graphicsContainerStyle,
      left: 80,
      width: 1760,
    };
  } else if (facecamPosition === "circle_bottom_right") {
    const size = SAN_TOKENS.layout.longform16x9.circlePipSize;
    containerStyle = {
      ...containerStyle,
      bottom: 50,
      right: 80,
      width: size,
      height: size,
      borderRadius: "50%",
      border: isEditorial ? "3px solid #0F172A" : "3px solid #FFD700",
    };
    videoTranslate = "translate(-251px, -35px) scale(0.433)";
    graphicsContainerStyle = {
      ...graphicsContainerStyle,
      left: 80,
      width: 1760,
    };
  } else {
    // Full screen
    containerStyle = {
      ...containerStyle,
      top: 0,
      left: 0,
      width: 1920,
      height: 1080,
      borderRadius: 0,
      border: "none",
    };
    videoTranslate = "translate(0px, 0px) scale(1)";
    graphicsContainerStyle = {
      ...graphicsContainerStyle,
      display: "none",
    };
  }

  const gridSize = 40;
  const majorGrid = 200;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isEditorial
          ? EDITORIAL_TOKENS.colors.paperCanvas
          : SAN_TOKENS.colors.bgDark,
        width: SAN_TOKENS.layout.longform16x9.width,
        height: SAN_TOKENS.layout.longform16x9.height,
        overflow: "hidden",
        fontFamily: isEditorial
          ? EDITORIAL_TOKENS.fonts.editorialSans
          : SAN_TOKENS.fonts.primary,
        color: isEditorial
          ? EDITORIAL_TOKENS.colors.inkCharcoal
          : SAN_TOKENS.colors.textPrimary,
      }}
    >
      {/* Editorial Checked Canvas Background Layer (Think School Standard) */}
      {isEditorial && (
        <>
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
              <pattern
                id="layout-grid-minor"
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

              <pattern
                id="layout-grid-major"
                width={majorGrid}
                height={majorGrid}
                patternUnits="userSpaceOnUse"
              >
                <rect width={majorGrid} height={majorGrid} fill="url(#layout-grid-minor)" />
                <path
                  d={`M ${majorGrid} 0 L 0 0 0 ${majorGrid}`}
                  fill="none"
                  stroke={EDITORIAL_TOKENS.colors.gridMajor}
                  strokeWidth="1.5"
                />
                <path
                  d="M -5 0 L 5 0 M 0 -5 L 0 5"
                  fill="none"
                  stroke={EDITORIAL_TOKENS.colors.crosshair}
                  strokeWidth="1"
                />
              </pattern>

              <filter id="layout-paper-texture">
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

            <rect width="100%" height="100%" fill="url(#layout-grid-major)" />
            <rect
              width="100%"
              height="100%"
              filter="url(#layout-paper-texture)"
              style={{ mixBlendMode: "multiply" }}
            />
          </svg>

          {/* Soft Desk-Lamp Radial Falloff */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 45% 45%, rgba(248, 247, 243, 0) 50%, rgba(25, 20, 15, 0.045) 85%, rgba(20, 15, 10, 0.08) 100%)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* 1. Master Audio Track */}
      {audioTrack}

      {/* 2. Motion Graphics Stage (68% width or full canvas) */}
      <div style={graphicsContainerStyle}>{children}</div>

      {/* 3. Persistent Single Video Facecam */}
      <div style={containerStyle}>
        {videoSrc && (
          <Video
            src={videoSrc}
            muted={videoMuted}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1920,
              height: 1080,
              transform: videoTranslate,
              transformOrigin: "0 0",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      {/* 4. Overlays / Watermark / Captions */}
      {overlaySlot}
    </AbsoluteFill>
  );
};
