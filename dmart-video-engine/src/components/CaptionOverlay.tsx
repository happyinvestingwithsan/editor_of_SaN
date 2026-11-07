import React from "react";
import { useCurrentFrame } from "remotion";
import { HIFY_LIGHT_TOKENS } from "../theme";
import captionData from "../data_interval7_captions.json";

interface CaptionOverlayProps {
  bottom?: number;
  left?: number;
  width?: number;
}

export const CaptionOverlay: React.FC<CaptionOverlayProps> = ({
  bottom = 36,
  left = 60,
  width = 560,
}) => {
  const frame = useCurrentFrame();

  // Find active caption clip
  const activeClip = captionData.find(
    (clip) => frame >= clip.start - 2 && frame <= clip.end + 6
  );

  if (!activeClip) return null;

  return (
    <div
      style={{
        position: "absolute",
        left,
        bottom,
        width,
        display: "flex",
        justifyContent: "center",
        zIndex: 40,
        pointerEvents: "none",
        boxSizing: "border-box",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(24, 24, 27, 0.88)",
          backdropFilter: "blur(12px)",
          borderRadius: 12,
          padding: "10px 18px",
          border: `1px solid rgba(255, 255, 255, 0.12)`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
          textAlign: "center",
          maxWidth: "100%",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            fontFamily: HIFY_LIGHT_TOKENS.fonts.ui,
            lineHeight: 1.4,
            color: "#F4F4F5",
          }}
        >
          {activeClip.words.map((w, idx) => {
            const isWordActive = frame >= w.start && frame <= w.end;
            return (
              <span
                key={idx}
                style={{
                  color: isWordActive ? HIFY_LIGHT_TOKENS.brandGold : "#E4E4E7",
                  fontWeight: isWordActive ? 800 : 600,
                  transition: "color 0.1s ease",
                  marginRight: 4,
                  display: "inline-block",
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
