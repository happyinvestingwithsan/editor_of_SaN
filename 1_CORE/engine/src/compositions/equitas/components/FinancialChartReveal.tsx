import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface FinancialChartRevealProps {
  startFrame?: number;
}

export const FinancialChartReveal: React.FC<FinancialChartRevealProps> = ({
  startFrame = 5113,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Exact kinetic sentence snapping from Faster-Whisper:
  // startFrame = 5113 (Scene 9)
  // 5229: "before 2024" (relFrame 116) -> Phase 1: Pre-2024 growth path
  // 5284: "the big dip" (relFrame 171) -> Phase 2: The Big Dip (-34%)
  // 5320: "massive recent rebound" (relFrame 207) -> Phase 3: Massive recent rebound
  // 5378: "Let us understand that" (relFrame 265) -> Chapter II CTA banner

  const containerSpring = spring({
    frame: relFrame,
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const p1Spring = spring({
    frame: Math.max(0, relFrame - 110),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const p2Spring = spring({
    frame: Math.max(0, relFrame - 171),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const p3Spring = spring({
    frame: Math.max(0, relFrame - 207),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const ctaSpring = spring({
    frame: Math.max(0, relFrame - 265),
    fps: 30,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "40px 50px",
        fontFamily: EQUITAS_THEME.fonts.display,
        boxSizing: "border-box",
        opacity: containerSpring,
      }}
    >
      {/* Category Heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "3px",
            color: EQUITAS_THEME.colors.primaryTeal,
            textTransform: "uppercase",
            background: EQUITAS_THEME.colors.softTeal,
            border: `1.5px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
            padding: "8px 22px",
            borderRadius: 30,
            boxShadow: EQUITAS_THEME.shadows.card,
          }}
        >
          CHAPTER II TEASER
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: EQUITAS_THEME.colors.textSecondary,
          }}
        >
          THE REAL FINANCIAL JOURNEY
        </span>
      </div>

      {/* Main Chart Box in Light Theme */}
      <div
        style={{
          background: "#FFFFFF",
          border: `2px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
          borderRadius: 24,
          padding: "32px 36px",
          boxShadow: EQUITAS_THEME.shadows.cardElevated,
          position: "relative",
        }}
      >
        {/* SVG Time-Series Trajectory */}
        <svg
          viewBox="0 0 800 260"
          style={{ width: "100%", height: 260, overflow: "visible" }}
        >
          {/* Light Gridlines */}
          <line
            x1="0"
            y1="70"
            x2="800"
            y2="70"
            stroke="rgba(15, 23, 42, 0.08)"
            strokeDasharray="4 4"
          />
          <line
            x1="0"
            y1="140"
            x2="800"
            y2="140"
            stroke="rgba(15, 23, 42, 0.08)"
            strokeDasharray="4 4"
          />
          <line
            x1="0"
            y1="210"
            x2="800"
            y2="210"
            stroke="rgba(15, 23, 42, 0.08)"
            strokeDasharray="4 4"
          />

          {/* Phase 1 Path: Pre-2024 Steady Climb - Draws on "before 2024" */}
          <path
            d="M 40 180 Q 160 150 280 80"
            fill="none"
            stroke="#475569"
            strokeWidth="6"
            strokeLinecap="round"
            opacity={p1Spring}
          />

          {/* Phase 2 Path: The Big Dip - Drops on "the big dip" */}
          <path
            d="M 280 80 Q 400 120 520 220"
            fill="none"
            stroke={EQUITAS_THEME.colors.riskRed}
            strokeWidth="6"
            strokeLinecap="round"
            opacity={p2Spring}
          />

          {/* Phase 3 Path: Massive Recent Rebound - Surges on "massive recent rebound" */}
          <path
            d="M 520 220 Q 640 180 760 50"
            fill="none"
            stroke={EQUITAS_THEME.colors.primaryTeal}
            strokeWidth="7"
            strokeLinecap="round"
            opacity={p3Spring}
          />

          {/* Apex Peak Marker */}
          {relFrame >= 207 && (
            <circle
              cx="760"
              cy="50"
              r="10"
              fill={EQUITAS_THEME.colors.primaryTeal}
              stroke="#FFFFFF"
              strokeWidth="3"
              opacity={p3Spring}
            />
          )}
        </svg>

        {/* Phase Markers Below Chart */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginTop: 24,
            borderTop: "1px solid rgba(15, 23, 42, 0.08)",
            paddingTop: 20,
          }}
        >
          {/* Phase 1 */}
          <div style={{ opacity: p1Spring }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: EQUITAS_THEME.colors.textSecondary,
                letterSpacing: "1px",
              }}
            >
              PHASE 1
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: EQUITAS_THEME.colors.textPrimary,
              }}
            >
              Pre-2024 Growth
            </div>
          </div>

          {/* Phase 2 */}
          <div style={{ opacity: p2Spring }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: EQUITAS_THEME.colors.riskRed,
                letterSpacing: "1px",
              }}
            >
              PHASE 2
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: EQUITAS_THEME.colors.riskRed,
              }}
            >
              The Big Dip (-34%)
            </div>
          </div>

          {/* Phase 3 */}
          <div style={{ opacity: p3Spring }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: EQUITAS_THEME.colors.primaryTeal,
                letterSpacing: "1px",
              }}
            >
              PHASE 3
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: EQUITAS_THEME.colors.primaryTeal,
              }}
            >
              Massive Rebound
            </div>
          </div>
        </div>
      </div>

      {/* Next Chapter CTA Bar - Pops on "Let us understand that" (relFrame 265) */}
      <div
        style={{
          marginTop: 32,
          background: "#FFFFFF",
          border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
          borderRadius: 20,
          padding: "20px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: EQUITAS_THEME.shadows.cardElevated,
          opacity: ctaSpring,
          transform: `scale(${interpolate(ctaSpring, [0, 1], [0.95, 1])})`,
        }}
      >
        <span
          style={{
            fontSize: 22, // Large bold mobile font
            fontWeight: 900,
            color: EQUITAS_THEME.colors.textPrimary,
          }}
        >
          THE FINANCIAL AUDIT BEGINS: CHAPTER II
        </span>
        <span
          style={{
            background: EQUITAS_THEME.colors.primaryTeal,
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 800,
            padding: "10px 24px",
            borderRadius: 12,
            letterSpacing: "1px",
          }}
        >
          NEXT ➔
        </span>
      </div>
    </div>
  );
};
