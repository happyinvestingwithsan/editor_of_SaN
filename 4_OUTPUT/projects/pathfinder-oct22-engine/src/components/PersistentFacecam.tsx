import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
  Video,
  Easing,
} from "remotion";

export interface PersistentFacecamProps {
  frame: number;
  mode?: "full_video" | "overlay_only";
}

/**
 * PersistentFacecam:
 * Single Persistent <Video> element across 100% of the timeline.
 *
 * Precise Timeline Modes:
 * 1. [0 - 327] (0.0s - 10.9s): 100% Full Face Cam (Opening Hook, zero canvas).
 * 2. [328 - 1465] (10.9s - 48.8s): Canvas Card Mode (SaN inside Left Card 720x980).
 * 3. [1466 - 1599] (48.8s - 53.3s): 100% Full Face Cam (Evidences & Proofs).
 * 4. [1600 - 1710] (53.3s - 57.0s): Canvas Card Mode (TradingView B-Roll).
 * 5. [1711 - 1936] (57.0s - 64.5s): 100% Full Face Cam (Value, Strategies, Analysis).
 * 6. [1937 - 4360] (64.5s - 145.3s): Canvas Card Mode (Santhosh Bio, Portfolio, Agenda, Outro).
 *
 * Calibrated SaN Center in 720x980 Card:
 * - Raw video: 1920x1080. SaN face center: x ≈ 562px, y ≈ 450px.
 * - vidLeft = -222px, vidTop = -50px -> Perfect chest-up center!
 */
export const PersistentFacecam: React.FC<PersistentFacecamProps> = ({
  frame,
  mode = "full_video",
}) => {
  const { fps } = useVideoConfig();

  if (mode === "overlay_only") {
    return null;
  }

  // Transition spring management on boundary crossings
  let transitionStart = 0;
  let fromCard = false;
  let toCard = true;

  if (frame < 328) {
    // Initial Full Face Cam
    fromCard = false;
    toCard = false;
    transitionStart = 0;
  } else if (frame >= 328 && frame < 360) {
    // Transition 1: Full -> Card at frame 328
    fromCard = false;
    toCard = true;
    transitionStart = 328;
  } else if (frame >= 360 && frame < 1466) {
    // Stable Card Mode
    fromCard = true;
    toCard = true;
    transitionStart = 328;
  } else if (frame >= 1466 && frame < 1500) {
    // Transition 2: Card -> Full at frame 1466
    fromCard = true;
    toCard = false;
    transitionStart = 1466;
  } else if (frame >= 1500 && frame < 1600) {
    // Stable Full Face Cam
    fromCard = false;
    toCard = false;
    transitionStart = 1466;
  } else if (frame >= 1600 && frame < 1630) {
    // Transition 3: Full -> Card at frame 1600
    fromCard = false;
    toCard = true;
    transitionStart = 1600;
  } else if (frame >= 1630 && frame < 1711) {
    // Stable Card Mode
    fromCard = true;
    toCard = true;
    transitionStart = 1600;
  } else if (frame >= 1711 && frame < 1740) {
    // Transition 4: Card -> Full at frame 1711
    fromCard = true;
    toCard = false;
    transitionStart = 1711;
  } else if (frame >= 1740 && frame < 1937) {
    // Stable Full Face Cam
    fromCard = false;
    toCard = false;
    transitionStart = 1711;
  } else if (frame >= 1937 && frame < 1970) {
    // Transition 5: Full -> Card at frame 1937 (Santhosh Bio)
    fromCard = false;
    toCard = true;
    transitionStart = 1937;
  } else if (frame >= 1970 && frame < 2400) {
    // Stable Card Mode (Santhosh Bio 4 boxes)
    fromCard = true;
    toCard = true;
    transitionStart = 1937;
  } else if (frame >= 2400 && frame < 2430) {
    // Transition 6: Card -> Full at frame 2400 (SaN Request #5: Portfolio Full Face Cam)
    fromCard = true;
    toCard = false;
    transitionStart = 2400;
  } else if (frame >= 2430 && frame < 2840) {
    // Stable Full Face Cam (Left: ₹75L, Right: ₹1.50 Cr)
    fromCard = false;
    toCard = false;
    transitionStart = 2400;
  } else if (frame >= 2840 && frame < 2870) {
    // Transition 7: Full -> Card at frame 2840 (Perspective at 2850, 55 Members, Agenda, Bonus)
    fromCard = false;
    toCard = true;
    transitionStart = 2840;
  } else {
    // Stable Card Mode till end
    fromCard = true;
    toCard = true;
    transitionStart = 2840;
  }

  const transSpring = spring({
    frame: Math.max(0, frame - transitionStart),
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  // Calculate card progress (0.0 = Full Screen 1920x1080, 1.0 = Left Card 720x980)
  let cardProgress = 0.0;
  if (!fromCard && !toCard) {
    cardProgress = 0.0;
  } else if (fromCard && toCard) {
    cardProgress = 1.0;
  } else if (!fromCard && toCard) {
    cardProgress = interpolate(transSpring, [0, 1], [0.0, 1.0]);
  } else if (fromCard && !toCard) {
    cardProgress = interpolate(transSpring, [0, 1], [1.0, 0.0]);
  }

  // Smooth Interpolation of Container Geometry
  const curX = interpolate(cardProgress, [0, 1], [0, 50]);
  const curY = interpolate(cardProgress, [0, 1], [0, 50]);
  const curW = interpolate(cardProgress, [0, 1], [1920, 720]);
  const curH = interpolate(cardProgress, [0, 1], [1080, 980]);
  const curRadius = interpolate(cardProgress, [0, 1], [0, 24]);
  // SaN's face centroid in 1920x1080 source: X = 987px (tilak/forehead center), Y = 420px
  // In 720px wide card, center is 360px -> vidLeft = 360 - 987 = -627px
  const curVidLeft = interpolate(cardProgress, [0, 1], [0, -627]);
  const curVidTop = interpolate(cardProgress, [0, 1], [0, -45]);
  const curVidScale = interpolate(cardProgress, [0, 1], [1.0, 1.02]);

  // Subtle slow cinematic drift
  const subtleDrift = interpolate(frame, [0, 4360], [1.0, 1.02], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1.0),
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: `${curX}px`,
        top: `${curY}px`,
        width: `${curW}px`,
        height: `${curH}px`,
        borderRadius: `${curRadius}px`,
        overflow: "hidden",
        border: cardProgress > 0.05 ? "2px solid rgba(245, 158, 11, 0.55)" : "none",
        boxShadow:
          cardProgress > 0.05
            ? "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(245, 158, 11, 0.25)"
            : "none",
        zIndex: 10,
        backgroundColor: "#070A10",
        transform: "translate3d(0, 0, 0)", // GPU isolation
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${curVidLeft}px`,
          top: `${curVidTop}px`,
          width: "1920px",
          height: "1080px",
          transform: `scale(${curVidScale * subtleDrift})`,
          transformOrigin: "987px 420px", // Anchored on SaN's face
        }}
      >
        <Video
          src={staticFile("video/master_facecam.mp4")}
          volume={0}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Subtle Inner Gold Vignette when framed as card */}
      {cardProgress > 0.05 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.55)",
            borderRadius: `${curRadius}px`,
          }}
        />
      )}
    </div>
  );
};
