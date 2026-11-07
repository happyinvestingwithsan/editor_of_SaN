import os
import json

transcript_path = r"C:\Users\Sathya\.gemini\antigravity-cli\brain\f28b6349-37e3-4b52-b953-1e54782b744e\.system_generated\logs\transcript_full.jsonl"

if os.path.exists(transcript_path):
    print("Found transcript_full.jsonl, size:", os.path.getsize(transcript_path))
    with open(transcript_path, "r", encoding="utf-8") as f:
        for idx, line in enumerate(f):
            if "RiskManagement_Interval07" in line and "view_file" in line:
                print(f"Line {idx} mentions RiskManagement_Interval07 and view_file")
