import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  staticFile,
  Video,
  Audio,
  Sequence,
} from "remotion";
import {
  Lock,
  Sparkles,
  Shield,
  Brain,
  TrendingUp,
  Award,
  Users,
  Calendar,
  CheckCircle2,
  Play,
  ArrowRight,
  Maximize2,
  Zap,
  PlayCircle,
  Tv,
  Eye,
  Sun,
  List,
} from "lucide-react";

// =============================================================================
// HIFY LIGHT THEME BRAND TOKENS (Light Mode Throughout)
// =============================================================================
const TOKENS = {
  // Light Canvas & Surfaces
  canvasBg: "#FAFAF8", // Warm luxury off-white
  surfaceCard: "#FFFFFF", // Pure white card
  surfaceMuted: "#F4F4F5", // Light muted surface
  borderSubtle: "#E4E4E7", // Clean hairline border
  borderHairline: "#E5E7EB",

  // Brand Gold (Strictly reserved for bezel & highlights)
  brandGold: "#C8A951",
  brandGoldMuted: "#8E6C20",
  brandGoldGlow: "rgba(200, 169, 81, 0.35)",

  // Typography (Dark Slate / Black)
  textPrimary: "#18181B",
  textSecondary: "#52525B",
  textMuted: "#71717A",

  // Metric Accents
  metricPositive: "#10B981",

  fonts: {
    ui: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    metrics: "'JetBrains Mono', monospace",
  },
};

export const MasterclassOffer_Interval06: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // HOST FACECAM CHOREOGRAPHY (380px Wide Circular Overlay Throughout)
  // Overlay floating on top of full-screen content, moving dynamically
  // =========================================================================
  const CIRCLE_SIZE = 380; // Size matching frame 2393 as requested
  const CIRCLE_RADIUS = CIRCLE_SIZE / 2;

  let facecamStyle: React.CSSProperties = {
    position: "absolute",
    overflow: "hidden",
    zIndex: 100, // Top overlay above all content
    boxSizing: "border-box",
  };

  if (frame < 270) {
    // PHASE 1: Fullscreen Personal Introduction (Frames 0 -> 270 | 0.0s - 9.0s)
    facecamStyle = {
      ...facecamStyle,
      left: 0,
      top: 0,
      width: 1920,
      height: 1080,
      borderRadius: 0,
      border: "none",
      boxShadow: "none",
    };
  } else if (frame >= 270 && frame < 740) {
    // PHASE 2 & 3: Circular PIP Overlay at Bottom-Right (Frames 270 -> 740)
    const pipSpring = spring({
      frame: frame - 270,
      fps,
      config: { damping: 16, stiffness: 95 },
    });

    const pipWidth = interpolate(pipSpring, [0, 1], [1920, CIRCLE_SIZE]);
    const pipHeight = interpolate(pipSpring, [0, 1], [1080, CIRCLE_SIZE]);
    const pipLeft = interpolate(pipSpring, [0, 1], [0, 1490]);
    const pipTop = interpolate(pipSpring, [0, 1], [0, 650]);
    const pipRadius = interpolate(pipSpring, [0, 1], [0, CIRCLE_RADIUS]);
    const borderAlpha = interpolate(pipSpring, [0.3, 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    facecamStyle = {
      ...facecamStyle,
      left: pipLeft,
      top: pipTop,
      width: pipWidth,
      height: pipHeight,
      borderRadius: pipRadius,
      border: `4px solid rgba(200, 169, 81, ${borderAlpha})`,
      boxShadow: `0 20px 50px rgba(0, 0, 0, 0.4), 0 0 35px rgba(200, 169, 81, ${borderAlpha * 0.4})`,
    };
  } else if (frame >= 740 && frame < 1450) {
    // PHASE 4: Glides to Bottom-Left so the 5 Strategy boxes on the right are 100% visible
    const moveLeftSpring = spring({
      frame: frame - 740,
      fps,
      config: { damping: 16, stiffness: 90 },
    });

    const pipLeft = interpolate(moveLeftSpring, [0, 1], [1490, 60]);

    facecamStyle = {
      ...facecamStyle,
      left: pipLeft,
      top: 650,
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_RADIUS,
      border: `4px solid ${TOKENS.brandGold}`,
      boxShadow: `0 20px 50px rgba(0, 0, 0, 0.4), 0 0 35px rgba(200, 169, 81, 0.4)`,
    };
  } else {
    // PHASE 5 & 6: Glides back to Bottom-Right for Theater and Cohort chapters (Frames 1450 -> 2423)
    const moveRightSpring = spring({
      frame: frame - 1450,
      fps,
      config: { damping: 16, stiffness: 90 },
    });

    const pipLeft = interpolate(moveRightSpring, [0, 1], [60, 1490]);

    facecamStyle = {
      ...facecamStyle,
      left: pipLeft,
      top: 650,
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_RADIUS,
      border: `4px solid ${TOKENS.brandGold}`,
      boxShadow: `0 20px 50px rgba(0, 0, 0, 0.4), 0 0 35px rgba(200, 169, 81, 0.4)`,
    };
  }

  // =========================================================================
  // CHAPTER 1: INTRO RESPECT BADGE (Frames 30 -> 265)
  // =========================================================================
  const introBadgeSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const introBadgeOpacity = interpolate(frame, [30, 45, 240, 265], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // CHAPTER 2 & 3: FULL SCREEN LIGHT THEME WEBSITE + FAST SCROLL & FAST MOUSE
  // (Frames 275 -> 740)
  // =========================================================================
  const websiteFadeIn = interpolate(frame, [275, 295, 715, 735], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL typing simulation: "https://happyinvesting.in" (Frames 295 -> 360)
  const fullUrl = "https://happyinvesting.in";
  const typedUrlChars = Math.min(
    fullUrl.length,
    Math.floor(
      interpolate(frame, [295, 360], [0, fullUrl.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );
  const currentUrl = fullUrl.slice(0, typedUrlChars);

  // FAST & NATURAL SCROLLING ACTION (Frames 370 -> 480)
  // Real website scrolls down through framework & philosophy, then swiftly back to Masterclass button
  const pageScrollY = interpolate(
    frame,
    [370, 415, 450, 475],
    [0, -280, -280, 0], // Smooth exploration scroll
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // FAST MOUSE CURSOR TO MASTERCLASS (Frames 455 -> 515)
  // Moves fast with natural acceleration right to the Masterclass button
  let cursorX = 1300;
  let cursorY = 700;
  let cursorClick = false;

  if (frame >= 460 && frame < 515) {
    // Fast glide to Masterclass button (around x: 1055, y: 550)
    const t = interpolate(frame, [465, 498], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    cursorX = interpolate(t, [0, 1], [1400, 1055]);
    cursorY = interpolate(t, [0, 1], [750, 550]);
    cursorClick = frame >= 498 && frame <= 512;
  } else if (frame >= 515 && frame < 560) {
    // Move to Coupon Input Field in Modal (x: 960, y: 520)
    const t = interpolate(frame, [520, 545], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    cursorX = interpolate(t, [0, 1], [1055, 960]);
    cursorY = interpolate(t, [0, 1], [550, 520]);
    cursorClick = frame >= 545 && frame <= 555;
  } else if (frame >= 560 && frame < 720) {
    // Move to Apply Button (x: 1120, y: 520) on cue words (f617 -> f688)
    const t = interpolate(frame, [615, 630], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    cursorX = interpolate(t, [0, 1], [960, 1120]);
    cursorY = interpolate(t, [0, 1], [520, 520]);
    cursorClick = frame >= 630 && frame <= 645;
  }

  // Modal Popup for Coupon Code (Triggered right after click ~f505)
  const modalSpring = spring({
    frame: frame - 505,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Coupon Typing: "EARLYBELIEVER" (Frames 550 -> 615 - perfectly on words "coupon code early believer")
  const fullCoupon = "EARLYBELIEVER";
  const typedCouponChars = Math.min(
    fullCoupon.length,
    Math.floor(
      interpolate(frame, [550, 615], [0, fullCoupon.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );
  const currentCoupon = fullCoupon.slice(0, typedCouponChars);

  // Coupon Applied State (Frame 635+)
  const couponApplied = frame >= 635;
  const couponSuccessSpring = spring({
    frame: frame - 635,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // =========================================================================
  // CHAPTER 4: 5 STRATEGIC PILLARS COVERED IN MASTERCLASS (LIGHT THEME ONLY)
  // Perfectly synchronized to appear EXACTLY on spoken cues:
  // - Box 1: Two-Line Strategy (Large Cap 23 Stocks) -> Spoken cue at f840 ("bread and butter in large cap 23 stocks")
  // - Box 2: Market Psychology -> Spoken cue at f980 ("market psychology")
  // - Box 3: News & Social Media Manipulation -> Spoken cue at f1055 ("news channels and how the social media...")
  // - Box 4: Stand Out of the Crowd -> Spoken cue at f1175 ("safeguard ourself from the crowd")
  // - Box 5: Safeguard from Big Players -> Spoken cue at f1290 ("safeguard ourself from retail manipulation from big players")
  // =========================================================================
  const box1Visible = frame >= 840;
  const box2Visible = frame >= 980;
  const box3Visible = frame >= 1055;
  const box4Visible = frame >= 1175;
  const box5Visible = frame >= 1290;

  const box1Spring = spring({ frame: frame - 840, fps, config: { damping: 15, stiffness: 100 } });
  const box2Spring = spring({ frame: frame - 980, fps, config: { damping: 15, stiffness: 100 } });
  const box3Spring = spring({ frame: frame - 1055, fps, config: { damping: 15, stiffness: 100 } });
  const box4Spring = spring({ frame: frame - 1175, fps, config: { damping: 15, stiffness: 100 } });
  const box5Spring = spring({ frame: frame - 1290, fps, config: { damping: 15, stiffness: 100 } });

  const bentoFade = interpolate(frame, [725, 745, 1435, 1455], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // CHAPTER 5: FULL SCREEN /intro-session (LIGHT THEME) + LANGUAGE MODAL
  // Spoken cue: "three hours master class only for serious people... option of English or Tamil"
  // (Frames 1450 -> 1905)
  // =========================================================================
  const theaterFade = interpolate(frame, [1445, 1465, 1890, 1905], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Language Modal pops up right on cue at f1750 ("option of English or Tamil")
  const langModalSpring = spring({
    frame: frame - 1750,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Cursor moves to click "Watch English" button (Frames 1810 -> 1870)
  let langCursorX = 1350;
  let langCursorY = 650;
  let langCursorClick = false;

  if (frame >= 1800 && frame < 1880) {
    const t = interpolate(frame, [1810, 1845], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    langCursorX = interpolate(t, [0, 1], [1300, 880]);
    langCursorY = interpolate(t, [0, 1], [650, 560]);
    langCursorClick = frame >= 1845 && frame <= 1860;
  }
  const isEnglishChosen = frame >= 1850;

  // =========================================================================
  // CHAPTER 6: GUARANTEE, COHORT & 50-55 MEMBERS MILESTONE (LIGHT THEME)
  // Dynamic, word-by-word synchronized progression with zero stagnation
  // (Frames 1900 -> 2423)
  // - Guarantee Card (f1920): "I am guaranteeing that masterclass will bring you a new perspective"
  // - Perspective Slam (f1982): "a new perspective of stock market"
  // - Step Bridge (f2083): "if you also feel the same..."
  // - Pathfinder Cohort Card (f2125): "consider enrolling into the cohort"
  // - COURSE DATE REVEAL (f2206): "our next cohort will be in November 1st or 2nd week"
  // - 50-55 Community Milestone (f2304): "already serving 50-55 members"
  // - Quote Reveal (f2359): "it's a very small community that I serve"
  // =========================================================================
  const cohortFade = interpolate(frame, [1900, 1920, 2400, 2423], [0, 1, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 1. Guarantee Card (f1920)
  const guaranteeVisible = frame >= 1920;
  const guaranteeSpring = spring({ frame: frame - 1920, fps, config: { damping: 15, stiffness: 100 } });
  const guaranteeWord1Active = frame >= 1920; // "I am guaranteeing"
  const guaranteeWord2Active = frame >= 1948; // "that masterclass will bring you"
  const guaranteePerspectiveActive = frame >= 1982; // "a new perspective of stock market"
  const perspectiveSpring = spring({ frame: frame - 1982, fps, config: { damping: 14, stiffness: 120 } });

  // 2. Step Bridge (f2083)
  const stepBridgeVisible = frame >= 2083;
  const stepBridgeSpring = spring({ frame: frame - 2083, fps, config: { damping: 16, stiffness: 110 } });

  // 3. Pathfinder Cohort Card (f2125)
  const cohortCardVisible = frame >= 2125;
  const cohortCardSpring = spring({ frame: frame - 2125, fps, config: { damping: 15, stiffness: 100 } });

  // 4. Course Date Reveal: STRICTLY AT f2206 ("November 1st or 2nd week")
  const dateRevealed = frame >= 2206;
  const dateSpring = spring({ frame: frame - 2206, fps, config: { damping: 14, stiffness: 115 } });

  // 5. Community Milestone Card (f2304)
  const communityVisible = frame >= 2304;
  const communitySpring = spring({ frame: frame - 2304, fps, config: { damping: 15, stiffness: 95 } });

  // Rolling odometer strictly up to 55 (f2310 -> f2345)
  const memberCounter = Math.floor(
    interpolate(frame, [2310, 2345], [35, 55], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // 6. Spoken Quote Reveal (f2359)
  const quoteVisible = frame >= 2359;
  const quoteSpring = spring({ frame: frame - 2359, fps, config: { damping: 16, stiffness: 100 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: TOKENS.canvasBg,
        fontFamily: TOKENS.fonts.ui,
        color: TOKENS.textPrimary,
        overflow: "hidden",
      }}
    >
      {/* =================================================================== */}
      {/* SYNCHRONIZED AUDIO SFX SOUNDSCAPE (Elite, Crisp UI Audio Design) */}
      {/* =================================================================== */}
      {/* Frame 30: Hook Milestone Badge Pop */}
      <Sequence from={30} durationInFrames={12}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.2} />
      </Sequence>

      {/* Frame 275: Transition to Full Screen Website & Circle Facecam */}

      {/* Frame 500: Mouse clicks 'Masterclass' in Nav Header */}
      <Sequence from={500} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frame 508: Checkout Modal pops up */}
      <Sequence from={508} durationInFrames={12}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.2} />
      </Sequence>

      {/* Frame 632: Mouse clicks 'Apply' Coupon */}
      <Sequence from={632} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frame 636: EARLYBELIEVER Emerald Badge Slam */}
      <Sequence from={636} durationInFrames={15}>
        <Audio src={staticFile("sfx/impact.wav")} volume={1.15} />
      </Sequence>

      {/* Frame 735: Whoosh Transition into 5 Masterclass Pillars */}

      {/* Frame 840: Pillar 1 (Two-Line Strategy & Bread-and-Butter) reveal */}
      <Sequence from={840} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frame 980: Pillar 2 (Market Psychology) reveal */}
      <Sequence from={980} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frame 1055: Pillar 3 (News Channel & Media Manipulation) fracture */}
      <Sequence from={1055} durationInFrames={20}>
        <Audio src={staticFile("sfx/fracture.wav")} volume={1.1} />
      </Sequence>

      {/* Frame 1175: Pillar 4 (Stand Out of the Crowd) reveal */}
      <Sequence from={1175} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frame 1290: Pillar 5 (Safeguard from Retail Manipulation) defense impact */}
      <Sequence from={1290} durationInFrames={15}>
        <Audio src={staticFile("sfx/impact.wav")} volume={1.2} />
      </Sequence>

      {/* Frame 1450: Whoosh Transition to /intro-session page */}

      {/* Frame 1750: Preferred Language Selection Modal pop */}
      <Sequence from={1750} durationInFrames={12}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.25} />
      </Sequence>

      {/* Frame 1850: Mouse clicks 'Watch English' */}
      <Sequence from={1850} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frame 1920: Masterclass Guarantee Impact */}
      <Sequence from={1920} durationInFrames={15}>
        <Audio src={staticFile("sfx/impact.wav")} volume={1.15} />
      </Sequence>

      {/* Frame 1982: 'New Perspective' typography punch */}
      <Sequence from={1982} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.3} />
      </Sequence>

      {/* Frame 2125: Pathfinder Cohort Card Slide-In */}
      <Sequence from={2125} durationInFrames={10}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.25} />
      </Sequence>

      {/* Frame 2206: Course Date 'November 1st or 2nd Week' Reveal */}
      <Sequence from={2206} durationInFrames={12}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.35} />
      </Sequence>

      {/* Frame 2304: Community Milestone 50-55 Members Card Pop */}
      <Sequence from={2304} durationInFrames={12}>
        <Audio src={staticFile("sfx/pop.wav")} volume={1.25} />
      </Sequence>

      {/* =================================================================== */}
      {/* 1. HOOK CHAPTER: RESPECT & DEDICATION BADGE */}
      {/* =================================================================== */}
      {frame >= 30 && frame < 265 && (
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 70,
            zIndex: 110,
            opacity: introBadgeOpacity,
            transform: `translateY(${interpolate(introBadgeSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(16px)",
              border: `1.5px solid ${TOKENS.borderSubtle}`,
              borderLeft: `5px solid ${TOKENS.brandGold}`,
              padding: "18px 28px",
              borderRadius: 20,
              boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: "rgba(200, 169, 81, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: TOKENS.brandGoldMuted,
              }}
            >
              <Sparkles size={26} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: TOKENS.brandGoldMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Community Milestone
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: TOKENS.textPrimary }}>
                Respect for Your Patience & Curiosity
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2 & 3. FULL SCREEN LIGHT THEME WEBSITE + REAL SCROLL & FAST CURSOR */}
      {/* (Frames 275 -> 740) */}
      {/* =================================================================== */}
      {frame >= 275 && frame < 740 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: websiteFadeIn,
            backgroundColor: TOKENS.canvasBg,
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
          {/* Top Browser Bar (Full Screen 1920px wide) */}
          <div
            style={{
              height: 48,
              backgroundColor: "#EDEDEE",
              borderBottom: "1px solid #D4D4D8",
              display: "flex",
              alignItems: "center",
              padding: "0 24px",
              gap: 20,
              zIndex: 30,
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#FF5F56" }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#FFBD2E" }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#27C93F" }} />
            </div>

            <div
              style={{
                flex: 1,
                maxWidth: 720,
                margin: "0 auto",
                height: 32,
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                border: "1px solid #D4D4D8",
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                gap: 10,
                fontSize: 13,
                fontFamily: TOKENS.fonts.metrics,
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <Lock size={13} color={TOKENS.metricPositive} />
              <span style={{ color: TOKENS.textPrimary, fontWeight: 600 }}>{currentUrl}</span>
              {frame >= 295 && frame < 370 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: 14,
                    backgroundColor: TOKENS.brandGold,
                    opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0,
                  }}
                />
              )}
            </div>
            <div style={{ width: 60 }} />
          </div>

          {/* Website Canvas Area */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {/* Real Header Dock (Direct replica of page.tsx lines 641-728) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 64,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                borderBottom: `1px solid ${TOKENS.borderSubtle}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 60px",
                zIndex: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    backgroundColor: TOKENS.brandGold,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    color: "#000",
                    fontSize: 17,
                  }}
                >
                  H
                </div>
                <span style={{ fontSize: 17, fontWeight: 900, color: TOKENS.textPrimary, letterSpacing: "-0.02em" }}>
                  HAPPY INVESTING
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    height: 34,
                    padding: "0 14px",
                    borderRadius: 999,
                    backgroundColor: TOKENS.surfaceMuted,
                    border: `1px solid ${TOKENS.borderSubtle}`,
                    fontSize: 12,
                    fontWeight: 600,
                    color: TOKENS.textSecondary,
                  }}
                >
                  <List size={14} />
                  <span>Sections</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    height: 34,
                    padding: "0 16px",
                    borderRadius: 999,
                    backgroundColor: TOKENS.surfaceMuted,
                    border: `1px solid ${TOKENS.borderSubtle}`,
                    fontSize: 12,
                    fontWeight: 700,
                    color: TOKENS.textPrimary,
                  }}
                >
                  <PlayCircle size={15} color={TOKENS.brandGold} />
                  <span>Masterclass</span>
                </div>

                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: TOKENS.surfaceMuted,
                    border: `1px solid ${TOKENS.borderSubtle}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: TOKENS.brandGoldMuted,
                  }}
                >
                  <Sun size={15} />
                </div>

                <div
                  style={{
                    height: 34,
                    padding: "0 18px",
                    borderRadius: 999,
                    backgroundColor: TOKENS.brandGold,
                    color: "#000",
                    fontSize: 12,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Sign In
                </div>
              </div>
            </div>

            {/* Scrollable Main Content (Page Scrolls up and down) */}
            <div
              style={{
                paddingTop: 80,
                transform: `translateY(${pageScrollY}px)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              {/* HERO SECTION */}
              <div style={{ textAlign: "center", padding: "40px 60px 20px 60px" }}>
                <h1
                  style={{
                    fontSize: 56,
                    fontWeight: 900,
                    color: TOKENS.textPrimary,
                    lineHeight: 1.12,
                    letterSpacing: "-0.035em",
                    marginBottom: 16,
                  }}
                >
                  Investing Doesn&apos;t Have to Be <br />
                  <span style={{ color: TOKENS.brandGold }}>Confusing.</span>
                </h1>

                <p
                  style={{
                    fontSize: 18,
                    color: TOKENS.textSecondary,
                    maxWidth: 720,
                    margin: "0 auto 10px auto",
                    lineHeight: 1.5,
                  }}
                >
                  Clarity over noise. A proven systematic framework designed to help everyday investors build long-term
                  wealth with absolute peace of mind.
                </p>

                <p
                  style={{
                    fontSize: 15,
                    fontStyle: "italic",
                    fontWeight: 600,
                    color: TOKENS.textPrimary,
                    marginBottom: 28,
                  }}
                >
                  &quot;Helping ordinary people become extraordinary investors&quot;
                </p>

                {/* HIFY NEXUS LUXURY CARD */}
                <div
                  style={{
                    maxWidth: 640,
                    margin: "0 auto 28px auto",
                    backgroundColor: TOKENS.surfaceCard,
                    borderRadius: 24,
                    border: `1.5px solid ${TOKENS.borderSubtle}`,
                    padding: 28,
                    boxShadow: "0 20px 45px -10px rgba(0,0,0,0.06)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 60,
                      right: 60,
                      height: 2.5,
                      backgroundColor: TOKENS.brandGold,
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: `1px solid ${TOKENS.borderHairline}`,
                      paddingBottom: 14,
                      marginBottom: 18,
                      fontSize: 12,
                      fontFamily: TOKENS.fonts.metrics,
                      fontWeight: 700,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: TOKENS.brandGoldMuted }}>
                      <span style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: TOKENS.brandGold }} />
                      <span>HIFY NEXUS</span>
                    </div>
                    <span style={{ color: TOKENS.textMuted }}>23 LARGE CAPS • 52WHL</span>
                  </div>

                  {/* Dual CTA: Sign In vs Masterclass */}
                  <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
                    <div
                      style={{
                        flex: 1,
                        height: 50,
                        backgroundColor: TOKENS.brandGold,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        color: "#000",
                        fontWeight: 800,
                        fontSize: 14,
                      }}
                    >
                      <span>Sign In to Portal</span>
                      <ArrowRight size={16} />
                    </div>

                    {/* Masterclass Button - Target of Cursor */}
                    <div
                      style={{
                        padding: "0 26px",
                        height: 50,
                        backgroundColor: frame >= 498 ? "rgba(200, 169, 81, 0.25)" : TOKENS.surfaceMuted,
                        borderRadius: 14,
                        border: `1.5px solid ${frame >= 498 ? TOKENS.brandGold : TOKENS.borderSubtle}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        color: TOKENS.textPrimary,
                        fontWeight: 700,
                        fontSize: 14,
                        transform: frame >= 498 && frame <= 512 ? "scale(0.95)" : "scale(1)",
                        transition: "all 0.1s ease",
                      }}
                    >
                      <PlayCircle size={16} color={TOKENS.brandGoldMuted} />
                      <span>Masterclass</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: `1px solid ${TOKENS.borderHairline}`,
                      paddingTop: 14,
                      marginTop: 18,
                      fontSize: 11,
                      color: TOKENS.textMuted,
                      fontFamily: TOKENS.fonts.metrics,
                    }}
                  >
                    <span>✓ Verified Identity Only</span>
                    <span style={{ color: TOKENS.brandGoldMuted, fontWeight: 700 }}>Complimentary Member Preview</span>
                  </div>
                </div>

                {/* Metrics */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    maxWidth: 580,
                    margin: "0 auto",
                    borderTop: `1px solid ${TOKENS.borderSubtle}`,
                    paddingTop: 18,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: TOKENS.textPrimary, fontFamily: TOKENS.fonts.metrics }}>
                      500+
                    </div>
                    <div style={{ fontSize: 11, textTransform: "uppercase", color: TOKENS.textMuted, fontWeight: 700 }}>
                      Learners
                    </div>
                  </div>
                  <div style={{ borderLeft: `1px solid ${TOKENS.borderSubtle}`, borderRight: `1px solid ${TOKENS.borderSubtle}` }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: TOKENS.textPrimary, fontFamily: TOKENS.fonts.metrics }}>
                      12
                    </div>
                    <div style={{ fontSize: 11, textTransform: "uppercase", color: TOKENS.textMuted, fontWeight: 700 }}>
                      Batches
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: TOKENS.textPrimary, fontFamily: TOKENS.fonts.metrics }}>
                      80+
                    </div>
                    <div style={{ fontSize: 11, textTransform: "uppercase", color: TOKENS.textMuted, fontWeight: 700 }}>
                      Sessions
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LIGHT THEME CHECKOUT & COUPON MODAL POPUP */}
            {frame >= 505 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.45)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 40,
                }}
              >
                <div
                  style={{
                    width: 600,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 24,
                    border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                    padding: 36,
                    boxShadow: "0 25px 70px rgba(0,0,0,0.18)",
                    transform: `scale(${interpolate(modalSpring, [0, 1], [0.88, 1])})`,
                    color: TOKENS.textPrimary,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: TOKENS.brandGoldMuted, textTransform: "uppercase" }}>
                        Checkout & Enrollment
                      </div>
                      <div style={{ fontSize: 24, fontWeight: 900, color: TOKENS.textPrimary }}>
                        3-Hour Masterclass Access
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        backgroundColor: "rgba(200, 169, 81, 0.15)",
                        color: TOKENS.brandGoldMuted,
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      Instant Access
                    </div>
                  </div>

                  {/* Coupon Input Box */}
                  <div style={{ marginBottom: 22 }}>
                    <div style={{ fontSize: 13, color: TOKENS.textSecondary, marginBottom: 8, fontWeight: 600 }}>
                      Have a Referral / Special Coupon Code?
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <div
                        style={{
                          flex: 1,
                          height: 50,
                          backgroundColor: "#FAFAFA",
                          border: `1.5px solid ${frame >= 545 ? TOKENS.brandGold : "#D4D4D8"}`,
                          borderRadius: 12,
                          display: "flex",
                          alignItems: "center",
                          padding: "0 18px",
                          fontFamily: TOKENS.fonts.metrics,
                          fontSize: 16,
                          fontWeight: 700,
                          color: TOKENS.textPrimary,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {currentCoupon || (
                          <span style={{ color: "#A1A1AA", fontFamily: TOKENS.fonts.ui, fontWeight: 500, fontSize: 14 }}>
                            Enter coupon code...
                          </span>
                        )}
                        {frame >= 550 && frame < 615 && (
                          <span
                            style={{
                              display: "inline-block",
                              width: 2,
                              height: 20,
                              backgroundColor: TOKENS.brandGold,
                              marginLeft: 4,
                              opacity: Math.sin(frame * 0.5) > 0 ? 1 : 0,
                            }}
                          />
                        )}
                      </div>

                      <div
                        style={{
                          height: 50,
                          padding: "0 28px",
                          backgroundColor: frame >= 630 ? TOKENS.metricPositive : TOKENS.brandGold,
                          color: frame >= 630 ? "#FFF" : "#000",
                          borderRadius: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: 14,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          cursor: "pointer",
                          transform: frame >= 630 && frame <= 645 ? "scale(0.96)" : "scale(1)",
                        }}
                      >
                        Apply
                      </div>
                    </div>
                  </div>

                  {/* Success Banner */}
                  {couponApplied && (
                    <div
                      style={{
                        padding: "14px 20px",
                        borderRadius: 14,
                        backgroundColor: "#ECFDF5",
                        border: `1.5px solid ${TOKENS.metricPositive}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        transform: `scale(${interpolate(couponSuccessSpring, [0, 1], [0.92, 1])})`,
                      }}
                    >
                      <CheckCircle2 size={22} color={TOKENS.metricPositive} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "#065F46" }}>
                          ✓ Coupon Applied: &quot;EARLYBELIEVER&quot;
                        </div>
                        <div style={{ fontSize: 12, color: "#047857", fontFamily: TOKENS.fonts.metrics }}>
                          Special Discount Activated • 60% Total Off
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mouse Cursor */}
          {frame >= 460 && frame < 720 && (
            <div
              style={{
                position: "absolute",
                left: cursorX,
                top: cursorY,
                zIndex: 60,
                pointerEvents: "none",
                transform: `scale(${cursorClick ? 0.88 : 1})`,
                transition: "transform 0.08s ease",
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.85a.5.5 0 0 0-.35.36z"
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </svg>

              {cursorClick && (
                <div
                  style={{
                    position: "absolute",
                    left: 2,
                    top: 2,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    border: `2.5px solid ${TOKENS.brandGold}`,
                    opacity: 0.8,
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. CHAPTER 4: 5 STRATEGIC PILLARS (LIGHT THEME ONLY, GOLD BEZEL) */}
      {/* Synchronized to appear EXACTLY as each word is spoken */}
      {/* =================================================================== */}
      {frame >= 735 && frame < 1455 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: bentoFade,
            backgroundColor: TOKENS.canvasBg,
            padding: "50px 80px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            zIndex: 10,
          }}
        >
          {/* Header */}
          <div style={{ marginLeft: 460 }}>
            {/* Host circle is at Bottom-Left, so text has plenty of breathing room */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 20,
                backgroundColor: "rgba(200, 169, 81, 0.12)",
                border: "1px solid rgba(200, 169, 81, 0.25)",
                fontSize: 12,
                fontWeight: 800,
                color: TOKENS.brandGoldMuted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 8,
              }}
            >
              <Zap size={14} />
              <span>Masterclass Core Curriculum</span>
            </div>
            <h2 style={{ fontSize: 38, fontWeight: 900, color: TOKENS.textPrimary, letterSpacing: "-0.02em" }}>
              The 5 Core Pillars Covered in Masterclass
            </h2>
          </div>

          {/* TOP ROW: 3 BOXES (Aligned to right of host) */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 20, marginLeft: 460, height: 380 }}>
            {/* BOX 1: Two-Line Strategy (Bread & Butter in Large Cap 23 Stocks) - Cue at f840 */}
            <div
              style={{
                opacity: box1Visible ? 1 : 0,
                transform: `translateY(${box1Visible ? interpolate(box1Spring, [0, 1], [40, 0]) : 40}px)`,
                backgroundColor: TOKENS.surfaceCard,
                borderRadius: 20,
                border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
                transition: "opacity 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      backgroundColor: "rgba(200, 169, 81, 0.15)",
                      color: TOKENS.brandGoldMuted,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: TOKENS.brandGoldMuted, textTransform: "uppercase" }}>
                      Pillar #1 • Bread & Butter
                    </span>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: TOKENS.textPrimary }}>
                      Two-Line Strategy
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: TOKENS.textSecondary, lineHeight: 1.45 }}>
                  My core bread-and-butter strategy in <strong>Large Cap 23 Stocks</strong>. Defined accumulation line and exit line without guessing.
                </p>
              </div>

              {/* 2-Line Chart */}
              <div
                style={{
                  height: 105,
                  backgroundColor: TOKENS.surfaceMuted,
                  borderRadius: 14,
                  border: `1px solid ${TOKENS.borderSubtle}`,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: TOKENS.brandGoldMuted, fontWeight: 800 }}>
                  <span>Line 1: Accumulation Line</span>
                  <span>Systematic Entry</span>
                </div>
                <svg width="100%" height="45" viewBox="0 0 300 45">
                  <path d="M 0 36 Q 75 8 150 22 T 300 12" fill="none" stroke={TOKENS.brandGold} strokeWidth="3" />
                  <path d="M 0 42 Q 75 16 150 30 T 300 20" fill="none" stroke="rgba(200,169,81,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: TOKENS.textMuted, fontFamily: TOKENS.fonts.metrics }}>
                  <span>Line 2: Exit Line</span>
                  <span>Zero Emotion</span>
                </div>
              </div>
            </div>

            {/* BOX 2: Market Psychology - Cue at f980 */}
            <div
              style={{
                opacity: box2Visible ? 1 : 0,
                transform: `translateY(${box2Visible ? interpolate(box2Spring, [0, 1], [40, 0]) : 40}px)`,
                backgroundColor: TOKENS.surfaceCard,
                borderRadius: 20,
                border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
                transition: "opacity 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      backgroundColor: "rgba(200, 169, 81, 0.15)",
                      color: TOKENS.brandGoldMuted,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Brain size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: TOKENS.brandGoldMuted, textTransform: "uppercase" }}>
                      Pillar #2
                    </span>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: TOKENS.textPrimary }}>
                      Market Psychology
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: TOKENS.textSecondary, lineHeight: 1.45 }}>
                  Mastering mental discipline, controlling fear and greed, and aligning your mindset with institutional market behavior.
                </p>
              </div>

              <div
                style={{
                  padding: 14,
                  backgroundColor: TOKENS.surfaceMuted,
                  borderRadius: 14,
                  border: `1px solid ${TOKENS.borderSubtle}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800 }}>
                  <span style={{ color: "#E11D48" }}>Retail Emotional Trap</span>
                  <span style={{ color: "#E11D48" }}>-70% Drawdown</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800 }}>
                  <span style={{ color: TOKENS.brandGoldMuted }}>HIFY Systematic Mindset</span>
                  <span style={{ color: TOKENS.brandGoldMuted }}>Immune</span>
                </div>
              </div>
            </div>

            {/* BOX 3: How News Channels Manipulate Us - Cue at f1055 */}
            <div
              style={{
                opacity: box3Visible ? 1 : 0,
                transform: `translateY(${box3Visible ? interpolate(box3Spring, [0, 1], [40, 0]) : 40}px)`,
                backgroundColor: TOKENS.surfaceCard,
                borderRadius: 20,
                border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
                transition: "opacity 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      backgroundColor: "rgba(200, 169, 81, 0.15)",
                      color: TOKENS.brandGoldMuted,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Tv size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: TOKENS.brandGoldMuted, textTransform: "uppercase" }}>
                      Pillar #3
                    </span>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: TOKENS.textPrimary }}>
                      News Manipulation
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: TOKENS.textSecondary, lineHeight: 1.45 }}>
                  How news channels, headlines, and social media influencers manipulate retail sentiment to create artificial liquidity.
                </p>
              </div>

              <div
                style={{
                  padding: 14,
                  backgroundColor: TOKENS.surfaceMuted,
                  borderRadius: 14,
                  border: `1px solid ${TOKENS.borderSubtle}`,
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#E11D48",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>⚠ Media Hype & Panic Traps Exposed</span>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: 2 WIDE BOXES (Aligned to right of host) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginLeft: 460, height: 380 }}>
            {/* BOX 4: Stand Out of the Crowd - Cue at f1175 */}
            <div
              style={{
                opacity: box4Visible ? 1 : 0,
                transform: `translateY(${box4Visible ? interpolate(box4Spring, [0, 1], [40, 0]) : 40}px)`,
                backgroundColor: TOKENS.surfaceCard,
                borderRadius: 20,
                border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
                transition: "opacity 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      backgroundColor: "rgba(200, 169, 81, 0.15)",
                      color: TOKENS.brandGoldMuted,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Eye size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: TOKENS.brandGoldMuted, textTransform: "uppercase" }}>
                      Pillar #4
                    </span>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: TOKENS.textPrimary }}>
                      Stand Out of the Crowd
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: TOKENS.textSecondary, lineHeight: 1.5 }}>
                  Decoupling completely from retail herd behavior. Learn how to think independently, avoid herd panic, and execute with contrarian precision.
                </p>
              </div>

              <div
                style={{
                  padding: 14,
                  backgroundColor: TOKENS.surfaceMuted,
                  borderRadius: 14,
                  border: `1px solid ${TOKENS.borderSubtle}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: TOKENS.textPrimary }}>
                  Independent Contrarian Execution
                </span>
                <span style={{ color: TOKENS.brandGoldMuted, fontWeight: 800, fontSize: 13 }}>
                  Zero Herd Bias
                </span>
              </div>
            </div>

            {/* BOX 5: Safeguard from Retail Manipulation by Big Players - Cue at f1290 */}
            <div
              style={{
                opacity: box5Visible ? 1 : 0,
                transform: `translateY(${box5Visible ? interpolate(box5Spring, [0, 1], [40, 0]) : 40}px)`,
                backgroundColor: TOKENS.surfaceCard,
                borderRadius: 20,
                border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
                transition: "opacity 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      backgroundColor: "rgba(200, 169, 81, 0.15)",
                      color: TOKENS.brandGoldMuted,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Shield size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: TOKENS.brandGoldMuted, textTransform: "uppercase" }}>
                      Pillar #5 • Defense
                    </span>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: TOKENS.textPrimary }}>
                      Safeguard from Big Players
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: TOKENS.textSecondary, lineHeight: 1.5 }}>
                  Big institutional players engineer liquidity traps and false breakouts. Master how to spot their order footprints and protect your capital.
                </p>
              </div>

              <div
                style={{
                  padding: 14,
                  backgroundColor: TOKENS.surfaceMuted,
                  borderRadius: 14,
                  border: `1px solid ${TOKENS.borderSubtle}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: TOKENS.textPrimary }}>
                  Anti-Manipulation Shield
                </span>
                <span style={{ color: TOKENS.brandGoldMuted, fontWeight: 800, fontSize: 13 }}>
                  100% Protected
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. CHAPTER 5: FULL SCREEN /intro-session (LIGHT THEME) + LANGUAGE MODAL */}
      {/* Direct replica of intro-session/page.tsx lines 154-232 */}
      {/* =================================================================== */}
      {frame >= 1450 && frame < 1905 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: theaterFade,
            backgroundColor: TOKENS.canvasBg,
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
          {/* Top Browser Bar (Full Screen 1920px wide) */}
          <div
            style={{
              height: 48,
              backgroundColor: "#EDEDEE",
              borderBottom: "1px solid #D4D4D8",
              display: "flex",
              alignItems: "center",
              padding: "0 24px",
              gap: 20,
              zIndex: 30,
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#FF5F56" }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#FFBD2E" }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#27C93F" }} />
            </div>

            <div
              style={{
                flex: 1,
                maxWidth: 720,
                margin: "0 auto",
                height: 32,
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                border: "1px solid #D4D4D8",
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                gap: 10,
                fontSize: 13,
                fontFamily: TOKENS.fonts.metrics,
              }}
            >
              <Lock size={13} color={TOKENS.metricPositive} />
              <span style={{ color: TOKENS.textPrimary, fontWeight: 600 }}>
                happyinvesting.in/intro-session
              </span>
            </div>
            <div style={{ width: 60 }} />
          </div>

          {/* Full Screen Intro-Session Theater Canvas */}
          <div style={{ flex: 1, padding: "36px 60px", display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
            {/* Theater Card */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 24,
                border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                padding: 30,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 15px 40px rgba(0,0,0,0.05)",
              }}
            >
              {/* Header Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 20,
                  borderBottom: `1px solid ${TOKENS.borderHairline}`,
                }}
              >
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: TOKENS.textPrimary, textTransform: "uppercase" }}>
                    Introduction Session: Clarity Over Noise
                  </h2>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      height: 34,
                      padding: "0 18px",
                      borderRadius: 10,
                      border: isEnglishChosen ? `2px solid ${TOKENS.brandGold}` : `1px solid ${TOKENS.borderSubtle}`,
                      backgroundColor: isEnglishChosen ? TOKENS.brandGold : TOKENS.surfaceMuted,
                      color: isEnglishChosen ? "#000" : TOKENS.textSecondary,
                      fontWeight: 800,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    English
                  </div>

                  <div
                    style={{
                      height: 34,
                      padding: "0 18px",
                      borderRadius: 10,
                      border: `1px solid ${TOKENS.borderSubtle}`,
                      backgroundColor: TOKENS.surfaceMuted,
                      color: TOKENS.textSecondary,
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Tamil
                  </div>

                  <div
                    style={{
                      height: 34,
                      padding: "0 16px",
                      borderRadius: 10,
                      border: "1px solid rgba(200, 169, 81, 0.3)",
                      backgroundColor: "rgba(200, 169, 81, 0.12)",
                      color: TOKENS.brandGoldMuted,
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Maximize2 size={13} />
                    <span>Fullscreen</span>
                  </div>
                </div>
              </div>

              {/* Theater Video Player */}
              <div
                style={{
                  flex: 1,
                  marginTop: 22,
                  backgroundColor: "#18181B",
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 0 80px rgba(0,0,0,0.8)",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: TOKENS.brandGold,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 45px rgba(200, 169, 81, 0.5)",
                    marginBottom: 18,
                  }}
                >
                  <Play size={34} fill="#000" color="#000" style={{ marginLeft: 4 }} />
                </div>

                <div
                  style={{
                    padding: "10px 26px",
                    borderRadius: 30,
                    backgroundColor: "rgba(0, 0, 0, 0.85)",
                    border: `1.5px solid ${TOKENS.brandGold}`,
                    fontSize: 14,
                    fontWeight: 800,
                    color: "#FFFFFF",
                    letterSpacing: "0.05em",
                    marginBottom: 10,
                  }}
                >
                  Start Masterclass ({isEnglishChosen ? "English" : "Select Language"} - 3 Hours)
                </div>

                <div style={{ fontSize: 13, color: "#A1A1AA" }}>
                  Complete 3.25-Hour Deep Dive Session • Clarity Over Noise
                </div>
              </div>
            </div>

            {/* LIGHT THEME LANGUAGE SELECTION POPUP MODAL (Cue at f1750) */}
            {frame >= 1750 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 40,
                }}
              >
                <div
                  style={{
                    width: 620,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 24,
                    border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                    padding: "40px 36px",
                    textAlign: "center",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
                    position: "relative",
                    overflow: "hidden",
                    transform: `scale(${interpolate(langModalSpring, [0, 1], [0.88, 1])})`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 5,
                      backgroundColor: TOKENS.brandGold,
                    }}
                  />

                  <div style={{ marginBottom: 28 }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        backgroundColor: "rgba(200, 169, 81, 0.12)",
                        border: "1px solid rgba(200, 169, 81, 0.25)",
                        padding: "4px 14px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 800,
                        color: TOKENS.brandGoldMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 12,
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: TOKENS.brandGold }} />
                      <span>Foundational Masterclass</span>
                    </div>

                    <h3 style={{ fontSize: 26, fontWeight: 900, color: TOKENS.textPrimary, marginBottom: 8 }}>
                      Select Preferred Language
                    </h3>
                    <p style={{ fontSize: 14, color: TOKENS.textSecondary, maxWidth: 460, margin: "0 auto" }}>
                      Please choose the language you would like to watch the 3-hour masterclass in:
                    </p>
                  </div>

                  {/* Dual Selection Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
                    {/* OPTION 1: ENGLISH (Target of cursor) */}
                    <div
                      style={{
                        padding: 24,
                        borderRadius: 18,
                        backgroundColor: isEnglishChosen ? "rgba(200, 169, 81, 0.12)" : "#F4F4F5",
                        border: `2px solid ${isEnglishChosen ? TOKENS.brandGold : "#E4E4E7"}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 14,
                        transform: isEnglishChosen && frame >= 1845 && frame <= 1860 ? "scale(0.96)" : "scale(1)",
                        transition: "all 0.1s ease",
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          backgroundColor: "rgba(200, 169, 81, 0.2)",
                          border: "1px solid rgba(200, 169, 81, 0.35)",
                          color: TOKENS.brandGoldMuted,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900,
                          fontSize: 16,
                        }}
                      >
                        EN
                      </div>
                      <div>
                        <h4 style={{ fontSize: 18, fontWeight: 900, color: TOKENS.textPrimary, marginBottom: 4 }}>
                          English
                        </h4>
                        <p style={{ fontSize: 12, color: TOKENS.textMuted }}>
                          Complete 3-hour session in English
                        </p>
                      </div>
                      <div
                        style={{
                          padding: "8px 22px",
                          borderRadius: 12,
                          backgroundColor: TOKENS.brandGold,
                          color: "#000",
                          fontSize: 12,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Watch English
                      </div>
                    </div>

                    {/* OPTION 2: TAMIL */}
                    <div
                      style={{
                        padding: 24,
                        borderRadius: 18,
                        backgroundColor: "#F4F4F5",
                        border: "2px solid #E4E4E7",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          backgroundColor: "rgba(200, 169, 81, 0.2)",
                          border: "1px solid rgba(200, 169, 81, 0.35)",
                          color: TOKENS.brandGoldMuted,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900,
                          fontSize: 16,
                        }}
                      >
                        TA
                      </div>
                      <div>
                        <h4 style={{ fontSize: 18, fontWeight: 900, color: TOKENS.textPrimary, marginBottom: 4 }}>
                          Tamil
                        </h4>
                        <p style={{ fontSize: 12, color: TOKENS.textMuted }}>
                          Complete 3-hour session in Tamil
                        </p>
                      </div>
                      <div
                        style={{
                          padding: "8px 22px",
                          borderRadius: 12,
                          backgroundColor: TOKENS.brandGold,
                          color: "#000",
                          fontSize: 12,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Watch Tamil
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: 11, color: TOKENS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    You can also switch languages anytime using player controls
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mouse Cursor clicking Watch English */}
          {frame >= 1800 && frame < 1880 && (
            <div
              style={{
                position: "absolute",
                left: langCursorX,
                top: langCursorY,
                zIndex: 60,
                pointerEvents: "none",
                transform: `scale(${langCursorClick ? 0.88 : 1})`,
                transition: "transform 0.08s ease",
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.85a.5.5 0 0 0-.35.36z"
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </svg>

              {langCursorClick && (
                <div
                  style={{
                    position: "absolute",
                    left: 2,
                    top: 2,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    border: `2.5px solid ${TOKENS.brandGold}`,
                    opacity: 0.8,
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* 6. CHAPTER 6: COHORT ENROLLMENT & 55 MEMBERS MILESTONE */}
      {/* LIGHT MODE ONLY • GOLD BEZEL & GOLD FONTS ONLY */}
      {/* Synchronized word-by-word with spoken audio */}
      {/* =================================================================== */}
      {frame >= 1900 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: cohortFade,
            backgroundColor: TOKENS.canvasBg,
            padding: "45px 70px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            zIndex: 10,
            maxWidth: 1420, // Leaves right 500px 100% free for 380px circle facecam
          }}
        >
          {/* Top Header */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 14px",
                borderRadius: 20,
                backgroundColor: "rgba(200, 169, 81, 0.12)",
                border: "1px solid rgba(200, 169, 81, 0.25)",
                fontSize: 11,
                fontWeight: 800,
                color: TOKENS.brandGoldMuted,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 6,
              }}
            >
              <Sparkles size={13} />
              <span>Pillar of Conviction • Next Strategic Step</span>
            </div>
            <h2 style={{ fontSize: 38, fontWeight: 900, color: TOKENS.textPrimary, letterSpacing: "-0.03em" }}>
              The Masterclass Guarantee & Pathfinder Cohort
            </h2>
          </div>

          {/* 1. Masterclass Guarantee Hero Card (Cue at f1920) */}
          <div
            style={{
              opacity: guaranteeVisible ? 1 : 0,
              transform: `translateY(${guaranteeVisible ? interpolate(guaranteeSpring, [0, 1], [30, 0]) : 30}px)`,
              backgroundColor: TOKENS.surfaceCard,
              borderRadius: 20,
              border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
              borderLeft: `6px solid ${TOKENS.brandGold}`,
              padding: "24px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
              transition: "opacity 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Shield size={20} color={TOKENS.brandGoldMuted} />
                <span style={{ fontSize: 13, fontWeight: 800, color: TOKENS.brandGoldMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Personal Guarantee by SaN
                </span>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: TOKENS.brandGoldMuted,
                  backgroundColor: "rgba(200, 169, 81, 0.12)",
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: `1px solid rgba(200, 169, 81, 0.3)`,
                }}
              >
                100% Guaranteed Commitment
              </span>
            </div>

            {/* Spoken Word Synchronization Ribbon */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: TOKENS.textSecondary, lineHeight: 1.4 }}>
                <span style={{ color: guaranteeWord1Active ? TOKENS.textPrimary : TOKENS.textMuted, transition: "color 0.2s" }}>
                  &quot;I am guaranteeing that Masterclass
                </span>{" "}
                <span style={{ color: guaranteeWord2Active ? TOKENS.textPrimary : TOKENS.textMuted, transition: "color 0.2s" }}>
                  will bring you...&quot;
                </span>
              </div>

              {/* The Perspective Climax Box (Punches in at f1982) */}
              <div
                style={{
                  opacity: guaranteePerspectiveActive ? 1 : 0,
                  transform: `scale(${guaranteePerspectiveActive ? interpolate(perspectiveSpring, [0, 1], [0.96, 1]) : 0.96})`,
                  backgroundColor: "rgba(200, 169, 81, 0.08)",
                  border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                  borderRadius: 14,
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 25px rgba(200, 169, 81, 0.14)",
                  transition: "opacity 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Award size={26} color={TOKENS.brandGoldMuted} />
                  <span
                    style={{
                      fontSize: 26,
                      fontWeight: 900,
                      color: TOKENS.brandGoldMuted,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    A NEW PERSPECTIVE OF STOCK MARKET
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 12, fontWeight: 700, color: TOKENS.textSecondary }}>
                  <span>✓ Noise-Free Clarity</span>
                  <span>✓ Dual-Line Edge</span>
                  <span>✓ Capital Defense</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Transition Step Bridge (Pops at f2083) */}
          <div
            style={{
              opacity: stepBridgeVisible ? 1 : 0,
              transform: `translateY(${stepBridgeVisible ? interpolate(stepBridgeSpring, [0, 1], [15, 0]) : 15}px)`,
              backgroundColor: TOKENS.surfaceMuted,
              border: `1px solid ${TOKENS.borderSubtle}`,
              borderLeft: `4px solid ${TOKENS.brandGold}`,
              borderRadius: 12,
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              fontWeight: 700,
              color: TOKENS.textSecondary,
              transition: "opacity 0.2s ease",
            }}
          >
            <CheckCircle2 size={16} color={TOKENS.brandGoldMuted} />
            <span>&quot;After watching Masterclass, if you also feel the same...&quot;</span>
            <ArrowRight size={14} color={TOKENS.brandGoldMuted} />
            <span style={{ color: TOKENS.brandGoldMuted, fontWeight: 800 }}>
              Consider Enrolling into the Pathfinder Cohort
            </span>
          </div>

          {/* 3. Lower Split Section (Cohort Card & Community Milestone) */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.95fr", gap: 20, flex: 1 }}>
            {/* Card 1: Pathfinder Cohort (Reveals at f2125, Date reveals STRICTLY at f2206) */}
            <div
              style={{
                opacity: cohortCardVisible ? 1 : 0,
                transform: `translateY(${cohortCardVisible ? interpolate(cohortCardSpring, [0, 1], [25, 0]) : 25}px)`,
                backgroundColor: TOKENS.surfaceCard,
                borderRadius: 20,
                border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                borderTop: `5px solid ${TOKENS.brandGold}`,
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
                transition: "opacity 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Users size={20} color={TOKENS.brandGoldMuted} />
                    <span style={{ fontSize: 13, fontWeight: 800, color: TOKENS.brandGoldMuted, textTransform: "uppercase" }}>
                      Mentorship Cohort
                    </span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: TOKENS.textMuted, textTransform: "uppercase" }}>
                    Live Guidance
                  </span>
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 900, color: TOKENS.textPrimary, marginBottom: 8 }}>
                  Pathfinder Mentorship Desk
                </h3>
                <p style={{ fontSize: 14, color: TOKENS.textSecondary, lineHeight: 1.5, marginBottom: 16 }}>
                  Direct live mentorship guided by SaN. Hands-on market psychology, two-line execution, and disciplined capital allocation.
                </p>

                {/* THE COURSE DATE: REVEALED STRICTLY ON CUE AT f2206 ("November 1st or 2nd week") */}
                {!dateRevealed ? (
                  // Before f2206: Anticipation / Locked Slot
                  <div
                    style={{
                      padding: "16px 20px",
                      borderRadius: 14,
                      backgroundColor: TOKENS.surfaceMuted,
                      border: `1.5px dashed ${TOKENS.borderSubtle}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Calendar size={18} color={TOKENS.textMuted} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: TOKENS.textSecondary }}>
                      Next Batch Schedule: Announcing on Voice Cue...
                    </span>
                  </div>
                ) : (
                  // At and after f2206: Animated Reveal Slam
                  <div
                    style={{
                      transform: `translateY(${interpolate(dateSpring, [0, 1], [15, 0])}px)`,
                      padding: "16px 22px",
                      borderRadius: 14,
                      backgroundColor: "rgba(200, 169, 81, 0.1)",
                      border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                      boxShadow: "0 10px 25px rgba(200, 169, 81, 0.18)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: TOKENS.brandGoldMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Official Batch Schedule
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: TOKENS.metricPositive }}>
                        ● Live Intake Confirmed
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
                      <Calendar size={22} color={TOKENS.brandGoldMuted} />
                      <span
                        style={{
                          fontSize: 26,
                          fontWeight: 900,
                          color: TOKENS.textPrimary,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        November 1st or 2nd Week
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Priority Access Note (Cue at f2250) */}
              <div
                style={{
                  opacity: frame >= 2250 ? 1 : 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  fontWeight: 800,
                  color: TOKENS.brandGoldMuted,
                  marginTop: 12,
                  transition: "opacity 0.2s ease",
                }}
              >
                <CheckCircle2 size={15} />
                <span>Priority Seats Reserved for Masterclass Graduates</span>
              </div>
            </div>

            {/* Card 2: 50-55 Members Community Milestone (Reveals at f2304) */}
            <div
              style={{
                opacity: communityVisible ? 1 : 0,
                transform: `translateY(${communityVisible ? interpolate(communitySpring, [0, 1], [25, 0]) : 25}px)`,
                backgroundColor: TOKENS.surfaceCard,
                borderRadius: 20,
                border: `2px solid ${TOKENS.brandGold}`, // Gold Bezel
                borderTop: `5px solid ${TOKENS.brandGold}`,
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
                transition: "opacity 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <Award size={20} color={TOKENS.brandGoldMuted} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: TOKENS.brandGoldMuted, textTransform: "uppercase" }}>
                    Intimate Community Desk
                  </span>
                </div>

                {/* Animated 50-55 Members Metric (Starts at f2310) */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, margin: "8px 0" }}>
                  <span
                    style={{
                      fontSize: 68,
                      fontWeight: 900,
                      fontFamily: TOKENS.fonts.metrics,
                      color: TOKENS.textPrimary,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {memberCounter}
                  </span>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: TOKENS.brandGoldMuted }}>
                      Active Members
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: TOKENS.textMuted }}>
                      Strict Size Cap
                    </div>
                  </div>
                </div>

                {/* Spoken Quote Card (Reveals at f2359 on voice cue) */}
                <div
                  style={{
                    opacity: quoteVisible ? 1 : 0,
                    transform: `translateY(${quoteVisible ? interpolate(quoteSpring, [0, 1], [10, 0]) : 10}px)`,
                    backgroundColor: TOKENS.surfaceMuted,
                    borderLeft: `4px solid ${TOKENS.brandGold}`,
                    borderRadius: 10,
                    padding: "12px 16px",
                    marginTop: 8,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <p style={{ fontSize: 14, color: TOKENS.textPrimary, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
                    &quot;It&apos;s a very small community of{" "}
                    <strong style={{ color: TOKENS.brandGoldMuted, fontStyle: "normal" }}>50-55 members</strong> that I&apos;ll serve.&quot;
                  </p>
                  <span style={{ fontSize: 11, color: TOKENS.textSecondary, display: "block", marginTop: 4 }}>
                    Preserving high signal integrity & zero crowd noise.
                  </span>
                </div>
              </div>

              {/* Lead-in to next interval (Risk Management) */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 800,
                  color: TOKENS.brandGoldMuted,
                  marginTop: 12,
                }}
              >
                <span>Now let&apos;s dive into Risk Management</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CONTINUOUS HOST FACECAM STREAM (380px WIDE CIRCLE OVERLAY) */}
      {/* Floating directly on top of all content with brand gold border */}
      {/* =================================================================== */}
      <div style={facecamStyle}>
        <Video
          src={staticFile("facecam_perfect_monotonic.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
