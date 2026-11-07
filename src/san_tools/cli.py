"""
SaN Video Production Pipeline CLI
Unified command center for all video engineering operations.
"""

import argparse
import sys
from .ingest import ingest_master, create_fast_proxy, extract_pcm_audio
from .transcribe import transcribe_and_align
from .render import render_tier1_still, render_tier2_validation, render_tier3_master


def main():
    parser = argparse.ArgumentParser(
        prog="san_tools",
        description="Unified SaN Video Production & Editing Toolkit",
    )
    subparsers = parser.add_subparsers(dest="command", help="Pipeline command to execute")

    # Ingest Command
    ingest_p = subparsers.add_parser("ingest", help="Generate All-Intra proxy and 48kHz WAV audio")
    ingest_p.add_argument("source", help="Path to master source video (.mov / .mp4)")
    ingest_p.add_argument("--out-dir", default="work", help="Target output directory")
    ingest_p.add_argument("--prefix", default="master_take", help="Output file prefix")
    ingest_p.add_argument("--start", type=float, default=None, help="Start time in seconds")
    ingest_p.add_argument("--duration", type=float, default=None, help="Duration in seconds")

    # Transcribe Command
    transcribe_p = subparsers.add_parser("transcribe", help="Faster-Whisper transcription with brand sanitization")
    transcribe_p.add_argument("audio", help="Path to 48kHz WAV audio file")
    transcribe_p.add_argument("--words-out", default=None, help="Output path for words JSON")
    transcribe_p.add_argument("--blocks-out", default=None, help="Output path for caption blocks JSON")
    transcribe_p.add_argument("--model", default="base", help="Whisper model size (tiny, base, small, medium)")

    # Render Command
    render_p = subparsers.add_parser("render", help="Tiered Remotion render engine")
    render_p.add_argument("composition", help="Remotion composition ID")
    render_p.add_argument("--engine-dir", default="dmart-video-engine", help="Remotion engine folder")
    render_p.add_argument("--tier", type=int, choices=[1, 2, 3], default=1, help="Render tier: 1=Still, 2=20s Validation, 3=Full Master")
    render_p.add_argument("--frame", type=int, default=150, help="Frame number for Tier 1 still")
    render_p.add_argument("--out", default=None, help="Output file path (.png or .mp4)")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    if args.command == "ingest":
        ingest_master(
            args.source,
            args.out_dir,
            prefix=args.prefix,
            start_sec=args.start,
            duration_sec=args.duration,
        )

    elif args.command == "transcribe":
        transcribe_and_align(
            args.audio,
            output_words_json=args.words_out,
            output_blocks_json=args.blocks_out,
            model_size=args.model,
        )

    elif args.command == "render":
        if args.tier == 1:
            out_path = args.out or f"work/{args.composition}_frame_{args.frame}.png"
            render_tier1_still(args.engine_dir, args.composition, args.frame, out_path)
        elif args.tier == 2:
            out_path = args.out or f"work/{args.composition}_validation_20s.mp4"
            render_tier2_validation(args.engine_dir, args.composition, out_path)
        elif args.tier == 3:
            out_path = args.out or f"work/{args.composition}_master.mp4"
            render_tier3_master(args.engine_dir, args.composition, out_path)


if __name__ == "__main__":
    main()
