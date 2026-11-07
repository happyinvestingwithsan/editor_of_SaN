import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
  Video,
  Easing,
} from "remotion";

export interface ThinkSchoolTake06FacecamProps {
  frame: number;
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchoolTake06Facecam:
 * Persistent Single <Video> Architecture (Zero Unmounting, Smooth Spring Gliding).
 *
 * Micro-Aligned Facecam Schedule (Synced strictly to spoken word energy):
 * - Frames 0 - 241 (0.0s - 8.0s): FULL-SCREEN A-ROLL until SaN speaks "NO." at Frame 241.
 * - Frames 241 - 721 (8.0s - 24.0s): Glides to SIDE COLUMN RIGHT (x=1260, y=70, w=600, h=940, r=24).
 * - Frames 721 - 1085 (24.0s - 36.2s): Glides to SIDE COLUMN LEFT (x=60, y=70) on "If you are an IPO investor...".
 * - Frames 1085 - 1646 (36.2s - 54.9s): Glides to SIDE COLUMN RIGHT (x=1260, y=70) on "However, my personal...".
 * - Frames 1646 - 2097 (54.9s - 69.9s): Glides to SIDE COLUMN LEFT (x=60, y=70) on "When Zomato launched its IPO...".
 * - Frames 2097 - 2507 (69.9s - 83.6s): Morphs into CALIBRATED CIRCLE PIP at Bottom-Right (w=320, h=320, x=1540, y=700, r=160).
 *     • Exact Calibrated Crop: cropX = -236px, cropY = -75px, cropScale = 0.433x
 * - Frames 2507 - 2971 (83.6s - 99.0s): Morphs to SIDE COLUMN RIGHT (x=1260, y=70) on "Because on listing day...".
 * - Frames 2971 - 3601 (99.0s - 120.0s): Glides to SIDE COLUMN LEFT (x=60, y=70) on "I am completely comfortable...".
 * - Frames 3601 - 3769 (120.0s - 125.6s): Expands to FULL-SCREEN A-ROLL on "I have learned in the market...".
 * - Frames 3769 - 4197 (125.6s - 139.9s): Glides to SIDE COLUMN RIGHT (x=1260, y=70) for Community Outro.
 */
export const ThinkSchoolTake06Facecam: React.FC<ThinkSchoolTake06FacecamProps> = ({
  frame,
  mode = "full_video",
}) => {
  const { fps } = useVideoConfig();

  if (mode === "overlay_only") {
    return null;
  }

  // Exact Calibrated Circle Constants (SaN's Verified Ground Truth)
  const circleCropScale = 0.433;
  const circleVidW = Math.round(1920 * circleCropScale); // 831px
  const circleVidH = Math.round(1080 * circleCropScale); // 468px
  const circleCropX = -236;
  const circleCropY = -75;

  // Calibrated Column Constants (30-32% screen real estate)
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
  const pushIn = interpolate(frame, [0, 241], [1.0, 1.03], {
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

  // Circle styling toggle
  let isCircleMode = false;

  if (frame < 241) {
    // 1. Full-Screen Opening until "NO" at Frame 241 (Frames 0 - 241)
    containerX = 0;
    containerY = 0;
    containerW = 1920;
    containerH = 1080;
    containerRadius = 0;

    vidLeft = 0;
    vidTop = 0;
    vidW = 1920 * pushIn;
    vidH = 1080 * pushIn;
  } else if (frame >= 241 && frame < 721) {
    // 2. Glides smoothly to SIDE COLUMN RIGHT (Frames 241 - 721)
    const s = spring({
      frame: Math.max(0, frame - 241),
      fps,
      config: { damping: 14, stiffness: 90 },
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
  } else if (frame >= 721 && frame < 1085) {
    // 3. Glides to SIDE COLUMN LEFT (Frames 721 - 1085) [Retention Reset #1]
    const s = spring({
      frame: Math.max(0, frame - 721),
      fps,
      config: { damping: 15, stiffness: 85 },
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
  } else if (frame >= 1085 && frame < 1646) {
    // 4. Glides to SIDE COLUMN RIGHT (Frames 1085 - 1646) [Retention Reset #2]
    const s = spring({
      frame: Math.max(0, frame - 1085),
      fps,
      config: { damping: 15, stiffness: 85 },
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
  } else if (frame >= 1646 && frame < 2097) {
    // 5. Glides to SIDE COLUMN LEFT (Frames 1646 - 2097) [Retention Reset #3]
    const s = spring({
      frame: Math.max(0, frame - 1646),
      fps,
      config: { damping: 15, stiffness: 85 },
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
  } else if (frame >= 2097 && frame < 2507) {
    // 6. Morphs into CALIBRATED CIRCLE PIP at Bottom-Right (Frames 2097 - 2507)
    // Full screen canvas dedicated to Zomato 76% crash
    const s = spring({
      frame: Math.max(0, frame - 2097),
      fps,
      config: { damping: 14, stiffness: 90 },
    });

    const circleTargetX = 1540;
    const circleTargetY = 700;

    containerX = interpolate(s, [0, 1], [colLeftX, circleTargetX]);
    containerY = interpolate(s, [0, 1], [colY, circleTargetY]);
    containerW = interpolate(s, [0, 1], [colW, 320]);
    containerH = interpolate(s, [0, 1], [colH, 320]);
    containerRadius = interpolate(s, [0, 1], [colRadius, 160]);

    vidLeft = interpolate(s, [0, 1], [colVidLeft, circleCropX]);
    vidTop = interpolate(s, [0, 1], [colVidTop, circleCropY]);
    vidW = interpolate(s, [0, 1], [colVidW, circleVidW]);
    vidH = interpolate(s, [0, 1], [colVidH, circleVidH]);

    isCircleMode = true;
  } else if (frame >= 2507 && frame < 2971) {
    // 7. Morphs from Circle PIP to SIDE COLUMN RIGHT (Frames 2507 - 2971) [Retention Reset #4]
    const s = spring({
      frame: Math.max(0, frame - 2507),
      fps,
      config: { damping: 14, stiffness: 90 },
    });

    const circleTargetX = 1540;
    const circleTargetY = 700;

    containerX = interpolate(s, [0, 1], [circleTargetX, colRightX]);
    containerY = interpolate(s, [0, 1], [circleTargetY, colY]);
    containerW = interpolate(s, [0, 1], [320, colW]);
    containerH = interpolate(s, [0, 1], [320, colH]);
    containerRadius = interpolate(s, [0, 1], [160, colRadius]);

    vidLeft = interpolate(s, [0, 1], [circleCropX, colVidLeft]);
    vidTop = interpolate(s, [0, 1], [circleCropY, colVidTop]);
    vidW = interpolate(s, [0, 1], [circleVidW, colVidW]);
    vidH = interpolate(s, [0, 1], [circleVidH, colVidH]);
  } else if (frame >= 2971 && frame < 3601) {
    // 8. Glides to SIDE COLUMN LEFT (Frames 2971 - 3601) [Retention Reset #5]
    const s = spring({
      frame: Math.max(0, frame - 2971),
      fps,
      config: { damping: 15, stiffness: 85 },
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
  } else if (frame >= 3601 && frame < 3769) {
    // 9. Smoothly expands to FULL-SCREEN A-ROLL on the Master Creed (Frames 3601 - 3769)
    const s = spring({
      frame: Math.max(0, frame - 3601),
      fps,
      config: { damping: 14, stiffness: 90 },
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
  } else {
    // 10. Glides to SIDE COLUMN RIGHT for Outro & CTA (Frames 3769 - 4197) [Retention Reset #6]
    const s = spring({
      frame: Math.max(0, frame - 3769),
      fps,
      config: { damping: 14, stiffness: 90 },
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
  }

  // Border & Glow styling
  const borderColor = isCircleMode
    ? "rgba(212, 175, 55, 0.85)"
    : "rgba(212, 175, 55, 0.4)";
  const borderWidth = isCircleMode ? 4 : 2;
  const boxShadow = isCircleMode
    ? "0 10px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.4)"
    : "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 0, 0, 0.5)";

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Outer Clipping Container with GPU Transform */}
      <div
        style={{
          position: "absolute",
          transform: `translate3d(${containerX}px, ${containerY}px, 0)`,
          width: containerW,
          height: containerH,
          borderRadius: containerRadius,
          overflow: "hidden",
          border: `${borderWidth}px solid ${borderColor}`,
          boxShadow,
          backgroundColor: "#000",
          willChange: "transform, width, height, border-radius",
        }}
      >
        {/* Single Persistent <Video> Element - ZERO UNMOUNTING */}
        <div
          style={{
            position: "absolute",
            left: vidLeft,
            top: vidTop,
            width: vidW,
            height: vidH,
            willChange: "left, top, width, height",
          }}
        >
          <Video
            src={staticFile("video/facecam_take6_master.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />
        </div>
      </div>
    </div>
  );
};
