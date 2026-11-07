import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
} from "remotion";

import { ThinkSchoolTake03Facecam } from "../components/thinkschool/ThinkSchoolTake03Facecam";
import { Take3CapitalRoutingStage } from "../components/thinkschool/Take3CapitalRoutingStage";
import { Take3DrhpPrepaymentStage } from "../components/thinkschool/Take3DrhpPrepaymentStage";
import { Take3DebtPreIpoStage } from "../components/thinkschool/Take3DebtPreIpoStage";
import { Take3LaserSliceStage } from "../components/thinkschool/Take3LaserSliceStage";
import { Take3InterestLeakageStage } from "../components/thinkschool/Take3InterestLeakageStage";
import { Take3AnnualSavingsOdometerStage } from "../components/thinkschool/Take3AnnualSavingsOdometerStage";
import { Take3PnLGravityWaterfallStage } from "../components/thinkschool/Take3PnLGravityWaterfallStage";

export interface ThinkSchool_Take03Props {
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchool_Take03:
 * Chapter 3: The ₹27,500 Crore Debt Destruction & P&L Expansion
 * Master Source: D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov (207.08s - 295.06s)
 * Duration: 2640 frames (87.98s @ 30fps)
 *
 * Micro-Aligned "Animation Follows Words" Rhythm:
 * - Frames 0 - 120 (0.0s - 4.0s): FULL SCREEN A-ROLL (Opening question: "So if promoters are not taking money out...")
 * - Frames 120 - 204 (4.0s - 6.8s): Capital Routing Breakdown (Word: "where does this 30,000 crore actually go?")
 * - Frames 204 - 644 (6.8s - 21.5s): DRHP Prepayment Table (Full Screen Document + Calibrated Circle PIP)
 * - Frames 644 - 738 (21.5s - 24.6s): FULL SCREEN A-ROLL ("Let's look at the balance sheet reality before this IPO...")
 * - Frames 738 - 989 (24.6s - 33.0s): Pre-IPO Debt Reality (Word: "mid-2026 59,140 crore debt")
 * - Frames 989 - 1318 (33.0s - 43.9s): 50% Cyan Laser Decapitation (Word: "nearly half" @ Frame 1130)
 * - Frames 1318 - 1570 (43.9s - 52.3s): FULL SCREEN A-ROLL ("Why does this matter to returns? In previous financial year...")
 * - Frames 1570 - 1828 (52.3s - 60.9s): > ₹8,000 Cr Leakage (Word: "over 8,000 crore" @ Frame 1570)
 * - Frames 1828 - 2106 (60.9s - 70.2s): Permanent Weld & Gold Savings Odometer (Word: "permanently eliminated" & "3,500-4,000 cr")
 * - Frames 2106 - 2640 (70.2s - 88.0s): P&L Gravity Waterfall & Zero-Work Paradox (Word: "flows down through P&L")
 */
export const ThinkSchool_Take03: React.FC<ThinkSchool_Take03Props> = ({
  mode = "full_video",
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: mode === "full_video" ? "#070B12" : "transparent",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Master Dialogue Audio Track (Direct Master MOV Audio) */}
      {mode === "full_video" && (
        <Audio src={staticFile("audio/master_take3.wav")} volume={1} />
      )}

      {/* =========================================================================
          BACKGROUND / GRAPHICS SCENE STAGES (Animation Strictly Follows Words!)
          ========================================================================= */}

      {/* BEAT 2: CAPITAL ROUTING HUB (Frames 120 - 204) */}
      {frame >= 120 && frame < 204 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take3CapitalRoutingStage localFrame={frame - 120} />
        </div>
      )}

      {/* BEAT 3: REAL DRHP PREPAYMENT STATUTORY TABLE (Frames 204 - 644) */}
      {frame >= 204 && frame < 644 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take3DrhpPrepaymentStage localFrame={frame - 204} />
        </div>
      )}

      {/* BEAT 5: PRE-IPO DEBT MONOLITH (Frames 738 - 989) */}
      {frame >= 738 && frame < 989 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take3DebtPreIpoStage localFrame={frame - 738} />
        </div>
      )}

      {/* BEAT 6: 50% CYAN LASER DECAPITATION (Frames 989 - 1318) */}
      {frame >= 989 && frame < 1318 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take3LaserSliceStage localFrame={frame - 989} />
        </div>
      )}

      {/* BEAT 8: > ₹8,000 CR ANNUAL LEAKAGE (Frames 1570 - 1828) */}
      {frame >= 1570 && frame < 1828 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take3InterestLeakageStage localFrame={frame - 1570} />
        </div>
      )}

      {/* BEAT 9: PERMANENT WELD & SAVINGS ODOMETER (Frames 1828 - 2106) */}
      {frame >= 1828 && frame < 2106 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take3AnnualSavingsOdometerStage localFrame={frame - 1828} />
        </div>
      )}

      {/* BEAT 10: P&L GRAVITY WATERFALL & ZERO-WORK COCKPIT DIALS (Frames 2106 - 2640) */}
      {frame >= 2106 && frame <= 2640 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take3PnLGravityWaterfallStage localFrame={frame - 2106} />
        </div>
      )}

      {/* =========================================================================
          TOP LAYER: ADAPTIVE FACECAM (Full-Screen A-Roll, Side Column, or Circle PIP)
          ========================================================================= */}
      <ThinkSchoolTake03Facecam frame={frame} mode={mode} />
    </AbsoluteFill>
  );
};
