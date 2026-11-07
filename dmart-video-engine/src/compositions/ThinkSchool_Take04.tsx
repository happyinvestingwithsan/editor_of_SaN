import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
} from "remotion";

import { ThinkSchoolTake04Facecam } from "../components/thinkschool/ThinkSchoolTake04Facecam";
import { Take4DuopolyBattlefieldStage } from "../components/thinkschool/Take4DuopolyBattlefieldStage";
import { Take4SubscriberEmpireStage } from "../components/thinkschool/Take4SubscriberEmpireStage";
import { Take4EbitdaProfitStage } from "../components/thinkschool/Take4EbitdaProfitStage";
import { Take4CashflowVsPatStage } from "../components/thinkschool/Take4CashflowVsPatStage";
import { Take4ScreenerShootoutStage } from "../components/thinkschool/Take4ScreenerShootoutStage";
import { Take4ValuationAnomalyStage } from "../components/thinkschool/Take4ValuationAnomalyStage";
import { Take4DataBeastStage } from "../components/thinkschool/Take4DataBeastStage";
import { Take4ArpuLeverageStage } from "../components/thinkschool/Take4ArpuLeverageStage";

export interface ThinkSchool_Take04Props {
  mode?: "full_video" | "overlay_only";
}

/**
 * ThinkSchool_Take04:
 * Chapter 4: The Operational Machine & Duopoly Valuation Benchmark (Jio vs Bharti Airtel)
 * Master Source: D:\QuickShare\JIO IPO\Jio_Mega_IPO_8Min_Master-full video.mov (295.38s - 408.15s)
 * Duration: 3383 frames (112.77s @ 30fps)
 *
 * Micro-Aligned Word-Level Timeline:
 * - Frames 0 - 270 (0.0s - 9.0s): FULL-SCREEN FACE CAM (SaN delivers investing hook).
 * - Frames 270 - 424 (9.0s - 14.1s): Duopoly Battlefield (SaN Left Column 35%).
 * - Frames 424 - 500 (14.1s - 16.7s): FULL-SCREEN FACE CAM ("Let's look at raw operating metrics").
 * - Frames 500 - 850 (16.7s - 28.3s): Subscriber Empire 53.3 Cr vs 40.5 Cr (Word-synchronized, SaN Right Column 35%).
 * - Frames 850 - 1204 (28.3s - 40.1s): 50.1% EBITDA Margin only -> Revenue -> PAT (SaN Left Column 35%).
 * - Frames 1204 - 1592 (40.1s - 53.1s): 2.62x Cash Flow vs Net Profit (SaN Right Column 35%).
 * - Frames 1592 - 2308 (53.1s - 76.9s): Screener.in Shootout 34x vs 50x (SaN Calibrated Circle PIP).
 * - Frames 2308 - 2713 (76.9s - 90.4s): ~30% Valuation Discount Arbitrage (SaN Right Column 35%).
 * - Frames 2713 - 2929 (90.4s - 97.6s): 43.7 GB/Mo Data Consumption Beast (SaN Left Column 35%).
 * - Frames 2929 - 3383 (97.6s - 112.8s): ARPU Staircase (+₹10 = +₹5,000 Cr EBITDA) + Slide Wipe (SaN Right Column 35%).
 */
export const ThinkSchool_Take04: React.FC<ThinkSchool_Take04Props> = ({
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
      {/* Master Audio Track from Final MOV slice */}
      {mode === "full_video" && (
        <Audio src={staticFile("audio/master_take4.wav")} volume={1} />
      )}

      {/* =========================================================================
          BACKGROUND / GRAPHICS SCENE STAGES (Only active when spoken!)
          ========================================================================= */}

      {/* SCENE 1: DUOPOLY BATTLEFIELD (Frames 270 - 424 | Spoken: "In India, telecom is strictly duopoly...") */}
      {frame >= 270 && frame < 424 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take4DuopolyBattlefieldStage localFrame={frame} />
        </div>
      )}

      {/* NOTE: Frames 424 - 560 is FULL-SCREEN FACE CAM ("Let's look at raw operating metrics... Jio commands an empire of over...") */}

      {/* SCENE 2: SUBSCRIBER EMPIRE (Frames 560 - 850 | Word-synced 53.3 Cr -> 40% -> Airtel 40.5 Cr) */}
      {frame >= 560 && frame < 850 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take4SubscriberEmpireStage localFrame={frame - 560} />
        </div>
      )}

      {/* SCENE 3: 50.1% EBITDA MARGIN & PROFIT (Frames 850 - 1204 | Speedometer ONLY -> Revenue at 1057 -> PAT at 1148) */}
      {frame >= 850 && frame < 1204 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take4EbitdaProfitStage localFrame={frame - 850} />
        </div>
      )}

      {/* SCENE 4: 2.62x CASH FLOW vs ACCOUNTING PAT (Frames 1204 - 1592) */}
      {frame >= 1204 && frame < 1592 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take4CashflowVsPatStage localFrame={frame - 1204} />
        </div>
      )}

      {/* SCENE 5: SCREENER.IN SHOOTOUT 34x vs 50x (Frames 1592 - 2308 | Vertically centered) */}
      {frame >= 1592 && frame < 2308 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take4ScreenerShootoutStage localFrame={frame - 1592} />
        </div>
      )}

      {/* SCENE 6: ~30% VALUATION DISCOUNT ANOMALY (Frames 2308 - 2713) */}
      {frame >= 2308 && frame < 2713 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take4ValuationAnomalyStage localFrame={frame - 2308} />
        </div>
      )}

      {/* SCENE 7: 43.7 GB/MONTH DATA CONSUMPTION BEAST (Frames 2713 - 2929) */}
      {frame >= 2713 && frame < 2929 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take4DataBeastStage localFrame={frame - 2713} />
        </div>
      )}

      {/* SCENE 8: ARPU LEVERAGE ROCKET & SLIDE WIPE (Frames 2929 - 3383) */}
      {frame >= 2929 && frame < 3383 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Take4ArpuLeverageStage localFrame={frame - 2929} />
        </div>
      )}

      {/* =========================================================================
          PERSISTENT SINGLE <VIDEO> FACECAM ARCHITECTURE
          ========================================================================= */}
      <ThinkSchoolTake04Facecam frame={frame} mode={mode} />
    </AbsoluteFill>
  );
};
