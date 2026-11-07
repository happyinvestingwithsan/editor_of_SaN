import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
  Video,
} from "remotion";

export interface ThinkSchoolTake02FacecamProps {
  frame: number;
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchoolTake02Facecam:
 * Persistent Single <Video> Architecture for Take 2 (Frames 0 - 3322 @ 30fps | 110.72s).
 * Master Source: "Jio_Mega_IPO_8Min_Master-full video.mov" (96.43s -> 207.27s)
 *
 * Space-Optimized Layout Choreography:
 * 1. Chunk 1 (Frames 0 - 277 | 0.0s - 9.2s):
 *    -> Left 32% Tall Frame (x=40, y=50, w=580, h=980, r=24)
 * 2. Chunk 2 (Frames 277 - 632 | 9.2s - 21.1s):
 *    -> Left 32% Tall Frame (x=40, y=50, w=580, h=980, r=24)
 * 3. Chunk 3 (Frames 632 - 1151 | 21.1s - 38.4s):
 *    -> Circle PIP Bottom-Left (x=60, y=700, w=320, h=320, r=160) for Full-Canvas Plumbing
 * 4. Chunk 4 (Frames 1151 - 1597 | 38.4s - 53.2s):
 *    -> Circle PIP Bottom-Left (x=60, y=700, w=320, h=320, r=160) for Real DRHP Page 68 Scanned Table
 * 5. Chunk 5 (Frames 1597 - 2204 | 53.2s - 73.5s):
 *    -> Right 32% Tall Frame (x=1300, y=50, w=580, h=980, r=24) for Meta & Google Deal Dossiers
 * 6. Chunk 6 (Frames 2204 - 2684 | 73.5s - 89.5s):
 *    -> Left 32% Tall Frame (x=40, y=50, w=580, h=980, r=24) for $120B Podiums & Unbooked Gains
 * 7. Chunk 7 (Frames 2684 - 3084 | 89.5s - 102.8s):
 *    -> Right 32% Tall Frame (x=1300, y=50, w=580, h=980, r=24) for Whale Conviction Insight
 * 8. Chunk 8 (Frames 3084 - 3322 | 102.8s - 110.7s):
 *    -> Left 32% Tall Frame (x=40, y=50, w=580, h=980, r=24) for 100% Treasury Inflow Vault
 */
export const ThinkSchoolTake02Facecam: React.FC<ThinkSchoolTake02FacecamProps> = ({
  frame,
  mode = "full_video",
}) => {
  const { fps } = useVideoConfig();

  if (mode === "overlay_only") {
    return null;
  }

  // Geometry Constants
  // Tall Rectangle Mode (32% screen real estate, chest-up framed)
  const rectW = 580;
  const rectH = 980;
  const rectTop = 50;
  const rectRadius = 24;
  const rectVidLeft = -670;
  const rectVidTop = -50;
  const rectVidW = 1920;
  const rectVidH = 1080;

  // Circle Mode (when graphic occupies full screen)
  const circleSize = 320;
  const circleRadius = 160;
  const circleScale = 0.433;
  const circleVidW = Math.round(1920 * circleScale); // 831px
  const circleVidH = Math.round(1080 * circleScale); // 468px
  const circleVidLeft = -236;
  const circleVidTop = -75;

  let containerX = 40;
  let containerY = rectTop;
  let containerW = rectW;
  let containerH = rectH;
  let containerRadius = rectRadius;

  let vidLeft = rectVidLeft;
  let vidTop = rectVidTop;
  let vidW = rectVidW;
  let vidH = rectVidH;

  if (frame < 277) {
    // 1. Chunk 1: Left 32% Tall Frame (x=40)
    containerX = 40;
    containerY = rectTop;
    containerW = rectW;
    containerH = rectH;
    containerRadius = rectRadius;
    vidLeft = rectVidLeft;
    vidTop = rectVidTop;
    vidW = rectVidW;
    vidH = rectVidH;
  } else if (frame >= 277 && frame < 632) {
    // 2. Chunk 2: Left 32% Tall Frame (x=40)
    containerX = 40;
    containerY = rectTop;
    containerW = rectW;
    containerH = rectH;
    containerRadius = rectRadius;
    vidLeft = rectVidLeft;
    vidTop = rectVidTop;
    vidW = rectVidW;
    vidH = rectVidH;
  } else if (frame >= 632 && frame < 1151) {
    // 3. Chunk 3: Transition from Left Tall Frame to Circle PIP (Bottom-Left: x=60, y=700)
    const s = spring({
      frame: Math.max(0, frame - 632),
      fps,
      config: { damping: 16, stiffness: 120 },
    });
    containerX = interpolate(s, [0, 1], [40, 60]);
    containerY = interpolate(s, [0, 1], [rectTop, 700]);
    containerW = interpolate(s, [0, 1], [rectW, circleSize]);
    containerH = interpolate(s, [0, 1], [rectH, circleSize]);
    containerRadius = interpolate(s, [0, 1], [rectRadius, circleRadius]);

    vidLeft = interpolate(s, [0, 1], [rectVidLeft, circleVidLeft]);
    vidTop = interpolate(s, [0, 1], [rectVidTop, circleVidTop]);
    vidW = interpolate(s, [0, 1], [rectVidW, circleVidW]);
    vidH = interpolate(s, [0, 1], [rectVidH, circleVidH]);
  } else if (frame >= 1151 && frame < 1597) {
    // 4. Chunk 4: Circle PIP Bottom-Left (x=60, y=700) for Real DRHP Page 68 Scanned Table
    containerX = 60;
    containerY = 700;
    containerW = circleSize;
    containerH = circleSize;
    containerRadius = circleRadius;
    vidLeft = circleVidLeft;
    vidTop = circleVidTop;
    vidW = circleVidW;
    vidH = circleVidH;
  } else if (frame >= 1597 && frame < 2204) {
    // 5. Chunk 5: Transition from Circle to Right 32% Tall Frame (x=1300, y=50)
    const s = spring({
      frame: Math.max(0, frame - 1597),
      fps,
      config: { damping: 16, stiffness: 120 },
    });
    containerX = interpolate(s, [0, 1], [60, 1300]);
    containerY = interpolate(s, [0, 1], [700, rectTop]);
    containerW = interpolate(s, [0, 1], [circleSize, rectW]);
    containerH = interpolate(s, [0, 1], [circleSize, rectH]);
    containerRadius = interpolate(s, [0, 1], [circleRadius, rectRadius]);

    vidLeft = interpolate(s, [0, 1], [circleVidLeft, rectVidLeft]);
    vidTop = interpolate(s, [0, 1], [circleVidTop, rectVidTop]);
    vidW = interpolate(s, [0, 1], [circleVidW, rectVidW]);
    vidH = interpolate(s, [0, 1], [circleVidH, rectVidH]);
  } else if (frame >= 2204 && frame < 2684) {
    // 6. Chunk 6: Transition from Right Tall Frame to Left 32% Tall Frame (x=40)
    const s = spring({
      frame: Math.max(0, frame - 2204),
      fps,
      config: { damping: 15, stiffness: 110 },
    });
    containerX = interpolate(s, [0, 1], [1300, 40]);
    containerY = rectTop;
    containerW = rectW;
    containerH = rectH;
    containerRadius = rectRadius;
    vidLeft = rectVidLeft;
    vidTop = rectVidTop;
    vidW = rectVidW;
    vidH = rectVidH;
  } else if (frame >= 2684 && frame < 3084) {
    // 7. Chunk 7: Transition from Left Tall Frame to Right 32% Tall Frame (x=1300)
    const s = spring({
      frame: Math.max(0, frame - 2684),
      fps,
      config: { damping: 15, stiffness: 110 },
    });
    containerX = interpolate(s, [0, 1], [40, 1300]);
    containerY = rectTop;
    containerW = rectW;
    containerH = rectH;
    containerRadius = rectRadius;
    vidLeft = rectVidLeft;
    vidTop = rectVidTop;
    vidW = rectVidW;
    vidH = rectVidH;
  } else {
    // 8. Chunk 8: Transition from Right Tall Frame back to Left 32% Tall Frame (x=40)
    const s = spring({
      frame: Math.max(0, frame - 3084),
      fps,
      config: { damping: 15, stiffness: 110 },
    });
    containerX = interpolate(s, [0, 1], [1300, 40]);
    containerY = rectTop;
    containerW = rectW;
    containerH = rectH;
    containerRadius = rectRadius;
    vidLeft = rectVidLeft;
    vidTop = rectVidTop;
    vidW = rectVidW;
    vidH = rectVidH;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: containerX,
        top: containerY,
        width: containerW,
        height: containerH,
        borderRadius: containerRadius,
        overflow: "hidden",
        border: "2.5px solid rgba(212, 175, 55, 0.8)",
        boxShadow:
          "0 24px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(212, 175, 55, 0.2)",
        zIndex: 50,
        backgroundColor: "#080C14",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: vidLeft,
          top: vidTop,
          width: vidW,
          height: vidH,
        }}
      >
        <Video
          src={staticFile("video/master_take2_facecam.mp4")}
          style={{
            width: vidW,
            height: vidH,
            objectFit: "cover",
          }}
          volume={0} // Master voice dialogue is handled cleanly by master_take2_audio.wav
        />
      </div>

      {/* Subtle Inner Bezel Glass Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: containerRadius,
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
