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

/**
 * EquitasSFB_Masterclass_Intro_V2:
 * Frame-by-frame master edit of Equitas Small Finance Bank Masterclass Intro (Part 1).
 * Duration: 4,800 frames (160.00s @ 30fps).
 * 
 * SaN Editorial Master Standards:
 * - Subtle, clean, authentic LIGHT THEME (Option B: Frosted translucent glass, zero website UI clutter).
 * - Real screen recording: fall_in_tradingview.mp4 on the right corner, starts playing AFTER it slides in.
 * - Synced Day 1 (-20%) and Day 2 (-14%) white boxes with bold black font, plus animated rising -34% counter.
 * - Dynamic 4-corner news clippings (Business Standard, Indian Express, Economic Times, New Indian Express)
 *   starting at frame 731, with 52-week low spotlight at frame 1020 below chin.
 * - Cinematic AI-generated conceptual visuals with kinetic typewriter reveal for Yes Bank whisper.
 * - Category 1 Retailer box with bullets + photorealistic panicked retailer image below bullets.
 * - Frame-exact transitions to full facecam at rhetorical moments.
 * - Category 2 Framework investor sequence: box reveal -> noise rejection visual -> due diligence visual -> 3 questions one-by-one.
 * - Section 6: "In this video" with 4 golden boxes popping sequentially as lines are spoken.
 * - ZERO corner docket rulers, mock case numbers, or artificial metadata text.
 */
export const EquitasSFB_Masterclass_Intro_V2: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // 1. DYNAMIC FACECAM FRAMING & POSITIONING
  // ---------------------------------------------------------------------------
  let facecamLeft = 0;
  let facecamTop = 0;
  let facecamWidth = 1920;
  let facecamHeight = 1080;
  let facecamRadius = 0;
  let facecamVideoTranslate = "translate(0px, 0px) scale(1)";
  let facecamOpacity = 1;

  if (frame >= 1642 && frame < 2137) {
    // Category 1: SaN moves to left_tall (580x980) starting at frame 1642
    const springLeft = spring({
      frame: frame - 1642,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(springLeft, [0, 1], [0, 80]);
    facecamTop = interpolate(springLeft, [0, 1], [0, 50]);
    facecamWidth = interpolate(springLeft, [0, 1], [1920, 580]);
    facecamHeight = interpolate(springLeft, [0, 1], [1080, 980]);
    facecamRadius = interpolate(springLeft, [0, 1], [0, 24]);
    facecamVideoTranslate = "translate(-681px, -85px) scale(1.05)";
  } else if (frame >= 2137 && frame < 2256) {
    // Rhetorical pause: FULL FACECAM
    facecamLeft = 0;
    facecamTop = 0;
    facecamWidth = 1920;
    facecamHeight = 1080;
    facecamRadius = 0;
    facecamVideoTranslate = "translate(0px, 0px) scale(1)";
  } else if (frame >= 2256 && frame < 2348) {
    // Category 2 Intro: SaN on RIGHT (580x980)
    const springRight = spring({
      frame: frame - 2256,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(springRight, [0, 1], [0, 1260]);
    facecamTop = 50;
    facecamWidth = 580;
    facecamHeight = 980;
    facecamRadius = 24;
    facecamVideoTranslate = "translate(-681px, -85px) scale(1.05)";
  } else if (frame >= 2348 && frame < 2473) {
    // Noise rejection visual takes full canvas (stays till frame 2473)
    facecamOpacity = 0;
  } else if (frame >= 2473 && frame < 2540) {
    // Due diligence visual in full screen
    facecamOpacity = 0;
  } else if (frame >= 2540 && frame < 3246) {
    // Due diligence / 3 Questions: SaN on LEFT (580x980)
    const springLeftAgain = spring({
      frame: frame - 2540,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = 80;
    facecamTop = 50;
    facecamWidth = 580;
    facecamHeight = 980;
    facecamRadius = 24;
    facecamVideoTranslate = "translate(-681px, -85px) scale(1.05)";
    facecamOpacity = interpolate(springLeftAgain, [0, 1], [0, 1]);
  } else if (frame >= 3246 && frame < 3488) {
    // "Today we are going to cut through..." FULL FACECAM
    facecamLeft = 0;
    facecamTop = 0;
    facecamWidth = 1920;
    facecamHeight = 1080;
    facecamRadius = 0;
    facecamVideoTranslate = "translate(0px, 0px) scale(1)";
    facecamOpacity = 1;
  } else if (frame >= 3488 && frame < 4630) {
    // In this video (Roadmap): SaN shifted slightly left
    const springRoadmap = spring({
      frame: frame - 3488,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(springRoadmap, [0, 1], [0, 60]);
    facecamTop = interpolate(springRoadmap, [0, 1], [0, 50]);
    facecamWidth = interpolate(springRoadmap, [0, 1], [1920, 680]);
    facecamHeight = interpolate(springRoadmap, [0, 1], [1080, 980]);
    facecamRadius = interpolate(springRoadmap, [0, 1], [0, 24]);
    facecamVideoTranslate = "translate(-630px, -85px) scale(1.02)";
    facecamOpacity = 1;
  } else if (frame >= 4630) {
    // Outro: FULL FACECAM
    facecamLeft = 0;
    facecamTop = 0;
    facecamWidth = 1920;
    facecamHeight = 1080;
    facecamRadius = 0;
    facecamVideoTranslate = "translate(0px, 0px) scale(1)";
    facecamOpacity = 1;
  }

  // ---------------------------------------------------------------------------
  // 2. SFX CUES (FRAME-ACCURATE MICRO-HAPTIC AUDIO TRIGGERS)
  // ---------------------------------------------------------------------------
  const sfxCues: SFXCue[] = [
    // Section 1: Fall & Circuit shock
    { frame: 141, type: "whoosh", volume: 0.6 },
    { frame: 323, type: "stamp", volume: 0.7 }, // Day 1: -20%
    { frame: 457, type: "stamp", volume: 0.7 }, // Day 2: -14%
    { frame: 535, type: "boom", volume: 0.8 },  // 1/3 Valuation wiped out

    // Section 2: News Headlines Pop (Starting after frame 731)
    { frame: 798, type: "custom", soundFile: "sfx/pop.wav", volume: 0.7 },   // News 4 (20% tank)
    { frame: 882, type: "custom", soundFile: "sfx/pop.wav", volume: 0.7 },   // News 2 (MD resigns)
    { frame: 920, type: "custom", soundFile: "sfx/pop.wav", volume: 0.6 },   // News 3 (27% tumble)
    { frame: 950, type: "custom", soundFile: "sfx/pop.wav", volume: 0.6 },   // News 1 pop
    { frame: 1020, type: "whoosh", volume: 0.8 },                            // 52-week spotlight zoom

    // Section 3: Yes Bank Whisper
    { frame: 1201, type: "whoosh", volume: 0.8 },

    // Section 4: Category 1 Retailer Bullets
    { frame: 1642, type: "whoosh", volume: 0.7 },
    { frame: 1892, type: "click", volume: 0.7 }, // They panic
    { frame: 1931, type: "click", volume: 0.7 }, // Sell at rock bottom
    { frame: 2013, type: "stamp", volume: 0.8 }, // Don't know what's happening

    // Section 5: Category 2 Framework
    { frame: 2256, type: "whoosh", volume: 0.7 },
    { frame: 2348, type: "stamp", volume: 0.8 }, // Noise rejection visual
    { frame: 2473, type: "whoosh", volume: 0.8 }, // Due diligence visual in full screen
    { frame: 2540, type: "whoosh", volume: 0.7 }, // SaN on left + due diligence on right
    { frame: 2796, type: "click", volume: 0.7 }, // Q1
    { frame: 2903, type: "click", volume: 0.7 }, // Q2
    { frame: 3072, type: "click", volume: 0.7 }, // Q3

    // Section 6: In this video (Roadmap)
    { frame: 3488, type: "stamp", volume: 0.7 }, // Box 1
    { frame: 3674, type: "stamp", volume: 0.7 }, // Box 2
    { frame: 4117, type: "stamp", volume: 0.7 }, // Box 3
    { frame: 4234, type: "stamp", volume: 0.7 }, // Box 4
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#F7F6F2", overflow: "hidden" }}>
      {/* =======================================================================
          MASTER AUDIO TRACK & SFX PLAYER
          ======================================================================= */}
      <Audio src={staticFile("audio/equitas_intro_audio_48k.wav")} volume={1.0} />
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
          opacity: facecamOpacity,
          zIndex: 10,
          boxShadow:
            facecamRadius > 0
              ? "0 20px 45px -10px rgba(15, 23, 42, 0.18), 0 0 1px rgba(15, 23, 42, 0.25)"
              : "none",
          transition: "border-radius 0.3s ease",
        }}
      >
        <Video
          src={staticFile("video/equitas_intro_proxy.mp4")}
          muted={true}
          style={{
            width: 1920,
            height: 1080,
            transform: facecamVideoTranslate,
            transformOrigin: "top left",
          }}
        />
      </div>

      {/* =======================================================================
          SECTION 1 (135 – 640 frames / 4.5s – 21.3s)
          Over the last 48 hours... Day 1: -20% & Day 2: -14% + Rising 34% Counter
          TradingView video on RIGHT corner (wider + starts playing after entry!)
          ======================================================================= */}
      {frame >= 135 && frame < 645 && (
        <>
          {/* Right Corner: Wider TradingView Video (Starts playing at frame 165 after sliding in) */}
          {(() => {
            const chartSpring = spring({
              frame: frame - 138,
              fps: 30,
              config: { damping: 18, stiffness: 120 },
            });
            const chartTranslateX = interpolate(chartSpring, [0, 1], [450, 0]);
            const chartOpacity = interpolate(chartSpring, [0, 1], [0, 1]);

            return (
              <div
                style={{
                  position: "absolute",
                  top: 90,
                  right: 60,
                  width: 360, // Increased width as requested
                  height: 870,
                  borderRadius: 22,
                  overflow: "hidden",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid rgba(15, 23, 42, 0.08)",
                  boxShadow:
                    "0 25px 60px -12px rgba(15, 23, 42, 0.22), 0 0 1px rgba(0,0,0,0.15)",
                  zIndex: 25,
                  transform: `translateX(${chartTranslateX}px)`,
                  opacity: chartOpacity,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header Bar */}
                <div
                  style={{
                    height: 48,
                    backgroundColor: "#0F172A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 18px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 13,
                      letterSpacing: "0.1em",
                      color: "#FFFFFF",
                      textTransform: "uppercase",
                    }}
                  >
                    NSE: EQUITASBNK
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      color: "#EF4444",
                    }}
                  >
                    -34.2%
                  </span>
                </div>

                {/* Video starts playing only after frame 165 (when container has arrived) */}
                <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                  {frame >= 165 ? (
                    <Video
                      src={staticFile("video/fall_in_tradingview.mp4")}
                      muted={true}
                      startFrom={0}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Video
                      src={staticFile("video/fall_in_tradingview.mp4")}
                      muted={true}
                      startFrom={0}
                      pauseWhenBuffering={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })()}

          {/* Left Side: Frosted Glass Overlay with Day 1, Day 2 & Rising Counter */}
          {frame >= 285 && (
            <div
              style={{
                position: "absolute",
                top: 110,
                left: 60,
                width: 480,
                zIndex: 25,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Option B: Frosted Glass Header (Bigger text size as requested) */}
              <div
                style={{
                  padding: "16px 28px",
                  borderRadius: 18,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  border: "1.5px solid rgba(15, 23, 42, 0.1)",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "fit-content",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#DC2626",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: 16, // Increased text size
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#0F172A",
                  }}
                >
                  48-HOUR VALUATION COLLAPSE
                </span>
              </div>

              {/* Box 1: Day 1: -20% (Frame 323 / 10.78s) */}
              {frame >= 323 &&
                (() => {
                  const b1Spring = spring({
                    frame: frame - 323,
                    fps: 30,
                    config: { damping: 16, stiffness: 140 },
                  });
                  return (
                    <div
                      style={{
                        padding: "24px 30px",
                        borderRadius: 20,
                        backgroundColor: "#FFFFFF",
                        border: "2px solid rgba(220, 38, 38, 0.2)",
                        boxShadow:
                          "0 18px 40px -10px rgba(15, 23, 42, 0.12), 0 0 1px rgba(0,0,0,0.1)",
                        transform: `scale(${interpolate(b1Spring, [0, 1], [0.85, 1])}) translateY(${interpolate(b1Spring, [0, 1], [25, 0])}px)`,
                        opacity: interpolate(b1Spring, [0, 1], [0, 1]),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 900,
                            fontSize: 46,
                            color: "#000000",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                          }}
                        >
                          Day 1: <span style={{ color: "#DC2626" }}>-20%</span>
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: 13,
                            color: "#64748B",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginTop: 6,
                          }}
                        >
                          Lower Circuit Freeze • Zero Bids
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "8px 14px",
                          borderRadius: 10,
                          backgroundColor: "#FEE2E2",
                          color: "#991B1B",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 800,
                          fontSize: 12,
                          letterSpacing: "0.06em",
                        }}
                      >
                        CIRCUIT LOCK
                      </div>
                    </div>
                  );
                })()}

              {/* Box 2: Day 2: -14% (Frame 457 / 15.22s) */}
              {frame >= 457 &&
                (() => {
                  const b2Spring = spring({
                    frame: frame - 457,
                    fps: 30,
                    config: { damping: 16, stiffness: 140 },
                  });
                  return (
                    <div
                      style={{
                        padding: "24px 30px",
                        borderRadius: 20,
                        backgroundColor: "#FFFFFF",
                        border: "2px solid rgba(220, 38, 38, 0.2)",
                        boxShadow:
                          "0 18px 40px -10px rgba(15, 23, 42, 0.12), 0 0 1px rgba(0,0,0,0.1)",
                        transform: `scale(${interpolate(b2Spring, [0, 1], [0.85, 1])}) translateY(${interpolate(b2Spring, [0, 1], [25, 0])}px)`,
                        opacity: interpolate(b2Spring, [0, 1], [0, 1]),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 900,
                            fontSize: 46,
                            color: "#000000",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                          }}
                        >
                          Day 2: <span style={{ color: "#DC2626" }}>-14%</span>
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: 13,
                            color: "#64748B",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginTop: 6,
                          }}
                        >
                          Panic Selling • 52-Week Low
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "8px 14px",
                          borderRadius: 10,
                          backgroundColor: "#FEE2E2",
                          color: "#991B1B",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 800,
                          fontSize: 12,
                          letterSpacing: "0.06em",
                        }}
                      >
                        PANIC DUMP
                      </div>
                    </div>
                  );
                })()}

              {/* Box 3: 1/3 Valuation Wiped Out with Rising Counter to -34% (Frame 535) */}
              {frame >= 535 &&
                (() => {
                  const b3Spring = spring({
                    frame: frame - 535,
                    fps: 30,
                    config: { damping: 16, stiffness: 140 },
                  });
                  // Rising animated counter from 0 to 34%
                  const counterValue = Math.min(
                    34,
                    Math.round(
                      interpolate(frame, [535, 575], [0, 34], {
                        extrapolateRight: "clamp",
                      })
                    )
                  );

                  return (
                    <div
                      style={{
                        padding: "26px 30px", // Increased height
                        borderRadius: 20,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(20px)",
                        border: "2px solid rgba(220, 38, 38, 0.3)",
                        boxShadow: "0 16px 35px rgba(15, 23, 42, 0.1)",
                        transform: `translateY(${interpolate(b3Spring, [0, 1], [20, 0])}px)`,
                        opacity: interpolate(b3Spring, [0, 1], [0, 1]),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 950,
                            fontSize: 26, // Increased text size
                            color: "#0F172A",
                            lineHeight: 1.2,
                          }}
                        >
                          Nearly 1/3 Valuation Wiped Out
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: 13,
                            color: "#DC2626",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            marginTop: 6,
                          }}
                        >
                          ₹3,200+ Crore Market Cap Erased
                        </div>
                      </div>
                      {/* Rising counter */}
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 950,
                          fontSize: 48,
                          color: "#B91C1C",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        -{counterValue}%
                      </div>
                    </div>
                  );
                })()}
            </div>
          )}
        </>
      )}

      {/* =======================================================================
          SECTION 2 (731 – 1195 frames / 24.3s – 39.8s)
          Headlines start popping AFTER frame 731!
          Frame 798 (20% tank chunk) -> News 4
          Founder resign chunk (Frame 882) -> News 2
          Shares tumble 27% (Frame 920) -> News 3
          52-week low spotlight (Frame 1020) -> News 1 below chin!
          ======================================================================= */}
      {frame >= 731 && frame < 1076 && (
        <AbsoluteFill style={{ zIndex: 25, pointerEvents: "none" }}>
          {/* Top-Left: News 4 (Equitas SFB CEO quits... stock crates 20%) - Pops at frame 798 */}
          {frame >= 798 && (
            <div
              style={{
                position: "absolute",
                top: 60,
                left: 60,
                width: 480,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 20px 45px rgba(15, 23, 42, 0.2)",
                border: "2px solid #FFFFFF",
                transform: `scale(${interpolate(
                  spring({ frame: frame - 798, fps: 30 }),
                  [0, 1],
                  [0.8, 1]
                )})`,
                opacity: frame >= 1020 ? 0.2 : 1,
                transition: "opacity 0.4s ease",
              }}
            >
              <Img src={staticFile("assets/news 4.png")} style={{ width: "100%", display: "block" }} />
            </div>
          )}

          {/* Top-Right: News 2 (PN Vasudevan resigns over perception issue) - Pops at frame 882 */}
          {frame >= 882 && (
            <div
              style={{
                position: "absolute",
                top: 60,
                right: 60,
                width: 480,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 20px 45px rgba(15, 23, 42, 0.2)",
                border: "2px solid #FFFFFF",
                transform: `scale(${interpolate(
                  spring({ frame: frame - 882, fps: 30 }),
                  [0, 1],
                  [0.8, 1]
                )})`,
                opacity: frame >= 1020 ? 0.2 : 1,
                transition: "opacity 0.4s ease",
              }}
            >
              <Img src={staticFile("assets/news 2.png")} style={{ width: "100%", display: "block" }} />
            </div>
          )}

          {/* Bottom-Left: News 3 (Shares tumble 27% in 2 days) - Pops at frame 920 */}
          {frame >= 920 && (
            <div
              style={{
                position: "absolute",
                bottom: 60,
                left: 60,
                width: 480,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 20px 45px rgba(15, 23, 42, 0.2)",
                border: "2px solid #FFFFFF",
                transform: `scale(${interpolate(
                  spring({ frame: frame - 920, fps: 30 }),
                  [0, 1],
                  [0.8, 1]
                )})`,
                opacity: frame >= 1020 ? 0.2 : 1,
                transition: "opacity 0.4s ease",
              }}
            >
              <Img src={staticFile("assets/news 3.png")} style={{ width: "100%", display: "block" }} />
            </div>
          )}

          {/* Bottom-Right & Spotlight: News 1 (52-week data) - Pops at 950, Spotlights at 1020 */}
          {frame >= 950 &&
            (() => {
              const isSpotlight = frame >= 1020;
              const spotSpring = spring({
                frame: frame - 1020,
                fps: 30,
                config: { damping: 18, stiffness: 110 },
              });

              const targetWidth = isSpotlight ? interpolate(spotSpring, [0, 1], [480, 780]) : 480;
              const targetRight = isSpotlight ? interpolate(spotSpring, [0, 1], [60, 570]) : 60;
              const targetBottom = 50; // Keeps it strictly below SaN's chin

              return (
                <div
                  style={{
                    position: "absolute",
                    bottom: targetBottom,
                    right: targetRight,
                    width: targetWidth,
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: isSpotlight
                      ? "0 30px 80px rgba(15, 23, 42, 0.35), 0 0 0 4px #DC2626"
                      : "0 20px 45px rgba(15, 23, 42, 0.2)",
                    border: "2px solid #FFFFFF",
                    zIndex: isSpotlight ? 40 : 25,
                    transform: `scale(${interpolate(
                      spring({ frame: frame - 950, fps: 30 }),
                      [0, 1],
                      [0.8, 1]
                    )})`,
                  }}
                >
                  <Img src={staticFile("assets/news 1.png")} style={{ width: "100%", display: "block" }} />
                </div>
              );
            })()}
        </AbsoluteFill>
      )}

      {/* =======================================================================
          SECTION 3 (1201 – 1365 frames / 40.0s – 45.5s)
          Yes Bank Whisper: Image + Text moved higher with Kinetic Typewriter reveal
          ======================================================================= */}
      {frame >= 1201 && frame < 1368 && (
        <AbsoluteFill style={{ zIndex: 30, backgroundColor: "#000000" }}>
          <Img
            src={staticFile("assets/whisper_yes_bank_paranoia.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${interpolate(frame - 1201, [0, 167], [1.0, 1.05])})`,
            }}
          />

          {/* Kinetic Typewriter Caption moved higher up (bottom: 140px) */}
          <div
            style={{
              position: "absolute",
              bottom: 140, // Moved higher as requested
              left: 100,
              right: 100,
              padding: "24px 40px",
              backgroundColor: "rgba(15, 23, 42, 0.88)",
              backdropFilter: "blur(24px)",
              borderRadius: 22,
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 900,
                fontSize: 34,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {frame >= 1201 && "People "}
              {frame >= 1210 && "started "}
              {frame >= 1220 && "to "}
              {frame >= 1228 && "whisper, "}
              {frame >= 1248 && "is "}
              {frame >= 1256 && "this "}
              {frame >= 1264 && "another "}
              {frame >= 1275 && <span style={{ color: "#EF4444" }}>Yes Bank </span>}
              {frame >= 1298 && "story... "}
              {frame >= 1312 && "or "}
              {frame >= 1320 && "is "}
              {frame >= 1326 && "there "}
              {frame >= 1332 && "something "}
              {frame >= 1342 && <span style={{ color: "#FACC15" }}>broken </span>}
              {frame >= 1352 && <span style={{ color: "#FACC15" }}>inside?</span>}
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* =======================================================================
          SECTION 4 (1642 – 2137 frames / 54.7s – 71.2s)
          Category 1: Average Retail Investor Box with Bullets + 16:9 Panicked Retailer Image
          Animation onset snapped to frame 1642!
          ======================================================================= */}
      {frame >= 1642 && frame < 2137 && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 80,
            width: 1140,
            height: 980,
            zIndex: 25,
            padding: "44px 50px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(24px)",
            borderRadius: 28,
            border: "1.5px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 25px 60px -10px rgba(15, 23, 42, 0.12)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: "#FEE2E2",
                  color: "#991B1B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 900,
                }}
              >
                👤
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 950,
                    fontSize: 40,
                    color: "#0F172A",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Category 1: Retailer
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#DC2626",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  Driven Purely By Fear & Headlines
                </div>
              </div>
            </div>

            {/* Bullets List (Above) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, margin: "28px 0" }}>
              {/* Bullet 1: They panic (Frame 1892) */}
              {frame >= 1892 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transform: `translateX(${interpolate(
                      spring({ frame: frame - 1892, fps: 30 }),
                      [0, 1],
                      [30, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#DC2626",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 32,
                      color: "#0F172A",
                    }}
                  >
                    They panic
                  </span>
                </div>
              )}

              {/* Bullet 2: Sell at rock bottom (Frame 1931) */}
              {frame >= 1931 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transform: `translateX(${interpolate(
                      spring({ frame: frame - 1931, fps: 30 }),
                      [0, 1],
                      [30, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#DC2626",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 32,
                      color: "#0F172A",
                    }}
                  >
                    Sell at rock bottom
                  </span>
                </div>
              )}

              {/* Bullet 3: Don’t know whats happening (Frame 2013) */}
              {frame >= 2013 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transform: `translateX(${interpolate(
                      spring({ frame: frame - 2013, fps: 30 }),
                      [0, 1],
                      [30, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#DC2626",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 32,
                      color: "#0F172A",
                    }}
                  >
                    Don’t know what’s happening
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Below Bullets: 16:9 Panicked Retailer Image */}
          <div
            style={{
              width: "100%",
              height: 440,
              borderRadius: 20,
              overflow: "hidden",
              border: "2px solid rgba(15, 23, 42, 0.08)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
            }}
          >
            <Img
              src={staticFile("assets/panicked_retailer.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}

      {/* =======================================================================
          SECTION 5: CATEGORY 2 FRAMEWORK INVESTOR (2256 – 3246 frames)
          2256 – 2348: Box animates on left, SaN on right
          2348 – 2473: Investor pushing away media noise visual (stays till end of chunk)
          2473 – 2540: Due diligence visual in full screen ("Take a deep breath...")
          2540 – 2745: SaN on left, due diligence visual on right
          2745 – 3246: 3 Questions appear ONE BY ONE with bigger font on right
          ======================================================================= */}
      {/* 5A. Category 2 Box Animates First (2256 – 2348 frames) */}
      {frame >= 2256 && frame < 2348 && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 80,
            width: 1140,
            height: 980,
            zIndex: 25,
            padding: "50px 60px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(24px)",
            borderRadius: 28,
            border: "1.5px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 25px 60px -10px rgba(15, 23, 42, 0.12)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transform: `scale(${interpolate(
              spring({ frame: frame - 2256, fps: 30 }),
              [0, 1],
              [0.85, 1]
            )})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                backgroundColor: "#DCFCE7",
                color: "#15803D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 900,
              }}
            >
              📊
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 950,
                  fontSize: 48,
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                }}
              >
                Category 2: Framework Investor
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#15803D",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                Investor with a Proven Framework
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5B. Investor Deflecting Media Noise Visual (2348 – 2473 frames) */}
      {frame >= 2348 && frame < 2473 && (
        <AbsoluteFill style={{ zIndex: 30, backgroundColor: "#000000" }}>
          <Img
            src={staticFile("assets/investor_pushing_noise.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${interpolate(frame - 2348, [0, 125], [1.0, 1.04])})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 100,
              right: 100,
              padding: "20px 36px",
              backgroundColor: "rgba(15, 23, 42, 0.88)",
              backdropFilter: "blur(20px)",
              borderRadius: 20,
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: 30,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              "DOES NOT LISTEN TO NEWS, TELEVISION, OR MEDIA NOISE."
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* 5C. Deep Breath: Due Diligence Visual in Full Screen (2473 – 2540 frames) */}
      {frame >= 2473 && frame < 2540 && (
        <AbsoluteFill style={{ zIndex: 30, backgroundColor: "#000000" }}>
          <Img
            src={staticFile("assets/investor_due_diligence.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${interpolate(frame - 2473, [0, 67], [1.0, 1.03])})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 100,
              right: 100,
              padding: "20px 36px",
              backgroundColor: "rgba(15, 23, 42, 0.88)",
              backdropFilter: "blur(20px)",
              borderRadius: 20,
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: 30,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              "THEY TAKE A DEEP BREATH AND SIT DOWN WITH AUDITED LEDGERS."
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* 5D. SaN on Left + Due Diligence on Right Box (2540 – 2745 frames) */}
      {frame >= 2540 && frame < 2745 && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 80,
            width: 1140,
            height: 980,
            zIndex: 25,
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(15, 23, 42, 0.12)",
            border: "2px solid #FFFFFF",
          }}
        >
          <Img
            src={staticFile("assets/investor_due_diligence.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* 5E. The 3 Questions One-by-One with Bigger Font (2745 – 3246 frames) */}
      {frame >= 2745 && frame < 3246 && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 80,
            width: 1140,
            height: 980,
            zIndex: 25,
            padding: "54px 64px",
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(24px)",
            borderRadius: 28,
            border: "1.5px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 25px 60px rgba(15, 23, 42, 0.12)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 950,
                fontSize: 48,
                color: "#0F172A",
                letterSpacing: "-0.02em",
              }}
            >
              3 Simple Questions
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#15803D",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: 8,
              }}
            >
              Fundamental Due Diligence Framework
            </div>

            <div
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "rgba(15, 23, 42, 0.08)",
                margin: "36px 0",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {/* Question 1 (Frame 2796 / 93.2s) */}
              {frame >= 2796 && (
                <div
                  style={{
                    display: "flex",
                    gap: 22,
                    alignItems: "flex-start",
                    transform: `translateX(${interpolate(
                      spring({ frame: frame - 2796, fps: 30 }),
                      [0, 1],
                      [40, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      backgroundColor: "#0F172A",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: 24,
                      flexShrink: 0,
                    }}
                  >
                    1
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 34, // Bigger font as requested
                      color: "#0F172A",
                      lineHeight: 1.3,
                    }}
                  >
                    What is the real issue behind the sudden exit?
                  </div>
                </div>
              )}

              {/* Question 2 (Frame 2903 / 96.8s) */}
              {frame >= 2903 && (
                <div
                  style={{
                    display: "flex",
                    gap: 22,
                    alignItems: "flex-start",
                    transform: `translateX(${interpolate(
                      spring({ frame: frame - 2903, fps: 30 }),
                      [0, 1],
                      [40, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      backgroundColor: "#0F172A",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: 24,
                      flexShrink: 0,
                    }}
                  >
                    2
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 34, // Bigger font as requested
                      color: "#0F172A",
                      lineHeight: 1.3,
                    }}
                  >
                    Is the underlying business engine broken or stronger than ever?
                  </div>
                </div>
              )}

              {/* Question 3 (Frame 3072 / 102.4s) */}
              {frame >= 3072 && (
                <div
                  style={{
                    display: "flex",
                    gap: 22,
                    alignItems: "flex-start",
                    transform: `translateX(${interpolate(
                      spring({ frame: frame - 3072, fps: 30 }),
                      [0, 1],
                      [40, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      backgroundColor: "#0F172A",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: 24,
                      flexShrink: 0,
                    }}
                  >
                    3
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 34, // Bigger font as requested
                      color: "#0F172A",
                      lineHeight: 1.3,
                    }}
                  >
                    What does the chart say and where is smart money positioning?
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clean footnote (Redundant 200 DMA removed!) */}
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#64748B",
            }}
          >
            Audited facts over emotional media speculation.
          </div>
        </div>
      )}

      {/* =======================================================================
          SECTION 6: "In this video" (3488 – 4630 frames / 116.3s – 154.3s)
          Header: "In this video"
          4 Golden Text Boxes popping sequentially as each line is spoken!
          ======================================================================= */}
      {frame >= 3488 && frame < 4630 && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 80,
            width: 1060,
            height: 980,
            zIndex: 25,
            padding: "48px 56px",
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(24px)",
            borderRadius: 28,
            border: "1.5px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 25px 60px -10px rgba(15, 23, 42, 0.12)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 950,
                fontSize: 48,
                color: "#0F172A",
                letterSpacing: "-0.02em",
              }}
            >
              In this video
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#B45309",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: 6,
              }}
            >
              Forensic Analysis Section by Section
            </div>

            <div
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "rgba(15, 23, 42, 0.08)",
                margin: "32px 0",
              }}
            />

            {/* 4 Golden Text Boxes Pop as Lines are Spelled */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Box 1 (Frame 3488 / "First, the real story...") */}
              {frame >= 3488 && (
                <div
                  style={{
                    padding: "26px 32px",
                    borderRadius: 20,
                    backgroundColor: "rgba(254, 243, 199, 0.7)", // Golden box
                    border: "2px solid #F59E0B",
                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.12)",
                    transform: `translateX(${interpolate(
                      spring({ frame: frame - 3488, fps: 30 }),
                      [0, 1],
                      [40, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 26,
                      color: "#78350F",
                      lineHeight: 1.3,
                    }}
                  >
                    The real story behind P.N. Vasudevan's resignation and conflict of interest allegation
                  </div>
                </div>
              )}

              {/* Box 2 (Frame 3674 / "Second, the fundamental journey...") */}
              {frame >= 3674 && (
                <div
                  style={{
                    padding: "26px 32px",
                    borderRadius: 20,
                    backgroundColor: "rgba(254, 243, 199, 0.7)", // Golden box
                    border: "2px solid #F59E0B",
                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.12)",
                    transform: `translateX(${interpolate(
                      spring({ frame: frame - 3674, fps: 30 }),
                      [0, 1],
                      [40, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 26,
                      color: "#78350F",
                      lineHeight: 1.3,
                    }}
                  >
                    Fundamental journey: Why profits collapsed to -₹224 Cr loss and how the bank staged a turnaround
                  </div>
                </div>
              )}

              {/* Box 3 (Frame 4117 / "Third, the technical chart pattern...") */}
              {frame >= 4117 && (
                <div
                  style={{
                    padding: "26px 32px",
                    borderRadius: 20,
                    backgroundColor: "rgba(254, 243, 199, 0.7)", // Golden box
                    border: "2px solid #F59E0B",
                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.12)",
                    transform: `translateX(${interpolate(
                      spring({ frame: frame - 4117, fps: 30 }),
                      [0, 1],
                      [40, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 26,
                      color: "#78350F",
                      lineHeight: 1.3,
                    }}
                  >
                    The technical chart pattern, 200 DMA, and key price levels
                  </div>
                </div>
              )}

              {/* Box 4 (Frame 4234 / "And finally, at the very end...") */}
              {frame >= 4234 && (
                <div
                  style={{
                    padding: "26px 32px",
                    borderRadius: 20,
                    backgroundColor: "rgba(254, 243, 199, 0.7)", // Golden box
                    border: "2px solid #F59E0B",
                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.12)",
                    transform: `translateX(${interpolate(
                      spring({ frame: frame - 4234, fps: 30 }),
                      [0, 1],
                      [40, 0]
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                      fontSize: 26,
                      color: "#78350F",
                      lineHeight: 1.3,
                    }}
                  >
                    Past banking case studies and my personal capital stance in this bank
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Bar: Enlarged prominent typography */}
          <div
            style={{
              padding: "22px 36px",
              borderRadius: 18,
              backgroundColor: "rgba(254, 243, 199, 0.95)",
              border: "2px solid #F59E0B",
              boxShadow: "0 10px 25px rgba(245, 158, 11, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: 24, // Bigger font
                color: "#92400E",
                letterSpacing: "-0.01em",
              }}
            >
              Make sure you watch till the very end.
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 950,
                fontSize: 26, // Bigger font
                color: "#78350F",
                letterSpacing: "0.01em",
              }}
            >
              Happy Investing
            </span>
          </div>
        </div>
      )}

      {/* =======================================================================
          OUTRO PILL BADGE: SPOKEN OUTRO (4647 – 4796 frames)
          ======================================================================= */}
      {frame >= 4647 && frame < 4796 && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: "50%",
            transform: `translateX(-50%) translateY(${interpolate(
              spring({ frame: frame - 4647, fps: 30, config: { damping: 16, stiffness: 120 } }),
              [0, 1],
              [30, 0]
            )}px)`,
            padding: "18px 40px",
            backgroundColor: "rgba(15, 23, 42, 0.88)",
            backdropFilter: "blur(20px)",
            borderRadius: 999,
            border: "1.5px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: 24,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            Make sure you watch till the very end
          </span>
          <span style={{ color: "#F59E0B", fontSize: 22 }}>•</span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 950,
              fontSize: 26,
              color: "#FBBF24",
              letterSpacing: "0.02em",
            }}
          >
            Happy Investing
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
