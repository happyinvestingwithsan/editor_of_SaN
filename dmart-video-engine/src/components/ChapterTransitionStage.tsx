import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export interface ChapterTransitionStageProps {
  absoluteFrame?: number;
}

const FLUID_SPRING = {
  damping: 16,
  mass: 0.9,
  stiffness: 120,
};

/**
 * ChapterTransitionStage:
 * Handles Clip 5 Overlays:
 * - Frames 0 - 160: Duopoly Benchmark Teaser (Jio vs Airtel)
 * - Frames 160 - 320: 200 DMA Discipline Teaser
 * - Frames 320 - 365: Sahil 500ms Kinetic Slide Wipe (Chapter 02 Transition)
 */
export const ChapterTransitionStage: React.FC<ChapterTransitionStageProps> = ({
  absoluteFrame,
}) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame = absoluteFrame !== undefined ? absoluteFrame : localFrame;

  // -------------------------------------------------------------------------
  // BEAT 1: DUOPOLY TEASER (Frames 15 -> 160)
  // -------------------------------------------------------------------------
  const duopolyEntrance = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: FLUID_SPRING,
  });
  const duopolyOpacity = interpolate(frame, [15, 25, 145, 160], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // -------------------------------------------------------------------------
  // BEAT 2: 200 DMA RULE TEASER (Frames 160 -> 320)
  // -------------------------------------------------------------------------
  const ruleEntrance = spring({
    frame: Math.max(0, frame - 165),
    fps,
    config: FLUID_SPRING,
  });
  const ruleOpacity = interpolate(frame, [165, 178, 305, 320], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // -------------------------------------------------------------------------
  // BEAT 3: SAHIL 500ms KINETIC SLIDE WIPE (Frames 320 -> 365)
  // -------------------------------------------------------------------------
  // 15 frames wipe: enters from left, locks for 4 frames, exits to right
  const wipeFrame = Math.max(0, frame - 325);
  // Wipe X from -1920 to 1920
  const wipeX = interpolate(
    wipeFrame,
    [0, 12, 18, 30],
    [-1920, 0, 0, 1920],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.2, 0, 0, 1),
    }
  );

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Lower Third Teaser 1: Jio vs Airtel Benchmark                     */}
      {/* ----------------------------------------------------------------- */}
      {frame >= 15 && frame < 165 && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: "50%",
            transform: `translateX(-50%) translateY(${interpolate(duopolyEntrance, [0, 1], [30, 0])}px)`,
            opacity: duopolyOpacity,
            zIndex: 25,
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(11, 14, 20, 0.90)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(212, 175, 55, 0.55)",
              borderRadius: 10,
              padding: "16px 36px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75)",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#C8A951",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              DUOPOLY BENCHMARK PREVIEW
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24,
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              Reliance Jio vs Bharti Airtel Head-to-Head
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: "#9CA3AF",
                marginTop: 4,
              }}
            >
              Valuation Multiples • Standalone 5G Moat • ARPU Expansion
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Lower Third Teaser 2: 200 DMA Framework                           */}
      {/* ----------------------------------------------------------------- */}
      {frame >= 165 && frame < 325 && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: "50%",
            transform: `translateX(-50%) translateY(${interpolate(ruleEntrance, [0, 1], [30, 0])}px)`,
            opacity: ruleOpacity,
            zIndex: 25,
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(11, 14, 20, 0.90)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(16, 185, 129, 0.55)",
              borderRadius: 10,
              padding: "16px 36px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75)",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#10B981",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              THE HAPPY INVESTING VERDICT
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24,
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              "No 200 DMA Chart = No Entry"
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: "#9CA3AF",
                marginTop: 4,
              }}
            >
              Revealing our technical risk framework at the end of the video
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* SAHIL 500ms KINETIC SLIDE WIPE (Chapter 02 Transition)           */}
      {/* ----------------------------------------------------------------- */}
      {frame >= 325 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateX(${wipeX}px)`,
            backgroundColor: "#B91C1C", // Deep bold crimson banner
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 80px rgba(0, 0, 0, 0.8)",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.22em",
              color: "#FDE047",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            UP NEXT • CHAPTER 02
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 48,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              textAlign: "center",
              lineHeight: 1.15,
            }}
          >
            The Startup Trap & Valuation Paradox
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.85)",
              marginTop: 14,
              letterSpacing: "0.05em",
            }}
          >
            Why Jio’s 100% Fresh Issue Breaks the Listing Curse
          </div>
        </div>
      )}
    </>
  );
};
