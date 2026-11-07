import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { Visual1_ThreeBusinessOverview } from "./Visual1_ThreeBusinessOverview";
import { Visual2_O2CSurprise } from "./Visual2_O2CSurprise";
import { Visual3_JioGrowth } from "./Visual3_JioGrowth";
import { Visual4_RetailHeadwinds } from "./Visual4_RetailHeadwinds";
import { Visual5_O2CStoryConclusion } from "./Visual5_O2CStoryConclusion";
import { Visual7A_JamnagarRefineryFlow } from "./Visual7A_JamnagarRefineryFlow";
import { Visual6_RefinerySupplyDisruption } from "./Visual6_RefinerySupplyDisruption";
import { Visual8_CrackSpreadMultipliers } from "./Visual8_CrackSpreadMultipliers";
import { Visual7B_CrackSpreadEquation } from "./Visual7B_CrackSpreadEquation";
import { Visual9_RelianceCapturesOpportunity } from "./Visual9_RelianceCapturesOpportunity";
import { Visual10_OperationalFlexibility } from "./Visual10_OperationalFlexibility";
import { OutroBridge_Chapter4Teaser } from "./OutroBridge_Chapter4Teaser";

export interface RelianceOverlayProps {
  isGreenScreen?: boolean;
}

const SceneWrapper: React.FC<{
  Component: React.FC<{ relativeFrame: number }>;
}> = ({ Component }) => {
  const frame = useCurrentFrame();
  return <Component relativeFrame={frame} />;
};

export const Reliance_Chapters2_3_Overlay_Master: React.FC<RelianceOverlayProps> = ({
  isGreenScreen = false,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: isGreenScreen ? "#00FF00" : "transparent",
        width: 1920,
        height: 1080,
        overflow: "hidden",
      }}
    >
      {/* Visual 1: Three-Part Business Comparison Overview (f0 - f168 | 5.60s) */}
      <Sequence from={0} durationInFrames={168} name="Scene 1: Visual 1 - Overview">
        <SceneWrapper Component={Visual1_ThreeBusinessOverview} />
      </Sequence>

      {/* Visual 2: O2C Is The Big Surprise (f168 - f520 | 11.73s) */}
      <Sequence from={168} durationInFrames={352} name="Scene 2: Visual 2 - O2C Surprise">
        <SceneWrapper Component={Visual2_O2CSurprise} />
      </Sequence>

      {/* Visual 3: Jio Platforms Resilient Growth (f520 - f900 | 12.67s) */}
      <Sequence from={520} durationInFrames={380} name="Scene 3: Visual 3 - Jio Growth">
        <SceneWrapper Component={Visual3_JioGrowth} />
      </Sequence>

      {/* Visual 4: Reliance Retail Headwinds (f900 - f1530 | 21.00s) */}
      <Sequence from={900} durationInFrames={630} name="Scene 4: Visual 4 - Retail Headwinds">
        <SceneWrapper Component={Visual4_RetailHeadwinds} />
      </Sequence>

      {/* Visual 5: The O2C Story & Synthesis (f1530 - f2040 | 17.00s) */}
      <Sequence from={1530} durationInFrames={510} name="Scene 5: Visual 5 - O2C Synthesis">
        <SceneWrapper Component={Visual5_O2CStoryConclusion} />
      </Sequence>

      {/* Visual 7A: Jamnagar Refinery Economics Flow (f2040 - f2886 | 28.20s) */}
      <Sequence from={2040} durationInFrames={846} name="Scene 6: Visual 7A - Jamnagar Flow">
        <SceneWrapper Component={Visual7A_JamnagarRefineryFlow} />
      </Sequence>

      {/* Visual 6: Global Refinery Supply Disruption (f2886 - f4380 | 49.80s) */}
      <Sequence from={2886} durationInFrames={1494} name="Scene 7: Visual 6 - Supply Disruption">
        <SceneWrapper Component={Visual6_RefinerySupplyDisruption} />
      </Sequence>

      {/* Visual 8: Crack-Spread Multipliers (f4380 - f4824 | 14.80s) */}
      <Sequence from={4380} durationInFrames={444} name="Scene 8: Visual 8 - Crack Multipliers">
        <SceneWrapper Component={Visual8_CrackSpreadMultipliers} />
      </Sequence>

      {/* Visual 7B: Crack Spread Blueprint Equation (f4824 - f5700 | 29.20s) */}
      <Sequence from={4824} durationInFrames={876} name="Scene 9: Visual 7B - Crack Equation">
        <SceneWrapper Component={Visual7B_CrackSpreadEquation} />
      </Sequence>

      {/* Visual 9: Reliance Captures Opportunity (f5700 - f5970 | 9.00s) */}
      <Sequence from={5700} durationInFrames={270} name="Scene 10A: Visual 9 - Reliance Arbitrage">
        <SceneWrapper Component={Visual9_RelianceCapturesOpportunity} />
      </Sequence>

      {/* Visual 10: Operational Flexibility Core Verdict (f5970 - f6120 | 5.00s) */}
      <Sequence from={5970} durationInFrames={150} name="Scene 10B: Visual 10 - Core Verdict">
        <SceneWrapper Component={Visual10_OperationalFlexibility} />
      </Sequence>

      {/* Trailing Outro Bridge: Teaser to Chapter 4 (f6120 - f6220 | 3.33s) */}
      <Sequence from={6120} durationInFrames={100} name="Scene 11: Outro - Chapter 4 Cliffhanger">
        <SceneWrapper Component={OutroBridge_Chapter4Teaser} />
      </Sequence>
    </AbsoluteFill>
  );
};
