import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";
import {
  Building2,
  TrendingUp,
  Target,
  Sparkles,
  BarChart2,
  Layers,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { BRIDGE_THEME } from "./theme";

interface FundamentalsTechnicalComparisonProps {
  startFrame?: number;
}

/**
 * ============================================================================
 * SCENE 3 & 4: STRATEGIC FUNDAMENTALS VS TECHNICALS & TRADINGVIEW CARD
 * ============================================================================
 * Right-Side Container Coordinates:
 * left: 770px, top: 50px, width: 1100px, height: 980px
 * Completely separate from SaN's Left Container (left: 50px, width: 680px).
 *
 * Scene 3 (Frames 935 - 1390):
 * - Two-column comparison card:
 *   - LEFT: FUNDAMENTALS | WHAT TO BUY (Quality, balance sheet, RoE, NPA reality)
 *   - RIGHT: TECHNICALS | WHEN & AT WHAT PRICE
 * - Spoken trigger at frame 1334 ("the right price to buy"):
 *   - Dynamically emphasizes "RIGHT PRICE TO BUY" with spring scale-up, glowing teal highlight aura, and ★ CRITICAL DECISION badge!
 *
 * Scene 4 (Frames 1390 - 1585):
 * - TradingView Daily Candlestick Card:
 *   - Sits squarely in the right container (1100px x 980px).
 *   - High-contrast candlesticks, 200 DMA dashed baseline, ₹68.40 price tag,
 *     institutional demand zone callout, and bottom technical summary bar.
 * ============================================================================
 */
export const FundamentalsTechnicalComparison: React.FC<
  FundamentalsTechnicalComparisonProps
> = () => {
  const frame = useCurrentFrame();

  // Active range: frames 935 - 1585
  if (frame < 935 || frame > 1585) return null;

  // ---------------------------------------------------------------------------
  // 1. SPRINGS & TIMELINE PHASES
  // ---------------------------------------------------------------------------

  // Phase 1: Comparison Card Entrance (frames 935 - 1390)
  // SaN: "So with that, we will move to the next section of video where we look at the charts..."
  const compEnterSpring = spring({
    frame: Math.max(0, frame - 935),
    fps: 30,
    config: { damping: 16, stiffness: 110, mass: 0.8 },
  });

  // Dynamic Right Price Highlight Trigger (frames 1334 - 1390)
  // SaN: "In fact, it is not the time, the right price to buy."
  const rightPriceSpring = spring({
    frame: Math.max(0, frame - 1334),
    fps: 30,
    config: { damping: 12, stiffness: 160, mass: 0.6 },
  });

  // Comparison Card Exit to make way for TradingView Card (frames 1375 - 1395)
  const compExitSpring = spring({
    frame: Math.max(0, frame - 1375),
    fps: 30,
    config: { damping: 16, stiffness: 140 },
  });

  // Phase 2: TradingView Candlestick Card Entrance (frames 1390 - 1585)
  // SaN: "Let's open the daily candlestick chart in trading view..."
  const tvEnterSpring = spring({
    frame: Math.max(0, frame - 1390),
    fps: 30,
    config: { damping: 16, stiffness: 120, mass: 0.8 },
  });

  // TradingView Card Exit before disclaimer (frames 1575 - 1585)
  const tvExitSpring = spring({
    frame: Math.max(0, frame - 1575),
    fps: 30,
    config: { damping: 16, stiffness: 130 },
  });

  // Dynamic values for Right Price emphasis (starts frame 1334)
  const rightPriceScale =
    frame >= 1334
      ? interpolate(rightPriceSpring, [0, 1], [1, 1.06])
      : 1;

  const rightPriceGlow =
    frame >= 1334
      ? interpolate(rightPriceSpring, [0, 1], [0, 1])
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        fontFamily: BRIDGE_THEME.fonts.heading,
        zIndex: 25,
      }}
    >
      {/* =====================================================================
          SCENE 3: TWO-COLUMN COMPARISON CARD (FRAMES 935 - 1390)
          Position: Right Container (Left: 770px, Top: 50px, Width: 1100px, Height: 980px)
          SaN is in Left Container (50px, 50px, 680px, 980px) -> ZERO OVERLAP!
          ===================================================================== */}
      {frame >= 935 && frame <= 1390 && (
        <div
          style={{
            position: "absolute",
            left: 770,
            top: 50,
            width: 1100,
            height: 980,
            background: "#FFFFFF",
            borderRadius: 24,
            padding: "32px 36px",
            border: "1.5px solid rgba(15, 143, 135, 0.20)",
            boxShadow: BRIDGE_THEME.colors.shadowPop,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity:
              interpolate(compEnterSpring, [0, 1], [0, 1]) *
              interpolate(compExitSpring, [0, 1], [1, 0]),
            transform: `translateY(${
              interpolate(compEnterSpring, [0, 1], [30, 0]) +
              interpolate(compExitSpring, [0, 1], [0, -20])
            }px) scale(${interpolate(compExitSpring, [0, 1], [1, 0.96])})`,
          }}
        >
          {/* Header Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1.5px solid rgba(24, 37, 43, 0.08)",
              paddingBottom: 18,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: BRIDGE_THEME.colors.bgSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
                }}
              >
                <Layers size={28} color={BRIDGE_THEME.colors.primaryTeal} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: BRIDGE_THEME.colors.deepTeal,
                  }}
                >
                  The Strategic Framework
                </div>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: BRIDGE_THEME.colors.textPrimary,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Dual-Engine Investment Thesis
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "8px 20px",
                background: BRIDGE_THEME.colors.bgSoft,
                borderRadius: 24,
                fontSize: 16,
                fontWeight: 800,
                color: BRIDGE_THEME.colors.primaryTeal,
                border: "1.5px solid rgba(15, 143, 135, 0.25)",
                letterSpacing: "0.04em",
              }}
            >
              SCREENER ➔ CHARTS
            </div>
          </div>

          {/* 2-Column Comparison Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              flex: 1,
              marginTop: 18,
              marginBottom: 18,
            }}
          >
            {/* ---------------------------------------------------------------
                LEFT COLUMN: FUNDAMENTALS (WHAT TO BUY)
                --------------------------------------------------------------- */}
            <div
              style={{
                background: BRIDGE_THEME.colors.bgSoft,
                borderRadius: 20,
                padding: "26px 24px",
                border: "1.5px solid rgba(15, 143, 135, 0.22)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              {/* Pillar Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: BRIDGE_THEME.colors.primaryTeal,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(15, 143, 135, 0.25)",
                  }}
                >
                  <Building2 size={24} color="#FFFFFF" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: BRIDGE_THEME.colors.deepTeal,
                    }}
                  >
                    PILLAR 01
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: BRIDGE_THEME.colors.textPrimary,
                    }}
                  >
                    FUNDAMENTALS
                  </div>
                </div>
              </div>

              {/* Core Question Badge */}
              <div
                style={{
                  background: "#FFFFFF",
                  padding: "16px 20px",
                  borderRadius: 16,
                  border: "1.5px solid rgba(15, 143, 135, 0.18)",
                  boxShadow: "0 3px 10px rgba(15, 143, 135, 0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: BRIDGE_THEME.colors.textSecondary,
                  }}
                >
                  Decisive Strategic Question:
                </div>
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 900,
                    color: BRIDGE_THEME.colors.primaryTeal,
                    letterSpacing: "-0.01em",
                    marginTop: 4,
                  }}
                >
                  WHAT TO BUY
                </div>
              </div>

              {/* Checklist */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: BRIDGE_THEME.colors.textPrimary,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ color: BRIDGE_THEME.colors.primaryTeal, fontSize: 24, fontWeight: 900 }}>✔</span>
                  Balance Sheet Quality
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: BRIDGE_THEME.colors.textPrimary,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ color: BRIDGE_THEME.colors.primaryTeal, fontSize: 24, fontWeight: 900 }}>✔</span>
                  NPA & Provision Coverage
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: BRIDGE_THEME.colors.textPrimary,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ color: BRIDGE_THEME.colors.primaryTeal, fontSize: 24, fontWeight: 900 }}>✔</span>
                  Normalized RoE & Profits
                </div>
              </div>

              {/* Footer Pill */}
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(15, 143, 135, 0.10)",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 800,
                  color: BRIDGE_THEME.colors.deepTeal,
                  textAlign: "center",
                }}
              >
                Filters Business Quality
              </div>
            </div>

            {/* ---------------------------------------------------------------
                RIGHT COLUMN: TECHNICALS (WHEN & AT WHAT PRICE)
                --------------------------------------------------------------- */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "26px 24px",
                border: "1.5px solid rgba(24, 37, 43, 0.14)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              {/* Pillar Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: BRIDGE_THEME.colors.deepTeal,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(8, 115, 109, 0.25)",
                  }}
                >
                  <TrendingUp size={24} color="#FFFFFF" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: BRIDGE_THEME.colors.textSecondary,
                    }}
                  >
                    PILLAR 02
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: BRIDGE_THEME.colors.textPrimary,
                    }}
                  >
                    TECHNICALS
                  </div>
                </div>
              </div>

              {/* Dynamic Emphasized Target (Triggered at Frame 1334) */}
              <div
                style={{
                  background: rightPriceGlow > 0 ? BRIDGE_THEME.colors.bgSoft : "#F8FAFC",
                  padding: "16px 20px",
                  borderRadius: 16,
                  border:
                    rightPriceGlow > 0
                      ? `2.5px solid ${BRIDGE_THEME.colors.primaryTeal}`
                      : "1.5px solid rgba(24, 37, 43, 0.12)",
                  transform: `scale(${rightPriceScale})`,
                  boxShadow:
                    rightPriceGlow > 0
                      ? "0 0 35px rgba(15, 143, 135, 0.35)"
                      : "none",
                  transition: "box-shadow 0.2s ease",
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: BRIDGE_THEME.colors.textSecondary,
                  }}
                >
                  Execution Timing Question:
                </div>

                {rightPriceGlow > 0 ? (
                  <>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: BRIDGE_THEME.colors.textSecondary,
                        marginTop: 2,
                      }}
                    >
                      WHEN TO BUY
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 40,
                          fontWeight: 900,
                          color: BRIDGE_THEME.colors.deepTeal,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        RIGHT PRICE TO BUY
                      </span>
                      <Sparkles size={28} color={BRIDGE_THEME.colors.primaryTeal} />
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: BRIDGE_THEME.colors.deepTeal,
                      letterSpacing: "-0.01em",
                      marginTop: 4,
                    }}
                  >
                    WHEN & AT WHAT PRICE
                  </div>
                )}
              </div>

              {/* Checklist */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: BRIDGE_THEME.colors.textPrimary,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ color: BRIDGE_THEME.colors.deepTeal, fontSize: 24, fontWeight: 900 }}>✔</span>
                  200 DMA Baseline Discipline
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: BRIDGE_THEME.colors.textPrimary,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ color: BRIDGE_THEME.colors.deepTeal, fontSize: 24, fontWeight: 900 }}>✔</span>
                  Support & Demand Clusters
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: BRIDGE_THEME.colors.textPrimary,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ color: BRIDGE_THEME.colors.deepTeal, fontSize: 24, fontWeight: 900 }}>✔</span>
                  Favorable Risk-to-Reward
                </div>
              </div>

              {/* Footer Pill */}
              <div
                style={{
                  padding: "10px 14px",
                  background:
                    rightPriceGlow > 0
                      ? BRIDGE_THEME.colors.primaryTeal
                      : "rgba(24, 37, 43, 0.06)",
                  color: rightPriceGlow > 0 ? "#FFFFFF" : BRIDGE_THEME.colors.textPrimary,
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 800,
                  textAlign: "center",
                  letterSpacing: "0.03em",
                }}
              >
                {rightPriceGlow > 0 ? "★ CRITICAL DECISION" : "Executes Entry Timing"}
              </div>
            </div>
          </div>

          {/* Bottom Callout Bar */}
          <div
            style={{
              padding: "16px 24px",
              background: "rgba(15, 143, 135, 0.08)",
              borderRadius: 16,
              border: "1.5px dashed rgba(15, 143, 135, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: BRIDGE_THEME.colors.deepTeal,
              }}
            >
              "Even if fundamentally strong, the chart helps you decide the RIGHT PRICE to buy."
            </span>
            <Target size={24} color={BRIDGE_THEME.colors.primaryTeal} />
          </div>
        </div>
      )}

      {/* =====================================================================
          SCENE 4: TRADINGVIEW CANDLESTICK CARD (FRAMES 1390 - 1585)
          Position: Right Container (Left: 770px, Top: 50px, Width: 1100px, Height: 980px)
          ZERO OVERLAP with SaN's Left Container (50px, 50px, 680px, 980px)!
          ===================================================================== */}
      {frame >= 1390 && frame <= 1585 && (
        <div
          style={{
            position: "absolute",
            left: 770,
            top: 50,
            width: 1100,
            height: 980,
            background: "#FFFFFF",
            borderRadius: 24,
            border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
            boxShadow: BRIDGE_THEME.colors.shadowPop,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            opacity:
              interpolate(tvEnterSpring, [0, 1], [0, 1]) *
              interpolate(tvExitSpring, [0, 1], [1, 0]),
            transform: `translateY(${
              interpolate(tvEnterSpring, [0, 1], [30, 0]) +
              interpolate(tvExitSpring, [0, 1], [0, -20])
            }px) scale(${
              interpolate(tvEnterSpring, [0, 1], [0.96, 1]) *
              interpolate(tvExitSpring, [0, 1], [1, 0.96])
            })`,
          }}
        >
          {/* TradingView Top Navigation Bar */}
          <div
            style={{
              height: 72,
              background: "#F8FAFC",
              borderBottom: "1.5px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 28px",
            }}
          >
            {/* Left: Ticker & Timeframe */}
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: BRIDGE_THEME.colors.textPrimary,
                    letterSpacing: "-0.01em",
                  }}
                >
                  EQUITASBNK
                </span>
                <span
                  style={{
                    padding: "4px 12px",
                    background: BRIDGE_THEME.colors.bgSoft,
                    border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
                    borderRadius: 8,
                    fontSize: 18,
                    fontWeight: 800,
                    color: BRIDGE_THEME.colors.deepTeal,
                  }}
                >
                  D · NSE
                </span>
              </div>

              {/* Price & Change */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    color: BRIDGE_THEME.colors.textPrimary,
                    fontFamily: BRIDGE_THEME.fonts.mono,
                  }}
                >
                  ₹68.40
                </span>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: BRIDGE_THEME.colors.greenAccent,
                    fontFamily: BRIDGE_THEME.fonts.mono,
                  }}
                >
                  +3.4% (+2.25)
                </span>
              </div>
            </div>

            {/* Right: TradingView Toolbar Indicators */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  background: "#FFFFFF",
                  border: "1.5px solid #CBD5E1",
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 700,
                  color: BRIDGE_THEME.colors.textSecondary,
                }}
              >
                <BarChart2 size={18} color={BRIDGE_THEME.colors.primaryTeal} />
                <span>Indicators (200 DMA)</span>
              </div>

              <div
                style={{
                  padding: "8px 16px",
                  background: BRIDGE_THEME.colors.primaryTeal,
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "0.04em",
                }}
              >
                TRADINGVIEW DAILY
              </div>
            </div>
          </div>

          {/* Candlestick & 200 DMA Canvas Area */}
          <div
            style={{
              flex: 1,
              position: "relative",
              background: "#FFFFFF",
              padding: "20px 28px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* SVG Candlestick Chart */}
            <svg
              style={{ width: "100%", height: "100%", overflow: "visible" }}
              viewBox="0 0 1000 540"
              preserveAspectRatio="none"
            >
              {/* Subtle Horizontal Grid Lines */}
              <line x1="0" y1="90" x2="1000" y2="90" stroke="#F1F5F9" strokeWidth="1.5" />
              <line x1="0" y1="180" x2="1000" y2="180" stroke="#F1F5F9" strokeWidth="1.5" />
              <line x1="0" y1="270" x2="1000" y2="270" stroke="#F1F5F9" strokeWidth="1.5" />
              <line x1="0" y1="360" x2="1000" y2="360" stroke="#F1F5F9" strokeWidth="1.5" />
              <line x1="0" y1="450" x2="1000" y2="450" stroke="#F1F5F9" strokeWidth="1.5" />

              {/* Price scale on right edge */}
              <text x="940" y="94" fill="#94A3B8" fontSize="16" fontFamily={BRIDGE_THEME.fonts.mono}>₹90.00</text>
              <text x="940" y="184" fill="#94A3B8" fontSize="16" fontFamily={BRIDGE_THEME.fonts.mono}>₹82.00</text>
              <text x="940" y="274" fill="#94A3B8" fontSize="16" fontFamily={BRIDGE_THEME.fonts.mono}>₹74.00</text>
              <text x="940" y="364" fill="#94A3B8" fontSize="16" fontFamily={BRIDGE_THEME.fonts.mono}>₹66.00</text>
              <text x="940" y="454" fill="#94A3B8" fontSize="16" fontFamily={BRIDGE_THEME.fonts.mono}>₹58.00</text>

              {/* Institutional Demand Zone Shading */}
              <rect
                x="450"
                y="330"
                width="480"
                height="100"
                rx="12"
                fill="rgba(15, 143, 135, 0.10)"
                stroke="rgba(15, 143, 135, 0.40)"
                strokeDasharray="6 4"
                strokeWidth="1.5"
              />
              <text
                x="470"
                y="365"
                fill={BRIDGE_THEME.colors.deepTeal}
                fontSize="20"
                fontWeight="800"
                fontFamily={BRIDGE_THEME.fonts.heading}
              >
                ★ Institutional Demand Zone (₹65.00 – ₹68.00)
              </text>
              <text
                x="470"
                y="395"
                fill={BRIDGE_THEME.colors.textSecondary}
                fontSize="15"
                fontWeight="600"
                fontFamily={BRIDGE_THEME.fonts.heading}
              >
                High-Volume Support Cluster & Value Re-Accumulation
              </text>

              {/* Candlesticks Progression */}
              {/* Candle 1 (Bearish) */}
              <line x1="60" y1="80" x2="60" y2="170" stroke="#EF4444" strokeWidth="2.5" />
              <rect x="52" y="100" width="16" height="55" fill="#EF4444" rx="3" />

              {/* Candle 2 (Bearish) */}
              <line x1="110" y1="130" x2="110" y2="210" stroke="#EF4444" strokeWidth="2.5" />
              <rect x="102" y="145" width="16" height="50" fill="#EF4444" rx="3" />

              {/* Candle 3 (Bullish pull) */}
              <line x1="160" y1="160" x2="160" y2="240" stroke="#10B981" strokeWidth="2.5" />
              <rect x="152" y="175" width="16" height="40" fill="#10B981" rx="3" />

              {/* Candle 4 (Consolidation) */}
              <line x1="210" y1="180" x2="210" y2="260" stroke="#EF4444" strokeWidth="2.5" />
              <rect x="202" y="200" width="16" height="35" fill="#EF4444" rx="3" />

              {/* Candle 5 (Bearish drop) */}
              <line x1="260" y1="210" x2="260" y2="310" stroke="#EF4444" strokeWidth="2.5" />
              <rect x="252" y="230" width="16" height="65" fill="#EF4444" rx="3" />

              {/* Candle 6 (Doji) */}
              <line x1="310" y1="280" x2="310" y2="350" stroke="#64748B" strokeWidth="2.5" />
              <rect x="302" y="305" width="16" height="12" fill="#64748B" rx="2" />

              {/* Candle 7 (Support bounce) */}
              <line x1="360" y1="290" x2="360" y2="370" stroke="#10B981" strokeWidth="2.5" />
              <rect x="352" y="310" width="16" height="42" fill="#10B981" rx="3" />

              {/* Candle 8 (Drop to Demand zone) */}
              <line x1="420" y1="320" x2="420" y2="410" stroke="#EF4444" strokeWidth="2.5" />
              <rect x="412" y="340" width="16" height="55" fill="#EF4444" rx="3" />

              {/* Candle 9 (Hammer candle in demand zone) */}
              <line x1="480" y1="340" x2="480" y2="425" stroke="#10B981" strokeWidth="2.5" />
              <rect x="472" y="345" width="16" height="28" fill="#10B981" rx="3" />

              {/* Candle 10 (Bullish candle off 200 DMA) */}
              <line x1="540" y1="325" x2="540" y2="400" stroke="#10B981" strokeWidth="2.5" />
              <rect x="532" y="335" width="16" height="45" fill="#10B981" rx="3" />

              {/* Candle 11 (Strong green candle testing ₹68.40) */}
              <line x1="600" y1="310" x2="600" y2="385" stroke="#10B981" strokeWidth="2.5" />
              <rect x="592" y="318" width="16" height="52" fill="#10B981" rx="3" />

              {/* Candle 12 (Current Active Candle at ₹68.40) */}
              <line x1="660" y1="300" x2="660" y2="370" stroke="#10B981" strokeWidth="3" />
              <rect x="650" y="306" width="20" height="50" fill="#10B981" rx="3" />

              {/* 200 DMA Dashed Curved Line */}
              <path
                d="M 40 230 C 200 270, 400 330, 600 365 C 750 385, 900 395, 980 400"
                fill="none"
                stroke={BRIDGE_THEME.colors.goldAccent}
                strokeWidth="4"
                strokeDasharray="9 6"
              />

              {/* 200 DMA Callout Badge */}
              <g transform="translate(680, 395)">
                <rect x="-12" y="-18" width="220" height="34" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
                <text x="0" y="5" fill="#B45309" fontSize="16" fontWeight="800" fontFamily={BRIDGE_THEME.fonts.heading}>
                  ⚡ 200 DMA Baseline (₹65.20)
                </text>
              </g>

              {/* Current Price Line at ₹68.40 */}
              <line x1="450" y1="318" x2="930" y2="318" stroke={BRIDGE_THEME.colors.primaryTeal} strokeWidth="2" strokeDasharray="5 4" />
              <g transform="translate(830, 318)">
                <rect x="0" y="-16" width="100" height="32" rx="8" fill={BRIDGE_THEME.colors.primaryTeal} />
                <text x="14" y="5" fill="#FFFFFF" fontSize="17" fontWeight="900" fontFamily={BRIDGE_THEME.fonts.mono}>
                  ₹68.40
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Technical Summary Bar */}
          <div
            style={{
              padding: "18px 28px",
              background: "#F8FAFC",
              borderTop: "1.5px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Metric 1: 200 DMA Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: BRIDGE_THEME.colors.goldSoftBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1.5px solid #FDE68A",
                }}
              >
                <TrendingUp size={22} color={BRIDGE_THEME.colors.goldAccent} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: BRIDGE_THEME.colors.textSecondary, textTransform: "uppercase" }}>
                  Status vs 200 DMA
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: BRIDGE_THEME.colors.textPrimary }}>
                  Testing 200 DMA Base (₹65.20)
                </div>
              </div>
            </div>

            {/* Metric 2: Demand Zone */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: BRIDGE_THEME.colors.bgSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
                }}
              >
                <ShieldCheck size={22} color={BRIDGE_THEME.colors.primaryTeal} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: BRIDGE_THEME.colors.textSecondary, textTransform: "uppercase" }}>
                  Demand Re-Accumulation
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: BRIDGE_THEME.colors.deepTeal }}>
                  ₹65.00 – ₹68.00 Pivot
                </div>
              </div>
            </div>

            {/* Metric 3: Risk to Reward */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: BRIDGE_THEME.colors.greenSoftBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1.5px solid #BBF7D0",
                }}
              >
                <CheckCircle size={22} color={BRIDGE_THEME.colors.greenAccent} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: BRIDGE_THEME.colors.textSecondary, textTransform: "uppercase" }}>
                  Risk-to-Reward Ratio
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: BRIDGE_THEME.colors.greenAccent }}>
                  Favorable 1:3.2 Setup
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
