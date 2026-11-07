import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface Take3DebtMonolithStageProps {
  localFrame: number;
}

export const Take3DebtMonolithStage: React.FC<Take3DebtMonolithStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring for monolith (Scene 3: localFrame 0 - 346)
  const monolithSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Digital counter for 59,140 Cr
  const debtCounter = Math.round(
    interpolate(localFrame, [15, 80], [0, 59140], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Scene 4 Phase: Laser Decapitation (Starts at localFrame 346)
  const isScene4 = localFrame >= 346;
  const scene4Local = Math.max(0, localFrame - 346);

  // Laser beam ignition & horizontal sweep (Frames 0 - 30 of Scene 4)
  const laserBeam = interpolate(scene4Local, [5, 25], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top block detachment and disintegration (Frames 25 - 90 of Scene 4)
  const topBlockSlide = interpolate(scene4Local, [25, 60], [0, -60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const topBlockOpacity = interpolate(scene4Local, [35, 75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });


  // Golden Net-Debt-Free Stamp (Frame 90 of Scene 4)
  const stampSpring = spring({
    frame: Math.max(0, scene4Local - 90),
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
        paddingTop: 70,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isScene4
            ? "radial-gradient(circle at 65% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 70%)"
            : "radial-gradient(circle at 65% 50%, rgba(239, 68, 68, 0.12) 0%, transparent 70%)",
          transition: "background 0.5s ease",
          pointerEvents: "none",
        }}
      />

      {/* Editorial Category Header */}
      <div
        style={{
          background: isScene4 ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
          border: `1px solid ${isScene4 ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
          borderRadius: 20,
          padding: "6px 22px",
          color: isScene4 ? "#34D399" : "#F87171",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 14,
          opacity: monolithSpring,
        }}
      >
        {isScene4 ? "THE BALANCE SHEET TRANSFORMATION" : "AUDITED BALANCE SHEET REALITY (MID-2026)"}
      </div>

      {/* Main Headline */}
      <h1
        style={{
          fontSize: 44,
          fontWeight: 800,
          color: "#FFFFFF",
          margin: 0,
          letterSpacing: -1,
          textAlign: "center",
          opacity: monolithSpring,
        }}
      >
        {isScene4 ? (
          <>
            Wiping Out <span style={{ color: "#00E599" }}>₹27,500 Crore</span> In One Single Stroke
          </>
        ) : (
          <>
            Reliance Jio Infocomm: <span style={{ color: "#EF4444" }}>₹59,140 Crore</span> External Debt
          </>
        )}
      </h1>

      {/* Main Architecture Arena */}
      <div
        style={{
          position: "relative",
          width: 1200,
          height: 580,
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {/* Left Side: Analytical Dossier Panel */}
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
              ₹{debtCounter.toLocaleString("en-IN")} CR
            </div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>
              Operating Entity: Reliance Jio Infocomm Limited
            </div>
          </div>

          {isScene4 && (
            <div
              style={{
                background: "rgba(6, 78, 59, 0.4)",
                border: "2px solid #00E599",
                borderRadius: 16,
                padding: "20px 24px",
                boxShadow: "0 10px 30px rgba(0, 229, 153, 0.2)",
                opacity: Math.min(1, scene4Local / 30),
              }}
            >
              <div style={{ fontSize: 13, color: "#A7F3D0", fontWeight: 700 }}>
                DELEVERAGING IMPACT
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#00E599", marginTop: 4 }}>
                -46.5% DEBT ERADICATION
              </div>
              <div style={{ fontSize: 14, color: "#E2E8F0", marginTop: 4 }}>
                Commercial bank debt halved overnight with zero equity dilution to promoters.
              </div>
            </div>
          )}
        </div>

        {/* Center-Right: The Architectural Debt Monolith Tower */}
        <div
          style={{
            position: "relative",
            width: 240,
            height: 480,
            marginLeft: 320,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* TOP SECTION: ₹27,500 Crore (The Sliced Block) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 224, // ~46.5% of 480px
              background: "linear-gradient(180deg, #DC2626 0%, #991B1B 100%)",
              borderRadius: "16px 16px 0 0",
              border: "2px solid rgba(239, 68, 68, 0.8)",
              borderBottom: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 -10px 30px rgba(220, 38, 38, 0.4)",
              transform: `translateY(${isScene4 ? topBlockSlide : 0}px)`,
              opacity: isScene4 ? topBlockOpacity : 1,
              zIndex: 5,
            }}
          >
            <div style={{ fontSize: 12, color: "#FECACA", fontWeight: 700, letterSpacing: 1 }}>
              PREPAID BY IPO
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
              ₹27,500 CR
            </div>
            <div style={{ fontSize: 11, color: "#FCA5A5", fontWeight: 600 }}>
              (46.5% of Commercial Debt)
            </div>
          </div>

          {/* Cyan Laser Beam Slicing Line (Scene 4) */}
          {isScene4 && (
            <div
              style={{
                position: "absolute",
                top: 254, // At the exact cut line
                left: "-50%",
                width: "200%",
                height: 4,
                background: "linear-gradient(90deg, transparent, #00FFFF, #FFFFFF, #00FFFF, transparent)",
                boxShadow: "0 0 20px #00FFFF, 0 0 40px #00FFFF",
                clipPath: `inset(0 ${100 - laserBeam}% 0 0)`,
                zIndex: 20,
              }}
            />
          )}

          {/* BOTTOM SECTION: ₹31,640 Crore (Remaining Sovereign Spectrum Base) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 256, // ~53.5% of 480px
              background: isScene4
                ? `linear-gradient(180deg, #059669 0%, #064E3B 100%)`
                : `linear-gradient(180deg, #B91C1C 0%, #7F1D1D 100%)`,
              borderRadius: "0 0 16px 16px",
              border: `2px solid ${isScene4 ? "#00E599" : "rgba(239, 68, 68, 0.8)"}`,
              borderTop: isScene4 ? "2px solid #00E599" : "1px dashed rgba(255, 255, 255, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isScene4
                ? "0 10px 40px rgba(0, 229, 153, 0.4)"
                : "0 10px 40px rgba(0, 0, 0, 0.7)",
              transition: "all 0.5s ease",
              zIndex: 4,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: isScene4 ? "#A7F3D0" : "#FCA5A5",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {isScene4 ? "REMAINING DEBT" : "REMAINING LIABILITIES"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF", marginTop: 2 }}>
              ~₹31,640 CR
            </div>
            <div
              style={{
                fontSize: 11,
                color: isScene4 ? "#6EE7B7" : "#F87171",
                fontWeight: 600,
                textAlign: "center",
                padding: "0 12px",
                marginTop: 2,
              }}
            >
              {isScene4 ? "Govt DoT Spectrum Dues (Non-Bank)" : "Deferred Spectrum & Bank Liabilities"}
            </div>
          </div>
        </div>

        {/* Golden Holographic Stamp: "VIRTUALLY FUND-BASED NET-DEBT-FREE" */}
        {isScene4 && scene4Local >= 90 && (
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
              Fund-Based Bank Debt Retired
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
