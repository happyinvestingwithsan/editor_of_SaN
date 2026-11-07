import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  Video,
} from "remotion";
import { SFXPlayer, SFXCue } from "../motion-kit";
import { EDITORIAL_TOKENS } from "../motion-kit/theme/editorialTokens";
import { SAN_TOKENS } from "../motion-kit/theme/tokens";

export interface EquitasSFB_Intro_DraftProps {
  /** Canvas background theme: "editorial" (warm ivory checked paper) or "dark" (deep obsidian desk) */
  theme?: "editorial" | "dark";
  /** Optional video proxy source (defaults to equitas_intro_proxy.mp4) */
  videoSrc?: string;
  /** Optional master audio source (defaults to equitas_intro_audio_48k.wav) */
  audioSrc?: string;
}

/**
 * EquitasSFB_Intro_Draft:
 * Dedicated draft Remotion composition for the opening section (~25s / 745 frames)
 * of the Equitas Small Finance Bank Masterclass Intro.
 * 
 * Script Anatomy & Creative Direction:
 * - Sentence 1 (0 – 128 frames / 0.0s – 4.26s):
 *   "Something wild is happening right now in Equitas Small Finance Bank."
 *   -> SaN in full_screen presenter mode with zero graphic clutter.
 * 
 * - Sentence 2 (141 – 286 frames / 4.70s – 9.54s):
 *   "Over the last 48 hours, the stock has witnessed an absolute bloodbath."
 *   -> Smooth frame-deterministic transition (132 – 148 frames) to right_tall (30-32% facecam).
 *   -> Left side blurry dark frosted glass container fades in.
 * 
 * - Sentence 3 (292 – 632 frames / 9.72s – 21.06s):
 *   "Yes, a brutal 20% lower-circuit crash on Day 1 followed by another 14% plunge on Day 2,
 *    wiping out nearly one-third of the bank's entire valuation."
 *   -> Left side dark blur container displays equally spaced white boxes with bold black font:
 *      * Box 1 ("Day 1: -20%"): Animates in at frame 323 (SaN speaks "20%... Day 1").
 *      * Box 2 ("Day 2: -14%"): Animates in at frame 457 (SaN speaks "14%... Day 2").
 *      * Box 3 ("1/3 Valuation Wiped Out"): Animates in at frame 535 (SaN speaks "wiping out nearly one-third").
 * 
 * - Bridge / Lead-in (649 – 739 frames / 21.64s – 24.64s):
 *   "Look at the headlines flooding with financial news right now."
 *   -> Graphics hold stable on the left through frame 745.
 */
export const EquitasSFB_Intro_Draft: React.FC<EquitasSFB_Intro_DraftProps> = ({
  theme = "editorial",
  videoSrc = "video/equitas_intro_proxy.mp4",
  audioSrc = "audio/equitas_intro_audio_48k.wav",
}) => {
  const frame = useCurrentFrame();
  const isEditorial = theme === "editorial";

  // =========================================================================
  // 1. TIMING & SPRING CONSTANTS (WORD-LEVEL KINETIC SNAPPING)
  // =========================================================================
  // Sentence 1 ends at frame 128. Smooth transition to right_tall starts at frame 132.
  const transSpring = spring({
    frame: frame - 132,
    fps: 30,
    config: { damping: 20, stiffness: 110, mass: 1.0 },
  });

  // Box 1 reveals at frame 323 ("20% lower-circuit crash on Day 1")
  const box1Spring = spring({
    frame: frame - 323,
    fps: 30,
    config: { damping: 14, stiffness: 160, mass: 0.8 },
  });

  // Box 2 reveals at frame 457 ("another 14% plunge on Day 2")
  const box2Spring = spring({
    frame: frame - 457,
    fps: 30,
    config: { damping: 14, stiffness: 160, mass: 0.8 },
  });

  // Valuation Wipeout reveals at frame 535 ("wiping out nearly one-third")
  const wipeoutSpring = spring({
    frame: frame - 535,
    fps: 30,
    config: { damping: 14, stiffness: 150, mass: 0.85 },
  });

  // =========================================================================
  // 2. PERSISTENT SINGLE <Video> GEOMETRY & FRAMING
  // =========================================================================
  // SaN calibrated chest-up coordinates (580px x 980px at x=1260, y=50)
  // Default calibrated translate: translate(-681px, -85px) scale(1.05)
  const containerTop = interpolate(transSpring, [0, 1], [0, 50]);
  const containerLeft = interpolate(transSpring, [0, 1], [0, 1260]);
  const containerWidth = interpolate(transSpring, [0, 1], [1920, SAN_TOKENS.layout.longform16x9.presenterWidth]);
  const containerHeight = interpolate(transSpring, [0, 1], [1080, SAN_TOKENS.layout.longform16x9.presenterHeight]);
  const containerRadius = interpolate(transSpring, [0, 1], [0, SAN_TOKENS.layout.longform16x9.presenterBorderRadius]);
  const containerBorderAlpha = interpolate(transSpring, [0, 1], [0, 0.4]);
  const containerShadowAlpha = interpolate(transSpring, [0, 1], [0, 0.7]);

  // Video internal GPU pan & scale (Strictly persistent: never unmounted!)
  const videoTranslateX = interpolate(transSpring, [0, 1], [0, -681]);
  const videoTranslateY = interpolate(transSpring, [0, 1], [0, -85]);
  const videoScale = interpolate(transSpring, [0, 1], [1, 1.05]);

  // Left blur container entrance
  const leftStageOpacity = interpolate(transSpring, [0, 1], [0, 1]);
  const leftStageTranslateY = interpolate(transSpring, [0, 1], [25, 0]);

  // =========================================================================
  // 3. SOUND DESIGN (MICRO-HAPTIC AUDIO TRIGGERS)
  // =========================================================================
  const sfxCues: SFXCue[] = [
    { frame: 132, type: "whoosh", volume: 0.5 },
    { frame: 323, type: "stamp", volume: 0.75 },
    { frame: 457, type: "stamp", volume: 0.75 },
    { frame: 535, type: "boom", volume: 0.8 },
  ];

  // Grid styling for editorial background
  const gridSize = 40;
  const majorGrid = 200;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isEditorial
          ? EDITORIAL_TOKENS.colors.paperCanvas
          : SAN_TOKENS.colors.bgDark,
        width: 1920,
        height: 1080,
        overflow: "hidden",
        fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
        color: isEditorial
          ? EDITORIAL_TOKENS.colors.inkCharcoal
          : SAN_TOKENS.colors.textPrimary,
      }}
    >
      {/* =====================================================================
          BACKGROUND LAYER 1: Editorial Checked Canvas or Dark Studio Desk
          ===================================================================== */}
      {isEditorial ? (
        <>
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              opacity: 0.9,
            }}
          >
            <defs>
              <pattern
                id="intro-grid-minor"
                width={gridSize}
                height={gridSize}
                patternUnits="userSpaceOnUse"
              >
                <path
                  d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                  fill="none"
                  stroke={EDITORIAL_TOKENS.colors.gridLine}
                  strokeWidth="1"
                />
              </pattern>
              <pattern
                id="intro-grid-major"
                width={majorGrid}
                height={majorGrid}
                patternUnits="userSpaceOnUse"
              >
                <rect width={majorGrid} height={majorGrid} fill="url(#intro-grid-minor)" />
                <path
                  d={`M ${majorGrid} 0 L 0 0 0 ${majorGrid}`}
                  fill="none"
                  stroke={EDITORIAL_TOKENS.colors.gridMajor}
                  strokeWidth="1.5"
                />
                <path
                  d="M -5 0 L 5 0 M 0 -5 L 0 5"
                  fill="none"
                  stroke={EDITORIAL_TOKENS.colors.crosshair}
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#intro-grid-major)" />
          </svg>

          {/* Vignette desk lighting */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 45% 45%, rgba(248, 247, 243, 0) 50%, rgba(25, 20, 15, 0.05) 85%, rgba(20, 15, 10, 0.09) 100%)",
              pointerEvents: "none",
            }}
          />
        </>
      ) : (
        /* Dark Studio Ambient Glow */
        <>
          <div
            style={{
              position: "absolute",
              top: -150,
              left: 200,
              width: 700,
              height: 700,
              background: "radial-gradient(circle, rgba(185, 28, 28, 0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -150,
              right: 150,
              width: 800,
              height: 800,
              background: "radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* =====================================================================
          LAYER 2: AUDIO TRACK & SFX PLAYER
          ===================================================================== */}
      <Audio src={staticFile(audioSrc)} volume={1.0} />
      <SFXPlayer cues={sfxCues} />

      {/* =====================================================================
          LAYER 3: LEFT STAGE - BLURRY BLACK MASK CONTAINER WITH EQUALLY SPACED WHITE BOXES
          ===================================================================== */}
      {frame >= 132 && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 80,
            width: 1140,
            height: 980,
            zIndex: 15,
            opacity: leftStageOpacity,
            transform: `translate3d(0px, ${leftStageTranslateY}px, 0px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Frosted Glass / Blurry Black Mask Container */}
          <div
            style={{
              width: 1060,
              height: 920,
              backgroundColor: "rgba(10, 15, 26, 0.82)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              borderRadius: 28,
              border: "1.5px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.16)",
              padding: "44px 50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle internal red alert ambient glow */}
            <div
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 320,
                height: 320,
                background: "radial-gradient(circle, rgba(220, 38, 38, 0.22) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Container Header Badge & Ticker */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                paddingBottom: 16,
                zIndex: 2,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#EF4444",
                    boxShadow: "0 0 12px #EF4444",
                  }}
                />
                <span
                  style={{
                    fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#CBD5E1",
                  }}
                >
                  48-HOUR DRAWDOWN TIMELINE
                </span>
              </div>
              <div
                style={{
                  fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "#94A3B8",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  padding: "4px 12px",
                  borderRadius: 6,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                NSE: EQUITASBNK
              </div>
            </div>

            {/* =================================================================
                MIDDLE AREA: EQUALLY SPACED WHITE BOXES WITH BOLD BLACK FONT
                ================================================================= */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                flex: 1,
                padding: "20px 0",
                zIndex: 2,
              }}
            >
              {/* -------------------------------------------------------------
                  BOX 1: "Day 1: -20%" (Reveals at frame 323 / 10.78s)
                  ------------------------------------------------------------- */}
              <div
                style={{
                  minHeight: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {frame >= 323 ? (
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      borderRadius: 20,
                      padding: "28px 40px",
                      boxShadow:
                        "0 20px 48px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.12)",
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxSizing: "border-box",
                      opacity: interpolate(box1Spring, [0, 1], [0, 1]),
                      transform: `translate3d(0px, ${interpolate(
                        box1Spring,
                        [0, 1],
                        [36, 0]
                      )}px, 0px) scale(${interpolate(box1Spring, [0, 1], [0.94, 1.0])})`,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div
                        style={{
                          fontSize: 54,
                          fontWeight: 900,
                          color: "#000000",
                          fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                          letterSpacing: "-0.025em",
                          lineHeight: 1.05,
                        }}
                      >
                        Day 1: -20%
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#DC2626",
                          fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        LOWER-CIRCUIT FREEZE • NO BUYERS
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#FEE2E2",
                        color: "#991B1B",
                        border: "1.5px solid #FCA5A5",
                        borderRadius: 12,
                        padding: "10px 20px",
                        fontWeight: 900,
                        fontSize: 18,
                        letterSpacing: "0.08em",
                        fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span>↓</span>
                      <span>CIRCUIT LOCK</span>
                    </div>
                  </div>
                ) : (
                  /* Placeholder dashed guide */
                  <div
                    style={{
                      width: "100%",
                      height: 120,
                      borderRadius: 20,
                      border: "1.5px dashed rgba(255, 255, 255, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255, 255, 255, 0.2)",
                      fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                      fontSize: 13,
                      letterSpacing: "0.12em",
                    }}
                  >
                    [ AWAITING AUDIO CUE: DAY 1 CRASH ]
                  </div>
                )}
              </div>

              {/* Vertical Conduit Arrow 1 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 28,
                }}
              >
                <div
                  style={{
                    width: 2,
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderLeft: "2px dashed rgba(255, 255, 255, 0.4)",
                  }}
                />
              </div>

              {/* -------------------------------------------------------------
                  BOX 2: "Day 2: -14%" (Reveals at frame 457 / 15.22s)
                  ------------------------------------------------------------- */}
              <div
                style={{
                  minHeight: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {frame >= 457 ? (
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      borderRadius: 20,
                      padding: "28px 40px",
                      boxShadow:
                        "0 20px 48px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.12)",
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxSizing: "border-box",
                      opacity: interpolate(box2Spring, [0, 1], [0, 1]),
                      transform: `translate3d(0px, ${interpolate(
                        box2Spring,
                        [0, 1],
                        [36, 0]
                      )}px, 0px) scale(${interpolate(box2Spring, [0, 1], [0.94, 1.0])})`,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div
                        style={{
                          fontSize: 54,
                          fontWeight: 900,
                          color: "#000000",
                          fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                          letterSpacing: "-0.025em",
                          lineHeight: 1.05,
                        }}
                      >
                        Day 2: -14%
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#DC2626",
                          fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        CONSECUTIVE PLUNGE • 52-WEEK LOW
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#FEE2E2",
                        color: "#991B1B",
                        border: "1.5px solid #FCA5A5",
                        borderRadius: 12,
                        padding: "10px 20px",
                        fontWeight: 900,
                        fontSize: 18,
                        letterSpacing: "0.08em",
                        fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span>↓</span>
                      <span>PANIC SELL</span>
                    </div>
                  </div>
                ) : (
                  /* Placeholder dashed guide */
                  <div
                    style={{
                      width: "100%",
                      height: 120,
                      borderRadius: 20,
                      border: "1.5px dashed rgba(255, 255, 255, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255, 255, 255, 0.2)",
                      fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                      fontSize: 13,
                      letterSpacing: "0.12em",
                    }}
                  >
                    [ AWAITING AUDIO CUE: DAY 2 PLUNGE ]
                  </div>
                )}
              </div>

              {/* Vertical Conduit Arrow 2 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 28,
                }}
              >
                <div
                  style={{
                    width: 2,
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderLeft: "2px dashed rgba(255, 255, 255, 0.4)",
                  }}
                />
              </div>

              {/* -------------------------------------------------------------
                  BOX 3: "1/3 Valuation Wiped Out" (Reveals at frame 535 / 17.8s)
                  ------------------------------------------------------------- */}
              <div
                style={{
                  minHeight: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {frame >= 535 ? (
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      borderRadius: 20,
                      padding: "26px 40px",
                      boxShadow:
                        "0 22px 52px rgba(220, 38, 38, 0.22), 0 2px 6px rgba(0, 0, 0, 0.12)",
                      border: "2px solid rgba(220, 38, 38, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxSizing: "border-box",
                      opacity: interpolate(wipeoutSpring, [0, 1], [0, 1]),
                      transform: `translate3d(0px, ${interpolate(
                        wipeoutSpring,
                        [0, 1],
                        [36, 0]
                      )}px, 0px) scale(${interpolate(wipeoutSpring, [0, 1], [0.94, 1.0])})`,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: "#B91C1C",
                          fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        CUMULATIVE VALUATION DAMAGE
                      </div>
                      <div
                        style={{
                          fontSize: 44,
                          fontWeight: 950,
                          color: "#000000",
                          fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                          letterSpacing: "-0.025em",
                          lineHeight: 1.05,
                        }}
                      >
                        Nearly 1/3 Valuation Wiped Out
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 2,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 52,
                          fontWeight: 950,
                          color: "#DC2626",
                          fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                          letterSpacing: "-0.03em",
                          lineHeight: 1.0,
                        }}
                      >
                        -34%
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: "#7F1D1D",
                          fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                          letterSpacing: "0.1em",
                        }}
                      >
                        TOTAL COLLAPSE
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Placeholder dashed guide */
                  <div
                    style={{
                      width: "100%",
                      height: 120,
                      borderRadius: 20,
                      border: "1.5px dashed rgba(255, 255, 255, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255, 255, 255, 0.2)",
                      fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                      fontSize: 13,
                      letterSpacing: "0.12em",
                    }}
                  >
                    [ AWAITING AUDIO CUE: VALUATION WIPEOUT ]
                  </div>
                )}
              </div>
            </div>

            {/* Container Footer Note */}
            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.10)",
                paddingTop: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                fontSize: 12,
                color: "#64748B",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                zIndex: 2,
              }}
            >
              <div>CONFIRMED BY AUDITED NSE/BSE TRADING DATA</div>
              <div>OCTOBER 2026 SPECIAL INVESTIGATION</div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          LAYER 4: PERSISTENT SINGLE <Video> FACECAM
          Rule: Exactly ONE persistent <Video> stays mounted across 100% timeline.
          GPU transforms control container position, scale, and border-radius.
          ===================================================================== */}
      <div
        style={{
          position: "absolute",
          top: containerTop,
          left: containerLeft,
          width: containerWidth,
          height: containerHeight,
          borderRadius: containerRadius,
          overflow: "hidden",
          zIndex: 20,
          border: `2px solid rgba(255, 215, 0, ${containerBorderAlpha})`,
          boxShadow: `0 24px 60px rgba(0, 0, 0, ${containerShadowAlpha})`,
          boxSizing: "border-box",
        }}
      >
        <Video
          src={staticFile(videoSrc)}
          muted={true}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1920,
            height: 1080,
            transform: `translate3d(${videoTranslateX}px, ${videoTranslateY}px, 0px) scale(${videoScale})`,
            transformOrigin: "0 0",
            objectFit: "cover",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
