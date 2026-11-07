import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
} from "remotion";
import {
  TrendingUp,
  AlertTriangle,
  Camera,
  Flame,
  Warehouse,
} from "lucide-react";

// Design Tokens (HIFY Motion Graphics System)
const TOKENS = {
  backgroundCanvas: "#121214",
  surfaceCard: "#18181B",
  surfaceCardSecondary: "#151518",
  borderHairline: "#2E2E33",
  borderActive: "#3E3E47",
  textPrimary: "#EDEDED",
  textSecondary: "#A1A1AA",
  brandGold: "#C8A951",
  metricPositive: "#10B981",
  metricNegative: "#F43F5E",
  fonts: {
    ui: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    metrics: "'JetBrains Mono', monospace",
  },
};

export const DMartIntroHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // Phase 1 (Frames 0 - 90): Kinetic Title Sequence
  // ----------------------------------------------------
  const badgeSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const titleSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const subtitleSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Title transitions to top banner between frame 75 and 105
  const titleTransitionProgress = interpolate(frame, [75, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bannerScale = interpolate(titleTransitionProgress, [0, 1], [1, 0.62]);
  const bannerY = interpolate(titleTransitionProgress, [0, 1], [0, -380]);
  const badgeOpacity = interpolate(titleTransitionProgress, [0, 0.4], [1, 0], {
    extrapolateRight: "clamp",
  });

  // ----------------------------------------------------
  // Phase 2 (Frames 90 - 240): DMart Cash Engine Card & PIP
  // ----------------------------------------------------
  const pipSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const dmartCardEntrance = spring({
    frame: frame - 95,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Animated metric counters and bars
  const metricProgress1 = interpolate(frame, [115, 165], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const metricProgress2 = interpolate(frame, [135, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const metricProgress3 = interpolate(frame, [155, 205], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ----------------------------------------------------
  // Phase 3 (Frames 240 - 450): 2.5D Split-Screen Rivalry
  // ----------------------------------------------------
  const splitProgress = spring({
    frame: frame - 240,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // DMart shifts left from center to -320px with tilt
  const dmartShiftX = interpolate(splitProgress, [0, 1], [0, -320]);
  const dmartRotateY = interpolate(splitProgress, [0, 1], [0, 7]);

  // Rival card glides from right (+600px) to +320px
  const rivalShiftX = interpolate(splitProgress, [0, 1], [650, 320]);
  const rivalOpacity = interpolate(splitProgress, [0, 0.6, 1], [0, 0.8, 1]);
  const rivalRotateY = interpolate(splitProgress, [0, 1], [15, -7]);

  // Rival metrics progress
  const rivalMetric1 = interpolate(frame, [260, 310], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rivalMetric2 = interpolate(frame, [280, 330], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: TOKENS.backgroundCanvas,
        fontFamily: TOKENS.fonts.ui,
        color: TOKENS.textPrimary,
        overflow: "hidden",
        perspective: 1000,
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700;800&display=swap');
        `}
      </style>

      {/* Subtle Ambient Background Grids & Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 25%, rgba(200, 169, 81, 0.05) 0%, transparent 60%),
            radial-gradient(circle at 85% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 45%),
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 60px 60px, 60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Top Subtle Watermark / Brand Header */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: 0.6,
          fontSize: 13,
          letterSpacing: 2,
          fontWeight: 600,
          textTransform: "uppercase",
          color: TOKENS.textSecondary,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: TOKENS.brandGold,
            }}
          />
          <span>HIFY Research // Institutional Breakdown</span>
        </div>
        <div>NSE: DMART (Avenue Supermarts)</div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 1. KINETIC HEADLINE (Frames 0-90, transitions to top in Phase 2)  */}
      {/* ----------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${bannerY}px) scale(${bannerScale})`,
          transformOrigin: "center top",
          zIndex: 40,
        }}
      >
        {/* Restrained HIFY Gold Pill Badge (Strict <= 3% budget) */}
        <div
          style={{
            opacity: badgeOpacity * badgeSpring,
            transform: `translateY(${(1 - badgeSpring) * 20}px)`,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 999,
            border: `1px solid ${TOKENS.brandGold}`,
            backgroundColor: "rgba(200, 169, 81, 0.08)",
            color: TOKENS.brandGold,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          <span>CASE STUDY / 01</span>
        </div>

        {/* Main Kinetic Headline */}
        <div
          style={{
            opacity: titleSpring,
            transform: `translateY(${(1 - titleSpring) * 35}px)`,
            fontSize: 66,
            fontWeight: 900,
            letterSpacing: "-1.5px",
            color: TOKENS.textPrimary,
            textAlign: "center",
            textTransform: "uppercase",
            lineHeight: 1.08,
            maxWidth: 1200,
          }}
        >
          THE UNTOUCHABLE
          <br />
          <span
            style={{
              background: `linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            RETAIL MOAT
          </span>
        </div>

        {/* Subtitle hook */}
        <div
          style={{
            opacity: subtitleSpring * badgeOpacity,
            transform: `translateY(${(1 - subtitleSpring) * 20}px)`,
            marginTop: 18,
            fontSize: 20,
            fontWeight: 500,
            color: TOKENS.textSecondary,
            letterSpacing: "0.2px",
          }}
        >
          Why Quick Commerce Can't Break Radhakishan Damani's Cash Machine
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 2. CENTER STAGE: DMART CASH ENGINE CARD (2.5D Surface)            */}
      {/* ----------------------------------------------------------------- */}
      {frame >= 85 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "47%",
            width: 540,
            transform: `translate(-50%, -50%) translateX(${dmartShiftX}px) rotateY(${dmartRotateY}deg) scale(${dmartCardEntrance})`,
            transformStyle: "preserve-3d",
            opacity: dmartCardEntrance,
            zIndex: 30,
          }}
        >
          <div
            style={{
              backgroundColor: TOKENS.surfaceCard,
              borderRadius: 20,
              border: `1px solid ${TOKENS.borderHairline}`,
              padding: "32px 36px",
              boxShadow: `
                0 30px 60px rgba(0, 0, 0, 0.7),
                0 0 0 1px rgba(255, 255, 255, 0.04),
                inset 0 1px 0 rgba(255, 255, 255, 0.08)
              `,
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Card Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${TOKENS.borderHairline}`,
                paddingBottom: 18,
                marginBottom: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    border: `1px solid rgba(16, 185, 129, 0.25)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: TOKENS.metricPositive,
                  }}
                >
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 19,
                      fontWeight: 700,
                      color: TOKENS.textPrimary,
                    }}
                  >
                    DMart Cash Engine
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: TOKENS.textSecondary,
                      marginTop: 2,
                    }}
                  >
                    Negative Working Capital Moat
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: 6,
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  color: TOKENS.metricPositive,
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                }}
              >
                PROVEN 20Y+
              </span>
            </div>

            {/* Metric 1: Inventory Turnover */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: TOKENS.textSecondary,
                    fontWeight: 500,
                  }}
                >
                  Inventory Turnover
                </span>
                <span
                  style={{
                    fontFamily: TOKENS.fonts.metrics,
                    fontSize: 22,
                    fontWeight: 700,
                    color: TOKENS.metricPositive,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {Math.round(interpolate(metricProgress1, [0, 1], [0, 30]))} Days
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 6,
                  backgroundColor: "#222226",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${metricProgress1 * 85}%`,
                    height: "100%",
                    backgroundColor: TOKENS.metricPositive,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>

            {/* Metric 2: Supplier Payables */}
            <div style={{ marginBottom: 22 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: TOKENS.textSecondary,
                    fontWeight: 500,
                  }}
                >
                  Supplier Payables
                </span>
                <span
                  style={{
                    fontFamily: TOKENS.fonts.metrics,
                    fontSize: 22,
                    fontWeight: 700,
                    color: TOKENS.metricPositive,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {Math.round(interpolate(metricProgress2, [0, 1], [0, 8]))} Days
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 6,
                  backgroundColor: "#222226",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${metricProgress2 * 25}%`,
                    height: "100%",
                    backgroundColor: TOKENS.metricPositive,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>

            {/* Metric 3: Property Model */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: TOKENS.surfaceCardSecondary,
                padding: "12px 16px",
                borderRadius: 12,
                border: `1px solid ${TOKENS.borderHairline}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Warehouse size={16} color={TOKENS.textSecondary} />
                <span style={{ fontSize: 13, color: TOKENS.textSecondary }}>
                  Property Model
                </span>
              </div>
              <span
                style={{
                  fontFamily: TOKENS.fonts.metrics,
                  fontSize: 14,
                  fontWeight: 700,
                  color: TOKENS.textPrimary,
                  opacity: metricProgress3,
                }}
              >
                100% Owned Land
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 3. RIVAL CARD: QUICK COMMERCE THREAT (Frames 240 - 450)           */}
      {/* ----------------------------------------------------------------- */}
      {frame >= 235 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "47%",
            width: 540,
            transform: `translate(-50%, -50%) translateX(${rivalShiftX}px) rotateY(${rivalRotateY}deg)`,
            transformStyle: "preserve-3d",
            opacity: rivalOpacity,
            zIndex: 30,
          }}
        >
          <div
            style={{
              backgroundColor: TOKENS.surfaceCard,
              borderRadius: 20,
              border: `1px solid rgba(244, 63, 94, 0.35)`,
              padding: "32px 36px",
              boxShadow: `
                0 30px 60px rgba(0, 0, 0, 0.7),
                0 0 0 1px rgba(244, 63, 94, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.08)
              `,
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Rival Card Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${TOKENS.borderHairline}`,
                paddingBottom: 18,
                marginBottom: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    backgroundColor: "rgba(244, 63, 94, 0.12)",
                    border: `1px solid rgba(244, 63, 94, 0.3)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: TOKENS.metricNegative,
                  }}
                >
                  <Flame size={20} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: TOKENS.textPrimary,
                    }}
                  >
                    The Quick Commerce Threat
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: TOKENS.textSecondary,
                      marginTop: 2,
                    }}
                  >
                    Blinkit / Zepto / Instamart
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: 6,
                  backgroundColor: "rgba(244, 63, 94, 0.12)",
                  color: TOKENS.metricNegative,
                  border: "1px solid rgba(244, 63, 94, 0.25)",
                }}
              >
                10-MIN RACE
              </span>
            </div>

            {/* Metric 1: Warehouse Rentals */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: TOKENS.textSecondary,
                    fontWeight: 500,
                  }}
                >
                  Warehouse Rentals
                </span>
                <span
                  style={{
                    fontFamily: TOKENS.fonts.metrics,
                    fontSize: 22,
                    fontWeight: 700,
                    color: TOKENS.metricNegative,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  Spiking (+{Math.round(interpolate(rivalMetric1, [0, 1], [0, 35]))}%)
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 6,
                  backgroundColor: "#222226",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${rivalMetric1 * 92}%`,
                    height: "100%",
                    backgroundColor: TOKENS.metricNegative,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>

            {/* Metric 2: Cash Burn */}
            <div style={{ marginBottom: 22 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: TOKENS.textSecondary,
                    fontWeight: 500,
                  }}
                >
                  Dark Store Cash Burn
                </span>
                <span
                  style={{
                    fontFamily: TOKENS.fonts.metrics,
                    fontSize: 22,
                    fontWeight: 700,
                    color: TOKENS.metricNegative,
                  }}
                >
                  High
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 6,
                  backgroundColor: "#222226",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${rivalMetric2 * 96}%`,
                    height: "100%",
                    backgroundColor: TOKENS.metricNegative,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>

            {/* Metric 3: Dark Store Life / Lease Model */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: TOKENS.surfaceCardSecondary,
                padding: "12px 16px",
                borderRadius: 12,
                border: `1px solid ${TOKENS.borderHairline}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <AlertTriangle size={16} color={TOKENS.metricNegative} />
                <span style={{ fontSize: 13, color: TOKENS.textSecondary }}>
                  Store Model
                </span>
              </div>
              <span
                style={{
                  fontFamily: TOKENS.fonts.metrics,
                  fontSize: 14,
                  fontWeight: 700,
                  color: TOKENS.textPrimary,
                }}
              >
                100% Leased Prime Pockets
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 4. PICTURE-IN-PICTURE (PIP) CAMERA FRAME (Frames 90 - 450)        */}
      {/* ----------------------------------------------------------------- */}
      {frame >= 85 && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 50,
            width: 380,
            height: 214,
            borderRadius: 16,
            border: `1px solid ${TOKENS.borderHairline}`,
            backgroundColor: "#161619",
            overflow: "hidden",
            boxShadow: `
              0 24px 50px rgba(0, 0, 0, 0.8),
              0 0 0 1px rgba(255, 255, 255, 0.05)
            `,
            transform: `scale(${pipSpring}) translateY(${(1 - pipSpring) * 40}px)`,
            opacity: pipSpring,
            zIndex: 50,
          }}
        >
          {/* Subtle Facecam Overlay / Grid Lines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%),
                linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%)
              `,
            }}
          />

          {/* Camera Frame Crosshairs */}
          <div
            style={{
              position: "absolute",
              inset: 12,
              border: "1px dashed rgba(255, 255, 255, 0.08)",
              borderRadius: 8,
              pointerEvents: "none",
            }}
          />

          {/* Center Placeholder Camera Graphic */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: TOKENS.textSecondary,
              }}
            >
              <Camera size={20} />
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1.5,
                color: TOKENS.textSecondary,
                textTransform: "uppercase",
              }}
            >
              A-Roll Facecam Sync
            </div>
          </div>

          {/* Top-Left Live Recording Status Pill */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              display: "flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(8px)",
              padding: "4px 9px",
              borderRadius: 6,
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#EF4444",
                boxShadow: "0 0 8px #EF4444",
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.2,
                color: "#EDEDED",
                fontFamily: TOKENS.fonts.metrics,
              }}
            >
              SYNC LOCK
            </span>
          </div>

          {/* Bottom-Right Audio Level VU simulation */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              display: "flex",
              alignItems: "flex-end",
              gap: 3,
            }}
          >
            {[14, 22, 10, 26, 18, 12].map((height, i) => {
              const animatedHeight = 6 + Math.abs(Math.sin(frame * 0.2 + i)) * height;
              return (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: animatedHeight,
                    borderRadius: 2,
                    backgroundColor: i > 4 ? TOKENS.brandGold : TOKENS.metricPositive,
                    opacity: 0.85,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
