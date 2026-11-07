import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface TactileStampProps {
  text: string;
  subText?: string;
  color?: string;
  rotation?: number;
  triggerFrame?: number;
  fontSize?: number;
  width?: number | string;
  style?: React.CSSProperties;
}

export const TactileStamp: React.FC<TactileStampProps> = ({
  text,
  subText,
  color = SAN_TOKENS.colors.negative,
  rotation = -8,
  triggerFrame = 0,
  fontSize = 64,
  width = "auto",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - triggerFrame);
  if (frame < triggerFrame) return null;

  // Heavy tactile spring slam with overshoot
  const scale = spring({
    frame: relFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 240,
      mass: 0.6,
    },
    from: 2.2,
    to: 1.0,
  });

  const opacity = interpolate(relFrame, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 36px",
        borderRadius: 16,
        border: `4px solid ${color}`,
        backgroundColor: "rgba(11, 15, 25, 0.94)",
        boxShadow: `0 16px 40px rgba(0, 0, 0, 0.8), 0 0 30px ${color}33`,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        width,
        pointerEvents: "none",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: SAN_TOKENS.fonts.display,
          fontSize,
          fontWeight: 900,
          color,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1.1,
          textAlign: "center",
          textShadow: `0 2px 12px ${color}66`,
        }}
      >
        {text}
      </span>
      {subText && (
        <span
          style={{
            fontFamily: SAN_TOKENS.fonts.primary,
            fontSize: SAN_TOKENS.typography1080p.legibilityFloor,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "0.05em",
            marginTop: 6,
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          {subText}
        </span>
      )}
    </div>
  );
};
