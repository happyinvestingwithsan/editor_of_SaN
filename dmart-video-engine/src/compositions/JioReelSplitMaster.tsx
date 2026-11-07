import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  Video,
} from "remotion";

// Stage Components
import { JioReelHookStage } from "../components/jio_reel/JioReelHookStage";
import { JioReelTrapStage } from "../components/jio_reel/JioReelTrapStage";
import { JioReelDrhpStage } from "../components/jio_reel/JioReelDrhpStage";
import { JioReelBalanceSheetStage } from "../components/jio_reel/JioReelBalanceSheetStage";
import { JioReelSiliconValleyStage } from "../components/jio_reel/JioReelSiliconValleyStage";
import { JioReelDebtShredderStage } from "../components/jio_reel/JioReelDebtShredderStage";
import { JioReelOperatingStage } from "../components/jio_reel/JioReelOperatingStage";
import { JioReelValuationDuelStage } from "../components/jio_reel/JioReelValuationDuelStage";
import { JioReelRealityCatchStage } from "../components/jio_reel/JioReelRealityCatchStage";
import { JioReelGoldenRuleStage } from "../components/jio_reel/JioReelGoldenRuleStage";
import { JioReelOutroStage } from "../components/jio_reel/JioReelOutroStage";

// Caption Blocks
import captionBlocks from "../jio_reel_caption_blocks.json";

export interface JioReelSplitMasterProps {
  mode?: "full_video" | "overlay_only";
}

export const JioReelSplitMaster: React.FC<JioReelSplitMasterProps> = ({
  mode = "full_video",
}) => {
  const frame = useCurrentFrame();

  // Mode B: Full-screen motion graphics takeover intervals
  const isFullScreenTakeover =
    (frame >= 184 && frame <= 360) || // Paytm / Swiggy Trap Wall
    (frame >= 660 && frame <= 825) || // 0% OFS Shock Shield
    (frame >= 1845 && frame <= 2053) || // Jio vs Airtel Duel
    (frame >= 2655 && frame <= 2793); // 200 DMA Technical Barrier

  // Mode C: Full-screen facecam punch-in
  const isFacecamPunch = frame >= 2395 && frame <= 2520; // "Will I apply? NO."

  // Optimized Facecam positioning:
  // Seam remains at Y = 718px.
  // SaN's facecam is lifted (-600px translateY) so minimal space remains between head and seam,
  // framing SaN's face at upper center directly below the seam.
  const facecamOpacity = isFullScreenTakeover ? 0 : 1;
  const facecamHeight = isFacecamPunch ? 1920 : 1200;
  const facecamTop = isFacecamPunch ? 0 : 720;
  const videoTranslateY = isFacecamPunch ? -40 : -600;
  const videoScale = isFacecamPunch ? 1.05 : 1.0;

  // Active caption block
  const activeBlock = captionBlocks.find(
    (b) => frame >= b.start - 2 && frame <= b.end + 3
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0F17",
        width: 1080,
        height: 1920,
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* =========================================================================
          1. MASTER AUDIO & SYNCHRONIZED SOUND EFFECTS (SFX)
          ========================================================================= */}
      {/* Master Dialogue Audio Track */}
      <Audio src={staticFile("video/jio_reel_audio.wav")} volume={1.0} />

      {/* SFX: Hook Bass Drop (Frame 0) */}
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile("sfx/boom.wav")} volume={0.8} />
      </Sequence>

      {/* SFX: Jio Badge Pop (Frame 45) */}
      <Sequence from={45} durationInFrames={20}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>

      {/* SFX: Paytm/Swiggy Crash Wall Whoosh (Frame 184) */}
      <Sequence from={184} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>

      {/* SFX: Trap Stamp Slam (Frame 234) */}
      <Sequence from={234} durationInFrames={25}>
        <Audio src={staticFile("sfx/stamp.wav")} volume={0.85} />
      </Sequence>

      {/* SFX: DRHP Booklet Flight Whoosh (Frame 360) */}
      <Sequence from={360} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>

      {/* SFX: 0% OFS Audited Stamp (Frame 682) */}
      <Sequence from={682} durationInFrames={25}>
        <Audio src={staticFile("sfx/stamp.wav")} volume={0.85} />
      </Sequence>

      {/* SFX: Meta & Google Padlock Snaps (Frame 850) */}
      <Sequence from={850} durationInFrames={25}>
        <Audio src={staticFile("sfx/padlock.wav")} volume={0.7} />
      </Sequence>

      {/* SFX: Debt Prepayment Shredder Laser (Frame 1170) */}
      <Sequence from={1170} durationInFrames={25}>
        <Audio src={staticFile("sfx/fracture.wav")} volume={0.5} />
      </Sequence>

      {/* SFX: Rs 8,600 Cr Savings Cash Chime (Frame 1335) */}
      <Sequence from={1335} durationInFrames={40}>
        <Audio src={staticFile("sfx/cash_chime.wav")} volume={0.75} />
      </Sequence>

      {/* SFX: Valuation Duel Clash (Frame 1845) */}
      <Sequence from={1845} durationInFrames={30}>
        <Audio src={staticFile("sfx/impact.wav")} volume={0.8} />
      </Sequence>

      {/* SFX: Will I Apply? NO - Bass Drop (Frame 2395) */}
      <Sequence from={2395} durationInFrames={30}>
        <Audio src={staticFile("sfx/boom.wav")} volume={0.85} />
      </Sequence>

      {/* SFX: 200 DMA Technical Barrier Whoosh (Frame 2655) */}
      <Sequence from={2655} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>

      {/* SFX: Zomato, Swiggy, Paytm Brand Logos Pop (Frame 2793) */}
      <Sequence from={2793} durationInFrames={20}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.6} />
      </Sequence>

      {/* SFX: YouTube Search Typing (Frame 3180) */}
      <Sequence from={3180} durationInFrames={15}>
        <Audio src={staticFile("sfx/key_click.wav")} volume={0.6} />
      </Sequence>

      {/* SFX: Latest Video Card Reveal Bell (Frame 3343) */}
      <Sequence from={3343} durationInFrames={25}>
        <Audio src={staticFile("sfx/soft_bell.wav")} volume={0.65} />
      </Sequence>

      {/* SFX: JIO Comment Typing Click (Frame 3520) */}
      <Sequence from={3520} durationInFrames={15}>
        <Audio src={staticFile("sfx/key_click.wav")} volume={0.6} />
      </Sequence>

      {/* SFX: Link in Bio Callout Pop (Frame 3583) */}
      <Sequence from={3583} durationInFrames={20}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.65} />
      </Sequence>

      {/* SFX: Happy Investing Outro Signature Chime (Frame 3673) */}
      <Sequence from={3673} durationInFrames={50}>
        <Audio src={staticFile("sfx/cash_chime.wav")} volume={0.8} />
      </Sequence>

      {/* =========================================================================
          2. PERSISTENT FACECAM VIDEO (Full Video Mode)
          ========================================================================= */}
      {mode === "full_video" && (
        <div
          style={{
            position: "absolute",
            left: 0,
            width: 1080,
            top: facecamTop,
            height: facecamHeight,
            overflow: "hidden",
            opacity: facecamOpacity,
            transition: "opacity 0.25s ease, height 0.3s ease, top 0.3s ease",
            zIndex: isFacecamPunch ? 30 : 10,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1080,
              height: 1920,
              transform: `translateY(${videoTranslateY}px) scale(${videoScale})`,
              transformOrigin: "center center",
            }}
          >
            <Video
              src={staticFile("video/jio_reel_facecam_proxy.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Cinematic Vignette */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(11, 15, 23, 0.35) 0%, transparent 15%, transparent 80%, rgba(11, 15, 23, 0.75) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      )}

      {/* =========================================================================
          3. GLOWING DIVIDER SEAM (Top at Y=718px)
          ========================================================================= */}
      {!isFullScreenTakeover && !isFacecamPunch && (
        <div
          style={{
            position: "absolute",
            top: 718,
            left: 0,
            width: 1080,
            height: 4,
            background:
              "linear-gradient(90deg, transparent 0%, #FFB020 30%, #00D09C 70%, transparent 100%)",
            boxShadow:
              "0 0 16px rgba(0, 208, 156, 0.45), 0 0 24px rgba(255, 176, 32, 0.35)",
            zIndex: 45,
            pointerEvents: "none",
          }}
        />
      )}

      {/* =========================================================================
          4. WORD-LEVEL KINETIC CAPTIONS (Centered right on the dividing seam)
          ========================================================================= */}
      {!isFullScreenTakeover && !isFacecamPunch && activeBlock && (
        <div
          style={{
            position: "absolute",
            top: 660,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 50,
            pointerEvents: "none",
            padding: "0 28px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(11, 15, 23, 0.94)",
              backdropFilter: "blur(14px)",
              borderRadius: 22,
              padding: "12px 26px",
              border: "1.5px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
              textAlign: "center",
              maxWidth: 960,
            }}
          >
            <span
              style={{
                fontSize: 40,
                fontWeight: 800,
                lineHeight: 1.25,
                color: "#E2E8F0",
              }}
            >
              {activeBlock.words.map((w, idx) => {
                const isActive = frame >= w.start && frame <= w.end;
                const isNumberOrMoney =
                  w.word.includes("000") ||
                  w.word.includes("crore") ||
                  w.word.includes("30") ||
                  w.word.includes("27") ||
                  w.word.includes("53") ||
                  w.word.includes("200") ||
                  w.word.includes("1119");

                const highlightColor = isNumberOrMoney ? "#FFB020" : "#00D09C";

                return (
                  <span
                    key={idx}
                    style={{
                      color: isActive ? highlightColor : "#FFFFFF",
                      fontWeight: isActive ? 900 : 700,
                      transform: isActive ? "scale(1.14)" : "scale(1.0)",
                      display: "inline-block",
                      margin: "0 5px",
                      textShadow: isActive
                        ? `0 0 24px ${highlightColor}88`
                        : "0 2px 8px rgba(0,0,0,0.5)",
                    }}
                  >
                    {w.word}
                  </span>
                );
              })}
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. TOP MOTION GRAPHICS ARENA & DYNAMIC FULL-SCREEN TAKEOVERS
          ========================================================================= */}
      <JioReelHookStage startFrame={0} durationFrames={184} />
      <JioReelTrapStage startFrame={184} durationFrames={176} />
      <JioReelDrhpStage startFrame={360} durationFrames={172} />
      <JioReelBalanceSheetStage startFrame={532} durationFrames={293} />
      <JioReelSiliconValleyStage startFrame={825} durationFrames={165} />
      <JioReelDebtShredderStage startFrame={990} durationFrames={488} />
      <JioReelOperatingStage startFrame={1478} durationFrames={231} />
      <JioReelValuationDuelStage startFrame={1709} durationFrames={344} />
      <JioReelRealityCatchStage startFrame={2053} durationFrames={342} />
      <JioReelGoldenRuleStage startFrame={2395} durationFrames={768} />
      <JioReelOutroStage startFrame={3163} durationFrames={622} />
    </AbsoluteFill>
  );
};
