import React from "react";
import {
  StandardShortReel,
  HeadlineBadge,
  NewspaperClipping,
  ComparisonDuel,
  AutopsyDossier,
  InteractiveCTA,
  SubtitleBlock,
} from "../motion-kit";

// Sample caption blocks for demonstration
const SAMPLE_CAPTIONS: SubtitleBlock[] = [
  {
    id: "b1",
    start: 0,
    end: 90,
    text: "THE BIGGEST IPO IN DALAL STREET HISTORY",
    words: [
      { word: "BIGGEST", startFrame: 5, endFrame: 25 },
      { word: "IPO", startFrame: 26, endFrame: 45 },
      { word: "HISTORY", startFrame: 46, endFrame: 80 },
    ],
  },
  {
    id: "b2",
    start: 91,
    end: 180,
    text: "AUDITED DRHP NUMBERS REVEAL THE TRUTH",
    words: [
      { word: "AUDITED", startFrame: 95, endFrame: 120 },
      { word: "DRHP", startFrame: 121, endFrame: 145 },
      { word: "TRUTH", startFrame: 146, endFrame: 175 },
    ],
  },
  {
    id: "b3",
    start: 181,
    end: 270,
    text: "COMPARE VALUATION WITH BHARTI AIRTEL",
    words: [
      { word: "COMPARE", startFrame: 185, endFrame: 210 },
      { word: "VALUATION", startFrame: 211, endFrame: 235 },
      { word: "AIRTEL", startFrame: 236, endFrame: 265 },
    ],
  },
  {
    id: "b4",
    start: 271,
    end: 360,
    text: "STARTUP CASINO DESTROYED RETAIL WEALTH",
    words: [
      { word: "STARTUP", startFrame: 275, endFrame: 300 },
      { word: "CASINO", startFrame: 301, endFrame: 325 },
      { word: "DESTROYED", startFrame: 326, endFrame: 355 },
    ],
  },
  {
    id: "b5",
    start: 361,
    end: 450,
    text: "COMMENT JIO BELOW FOR THE FULL FORMULA",
    words: [
      { word: "COMMENT", startFrame: 365, endFrame: 390 },
      { word: "JIO", startFrame: 391, endFrame: 415 },
      { word: "BELOW", startFrame: 416, endFrame: 445 },
    ],
  },
];

export const StandardShortReelShowcase: React.FC = () => {
  return (
    <StandardShortReel
      videoProxySrc="video/jio_reel_facecam_proxy.mp4"
      audioSrc="video/jio_reel_audio.wav"
      captionBlocks={SAMPLE_CAPTIONS}
      stages={[
        {
          id: "hook",
          startFrame: 0,
          endFrame: 90,
          component: (
            <HeadlineBadge
              category="SEBI DRHP SPECIAL INVESTIGATION"
              title="₹30,213 CR MEGA IPO"
              subtitle="Should you apply with all family accounts or avoid completely?"
              stamp={{ text: "AVOID?", type: "negative", delayFrames: 25 }}
            />
          ),
        },
        {
          id: "drhp",
          startFrame: 91,
          endFrame: 180,
          component: (
            <NewspaperClipping
              source="THE ECONOMIC TIMES"
              date="OCTOBER 2026"
              headline="Jio Platforms Files ₹30,213 Crore DRHP With SEBI"
              snippet="The filing confirms 100% fresh issue proceeds dedicated to retiring ₹70,000 Cr debt, saving ₹8,600 Cr in annual interest."
              highlightPhrase="₹8,600 Cr in annual interest"
              highlightStartFrame={15}
            />
          ),
        },
        {
          id: "duel",
          startFrame: 181,
          endFrame: 270,
          component: (
            <ComparisonDuel
              title="TELECOM DUOPOLY SHOOTOUT"
              leftCompetitor={{
                name: "Reliance Jio",
                badge: "34x P/E",
                isWinner: true,
                metrics: [
                  { label: "Market Cap", value: "₹10.3L Cr" },
                  { label: "EBITDA Margin", value: "50.1%", isHighlight: true },
                  { label: "OFS Cashout", value: "0%", isHighlight: true },
                ],
              }}
              rightCompetitor={{
                name: "Bharti Airtel",
                badge: "50x P/E",
                metrics: [
                  { label: "Market Cap", value: "₹9.8L Cr" },
                  { label: "EBITDA Margin", value: "52.4%" },
                  { label: "P/E Multiple", value: "50x" },
                ],
              }}
            />
          ),
        },
        {
          id: "autopsy",
          startFrame: 271,
          endFrame: 360,
          component: (
            <AutopsyDossier
              title="THE TECH IPO GRAVEYARD"
              alertStamp="WEALTH DESTRUCTION"
              items={[
                { brand: "PAYTM", drawdown: "-71%", initialPrice: "₹2,150", troughPrice: "₹310" },
                { brand: "ZOMATO", drawdown: "-65%", initialPrice: "₹169", troughPrice: "₹40" },
                { brand: "SWIGGY", drawdown: "-50%", initialPrice: "₹390", troughPrice: "₹195" },
              ]}
            />
          ),
        },
        {
          id: "outro",
          startFrame: 361,
          endFrame: 450,
          component: (
            <InteractiveCTA
              searchQuery="Happy Investing with SaN"
              videoTitle="The Jio ₹30,213 Cr DRHP Masterclass"
              videoDuration="14:28"
              commentKeyword="JIO"
            />
          ),
        },
      ]}
    />
  );
};
