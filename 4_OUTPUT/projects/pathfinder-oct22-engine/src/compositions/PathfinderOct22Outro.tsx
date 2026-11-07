import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { OutroFacecam } from "../components/OutroFacecam";
import { Scene01_IntroWrap } from "../components/scenes/Scene01_IntroWrap";
import { Scene02_ChannelEngagement } from "../components/scenes/Scene02_ChannelEngagement";
import { Scene03_MasterclassBonus } from "../components/scenes/Scene03_MasterclassBonus";
import { Scene04_LiveFeatures } from "../components/scenes/Scene04_LiveFeatures";
import { Scene05_PriceSlashDate } from "../components/scenes/Scene05_PriceSlashDate";
import { Scene06_LanguagePortal } from "../components/scenes/Scene06_LanguagePortal";
import { Scene07_PillarPsychology } from "../components/scenes/Scene07_PillarPsychology";
import { Scene08_PillarBlueprint } from "../components/scenes/Scene08_PillarBlueprint";
import { Scene09_CommunityEthos } from "../components/scenes/Scene09_CommunityEthos";
import { Scene10_TimeValueExchange } from "../components/scenes/Scene10_TimeValueExchange";
import { Scene12_ConnectInquiry } from "../components/scenes/Scene12_ConnectInquiry";
import { Scene13_WebsiteBroll } from "../components/scenes/Scene13_WebsiteBroll";
import { Scene14_WhatsAppRegister } from "../components/scenes/Scene14_WhatsAppRegister";
import { Scene15_ZeroRiskFact } from "../components/scenes/Scene15_ZeroRiskFact";
import { Scene16_PathfinderProof } from "../components/scenes/Scene16_PathfinderProof";
import { Scene17_CompoundingFormula } from "../components/scenes/Scene17_CompoundingFormula";
import { Scene18_GrandFinale } from "../components/scenes/Scene18_GrandFinale";

export interface PathfinderOct22OutroProps {
  showHUD?: boolean;
}

export const PathfinderOct22Outro: React.FC<PathfinderOct22OutroProps> = ({
  showHUD = false,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: theme.colors.bgDark,
        overflow: "hidden",
        position: "relative",
        fontFamily: theme.typography.fontSans,
      }}
    >
      {/* Subtle Atmospheric Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 60%),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 80px 80px, 80px 80px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Persistent Single Facecam & Master Audio (Z-Index 5) */}
      <OutroFacecam frame={frame} showHUD={showHUD} />

      {/* =========================================================================
          DYNAMIC MOTION GRAPHIC OVERLAYS (Z-Index 10)
          Word-Snapped & Mobile-Optimized Typography
          Generous Dwell Times & Smoothed Exits (Zero Flash/Flicker)
          ========================================================================= */}

      {/* Scene 1: Introduction Wrap-up (Frames 0 - 186) */}
      {frame >= 0 && frame < 186 && (
        <Scene01_IntroWrap localFrame={frame} />
      )}

      {/* Scene 2: Channel Support (Like, Share, Subscribe) (Frames 186 - 356) */}
      {frame >= 186 && frame < 356 && (
        <Scene02_ChannelEngagement localFrame={frame - 186} />
      )}

      {/* Scene 3: Bonus Teaser & VIP Masterclass Pass Reveal (Frames 356 - 630) */}
      {frame >= 356 && frame < 630 && (
        <Scene03_MasterclassBonus localFrame={frame - 356} />
      )}

      {/* Scene 4: Live Interactive Features & Market Psychology Audit (Frames 630 - 865) */}
      {frame >= 630 && frame < 865 && (
        <Scene04_LiveFeatures localFrame={frame - 630} />
      )}

      {/* Scene 5: Price Slash (~~₹333~~ -> ₹0 FREE) & Date Lock (Frames 865 - 1100) */}
      {frame >= 865 && frame < 1100 && (
        <Scene05_PriceSlashDate localFrame={frame - 865} />
      )}

      {/* Scene 6: Dual Language Portal & Prominent Elite QR Spotlight (Frames 1100 - 1320) */}
      {frame >= 1100 && frame < 1320 && (
        <Scene06_LanguagePortal localFrame={frame - 1100} />
      )}

      {/* Scene 7: Pillar 01 - Market Psychology & Traps (Frames 1320 - 1515) */}
      {frame >= 1320 && frame < 1515 && (
        <Scene07_PillarPsychology localFrame={frame - 1320} />
      )}

      {/* Scene 8: Pillar 02 - Wealth-Building Blueprint (Frames 1515 - 1720) */}
      {frame >= 1515 && frame < 1720 && (
        <Scene08_PillarBlueprint localFrame={frame - 1515} />
      )}

      {/* Scene 9: Happy Investing Community Ethos (Frames 1720 - 1914) */}
      {frame >= 1720 && frame < 1914 && (
        <Scene09_CommunityEthos localFrame={frame - 1720} />
      )}

      {/* Scene 10: Value vs Time Investment (Cost: ₹0 | Time: 3 Hours) & Calendar Lock (Frames 1914 - 2313) */}
      {frame >= 1914 && frame < 2313 && (
        <Scene10_TimeValueExchange localFrame={frame - 1914} />
      )}

      {/* Scene 12: Community Connect Inquiry (Frames 2313 - 2521) */}
      {frame >= 2313 && frame < 2521 && (
        <Scene12_ConnectInquiry localFrame={frame - 2313} />
      )}

      {/* Scene 13: SaN's Custom Member & WhatsApp Image Zoom Route (Frames 2521 - 2731) */}
      {frame >= 2521 && frame < 2731 && (
        <Scene13_WebsiteBroll localFrame={frame - 2521} />
      )}

      {/* Scene 14: Direct WhatsApp Registration (Frames 2731 - 3005) */}
      {frame >= 2731 && frame < 3005 && (
        <Scene14_WhatsAppRegister localFrame={frame - 2731} />
      )}

      {/* Scene 15: Zero Risk & All Facts Presented (Frames 3005 - 3305) */}
      {frame >= 3005 && frame < 3305 && (
        <Scene15_ZeroRiskFact localFrame={frame - 3005} />
      )}

      {/* Scene 16: Pathfinder Live Session Stock Analysis Proof (Frames 3305 - 3636) */}
      {frame >= 3305 && frame < 3636 && (
        <Scene16_PathfinderProof localFrame={frame - 3305} />
      )}

      {/* Scene 17: Compounding Formula & 3 Pillars (Frames 3636 - 4000) */}
      {frame >= 3636 && frame < 4000 && (
        <Scene17_CompoundingFormula localFrame={frame - 3636} />
      )}

      {/* Scene 18: Full Facecam Grand Finale & Signoff (Frames 4000 - 4258) */}
      {frame >= 4000 && frame <= 4258 && (
        <Scene18_GrandFinale localFrame={frame - 4000} />
      )}
    </AbsoluteFill>
  );
};
