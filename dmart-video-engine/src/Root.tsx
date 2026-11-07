import { HappyInvestingReelMaster } from "./compositions/happy_investing_reel/HappyInvestingReelMaster";
import { BenchmarkTest } from "./compositions/reliance_chapters_2_3/BenchmarkTest";
import { Reliance_Chapters2_3_AudioTest } from "./compositions/reliance_chapters_2_3/Reliance_Chapters2_3_AudioTest";
import { Reliance_Chapters2_3_Overlay_Master } from "./compositions/reliance_chapters_2_3/Reliance_Chapters2_3_Overlay_Master";
import { Reliance_Intro_Chapter1_Master } from "./compositions/reliance_phase1/Reliance_Intro_Chapter1_Master";
import { EquitasSFB_PersonalThesis_Master } from "./compositions/equitas_outro/EquitasSFB_PersonalThesis_Master";
import { EquitasSFB_Screener_Part1 } from "./compositions/EquitasSFB_Screener_Part1";
import { EquitasSFB_Screener_Part2 } from "./compositions/EquitasSFB_Screener_Part2";
import { EquitasSFB_Screener_Part3 } from "./compositions/EquitasSFB_Screener_Part3";
import { EquitasSFB_Screener_To_TV_Bridge } from "./compositions/EquitasSFB_Screener_To_TV_Bridge";
import { EquitasShortReelMaster } from "./compositions/equitas/EquitasShortReelMaster";
import { EquitasSFB_CEO_Resignation_Master } from "./compositions/equitas/EquitasSFB_CEO_Resignation_Master";
import { EquitasSFB_Masterclass_Intro_V2 } from "./compositions/EquitasSFB_Masterclass_Intro_V2";
import { EquitasSFB_Intro_Draft } from "./compositions/EquitasSFB_Intro_Draft";
import { EquitasSFB_Masterclass_Intro } from "./compositions/EquitasSFB_Masterclass_Intro";
import { EquitasSFB_Editorial_Showcase } from "./compositions/EquitasSFB_Editorial_Showcase";
import { SaNMasterUnifiedReview } from "./compositions/SaNMasterUnifiedReview";
import React from "react";
import { Composition } from "remotion";
import { ThinkSchool_Take01 } from "./compositions/ThinkSchool_Take01";
import { ThinkSchool_Take02 } from "./compositions/ThinkSchool_Take02";
import { ThinkSchool_Take03 } from "./compositions/ThinkSchool_Take03";
import { ThinkSchool_Take04 } from "./compositions/ThinkSchool_Take04";
import { ThinkSchool_Take05 } from "./compositions/ThinkSchool_Take05";
import { ThinkSchool_Take06 } from "./compositions/ThinkSchool_Take06";
import { SahilMasterclassTemplate } from "./SahilMasterclassTemplate";
import { JioMasterclass_Chunk01 } from "./JioMasterclass_Chunk01";
import { DMartIntroHook } from "./DMartIntroHook";
import { DmartIntro_Chunk01 } from "./DmartIntro_Chunk01";
import { MasterclassOffer_Interval06 } from "./MasterclassOffer_Interval06";
import { RiskManagement_Interval07 } from "./RiskManagement_Interval07";
import { RiskManagement_Interval07_Light } from "./RiskManagement_Interval07_Light";
import { ShortsTemplate_IndmoneyGroww } from "./ShortsTemplate_IndmoneyGroww";
import { ZerodhaUSShortOverlay } from "./ZerodhaUSShortOverlay";
import { JioLongFormOverlay } from "./JioLongFormOverlay";
import { JioReelSplitMaster } from "./compositions/JioReelSplitMaster";
import { StandardShortReelShowcase } from "./compositions/StandardShortReelShowcase";
import { StandardLongformShowcase } from "./compositions/StandardLongformShowcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* =========================================================================
          HAPPY INVESTING — 9:16 FINANCIAL DOCUMENTARY REEL (NOV 6, 2026)
          ========================================================================= */}
      <Composition
        id="HappyInvesting-Documentary-Reel"
        component={HappyInvestingReelMaster}
        durationInFrames={5220} // 174.0s @ 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Benchmark Transparent Composition */}
      <Composition
        id="Benchmark-Transparent"
        component={BenchmarkTest}
        durationInFrames={90} // 3.0s
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ isGreenScreen: false }}
      />

      {/* =========================================================================
          RELIANCE INDUSTRIES — CHAPTERS 2 & 3 GRAPHICS OVERLAYS
          ========================================================================= */}
      {/* Live Audio Test Composition with Presenter Safe Corridor */}
      <Composition
        id="Reliance-Chapters2-3-AudioTest"
        component={Reliance_Chapters2_3_AudioTest}
        durationInFrames={6220} // 207.333s @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ bgColor: "#EAEAEA", showGuide: true }}
      />

      <Composition
        id="Reliance-Chapters2-3-Overlay"
        component={Reliance_Chapters2_3_Overlay_Master}
        durationInFrames={6220} // 207.333s @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ isGreenScreen: false }}
      />

      <Composition
        id="Reliance-Chapters2-3-GreenScreen"
        component={Reliance_Chapters2_3_Overlay_Master}
        durationInFrames={6220} // 207.333s @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ isGreenScreen: true }}
      />

      {/* =========================================================================
          RELIANCE INDUSTRIES — MASTERCLASS PHASE 1 (INTRO + CHAPTER 1)
          ========================================================================= */}
      <Composition
        id="Reliance-Masterclass-Phase1"
        component={Reliance_Intro_Chapter1_Master}
        durationInFrames={6109} // 203.633s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK — PERSONAL INVESTMENT THESIS & RISK MANAGEMENT
          ========================================================================= */}
      <Composition
        id="ESFB-Outro-Personal-Thesis"
        component={EquitasSFB_PersonalThesis_Master}
        durationInFrames={4893} // 163.10s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK — SCREENER PART 1 (YOY & QOQ REALITY)
          ========================================================================= */}
      <Composition
        id="ESFB-Screenr-1-Video"
        component={EquitasSFB_Screener_Part1}
        durationInFrames={1995} // 66.50s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK — SCREENER PART 2 (THE MICROFINANCE CRISIS)
          ========================================================================= */}
      <Composition
        id="ESFB-Screenr-2-Video"
        component={EquitasSFB_Screener_Part2}
        durationInFrames={3544} // 118.14s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK — SCREENER PART 3 (THE PHOENIX REBOUND)
          ========================================================================= */}
      <Composition
        id="ESFB-Screenr-3-Video"
        component={EquitasSFB_Screener_Part3}
        durationInFrames={1905} // 63.50s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK — SCREENER TO TRADINGVIEW BRIDGE
          ========================================================================= */}
      <Composition
        id="ESFB-Screenr-To-TV-Bridge"
        component={EquitasSFB_Screener_To_TV_Bridge}
        durationInFrames={2729} // 90.97s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK — 30% CRASH REALITY 9:16 VERTICAL SHORT / REEL
          ========================================================================= */}
      <Composition
        id="Equitas-SFB-Short-Reel"
        component={EquitasShortReelMaster}
        durationInFrames={2839} // 94.63s @ 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK — CEO RESIGNATION INVESTIGATION MASTER
          ========================================================================= */}
      <Composition
        id="EquitasSFB-CEO-Resignation-Master"
        component={EquitasSFB_CEO_Resignation_Master}
        durationInFrames={5420} // 180.67s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK MASTERCLASS INTRO V2 (CLEAN LIGHT THEME MASTER)
          ========================================================================= */}
      <Composition
        id="EquitasSFB-Masterclass-Intro-V2"
        component={EquitasSFB_Masterclass_Intro_V2}
        durationInFrames={4800} // 160.00s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK MASTERCLASS INTRO DRAFT (FIRST ~25s / 745 FRAMES)
          ========================================================================= */}
      <Composition
        id="EquitasSFB-Intro-Draft"
        component={EquitasSFB_Intro_Draft}
        durationInFrames={745} // 24.83s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK MASTERCLASS INTRO (CANONICAL 16:9 DRAFT)
          ========================================================================= */}
      <Composition
        id="Equitas-SFB-Editorial-Showcase"
        component={EquitasSFB_Editorial_Showcase}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Equitas-SFB-Masterclass-Intro"
        component={EquitasSFB_Masterclass_Intro}
        durationInFrames={4800} // 160.00s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          SaN MASTER UNIFIED TEMPLATE REVIEW TIMELINE (THE ONE MASTER TIMELINE)
          ========================================================================= */}
      <Composition
        id="SaN-Master-Unified-Review"
        component={SaNMasterUnifiedReview}
        durationInFrames={1230}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* =========================================================================
          THINKSCHOOL TAKE 01 MASTER (Full-Length Documentary Hook)
          ========================================================================= */}
      <Composition
        id="ThinkSchool-Take01-FullVideo"
        component={ThinkSchool_Take01}
        durationInFrames={2869} // 95.63s @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "full_video",
        }}
      />

      <Composition
        id="ThinkSchool-Take01-Overlay"
        component={ThinkSchool_Take01}
        durationInFrames={2869} // 95.63s @ 30fps (Transparent Overlay for CapCut)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "overlay_only",
        }}
      />

      

      {/* =========================================================================
          THINKSCHOOL TAKE 02 MASTER (The DRHP Forensic & 0% OFS Whale Proof)
          ========================================================================= */}
      <Composition
        id="ThinkSchool-Take02-FullVideo"
        component={ThinkSchool_Take02}
        durationInFrames={3322} // 110.72s @ 30fps (from master video 96.43s to 207.27s)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "full_video",
        }}
      />

      <Composition
        id="ThinkSchool-Take02-Overlay"
        component={ThinkSchool_Take02}
        durationInFrames={3322} // 110.72s @ 30fps (Transparent Overlay for CapCut)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "overlay_only",
        }}
      />

      {/* =========================================================================
          ========================================================================= */}
      

      

      {/* =========================================================================
          THINKSCHOOL TAKE 03 MASTER (The Rs 27,500 Cr Debt Destruction & P&L Expansion)
          ========================================================================= */}
      <Composition
        id="ThinkSchool-Take03-FullVideo"
        component={ThinkSchool_Take03}
        durationInFrames={2640} // 87.98s @ 30fps (Exact Master Draft Duration)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "full_video",
        }}
      />

      <Composition
        id="ThinkSchool-Take03-Overlay"
        component={ThinkSchool_Take03}
        durationInFrames={2640} // 87.98s @ 30fps (Transparent Overlay for CapCut)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "overlay_only",
        }}
      />

      {/* =========================================================================
          THINKSCHOOL TAKE 04 MASTER (The Operational Duopoly & Valuation Benchmark)
          ========================================================================= */}
      <Composition
        id="ThinkSchool-Take04-FullVideo"
        component={ThinkSchool_Take04}
        durationInFrames={3383} // 112.77s @ 30fps (from master video 295.38s to 408.15s)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "full_video",
        }}
      />

      {/* =========================================================================
          THINKSCHOOL TAKE 05 MASTER (The Unfiltered DRHP Risks & The Size Trap)
          ========================================================================= */}
      <Composition
        id="ThinkSchool-Take05-FullVideo"
        component={ThinkSchool_Take05}
        durationInFrames={3150} // 105.00s @ 30fps (from master video 408.15s to 513.15s)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "full_video",
        }}
      />

      <Composition
        id="ThinkSchool-Take05-Overlay"
        component={ThinkSchool_Take05}
        durationInFrames={3150} // 105.00s @ 30fps (Transparent Overlay for CapCut)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "overlay_only",
        }}
      />

      <Composition
        id="ThinkSchool-Take04-Overlay"
        component={ThinkSchool_Take04}
        durationInFrames={3383} // 112.77s @ 30fps (Transparent Overlay for CapCut)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "overlay_only",
        }}
      />

      
      {/* =========================================================================
          THINKSCHOOL TAKE 06 MASTER (The Final Verdict & 200 DMA Masterclass)
          ========================================================================= */}
      <Composition
        id="ThinkSchool-Take06-FullVideo"
        component={ThinkSchool_Take06}
        durationInFrames={4197} // 139.91s @ 30fps (from master video 513.13s to 653.04s)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "full_video",
        }}
      />

      <Composition
        id="ThinkSchool-Take06-Overlay"
        component={ThinkSchool_Take06}
        durationInFrames={4197} // 139.91s @ 30fps (Transparent Overlay for CapCut)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "overlay_only",
        }}
      />

      <Composition
        id="Sahil-Masterclass-Template"
        component={SahilMasterclassTemplate}
        durationInFrames={1200} // 40s showcase @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="JioMasterclass-Take01-Preview"
        component={JioMasterclass_Chunk01}
        durationInFrames={2869} // Take 1 duration (95.63s @ 30fps)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "full_preview",
        }}
      />

      <Composition
        id="JioMasterclass-Take01-Overlay"
        component={JioMasterclass_Chunk01}
        durationInFrames={2869} // Take 1 transparent overlay
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "overlay_only",
        }}
      />

      {/* =========================================================================
          ========================================================================= */}
      

      

      <Composition
        id="JioLongFormOverlay"
        component={JioLongFormOverlay}
        durationInFrames={14400} // 8 minutes @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          showBackground: false,
        }}
      />

      <Composition
        id="JioLongFormPreview"
        component={JioLongFormOverlay}
        durationInFrames={14400} // 8 minutes @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          showBackground: true,
        }}
      />

      <Composition
        id="ZerodhaUSShortOverlay"
        component={ZerodhaUSShortOverlay}
        durationInFrames={1074}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showBackground: false,
        }}
      />

      <Composition
        id="ZerodhaUSShortPreview"
        component={ZerodhaUSShortOverlay}
        durationInFrames={1074}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          showBackground: true,
        }}
      />

      <Composition
        id="FinanceShort-INDmoney-Groww"
        component={ShortsTemplate_IndmoneyGroww}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="RiskManagement-Interval07-Light"
        component={RiskManagement_Interval07_Light}
        durationInFrames={3804}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="RiskManagement-Interval07"
        component={RiskManagement_Interval07}
        durationInFrames={3804}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="MasterclassOffer-Interval06"
        component={MasterclassOffer_Interval06}
        durationInFrames={2423}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="DmartIntro-Chunk01"
        component={DmartIntro_Chunk01}
        durationInFrames={1592}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DMartIntro"
        component={DMartIntroHook}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    
      {/* =========================================================================
          JIO MEGA IPO REEL MASTER (9:16 VERTICAL SPLIT SCREEN)
          ========================================================================= */}
      <Composition
        id="JioReel-MegaIPO-SplitMaster"
        component={JioReelSplitMaster}
        durationInFrames={3785} // 126.17s @ 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          mode: "full_video",
        }}
      />

      <Composition
        id="JioReel-MegaIPO-SplitOverlay"
        component={JioReelSplitMaster}
        durationInFrames={3785} // 126.17s @ 30fps (Transparent Overlay for CapCut)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          mode: "overlay_only",
        }}
      />

      {/* =========================================================================
          SaN STANDARD TEMPLATES (MODULAR REUSABLE ARCHITECTURE)
          ========================================================================= */}
      <Composition
        id="SaN-Standard-ShortReel"
        component={StandardShortReelShowcase}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="SaN-Standard-Longform"
        component={StandardLongformShowcase}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
