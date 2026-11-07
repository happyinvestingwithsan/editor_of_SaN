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
import { SFXCue, SFXPlayer } from "../motion-kit";
import { ESFB2_THEME } from "./equitas_screener2/theme";

// Import modular scene components
import { Scene01_ProfitCollapse } from "./equitas_screener2/Scene01_ProfitCollapse";
import { Scene02_SmartInvestorConcall } from "./equitas_screener2/Scene02_SmartInvestorConcall";
import { Scene03_MicrofinanceCrisisMap } from "./equitas_screener2/Scene03_MicrofinanceCrisisMap";
import { Scene04_MultipleLoansPileup } from "./equitas_screener2/Scene04_MultipleLoansPileup";
import { Scene05_RegionalStressHeatwaves } from "./equitas_screener2/Scene05_RegionalStressHeatwaves";
import { Scene06_CreditCostShock } from "./equitas_screener2/Scene06_CreditCostShock";
import { Scene07_ProfitWipeout630Cr } from "./equitas_screener2/Scene07_ProfitWipeout630Cr";
import { Scene08_ManagementHonestyQuestion } from "./equitas_screener2/Scene08_ManagementHonestyQuestion";
import { Scene09_Action1_RadicalHonesty } from "./equitas_screener2/Scene09_Action1_RadicalHonesty";
import { Scene10_Action2_StricterLending } from "./equitas_screener2/Scene10_Action2_StricterLending";
import { Scene11_Action3_FiftyPercentRejected } from "./equitas_screener2/Scene11_Action3_FiftyPercentRejected";
import { Scene12_Portfolio15vs85Insight } from "./equitas_screener2/Scene12_Portfolio15vs85Insight";
import { Scene13_AssetBackedBusiness } from "./equitas_screener2/Scene13_AssetBackedBusiness";
import { Scene14_RepaymentDiscipline } from "./equitas_screener2/Scene14_RepaymentDiscipline";
import { Scene15_FinalPerspectiveConclusion } from "./equitas_screener2/Scene15_FinalPerspectiveConclusion";

/**
 * ============================================================================
 * EQUITAS SMALL FINANCE BANK — SCREENER PART 2 (THE MICROFINANCE CRISIS)
 * ============================================================================
 * Master Composition: EquitasSFB_Screener_Part2
 * Duration: 3,544 frames (118.14s @ 30fps)
 * Source Video: "d:\QuickShare\Equitas SFB\Capcut\ESFB - Screenr - 2 - Video.mov"
 * Single persistent <Video> with dynamic GPU-accelerated translate3d transforms.
 * Strictly adheres to Mandatory Light Theme design tokens & zero corner clutter.
 */
export const EquitasSFB_Screener_Part2: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // 1. DYNAMIC FACECAM POSITIONS (Alternating Left/Right every 15-20s)
  // ---------------------------------------------------------------------------
  // Default: Full Screen (0 - 90)
  let facecamLeft = 0;
  let facecamTop = 0;
  let facecamWidth = 1920;
  let facecamHeight = 1080;
  let facecamRadius = 0;
  let isDocked = false;
  let isRightDocked = false;

  // Spring transition at frame 90 (Enter Left side)
  const springToLeft1 = spring({
    frame: Math.max(0, frame - 90),
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Spring transition at frame 450 (Shift to Right side)
  const springToRight1 = spring({
    frame: Math.max(0, frame - 450),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // Spring transition at frame 1180 (Shift to Left side)
  const springToLeft2 = spring({
    frame: Math.max(0, frame - 1180),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // Spring transition at frame 1860 (Shift to Right side)
  const springToRight2 = spring({
    frame: Math.max(0, frame - 1860),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // Spring transition at frame 2600 (Shift to Left side)
  const springToLeft3 = spring({
    frame: Math.max(0, frame - 2600),
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  // Spring transition at frame 3410 (Expand to Full Screen for Outro)
  const springToFullOutro = spring({
    frame: Math.max(0, frame - 3410),
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  if (frame >= 90 && frame < 3410) {
    isDocked = true;
    facecamTop = 50;
    facecamWidth = 580;
    facecamHeight = 980;
    facecamRadius = 24;

    if (frame < 450) {
      // 90 - 450: Left side
      facecamLeft = interpolate(springToLeft1, [0, 1], [0, 60]);
      facecamTop = interpolate(springToLeft1, [0, 1], [0, 50]);
      facecamWidth = interpolate(springToLeft1, [0, 1], [1920, 580]);
      facecamHeight = interpolate(springToLeft1, [0, 1], [1080, 980]);
      facecamRadius = interpolate(springToLeft1, [0, 1], [0, 24]);
    } else if (frame < 1180) {
      // 450 - 1180: Right side
      isRightDocked = true;
      facecamLeft = interpolate(springToRight1, [0, 1], [60, 1280]);
    } else if (frame < 1860) {
      // 1180 - 1860: Left side
      facecamLeft = interpolate(springToLeft2, [0, 1], [1280, 60]);
    } else if (frame < 2600) {
      // 1860 - 2600: Right side
      isRightDocked = true;
      facecamLeft = interpolate(springToRight2, [0, 1], [60, 1280]);
    } else {
      // 2600 - 3410: Left side
      facecamLeft = interpolate(springToLeft3, [0, 1], [1280, 60]);
    }
  } else if (frame >= 3410) {
    // 3410 - 3544: Outro full screen
    facecamLeft = interpolate(springToFullOutro, [0, 1], [60, 0]);
    facecamTop = interpolate(springToFullOutro, [0, 1], [50, 0]);
    facecamWidth = interpolate(springToFullOutro, [0, 1], [580, 1920]);
    facecamHeight = interpolate(springToFullOutro, [0, 1], [980, 1080]);
    facecamRadius = interpolate(springToFullOutro, [0, 1], [24, 0]);
  }

  // SaN chest-up framing transform within the 580x980 container
  const videoTranslateX = isDocked ? -681 : 0;
  const videoTranslateY = isDocked ? -85 : 0;
  const videoScale = isDocked ? 1.05 : 1.0;
  const facecamVideoTransform = `translate(${videoTranslateX}px, ${videoTranslateY}px) scale(${videoScale})`;

  // ---------------------------------------------------------------------------
  // 2. GRAPHICS CARD CONTAINER POSITION (Alternating Right / Left)
  // ---------------------------------------------------------------------------
  // When SaN is Left (x: 60), Card is Right (x: 680)
  // When SaN is Right (x: 1280), Card is Left (x: 60)
  const graphicsCardLeft = isRightDocked ? 60 : 680;

  // ---------------------------------------------------------------------------
  // 3. MICRO-HAPTIC SFX CUES (Precisely Quantized)
  // ---------------------------------------------------------------------------
  const sfxCues: SFXCue[] = [
    { frame: 90, type: "whoosh", volume: 0.65 },
    { frame: 240, type: "custom", soundFile: "sfx/paper_document_shuffle.wav", volume: 0.75 },
    { frame: 450, type: "whoosh", volume: 0.7 },
    { frame: 740, type: "custom", soundFile: "sfx/pop.wav", volume: 0.7 },
    { frame: 870, type: "custom", soundFile: "sfx/fracture.wav", volume: 0.8 },
    { frame: 1180, type: "boom", volume: 0.85 },
    { frame: 1470, type: "custom", soundFile: "sfx/cinematic_impact_hit.wav", volume: 0.85 },
    { frame: 1635, type: "custom", soundFile: "sfx/paper_document_shuffle.wav", volume: 0.65 },
    { frame: 1860, type: "stamp", volume: 0.85 },
    { frame: 2320, type: "custom", soundFile: "sfx/padlock.wav", volume: 0.8 },
    { frame: 2600, type: "custom", soundFile: "sfx/pop.wav", volume: 0.7 },
    { frame: 2850, type: "custom", soundFile: "sfx/cash_chime.wav", volume: 0.75 },
    { frame: 3060, type: "whoosh", volume: 0.65 },
    { frame: 3265, type: "custom", soundFile: "sfx/soft_bell.wav", volume: 0.75 },
    { frame: 3410, type: "whoosh", volume: 0.8 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: ESFB2_THEME.colors.canvasPrimary,
        overflow: "hidden",
        fontFamily: ESFB2_THEME.fonts.heading,
      }}
    >
      {/* =======================================================================
          MASTER AUDIO TRACK & SFX PLAYER
          ======================================================================= */}
      <Audio src={staticFile("video/esfb_screener2_audio.wav")} volume={1.0} />
      <SFXPlayer cues={sfxCues} />

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
              ? "0 24px 50px -12px rgba(15, 37, 43, 0.18), 0 0 1px rgba(15, 37, 43, 0.25)"
              : "none",
          border:
            facecamRadius > 0
              ? `2px solid ${ESFB2_THEME.colors.cardBorderStrong}`
              : "none",
          transition: "border-radius 0.2s ease",
        }}
      >
        <Video
          src={staticFile("video/esfb_screener2_facecam.mp4")}
          muted={true}
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            transform: facecamVideoTransform,
            transformOrigin: "top left",
          }}
        />

        {/* Presenter Name Badge (Only visible in side container mode) */}
        {facecamRadius > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(10px)",
              padding: "8px 16px",
              borderRadius: 12,
              border: "1px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: ESFB2_THEME.colors.primaryTeal,
                boxShadow: `0 0 8px ${ESFB2_THEME.colors.primaryTeal}`,
              }}
            />
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              SaN Forensic Lens
            </span>
          </div>
        )}
      </div>

      {/* =======================================================================
          LAYER 2: DYNAMIC EDITORIAL GRAPHICS CARD (1180px x 980px)
          Alternates between Right side (x: 680) and Left side (x: 60)
          ======================================================================= */}
      {frame >= 90 && frame < 3410 && (
        <div
          style={{
            position: "absolute",
            left: graphicsCardLeft,
            top: 50,
            width: 1180,
            height: 980,
            borderRadius: 24,
            backgroundColor: ESFB2_THEME.colors.cardBackground,
            boxShadow: ESFB2_THEME.shadows.card,
            border: `1.5px solid ${ESFB2_THEME.colors.cardBorder}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
          {/* -----------------------------------------------------------------
              SCENE ROUTING (Frames 90 to 3410)
              ----------------------------------------------------------------- */}
          {frame < 240 && <Scene01_ProfitCollapse sceneFrame={frame - 90} />}
          {frame >= 240 && frame < 450 && <Scene02_SmartInvestorConcall sceneFrame={frame - 240} />}
          {frame >= 450 && frame < 740 && <Scene03_MicrofinanceCrisisMap sceneFrame={frame - 450} />}
          {frame >= 740 && frame < 870 && <Scene04_MultipleLoansPileup sceneFrame={frame - 740} />}
          {frame >= 870 && frame < 1180 && <Scene05_RegionalStressHeatwaves sceneFrame={frame - 870} />}
          {frame >= 1180 && frame < 1470 && <Scene06_CreditCostShock sceneFrame={frame - 1180} />}
          {frame >= 1470 && frame < 1635 && <Scene07_ProfitWipeout630Cr sceneFrame={frame - 1470} />}
          {frame >= 1635 && frame < 1860 && <Scene08_ManagementHonestyQuestion sceneFrame={frame - 1635} />}
          {frame >= 1860 && frame < 2320 && <Scene09_Action1_RadicalHonesty sceneFrame={frame - 1860} />}
          {frame >= 2320 && frame < 2600 && <Scene10_Action2_StricterLending sceneFrame={frame - 2320} />}
          {frame >= 2600 && frame < 2850 && <Scene11_Action3_FiftyPercentRejected sceneFrame={frame - 2600} />}
          {frame >= 2850 && frame < 3060 && <Scene12_Portfolio15vs85Insight sceneFrame={frame - 2850} />}
          {frame >= 3060 && frame < 3265 && <Scene13_AssetBackedBusiness sceneFrame={frame - 3060} />}
          {frame >= 3265 && frame < 3410 && <Scene14_RepaymentDiscipline sceneFrame={frame - 3265} />}
        </div>
      )}

      {/* =======================================================================
          LAYER 3: FINAL SCENE 15 (OUTRO CONCLUSION BANNER)
          Mounted over full screen SaN facecam at frames 3410 to 3544
          ======================================================================= */}
      {frame >= 3410 && <Scene15_FinalPerspectiveConclusion sceneFrame={frame - 3410} />}
    </AbsoluteFill>
  );
};
