# SaN Video Production Scripts

This directory contains standardized, production-ready CLI entry points for the SaN Video Engine.

## Production CLI Commands:

1. **Ingest Master Footage & Proxy Generation:**
   ```bash
   python scripts/ingest.py "path/to/master.mov" --start 0 --duration 90 --out-dir work --prefix master_take
   ```
   - Automatically outputs an All-Intra H.264 proxy (`-g 1 -movflags +faststart`) for lag-free Remotion scrubbing.
   - Automatically extracts an uncompressed 48kHz WAV audio track.

2. **Faster-Whisper Transcription & Brand Sanitization:**
   ```bash
   python scripts/transcribe.py work/master_take_audio.wav --words-out work/words.json --blocks-out work/caption_blocks.json
   ```
   - Extracts word-level frame timestamps (`30fps`).
   - Normalizes Indian startup and market brands (Swiggy, Zomato, Zerodha, SEBI, DRHP, 200 DMA).

3. **Tiered Remotion Rendering:**
   ```bash
   # Tier 1: 1-Frame Still Preview (~2 seconds)
   python scripts/render.py SaN-Standard-ShortReel --tier 1 --frame 150

   # Tier 2: 20-Second Validation MP4 (~90 seconds)
   python scripts/render.py SaN-Standard-ShortReel --tier 2

   # Tier 3: Full Production Master Render (Requires User Approval)
   python scripts/render.py SaN-Standard-ShortReel --tier 3 --out out/Final_Master.mp4
   ```

*Note: All 100+ legacy exploration scripts from earlier October iterations are safely preserved in `archive/legacy_scripts/`.*
