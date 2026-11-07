import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  Video,
} from "remotion";
import { ReviewInspectorHUD } from "../components/ReviewInspectorHUD";
import {
  SAN_TOKENS,
  HeadlineBadge,
  NewspaperClipping,
  ComparisonDuel,
  StockTickerCard,
  MetricOdometer,
  FinancialChart,
  AutopsyDossier,
  InteractiveCTA,
  KineticSubtitles,
  SubtitleBlock,
} from "../motion-kit";

// Synchronized sample kinetic subtitle blocks across the entire review timeline
const MASTER_REVIEW_CAPTIONS: SubtitleBlock[] = [
  {
    id: "cap_01",
    start: 0,
    end: 120,
    text: "THE BIGGEST IPO IN DALAL STREET HISTORY",
    words: [
      { word: "BIGGEST", startFrame: 5, endFrame: 35 },
      { word: "IPO", startFrame: 36, endFrame: 70 },
      { word: "HISTORY", startFrame: 71, endFrame: 115 },
    ],
  },
  {
    id: "cap_02",
    start: 121,
    end: 240,
    text: "THE AUDITED DRHP REVEALS ZERO OFS CASHOUT",
    words: [
      { word: "AUDITED", startFrame: 125, endFrame: 155 },
      { word: "DRHP", startFrame: 156, endFrame: 185 },
      { word: "REVEALS", startFrame: 186, endFrame: 205 },
      { word: "TRUTH", startFrame: 206, endFrame: 235 },
    ],
  },
  {
    id: "cap_03",
    start: 241,
    end: 360,
    text: "COMPARING VALUATION MULTIPLES WITH BHARTI AIRTEL",
    words: [
      { word: "COMPARING", startFrame: 245, endFrame: 275 },
      { word: "VALUATION", startFrame: 276, endFrame: 310 },
      { word: "AIRTEL", startFrame: 311, endFrame: 355 },
    ],
  },
  {
    id: "cap_04",
    start: 361,
    end: 480,
    text: "REDUCING 70000 CRORE DEBT SAVES INTEREST",
    words: [
      { word: "REDUCING", startFrame: 365, endFrame: 395 },
      { word: "DEBT", startFrame: 396, endFrame: 430 },
      { word: "INTEREST", startFrame: 431, endFrame: 475 },
    ],
  },
  {
    id: "cap_05",
    start: 481,
    end: 600,
    text: "NO 200 DMA ENTRY MEANS NO CAPITAL AT RISK",
    words: [
      { word: "200", startFrame: 485, endFrame: 510 },
      { word: "DMA", startFrame: 511, endFrame: 540 },
      { word: "ENTRY", startFrame: 541, endFrame: 570 },
      { word: "BREAKOUT", startFrame: 571, endFrame: 595 },
    ],
  },
  {
    id: "cap_06",
    start: 601,
    end: 720,
    text: "LOOK AT PAYTM ZOMATO AND SWIGGY LOSSES",
    words: [
      { word: "PAYTM", startFrame: 605, endFrame: 635 },
      { word: "ZOMATO", startFrame: 636, endFrame: 670 },
      { word: "SWIGGY", startFrame: 671, endFrame: 715 },
    ],
  },
  {
    id: "cap_07",
    start: 721,
    end: 840,
    text: "COMMENT JIO BELOW FOR THE FULL FORMULA",
    words: [
      { word: "COMMENT", startFrame: 725, endFrame: 755 },
      { word: "JIO", startFrame: 756, endFrame: 790 },
      { word: "BELOW", startFrame: 791, endFrame: 835 },
    ],
  },
  {
    id: "cap_08",
    start: 841,
    end: 960,
    text: "FULL SCREEN TAKEOVER MODE ELIMINATES DISTRACTIONS",
    words: [
      { word: "FULL", startFrame: 845, endFrame: 875 },
      { word: "SCREEN", startFrame: 876, endFrame: 905 },
      { word: "TAKEOVER", startFrame: 906, endFrame: 955 },
    ],
  },
  {
    id: "cap_09",
    start: 961,
    end: 1080,
    text: "WILL I APPLY FOR LISTING GAINS? NO.",
    words: [
      { word: "APPLY?", startFrame: 970, endFrame: 1010 },
      { word: "STRICTLY", startFrame: 1011, endFrame: 1040 },
      { word: "NO.", startFrame: 1041, endFrame: 1075 },
    ],
  },
  {
    id: "cap_10",
    start: 1081,
    end: 1230,
    text: "HAPPY INVESTING STANDARD ARCHITECTURE VERIFIED",
    words: [
      { word: "HAPPY", startFrame: 1085, endFrame: 1120 },
      { word: "INVESTING", startFrame: 1121, endFrame: 1160 },
      { word: "STANDARD", startFrame: 1161, endFrame: 1220 },
    ],
  },
];

export const SaNMasterUnifiedReview: React.FC = () => {
  const frame = useCurrentFrame();
  const seamY = SAN_TOKENS.layout.reel9x16.seamY; // 718px

  // Dynamic layout state variables
  const isFullScreenTakeover = frame >= 841 && frame <= 960; // #MOD-08
  const isFacecamPunch = frame >= 961 && frame <= 1080;      // #MOD-09

  const facecamOpacity = isFullScreenTakeover ? 0 : 1;
  const facecamTop = isFacecamPunch ? 0 : seamY;
  const facecamHeight = isFacecamPunch ? 1920 : 1920 - seamY;
  const videoTranslateY = isFacecamPunch ? -40 : -600;
  const videoScale = isFacecamPunch ? 1.05 : 1.0;

  // Active module telemetry metadata for the inspector HUD
  let hudMetadata = {
    refId: "#MOD-01",
    moduleName: "HeadlineBadge (Contrarian Hook + Stamp)",
    layoutType: "9:16 Mobile Split",
    startFrame: 0,
    endFrame: 120,
    propsSummary: ['title: "₹30,213 CR MEGA IPO"', 'stamp: "AVOID?" (F25)', 'spring: snappy'],
  };

  if (frame >= 121 && frame <= 240) {
    hudMetadata = {
      refId: "#MOD-02",
      moduleName: "NewspaperClipping (2.5D Marker Sweep)",
      layoutType: "9:16 Mobile Split",
      startFrame: 121,
      endFrame: 240,
      propsSummary: ['source: "ECONOMIC TIMES"', 'tilt: rotateX(6deg) rotateY(-3deg)', 'marker: "₹8,600 Cr"'],
    };
  } else if (frame >= 241 && frame <= 360) {
    hudMetadata = {
      refId: "#MOD-03",
      moduleName: "ComparisonDuel (2-Column Showdown)",
      layoutType: "9:16 Mobile Split",
      startFrame: 241,
      endFrame: 360,
      propsSummary: ['left: "Jio (34x PE)"', 'right: "Airtel (50x PE)"', 'center: VS Pop Badge'],
    };
  } else if (frame >= 361 && frame <= 480) {
    hudMetadata = {
      refId: "#MOD-04",
      moduleName: "StockTickerCard + MetricOdometer",
      layoutType: "9:16 Mobile Split",
      startFrame: 361,
      endFrame: 480,
      propsSummary: ['ticker: "JIO"', 'price: "₹10,30,000 Cr"', 'odometer: ₹8,600 Cr'],
    };
  } else if (frame >= 481 && frame <= 600) {
    hudMetadata = {
      refId: "#MOD-05",
      moduleName: "FinancialChart (SVG 200 DMA Breakout)",
      layoutType: "9:16 Mobile Split",
      startFrame: 481,
      endFrame: 600,
      propsSummary: ['curve: 11 Points', 'dma200Level: 65', 'glowTip: Emerald Green'],
    };
  } else if (frame >= 601 && frame <= 720) {
    hudMetadata = {
      refId: "#MOD-06",
      moduleName: "AutopsyDossier (Startup Wealth Destruction)",
      layoutType: "9:16 Mobile Split",
      startFrame: 601,
      endFrame: 720,
      propsSummary: ['brands: Paytm, Zomato, Swiggy', 'pills: standalone -71%, -65%', 'stamp: WEALTH DESTRUCTION'],
    };
  } else if (frame >= 721 && frame <= 840) {
    hudMetadata = {
      refId: "#MOD-07",
      moduleName: "InteractiveCTA (4-Stage Outro Loop)",
      layoutType: "9:16 Mobile Split",
      startFrame: 721,
      endFrame: 840,
      propsSummary: ['typing: "Happy Investing with SaN"', 'teaser: DRHP Masterclass', 'comment: "JIO"'],
    };
  } else if (frame >= 841 && frame <= 960) {
    hudMetadata = {
      refId: "#MOD-08",
      moduleName: "Layout Mode: Full Screen Graphics Takeover",
      layoutType: "Full 1080x1920 Canvas",
      startFrame: 841,
      endFrame: 960,
      propsSummary: ['facecam: opacity 0', 'graphics: 100% canvas', 'useCase: high-density proof diagrams'],
    };
  } else if (frame >= 961 && frame <= 1080) {
    hudMetadata = {
      refId: "#MOD-09",
      moduleName: "Layout Mode: Host Full-Screen Punch-In",
      layoutType: "Full 1080x1920 Facecam",
      startFrame: 961,
      endFrame: 1080,
      propsSummary: ['facecam: scale 1.05', 'top: 0', 'useCase: punchy contrarian conclusions ("NO.")'],
    };
  } else if (frame >= 1081 && frame <= 1230) {
    hudMetadata = {
      refId: "#MOD-10",
      moduleName: "16:9 Longform Design System Preview",
      layoutType: "16:9 Standard Bridge",
      startFrame: 1081,
      endFrame: 1230,
      propsSummary: ['host: 32% Tall Frame (580x980)', 'border: 24K Gold', 'alternation: Left/Right every 20s'],
    };
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: SAN_TOKENS.colors.bgDark,
        width: 1080,
        height: 1920,
        overflow: "hidden",
        fontFamily: SAN_TOKENS.fonts.primary,
      }}
    >
      {/* 1. Master Enhanced Audio Track */}
      <Audio src={staticFile("video/jio_reel_audio.wav")} volume={1.0} />

      {/* =========================================================================
          2. TOP MOTION GRAPHICS STAGE (Y: 0px – 718px or Full Screen)
          ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: isFullScreenTakeover ? 1920 : seamY,
          zIndex: isFullScreenTakeover ? 30 : 10,
          overflow: "hidden",
          transition: "height 0.3s ease",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Stage 1: HeadlineBadge */}
        {frame >= 0 && frame <= 120 && (
          <HeadlineBadge
            category="SEBI DRHP SPECIAL INVESTIGATION"
            title="₹30,213 CR MEGA IPO"
            subtitle="Should you apply with all family accounts or avoid completely?"
            stamp={{ text: "AVOID?", type: "negative", delayFrames: 25 }}
          />
        )}

        {/* Stage 2: NewspaperClipping */}
        {frame >= 121 && frame <= 240 && (
          <NewspaperClipping
            source="THE ECONOMIC TIMES"
            date="STATUTORY FILING"
            headline="Jio Platforms Files ₹30,213 Crore DRHP With SEBI"
            snippet="100% fresh issue proceeds dedicated to retiring debt, saving ₹8,600 Cr in annual interest."
            highlightPhrase="saving ₹8,600 Cr in annual interest"
            highlightStartFrame={15}
          />
        )}

        {/* Stage 3: ComparisonDuel */}
        {frame >= 241 && frame <= 360 && (
          <ComparisonDuel
            title="TELECOM DUOPOLY SHOOTOUT"
            leftCompetitor={{
              name: "Reliance Jio",
              badge: "34x P/E",
              isWinner: true,
              metrics: [
                { label: "Market Cap", value: "₹10.3L Cr" },
                { label: "EBITDA Margin", value: "50.1%", isHighlight: true },
                { label: "OFS Cashout", value: "0%", isHighlight: true },
              ],
            }}
            rightCompetitor={{
              name: "Bharti Airtel",
              badge: "50x P/E",
              metrics: [
                { label: "Market Cap", value: "₹9.8L Cr" },
                { label: "EBITDA Margin", value: "52.4%" },
                { label: "P/E Multiple", value: "50x" },
              ],
            }}
          />
        )}

        {/* Stage 4: StockTickerCard & MetricOdometer */}
        {frame >= 361 && frame <= 480 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center", width: "90%" }}>
            <StockTickerCard
              companyName="Jio Platforms Limited"
              ticker="JIO"
              exchange="NSE"
              price="₹10,30,000 Cr"
              changePercent="+34x PE"
              isPositive={true}
              metricBadge="DRHP VALUATION"
            />
            <MetricOdometer
              value={8600}
              prefix="₹"
              suffix=" Cr"
              label="Annual Interest Savings Post Debt Reduction"
              durationFrames={30}
            />
          </div>
        )}

        {/* Stage 5: FinancialChart */}
        {frame >= 481 && frame <= 600 && (
          <div style={{ width: "92%" }}>
            <FinancialChart
              title="200 DMA TECHNICAL ACCUMULATION ZONE"
              subtitle="Why strict institutional discipline beats listing day casino"
              dataPoints={[40, 48, 55, 62, 65, 80, 110, 145, 180, 220, 280]}
              dma200Level={65}
              highlightLabel="CLEAN BREAKOUT"
            />
          </div>
        )}

        {/* Stage 6: AutopsyDossier */}
        {frame >= 601 && frame <= 720 && (
          <AutopsyDossier
            title="THE TECH IPO GRAVEYARD"
            alertStamp="WEALTH DESTRUCTION"
            items={[
              { brand: "PAYTM", drawdown: "-71%", initialPrice: "₹2,150", troughPrice: "₹310" },
              { brand: "ZOMATO", drawdown: "-65%", initialPrice: "₹169", troughPrice: "₹40" },
              { brand: "SWIGGY", drawdown: "-50%", initialPrice: "₹390", troughPrice: "₹195" },
            ]}
          />
        )}

        {/* Stage 7: InteractiveCTA */}
        {frame >= 721 && frame <= 840 && (
          <InteractiveCTA
            searchQuery="Happy Investing with SaN"
            videoTitle="The Jio ₹30,213 Cr DRHP Masterclass"
            videoDuration="14:28"
            commentKeyword="JIO"
          />
        )}

        {/* Stage 8: Full Canvas Takeover Demonstration */}
        {frame >= 841 && frame <= 960 && (
          <div style={{ padding: "60px 40px", textAlign: "center", width: "100%" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: SAN_TOKENS.colors.cyan, letterSpacing: "0.15em", marginBottom: 20 }}>
              FULL-CANVAS TAKEOVER MODE
            </div>
            <h1 style={{ fontSize: 56, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.2, marginBottom: 30 }}>
              Facecam Fades to Zero for Full Document Forensics
            </h1>
            <NewspaperClipping
              source="MINISTRY OF CORPORATE AFFAIRS"
              date="SCHEDULE III DISCLOSURE"
              headline="100% Promoter Lock-in Verified by Statutory Auditors"
              snippet="Zero shares offered for sale. Net proceeds flow 100% to capital expenditure and debt retirement."
              highlightPhrase="Zero shares offered for sale"
            />
          </div>
        )}

        {/* Stage 9: Facecam Punch-In Demonstration */}
        {frame >= 961 && frame <= 1080 && (
          <div style={{ position: "absolute", top: 180, left: 40, right: 40, textAlign: "center", zIndex: 40 }}>
            <div
              style={{
                backgroundColor: "rgba(255, 82, 82, 0.9)",
                color: "#FFFFFF",
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "0.12em",
                padding: "12px 30px",
                borderRadius: 999,
                display: "inline-block",
                boxShadow: "0 0 30px rgba(255, 82, 82, 0.6)",
              }}
            >
              FACECAM PUNCH-IN: MAXIMUM IMPACT EMPHASIS
            </div>
          </div>
        )}

        {/* Stage 10: 16:9 Longform Design System Preview */}
        {frame >= 1081 && frame <= 1230 && (
          <div style={{ padding: "40px", textAlign: "center", width: "100%" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: SAN_TOKENS.colors.gold, letterSpacing: "0.15em", marginBottom: 16 }}>
              16:9 LONG-FORM PRODUCTION ENGINE
            </div>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: "#FFFFFF", marginBottom: 24 }}>
              30-32% Facecam Real Estate + Alternating Left/Right
            </h2>
            <ComparisonDuel
              title="16:9 DUAL-COLUMN SPECIFICATION"
              leftCompetitor={{
                name: "Right Tall (32%)",
                badge: "580x980px",
                metrics: [
                  { label: "Framing", value: "Chest-Up" },
                  { label: "Border", value: "24K Gold" },
                ],
              }}
              rightCompetitor={{
                name: "Left Tall (32%)",
                badge: "Alternate",
                isWinner: true,
                metrics: [
                  { label: "Pacing", value: "Every 20s" },
                  { label: "Decoders", value: "Single Persistent" },
                ],
              }}
            />
          </div>
        )}
      </div>

      {/* =========================================================================
          3. PERSISTENT PRESENTER FACECAM (BOTTOM 62.6% @ Y: 718px)
          ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: facecamTop,
          left: 0,
          width: 1080,
          height: facecamHeight,
          overflow: "hidden",
          opacity: facecamOpacity,
          zIndex: 15,
          transition: "opacity 0.2s ease, top 0.3s ease, height 0.3s ease",
          boxShadow: "0 -8px 30px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Video
          src={staticFile("video/jio_reel_facecam_proxy.mp4")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080,
            height: 1920,
            transform: `translateY(${videoTranslateY}px) scale(${videoScale})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* =========================================================================
          4. GOLDEN SEAM LINE DIVIDER (Y = 718px)
          ========================================================================= */}
      {!isFullScreenTakeover && !isFacecamPunch && (
        <div
          style={{
            position: "absolute",
            top: seamY - 1,
            left: 0,
            width: 1080,
            height: 2,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.5) 30%, rgba(0,210,255,0.5) 70%, transparent 100%)",
            zIndex: 25,
            boxShadow: "0 0 12px rgba(255,215,0,0.4)",
          }}
        />
      )}

      {/* =========================================================================
          5. SEAM BRIDGE KINETIC SUBTITLES (Y = 660px)
          ========================================================================= */}
      {!isFullScreenTakeover && !isFacecamPunch && (
        <div
          style={{
            position: "absolute",
            top: SAN_TOKENS.layout.reel9x16.subtitleTop,
            left: 0,
            width: 1080,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          <KineticSubtitles blocks={MASTER_REVIEW_CAPTIONS} />
        </div>
      )}

      {/* =========================================================================
          6. THE INTERACTIVE REVIEW & CORRECTION SPOTTER HUD (PERSISTENT OVERLAY)
          ========================================================================= */}
      <ReviewInspectorHUD
        refId={hudMetadata.refId}
        moduleName={hudMetadata.moduleName}
        layoutType={hudMetadata.layoutType}
        propsSummary={hudMetadata.propsSummary}
        startFrame={hudMetadata.startFrame}
        endFrame={hudMetadata.endFrame}
      />
    </AbsoluteFill>
  );
};
