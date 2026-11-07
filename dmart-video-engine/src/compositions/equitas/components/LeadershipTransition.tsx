import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

interface LeadershipTransitionProps {
  startFrame?: number;
}

export const LeadershipTransition: React.FC<LeadershipTransitionProps> = ({
  startFrame = 3500,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Exact kinetic sentence snapping from Faster-Whisper:
  // startFrame = 3500 (Scene 7)
  // 3580: "continue as an active MD and CEO" (relFrame 80) -> Step 1
  // 3830: "until RBI approved successor" (relFrame 330) -> Step 2
  // 3935: "A search committee has already been initiated" (relFrame 435) -> Step 3
  // 4020: "eliminates the multi-year conflict permanently" (relFrame 520) -> Resolution Banner

  const s1Spring = spring({
    frame: Math.max(0, relFrame - 80),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const s2Spring = spring({
    frame: Math.max(0, relFrame - 330),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const s3Spring = spring({
    frame: Math.max(0, relFrame - 435),
    fps: 30,
    config: { damping: 18, stiffness: 100 },
  });

  const bannerSpring = spring({
    frame: Math.max(0, relFrame - 520),
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
      }}
    >
      {/* Category Tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 32,
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
          SUCCESSION PROTOCOL
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: EQUITAS_THEME.colors.textSecondary,
          }}
        >
          ORDERLY GOVERNANCE TRANSITION
        </span>
      </div>

      {/* 3 Step Cards in Light Theme */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {/* Step 1: Active MD Tenure - Pops on "active MD and CEO" (relFrame 80) */}
        <div
          style={{
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 22,
            padding: "32px 24px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: s1Spring,
            transform: `translateY(${interpolate(s1Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: EQUITAS_THEME.colors.primaryTeal,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              color: "#FFFFFF",
              fontSize: 20,
              marginBottom: 16,
            }}
          >
            01
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
              marginBottom: 8,
            }}
          >
            ACTIVE MD & CEO
          </div>
          <div
            style={{
              fontSize: 16,
              color: EQUITAS_THEME.colors.textSecondary,
              lineHeight: 1.45,
            }}
          >
            Vasudevan continues full executive leadership on board request until successor assumes charge.
          </div>
        </div>

        {/* Step 2: RBI-Approved Successor - Pops on "until RBI approved successor" (relFrame 330) */}
        <div
          style={{
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 22,
            padding: "32px 24px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: s2Spring,
            transform: `translateY(${interpolate(s2Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: EQUITAS_THEME.colors.primaryTeal,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              color: "#FFFFFF",
              fontSize: 20,
              marginBottom: 16,
            }}
          >
            02
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>RBI SUCCESSOR</span>
            <Img
              src={staticFile("assets/equitas/company_logos/rbi_seal.svg")}
              style={{ width: 26, height: 26 }}
            />
          </div>
          <div
            style={{
              fontSize: 16,
              color: EQUITAS_THEME.colors.textSecondary,
              lineHeight: 1.45,
            }}
          >
            Formal regulatory vetting and seamless institutional baton handover under RBI banking norms.
          </div>
        </div>

        {/* Step 3: Search Committee - Pops on "A search committee has already been initiated" (relFrame 435) */}
        <div
          style={{
            background: "#FFFFFF",
            border: `2px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 22,
            padding: "32px 24px",
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
            opacity: s3Spring,
            transform: `translateY(${interpolate(s3Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: EQUITAS_THEME.colors.primaryTeal,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              color: "#FFFFFF",
              fontSize: 20,
              marginBottom: 16,
            }}
          >
            03
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: EQUITAS_THEME.colors.textPrimary,
              marginBottom: 8,
            }}
          >
            SEARCH COMMITTEE
          </div>
          <div
            style={{
              fontSize: 16,
              color: EQUITAS_THEME.colors.textSecondary,
              lineHeight: 1.45,
            }}
          >
            Independent search panel activated to recruit premier tier-1 professional banking talent.
          </div>
        </div>
      </div>

      {/* Outcome Banner - Pops on "eliminates multi-year conflict permanently" (relFrame 520) */}
      {relFrame >= 515 && (
        <div
          style={{
            marginTop: 36,
            background: "#FFFFFF",
            border: `2.5px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderLeft: `8px solid ${EQUITAS_THEME.colors.primaryTeal}`,
            borderRadius: 20,
            padding: "24px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: bannerSpring,
            transform: `scale(${interpolate(bannerSpring, [0, 1], [0.95, 1])})`,
            boxShadow: EQUITAS_THEME.shadows.cardElevated,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "3px",
                color: EQUITAS_THEME.colors.primaryTeal,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              LONG-TERM GOVERNANCE DIVIDEND
            </div>
            <div
              style={{
                fontSize: 28, // Bold mobile font
                fontWeight: 900,
                color: EQUITAS_THEME.colors.textPrimary,
              }}
            >
              PERMANENT CONFLICT ELIMINATION
            </div>
          </div>

          <div
            style={{
              background: EQUITAS_THEME.colors.primaryTeal,
              color: "#FFFFFF",
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: "1px",
              padding: "14px 28px",
              borderRadius: 14,
            }}
          >
            INSTITUTIONAL ERA
          </div>
        </div>
      )}
    </div>
  );
};
