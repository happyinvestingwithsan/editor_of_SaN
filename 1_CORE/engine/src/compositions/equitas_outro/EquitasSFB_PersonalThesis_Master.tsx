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
import { SFXCue, SFXPlayer } from "../../motion-kit";
import { OUTRO_THEME } from "./theme";
import { OpeningHeading } from "./components/OpeningHeading";
import { ValuationComparisonCard } from "./components/ValuationComparisonCard";
import { ProfitAnnualisationCard } from "./components/ProfitAnnualisationCard";
import { InvestmentThesisCard } from "./components/InvestmentThesisCard";
import { PersonalPositionAllocation } from "./components/PersonalPositionAllocation";
import { SuccessionAndMarketCard } from "./components/SuccessionAndMarketCard";
import { StagedEntryDiagram } from "./components/StagedEntryDiagram";
import { DoNotCopyCard } from "./components/DoNotCopyCard";
import { PositionSizingCards } from "./components/PositionSizingCards";
import { PortfolioRiskIllustration } from "./components/PortfolioRiskIllustration";
import { InvestorResponsibilityCard } from "./components/InvestorResponsibilityCard";
import { EngagementCTA } from "./components/EngagementCTA";
import { HappyInvestingOutro } from "./components/HappyInvestingOutro";

/**
 * ============================================================================
 * EQUITAS SMALL FINANCE BANK — PERSONAL INVESTMENT THESIS & RISK MANAGEMENT
 * ============================================================================
 * Composition: EquitasSFB_PersonalThesis_Master
 * Duration: 4,893 frames (163.10s @ 30fps)
 * Source Video: "d:\QuickShare\Equitas SFB\Capcut\WSFB - Outro Video.mov"
 * Proxy Video: "public/video/esfb_outro_facecam.mp4"
 * Audio: "public/audio/esfb_outro_audio.wav"
 *
 * Layout Architecture (Standard SaN Video OS Split & Fullscreen System):
 * 1. Split Intervals:
 *    - Left Facecam Container: (left: 50px, top: 50px, width: 680px, height: 980px, radius: 24px)
 *      Calibrated internal centering: translate(-681px, -85px) scale(1.05) with SaN Forensic Lens badge
 *    - Right Dedicated Content Canvas: (left: 770px, top: 50px, width: 1100px, height: 980px, radius: 24px)
 *      40px gutter, pristine mobile legibility, zero awkward white space.
 * 2. Fullscreen Facecam Intervals:
 *    - Frames 0 – 150: Scene 01 Opening address
 *    - Frames 2490 – 2915: Scene 08 Direct warning ("Do not blindly copy my trade") with bottom-third banner
 *    - Frames 3470 – 3680: Scene 10 Emotional truth ("peaceful sleep at night") 100% graphic-free
 *    - Frames 4195 – 4893: Scene 12 Community CTA & Scene 13 Happy Investing sign-off with lower-third overlays
 * 3. Zero Subtitles / Captions (per user directive).
 * ============================================================================
 */
export const EquitasSFB_PersonalThesis_Master: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // 1. DYNAMIC DUAL-CONTAINER SPLIT & FULLSCREEN LAYOUT
  // ---------------------------------------------------------------------------
  const getSplitProgress = (f: number): number => {
    // 0 - 150: Fullscreen (Opening)
    if (f < 150) return 0;

    // 150 - 2490: Phase 1 Split (Valuation to Staged Entry)
    if (f >= 150 && f < 2490) {
      return spring({
        frame: f - 150,
        fps: 30,
        config: { damping: 18, stiffness: 90 },
      });
    }

    // 2490 - 2915: Fullscreen (Do not blindly copy)
    if (f >= 2490 && f < 2915) {
      const exit = spring({
        frame: f - 2490,
        fps: 30,
        config: { damping: 18, stiffness: 90 },
      });
      return interpolate(exit, [0, 1], [1, 0]);
    }

    // 2915 - 3470: Phase 2 Split (Portfolio Limits & Concentration Risk)
    if (f >= 2915 && f < 3470) {
      return spring({
        frame: f - 2915,
        fps: 30,
        config: { damping: 18, stiffness: 90 },
      });
    }

    // 3470 - 3680: Fullscreen (Peaceful sleep at night)
    if (f >= 3470 && f < 3680) {
      const exit = spring({
        frame: f - 3470,
        fps: 30,
        config: { damping: 18, stiffness: 90 },
      });
      return interpolate(exit, [0, 1], [1, 0]);
    }

    // 3680 - 4195: Phase 3 Split (Investor Responsibility)
    if (f >= 3680 && f < 4195) {
      return spring({
        frame: f - 3680,
        fps: 30,
        config: { damping: 18, stiffness: 90 },
      });
    }

    // 4195 - 4893: Fullscreen (Final CTA & Happy Investing Outro)
    const finalExit = spring({
      frame: Math.max(0, f - 4195),
      fps: 30,
      config: { damping: 18, stiffness: 90 },
    });
    return interpolate(finalExit, [0, 1], [1, 0]);
  };

  const splitProgress = getSplitProgress(frame);

  const facecamLeft = interpolate(splitProgress, [0, 1], [0, 50]);
  const facecamTop = interpolate(splitProgress, [0, 1], [0, 50]);
  const facecamWidth = interpolate(splitProgress, [0, 1], [1920, 680]);
  const facecamHeight = interpolate(splitProgress, [0, 1], [1080, 980]);
  const facecamRadius = interpolate(splitProgress, [0, 1], [0, 24]);
  const tx = interpolate(splitProgress, [0, 1], [0, -681]);
  const ty = interpolate(splitProgress, [0, 1], [0, -85]);
  const sc = interpolate(splitProgress, [0, 1], [1, 1.05]);
  const facecamTranslate = `translate(${tx}px, ${ty}px) scale(${sc})`;

  // ---------------------------------------------------------------------------
  // 2. SUBTLE RESTRAINED SFX CUES
  // ---------------------------------------------------------------------------
  const sfxCues: SFXCue[] = [
    // Scene 01 & 02: Simple valuation card entrance & reveals
    {
      frame: 152,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.35,
    },
    {
      frame: 232,
      type: "custom",
      soundFile: "audio/metallic_counter_tick.wav",
      volume: 0.45,
    },
    {
      frame: 358,
      type: "custom",
      soundFile: "audio/metallic_counter_tick.wav",
      volume: 0.45,
    },
    {
      frame: 508,
      type: "custom",
      soundFile: "audio/metallic_counter_tick.wav",
      volume: 0.5,
    },
    // Scene 03: Profit card entrance & 800 Cr run rate
    {
      frame: 702,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.35,
    },
    {
      frame: 838,
      type: "custom",
      soundFile: "audio/metallic_counter_tick.wav",
      volume: 0.45,
    },
    // Scene 04: Thesis card
    {
      frame: 962,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.35,
    },
    // Scene 05: Personal position allocation
    {
      frame: 1282,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.35,
    },
    // Scene 06: Succession calendar
    {
      frame: 1838,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.3,
    },
    // Scene 07: Staged entry diagram
    {
      frame: 2162,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.35,
    },
    {
      frame: 2262,
      type: "custom",
      soundFile: "audio/metallic_counter_tick.wav",
      volume: 0.4,
    },
    // Scene 08: Do not copy warning
    {
      frame: 2506,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.35,
    },
    // Scene 09: Position sizing cards
    {
      frame: 2918,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.35,
    },
    // Scene 10: Limit concentration risk
    {
      frame: 3222,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.3,
    },
    // Scene 11: Investor responsibility
    {
      frame: 3682,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.35,
    },
    // Scene 12: Like & Share CTA
    {
      frame: 4368,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.35,
    },
    // Scene 13: Happy Investing Outro Signature
    {
      frame: 4810,
      type: "custom",
      soundFile: "sfx/soft_bell.wav",
      volume: 0.5,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F2FAF9",
        overflow: "hidden",
        fontFamily: OUTRO_THEME.fonts.heading,
      }}
    >
      {/* =======================================================================
          MASTER AUDIO & RESTRAINED SOUND DESIGN LAYER
          ======================================================================= */}
      <Audio src={staticFile("audio/esfb_outro_audio.wav")} volume={1.0} />
      <SFXPlayer cues={sfxCues} />

      {/* =======================================================================
          PERSISTENT SINGLE <VIDEO> FACECAM
          Mounted 100% across all 4,893 frames.
          Morphs smoothly between Fullscreen (1920x1080) and Left Container Card (680x980).
          Calibrated chest-up centering: translate(-681px, -85px) scale(1.05).
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
              ? "0 20px 45px -10px rgba(15, 23, 42, 0.18), 0 0 1px rgba(15, 23, 42, 0.25)"
              : "none",
          border:
            facecamRadius > 0
              ? "2px solid rgba(255, 255, 255, 0.85)"
              : "none",
        }}
      >
        <Video
          src={staticFile("video/esfb_outro_facecam.mp4")}
          muted={true}
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            transform: facecamTranslate,
            transformOrigin: "top left",
          }}
        />

        {/* Presenter Name Badge (Visible when inside container card) */}
        {facecamRadius > 8 && (
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              backgroundColor: "rgba(15, 23, 42, 0.82)",
              backdropFilter: "blur(8px)",
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
                backgroundColor: "#10B981",
                boxShadow: "0 0 8px #10B981",
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
          SCENE 01: OPENING HEADING (Frames 15 - 145, Fullscreen Facecam)
          "What is my personal view and what am I doing with my own money?"
          ======================================================================= */}
      <OpeningHeading />

      {/* =======================================================================
          RIGHT DEDICATED CONTENT CANVAS (1100px x 980px)
          Active across Split intervals with 40px gutter and zero overlap!
          ======================================================================= */}

      {/* SCENE 01 & 02: SIMPLE VALUATION & BOOK VALUE (Frames 150 - 698) */}
      <ValuationComparisonCard />

      {/* SCENE 03: QUARTERLY PROFIT RUN RATE (Frames 700 - 956) */}
      <ProfitAnnualisationCard />

      {/* SCENE 04: THE 3-PILLAR THESIS & TEMPORARY PAIN (Frames 960 - 1275) */}
      <InvestmentThesisCard />

      {/* SCENE 05: PERSONAL POSITION & CASH RESERVED (Frames 1280 - 1820) */}
      <PersonalPositionAllocation />

      {/* SCENE 06: WHY NOT INVEST EVERYTHING? (Frames 1825 - 2155) */}
      <SuccessionAndMarketCard />

      {/* SCENE 07: 3-STAGE ACCUMULATION PLAN (Frames 2160 - 2490) */}
      <StagedEntryDiagram />

      {/* =======================================================================
          SCENE 08: DO NOT BLINDLY COPY MY TRADE (Frames 2505 - 2660, Fullscreen Facecam)
          Restrained lower-third warning statement in bottom 3rd
          ======================================================================= */}
      <DoNotCopyCard />

      {/* SCENE 09: PORTFOLIO ALLOCATION LIMITS (Frames 2915 - 3215, Split Canvas) */}
      <PositionSizingCards />

      {/* SCENE 10: LIMIT CONCENTRATION RISK (Frames 3220 - 3470, Split Canvas) */}
      <PortfolioRiskIllustration />

      {/* SCENE 11: INVESTOR RESPONSIBILITY (Frames 3680 - 4195, Split Canvas) */}
      <InvestorResponsibilityCard />

      {/* =======================================================================
          SCENE 12: COMMUNITY DISCUSSION & ENGAGEMENT CTA (Frames 4195 - 4655)
          Fullscreen Facecam with bottom-third lower CTA card
          ======================================================================= */}
      <EngagementCTA />

      {/* =======================================================================
          SCENE 13: STAY CALM, STAY DISCIPLINED & HAPPY INVESTING (Frames 4655 - 4893)
          Fullscreen Facecam with bottom-third signature outro
          ======================================================================= */}
      <HappyInvestingOutro />
    </AbsoluteFill>
  );
};
