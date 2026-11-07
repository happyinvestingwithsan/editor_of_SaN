import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export interface SFXCue {
  frame: number;
  type: "whoosh" | "boom" | "stamp" | "click" | "chime" | "custom";
  soundFile?: string;
  volume?: number;
  durationFrames?: number;
}

export interface SFXPlayerProps {
  cues: SFXCue[];
}

const DEFAULT_SFX_MAP: Record<string, string> = {
  whoosh: "sfx/whoosh.wav",
  boom: "sfx/boom.wav",
  stamp: "sfx/stamp.wav",
  click: "sfx/key_click.wav",
  chime: "sfx/cash_chime.wav",
};

export const SFXPlayer: React.FC<SFXPlayerProps> = ({ cues }) => {
  return (
    <>
      {cues.map((c, idx) => {
        const soundPath = c.soundFile || DEFAULT_SFX_MAP[c.type];
        if (!soundPath) return null;

        return (
          <Sequence
            key={idx}
            from={c.frame}
            durationInFrames={c.durationFrames || 30}
          >
            <Audio
              src={staticFile(soundPath)}
              volume={c.volume ?? 0.7}
            />
          </Sequence>
        );
      })}
    </>
  );
};
