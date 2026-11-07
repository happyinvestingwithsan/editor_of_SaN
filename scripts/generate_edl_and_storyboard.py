import json
import os

words_path = "reliance_phase1/transcription_words.json"
segs_path = "reliance_phase1/transcription_segments.json"

with open(words_path, "r", encoding="utf-8") as f:
    words = json.load(f)

with open(segs_path, "r", encoding="utf-8") as f:
    segs = json.load(f)

# Define scenes with segment index ranges
# Segments:
# 0-4: Scene A
# 5-10: Scene B
# 11-20: Scene C
# 21-23: Scene D
# 24-27: Scene E
# 28-37: Scene F
# 38: Scene G (Chapter transition verbal segue)
# 39-45: Scene H
# 46-54: Scene I
# 55-57: Scene J
# 58-62: Scene K
# 63-72: Scene L
# 73-75: Scene M

raw_scenes = [
    {
        "id": "scene_a",
        "letter": "A",
        "title": "+11.6% In A Single Trading Session",
        "seg_start": 0,
        "seg_end": 4,
        "boundary_frame_start": 0,
        "boundary_frame_end": 420,
        "layout": "LongformSplitLayout (Facecam 31% Left, 580x980)",
        "visual_concept": "HeadlineBadge: '+11.6% IN A SINGLE TRADING SESSION' + Metric Reveal (+11.6% / ₹1,300 Rally) + Pulsing Neon Green Accent",
        "motion_kit_components": ["HeadlineBadge", "MetricOdometer", "KineticSubtitles"],
        "sound_design": "whoosh_snap + subtle_sub_impact",
    },
    {
        "id": "scene_b",
        "letter": "B",
        "title": "India's Largest Listed Company",
        "seg_start": 5,
        "seg_end": 10,
        "boundary_frame_start": 420,
        "boundary_frame_end": 835,
        "layout": "LongformSplitLayout (Facecam 31% Right, 580x980) - Alternating Switch",
        "visual_concept": "Hero Scale Card: 'INDIA\\'S LARGEST LISTED COMPANY' + Official Reliance Crest + Market Cap Scale Indicator vs Nifty",
        "motion_kit_components": ["StockTickerCard", "HeadlineBadge", "KineticSubtitles"],
        "sound_design": "slide_in_swoosh",
    },
    {
        "id": "scene_c",
        "letter": "C",
        "title": "The Big Contradiction: Global Disruption vs O2C Boom",
        "seg_start": 11,
        "seg_end": 20,
        "boundary_frame_start": 835,
        "boundary_frame_end": 1586,
        "layout": "LongformSplitLayout (Facecam 31% Left, 580x980)",
        "visual_concept": "ComparisonDuel / Contradiction Split: Left Card 'GLOBAL ENERGY DISRUPTION (WAR & CRISIS)' vs Right Card 'RELIANCE O2C BOOM' + Happy Investing Philosophy Badge",
        "motion_kit_components": ["ComparisonDuel", "HeadlineBadge", "KineticSubtitles"],
        "sound_design": "dramatic_stinger + tension_riser",
    },
    {
        "id": "scene_d",
        "letter": "D",
        "title": "September Low vs Today's Rally",
        "seg_start": 21,
        "seg_end": 23,
        "boundary_frame_start": 1586,
        "boundary_frame_end": 1790,
        "layout": "LongformSplitLayout (Facecam 31% Right, 580x980)",
        "visual_concept": "FinancialChart: 52-Week Low (₹1,152) Drawdown Dip -> Sudden Reversal Arrow to Today's Rally (₹1,300)",
        "motion_kit_components": ["FinancialChart", "MetricOdometer", "KineticSubtitles"],
        "sound_design": "chart_glissando_tick",
    },
    {
        "id": "scene_e",
        "letter": "E",
        "title": "The Reversal: Global Disruption to O2C Opportunity",
        "seg_start": 24,
        "seg_end": 27,
        "boundary_frame_start": 1790,
        "boundary_frame_end": 2108,
        "layout": "LongformSplitLayout (Facecam 31% Left, 580x980)",
        "visual_concept": "Dynamic Flow Diagram: 'SAME GLOBAL DISRUPTION' -> Reversal Pivot Arrow -> 'EXTRAORDINARY OPPORTUNITY FOR O2C'",
        "motion_kit_components": ["AutopsyDossier", "HeadlineBadge", "KineticSubtitles"],
        "sound_design": "tech_hum_rise",
    },
    {
        "id": "scene_f",
        "letter": "F",
        "title": "The Core Questions: Windfall or Moat?",
        "seg_start": 28,
        "seg_end": 37,
        "boundary_frame_start": 2108,
        "boundary_frame_end": 2956,
        "layout": "LongformSplitLayout (Facecam 31% Right, 580x980)",
        "visual_concept": "Three-Part Question Stack / AutopsyDossier: 1. Temporary Geopolitical Windfall? 2. Structural Competitive Advantage? 3. After +11.6% Rally: What Next?",
        "motion_kit_components": ["AutopsyDossier", "HeadlineBadge", "KineticSubtitles"],
        "sound_design": "subtle_tick_per_card + riser",
    },
    {
        "id": "scene_g",
        "letter": "G",
        "title": "Chapter Transition: Beyond the 11.6% Rally",
        "seg_start": 38,
        "seg_end": 38,
        "boundary_frame_start": 2956,
        "boundary_frame_end": 3012,
        "layout": "Kinetic Chapter Slide Wipe (500ms full-screen slide with dark gold ambient sheen)",
        "visual_concept": "Full-Width Kinetic Chapter Title: 'CHAPTER 1: THE CRASH BEFORE THE RALLY' | Subtitle: 'RELIANCE INDUSTRIES - BEYOND THE 11.6% RALLY'",
        "motion_kit_components": ["HeadlineBadge", "KineticSubtitles"],
        "sound_design": "heavy_cinematic_whoosh + bass_drop",
    },
    {
        "id": "scene_h",
        "letter": "H",
        "title": "Take the Viewer Back to September",
        "seg_start": 39,
        "seg_end": 45,
        "boundary_frame_start": 3012,
        "boundary_frame_end": 3669,
        "layout": "LongformSplitLayout (Facecam 31% Left, 580x980)",
        "visual_concept": "Historical Context Dossier: 'SEPTEMBER - OCTOBER 2026' | 52-Week High ₹1,611.80 vs Touch Point ₹1,152.20 (-28.5% severe drop)",
        "motion_kit_components": ["FinancialChart", "StockTickerCard", "KineticSubtitles"],
        "sound_design": "digital_clock_rewind",
    },
    {
        "id": "scene_i",
        "letter": "I",
        "title": "Market Sentiment: Negative",
        "seg_start": 46,
        "seg_end": 54,
        "boundary_frame_start": 3669,
        "boundary_frame_end": 4376,
        "layout": "LongformSplitLayout (Facecam 31% Right, 580x980)",
        "visual_concept": "4-Quadrant Forensic Matrix: 'MARKET SENTIMENT: NEGATIVE' -> [1] Retail Profitability Questions, [2] New Energy Capex Bleed, [3] Oil & Gas Crude Sourcing Crisis, [4] Multi-directional Pressure",
        "motion_kit_components": ["AutopsyDossier", "HeadlineBadge", "KineticSubtitles"],
        "sound_design": "stamp_impact_low",
    },
    {
        "id": "scene_j",
        "letter": "J",
        "title": "The Paradox: Refining Margins UP vs Stock Price DOWN",
        "seg_start": 55,
        "seg_end": 57,
        "boundary_frame_start": 4376,
        "boundary_frame_end": 4588,
        "layout": "LongformSplitLayout (Facecam 31% Left, 580x980)",
        "visual_concept": "Divergence Duel: Green Arrow 'GLOBAL REFINING MARGINS (GRM) ↑ IMPROVING' vs Red Arrow 'RELIANCE SHARE PRICE ↓ SINKING' with pulsing 'WHY?' stamp",
        "motion_kit_components": ["ComparisonDuel", "HeadlineBadge", "KineticSubtitles"],
        "sound_design": "tension_ping + mystery_drone",
    },
    {
        "id": "scene_k",
        "letter": "K",
        "title": "What the Market Actually Worried About",
        "seg_start": 58,
        "seg_end": 62,
        "boundary_frame_start": 4588,
        "boundary_frame_end": 4980,
        "layout": "LongformSplitLayout (Facecam 31% Right, 580x980)",
        "visual_concept": "Portfolio Assessment Card: 'THE MARKET WANTED MORE THAN O2C GROWTH' -> Investors scrutinizing Retail, Telecom (Jio), and Green Energy",
        "motion_kit_components": ["AutopsyDossier", "StockTickerCard", "KineticSubtitles"],
        "sound_design": "paper_slide_soft",
    },
    {
        "id": "scene_l",
        "letter": "L",
        "title": "The Results Changed the Narrative: Q2 FY27 Record Numbers",
        "seg_start": 63,
        "seg_end": 72,
        "boundary_frame_start": 4980,
        "boundary_frame_end": 5905,
        "layout": "LongformSplitLayout (Facecam 31% Left, 580x980)",
        "visual_concept": "Triple Metric Odometer Flash: Q2 FY27 RESULTS (30 OCT 2026) -> [1] Revenue ₹3.62 Lakh Cr (+27.8%), [2] EBITDA ₹62,409 Cr (+23.9%), [3] PAT ₹29,550 Cr (+33.8%) 'RECORD QUARTERLY NUMBERS'",
        "motion_kit_components": ["MetricOdometer", "HeadlineBadge", "KineticSubtitles"],
        "sound_design": "cash_register_ding + 3_stage_odometer_ticks",
    },
    {
        "id": "scene_m",
        "letter": "M",
        "title": "Transition: Not All Businesses Contributed Equally",
        "seg_start": 73,
        "seg_end": 75,
        "boundary_frame_start": 5905,
        "boundary_frame_end": 6109,
        "layout": "LongformSplitLayout (Facecam 31% Right, 580x980) into Chapter Teaser",
        "visual_concept": "Dissection Teaser Card: 'NOT ALL BUSINESSES CONTRIBUTED EQUALLY' -> Spotlight on 'O2C: THE BIG SURPRISE' (Bridge to Chapter 2)",
        "motion_kit_components": ["HeadlineBadge", "AutopsyDossier", "KineticSubtitles"],
        "sound_design": "suspense_cliffhanger_swell",
    },
]

# Enrich scenes with exact words, text, and timings
edl_scenes = []
for s in raw_scenes:
    scene_segs = segs[s["seg_start"]:s["seg_end"] + 1]
    scene_text = " ".join([seg["text"] for seg in scene_segs])
    
    # Collect words
    scene_words = []
    for seg in scene_segs:
        for w in seg.get("words", []):
            scene_words.append(w)
            
    f_start = s["boundary_frame_start"]
    f_end = s["boundary_frame_end"]
    dur_f = f_end - f_start
    t_start = round(f_start / 30.0, 3)
    t_end = round(f_end / 30.0, 3)
    dur_t = round(dur_f / 30.0, 3)
    
    edl_scenes.append({
        "id": s["id"],
        "scene_letter": s["letter"],
        "title": s["title"],
        "start_frame": f_start,
        "end_frame": f_end,
        "duration_frames": dur_f,
        "start_time_sec": t_start,
        "end_time_sec": t_end,
        "duration_sec": dur_t,
        "spoken_text": scene_text,
        "word_count": len(scene_words),
        "visual_concept": s["visual_concept"],
        "remotion_layout": s["layout"],
        "motion_kit_components": s["motion_kit_components"],
        "sound_design": s["sound_design"],
        "segment_indices": list(range(s["seg_start"], s["seg_end"] + 1)),
    })

edl_manifest = {
    "project": "Reliance Industries Masterclass - Phase 1 (Intro + Chapter 1)",
    "source_master_file": "d:\\QuickShare\\Reliance\\Out\\Video - after adobe\\Part 1 & 2.mov",
    "phase": "Phase 1: Intro + Chapter 1",
    "scope_description": "Intro (+11.6% Rally & Contradiction) + Chapter 1 (Crash to Q2 FY27 Results), stopping strictly before Chapter 2 (O2C Deep-Dive)",
    "aspect_ratio": "16:9 Landscape (1920x1080)",
    "frame_rate": 30.0,
    "total_duration_sec": 203.633,
    "total_frames": 6109,
    "timing_invariants": {
        "t_start_sec": 0.0,
        "t_end_sec": 203.633,
        "start_frame": 0,
        "end_frame": 6109,
        "quantization": "Strict 30fps frames (zero microsecond gaps)",
    },
    "media_assets": {
        "facecam_proxy_video": "dmart-video-engine/public/video/reliance_intro_ch1_facecam.mp4",
        "clean_48k_audio_wav": "dmart-video-engine/public/video/reliance_intro_ch1_audio.wav",
        "audio_alt_wav": "dmart-video-engine/public/audio/reliance_intro_ch1_audio.wav",
        "master_audio_wav": "reliance_phase1/master_audio.wav",
    },
    "brand_assets": {
        "happy_investing_logo": "dmart-video-engine/public/brand/Happy_Investing_Logo_2026.png",
        "reliance_logo": "dmart-video-engine/public/brand/reliance_logo.png",
        "reliance_crest": "dmart-video-engine/public/brand/reliance_crest.png",
    },
    "scenes_count": len(edl_scenes),
    "scenes": edl_scenes,
}

edl_path = "reliance_phase1/edit_decision_list.json"
with open(edl_path, "w", encoding="utf-8") as f:
    json.dump(edl_manifest, f, indent=2, ensure_ascii=False)
print(f"Saved EDL to {edl_path} with {len(edl_scenes)} scenes.")

# Generate Storyboard Markdown
sb_lines = [
    "# Phase 1 Storyboard & Edit Decision List (EDL)",
    "## Reliance Industries Masterclass: Intro + Chapter 1",
    "",
    "> **Single Source of Truth:** `d:\\QuickShare\\Reliance\\Out\\Video - after adobe\\Part 1 & 2.mov`",
    f"> **Total Runtime:** `00:03:23.63` ({edl_manifest['total_duration_sec']}s | {edl_manifest['total_frames']} frames @ 30.0 fps)",
    "> **Composition Architecture:** SaN Video OS 16:9 Standard Long-Form Chapter (`StandardLongformChapter.tsx`)",
    "> **Real Estate Rule:** SaN occupies 30–32% screen real estate (580px × 980px, gold bezel) alternating Left/Right every 15–20s. Zero perpetual circles.",
    "",
    "---",
    "",
    "### 1. Scene Timeline & Storyboard Matrix",
    "",
    "| Scene | Frame Range | Time (s) | Spoken Dialogue | Visual Concept & Motion Kit Components | Screen Layout |",
    "| :--- | :--- | :--- | :--- | :--- | :--- |",
]

for s in edl_scenes:
    sb_lines.append(
        f"| **{s['scene_letter']}** ({s['id']}) | `{s['start_frame']} - {s['end_frame']}` ({s['duration_frames']}f) | `{s['start_time_sec']}s - {s['end_time_sec']}s` ({s['duration_sec']}s) | \"{s['spoken_text']}\" | **{s['title']}**<br><br>{s['visual_concept']}<br><br>*Components:* `{', '.join(s['motion_kit_components'])}` | {s['remotion_layout']} |"
    )

sb_lines.extend([
    "",
    "---",
    "",
    "### 2. Media Engineering Pre-Flight Manifest",
    "",
    "- **Faststart All-Intra Proxy MP4:** `dmart-video-engine/public/video/reliance_intro_ch1_facecam.mp4`",
    "- **Clean 48kHz Stereo Audio WAV:** `dmart-video-engine/public/video/reliance_intro_ch1_audio.wav`",
    "- **Master Ingest Audio WAV:** `reliance_phase1/master_audio.wav`",
    "- **Happy Investing Logo:** `dmart-video-engine/public/brand/Happy_Investing_Logo_2026.png`",
    "- **Reliance Official Logos:** `dmart-video-engine/public/brand/reliance_logo.png`, `reliance_crest.png`",
    "",
    "### 3. Word-Level & Segment Timestamp Artifacts",
    "- **Word Timestamps:** `reliance_phase1/transcription_words.json` (500 words quantized to 30fps frames)",
    "- **Segment Timestamps:** `reliance_phase1/transcription_segments.json` (76 Faster-Whisper segments)",
    "- **Clean Transcript:** `reliance_phase1/transcript.txt`",
    "- **Structured EDL:** `reliance_phase1/edit_decision_list.json`",
])

sb_path = "reliance_phase1/storyboard.md"
with open(sb_path, "w", encoding="utf-8") as f:
    f.write("\n".join(sb_lines))
print(f"Saved Storyboard to {sb_path}.")

# Generate Asset Manifest
asset_manifest = {
    "project": "Reliance Phase 1",
    "generated_at": "2026-11-03T00:15:00+05:30",
    "source_video": {
        "path": "d:\\QuickShare\\Reliance\\Out\\Video - after adobe\\Part 1 & 2.mov",
        "duration_sec": 203.633,
        "frames": 6109,
        "fps": 30.0,
        "resolution": "1920x1080",
        "video_codec": "h264",
        "audio_codec": "aac",
    },
    "remotion_proxy_video": {
        "path": "dmart-video-engine/public/video/reliance_intro_ch1_facecam.mp4",
        "format": "All-Intra H.264 (g=1, faststart)",
        "resolution": "1920x1080",
        "fps": 30.0,
        "frames": 6109,
        "audio": "None (separate audio track architecture)",
    },
    "remotion_audio": {
        "path": "dmart-video-engine/public/video/reliance_intro_ch1_audio.wav",
        "sample_rate": 48000,
        "channels": 2,
        "format": "pcm_s16le uncompressed",
    },
    "brand_logos": [
        {
            "name": "Happy Investing Logo",
            "source": "D:\\Davinci Presets\\Happy INvesting Kit\\Happy Investing Logo_2026.png",
            "installed_path": "dmart-video-engine/public/brand/Happy_Investing_Logo_2026.png",
            "status": "verified",
        },
        {
            "name": "Reliance Brand Logo (Transparent)",
            "source": "D:\\Davinci Presets\\Images\\reliance-removebg-preview.png",
            "installed_path": "dmart-video-engine/public/brand/reliance_logo.png",
            "status": "verified",
        },
        {
            "name": "Reliance Corporate Crest",
            "source": "D:\\Davinci Presets\\Images\\reliance.png",
            "installed_path": "dmart-video-engine/public/brand/reliance_crest.png",
            "status": "verified",
        },
    ],
    "transcription_artifacts": [
        "reliance_phase1/master_audio.wav",
        "reliance_phase1/transcription_words.json",
        "reliance_phase1/transcription_segments.json",
        "reliance_phase1/transcript.txt",
        "reliance_phase1/edit_decision_list.json",
        "reliance_phase1/storyboard.md",
    ],
}

am_path = "reliance_phase1/asset_manifest.json"
with open(am_path, "w", encoding="utf-8") as f:
    json.dump(asset_manifest, f, indent=2, ensure_ascii=False)
print(f"Saved Asset Manifest to {am_path}.")
