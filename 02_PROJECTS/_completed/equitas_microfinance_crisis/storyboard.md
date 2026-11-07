# EQUITAS SMALL FINANCE BANK — SCREENER PART 2
## "The Microfinance Crisis, Profit Collapse & Management Response"
### Production Storyboard & Visual Forensic Architecture

---

## 1. Master Video Metadata & Specifications
- **Master Cut Source:** `d:\QuickShare\Equitas SFB\Capcut\ESFB - Screenr - 2 - Video.mov`
- **Proxy Video:** `dmart-video-engine/public/video/esfb_screener2_facecam.mp4` (All-Intra H.264, Faststart, CRF 22, -an)
- **Audio Master:** `dmart-video-engine/public/video/esfb_screener2_audio.wav` (48kHz Uncompressed WAV)
- **Canvas Resolution:** 1920 × 1080 (16:9 Landscape)
- **Frame Rate:** 30.00 fps
- **Total Duration:** 3,544 frames (118.13 seconds / ~1 min 58 sec)
- **Facecam Architecture:** Single persistent `<Video>` element mounted across 100% of the timeline. SaN in 30–32% screen real estate (580px × 980px, radius 24px), alternating Left/Right every 15–20s with GPU `translate3d` transforms.
- **Design System:** Mandatory Light Theme (`#FFFFFF` primary, `#F2FAF9` secondary, `#E8F5F3` container, `#0F8F87` primary teal, `#18252B` slate text, `#D97869` coral negative, `#249B79` emerald positive).

---

## 2. The 15 Storyboard Scenes & Exact Kinetic Timeline

| Scene # | Time (Sec) | Frames | Spoken Dialogue (Faster-Whisper Verified) | Facecam Split | Visual Forensic Concept & Editorial Layout | SFX Cue |
| :---: | :---: | :---: | :--- | :---: | :--- | :---: |
| **01** | `0.00s - 8.00s` | `0 - 240` | *"Why did the profit tipped so drastically? Many retail investors would have thought the bank is collapsing, right?"* | Full screen (0-90) → Springs to Left (60px) | **Why Did Profits Collapse?** Top badge: Retail Sentiment Shock. Comparison Duel: FY24 Peak ₹799 Cr vs Mid-2025 Plunge -₹224 Cr. Retail Panic Callout: "Is the bank collapsing?" | `whoosh` (f90) |
| **02** | `8.00s - 15.00s` | `240 - 450` | *"But here is what the smart investor would do little different stuff. If you read the conference called Transcript..."* | Left (60px) | **Look Beyond The Headline Numbers.** Authentic Concall Transcript document card. Highlighted extract: "the Indian Microfinance Crisis." Forensic Rule: Never judge a bank by the bottom line until you identify the segment. | `paper_shuffle` (f240) |
| **03** | `15.00s - 24.67s` | `450 - 740` | *"...the reason was very specific, the Indian microfinance crisis. Across India, Lender has flooded the rural and semi-urban borrowers with microfinance loans."* | Springs to Right (1280px) | **The Indian Microfinance Crisis.** Industry-wide credit over-supply. Multi-lender conduit flow (NBFC-MFIs, SFBs, Fintechs) aggressively converging on rural & semi-urban households. | `whoosh` (f450) |
| **04** | `24.67s - 29.00s` | `740 - 870` | *"A single borrower was taking four to five different loans simultaneously."* | Right (1280px) | **1 Borrower. 4 to 5 Loans.** 5 staggered loan cards stacked (MFI, NBFC, SFB, Fintech, Informal). Debt Trap Calculation Box: Monthly EMI ₹17,100 vs Monthly Income ₹15,000 (114% DTI). Default Imminent. | `pop` (f740) |
| **05** | `29.00s - 39.33s` | `870 - 1180` | *"When a regional stress hit in a place like Karnataka and heat waves disrupted the rural wages, defaults exploded. Across the entire microfinance industry."* | Right (1280px) | **Regional Stress & Heatwaves.** Dual exogenous shock cards: 1. Karnataka collection friction & political resistance. 2. Severe heatwaves disrupting rural wages. Default Explosion Banner: Contagion across all lenders. | `fracture` (f870) |
| **06** | `39.33s - 49.00s` | `1180 - 1470` | *"In equitas, microfinance credit cost shot up from 2.3% in FI-24 to a staggering 11.37% in FI-25."* | Springs to Left (60px) | **Credit Cost Shot Up Nearly 5x.** High-contrast vertical comparison bars: FY24 2.30% vs FY25 11.37%. Central 4.94x Shock badge. For every ₹100 lent, > ₹11 went to loan write-offs. | `boom` (f1180) |
| **07** | `49.00s - 54.50s` | `1470 - 1635` | *"That single segment wiped out over 630 crores of operating profits."* | Left (60px) | **Wiped Out Over ₹630 Crores.** Hero metric card: -₹630 Cr operating profits erased. Rubber stamp slam: "CONTAINED TO MFI". Operating earnings squeezed to quarterly loss. | `impact_hit` (f1470) |
| **08** | `54.50s - 62.00s` | `1635 - 1860` | *"Now, let's look what management actually did. Did they try to hide their bad loans? No, not actually."* | Left (60px) | **Did Management Try To Hide Bad Loans?** Governance audit. Contrasting Path 1: Evergreening & hiding for 3 years (Rejected ❌) vs Path 2: Radical transparency & immediate recognition (Equitas Reality ✓). | `paper_shuffle` (f1635) |
| **09** | `62.00s - 77.33s` | `1860 - 2320` | *"Number one, what they did is they were completely honest. In mid 2025, they accepted a big loss of 224 crores. They cleaned up all their bad loans in one go instead of hiding the problem for years as a backlog."* | Springs to Right (1280px) | **Action 1: Cleaned Up In One Go.** Upfront kitchen-sink loss card: -₹224 Cr. Rubber stamp slam: "✓ CLEANED IN ONE GO". Rip off band-aid vs dragging toxic zombie backlog. | `stamp` (f1860) |
| **10** | `77.33s - 86.67s` | `2320 - 2600` | *"Point number two, they became very strict. If someone already had too many loans, the bank simply said no for the new loans."* | Right (1280px) | **Action 2: The Bank Simply Said 'NO'.** Underwriting Gate. Digital decision engine: Over-leveraged borrowers (≥ 3 loans) barred. Red declination gate: "LOAN DECLINED". | `padlock` (f2320) |
| **11** | `86.67s - 95.00s` | `2600 - 2850` | *"In fact, they rejected almost half of the risky borrowers loan request. They chose safety over the risky growth."* | Springs to Left (60px) | **Rejected ~50% Of Risky Borrowers.** Hero metric: ~50% rejection rate. Trade-off duel: Balance sheet safety (Equitas Priority ✓) vs reckless loan volume (Sacrificed ❌). | `pop` (f2600) |
| **12** | `95.00s - 102.00s` | `2850 - 3060` | *"And point number three is overall in 100% of the business, only 15% is actually attributed to this risk."* | Left (60px) | **The 15% vs 85% Reality.** High-contrast SVG doughnut chart: 15% Microfinance (Coral) vs 85% Core Secured Business (Teal). Revealing the crisis was confined to just 15% of the bank. | `cash_chime` (f2850) |
| **13** | `102.00s - 108.83s` | `3060 - 3265` | *"85% of the total lending is backed by the real asset like property, shops and commercial vehicles."* | Left (60px) | **85% Backed By Hard Real Assets.** 3 Physical Asset Pillars: 1. Property & Mortgages (LAP). 2. Commercial Vehicles & Trucks. 3. Active Shops & Kirana Merchants. 100% secured collateral. | `whoosh` (f3060) |
| **14** | `108.83s - 113.67s` | `3265 - 3410` | *"In this main business, almost everyone pays the EMI properly on time."* | Left (60px) | **In The Main Business, Everyone Pays On Time.** Monthly EMI Calendar Grid (Jan - Dec) with animated emerald checkmarks (✓) popping sequentially. > 99% collection efficiency. | `soft_bell` (f3265) |
| **15** | `113.67s - 118.14s` | `3410 - 3544` | *"Only that small microfinancing part was hurting them and they fixed it."* | Springs to Full Screen (0px) | **The Forensic Verdict (Outro).** Floating bottom glassmorphism editorial banner over full screen SaN. "Only that small microfinancing part was hurting them — and they fixed it." Teaser to Part 3 (Phoenix Rebound). | `whoosh` (f3410) |

---

## 3. Kinetic & Typography Standards Applied
- **Primary Headings:** 46px – 48px bold, `-0.02em` tracking, color `#18252B`.
- **Hero Stats:** 64px – 92px ultra-bold, color `#0F8F87` (Teal) or `#D97869` (Coral).
- **Body & Insights:** 18px – 22px regular/semibold, color `#687780` and `#18252B`.
- **Badges:** 13px – 14px uppercase bold pill badges with Lucide icons.
- **Physical Springs:** Damped springs (`damping: 18, stiffness: 90`) with natural deceleration. Snappy rubber stamp physics (`damping: 14, stiffness: 180`).
- **Screen Margins:** Clean 50px vertical and 60px horizontal gutters, zero edge clutter.
