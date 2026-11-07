import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface HistoricalTimelineProps {
  startFrame?: number;
}

export const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Frame-exact kinetic word snapping from Faster-Whisper:
  // startFrame = 440 (Scene 2 starts at 245)
  // Milestone 1 (2007 Microfinance): active from onset (~frame 440)
  // Milestone 2 (2016 Commercial Bank): spoken at frame 620-670 -> relFrame 180
  // Milestone 3 (July 2029 Horizon): spoken at frame 728-846 -> relFrame 290
  // Interruption (Oct 2026 Abrupt Resignation): spoken at frame 855-880 -> relFrame 415

  const m1Spring = spring({
    frame: relFrame,
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const m2Spring = spring({
    frame: Math.max(0, relFrame - 180),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const m3Spring = spring({
    frame: Math.max(0, relFrame - 290),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const isInterrupted = relFrame >= 415;
  const interruptSpring = spring({
    frame: Math.max(0, relFrame - 415),
    fps: 30,
    config: { damping: 15, stiffness: 140 },
  });

  // Timeline track progress
  const timelineProgress = interpolate(
    relFrame,
    [0, 180, 290, 415],
    [0.18, 0.52, 0.90, 0.72],
    { extrapolateRight: "clamp" }
  );

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
      }}
    >
      {/* Header Category Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 36,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "3px",
            color: isInterrupted
              ? EQUITAS_THEME.colors.warningAmber
              : EQUITAS_THEME.colors.primaryTeal,
            textTransform: "uppercase",
            background: isInterrupted
              ? EQUITAS_THEME.colors.softAmber
              : EQUITAS_THEME.colors.softTeal,
            border: `1.5px solid ${
              isInterrupted
                ? EQUITAS_THEME.colors.warningAmber
                : EQUITAS_THEME.colors.cardBorderTeal
            }`,
            padding: "10px 24px",
            borderRadius: 30,
            boxShadow: EQUITAS_THEME.shadows.card,
          }}
        >
          {isInterrupted
            ? "CRITICAL LEADERSHIP INTERRUPTION"
            : "EQUITAS FOUNDING & GROWTH TIMELINE"}
        </div>
      </div>

      {/* Main Timeline Track in Light Theme */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 12,
          backgroundColor: "rgba(15, 23, 42, 0.08)",
          borderRadius: 6,
          marginBottom: 70,
        }}
      >
        {/* Animated Active Line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${timelineProgress * 100}%`,
            background: isInterrupted
              ? `linear-gradient(90deg, ${EQUITAS_THEME.colors.primaryTeal} 0%, ${EQUITAS_THEME.colors.warningAmber} 100%)`
              : EQUITAS_THEME.colors.primaryTeal,
            borderRadius: 6,
            transition: "width 0.2s ease-out",
          }}
        />

        {/* Milestone Node 1: 2007 */}
        <div
          style={{
            position: "absolute",
            left: "15%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: `4px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            boxShadow: "0 4px 12px rgba(0, 89, 83, 0.25)",
            zIndex: 3,
          }}
        />

        {/* Milestone Node 2: 2016 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: `4px solid ${
              relFrame >= 180
                ? EQUITAS_THEME.colors.primaryTeal
                : "rgba(15, 23, 42, 0.2)"
            }`,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 3,
          }}
        />

        {/* Milestone Node 3: July 2029 */}
        <div
          style={{
            position: "absolute",
            left: "88%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: `4px solid ${
              isInterrupted
                ? EQUITAS_THEME.colors.riskRed
                : relFrame >= 290
                ? EQUITAS_THEME.colors.primaryTeal
                : "rgba(15, 23, 42, 0.2)"
            }`,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 3,
          }}
        />
      </div>

      {/* Milestone Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          position: "relative",
        }}
      >
        {/* Milestone 1: 2007 */}
        <div
          style={{
            background: "#FFFFFF",
            border: `1.5px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
            borderRadius: 22,
            padding: "32px 26px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: m1Spring,
            transform: `translateY(${interpolate(m1Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 44, // Large bold number for mobile
              fontWeight: 900,
              color: EQUITAS_THEME.colors.primaryTeal,
              marginBottom: 10,
              lineHeight: 1,
            }}
          >
            2007
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
              marginBottom: 8,
            }}
          >
            EQUITAS BEGINS
          </div>
          <div
            style={{
              fontSize: 17,
              color: EQUITAS_THEME.colors.textSecondary,
              lineHeight: 1.45,
            }}
          >
            Built from scratch as a pioneering microfinance lender.
          </div>
        </div>

        {/* Milestone 2: 2016 */}
        <div
          style={{
            background: "#FFFFFF",
            border: `1.5px solid ${
              relFrame >= 180
                ? EQUITAS_THEME.colors.cardBorderTeal
                : "rgba(15, 23, 42, 0.08)"
            }`,
            borderRadius: 22,
            padding: "32px 26px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: m2Spring,
            transform: `translateY(${interpolate(m2Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.primaryTeal,
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              lineHeight: 1,
            }}
          >
            <span>2016</span>
            <Img
              src={staticFile("assets/equitas/company_logos/equitas_small_finance_bank_symbol.svg")}
              style={{ width: 40, height: 40 }}
            />
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
              marginBottom: 8,
            }}
          >
            BANKING LICENSE
          </div>
          <div
            style={{
              fontSize: 17,
              color: EQUITAS_THEME.colors.textSecondary,
              lineHeight: 1.45,
            }}
          >
            Awarded full Scheduled Commercial Bank license by Reserve Bank of India.
          </div>
        </div>

        {/* Milestone 3: July 2029 Horizon */}
        <div
          style={{
            background: isInterrupted ? "#FFFBF0" : "#FFFFFF",
            border: `1.5px solid ${
              isInterrupted
                ? EQUITAS_THEME.colors.warningAmber
                : "rgba(15, 23, 42, 0.08)"
            }`,
            borderRadius: 22,
            padding: "32px 26px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: m3Spring,
            transform: `translateY(${interpolate(m3Spring, [0, 1], [30, 0])}px)`,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: isInterrupted
                ? EQUITAS_THEME.colors.warningAmber
                : EQUITAS_THEME.colors.primaryTeal,
              marginBottom: 10,
              textDecoration: isInterrupted ? "line-through" : "none",
              lineHeight: 1,
            }}
          >
            JULY 2029
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: isInterrupted
                ? EQUITAS_THEME.colors.warningAmber
                : EQUITAS_THEME.colors.textPrimary,
              marginBottom: 8,
            }}
          >
            BOARD MANDATE
          </div>
          <div
            style={{
              fontSize: 17,
              color: EQUITAS_THEME.colors.textSecondary,
              lineHeight: 1.45,
            }}
          >
            Board of Directors reappointed Vasudevan for a 5-year tenure until July 2029.
          </div>
        </div>
      </div>

      {/* Dramatic Date Interruption Banner - Pops on "stepped down abruptly" */}
      {isInterrupted && (
        <div
          style={{
            marginTop: 36,
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.warningAmber}`,
            borderLeft: `8px solid ${EQUITAS_THEME.colors.warningAmber}`,
            borderRadius: 20,
            padding: "24px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: interruptSpring,
            transform: `scale(${interpolate(interruptSpring, [0, 1], [0.95, 1])})`,
            boxShadow: "0 20px 45px -10px rgba(217, 119, 6, 0.20)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                letterSpacing: "3px",
                fontWeight: 800,
                color: EQUITAS_THEME.colors.warningAmber,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              ABRUPT STEP DOWN
            </div>
            <div
              style={{
                fontSize: 32, // Large bold for mobile
                fontWeight: 900,
                color: EQUITAS_THEME.colors.textPrimary,
              }}
            >
              OCTOBER 2026: SUDDEN RESIGNATION
            </div>
          </div>

          <div
            style={{
              background: EQUITAS_THEME.colors.warningAmber,
              color: "#FFFFFF",
              fontWeight: 900,
              fontSize: 24,
              letterSpacing: "1px",
              padding: "14px 32px",
              borderRadius: 14,
              boxShadow: "0 8px 20px rgba(217, 119, 6, 0.3)",
            }}
          >
            WHY NOW?
          </div>
        </div>
      )}
    </div>
  );
};
