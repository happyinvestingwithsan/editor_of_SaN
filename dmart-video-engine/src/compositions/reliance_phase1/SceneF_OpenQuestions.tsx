import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneFProps {
  relativeFrame: number; // 0 to 848 (absolute: 2108 to 2956)
}

export const SceneF_OpenQuestions: React.FC<SceneFProps> = ({ relativeFrame }) => {
  // Phase 1 (relative f300 to f620 / abs f2408 to f2728): "Temporary Windfall? OR Structural Advantage?"
  const showWindfallCard = relativeFrame >= 300 && relativeFrame < 620;

  // Phase 2 (relative f630 to f848 / abs f2738 to f2956): "After an 11.6% Rally — What Next?"
  const showWhatNextCard = relativeFrame >= 630;

  // Spring for Windfall Card
  const windfallSpring = spring({
    frame: Math.max(0, relativeFrame - 300),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  const windfallExit = interpolate(relativeFrame, [580, 615], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spring for What Next Card
  const whatNextSpring = spring({
    frame: Math.max(0, relativeFrame - 630),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  return (
    <>
      {/* Question 1: Temporary Windfall vs Structural Advantage */}
      {showWindfallCard && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            width: 860,
            height: 290,
            backgroundColor: RELIANCE_THEME.colors.white,
            borderRadius: RELIANCE_THEME.layout.borderRadius,
            border: `2px solid ${RELIANCE_THEME.colors.cardBorderStrong}`,
            boxShadow: RELIANCE_THEME.shadows.floating,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 48px",
            opacity: interpolate(windfallSpring, [0, 1], [0, 1]) * windfallExit,
            transform: `translateY(${interpolate(windfallSpring, [0, 1], [40, 0])}px) scale(${interpolate(windfallSpring, [0, 1], [0.94, 1])})`,
            zIndex: 50,
          }}
        >
          <div
            style={{
              color: RELIANCE_THEME.colors.deepTeal,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            FORENSIC DILEMMA
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.darkText,
              lineHeight: 1.2,
            }}
          >
            TEMPORARY WINDFALL?
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              margin: "6px 0",
            }}
          >
            <div style={{ height: 2, flex: 1, backgroundColor: RELIANCE_THEME.colors.divider }} />
            <span style={{ fontSize: 22, fontWeight: 800, color: RELIANCE_THEME.colors.secondaryText }}>OR</span>
            <div style={{ height: 2, flex: 1, backgroundColor: RELIANCE_THEME.colors.divider }} />
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.primaryTeal,
              lineHeight: 1.2,
            }}
          >
            STRUCTURAL ADVANTAGE?
          </div>
        </div>
      )}

      {/* Question 2: After 11.6% Rally — What Next? */}
      {showWhatNextCard && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            width: 860,
            height: 220,
            backgroundColor: RELIANCE_THEME.colors.white,
            borderRadius: RELIANCE_THEME.layout.borderRadius,
            border: `2px solid ${RELIANCE_THEME.colors.cardBorderStrong}`,
            boxShadow: RELIANCE_THEME.shadows.floating,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 48px",
            opacity: interpolate(whatNextSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(whatNextSpring, [0, 1], [40, 0])}px) scale(${interpolate(whatNextSpring, [0, 1], [0.94, 1])})`,
            zIndex: 50,
          }}
        >
          <div
            style={{
              color: RELIANCE_THEME.colors.positive,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            INVESTOR ACTIONABLE
          </div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: RELIANCE_THEME.colors.darkText,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            AFTER AN 11.6% RALLY — WHAT NEXT?
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: RELIANCE_THEME.colors.secondaryText,
              marginTop: 6,
            }}
          >
            Evaluate Multiples • Valuation • Execution
          </div>
        </div>
      )}
    </>
  );
};
