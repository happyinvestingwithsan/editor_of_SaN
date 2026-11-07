import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PersistentFacecam } from "./components/PersistentFacecam";
import { FloatingStockCard } from "./components/FloatingStockCard";
import { ContrarianStamp } from "./components/ContrarianStamp";
import { BrollPlayer } from "./components/BrollPlayer";
import { CommunityAuditPass } from "./components/CommunityAuditPass";
import { TargetAudienceBadges } from "./components/TargetAudienceBadges";
import { TimelineJourney } from "./components/TimelineJourney";
import { FounderBioCard } from "./components/FounderBioCard";
import { OdometerCounter } from "./components/OdometerCounter";
import { AgendaChecklist } from "./components/AgendaChecklist";
import { RetentionChallenge } from "./components/RetentionChallenge";
import { KineticWordHighlight } from "./components/KineticWordHighlight";
import { Radio, Clock, FileCheck2, ShieldCheck, Sparkles, TrendingUp, Search } from "lucide-react";

export interface PathfinderIntroMasterProps {
  mode?: "full_video" | "overlay_only";
}

export const PathfinderIntroMaster: React.FC<PathfinderIntroMasterProps> = ({
  mode = "full_video",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SFX triggers micro-aligned to exact words
  const playStampSFX = frame >= 633 && frame < 650;
  const playCashChime = frame >= 2593 && frame < 2630;
  const playWhoosh1 = frame >= 325 && frame < 340;
  const playWhoosh2 = frame >= 1530 && frame < 1550;
  const playWhoosh3 = frame >= 2484 && frame < 2500;
  const playWhoosh4 = frame >= 4080 && frame < 4100;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070A10",
        overflow: "hidden",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* =========================================================================
          AUDIO TRACK 1: MASTER ENHANCED DIALOGUE
          ========================================================================= */}
      <Audio src={staticFile("audio/master.wav")} volume={1.4} />

      {/* =========================================================================
          AUDIO TRACK 2: MICRO-HAPTIC SFX
          ========================================================================= */}
      {playStampSFX && <Audio src={staticFile("sfx/stamp.wav")} volume={0.8} />}
      {playCashChime && <Audio src={staticFile("sfx/cash_chime.wav")} volume={0.9} />}
      {(playWhoosh1 || playWhoosh2 || playWhoosh3 || playWhoosh4) && (
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
      )}

      {/* =========================================================================
          TRACK 1: SINGLE PERSISTENT FACECAM (FULL-CAM DOMINANT)
          ========================================================================= */}
      <PersistentFacecam frame={frame} mode={mode} />

      {/* =========================================================================
          TRACK 2: DYNAMIC MOTION GRAPHICS & OVERLAYS
          ========================================================================= */}

      {/* -------------------------------------------------------------------------
          POINT 1: BIG RED LIVE BADGE (TOP-LEFT) & TODAY'S SESSION TIMECARD (TOP-RIGHT)
          (Frames 0 to 320 - Opening hook)
          ------------------------------------------------------------------------- */}
      {frame < 320 && (
        <>
          {/* Top-Left: Large Live Indicator for Mobile Viewers */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "48px",
              zIndex: 30,
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "rgba(220, 38, 38, 0.95)",
              border: "2px solid #FCA5A5",
              color: "#FFFFFF",
              padding: "14px 28px",
              borderRadius: "40px",
              fontSize: "22px",
              fontWeight: 900,
              letterSpacing: "1.5px",
              boxShadow: "0 0 35px rgba(239, 68, 68, 0.8)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Radio size={26} color="#FFFFFF" />
            <span>LIVE PATHFINDER RECORDING</span>
          </div>

          {/* Top-Right: Large Today's Session Timecard */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "48px",
              zIndex: 30,
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.94))",
              border: "2px solid rgba(245, 158, 11, 0.6)",
              padding: "16px 28px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.6), 0 0 25px rgba(245, 158, 11, 0.25)",
              backdropFilter: "blur(16px)",
            }}
          >
            <Clock size={32} color="#F59E0B" />
            <div>
              <div style={{ color: "#F8FAFC", fontSize: "20px", fontWeight: 800 }}>
                Today's Morning Session
              </div>
              <div style={{ color: "#FBBF24", fontSize: "16px", fontWeight: 700, marginTop: "2px" }}>
                05:30 AM – 07:00 AM IST
              </div>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------------
          POINT 3: Frames 1466 to 1600 (Evidences & Proofs Flanked on Full Facecam)
          Left: EVIDENCES, Right: PROOFS (Zero face interruption!)
          ------------------------------------------------------------------------- */}
      {frame >= 1466 && frame < 1600 && (
        <KineticWordHighlight
          frame={frame - 1466}
          fps={fps}
          mode="flank_sides"
          words={[
            {
              text: "EVIDENCES",
              subtext: "Statutory Filings & Audited Results",
              icon: Search,
              color: "#F59E0B",
              bg: "rgba(245, 158, 11, 0.2)",
              delayFrames: 66, // frame 1532
            },
            {
              text: "PROOFS",
              subtext: "100% Raw Unedited Masterclass Recording",
              icon: FileCheck2,
              color: "#10B981",
              bg: "rgba(16, 185, 129, 0.2)",
              delayFrames: 93, // frame 1559
            },
          ]}
        />
      )}

      {/* -------------------------------------------------------------------------
          POINT 4: Frames 1711 to 1930 (Value, Strategies, Analysis Bottom Lower-Third)
          Sequential pop-up pills along the bottom edge, below SaN's face!
          ------------------------------------------------------------------------- */}
      {frame >= 1711 && frame < 1930 && (
        <KineticWordHighlight
          frame={frame - 1711}
          fps={fps}
          mode="bottom_row"
          words={[
            {
              text: "REAL VALUE",
              subtext: "High-Conviction Financial Education",
              icon: Sparkles,
              color: "#F59E0B",
              bg: "rgba(245, 158, 11, 0.2)",
              delayFrames: 0, // frame 1711
            },
            {
              text: "TESTED STRATEGIES",
              subtext: "Institutional Risk Guardrails",
              icon: ShieldCheck,
              color: "#38BDF8",
              bg: "rgba(56, 189, 248, 0.2)",
              delayFrames: 46, // frame 1757
            },
            {
              text: "IN-DEPTH ANALYSIS",
              subtext: "Full Team & Community Due Diligence",
              icon: TrendingUp,
              color: "#34D399",
              bg: "rgba(16, 185, 129, 0.2)",
              delayFrames: 88, // frame 1799
            },
          ]}
        />
      )}

      {/* -------------------------------------------------------------------------
          POINT 5: Frames 2400 to 2840 (Portfolio Full Facecam: Left ₹75L, Right ₹1.50 Cr)
          SaN is in Full Facecam in the center! Flanked with crystal clear contrast!
          ------------------------------------------------------------------------- */}
      {frame >= 2400 && frame < 2840 && (
        <>
          {/* Left Side: Personal Equity ₹75L (enters at frame 2486) */}
          <OdometerCounter
            frame={frame - 2400}
            fps={fps}
            targetValue={7500000}
            label="Personal Direct Equity"
            subtext="Audited personal capital deployed in high-conviction structural compounders."
            accentColor="#10B981"
            delayFrames={86} // Exactly at frame 2486 when he speaks "70-75 lakhs"!
            layout="flank_left"
          />

          {/* Right Side: Total Combined ₹1.50 Cr (enters at frame 2595) */}
          <OdometerCounter
            frame={frame - 2400}
            fps={fps}
            targetValue={15000000}
            label="Total Combined Capital"
            subtext="₹1.50+ Crores self and family portfolio managed with strict capital preservation."
            isGrandReveal={true}
            accentColor="#F59E0B"
            delayFrames={195} // Exactly at frame 2595 when he speaks "1.5 crores"!
            layout="flank_right"
          />
        </>
      )}

      {/* -------------------------------------------------------------------------
          RIGHT CANVAS Y-AREA WRAPPER (x: 770px to 1920px = 1150px)
          Centered in the Y-zone! Equal symmetric margins from facecam & screen edge!
          ------------------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          left: "770px",
          top: "0px",
          width: "1150px",
          height: "1080px",
          zIndex: 25,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* POINT 4 & 3: Real Company Logos & Exact Word Synchronization */}
        {/* Frame 328: "Geofinance", Frame 375: "TII India", Frame 419: "Dixon" */}
        {frame >= 328 && frame < 630 && (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", padding: "20px" }}>
            <div
              style={{
                color: "#F59E0B",
                fontWeight: 900,
                fontSize: "18px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "16px",
                alignSelf: "center",
              }}
            >
              Masterclass Case Studies Analyzed:
            </div>

            {/* Jio Financial Services (enters at frame 328) */}
            <FloatingStockCard
              frame={frame}
              fps={fps}
              ticker="JIOFIN"
              name="Jio Financial Services"
              sector="NBFC • Digital Asset Management • Jio Ecosystem"
              badge="Institutional Analysis"
              logoSrc="logos/jio.png"
              delayFrames={328}
            />

            {/* Tube Investments of India (enters at frame 375) */}
            <FloatingStockCard
              frame={frame}
              fps={fps}
              ticker="TIINDIA"
              name="Tube Investments of India"
              sector="Engineering • Clean Mobility & EV Components"
              badge="Moat & Cash Flow"
              logoSrc="logos/tii.svg"
              delayFrames={375}
            />

            {/* Dixon Technologies (enters at frame 419) */}
            <FloatingStockCard
              frame={frame}
              fps={fps}
              ticker="DIXON"
              name="Dixon Technologies"
              sector="Electronics Manufacturing (EMS) • PLI Beneficiary"
              badge="Operating Leverage"
              logoSrc="logos/dixon.svg"
              delayFrames={419}
            />
          </div>
        )}

        {/* POINT 3: Contrarian Stamp ("NOT Stock Tips") - frame 630 to 670 */}
        {frame >= 630 && frame < 670 && (
          <ContrarianStamp frame={frame - 630} fps={fps} />
        )}

        {/* Frame 670 to 860: Pathfinder Session B-Roll 1 (Screener Margin Analysis) */}
        {frame >= 670 && frame < 860 && (
          <BrollPlayer
            frame={frame - 670}
            fps={fps}
            src="video/broll_fundamental.mp4"
            badge="Institutional Framework"
            title="Screener.in • Audited Margin Expansion Analysis"
          />
        )}

        {/* Frame 860 to 1100: Community Evaluation Pass */}
        {frame >= 860 && frame < 1100 && (
          <CommunityAuditPass frame={frame - 860} fps={fps} />
        )}

        {/* Frame 1100 to 1270: Target Audience Badges */}
        {frame >= 1100 && frame < 1270 && (
          <TargetAudienceBadges frame={frame - 1100} fps={fps} />
        )}

        {/* Frame 1270 to 1466: 6-Year Hardship Timeline */}
        {frame >= 1270 && frame < 1466 && (
          <TimelineJourney frame={frame - 1270} fps={fps} />
        )}

        {/* Frame 1600 to 1710: Pathfinder Session B-Roll 2 (TradingView Breakout) */}
        {frame >= 1600 && frame < 1710 && (
          <BrollPlayer
            frame={frame - 1600}
            fps={fps}
            src="video/broll_technical.mp4"
            badge="100% Raw Session"
            title="TradingView • Technical Breakout & 200 DMA Guardrail"
          />
        )}

        {/* POINT 9 & 10: Frames 1937 to 2400 (Santhosh Bio & 4 Sequential Boxes) */}
        {frame >= 1937 && frame < 2400 && (
          <FounderBioCard frame={frame - 1937} fps={fps} />
        )}

        {/* Frame 2850 to 2960: Perspective Shift (Happy Investing Philosophy - starts cleanly at 2850!) */}
        {frame >= 2850 && frame < 2960 && (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", padding: "20px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.94))",
                border: "2px solid rgba(16, 185, 129, 0.5)",
                borderRadius: "24px",
                padding: "36px 40px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                width: "100%",
                maxWidth: "880px",
              }}
            >
              <div style={{ color: "#34D399", fontWeight: 800, fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>
                Core Ethos
              </div>
              <h2 style={{ color: "#FFFFFF", fontSize: "38px", fontWeight: 900, margin: "0 0 16px 0", letterSpacing: "-1px" }}>
                A Completely Different Perspective
              </h2>
              <p style={{ color: "#CBD5E1", fontSize: "18px", lineHeight: 1.5, margin: "0 0 24px 0" }}>
                Moving away from emotional market panics and chaotic daily trading noise toward
                calm, joyful, data-driven investing.
              </p>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ color: "#34D399", fontWeight: 800, fontSize: "18px" }}>Peace of Mind</div>
                  <div style={{ color: "#94A3B8", fontSize: "14px", marginTop: "4px" }}>Know exactly why you own what you own.</div>
                </div>
                <div style={{ flex: 1, background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ color: "#FBBF24", fontWeight: 800, fontSize: "18px" }}>Happy Learning</div>
                  <div style={{ color: "#94A3B8", fontSize: "14px", marginTop: "4px" }}>Enjoying the intellectual pursuit of compounding.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POINT 12: Frame 2960 to 3180 (Massive Minimalist 55 Number Count Animation - No Box!) */}
        {frame >= 2960 && frame < 3180 && (
          <OdometerCounter
            frame={frame - 2960}
            fps={fps}
            targetValue={55}
            prefix=""
            label="Active Members"
            subtext="Close-Knit Mastermind • Selective Quality • Zero Noise"
            accentColor="#38BDF8"
            delayFrames={0} // Enters exactly when he speaks "55 people"!
            layout="minimal_stat"
          />
        )}

        {/* Frame 3180 to 3450: The 90-Minute Focus Challenge */}
        {frame >= 3180 && frame < 3450 && (
          <RetentionChallenge frame={frame - 3180} fps={fps} mode="challenge_90m" />
        )}

        {/* POINT 13: Frame 3450 to 3850 (Session Agenda Blueprint Synced to Words) */}
        {frame >= 3450 && frame < 3850 && (
          <AgendaChecklist frame={frame - 3450} fps={fps} />
        )}

        {/* Frame 3850 to 4050: Session B-Roll 3 (Dixon PLI Scheme) */}
        {frame >= 3850 && frame < 4050 && (
          <BrollPlayer
            frame={frame - 3850}
            fps={fps}
            src="video/broll_dixon_pli.mp4"
            badge="Dixon PLI Scheme"
            title="Mastermind Case Study • Dixon Electronics & Operating Margins"
          />
        )}

        {/* POINT 14: Frame 4055 to 4260 ("Quick Cash, Quick Money" Retail Trap - Synced Strictly to Speech) */}
        {frame >= 4055 && frame < 4260 && (
          <RetentionChallenge frame={frame - 4055} fps={fps} mode="quick_cash_trap" />
        )}

        {/* POINT 15: Frame 4260 to 4360 (Mystery End-of-Video Bonus - Synced to "I have some bonus") */}
        {frame >= 4260 && (
          <RetentionChallenge frame={frame - 4260} fps={fps} mode="end_bonus" />
        )}
      </div>
    </AbsoluteFill>
  );
};
