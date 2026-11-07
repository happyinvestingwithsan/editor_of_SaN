#!/usr/bin/env python3
"""Standard entry point for Faster-Whisper transcription & brand normalization."""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.san_tools.cli import main

if __name__ == "__main__":
    sys.argv.insert(1, "transcribe")
    main()
