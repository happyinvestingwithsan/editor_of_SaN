import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import {
  LongformSplitLayout,
  FacecamPosition,
} from "../motion-kit";
import {
  EditorialCanvas,
  EditorialHeadlineBadge,
  EditorialStatCard,
  EditorialChart,
  PhysicalClipping,
  PhysicalStamp,
} from "../motion-kit/modules";
import { EDITORIAL_TOKENS } from "../motion-kit/theme/editorialTokens";

/**
 * EquitasSFB_Editorial_Showcase:
 * Demonstrates the Think School & Rahul Jain Editorial Style for SaN.
 * 
 * Replaces the dark neon website layout with:
 * 1. Warm ivory checked canvas background (#F8F7F3).
 * 2. Restrained obsidian charcoal typography and carmine crimson accents.
 * 3. Strict 1140x980 Safe Zone layout budgeting (Zero clipping / zero offset).
 * 4. Realistic physical newspaper clipping with Stabilo Boss highlighter sweep.
 * 5. Authentic rubber ink stamp with mix-blend-mode: multiply.
 */
export const EquitasSFB_Editorial_Showcase: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic Host position: Right tall for Clip 1 (0-741), Left tall for Clip 2 (741-1200)
  const facecamPos: FacecamPosition = frame < 741 ? "right_tall" : "left_tall";

  return (
    <LongformSplitLayout
      facecamPosition={facecamPos}
    >
      <EditorialCanvas
        classification="SPECIAL FORENSIC REPORT // DALAL STREET CRISIS"
        docketCode="FILE: EQUITAS-BNK-2026 // VALUATION CRASH"
        watermark="SAN INVESTIGATIVE MASTERCLASS"
      >
        {/* =========================================================================
            CLIP 01 (0 – 741 frames / 0:00 – 0:24.7s) | Hook: 34% Drawdown Shock
            Strict Safe Height Budget: Max 860px
            - Header Zone: 100px
            - Metric Zone: 140px
            - Chart Zone: 360px
            - Gaps: 2 x 20px = 40px
            Total Stack Height = 640px (Ample 220px breathing room!)
            ========================================================================= */}
        <Sequence from={0} durationInFrames={741}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              width: "100%",
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            {/* 1. Header Zone: Restrained Editorial Headline Badge */}
            <EditorialHeadlineBadge
              category="CRISIS ALERT // 48-HR COLLAPSE"
              title="EQUITAS SMALL FINANCE BANK"
              subtitle="From All-Time High to Free Fall: The 34% Valuation Wipeout"
              tone="crimson"
            />

            {/* 2. Metric Zone: Clean Institutional Stat Card */}
            <EditorialStatCard
              label="48-HOUR DRAWDOWN"
              value="-34%"
              numericValue={-34}
              suffix="%"
              breakdown="DAY 1: -20% (LOWER CIRCUIT) // DAY 2: -14% PANIC SELLING"
              tone="crimson"
              badgeText="52-WK LOW"
              counterFrames={35}
            />

            {/* 3. Evidence Zone: Technical Editorial Chart */}
            <EditorialChart
              title="VALUATION FREE FALL TRAJECTORY"
              subtitle="Peak Upper Circuit (₹88.50) to Crash Floor (₹58.40)"
              dataPoints={[88.5, 87.0, 71.2, 70.8, 68.0, 58.4]}
              tone="crimson"
              highlightLabel="-34.2% LOSS"
              dma200Level={78.0}
              drawDurationFrames={45}
              chartHeight={340}
            />
          </div>
        </Sequence>

        {/* =========================================================================
            CLIP 02 (741 – 1200 frames / 24.7s – 40.0s) | The Scanned Newspaper Clipping
            Realistic Physical Newsprint + Stabilo Boss Marker + Rubber Ink Stamp
            ========================================================================= */}
        <Sequence from={741} durationInFrames={459}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            <PhysicalClipping
              source="THE FINANCIAL EXPRESS"
              edition="BANKING INVESTIGATION // NATIONAL EDITION"
              date="OCTOBER 24, 2026"
              headline="MD & CEO ABRUPTLY RESIGNS OVER CONFLICT OF INTEREST"
              snippet="Founder P.N. Vasudevan tenders unexpected resignation amid governance probe as Equitas Small Finance Bank plunges 20% to fresh 52-week low."
              highlightPhrase="conflict of interest"
              highlightStartFrame={15}
              highlighterColor={EDITORIAL_TOKENS.colors.highlighterYellow}
              rotationAngle={-1.5}
              stampSlot={
                <PhysicalStamp
                  text="GOVERNANCE TRAP"
                  subText="AUDIT ALERT"
                  tone="crimson"
                  triggerFrame={30}
                  fontSize={40}
                  rotationAngle={-7}
                />
              }
            />
          </div>
        </Sequence>
      </EditorialCanvas>
    </LongformSplitLayout>
  );
};
