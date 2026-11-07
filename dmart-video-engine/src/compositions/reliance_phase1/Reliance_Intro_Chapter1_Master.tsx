import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  Video,
} from "remotion";
import { RELIANCE_THEME } from "./theme";

// Modular Scene Components
import { SceneA_SurgeCard } from "./SceneA_SurgeCard";
import { SceneB_HeroScale } from "./SceneB_HeroScale";
import { SceneC_Contradiction } from "./SceneC_Contradiction";
import { SceneD_PriceJourney } from "./SceneD_PriceJourney";
import { SceneE_Reversal } from "./SceneE_Reversal";
import { SceneF_OpenQuestions } from "./SceneF_OpenQuestions";
import { SceneG_ChapterTransition } from "./SceneG_ChapterTransition";
import { SceneH_SeptemberContext } from "./SceneH_SeptemberContext";
import { SceneI_MarketPressure } from "./SceneI_MarketPressure";
import { SceneJ_RefiningDisconnect } from "./SceneJ_RefiningDisconnect";
import { SceneK_BeyondRefining } from "./SceneK_BeyondRefining";
import { SceneL_Q2Results } from "./SceneL_Q2Results";
import { SceneM_EqualContributionTeaser } from "./SceneM_EqualContributionTeaser";

/**
 * ============================================================================
 * RELIANCE INDUSTRIES — MASTERCLASS PHASE 1 (INTRO + CHAPTER 1)
 * ============================================================================
 * Composition: Reliance_Intro_Chapter1_Master
 * Duration: 6,109 frames (203.633s @ 30.0 fps)
 * Source Footage: "d:\QuickShare\Reliance\Out\Video - after adobe\Part 1 & 2.mov"
 * Proxy Video: "public/video/reliance_intro_ch1_facecam.mp4"
 * Audio Track: "public/video/reliance_intro_ch1_audio.wav"
 *
 * Design System:
 * - Premium Light + Teal Theme (#0F8F87, #08736D, #F7FAF9, #FFFFFF, #182625)
 * - Mobile-First Typography (Important numbers: 96-104px, Headings: 64-72px)
 * - Hero Presenter Architecture: SaN visible 80-90%+ across entire duration
 * - Single Persistent <Video> element with GPU translate3d / scale transforms
 * - Zero Corner Clutter (no fake docket / technical axis text)
 * ============================================================================
 */
export const Reliance_Intro_Chapter1_Master: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // 1. DYNAMIC DUAL-CONTAINER SPLIT & FULLSCREEN LAYOUT
  // ---------------------------------------------------------------------------
  // Default: Full Screen (0 - 835)
  let facecamLeft = 0;
  let facecamTop = 0;
  let facecamWidth = 1920;
  let facecamHeight = 1080;
  let facecamRadius = 0;
  let isDocked = false;
  let punchScale = 1.0;

  // Spring Transitions for Alternating Split Layout
  // 1. Enter Split Left at f1120 (~37.33s) right when Contradiction card arrives
  const springToLeft_C = spring({
    frame: Math.max(0, frame - 1120),
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // 2. Switch to Right at f1586 (Scene D)
  const springToRight_D = spring({
    frame: Math.max(0, frame - 1586),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // 3. Switch to Left at f1790 (Scene E)
  const springToLeft_E = spring({
    frame: Math.max(0, frame - 1790),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // 4. Return to Full Screen at f2108 (Scene F - Open Questions)
  const springToFull_F = spring({
    frame: Math.max(0, frame - 2108),
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // 5. Enter Split Left at f3012 (Scene H - September Context)
  const springToLeft_H = spring({
    frame: Math.max(0, frame - 3012),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // 6. Switch to Right at f3669 (Scene I - Market Sentiment)
  const springToRight_I = spring({
    frame: Math.max(0, frame - 3669),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // 7. Switch to Left at f4376 (Scene J - Refining Margins)
  const springToLeft_J = spring({
    frame: Math.max(0, frame - 4376),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // 8. Switch to Right at f4588 (Scene K - Beyond Refining)
  const springToRight_K = spring({
    frame: Math.max(0, frame - 4588),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // 9. Switch to Left at f4980 (Scene L - Q2 FY27 Results)
  const springToLeft_L = spring({
    frame: Math.max(0, frame - 4980),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // 10. Switch to Right at f5905 (Scene M - Equal Contribution Teaser)
  const springToRight_M = spring({
    frame: Math.max(0, frame - 5905),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // Calculate Active Geometry
  if (frame < 1120) {
    // 0 - 1120 (0.0s - 37.33s): Fullscreen Facecam (Scenes A, B, and C Opening address)
    isDocked = false;
    punchScale = interpolate(
      frame,
      [0, 420, 835, 1040, 1120],
      [1.0, 1.04, 1.02, 1.06, 1.03],
      { extrapolateRight: "clamp" }
    );
  } else if (frame >= 1120 && frame < 1586) {
    // Scene C: Left Docked (x: 50) at 37.33s right when Contradiction card reveals
    isDocked = true;
    facecamLeft = interpolate(springToLeft_C, [0, 1], [0, 50]);
    facecamTop = interpolate(springToLeft_C, [0, 1], [0, 50]);
    facecamWidth = interpolate(springToLeft_C, [0, 1], [1920, 680]);
    facecamHeight = interpolate(springToLeft_C, [0, 1], [1080, 980]);
    facecamRadius = interpolate(springToLeft_C, [0, 1], [0, 24]);
  } else if (frame >= 1586 && frame < 1790) {
    // Scene D: Right Docked (x: 1190)
    isDocked = true;
    facecamLeft = interpolate(springToRight_D, [0, 1], [50, 1190]);
    facecamTop = 50;
    facecamWidth = 680;
    facecamHeight = 980;
    facecamRadius = 24;
  } else if (frame >= 1790 && frame < 2108) {
    // Scene E: Left Docked (x: 50)
    isDocked = true;
    facecamLeft = interpolate(springToLeft_E, [0, 1], [1190, 50]);
    facecamTop = 50;
    facecamWidth = 680;
    facecamHeight = 980;
    facecamRadius = 24;
  } else if (frame >= 2108 && frame < 3012) {
    // Scene F & G: Fullscreen Presenter for Curiosity Questions (f2108 - f3012)
    facecamLeft = interpolate(springToFull_F, [0, 1], [50, 0]);
    facecamTop = interpolate(springToFull_F, [0, 1], [50, 0]);
    facecamWidth = interpolate(springToFull_F, [0, 1], [680, 1920]);
    facecamHeight = interpolate(springToFull_F, [0, 1], [980, 1080]);
    facecamRadius = interpolate(springToFull_F, [0, 1], [24, 0]);
    isDocked = false;
    // Punch-in variations on questions
    punchScale = interpolate(frame, [2108, 2500, 2800, 3012], [1.02, 1.07, 1.09, 1.0]);
  } else if (frame >= 3012 && frame < 3669) {
    // Scene H: Left Docked (x: 50)
    isDocked = true;
    facecamLeft = interpolate(springToLeft_H, [0, 1], [0, 50]);
    facecamTop = interpolate(springToLeft_H, [0, 1], [0, 50]);
    facecamWidth = interpolate(springToLeft_H, [0, 1], [1920, 680]);
    facecamHeight = interpolate(springToLeft_H, [0, 1], [1080, 980]);
    facecamRadius = interpolate(springToLeft_H, [0, 1], [0, 24]);
  } else if (frame >= 3669 && frame < 4376) {
    // Scene I: Right Docked (x: 1190)
    isDocked = true;
    facecamLeft = interpolate(springToRight_I, [0, 1], [50, 1190]);
    facecamTop = 50;
    facecamWidth = 680;
    facecamHeight = 980;
    facecamRadius = 24;
  } else if (frame >= 4376 && frame < 4588) {
    // Scene J: Left Docked (x: 50)
    isDocked = true;
    facecamLeft = interpolate(springToLeft_J, [0, 1], [1190, 50]);
    facecamTop = 50;
    facecamWidth = 680;
    facecamHeight = 980;
    facecamRadius = 24;
  } else if (frame >= 4588 && frame < 4980) {
    // Scene K: Right Docked (x: 1190)
    isDocked = true;
    facecamLeft = interpolate(springToRight_K, [0, 1], [50, 1190]);
    facecamTop = 50;
    facecamWidth = 680;
    facecamHeight = 980;
    facecamRadius = 24;
  } else if (frame >= 4980 && frame < 5905) {
    // Scene L: Left Docked (x: 50)
    isDocked = true;
    facecamLeft = interpolate(springToLeft_L, [0, 1], [1190, 50]);
    facecamTop = 50;
    facecamWidth = 680;
    facecamHeight = 980;
    facecamRadius = 24;
  } else {
    // Scene M: Right Docked (x: 1190)
    isDocked = true;
    facecamLeft = interpolate(springToRight_M, [0, 1], [50, 1190]);
    facecamTop = 50;
    facecamWidth = 680;
    facecamHeight = 980;
    facecamRadius = 24;
  }

  // SaN calibrated chest-up centering inside container
  const videoTranslateX = isDocked ? -681 : 0;
  const videoTranslateY = isDocked ? -85 : 0;
  const videoScale = isDocked ? 1.05 : punchScale;
  const facecamVideoTransform = `translate(${videoTranslateX}px, ${videoTranslateY}px) scale(${videoScale})`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: RELIANCE_THEME.colors.bgCanvas,
        overflow: "hidden",
        fontFamily: RELIANCE_THEME.fonts.heading,
      }}
    >
      {/* =======================================================================
          MASTER AUDIO TRACK
          Single uncompressed 48kHz audio track covering 100% of duration
          ======================================================================= */}
      <Audio src={staticFile("video/reliance_intro_ch1_audio.wav")} volume={1.0} />

      {/* =======================================================================
          LAYER 1: PERSISTENT SINGLE <VIDEO> FACECAM
          Single <Video> mounted 100% across the timeline with GPU transforms
          ======================================================================= */}
      <div
        style={{
          position: "absolute",
          left: facecamLeft,
          top: facecamTop,
          width: facecamWidth,
          height: facecamHeight,
          borderRadius: facecamRadius,
          overflow: "hidden",
          zIndex: 20,
          boxShadow:
            facecamRadius > 0
              ? "0 24px 50px -12px rgba(15, 38, 37, 0.18), 0 0 1px rgba(15, 38, 37, 0.25)"
              : "none",
          border:
            facecamRadius > 0
              ? `1.5px solid ${RELIANCE_THEME.colors.cardBorderStrong}`
              : "none",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <Video
          src={staticFile("video/reliance_intro_ch1_facecam.mp4")}
          style={{
            width: 1920,
            height: 1080,
            transform: facecamVideoTransform,
            transformOrigin: "center center",
          }}
        />

        {/* SaN Forensic Lens Pill Badge (docked mode) */}
        {isDocked && (
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              backgroundColor: "rgba(24, 38, 37, 0.82)",
              backdropFilter: "blur(10px)",
              borderRadius: 20,
              padding: "8px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              zIndex: 30,
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: RELIANCE_THEME.colors.positive,
                boxShadow: "0 0 8px #10B981",
              }}
            />
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              SaN Forensic Lens
            </span>
          </div>
        )}
      </div>

      {/* =======================================================================
          LAYER 2: MODULAR SCENE GRAPHICS & EDITORIAL CARDS
          Synchronized to exact spoken frame ranges
          ======================================================================= */}
      {/* Scene A: 0 - 420 (The Extraordinary +11.6% Move) */}
      {frame < 420 && <SceneA_SurgeCard relativeFrame={frame} />}

      {/* Scene B: 420 - 835 (India's Largest Listed Company) */}
      {frame >= 420 && frame < 835 && (
        <SceneB_HeroScale relativeFrame={frame - 420} />
      )}

      {/* Scene C: 835 - 1586 (The Big Contradiction) */}
      {frame >= 835 && frame < 1586 && (
        <SceneC_Contradiction relativeFrame={frame - 835} />
      )}

      {/* Scene D: 1586 - 1790 (52-Week Low to Rally Price Journey) */}
      {frame >= 1586 && frame < 1790 && (
        <SceneD_PriceJourney relativeFrame={frame - 1586} />
      )}

      {/* Scene E: 1790 - 2108 (The Reversal: Global Disruption to O2C Opportunity) */}
      {frame >= 1790 && frame < 2108 && (
        <SceneE_Reversal relativeFrame={frame - 1790} />
      )}

      {/* Scene F: 2108 - 2956 (Curiosity Questions: Windfall or Advantage?) */}
      {frame >= 2108 && frame < 2956 && (
        <SceneF_OpenQuestions relativeFrame={frame - 2108} />
      )}

      {/* Scene G: 2956 - 3012 (Chapter 1 Kinetic Transition) */}
      {frame >= 2956 && frame < 3012 && (
        <SceneG_ChapterTransition relativeFrame={frame - 2956} />
      )}

      {/* Scene H: 3012 - 3669 (September Context: High ₹1,611 vs Low ₹1,152) */}
      {frame >= 3012 && frame < 3669 && (
        <SceneH_SeptemberContext relativeFrame={frame - 3012} />
      )}

      {/* Scene I: 3669 - 4376 (Market Sentiment: Negative 4-Item Grid) */}
      {frame >= 3669 && frame < 4376 && (
        <SceneI_MarketPressure relativeFrame={frame - 3669} />
      )}

      {/* Scene J: 4376 - 4588 (Refining Margins vs Share Price Disconnect) */}
      {frame >= 4376 && frame < 4588 && (
        <SceneJ_RefiningDisconnect relativeFrame={frame - 4376} />
      )}

      {/* Scene K: 4588 - 4980 (Market Wanted More than O2C Growth) */}
      {frame >= 4588 && frame < 4980 && (
        <SceneK_BeyondRefining relativeFrame={frame - 4588} />
      )}

      {/* Scene L: 4980 - 5905 (Q2 FY27 Results: Revenue, EBITDA, PAT) */}
      {frame >= 4980 && frame < 5905 && (
        <SceneL_Q2Results relativeFrame={frame - 4980} />
      )}

      {/* Scene M: 5905 - 6109 (Not All Businesses Contributed Equally -> O2C Surprise) */}
      {frame >= 5905 && frame < 6109 && (
        <SceneM_EqualContributionTeaser relativeFrame={frame - 5905} />
      )}
    </AbsoluteFill>
  );
};
