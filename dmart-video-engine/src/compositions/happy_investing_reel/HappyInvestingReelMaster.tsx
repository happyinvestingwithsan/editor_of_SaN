import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  Video,
} from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";
import { SFXCue, SFXPlayer } from "../../motion-kit/modules/SFXPlayer";
import { HappyInvestingCaptions } from "./HappyInvestingCaptions";
import { StageScene01_OpeningHook } from "./StageScene01_OpeningHook";
import { StageScene02_USMidterms } from "./StageScene02_USMidterms";
import { StageScene03_AIDataCenter } from "./StageScene03_AIDataCenter";
import { StageScene04_WallStreetCrash } from "./StageScene04_WallStreetCrash";
import { StageScene05_IndiaCatalysts } from "./StageScene05_IndiaCatalysts";
import { StageScene06_FIIBuying } from "./StageScene06_FIIBuying";
import { StageScene07_FearVsGreed } from "./StageScene07_FearVsGreed";
import { StageScene08_PersonalStrategy } from "./StageScene08_PersonalStrategy";
import { StageScene09_MasterclassCTA } from "./StageScene09_MasterclassCTA";

// Exact SFX Cue Choreography
const SFX_CUES: SFXCue[] = [
  { frame: 1, type: "boom", soundFile: "sfx/boom.wav", volume: 0.6 },
  { frame: 119, type: "whoosh", soundFile: "sfx/clean_transition_whoosh.wav", volume: 0.7 },
  { frame: 125, type: "custom", soundFile: "sfx/impact.wav", volume: 0.65 },
  { frame: 250, type: "whoosh", soundFile: "sfx/whoosh.wav", volume: 0.5 },
  { frame: 412, type: "custom", soundFile: "sfx/paper_document_shuffle.wav", volume: 0.5 },
  { frame: 588, type: "whoosh", soundFile: "sfx/whoosh.wav", volume: 0.4 },
  { frame: 658, type: "custom", soundFile: "sfx/cinematic_sub_rumble_drone.wav", volume: 0.5 },
  { frame: 749, type: "custom", soundFile: "sfx/metallic_counter_tick.wav", volume: 0.5 },
  { frame: 805, type: "whoosh", soundFile: "sfx/whoosh.wav", volume: 0.5 },
  { frame: 850, type: "stamp", soundFile: "sfx/stamp.wav", volume: 0.8 },
  { frame: 1132, type: "custom", soundFile: "sfx/fracture.wav", volume: 0.7 },
  { frame: 1170, type: "custom", soundFile: "sfx/impact.wav", volume: 0.65 },
  { frame: 1230, type: "custom", soundFile: "sfx/impact.wav", volume: 0.65 },
  { frame: 1337, type: "whoosh", soundFile: "sfx/clean_transition_whoosh.wav", volume: 0.5 },
  { frame: 1586, type: "whoosh", soundFile: "sfx/clean_transition_whoosh.wav", volume: 0.6 },
  { frame: 1962, type: "custom", soundFile: "sfx/cinematic_impact_hit.wav", volume: 0.55 },
  { frame: 2180, type: "chime", soundFile: "sfx/soft_bell.wav", volume: 0.6 },
  { frame: 2644, type: "custom", soundFile: "sfx/metallic_counter_tick.wav", volume: 0.6 },
  { frame: 2750, type: "chime", soundFile: "sfx/cash_chime.wav", volume: 0.75 },
  { frame: 2863, type: "chime", soundFile: "sfx/cash_chime.wav", volume: 0.75 },
  { frame: 3104, type: "custom", soundFile: "sfx/cinematic_sub_rumble_drone.wav", volume: 0.5 },
  { frame: 3175, type: "whoosh", soundFile: "sfx/whoosh.wav", volume: 0.6 },
  { frame: 3436, type: "whoosh", soundFile: "sfx/whoosh.wav", volume: 0.4 },
  { frame: 3527, type: "whoosh", soundFile: "sfx/clean_transition_whoosh.wav", volume: 0.5 },
  { frame: 3750, type: "custom", soundFile: "sfx/padlock.wav", volume: 0.65 },
  { frame: 4095, type: "custom", soundFile: "sfx/cinematic_impact_hit.wav", volume: 0.7 },
  { frame: 4450, type: "custom", soundFile: "sfx/pop.wav", volume: 0.5 },
  { frame: 4485, type: "custom", soundFile: "sfx/pop.wav", volume: 0.5 },
  { frame: 4520, type: "custom", soundFile: "sfx/pop.wav", volume: 0.5 },
  { frame: 4580, type: "chime", soundFile: "sfx/cash_chime.wav", volume: 0.8 },
  { frame: 5170, type: "custom", soundFile: "sfx/soft_bell.wav", volume: 0.7 },
];

/**
 * Calculates continuous smooth interpolation progress between:
 * 0.0 = 100% Full-Screen Facecam (Layout A)
 * 1.0 = 50/50 Split-Screen (Layout B)
 * Uses Hermite smoothstep over 8-frame transitions for zero flicker.
 */
const getSplitProgress = (frame: number): number => {
  const transitions: [number, number, number, number][] = [
    // [dockStart, dockEnd, expandStart, expandEnd]
    [114, 122, 246, 254],      // Scene 1: Divergence duel
    [408, 416, 584, 592],      // Scene 2: US Midterms
    [654, 662, 1333, 1341],    // Scenes 3 & 4: AI & Wall Street crash
    [1582, 1590, 3100, 3108],  // Scenes 5 & 6: India catalysts & FII Buying
    [3171, 3179, 3432, 3440],  // Scene 7: Fear vs Greed duel
    [3523, 3531, 5065, 5073],  // Scenes 8 & 9: Personal strategy & Masterclass
  ];

  for (const [dS, dE, eS, eE] of transitions) {
    if (frame < dS) {
      continue;
    }
    if (frame >= dS && frame <= dE) {
      // Easing into split screen (docking)
      return interpolate(frame, [dS, dE], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: (t) => t * t * (3 - 2 * t),
      });
    }
    if (frame > dE && frame < eS) {
      // Fully docked in split screen
      return 1;
    }
    if (frame >= eS && frame <= eE) {
      // Easing back to full facecam (expanding)
      return interpolate(frame, [eS, eE], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: (t) => t * t * (3 - 2 * t),
      });
    }
  }

  return 0; // Default: 100% Full Facecam
};

export const HappyInvestingReelMaster: React.FC = () => {
  const frame = useCurrentFrame();

  // Mathematical smooth split progress (0 = full facecam, 1 = 50/50 split)
  const splitProgress = getSplitProgress(frame);

  // Presenter container position and dimensions
  const containerTop = interpolate(splitProgress, [0, 1], [0, HI_THEME.layout.seamY]);
  const containerHeight = interpolate(
    splitProgress,
    [0, 1],
    [1920, HI_THEME.layout.presenterHeight]
  );

  // Video internal translation and scale:
  // Full Facecam: translateY = -60px (trims excess ceiling)
  // Split Screen: translateY = -580px (trims blank wall/cupboard, centers face and chest gestures)
  const videoTranslateY = interpolate(
    splitProgress,
    [0, 1],
    [-60, HI_THEME.layout.presenterTranslateY]
  );
  const videoScale = interpolate(splitProgress, [0, 1], [1.04, 1.0]);

  // Opacities for upper stage and dividing seam
  const upperStageOpacity = interpolate(splitProgress, [0.15, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const seamOpacity = interpolate(splitProgress, [0.2, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: HI_THEME.colors.darkNavy,
        width: HI_THEME.layout.width,
        height: HI_THEME.layout.height,
        overflow: "hidden",
        fontFamily: HI_THEME.fonts.primary,
      }}
    >
      {/* 1. Master Audio Track */}
      <Audio
        src={staticFile("audio/happy_investing_1106.wav")}
        volume={1.0}
      />

      {/* 2. Micro-Haptic SFX Suite */}
      <SFXPlayer cues={SFX_CUES} />

      {/* 3. Upper Motion Graphics Canvas (50% Upper Stage: Y 0px to 960px) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: HI_THEME.layout.seamY,
          zIndex: 10,
          overflow: "hidden",
          opacity: upperStageOpacity,
          pointerEvents: splitProgress > 0.5 ? "auto" : "none",
        }}
      >
        <StageScene01_OpeningHook />
        <StageScene02_USMidterms />
        <StageScene03_AIDataCenter />
        <StageScene04_WallStreetCrash />
        <StageScene05_IndiaCatalysts />
        <StageScene06_FIIBuying />
        <StageScene07_FearVsGreed />
        <StageScene08_PersonalStrategy />
        <StageScene09_MasterclassCTA />
      </div>

      {/* 4. Single Persistent Presenter <Video> (glides smoothly with zero flicker) */}
      <div
        style={{
          position: "absolute",
          top: containerTop,
          left: 0,
          width: 1080,
          height: containerHeight,
          overflow: "hidden",
          zIndex: 15,
          boxShadow: `0 -10px 40px rgba(0,0,0,${splitProgress * 0.7})`,
        }}
      >
        <Video
          src={staticFile("video/happy_investing_1106_facecam.mp4")}
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080,
            height: 1920,
            transform: `translateY(${videoTranslateY}px) scale(${videoScale})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* 5. Glowing Teal Seam Line (Smoothly fades in at Y = 960px) */}
      <div
        style={{
          position: "absolute",
          top: HI_THEME.layout.seamY - 1,
          left: 0,
          width: 1080,
          height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${HI_THEME.colors.secondaryTeal} 25%, ${HI_THEME.colors.primaryLightTeal} 50%, ${HI_THEME.colors.secondaryTeal} 75%, transparent 100%)`,
          zIndex: 30,
          boxShadow: `0 0 16px ${HI_THEME.colors.secondaryTeal}`,
          opacity: seamOpacity,
          pointerEvents: "none",
        }}
      />

      {/* 6. Kinetic High-Visibility Subtitles (Glides smoothly between seam & chest) */}
      <HappyInvestingCaptions splitProgress={splitProgress} />
    </AbsoluteFill>
  );
};
