import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import {
  LongformSplitLayout,
  FacecamPosition,
  SFXPlayer,
  SFXCue,
} from "../motion-kit";
import {
  EditorialHeadlineBadge,
  EditorialStatCard,
  EditorialChart,
  PhysicalClipping,
  PhysicalStamp,
} from "../motion-kit/modules";
import { EDITORIAL_TOKENS } from "../motion-kit/theme/editorialTokens";

/**
 * EquitasSFB_Masterclass_Intro:
 * Canonical 16:9 Remotion composition for Equitas Small Finance Bank Masterclass Intro.
 * Duration: 4,800 frames (160.00 seconds @ 30.00 fps).
 * 
 * Think School, Rahul Jain & Sahil Editorial Design System:
 * - Warm Ivory Checked Canvas (#F8F7F3) with drafting micro-grid & technical docket headers
 * - Persistent Single <Video> Architecture with calibrated SaN Facecam (mid_x=289.5px, headroom=70px)
 * - 30-32% Facecam Real Estate Rule alternating Left/Right every 15-20s
 * - Strict 1140x980 safe zone budget (Total stack height <= 640px, zero clipping, zero negative offsets)
 * - Physical broadsheet newspaper clipping with Stabilo Boss highlighter sweep
 * - Authentic liquid rubber ink stamps with mix-blend-mode: multiply slam physics
 * - 32 frame-accurate micro-haptic SFX triggers
 */
export const EquitasSFB_Masterclass_Intro: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Frame-level dynamic Facecam position mapping
  let facecamPos: FacecamPosition = "right_tall";

  if (frame < 741) {
    // Clip 01: Hook (0 - 24.7s)
    facecamPos = "right_tall";
  } else if (frame < 1200) {
    // Clip 02: Headlines (24.7s - 40.0s)
    facecamPos = "left_tall";
  } else if (frame < 1367) {
    // Clip 03: Yes Bank question (40.0s - 45.6s)
    facecamPos = "right_tall";
  } else if (frame < 1707) {
    // Clip 04: Two Categories (45.6s - 56.9s)
    facecamPos = "right_tall";
  } else if (frame < 2141) {
    // Clip 05: Category 1 Retail Dump (56.9s - 1:11.4s)
    facecamPos = "left_tall";
  } else if (frame < 2786) {
    // Clip 06: Category 2 Framework (1:11.4s - 1:32.9s)
    facecamPos = "right_tall";
  } else if (frame < 3065) {
    // Clip 07: Framework Q1 & Q2 (1:32.9s - 1:42.2s)
    facecamPos = "left_tall";
  } else if (frame < 3485) {
    // Clip 08: Q3 Technical & Smart Money (1:42.2s - 1:56.2s)
    facecamPos = "right_tall";
  } else if (frame < 4219) {
    // Clip 09: Masterclass Roadmap (1:56.2s - 2:20.6s)
    facecamPos = "right_tall";
  } else if (frame < 4628) {
    // Clip 10: Skin In The Game (2:20.6s - 2:34.3s)
    facecamPos = "left_tall";
  } else {
    // Clip 11: Outro & Happy Investing Gate (2:34.3s - 2:40.0s)
    facecamPos = "right_tall";
  }

  // 2. SFX Cues (32 Frame-Accurate Micro-Haptic Audio Triggers)
  const sfxCues: SFXCue[] = [
    // Clip 01: Hook
    { frame: 2, type: "boom", volume: 0.8 },
    { frame: 135, type: "whoosh", volume: 0.6 },
    { frame: 288, type: "stamp", volume: 0.7 },
    { frame: 516, type: "click", volume: 0.6 },

    // Clip 02: Headlines
    { frame: 741, type: "whoosh", volume: 0.7 },
    { frame: 810, type: "click", volume: 0.6 },
    { frame: 915, type: "stamp", volume: 0.7 },

    // Clip 03: Yes Bank Ghost
    { frame: 1200, type: "whoosh", volume: 0.7 },
    { frame: 1245, type: "stamp", volume: 0.8 },

    // Clip 04: The Market Fork
    { frame: 1367, type: "whoosh", volume: 0.6 },
    { frame: 1518, type: "click", volume: 0.6 },

    // Clip 05: Category 1 Retail Panic
    { frame: 1707, type: "whoosh", volume: 0.7 },
    { frame: 1830, type: "click", volume: 0.5 },
    { frame: 1905, type: "click", volume: 0.5 },
    { frame: 1995, type: "click", volume: 0.5 },
    { frame: 2070, type: "stamp", volume: 0.8 },

    // Clip 06: Category 2 Framework
    { frame: 2141, type: "whoosh", volume: 0.7 },
    { frame: 2430, type: "click", volume: 0.6 },
    { frame: 2535, type: "click", volume: 0.6 },
    { frame: 2664, type: "chime", volume: 0.7 },

    // Clip 07: Q1 & Q2
    { frame: 2786, type: "whoosh", volume: 0.7 },
    { frame: 2820, type: "click", volume: 0.7 },
    { frame: 2955, type: "click", volume: 0.7 },

    // Clip 08: Technical Chart
    { frame: 3065, type: "whoosh", volume: 0.6 },
    { frame: 3245, type: "boom", volume: 0.7 },
    { frame: 3350, type: "click", volume: 0.6 },

    // Clip 09: Roadmap
    { frame: 3485, type: "whoosh", volume: 0.7 },
    { frame: 3510, type: "click", volume: 0.6 },
    { frame: 3675, type: "click", volume: 0.6 },
    { frame: 4035, type: "click", volume: 0.6 },

    // Clip 10: Skin In The Game
    { frame: 4219, type: "whoosh", volume: 0.7 },
    { frame: 4290, type: "stamp", volume: 0.8 },
    { frame: 4425, type: "chime", volume: 0.7 },

    // Clip 11: Outro
    { frame: 4628, type: "whoosh", volume: 0.7 },
    { frame: 4695, type: "chime", volume: 0.9 },
  ];

  return (
    <LongformSplitLayout
      videoSrc={staticFile("video/equitas_intro_proxy.mp4")}
      audioTrack={
        <>
          <Audio src={staticFile("audio/equitas_intro_audio_48k.wav")} volume={1.0} />
          <SFXPlayer cues={sfxCues} />
        </>
      }
      facecamPosition={facecamPos}
      theme="editorial"
      videoMuted={true}
    >
      {/* =========================================================================
          CLIP 01 (0 – 741 frames / 0:00 – 0:24.7s) | Hook: 34% Drawdown Shock
          Budget: 590px total height <= 860px safe height. Zero clipping!
          ========================================================================= */}
      <Sequence from={0} durationInFrames={741}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            maxWidth: 960,
          }}
        >
          <EditorialHeadlineBadge
            category="CRISIS ALERT // 48-HR COLLAPSE"
            title="EQUITAS SMALL FINANCE BANK"
            subtitle="From All-Time High to Free Fall: The 34% Valuation Wipeout"
            tone="crimson"
          />

          <EditorialStatCard
            label="48-HOUR VALUATION DRAWDOWN"
            value="-34%"
            numericValue={-34}
            suffix="%"
            breakdown="DAY 1: -20% (LOWER CIRCUIT) // DAY 2: -14% PANIC SELLING"
            tone="crimson"
            badgeText="52-WK LOW"
            counterFrames={35}
          />

          <EditorialChart
            title="VALUATION FREE FALL TRAJECTORY"
            subtitle="Peak Upper Circuit (₹88.50) to Crash Floor (₹58.40)"
            dataPoints={[88.5, 87.0, 71.2, 70.8, 68.0, 58.4]}
            tone="crimson"
            highlightLabel="-34.2% LOSS"
            dma200Level={78.0}
            drawDurationFrames={45}
            chartHeight={320}
          />
        </div>
      </Sequence>

      {/* =========================================================================
          CLIP 02 (741 – 1200 frames / 24.7s – 40.0s) | Scanned Broadsheet Newspaper
          Realistic Physical Newsprint + Stabilo Boss Marker + Rubber Ink Stamp
          ========================================================================= */}
      <Sequence from={741} durationInFrames={459}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 960,
          }}
        >
          <PhysicalClipping
            source="THE FINANCIAL EXPRESS"
            edition="BANKING INVESTIGATION // NATIONAL DESK"
            date="OCTOBER 24, 2026"
            headline="MD & CEO ABRUPTLY RESIGNS OVER CONFLICT OF INTEREST"
            snippet="Founder P.N. Vasudevan tenders unexpected resignation amid governance probe as Equitas Small Finance Bank plunges 20% to fresh 52-week low."
            highlightPhrase="conflict of interest"
            highlightStartFrame={18}
            highlighterColor={EDITORIAL_TOKENS.colors.highlighterYellow}
            rotationAngle={-1.5}
            stampSlot={
              <PhysicalStamp
                text="GOVERNANCE TRAP"
                subText="AUDIT ALERT"
                tone="crimson"
                triggerFrame={28}
                fontSize={40}
                rotationAngle={-7}
              />
            }
          />
        </div>
      </Sequence>

      {/* =========================================================================
          CLIP 03 (1200 – 1367 frames / 40.0s – 45.6s) | The Yes Bank Ghost Question
          Investigative Dossier with Playfair Serif & Rubber Stamp Slam
          ========================================================================= */}
      <Sequence from={1200} durationInFrames={167}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            width: "100%",
            maxWidth: 920,
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
              borderRadius: 16,
              border: `1.5px solid ${EDITORIAL_TOKENS.colors.borderMedium}`,
              padding: "40px 48px",
              boxShadow: EDITORIAL_TOKENS.shadows.paperElevated,
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 14px",
                borderRadius: 4,
                backgroundColor: EDITORIAL_TOKENS.colors.crimsonTint,
                border: `1px solid ${EDITORIAL_TOKENS.colors.crimsonBorder}`,
                fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: EDITORIAL_TOKENS.colors.crimson,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              INVESTIGATIVE QUESTION // RETAIL PANIC TRIGGER
            </div>

            <div
              style={{
                fontFamily: EDITORIAL_TOKENS.fonts.editorialSerif,
                fontSize: 56,
                fontWeight: 800,
                color: EDITORIAL_TOKENS.colors.inkCharcoal,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                textTransform: "uppercase",
              }}
            >
              ANOTHER YES BANK?
            </div>

            <div
              style={{
                fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                fontSize: 22,
                fontWeight: 600,
                color: EDITORIAL_TOKENS.colors.inkMuted,
                marginTop: 12,
                letterSpacing: "0.02em",
              }}
            >
              OR UNFOUNDED STREET HYSTERIA OVER NOISE?
            </div>
          </div>

          <PhysicalStamp
            text="SYSTEMIC RISK?"
            subText="RETAIL PANIC TRIGGER"
            tone="crimson"
            triggerFrame={15}
            fontSize={44}
            rotationAngle={-5}
          />
        </div>
      </Sequence>

      {/* =========================================================================
          CLIP 04 (1367 – 1707 frames / 45.6s – 56.9s) | The Great Market Fork
          Two Horizontal Side-by-Side Paper Dossier Columns (Zero Overlap)
          ========================================================================= */}
      <Sequence from={1367} durationInFrames={340}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            maxWidth: 960,
          }}
        >
          <EditorialHeadlineBadge
            category="INVESTOR PSYCHOLOGY"
            title="THE MARKET SPLITS IN TWO"
            subtitle="When A Good Stock Crashes 30%"
            tone="brass"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              width: "100%",
            }}
          >
            {/* Category 1 Dossier: Crimson */}
            <div
              style={{
                backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
                borderRadius: 14,
                border: `1.5px solid ${EDITORIAL_TOKENS.colors.crimsonBorder}`,
                padding: "24px 28px",
                boxShadow: EDITORIAL_TOKENS.shadows.paperFlat,
              }}
            >
              <div
                style={{
                  fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: EDITORIAL_TOKENS.colors.crimson,
                  textTransform: "uppercase",
                }}
              >
                CATEGORY 01
              </div>
              <div
                style={{
                  fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                  fontSize: 24,
                  fontWeight: 800,
                  color: EDITORIAL_TOKENS.colors.inkCharcoal,
                  marginTop: 4,
                  marginBottom: 16,
                }}
              >
                THE RETAIL TRAP
              </div>

              {[
                { label: "TRIGGER", val: "HEADLINE NOISE" },
                { label: "REACTION", val: "EMOTIONAL PANIC" },
                { label: "OUTCOME", val: "LOCKS LOSS AT BOTTOM" },
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom:
                      idx < 2
                        ? `1px solid ${EDITORIAL_TOKENS.colors.borderSubtle}`
                        : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                      fontSize: 12,
                      color: EDITORIAL_TOKENS.colors.inkMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                      fontSize: 14,
                      fontWeight: 700,
                      color: EDITORIAL_TOKENS.colors.crimson,
                    }}
                  >
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Category 2 Dossier: Emerald */}
            <div
              style={{
                backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
                borderRadius: 14,
                border: `1.5px solid ${EDITORIAL_TOKENS.colors.emeraldBorder}`,
                padding: "24px 28px",
                boxShadow: EDITORIAL_TOKENS.shadows.paperFlat,
              }}
            >
              <div
                style={{
                  fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: EDITORIAL_TOKENS.colors.emerald,
                  textTransform: "uppercase",
                }}
              >
                CATEGORY 02
              </div>
              <div
                style={{
                  fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                  fontSize: 24,
                  fontWeight: 800,
                  color: EDITORIAL_TOKENS.colors.inkCharcoal,
                  marginTop: 4,
                  marginBottom: 16,
                }}
              >
                DISCIPLINED VALUE
              </div>

              {[
                { label: "TRIGGER", val: "AUDITED FILINGS" },
                { label: "REACTION", val: "CONCALL DISSECTION" },
                { label: "OUTCOME", val: "LONG-TERM ASYMMETRY" },
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom:
                      idx < 2
                        ? `1px solid ${EDITORIAL_TOKENS.colors.borderSubtle}`
                        : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                      fontSize: 12,
                      color: EDITORIAL_TOKENS.colors.inkMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                      fontSize: 14,
                      fontWeight: 700,
                      color: EDITORIAL_TOKENS.colors.emerald,
                    }}
                  >
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          CLIP 05 (1707 – 2141 frames / 56.9s – 1:11.4s) | Category 1: Retail Dump
          Behavioral Autopsy: 3 Evidence Cards + Rubber Stamp Slam
          ========================================================================= */}
      <Sequence from={1707} durationInFrames={434}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
            maxWidth: 960,
          }}
        >
          <EditorialHeadlineBadge
            category="BEHAVIORAL AUTOPSY"
            title="CATEGORY 1: RETAIL PANIC"
            subtitle="Three Fatal Mistakes When Fear Overwhelms Logic"
            tone="crimson"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                num: "01",
                title: "NOISE DRIVEN",
                desc: "Reacts impulsively to sensationalist television headlines & panic feeds",
              },
              {
                num: "02",
                title: "DUMPS AT 52-WEEK LOW",
                desc: "Sells at the point of maximum emotional pain, locking in permanent loss",
              },
              {
                num: "03",
                title: "ZERO CONVICTION",
                desc: "Never read the quarterly filing, NPA trajectory, or capital adequacy ratio",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
                  padding: "16px 24px",
                  borderRadius: 12,
                  border: `1px solid ${EDITORIAL_TOKENS.colors.crimsonBorder}`,
                  boxShadow: EDITORIAL_TOKENS.shadows.paperFlat,
                }}
              >
                <span
                  style={{
                    fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                    fontSize: 24,
                    fontWeight: 800,
                    color: EDITORIAL_TOKENS.colors.crimson,
                    minWidth: 44,
                  }}
                >
                  {item.num}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                      fontSize: 18,
                      fontWeight: 800,
                      color: EDITORIAL_TOKENS.colors.inkCharcoal,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                      fontSize: 14,
                      fontWeight: 500,
                      color: EDITORIAL_TOKENS.colors.inkMuted,
                      marginTop: 2,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <PhysicalStamp
              text="WEALTH TRAP"
              subText="ACTS ON NOISE • LOCKS LOSS AT BOTTOM"
              tone="crimson"
              triggerFrame={35}
              fontSize={40}
              rotationAngle={-3}
            />
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          CLIP 06 (2141 – 2786 frames / 1:11.4s – 1:32.9s) | Category 2: Framework
          Disciplined Value: 3 Evidence Cards + Emerald Stamp Slam
          ========================================================================= */}
      <Sequence from={2141} durationInFrames={645}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
            maxWidth: 960,
          }}
        >
          <EditorialHeadlineBadge
            category="DISCIPLINED INVESTING"
            title="CATEGORY 2: THE 3-STEP FRAMEWORK"
            subtitle="How Intelligent Investors Turn Panic Into Advantage"
            tone="emerald"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                num: "01",
                title: "SHUT OFF MEDIA NOISE",
                desc: "Ignores breathless TV anchors, speculative rumors, and emotion",
              },
              {
                num: "02",
                title: "DISSECT AUDITED CONCALLS",
                desc: "Reviews loan book health, provisions, and actual management commentary",
              },
              {
                num: "03",
                title: "APPLY 3 FORENSIC QUESTIONS",
                desc: "Evaluates governance integrity, banking engine, and smart money positioning",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
                  padding: "16px 24px",
                  borderRadius: 12,
                  border: `1px solid ${EDITORIAL_TOKENS.colors.emeraldBorder}`,
                  boxShadow: EDITORIAL_TOKENS.shadows.paperFlat,
                }}
              >
                <span
                  style={{
                    fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                    fontSize: 24,
                    fontWeight: 800,
                    color: EDITORIAL_TOKENS.colors.emerald,
                    minWidth: 44,
                  }}
                >
                  {item.num}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                      fontSize: 18,
                      fontWeight: 800,
                      color: EDITORIAL_TOKENS.colors.inkCharcoal,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                      fontSize: 14,
                      fontWeight: 500,
                      color: EDITORIAL_TOKENS.colors.inkMuted,
                      marginTop: 2,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <PhysicalStamp
              text="DEEP VALUE"
              subText="AUDITED REALITY WINS OVER NOISE"
              tone="emerald"
              triggerFrame={40}
              fontSize={40}
              rotationAngle={3}
            />
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          CLIP 07 (2786 – 3065 frames / 1:32.9s – 1:42.2s) | Framework Q1 & Q2
          Two Prominent Forensic Question Dossiers (Clean 1-4 Word Clarity)
          ========================================================================= */}
      <Sequence from={2786} durationInFrames={279}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            maxWidth: 960,
          }}
        >
          <EditorialHeadlineBadge
            category="FORENSIC CHECKLIST"
            title="THE 3 CRITICAL QUESTIONS"
            subtitle="The Analytical Checklist for Equitas Small Finance Bank"
            tone="brass"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Q1 Card */}
            <div
              style={{
                backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
                borderRadius: 14,
                border: `1.5px solid ${EDITORIAL_TOKENS.colors.brassBorder}`,
                padding: "24px 32px",
                boxShadow: EDITORIAL_TOKENS.shadows.paperElevated,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                    fontSize: 20,
                    fontWeight: 800,
                    color: EDITORIAL_TOKENS.colors.brass,
                  }}
                >
                  QUESTION 01
                </span>
                <span
                  style={{
                    fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                    fontSize: 22,
                    fontWeight: 800,
                    color: EDITORIAL_TOKENS.colors.inkCharcoal,
                    textTransform: "uppercase",
                  }}
                >
                  WHY THE SUDDEN EXIT?
                </span>
              </div>
              <div
                style={{
                  fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                  fontSize: 15,
                  fontWeight: 600,
                  color: EDITORIAL_TOKENS.colors.inkMuted,
                  marginTop: 6,
                }}
              >
                Was it actual governance fraud, or an administrative conflict-of-interest misunderstanding?
              </div>
            </div>

            {/* Q2 Card */}
            <div
              style={{
                backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
                borderRadius: 14,
                border: `1.5px solid ${EDITORIAL_TOKENS.colors.emeraldBorder}`,
                padding: "24px 32px",
                boxShadow: EDITORIAL_TOKENS.shadows.paperElevated,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                    fontSize: 20,
                    fontWeight: 800,
                    color: EDITORIAL_TOKENS.colors.emerald,
                  }}
                >
                  QUESTION 02
                </span>
                <span
                  style={{
                    fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                    fontSize: 22,
                    fontWeight: 800,
                    color: EDITORIAL_TOKENS.colors.inkCharcoal,
                    textTransform: "uppercase",
                  }}
                >
                  IS THE ENGINE BROKEN?
                </span>
              </div>
              <div
                style={{
                  fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                  fontSize: 15,
                  fontWeight: 600,
                  color: EDITORIAL_TOKENS.colors.inkMuted,
                  marginTop: 6,
                }}
              >
                Audited loan book quality, NIM spreads, gross NPA trend, and return on assets.
              </div>
            </div>
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          CLIP 08 (3065 – 3485 frames / 1:42.2s – 1:56.2s) | Q3 Technicals & Smart Money
          Badge + Technical Chart (200 DMA Support & Accumulation Floor)
          ========================================================================= */}
      <Sequence from={3065} durationInFrames={420}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            maxWidth: 960,
          }}
        >
          <EditorialHeadlineBadge
            category="FORENSIC QUESTION 03"
            title="TECHNICAL REALITY & SMART MONEY"
            subtitle="Institutional Accumulation Zone vs 200 DMA"
            tone="brass"
          />

          <EditorialChart
            title="EQUITASBNK - 200 DMA SUPPORT STRUCTURE"
            subtitle="Price Action Testing Historical Smart Money Accumulation Zone"
            dataPoints={[95, 92, 88, 82, 75, 68, 62, 58, 58, 59]}
            tone="brass"
            dma200Level={65}
            highlightLabel="ACCUMULATION FLOOR"
            drawDurationFrames={45}
            chartHeight={340}
          />
        </div>
      </Sequence>

      {/* =========================================================================
          CLIP 09 (3485 – 4219 frames / 1:56.2s – 2:20.6s) | Masterclass Roadmap
          Three Structured Investigation Dossiers (Parts 1, 2, 3)
          ========================================================================= */}
      <Sequence from={3485} durationInFrames={734}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
            maxWidth: 960,
          }}
        >
          <EditorialHeadlineBadge
            category="COMPLETE INVESTIGATION"
            title="MASTERCLASS ROADMAP"
            subtitle="Three Systematic Sections to Total Analytical Clarity"
            tone="brass"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                part: "PART 01",
                title: "RESIGNATION AUTOPSY",
                desc: "The verified facts from regulatory disclosures and official exchange filings",
                toneColor: EDITORIAL_TOKENS.colors.crimson,
                borderColor: EDITORIAL_TOKENS.colors.crimsonBorder,
              },
              {
                part: "PART 02",
                title: "THE -₹224 CR TURNAROUND",
                desc: "How the bank went from catastrophic quarterly loss to sustained profit recovery",
                toneColor: EDITORIAL_TOKENS.colors.emerald,
                borderColor: EDITORIAL_TOKENS.colors.emeraldBorder,
              },
              {
                part: "PART 03",
                title: "KEY PRICE LEVELS & 200 DMA",
                desc: "Institutional accumulation zones, technical floors, and disciplined allocation",
                toneColor: EDITORIAL_TOKENS.colors.brass,
                borderColor: EDITORIAL_TOKENS.colors.brassBorder,
              },
            ].map((p, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
                  padding: "16px 24px",
                  borderRadius: 12,
                  border: `1.5px solid ${p.borderColor}`,
                  boxShadow: EDITORIAL_TOKENS.shadows.paperFlat,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                      fontSize: 12,
                      fontWeight: 800,
                      color: p.toneColor,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      display: "block",
                    }}
                  >
                    {p.part}
                  </span>
                  <span
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                      fontSize: 18,
                      fontWeight: 800,
                      color: EDITORIAL_TOKENS.colors.inkCharcoal,
                      display: "block",
                      marginTop: 2,
                    }}
                  >
                    {p.title}
                  </span>
                  <span
                    style={{
                      fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                      fontSize: 13,
                      fontWeight: 500,
                      color: EDITORIAL_TOKENS.colors.inkMuted,
                      display: "block",
                      marginTop: 2,
                    }}
                  >
                    {p.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          CLIP 10 (4219 – 4628 frames / 2:20.6s – 2:34.3s) | Skin In The Game
          Transparency & Integrity: Historical Precedents + Emerald Stamp
          ========================================================================= */}
      <Sequence from={4219} durationInFrames={409}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            maxWidth: 960,
          }}
        >
          <EditorialHeadlineBadge
            category="TRANSPARENCY & INTEGRITY"
            title="SKIN IN THE GAME"
            subtitle="Historical Precedents & My Personal Capital Stance"
            tone="emerald"
          />

          <div
            style={{
              backgroundColor: EDITORIAL_TOKENS.colors.paperCard,
              borderRadius: 14,
              border: `1.5px solid ${EDITORIAL_TOKENS.colors.emeraldBorder}`,
              padding: "24px 32px",
              boxShadow: EDITORIAL_TOKENS.shadows.paperElevated,
            }}
          >
            <div
              style={{
                fontFamily: EDITORIAL_TOKENS.fonts.monoData,
                fontSize: 12,
                fontWeight: 700,
                color: EDITORIAL_TOKENS.colors.emerald,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              HISTORICAL BANKING PRECEDENTS
            </div>
            <div
              style={{
                fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                fontSize: 22,
                fontWeight: 800,
                color: EDITORIAL_TOKENS.colors.inkCharcoal,
                marginTop: 4,
              }}
            >
              WHAT HAPPENED IN SIMILAR CRISES?
            </div>
            <div
              style={{
                fontFamily: EDITORIAL_TOKENS.fonts.editorialSans,
                fontSize: 15,
                fontWeight: 500,
                color: EDITORIAL_TOKENS.colors.inkMuted,
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              Comparing historical banking panic selloffs: Which ones staged 2x–5x multi-year recoveries, and which ones genuinely collapsed? Plus, my exact personal capital allocation.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <PhysicalStamp
              text="CAPITAL STANCE"
              subText="MY PERSONAL ALLOCATION"
              tone="emerald"
              triggerFrame={25}
              fontSize={42}
              rotationAngle={-3}
            />
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          CLIP 11 (4628 – 4800 frames / 2:34.3s – 2:40.0s) | The Happy Investing Gate
          High-Impact Rubber Stamp: "HAPPY INVESTING // NO 200 DMA = NO ENTRY"
          ========================================================================= */}
      <Sequence from={4628} durationInFrames={172}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            width: "100%",
            maxWidth: 960,
          }}
        >
          <EditorialHeadlineBadge
            category="EQUITAS SFB MASTERCLASS"
            title="THE HAPPY INVESTING DISCIPLINE"
            subtitle="Zero Fear • Zero Greed • Audited Truth"
            tone="brass"
          />

          <PhysicalStamp
            text="HAPPY INVESTING"
            subText="NO 200 DMA = NO ENTRY • REFUSE TO BE GREEDY"
            tone="brass"
            triggerFrame={10}
            fontSize={48}
            rotationAngle={-2}
          />
        </div>
      </Sequence>
    </LongformSplitLayout>
  );
};
