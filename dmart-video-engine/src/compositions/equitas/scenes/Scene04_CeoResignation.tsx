import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EQUITAS_THEME } from "../equitasTheme";

export interface SceneProps {
  startFrame?: number;
  durationFrames?: number;
}

export const Scene04_CeoResignation: React.FC<SceneProps> = ({
  startFrame = 690,
  durationFrames = 210,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Header entrance snaps strictly to frame 20 (abs 710: "Fact number 1")
  const headerSpring = spring({
    frame: localFrame - 20,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Left card: CEO entrance snaps strictly to frame 41 (abs 731: "Why did the CEO resign?")
  const ceoSpring = spring({
    frame: localFrame - 41,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Center connection & Unico Housing entrance snaps to frame 105 (abs 795-802: "Because his daughter...")
  const daughterSpring = spring({
    frame: localFrame - 105,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  const unicoSpring = spring({
    frame: localFrame - 110,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // Line progress between CEO and Unico
  const lineProgress = interpolate(localFrame - 105, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom explanation pill snaps to frame 157 (abs 847: "housing finance company")
  const pillSpring = spring({
    frame: localFrame - 157,
    fps,
    config: { damping: 12, stiffness: 130 },
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
        padding: "24px 32px 14px",
        boxSizing: "border-box",
        opacity: (1 - exitProgress) * interpolate(headerSpring, [0, 1], [0, 1]),
        transform: `translateY(${exitProgress * -20}px)`,
        fontFamily: EQUITAS_THEME.fonts.display,
      }}
    >
      {/* 1. Fact Badge & Big Question Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            backgroundColor: "#FFB020",
            color: "#0B0F17",
            padding: "6px 20px",
            borderRadius: 10,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "0.08em",
          }}
        >
          FACT #01
        </span>
        <span
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "0.02em",
          }}
        >
          WHY DID THE CEO RESIGN?
        </span>
      </div>

      {/* 2. Large Visual Relationship Arena (Filling the 1016px wide stage) */}
      <div
        style={{
          position: "relative",
          width: 1016,
          height: 480,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Left Entity: CEO P.N. Vasudevan (Big & Highly Visible) */}
        <div
          style={{
            width: 410,
            height: 470,
            backgroundColor: "rgba(23, 27, 33, 0.96)",
            borderRadius: 26,
            padding: "24px 20px",
            border: "2px solid #0F8F87",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(15, 143, 135, 0.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            boxSizing: "border-box",
            transform: `translateX(${interpolate(ceoSpring, [0, 1], [-50, 0])}px)`,
            opacity: interpolate(ceoSpring, [0, 1], [0, 1]),
          }}
        >
          {/* Large High-Res Portrait */}
          <div
            style={{
              width: 250,
              height: 250,
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #0F8F87",
              boxShadow: "0 0 28px rgba(15, 143, 135, 0.5)",
              backgroundColor: "#171B21",
            }}
          >
            <Img
              src={staticFile("assets/equitas/portraits/pn_vasudevan_founder_ceo_authentic.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />
          </div>

          <div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
              }}
            >
              P.N. Vasudevan
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#00D09C",
                marginTop: 4,
              }}
            >
              Founder & MD • Equitas SFB
            </div>
            <div
              style={{
                fontSize: 15,
                color: "#94A3B8",
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              Founded 2007 • Stepping Down
            </div>
          </div>
        </div>

        {/* Center Connection Indicator (Daughter Co-founded) */}
        <div
          style={{
            width: 170,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transform: `scale(${interpolate(daughterSpring, [0, 1], [0.8, 1])})`,
            opacity: interpolate(daughterSpring, [0, 1], [0, 1]),
          }}
        >
          <div
            style={{
              backgroundColor: "#FFB020",
              color: "#0B0F17",
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 0 16px rgba(255, 176, 32, 0.5)",
            }}
          >
            DAUGHTER
          </div>

          {/* Animated Connecting Arrow */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              height: 24,
            }}
          >
            <div
              style={{
                width: "80%",
                height: 4,
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${lineProgress * 100}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #0F8F87 0%, #FFB020 100%)",
                  boxShadow: "0 0 12px #FFB020",
                }}
              />
            </div>
            <span style={{ fontSize: 20, color: "#FFB020", marginLeft: 4 }}>➔</span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(15, 143, 135, 0.25)",
              border: "1px solid #0F8F87",
              color: "#00D09C",
              padding: "4px 12px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            CO-FOUNDED
          </div>
        </div>

        {/* Right Entity: Unico Housing Finance (Big Logo & Card) */}
        <div
          style={{
            width: 410,
            height: 470,
            backgroundColor: "rgba(23, 27, 33, 0.96)",
            borderRadius: 26,
            padding: "24px 20px",
            border: "2px solid #FFB020",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(255, 176, 32, 0.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            boxSizing: "border-box",
            transform: `translateX(${interpolate(unicoSpring, [0, 1], [50, 0])}px)`,
            opacity: interpolate(unicoSpring, [0, 1], [0, 1]),
          }}
        >
          {/* Big High-Contrast Logo Surface */}
          <div
            style={{
              width: 330,
              height: 250,
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              border: "3px solid #FFB020",
              boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 24px",
              boxSizing: "border-box",
            }}
          >
            <Img
              src={staticFile("assets/equitas/company_logos/unico_housing_finance_logo.svg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          <div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
              }}
            >
              Unico Housing
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#FFB020",
                marginTop: 4,
              }}
            >
              Housing Finance Company
            </div>
            <div
              style={{
                fontSize: 15,
                color: "#94A3B8",
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              Separate Legal Entity • NBFC-HFC
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Disclosure Precaution Pill (Snaps to frame 157) */}
      {localFrame >= 157 && (
        <div
          style={{
            marginTop: 12,
            backgroundColor: "rgba(255, 176, 32, 0.16)",
            border: "1.5px solid #FFB020",
            borderRadius: 999,
            padding: "8px 28px",
            transform: `scale(${interpolate(pillSpring, [0, 1], [0.85, 1])})`,
            opacity: interpolate(pillSpring, [0, 1], [0, 1]),
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, color: "#FFB020" }}>
            ⚖️ Governance Precaution • Zero Business Overlap Conflict
          </span>
        </div>
      )}
    </div>
  );
};
