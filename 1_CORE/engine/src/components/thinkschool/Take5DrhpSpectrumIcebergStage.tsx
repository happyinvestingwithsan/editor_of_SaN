import React from "react";
import { interpolate, spring, staticFile, useVideoConfig } from "remotion";

export interface Take5DrhpSpectrumIcebergStageProps {
  localFrame: number;
}

/**
 * Take5DrhpSpectrumIcebergStage:
 * Active from Global Frame 1861 to 2202 (Duration: 341 frames / 11.4s)
 * Occupies Right 65% stage (x: 700, y: 70, w: 1160, h: 940)
 * SaN is in Left Column (31% width, x: 60, y: 70) with ZERO wasted space!
 *
 * Micro-Aligned Word Sync:
 * - localFrame 0 - 98 (1861 - 1959 / words: "Second is structural risk in DRHP"):
 *     • Top Header & Scanned DRHP filing card establish cleanly.
 * - localFrame 98 (Global 1959 / words: "While bank borrowings are being cleared"):
 *     • Bank Borrowings card illuminates GREEN with "✔ 100% CLEARED".
 * - localFrame 173 (Global 2034 / words: "long term deferred spectrum liability"):
 *     • Deferred Spectrum Dues card illuminates AMBER with "⚠ ~₹30,000+ CR DoT ANNUITY".
 * - localFrame 293 (Global 2154 / words: "Department of Telecommunication"):
 *     • Bottom statutory takeaway card locks in.
 */
export const Take5DrhpSpectrumIcebergStage: React.FC<Take5DrhpSpectrumIcebergStageProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Bank debt cleared reveals at localFrame 98 (Global Frame 1959)
  const bankSpring = spring({
    frame: Math.max(0, localFrame - 98),
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // Spectrum dues reveal at localFrame 173 (Global Frame 2034)
  const spectrumSpring = spring({
    frame: Math.max(0, localFrame - 173),
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // Footnote card at localFrame 285
  const noteSpring = spring({
    frame: Math.max(0, localFrame - 285),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 700,
        top: 70,
        width: 1160,
        height: 940,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: "'Inter', system-ui, sans-serif",
        transform: `translateY(${interpolate(enterSpring, [0, 1], [40, 0])}px)`,
        opacity: enterSpring,
      }}
    >
      {/* Top Header Card */}
      <div
        style={{
          backgroundColor: "#0D1322",
          border: "1.5px solid rgba(212, 175, 55, 0.4)",
          borderRadius: 20,
          padding: "20px 28px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              color: "#D4AF37",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Risk Factor 02 • Official DRHP Filing Disclosures
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#F3F4F6",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            The Structural Debt Iceberg
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            border: "1.5px solid #F59E0B",
            color: "#F59E0B",
            fontSize: 13,
            fontWeight: 800,
            padding: "8px 16px",
            borderRadius: 20,
            letterSpacing: "0.06em",
          }}
        >
          DoT SPECTRUM LIABILITIES
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#0B101D",
          border: "1.5px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 24,
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scanned DRHP Card Snippet in Background */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 450,
            height: 380,
            backgroundImage: `url(${staticFile("assets/02_drhp_pages/01_real_drhp_filing_scanned_page.png")})`,
            backgroundSize: "cover",
            opacity: 0.15,
            filter: "grayscale(80%)",
            pointerEvents: "none",
          }}
        />

        <div>
          <span style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
            BALANCE SHEET DISCLOSURE ANALYSIS
          </span>
          <div style={{ color: "#F8FAFC", fontSize: 20, fontWeight: 800, marginTop: 4 }}>
            Bank Borrowings vs Long-Term Sovereign Debt
          </div>
        </div>

        {/* The Two Liability Blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 2 }}>
          {/* LAYER 1: BANK DEBT WIPED OUT (Word: "bank borrowings are being cleared" at localFrame 98) */}
          <div
            style={{
              backgroundColor: localFrame >= 98 ? "#0B192E" : "#111827",
              border: localFrame >= 98 ? "2px solid #00E599" : "1.5px dashed rgba(255, 255, 255, 0.15)",
              borderRadius: 18,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: localFrame >= 98 ? "0 10px 30px rgba(0, 229, 153, 0.25)" : "none",
              transform: `scale(${interpolate(bankSpring, [0, 1], [0.96, 1])})`,
              opacity: 0.4 + 0.6 * bankSpring,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  backgroundColor: localFrame >= 98 ? "rgba(0, 229, 153, 0.2)" : "#1E293B",
                  color: localFrame >= 98 ? "#00E599" : "#64748B",
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 900,
                }}
              >
                ✔
              </div>
              <div>
                <div style={{ color: localFrame >= 98 ? "#00E599" : "#64748B", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em" }}>
                  COMMERCIAL BANK BORROWINGS
                </div>
                <div style={{ color: "#F8FAFC", fontSize: 22, fontWeight: 900, marginTop: 2 }}>
                  ₹0 External Commercial Debt
                </div>
                <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 2 }}>
                  ₹27,500 Cr fresh issue prepayment completely destroys bank loan interest
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: localFrame >= 98 ? "rgba(0, 229, 153, 0.15)" : "transparent",
                border: `1px solid ${localFrame >= 98 ? "#00E599" : "#475569"}`,
                borderRadius: 10,
                padding: "6px 14px",
                color: localFrame >= 98 ? "#00E599" : "#64748B",
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              CLEARED
            </div>
          </div>

          {/* LAYER 2: DEFERRED SPECTRUM LIABILITIES (Word: "deferred spectrum liability" at localFrame 173) */}
          <div
            style={{
              backgroundColor: localFrame >= 173 ? "#1C1424" : "#111827",
              border: localFrame >= 173 ? "2px solid #F59E0B" : "1.5px dashed rgba(255, 255, 255, 0.15)",
              borderRadius: 18,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: localFrame >= 173 ? "0 10px 30px rgba(245, 158, 11, 0.25)" : "none",
              transform: `scale(${interpolate(spectrumSpring, [0, 1], [0.96, 1])})`,
              opacity: 0.4 + 0.6 * spectrumSpring,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  backgroundColor: localFrame >= 173 ? "rgba(245, 158, 11, 0.2)" : "#1E293B",
                  color: localFrame >= 173 ? "#F59E0B" : "#64748B",
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 900,
                }}
              >
                ⚠
              </div>
              <div>
                <div style={{ color: localFrame >= 173 ? "#F59E0B" : "#64748B", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em" }}>
                  STATUTORY SPECTRUM COMMITMENT
                </div>
                <div style={{ color: "#F8FAFC", fontSize: 22, fontWeight: 900, marginTop: 2 }}>
                  Deferred Spectrum Liabilities: ~₹30,000+ Crore
                </div>
                <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 2 }}>
                  Payable to the Department of Telecommunications (DoT) as annual annuities over 15+ years
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: localFrame >= 173 ? "rgba(245, 158, 11, 0.15)" : "transparent",
                border: `1px solid ${localFrame >= 173 ? "#F59E0B" : "#475569"}`,
                borderRadius: 10,
                padding: "6px 14px",
                color: localFrame >= 173 ? "#F59E0B" : "#64748B",
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              15-YR DUES
            </div>
          </div>
        </div>

        {/* Bottom Editorial Rule Box */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            backgroundColor: "#0D1526",
            border: "1px solid rgba(212, 175, 55, 0.35)",
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            transform: `translateY(${interpolate(noteSpring, [0, 1], [15, 0])}px)`,
            opacity: noteSpring,
          }}
        >
          <span style={{ fontSize: 20 }}>💡</span>
          <div style={{ color: "#F3F4F6", fontSize: 14, fontWeight: 600 }}>
            <strong>Institutional Takeaway:</strong> Jio is debt-free to private commercial banks, but sovereign statutory spectrum dues will continue to consume operational cash flow each year.
          </div>
        </div>
      </div>
    </div>
  );
};
