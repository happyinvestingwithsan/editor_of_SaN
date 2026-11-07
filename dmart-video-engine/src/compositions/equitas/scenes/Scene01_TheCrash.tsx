import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene01_TheCrash: React.FC<SceneProps> = ({
  startFrame = 0,
  durationFrames = 160,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Entrance spring (Frame 0: "Equitas small finance bank")
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Price ticker crash starts strictly at frame 64 ('crashed') to frame 97 ('30%')
  // Dropping from 71.50 to 50.00 (-30.1% crash matching actual price = 50)
  const priceDrop = interpolate(localFrame, [64, 97], [71.5, 50.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Percent crash counter (0% -> -30.0%) starting at frame 64
  const percentDrop = interpolate(localFrame, [64, 97], [0, -30.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chart line draw progress starts at frame 64 ('crashed')
  const lineProgress = interpolate(localFrame, [64, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge pop for "CRASH 30%" snaps to frame 78 ('30')
  const crashBadgeSpring = spring({
    frame: localFrame - 78,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Tag pop for "LAST 48 HOURS" snaps to frame 125 ('48')
  const hoursTagSpring = spring({
    frame: localFrame - 125,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Exit transition
  const exitProgress = interpolate(
    localFrame,
    [durationFrames - 15, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // SVG Chart path calculation (dropping sharply from 50px down to 210px)
  const width = 880;
  const height = 230;
  const p0 = { x: 30, y: 35 };
  const p1 = { x: 240, y: 50 };
  const p2 = { x: 440, y: 125 };
  const p3 = { x: 640, y: 185 };
  const p4 = { x: 850, y: 215 };

  const currentX = interpolate(lineProgress, [0, 0.25, 0.5, 0.75, 1], [p0.x, p1.x, p2.x, p3.x, p4.x]);
  const currentY = interpolate(lineProgress, [0, 0.25, 0.5, 0.75, 1], [p0.y, p1.y, p2.y, p3.y, p4.y]);

  const pathD = `M ${p0.x} ${p0.y} C 140 40, 180 45, ${p1.x} ${p1.y} C 300 75, 380 105, ${p2.x} ${p2.y} C 500 145, 580 175, ${p3.x} ${p3.y} C 720 200, 780 210, ${p4.x} ${p4.y}`;
  const totalPathLength = 950;
  const strokeOffset = totalPathLength * (1 - lineProgress);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 718,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 40px 20px",
        boxSizing: "border-box",
        opacity: (1 - exitProgress) * interpolate(entrance, [0, 1], [0, 1]),
        transform: `scale(${interpolate(entrance, [0, 1], [0.94, 1])}) translateY(${exitProgress * -20}px)`,
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {/* 1. Header Pill: Market Alert */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 24px",
          backgroundColor: "rgba(217, 120, 105, 0.2)",
          border: "1.5px solid rgba(255, 59, 48, 0.5)",
          borderRadius: 999,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#FF3B30",
            boxShadow: "0 0 14px #FF3B30",
            transform: `scale(${1 + Math.sin(localFrame * 0.25) * 0.25})`,
          }}
        />
        <span
          style={{
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.15em",
            color: "#FF5C4D",
            textTransform: "uppercase",
          }}
        >
          MARKET CRASH ALERT • 48-HOUR DRAWDOWN
        </span>
      </div>

      {/* 2. Main Card: Large High-Contrast Ticker + Drawdown */}
      <div
        style={{
          width: 980,
          backgroundColor: "rgba(23, 27, 33, 0.96)",
          borderRadius: 24,
          padding: "24px 34px 18px",
          border: "2px solid rgba(255, 59, 48, 0.35)",
          boxShadow: `0 20px 50px rgba(0,0,0,0.8), ${EQUITAS_THEME.shadows.glowRed}`,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxSizing: "border-box",
        }}
      >
        {/* Top Ticker Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left: Equitas SFB Symbol + Name */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                border: "1.5px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <Img
                src={staticFile("assets/equitas/company_logos/equitas_small_finance_bank_symbol.svg")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "0.04em",
                }}
              >
                EQUITASBNK
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#94A3B8",
                }}
              >
                Equitas Small Finance Bank Ltd • NSE
              </div>
            </div>
          </div>

          {/* Right: Crash Numbers */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  fontFamily: EQUITAS_THEME.fonts.mono,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                }}
              >
                ₹{priceDrop.toFixed(2)}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#94A3B8",
                  marginTop: 2,
                }}
              >
                52W High: ₹116.40
              </div>
            </div>

            {/* Crash Badge */}
            {localFrame >= 78 && (
              <div
                style={{
                  backgroundColor: "rgba(255, 59, 48, 0.25)",
                  border: "2px solid #FF3B30",
                  padding: "8px 18px",
                  borderRadius: 16,
                  boxShadow: "0 0 25px rgba(255, 59, 48, 0.5)",
                  transform: `scale(${interpolate(crashBadgeSpring, [0, 1], [0.8, 1])})`,
                  opacity: interpolate(crashBadgeSpring, [0, 1], [0, 1]),
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    fontFamily: EQUITAS_THEME.fonts.mono,
                    color: "#FF3B30",
                  }}
                >
                  {percentDrop.toFixed(1)}% ▼
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Animated Falling Chart */}
        <div style={{ position: "relative", width: "100%", height: height, marginTop: 4 }}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            style={{ width: "100%", height: "100%", overflow: "visible" }}
          >
            <defs>
              <linearGradient id="crashGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF3B30" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="45" x2={width} y2="45" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />
            <line x1="0" y1="125" x2={width} y2="125" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />
            <line x1="0" y1="205" x2={width} y2="205" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />

            {/* Underfill Area */}
            {lineProgress > 0 && (
              <path
                d={`${pathD} L ${currentX} ${height} L ${p0.x} ${height} Z`}
                fill="url(#crashGradient)"
                opacity={lineProgress}
              />
            )}

            {/* Main Falling Curve */}
            <path
              d={pathD}
              fill="none"
              stroke="#FF3B30"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={totalPathLength}
              strokeDashoffset={strokeOffset}
              style={{ filter: "drop-shadow(0 0 12px rgba(255,59,48,0.85))" }}
            />

            {/* Glowing Tracker Dot */}
            {lineProgress > 0.03 && (
              <g transform={`translate(${currentX}, ${currentY})`}>
                <circle r="14" fill="#FF3B30" opacity="0.35">
                  <animate attributeName="r" values="10;20;10" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <circle r="8" fill="#FFFFFF" stroke="#FF3B30" strokeWidth="4" />
              </g>
            )}
          </svg>

          {/* Floating Pill Tag at Low (Snapping strictly to frame 125 '48 hours') */}
          {localFrame >= 125 && (
            <div
              style={{
                position: "absolute",
                right: 20,
                bottom: 8,
                transform: `scale(${interpolate(hoursTagSpring, [0, 1], [0.7, 1])})`,
                opacity: interpolate(hoursTagSpring, [0, 1], [0, 1]),
                backgroundColor: "rgba(17, 24, 32, 0.98)",
                border: "2px solid #FF3B30",
                borderRadius: 14,
                padding: "8px 18px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 900, color: "#FF3B30" }}>CRASHED 30%</span>
              <span style={{ fontSize: 16, color: "#CBD5E1", fontWeight: 700 }}>• IN LAST 48 HOURS</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
