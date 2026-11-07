import os
import json
from typing import List, Dict, Any

NEXUS_DATA_PATH = r"D:\AI Projects\hify-tracker\backend\data\dashboard_data.json"
FALLBACK_NEXUS_PATH = r"D:\AI Projects\hify-nexus\dev2\backend\data\dashboard_data.json"

class WatchlistLoader:
    def __init__(self, config_path: str):
        self.config_path = config_path
        with open(config_path, "r", encoding="utf-8") as f:
            self.config = json.load(f)

    def get_active_lists(self) -> List[str]:
        return self.config.get("active_watchlists", ["F40", "E40"])

    def load_active_stocks(self) -> List[Dict[str, Any]]:
        active_lists = set(self.get_active_lists())
        
        # Determine source file
        data_file = NEXUS_DATA_PATH if os.path.exists(NEXUS_DATA_PATH) else FALLBACK_NEXUS_PATH
        if not os.path.exists(data_file):
            raise FileNotFoundError(f"Nexus dashboard_data.json not found at {NEXUS_DATA_PATH} or {FALLBACK_NEXUS_PATH}")

        with open(data_file, "r", encoding="utf-8") as f:
            raw_data = json.load(f)

        stocks = []
        for item in raw_data:
            plist = item.get("PrimaryList")
            if plist in active_lists:
                ticker = item.get("Ticker", "").strip()
                fullname = item.get("FullName", ticker).strip()
                clean_name = fullname.replace(" Ltd", "").replace(" Ltd.", "").strip()

                stocks.append({
                    "ticker": ticker,
                    "name": clean_name,
                    "list": plist,
                    "sector": item.get("Sector", "General"),
                    "ltp": item.get("LTP"),
                    "change": item.get("Change")
                })
        return stocks
