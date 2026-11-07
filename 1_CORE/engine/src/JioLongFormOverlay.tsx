import React from "react";
import { AbsoluteFill } from "remotion";
import {
  DynamicStrokeBox,
  MarkerHighlighter,
  ChapterSlideWipe,
  FloatingGlassCard,
} from "./components/LongFormAnnotations";

export interface JioLongFormOverlayProps {
  showBackground?: boolean;
}

/**
 * Master Long-Form 16:9 Motion Graphics & Overlay Composition for Reliance Jio Mega IPO.
 * Reverse-engineered from Sahil Bhadviya's high-retention visual architecture.
 *
 * Can be exported with showBackground=false as ProRes 4444 / PNG Sequence for CapCut Track 3,
 * or previewed directly in Remotion Studio with showBackground=true.
 */
export const JioLongFormOverlay: React.FC<JioLongFormOverlayProps> = ({
  showBackground = false,
}) => {
  return (
    <AbsoluteFill
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: showBackground ? "#0B0F17" : "transparent",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* =========================================================================
          CHAPTER 1 (0:00 - 1:15 | Frames 0 - 2250)
          ========================================================================= */}
      {/* Intro Floating Stat Card (Frame 90 - 240 / ~3s - 8s) */}
      <FloatingGlassCard
        startFrame={90}
        durationFrames={150}
        headline="INDIA'S LARGEST IPO EVER"
        metric="₹30,213 CR"
        subtext="Surpassing LIC (₹21,000 Cr) and Hyundai (₹27,870 Cr)"
        badge="RECORD BREAKING"
        accentColor="#EF4444"
        x={1340}
        y={180}
      />

      {/* Chapter 1 -> Chapter 2 Slide Wipe (at ~1:14 | Frame 2220) */}
      <ChapterSlideWipe
        startFrame={2220}
        chapterNumber={2}
        title="THE DRHP FORENSIC: ZERO OFS"
        subtitle="Why This Is NOT Another Tech Startup Exit"
        accentColor="#E8292E"
      />

      {/* =========================================================================
          CHAPTER 2 (1:15 - 2:45 | Frames 2250 - 4950)
          ========================================================================= */}
      {/* Highlight Box over DRHP Page 68: "Offer for Sale: NIL (0%)" */}
      <DynamicStrokeBox
        startFrame={2450}
        durationFrames={180}
        x={360}
        y={420}
        width={580}
        height={95}
        color="#00D09C" // Groww Mint Green
        strokeWidth={3.5}
        cornerRadius={8}
        fillOpacity={0.15}
      />

      {/* Floating Card for Meta & Google 100% Lock-in */}
      <FloatingGlassCard
        startFrame={2700}
        durationFrames={180}
        headline="STRATEGIC TECH GIANTS"
        metric="100% LOCKED IN"
        subtext="Meta ($12.3B) & Google ($9.5B) are selling ZERO shares"
        badge="SMART MONEY PROOF"
        accentColor="#3B82F6"
        x={1340}
        y={200}
      />

      {/* Chapter 2 -> Chapter 3 Slide Wipe (at ~2:44 | Frame 4920) */}
      <ChapterSlideWipe
        startFrame={4920}
        chapterNumber={3}
        title="BALANCE SHEET TRANSFORMATION"
        subtitle="Where Does The ₹30,000 Crore Actually Go?"
        accentColor="#F97316"
      />

      {/* =========================================================================
          CHAPTER 3 (2:45 - 4:00 | Frames 4950 - 7200)
          ========================================================================= */}
      {/* Highlighter Sweep on DRHP Page 75: Prepayment of RJIL Debt */}
      <MarkerHighlighter
        startFrame={5150}
        durationFrames={180}
        x={410}
        y={540}
        width={720}
        height={38}
        color="#FFE600"
      />

      {/* Highlight Box on Interest Savings & PAT Expansion */}
      <DynamicStrokeBox
        startFrame={5400}
        durationFrames={180}
        x={400}
        y={480}
        width={650}
        height={110}
        color="#00D09C"
        strokeWidth={3}
        fillOpacity={0.12}
      />

      {/* Floating Card: ₹2,200 Cr Annual Interest Savings */}
      <FloatingGlassCard
        startFrame={5650}
        durationFrames={180}
        headline="ANNUAL INTEREST SAVED"
        metric="+₹2,200 CR / YR"
        subtext="Direct flow-through to bottom line Net Profit"
        badge="MARGIN EXPANSION"
        accentColor="#00D09C"
        x={1340}
        y={220}
      />

      {/* Chapter 3 -> Chapter 4 Slide Wipe (at ~3:59 | Frame 7170) */}
      <ChapterSlideWipe
        startFrame={7170}
        chapterNumber={4}
        title="THE DUOPOLY MOAT"
        subtitle="Reliance Jio vs. Bharti Airtel Side-By-Side"
        accentColor="#1E3A8A"
      />

      {/* =========================================================================
          CHAPTER 4 (4:00 - 5:30 | Frames 7200 - 9900)
          ========================================================================= */}
      {/* Stroke Box over Screener.in Airtel PE multiple (Row 2, Col 3) */}
      <DynamicStrokeBox
        startFrame={7400}
        durationFrames={160}
        x={480}
        y={320}
        width={340}
        height={65}
        color="#EF4444"
        strokeWidth={3}
      />

      {/* Stroke Box over Screener.in Operating Profit Margin (Row 4, Col 5) */}
      <DynamicStrokeBox
        startFrame={7600}
        durationFrames={160}
        x={860}
        y={390}
        width={290}
        height={65}
        color="#00D09C"
        strokeWidth={3}
      />

      {/* Chapter 4 -> Chapter 5 Slide Wipe (at ~5:29 | Frame 9870) */}
      <ChapterSlideWipe
        startFrame={9870}
        chapterNumber={5}
        title="THE 2 STRUCTURAL RISKS"
        subtitle="The Giant Scale Trap & Satellite Disruption"
        accentColor="#DC2626"
      />

      {/* =========================================================================
          CHAPTER 5 (5:30 - 6:45 | Frames 9900 - 12150)
          ========================================================================= */}
      {/* Floating Card: ₹10 Lakh Crore Market Cap Trap */}
      <FloatingGlassCard
        startFrame={10100}
        durationFrames={180}
        headline="THE LAW OF LARGE NUMBERS"
        metric="₹10 LAKH CRORE"
        subtext="Needs ₹10 Lakh Cr fresh wealth to double. Multibaggers happen in midcaps."
        badge="REALITY CHECK"
        accentColor="#F59E0B"
        x={1340}
        y={200}
      />

      {/* Chapter 5 -> Chapter 6 Slide Wipe (at ~6:44 | Frame 12120) */}
      <ChapterSlideWipe
        startFrame={12120}
        chapterNumber={6}
        title="THE 200 DMA GOLDEN RULE"
        subtitle="Why The Zomato Masterclass Applies to Jio"
        accentColor="#059669"
      />

      {/* =========================================================================
          CHAPTER 6 (6:45 - 8:00 | Frames 12150 - 14400)
          ========================================================================= */}
      {/* Floating Card: Happy Investing Core Mandate */}
      <FloatingGlassCard
        startFrame={12400}
        durationFrames={240}
        headline="HAPPY INVESTING GOLDEN RULE"
        metric="NO 200 DMA = NO ENTRY"
        subtext="I am okay to miss an opportunity, but I refuse to be greedy."
        badge="DISCIPLINE FIRST"
        accentColor="#00D09C"
        x={1340}
        y={220}
      />
    </AbsoluteFill>
  );
};
