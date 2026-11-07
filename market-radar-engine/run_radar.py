import os
import sys
import json
import argparse
from datetime import datetime

# Enforce UTF-8 on Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Add module root to sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from src.watchlist_loader import WatchlistLoader
from src.collectors.news_collector import NewsCollector
from src.collectors.sebi_collector import SEBICollector
from src.collectors.article_extractor import ArticleExtractor
from src.filters.trend_radar import TrendRadar

def load_json_config(rel_path: str):
    full_path = os.path.join(BASE_DIR, rel_path)
    with open(full_path, "r", encoding="utf-8") as f:
        return json.load(f)

def run_deep_dive(item_idx: int, cached_file: str):
    print("=" * 75)
    print(f"  HAPPY INVESTING - DEEP DIVE SCRIPT GENERATOR FOR SELECTION #{item_idx}")
    print("=" * 75)

    if not os.path.exists(cached_file):
        print(f"Error: Cache file not found at {cached_file}. Please run 'python run_radar.py' first.")
        return

    with open(cached_file, "r", encoding="utf-8") as f:
        cached_data = json.load(f)

    items = cached_data.get("top_10", [])
    if item_idx < 1 or item_idx > len(items):
        print(f"Error: Selection #{item_idx} is out of range. Choose between 1 and {len(items)}.")
        return

    selected_item = items[item_idx - 1]
    print(f"\nTarget Topic: {selected_item['entity_label']}")
    print(f"Lead Headline: {selected_item['title']}")
    print(f"Source URL: {selected_item['link']}")

    extractor = ArticleExtractor()
    print("\n[1/2] Fetching full article text and extracting key factual snippet...")
    snippet_res = extractor.fetch_full_snippet(selected_item["link"])
    
    print("[2/2] Synthesizing 45-second reel script & Remotion overlay recipe...")
    
    # Adapt to article extractor format
    mock_item = {
        "title": selected_item["title"],
        "matched_entities": [selected_item["stock_info"]] if selected_item.get("stock_info") else [{"name": "SEBI", "list": "REGULATOR"}]
    }
    script_bundle = extractor.generate_short_script(mock_item, snippet_res)

    print("\n" + "=" * 75)
    print("  REEL PRODUCTION PACKAGE (Ready to Shoot & Edit)")
    print("=" * 75)
    print(f"\n🎨 REMOTION NEWSPAPER OVERLAY:")
    print(f"  - Lead Quote to Highlight: \"{snippet_res['lead_snippet'][:180]}...\"")
    print(f"  - Marker Highlighter Target: \"{script_bundle['remotion_highlighter_phrase']}\"")
    if snippet_res.get("key_figures"):
        print(f"  - Key Figures for Ticker/Pills: {', '.join(snippet_res['key_figures'])}")

    print(f"\n🎙️ 45-SECOND SPOKEN SCRIPT (SaN's Voice):")
    for step in script_bundle["script_steps"]:
        print(f"\n[{step['time']}] -> {step['intent']}")
        print(f"  Spoken:  {step['speaker']}")
        print(f"  Visual:  {step['visual']}")

    print("\n" + "=" * 75)
    print("  Next: Shoot the 60s facecam, and run CapCut + Remotion integration!")
    print("=" * 75 + "\n")

def main():
    parser = argparse.ArgumentParser(description="Happy Investing Market Radar & Trend Engine")
    parser.add_argument("--dive", type=int, help="Select rank # (1-10) to generate deep script and snippet")
    args = parser.parse_args()

    today_str = datetime.now().strftime("%Y-%m-%d")
    cache_dir = os.path.join(BASE_DIR, "output", "cache")
    os.makedirs(cache_dir, exist_ok=True)
    cache_file = os.path.join(cache_dir, f"{today_str}_top10.json")

    if args.dive:
        run_deep_dive(args.dive, cache_file)
        return

    print("=" * 75)
    print("  HAPPY INVESTING - MARKET RADAR: TOP 10 DISTINCT STORIES")
    print("=" * 75)

    # 1. Load Configurations & Watchlists from Nexus App
    config_path = os.path.join(BASE_DIR, "config", "watchlist.json")
    watchlist_loader = WatchlistLoader(config_path)
    active_stocks = watchlist_loader.load_active_stocks()
    sources_cfg = load_json_config("config/sources.json")

    print(f"\n[1/4] Loaded Watchlist from Hify Tracker / Nexus App:")
    print(f"  - Active Lists: {watchlist_loader.get_active_lists()}")
    print(f"  - Total Active Watchlist Stocks: {len(active_stocks)} stocks")

    # 2. Ingest Data from all portals
    news_collector = NewsCollector(sources_cfg)
    sebi_collector = SEBICollector(sources_cfg)
    trend_radar = TrendRadar(active_stocks)

    print("\n[2/4] Ingesting broad feeds from Moneycontrol, Livemint, Economic Times, SEBI...")
    all_raw_items = []

    std_items = news_collector.fetch_all_standard_feeds()
    all_raw_items.extend(std_items)
    print(f"  -> Ingested {len(std_items)} articles from 9 major financial feeds")

    sebi_items = sebi_collector.fetch_all_sebi()
    all_raw_items.extend(sebi_items)
    print(f"  -> Ingested {len(sebi_items)} official SEBI circulars & press releases")

    # 3. Active Watchlist Probing (Scans all active stocks in batches)
    print("\n[3/4] Actively scanning news for all active stocks across the watchlist...")
    watchlist_news = news_collector.scan_watchlist_stocks(active_stocks, chunk_size=5)
    all_raw_items.extend(watchlist_news)
    print(f"  -> Ingested {len(watchlist_news)} targeted stock articles")
    print(f"  -> Total raw pool assembled: {len(all_raw_items)} articles")

    # 4. Strict Watchlist/SEBI Matching & Entity Clustering (10 DISTINCT Stories)
    print("\n[4/4] Clustering by Entity & Ranking Top 10 DISTINCT Topics...")
    top_10 = trend_radar.rank_top_diverse(all_raw_items, top_n=10)

    # Save cache for --dive command
    with open(cache_file, "w", encoding="utf-8") as f:
        json.dump({"date": today_str, "top_10": top_10}, f, indent=2)

    # Save readable Markdown report
    output_dir = os.path.join(BASE_DIR, "output", "daily_briefs")
    os.makedirs(output_dir, exist_ok=True)
    report_file = os.path.join(output_dir, f"{today_str}_top10_distinct.md")

    md_lines = [
        f"# Happy Investing: Top 10 Distinct Trending Stories",
        f"**Date:** {today_str} | **Watchlists:** {', '.join(watchlist_loader.get_active_lists())} ({len(active_stocks)} stocks) + SEBI",
        f"**Rule:** Every slot is a DIFFERENT company or distinct regulatory topic. Zero duplication.\n",
        "---"
    ]

    for idx, item in enumerate(top_10, 1):
        triggers_str = ", ".join(item["buzz_triggers"]) if item["buzz_triggers"] else "News Update"
        figures_str = ", ".join(item["figures"]) if item["figures"] else "None"
        alt_str = " | ".join([f"'{a[:50]}...'" for a in item["alternate_headlines"]]) if item["alternate_headlines"] else "None"

        md_lines.extend([
            f"\n### #{idx}: [{item['entity_label']}]",
            f"**Headline:** {item['title']}",
            f"- **Source:** [{item['source']}]({item['link']}) | **Published:** {item['published']}",
            f"- **Trend Velocity Score:** `{item['rank_score']}` | **Buzz Words:** `{triggers_str}`",
            f"- **Figures in News:** `{figures_str}`",
            f"- **Total Related Reports Found:** `{item['total_articles_found']}`",
            f"- **Alternate Coverage:** {alt_str}",
            f"- **Deep-Dive Command:** `python run_radar.py --dive {idx}`\n",
            "---"
        ])

    with open(report_file, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines))

    print(f"\n[SUCCESS] Top 10 Distinct Trending report generated:")
    print(f"  -> {report_file}")
    print("\n" + "=" * 75)
    print("  TOP 10 DISTINCT STORIES (10 DIFFERENT COMPANIES / TOPICS):")
    print("=" * 75)

    for i, it in enumerate(top_10, 1):
        triggers_str = ", ".join(it["buzz_triggers"][:3]) if it["buzz_triggers"] else "News"
        print(f"\n[{i}] [{it['entity_label']}]")
        print(f"    Headline: {it['title'][:72]}...")
        print(f"    Buzz: [{triggers_str}] | Trend Score: {it['rank_score']} | Related Reports: {it['total_articles_found']}")
        print(f"    To get script & snippet: python run_radar.py --dive {i}")

    print("\n" + "=" * 75)
    print("  NEXT: Respond with your preferred # (e.g. 1, 2, or 3) to generate the full snippet & script!")
    print("=" * 75 + "\n")

if __name__ == "__main__":
    main()
