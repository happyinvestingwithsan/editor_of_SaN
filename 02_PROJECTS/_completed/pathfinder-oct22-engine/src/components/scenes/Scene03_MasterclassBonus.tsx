import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene03_MasterclassBonus: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // localFrame 0 is global Frame 356 ("Coming back to the bonus part")
  // Bonus teaser card springs in @ localFrame 0
  const bonusLeadSpring = spring({
    frame: localFrame - 2,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // EXACT WORD-LEVEL SNAP:
  // "is the master class" -> "master" is spoken at global Frame 485 -> localFrame 129!
  // "class" is spoken at global Frame 493 -> localFrame 137
  const masterclassSpring = spring({
    frame: localFrame - 128,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // VIP Pass golden stamp snaps right after "class" @ localFrame 138
  const vipStampSpring = spring({
    frame: localFrame - 138,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  // Long, generous dwell time: stays 100% visible until localFrame 258 (global Frame 614)
  // then fades out smoothly by localFrame 274 (global Frame 630)
  const opacity = interpolate(localFrame, [258, 274], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 90,
        width: 1040,
        height: 900,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 28,
      }}
    >
      {/* Step 1: Bonus Teaser Pill (Snaps @ Frame 356 on "Coming back to the bonus part") */}
      <div
        style={{
          transform: `translateY(${(1 - bonusLeadSpring) * -24}px)`,
          opacity: bonusLeadSpring,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 26px",
            borderRadius: 24,
            background: "rgba(245, 158, 11, 0.2)",
            border: `2px solid ${theme.colors.goldPrimary}`,
            marginBottom: 14,
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.25)",
          }}
        >
          <span style={{ fontSize: 24 }}>🎁</span>
          <span
            style={{
              color: theme.colors.goldNeon,
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            THE PROMISED SESSION BONUS
          </span>
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 54,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          What Was Mentioned In The Intro?
        </h1>
      </div>

      {/* Step 2: The Masterclass VIP Pass (Reveals & Slams in exactly @ Frame 485 on "MASTER CLASS"!) */}
      <div
        style={{
          transform: `scale(${masterclassSpring}) translateY(${(1 - masterclassSpring) * 30}px)`,
          opacity: masterclassSpring,
          background:
            "linear-gradient(145deg, rgba(20, 26, 40, 0.98) 0%, rgba(10, 14, 22, 0.99) 100%)",
          border: `3px solid ${theme.colors.goldPrimary}`,
          borderRadius: 32,
          padding: "48px 56px",
          boxShadow: theme.shadows.goldCard,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Gold Background Radiance */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div
              style={{
                color: theme.colors.goldNeon,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              ★ THE FLAGSHIP COHORT
            </div>
            <div
              style={{
                color: "#FFF",
                fontSize: 52,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Happy Investing Masterclass
            </div>
          </div>

          {/* Golden Embossed VIP Stamp (Slams @ Frame 493 on "class") */}
          <div
            style={{
              transform: `scale(${vipStampSpring}) rotate(-4deg)`,
              opacity: vipStampSpring,
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)",
              color: "#000",
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: "0.1em",
              padding: "14px 26px",
              borderRadius: 16,
              boxShadow: "0 10px 25px rgba(245, 158, 11, 0.5)",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            VIP PASS UNLOCKED
          </div>
        </div>

        <p
          style={{
            margin: "24px 0 28px 0",
            fontSize: 26,
            color: theme.colors.textSecondary,
            lineHeight: 1.45,
            fontWeight: 600,
          }}
        >
          The private institutional framework for long-term compounders.
          Pre-recorded on the website portal, but today unlocking complimentary live cohort admission.
        </p>

        {/* Bottom Feature Badges */}
        <div
          style={{
            borderTop: "2px solid rgba(255, 255, 255, 0.12)",
            paddingTop: 24,
            display: "flex",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: theme.colors.emeraldNeon, fontSize: 22 }}>✔</span>
            <span style={{ color: "#FFF", fontSize: 22, fontWeight: 700 }}>
              Live Q&A Included
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: theme.colors.goldNeon, fontSize: 22 }}>✔</span>
            <span style={{ color: "#FFF", fontSize: 22, fontWeight: 700 }}>
              Live Market Psychology
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: theme.colors.cyan, fontSize: 22 }}>✔</span>
            <span style={{ color: "#FFF", fontSize: 22, fontWeight: 700 }}>
              Zero Selling / Pure Value
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
