import React from "react";
import {
  StandardLongformChapter,
  StockTickerCard,
  MetricOdometer,
  FinancialChart,
  NewspaperClipping,
  HeadlineBadge,
} from "../motion-kit";

export const StandardLongformShowcase: React.FC = () => {
  return (
    <StandardLongformChapter
      videoProxySrc="video/facecam_take1_fast.mp4"
      audioSrc="audio/master_take1.wav"
      stages={[
        {
          id: "intro_hook",
          startFrame: 0,
          endFrame: 120,
          facecamPosition: "full_screen",
          component: (
            <HeadlineBadge
              category="MASTERCLASS FORENSIC INVESTIGATION"
              title="THE ₹30,213 CR JIO FORMULA"
              subtitle="Auditing the audited balance sheet, cash flows, and 200 DMA entry strategy."
            />
          ),
        },
        {
          id: "valuation_split",
          startFrame: 121,
          endFrame: 240,
          facecamPosition: "right_tall",
          component: (
            <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: "40px 20px" }}>
              <StockTickerCard
                companyName="Jio Platforms Limited"
                ticker="JIO"
                exchange="NSE"
                price="₹10,30,000 Cr"
                changePercent="+34x PE"
                isPositive={true}
                metricBadge="DRHP VALUATION"
              />
              <MetricOdometer
                value={8600}
                prefix="₹"
                suffix=" Cr"
                label="Annual Interest Savings Post Debt Reduction"
                durationFrames={30}
              />
            </div>
          ),
        },
        {
          id: "technical_breakout",
          startFrame: 241,
          endFrame: 360,
          facecamPosition: "left_tall",
          component: (
            <div style={{ padding: "40px 20px" }}>
              <FinancialChart
                title="200 DMA TECHNICAL ACCUMULATION ZONE"
                subtitle="Why strict institutional discipline beats IPO listing day euphoria"
                dataPoints={[40, 48, 55, 62, 65, 80, 110, 145, 180, 220, 280]}
                dma200Level={65}
                highlightLabel="CLEAN BREAKOUT"
              />
            </div>
          ),
        },
        {
          id: "filing_deepdive",
          startFrame: 361,
          endFrame: 480,
          facecamPosition: "circle_bottom_right",
          component: (
            <div style={{ padding: "60px 40px" }}>
              <NewspaperClipping
                source="SEBI OFFICIAL STATUTORY FILING"
                date="FORM DRHP SCHEDULE II"
                headline="100% Fresh Issue Proceeds Confirmed"
                snippet="Neither Mukesh Ambani nor Google nor Meta are cashing out a single share. The entire capital is deployed to eliminate bank borrowings."
                highlightPhrase="not cashing out a single share"
                highlightStartFrame={10}
              />
            </div>
          ),
        },
      ]}
    />
  );
};
