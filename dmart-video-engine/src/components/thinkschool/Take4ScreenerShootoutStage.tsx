import React from "react";
import { interpolate, spring, staticFile, useVideoConfig } from "remotion";

export interface Take4ScreenerShootoutStageProps {
  localFrame: number;
}

export const Take4ScreenerShootoutStage: React.FC<Take4ScreenerShootoutStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Screen entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Jio Upper Band Card at localFrame 84 (Frame 1676 abs: "At the upper price band of ₹1,119")
  const jioCardSpring = spring({
    frame: Math.max(0, localFrame - 84),
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // Jio 34x-35x Podium at localFrame 220 (Frame 1812 abs: "translates to a Price-to-Earnings multiple...")
  const jioPodiumSpring = spring({
    frame: Math.max(0, localFrame - 220),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Airtel Card at localFrame 510 (Frame 2102 abs: "Now look at Bharti Airtel")
  const airtelHighlightSpring = spring({
    frame: Math.max(0, localFrame - 510),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Airtel 50x Podium at localFrame 566 (Frame 2158 abs: "Airtel currently trades at a PE multiple between 48 and 52")
  const airtelPodiumSpring = spring({
    frame: Math.max(0, localFrame - 566),
    fps,
    config: { damping: 13, stiffness: 90 },
  });

  // Camera slow push-in for background Screener texture
  const pushIn = interpolate(localFrame, [0, 600], [1.0, 1.05], { extrapolateRight: "clamp" });

  const showJio = localFrame >= 84;
  const showAirtel = localFrame >= 510;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070B12",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
        opacity: enterSpring,
      }}
    >
      {/* Background Screener.in Image Capture with slow push-in */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          transform: `scale(${pushIn})`,
          opacity: 0.35,
          filter: "blur(2px)",
        }}
      >
        <img
          src={staticFile("assets/04_duopoly_airtel_screener/01_real_screener_airtel_ratios.png")}
          alt="Screener Airtel"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Top Editorial Header */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div>
          <span
            style={{
              color: "#D4AF37",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            VALUATION SHOOTOUT
          </span>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FFF",
              fontSize: 34,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            Price-to-Earnings Multiples: Jio vs Bharti Airtel
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(13, 19, 34, 0.9)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "10px 20px",
            borderRadius: 12,
            color: "#9CA3AF",
            fontSize: 14,
          }}
        >
          Source: Official DRHP & Live Screener.in Multiples
        </div>
      </div>

      {/* Center Right Valuation Arena (VERTICALLY & HORIZONTALLY CENTERED) */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 420, // Leaving room for SaN's calibrated circle PIP at Bottom-Left (x:60, y:700)
          right: 70,
          bottom: 70,
          display: "flex",
          alignItems: "center", // VERTICALLY CENTERED
          justifyContent: "center",
          gap: 36,
          zIndex: 10,
        }}
      >
        {/* Left / Center Side: Jio Platforms IPO Multiple */}
        {showJio && (
          <div
            style={{
              flex: showAirtel ? 1 : undefined,
              width: !showAirtel ? 640 : undefined,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Jio Top Information Card */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#0D1322",
                border: "2px solid rgba(0, 102, 255, 0.6)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 20,
                transform: `scale(${interpolate(jioCardSpring, [0, 1], [0.92, 1])})`,
                opacity: jioCardSpring,
                boxShadow: "0 15px 35px rgba(0, 102, 255, 0.25)",
              }}
            >
              <div style={{ color: "#38BDF8", fontSize: 13, fontWeight: 800 }}>
                JIO PLATFORMS IPO
              </div>
              <div style={{ color: "#FFF", fontSize: 28, fontWeight: 800, marginTop: 4 }}>
                Upper Price Band: ₹1,119
              </div>
              <div style={{ color: "#93C5FD", fontSize: 15, marginTop: 4 }}>
                Total Valuation: ₹10.31 Lakh Crore (~$124B)
              </div>
            </div>

            {/* Jio P/E Multiple Podium */}
            <div
              style={{
                width: "100%",
                height: 380, // Fixed prominent height in vertical center
                background: "linear-gradient(180deg, #0066FF 0%, #001D4A 100%)",
                borderRadius: 16,
                border: "2.5px solid #38BDF8",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 0 50px rgba(0, 102, 255, 0.4)",
                transform: `scale(${interpolate(jioPodiumSpring, [0, 1], [0.9, 1])})`,
                opacity: jioPodiumSpring,
              }}
            >
              <div>
                <div style={{ color: "#38BDF8", fontSize: 14, fontWeight: 800 }}>
                  ANNUALIZED EARNINGS MULTIPLE
                </div>
                <div style={{ color: "#FFF", fontSize: 56, fontWeight: 900, marginTop: 8 }}>
                  34x – 35x
                </div>
                <div style={{ color: "#E0F2FE", fontSize: 18, fontWeight: 700, marginTop: 4 }}>
                  P/E Multiple at Listing
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(0, 102, 255, 0.35)",
                  padding: "10px 16px",
                  borderRadius: 10,
                  color: "#BAE6FD",
                  fontSize: 14,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Attractively Priced for Long-Term Value
              </div>
            </div>
          </div>
        )}

        {/* Right Side: Bharti Airtel Trading Multiple (ENTERS ONLY at localFrame 510 on 'Now look at Bharti Airtel') */}
        {showAirtel && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Airtel Top Information Card */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#0D1322",
                border: "2px solid rgba(239, 68, 68, 0.6)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 20,
                transform: `scale(${interpolate(airtelHighlightSpring, [0, 1], [0.92, 1])})`,
                opacity: airtelHighlightSpring,
                boxShadow: "0 15px 35px rgba(239, 68, 68, 0.25)",
              }}
            >
              <div style={{ color: "#F87171", fontSize: 13, fontWeight: 800 }}>
                BHARTI AIRTEL (LISTED)
              </div>
              <div style={{ color: "#FFF", fontSize: 28, fontWeight: 800, marginTop: 4 }}>
                Current Market Cap: ~₹9.8 Lakh Cr
              </div>
              <div style={{ color: "#FCA5A5", fontSize: 15, marginTop: 4 }}>
                Live Trading Multiple on NSE / BSE
              </div>
            </div>

            {/* Airtel P/E Multiple Podium (Prominently elevated) */}
            <div
              style={{
                width: "100%",
                height: 480, // Taller and vertically centered
                background: "linear-gradient(180deg, #EF4444 0%, #7F1D1D 100%)",
                borderRadius: 16,
                border: "2.5px solid #F87171",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 0 50px rgba(239, 68, 68, 0.4)",
                transform: `scale(${interpolate(airtelPodiumSpring, [0, 1], [0.9, 1])})`,
                opacity: airtelPodiumSpring,
              }}
            >
              <div>
                <div style={{ color: "#FCA5A5", fontSize: 14, fontWeight: 800 }}>
                  CURRENT TRADING MULTIPLE
                </div>
                <div style={{ color: "#FFF", fontSize: 56, fontWeight: 900, marginTop: 8 }}>
                  48x – 52x
                </div>
                <div style={{ color: "#FEE2E2", fontSize: 18, fontWeight: 700, marginTop: 4 }}>
                  P/E Multiple on Secondary Market
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.35)",
                  padding: "10px 16px",
                  borderRadius: 10,
                  color: "#FECACA",
                  fontSize: 14,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Trades at ~45% Premium Over Jio
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
