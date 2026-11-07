import React from "react";
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { LongformSplitLayout, FacecamPosition } from "../layouts/LongformSplitLayout";
import { SFXPlayer, SFXCue } from "../modules/SFXPlayer";

export interface LongformStageConfig {
  id: string;
  startFrame: number;
  endFrame: number;
  facecamPosition: FacecamPosition;
  component?: React.ReactNode;
}

export interface StandardLongformChapterProps {
  /** Relative path inside public/ of video proxy (e.g. "video/master_take1_fast.mp4") */
  videoProxySrc?: string;
  /** Relative path inside public/ of master 48kHz audio (e.g. "audio/master_take1.wav") */
  audioSrc?: string;
  /** Array of timed chapter stages with host camera positioning */
  stages: LongformStageConfig[];
  /** Sound design trigger cues */
  sfxCues?: SFXCue[];
  /** Optional lower third overlay */
  overlaySlot?: React.ReactNode;
}

/**
 * StandardLongformChapter:
 * The canonical plug-and-play template for 16:9 long-form YouTube masterclasses.
 * Implements alternating host presence (Left vs Right) and persistent video GPU framing.
 */
export const StandardLongformChapter: React.FC<StandardLongformChapterProps> = ({
  videoProxySrc,
  audioSrc,
  stages = [],
  sfxCues = [],
  overlaySlot,
}) => {
  const frame = useCurrentFrame();

  // Find active stage
  const activeStage = stages.find(
    (s) => frame >= s.startFrame && frame <= s.endFrame
  ) || stages[0];

  const currentPosition: FacecamPosition = activeStage
    ? activeStage.facecamPosition
    : "right_tall";

  return (
    <LongformSplitLayout
      videoSrc={videoProxySrc ? staticFile(videoProxySrc) : undefined}
      audioTrack={
        <>
          {audioSrc && <Audio src={staticFile(audioSrc)} volume={1.0} />}
          {sfxCues.length > 0 && <SFXPlayer cues={sfxCues} />}
        </>
      }
      facecamPosition={currentPosition}
      overlaySlot={overlaySlot}
    >
      {activeStage?.component}
    </LongformSplitLayout>
  );
};
