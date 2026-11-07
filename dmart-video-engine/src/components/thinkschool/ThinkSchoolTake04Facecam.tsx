import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
  Video,
  Easing,
} from "remotion";

export interface ThinkSchoolTake04FacecamProps {
  frame: number;
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchoolTake04Facecam:
 * Persistent Single <Video> Architecture (Zero Unmounting, Smooth Spring Gliding).
 *
 * Ground-Truth Acoustic Facecam States:
 * - Frames 0 - 270 (0.0s - 9.0s): FULL-SCREEN A-ROLL (SaN delivers investing hook).
 * - Frames 270 - 424 (9.0s - 14.1s): Smooth Glide -> LEFT COLUMN (Duopoly battlefield on right).
 * - Frames 424 - 500 (14.1s - 16.7s): Smooth Expand -> FULL-SCREEN A-ROLL ("Let's look at raw operating metrics").
 * - Frames 500 - 850 (16.7s - 28.3s): Smooth Glide -> RIGHT COLUMN (Subscriber towers on left, word-synced).
 * - Frames 850 - 1204 (28.3s - 40.1s): Smooth Glide -> LEFT COLUMN (EBITDA margin only, then revenue, then PAT).
 * - Frames 1204 - 1592 (40.1s - 53.1s): Smooth Glide -> RIGHT COLUMN (Cash flow vs PAT, stamp on Frame 1528).
 * - Frames 1592 - 2308 (53.1s - 76.9s): Smooth Morph -> CALIBRATED CIRCLE PIP at Bottom-Left (60, 700).
 *     • Exact Calibrated Crop: cropX = -236px, cropY = -75px, cropScale = 0.433x
 * - Frames 2308 - 2713 (76.9s - 90.4s): Smooth Morph -> RIGHT COLUMN (30% discount anomaly on left).
 * - Frames 2713 - 2929 (90.4s - 97.6s): Smooth Glide -> LEFT COLUMN (43.7 GB data beast on right).
 * - Frames 2929 - 3383 (97.6s - 112.8s): Smooth Glide -> RIGHT COLUMN (ARPU rocket -> Chapter 5 wipe).
 */
export const ThinkSchoolTake04Facecam: React.FC<ThinkSchoolTake04FacecamProps> = ({
  frame,
  mode = "full_video",
}) => {
  const { fps } = useVideoConfig();

  if (mode === "overlay_only") {
    return null;
  }

  // Exact User-Specified Calibrated Circle Constants
  const circleCropScale = 0.433;
  const circleVidW = Math.round(1920 * circleCropScale); // 831px
  const circleVidH = Math.round(1080 * circleCropScale); // 468px
  const circleCropX = -236;
  const circleCropY = -75;

  // Calibrated Column Constants (35% width, centered vertically)
  const colW = 600;
  const colH = 940;
  const colRadius = 24;
  const colLeftX = 60;
  const colRightX = 1260;
  const colY = 70;

  // Video Framing inside Column Mode
  const colVidLeft = -535;
  const colVidTop = 0;
  const colVidW = 1670;
  const colVidH = 940;

  // Slow initial push-in for full-screen opening
  const pushIn = interpolate(frame, [0, 270], [1.0, 1.03], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1.0),
    extrapolateRight: "clamp",
  });

  // Container geometry variables
  let containerX = 0;
  let containerY = 0;
  let containerW = 1920;
  let containerH = 1080;
  let containerRadius = 0;

  // Video placement inside container
  let vidLeft = 0;
  let vidTop = 0;
  let vidW = 1920;
  let vidH = 1080;

  let isCircleMode = false;
  let isFullScreen = false;

  if (frame < 270) {
    // 1. Full-Screen Opening (Frames 0 - 270)
    isFullScreen = true;
    containerX = 0;
    containerY = 0;
    containerW = 1920;
    containerH = 1080;
    containerRadius = 0;

    vidLeft = 0;
    vidTop = 0;
    vidW = 1920 * pushIn;
    vidH = 1080 * pushIn;
  } else if (frame >= 270 && frame < 424) {
    // 2. Smooth Transition: Full-Screen -> Left Column (Frame 270 - 424)
    const s = spring({
      frame: Math.max(0, frame - 270),
      fps,
      config: { damping: 16, stiffness: 100 },
    });
    containerX = interpolate(s, [0, 1], [0, colLeftX]);
    containerY = interpolate(s, [0, 1], [0, colY]);
    containerW = interpolate(s, [0, 1], [1920, colW]);
    containerH = interpolate(s, [0, 1], [1080, colH]);
    containerRadius = interpolate(s, [0, 1], [0, colRadius]);

    vidLeft = interpolate(s, [0, 1], [0, colVidLeft]);
    vidTop = interpolate(s, [0, 1], [0, colVidTop]);
    vidW = interpolate(s, [0, 1], [1920, colVidW]);
    vidH = interpolate(s, [0, 1], [1080, colVidH]);
  } else if (frame >= 424 && frame < 560) {
    // 3. Smooth Transition: Left Column -> Full Screen ("Let's look at raw operating metrics... Jio commands an empire of over...")
    const s = spring({
      frame: Math.max(0, frame - 424),
      fps,
      config: { damping: 16, stiffness: 100 },
    });
    containerX = interpolate(s, [0, 1], [colLeftX, 0]);
    containerY = interpolate(s, [0, 1], [colY, 0]);
    containerW = interpolate(s, [0, 1], [colW, 1920]);
    containerH = interpolate(s, [0, 1], [colH, 1080]);
    containerRadius = interpolate(s, [0, 1], [colRadius, 0]);

    vidLeft = interpolate(s, [0, 1], [colVidLeft, 0]);
    vidTop = interpolate(s, [0, 1], [colVidTop, 0]);
    vidW = interpolate(s, [0, 1], [colVidW, 1920]);
    vidH = interpolate(s, [0, 1], [colVidH, 1080]);
    if (s > 0.8) isFullScreen = true;
  } else if (frame >= 560 && frame < 850) {
    // 4. Smooth Transition: Full Screen -> Right Column (Exact onset of "53.3 crore subscribers" at F560)
    const s = spring({
      frame: Math.max(0, frame - 560),
      fps,
      config: { damping: 16, stiffness: 100 },
    });
    containerX = interpolate(s, [0, 1], [0, colRightX]);
    containerY = interpolate(s, [0, 1], [0, colY]);
    containerW = interpolate(s, [0, 1], [1920, colW]);
    containerH = interpolate(s, [0, 1], [1080, colH]);
    containerRadius = interpolate(s, [0, 1], [0, colRadius]);

    vidLeft = interpolate(s, [0, 1], [0, colVidLeft]);
    vidTop = interpolate(s, [0, 1], [0, colVidTop]);
    vidW = interpolate(s, [0, 1], [1920, colVidW]);
    vidH = interpolate(s, [0, 1], [1080, colVidH]);
  } else if (frame >= 850 && frame < 1204) {
    // 5. Smooth Glide: Right Column (1260) -> Left Column (60) (EBITDA on Right)
    const s = spring({
      frame: Math.max(0, frame - 850),
      fps,
      config: { damping: 16, stiffness: 90 },
    });
    containerX = interpolate(s, [0, 1], [colRightX, colLeftX]);
    containerY = colY;
    containerW = colW;
    containerH = colH;
    containerRadius = colRadius;

    vidLeft = colVidLeft;
    vidTop = colVidTop;
    vidW = colVidW;
    vidH = colVidH;
  } else if (frame >= 1204 && frame < 1592) {
    // 6. Smooth Glide: Left Column (60) -> Right Column (1260) (Cash Flow on Left)
    const s = spring({
      frame: Math.max(0, frame - 1204),
      fps,
      config: { damping: 16, stiffness: 90 },
    });
    containerX = interpolate(s, [0, 1], [colLeftX, colRightX]);
    containerY = colY;
    containerW = colW;
    containerH = colH;
    containerRadius = colRadius;

    vidLeft = colVidLeft;
    vidTop = colVidTop;
    vidW = colVidW;
    vidH = colVidH;
  } else if (frame >= 1592 && frame < 2308) {
    // 7. Smooth Morph: Right Column (1260) -> Calibrated Circle PIP at Bottom-Left (60, 700)
    const s = spring({
      frame: Math.max(0, frame - 1592),
      fps,
      config: { damping: 16, stiffness: 100 },
    });
    containerX = interpolate(s, [0, 1], [colRightX, 60]);
    containerY = interpolate(s, [0, 1], [colY, 700]);
    containerW = interpolate(s, [0, 1], [colW, 320]);
    containerH = interpolate(s, [0, 1], [colH, 320]);
    containerRadius = interpolate(s, [0, 1], [colRadius, 160]);

    vidLeft = interpolate(s, [0, 1], [colVidLeft, circleCropX]);
    vidTop = interpolate(s, [0, 1], [colVidTop, circleCropY]);
    vidW = interpolate(s, [0, 1], [colVidW, circleVidW]);
    vidH = interpolate(s, [0, 1], [colVidH, circleVidH]);

    if (s > 0.8) isCircleMode = true;
  } else if (frame >= 2308 && frame < 2713) {
    // 8. Smooth Morph: Circle PIP (60, 700) -> Right Column (1260, 70)
    const s = spring({
      frame: Math.max(0, frame - 2308),
      fps,
      config: { damping: 16, stiffness: 100 },
    });
    containerX = interpolate(s, [0, 1], [60, colRightX]);
    containerY = interpolate(s, [0, 1], [700, colY]);
    containerW = interpolate(s, [0, 1], [320, colW]);
    containerH = interpolate(s, [0, 1], [320, colH]);
    containerRadius = interpolate(s, [0, 1], [160, colRadius]);

    vidLeft = interpolate(s, [0, 1], [circleCropX, colVidLeft]);
    vidTop = interpolate(s, [0, 1], [circleCropY, colVidTop]);
    vidW = interpolate(s, [0, 1], [circleVidW, colVidW]);
    vidH = interpolate(s, [0, 1], [circleVidH, colVidH]);
  } else if (frame >= 2713 && frame < 2929) {
    // 9. Smooth Glide: Right Column (1260) -> Left Column (60)
    const s = spring({
      frame: Math.max(0, frame - 2713),
      fps,
      config: { damping: 16, stiffness: 90 },
    });
    containerX = interpolate(s, [0, 1], [colRightX, colLeftX]);
    containerY = colY;
    containerW = colW;
    containerH = colH;
    containerRadius = colRadius;

    vidLeft = colVidLeft;
    vidTop = colVidTop;
    vidW = colVidW;
    vidH = colVidH;
  } else {
    // 10. Smooth Glide: Left Column (60) -> Right Column (1260)
    const s = spring({
      frame: Math.max(0, frame - 2929),
      fps,
      config: { damping: 16, stiffness: 90 },
    });
    containerX = interpolate(s, [0, 1], [colLeftX, colRightX]);
    containerY = colY;
    containerW = colW;
    containerH = colH;
    containerRadius = colRadius;

    vidLeft = colVidLeft;
    vidTop = colVidTop;
    vidW = colVidW;
    vidH = colVidH;
  }

  // Border & shadow styling
  const borderStyle = isFullScreen
    ? "none"
    : isCircleMode
    ? "3px solid rgba(212, 175, 55, 0.85)"
    : "2.5px solid rgba(212, 175, 55, 0.55)";
  const shadowStyle = isFullScreen
    ? "none"
    : isCircleMode
    ? "0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.3)"
    : "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 0, 0, 0.5)";

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
        border: borderStyle,
        boxShadow: shadowStyle,
        zIndex: 50,
        backgroundColor: "#080C14",
      }}
    >
      {/* Exactly ONE persistent Video element for the entire timeline */}
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
          src={staticFile("video/facecam_take4_master.mp4")}
          style={{
            width: vidW,
            height: vidH,
            objectFit: "cover",
          }}
          volume={0}
        />
      </div>

      {/* Cinematic Vignette Overlay */}
      {!isFullScreen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: containerRadius,
            boxShadow: isCircleMode
              ? "inset 0 0 16px rgba(0,0,0,0.6)"
              : "inset 0 0 40px rgba(0,0,0,0.7), inset 0 0 80px rgba(0,0,0,0.4)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
