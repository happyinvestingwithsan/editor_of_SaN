import React from "react";
import {
  spring,
  staticFile,
  useVideoConfig,
  Video,
  Audio,
} from "remotion";

export interface OutroFacecamProps {
  frame: number;
  showHUD?: boolean;
}

interface LayoutConfig {
  x: number;
  y: number;
  w: number;
  h: number;
  radius: number;
  vidOffsetX: number;
  vidOffsetY: number;
  vidScale: number;
  borderGlow: string;
}

export const OutroFacecam: React.FC<OutroFacecamProps> = ({
  frame,
  showHUD = false,
}) => {
  const { fps } = useVideoConfig();

  // Full Screen Canvas (Frame 0-186 and Frame 4000-4258)
  const FULL: LayoutConfig = {
    x: 0,
    y: 0,
    w: 1920,
    h: 1080,
    radius: 0,
    vidOffsetX: 0,
    vidOffsetY: 0,
    vidScale: 1.0,
    borderGlow: "transparent",
  };

  // Right Tall Card (Frames 186-1914 and Frames 3005-4000)
  // Clean 35-38% screen dominance, rock steady for 58s and 33s
  const RIGHT_CARD: LayoutConfig = {
    x: 1180,
    y: 70,
    w: 680,
    h: 940,
    radius: 28,
    vidOffsetX: -620,
    vidOffsetY: 0,
    vidScale: 1.05,
    borderGlow: "0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(245, 158, 11, 0.35)",
  };

  // Left Tall Card (Frames 1914-3005)
  // Clean 35-38% screen dominance, rock steady for ~36s
  const LEFT_CARD: LayoutConfig = {
    x: 60,
    y: 70,
    w: 680,
    h: 940,
    radius: 28,
    vidOffsetX: -620,
    vidOffsetY: 0,
    vidScale: 1.05,
    borderGlow: "0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(245, 158, 11, 0.35)",
  };

  // STEADY LAYOUT SCHEDULE (SaN's Feedback: No ping-pong switches; steady ~60s blocks)
  // 1. Frame 0 - 186: Full Facecam (Intro hook & conclusion)
  // 2. Frame 186 - 1914 (~58s): Steady on RIGHT side
  // 3. Frame 1914 - 3005 (~36s): Steady on LEFT side
  // 4. Frame 3005 - 4000 (~33s): Steady on RIGHT side
  // 5. Frame 4000 - 4258: FULL Facecam as requested ("AFter 4000 framwe keep full face cam")
  const getLayout = (f: number): LayoutConfig => {
    if (f < 186) return FULL;
    if (f < 1914) return RIGHT_CARD;
    if (f < 3005) return LEFT_CARD;
    if (f < 4000) return RIGHT_CARD;
    return FULL;
  };

  // Transition Points: Only 4 deliberate, cinematic transitions
  const transitionPoints = [186, 1914, 3005, 4000];

  let prevTransition = 0;
  for (const pt of transitionPoints) {
    if (frame >= pt) {
      prevTransition = pt;
    } else {
      break;
    }
  }

  const currentTarget = getLayout(frame);
  const prevTarget = getLayout(Math.max(0, prevTransition - 1));

  // Smooth Spring transition across 16 frames (~500ms)
  const transFrame = Math.max(0, frame - prevTransition);
  const transProgress = spring({
    frame: transFrame,
    fps,
    config: { damping: 18, stiffness: 100, mass: 1.0 },
  });

  const p = Math.min(1, Math.max(0, transProgress));

  const currentX = prevTarget.x + (currentTarget.x - prevTarget.x) * p;
  const currentY = prevTarget.y + (currentTarget.y - prevTarget.y) * p;
  const currentW = prevTarget.w + (currentTarget.w - prevTarget.w) * p;
  const currentH = prevTarget.h + (currentTarget.h - prevTarget.h) * p;
  const currentRadius =
    prevTarget.radius + (currentTarget.radius - prevTarget.radius) * p;
  const currentVidOffsetX =
    prevTarget.vidOffsetX + (currentTarget.vidOffsetX - prevTarget.vidOffsetX) * p;
  const currentVidOffsetY =
    prevTarget.vidOffsetY + (currentTarget.vidOffsetY - prevTarget.vidOffsetY) * p;
  const currentVidScale =
    prevTarget.vidScale + (currentTarget.vidScale - prevTarget.vidScale) * p;

  const isFull = currentTarget === FULL && p > 0.95;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {/* Audio Master Track */}
      <Audio src={staticFile("audio/master_outro.wav")} volume={1} />

      {/* Floating Animated Facecam Container */}
      <div
        style={{
          position: "absolute",
          transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
          width: currentW,
          height: currentH,
          borderRadius: currentRadius,
          overflow: "hidden",
          boxShadow: isFull ? "none" : currentTarget.borderGlow,
          border: isFull ? "none" : "2px solid rgba(245, 158, 11, 0.55)",
          backgroundColor: "#000",
        }}
      >
        {/* Single Persistent Mounted Video */}
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            transform: `translate3d(${currentVidOffsetX}px, ${currentVidOffsetY}px, 0) scale(${currentVidScale})`,
            transformOrigin: "center center",
          }}
        >
          <Video
            src={staticFile("video/master_outro_facecam.mp4")}
            style={{
              width: 1920,
              height: 1080,
              display: "block",
            }}
          />
        </div>

        {/* Subtle Vignette & Gold Rim */}
        {!isFull && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: currentRadius,
              boxShadow: "inset 0 0 35px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Development HUD */}
      {showHUD && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            padding: "8px 16px",
            background: "rgba(0,0,0,0.85)",
            border: "1px solid #F59E0B",
            borderRadius: 8,
            color: "#FFF",
            fontSize: 14,
            fontFamily: "monospace",
            zIndex: 100,
          }}
        >
          FRAME: {frame} | TIME: {(frame / 30).toFixed(2)}s | LAYOUT:{" "}
          {currentTarget === FULL ? "FULL" : currentTarget === RIGHT_CARD ? "RIGHT_CARD" : "LEFT_CARD"}
        </div>
      )}
    </div>
  );
};
