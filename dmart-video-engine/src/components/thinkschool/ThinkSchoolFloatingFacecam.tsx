import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
  Video,
  Easing,
} from "remotion";

export interface ThinkSchoolFloatingFacecamProps {
  frame: number;
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchoolFloatingFacecam:
 * Persistent Single <Video> Architecture (Zero Unmounting, Zero Seek Lag, Zero Black Flashes).
 *
 * Spoken Timeline Layout Modes:
 * 1. Full-Screen A-Roll: Frames 0-148, 1766-1937, 2825-2869
 * 2. Right-Side Tall Rectangle (Right 40%):
 *    - Frames 148-742 (Scene 1: Podium Monoliths)
 *    - Frames 2239-2825 (Scene 5: 4-Part DRHP Roadmap)
 * 3. Floating Circle (Bottom-Left / Bottom-Right):
 *    - Frames 742-1226 (Scene 2: Retail Euphoria -> Bottom-Left)
 *    - Frames 1226-1766 (Scene 3: Crash Autopsy -> Bottom-Right)
 *    - Frames 1937-2239 (Scene 4: Golden Scale -> Bottom-Left)
 *
 * User-Calibrated Ground Truth Offsets:
 * - Circle Crop: cropX = -236px, cropY = -75px, cropScale = 0.433
 * - Tall Rectangle Crop: videoLeft = -565px, videoTop = -80px, videoScale = 1.0 (Centered native 1080p framing)
 */
export const ThinkSchoolFloatingFacecam: React.FC<ThinkSchoolFloatingFacecamProps> = ({
  frame,
  mode = "full_video",
}) => {
  const { fps } = useVideoConfig();

  if (mode === "overlay_only") {
    return null;
  }

  // ---------------------------------------------------------------------------
  // FULL-SCREEN SLOW CINEMATIC PUSH-IN
  // ---------------------------------------------------------------------------
  const pushIn =
    frame < 148
      ? interpolate(frame, [0, 148], [1.0, 1.04], { easing: Easing.bezier(0.2, 0.8, 0.2, 1.0) })
      : frame >= 1766 && frame < 1937
      ? interpolate(frame, [1766, 1937], [1.0, 1.04], { easing: Easing.bezier(0.2, 0.8, 0.2, 1.0) })
      : frame >= 2825
      ? interpolate(frame, [2825, 2869], [1.0, 1.04], { easing: Easing.bezier(0.2, 0.8, 0.2, 1.0) })
      : 1.0;

  // ---------------------------------------------------------------------------
  // CONTINUOUS STATE MACHINE FOR CONTAINER & VIDEO GEOMETRY
  // ---------------------------------------------------------------------------
  let containerX = 0;
  let containerY = 0;
  let containerW = 1920;
  let containerH = 1080;
  let containerRadius = 0;
  let isRectangle = false;

  let vidLeft = 0;
  let vidTop = 0;
  let vidW = 1920;
  let vidH = 1080;
  let vidScale = pushIn;

  // Calibrated Circle Constants
  const circleScale = 0.433;
  const circleVidW = Math.round(1920 * circleScale); // 831px
  const circleVidH = Math.round(1080 * circleScale); // 468px
  const circleVidLeft = -236;
  const circleVidTop = -75;

  // Calibrated Tall Rectangle Constants (Right 40% area, centered vertically)
  const rectLeft = 1160;
  const rectTop = 80;
  const rectW = 700;
  const rectH = 920;
  const rectRadius = 24;
  const rectVidLeft = -565;
  const rectVidTop = -80;
  const rectVidW = 1920;
  const rectVidH = 1080;

  if (frame < 148) {
    // 1. Full-Screen Opening
    containerX = 0;
    containerY = 0;
    containerW = 1920;
    containerH = 1080;
    containerRadius = 0;
    vidLeft = 0;
    vidTop = 0;
    vidW = 1920;
    vidH = 1080;
    vidScale = pushIn;
  } else if (frame >= 148 && frame < 742) {
    // 2. Scene 1: Transition to Right-Side Tall Rectangle
    isRectangle = true;
    const s = spring({
      frame: Math.max(0, frame - 148),
      fps,
      config: { damping: 16, stiffness: 120 },
    });
    containerX = interpolate(s, [0, 1], [0, rectLeft]);
    containerY = interpolate(s, [0, 1], [0, rectTop]);
    containerW = interpolate(s, [0, 1], [1920, rectW]);
    containerH = interpolate(s, [0, 1], [1080, rectH]);
    containerRadius = interpolate(s, [0, 1], [0, rectRadius]);

    vidLeft = interpolate(s, [0, 1], [0, rectVidLeft]);
    vidTop = interpolate(s, [0, 1], [0, rectVidTop]);
    vidW = 1920;
    vidH = 1080;
    vidScale = 1.0;
  } else if (frame >= 742 && frame < 1226) {
    // 3. Scene 2: Transition from Tall Rectangle to Bottom-Left Circle (x=60, y=700)
    const s = spring({
      frame: Math.max(0, frame - 742),
      fps,
      config: { damping: 15, stiffness: 110 },
    });
    containerX = interpolate(s, [0, 1], [rectLeft, 60]);
    containerY = interpolate(s, [0, 1], [rectTop, 700]);
    containerW = interpolate(s, [0, 1], [rectW, 320]);
    containerH = interpolate(s, [0, 1], [rectH, 320]);
    containerRadius = interpolate(s, [0, 1], [rectRadius, 160]);

    vidLeft = interpolate(s, [0, 1], [rectVidLeft, circleVidLeft]);
    vidTop = interpolate(s, [0, 1], [rectVidTop, circleVidTop]);
    vidW = interpolate(s, [0, 1], [rectVidW, circleVidW]);
    vidH = interpolate(s, [0, 1], [rectVidH, circleVidH]);
    vidScale = 1.0;
  } else if (frame >= 1226 && frame < 1766) {
    // 4. Scene 3: Glide from Bottom-Left Circle (60) to Bottom-Right Circle (1540)
    const s = spring({
      frame: Math.max(0, frame - 1226),
      fps,
      config: { damping: 15, stiffness: 100 },
    });
    containerX = interpolate(s, [0, 1], [60, 1540]);
    containerY = 700;
    containerW = 320;
    containerH = 320;
    containerRadius = 160;

    vidLeft = circleVidLeft;
    vidTop = circleVidTop;
    vidW = circleVidW;
    vidH = circleVidH;
    vidScale = 1.0;
  } else if (frame >= 1766 && frame < 1937) {
    // 5. Middle A-Roll: Transition from Bottom-Right Circle to Full-Screen
    const s = spring({
      frame: Math.max(0, frame - 1766),
      fps,
      config: { damping: 16, stiffness: 120 },
    });
    containerX = interpolate(s, [0, 1], [1540, 0]);
    containerY = interpolate(s, [0, 1], [700, 0]);
    containerW = interpolate(s, [0, 1], [320, 1920]);
    containerH = interpolate(s, [0, 1], [320, 1080]);
    containerRadius = interpolate(s, [0, 1], [160, 0]);

    vidLeft = interpolate(s, [0, 1], [circleVidLeft, 0]);
    vidTop = interpolate(s, [0, 1], [circleVidTop, 0]);
    vidW = interpolate(s, [0, 1], [circleVidW, 1920]);
    vidH = interpolate(s, [0, 1], [circleVidH, 1080]);
    vidScale = pushIn;
  } else if (frame >= 1937 && frame < 2239) {
    // 6. Scene 4: Transition from Full-Screen to Bottom-Left Circle (60)
    const s = spring({
      frame: Math.max(0, frame - 1937),
      fps,
      config: { damping: 15, stiffness: 110 },
    });
    containerX = interpolate(s, [0, 1], [0, 60]);
    containerY = interpolate(s, [0, 1], [0, 700]);
    containerW = interpolate(s, [0, 1], [1920, 320]);
    containerH = interpolate(s, [0, 1], [1080, 320]);
    containerRadius = interpolate(s, [0, 1], [0, 160]);

    vidLeft = interpolate(s, [0, 1], [0, circleVidLeft]);
    vidTop = interpolate(s, [0, 1], [0, circleVidTop]);
    vidW = interpolate(s, [0, 1], [1920, circleVidW]);
    vidH = interpolate(s, [0, 1], [1080, circleVidH]);
    vidScale = 1.0;
  } else if (frame >= 2239 && frame < 2825) {
    // 7. Scene 5: Transition from Bottom-Left Circle to Right-Side Tall Rectangle
    isRectangle = true;
    const s = spring({
      frame: Math.max(0, frame - 2239),
      fps,
      config: { damping: 15, stiffness: 110 },
    });
    containerX = interpolate(s, [0, 1], [60, rectLeft]);
    containerY = interpolate(s, [0, 1], [700, rectTop]);
    containerW = interpolate(s, [0, 1], [320, rectW]);
    containerH = interpolate(s, [0, 1], [320, rectH]);
    containerRadius = interpolate(s, [0, 1], [160, rectRadius]);

    vidLeft = interpolate(s, [0, 1], [circleVidLeft, rectVidLeft]);
    vidTop = interpolate(s, [0, 1], [circleVidTop, rectVidTop]);
    vidW = interpolate(s, [0, 1], [circleVidW, rectVidW]);
    vidH = interpolate(s, [0, 1], [circleVidH, rectVidH]);
    vidScale = 1.0;
  } else {
    // 8. Closing Hook: Transition from Tall Rectangle to Full-Screen
    const s = spring({
      frame: Math.max(0, frame - 2825),
      fps,
      config: { damping: 16, stiffness: 120 },
    });
    containerX = interpolate(s, [0, 1], [rectLeft, 0]);
    containerY = interpolate(s, [0, 1], [rectTop, 0]);
    containerW = interpolate(s, [0, 1], [rectW, 1920]);
    containerH = interpolate(s, [0, 1], [rectH, 1080]);
    containerRadius = interpolate(s, [0, 1], [rectRadius, 0]);

    vidLeft = interpolate(s, [0, 1], [rectVidLeft, 0]);
    vidTop = interpolate(s, [0, 1], [rectVidTop, 0]);
    vidW = 1920;
    vidH = 1080;
    vidScale = pushIn;
  }

  const isFull =
    frame < 148 ||
    (frame >= 1766 && frame < 1937) ||
    frame >= 2825;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: Math.round(containerW),
        height: Math.round(containerH),
        borderRadius: Math.round(containerRadius),
        border: isFull
          ? "none"
          : isRectangle
          ? "3px solid #F59E0B"
          : "4px solid #F59E0B",
        boxShadow: isFull
          ? "none"
          : isRectangle
          ? "0 30px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(245, 158, 11, 0.25)"
          : "0 20px 50px rgba(0, 0, 0, 0.85), 0 0 25px rgba(245, 158, 11, 0.4)",
        transform: `translate3d(${Math.round(containerX)}px, ${Math.round(containerY)}px, 0)`,
        overflow: "hidden",
        zIndex: isFull ? 5 : 50,
        backgroundColor: "#000",
        userSelect: "none",
        willChange: "transform, width, height",
      }}
    >
      <Video
        src={staticFile("video/facecam_take1_fast.mp4")}
        muted
        startFrom={0}
        style={{
          position: "absolute",
          width: Math.round(vidW),
          height: Math.round(vidH),
          left: Math.round(vidLeft),
          top: Math.round(vidTop),
          objectFit: "cover",
          transform: isFull ? `scale(${vidScale})` : "none",
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      />

      {/* Editorial Nameplate Badge on Right-Side Tall Rectangle */}
      {isRectangle && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(10, 15, 25, 0.88)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(245, 158, 11, 0.5)",
            borderRadius: 20,
            padding: "6px 20px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 10,
            boxShadow: "0 10px 25px rgba(0,0,0,0.7)",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#F59E0B",
              boxShadow: "0 0 10px #F59E0B",
            }}
          />
          <span
            style={{
              color: "#FFF",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.08em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            SaN // LEAD ANALYST
          </span>
        </div>
      )}
    </div>
  );
};
