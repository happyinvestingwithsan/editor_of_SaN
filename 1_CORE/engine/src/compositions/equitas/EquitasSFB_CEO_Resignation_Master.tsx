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
import { EQUITAS_THEME } from "./equitasTheme";
import {
  ElephantReveal,
  FounderPortrait,
  HistoricalTimeline,
  CompanyRelationshipDiagram,
  BusinessOverlapAnimation,
  EvidenceCounter,
  InstitutionalDisclosure,
  MarketOverhangAnimation,
  PositiveNegativeSplit,
  LeadershipTransition,
  FinancialChartReveal,
} from "./components";

/**
 * EquitasSFB_CEO_Resignation_Master:
 * Autonomous Financial Documentary Masterclass Composition.
 * Total Duration: 5,420 frames (180.67s @ 30.00 fps).
 * 
 * SaN Video OS Standards Applied:
 * - Clean Editorial Light Theme Master: #F7F6F2 warm light canvas, solid white cards (#FFFFFF),
 *   high-contrast deep black typography (#0F172A), authentic Equitas Teal (#005953) & Orange (#F58220).
 * - Mobile-first font sizes: Punchy, high-legibility headings (44px–76px) and body text (18px–22px).
 * - Full stage utilization: Stage dimensions (1140px × 980px) filled with balanced, high-density editorial assets.
 * - Frame-exact acoustic word snapping from Faster-Whisper:
 *   - "Elephant in the room": frame 45–56
 *   - "Resign in the first place": frame 190–235
 *   - "2007 Microfinance" -> "2016 Bank" (660f) -> "July 2029" (815f) -> "Abrupt Oct 2026" (892f)
 *   - "Unico Housing Finance": frame 1378
 *   - "Licensed by RBI": frame 1484
 *   - "Potential Competition / Overlap": strictly at frame 1868
 *   - Zero loans (2179f), Zero lines of credit (2217f), Zero ICDs (2258f)
 *   - Board disclosure (2664f) & RBI compliance (2720f)
 *   - Market rumors (2983f) & Stock price overhang (3076f)
 *   - Active MD tenure (3580f), RBI successor (3830f), Search committee (3935f)
 *   - The million-dollar question: Strong (5017f) vs Weak (5081f)
 *   - Pre-2024 (5229f) -> Big Dip (5284f) -> Rebound (5320f)
 * - Single persistent GPU-accelerated <Video> element mounted 100% of the timeline.
 * - 30-32% Facecam real estate rule (580px × 980px, radius 24px, teal bezel).
 * - Zero corner-clutter mandate (0 fake case dockets, 0 artificial corner watermarks).
 */
export const EquitasSFB_CEO_Resignation_Master: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // 1. DYNAMIC PERSISTENT FACECAM LAYOUT & GPU FRAMING
  // ---------------------------------------------------------------------------
  // Host calibrated translation for chest-up framing in 580x980 container
  // Calibrated to center SaN with balanced shoulder margins (matching Intro_V2)
  const defaultTranslate = "translate(-625px, -85px) scale(1.04)";
  const fullScreenTranslate = "translate(0px, 0px) scale(1)";

  let facecamLeft = 0;
  let facecamTop = 0;
  let facecamWidth = 1920;
  let facecamHeight = 1080;
  let facecamRadius = 0;
  let facecamTranslate = fullScreenTranslate;
  let facecamOpacity = 1;

  // Scene 01: 0 - 245f
  if (frame < 96) {
    // 0 - 96f: Elephant silhouette reveal (Facecam hidden behind graphics)
    facecamOpacity = 0;
  } else if (frame >= 96 && frame < 190) {
    // 96 - 190f: Facecam Full Screen for "Why did MD and CEO PN Vasudevan..."
    const pushIn = interpolate(frame, [96, 190], [1.0, 1.05], {
      extrapolateRight: "clamp",
    });
    facecamLeft = 0;
    facecamTop = 0;
    facecamWidth = 1920;
    facecamHeight = 1080;
    facecamRadius = 0;
    facecamTranslate = `translate(0px, 0px) scale(${pushIn})`;
    facecamOpacity = 1;
  } else if (frame >= 190 && frame < 235) {
    // 190 - 235f: Cutaway to empty CEO chair at exact word "resign"
    facecamOpacity = 0;
  } else if (frame >= 235 && frame < 245) {
    // 235 - 245f: Return to Full Facecam for transition cadence
    facecamLeft = 0;
    facecamTop = 0;
    facecamWidth = 1920;
    facecamHeight = 1080;
    facecamRadius = 0;
    facecamTranslate = "translate(0px, 0px) scale(1.05)";
    facecamOpacity = 1;
  }
  // Scene 02: 245 - 983f -> SaN moves to RIGHT TALL (X=1260)
  else if (frame >= 245 && frame < 983) {
    const sRight = spring({
      frame: frame - 245,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(sRight, [0, 1], [0, 1260]);
    facecamTop = 50;
    facecamWidth = interpolate(sRight, [0, 1], [1920, 580]);
    facecamHeight = interpolate(sRight, [0, 1], [1080, 980]);
    facecamRadius = interpolate(sRight, [0, 1], [0, 24]);
    facecamTranslate = defaultTranslate;
    facecamOpacity = 1;
  }
  // Scene 03: 983 - 2000f -> SaN alternates to LEFT TALL (X=80)
  else if (frame >= 983 && frame < 2000) {
    const sLeft = spring({
      frame: frame - 983,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(sLeft, [0, 1], [1260, 80]);
    facecamTop = 50;
    facecamWidth = 580;
    facecamHeight = 980;
    facecamRadius = 24;
    facecamTranslate = defaultTranslate;
    facecamOpacity = 1;
  }
  // Scene 04: 2000 - 2390f -> SaN alternates to RIGHT TALL (X=1260)
  else if (frame >= 2000 && frame < 2390) {
    const sRight = spring({
      frame: frame - 2000,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(sRight, [0, 1], [80, 1260]);
    facecamTop = 50;
    facecamWidth = 580;
    facecamHeight = 980;
    facecamRadius = 24;
    facecamTranslate = defaultTranslate;
    facecamOpacity = 1;
  }
  // Scene 05: 2390 - 2806f -> SaN alternates to LEFT TALL (X=80)
  else if (frame >= 2390 && frame < 2806) {
    const sLeft = spring({
      frame: frame - 2390,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(sLeft, [0, 1], [1260, 80]);
    facecamTop = 50;
    facecamWidth = 580;
    facecamHeight = 980;
    facecamRadius = 24;
    facecamTranslate = defaultTranslate;
    facecamOpacity = 1;
  }
  // Scene 06: 2806 - 3347f -> Starts Full Facecam (2806-2920) then moves to RIGHT TALL
  else if (frame >= 2806 && frame < 2920) {
    facecamLeft = 0;
    facecamTop = 0;
    facecamWidth = 1920;
    facecamHeight = 1080;
    facecamRadius = 0;
    facecamTranslate = fullScreenTranslate;
    facecamOpacity = 1;
  } else if (frame >= 2920 && frame < 3347) {
    const sRight = spring({
      frame: frame - 2920,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(sRight, [0, 1], [0, 1260]);
    facecamTop = 50;
    facecamWidth = interpolate(sRight, [0, 1], [1920, 580]);
    facecamHeight = interpolate(sRight, [0, 1], [1080, 980]);
    facecamRadius = interpolate(sRight, [0, 1], [0, 24]);
    facecamTranslate = defaultTranslate;
    facecamOpacity = 1;
  }
  // Scene 07: 3347 - 4220f -> SaN alternates to LEFT TALL (X=80)
  else if (frame >= 3347 && frame < 4220) {
    const sLeft = spring({
      frame: frame - 3347,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(sLeft, [0, 1], [1260, 80]);
    facecamTop = 50;
    facecamWidth = 580;
    facecamHeight = 980;
    facecamRadius = 24;
    facecamTranslate = defaultTranslate;
    facecamOpacity = 1;
  }
  // Scene 08: 4220 - 5113f -> SaN moves to RIGHT TALL, then at 4840 expands to FULL FACECAM for Climax
  else if (frame >= 4220 && frame < 4840) {
    const sRight = spring({
      frame: frame - 4220,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(sRight, [0, 1], [80, 1260]);
    facecamTop = 50;
    facecamWidth = 580;
    facecamHeight = 980;
    facecamRadius = 24;
    facecamTranslate = defaultTranslate;
    facecamOpacity = 1;
  } else if (frame >= 4840 && frame < 5113) {
    // CLIMAX: Full screen facecam with subtle push-in
    const sFull = spring({
      frame: frame - 4840,
      fps: 30,
      config: { damping: 22, stiffness: 90 },
    });
    const climaxPush = interpolate(frame, [4840, 5113], [1.0, 1.06], {
      extrapolateRight: "clamp",
    });
    facecamLeft = interpolate(sFull, [0, 1], [1260, 0]);
    facecamTop = interpolate(sFull, [0, 1], [50, 0]);
    facecamWidth = interpolate(sFull, [0, 1], [580, 1920]);
    facecamHeight = interpolate(sFull, [0, 1], [980, 1080]);
    facecamRadius = interpolate(sFull, [0, 1], [24, 0]);
    facecamTranslate = `translate(0px, 0px) scale(${climaxPush})`;
    facecamOpacity = 1;
  }
  // Scene 09: 5113 - 5420f -> SaN alternates to LEFT TALL (X=80)
  else if (frame >= 5113) {
    const sLeft = spring({
      frame: frame - 5113,
      fps: 30,
      config: { damping: 20, stiffness: 100 },
    });
    facecamLeft = interpolate(sLeft, [0, 1], [0, 80]);
    facecamTop = 50;
    facecamWidth = interpolate(sLeft, [0, 1], [1920, 580]);
    facecamHeight = interpolate(sLeft, [0, 1], [1080, 980]);
    facecamRadius = interpolate(sLeft, [0, 1], [0, 24]);
    facecamTranslate = defaultTranslate;
    facecamOpacity = 1;
  }

  // ---------------------------------------------------------------------------
  // 2. STAGE GRAPHICS CONTAINER POSITIONING
  // ---------------------------------------------------------------------------
  // Canvas: Clean Editorial Light Background (#F7F6F2)
  return (
    <AbsoluteFill
      style={{
        backgroundColor: EQUITAS_THEME.colors.canvasBg,
        overflow: "hidden",
      }}
    >
      {/* =======================================================================
          A. GRAPHICS STAGE LAYER (BACKGROUND / SPLIT STAGE)
          ======================================================================= */}

      {/* SCENE 01: 0 - 245f */}
      {frame < 96 && <ElephantReveal startFrame={0} />}

      {/* Scene 01 Resignation Cutaway: Pops strictly on "resign" (190 - 235f) */}
      {frame >= 190 && frame < 235 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: EQUITAS_THEME.colors.canvasBg,
            zIndex: 40,
          }}
        >
          <Img
            src={staticFile("assets/equitas/generated_images/empty_executive_chair.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Subtle light overlay to blend */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(247, 246, 242, 0.4)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#FFFFFF",
              border: `2.5px solid ${EQUITAS_THEME.colors.warningAmber}`,
              borderRadius: 24,
              padding: "28px 56px",
              boxShadow: "0 25px 60px rgba(15, 23, 42, 0.25)",
              fontFamily: EQUITAS_THEME.fonts.display,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 16,
                letterSpacing: "3px",
                fontWeight: 800,
                color: EQUITAS_THEME.colors.warningAmber,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              CENTRAL ENIGMA
            </div>
            <div
              style={{
                fontSize: 54, // Large bold black for mobile
                fontWeight: 900,
                color: EQUITAS_THEME.colors.textPrimary,
                letterSpacing: "-0.5px",
              }}
            >
              WHY DID HE RESIGN?
            </div>
          </div>
        </div>
      )}

      {/* SCENE 02: 245 - 983f (Stage on Left: X=80, W=1140, H=980) */}
      {frame >= 245 && frame < 983 && (
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 50,
            width: 1140,
            height: 980,
            zIndex: 10,
          }}
        >
          {frame < 440 ? (
            <FounderPortrait startFrame={245} />
          ) : (
            <HistoricalTimeline startFrame={440} />
          )}
        </div>
      )}

      {/* SCENE 03: 983 - 2000f (Stage on Right: X=700, W=1140, H=980) */}
      {frame >= 983 && frame < 2000 && (
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 50,
            width: 1140,
            height: 980,
            zIndex: 10,
          }}
        >
          {frame < 1550 ? (
            <CompanyRelationshipDiagram startFrame={983} />
          ) : (
            <BusinessOverlapAnimation startFrame={1550} />
          )}
        </div>
      )}

      {/* SCENE 04: 2000 - 2390f (Stage on Left: X=80, W=1140, H=980) */}
      {frame >= 2000 && frame < 2390 && (
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 50,
            width: 1140,
            height: 980,
            zIndex: 10,
          }}
        >
          <EvidenceCounter startFrame={2000} />
        </div>
      )}

      {/* SCENE 05: 2390 - 2806f (Stage on Right: X=700, W=1140, H=980) */}
      {frame >= 2390 && frame < 2806 && (
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 50,
            width: 1140,
            height: 980,
            zIndex: 10,
          }}
        >
          <InstitutionalDisclosure startFrame={2390} />
        </div>
      )}

      {/* SCENE 06: 2806 - 3347f (Stage on Left: X=80, W=1140, H=980 after frame 2920) */}
      {frame >= 2920 && frame < 3347 && (
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 50,
            width: 1140,
            height: 980,
            zIndex: 10,
          }}
        >
          <MarketOverhangAnimation startFrame={2810} />
        </div>
      )}

      {/* SCENE 07: 3347 - 4220f (Stage on Right: X=700, W=1140, H=980) */}
      {frame >= 3347 && frame < 4220 && (
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 50,
            width: 1140,
            height: 980,
            zIndex: 10,
          }}
        >
          {frame < 3500 ? (
            <PositiveNegativeSplit activePillar="positive" startFrame={3347} />
          ) : (
            <LeadershipTransition startFrame={3500} />
          )}
        </div>
      )}

      {/* SCENE 08: 4220 - 4840f (Stage on Left: X=80, W=1140, H=980) */}
      {frame >= 4220 && frame < 4840 && (
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 50,
            width: 1140,
            height: 980,
            zIndex: 10,
          }}
        >
          <PositiveNegativeSplit activePillar="negative" startFrame={4220} />
        </div>
      )}

      {/* SCENE 08 CLIMAX QUESTION OVERLAY: 4840 - 5113f */}
      {frame >= 4840 && frame < 5113 && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            zIndex: 50,
            fontFamily: EQUITAS_THEME.fonts.display,
          }}
        >
          {/* Question Banner - Enters on "multi-million dollar question" (4845f) */}
          <div
            style={{
              background: "#FFFFFF",
              border: `2px solid ${EQUITAS_THEME.colors.cardBorderTeal}`,
              padding: "10px 28px",
              borderRadius: 30,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "3px",
              color: EQUITAS_THEME.colors.primaryTeal,
              textTransform: "uppercase",
              boxShadow: EQUITAS_THEME.shadows.card,
            }}
          >
            THE MULTI-MILLION DOLLAR QUESTION
          </div>

          <div style={{ display: "flex", gap: 24 }}>
            {/* Pill 1 - Pops strictly on "strong" (frame 5010) */}
            {frame >= 5010 && (
              <div
                style={{
                  background: "#FFFFFF",
                  border: `2.5px solid ${EQUITAS_THEME.colors.primaryTeal}`,
                  color: EQUITAS_THEME.colors.primaryTeal,
                  fontSize: 28, // Large bold mobile text
                  fontWeight: 900,
                  letterSpacing: "0.5px",
                  padding: "18px 42px",
                  borderRadius: 18,
                  boxShadow: "0 15px 35px rgba(0, 89, 83, 0.25)",
                }}
              >
                FUNDAMENTALLY STRONG?
              </div>
            )}

            {/* Pill 2 - Pops strictly on "weak" (frame 5065) */}
            {frame >= 5065 && (
              <div
                style={{
                  background: "#FFFFFF",
                  border: `2.5px solid ${EQUITAS_THEME.colors.warningAmber}`,
                  color: EQUITAS_THEME.colors.warningAmber,
                  fontSize: 28, // Large bold mobile text
                  fontWeight: 900,
                  letterSpacing: "0.5px",
                  padding: "18px 42px",
                  borderRadius: 18,
                  boxShadow: "0 15px 35px rgba(217, 119, 6, 0.25)",
                }}
              >
                OR FUNDAMENTALLY WEAK?
              </div>
            )}
          </div>
        </div>
      )}

      {/* SCENE 09: 5113 - 5420f (Stage on Right: X=700, W=1140, H=980) */}
      {frame >= 5113 && (
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 50,
            width: 1140,
            height: 980,
            zIndex: 10,
          }}
        >
          <FinancialChartReveal startFrame={5113} />
        </div>
      )}

      {/* =======================================================================
          B. SINGLE PERSISTENT GPU-ACCELERATED FACECAM CONTAINER
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
          border:
            facecamRadius > 0
              ? `2px solid ${EQUITAS_THEME.colors.primaryTeal}`
              : "none",
          boxShadow:
            facecamRadius > 0
              ? "0 20px 45px -10px rgba(15, 23, 42, 0.18), 0 0 1px rgba(15, 23, 42, 0.25)"
              : "none",
          zIndex: 30,
          backgroundColor: "#FFFFFF",
          transition: "border 0.3s ease",
        }}
      >
        <Video
          src={staticFile("video/equitas_proxy.mp4")}
          muted={true}
          style={{
            width: 1920,
            height: 1080,
            transform: facecamTranslate,
            transformOrigin: "top left",
          }}
        />
      </div>

      {/* =======================================================================
          C. MASTER UNCOMPRESSED 48kHz PCM WAV AUDIO
          ======================================================================= */}
      <Audio
        src={staticFile("audio/equitas_narration_48k.wav")}
        volume={1.0}
      />
    </AbsoluteFill>
  );
};
