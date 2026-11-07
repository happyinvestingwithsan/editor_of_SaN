import React from "react";
import { interpolate, spring, staticFile, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene06_LanguagePortal: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // localFrame 0 is global Frame 1100
  // Global Frame 1248 is localFrame 148!

  // Header springs in at start
  const titleSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Dual language cards (Active during Phase 1: localFrame 0 to 75)
  const langSpring = spring({
    frame: localFrame - 8,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // PROMINENT ELITE QR CODE SPOTLIGHT (SaN's Feedback: Prominently visible to scan at frame 1248!)
  // Springs in @ localFrame 75 (global Frame 1175 on "enroll into master class")
  const qrSpotlightSpring = spring({
    frame: localFrame - 75,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Crossfade between Phase 1 (Languages) and Phase 2 (QR Spotlight)
  const isQrPhase = localFrame >= 75;

  // Radar scan line animation for the QR code
  const radarScan = (localFrame % 45) / 45;

  // Generous dwell time: stays 100% visible until localFrame 205 (global Frame 1305)
  // then fades out smoothly to localFrame 220 (global Frame 1320)
  const opacity = interpolate(localFrame, [205, 220], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 80,
        width: 1040,
        height: 920,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {!isQrPhase ? (
        // PHASE 1: Language Options (localFrame 0 to 75 / global 1100 to 1175)
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Header */}
          <div
            style={{
              transform: `translateY(${(1 - titleSpring) * -20}px)`,
              opacity: titleSpring,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 24px",
                borderRadius: 20,
                background: "rgba(6, 182, 212, 0.18)",
                border: "1.5px solid rgba(6, 182, 212, 0.5)",
                color: theme.colors.cyan,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              SELF-PACED PREVIEW OPTION
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 52,
                fontWeight: 900,
                color: "#FFF",
                letterSpacing: "-0.02em",
              }}
            >
              Can’t Wait Until Nov 1st?
            </h2>
          </div>

          {/* English Card (Primary Highlight) */}
          <div
            style={{
              transform: `translateX(${(1 - langSpring) * -30}px)`,
              opacity: langSpring,
              background:
                "linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(17, 24, 39, 0.96) 100%)",
              border: `2.5px solid ${theme.colors.goldPrimary}`,
              borderRadius: 24,
              padding: "28px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: theme.shadows.goldCard,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <span style={{ fontSize: 50 }}>🇬🇧</span>
              <div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 14px",
                    borderRadius: 12,
                    backgroundColor: theme.colors.goldPrimary,
                    color: "#000",
                    fontSize: 14,
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  PRIMARY HIGHLIGHT
                </div>
                <div
                  style={{
                    color: "#FFF",
                    fontSize: 34,
                    fontWeight: 900,
                  }}
                >
                  English Masterclass (Self-Paced)
                </div>
                <div
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: 22,
                    fontWeight: 600,
                    marginTop: 4,
                  }}
                >
                  Instant streaming on portal • Full valuation library
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "14px 26px",
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.14)",
                border: "1.5px solid rgba(255, 255, 255, 0.25)",
                color: "#FFF",
                fontSize: 20,
                fontWeight: 900,
              }}
            >
              Watch Now ➔
            </div>
          </div>

          {/* Tamil Card */}
          <div
            style={{
              transform: `translateX(${(1 - langSpring) * -30}px)`,
              opacity: langSpring,
              background: "rgba(17, 24, 39, 0.9)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 24,
              padding: "26px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <span style={{ fontSize: 50 }}>🇮🇳</span>
              <div>
                <div
                  style={{
                    color: "#FFF",
                    fontSize: 32,
                    fontWeight: 900,
                  }}
                >
                  Tamil Masterclass (Self-Paced)
                </div>
                <div
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: 22,
                    fontWeight: 600,
                    marginTop: 4,
                  }}
                >
                  Instant streaming • Recorded for regional investors
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "14px 26px",
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.08)",
                border: "1.5px solid rgba(255, 255, 255, 0.15)",
                color: theme.colors.textSecondary,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              Available ➔
            </div>
          </div>
        </div>
      ) : (
        // PHASE 2: PROMINENT ELITE QR CODE CARD (Active from localFrame 75 to 220, peaking at Frame 1248!)
        <div
          style={{
            transform: `scale(${qrSpotlightSpring})`,
            opacity: qrSpotlightSpring,
            background:
              "linear-gradient(145deg, rgba(20, 26, 40, 0.98) 0%, rgba(10, 14, 22, 0.99) 100%)",
            border: `3px solid ${theme.colors.goldPrimary}`,
            borderRadius: 36,
            padding: "44px 50px",
            boxShadow: theme.shadows.goldCard,
            display: "flex",
            alignItems: "center",
            gap: 48,
          }}
        >
          {/* Large Prominent 280px QR Code for Effortless Mobile Phone Scanning */}
          <div
            style={{
              position: "relative",
              padding: 16,
              background: "#FFFFFF",
              borderRadius: 24,
              border: `3px solid ${theme.colors.goldPrimary}`,
              boxShadow: "0 20px 45px rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={staticFile("images/qr_happy_investing.png")}
              alt="Scan QR to Access Masterclass"
              style={{
                width: 270,
                height: 270,
                borderRadius: 14,
                display: "block",
              }}
            />

            {/* Glowing Corner Reticle Markers */}
            <div
              style={{
                position: "absolute",
                top: 6,
                left: 6,
                width: 28,
                height: 28,
                borderTop: `5px solid ${theme.colors.goldPrimary}`,
                borderLeft: `5px solid ${theme.colors.goldPrimary}`,
                borderRadius: "8px 0 0 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 28,
                height: 28,
                borderTop: `5px solid ${theme.colors.goldPrimary}`,
                borderRight: `5px solid ${theme.colors.goldPrimary}`,
                borderRadius: "0 8px 0 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 6,
                left: 6,
                width: 28,
                height: 28,
                borderBottom: `5px solid ${theme.colors.goldPrimary}`,
                borderLeft: `5px solid ${theme.colors.goldPrimary}`,
                borderRadius: "0 0 0 8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 6,
                right: 6,
                width: 28,
                height: 28,
                borderBottom: `5px solid ${theme.colors.goldPrimary}`,
                borderRight: `5px solid ${theme.colors.goldPrimary}`,
                borderRadius: "0 0 8px 0",
              }}
            />

            {/* Kinetic Scanner Beam */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${radarScan * 100}%`,
                height: 4,
                background: "linear-gradient(90deg, transparent, #10B981, transparent)",
                boxShadow: "0 0 12px #10B981",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Description & Website URL */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 22px",
                borderRadius: 20,
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: `1.5px solid ${theme.colors.emeraldNeon}`,
                color: theme.colors.emeraldNeon,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                width: "fit-content",
              }}
            >
              <span>📷</span>
              <span>POINT YOUR PHONE CAMERA</span>
            </div>

            <div
              style={{
                color: "#FFF",
                fontSize: 44,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Instant Masterclass
              <br />
              Streaming Portal
            </div>

            <div
              style={{
                color: theme.colors.goldNeon,
                fontSize: 38,
                fontWeight: 900,
                letterSpacing: "-0.01em",
                marginTop: 4,
                textShadow: "0 0 20px rgba(245, 158, 11, 0.4)",
              }}
            >
              www.happy-investing.in
            </div>

            <div
              style={{
                color: theme.colors.textSecondary,
                fontSize: 24,
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              Scan now to explore English & Tamil recorded sessions immediately.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
