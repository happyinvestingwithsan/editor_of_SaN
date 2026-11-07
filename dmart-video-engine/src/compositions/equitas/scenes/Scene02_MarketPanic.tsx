import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene02_MarketPanic: React.FC<SceneProps> = ({
  startFrame = 160,
  durationFrames = 395,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Background subtle push-in & dark overlay
  const bgScale = interpolate(localFrame, [0, durationFrames], [1.0, 1.12], {
    extrapolateRight: "clamp",
  });

  // Headline 1 Entrance (Frames 0 - 25: "Every headline is screaming...")
  const headline1Spring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Marker highlight sweep on "CEO Resigns" snaps to frame 65 (abs 225: "CEO resigns!")
  const markerWidth = interpolate(localFrame - 65, [0, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline 2 Entrance snaps to frame 120 (abs 280: "Panic selling at 52-week low")
  const headline2Spring = spring({
    frame: localFrame - 120,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Headline 3 / "Is this another bank story?" snaps to frame 260 (abs 420)
  const warningSpring = spring({
    frame: localFrame - 260,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Stamp Slam snaps to frame 280 (abs 440)
  const stampSpring = spring({
    frame: localFrame - 280,
    fps,
    config: { damping: 9, stiffness: 180 },
  });

  // Screen shake on stamp impact
  const shake =
    localFrame >= 280 && localFrame <= 296
      ? Math.sin((localFrame - 280) * 2) * (296 - localFrame) * 0.7
      : 0;

  // Exit transition
  const exitProgress = interpolate(
    localFrame,
    [durationFrames - 15, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        backgroundColor: "#0B0F17",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 48px",
        boxSizing: "border-box",
        opacity: 1 - exitProgress,
        transform: `translate(${shake}px, ${shake * 0.5}px)`,
        fontFamily: EQUITAS_THEME.fonts.display,
        zIndex: 35,
      }}
    >
      {/* 1. Dramatic Darkened Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          opacity: 0.35,
        }}
      >
        <Img
          src={staticFile("assets/equitas/images/market_crash_terminal.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${bgScale})`,
            filter: "brightness(0.6) contrast(1.2) grayscale(0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(11,15,23,0.85) 0%, rgba(11,15,23,0.65) 50%, rgba(11,15,23,0.95) 100%)",
          }}
        />
      </div>

      {/* Top Banner Tag */}
      <div
        style={{
          position: "absolute",
          top: 130,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 28px",
          backgroundColor: "rgba(255, 59, 48, 0.22)",
          border: "2px solid #FF3B30",
          borderRadius: 999,
          boxShadow: "0 0 30px rgba(255, 59, 48, 0.4)",
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.1em" }}>
          🚨 FINANCIAL MEDIA PANIC CYCLE
        </span>
      </div>

      {/* Container for Stacked Headline Cards */}
      <div
        style={{
          position: "relative",
          width: 980,
          height: 1280,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* CARD 1: Mint / Economic Times: CEO Resigns */}
        <div
          style={{
            width: 960,
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            padding: "40px 44px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
            color: "#0F172A",
            transform: `translateY(${interpolate(headline1Spring, [0, 1], [80, 0])}px) rotate(${interpolate(
              headline1Spring,
              [0, 1],
              [-4, -1]
            )}deg)`,
            opacity: interpolate(headline1Spring, [0, 1], [0, 1]),
            border: "2px solid rgba(0,0,0,0.15)",
            position: "relative",
          }}
        >
          {/* Masthead */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #0F172A",
              paddingBottom: 16,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: "0.15em",
                fontFamily: "'Georgia', serif",
                textTransform: "uppercase",
              }}
            >
              THE ECONOMIC TIMES
            </span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#DC2626" }}>BREAKING NEWS</span>
          </div>

          {/* Headline with Yellow Highlighter Sweep */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <h2
              style={{
                fontSize: 48,
                fontWeight: 900,
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "-0.02em",
                color: "#0F172A",
              }}
            >
              Equitas SFB MD & CEO{" "}
              <span style={{ position: "relative", display: "inline-block", zIndex: 2 }}>
                P.N. Vasudevan Resigns
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 2,
                    height: "40%",
                    width: `${markerWidth}%`,
                    backgroundColor: "rgba(255, 230, 0, 0.75)",
                    zIndex: -1,
                    transform: "skewX(-6deg)",
                  }}
                />
              </span>
            </h2>
          </div>

          <p style={{ fontSize: 24, fontWeight: 600, color: "#475569", marginTop: 16, lineHeight: 1.4 }}>
            Founder steps down abruptly citing personal reasons; shares tumble across trading sessions.
          </p>
        </div>

        {/* CARD 2: Panic Selling at 52-Week Low */}
        {localFrame >= 120 && (
          <div
            style={{
              width: 960,
              backgroundColor: "rgba(23, 27, 33, 0.98)",
              borderRadius: 24,
              padding: "36px 44px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
              color: "#FFFFFF",
              transform: `translateY(${interpolate(headline2Spring, [0, 1], [60, 0])}px) rotate(${interpolate(
                headline2Spring,
                [0, 1],
                [4, 1.5]
              )}deg)`,
              opacity: interpolate(headline2Spring, [0, 1], [0, 1]),
              border: "2px solid rgba(255, 59, 48, 0.5)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#FF5C4D",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                LIVE MARKET FEED • MONEYCONTROL
              </span>
              <span
                style={{
                  backgroundColor: "#FF3B30",
                  color: "#FFF",
                  padding: "6px 16px",
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                52-WEEK LOW
              </span>
            </div>

            <h3 style={{ fontSize: 42, fontWeight: 900, color: "#FFFFFF", margin: "8px 0 16px", lineHeight: 1.2 }}>
              Panic Selling Grips Counter: Retail Investors Dump Holdings
            </h3>

            <div style={{ display: "flex", gap: 18, marginTop: 14 }}>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 16, color: "#CBD5E1", fontWeight: 700 }}>Drop from 52W High</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#FF3B30", fontFamily: EQUITAS_THEME.fonts.mono }}>
                  -37.6%
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 16, color: "#CBD5E1", fontWeight: 700 }}>Retail Volume Surge</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#FFB020", fontFamily: EQUITAS_THEME.fonts.mono }}>
                  4.8x Spike
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CARD 3: The Big Question Stamp: "IS THIS ANOTHER BANK SCAM?" */}
        {localFrame >= 260 && (
          <div
            style={{
              width: 960,
              backgroundColor: "rgba(17, 24, 32, 0.98)",
              borderRadius: 24,
              padding: "40px 44px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(255, 59, 48, 0.4)",
              border: "2px solid #FF3B30",
              transform: `translateY(${interpolate(warningSpring, [0, 1], [80, 0])}px)`,
              opacity: interpolate(warningSpring, [0, 1], [0, 1]),
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "#FFB020",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              RETAIL INVESTOR PARANOIA
            </div>

            <h2
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: "#FFFFFF",
                margin: "6px 0 20px",
                lineHeight: 1.2,
                textShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}
            >
              "IS THIS ANOTHER BANK STORY?"
            </h2>

            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14 }}>
              {["YES BANK?", "DHFL?", "PMC BANK?"].map((scam, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "rgba(255, 59, 48, 0.2)",
                    border: "1.5px solid rgba(255, 59, 48, 0.6)",
                    borderRadius: 12,
                    padding: "10px 24px",
                    color: "#FF8A80",
                    fontWeight: 900,
                    fontSize: 24,
                  }}
                >
                  {scam}
                </div>
              ))}
            </div>

            {/* Red Rubber Stamp Slam */}
            {localFrame >= 280 && (
              <div
                style={{
                  position: "absolute",
                  top: "35%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(-12deg) scale(${interpolate(
                    stampSpring,
                    [0, 1],
                    [2.8, 1.0]
                  )})`,
                  opacity: interpolate(stampSpring, [0, 1], [0, 1]),
                  border: "6px dashed #FF3B30",
                  padding: "16px 42px",
                  borderRadius: 20,
                  backgroundColor: "rgba(255, 59, 48, 0.2)",
                  boxShadow: "0 0 40px rgba(255, 59, 48, 0.7)",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    color: "#FF3B30",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    textShadow: "0 0 15px rgba(255, 59, 48, 0.9)",
                  }}
                >
                  PANIC CONTAGION
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
