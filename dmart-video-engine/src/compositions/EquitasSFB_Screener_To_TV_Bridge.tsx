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
import { EngagementCTA } from "../components/bridge/EngagementCTA";
import { FundamentalsTechnicalComparison } from "../components/bridge/FundamentalsTechnicalComparison";
import { EducationalDisclaimer } from "../components/bridge/EducationalDisclaimer";
import { BRIDGE_THEME } from "../components/bridge/theme";

/**
 * ============================================================================
 * EQUITAS SMALL FINANCE BANK — SCREENER TO TRADINGVIEW BRIDGE
 * ============================================================================
 * Composition: EquitasSFB_Screener_To_TV_Bridge
 * Duration: 2,729 frames (90.97s @ 30fps)
 * Source Video: "d:\QuickShare\Equitas SFB\Capcut\ESFB - Screenr to TV bridge.mov"
 * Proxy Video: "public/video/esfb_bridge_facecam.mp4"
 * Audio: "public/audio/esfb_bridge_audio.wav"
 *
 * Design System & SaN Direct Directive:
 * - Before frame 935: SaN is FULLSCREEN (left: 0, top: 0, width: 1920, height: 1080)
 *   with lower-right Scene 1 & 2 CTA overlays.
 * - From frame 935 till end of composition (frame 2729):
 *   SaN smoothly transitions into the dedicated Left Container:
 *   left: 50px, top: 50px, width: 680px, height: 980px, borderRadius: 24px.
 *   Video calibrated chest-up centering: translate(-681px, -85px) scale(1.05).
 *   Zero facial/body obstruction across all scenes!
 * - Right Container (left: 770px, top: 50px, width: 1100px, height: 980px):
 *   Scene 3 (frames 935–1390): Fundamentals vs Technicals 2-Column Comparison
 *   Scene 4 (frames 1390–1585): TradingView Candlestick & 200 DMA Card
 *   Scene 5 (frames 1585–2729): Statutory Educational Disclaimer & Due Diligence Card
 * ============================================================================
 */
export const EquitasSFB_Screener_To_TV_Bridge: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // 1. DYNAMIC DUAL-CONTAINER SPLIT LAYOUT (Single Persistent <Video>)
  // ---------------------------------------------------------------------------
  // Default fullscreen before frame 935
  let facecamLeft = 0;
  let facecamTop = 0;
  let facecamWidth = 1920;
  let facecamHeight = 1080;
  let facecamRadius = 0;
  let facecamTranslate = "translate(0px, 0px) scale(1)";

  // At Frame 935 through Frame 2729 (end):
  // SaN transitions into dedicated left card (width: 680, height: 980)
  if (frame >= 935) {
    const splitSpring = spring({
      frame: Math.max(0, frame - 935),
      fps: 30,
      config: { damping: 18, stiffness: 90 },
    });
    facecamLeft = interpolate(splitSpring, [0, 1], [0, 50]);
    facecamTop = interpolate(splitSpring, [0, 1], [0, 50]);
    facecamWidth = interpolate(splitSpring, [0, 1], [1920, 680]);
    facecamHeight = interpolate(splitSpring, [0, 1], [1080, 980]);
    facecamRadius = interpolate(splitSpring, [0, 1], [0, 24]);
    const tx = interpolate(splitSpring, [0, 1], [0, -681]);
    const ty = interpolate(splitSpring, [0, 1], [0, -85]);
    const sc = interpolate(splitSpring, [0, 1], [1, 1.05]);
    facecamTranslate = `translate(${tx}px, ${ty}px) scale(${sc})`;
  }

  // ---------------------------------------------------------------------------
  // 2. SFX CUES (Tactile sound design synchronized with kinetic events)
  // ---------------------------------------------------------------------------
  const sfxCues: SFXCue[] = [
    // Scene 1: Like & Subscribe pops
    {
      frame: 185,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.5,
    },
    {
      frame: 218,
      type: "custom",
      soundFile: "audio/metallic_counter_tick.wav",
      volume: 0.6,
    },
    // Scene 2: Contradicting Opinion card return
    {
      frame: 748,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.45,
    },
    // Frame 935: Screen Split & Strategic Comparison entrance
    {
      frame: 935,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.6,
    },
    // "Right Price" Pop
    {
      frame: 1334,
      type: "custom",
      soundFile: "audio/metallic_counter_tick.wav",
      volume: 0.7,
    },
    // Scene 4: TradingView Candlestick card entrance
    {
      frame: 1390,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.55,
    },
    // Scene 5: Disclaimer card entrance
    {
      frame: 1585,
      type: "custom",
      soundFile: "audio/clean_transition_whoosh.wav",
      volume: 0.5,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F2FAF9",
        overflow: "hidden",
        fontFamily: BRIDGE_THEME.fonts.heading,
      }}
    >
      {/* =======================================================================
          MASTER AUDIO & SFX LAYER
          ======================================================================= */}
      <Audio src={staticFile("audio/esfb_bridge_audio.wav")} volume={1.0} />
      <SFXPlayer cues={sfxCues} />

      {/* =======================================================================
          PERSISTENT SINGLE <VIDEO> FACECAM
          Mounted 100% across all 2,729 frames with GPU translate3d / scale.
          Frames 0–934: Fullscreen (1920x1080)
          Frames 935–2729: Left Container Card (680x980, radius 24px)
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
          transition: "border-radius 0.2s ease",
        }}
      >
        <Video
          src={staticFile("video/esfb_bridge_facecam.mp4")}
          muted={true}
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            transform: facecamTranslate,
            transformOrigin: "top left",
          }}
        />

        {/* Presenter Name Badge (Only visible in side container) */}
        {facecamRadius > 0 && (
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
                fontWeight: 600,
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
          SCENE 1 & 2: ENGAGEMENT CTA & COMMUNITY DISCUSSION
          Active: Frames 0 - 935 (fullscreen overlay in lower right)
          ======================================================================= */}
      <EngagementCTA />

      {/* =======================================================================
          SCENE 3 & 4: FUNDAMENTALS VS TECHNICALS & TRADINGVIEW CANDLESTICKS
          Active: Frames 935 - 1585 (Right container: 770px, 50px, 1100px, 980px)
          ======================================================================= */}
      <FundamentalsTechnicalComparison />

      {/* =======================================================================
          SCENE 5: STATUTORY EDUCATIONAL DISCLAIMER & DUE DILIGENCE
          Active: Frames 1585 - 2729 (Right container: 770px, 50px, 1100px, 980px)
          ======================================================================= */}
      <EducationalDisclaimer />
    </AbsoluteFill>
  );
};
