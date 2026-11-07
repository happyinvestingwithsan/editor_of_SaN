import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  Video,
} from "remotion";

// 12 Scene Stage Components
import {
  Scene01_TheCrash,
  Scene02_MarketPanic,
  Scene03_PauseInvestigate,
  Scene04_CeoResignation,
  Scene05_Disclosure,
  Scene06_Fundamentals,
  Scene07_NetProfit,
  Scene08_AssetQuality,
  Scene09_BookValue,
  Scene10_PersonalInvestment,
  Scene11_FallingKnife,
  Scene12_YoutubeCTA,
} from "./scenes";

// Caption Blocks & Theme
import captionBlocksData from "../../equitas_short_blocks.json";
import { EQUITAS_THEME } from "./equitasTheme";

export interface CaptionWord {
  word: string;
  start?: number;
  end?: number;
  startFrame?: number;
  endFrame?: number;
}

export interface CaptionBlock {
  id?: string;
  text: string;
  start: number;
  end: number;
  words?: CaptionWord[];
}

const captionBlocks = captionBlocksData as CaptionBlock[];

export interface EquitasShortReelMasterProps {
  mode?: "full_video" | "overlay_only";
}

/**
 * EquitasShortReelMaster:
 * Autonomous 9:16 Vertical Short / Reel for "Equitas Small Finance Bank – 30% Crash Reality".
 * Total Duration: 2,839 frames @ 30.00 fps (94.63s).
 *
 * User Feedback Calibrations Applied:
 * 1. Mobile text sizing: All text bold, large, high-contrast, easily readable on mobile.
 * 2. Word-synced motion: All animations and reveals start strictly along with spoken words.
 * 3. Scene 04 Frame 802: CEO portrait (250px) and Unico Housing logo (330px) made big and prominent.
 * 4. Theme: Retained premium Fintech Dark Theme (#0B0F17, #171B21, Mint #00D09C, Gold #FFB020).
 * 5. Scene 07 Frame 1500: Unboxed open quarterly bar chart with large fonts (76px metric, 32px bar values).
 * 6. Scene 09 & 01 Pricing: Book Value = 57.3, Actual Price = 50 (15% discount).
 * 7. Scene 12 Frame 2336: Split layout with facecam in bottom half, transitioning to full facecam punch
 *    at frame 2800 for the final "See you in the next one" sign-off.
 */
export const EquitasShortReelMaster: React.FC<EquitasShortReelMasterProps> = ({
  mode = "full_video",
}) => {
  const frame = useCurrentFrame();

  // Mode B: Full-screen motion graphics takeover (ONLY Scene 02)
  const isFullScreenTakeover = frame >= 160 && frame < 555;

  // Mode C: Full-screen facecam punch intervals:
  // - Scene 03 (555 - 690): "Pause & Take a Breath"
  // - Scene 10 (1940 - 2090): "Personal Investment Strategy"
  // - Scene 12 Outro (2800 - 2839): "See You in the Next One" Full Facecam Sign-off
  const isFacecamPunch =
    (frame >= 555 && frame < 690) ||
    (frame >= 1940 && frame < 2090) ||
    (frame >= 2800 && frame <= 2839);

  // Presenter Facecam Transform Parameters
  const facecamOpacity = isFullScreenTakeover ? 0 : 1;
  const facecamHeight = isFacecamPunch ? 1920 : 1202;
  const facecamTop = isFacecamPunch ? 0 : 718;
  const videoTranslateY = isFacecamPunch ? -40 : -600;
  const videoScale = isFacecamPunch ? 1.05 : 1.0;

  // Active word-level caption block
  const activeBlock = captionBlocks.find(
    (b) => frame >= b.start - 2 && frame <= b.end + 2
  );

  // Dynamic subtitle positioning (top: 660px on seam bridge during split, lower-third: 1460px during punch)
  const subtitleTop = isFacecamPunch ? 1460 : 660;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0F17",
        width: 1080,
        height: 1920,
        overflow: "hidden",
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {/* =========================================================================
          1. MASTER AUDIO & SYNCHRONIZED SOUND DESIGN (SFX)
          ========================================================================= */}
      {/* Master 48kHz Dialogue Track */}
      <Audio
        src={staticFile("audio/equitas_short_narration_48k.wav")}
        volume={1.0}
      />

      {/* SFX: Scene 01 Crash Hook Bass Drop (Frame 0) */}
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile("sfx/boom.wav")} volume={0.8} />
      </Sequence>

      {/* SFX: Scene 02 Panic Whoosh (Frame 160) */}
      <Sequence from={160} durationInFrames={25}>
        <Audio src={staticFile("sfx/clean_transition_whoosh.wav")} volume={0.65} />
      </Sequence>

      {/* SFX: Scene 02 Another Bank Scam Stamp Slam (Frame 440) */}
      <Sequence from={440} durationInFrames={25}>
        <Audio src={staticFile("sfx/stamp.wav")} volume={0.85} />
      </Sequence>

      {/* SFX: Scene 03 Pause Soft Bell (Frame 555) */}
      <Sequence from={555} durationInFrames={35}>
        <Audio src={staticFile("sfx/soft_bell.wav")} volume={0.7} />
      </Sequence>

      {/* SFX: Scene 04 Fact 01 Whoosh (Frame 690) */}
      <Sequence from={690} durationInFrames={25}>
        <Audio src={staticFile("sfx/clean_transition_whoosh.wav")} volume={0.6} />
      </Sequence>

      {/* SFX: Scene 05 Disclosure Paper Shuffle (Frame 900) */}
      <Sequence from={900} durationInFrames={30}>
        <Audio src={staticFile("sfx/paper_document_shuffle.wav")} volume={0.65} />
      </Sequence>

      {/* SFX: Scene 05 Compliance Verified Stamp (Frame 1127) */}
      <Sequence from={1127} durationInFrames={25}>
        <Audio src={staticFile("sfx/stamp.wav")} volume={0.8} />
      </Sequence>

      {/* SFX: Scene 06 Diagnostic Scanner Tick (Frame 1180) */}
      <Sequence from={1180} durationInFrames={20}>
        <Audio src={staticFile("sfx/metallic_counter_tick.wav")} volume={0.5} />
      </Sequence>

      {/* SFX: Scene 07 Record Net Profit Cash Chime (Frame 1415) */}
      <Sequence from={1415} durationInFrames={40}>
        <Audio src={staticFile("sfx/cash_chime.wav")} volume={0.75} />
      </Sequence>

      {/* SFX: Scene 08 Bad Loans Drop Whoosh (Frame 1651) */}
      <Sequence from={1651} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>

      {/* SFX: Scene 09 Book Value Pop (Frame 1817) */}
      <Sequence from={1817} durationInFrames={20}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.6} />
      </Sequence>

      {/* SFX: Scene 10 Transparency Boom (Frame 1940) */}
      <Sequence from={1940} durationInFrames={30}>
        <Audio src={staticFile("sfx/boom.wav")} volume={0.75} />
      </Sequence>

      {/* SFX: Scene 11 Duel Impact Clash (Frame 2090) */}
      <Sequence from={2090} durationInFrames={30}>
        <Audio src={staticFile("sfx/impact.wav")} volume={0.8} />
      </Sequence>

      {/* SFX: Scene 12 YouTube CTA Enter (Frame 2320) */}
      <Sequence from={2320} durationInFrames={25}>
        <Audio src={staticFile("sfx/clean_transition_whoosh.wav")} volume={0.65} />
      </Sequence>

      {/* SFX: Scene 12 Action Button Pop (Frame 2662) */}
      <Sequence from={2662} durationInFrames={20}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.65} />
      </Sequence>

      {/* SFX: Scene 12 Outro Chime (Frame 2800) */}
      <Sequence from={2800} durationInFrames={39}>
        <Audio src={staticFile("sfx/cash_chime.wav")} volume={0.8} />
      </Sequence>

      {/* =========================================================================
          2. PERSISTENT FACECAM VIDEO (ZERO DECODER UNMOUNTS ACROSS 100% TIMELINE)
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
            zIndex: isFacecamPunch ? 25 : 15,
            boxShadow: isFacecamPunch ? "none" : "0 -10px 35px rgba(0,0,0,0.7)",
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
              src={staticFile("video/equitas_short_facecam.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Subtle Cinematic Vignette */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(11, 15, 23, 0.4) 0%, transparent 15%, transparent 80%, rgba(11, 15, 23, 0.8) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      )}

      {/* =========================================================================
          3. GLOWING DIVIDER SEAM LINE (LOCKED AT Y = 718px)
          ========================================================================= */}
      {!isFullScreenTakeover && !isFacecamPunch && (
        <div
          style={{
            position: "absolute",
            top: 718,
            left: 0,
            width: 1080,
            height: 3,
            background:
              "linear-gradient(90deg, transparent 0%, #FFB020 30%, #0F8F87 70%, transparent 100%)",
            boxShadow:
              "0 0 16px rgba(15, 143, 135, 0.5), 0 0 24px rgba(255, 176, 32, 0.4)",
            zIndex: 45,
            pointerEvents: "none",
          }}
        />
      )}

      {/* =========================================================================
          4. WORD-LEVEL KINETIC SUBTITLES (BRIDGING THE SEAM AT Y = 660px)
          ========================================================================= */}
      {!isFullScreenTakeover && activeBlock && (
        <div
          style={{
            position: "absolute",
            top: subtitleTop,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 50,
            pointerEvents: "none",
            padding: "0 28px",
            transition: "top 0.3s ease",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(11, 15, 23, 0.94)",
              backdropFilter: "blur(14px)",
              borderRadius: 22,
              padding: "12px 28px",
              border: "1.5px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.75)",
              textAlign: "center",
              maxWidth: 980,
            }}
          >
            <span
              style={{
                fontSize: 38,
                fontWeight: 800,
                lineHeight: 1.25,
                color: "#E2E8F0",
              }}
            >
              {activeBlock.words && activeBlock.words.length > 0 ? (
                activeBlock.words.map((w, idx) => {
                  const startF = w.startFrame ?? Math.round((w.start ?? 0) * 30);
                  const endF = w.endFrame ?? Math.round((w.end ?? 0) * 30);
                  const isActive = frame >= startF && frame <= endF + 1;

                  const raw = (w.word || "").toLowerCase();
                  const isNumberOrMoney =
                    raw.includes("30") ||
                    raw.includes("48") ||
                    raw.includes("218") ||
                    raw.includes("crore") ||
                    raw.includes("15") ||
                    raw.includes("57") ||
                    raw.includes("50") ||
                    raw.includes("zero") ||
                    raw.includes("100") ||
                    raw.includes("seven") ||
                    raw.includes("%") ||
                    raw.includes("npa") ||
                    raw.includes("profit") ||
                    raw.includes("ceo");

                  const highlightColor = isNumberOrMoney ? "#FFB020" : "#00D09C";

                  return (
                    <span
                      key={idx}
                      style={{
                        color: isActive ? highlightColor : "#FFFFFF",
                        fontWeight: isActive ? 900 : 700,
                        transform: isActive ? "scale(1.12)" : "scale(1.0)",
                        display: "inline-block",
                        margin: "0 6px",
                        textShadow: isActive
                          ? `0 0 20px ${highlightColor}99`
                          : "0 2px 8px rgba(0,0,0,0.5)",
                        transition: "color 0.08s ease, transform 0.08s ease",
                      }}
                    >
                      {w.word}
                    </span>
                  );
                })
              ) : (
                <span>{activeBlock.text}</span>
              )}
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. 12 SCENE MOTION GRAPHIC STAGES (SEQUENTIALLY TIMED)
          ========================================================================= */}
      {/* Scene 01: The Crash (0 - 160f) */}
      <Scene01_TheCrash startFrame={0} durationFrames={160} />

      {/* Scene 02: Market Panic Takeover (160 - 555f) */}
      <Scene02_MarketPanic startFrame={160} durationFrames={395} />

      {/* Scene 03: Pause & Investigate Presenter Punch (555 - 690f) */}
      <Scene03_PauseInvestigate startFrame={555} durationFrames={135} />

      {/* Scene 04: CEO Resignation Fact 01 (690 - 900f) */}
      <Scene04_CeoResignation startFrame={690} durationFrames={210} />

      {/* Scene 05: Disclosure to RBI & Board (900 - 1180f) */}
      <Scene05_Disclosure startFrame={900} durationFrames={280} />

      {/* Scene 06: Fundamentals Fact 02 (1180 - 1340f) */}
      <Scene06_Fundamentals startFrame={1180} durationFrames={160} />

      {/* Scene 07: Highest Profit in History (1340 - 1610f) */}
      <Scene07_NetProfit startFrame={1340} durationFrames={270} />

      {/* Scene 08: Asset Quality & Net NPA (1610 - 1770f) */}
      <Scene08_AssetQuality startFrame={1610} durationFrames={160} />

      {/* Scene 09: 15% Discount to Book Value (1770 - 1940f) */}
      <Scene09_BookValue startFrame={1770} durationFrames={170} />

      {/* Scene 10: Personal Investment Strategy Presenter Punch (1940 - 2090f) */}
      <Scene10_PersonalInvestment startFrame={1940} durationFrames={150} />

      {/* Scene 11: Falling Knife or Opportunity (2090 - 2320f) */}
      <Scene11_FallingKnife startFrame={2090} durationFrames={230} />

      {/* Scene 12: YouTube Deep Dive CTA Split Stage (2320 - 2839f) */}
      <Scene12_YoutubeCTA startFrame={2320} durationFrames={519} />
    </AbsoluteFill>
  );
};
