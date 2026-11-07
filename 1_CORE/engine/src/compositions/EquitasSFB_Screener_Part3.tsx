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
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
} from "lucide-react";

/**
 * ============================================================================
 * SCREENER 3 HIGHLIGHT CONFIGURATION & CALIBRATION MAP (THE PHOENIX REBOUND)
 * ============================================================================
 * SaN can tweak these coordinates directly here or inspect them live in
 * Remotion Studio at http://localhost:3000!
 *
 * Image: esfb_screener_qoq_200cr.png (1750 x 710 px)
 */
export const SCREENER3_CONFIG = {
  // Set to true to inspect live coordinates & bounding boxes in Remotion Studio
  SHOW_CALIBRATION_HUD: false,

  // Camera framing (focuses on Dec 2025 to Sep 2026 columns and NPA rows)
  camera: {
    targetX: 1470, // Centers Dec 2025 to Sep 2026
    targetY: 410,  // Centers between Headers (y~190) and NPA rows (y~610)
    scale: 1.25,
  },

  // 1. Net Profit Recovery Highlights
  // Dec 2025: 90 Cr
  dec25_90: {
    x: 1325,
    y: 498,
    w: 50,
    h: 38,
    label: "Dec 25: ₹90 Cr",
  },
  // Mar 2026: 213 Cr
  mar26_213: {
    x: 1435,
    y: 498,
    w: 52,
    h: 38,
    label: "Mar 26: ₹213 Cr",
  },
  // Jun 2026: 184 Cr
  jun26_184: {
    x: 1545,
    y: 498,
    w: 52,
    h: 38,
    label: "Jun 26: ₹184 Cr",
  },
  // Sep 2026: 218 Cr (All-Time Record Peak)
  sep26_218: {
    x: 1655,
    y: 498,
    w: 58,
    h: 38,
    label: "★ Peak: ₹218 Cr",
  },

  // 2. Asset Quality (NPA) Highlights in Sep 2026
  // Gross NPA %: 2.29%
  sep26_gnpa: {
    x: 1648,
    y: 566,
    w: 68,
    h: 34,
    label: "Gross NPA: 2.29%",
  },
  // Net NPA %: 0.70%
  sep26_nnpa: {
    x: 1648,
    y: 598,
    w: 68,
    h: 34,
    label: "Net NPA: 0.70%",
  },

  // 3. Vertical Year Retention Headers
  header_dec25: { x: 1320, y: 178, w: 60, h: 28 },
  header_mar26: { x: 1430, y: 178, w: 60, h: 28 },
  header_jun26: { x: 1540, y: 178, w: 60, h: 28 },
  header_sep26: { x: 1650, y: 178, w: 65, h: 28 },
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
 * EquitasSFB_Screener_Part3:
 * Master motion graphics composition for Equitas Small Finance Bank - Screener Part 3 (The Phoenix Rebound).
 * Source Video: "D:\QuickShare\Equitas SFB\Capcut\ESFB - Screenr - 3.mov"
 * Duration: 1,905 frames (63.50s @ 30fps).
 */
export const EquitasSFB_Screener_Part3: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // 1. DYNAMIC FACECAM FRAMING & POSITIONING (Single Persistent <Video>)
  // ---------------------------------------------------------------------------
  // SaN starts full-screen for the hook (0 - 156f: "Now look at the Phoenix rebound...")
  // At frame 156 ("Look at what happened in recent quarters..."), springs into left_tall (580x980)
  let facecamLeft = 0;
  let facecamTop = 0;
  let facecamWidth = 1920;
  let facecamHeight = 1080;
  let facecamRadius = 0;
  let facecamVideoTranslate = "translate(0px, 0px) scale(1)";

  if (frame >= 156) {
    const springLeft = spring({
      frame: frame - 156,
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
  // 2. RIGHT-SIDE SCREENER BOX SPRING & ENTRY (Frames 156+)
  // ---------------------------------------------------------------------------
  const screenerSpring = spring({
    frame: frame - 156,
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

  // ---------------------------------------------------------------------------
  // 3. DETERMINISTIC CAMERA FRAMING & CENTERING FORMULA
  // ---------------------------------------------------------------------------
  // Camera centers target point (targetX, targetY) inside the 1180x926 viewport
  const scale = SCREENER3_CONFIG.camera.scale;
  const targetX = SCREENER3_CONFIG.camera.targetX;
  const targetY = SCREENER3_CONFIG.camera.targetY;
  const translateX = viewCenterX - targetX * scale;
  const translateY = viewCenterY - targetY * scale;

  // ---------------------------------------------------------------------------
  // 4. ANIMATED HIGHLIGHT PROGRESS TRACKERS (Quantized to Faster-Whisper Words)
  // ---------------------------------------------------------------------------
  // (a) Dec 2025: 90 Cr recovery (starts frame 249, finishes frame 265)
  const dec25Progress = interpolate(frame, [249, 265], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (b) Mar 2026: 213 Cr jump (starts frame 383, finishes frame 400)
  const mar26Progress = interpolate(frame, [383, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (c) Jun 2026: 184 Cr jump (starts frame 523, finishes frame 540)
  const jun26Progress = interpolate(frame, [523, 540], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (d) Sep 2026: 218 Cr all-time peak (starts frame 708, finishes frame 730)
  const sep26Progress = interpolate(frame, [708, 730], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (e) Sep 2026 Gross NPA: 2.29% (starts frame 1206, finishes frame 1225)
  const gnpaProgress = interpolate(frame, [1206, 1225], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (f) Sep 2026 Net NPA: 0.70% record low (starts frame 1298, finishes frame 1320)
  const nnpaProgress = interpolate(frame, [1298, 1320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (g) Total Business ₹1 Lakh Cr Milestone (starts frame 1519)
  const milestoneSpring = spring({
    frame: frame - 1519,
    fps: 30,
    config: { damping: 16, stiffness: 100 },
  });

  // (h) Final Thesis Ribbon (starts frame 1652)
  const thesisSpring = spring({
    frame: frame - 1652,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Pulsing glow for the all-time peak
  const peakPulse =
    frame >= 708 ? 1 + Math.sin((frame - 708) * 0.25) * 0.12 : 1;

  // ---------------------------------------------------------------------------
  // 5. MICRO-HAPTIC SFX CUES
  // ---------------------------------------------------------------------------
  const sfxCues: SFXCue[] = [
    { frame: 156, type: "whoosh", volume: 0.6 },
    { frame: 249, type: "custom", soundFile: "sfx/pop.wav", volume: 0.7 },
    { frame: 383, type: "custom", soundFile: "sfx/pop.wav", volume: 0.7 },
    { frame: 523, type: "custom", soundFile: "sfx/pop.wav", volume: 0.7 },
    { frame: 788, type: "custom", soundFile: "sfx/cash_chime.wav", volume: 0.8 },
    { frame: 886, type: "stamp", volume: 0.8 },
    { frame: 1223, type: "click", volume: 0.7 },
    { frame: 1353, type: "custom", soundFile: "sfx/pop.wav", volume: 0.75 },
    { frame: 1519, type: "custom", soundFile: "sfx/cinematic_impact_hit.wav", volume: 0.85 },
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
      <Audio src={staticFile("video/esfb_screener3_audio.wav")} volume={1.0} />
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
          src={staticFile("video/esfb_screener3_facecam.mp4")}
          muted={true}
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            transform: facecamVideoTranslate,
            transformOrigin: "top left",
          }}
        />

        {/* Presenter Name Badge */}
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
      {frame >= 156 && (
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
                company / EQUITASBNK / quarters
              </span>
            </div>

            {/* Statement Status Pill */}
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "#059669",
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
              <Zap size={13} />
              <span>The Phoenix Rebound (QoQ)</span>
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
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 1750,
                height: 710,
                transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
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

              {/* Vertical Year Retention Header Boxes */}
              <div
                style={{
                  position: "absolute",
                  left: SCREENER3_CONFIG.header_dec25.x,
                  top: SCREENER3_CONFIG.header_dec25.y,
                  width: SCREENER3_CONFIG.header_dec25.w,
                  height: SCREENER3_CONFIG.header_dec25.h,
                  border: "2px solid #3B82F6",
                  borderRadius: 6,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: SCREENER3_CONFIG.header_mar26.x,
                  top: SCREENER3_CONFIG.header_mar26.y,
                  width: SCREENER3_CONFIG.header_mar26.w,
                  height: SCREENER3_CONFIG.header_mar26.h,
                  border: "2px solid #8B5CF6",
                  borderRadius: 6,
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: SCREENER3_CONFIG.header_jun26.x,
                  top: SCREENER3_CONFIG.header_jun26.y,
                  width: SCREENER3_CONFIG.header_jun26.w,
                  height: SCREENER3_CONFIG.header_jun26.h,
                  border: "2px solid #10B981",
                  borderRadius: 6,
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: SCREENER3_CONFIG.header_sep26.x,
                  top: SCREENER3_CONFIG.header_sep26.y,
                  width: SCREENER3_CONFIG.header_sep26.w,
                  height: SCREENER3_CONFIG.header_sep26.h,
                  border: "2px solid #F59E0B",
                  borderRadius: 6,
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  pointerEvents: "none",
                }}
              />

              {/* Highlight 1: Dec 2025 (90 Cr Recovery) */}
              {frame >= 249 && (
                <>
                  <AnimatedStrokeBox
                    x={SCREENER3_CONFIG.dec25_90.x}
                    y={SCREENER3_CONFIG.dec25_90.y}
                    w={SCREENER3_CONFIG.dec25_90.w}
                    h={SCREENER3_CONFIG.dec25_90.h}
                    color="#3B82F6"
                    fillColor="rgba(59, 130, 246, 0.15)"
                    progress={dec25Progress}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: SCREENER3_CONFIG.dec25_90.x - 22,
                      top: SCREENER3_CONFIG.dec25_90.y + 44,
                      backgroundColor: "#2563EB",
                      color: "#FFFFFF",
                      padding: "3px 8px",
                      borderRadius: 6,
                      fontSize: 10.5,
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
                      whiteSpace: "nowrap",
                      opacity: dec25Progress,
                      transform: `scale(${dec25Progress})`,
                      transformOrigin: "top center",
                    }}
                  >
                    Dec 25: ₹90 Cr
                  </div>
                </>
              )}

              {/* Highlight 2: Mar 2026 (213 Cr Jump) */}
              {frame >= 383 && (
                <>
                  <AnimatedStrokeBox
                    x={SCREENER3_CONFIG.mar26_213.x}
                    y={SCREENER3_CONFIG.mar26_213.y}
                    w={SCREENER3_CONFIG.mar26_213.w}
                    h={SCREENER3_CONFIG.mar26_213.h}
                    color="#8B5CF6"
                    fillColor="rgba(139, 92, 246, 0.15)"
                    progress={mar26Progress}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: SCREENER3_CONFIG.mar26_213.x - 24,
                      top: SCREENER3_CONFIG.mar26_213.y + 44,
                      backgroundColor: "#7C3AED",
                      color: "#FFFFFF",
                      padding: "3px 8px",
                      borderRadius: 6,
                      fontSize: 10.5,
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(124, 58, 237, 0.4)",
                      whiteSpace: "nowrap",
                      opacity: mar26Progress,
                      transform: `scale(${mar26Progress})`,
                      transformOrigin: "top center",
                    }}
                  >
                    Mar 26: ₹213 Cr
                  </div>
                </>
              )}

              {/* Highlight 3: Jun 2026 (184 Cr Jump) */}
              {frame >= 523 && (
                <>
                  <AnimatedStrokeBox
                    x={SCREENER3_CONFIG.jun26_184.x}
                    y={SCREENER3_CONFIG.jun26_184.y}
                    w={SCREENER3_CONFIG.jun26_184.w}
                    h={SCREENER3_CONFIG.jun26_184.h}
                    color="#10B981"
                    fillColor="rgba(16, 185, 129, 0.15)"
                    progress={jun26Progress}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: SCREENER3_CONFIG.jun26_184.x - 30,
                      top: SCREENER3_CONFIG.jun26_184.y + 44,
                      backgroundColor: "#059669",
                      color: "#FFFFFF",
                      padding: "3px 8px",
                      borderRadius: 6,
                      fontSize: 10.5,
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
                      whiteSpace: "nowrap",
                      opacity: jun26Progress,
                      transform: `scale(${jun26Progress})`,
                      transformOrigin: "top center",
                    }}
                  >
                    Jun 26: ₹184 Cr
                  </div>
                </>
              )}

              {/* Highlight 4: Sep 2026 (218 Cr All-Time Record Peak!) */}
              {frame >= 708 && (
                <>
                  <AnimatedStrokeBox
                    x={SCREENER3_CONFIG.sep26_218.x}
                    y={SCREENER3_CONFIG.sep26_218.y}
                    w={SCREENER3_CONFIG.sep26_218.w}
                    h={SCREENER3_CONFIG.sep26_218.h}
                    color="#F59E0B"
                    fillColor="rgba(245, 158, 11, 0.22)"
                    borderWidth={3}
                    progress={sep26Progress}
                    pulse={true}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: SCREENER3_CONFIG.sep26_218.x - 42,
                      top: SCREENER3_CONFIG.sep26_218.y + 44,
                      backgroundColor: "#D97706",
                      color: "#FFFFFF",
                      padding: "5px 12px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 800,
                      boxShadow: "0 6px 16px rgba(217, 119, 6, 0.45)",
                      whiteSpace: "nowrap",
                      opacity: sep26Progress,
                      transform: `scale(${sep26Progress * peakPulse})`,
                      transformOrigin: "top center",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Sparkles size={14} />
                    <span>★ All-Time Peak: ₹218 Cr</span>
                  </div>
                </>
              )}

              {/* Highlight 5: Gross NPA % (2.29%) */}
              {frame >= 1206 && (
                <>
                  <AnimatedStrokeBox
                    x={SCREENER3_CONFIG.sep26_gnpa.x}
                    y={SCREENER3_CONFIG.sep26_gnpa.y}
                    w={SCREENER3_CONFIG.sep26_gnpa.w}
                    h={SCREENER3_CONFIG.sep26_gnpa.h}
                    color="#059669"
                    fillColor="rgba(5, 150, 105, 0.15)"
                    borderWidth={3}
                    progress={gnpaProgress}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: SCREENER3_CONFIG.sep26_gnpa.x - 130,
                      top: SCREENER3_CONFIG.sep26_gnpa.y + 2,
                      backgroundColor: "#059669",
                      color: "#FFFFFF",
                      padding: "3px 8px",
                      borderRadius: 6,
                      fontSize: 10.5,
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(5, 150, 105, 0.35)",
                      whiteSpace: "nowrap",
                      opacity: gnpaProgress,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <CheckCircle2 size={12} />
                    <span>Gross NPA: 2.29%</span>
                  </div>
                </>
              )}

              {/* Highlight 6: Net NPA % (0.70% Record Low) */}
              {frame >= 1298 && (
                <>
                  <AnimatedStrokeBox
                    x={SCREENER3_CONFIG.sep26_nnpa.x}
                    y={SCREENER3_CONFIG.sep26_nnpa.y}
                    w={SCREENER3_CONFIG.sep26_nnpa.w}
                    h={SCREENER3_CONFIG.sep26_nnpa.h}
                    color="#0891B2"
                    fillColor="rgba(8, 145, 178, 0.18)"
                    borderWidth={3}
                    progress={nnpaProgress}
                    pulse={true}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: SCREENER3_CONFIG.sep26_nnpa.x - 145,
                      top: SCREENER3_CONFIG.sep26_nnpa.y + 2,
                      backgroundColor: "#0891B2",
                      color: "#FFFFFF",
                      padding: "3px 8px",
                      borderRadius: 6,
                      fontSize: 10.5,
                      fontWeight: 800,
                      boxShadow: "0 4px 12px rgba(8, 145, 178, 0.4)",
                      whiteSpace: "nowrap",
                      opacity: nnpaProgress,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <ShieldCheck size={12} />
                    <span>Net NPA: 0.70% (&lt; 1%)</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          LAYER 3: FLOATING MILESTONE CARDS (1 LAKH CR & EARNINGS POWER)
          ======================================================================= */}
      {/* ₹1 Lakh Crore Business Milestone */}
      {frame >= 1519 && (
        <div
          style={{
            position: "absolute",
            bottom: 110,
            left: 710,
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 30,
            backgroundColor: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(12px)",
            padding: "16px 24px",
            borderRadius: 18,
            border: "1px solid rgba(245, 158, 11, 0.35)",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.16)",
            transform: `scale(${milestoneSpring})`,
            opacity: milestoneSpring,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#D97706",
            }}
          >
            <Award size={24} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#D97706",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Historic Bank Milestone
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "-0.02em",
              }}
            >
              Total Business &gt; ₹1,00,000 Crore
            </span>
          </div>
        </div>
      )}

      {/* Final Thesis Banner: Record Earnings Power */}
      {frame >= 1652 && (
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 710,
            zIndex: 30,
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            color: "#FFFFFF",
            backdropFilter: "blur(12px)",
            padding: "12px 20px",
            borderRadius: 14,
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 16px 36px rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            transform: `scale(${thesisSpring})`,
            opacity: thesisSpring,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 10px #10B981",
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.02em" }}>
            CREDIT CYCLE ABSORBED ✔ RECORD EARNINGS POWER
          </span>
        </div>
      )}

      {/* =======================================================================
          CALIBRATION HUD (Optional Overlay for Local Studio Tuning)
          ======================================================================= */}
      {SCREENER3_CONFIG.SHOW_CALIBRATION_HUD && (
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
            🛠️ SCREENER 3 CALIBRATION HUD (localhost:3000)
          </div>
          <div>Frame: <span style={{ color: "#FBBF24" }}>{frame}</span> / 1905 ({(frame / 30).toFixed(2)}s)</div>
          <div>Target: ({targetX}, {targetY}) | Scale: {scale}x</div>
          <div style={{ marginTop: 6, fontSize: 11, color: "#94A3B8" }}>
            Tweak `SCREENER3_CONFIG` in `EquitasSFB_Screener_Part3.tsx` to shift boxes in real-time.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
