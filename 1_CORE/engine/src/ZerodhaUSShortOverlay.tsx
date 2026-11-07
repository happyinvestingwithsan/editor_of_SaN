import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { NewspaperHeadline } from "./components/NewspaperHeadline";
import { USBluechipTickerBar } from "./components/USBluechipTickerBar";
import { StepCalloutBadge } from "./components/StepCalloutBadge";
import { UIRippleHighlight } from "./components/UIRippleHighlight";
import { OutroVerifiedBadge } from "./components/OutroVerifiedBadge";
import { KineticWordCaptions, CaptionBlock } from "./components/KineticWordCaptions";
import captionsData from "./zerodha_captions.json";

export interface ZerodhaUSShortOverlayProps {
  showBackground?: boolean;
}

export const ZerodhaUSShortOverlay: React.FC<ZerodhaUSShortOverlayProps> = ({
  showBackground = false,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: showBackground ? "#0B0F17" : "transparent",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Gradient & Texture if preview background enabled */}
      {showBackground && (
        <>
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 900,
              height: 900,
              background:
                "radial-gradient(circle, rgba(0, 208, 156, 0.22) 0%, rgba(26, 100, 248, 0.12) 45%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 1. HOOK: 2.5D NEWSPAPER / EVIDENCE CARD (Frames 15 to 90)     */}
      {/* ------------------------------------------------------------- */}
      {frame >= 15 && frame <= 92 && (
        <div
          style={{
            position: "absolute",
            top: 400,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          <NewspaperHeadline
            publication="THE ECONOMIC TIMES / ZERODHA DISCLOSURE"
            date="OCTOBER 2026"
            headlinePre="Zerodha Finally Activates "
            highlightedText="US Stocks Investing Segment"
            headlinePost=" for Indian retail investors, enabling direct NASDAQ access."
            startFrame={15}
            highlightStartFrame={28}
            highlightDuration={24}
            durationFrames={75}
          />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. HOOK & BACKSTORY: US BLUECHIP TICKER BAR (Frames 60 to 160) */}
      {/* ------------------------------------------------------------- */}
      <USBluechipTickerBar startFrame={60} durationFrames={100} />

      {/* ------------------------------------------------------------- */}
      {/* 3. STEP 01 CALLOUT LOWER THIRD (Frames 350 to 568)            */}
      {/* ------------------------------------------------------------- */}
      <StepCalloutBadge
        stepNumber="01"
        title="Profile & Account"
        subtitle="zerodha.com/account/segments"
        startFrame={350}
        durationFrames={218}
        badgeColor="#00D09C" // Groww Mint Green
        topPosition={280}
      />

      {/* ------------------------------------------------------------- */}
      {/* 4. STEP 02 CALLOUT LOWER THIRD (Frames 568 to 744)            */}
      {/* ------------------------------------------------------------- */}
      <StepCalloutBadge
        stepNumber="02"
        title="Active Segments & Kill Switch"
        subtitle="Locate US Investing Segment"
        startFrame={568}
        durationFrames={176}
        badgeColor="#1A64F8" // IND Electric Blue
        topPosition={280}
      />

      {/* ------------------------------------------------------------- */}
      {/* 5. UI HIGHLIGHT & RADAR RIPPLE AT FREEZE-HOLD (Frames 670–710) */}
      {/* ------------------------------------------------------------- */}
      <UIRippleHighlight
        x={1000}
        y={1435}
        startFrame={670}
        durationFrames={40}
        color="#00D09C"
        label="TAP TO ACTIVATE"
      />

      {/* ------------------------------------------------------------- */}
      {/* 6. STEP 03 CALLOUT LOWER THIRD (Frames 744 to 894)            */}
      {/* ------------------------------------------------------------- */}
      <StepCalloutBadge
        stepNumber="03"
        title="Enable US Investing"
        subtitle="Activated within 48 Hours"
        startFrame={744}
        durationFrames={150}
        badgeColor="#00D09C" // Groww Mint Green
        topPosition={280}
      />

      {/* ------------------------------------------------------------- */}
      {/* 7. OUTRO VERIFIED TRUST BADGE (Frames 894 to 1050)            */}
      {/* ------------------------------------------------------------- */}
      <OutroVerifiedBadge
        startFrame={894}
        durationFrames={156}
        title="✔ SEBI REGISTERED & RBI LRS COMPLIANT"
        subtitle="DIRECT US INVESTING VIA ZERODHA"
      />

      {/* ------------------------------------------------------------- */}
      {/* 8. KINETIC WORD-BY-WORD CAPTIONS (Continuous, Frames 0–1074)   */}
      {/* ------------------------------------------------------------- */}
      <KineticWordCaptions
        captions={captionsData as CaptionBlock[]}
        highlightColor="#00D09C"
        fontSize={46}
        bottomPosition={260}
      />
    </AbsoluteFill>
  );
};
