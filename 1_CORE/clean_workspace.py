#!/usr/bin/env python3
"""
Clean Workspace Utility
Safely purges ephemeral files (proxies, temp audio, preview stills) from 3_WORKSPACE/
without touching 1_CORE (code), 2_VAULT (assets), or 4_OUTPUT (deliverables).
"""
import os
import shutil
from pathlib import Path

def clean_workspace():
    repo_root = Path(__file__).resolve().parent.parent
    workspace = repo_root / "3_WORKSPACE"
    
    subdirs = ["raw", "proxies", "audio", "preview"]
    purged_count = 0
    purged_bytes = 0
    
    print(f"🧹 Scanning {workspace} for ephemeral artifacts...")
    for subdir in subdirs:
        target_dir = workspace / subdir
        if target_dir.exists():
            for item in target_dir.iterdir():
                try:
                    if item.is_file():
                        size = item.stat().st_size
                        item.unlink()
                        purged_count += 1
                        purged_bytes += size
                    elif item.is_dir():
                        size = sum(f.stat().st_size for f in item.rglob('*') if f.is_file())
                        shutil.rmtree(item)
                        purged_count += 1
                        purged_bytes += size
                except Exception as e:
                    print(f"⚠️ Error removing {item.name}: {e}")
        else:
            target_dir.mkdir(parents=True, exist_ok=True)
            
    print(f"✅ Workspace Purge Complete: Removed {purged_count} files/folders ({purged_bytes / (1024*1024):.2f} MB freed).")
    print("📁 3_WORKSPACE/ is clean and ready for your next raw footage input.")

if __name__ == "__main__":
    clean_workspace()
