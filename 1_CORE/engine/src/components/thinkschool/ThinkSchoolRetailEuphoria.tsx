import React from "react";
import {
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

export interface ThinkSchoolRetailEuphoriaProps {
  localFrame: number;
}

/**
 * Scene 2: The Retail Euphoria & Multiple Family Accounts
 * Active Timeline: Frames 742 - 1226 (localFrame 0 to 484 | 24.7s - 40.9s)
 *
 * Spoken Alignment:
 * - localFrame 0 - 94 (F742 - F836): "Naturally, the euphoria across social media and brokerage firm"
 * - localFrame 94 - 193 (F836 - F935): "and news channels is actually rising"
 * - localFrame 193 - 393 (F935 - F1135): "Retail investors are being told to apply with every family account they have..."
 */
export const ThinkSchoolRetailEuphoria: React.FC<ThinkSchoolRetailEuphoriaProps> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const cameraScale = interpolate(localFrame, [0, 484], [1.0, 1.03], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1.0),
    extrapolateRight: "clamp",
  });

  // Newspaper clipping entrance (localFrame 10 ~ F752)
  const newspaperProgress = spring({
    frame: Math.max(0, localFrame - 10),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Groww Notification (localFrame 80 ~ F822 on "social media and brokerage")
  const notif1Spring = spring({
    frame: Math.max(0, localFrame - 80),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // Zerodha Notification (localFrame 130 ~ F872 on "brokerage firm & news channels")
  const notif2Spring = spring({
    frame: Math.max(0, localFrame - 130),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // Yellow highlighter sweep across newspaper (localFrame 195 - 280 on "apply with every family account")
  const highlightWidth = interpolate(localFrame, [195, 280], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Family Accounts tree (localFrame 230 ~ F972)
  const familyProgress = spring({
    frame: Math.max(0, localFrame - 230),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070A10",
        backgroundImage: `
          radial-gradient(circle at 75% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
          radial-gradient(circle at 20% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 50px 50px, 50px 50px",
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "50px 80px 40px 80px",
        boxSizing: "border-box",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Editorial Header */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: 18,
          transform: `translateY(${interpolate(entrance, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div>
          <div
            style={{
              color: "#10B981",
              fontSize: 13,
              letterSpacing: "0.25em",
              fontWeight: 800,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            BEHAVIORAL FINANCE FORENSICS // RETAIL EUPHORIA
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 38, fontWeight: 900 }}>
            The Retail Euphoria & Multiple Account Wave
          </div>
        </div>

        <div
          style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 30,
            padding: "8px 20px",
            color: "#FCA5A5",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.08em",
          }}
        >
          ● RETAIL SENTIMENT: EXTREME GREED
        </div>
      </div>

      {/* Main Content Arena: 2 Columns */}
      <div
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          gap: 50,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 15,
        }}
      >
        {/* Left Column: Authentic Newspaper Press Clipping (Centered slightly right of facecam) */}
        <div
          style={{
            flex: 1.1,
            marginLeft: 320, // Leaves room for floating circle facecam on the bottom-left!
            background: "#F5F2EB",
            borderRadius: 10,
            padding: "32px 36px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
            transform: `translateY(${interpolate(newspaperProgress, [0, 1], [40, 0])}px) rotate(${interpolate(
              newspaperProgress,
              [0, 1],
              [-3, -1]
            )}deg)`,
            opacity: newspaperProgress,
            position: "relative",
            border: "1px solid #D5CEBE",
          }}
        >
          {/* Newspaper Masthead */}
          <div
            style={{
              borderBottom: "2px solid #1A1A1A",
              paddingBottom: 8,
              marginBottom: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontSize: 24,
                fontWeight: 900,
                color: "#1A1A1A",
                letterSpacing: "0.05em",
              }}
            >
              FINANCIAL CHRONICLE
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#666" }}>
              DALAL STREET EDITION // RECORD ALLOTMENT
            </div>
          </div>

          {/* Newspaper Headline */}
          <div
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#111",
              lineHeight: 1.25,
              marginBottom: 16,
            }}
          >
            Retail Bidders Flood Brokers; Family Accounts Mobilized for Listing Gains
          </div>

          {/* Simulated Printed Paragraph with Marker Highlight */}
          <div
            style={{
              fontSize: 14,
              color: "#333",
              lineHeight: 1.6,
              position: "relative",
            }}
          >
            <p style={{ margin: "0 0 10px 0" }}>
              Discount brokers report record server traffic as retail participants coordinate
              applications across multiple household PAN accounts to capture early listing premiums.
            </p>

            <div
              style={{
                position: "relative",
                display: "inline",
                fontWeight: 800,
                color: "#000",
                fontSize: 17,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${highlightWidth}%`,
                  backgroundColor: "#FACC15",
                  mixBlendMode: "multiply",
                  borderRadius: 4,
                  transition: "width 0.1s linear",
                }}
              />
              "Retail investors are told to apply with every family account for capturing listing gains."
            </div>
          </div>
        </div>

        {/* Right Column: Mobile Brokerage Notifications & Family Tree */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Notification 1: Groww */}
          <div
            style={{
              background: "rgba(17, 24, 39, 0.9)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              borderRadius: 14,
              padding: "18px 24px",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
              transform: `scale(${notif1Spring})`,
              opacity: notif1Spring,
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: "#00D09C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 20,
                color: "#FFFFFF",
              }}
            >
              G
            </div>
            <div>
              <div style={{ color: "#E5E7EB", fontSize: 15, fontWeight: 800 }}>
                Groww • Alert
              </div>
              <div style={{ color: "#9CA3AF", fontSize: 13, marginTop: 2 }}>
                Reliance Jio Platforms IPO is LIVE. High retail demand detected!
              </div>
            </div>
          </div>

          {/* Notification 2: Zerodha Kite */}
          <div
            style={{
              background: "rgba(17, 24, 39, 0.9)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              borderRadius: 14,
              padding: "18px 24px",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
              transform: `scale(${notif2Spring})`,
              opacity: notif2Spring,
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: "#387ED1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 20,
                color: "#FFFFFF",
              }}
            >
              Z
            </div>
            <div>
              <div style={{ color: "#E5E7EB", fontSize: 15, fontWeight: 800 }}>
                Zerodha Kite • IPO Order
              </div>
              <div style={{ color: "#9CA3AF", fontSize: 13, marginTop: 2 }}>
                UPI Mandate received: ₹14,850 per lot. Capturing listing pop.
              </div>
            </div>
          </div>

          {/* Family Account Multiplexer Grid */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 14,
              padding: "20px 24px",
              transform: `translateY(${interpolate(familyProgress, [0, 1], [20, 0])}px)`,
              opacity: familyProgress,
            }}
          >
            <div
              style={{
                color: "#F59E0B",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              ★ The "Multi-Account" Retail Playbook
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                { label: "Self PAN Account", status: "BID SUBMITTED" },
                { label: "Spouse PAN Account", status: "BID SUBMITTED" },
                { label: "Father PAN Account", status: "BID SUBMITTED" },
                { label: "Mother PAN Account", status: "BID SUBMITTED" },
              ].map((acc, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(30, 41, 59, 0.5)",
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#CBD5E1", fontSize: 12, fontWeight: 600 }}>
                    {acc.label}
                  </span>
                  <span
                    style={{
                      color: "#10B981",
                      fontSize: 10,
                      fontWeight: 800,
                      background: "rgba(16, 185, 129, 0.1)",
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    ✔ {acc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
