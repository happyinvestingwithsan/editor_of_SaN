import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
} from "remotion";

import { ThinkSchoolTake06Facecam } from "../components/thinkschool/ThinkSchoolTake06Facecam";
import { Take6VerdictStage } from "../components/thinkschool/Take6VerdictStage";
import { Take6CompoundingAnchorStage } from "../components/thinkschool/Take6CompoundingAnchorStage";
import { Take6GoldenRuleStage } from "../components/thinkschool/Take6GoldenRuleStage";
import { Take6ZomatoFomoPeakStage } from "../components/thinkschool/Take6ZomatoFomoPeakStage";
import { Take6ZomatoCrashLockinStage } from "../components/thinkschool/Take6ZomatoCrashLockinStage";
import { Take6ListingDayCasinoStage } from "../components/thinkschool/Take6ListingDayCasinoStage";
import { Take6DmaBreakoutRallyStage } from "../components/thinkschool/Take6DmaBreakoutRallyStage";
import { Take6MasterCreedStage } from "../components/thinkschool/Take6MasterCreedStage";
import { Take6CommunityOutroStage } from "../components/thinkschool/Take6CommunityOutroStage";

export interface ThinkSchool_Take06Props {
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchool_Take06:
 * Chapter 6: The Final Verdict & Technical Discipline (Zomato 200 DMA Masterclass)
 * Master Source: D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov (513.13s - 653.04s)
 * Duration: 4197 frames (139.91s @ 30fps)
 *
 * Micro-Aligned Word-Level Timeline:
 * - Frames 0 - 721 (0.0s - 24.0s): The Verdict (NO @ F241) & Jio Asset Dominance Scorecard (Full-Screen -> Right Column 35%)
 * - Frames 721 - 1085 (24.0s - 36.2s): Pathway A: 5-10 Year Anchor Compounding Asset (SaN Left Column 35%)
 * - Frames 1085 - 1646 (36.2s - 54.9s): Pathway B: The Golden Rule (No 200 DMA = No Entry) (SaN Right Column 35%)
 * - Frames 1646 - 2097 (54.9s - 69.9s): Zomato July 2021 IPO Frenzy: Animated Surge ₹76 -> ₹115 -> ₹169 Top (SaN Left Column 35%)
 * - Frames 2097 - 2507 (69.9s - 83.6s): Anchor Lock-in Expiry & Animated Cascading -76% Crash to ₹40 (SaN Circle PIP 320x320)
 * - Frames 2507 - 2971 (83.6s - 99.0s): The 3 Zeroes & Listing Day Casino: Bankers vs Flippers (SaN Right Column 35%)
 * - Frames 2971 - 3601 (99.0s - 120.0s): Animated 200 DMA Curve & Breakout @ ₹65 -> Clean Rally to ₹280+ (SaN Left Column 35%)
 * - Frames 3601 - 3769 (120.0s - 125.6s): The Master Investor Creed: Discipline over Greed (Full-Screen A-Roll)
 * - Frames 3769 - 4197 (125.6s - 139.9s): Community Outro & Engagement HUD: Subscribe / Share / Comment (SaN Right Column 35%)
 */
export const ThinkSchool_Take06: React.FC<ThinkSchool_Take06Props> = ({
  mode = "full_video",
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: mode === "full_video" ? "#070B12" : "transparent",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Master Audio Track sliced from Final Master Cut */}
      {mode === "full_video" && (
        <Audio src={staticFile("audio/master_take6_audio.wav")} volume={1} />
      )}

      {/* =========================================================================
          BACKGROUND / GRAPHICS SCENE STAGES
          ========================================================================= */}

      {/* SCENE 1: THE VERDICT & ASSET SCORECARD (Frames 0 - 721) */}
      {frame >= 0 && frame < 721 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take6VerdictStage localFrame={frame} />
        </div>
      )}

      {/* SCENE 2: PATHWAY A - 5-10 YEAR ANCHOR COMPOUNDING (Frames 721 - 1085) */}
      {frame >= 721 && frame < 1085 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take6CompoundingAnchorStage localFrame={frame - 721} />
        </div>
      )}

      {/* SCENE 3: PATHWAY B - THE GOLDEN RULE NO 200 DMA (Frames 1085 - 1646) */}
      {frame >= 1085 && frame < 1646 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take6GoldenRuleStage localFrame={frame - 1085} />
        </div>
      )}

      {/* SCENE 4: ZOMATO IPO FOMO PEAK @ 169 WITH ANIMATED GRAPH LINE (Frames 1646 - 2097) */}
      {frame >= 1646 && frame < 2097 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take6ZomatoFomoPeakStage localFrame={frame - 1646} />
        </div>
      )}

      {/* SCENE 5: -76% CRASH TO ₹40 WITH ANIMATED CASCADING GRAPH LINE (Frames 2097 - 2507) */}
      {frame >= 2097 && frame < 2507 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take6ZomatoCrashLockinStage localFrame={frame - 2097} />
        </div>
      )}

      {/* SCENE 6: THE 3 ZEROES & LISTING DAY CASINO (Frames 2507 - 2971) */}
      {frame >= 2507 && frame < 2971 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take6ListingDayCasinoStage localFrame={frame - 2507} />
        </div>
      )}

      {/* SCENE 7: ANIMATED 200 DMA CURVE & RALLY TO ₹280+ (Frames 2971 - 3601) */}
      {frame >= 2971 && frame < 3601 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take6DmaBreakoutRallyStage localFrame={frame - 2971} />
        </div>
      )}

      {/* SCENE 8: THE MASTER CREED (Frames 3601 - 3769) */}
      {frame >= 3601 && frame < 3769 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 60 }}>
          <Take6MasterCreedStage localFrame={frame - 3601} />
        </div>
      )}

      {/* SCENE 9: COMMUNITY OUTRO & ENGAGEMENT HUD (Frames 3769 - 4197) */}
      {frame >= 3769 && frame <= 4197 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take6CommunityOutroStage localFrame={frame - 3769} />
        </div>
      )}

      {/* =========================================================================
          PERSISTENT SINGLE <VIDEO> FACECAM MOUNT (ZERO UNMOUNTING)
          ========================================================================= */}
      <ThinkSchoolTake06Facecam frame={frame} mode={mode} />
    </AbsoluteFill>
  );
};
