import React from "react";
import { spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelOutroStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 3163,
  durationFrames = 622, // 3163 to 3785
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Sub-phases:
  // Phase 1 (0 to 180): YouTube Search Bar Animated Typing "Happy Investing with SaN"
  // Phase 2 (180 to 300): Latest Masterclass Video Card
  // Phase 3 (300 to 420): Synced "JIO" Comment Section
  // Phase 4 (420 to 510): Link in Bio / Description / Pinned Comment Callout
  // Phase 5 (510 to 622): Official Happy Investing Logo_2026.png + Outro
  const isPhase1 = localFrame < 180;
  const isPhase2 = localFrame >= 180 && localFrame < 300;
  const isPhase3 = localFrame >= 300 && localFrame < 420;
  const isPhase4 = localFrame >= 420 && localFrame < 510;
  const isPhase5 = localFrame >= 510;

  // Springs
  const spring1 = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 120 } });
  const spring2 = spring({ frame: localFrame - 180, fps, config: { damping: 14, stiffness: 120 } });
  const spring3 = spring({ frame: localFrame - 300, fps, config: { damping: 12, stiffness: 130 } });
  const spring4 = spring({ frame: localFrame - 420, fps, config: { damping: 12, stiffness: 140 } });
  const spring5 = spring({ frame: localFrame - 510, fps, config: { damping: 12, stiffness: 120 } });

  // Search query typing: "Happy Investing with SaN" (24 chars)
  const fullSearchQuery = "Happy Investing with SaN";
  const searchCharCount = Math.min(
    fullSearchQuery.length,
    Math.max(0, Math.floor((localFrame - 20) / 4))
  );
  const typedSearch = fullSearchQuery.slice(0, searchCharCount);

  // Comment typing: "JIO" (starts typing around localFrame 340 to sync with speech)
  const commentText = "JIO".slice(
    0,
    Math.min(3, Math.max(0, Math.floor((localFrame - 345) / 5)))
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 720,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 40px 20px",
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {/* Phase 1: YouTube Search Bar typing "Happy Investing with SaN" */}
      {isPhase1 && (
        <div
          style={{
            transform: `scale(${spring1})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* YouTube Header Pill */}
          <div
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.15)",
              border: "1.5px solid #FF0000",
              borderRadius: 24,
              padding: "6px 20px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 22,
                height: 16,
                backgroundColor: "#FF0000",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: 10,
              }}
            >
              ▶
            </div>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Search on YouTube
            </span>
          </div>

          {/* YouTube Search Bar Card */}
          <div
            style={{
              backgroundColor: "#1F1F1F",
              border: "1.5px solid rgba(255, 255, 255, 0.25)",
              borderRadius: 30,
              padding: "16px 28px",
              width: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 16px 40px rgba(0,0,0,0.7), 0 0 20px rgba(255,0,0,0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 24, opacity: 0.7 }}>🔍</span>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  color: "#FFFFFF",
                  letterSpacing: 0.5,
                }}
              >
                {typedSearch}
                <span
                  style={{
                    color: "#3EA6FF",
                    opacity: localFrame % 8 < 4 ? 1 : 0,
                    fontWeight: 900,
                  }}
                >
                  |
                </span>
              </span>
            </div>
            <div
              style={{
                backgroundColor: "#303030",
                borderRadius: 20,
                padding: "8px 18px",
                color: "#AAAAAA",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Search
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: Latest Video Card Preview */}
      {isPhase2 && (
        <div
          style={{
            transform: `scale(${spring2})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 208, 156, 0.15)",
              border: "1.5px solid #00D09C",
              borderRadius: 24,
              padding: "6px 20px",
              marginBottom: 12,
            }}
          >
            <span style={{ color: "#00D09C", fontSize: 18, fontWeight: 800 }}>
              Latest Video on Channel
            </span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "1.5px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 20,
              padding: "16px 24px",
              width: 900,
              display: "flex",
              alignItems: "center",
              gap: 20,
              boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                width: 140,
                height: 85,
                backgroundColor: "#0B0F17",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              📺
            </div>
            <div>
              <div style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 900 }}>
                Jio Mega IPO: 400-Page DRHP Breakdown
              </div>
              <p style={{ color: "#94A3B8", fontSize: 16, margin: "4px 0 0" }}>
                Full forensic valuation, debt repayment & entry triggers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: Synced Comment "JIO" Box */}
      {isPhase3 && (
        <div
          style={{
            transform: `scale(${spring3})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            COMMENT <span style={{ color: "#00D09C" }}>"JIO"</span> BELOW
          </div>

          <div
            style={{
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "2px solid #00D09C",
              borderRadius: 20,
              padding: "16px 28px",
              width: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 16px 40px rgba(0, 208, 156, 0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 26 }}>💬</span>
              <span
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#FFFFFF",
                }}
              >
                {commentText}
                <span style={{ opacity: localFrame % 8 < 4 ? 1 : 0 }}>|</span>
              </span>
            </div>
            <div
              style={{
                backgroundColor: commentText.length >= 3 ? "#00D09C" : "rgba(255,255,255,0.1)",
                color: commentText.length >= 3 ? "#0B0F17" : "#888888",
                fontWeight: 900,
                fontSize: 16,
                borderRadius: 12,
                padding: "8px 18px",
                transition: "all 0.15s ease",
              }}
            >
              SEND
            </div>
          </div>
        </div>
      )}

      {/* Phase 4: Link in Bio / Description / Pinned Comment Callout */}
      {isPhase4 && (
        <div
          style={{
            transform: `scale(${spring4})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 176, 32, 0.15)",
              border: "1.5px solid #FFB020",
              borderRadius: 24,
              padding: "6px 20px",
              marginBottom: 12,
            }}
          >
            <span style={{ color: "#FFB020", fontSize: 18, fontWeight: 800 }}>
              Direct Video Link
            </span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "2px solid #FFB020",
              borderRadius: 20,
              padding: "18px 32px",
              width: 920,
              textAlign: "center",
              boxShadow: "0 16px 40px rgba(255, 176, 32, 0.25)",
            }}
          >
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                fontFamily: "'Inter', sans-serif",
                color: "#FFFFFF",
                letterSpacing: 1,
              }}
            >
              🔗 LINK IN BIO • DESCRIPTION • PINNED COMMENT
            </div>
            <div
              style={{
                fontSize: 24,
                marginTop: 6,
                color: "#00D09C",
                fontWeight: 800,
              }}
            >
              👇 Tap to watch the full 400-page deep dive
            </div>
          </div>
        </div>
      )}

      {/* Phase 5: Official Happy Investing Logo_2026.png + Outro */}
      {isPhase5 && (
        <div
          style={{
            transform: `scale(${spring5})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Official Happy Investing Logo from kit */}
          <div
            style={{
              marginBottom: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              filter: "drop-shadow(0 0 25px rgba(255, 176, 32, 0.45))",
            }}
          >
            <img
              src={staticFile("images/Happy_Investing_Logo_2026.png")}
              alt="Happy Investing Logo"
              style={{
                height: 110,
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              fontFamily: "'Inter', sans-serif",
              background: "linear-gradient(135deg, #FFB020 0%, #00D09C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 8,
            }}
          >
            HAPPY INVESTING
          </div>

          <div
            style={{
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 24,
              padding: "6px 22px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: "#00D09C", fontSize: 20 }}>✓</span>
            <span style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700 }}>
              Editor of SaN • Official Channel
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
