import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface ChartDataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface FinancialChartProps {
  title: string;
  subtitle?: string;
  dataPoints: number[]; // normalized 0 to 100 or actual prices
  strokeColor?: string;
  drawDurationFrames?: number;
  highlightLabel?: string;
  dma200Level?: number; // optional baseline 200 DMA line
}

export const FinancialChart: React.FC<FinancialChartProps> = ({
  title,
  subtitle,
  dataPoints,
  strokeColor = SAN_TOKENS.colors.positive,
  drawDurationFrames = 45,
  highlightLabel,
  dma200Level,
}) => {
  const frame = useCurrentFrame();

  const width = 800;
  const height = 400;
  const padding = 40;

  const minVal = Math.min(...dataPoints);
  const maxVal = Math.max(...dataPoints);
  const range = maxVal - minVal || 1;

  const points = dataPoints.map((val, idx) => {
    const x = padding + (idx / (dataPoints.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((val - minVal) / range) * (height - 2 * padding);
    return { x, y, val };
  });

  // Build SVG path string
  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  // Path drawing progress (0 to 1)
  const drawProgress = interpolate(frame, [0, drawDurationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Calculate tip point coordinates along path
  const currentIdx = Math.min(
    points.length - 1,
    Math.floor(drawProgress * (points.length - 1))
  );
  const tipPoint = points[currentIdx] || points[0];

  return (
    <div
      style={{
        backgroundColor: SAN_TOKENS.colors.surfaceCard,
        border: `1.5px solid ${SAN_TOKENS.colors.borderGlow}`,
        borderRadius: 24,
        padding: "28px 32px",
        width: "100%",
        maxWidth: 880,
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
        fontFamily: SAN_TOKENS.fonts.primary,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 32, fontWeight: 800, color: SAN_TOKENS.colors.textPrimary, margin: 0 }}>
            {title}
          </h3>
          {subtitle && (
            <span style={{ fontSize: 18, color: SAN_TOKENS.colors.textMuted, marginTop: 4, display: "block" }}>
              {subtitle}
            </span>
          )}
        </div>
        {highlightLabel && (
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: strokeColor,
              backgroundColor: `${strokeColor}22`,
              border: `1px solid ${strokeColor}`,
              padding: "6px 14px",
              borderRadius: 8,
              fontFamily: SAN_TOKENS.fonts.numbers,
            }}
          >
            {highlightLabel}
          </span>
        )}
      </div>

      <div style={{ position: "relative", width: "100%", height, overflow: "hidden" }}>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.12)" />

          {/* Optional 200 DMA baseline */}
          {dma200Level !== undefined && (
            <line
              x1={padding}
              y1={height - padding - ((dma200Level - minVal) / range) * (height - 2 * padding)}
              x2={width - padding}
              y2={height - padding - ((dma200Level - minVal) / range) * (height - 2 * padding)}
              stroke={SAN_TOKENS.colors.gold}
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          )}

          {/* Main Stock Path */}
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="4"
            strokeDasharray={2000}
            strokeDashoffset={2000 * (1 - drawProgress)}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Shaded Area */}
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
            fill="url(#chartGradient)"
            opacity={drawProgress}
          />

          {/* Glowing Tip Dot */}
          {drawProgress > 0 && drawProgress < 1 && (
            <circle
              cx={tipPoint.x}
              cy={tipPoint.y}
              r="7"
              fill={strokeColor}
              filter="drop-shadow(0 0 8px #00E676)"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
