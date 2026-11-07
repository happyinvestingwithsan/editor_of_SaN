import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * 1. DYNAMIC STROKE BOX
 * Traces a high-contrast rounded box around a specific table cell or metric.
 * Uses SVG stroke-dasharray/stroke-dashoffset to animate the drawing in ~250ms (8 frames).
 */
export interface DynamicStrokeBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  startFrame: number;
  durationFrames?: number;
  color?: string; // default Signal Red #EF4444 or Yellow #FACC15
  strokeWidth?: number;
  cornerRadius?: number;
  fillOpacity?: number;
}

export const DynamicStrokeBox: React.FC<DynamicStrokeBoxProps> = ({
  x,
  y,
  width,
  height,
  startFrame,
  durationFrames = 150, // default 5 seconds on screen
  color = "#EF4444",
  strokeWidth = 3,
  cornerRadius = 8,
  fillOpacity = 0.12,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;
  const drawFrames = 8; // 266ms at 30fps

  const progress = interpolate(elapsed, [0, drawFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Calculate perimeter of rounded rectangle
  const perimeter = 2 * (width + height);
  const strokeOffset = perimeter * (1 - progress);

  // Fade out in last 6 frames
  const exitFrames = 6;
  const exitStart = durationFrames - exitFrames;
  const opacity = elapsed > exitStart
    ? interpolate(elapsed, [exitStart, durationFrames], [1, 0], { extrapolateRight: "clamp" })
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        opacity,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        {/* Soft glowing background fill appears once box starts drawing */}
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={height - strokeWidth}
          rx={cornerRadius}
          ry={cornerRadius}
          fill={color}
          fillOpacity={progress * fillOpacity}
          stroke="none"
        />
        {/* The animated perimeter stroke */}
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={height - strokeWidth}
          rx={cornerRadius}
          ry={cornerRadius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={perimeter}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 8px ${color}66)`,
          }}
        />
      </svg>
    </div>
  );
};

/**
 * 2. REALISTIC MARKER HIGHLIGHTER
 * Simulates a physical yellow or mint highlighter sweeping across text in a PDF document.
 */
export interface MarkerHighlighterProps {
  x: number;
  y: number;
  width: number;
  height: number;
  startFrame: number;
  durationFrames?: number;
  color?: string; // default Fluorescent Yellow #FFE600
  sweepDurationFrames?: number;
}

export const MarkerHighlighter: React.FC<MarkerHighlighterProps> = ({
  x,
  y,
  width,
  height,
  startFrame,
  durationFrames = 180,
  color = "#FFE600",
  sweepDurationFrames = 14, // ~466ms sweep
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;
  const progress = interpolate(elapsed, [0, sweepDurationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentWidth = width * progress;

  // Exit fade out
  const exitStart = durationFrames - 8;
  const opacity = elapsed > exitStart
    ? interpolate(elapsed, [exitStart, durationFrames], [0.65, 0], { extrapolateRight: "clamp" })
    : 0.65;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: currentWidth,
        height,
        backgroundColor: color,
        opacity,
        mixBlendMode: "multiply",
        borderRadius: "4px",
        pointerEvents: "none",
        zIndex: 40,
        boxShadow: `0 0 6px ${color}88`,
      }}
    />
  );
};

/**
 * 3. KINETIC CHAPTER SLIDE WIPE (Sahil Style)
 * Full-screen 500ms (15 frames) Left-to-Right slide wipe displaying Chapter Title and Number.
 */
export interface ChapterSlideWipeProps {
  chapterNumber: number | string;
  title: string;
  subtitle?: string;
  startFrame: number;
  accentColor?: string; // default #E8292E
}

export const ChapterSlideWipe: React.FC<ChapterSlideWipeProps> = ({
  chapterNumber,
  title,
  subtitle,
  startFrame,
  accentColor = "#E8292E",
}) => {
  const frame = useCurrentFrame();
  const { width: screenWidth, height: screenHeight } = useVideoConfig();

  const totalFrames = 18; // 600ms total
  if (frame < startFrame || frame > startFrame + totalFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  // Phase 1 (Frames 0-7): Enters from Left to Center
  // Phase 2 (Frames 7-11): Full coverage pause
  // Phase 3 (Frames 11-18): Clears from Center to Right
  let translateX = 0;
  if (elapsed <= 7) {
    translateX = interpolate(elapsed, [0, 7], [-screenWidth, 0], {
      extrapolateRight: "clamp",
    });
  } else if (elapsed <= 11) {
    translateX = 0;
  } else {
    translateX = interpolate(elapsed, [11, 18], [0, screenWidth], {
      extrapolateRight: "clamp",
    });
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: screenWidth,
        height: screenHeight,
        transform: `translateX(${translateX}px)`,
        backgroundColor: accentColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        boxShadow: "0 0 60px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "rgba(255, 255, 255, 0.8)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontFamily: "Inter, Montserrat, sans-serif",
          marginBottom: 12,
        }}
      >
        CHAPTER {chapterNumber}
      </div>
      <div
        style={{
          fontSize: 54,
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          fontFamily: "Inter, Montserrat, sans-serif",
          textAlign: "center",
          maxWidth: 1200,
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: "Inter, Montserrat, sans-serif",
            marginTop: 16,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

/**
 * 4. FLOATING GLASS CARD OVER FACECAM
 * Sleek glassmorphism pill / badge that slides in on the right third of the screen.
 */
export interface FloatingGlassCardProps {
  headline: string;
  metric: string;
  subtext?: string;
  badge?: string;
  x?: number;
  y?: number;
  startFrame: number;
  durationFrames?: number;
  accentColor?: string;
}

export const FloatingGlassCard: React.FC<FloatingGlassCardProps> = ({
  headline,
  metric,
  subtext,
  badge = "FORENSIC PROOF",
  x = 1200,
  y = 280,
  startFrame,
  durationFrames = 150,
  accentColor = "#00D09C",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  // Spring slide entrance from right
  const entrance = spring({
    frame: elapsed,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const slideX = interpolate(entrance, [0, 1], [300, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Exit fade & slide
  const exitStart = durationFrames - 10;
  const exitSlide = elapsed > exitStart
    ? interpolate(elapsed, [exitStart, durationFrames], [0, 40], { extrapolateRight: "clamp" })
    : 0;
  const exitOpacity = elapsed > exitStart
    ? interpolate(elapsed, [exitStart, durationFrames], [1, 0], { extrapolateRight: "clamp" })
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translateX(${slideX + exitSlide}px)`,
        opacity: opacity * exitOpacity,
        width: 480,
        backgroundColor: "rgba(15, 23, 42, 0.92)",
        backdropFilter: "blur(16px)",
        border: `1.5px solid rgba(255, 255, 255, 0.14)`,
        borderLeft: `5px solid ${accentColor}`,
        borderRadius: 16,
        padding: "24px 28px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)",
        zIndex: 60,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: accentColor,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            backgroundColor: `${accentColor}1A`,
            padding: "4px 8px",
            borderRadius: 6,
          }}
        >
          {badge}
        </span>
      </div>

      <div style={{ fontSize: 16, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {headline}
      </div>

      <div style={{ fontSize: 38, fontWeight: 900, color: "#FFFFFF", margin: "8px 0", letterSpacing: "-0.02em" }}>
        {metric}
      </div>

      {subtext && (
        <div style={{ fontSize: 13, fontWeight: 500, color: "#CBD5E1", lineHeight: 1.4 }}>
          {subtext}
        </div>
      )}
    </div>
  );
};
