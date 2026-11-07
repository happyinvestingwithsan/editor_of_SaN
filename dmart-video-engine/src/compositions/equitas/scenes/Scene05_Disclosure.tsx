import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene05_Disclosure: React.FC<SceneProps> = ({
  startFrame = 900,
  durationFrames = 280,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Header question entrance snaps to frame 7 (abs 907: "Was there any fraud?")
  const headerSpring = spring({
    frame: localFrame - 7,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // "NO. ZERO FRAUD" badge slams at frame 59 (abs 959: "No.")
  const noFraudSpring = spring({
    frame: localFrame - 59,
    fps,
    config: { damping: 11, stiffness: 160 },
  });

  // Card 1: Zero Loans snaps to frame 98 (abs 998: "zero loans")
  const card1Spring = spring({
    frame: localFrame - 98,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Card 2: Zero Fund Transfers snaps to frame 136 (abs 1036: "zero fund transfers")
  const card2Spring = spring({
    frame: localFrame - 136,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Card 3: 100% Disclosed snaps to frame 176 (abs 1076: "100% disclosed")
  const card3Spring = spring({
    frame: localFrame - 176,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Verified Stamp Slam snaps to frame 227 (abs 1127: "to RBI and also to the board")
  const stampSpring = spring({
    frame: localFrame - 227,
    fps,
    config: { damping: 9, stiffness: 170 },
  });

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
        height: 718,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 36px 14px",
        boxSizing: "border-box",
        opacity: (1 - exitProgress) * interpolate(headerSpring, [0, 1], [0, 1]),
        transform: `translateY(${exitProgress * -20}px)`,
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {/* 1. Question + Answer Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: 18,
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#94A3B8",
            letterSpacing: "0.04em",
          }}
        >
          WAS THERE ANY FRAUD?
        </span>

        {localFrame >= 59 && (
          <div
            style={{
              backgroundColor: "rgba(0, 208, 156, 0.22)",
              border: "2px solid #00D09C",
              padding: "6px 22px",
              borderRadius: 12,
              boxShadow: "0 0 20px rgba(0, 208, 156, 0.5)",
              transform: `scale(${interpolate(noFraudSpring, [0, 1], [0.8, 1])})`,
              opacity: interpolate(noFraudSpring, [0, 1], [0, 1]),
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 900, color: "#00D09C" }}>
              NO. ZERO FRAUD.
            </span>
          </div>
        )}
      </div>

      {/* 2. 3 Proof Columns Row (Large Mobile Typography) */}
      <div
        style={{
          width: 1000,
          display: "flex",
          gap: 20,
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Card 1: Zero Loans */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(23, 27, 33, 0.96)",
            borderRadius: 24,
            padding: "28px 22px",
            border: "2px solid rgba(0, 208, 156, 0.45)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transform: `translateY(${interpolate(card1Spring, [0, 1], [40, 0])}px)`,
            opacity: interpolate(card1Spring, [0, 1], [0, 1]),
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "rgba(0, 208, 156, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              color: "#00D09C",
              marginBottom: 12,
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              fontFamily: EQUITAS_THEME.fonts.mono,
              color: "#00D09C",
              lineHeight: 1.1,
            }}
          >
            ₹0
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#FFFFFF", marginTop: 8 }}>
            ZERO LOANS
          </div>
          <div style={{ fontSize: 15, color: "#94A3B8", fontWeight: 600, marginTop: 4 }}>
            No credit extended to Unico
          </div>
        </div>

        {/* Card 2: Zero Fund Transfers */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(23, 27, 33, 0.96)",
            borderRadius: 24,
            padding: "28px 22px",
            border: "2px solid rgba(0, 208, 156, 0.45)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transform: `translateY(${interpolate(card2Spring, [0, 1], [40, 0])}px)`,
            opacity: interpolate(card2Spring, [0, 1], [0, 1]),
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "rgba(0, 208, 156, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              color: "#00D09C",
              marginBottom: 12,
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              fontFamily: EQUITAS_THEME.fonts.mono,
              color: "#00D09C",
              lineHeight: 1.1,
            }}
          >
            ₹0
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#FFFFFF", marginTop: 8 }}>
            ZERO TRANSFERS
          </div>
          <div style={{ fontSize: 15, color: "#94A3B8", fontWeight: 600, marginTop: 4 }}>
            No bank money diverted
          </div>
        </div>

        {/* Card 3: 100% Disclosed */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(23, 27, 33, 0.96)",
            borderRadius: 24,
            padding: "28px 22px",
            border: "2px solid rgba(255, 176, 32, 0.5)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transform: `translateY(${interpolate(card3Spring, [0, 1], [40, 0])}px)`,
            opacity: interpolate(card3Spring, [0, 1], [0, 1]),
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 176, 32, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
              padding: 6,
            }}
          >
            <Img
              src={staticFile("assets/equitas/company_logos/rbi_seal.svg")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              fontFamily: EQUITAS_THEME.fonts.mono,
              color: "#FFB020",
              lineHeight: 1.1,
            }}
          >
            100%
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#FFFFFF", marginTop: 8 }}>
            DISCLOSED
          </div>
          <div style={{ fontSize: 15, color: "#94A3B8", fontWeight: 600, marginTop: 4 }}>
            Prior intimation to RBI & Board
          </div>
        </div>
      </div>

      {/* 3. Verified Audit Stamp Slam (Snaps strictly to frame 227) */}
      {localFrame >= 227 && (
        <div
          style={{
            position: "absolute",
            bottom: 35,
            transform: `rotate(-4deg) scale(${interpolate(stampSpring, [0, 1], [2.2, 1])})`,
            opacity: interpolate(stampSpring, [0, 1], [0, 1]),
            border: "3px solid #00D09C",
            backgroundColor: "rgba(11, 15, 23, 0.96)",
            borderRadius: 16,
            padding: "10px 32px",
            boxShadow: "0 0 30px rgba(0, 208, 156, 0.6)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 26 }}>🛡️</span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#00D09C",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            FULL GOVERNANCE COMPLIANCE VERIFIED
          </span>
        </div>
      )}
    </div>
  );
};
