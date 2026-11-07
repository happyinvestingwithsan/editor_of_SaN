import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const HappyInvestingOutro: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 4660 to 4893
  if (frame < 4660) {
    return null;
  }

  // Sequential springs
  // 1. "Stay calm" at frame 4675
  const calmSpring = spring({
    frame: Math.max(0, frame - 4675),
    fps: 30,
    config: { damping: 16, stiffness: 100 },
  });

  // 2. "Stay disciplined" at frame 4720
  const discSpring = spring({
    frame: Math.max(0, frame - 4720),
    fps: 30,
    config: { damping: 16, stiffness: 100 },
  });

  // 3. "Happy Investing" signature reveal at frame 4810
  const brandSpring = spring({
    frame: Math.max(0, frame - 4810),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // Final smooth fade out at very end (4870 - 4893)
  const fadeOut = interpolate(frame, [4870, 4893], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 30,
        opacity: fadeOut,
        fontFamily: OUTRO_THEME.fonts.heading,
      }}
    >
      {/* Stay Calm & Stay Disciplined Bottom Badges (Frames 4675 - 4805) */}
      {frame < 4810 && (
        <div
          style={{
            position: "absolute",
            bottom: 110,
            left: "50%",
            transform: "translate3d(-50%, 0, 0)",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Stay Calm */}
          <div
            style={{
              backgroundColor: OUTRO_THEME.colors.cardBg,
              borderRadius: 20,
              padding: "16px 32px",
              boxShadow: OUTRO_THEME.shadows.cardElevated,
              border: `1.5px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
              opacity: interpolate(calmSpring, [0, 1], [0, 1]),
              transform: `translate3d(0, ${interpolate(calmSpring, [0, 1], [20, 0])}px, 0)`,
            }}
          >
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: OUTRO_THEME.colors.primaryTeal,
                letterSpacing: "0.05em",
              }}
            >
              STAY CALM.
            </div>
          </div>

          {/* Stay Disciplined */}
          {frame >= 4720 && (
            <div
              style={{
                backgroundColor: OUTRO_THEME.colors.cardBg,
                borderRadius: 20,
                padding: "16px 32px",
                boxShadow: OUTRO_THEME.shadows.cardElevated,
                border: `1.5px solid ${OUTRO_THEME.colors.primaryTeal}`,
                opacity: interpolate(discSpring, [0, 1], [0, 1]),
                transform: `translate3d(0, ${interpolate(discSpring, [0, 1], [20, 0])}px, 0)`,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: OUTRO_THEME.colors.deepTeal,
                  letterSpacing: "0.05em",
                }}
              >
                STAY DISCIPLINED.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Official Happy Investing Signature Outro Card (Frames 4810 - 4893) */}
      {frame >= 4810 && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: "50%",
            transform: `translate3d(-50%, ${interpolate(brandSpring, [0, 1], [30, 0])}px, 0) scale(${interpolate(brandSpring, [0, 1], [0.92, 1])})`,
            backgroundColor: OUTRO_THEME.colors.cardBg,
            borderRadius: 24,
            padding: "24px 48px",
            boxShadow: OUTRO_THEME.shadows.cardElevated,
            border: `2px solid ${OUTRO_THEME.colors.primaryTeal}`,
            opacity: interpolate(brandSpring, [0, 1], [0, 1]),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: OUTRO_THEME.colors.primaryTeal,
                boxShadow: OUTRO_THEME.shadows.glowTeal,
              }}
            />
            <span
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: OUTRO_THEME.colors.deepTeal,
                letterSpacing: "0.04em",
              }}
            >
              HAPPY INVESTING
            </span>
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: OUTRO_THEME.colors.secondaryText,
              letterSpacing: "0.05em",
            }}
          >
            DISCIPLINE &bull; VALUATION &bull; CONVICTION
          </div>
        </div>
      )}
    </div>
  );
};
