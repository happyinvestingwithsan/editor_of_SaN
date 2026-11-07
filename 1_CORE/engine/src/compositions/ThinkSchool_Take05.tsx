import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
} from "remotion";

import { ThinkSchoolTake05Facecam } from "../components/thinkschool/ThinkSchoolTake05Facecam";
import { Take5FinfluencerGlitchStage } from "../components/thinkschool/Take5FinfluencerGlitchStage";
import { Take5MarketCapOlympusStage } from "../components/thinkschool/Take5MarketCapOlympusStage";
import { Take5SpeedboatVsTankerStage } from "../components/thinkschool/Take5SpeedboatVsTankerStage";
import { Take5RealisticListingGainsStage } from "../components/thinkschool/Take5RealisticListingGainsStage";
import { Take5DrhpSpectrumIcebergStage } from "../components/thinkschool/Take5DrhpSpectrumIcebergStage";
import { Take5SatelliteBroadbandStage } from "../components/thinkschool/Take5SatelliteBroadbandStage";
import { Take5TwoVariableGambleStage } from "../components/thinkschool/Take5TwoVariableGambleStage";

export interface ThinkSchool_Take05Props {
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchool_Take05:
 * Chapter 5: The Unfiltered DRHP Risks & The Size Trap (Refined with Micro-Word Sync)
 * Master Source: D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov (408.15s - 513.15s)
 * Duration: 3,150 frames (105.00s @ 30fps)
 *
 * Micro-Aligned Timeline Schedule:
 * - Frames 0 - 521 (0.0s - 17.4s): Full Facecam A-Roll + Word-Triggered Overlays (Intro & Risk 1 Intro)
 * - Frames 521 - 956 (17.4s - 31.9s): Top 4 Market Cap Olympus: Jio Rises First, Comps Illuminate on Word (SaN Right Column 31%)
 * - Frames 956 - 1581 (31.9s - 52.7s): Speedboat vs Supertanker Liquidity Physics (SaN Left Column 31%)
 * - Frames 1581 - 1861 (52.7s - 62.0s): Realistic 5%-15% Listing Gain Band (SaN Right Column 31%)
 * - Frames 1861 - 2202 (62.0s - 73.4s): DRHP Spectrum Liabilities Iceberg in 65% stage (SaN Left Column 31%, ZERO circle PIP)
 * - Frames 2202 - 2687 (73.4s - 89.6s): Starlink & Amazon Kuiper Satellite War - Enters on Spoken Word (SaN Right Column 31%)
 * - Frames 2687 - 3150 (89.6s - 105.0s): Day-1 Two-Variable Roulette Gamble (SaN Left Column 31%)
 */
export const ThinkSchool_Take05: React.FC<ThinkSchool_Take05Props> = ({
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
      {/* Master 48kHz WAV Audio Track sliced directly from Master MOV */}
      {mode === "full_video" && (
        <Audio src={staticFile("audio/master_take5.wav")} volume={1} />
      )}

      {/* =========================================================================
          BACKGROUND / GRAPHICS SCENE STAGES
          ========================================================================= */}

      {/* BEAT 1: FINFLUENCER HYPE GLITCH & ETHOS OVERLAYS (Frames 0 - 521) */}
      {frame >= 0 && frame < 521 && (
        <Take5FinfluencerGlitchStage localFrame={frame} />
      )}

      {/* BEAT 2: THE MARKET CAP OLYMPUS PODIUM (Frames 521 - 956) */}
      {frame >= 521 && frame < 956 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take5MarketCapOlympusStage localFrame={frame - 521} />
        </div>
      )}

      {/* BEAT 3: SPEEDBOAT vs SUPERTANKER (Frames 956 - 1581) */}
      {frame >= 956 && frame < 1581 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take5SpeedboatVsTankerStage localFrame={frame - 956} />
        </div>
      )}

      {/* BEAT 4: REALISTIC LISTING GAINS 5%-15% BAND (Frames 1581 - 1861) */}
      {frame >= 1581 && frame < 1861 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take5RealisticListingGainsStage localFrame={frame - 1581} />
        </div>
      )}

      {/* BEAT 5: DRHP SPECTRUM DEBT ICEBERG (Frames 1861 - 2202) */}
      {frame >= 1861 && frame < 2202 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take5DrhpSpectrumIcebergStage localFrame={frame - 1861} />
        </div>
      )}

      {/* BEAT 6: STARLINK & KUIPER SATELLITE WAR (Frames 2202 - 2687) */}
      {frame >= 2202 && frame < 2687 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take5SatelliteBroadbandStage localFrame={frame - 2202} />
        </div>
      )}

      {/* BEAT 7: DAY-1 TWO-VARIABLE GAMBLE (Frames 2687 - 3150) */}
      {frame >= 2687 && frame < 3150 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take5TwoVariableGambleStage localFrame={frame - 2687} />
        </div>
      )}

      {/* =========================================================================
          PERSISTENT SINGLE FACECAM MOUNT (Z-INDEX 50)
          ========================================================================= */}
      <ThinkSchoolTake05Facecam frame={frame} mode={mode} />
    </AbsoluteFill>
  );
};
