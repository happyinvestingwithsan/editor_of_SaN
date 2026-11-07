import React from "react";
import { spring, interpolate } from "remotion";
import { LucideIcon } from "lucide-react";

export interface KineticWordHighlightProps {
  frame: number;
  fps: number;
  mode?: "vertical_list" | "flank_sides" | "bottom_row";
  words: {
    text: string;
    subtext?: string;
    icon?: LucideIcon;
    color: string;
    bg: string;
    delayFrames: number;
  }[];
}

export const KineticWordHighlight: React.FC<KineticWordHighlightProps> = ({
  frame,
  fps,
  mode = "vertical_list",
  words,
}) => {
  // ---------------------------------------------------------------------------
  // MODE 1: FLANK SIDES (SaN Request #3: Left & Right sides of Full Facecam)
  // Evidences on Left, Proofs on Right, zero face obstruction!
  // ---------------------------------------------------------------------------
  if (mode === "flank_sides") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 35,
        }}
      >
        {words.map((w, idx) => {
          if (frame < w.delayFrames) return null;

          const itemSpring = spring({
            frame: Math.max(0, frame - w.delayFrames),
            fps,
            config: { damping: 14, stiffness: 160 },
          });

          const isLeft = idx === 0;
          const translateX = interpolate(
            itemSpring,
            [0, 1],
            [isLeft ? -80 : 80, 0]
          );
          const opacity = interpolate(itemSpring, [0, 1], [0, 1]);
          const scale = interpolate(itemSpring, [0, 1], [0.85, 1.0]);
          const Icon = w.icon;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: "420px",
                ...(isLeft ? { left: "70px" } : { right: "70px" }),
                width: "530px",
                transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
                opacity,
                background:
                  "linear-gradient(135deg, rgba(10, 15, 30, 0.95), rgba(20, 28, 48, 0.92))",
                border: `2px solid ${w.color}`,
                borderRadius: "24px",
                padding: "26px 32px",
                boxShadow: `0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px ${w.color}40`,
                display: "flex",
                alignItems: "center",
                gap: "20px",
                backdropFilter: "blur(16px)",
              }}
            >
              {Icon && (
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    backgroundColor: w.bg,
                    border: `1.5px solid ${w.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={34} color={w.color} />
                </div>
              )}
              <div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontSize: "36px",
                    fontWeight: 900,
                    letterSpacing: "-0.5px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {w.text}
                </div>
                {w.subtext && (
                  <div
                    style={{
                      color: "#94A3B8",
                      fontSize: "17px",
                      marginTop: "6px",
                      lineHeight: 1.3,
                    }}
                  >
                    {w.subtext}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // MODE 2: BOTTOM ROW (SaN Request #4: Lower Third, below face)
  // Sequential pop up for REAL VALUE, TESTED STRATEGIES, IN-DEPTH ANALYSIS
  // ---------------------------------------------------------------------------
  if (mode === "bottom_row") {
    return (
      <div
        style={{
          position: "absolute",
          bottom: "55px",
          left: "0px",
          width: "1920px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
          padding: "0 60px",
          pointerEvents: "none",
          zIndex: 35,
        }}
      >
        {words.map((w, idx) => {
          if (frame < w.delayFrames) return null;

          const itemSpring = spring({
            frame: Math.max(0, frame - w.delayFrames),
            fps,
            config: { damping: 14, stiffness: 160 },
          });

          const translateY = interpolate(itemSpring, [0, 1], [60, 0]);
          const opacity = interpolate(itemSpring, [0, 1], [0, 1]);
          const scale = interpolate(itemSpring, [0, 1], [0.88, 1.0]);
          const Icon = w.icon;

          return (
            <div
              key={idx}
              style={{
                flex: "1",
                maxWidth: "560px",
                transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                opacity,
                background:
                  "linear-gradient(135deg, rgba(10, 15, 30, 0.95), rgba(20, 28, 48, 0.92))",
                border: `2px solid ${w.color}`,
                borderRadius: "22px",
                padding: "20px 24px",
                boxShadow: `0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px ${w.color}35`,
                display: "flex",
                alignItems: "center",
                gap: "18px",
                backdropFilter: "blur(16px)",
              }}
            >
              {Icon && (
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    backgroundColor: w.bg,
                    border: `1.5px solid ${w.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={28} color={w.color} />
                </div>
              )}
              <div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontSize: "26px",
                    fontWeight: 900,
                    letterSpacing: "-0.5px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {w.text}
                </div>
                {w.subtext && (
                  <div
                    style={{
                      color: "#94A3B8",
                      fontSize: "14px",
                      marginTop: "3px",
                    }}
                  >
                    {w.subtext}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // MODE 3: VERTICAL LIST (Default inside right container)
  // ---------------------------------------------------------------------------
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "20px",
        gap: "24px",
      }}
    >
      {words.map((w, idx) => {
        if (frame < w.delayFrames) {
          return null;
        }

        const itemSpring = spring({
          frame: Math.max(0, frame - w.delayFrames),
          fps,
          config: { damping: 12, stiffness: 180 },
        });

        const scale = interpolate(itemSpring, [0, 1], [0.85, 1.0]);
        const opacity = interpolate(itemSpring, [0, 1], [0, 1]);
        const translateX = interpolate(itemSpring, [0, 1], [80, 0]);
        const Icon = w.icon;

        return (
          <div
            key={idx}
            style={{
              transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
              opacity,
              background:
                "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
              border: `2px solid ${w.color}`,
              borderRadius: "20px",
              padding: "24px 36px",
              boxShadow: `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${w.color}35`,
              display: "flex",
              alignItems: "center",
              gap: "20px",
              width: "100%",
              maxWidth: "880px",
              backdropFilter: "blur(12px)",
            }}
          >
            {Icon && (
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  backgroundColor: w.bg,
                  border: `1px solid ${w.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={30} color={w.color} />
              </div>
            )}
            <div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "36px",
                  fontWeight: 900,
                  letterSpacing: "-0.5px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {w.text}
              </div>
              {w.subtext && (
                <div style={{ color: "#94A3B8", fontSize: "17px", marginTop: "4px" }}>
                  {w.subtext}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
