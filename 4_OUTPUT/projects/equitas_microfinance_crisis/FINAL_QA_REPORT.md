# EQUITAS SMALL FINANCE BANK — SCREENER PART 2
# FINAL PRODUCTION QA & RENDER REPORT
### "The Microfinance Crisis, Profit Collapse & Management Response"

---

## 1. Executive Summary & Verification

This report certifies the successful final production render and delivery of:
**EQUITAS SMALL FINANCE BANK — SCREENER PART 2: THE MICROFINANCE CRISIS, PROFIT COLLAPSE & MANAGEMENT RESPONSE**.

Following explicit review and approval from SaN, the master composition (`ESFB-Screenr-2-Video`) was rendered at full 1080p resolution (CRF 18) and deployed to both project storage and the central QuickShare production directory.

### Production Verification Checklist:
- [x] **SaN Explicit Approval:** Received and recorded ("render it").
- [x] **Full 1080p Master Render:** Executed via Remotion CLI (`CRF 18`, `pix_fmt yuv420p`, 30 fps).
- [x] **FFprobe Acoustic & Video Verification:** 100% frame-perfect sync (3,544 frames, 118.13s, 48kHz audio).
- [x] **QuickShare Distribution:** Master MP4 copied to `D:\QuickShare\Equitas SFB\ESFB_Screener_2_Master.mp4`.
- [x] **Visual Contact Sheet:** 12-scene montage generated at `equitas_microfinance_crisis/contact_sheet.png`.
- [x] **Mandatory Light Theme:** 100% compliant (`#FFFFFF` canvas, `#0F8F87` primary teal, `#18252B` text, `#D97869` coral, `#249B79` emerald).
- [x] **Facecam Architecture:** Single persistent `<Video>` element mounted across 100% of the timeline, alternating Left/Right every 15–20s.
- [x] **Zero Corner Clutter:** Clean margins and zero extraneous docket/axis text.

---

## 2. Technical Render Specifications (Verified via ffprobe)

| Parameter | Specification | Verified Output |
| :--- | :--- | :--- |
| **Output File 1** | Project Root | `equitas_microfinance_crisis/FINAL_EQUITAS_MICROFINANCE.mp4` |
| **Output File 2** | QuickShare Distribution | `D:\QuickShare\Equitas SFB\ESFB_Screener_2_Master.mp4` |
| **Resolution** | 1920 × 1080 | 1920 × 1080 (16:9 Landscape) |
| **Video Codec** | H.264 (High Profile, level 4.0) | `h264`, yuv420p progressive |
| **Frame Rate** | 30.00 fps constant | 30/1 (30.0 fps) |
| **Total Frames** | 3,544 frames | Exactly 3,544 frames |
| **Duration** | 118.133 seconds | `118.133333s` (Video) / `118.144s` (Container) |
| **Audio Track** | AAC Stereo @ 48,000 Hz | 48 kHz, 2 channels, 160 kb/s |
| **File Size** | ~111.9 MiB | 117,350,701 bytes (117.4 MB on disk) |
| **Overall Bitrate** | ~8 Mbps | 7,946 kb/s |

---

## 3. The 15 Kinetic Scenes Summary

1. **Scene 01 [0.0s - 8.0s / f0-f240]:** Why Did Profits Collapse? (FY24 ₹799 Cr vs Mid-2025 -₹224 Cr Loss & Retail Panic).
2. **Scene 02 [8.0s - 15.0s / f240-f450]:** Look Beyond The Headline Numbers (Official Q2 FY25 Concall Transcript Extract).
3. **Scene 03 [15.0s - 24.7s / f450-f740]:** The Indian Microfinance Crisis (Multi-Lender Aggressive Flooding Conduit Diagram).
4. **Scene 04 [24.7s - 29.0s / f740-f870]:** 1 Borrower, 4-5 Loans (The Debt Trap: 114% Debt-to-Income Stack).
5. **Scene 05 [29.0s - 39.3s / f870-f1180]:** Regional Stress & Heatwaves (Karnataka Collection Friction & Climate Disruption).
6. **Scene 06 [39.3s - 49.0s / f1180-f1470]:** Credit Cost Shot Up Nearly 5x (FY24 2.30% to FY25 11.37% Bar Chart).
7. **Scene 07 [49.0s - 54.5s / f1470-f1635]:** Wiped Out Over ₹630 Crores (-₹630 Cr Hero Stat & "CONTAINED TO MFI" Stamp).
8. **Scene 08 [54.5s - 62.0s / f1635-f1860]:** Did Management Try To Hide Bad Loans? (Evergreening Trap vs Radical Transparency).
9. **Scene 09 [62.0s - 77.3s / f1860-f2320]:** Action 1: Cleaned Up In One Go (Mid-2025 -₹224 Cr Loss & "CLEANED IN ONE GO" Stamp).
10. **Scene 10 [77.3s - 86.7s / f2320-f2600]:** Action 2: The Bank Simply Said "NO" (Strict Underwriting Declination Gate).
11. **Scene 11 [86.7s - 95.0s / f2600-f2850]:** Rejected ~50% Of Risky Borrowers (Capital Safety Over Risky Volume Trade-Off).
12. **Scene 12 [95.0s - 102.0s / f2850-f3060]:** The 15% vs 85% Reality (High-Contrast SVG Doughnut Chart).
13. **Scene 13 [102.0s - 108.8s / f3060-f3265]:** 85% Backed By Hard Real Assets (Property/LAP, Commercial Vehicles, Kirana Shops).
14. **Scene 14 [108.8s - 113.7s / f3265-f3410]:** In The Main Business, Everyone Pays On Time (12-Month Checkmark Calendar Grid).
15. **Scene 15 [113.7s - 118.1s / f3410-f3544]:** The Forensic Verdict & Teaser (Outro Banner Over Full Screen SaN).

---

## 4. Deliverables Manifest

- **Master Render Video:** `equitas_microfinance_crisis/FINAL_EQUITAS_MICROFINANCE.mp4`
- **QuickShare Master Video:** `D:\QuickShare\Equitas SFB\ESFB_Screener_2_Master.mp4`
- **Visual Contact Sheet:** `equitas_microfinance_crisis/contact_sheet.png`
- **Production Storyboard:** `equitas_microfinance_crisis/storyboard.md`
- **Edit Decision List (EDL):** `equitas_microfinance_crisis/edit_decision_list.json`
- **Asset Manifest:** `equitas_microfinance_crisis/asset_manifest.json`
- **Tier 1 Still Images (5 Key Frames):** `equitas_microfinance_crisis/stills/`
- **Remotion Source Code:** `dmart-video-engine/src/compositions/EquitasSFB_Screener_Part2.tsx` and `dmart-video-engine/src/compositions/equitas_screener2/`
