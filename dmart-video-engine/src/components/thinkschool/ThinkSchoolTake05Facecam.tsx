import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
  Video,
  Easing,
} from "remotion";

export interface ThinkSchoolTake05FacecamProps {
  frame: number;
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchoolTake05Facecam:
 * Persistent Single <Video> Architecture (Zero Unmounting, Smooth GPU Gliding).
 *
 * Master Source: D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov (408.15s - 513.15s)
 * Duration: 3,150 frames (105.00s @ 30fps)
 *
 * High-Retention Dynamic Schedule:
 * - Frames 0 - 521 (0.0s - 17.4s): FULL-SCREEN A-ROLL (1920x1080) with subtle slow push-in.
 *     • Direct host-viewer eye contact during intro and finfluencer reality check.
 * - Frame 521 (17.4s): Smooth spring into SIDE COLUMN RIGHT (x=1260, y=70, w=600, h=940) for Risk 1.
 * - Frame 956 (31.9s): Smooth glide across to SIDE COLUMN LEFT (x=60, y=70, w=600, h=940) for Speedboat vs Tanker.
 * - Frame 1581 (52.7s): Smooth glide across to SIDE COLUMN RIGHT (x=1260, y=70, w=600, h=940) for 5%-15% Band.
 * - Frame 1861 (62.0s): Smooth glide across to SIDE COLUMN LEFT (x=60, y=70, w=600, h=940) for DRHP Spectrum Debt.
 * - Frame 2202 (73.4s): Smooth glide across to SIDE COLUMN RIGHT (x=1260, y=70, w=600, h=940) for Starlink & Kuiper.
 * - Frame 2687 (89.6s): Smooth glide across to SIDE COLUMN LEFT (x=60, y=70, w=600, h=940) for Day-1 Dual Gamble.
 */
export const ThinkSchoolTake05Facecam: React.FC<ThinkSchoolTake05FacecamProps> = ({
  frame,
  mode = "full_video",
}) => {
  const { fps } = useVideoConfig();

  if (mode === "overlay_only") {
    return null;
  }

  // Calibrated Column Constants (31% width, centered vertically)
  const colW = 600;
  const colH = 940;
  const colRadius = 24;
  const colLeftX = 60;
  const colRightX = 1260;
  const colY = 70;

  // Video Framing inside Column Mode (Native 1080p center framing)
  const colVidLeft = -535;
  const colVidTop = 0;
  const colVidW = 1670;
  const colVidH = 940;

  // Slow initial push-in for full-screen opening (0 to 521)
  const pushIn = interpolate(frame, [0, 521], [1.0, 1.04], {
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

  if (frame < 521) {
    // 1. Full-Screen Opening (Frames 0 - 521)
    containerX = 0;
    containerY = 0;
    containerW = 1920;
    containerH = 1080;
    containerRadius = 0;

    vidLeft = 0;
    vidTop = 0;
    vidW = 1920 * pushIn;
    vidH = 1080 * pushIn;
  } else if (frame >= 521 && frame < 956) {
    // 2. Smooth Transition from Full-Screen -> Right Column (Frame 521 - 956)
    const s = spring({
      frame: Math.max(0, frame - 521),
      fps,
      config: { damping: 16, stiffness: 90 },
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
  } else if (frame >= 956 && frame < 1581) {
    // 3. Smooth Glide from Right Column (1260) -> Left Column (60)
    const s = spring({
      frame: Math.max(0, frame - 956),
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
  } else if (frame >= 1581 && frame < 1861) {
    // 4. Smooth Glide from Left Column (60) -> Right Column (1260)
    const s = spring({
      frame: Math.max(0, frame - 1581),
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
  } else if (frame >= 1861 && frame < 2202) {
    // 5. Smooth Glide from Right Column (1260) -> Left Column (60)
    const s = spring({
      frame: Math.max(0, frame - 1861),
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
  } else if (frame >= 2202 && frame < 2687) {
    // 6. Smooth Glide from Left Column (60) -> Right Column (1260)
    const s = spring({
      frame: Math.max(0, frame - 2202),
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
  } else {
    // 7. Smooth Glide from Right Column (1260) -> Left Column (60) until Frame 3150
    const s = spring({
      frame: Math.max(0, frame - 2687),
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
  }

  // Border & shadow styling
  const isFullScreen = frame < 521;
  const borderStyle = isFullScreen ? "none" : "2.5px solid rgba(212, 175, 55, 0.6)";
  const shadowStyle = isFullScreen
    ? "none"
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
        backgroundColor: "#000",
        pointerEvents: "none",
        willChange: "transform, width, height, left, top",
      }}
    >
      {/* Persistent Single <Video> Element */}
      <div
        style={{
          position: "absolute",
          left: vidLeft,
          top: vidTop,
          width: vidW,
          height: vidH,
          pointerEvents: "none",
        }}
      >
        <Video
          src={staticFile("video/facecam_take5_master.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          startFrom={0}
          endAt={3150}
          volume={0} // Muted because master WAV audio is handled globally
        />
      </div>

      {/* Subtle Editorial Label for Side Column */}
      {!isFullScreen && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 24,
            right: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))",
            padding: "16px 12px 6px",
            borderRadius: "0 0 20px 20px",
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#D4AF37",
                boxShadow: "0 0 8px #D4AF37",
              }}
            />
            <span
              style={{
                color: "#F3F4F6",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Happy Investing
            </span>
          </div>
          <span
            style={{
              color: "#9CA3AF",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Forensic Risk Audit
          </span>
        </div>
      )}
    </div>
  );
};
