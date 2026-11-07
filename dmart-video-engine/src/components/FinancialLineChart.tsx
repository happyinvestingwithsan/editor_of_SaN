import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ChartPoint {
  x: number;
  y: number;
}

export interface Milestone {
  index: number;
  label: string;
  subtext?: string;
  isNegative?: boolean;
}

export interface FinancialLineChartProps {
  points?: ChartPoint[];
  milestones?: Milestone[];
  startFrame?: number;
  durationFrames?: number;
  lineColor?: string;
  title?: string;
  subtitle?: string;
  metricChange?: string;
  isPositive?: boolean;
}

export const FinancialLineChart: React.FC<FinancialLineChartProps> = ({
  points = [
    { x: 50, y: 320 },
    { x: 180, y: 290 },
    { x: 320, y: 350 },
    { x: 480, y: 220 },
    { x: 620, y: 260 },
    { x: 760, y: 140 },
    { x: 920, y: 80 },
  ],
  milestones = [
    { index: 3, label: "Q2 Results", subtext: "+15% Sales" },
    { index: 6, label: "₹3,450", subtext: "52-Week High", isNegative: false },
  ],
  startFrame = 0,
  durationFrames = 45,
  lineColor = "#00D09C",
  title = "RELIANCE SHARE PRICE",
  subtitle = "1-Year Historical Trend",
  metricChange = "+28.4%",
  isPositive = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(
    frame - startFrame,
    [0, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cardEntrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Build SVG path
  const dPath = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, "");

  // Area path (closed at bottom)
  const lastPt = points[points.length - 1];
  const firstPt = points[0];
  const areaPath = `${dPath} L ${lastPt.x} 400 L ${firstPt.x} 400 Z`;

  const totalLength = 1200;
  const strokeDashoffset = totalLength * (1 - progress);

  const activeIdx = Math.min(
    points.length - 1,
    Math.floor(progress * (points.length - 1))
  );
  const currentPt = points[activeIdx];

  return (
    <div
      style={{
        width: 960,
        backgroundColor: "#131924",
        borderRadius: 24,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "36px 40px",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
        opacity: cardEntrance,
        transform: `translateY(${interpolate(cardEntrance, [0, 1], [40, 0])}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em" }}>
            {subtitle.toUpperCase()}
          </span>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF", margin: "4px 0 0 0" }}>
            {title}
          </h2>
        </div>
        <div
          style={{
            backgroundColor: isPositive ? "rgba(0, 208, 156, 0.15)" : "rgba(255, 59, 48, 0.15)",
            border: `1px solid ${isPositive ? "rgba(0, 208, 156, 0.4)" : "rgba(255, 59, 48, 0.4)"}`,
            padding: "8px 16px",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: isPositive ? "#00D09C" : "#FF3B30" }}>
            {isPositive ? "▲" : "▼"} {metricChange}
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div style={{ width: "100%", height: 420, position: "relative" }}>
        <svg viewBox="0 0 960 420" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.4} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[100, 200, 300].map((y) => (
            <line
              key={y}
              x1="40"
              y1={y}
              x2="920"
              y2={y}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area Fill */}
          <path
            d={areaPath}
            fill="url(#chartGradient)"
            style={{ opacity: progress }}
          />

          {/* Line Stroke */}
          <path
            d={dPath}
            fill="none"
            stroke={lineColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={totalLength}
            strokeDashoffset={strokeDashoffset}
          />

          {/* Pulsing Tip Point */}
          {progress > 0 && currentPt && (
            <g transform={`translate(${currentPt.x}, ${currentPt.y})`}>
              <circle r={18} fill={lineColor} opacity={0.25} />
              <circle r={8} fill={lineColor} />
              <circle r={4} fill="#FFFFFF" />
            </g>
          )}

          {/* Milestone markers */}
          {milestones.map((m) => {
            const pt = points[m.index];
            const appearsAt = (m.index / points.length) * durationFrames + startFrame;
            if (frame < appearsAt) return null;

            const mSpring = spring({
              frame: frame - appearsAt,
              fps,
              config: { damping: 12, stiffness: 120 },
            });

            return (
              <g
                key={m.index}
                transform={`translate(${pt.x}, ${pt.y - 45}) scale(${mSpring})`}
                style={{ transformOrigin: `${pt.x}px ${pt.y - 45}px` }}
              >
                <rect
                  x="-60"
                  y="-28"
                  width="120"
                  height="42"
                  rx="8"
                  fill="#1E293D"
                  stroke={m.isNegative ? "#FF3B30" : lineColor}
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="-10"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="13"
                  fontWeight="800"
                >
                  {m.label}
                </text>
                {m.subtext && (
                  <text
                    x="0"
                    y="6"
                    textAnchor="middle"
                    fill={m.isNegative ? "#FF3B30" : lineColor}
                    fontSize="10"
                    fontWeight="700"
                  >
                    {m.subtext}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
