import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EDITORIAL_TOKENS } from "../theme/editorialTokens";

export interface EditorialChartProps {
  /** Chart title, e.g. "48-HOUR DRAWDOWN TRAJECTORY" */
  title: string;
  /** Subtitle or timeframe, e.g. "Upper Circuit (₹88.5) to Multi-Year Low (₹58.4)" */
  subtitle?: string;
  /** Numerical data points representing the curve */
  dataPoints: number[];
  /** Institutional tone: "crimson" (drawdown), "emerald" (rally), or "neutral" */
  tone?: "crimson" | "emerald" | "neutral" | "brass";
  /** Callout badge text at the terminal tip */
  highlightLabel?: string;
  /** Optional 200 DMA horizontal benchmark level */
  dma200Level?: number;
  /** Chart draw animation duration in frames (default: 40) */
  drawDurationFrames?: number;
  /** Container max width (default: 920) */
  maxWidth?: number;
  /** Chart height (default: 340) */
  chartHeight?: number;
  /** Container style */
  style?: React.CSSProperties;
}

/**
 * EditorialChart:
 * Authentic institutional financial chart on ivory paper.
 * 
 * Features:
 * - Crisp bond paper surface with technical coordinate grid.
 * - Solid, high-contrast ink stroke (Carmine Crimson or Forest Emerald).
 * - Subtle shaded wash (0.04 opacity - zero neon).
 * - Animated path draw synchronized with voiceover.
 * - Terminal callout badge anchored to the current point.
 */
export const EditorialChart: React.FC<EditorialChartProps> = ({
  title,
  subtitle,
  dataPoints,
  tone = "crimson",
  highlightLabel,
  dma200Level,
  drawDurationFrames = 40,
  maxWidth = 920,
  chartHeight = 340,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const width = 860;
  const height = chartHeight;
  const paddingX = 40;
  const paddingTop = 30;
  const paddingBottom = 40;

  const strokeColor =
    tone === "emerald"
      ? EDITORIAL_TOKENS.colors.emerald
      : tone === "brass"
      ? EDITORIAL_TOKENS.colors.brass
      : tone === "neutral"
      ? EDITORIAL_TOKENS.colors.inkCharcoal
      : EDITORIAL_TOKENS.colors.crimson;

  const minVal = Math.min(...dataPoints);
  const maxVal = Math.max(...dataPoints);
  const range = maxVal - minVal || 1;

  // Calculate coordinates
  const points = dataPoints.map((val, idx) => {
    const x =
      paddingX + (idx / (dataPoints.length - 1)) * (width - 2 * paddingX);
    const y =
      height -
      paddingBottom -
      ((val - minVal) / range) * (height - paddingTop - paddingBottom);
    return { x, y, val };
  });

  // SVG path
  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  // Area under path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${
    height - paddingBottom
  } L ${points[0].x} ${height - paddingBottom} Z`;

  // Draw progress (0 to 1)
  const drawProgress = interpolate(frame, [0, drawDurationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentIdx = Math.min(
    points.length - 1,
    Math.floor(drawProgress * (points.length - 1))
  );
  const activePoint = points[currentIdx];

  return (
    <div
      style={{
        width: "100%",
        maxWidth,
        margin: "0 auto",
        backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
        borderRadius: 8,
        border: `1.5px solid ${EDITORIAL_TOKENS.colors.borderMedium}`,
        boxShadow: EDITORIAL_TOKENS.shadows.paperElevated,
        padding: "24px 32px 16px 32px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* Title & Metadata Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderBottom: `1px solid ${EDITORIAL_TOKENS.colors.dividerRule}`,
          paddingBottom: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
              fontSize: EDITORIAL_TOKENS.typography1080p.cardSubheading,
              fontWeight: 800,
              color: EDITORIAL_TOKENS.colors.inkCharcoal,
              margin: 0,
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <span
              style={{
                fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                fontSize: 15,
                color: EDITORIAL_TOKENS.colors.inkMuted,
                marginTop: 2,
                display: "block",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>

        {highlightLabel && (
          <span
            style={{
              fontFamily: EDITORIAL_TOKENS.fonts.monoData,
              fontSize: 14,
              fontWeight: 800,
              color: strokeColor,
              backgroundColor:
                tone === "crimson"
                  ? EDITORIAL_TOKENS.colors.crimsonTint
                  : EDITORIAL_TOKENS.colors.emeraldTint,
              border: `1px solid ${strokeColor}`,
              padding: "4px 12px",
              borderRadius: 4,
            }}
          >
            {highlightLabel}
          </span>
        )}
      </div>

      {/* SVG Chart Plot */}
      <div style={{ position: "relative", width: "100%", height, overflow: "hidden" }}>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="editorialChartWash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.10" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.00" />
            </linearGradient>
            <clipPath id="chartClip">
              <rect
                x="0"
                y="0"
                width={paddingX + drawProgress * (width - 2 * paddingX)}
                height={height}
              />
            </clipPath>
          </defs>

          {/* Coordinate Grid lines */}
          <line
            x1={paddingX}
            y1={paddingTop}
            x2={width - paddingX}
            y2={paddingTop}
            stroke={EDITORIAL_TOKENS.colors.dividerRule}
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke={EDITORIAL_TOKENS.colors.dividerRule}
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height - paddingBottom}
            x2={width - paddingX}
            y2={height - paddingBottom}
            stroke={EDITORIAL_TOKENS.colors.inkCharcoal}
            strokeWidth="1.5"
          />

          {/* Optional 200 DMA baseline */}
          {dma200Level !== undefined && (
            <g>
              <line
                x1={paddingX}
                y1={
                  height -
                  paddingBottom -
                  ((dma200Level - minVal) / range) *
                    (height - paddingTop - paddingBottom)
                }
                x2={width - paddingX}
                y2={
                  height -
                  paddingBottom -
                  ((dma200Level - minVal) / range) *
                    (height - paddingTop - paddingBottom)
                }
                stroke={EDITORIAL_TOKENS.colors.brass}
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <text
                x={width - paddingX - 10}
                y={
                  height -
                  paddingBottom -
                  ((dma200Level - minVal) / range) *
                    (height - paddingTop - paddingBottom) -
                  6
                }
                fill={EDITORIAL_TOKENS.colors.brass}
                fontSize="12"
                fontFamily={EDITORIAL_TOKENS.fonts.monoData}
                fontWeight="700"
                textAnchor="end"
              >
                200 DMA BENCHMARK
              </text>
            </g>
          )}

          {/* Shaded Area Wash */}
          <path
            d={areaD}
            fill="url(#editorialChartWash)"
            clipPath="url(#chartClip)"
          />

          {/* Main Ink Path */}
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#chartClip)"
          />

          {/* Active Tip Node */}
          {activePoint && drawProgress > 0 && (
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r="6"
              fill={strokeColor}
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
