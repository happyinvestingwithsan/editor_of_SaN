import React from "react";
import { useCurrentFrame } from "remotion";

export interface WordToken {
  word: string;
  start: number;
  end: number;
}

export interface CaptionBlock {
  words: WordToken[];
  start: number;
  end: number;
}

export interface KineticWordCaptionsProps {
  captions: CaptionBlock[];
  highlightColor?: string;
  fontSize?: number;
  bottomPosition?: number;
}

export const KineticWordCaptions: React.FC<KineticWordCaptionsProps> = ({
  captions,
  highlightColor = "#00D09C", // Groww Mint Green (or #1A64F8 for INDmoney)
  fontSize = 44,
  bottomPosition = 280, // Safe zone: above YouTube Shorts title/channel overlay
}) => {
  const frame = useCurrentFrame();

  const activeBlock = captions.find(
    (b) => frame >= b.start - 2 && frame <= b.end + 4
  );

  if (!activeBlock) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: bottomPosition,
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
        pointerEvents: "none",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(11, 15, 23, 0.88)",
          backdropFilter: "blur(14px)",
          borderRadius: 20,
          padding: "16px 28px",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6)",
          textAlign: "center",
          maxWidth: 960,
        }}
      >
        <span
          style={{
            fontSize,
            fontWeight: 800,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.35,
            color: "#E2E8F0",
          }}
        >
          {activeBlock.words.map((w, idx) => {
            const isActive = frame >= w.start && frame <= w.end;
            return (
              <span
                key={idx}
                style={{
                  color: isActive ? highlightColor : "#FFFFFF",
                  fontWeight: isActive ? 900 : 700,
                  transform: isActive ? "scale(1.12)" : "scale(1.0)",
                  display: "inline-block",
                  margin: "0 5px",
                  transition: "color 0.08s ease, transform 0.08s ease",
                  textShadow: isActive
                    ? `0 0 20px ${highlightColor}66`
                    : "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {w.word}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};
