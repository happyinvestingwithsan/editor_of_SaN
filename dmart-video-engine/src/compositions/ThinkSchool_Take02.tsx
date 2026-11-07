import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  Audio,
  staticFile,
  Sequence,
} from "remotion";

import { ThinkSchoolTake02Facecam } from "../components/thinkschool/ThinkSchoolTake02Facecam";
import { ThinkSchoolTake02_Scene1_Graveyard } from "../components/thinkschool/ThinkSchoolTake02_Scene1_Graveyard";
import { ThinkSchoolTake02_Scene2_OFSDefinition } from "../components/thinkschool/ThinkSchoolTake02_Scene2_OFSDefinition";
import { ThinkSchoolTake02_Scene2_OFSPlumbing } from "../components/thinkschool/ThinkSchoolTake02_Scene2_OFSPlumbing";
import { ThinkSchoolTake02_Scene3_DrhpProof } from "../components/thinkschool/ThinkSchoolTake02_Scene3_DrhpProof";
import { ThinkSchoolTake02_Scene4_SiliconValley } from "../components/thinkschool/ThinkSchoolTake02_Scene4_SiliconValley";
import { ThinkSchoolTake02_Scene5_ValuationVault } from "../components/thinkschool/ThinkSchoolTake02_Scene5_ValuationVault";
import { ThinkSchoolTake02_Scene6_Compounding } from "../components/thinkschool/ThinkSchoolTake02_Scene6_Compounding";
import { ThinkSchoolTake02_Scene7_TreasuryFinal } from "../components/thinkschool/ThinkSchoolTake02_Scene7_TreasuryFinal";

export interface ThinkSchool_Take02Props {
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchool_Take02:
 * Masterclass Chapter 2 / Take 2
 * "The DRHP Forensic: Why This is NOT a Startup Exit"
 *
 * Source: "Jio_Mega_IPO_8Min_Master-full video.mov" (96.43s to 207.27s | 3322 frames @ 30fps)
 *
 * Micro-Aligned 8-Chunk Pacing & Retention Architecture:
 * 1. Chunk 1 (Frames 0 - 277 | 0.0s - 9.2s):
 *    -> Startup Wealth Destruction Hook | SaN Left 32% Tall Frame
 * 2. Chunk 2 (Frames 277 - 632 | 9.2s - 21.1s):
 *    -> 4 Tech Listings & OFS Definition | SaN Left 32% Tall Frame
 * 3. Chunk 3 (Frames 632 - 1151 | 21.1s - 38.4s):
 *    -> OFS Emergency Exit Door Plumbing | Full Canvas + SaN Circle PIP
 * 4. Chunk 4 (Frames 1151 - 1597 | 38.4s - 53.2s):
 *    -> Real DRHP Prospectus Page 68 Scanned Table | Full Canvas + SaN Circle PIP
 * 5. Chunk 5 (Frames 1597 - 2204 | 53.2s - 73.5s):
 *    -> 2020 Silicon Valley Alliance ($65B Baseline) | SaN Right 32% Tall Frame
 * 6. Chunk 6 (Frames 2204 - 2684 | 73.5s - 89.5s):
 *    -> $120B Podiums & Unbooked Gains Vault Lock | SaN Left 32% Tall Frame
 * 7. Chunk 7 (Frames 2684 - 3084 | 89.5s - 102.8s):
 *    -> Whale Conviction & Long-Term Compounding Curve | SaN Right 32% Tall Frame
 * 8. Chunk 8 (Frames 3084 - 3322 | 102.8s - 110.7s):
 *    -> 100% Treasury Inflow Vault (Prepaying Debt) | SaN Left 32% Tall Frame
 */
export const ThinkSchool_Take02: React.FC<ThinkSchool_Take02Props> = ({
  mode = "full_video",
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: mode === "full_video" ? "#070A10" : "transparent",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Pristine Master Audio Track extracted directly from master video export */}
      {mode === "full_video" && (
        <Audio src={staticFile("audio/master_take2_audio.wav")} volume={1} />
      )}

      {/* =========================================================================
          BACKGROUND / GRAPHICS SCENE STAGES (8 Micro-Synced Chunks)
          ========================================================================= */}

      {/* CHUNK 1: STARTUP WEALTH DESTRUCTION (Frames 0 - 277) */}
      {frame >= 0 && frame < 277 && (
        <ThinkSchoolTake02_Scene1_Graveyard localFrame={frame} />
      )}

      {/* CHUNK 2: OFS DEFINITION & 4 TECH LISTINGS (Frames 277 - 632) */}
      {frame >= 277 && frame < 632 && (
        <ThinkSchoolTake02_Scene2_OFSDefinition localFrame={frame - 277} />
      )}

      {/* CHUNK 3: EMERGENCY EXIT PLUMBING (Frames 632 - 1151 | Full Canvas) */}
      {frame >= 632 && frame < 1151 && (
        <ThinkSchoolTake02_Scene2_OFSPlumbing localFrame={frame - 632} />
      )}

      {/* CHUNK 4: REAL DRHP PAGE 68 SCANNED TABLE (Frames 1151 - 1597 | Full Canvas) */}
      {frame >= 1151 && frame < 1597 && (
        <ThinkSchoolTake02_Scene3_DrhpProof localFrame={frame - 1151} />
      )}

      {/* CHUNK 5: SILICON VALLEY 2020 ALLIANCE (Frames 1597 - 2204) */}
      {frame >= 1597 && frame < 2204 && (
        <ThinkSchoolTake02_Scene4_SiliconValley localFrame={frame - 1597} />
      )}

      {/* CHUNK 6: $120B PODIUMS & UNBOOKED GAINS (Frames 2204 - 2684) */}
      {frame >= 2204 && frame < 2684 && (
        <ThinkSchoolTake02_Scene5_ValuationVault localFrame={frame - 2204} />
      )}

      {/* CHUNK 7: WHALE CONVICTION & COMPOUNDING CURVE (Frames 2684 - 3084) */}
      {frame >= 2684 && frame < 3084 && (
        <ThinkSchoolTake02_Scene6_Compounding localFrame={frame - 2684} />
      )}

      {/* CHUNK 8: 100% TREASURY INFLOW VAULT (Frames 3084 - 3322) */}
      {frame >= 3084 && frame < 3322 && (
        <ThinkSchoolTake02_Scene7_TreasuryFinal localFrame={frame - 3084} />
      )}

      {/* =========================================================================
          PERSISTENT FACECAM (32% Tall Frame vs Circle PIP, Zero Unmounting)
          ========================================================================= */}
      <ThinkSchoolTake02Facecam frame={frame} mode={mode} />

      {/* =========================================================================
          WORD-ALIGNED SOUND DESIGN SFX
          ========================================================================= */}
      {mode === "full_video" && (
        <>
          {/* Chunk 1: "destroyed" (Frame 211) */}
          <Sequence from={211} durationInFrames={30}>
            <Audio src={staticFile("sfx/pop.wav")} volume={0.35} />
          </Sequence>

          {/* Chunk 2: "Paytm, Swiggy" (Frame 374) & "Offer for Sale" (Frame 510) */}
          <Sequence from={374} durationInFrames={30}>
            <Audio src={staticFile("sfx/pop.wav")} volume={0.3} />
          </Sequence>
          <Sequence from={510} durationInFrames={30}>
            <Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} />
          </Sequence>

          {/* Chunk 3: "Emergency Exit Door" (Frame 822) & "Barrier Slam" (Frame 958) */}
          <Sequence from={822} durationInFrames={30}>
            <Audio src={staticFile("sfx/pop.wav")} volume={0.4} />
          </Sequence>
          <Sequence from={958} durationInFrames={30}>
            <Audio src={staticFile("sfx/impact.wav")} volume={0.5} />
          </Sequence>

          {/* Chunk 4: Mint Green Box on DRHP (Frame 1261) & Triple Padlocks (1405, 1498) */}
          <Sequence from={1261} durationInFrames={30}>
            <Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} />
          </Sequence>
          <Sequence from={1405} durationInFrames={30}>
            <Audio src={staticFile("sfx/pop.wav")} volume={0.35} />
          </Sequence>
          <Sequence from={1498} durationInFrames={30}>
            <Audio src={staticFile("sfx/pop.wav")} volume={0.35} />
          </Sequence>

          {/* Chunk 5: Meta Cheque (Frame 1886) & $65B Chime (Frame 2158) */}
          <Sequence from={1886} durationInFrames={30}>
            <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
          </Sequence>
          <Sequence from={2158} durationInFrames={30}>
            <Audio src={staticFile("sfx/pop.wav")} volume={0.4} />
          </Sequence>

          {/* Chunk 6: $120B Podium (Frame 2254) & Steel Vault Slam (Frame 2656) */}
          <Sequence from={2254} durationInFrames={30}>
            <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
          </Sequence>
          <Sequence from={2656} durationInFrames={30}>
            <Audio src={staticFile("sfx/impact.wav")} volume={0.6} />
          </Sequence>

          {/* Chunk 7: Compounding Curve (Frame 2998) */}
          <Sequence from={2998} durationInFrames={30}>
            <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
          </Sequence>

          {/* Chunk 8: Final Treasury Stamp (Frame 3258) */}
          <Sequence from={3258} durationInFrames={30}>
            <Audio src={staticFile("sfx/impact.wav")} volume={0.5} />
          </Sequence>
        </>
      )}
    </AbsoluteFill>
  );
};
