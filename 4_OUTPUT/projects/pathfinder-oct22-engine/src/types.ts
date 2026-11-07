export type LayoutMode = 'full' | 'left' | 'right';

export interface SceneConfig {
  id: number;
  startFrame: number;
  endFrame: number;
  layout: LayoutMode;
  title: string;
}

export const SCENES: SceneConfig[] = [
  // ACT 1: THE HOOK & VALUE PROMISE
  { id: 1, startFrame: 0, endFrame: 211, layout: 'full', title: 'Live Masterclass Intro' },
  { id: 2, startFrame: 211, endFrame: 375, layout: 'left', title: 'Jio Financial Services' },
  { id: 3, startFrame: 375, endFrame: 499, layout: 'left', title: 'TII India & Dixon Technologies' },
  { id: 4, startFrame: 499, endFrame: 666, layout: 'left', title: 'Contrarian Anti-Tips Filter' },
  { id: 5, startFrame: 666, endFrame: 860, layout: 'left', title: 'Community Framework B-Roll' },
  { id: 6, startFrame: 860, endFrame: 1051, layout: 'left', title: 'Community Evaluation Pass' },
  
  // ACT 2: THE 6-YEAR STRUGGLE & TARGET AUDIENCE
  { id: 7, startFrame: 1051, endFrame: 1215, layout: 'right', title: 'Target Audience Badges' },
  { id: 8, startFrame: 1215, endFrame: 1440, layout: 'right', title: '6-Year Hardship Timeline' },
  { id: 9, startFrame: 1440, endFrame: 1678, layout: 'left', title: 'Proof of Value B-Roll' },
  
  // ACT 3: CREDIBILITY & IDENTITY
  { id: 10, startFrame: 1678, endFrame: 1902, layout: 'left', title: 'Masterclass Unlocked' },
  { id: 11, startFrame: 1902, endFrame: 2125, layout: 'left', title: 'Santosh (SaN) Bio Card' },
  { id: 12, startFrame: 2125, endFrame: 2280, layout: 'right', title: 'Full-Time Market Participant' },
  
  // ACT 4: SKIN IN THE GAME NUMBERS
  { id: 13, startFrame: 2280, endFrame: 2553, layout: 'left', title: 'Personal Portfolio ₹75L Counter' },
  { id: 14, startFrame: 2553, endFrame: 2715, layout: 'left', title: 'Grand Reveal: ₹1.50 Crores Managed' },
  { id: 15, startFrame: 2715, endFrame: 2910, layout: 'left', title: 'Perspective Shift: Happy Investing' },
  { id: 16, startFrame: 2910, endFrame: 3164, layout: 'right', title: '55 Active Members Mastermind' },
  
  // ACT 5: THE 90-MINUTE CHALLENGE & BONUS
  { id: 17, startFrame: 3164, endFrame: 3361, layout: 'left', title: '90-Min Retention Challenge' },
  { id: 18, startFrame: 3361, endFrame: 3669, layout: 'left', title: 'What You Will Master (Agenda Bullets)' },
  { id: 19, startFrame: 3669, endFrame: 3921, layout: 'left', title: 'Dixon PLI & Compounding Curve' },
  { id: 20, startFrame: 3921, endFrame: 4177, layout: 'right', title: 'Quick Cash Trap vs Long Term' },
  { id: 21, startFrame: 4177, endFrame: 4360, layout: 'full', title: 'Mystery Bonus & Outro Hand-off' },
];
