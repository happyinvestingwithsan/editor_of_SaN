import React from "react";
import { useCurrentFrame } from "remotion";
import { OUTRO_THEME } from "../theme";

export interface SubtitleWord {
  word: string;
  start: number;
  end: number;
  startFrame: number;
  endFrame: number;
}

export interface SubtitleBlock {
  id: string;
  text: string;
  start: number;
  end: number;
  words: SubtitleWord[];
}

interface LightKineticSubtitlesProps {
  blocks: SubtitleBlock[];
}

export const LightKineticSubtitles: React.FC<LightKineticSubtitlesProps> = ({ blocks }) => {
  const frame = useCurrentFrame();

  const activeBlock = blocks.find(
    (b) => frame >= b.start - 2 && frame <= b.end + 2
  );

  if (!activeBlock || !activeBlock.words || activeBlock.words.length === 0) {
    return null;
  }

  // Determine if a right-side card is currently active
  const isRightCardActive =
    (frame >= 150 && frame <= 1275) ||
    (frame >= 1380 && frame <= 2490) ||
    (frame >= 2915 && frame <= 3470) ||
    (frame >= 3680 && frame <= 4655);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: isRightCardActive ? 280 : "50%",
        transform: isRightCardActive ? "translate3d(-50%, 0, 0)" : "translate3d(-50%, 0, 0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "12px 28px",
        backgroundColor: "rgba(24, 37, 43, 0.88)",
        backdropFilter: "blur(12px)",
        borderRadius: 999,
        border: "1.5px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 12px 35px rgba(0, 0, 0, 0.35)",
        zIndex: 22,
        fontFamily: OUTRO_THEME.fonts.heading,
        maxWidth: 720,
        whiteSpace: "nowrap",
        transition: "left 0.3s ease",
      }}
    >
      {activeBlock.words.map((w, idx) => {
        const isSpoken = frame >= w.startFrame && frame <= w.endFrame + 1;
        return (
          <span
            key={idx}
            style={{
              fontSize: 28,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              color: isSpoken ? "#2DD4BF" : "#F8FAFC",
              textShadow: isSpoken ? "0 0 14px rgba(45, 212, 191, 0.6)" : "none",
              transform: isSpoken ? "scale(1.08)" : "scale(1.0)",
              transition: "transform 0.08s ease, color 0.08s ease",
              display: "inline-block",
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
};
