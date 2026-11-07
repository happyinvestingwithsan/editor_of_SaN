import React from "react";
import {
  staticFile,
  Video,
} from "remotion";

export interface ThinkSchoolTake03FacecamProps {
  frame: number;
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchoolTake03Facecam:
 * Seamless 3-Mode Adaptive Facecam for Take 3 (Frames 0 - 2640 @ 30fps).
 * 
 * 1. FULL-SCREEN A-ROLL (SaN commands full screen on conversational setups & questions):
 *    - Frames 0 - 120 (0.0s - 4.0s): Opening question ("So if promoters are not taking money out...")
 *    - Frames 644 - 738 (21.5s - 24.6s): Balance sheet transition ("Let's look at the balance sheet reality before this IPO...")
 *    - Frames 1318 - 1570 (43.9s - 52.3s): Why it matters hook ("Why does this matter to your investment return? In the previous financial year...")
 * 
 * 2. SIDE COLUMN (35% Width, generous breathing room for SaN + 65% mobile-optimized graphic):
 *    - Frames 120 - 204 (4.0s - 6.8s): Left Column ("where does this 30,000 crore actually go?")
 *    - Frames 738 - 989 (24.6s - 33.0s): Right Column ("mid-2026 59,140 crore debt")
 *    - Frames 1570 - 1828 (52.3s - 60.9s): Left Column ("over 8,000 crore interest leak")
 *    - Frames 1828 - 2106 (60.9s - 70.2s): Right Column ("permanently eliminated & 3,500-4,000 crore saved")
 * 
 * 3. CALIBRATED CIRCLE PIP (Reserved strictly for full-screen document scans & wide kinetic waterfalls):
 *    - Frames 204 - 644 (6.8s - 21.5s): Real DRHP statutory table
 *    - Frames 989 - 1318 (33.0s - 43.9s): 50% Cyan laser decapitation
 *    - Frames 2106 - 2640 (70.2s - 88.0s): P&L gravity waterfall & zero-work cockpit dials
 *    • Exact User Calibration: cropX = -236px, cropY = -75px, cropScale = 0.433x (w=320, h=320, x=60, y=700)
 */
export const ThinkSchoolTake03Facecam: React.FC<ThinkSchoolTake03FacecamProps> = ({
  frame,
  mode = "full_video",
}) => {
  if (mode === "overlay_only") {
    return null;
  }

  // Exact User-Specified Calibrated Circle Constants
  const circleCropScale = 0.433;
  const circleVidW = Math.round(1920 * circleCropScale); // 831px
  const circleVidH = Math.round(1080 * circleCropScale); // 468px
  const circleCropX = -236;
  const circleCropY = -75;

  // Determine Layout Mode
  const isFullScreenARoll =
    (frame >= 0 && frame < 120) ||
    (frame >= 644 && frame < 738) ||
    (frame >= 1318 && frame < 1570);

  const isCirclePIP =
    (frame >= 204 && frame < 644) ||
    (frame >= 989 && frame < 1318);

  // Side column positioning
  const isLeftColumn =
    (frame >= 120 && frame < 204) ||
    (frame >= 1570 && frame < 1828) ||
    (frame >= 2106 && frame < 2309);

  // MODE 1: FULL-SCREEN A-ROLL
  if (isFullScreenARoll) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 40,
          backgroundColor: "#070A10",
        }}
      >
        <Video
          src={staticFile("video/facecam_take3_master.mp4")}
          style={{
            width: 1920,
            height: 1080,
            objectFit: "cover",
          }}
          volume={0}
        />
        {/* Subtle Cinematic Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 100px rgba(0,0,0,0.6)",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  // MODE 2: CALIBRATED CIRCLE PIP
  if (isCirclePIP) {
    return (
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 700,
          width: 320,
          height: 320,
          borderRadius: 160,
          overflow: "hidden",
          border: "3px solid rgba(212, 175, 55, 0.85)",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.3)",
          zIndex: 50,
          backgroundColor: "#080C14",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: circleCropX,
            top: circleCropY,
            width: circleVidW,
            height: circleVidH,
          }}
        >
          <Video
            src={staticFile("video/facecam_take3_master.mp4")}
            style={{
              width: circleVidW,
              height: circleVidH,
              objectFit: "cover",
            }}
            volume={0}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            boxShadow: "inset 0 0 16px rgba(0,0,0,0.6)",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  // MODE 3: SIDE COLUMN (35% Width: 620px x 940px)
  const colX = isLeftColumn ? 60 : 1240;

  return (
    <div
      style={{
        position: "absolute",
        left: colX,
        top: 70,
        width: 620,
        height: 940,
        borderRadius: 24,
        overflow: "hidden",
        border: "2px solid rgba(212, 175, 55, 0.5)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 0, 0, 0.5)",
        zIndex: 50,
        backgroundColor: "#0A0F1D",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -525,
          top: 0,
          width: 1670,
          height: 940,
        }}
      >
        <Video
          src={staticFile("video/facecam_take3_master.mp4")}
          style={{
            width: 1670,
            height: 940,
            objectFit: "cover",
          }}
          volume={0}
        />
      </div>

      {/* Subtle Inner Shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 24,
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.7)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
