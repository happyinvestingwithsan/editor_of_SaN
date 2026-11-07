import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { HI_THEME } from "../../happyInvestingTheme";
import rawCaptions from "../../happy_investing_1106_caption_blocks.json";

interface SubtitleWord {
  word: string;
  startFrame: number;
  endFrame: number;
}

interface CaptionBlock {
  id: string;
  start: number;
  end: number;
  text: string;
  words: SubtitleWord[];
}

const captions = rawCaptions as CaptionBlock[];

export interface HappyInvestingCaptionsProps {
  isFullScreenFacecam?: boolean;
  splitProgress?: number;
}

export const HappyInvestingCaptions: React.FC<HappyInvestingCaptionsProps> = ({
  isFullScreenFacecam = false,
  splitProgress,
}) => {
  const frame = useCurrentFrame();

  const activeBlock = captions.find(
    (b) => frame >= b.start && frame <= b.end
  );

  if (!activeBlock) {
    return null;
  }

  // Smooth interpolated vertical placement
  const topPos =
    splitProgress !== undefined
      ? interpolate(
          splitProgress,
          [0, 1],
          [HI_THEME.layout.subtitleTopFull, HI_THEME.layout.subtitleTopSplit]
        )
      : isFullScreenFacecam
      ? HI_THEME.layout.subtitleTopFull
      : HI_THEME.layout.subtitleTopSplit;

  return (
    <div
      style={{
        position: "absolute",
        top: topPos,
        left: 0,
        width: 1080,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        pointerEvents: "none",
        transition: "top 0.25s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
          padding: "14px 34px",
          backgroundColor: "rgba(10, 25, 38, 0.94)",
          backdropFilter: "blur(16px)",
          border: `2px solid ${HI_THEME.colors.secondaryTeal}`,
          borderRadius: 999,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.85), 0 0 20px rgba(117, 207, 198, 0.35)",
          fontFamily: HI_THEME.fonts.primary,
          maxWidth: 980,
        }}
      >
        {activeBlock.words.map((w, idx) => {
          const isSpoken = frame >= w.startFrame && frame <= w.endFrame + 1;
          return (
            <span
              key={idx}
              style={{
                fontSize: isSpoken ? 46 : 42,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                color: isSpoken ? HI_THEME.colors.positiveGreen : "#FFFFFF",
                textShadow: isSpoken
                  ? `0 0 20px ${HI_THEME.colors.positiveGreen}, 0 2px 4px rgba(0,0,0,0.9)`
                  : "0 2px 4px rgba(0,0,0,0.8)",
                transform: isSpoken ? "scale(1.08)" : "scale(1.0)",
                display: "inline-block",
                transition: "transform 0.08s ease, color 0.08s ease",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
