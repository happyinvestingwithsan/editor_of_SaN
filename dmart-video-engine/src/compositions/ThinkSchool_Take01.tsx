import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Audio,
  staticFile,
} from "remotion";

import { ThinkSchoolFloatingFacecam } from "../components/thinkschool/ThinkSchoolFloatingFacecam";
import { ThinkSchoolPodiumChart } from "../components/thinkschool/ThinkSchoolPodiumChart";
import { ThinkSchoolRetailEuphoria } from "../components/thinkschool/ThinkSchoolRetailEuphoria";
import { ThinkSchoolCrashAutopsy } from "../components/thinkschool/ThinkSchoolCrashAutopsy";
import { ThinkSchoolGoldenScale } from "../components/thinkschool/ThinkSchoolGoldenScale";
import { ThinkSchoolDrhpDossier } from "../components/thinkschool/ThinkSchoolDrhpDossier";

export interface ThinkSchool_Take01Props {
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchool_Take01:
 * Masterclass Opening Hook & Problem Statement
 * Spoken Script: Take 1 (00:00.00 - 01:35.633 | 2869 frames @ 30fps)
 *
 * Micro-Aligned Word Timeline:
 * - Frames 0 - 148 (0.0s - 4.9s): Full-Screen Facecam + Lower Third
 * - Frames 148 - 742 (4.9s - 24.7s): 3D Podium Chart (LIC, Hyundai, Jio) + Floating Circle Facecam (Bottom-Right)
 * - Frames 742 - 1226 (24.7s - 40.9s): Retail Euphoria & Family Bids + Floating Circle Facecam (Bottom-Left)
 * - Frames 1226 - 1766 (40.9s - 58.9s): Tech IPO Graveyard (Paytm, Zomato, Swiggy) + Floating Circle Facecam (Bottom-Right)
 * - Frames 1766 - 1937 (58.9s - 64.6s): Full-Screen Facecam (The Billion-Dollar Dilemma Hook)
 * - Frames 1937 - 2239 (64.6s - 74.6s): Brass Balance Scale (Tech Trap vs Cash Engine) + Floating Circle Facecam (Bottom-Left)
 * - Frames 2239 - 2825 (74.6s - 94.2s): 4-Part DRHP Roadmap + Floating Circle Facecam (Bottom-Right)
 * - Frames 2825 - 2869 (94.2s - 95.6s): Full-Screen Facecam Climax Close ("Stick with me until the end")
 */
export const ThinkSchool_Take01: React.FC<ThinkSchool_Take01Props> = ({
  mode = "full_video",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Lower Third spring for Opening Hook
  const lowerThirdSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Banner spring for "The Billion Dollar Question" (Frames 1766 - 1937)
  const billionBannerSpring = spring({
    frame: Math.max(0, frame - 1775),
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  // Banner spring for Final Hook (Frames 2825 - 2869)
  const finalHookSpring = spring({
    frame: Math.max(0, frame - 2830),
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  return (
    <AbsoluteFill
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: mode === "full_video" ? "#070A10" : "transparent",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Pristine Master Audio Track (Plays uninterrupted with zero codec delay) */}
      {mode === "full_video" && (
        <Audio src={staticFile("audio/master_take1.wav")} volume={1} />
      )}
      {/* =========================================================================
          BACKGROUND / GRAPHICS SCENE STAGES
          ========================================================================= */}

      {/* SCENE 1: THE DALAL STREET TITANIUM MONOLITHS (Frames 148 - 742) */}
      {frame >= 148 && frame < 742 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <ThinkSchoolPodiumChart localFrame={frame - 148} />
        </div>
      )}

      {/* SCENE 2: RETAIL EUPHORIA & MULTIPLE FAMILY ACCOUNTS (Frames 742 - 1226) */}
      {frame >= 742 && frame < 1226 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <ThinkSchoolRetailEuphoria localFrame={frame - 742} />
        </div>
      )}

      {/* SCENE 3: THE TECH IPO GRAVEYARD (Frames 1226 - 1766) */}
      {frame >= 1226 && frame < 1766 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <ThinkSchoolCrashAutopsy localFrame={frame - 1226} />
        </div>
      )}

      {/* SCENE 4: THE BRASS BALANCE SCALE (Frames 1937 - 2239) */}
      {frame >= 1937 && frame < 2239 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <ThinkSchoolGoldenScale localFrame={frame - 1937} />
        </div>
      )}

      {/* SCENE 5: THE 4-PART DRHP ROADMAP (Frames 2239 - 2825) */}
      {frame >= 2239 && frame < 2825 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <ThinkSchoolDrhpDossier localFrame={frame - 2239} />
        </div>
      )}

      {/* =========================================================================
          TOP LAYER: PERSISTENT FLOATING FACECAM (Always On Screen, Never Occluded!)
          ========================================================================= */}
      <ThinkSchoolFloatingFacecam frame={frame} mode={mode} />

      {/* =========================================================================
          EDITORIAL TEXT OVERLAYS ON FULL-SCREEN A-ROLL MOMENTS
          ========================================================================= */}

      {/* 1. Opening Lower Third (Frames 0 - 148) */}
      {frame < 148 && (
        <div
          style={{
            position: "absolute",
            bottom: 70,
            left: 90,
            zIndex: 60,
            transform: `translateY(${interpolate(lowerThirdSpring, [0, 1], [40, 0])}px)`,
            opacity: lowerThirdSpring,
          }}
        >
          <div
            style={{
              background: "rgba(10, 15, 25, 0.88)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              borderRadius: 16,
              padding: "18px 30px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 10,
                height: 48,
                borderRadius: 5,
                background: "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)",
                boxShadow: "0 0 15px rgba(245, 158, 11, 0.6)",
              }}
            />
            <div>
              <div
                style={{
                  color: "#F59E0B",
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                SPECIAL INVESTIGATION // SEBI DRHP
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: 24,
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                  marginTop: 2,
                }}
              >
                Reliance Jio Platforms ₹30,213 Cr Mega IPO
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. The Billion Dollar Question Banner (Frames 1766 - 1937) */}
      {frame >= 1766 && frame < 1937 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: `translateX(-50%) translateY(${interpolate(
              billionBannerSpring,
              [0, 1],
              [40, 0]
            )}px)`,
            opacity: billionBannerSpring,
            zIndex: 60,
          }}
        >
          <div
            style={{
              background: "rgba(10, 15, 25, 0.92)",
              backdropFilter: "blur(18px)",
              border: "2px solid #F59E0B",
              borderRadius: 16,
              padding: "18px 40px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.3)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#F59E0B",
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              ★ CRITICAL QUESTION BEFORE LOCKING CAPITAL
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: "-0.01em",
                marginTop: 4,
              }}
            >
              Is Jio Platforms A Tech Trap or Real Cash Engine?
            </div>
          </div>
        </div>
      )}

      {/* 3. Final Conviction Close Banner (Frames 2825 - 2869) */}
      {frame >= 2825 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: `translateX(-50%) translateY(${interpolate(
              finalHookSpring,
              [0, 1],
              [40, 0]
            )}px)`,
            opacity: finalHookSpring,
            zIndex: 60,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(20, 25, 40, 0.95) 0%, rgba(10, 15, 25, 0.95) 100%)",
              backdropFilter: "blur(18px)",
              border: "2px solid #38BDF8",
              borderRadius: 16,
              padding: "18px 44px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#38BDF8",
                boxShadow: "0 0 15px #38BDF8",
              }}
            />
            <div>
              <div
                style={{
                  color: "#38BDF8",
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                MASTERCLASS ROADMAP LOCKED
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: 24,
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                  marginTop: 2,
                }}
              >
                Dissecting the 400-Page DRHP & My Personal Strategy
              </div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
