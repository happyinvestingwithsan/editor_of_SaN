import os
import json

history_dir = r"C:\Users\Sathya\AppData\Roaming\Code\User\History"
found = []

for folder in os.listdir(history_dir):
    folder_path = os.path.join(history_dir, folder)
    if os.path.isdir(folder_path):
        entries_file = os.path.join(folder_path, "entries.json")
        if os.path.exists(entries_file):
            try:
                with open(entries_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if "RiskManagement_Interval07" in data.get("resource", ""):
                        print("Found in:", folder_path, data.get("resource"))
                        for entry in data.get("entries", []):
                            entry_path = os.path.join(folder_path, entry["id"])
                            size = os.path.getsize(entry_path) if os.path.exists(entry_path) else 0
                            print("  Entry:", entry["id"], "Timestamp:", entry.get("timestamp"), "Size:", size)
                            found.append((entry.get("timestamp", 0), entry_path, size))
            except Exception as e:
                pass

if found:
    found.sort(key=lambda x: x[0])
    # The original file was ~90,145 bytes!
    for ts, path, size in found:
        print(f"Candidate: {path} (size={size})")
