import React from "react";
import { useCurrentFrame } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface SubtitleWord {
  word: string;
  startFrame: number;
  endFrame: number;
}

export interface SubtitleBlock {
  id?: string;
  text: string;
  start: number;
  end: number;
  words?: SubtitleWord[];
}

export interface KineticSubtitlesProps {
  blocks: SubtitleBlock[];
  highlightColor?: string;
}

export const KineticSubtitles: React.FC<KineticSubtitlesProps> = ({
  blocks,
  highlightColor = SAN_TOKENS.colors.gold,
}) => {
  const frame = useCurrentFrame();

  const activeBlock = blocks.find(
    (b) => frame >= b.start - 2 && frame <= b.end + 2
  );

  if (!activeBlock) {
    return null;
  }

  // If words array is available, highlight the specific active spoken word
  if (activeBlock.words && activeBlock.words.length > 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          padding: "10px 24px",
          backgroundColor: "rgba(11, 15, 25, 0.88)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 999,
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7)",
          fontFamily: SAN_TOKENS.fonts.display,
        }}
      >
        {activeBlock.words.map((w, idx) => {
          const isSpoken = frame >= w.startFrame && frame <= w.endFrame + 1;
          return (
            <span
              key={idx}
              style={{
                fontSize: 32,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                color: isSpoken ? highlightColor : "#FFFFFF",
                textShadow: isSpoken ? `0 0 16px ${highlightColor}` : "none",
                transform: isSpoken ? "scale(1.08)" : "scale(1.0)",
                transition: "transform 0.1s ease, color 0.1s ease",
                display: "inline-block",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    );
  }

  // Fallback to block text
  return (
    <div
      style={{
        padding: "10px 24px",
        backgroundColor: "rgba(11, 15, 25, 0.88)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 999,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7)",
        fontFamily: SAN_TOKENS.fonts.display,
        fontSize: 32,
        fontWeight: 900,
        color: "#FFFFFF",
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      }}
    >
      {activeBlock.text}
    </div>
  );
};
