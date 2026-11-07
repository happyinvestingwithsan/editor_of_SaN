import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take3LaserSliceStageProps {
  localFrame: number;
}

/**
 * Scene 4: The 50% Debt Laser Decapitation (Frames 989 - 1318 | 33.0s - 43.9s)
 * Layout: Full-Screen 1920x1080 Stage + SaN Circle PIP at Bottom-Left (x=60, y=700).
 * Word Sync:
 * - Local Frame 0 (Frame 989): "Wiping out 27,500 crore in one single stroke..." -> Stage enters
 * - Local Frame 141 (Frame 1130): "reduces commercial debt by nearly half" -> Cyan Laser slices across!
 * - Local Frame 160 - 220: Top 46.5% block detaches, turns red translucent, and disintegrates!
 * - Local Frame 261 (Frame 1250): "virtually fund-based net debt-free company" -> Golden Stamp slams down!
 */
export const Take3LaserSliceStage: React.FC<Take3LaserSliceStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Laser beam strikes on Local Frame 141 (Word: "nearly half")
  const laserBeam = interpolate(localFrame, [141, 165], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top block detachment (Local Frame 160 to 220)
  const isCut = localFrame >= 141;
  const topBlockSlide = interpolate(localFrame, [160, 200], [0, -70], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const topBlockOpacity = interpolate(localFrame, [170, 220], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });


  // Golden Stamp slam on Local Frame 261 (Word: "virtually fund-based net debt-free company")
  const stampSpring = spring({
    frame: Math.max(0, localFrame - 261),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070B12",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 60,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isCut
            ? "radial-gradient(circle at 65% 50%, rgba(16, 185, 129, 0.16) 0%, transparent 70%)"
            : "radial-gradient(circle at 65% 50%, rgba(239, 68, 68, 0.14) 0%, transparent 70%)",
          transition: "background 0.5s ease",
          pointerEvents: "none",
        }}
      />

      {/* Category Header */}
      <div
        style={{
          background: isCut ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
          border: `1px solid ${isCut ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
          borderRadius: 20,
          padding: "6px 22px",
          color: isCut ? "#34D399" : "#F87171",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 12,
          opacity: enterSpring,
        }}
      >
        BALANCE SHEET DE-LEVERAGING // SINGLE STROKE
      </div>

      <h1
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: "#FFFFFF",
          margin: 0,
          letterSpacing: -1,
          textAlign: "center",
          opacity: enterSpring,
        }}
      >
        Wiping Out <span style={{ color: "#00E599" }}>₹27,500 Crore</span> In One Single Stroke
      </h1>

      {/* Main Arena */}
      <div
        style={{
          position: "relative",
          width: 1200,
          height: 600,
          marginTop: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {/* Left Dossier Panel */}
        <div
          style={{
            position: "absolute",
            left: 100,
            top: 40,
            width: 440,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 16,
              padding: "20px 24px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700 }}>
              PRE-IPO TOTAL EXTERNAL BORROWINGS
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#EF4444", marginTop: 4 }}>
              ₹59,140 CRORE
            </div>
          </div>

          {isCut && (
            <div
              style={{
                background: "rgba(6, 78, 59, 0.5)",
                border: "2px solid #00E599",
                borderRadius: 16,
                padding: "20px 24px",
                boxShadow: "0 10px 30px rgba(0, 229, 153, 0.25)",
              }}
            >
              <div style={{ fontSize: 13, color: "#A7F3D0", fontWeight: 700 }}>
                DELEVERAGING IMPACT
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#00E599", marginTop: 4 }}>
                -46.5% COMMERCIAL DEBT
              </div>
              <div style={{ fontSize: 14, color: "#E2E8F0", marginTop: 4 }}>
                Commercial bank term loans completely eliminated overnight.
              </div>
            </div>
          )}
        </div>

        {/* Center-Right: Sliced Column */}
        <div
          style={{
            position: "relative",
            width: 250,
            height: 480,
            marginLeft: 320,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* Top Sliced Block (₹27,500 Cr) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 224,
              background: "linear-gradient(180deg, #DC2626 0%, #991B1B 100%)",
              borderRadius: "16px 16px 0 0",
              border: "2px solid rgba(239, 68, 68, 0.8)",
              borderBottom: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: `translateY(${topBlockSlide}px)`,
              opacity: topBlockOpacity,
              zIndex: 5,
            }}
          >
            <div style={{ fontSize: 12, color: "#FECACA", fontWeight: 700 }}>PREPAID BY IPO</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
              ₹27,500 CR
            </div>
            <div style={{ fontSize: 11, color: "#FCA5A5", fontWeight: 600 }}>
              (46.5% Sliced Away)
            </div>
          </div>

          {/* Cyan Laser Beam Slicing Line */}
          {localFrame >= 141 && (
            <div
              style={{
                position: "absolute",
                top: 254,
                left: "-50%",
                width: "200%",
                height: 4,
                background: "linear-gradient(90deg, transparent, #00FFFF, #FFFFFF, #00FFFF, transparent)",
                boxShadow: "0 0 25px #00FFFF, 0 0 50px #00FFFF",
                clipPath: `inset(0 ${100 - laserBeam}% 0 0)`,
                zIndex: 20,
              }}
            />
          )}

          {/* Bottom Remaining Base (~₹31,640 Cr) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 256,
              background: isCut
                ? `linear-gradient(180deg, #059669 0%, #064E3B 100%)`
                : `linear-gradient(180deg, #B91C1C 0%, #7F1D1D 100%)`,
              borderRadius: "0 0 16px 16px",
              border: `2px solid ${isCut ? "#00E599" : "rgba(239, 68, 68, 0.8)"}`,
              borderTop: isCut ? "2px solid #00E599" : "1px dashed rgba(255, 255, 255, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isCut
                ? "0 10px 40px rgba(0, 229, 153, 0.4)"
                : "0 10px 40px rgba(0, 0, 0, 0.7)",
              transition: "all 0.4s ease",
              zIndex: 4,
            }}
          >
            <div style={{ fontSize: 12, color: isCut ? "#A7F3D0" : "#FCA5A5", fontWeight: 700 }}>
              {isCut ? "REMAINING DEBT" : "REMAINING LIABILITIES"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
              ~₹31,640 CR
            </div>
            <div style={{ fontSize: 11, color: isCut ? "#6EE7B7" : "#F87171", fontWeight: 600, textAlign: "center", padding: "0 12px" }}>
              {isCut ? "Govt DoT Spectrum Dues (Non-Bank)" : "Bank & Spectrum Dues"}
            </div>
          </div>
        </div>

        {/* Golden Net-Debt-Free Stamp (Slams at Local Frame 261) */}
        {localFrame >= 261 && (
          <div
            style={{
              position: "absolute",
              right: 60,
              bottom: 120,
              zIndex: 30,
              transform: `scale(${stampSpring}) rotate(-5deg)`,
              opacity: stampSpring,
              border: "3.5px solid #D4AF37",
              borderRadius: 16,
              padding: "14px 28px",
              background: "rgba(15, 23, 42, 0.95)",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.4)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 13, color: "#D4AF37", fontWeight: 800, letterSpacing: 2 }}>
              BALANCE SHEET STATUS
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
              VIRTUALLY NET-DEBT-FREE
            </div>
            <div style={{ fontSize: 12, color: "#00E599", fontWeight: 700, marginTop: 2 }}>
              Fund-Based Bank Term Debt Retired
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
