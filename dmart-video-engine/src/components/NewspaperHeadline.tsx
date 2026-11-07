import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface NewspaperHeadlineProps {
  publication?: string;
  date?: string;
  headlinePre?: string;
  highlightedText?: string;
  headlinePost?: string;
  startFrame?: number;
  highlightStartFrame?: number;
  highlightDuration?: number;
  durationFrames?: number;
  style?: React.CSSProperties;
}

export const NewspaperHeadline: React.FC<NewspaperHeadlineProps> = ({
  publication = "THE ECONOMIC TIMES",
  date = "OCTOBER 18, 2026",
  headlinePre = "TCS Q2 Revenue Jumps 12%, While Profit Reaches ",
  highlightedText = "₹12,450 Crore All-Time High",
  headlinePost = " driven by multi-year cloud and enterprise AI contracts.",
  startFrame = 0,
  highlightStartFrame = 12,
  highlightDuration = 22,
  durationFrames,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (durationFrames && (frame < startFrame || frame > startFrame + durationFrames)) {
    return null;
  }

  // 3D Card tilt and zoom entrance
  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  // Slow camera push-in
  const pushIn = interpolate(
    frame - startFrame,
    [0, 90],
    [1.0, 1.08],
    { extrapolateRight: "clamp" }
  );

  // Exit transition if durationFrames is set
  const exitProgress = durationFrames
    ? interpolate(
        frame - (startFrame + durationFrames - 10),
        [0, 10],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  const cardOpacity = interpolate(exitProgress, [0, 1], [entrance, 0]);
  const exitTilt = interpolate(exitProgress, [0, 1], [0, 12]);
  const exitY = interpolate(exitProgress, [0, 1], [0, 40]);

  // Yellow marker sweep
  const highlightProgress = interpolate(
    frame - highlightStartFrame,
    [0, highlightDuration],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        perspective: 1200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1000,
        opacity: cardOpacity,
        transform: `translateY(${exitY}px) rotateX(${exitTilt}deg)`,
        ...style,
      }}
    >
      <div
        style={{
          width: 920,
          backgroundColor: "#FAF9F5", // Warm newspaper paper tone
          borderRadius: 16,
          padding: "36px 44px",
          color: "#18181B",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.65), 0 4px 16px rgba(0, 0, 0, 0.2)",
          transform: `scale(${entrance * pushIn}) rotateX(6deg) rotateY(-3deg)`,
          border: "1px solid rgba(0, 0, 0, 0.12)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Paper Texture Lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* Newspaper Masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #18181B",
            paddingBottom: 12,
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: "#DC2626",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "0.1em",
                color: "#18181B",
              }}
            >
              {publication}
            </span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#71717A", fontFamily: "'Inter', sans-serif" }}>
            {date}
          </span>
        </div>

        {/* Headline Body with Highlighter */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.35,
            color: "#18181B",
          }}
        >
          <span>{headlinePre}</span>
          <span
            style={{
              position: "relative",
              display: "inline",
              color: "#000000",
              fontWeight: 900,
              background: `linear-gradient(to right, rgba(255, 230, 0, 0.75) 0%, rgba(255, 230, 0, 0.75) ${highlightProgress}%, transparent ${highlightProgress}%, transparent 100%)`,
              padding: "2px 6px",
              borderRadius: 4,
              boxDecorationBreak: "clone",
              WebkitBoxDecorationBreak: "clone",
            }}
          >
            {highlightedText}
          </span>
          <span>{headlinePost}</span>
        </div>

        {/* Evidence Verification Stamp */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            fontWeight: 700,
            color: "#52525B",
          }}
        >
          <span style={{ color: "#16A34A" }}>✔ VERIFIED FILING</span>
          <span>•</span>
          <span>SOURCE: OFFICIAL COMPANY DISCLOSURE</span>
        </div>
      </div>
    </div>
  );
};
