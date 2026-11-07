import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

// =============================================================================
// PHYSICS PRESETS (Under-damped, snappy financial broadcast physics)
// =============================================================================
const SNAPPY_SPRING = {
  damping: 14,
  stiffness: 160,
  mass: 0.7,
};

const BOUNCY_BADGE = {
  damping: 12,
  stiffness: 180,
  mass: 0.6,
};

// =============================================================================
// 1. CHAPTER BUMPER
// Horizontal parchment card slide-in with mask reveal & 3-frame chromatic glitch
// =============================================================================
export interface ChapterBumperProps {
  title: string;
  subtitle?: string;
  startFrame: number;
  durationFrames?: number;
  accentColor?: string; // default #FF9933 (Saffron) or #E8292E
}

export const ChapterBumper: React.FC<ChapterBumperProps> = ({
  title,
  subtitle = "SECTION 01",
  startFrame,
  durationFrames = 90, // 3 seconds @ 30fps
  accentColor = "#FF9933",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  // Spring entrance from center-left with mask reveal
  const entrance = spring({
    frame: elapsed,
    fps,
    config: SNAPPY_SPRING,
  });

  // Exit animation in last 12 frames
  const exitFrames = 12;
  const exitStart = durationFrames - exitFrames;
  const isExiting = elapsed > exitStart;
  const exitProgress = isExiting
    ? interpolate(elapsed, [exitStart, durationFrames], [0, 1], {
        easing: Easing.bezier(0.4, 0, 1, 1),
        extrapolateRight: "clamp",
      })
    : 0;

  // 3-Frame Chromatic Aberration / RGB Split Glitch on entrance (frames 0-3) and exit
  const isGlitching = elapsed <= 3 || (isExiting && elapsed <= exitStart + 3);
  const rgbOffset = isGlitching ? (elapsed % 2 === 0 ? 3 : -3) : 0;

  const translateX = interpolate(entrance, [0, 1], [-800, 0]) + (isExiting ? exitProgress * 900 : 0);
  const opacity = interpolate(entrance, [0, 0.4, 1], [0, 0.8, 1]) * (1 - exitProgress);

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 140,
        transform: `translateX(${translateX}px)`,
        opacity,
        zIndex: 90,
      }}
    >
      {/* Warm beige parchment card container */}
      <div
        style={{
          position: "relative",
          backgroundColor: "#F3EFE0",
          borderRadius: 16,
          padding: "24px 44px",
          border: "2px solid #E2DAC5",
          borderLeft: `10px solid ${accentColor}`,
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          minWidth: 540,
          maxWidth: 900,
        }}
      >
        {/* Top Subtitle Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.22em",
              color: "#FFFFFF",
              backgroundColor: accentColor,
              padding: "4px 12px",
              borderRadius: 6,
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {subtitle}
          </span>
          <div style={{ height: 2, flex: 1, backgroundColor: "#E2DAC5" }} />
        </div>

        {/* Clean uppercase bold title with RGB split glitch */}
        <h1
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: "#1C1917",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "4px 0 0 0",
            lineHeight: 1.15,
            fontFamily: "'Inter', 'Montserrat', sans-serif",
            textShadow: isGlitching
              ? `${rgbOffset}px 0 rgba(239, 68, 68, 0.8), ${-rgbOffset}px 0 rgba(14, 165, 233, 0.8)`
              : "none",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

// =============================================================================
// 2. SCREENER CARD (Native SVG Line/Area Chart + Concentric Radar Pulse + Callout Pill)
// =============================================================================
export interface ScreenerDataPoint {
  label: string;
  value: number;
}

export interface ScreenerCardProps {
  title: string;
  subtitle?: string;
  dataPoints: ScreenerDataPoint[];
  metricCallout?: {
    pointIndex: number;
    badgeText: string;
    valueText: string;
  };
  startFrame: number;
  durationFrames?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  lineColor?: string; // default #00D09C or #3B82F6
  isDarkMode?: boolean;
}

export const ScreenerCard: React.FC<ScreenerCardProps> = ({
  title,
  subtitle,
  dataPoints,
  metricCallout,
  startFrame,
  durationFrames = 240,
  x = 100,
  y = 120,
  width = 960,
  height = 540,
  lineColor = "#00D09C",
  isDarkMode = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  // Snappy entrance spring
  const cardEntrance = spring({
    frame: elapsed,
    fps,
    config: SNAPPY_SPRING,
  });

  const cardScale = interpolate(cardEntrance, [0, 1], [0.92, 1]);
  const cardOpacity = interpolate(cardEntrance, [0, 1], [0, 1]);

  // SVG Chart drawing progress (starts after frame 10, completes over 35 frames)
  const chartDrawProgress = interpolate(elapsed - 10, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  // Chart layout geometry
  const chartPadding = { left: 80, right: 60, top: 120, bottom: 80 };
  const plotWidth = width - chartPadding.left - chartPadding.right;
  const plotHeight = height - chartPadding.top - chartPadding.bottom;

  const values = dataPoints.map((d) => d.value);
  const minVal = Math.min(...values) * 0.95;
  const maxVal = Math.max(...values) * 1.05;

  const points = dataPoints.map((d, i) => {
    const px = chartPadding.left + (i / (dataPoints.length - 1)) * plotWidth;
    const py =
      chartPadding.top +
      plotHeight -
      ((d.value - minVal) / (maxVal - minVal)) * plotHeight;
    return { x: px, y: py, ...d };
  });

  // Construct smooth SVG Bezier path
  const svgPath = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cpX1 = prev.x + (pt.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (pt.x - prev.x) / 2;
    const cpY2 = pt.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
  }, "");

  // Area closing path
  const lastPt = points[points.length - 1];
  const firstPt = points[0];
  const baselineY = chartPadding.top + plotHeight;
  const areaPath = `${svgPath} L ${lastPt.x} ${baselineY} L ${firstPt.x} ${baselineY} Z`;

  // Total path length estimation for strokeDashoffset
  const estimatedPathLength = plotWidth * 1.4;

  // Radar pulse at target point
  const targetIdx = metricCallout ? metricCallout.pointIndex : points.length - 1;
  const targetPt = points[targetIdx] || points[0];

  // Radar ripple animation (loops every 45 frames after chart draw)
  const radarStartFrame = 35;
  const isRadarActive = elapsed >= radarStartFrame;
  const radarCycle = (elapsed - radarStartFrame) % 45;
  const radarRadius = interpolate(radarCycle, [0, 45], [8, 38]);
  const radarOpacity = interpolate(radarCycle, [0, 35, 45], [0.8, 0.2, 0]);

  // Metric Callout Spring-Up (pops at frame 40)
  const badgeSpring = spring({
    frame: elapsed - 40,
    fps,
    config: BOUNCY_BADGE,
  });

  const bgCol = isDarkMode ? "rgba(17, 24, 39, 0.95)" : "#FFFFFF";
  const borderCol = isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
  const textCol = isDarkMode ? "#F3F4F6" : "#111827";
  const gridCol = isDarkMode ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.06)";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
        backgroundColor: bgCol,
        backdropFilter: "blur(20px)",
        borderRadius: 24,
        border: `1.5px solid ${borderCol}`,
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
        overflow: "hidden",
        zIndex: 50,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 36,
          right: 36,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          zIndex: 10,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: lineColor,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {subtitle || "SCREENER.IN FORENSIC METRIC"}
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: textCol,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
        </div>
      </div>

      {/* SVG Chart Layer */}
      <svg width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <linearGradient id={`areaGrad-${startFrame}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity={0.35} />
            <stop offset="100%" stopColor={lineColor} stopOpacity={0.0} />
          </linearGradient>
          <clipPath id={`chartClip-${startFrame}`}>
            <rect
              x={0}
              y={0}
              width={chartPadding.left + plotWidth * chartDrawProgress}
              height={height}
            />
          </clipPath>
        </defs>

        {/* Horizontal Gridlines */}
        {[0, 0.33, 0.66, 1].map((pct, idx) => {
          const gy = chartPadding.top + plotHeight * pct;
          const valLabel = Math.round(maxVal - pct * (maxVal - minVal));
          return (
            <g key={idx}>
              <line
                x1={chartPadding.left}
                y1={gy}
                x2={width - chartPadding.right}
                y2={gy}
                stroke={gridCol}
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
              <text
                x={chartPadding.left - 14}
                y={gy + 4}
                textAnchor="end"
                fill={isDarkMode ? "#64748B" : "#94A3B8"}
                fontSize={12}
                fontWeight={600}
              >
                ₹{valLabel}
              </text>
            </g>
          );
        })}

        {/* Animated Area Gradient */}
        <g clipPath={`url(#chartClip-${startFrame})`}>
          <path d={areaPath} fill={`url(#areaGrad-${startFrame})`} />
        </g>

        {/* Animated Stroke Line */}
        <path
          d={svgPath}
          fill="none"
          stroke={lineColor}
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={estimatedPathLength}
          strokeDashoffset={estimatedPathLength * (1 - chartDrawProgress)}
          style={{ filter: `drop-shadow(0 4px 12px ${lineColor}66)` }}
        />

        {/* X-Axis Data Point Labels */}
        {points.map((pt, idx) => (
          <text
            key={idx}
            x={pt.x}
            y={baselineY + 28}
            textAnchor="middle"
            fill={isDarkMode ? "#94A3B8" : "#64748B"}
            fontSize={12}
            fontWeight={700}
          >
            {pt.label}
          </text>
        ))}

        {/* Concentric Radar Pulse Rings at Target Node */}
        {isRadarActive && (
          <g>
            <circle
              cx={targetPt.x}
              cy={targetPt.y}
              r={radarRadius}
              fill="none"
              stroke={lineColor}
              strokeWidth={2}
              opacity={radarOpacity}
            />
            <circle
              cx={targetPt.x}
              cy={targetPt.y}
              r={radarRadius * 0.5}
              fill="none"
              stroke={lineColor}
              strokeWidth={1.5}
              opacity={radarOpacity * 0.8}
            />
            <circle
              cx={targetPt.x}
              cy={targetPt.y}
              r={6}
              fill="#FFFFFF"
              stroke={lineColor}
              strokeWidth={3}
            />
          </g>
        )}
      </svg>

      {/* Snappy Spring-Up Yellow Callout Pill (#FAEA15) */}
      {metricCallout && elapsed >= 40 && (
        <div
          style={{
            position: "absolute",
            left: targetPt.x - 70,
            top: targetPt.y - 78,
            transform: `scale(${badgeSpring})`,
            transformOrigin: "bottom center",
            backgroundColor: "#FAEA15",
            color: "#000000",
            padding: "8px 16px",
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontWeight: 900,
            zIndex: 60,
          }}
        >
          <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {metricCallout.badgeText}
          </span>
          <span style={{ fontSize: 18, letterSpacing: "-0.02em", marginTop: -2 }}>
            {metricCallout.valueText}
          </span>
          {/* Downward Arrow */}
          <div
            style={{
              position: "absolute",
              bottom: -7,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "8px solid #FAEA15",
            }}
          />
        </div>
      )}
    </div>
  );
};

// =============================================================================
// 3. DATA TABLE ROW HIGHLIGHTER
// Dynamic SVG/div highlighter bar scaling horizontally across rows/cells
// =============================================================================
export interface DataTableRowHighlighterProps {
  title?: string;
  subtitle?: string;
  headers: string[];
  rows: Array<{
    id: string;
    cells: string[];
  }>;
  highlightTarget?: {
    rowIdx: number;
    colIdx?: number; // optional: highlight specific cell vs entire row
    startFrame: number;
    durationFrames: number;
  };
  startFrame: number;
  durationFrames?: number;
  x?: number;
  y?: number;
  width?: number;
}

export const DataTableRowHighlighter: React.FC<DataTableRowHighlighterProps> = ({
  title,
  subtitle = "AUDITED FINANCIAL COMPARISON",
  headers,
  rows,
  highlightTarget,
  startFrame,
  durationFrames = 240,
  x = 100,
  y = 120,
  width = 960,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  const cardEntrance = spring({
    frame: elapsed,
    fps,
    config: SNAPPY_SPRING,
  });

  // Calculate row height & positions
  const rowHeight = 58;
  const headerHeight = 50;

  // Highlight bar scale animation
  let highlightScaleX = 0;
  let isHighlightActive = false;
  if (highlightTarget) {
    const hElapsed = frame - highlightTarget.startFrame;
    if (hElapsed >= 0 && hElapsed <= highlightTarget.durationFrames) {
      isHighlightActive = true;
      highlightScaleX = interpolate(hElapsed, [0, 10], [0, 1], {
        easing: Easing.bezier(0.25, 1, 0.5, 1),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        transform: `scale(${interpolate(cardEntrance, [0, 1], [0.94, 1])})`,
        opacity: interpolate(cardEntrance, [0, 1], [0, 1]),
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: 20,
        border: "1.5px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
        overflow: "hidden",
        zIndex: 50,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Title Header */}
      {title && (
        <div style={{ padding: "24px 32px 16px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", color: "#FACC15", textTransform: "uppercase" }}>
            {subtitle}
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
            {title}
          </div>
        </div>
      )}

      {/* Table Container */}
      <div style={{ position: "relative", padding: "16px 32px 24px 32px" }}>
        {/* The Animated Translucent Canary Yellow Highlight Bar */}
        {isHighlightActive && highlightTarget && (
          <div
            style={{
              position: "absolute",
              left: 32,
              top: 16 + headerHeight + highlightTarget.rowIdx * rowHeight,
              width: width - 64,
              height: rowHeight,
              backgroundColor: "rgba(250, 234, 21, 0.38)",
              borderLeft: "6px solid #FAEA15",
              borderRadius: "4px 8px 8px 4px",
              transform: `scaleX(${highlightScaleX})`,
              transformOrigin: "left center",
              pointerEvents: "none",
              zIndex: 10,
              boxShadow: "0 0 20px rgba(250, 234, 21, 0.25)",
            }}
          />
        )}

        {/* Table Content */}
        <table style={{ width: "100%", borderCollapse: "collapse", position: "relative", zIndex: 12 }}>
          <thead>
            <tr style={{ height: headerHeight, borderBottom: "1.5px solid rgba(255,255,255,0.14)" }}>
              {headers.map((h, idx) => (
                <th
                  key={idx}
                  style={{
                    textAlign: idx === 0 ? "left" : "right",
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#94A3B8",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0 12px",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, rIdx) => {
              const isTargetRow = highlightTarget?.rowIdx === rIdx && isHighlightActive;
              return (
                <tr
                  key={r.id}
                  style={{
                    height: rowHeight,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    backgroundColor: rIdx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                  }}
                >
                  {r.cells.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      style={{
                        textAlign: cIdx === 0 ? "left" : "right",
                        fontSize: 17,
                        fontWeight: cIdx === 0 ? 700 : 800,
                        color: isTargetRow ? "#FFFFFF" : cIdx === 0 ? "#E2E8F0" : "#F8FAFC",
                        fontVariantNumeric: "tabular-nums",
                        padding: "0 12px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// =============================================================================
// 4. SPLIT SCREEN LAYOUT
// 60% Left pane (Data/Chart) vs 40% Right pane (Speaker / Facecam viewport)
// Opposing axis slide-in with cubic easing
// =============================================================================
export interface SplitScreenLayoutProps {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  splitRatio?: number; // default 0.60 (60% left, 40% right)
  dividerColor?: string; // default #FF9933 or #3B82F6
  startFrame: number;
  durationFrames?: number;
}

export const SplitScreenLayout: React.FC<SplitScreenLayoutProps> = ({
  leftPane,
  rightPane,
  splitRatio = 0.6,
  dividerColor = "#FF9933",
  startFrame,
  durationFrames = 240,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  // Cubic synchronized entrance from opposing axes
  const progress = interpolate(elapsed, [0, 20], [0, 1], {
    easing: Easing.bezier(0.25, 1, 0.5, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftWidth = 1920 * splitRatio;
  const rightWidth = 1920 * (1 - splitRatio);

  const leftTranslateX = interpolate(progress, [0, 1], [-leftWidth, 0]);
  const rightTranslateX = interpolate(progress, [0, 1], [rightWidth, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        overflow: "hidden",
        display: "flex",
        zIndex: 40,
      }}
    >
      {/* Left Pane (60%) */}
      <div
        style={{
          width: leftWidth,
          height: 1080,
          transform: `translateX(${leftTranslateX}px)`,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0B0F19",
          borderRight: `4px solid ${dividerColor}`,
          boxShadow: "10px 0 30px rgba(0,0,0,0.5)",
          zIndex: 10,
        }}
      >
        {leftPane}
      </div>

      {/* Right Pane (40%) */}
      <div
        style={{
          width: rightWidth,
          height: 1080,
          transform: `translateX(${rightTranslateX}px)`,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#080C14",
          overflow: "hidden",
        }}
      >
        {rightPane}
      </div>
    </div>
  );
};

// =============================================================================
// 5. CAPITAL FLOW DIAGRAM
// Central node connecting to child buckets via animated bezier curves + floating particles
// =============================================================================
export interface FlowTargetNode {
  label: string;
  sublabel?: string;
  value: string;
  percentage: string;
  color: string;
}

export interface CapitalFlowDiagramProps {
  centralNode: {
    label: string;
    sublabel?: string;
    value: string;
    color?: string;
  };
  targets: FlowTargetNode[];
  startFrame: number;
  durationFrames?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export const CapitalFlowDiagram: React.FC<CapitalFlowDiagramProps> = ({
  centralNode,
  targets,
  startFrame,
  durationFrames = 240,
  x = 100,
  y = 140,
  width = 1720,
  height = 800,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  // Spring entrance for central node
  const centerEntrance = spring({
    frame: elapsed,
    fps,
    config: SNAPPY_SPRING,
  });

  // Bezier curve draw progress (frames 15 to 45)
  const pathDrawProgress = interpolate(elapsed - 15, [0, 30], [0, 1], {
    easing: Easing.bezier(0.25, 1, 0.5, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Center node geometry
  const centerX = 340;
  const centerY = height / 2;

  // Target nodes geometry
  const targetX = width - 420;
  const targetSpacing = height / (targets.length + 1);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        fontFamily: "'Inter', sans-serif",
        zIndex: 50,
      }}
    >
      {/* SVG Connecting Bezier Paths */}
      <svg width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }}>
        {targets.map((tgt, idx) => {
          const tgtY = (idx + 1) * targetSpacing;
          const curveCpX1 = centerX + (targetX - centerX) * 0.45;
          const curveCpX2 = centerX + (targetX - centerX) * 0.55;
          const pathData = `M ${centerX + 160} ${centerY} C ${curveCpX1} ${centerY}, ${curveCpX2} ${tgtY}, ${targetX - 20} ${tgtY}`;

          const pathLen = 700;

          // Continuous floating particle along path
          const particleTime = (elapsed * 0.02 + idx * 0.4) % 1;
          const t = particleTime;
          // Cubic Bezier parametric calculation for particle position (x, y)
          const p0 = { x: centerX + 160, y: centerY };
          const p1 = { x: curveCpX1, y: centerY };
          const p2 = { x: curveCpX2, y: tgtY };
          const p3 = { x: targetX - 20, y: tgtY };

          const partX =
            Math.pow(1 - t, 3) * p0.x +
            3 * Math.pow(1 - t, 2) * t * p1.x +
            3 * (1 - t) * Math.pow(t, 2) * p2.x +
            Math.pow(t, 3) * p3.x;

          const partY =
            Math.pow(1 - t, 3) * p0.y +
            3 * Math.pow(1 - t, 2) * t * p1.y +
            3 * (1 - t) * Math.pow(t, 2) * p2.y +
            Math.pow(t, 3) * p3.y;

          return (
            <g key={idx}>
              {/* Glow trace line */}
              <path
                d={pathData}
                fill="none"
                stroke={tgt.color}
                strokeWidth={3}
                strokeDasharray={pathLen}
                strokeDashoffset={pathLen * (1 - pathDrawProgress)}
                opacity={0.7}
                style={{ filter: `drop-shadow(0 0 10px ${tgt.color}88)` }}
              />

              {/* Floating animated particle indicator */}
              {pathDrawProgress >= 0.8 && (
                <circle
                  cx={partX}
                  cy={partY}
                  r={5}
                  fill="#FFFFFF"
                  style={{ filter: `drop-shadow(0 0 8px ${tgt.color})` }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Central Node Card */}
      <div
        style={{
          position: "absolute",
          left: centerX - 180,
          top: centerY - 100,
          width: 340,
          transform: `scale(${centerEntrance})`,
          backgroundColor: "rgba(17, 24, 39, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          padding: "24px 28px",
          border: `2px solid ${centralNode.color || "#00E599"}`,
          boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${centralNode.color || "#00E599"}44`,
          textAlign: "center",
          zIndex: 20,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, color: centralNode.color || "#00E599", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {centralNode.sublabel || "CAPITAL INFLOW"}
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF", margin: "6px 0 2px 0" }}>
          {centralNode.label}
        </div>
        <div style={{ fontSize: 34, fontWeight: 900, color: centralNode.color || "#00E599", letterSpacing: "-0.02em" }}>
          {centralNode.value}
        </div>
      </div>

      {/* Child Target Bucket Cards */}
      {targets.map((tgt, idx) => {
        const tgtY = (idx + 1) * targetSpacing;
        const targetEntrance = spring({
          frame: elapsed - 30 - idx * 8,
          fps,
          config: SNAPPY_SPRING,
        });

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: targetX,
              top: tgtY - 70,
              width: 380,
              transform: `scale(${targetEntrance})`,
              opacity: interpolate(targetEntrance, [0, 1], [0, 1]),
              backgroundColor: "rgba(17, 24, 39, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: 18,
              padding: "20px 24px",
              border: "1.5px solid rgba(255, 255, 255, 0.12)",
              borderLeft: `8px solid ${tgt.color}`,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)",
              zIndex: 20,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: tgt.color, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {tgt.sublabel || `ALLOCATION ${idx + 1}`}
              </span>
              <span style={{ fontSize: 14, fontWeight: 900, color: "#FFFFFF", backgroundColor: `${tgt.color}33`, padding: "3px 8px", borderRadius: 6 }}>
                {tgt.percentage}
              </span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF", margin: "6px 0 2px 0" }}>
              {tgt.label}
            </div>
            <div style={{ fontSize: 30, fontWeight: 900, color: tgt.color, letterSpacing: "-0.02em" }}>
              {tgt.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// =============================================================================
// 6. KINETIC HEADLINE CARD
// Dark article card with line-by-line animated highlighter sweep masks
// =============================================================================
export interface KineticHeadlineCardProps {
  source: string;
  date?: string;
  badge?: { label: string; color: string };
  headlineLines: string[];
  highlightLineIndexes?: number[];
  startFrame: number;
  durationFrames?: number;
  x?: number;
  y?: number;
  width?: number;
}

export const KineticHeadlineCard: React.FC<KineticHeadlineCardProps> = ({
  source,
  date = "FINANCIAL WIRE • JUST IN",
  badge = { label: "BREAKING", color: "#EF4444" },
  headlineLines,
  highlightLineIndexes = [1],
  startFrame,
  durationFrames = 240,
  x = 100,
  y = 140,
  width = 960,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const elapsed = frame - startFrame;

  const cardEntrance = spring({
    frame: elapsed,
    fps,
    config: SNAPPY_SPRING,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        transform: `scale(${interpolate(cardEntrance, [0, 1], [0.94, 1])})`,
        opacity: interpolate(cardEntrance, [0, 1], [0, 1]),
        backgroundColor: "#18181B",
        borderRadius: 20,
        border: "1.5px solid rgba(255, 255, 255, 0.14)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
        padding: "36px 44px",
        zIndex: 50,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Top Source Meta Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: "0.1em", color: "#FFFFFF" }}>
            {source}
          </span>
          <span style={{ fontSize: 13, color: "#71717A", fontWeight: 600 }}>
            {date}
          </span>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.15em",
            color: "#FFFFFF",
            backgroundColor: badge.color,
            padding: "4px 10px",
            borderRadius: 6,
            textTransform: "uppercase",
          }}
        >
          {badge.label}
        </span>
      </div>

      {/* Headline with animated marker sweep highlights */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {headlineLines.map((line, idx) => {
          const isHighlighted = highlightLineIndexes.includes(idx);
          // Highlight sweep begins 15 frames in
          const sweepElapsed = elapsed - (20 + idx * 10);
          const sweepScaleX = isHighlighted
            ? interpolate(sweepElapsed, [0, 14], [0, 1], {
                easing: Easing.bezier(0.25, 1, 0.5, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 0;

          return (
            <div key={idx} style={{ position: "relative", display: "inline-block", width: "fit-content" }}>
              {/* Yellow Highlighter Sweep Layer */}
              {isHighlighted && (
                <div
                  style={{
                    position: "absolute",
                    left: -4,
                    top: 2,
                    right: -4,
                    bottom: 2,
                    backgroundColor: "#FAEA15",
                    transform: `scaleX(${sweepScaleX})`,
                    transformOrigin: "left center",
                    borderRadius: 4,
                    zIndex: 1,
                  }}
                />
              )}
              {/* Text Layer */}
              <span
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontSize: 34,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                  color: isHighlighted && sweepScaleX > 0.5 ? "#000000" : "#FFFFFF",
                  transition: "color 0.1s ease",
                }}
              >
                {line}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
