import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
  Audio,
  Easing,
  Sequence,
} from "remotion";
import {
  DynamicStrokeBox,
  ChapterSlideWipe,
  FloatingGlassCard,
} from "./components/LongFormAnnotations";

export interface JioMasterclass_Chunk01Props {
  mode?: "full_preview" | "overlay_only";
}

/**
 * Masterclass Section 1 / Take 1:
 * "The ₹30,000 Crore Spectacle vs. Retail Reality"
 *
 * Timeline: 0:00 - 1:35.633 (Frames 0 - 2869 @ 30fps)
 * Total duration: 2869 frames
 */
export const JioMasterclass_Chunk01: React.FC<JioMasterclass_Chunk01Props> = ({
  mode = "full_preview",
}) => {
  const frame = useCurrentFrame();
  const isPreview = mode === "full_preview";

  return (
    <AbsoluteFill
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: isPreview ? "#080C14" : "transparent",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', 'Montserrat', sans-serif",
      }}
    >
      {/* =========================================================================
          SCENE 1: FACECAM OPENING & STAT CARD (Frames 0 - 300 | 0.0s - 10.0s)
          ========================================================================= */}
      {/* Studio Backdrop Placeholder in Preview Mode */}
      {isPreview && frame < 300 && (
        <AbsoluteFill
          style={{
            background: "radial-gradient(circle at 35% 50%, #151E32 0%, #080C14 85%)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 120,
          }}
        >
          <div
            style={{
              padding: "16px 28px",
              borderRadius: 12,
              background: "rgba(30, 41, 59, 0.4)",
              border: "1px dashed rgba(148, 163, 184, 0.3)",
              color: "#94A3B8",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            📹 [SaN Facecam: 0:00 - 0:10 | India's Financial Spectacle]
          </div>
        </AbsoluteFill>
      )}

      {/* Floating Card: ₹30,213 Cr Record Breaking IPO */}
      <FloatingGlassCard
        startFrame={90}
        durationFrames={200}
        headline="INDIA'S LARGEST IPO EVER"
        metric="₹30,213 CR"
        subtext="Surpassing LIC (₹21,000 Cr) and Hyundai (₹27,870 Cr)"
        badge="RECORD BREAKING"
        accentColor="#EF4444"
        x={1280}
        y={180}
      />
      {isPreview && (
        <Sequence from={90} durationInFrames={30}>
          <Audio src={staticFile("sfx/pop.wav")} volume={0.4} />
        </Sequence>
      )}

      {/* =========================================================================
          SCENE 2: B-ROLL RANKING CHART PUSH-IN (Frames 300 - 840 | 10.0s - 28.0s)
          ========================================================================= */}
      {frame >= 300 && frame < 840 && isPreview && (
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0A0E1A",
          }}
        >
          {/* Continuous Slow Push-In Camera Drift (1.00 -> 1.08 over 18s) */}
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${interpolate(frame - 300, [0, 540], [1.0, 1.08], {
                easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
                extrapolateRight: "clamp",
              })})`,
              transformOrigin: "center 38%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Img
              src={staticFile("jio_assets/01_intro_headlines/02_mega_ipo_ranking_chart.png")}
              style={{
                width: 1920,
                height: 1080,
                objectFit: "contain",
              }}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* Dynamic Stroke Box highlighting Jio #1 Row (Frames 360 - 830) */}
      <DynamicStrokeBox
        startFrame={360}
        durationFrames={460}
        x={200}
        y={405}
        width={1520}
        height={90}
        color="#00E599" // Mint Green glow
        strokeWidth={3.5}
        cornerRadius={12}
        fillOpacity={0.08}
      />
      {isPreview && (
        <Sequence from={360} durationInFrames={20}>
          <Audio src={staticFile("sfx/pop.wav")} volume={0.35} />
        </Sequence>
      )}

      {/* =========================================================================
          SCENE 3: FACECAM CONTRARIAN PIVOT (Frames 840 - 1151 | 28.0s - 38.3s)
          ========================================================================= */}
      {isPreview && frame >= 840 && frame < 1151 && (
        <AbsoluteFill
          style={{
            background: "radial-gradient(circle at 40% 50%, #172036 0%, #080C14 85%)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 120,
          }}
        >
          <div
            style={{
              padding: "16px 28px",
              borderRadius: 12,
              background: "rgba(30, 41, 59, 0.4)",
              border: "1px dashed rgba(239, 68, 68, 0.4)",
              color: "#F87171",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            📹 [SaN Facecam Punch-In (+10%): "We have seen this movie before..."]
          </div>
        </AbsoluteFill>
      )}

      {/* =========================================================================
          SCENE 4: STARTUP DRAWDOWNS B-ROLL & WARNING CARDS (Frames 1151 - 1770 | 38.3s - 59.0s)
          ========================================================================= */}
      {frame >= 1151 && frame < 1770 && isPreview && (
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0A0E1A",
          }}
        >
          {/* Continuous Camera Drift (1.00 -> 1.07 over 20s) */}
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${interpolate(frame - 1151, [0, 619], [1.0, 1.07], {
                easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
                extrapolateRight: "clamp",
              })})`,
              transformOrigin: "center 48%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Img
              src={staticFile("jio_assets/01_intro_headlines/03_startup_post_listing_drawdowns.png")}
              style={{
                width: 1920,
                height: 1080,
                objectFit: "contain",
              }}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* Dynamic Stroke Box over Paytm Card (-71%) */}
      <DynamicStrokeBox
        startFrame={1200}
        durationFrames={540}
        x={170}
        y={330}
        width={495}
        height={480}
        color="#EF4444"
        strokeWidth={3.5}
        cornerRadius={16}
        fillOpacity={0.12}
      />
      {isPreview && (
        <Sequence from={1200} durationInFrames={20}>
          <Audio src={staticFile("sfx/pop.wav")} volume={0.35} />
        </Sequence>
      )}

      {/* Dynamic Stroke Box over Zomato Card (-76%) */}
      <DynamicStrokeBox
        startFrame={1280}
        durationFrames={460}
        x={712}
        y={330}
        width={495}
        height={480}
        color="#EF4444"
        strokeWidth={3.5}
        cornerRadius={16}
        fillOpacity={0.12}
      />
      {isPreview && (
        <Sequence from={1280} durationInFrames={20}>
          <Audio src={staticFile("sfx/pop.wav")} volume={0.35} />
        </Sequence>
      )}

      {/* Floating Warning Card over Drawdowns */}
      <FloatingGlassCard
        startFrame={1350}
        durationFrames={390}
        headline="POST-LISTING REALITY"
        metric="-50% TO -76%"
        subtext="Paytm, Zomato & Swiggy crashed after early anchor lock-in expired"
        badge="RETAIL HYPE TRAP"
        accentColor="#EF4444"
        x={1280}
        y={190}
      />

      {/* =========================================================================
          SCENE 5: FACECAM CORE QUESTION & DRHP TEASER (Frames 1770 - 2854 | 59.0s - 95.1s)
          ========================================================================= */}
      {isPreview && frame >= 1770 && frame < 2854 && (
        <AbsoluteFill
          style={{
            background: "radial-gradient(circle at 35% 50%, #151E32 0%, #080C14 85%)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 120,
          }}
        >
          <div
            style={{
              padding: "16px 28px",
              borderRadius: 12,
              background: "rgba(30, 41, 59, 0.4)",
              border: "1px dashed rgba(148, 163, 184, 0.3)",
              color: "#94A3B8",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            📹 [SaN Facecam: "The Billion-Dollar Question & The 400-Page Prospectus"]
          </div>
        </AbsoluteFill>
      )}

      {/* Floating Card: The 400-Page DRHP Teaser */}
      <FloatingGlassCard
        startFrame={2250}
        durationFrames={300}
        headline="AUDITED EVIDENCE"
        metric="400-PAGE DRHP"
        subtext="Dissecting the balance sheet reality before locking up capital"
        badge="FORENSIC DEEP-DIVE"
        accentColor="#FACC15"
        x={1280}
        y={210}
      />
      {isPreview && (
        <Sequence from={2250} durationInFrames={30}>
          <Audio src={staticFile("sfx/pop.wav")} volume={0.4} />
        </Sequence>
      )}

      {/* =========================================================================
          CHAPTER TRANSITION: CHAPTER 1 -> CHAPTER 2 (Frames 2854 - 2869 | 15 frames)
          ========================================================================= */}
      <ChapterSlideWipe
        startFrame={2854}
        chapterNumber={2}
        title="THE DRHP FORENSIC: ZERO OFS"
        subtitle="Why This Is NOT Another Tech Startup Exit"
        accentColor="#E8292E"
      />
      {isPreview && (
        <Sequence from={2854} durationInFrames={25}>
          <Audio src={staticFile("sfx/whoosh.wav")} volume={0.7} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
