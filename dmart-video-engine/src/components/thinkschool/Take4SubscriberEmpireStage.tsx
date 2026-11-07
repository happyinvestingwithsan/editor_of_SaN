import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take4SubscriberEmpireStageProps {
  localFrame: number; // 0 at Frame 500 of Master
}

export const Take4SubscriberEmpireStage: React.FC<Take4SubscriberEmpireStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Stage entrance at Frame 560 (localFrame 0)
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Jio Tower rises at localFrame 10 (Frame 570 abs, exact word "53.3")
  const jioTowerSpring = spring({
    frame: Math.max(0, localFrame - 10),
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // 40% market share badge at localFrame 114 (Frame 674 abs, exact word "40%")
  const jioShareSpring = spring({
    frame: Math.max(0, localFrame - 114),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Airtel Tower rises at localFrame 206 (Frame 766 abs, exact word "Airtel's")
  const airtelTowerSpring = spring({
    frame: Math.max(0, localFrame - 206),
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Gap Lead Bracket at localFrame 266 (Frame 826 abs, exact comparison finish)
  const gapBracketSpring = spring({
    frame: Math.max(0, localFrame - 266),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Animated counters
  const jioSubs = (interpolate(jioTowerSpring, [0, 1], [0, 53.3])).toFixed(1);
  const airtelSubs = (interpolate(airtelTowerSpring, [0, 1], [0, 40.5])).toFixed(1);

  // Airtel is only visible when SaN reaches "compared to Airtel" (localFrame >= 200)
  const showAirtel = localFrame >= 200;

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 70,
        width: 1160,
        height: 940,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: "'Inter', system-ui, sans-serif",
        transform: `translateY(${interpolate(enterSpring, [0, 1], [25, 0])}px)`,
        opacity: enterSpring,
      }}
    >
      {/* Header Tag */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#0D1322",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "18px 28px",
        }}
      >
        <div>
          <span
            style={{
              color: "#38BDF8",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            OPERATING METRIC 01
          </span>
          <div style={{ color: "#FFF", fontSize: 24, fontWeight: 700, marginTop: 4 }}>
            Subscriber Base & Indian Mobile Market Share
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(0, 229, 153, 0.15)",
            border: "1px solid #00E599",
            color: "#00E599",
            padding: "8px 16px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          TRAI AUDITED
        </div>
      </div>

      {/* Main Bar Chart Arena */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#080C16",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "36px 48px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          position: "relative",
          boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
        }}
      >
        {/* Floating Gap Dimension Bracket (Clamps only after both are revealed) */}
        {gapBracketSpring > 0.05 && (
          <div
            style={{
              position: "absolute",
              top: 50,
              left: "50%",
              transform: `translateX(-50%) scale(${interpolate(gapBracketSpring, [0, 1], [0.85, 1])})`,
              opacity: gapBracketSpring,
              backgroundColor: "rgba(212, 175, 55, 0.15)",
              border: "1.5px solid rgba(212, 175, 55, 0.8)",
              borderRadius: 12,
              padding: "12px 24px",
              color: "#D4AF37",
              fontWeight: 800,
              fontSize: 18,
              boxShadow: "0 10px 25px rgba(212, 175, 55, 0.2)",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <div>+12.8 CRORE SUBSCRIBER ADVANTAGE</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#E5E7EB", marginTop: 2 }}>
              Jio subscriber base is 31.6% larger than Bharti Airtel
            </div>
          </div>
        )}

        {/* Jio Tower (Always present, rises exactly on "53.3") */}
        <div
          style={{
            width: 380,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Jio Top Callout */}
          <div
            style={{
              marginBottom: 16,
              textAlign: "center",
              opacity: jioTowerSpring,
            }}
          >
            <div style={{ color: "#38BDF8", fontSize: 16, fontWeight: 800 }}>RELIANCE JIO</div>
            <div style={{ color: "#FFF", fontSize: 48, fontWeight: 900, marginTop: 4 }}>
              {jioSubs} <span style={{ fontSize: 24, fontWeight: 700 }}>Cr</span>
            </div>
            {jioShareSpring > 0.05 && (
              <div
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  backgroundColor: "rgba(56, 189, 248, 0.2)",
                  border: "1px solid #38BDF8",
                  color: "#38BDF8",
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 800,
                  opacity: jioShareSpring,
                  transform: `scale(${interpolate(jioShareSpring, [0, 1], [0.8, 1])})`,
                }}
              >
                ~40% OF TOTAL INDIAN MARKET
              </div>
            )}
          </div>

          {/* Jio Bar Column */}
          <div
            style={{
              width: "100%",
              height: interpolate(jioTowerSpring, [0, 1], [0, 480]),
              background: "linear-gradient(180deg, #0066FF 0%, #002D62 100%)",
              borderRadius: "16px 16px 0 0",
              border: "2px solid rgba(56, 189, 248, 0.6)",
              boxShadow: "0 0 40px rgba(0, 102, 255, 0.4)",
            }}
          />
        </div>

        {/* Airtel Tower (ENTERS ONLY AT FRAME 766 ON "compared to Airtel") */}
        <div
          style={{
            width: 380,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: showAirtel ? 1 : 0,
            pointerEvents: showAirtel ? "auto" : "none",
          }}
        >
          {showAirtel && (
            <>
              {/* Airtel Top Callout */}
              <div
                style={{
                  marginBottom: 16,
                  textAlign: "center",
                  opacity: airtelTowerSpring,
                }}
              >
                <div style={{ color: "#F87171", fontSize: 16, fontWeight: 800 }}>BHARTI AIRTEL</div>
                <div style={{ color: "#FFF", fontSize: 48, fontWeight: 900, marginTop: 4 }}>
                  {airtelSubs} <span style={{ fontSize: 24, fontWeight: 700 }}>Cr</span>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    marginTop: 8,
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                    border: "1px solid #EF4444",
                    color: "#FCA5A5",
                    padding: "6px 14px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 800,
                    opacity: airtelTowerSpring,
                  }}
                >
                  ~30.4% DOMESTIC BASE
                </div>
              </div>

              {/* Airtel Bar Column */}
              <div
                style={{
                  width: "100%",
                  height: interpolate(airtelTowerSpring, [0, 1], [0, 365]),
                  background: "linear-gradient(180deg, #EF4444 0%, #7F1D1D 100%)",
                  borderRadius: "16px 16px 0 0",
                  border: "2px solid rgba(239, 68, 68, 0.6)",
                  boxShadow: "0 0 35px rgba(239, 68, 68, 0.3)",
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
