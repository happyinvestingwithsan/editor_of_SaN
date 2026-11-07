import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import { KineticTag } from "../components/KineticTag";
import { CompanyCard } from "../components/CompanyCard";
import { CounterDisplay } from "../components/CounterDisplay";
import { HorizontalRankingPodium } from "../components/RankingChart";

export const Clip1Overlays: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        overflow: "hidden",
      }}
    >
      {/* =========================================================================
          SCENE A: THE MACRO HOOK (Frames 0 - 137 | 00:00.00 - 00:04.57)
          Audio Cue: "India's financial history is about to witness the biggest IPO."
          ========================================================================= */}
      <Sequence from={0} durationInFrames={137} name="Scene A: Macro Hook">
        <KineticTag absoluteFrame={frame} />
      </Sequence>

      {/* =========================================================================
          SCENE B: THE COMPANY & STATUS (Frames 137 - 284 | 00:04.57 - 00:09.47)
          Audio Cue: "Reliance Jio platform is officially launching its initial public offering,"
          ========================================================================= */}
      <Sequence from={137} durationInFrames={147} name="Scene B: Company & Status">
        <CompanyCard absoluteFrame={frame} />
      </Sequence>

      {/* =========================================================================
          SCENE C: THE TARGET AMOUNT (Frames 284 - 376 | 00:09.47 - 00:12.53)
          Audio Cue: "raising 30,213 crore."
          ========================================================================= */}
      <Sequence from={284} durationInFrames={92} name="Scene C: Target Amount">
        <CounterDisplay absoluteFrame={frame} />
      </Sequence>

      {/* =========================================================================
          SCENE D: THE RECORD RACE — JIO VS LIC VS HYUNDAI (Frames 376 - 600 | 00:12.53 - 00:20.00)
          Audio Cue: "That easily surpasses 21,000 crore from LIC and 27,870 crore from Hyundai Motor..."
          ========================================================================= */}
      <Sequence from={376} durationInFrames={224} name="Scene D: Ranking Podium">
        <HorizontalRankingPodium absoluteFrame={frame} />
      </Sequence>
    </div>
  );
};
