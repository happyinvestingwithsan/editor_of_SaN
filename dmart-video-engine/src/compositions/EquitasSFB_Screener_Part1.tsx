import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  Video,
} from "remotion";
import { SFXCue, SFXPlayer } from "../motion-kit";
import {
  TrendingUp,
  AlertTriangle,
  ArrowDownRight,
  Sparkles,
  Percent,
  Activity,
} from "lucide-react";

/**
 * ============================================================================
 * SCREENER HIGHLIGHT CONFIGURATION & CALIBRATION MAP
 * ============================================================================
 * SaN can tweak these coordinates directly here or inspect them live in
 * Remotion Studio at http://localhost:3000!
 *
 * Image Dimensions:
 * - YoY Image (esfb_screener_yoy_799.png): 1740 x 764 px
 * - QoQ Image (esfb_screener_qoq_200cr.png): 1750 x 710 px
 */
export const SCREENER_CONFIG = {
  // Set to true to inspect live coordinates & bounding boxes in Remotion Studio
  SHOW_CALIBRATION_HUD: false,

  // --------------------------------------------------------------------------
  // 1. YoY HIGHLIGHTS (Profit & Loss Annual)
  // --------------------------------------------------------------------------
  yoy: {
    // Camera center point inside 1740x764 image (centers Mar 2023 & Mar 2024)
    camera: {
      targetX: 1300,
      targetY: 350,
      baseScale: 1.05,
      zoomScale: 1.25,
    },
    // FY23 Net Profit (574 Cr)
    fy23_574: {
      x: 1222,
      y: 498,
      w: 68,
      h: 38,
      label: "FY23: ₹574 Cr",
    },
    // FY24 Net Profit (799 Cr - All Time Peak)
    fy24_799: {
      x: 1338,
      y: 498,
      w: 68,
      h: 38,
      label: "★ Peak: ₹799 Cr",
    },
    // Vertical Year retention headers
    header_mar23: { x: 1205, y: 175, w: 85, h: 28 },
    header_mar24: { x: 1325, y: 175, w: 85, h: 28 },
    row_label: { x: 15, y: 498, w: 140, h: 38, label: "Net Profit +" },
  },

  // --------------------------------------------------------------------------
  // 2. QoQ HIGHLIGHTS (Quarterly Results)
  // --------------------------------------------------------------------------
  qoq: {
    // Camera framing targets inside 1750x710 image
    camera_golden: {
      targetX: 440,
      targetY: 350,
      scale: 1.25,
    },
    camera_collapse: {
      targetX: 890,
      targetY: 350,
      scale: 1.28,
    },
    // First 3 quarters combined: Sep 2023 (198), Dec 2023 (202), Mar 2024 (208)
    first3_200cr_block: {
      x: 295,
      y: 498,
      w: 290,
      h: 38,
      label: "✓ > ₹200 Cr Every Quarter",
    },
    // Mar 2024 baseline (208 Cr)
    mar24_208: {
      x: 520,
      y: 498,
      w: 68,
      h: 38,
      label: "Mar 2024: ₹208 Cr",
    },
    // Jun 2024 crash (26 Cr)
    jun24_26: {
      x: 635,
      y: 498,
      w: 68,
      h: 38,
      label: "Jun 2024: ₹26 Cr (-87.5%)",
    },
    // Sep 2024 drop (13 Cr)
    sep24_13: {
      x: 750,
      y: 498,
      w: 68,
      h: 38,
      label: "Sep 2024: ₹13 Cr (-50%)",
    },
    // Jun 2025 shocking loss (-224 Cr)
    jun25_loss_224: {
      x: 1070,
      y: 498,
      w: 88,
      h: 38,
      label: "SHOCK LOSS: -₹224 Cr",
    },
    // QoQ Vertical Year/Quarter headers
    header_first3: { x: 295, y: 178, w: 290, h: 28 },
    header_jun24: { x: 635, y: 178, w: 68, h: 28 },
    header_sep24: { x: 750, y: 178, w: 68, h: 28 },
    header_jun25: { x: 1070, y: 178, w: 88, h: 28 },
  },
};

/**
 * Animated SVG Stroke Highlight Box Primitive
 */
const AnimatedStrokeBox: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  fillColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  progress: number;
  pulse?: boolean;
}> = ({
  x,
  y,
  w,
  h,
  color = "#10B981",
  fillColor = "rgba(16, 185, 129, 0.12)",
  borderWidth = 3,
  borderRadius = 8,
  progress,
  pulse = false,
}) => {
  const perimeter = 2 * (w + h);
  const strokeDashoffset = perimeter * (1 - Math.min(1, Math.max(0, progress)));
  const fillOpacity = progress >= 0.8 ? (progress - 0.8) * 5 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        pointerEvents: "none",
        zIndex: 15,
        filter: pulse
          ? `drop-shadow(0 0 12px ${color}) drop-shadow(0 0 24px ${color}88)`
          : `drop-shadow(0 4px 10px ${color}44)`,
      }}
    >
      <svg
        width={w}
        height={h}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
        }}
      >
        <rect
          x={0}
          y={0}
          width={w}
          height={h}
          rx={borderRadius}
          ry={borderRadius}
          fill={fillColor}
          opacity={fillOpacity}
        />
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={Math.max(0, w - borderWidth)}
          height={Math.max(0, h - borderWidth)}
          rx={Math.max(0, borderRadius - borderWidth / 2)}
          ry={Math.max(0, borderRadius - borderWidth / 2)}
          fill="none"
          stroke={color}
          strokeWidth={borderWidth}
          strokeDasharray={perimeter}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

/**
 * ESFB_Screener_Part1:
 * Master motion graphics composition for Equitas Small Finance Bank - Screener Part 1.
 * Source Video: "D:\QuickShare\Equitas SFB\Capcut\Equitas SFB draft- r2 Review.mov"
 * Duration: 1,995 frames (66.50s @ 30fps).
 */
export const EquitasSFB_Screener_Part1: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // 1. DYNAMIC FACECAM FRAMING & POSITIONING (Single Persistent <Video>)
  // ---------------------------------------------------------------------------
  let facecamLeft = 0;
  let facecamTop = 0;
  let facecamWidth = 1920;
  let facecamHeight = 1080;
  let facecamRadius = 0;
  let facecamVideoTranslate = "translate(0px, 0px) scale(1)";

  if (frame >= 198) {
    const springLeft = spring({
      frame: frame - 198,
      fps: 30,
      config: { damping: 18, stiffness: 90 },
    });
    facecamLeft = interpolate(springLeft, [0, 1], [0, 60]);
    facecamTop = interpolate(springLeft, [0, 1], [0, 50]);
    facecamWidth = interpolate(springLeft, [0, 1], [1920, 580]);
    facecamHeight = interpolate(springLeft, [0, 1], [1080, 980]);
    facecamRadius = interpolate(springLeft, [0, 1], [0, 24]);
    // Calibrated SaN chest-up centering in 580x980 container
    facecamVideoTranslate = "translate(-681px, -85px) scale(1.05)";
  }

  // ---------------------------------------------------------------------------
  // 2. RIGHT-SIDE SCREENER BOX SPRING & ENTRY (Frames 198+)
  // ---------------------------------------------------------------------------
  const screenerSpring = spring({
    frame: frame - 198,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });
  const screenerOpacity = interpolate(screenerSpring, [0, 1], [0, 1]);
  const screenerTranslateY = interpolate(screenerSpring, [0, 1], [60, 0]);

  // Viewport dimensions
  const viewWidth = 1180;
  const viewHeight = 926; // 980 total - 54 titlebar
  const viewCenterX = viewWidth / 2; // 590
  const viewCenterY = viewHeight / 2; // 463

  // Active scene mode:
  // Scene 1 (YoY): frames 198 - 703
  // Scene 2 (QoQ): frames 703 - 1995
  const isYoYActive = frame < 703;

  // ---------------------------------------------------------------------------
  // 3. DETERMINISTIC CAMERA FRAMING & CENTERING FORMULA
  // ---------------------------------------------------------------------------
  // (a) YoY Camera:
  // Smooth zoom into Mar 2023 & Mar 2024 as SaN speaks of the 574 Cr -> 799 Cr growth
  const yoyZoomProgress = interpolate(frame, [198, 476, 635], [0, 0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const yoyScale = interpolate(
    yoyZoomProgress,
    [0, 1],
    [SCREENER_CONFIG.yoy.camera.baseScale, SCREENER_CONFIG.yoy.camera.zoomScale]
  );
  // Center (targetX, targetY) exactly in viewport center
  const yoyTranslateX = viewCenterX - SCREENER_CONFIG.yoy.camera.targetX * yoyScale;
  const yoyTranslateY = viewCenterY - SCREENER_CONFIG.yoy.camera.targetY * yoyScale;

  // (b) QoQ Camera:
  // Phase 1 (703 - 1198): Centers first 3 quarters (Sep 2023 to Mar 2024)
  // Phase 2 (1198 - 1995): Smoothly slides rightward to FY25 collapse & -224 Cr loss
  const qoqPanSpring = spring({
    frame: frame - 1198,
    fps: 30,
    config: { damping: 20, stiffness: 75 },
  });
  const qoqScale = interpolate(
    qoqPanSpring,
    [0, 1],
    [SCREENER_CONFIG.qoq.camera_golden.scale, SCREENER_CONFIG.qoq.camera_collapse.scale]
  );
  const qoqTargetX = interpolate(
    qoqPanSpring,
    [0, 1],
    [SCREENER_CONFIG.qoq.camera_golden.targetX, SCREENER_CONFIG.qoq.camera_collapse.targetX]
  );
  const qoqTargetY = interpolate(
    qoqPanSpring,
    [0, 1],
    [SCREENER_CONFIG.qoq.camera_golden.targetY, SCREENER_CONFIG.qoq.camera_collapse.targetY]
  );
  const qoqTranslateX = viewCenterX - qoqTargetX * qoqScale;
  const qoqTranslateY = viewCenterY - qoqTargetY * qoqScale;

  // ---------------------------------------------------------------------------
  // 4. ANIMATED HIGHLIGHT PROGRESS TRACKERS (Quantized to Faster-Whisper Words)
  // ---------------------------------------------------------------------------
  // (a) YoY: FY23 574 Cr (starts frame 476, finishes frame 492)
  const fy23Progress = interpolate(frame, [476, 492], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (b) YoY: FY24 799 Cr All-Time Peak (starts frame 635, finishes frame 650)
  const fy24Progress = interpolate(frame, [635, 650], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (c) QoQ: First 3 cols (>200 Cr run) (starts frame 703, finishes frame 722)
  const first3Progress = interpolate(frame, [703, 722], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (d) QoQ: Mar 2024 (208 Cr) (starts frame 1406, finishes frame 1422)
  const mar24Progress = interpolate(frame, [1406, 1422], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (e) QoQ: Jun 2024 crash to 26 Cr (starts frame 1528, finishes frame 1544)
  const jun24Progress = interpolate(frame, [1528, 1544], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (f) QoQ: Sep 2024 drop to 13 Cr (starts frame 1653, finishes frame 1668)
  const sep24Progress = interpolate(frame, [1653, 1668], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (g) QoQ: Jun 2025 shocking quarterly loss of -224 Cr (starts frame 1778)
  const jun25Progress = interpolate(frame, [1778, 1795], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow for the -224 Cr loss
  const lossPulse =
    frame >= 1778 ? 1 + Math.sin((frame - 1778) * 0.25) * 0.15 : 1;

  // ---------------------------------------------------------------------------
  // 5. METRIC CARDS ENTRANCE (NIM: 7.7%, ROA: ~2.0%, Stock: > ₹84)
  // ---------------------------------------------------------------------------
  const nimSpring = spring({
    frame: frame - 875,
    fps: 30,
    config: { damping: 16, stiffness: 110 },
  });
  const roaSpring = spring({
    frame: frame - 971,
    fps: 30,
    config: { damping: 16, stiffness: 110 },
  });
  const stockSpring = spring({
    frame: frame - 1084,
    fps: 30,
    config: { damping: 16, stiffness: 110 },
  });
  const metricCardsOpacity = interpolate(frame, [1180, 1205], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // 6. MICRO-HAPTIC SFX CUES
  // ---------------------------------------------------------------------------
  const sfxCues: SFXCue[] = [
    { frame: 198, type: "whoosh", volume: 0.6 },
    { frame: 476, type: "click", volume: 0.7 },
    { frame: 635, type: "stamp", volume: 0.8 },
    { frame: 703, type: "whoosh", volume: 0.6 },
    { frame: 720, type: "click", volume: 0.7 },
    { frame: 875, type: "custom", soundFile: "sfx/pop.wav", volume: 0.7 },
    { frame: 971, type: "custom", soundFile: "sfx/pop.wav", volume: 0.7 },
    { frame: 1084, type: "custom", soundFile: "sfx/cash_chime.wav", volume: 0.7 },
    { frame: 1198, type: "whoosh", volume: 0.75 },
    { frame: 1406, type: "click", volume: 0.65 },
    { frame: 1528, type: "custom", soundFile: "sfx/fracture.wav", volume: 0.8 },
    { frame: 1653, type: "custom", soundFile: "sfx/pop.wav", volume: 0.75 },
    { frame: 1778, type: "boom", volume: 0.9 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F7F6F2",
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* =======================================================================
          MASTER AUDIO TRACK & SFX PLAYER
          ======================================================================= */}
      <Audio src={staticFile("video/esfb_screener1_audio.wav")} volume={1.0} />
      <SFXPlayer cues={sfxCues} />

      {/* =======================================================================
          LAYER 1: PERSISTENT SINGLE <VIDEO> FACECAM
          ======================================================================= */}
      <div
        style={{
          position: "absolute",
          left: facecamLeft,
          top: facecamTop,
          width: facecamWidth,
          height: facecamHeight,
          borderRadius: facecamRadius,
          overflow: "hidden",
          zIndex: 20,
          boxShadow:
            facecamRadius > 0
              ? "0 20px 45px -10px rgba(15, 23, 42, 0.18), 0 0 1px rgba(15, 23, 42, 0.25)"
              : "none",
          border:
            facecamRadius > 0
              ? "2px solid rgba(255, 255, 255, 0.8)"
              : "none",
          transition: "border-radius 0.2s ease",
        }}
      >
        <Video
          src={staticFile("video/esfb_screener1_facecam.mp4")}
          muted={true}
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            transform: facecamVideoTranslate,
            transformOrigin: "top left",
          }}
        />

        {/* Presenter Name Badge (Only in side container) */}
        {facecamRadius > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              backgroundColor: "rgba(15, 23, 42, 0.82)",
              backdropFilter: "blur(8px)",
              padding: "8px 16px",
              borderRadius: 12,
              border: "1px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#10B981",
                boxShadow: "0 0 8px #10B981",
              }}
            />
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              SaN Forensic Lens
            </span>
          </div>
        )}
      </div>

      {/* =======================================================================
          LAYER 2: BIGGER SCREENER BOX (RIGHT SIDE)
          ======================================================================= */}
      {frame >= 198 && (
        <div
          style={{
            position: "absolute",
            left: 680,
            top: 50,
            width: 1180,
            height: 980,
            borderRadius: 24,
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 25px 50px -12px rgba(15, 23, 42, 0.15), 0 0 1px rgba(15, 23, 42, 0.2)",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
            opacity: screenerOpacity,
            transform: `translateY(${screenerTranslateY}px)`,
          }}
        >
          {/* -------------------------------------------------------------------
              Screener Browser Window Title Bar
              ------------------------------------------------------------------- */}
          <div
            style={{
              height: 54,
              backgroundColor: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              userSelect: "none",
            }}
          >
            {/* Window Controls (Mac style) */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#EF4444",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                }}
              />
            </div>

            {/* URL Search Pill */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 8,
                padding: "6px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#0F172A",
                  letterSpacing: "-0.01em",
                }}
              >
                screener.in
              </span>
              <span style={{ fontSize: 13, color: "#94A3B8" }}>/</span>
              <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>
                company / EQUITASBNK / {isYoYActive ? "profit-loss" : "quarters"}
              </span>
            </div>

            {/* Statement Status Pill */}
            <div
              style={{
                backgroundColor: isYoYActive
                  ? "rgba(16, 185, 129, 0.1)"
                  : frame >= 1198
                  ? "rgba(239, 68, 68, 0.12)"
                  : "rgba(59, 130, 246, 0.1)",
                color: isYoYActive
                  ? "#059669"
                  : frame >= 1198
                  ? "#DC2626"
                  : "#2563EB",
                padding: "4px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {isYoYActive ? (
                <>
                  <Sparkles size={13} />
                  <span>Annual P&L (Golden Era)</span>
                </>
              ) : frame >= 1198 ? (
                <>
                  <AlertTriangle size={13} />
                  <span>FY25 Quarterly Crash</span>
                </>
              ) : (
                <>
                  <Activity size={13} />
                  <span>Quarterly Results (QoQ)</span>
                </>
              )}
            </div>
          </div>

          {/* -------------------------------------------------------------------
              Screener Image Viewport with Dynamic Pan & Zoom
              ------------------------------------------------------------------- */}
          <div
            style={{
              flex: 1,
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#FAFAFA",
            }}
          >
            {/* SCENE 1: YoY STATEMENT (Frames 198 - 703) */}
            {isYoYActive && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 1740,
                  height: 764,
                  transform: `translate(${yoyTranslateX}px, ${yoyTranslateY}px) scale(${yoyScale})`,
                  transformOrigin: "top left",
                  transition: "transform 0.05s linear",
                }}
              >
                <Img
                  src={staticFile("images/esfb_screener_yoy_799.png")}
                  style={{
                    width: 1740,
                    height: 764,
                    display: "block",
                  }}
                />

                {/* Vertical Year Retention Header Boxes */}
                <div
                  style={{
                    position: "absolute",
                    left: SCREENER_CONFIG.yoy.header_mar23.x,
                    top: SCREENER_CONFIG.yoy.header_mar23.y,
                    width: SCREENER_CONFIG.yoy.header_mar23.w,
                    height: SCREENER_CONFIG.yoy.header_mar23.h,
                    border: "2px solid #10B981",
                    borderRadius: 6,
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: SCREENER_CONFIG.yoy.header_mar24.x,
                    top: SCREENER_CONFIG.yoy.header_mar24.y,
                    width: SCREENER_CONFIG.yoy.header_mar24.w,
                    height: SCREENER_CONFIG.yoy.header_mar24.h,
                    border: "2px solid #F59E0B",
                    borderRadius: 6,
                    backgroundColor: "rgba(245, 158, 11, 0.12)",
                    pointerEvents: "none",
                  }}
                />

                {/* Highlight FY23: ₹574 Cr */}
                {frame >= 476 && (
                  <>
                    <AnimatedStrokeBox
                      x={SCREENER_CONFIG.yoy.fy23_574.x}
                      y={SCREENER_CONFIG.yoy.fy23_574.y}
                      w={SCREENER_CONFIG.yoy.fy23_574.w}
                      h={SCREENER_CONFIG.yoy.fy23_574.h}
                      color="#10B981"
                      fillColor="rgba(16, 185, 129, 0.15)"
                      progress={fy23Progress}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: SCREENER_CONFIG.yoy.fy23_574.x - 36,
                        top: SCREENER_CONFIG.yoy.fy23_574.y + 44,
                        backgroundColor: "#10B981",
                        color: "#FFFFFF",
                        padding: "4px 8px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 700,
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
                        whiteSpace: "nowrap",
                        opacity: fy23Progress,
                        transform: `scale(${fy23Progress})`,
                        transformOrigin: "top center",
                      }}
                    >
                      FY23: ₹574 Cr
                    </div>
                  </>
                )}

                {/* Highlight FY24: ₹799 Cr (All Time Peak) */}
                {frame >= 635 && (
                  <>
                    <AnimatedStrokeBox
                      x={SCREENER_CONFIG.yoy.fy24_799.x}
                      y={SCREENER_CONFIG.yoy.fy24_799.y}
                      w={SCREENER_CONFIG.yoy.fy24_799.w}
                      h={SCREENER_CONFIG.yoy.fy24_799.h}
                      color="#F59E0B"
                      fillColor="rgba(245, 158, 11, 0.18)"
                      borderWidth={3}
                      progress={fy24Progress}
                      pulse={true}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: SCREENER_CONFIG.yoy.fy24_799.x - 32,
                        top: SCREENER_CONFIG.yoy.fy24_799.y + 44,
                        backgroundColor: "#D97706",
                        color: "#FFFFFF",
                        padding: "4px 10px",
                        borderRadius: 7,
                        fontSize: 12,
                        fontWeight: 800,
                        boxShadow: "0 6px 16px rgba(217, 119, 6, 0.45)",
                        whiteSpace: "nowrap",
                        opacity: fy24Progress,
                        transform: `scale(${fy24Progress})`,
                        transformOrigin: "top center",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Sparkles size={13} />
                      <span>★ Peak: ₹799 Cr</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* SCENE 2: QoQ STATEMENT (Frames 703 - 1995) */}
            {!isYoYActive && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 1750,
                  height: 710,
                  transform: `translate(${qoqTranslateX}px, ${qoqTranslateY}px) scale(${qoqScale})`,
                  transformOrigin: "top left",
                  transition: "transform 0.05s ease-out",
                }}
              >
                <Img
                  src={staticFile("images/esfb_screener_qoq_200cr.png")}
                  style={{
                    width: 1750,
                    height: 710,
                    display: "block",
                  }}
                />

                {/* Vertical Year/Quarter Retention Headers */}
                {frame >= 703 && frame < 1406 && (
                  <div
                    style={{
                      position: "absolute",
                      left: SCREENER_CONFIG.qoq.header_first3.x,
                      top: SCREENER_CONFIG.qoq.header_first3.y,
                      width: SCREENER_CONFIG.qoq.header_first3.w,
                      height: SCREENER_CONFIG.qoq.header_first3.h,
                      border: "2px solid #10B981",
                      borderRadius: 6,
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      pointerEvents: "none",
                    }}
                  />
                )}
                {frame >= 1528 && (
                  <div
                    style={{
                      position: "absolute",
                      left: SCREENER_CONFIG.qoq.header_jun24.x,
                      top: SCREENER_CONFIG.qoq.header_jun24.y,
                      width: SCREENER_CONFIG.qoq.header_jun24.w,
                      height: SCREENER_CONFIG.qoq.header_jun24.h,
                      border: "2px solid #F59E0B",
                      borderRadius: 6,
                      backgroundColor: "rgba(245, 158, 11, 0.12)",
                      pointerEvents: "none",
                    }}
                  />
                )}
                {frame >= 1653 && (
                  <div
                    style={{
                      position: "absolute",
                      left: SCREENER_CONFIG.qoq.header_sep24.x,
                      top: SCREENER_CONFIG.qoq.header_sep24.y,
                      width: SCREENER_CONFIG.qoq.header_sep24.w,
                      height: SCREENER_CONFIG.qoq.header_sep24.h,
                      border: "2px solid #E11D48",
                      borderRadius: 6,
                      backgroundColor: "rgba(225, 29, 72, 0.12)",
                      pointerEvents: "none",
                    }}
                  />
                )}
                {frame >= 1778 && (
                  <div
                    style={{
                      position: "absolute",
                      left: SCREENER_CONFIG.qoq.header_jun25.x,
                      top: SCREENER_CONFIG.qoq.header_jun25.y,
                      width: SCREENER_CONFIG.qoq.header_jun25.w,
                      height: SCREENER_CONFIG.qoq.header_jun25.h,
                      border: "2px solid #DC2626",
                      borderRadius: 6,
                      backgroundColor: "rgba(220, 38, 38, 0.15)",
                      pointerEvents: "none",
                    }}
                  />
                )}

                {/* Phase 1: First 3 Quarters (> 200 Cr Golden Run) */}
                {frame >= 703 && frame < 1406 && (
                  <>
                    <AnimatedStrokeBox
                      x={SCREENER_CONFIG.qoq.first3_200cr_block.x}
                      y={SCREENER_CONFIG.qoq.first3_200cr_block.y}
                      w={SCREENER_CONFIG.qoq.first3_200cr_block.w}
                      h={SCREENER_CONFIG.qoq.first3_200cr_block.h}
                      color="#10B981"
                      fillColor="rgba(16, 185, 129, 0.15)"
                      progress={first3Progress}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: SCREENER_CONFIG.qoq.first3_200cr_block.x + 20,
                        top: SCREENER_CONFIG.qoq.first3_200cr_block.y + 44,
                        backgroundColor: "#10B981",
                        color: "#FFFFFF",
                        padding: "5px 14px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        boxShadow: "0 6px 16px rgba(16, 185, 129, 0.4)",
                        whiteSpace: "nowrap",
                        opacity: first3Progress,
                        transform: `scale(${first3Progress})`,
                        transformOrigin: "top center",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Sparkles size={14} />
                      <span>Reliably Printing &gt; ₹200 Cr / Quarter</span>
                    </div>
                  </>
                )}

                {/* Phase 2: March 2024 Reference (208 Cr) */}
                {frame >= 1406 && (
                  <>
                    <AnimatedStrokeBox
                      x={SCREENER_CONFIG.qoq.mar24_208.x}
                      y={SCREENER_CONFIG.qoq.mar24_208.y}
                      w={SCREENER_CONFIG.qoq.mar24_208.w}
                      h={SCREENER_CONFIG.qoq.mar24_208.h}
                      color="#10B981"
                      fillColor="rgba(16, 185, 129, 0.12)"
                      progress={mar24Progress}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: SCREENER_CONFIG.qoq.mar24_208.x - 20,
                        top: SCREENER_CONFIG.qoq.mar24_208.y + 44,
                        backgroundColor: "#059669",
                        color: "#FFFFFF",
                        padding: "4px 8px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        opacity: mar24Progress,
                      }}
                    >
                      Mar 24: ₹208 Cr
                    </div>
                  </>
                )}

                {/* Phase 3: June 2024 Crash (26 Cr) */}
                {frame >= 1528 && (
                  <>
                    <AnimatedStrokeBox
                      x={SCREENER_CONFIG.qoq.jun24_26.x}
                      y={SCREENER_CONFIG.qoq.jun24_26.y}
                      w={SCREENER_CONFIG.qoq.jun24_26.w}
                      h={SCREENER_CONFIG.qoq.jun24_26.h}
                      color="#F59E0B"
                      fillColor="rgba(245, 158, 11, 0.2)"
                      borderWidth={3}
                      progress={jun24Progress}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: SCREENER_CONFIG.qoq.jun24_26.x - 22,
                        top: SCREENER_CONFIG.qoq.jun24_26.y + 44,
                        backgroundColor: "#D97706",
                        color: "#FFFFFF",
                        padding: "3px 8px",
                        borderRadius: 6,
                        fontSize: 10.5,
                        fontWeight: 800,
                        boxShadow: "0 4px 12px rgba(217, 119, 6, 0.4)",
                        whiteSpace: "nowrap",
                        opacity: jun24Progress,
                        transform: `scale(${jun24Progress})`,
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <ArrowDownRight size={12} />
                      <span>Jun 24: ₹26 Cr</span>
                    </div>
                  </>
                )}

                {/* Phase 4: September 2024 Drop (13 Cr) */}
                {frame >= 1653 && (
                  <>
                    <AnimatedStrokeBox
                      x={SCREENER_CONFIG.qoq.sep24_13.x}
                      y={SCREENER_CONFIG.qoq.sep24_13.y}
                      w={SCREENER_CONFIG.qoq.sep24_13.w}
                      h={SCREENER_CONFIG.qoq.sep24_13.h}
                      color="#E11D48"
                      fillColor="rgba(225, 29, 72, 0.2)"
                      borderWidth={3}
                      progress={sep24Progress}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: SCREENER_CONFIG.qoq.sep24_13.x - 18,
                        top: SCREENER_CONFIG.qoq.sep24_13.y + 44,
                        backgroundColor: "#E11D48",
                        color: "#FFFFFF",
                        padding: "3px 8px",
                        borderRadius: 6,
                        fontSize: 10.5,
                        fontWeight: 800,
                        boxShadow: "0 4px 12px rgba(225, 29, 72, 0.4)",
                        whiteSpace: "nowrap",
                        opacity: sep24Progress,
                        transform: `scale(${sep24Progress})`,
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <ArrowDownRight size={12} />
                      <span>Sep 24: ₹13 Cr</span>
                    </div>
                  </>
                )}

                {/* Phase 5: Mid 2025 Shock Loss (-224 Cr) */}
                {frame >= 1778 && (
                  <>
                    <AnimatedStrokeBox
                      x={SCREENER_CONFIG.qoq.jun25_loss_224.x}
                      y={SCREENER_CONFIG.qoq.jun25_loss_224.y}
                      w={SCREENER_CONFIG.qoq.jun25_loss_224.w}
                      h={SCREENER_CONFIG.qoq.jun25_loss_224.h}
                      color="#DC2626"
                      fillColor="rgba(220, 38, 38, 0.25)"
                      borderWidth={4}
                      progress={jun25Progress}
                      pulse={true}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: SCREENER_CONFIG.qoq.jun25_loss_224.x - 55,
                        top: SCREENER_CONFIG.qoq.jun25_loss_224.y + 44,
                        backgroundColor: "#B91C1C",
                        color: "#FFFFFF",
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 900,
                        boxShadow: "0 8px 24px rgba(185, 28, 28, 0.55)",
                        whiteSpace: "nowrap",
                        opacity: jun25Progress,
                        transform: `scale(${jun25Progress * lossPulse})`,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <AlertTriangle size={15} />
                      <span>SHOCK LOSS: -₹224 Cr</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =======================================================================
          LAYER 3: FLOATING METRIC CARDS (NIM, ROA, STOCK CRUISING)
          (Active between frames 866 and 1198)
          ======================================================================= */}
      {frame >= 866 && frame < 1205 && (
        <div
          style={{
            position: "absolute",
            bottom: 110,
            left: 710,
            display: "flex",
            gap: 20,
            zIndex: 30,
            opacity: metricCardsOpacity,
          }}
        >
          {/* Card 1: NIM 7.7% */}
          {frame >= 875 && (
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(12px)",
                padding: "16px 22px",
                borderRadius: 16,
                border: "1px solid rgba(16, 185, 129, 0.3)",
                boxShadow: "0 16px 32px rgba(15, 23, 42, 0.12)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                transform: `scale(${nimSpring})`,
                opacity: nimSpring,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#059669",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <Percent size={14} />
                <span>Net Interest Margin</span>
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                }}
              >
                7.7%
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#059669",
                    marginLeft: 6,
                  }}
                >
                  (Peak High)
                </span>
              </div>
            </div>
          )}

          {/* Card 2: ROA ~2.0% */}
          {frame >= 971 && (
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(12px)",
                padding: "16px 22px",
                borderRadius: 16,
                border: "1px solid rgba(59, 130, 246, 0.3)",
                boxShadow: "0 16px 32px rgba(15, 23, 42, 0.12)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                transform: `scale(${roaSpring})`,
                opacity: roaSpring,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#2563EB",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <Activity size={14} />
                <span>Return On Asset</span>
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                }}
              >
                ~2.0%
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#2563EB",
                    marginLeft: 6,
                  }}
                >
                  (Healthy)
                </span>
              </div>
            </div>
          )}

          {/* Card 3: Stock > ₹84 */}
          {frame >= 1084 && (
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(12px)",
                padding: "16px 22px",
                borderRadius: 16,
                border: "1px solid rgba(245, 158, 11, 0.35)",
                boxShadow: "0 16px 32px rgba(15, 23, 42, 0.12)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                transform: `scale(${stockSpring})`,
                opacity: stockSpring,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#D97706",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <TrendingUp size={14} />
                <span>Stock Cruising</span>
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                }}
              >
                &gt; ₹84
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#D97706",
                    marginLeft: 6,
                  }}
                >
                  (All-Time Highs)
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =======================================================================
          CALIBRATION HUD (Optional Overlay for Local Studio Tuning)
          ======================================================================= */}
      {SCREENER_CONFIG.SHOW_CALIBRATION_HUD && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            color: "#FFFFFF",
            padding: "14px 20px",
            borderRadius: 12,
            fontFamily: "monospace",
            fontSize: 12,
            zIndex: 100,
            boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.2)",
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontWeight: 800, color: "#10B981", fontSize: 13, marginBottom: 4 }}>
            🛠️ SCREENER CALIBRATION HUD (localhost:3000)
          </div>
          <div>Frame: <span style={{ color: "#FBBF24" }}>{frame}</span> / 1995 ({(frame / 30).toFixed(2)}s)</div>
          <div>Active Statement: <span style={{ color: "#38BDF8" }}>{isYoYActive ? "YoY Annual" : "QoQ Quarterly"}</span></div>
          <div>Target: ({isYoYActive ? SCREENER_CONFIG.yoy.camera.targetX : qoqTargetX.toFixed(0)}, {isYoYActive ? SCREENER_CONFIG.yoy.camera.targetY : qoqTargetY.toFixed(0)})</div>
          <div style={{ marginTop: 6, fontSize: 11, color: "#94A3B8" }}>
            Tweak `SCREENER_CONFIG` in `EquitasSFB_Screener_Part1.tsx` to shift boxes in real-time.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
