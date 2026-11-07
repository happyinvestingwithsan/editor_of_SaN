import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface NewspaperClippingProps {
  /** Masthead name (e.g. "THE ECONOMIC TIMES", "BLOOMBERG", "MINT") */
  source?: string;
  /** Publication date string */
  date?: string;
  /** Headline text to display */
  headline: string;
  /** Subtext or lead paragraph snippet */
  snippet?: string;
  /** Key words inside snippet or headline to highlight with fluorescent marker sweep */
  highlightPhrase?: string;
  /** Delay frames before marker starts sweeping (default: 15) */
  highlightStartFrame?: number;
  /** Color of marker highlight (default: fluorescent yellow) */
  markerColor?: string;
}

export const NewspaperClipping: React.FC<NewspaperClippingProps> = ({
  source = "THE ECONOMIC TIMES",
  date = "SPECIAL INVESTIGATION",
  headline,
  snippet,
  highlightPhrase,
  highlightStartFrame = 15,
  markerColor = "rgba(255, 235, 59, 0.45)",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 2.5D pop entrance
  const entrance = spring({
    frame,
    fps,
    config: SAN_TOKENS.springs.smooth,
  });

  const scale = interpolate(entrance, [0, 1], [0.85, 1]);
  const translateY = interpolate(entrance, [0, 1], [60, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Marker sweep progress (0% to 100% width)
  const markerProgress = interpolate(
    frame - highlightStartFrame,
    [0, 20],
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
        width: "100%",
        padding: "20px 40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "#FDFBF7",
          color: "#1A1A1A",
          padding: "36px 44px",
          borderRadius: 8,
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.65), 0 0 2px rgba(0, 0, 0, 0.3)",
          transform: `scale(${scale}) translateY(${translateY}px) rotateX(6deg) rotateY(-3deg)`,
          opacity,
          position: "relative",
          fontFamily: "'Georgia', serif",
        }}
      >
        {/* Newspaper Masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: "3px double #1A1A1A",
            paddingBottom: 12,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: SAN_TOKENS.fonts.display,
            }}
          >
            {source}
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#555555",
              textTransform: "uppercase",
            }}
          >
            {date}
          </span>
        </div>

        {/* Main Headline */}
        <h2
          style={{
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.2,
            margin: "0 0 16px 0",
            letterSpacing: "-0.01em",
            color: "#111111",
          }}
        >
          {headline}
        </h2>

        {/* Snippet with dynamic highlighter sweep */}
        {snippet && (
          <div
            style={{
              fontSize: 24,
              lineHeight: 1.5,
              color: "#333333",
              borderTop: "1px solid #CCCCCC",
              paddingTop: 16,
              position: "relative",
            }}
          >
            {highlightPhrase && snippet.includes(highlightPhrase) ? (
              <>
                {snippet.split(highlightPhrase)[0]}
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    fontWeight: 800,
                    color: "#000000",
                  }}
                >
                  {/* Highlighter background stripe */}
                  <span
                    style={{
                      position: "absolute",
                      left: -4,
                      top: 2,
                      bottom: 0,
                      width: `${markerProgress}%`,
                      backgroundColor: markerColor,
                      zIndex: -1,
                      borderRadius: 3,
                    }}
                  />
                  {highlightPhrase}
                </span>
                {snippet.split(highlightPhrase)[1]}
              </>
            ) : (
              snippet
            )}
          </div>
        )}
      </div>
    </div>
  );
};
