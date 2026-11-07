import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export const EngagementCTA: React.FC = () => {
  const frame = useCurrentFrame();

  // Active interval: Frame 4195 to 4655 (Fullscreen Outro)
  if (frame < 4195 || frame > 4655) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - 4195,
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  // Exit transition
  const exitProgress = interpolate(frame, [4635, 4655], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardTranslateY = interpolate(enterSpring, [0, 1], [40, 0]) + exitProgress * 40;
  const cardOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Like button pulse at frame 4375 ("please hit the like button")
  const likeSpring = spring({
    frame: Math.max(0, frame - 4375),
    fps: 30,
    config: { damping: 12, stiffness: 120 },
  });

  // Share pop at frame 4420 ("share this with your investor friends")
  const shareSpring = spring({
    frame: Math.max(0, frame - 4420),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  // Question card reveal at frame 4540 ("what is your view on equity finance right now")
  const qSpring = spring({
    frame: Math.max(0, frame - 4540),
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: `translate3d(-50%, ${cardTranslateY}px, 0)`,
        width: 1300,
        backgroundColor: OUTRO_THEME.colors.cardBg,
        borderRadius: 24,
        padding: "28px 36px",
        boxShadow: OUTRO_THEME.shadows.cardElevated,
        border: `2px solid ${OUTRO_THEME.colors.cardBorderTeal}`,
        opacity: cardOpacity,
        fontFamily: OUTRO_THEME.fonts.heading,
        zIndex: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        boxSizing: "border-box",
      }}
    >
      {/* Left Column: Community Question */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: OUTRO_THEME.colors.softTeal,
            padding: "6px 14px",
            borderRadius: 16,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: OUTRO_THEME.colors.primaryTeal,
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.06em",
              color: OUTRO_THEME.colors.deepTeal,
              textTransform: "uppercase",
            }}
          >
            Tell Me In The Comments
          </span>
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: OUTRO_THEME.colors.mainText,
            lineHeight: 1.25,
            opacity: interpolate(qSpring, [0, 1], [0.8, 1]),
          }}
        >
          WHAT IS YOUR VIEW ON EQUITAS FINANCE RIGHT NOW?
        </div>
        <div style={{ fontSize: 14, color: OUTRO_THEME.colors.secondaryText, marginTop: 4, fontWeight: 500 }}>
          Value opportunity or value trap? Share your rational thesis below.
        </div>
      </div>

      {/* Right Column: Like & Share Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
        {/* Like Button */}
        <div
          style={{
            backgroundColor: OUTRO_THEME.colors.softTeal,
            border: `2px solid ${OUTRO_THEME.colors.primaryTeal}`,
            borderRadius: 18,
            padding: "16px 26px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            transform: `scale(${interpolate(likeSpring, [0, 1], [0.92, 1])})`,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: OUTRO_THEME.colors.primaryTeal,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            👍
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: OUTRO_THEME.colors.deepTeal }}>
              HIT LIKE
            </div>
            <div style={{ fontSize: 12, color: OUTRO_THEME.colors.secondaryText, fontWeight: 600 }}>
              Cut through panic
            </div>
          </div>
        </div>

        {/* Share Button */}
        <div
          style={{
            backgroundColor: "#F8FAFC",
            border: `2px solid ${OUTRO_THEME.colors.cardBorder}`,
            borderRadius: 18,
            padding: "16px 26px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            transform: `scale(${interpolate(shareSpring, [0, 1], [0.92, 1])})`,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#E2E8F0",
              color: OUTRO_THEME.colors.mainText,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            ↗️
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: OUTRO_THEME.colors.mainText }}>
              SHARE
            </div>
            <div style={{ fontSize: 12, color: OUTRO_THEME.colors.secondaryText, fontWeight: 600 }}>
              With investor friends
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
