import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  staticFile,
  Video,
} from "remotion";
import { HIFY_LIGHT_TOKENS } from "./theme";
import { CapitalAllocationRing } from "./components/CapitalAllocationRing";
import { AllocationBar } from "./components/AllocationBar";
import { ExposureComparison } from "./components/ExposureComparison";
import { CapitalReserve } from "./components/CapitalReserve";
import { ValuationLadder } from "./components/ValuationLadder";
import { DownsideScenarioChart } from "./components/DownsideScenarioChart";
import { StagedEntryMarkers } from "./components/StagedEntryMarkers";
import { MarketCapAllocationCard } from "./components/MarketCapAllocationCard";
import { GTTPlanInterface } from "./components/GTTPlanInterface";
import { EditorialLowerThird } from "./components/EditorialLowerThird";
import { CaptionOverlay } from "./components/CaptionOverlay";

export const RiskManagement_Interval07_Light: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // HOST FACECAM CHOREOGRAPHY (Left Dock Layout)
  // Left Dock: Left: 60px, Top: 100px, Width: 560px, Height: 880px with Gold Bezel
  // Right Stage: Left: 650px, Top: 100px, Width: 1210px, Height: 880px
  // =========================================================================
  let hostContainerStyle: React.CSSProperties = {
    position: "absolute",
    overflow: "hidden",
    zIndex: 30,
    boxSizing: "border-box",
  };

  if (frame < 36) {
    // PHASE 0: Fullscreen opening (Frames 0 -> 36 | 0.0s - 1.2s)
    hostContainerStyle = {
      ...hostContainerStyle,
      left: 0,
      top: 0,
      width: 1920,
      height: 1080,
      borderRadius: 0,
      border: "none",
      boxShadow: "none",
    };
  } else {
    // Docked into LEFT vertical mode with subtle Brand Gold Bezel (Frames 36 -> 3804)
    const dockSpring = spring({
      frame: frame - 36,
      fps,
      config: { damping: 16, stiffness: 100 },
    });

    const cardLeft = interpolate(dockSpring, [0, 1], [0, 60]);
    const cardTop = interpolate(dockSpring, [0, 1], [0, 100]);
    const cardWidth = interpolate(dockSpring, [0, 1], [1920, 560]);
    const cardHeight = interpolate(dockSpring, [0, 1], [1080, 880]);
    const cardRadius = interpolate(dockSpring, [0, 1], [0, 22]);
    const borderAlpha = interpolate(dockSpring, [0.1, 0.9], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    hostContainerStyle = {
      ...hostContainerStyle,
      left: cardLeft,
      top: cardTop,
      width: cardWidth,
      height: cardHeight,
      borderRadius: cardRadius,
      border: `2px solid rgba(200, 169, 81, ${borderAlpha * 0.8})`,
      boxShadow: `0 16px 40px rgba(0, 0, 0, 0.12), 0 0 24px rgba(200, 169, 81, ${borderAlpha * 0.15})`,
    };
  }

  // Snappy Top Navigation Bar Entrance
  const navSpring = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 110 } });

  // =========================================================================
  // FIVE SCENE TIMELINE (Fixed Boundaries per Section 5)
  // Scene 1: Frames 0 – 723   (0.00s – 24.10s)  Capital allocation
  // Scene 2: Frames 723 – 1956 (24.10s – 65.20s) PE valuation & initial exposure
  // Scene 3: Frames 1956 – 2438 (65.20s – 81.27s) Staged downside scenarios
  // Scene 4: Frames 2438 – 3130 (81.27s – 104.33s) Market-cap allocation
  // Scene 5: Frames 3130 – 3804 (104.33s – 126.80s) GTT execution
  // =========================================================================
  const s1Active = frame >= 36 && frame < 723;
  const s1Exit = interpolate(frame, [715, 723], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s2Active = frame >= 723 && frame < 1956;
  const s2Exit = interpolate(frame, [1946, 1956], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s3Active = frame >= 1956 && frame < 2438;
  const s3Exit = interpolate(frame, [2430, 2438], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s4Active = frame >= 2438 && frame < 3130;
  const s4Exit = interpolate(frame, [3120, 3130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s5Active = frame >= 3130 && frame <= 3804;

  // Active scene title for the top navigation bar
  const currentSceneLabel =
    frame < 723
      ? "SCENE 1: CAPITAL ALLOCATION & THE 5% RULE"
      : frame < 1956
      ? "SCENE 2: PE VALUATION & INITIAL EXPOSURE"
      : frame < 2438
      ? "SCENE 3: STAGED DOWNSIDE SCENARIOS"
      : frame < 3130
      ? "SCENE 4: MARKET-CAP ALLOCATION FRAMEWORK"
      : "SCENE 5: SYSTEMATIC GTT EXECUTION";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: HIFY_LIGHT_TOKENS.canvasBg,
        fontFamily: HIFY_LIGHT_TOKENS.fonts.ui,
        color: HIFY_LIGHT_TOKENS.textPrimary,
        overflow: "hidden",
      }}
    >
      {/* =====================================================================
          SUBTLE TECHNICAL GRID & WARM LIGHT BACKDROP
      ===================================================================== */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 75% 20%, rgba(200, 169, 81, 0.05) 0%, transparent 45%),
            radial-gradient(circle at 20% 85%, rgba(16, 185, 129, 0.04) 0%, transparent 45%),
            radial-gradient(#E4E4E7 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 28px 28px",
          opacity: 0.85,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* =====================================================================
          TOP DOCKED BRAND HEADER (LIGHT THEME WITH CRISP BADGES)
      ===================================================================== */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 60,
          right: 60,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          backgroundColor: HIFY_LIGHT_TOKENS.surfaceCard,
          border: `1px solid ${HIFY_LIGHT_TOKENS.borderHairline}`,
          borderRadius: 12,
          zIndex: 20,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
          transform: `translateY(${interpolate(navSpring, [0, 1], [-30, 0])}px)`,
          opacity: interpolate(navSpring, [0, 1], [0, 1]),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              backgroundColor: HIFY_LIGHT_TOKENS.brandGoldSubtle,
              border: `1px solid ${HIFY_LIGHT_TOKENS.brandGold}`,
              color: HIFY_LIGHT_TOKENS.brandGoldMuted,
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            HIFY MASTERCLASS
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: HIFY_LIGHT_TOKENS.textPrimary }}>
            Quantitative Risk Management & Capital Allocation
          </span>
        </div>

        {/* Dynamic Topic Milestone Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontFamily: HIFY_LIGHT_TOKENS.fonts.metrics }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor:
                frame < 723
                  ? HIFY_LIGHT_TOKENS.brandGold
                  : frame < 1956
                  ? HIFY_LIGHT_TOKENS.metricPositive
                  : frame < 2438
                  ? HIFY_LIGHT_TOKENS.metricNegative
                  : frame < 3130
                  ? HIFY_LIGHT_TOKENS.brandGold
                  : HIFY_LIGHT_TOKENS.metricPositive,
            }}
          />
          <span style={{ color: HIFY_LIGHT_TOKENS.textSecondary, fontWeight: 700 }}>
            {currentSceneLabel}
          </span>
        </div>
      </div>

      {/* =====================================================================
          CONTINUOUS HOST FACECAM (LEFT DOCK 560px x 880px)
      ===================================================================== */}
      <div style={hostContainerStyle}>
        <Video
          src={staticFile("facecam_interval07.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Synchronized Caption Overlay docked near bottom of facecam */}
      {frame >= 36 && <CaptionOverlay bottom={120} left={60} width={560} />}

      {/* =====================================================================
          RIGHT STAGE: DYNAMIC MOTION GRAPHIC PANELS (Width: 1210px, Height: 880px)
      ===================================================================== */}
      <div
        style={{
          position: "absolute",
          left: 650,
          top: 100,
          width: 1210,
          height: 880,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* -------------------------------------------------------------------
            SCENE 1: CAPITAL ALLOCATION (Frames 0 -> 723 | 0.0s - 24.10s)
            "for any large-scale company, only 5% is the capital allocation..."
        ------------------------------------------------------------------- */}
        {s1Active && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              opacity: s1Exit,
            }}
          >
            {/* Component 1: CapitalAllocationRing */}
            <CapitalAllocationRing totalCapital={1000000} allocationPercent={5} startFrame={45} highlightFrame={260} />

            {/* Component 2: AllocationBar */}
            <AllocationBar startFrame={280} />

            {/* Component 10: EditorialLowerThird */}
            <EditorialLowerThird
              quote="For any stock, which is so much lucrative also, you should invest 5% by that way you diversify it."
              subtext="PORTFOLIO PRESERVATION INVARIANT"
              badge="RULE #1"
              badgeColor={HIFY_LIGHT_TOKENS.brandGoldMuted}
            />
          </div>
        )}

        {/* -------------------------------------------------------------------
            SCENE 2: PE VALUATION & INITIAL EXPOSURE (Frames 723 -> 1956 | 24.1s - 65.2s)
            "am doing the first 1 percentage... usually take 2 to 3% but because of PE..."
        ------------------------------------------------------------------- */}
        {s2Active && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              opacity: s2Exit,
            }}
          >
            {/* Top Row: Exposure Comparison & Capital Reserve */}
            <ExposureComparison startFrame={730} />

            <CapitalReserve startFrame={800} />

            {/* Component 3: ValuationLadder (PE 70 -> 65 -> 64 -> 63 -> 62) */}
            <ValuationLadder startFrame={1448} />

            {/* Component 10: EditorialLowerThird */}
            <EditorialLowerThird
              quote="When the PE is near 70, there is chance it can fall again... you need capital allocation to support."
              subtext="TACTICAL STAGING • PRESERVE CASH AMMO"
              badge="VALUATION PRINCIPLE"
              badgeColor={HIFY_LIGHT_TOKENS.metricPositive}
            />
          </div>
        )}

        {/* -------------------------------------------------------------------
            SCENE 3: STAGED DOWNSIDE SCENARIOS (Frames 1956 -> 2438 | 65.2s - 81.27s)
            "falls 10% I add 1% more... falls 20% it gives more margin of safety..."
        ------------------------------------------------------------------- */}
        {s3Active && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              opacity: s3Exit,
            }}
          >
            {/* Component 6: DownsideScenarioChart */}
            <DownsideScenarioChart startFrame={1956} />

            {/* Component 7: StagedEntryMarkers */}
            <StagedEntryMarkers startFrame={1970} />

            {/* Component 10: EditorialLowerThird */}
            <EditorialLowerThird
              quote="When the stock falls 20 percentage from the long term support, then it gives me more margin of safety."
              subtext="PYRAMIDING ON MARGIN OF SAFETY • NOT GUESSWORK"
              badge="STAGED ENTRY"
              badgeColor={HIFY_LIGHT_TOKENS.metricNegative}
            />
          </div>
        )}

        {/* -------------------------------------------------------------------
            SCENE 4: MARKET-CAP ALLOCATION (Frames 2438 -> 3130 | 81.27s - 104.33s)
            "large-cap 5%... mid-cap 3%... small-cap 1.5%..."
        ------------------------------------------------------------------- */}
        {s4Active && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              opacity: s4Exit,
            }}
          >
            {/* Component 8: MarketCapAllocationCard */}
            <MarketCapAllocationCard startFrame={2438} />

            {/* Component 10: EditorialLowerThird */}
            <EditorialLowerThird
              quote="Any stock has a potential to go to zero. Large-cap companies can also go... that's where we put our maximum allocation percentage."
              subtext="SIZED BY MORTALITY PROBABILITY"
              badge="CAPITAL SURVIVAL"
              badgeColor={HIFY_LIGHT_TOKENS.brandGoldMuted}
            />
          </div>
        )}

        {/* -------------------------------------------------------------------
            SCENE 5: GTT EXECUTION (Frames 3130 -> 3804 | 104.33s - 126.80s)
            "We run the show with GTTs... emotionally disconnected from decisions..."
        ------------------------------------------------------------------- */}
        {s5Active && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Component 9: GTTPlanInterface */}
            <GTTPlanInterface startFrame={3130} />

            {/* Component 10: EditorialLowerThird */}
            <EditorialLowerThird
              quote="We have placed our plan using GTTs... emotionally disconnected from decisions."
              subtext="MECHANICAL EXECUTION • ZERO PANIC"
              badge="EXECUTION ENGINE"
              badgeColor={HIFY_LIGHT_TOKENS.metricPositive}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
