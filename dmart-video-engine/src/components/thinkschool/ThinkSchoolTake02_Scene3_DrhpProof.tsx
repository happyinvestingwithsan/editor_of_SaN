import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
  Img,
  Easing,
} from "remotion";

export interface ThinkSchoolTake02_Scene3_DrhpProofProps {
  localFrame: number;
}

/**
 * Chunk 4: Real DRHP Statutory Proof (0.00% OFS)
 * Full Canvas Mode with SaN in Circle PIP (Bottom-Left: x=60, y=700).
 * Relative Frames: 0 to 446 (Master Frames 1151 to 1597 | 38.36s to 53.24s).
 * Document Asset: 'assets/03_balance_sheet_debt/01_real_drhp_debt_prepayment_table.png'
 */
export const ThinkSchoolTake02_Scene3_DrhpProof: React.FC<
  ThinkSchoolTake02_Scene3_DrhpProofProps
> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Slow continuous push-in
  const pushIn = interpolate(localFrame, [0, 446], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.2, 1.0),
  });

  // Entrance
  const docSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 110 },
  });

  // Word-synced: Local Frame 110 (Master Frame 1261: "literally zero percent")
  const strokeProgress = interpolate(localFrame, [90, 140], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Word-synced: Local Frame 254 (Master Frame 1405: "Mukesh Ambani")
  const ambaniLock = spring({
    frame: Math.max(0, localFrame - 240),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // Word-synced: Local Frame 347 (Master Frame 1498: "Meta, Google")
  const metaLock = spring({
    frame: Math.max(0, localFrame - 330),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const googleLock = spring({
    frame: Math.max(0, localFrame - 350),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070A10",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Blueprint Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header Banner */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 450,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              padding: "5px 12px",
              borderRadius: 6,
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#10B981",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.1em",
              marginBottom: 6,
            }}
          >
            AUDITED STATUTORY PROSPECTUS // SEBI FILING
          </div>
          <h1
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Reliance Jio DRHP: <span style={{ color: "#10B981" }}>0.00% Offer For Sale</span>
          </h1>
        </div>

        {/* Page 68 Stamp Badge */}
        <div
          style={{
            padding: "8px 18px",
            borderRadius: 10,
            background: "rgba(30, 41, 59, 0.8)",
            border: "1.5px solid rgba(212, 175, 55, 0.5)",
            color: "#D4AF37",
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: "0.05em",
          }}
        >
          📄 PROSPECTUS PAGE 68
        </div>
      </div>

      {/* Real DRHP Table Document */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 450,
          right: 80,
          height: 690,
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(16, 185, 129, 0.15)",
          overflow: "hidden",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          transform: `scale(${pushIn}) translateY(${interpolate(docSpring, [0, 1], [30, 0])}px)`,
          transformOrigin: "center top",
        }}
      >
        <Img
          src={staticFile("jio_assets/03_balance_sheet_debt/01_real_drhp_debt_prepayment_table.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "top center",
          }}
        />

        {/* Mint-Green Dynamic Stroke Box (Frame 110 Word Sync) */}
        <div
          style={{
            position: "absolute",
            top: "28%",
            left: "5%",
            width: "90%",
            height: "18%",
            borderRadius: 8,
            border: "3px solid #00E599",
            backgroundColor: "rgba(0, 229, 153, 0.14)",
            boxShadow: "0 0 25px rgba(0, 229, 153, 0.4)",
            opacity: interpolate(strokeProgress, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(strokeProgress, [0, 100], [0.95, 1.0])})`,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 24,
          }}
        >
          <div
            style={{
              backgroundColor: "#00E599",
              color: "#000",
              fontWeight: 900,
              fontSize: 18,
              padding: "6px 16px",
              borderRadius: 6,
              letterSpacing: "0.05em",
            }}
          >
            OFFER FOR SALE: NIL (0.00%)
          </div>
        </div>
      </div>

      {/* Triple Promoter Padlocks */}
      <div
        style={{
          position: "absolute",
          bottom: 35,
          left: 450,
          right: 80,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          zIndex: 20,
        }}
      >
        {/* Ambani */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "1.5px solid rgba(212, 175, 55, 0.6)",
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: ambaniLock,
            transform: `scale(${ambaniLock})`,
          }}
        >
          <div>
            <div style={{ color: "#D4AF37", fontSize: 11, fontWeight: 800 }}>PROMOTER</div>
            <div style={{ color: "#FFF", fontSize: 15, fontWeight: 700 }}>Mukesh Ambani / RIL</div>
            <div style={{ color: "#10B981", fontSize: 13, fontWeight: 700 }}>0 Shares Sold (100% Lock)</div>
          </div>
          <span style={{ fontSize: 24 }}>🔒</span>
        </div>

        {/* Meta */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "1.5px solid rgba(6, 104, 225, 0.6)",
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: metaLock,
            transform: `scale(${metaLock})`,
          }}
        >
          <div>
            <div style={{ color: "#60A5FA", fontSize: 11, fontWeight: 800 }}>STRATEGIC PARTNER</div>
            <div style={{ color: "#FFF", fontSize: 15, fontWeight: 700 }}>Meta Platforms</div>
            <div style={{ color: "#10B981", fontSize: 13, fontWeight: 700 }}>0 Shares Sold (100% Lock)</div>
          </div>
          <span style={{ fontSize: 24 }}>🔒</span>
        </div>

        {/* Google */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "1.5px solid rgba(66, 133, 244, 0.6)",
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: googleLock,
            transform: `scale(${googleLock})`,
          }}
        >
          <div>
            <div style={{ color: "#93C5FD", fontSize: 11, fontWeight: 800 }}>STRATEGIC PARTNER</div>
            <div style={{ color: "#FFF", fontSize: 15, fontWeight: 700 }}>Google LLC</div>
            <div style={{ color: "#10B981", fontSize: 13, fontWeight: 700 }}>0 Shares Sold (100% Lock)</div>
          </div>
          <span style={{ fontSize: 24 }}>🔒</span>
        </div>
      </div>
    </div>
  );
};
