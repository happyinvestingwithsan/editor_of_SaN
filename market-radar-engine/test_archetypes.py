import os
import sys
import json
import re
from datetime import datetime
from typing import List, Dict, Any

# Enforce UTF-8 on Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Add base directory to path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from src.watchlist_loader import WatchlistLoader
from src.collectors.news_collector import NewsCollector
from src.collectors.sebi_collector import SEBICollector

def load_json(rel_path: str):
    with open(os.path.join(BASE_DIR, rel_path), "r", encoding="utf-8") as f:
        return json.load(f)

class ArchetypeClassifier:
    """
    Classifies raw financial events strictly against the 6 Groww & INDmoney Archetypes.
    Ruthlessly rejects boring corporate noise (routine single-digit EPS, minor GST notices).
    """
    def __init__(self, active_stocks: List[Dict[str, Any]]):
        self.active_stocks = active_stocks
        self.stock_lookup = {s["ticker"].lower(): s for s in active_stocks}
        for s in active_stocks:
            if len(s["name"]) > 3:
                self.stock_lookup[s["name"].lower()] = s

        # Archetype Detection Rules
        self.archetypes = {
            "ARCHETYPE_1_PLATFORM_UTILITY": {
                "name": "Consumer Platform Utility & Action ('Finally Here / How-To')",
                "keywords": ["activate", "feature", "launched", "live for", "how to check", "turn on", "us investing", "direct mutual fund", "upi credit", "t+0"],
                "remotion": "UIRippleHighlight.tsx + StepCalloutBadge.tsx",
                "hook_template": "Finally, {entity} launched {feature}! Here is how to activate it in 30 seconds."
            },
            "ARCHETYPE_2_DRAWDOWN_PANIC": {
                "name": "Shocking Drawdown Panic ('Opportunity or Trap?')",
                "keywords": ["crash", "crashes", "crashed", "plunge", "plunges", "slump", "slumps", "tumble", "bleed", "bleeding", "fall", "falls over", "down 1", "down 2", "down 3", "down 4", "down 5", "down 7"],
                "remotion": "FinancialLineChart.tsx + StockTickerBadge.tsx + Rubber Stamp ('TRAP' / 'OPPORTUNITY')",
                "hook_template": "{entity} crashed {figure} today! Is this an opportunity or a dangerous trap?"
            },
            "ARCHETYPE_3_VALUATION_PARADOX": {
                "name": "The Valuation Paradox ('Why X despite Y?')",
                "keywords": ["despite", "sales up", "profit falls", "profit fell", "derating", "cheap now", "expensive", "10x pe", "roe", "derated", "growth story back"],
                "remotion": "ComparisonVersus.tsx (Split Screen) + JetBrains Mono Counters",
                "hook_template": "Why is {entity} down {figure} despite {metric}? Here is the real catch."
            },
            "ARCHETYPE_4_MEGA_IPO": {
                "name": "Mega IPO & RHP Deconstruction ('Apply or Avoid?')",
                "keywords": ["ipo", "rhp", "gmp", "grey market", "apply or avoid", "crore ipo", "book building", "issue open"],
                "remotion": "NewspaperHeadline.tsx (3D RHP filing with yellow highlighter) + Rubber Stamp ('APPLY' / 'AVOID')",
                "hook_template": "We read the 400-page {entity} RHP so you don't have to! Should you Apply or Avoid?"
            },
            "ARCHETYPE_5_REGULATORY_SHOCK": {
                "name": "Regulatory Threat / Market Rule Shock ('What Changed for You?')",
                "keywords": ["sebi", "rbi", "circular", "cas rules", "f&o rule", "expiry ban", "margin rule", "penalty", "ban", "order", "probe", "interim order"],
                "remotion": "NewspaperHeadline.tsx (Official SEBI circular with animated marker pen sweep)",
                "hook_template": "SEBI just issued a major order on {entity}. Here is what changed for your money."
            },
            "ARCHETYPE_6_SMART_MONEY": {
                "name": "Smart Money / Insider Accumulation ('What Are Whales Buying?')",
                "keywords": ["fiis are buying", "mutual funds hold", "parag parikh", "stake bought", "promoters buying", "block deal", "institutional buying"],
                "remotion": "CapitalAllocationRing.tsx + StockTickerBadge.tsx",
                "hook_template": "FIIs and top funds are quietly buying {entity}. What do they know that you don't?"
            }
        }

    def classify(self, title: str, description: str) -> Dict[str, Any]:
        text_lower = f"{title} {description}".lower()

        # Check matched entity in active watchlist
        matched_entity = None
        for s in self.active_stocks:
            if re.search(r'\b' + re.escape(s['ticker'].lower()) + r'\b', text_lower) or (len(s['name']) > 3 and s['name'].lower() in text_lower):
                matched_entity = s
                break

        is_sebi = bool(re.search(r'\bsebi\b', text_lower))
        is_fintech = bool(re.search(r'\b(zerodha|groww|angel one|upstox|indmoney)\b', text_lower))

        if not matched_entity and not is_sebi and not is_fintech:
            return {"qualified": False, "reason": "Not in active watchlist, fintech or SEBI"}

        # Extract numerical figure if present
        fig_match = re.search(r'(\d+(?:\.\d+)?%|₹\s*\d+(?:,\d+)*(?:\.\d+)?|\b\d+\s*(?:crore|lakh|cr)\b)', text_lower)
        figure_str = fig_match.group(1) if fig_match else "sharply"

        # Check each archetype
        for arch_id, arch in self.archetypes.items():
            for kw in arch["keywords"]:
                if kw in text_lower:
                    # Filter out small irrelevant noise
                    if "cgst penalty" in text_lower or "saree depot" in text_lower or "independent director" in text_lower:
                        return {"qualified": False, "reason": "Boring minor corporate noise"}

                    entity_label = matched_entity['name'] if matched_entity else ("SEBI" if is_sebi else "Top Broker")
                    hook = arch["hook_template"].format(
                        entity=entity_label,
                        feature=title[:40],
                        figure=figure_str,
                        metric="strong sales"
                    )
                    return {
                        "qualified": True,
                        "archetype_id": arch_id,
                        "archetype_name": arch["name"],
                        "entity": entity_label,
                        "figure": figure_str,
                        "hook": hook,
                        "remotion": arch["remotion"],
                        "matched_keyword": kw
                    }

        return {"qualified": False, "reason": "Does not match any of the 6 viral archetypes (Routine announcement)"}

def main():
    print("=" * 75)
    print("  TESTING SHORTS INTELLIGENCE: 6 ARCHETYPES TESTER")
    print("=" * 75)

    # 1. Load active watchlist
    config_path = os.path.join(BASE_DIR, "config", "watchlist.json")
    loader = WatchlistLoader(config_path)
    active_stocks = loader.load_active_stocks()
    sources_cfg = load_json("config/sources.json")

    news_collector = NewsCollector(sources_cfg)
    sebi_collector = SEBICollector(sources_cfg)
    classifier = ArchetypeClassifier(active_stocks)

    print("\n[1/3] Ingesting real-time market feeds, SEBI circulars & active stock news...")
    raw_articles = []
    raw_articles.extend(news_collector.fetch_all_standard_feeds())
    raw_articles.extend(sebi_collector.fetch_all_sebi())
    raw_articles.extend(news_collector.scan_watchlist_stocks(active_stocks, chunk_size=5))
    
    # Also add fintech utility query (Zerodha, Groww, Angel One)
    for ft in ["Zerodha US stock OR Kite feature", "Groww UPI OR feature", "SEBI circular CAS"]:
        raw_articles.extend(news_collector.query_google_news(ft, category="Fintech Platform"))

    print(f"  -> Total raw articles pool: {len(raw_articles)}")

    # 2. Filter & Classify through the 6 Archetypes
    print("\n[2/3] Filtering through 6 Groww/INDmoney Archetypes & Rejection Matrix...")
    qualified_topics = {}

    for art in raw_articles:
        title = art.get("title", "").strip()
        desc = art.get("description", "").strip()
        res = classifier.classify(title, desc)
        if res["qualified"]:
            key = f"{res['entity']}_{res['archetype_id']}"
            if key not in qualified_topics:
                qualified_topics[key] = {
                    **res,
                    "title": title,
                    "link": art.get("link"),
                    "published": art.get("published"),
                    "source": art.get("source")
                }

    print(f"  -> Qualified Viral Candidates: {len(qualified_topics)} distinct topics")

    # Save to cache
    cache_path = os.path.join(BASE_DIR, "output", "cache", "2026-10-24_archetype_candidates.json")
    with open(cache_path, "w", encoding="utf-8") as f:
        json.dump(list(qualified_topics.values()), f, indent=2, ensure_ascii=False)
    print(f"  -> Saved candidates to {cache_path}")

    # 3. Output Classified Shorts Candidates
    print("\n" + "=" * 75)
    print("  TOP QUALIFIED CANDIDATES (Mapped to Groww & INDmoney Archetypes):")
    print("=" * 75)

    for idx, (k, item) in enumerate(list(qualified_topics.items())[:15], 1):
        print(f"\n[{idx}] ARCHETYPE: {item['archetype_name']}")
        print(f"    Target: {item['entity']} | Metric: {item['figure']}")
        print(f"    Headline: {item['title'][:70]}...")
        print(f"    3s Hook: \"{item['hook']}\"")
        print(f"    Remotion Element: {item['remotion']}")
        print(f"    Source Link: {item['link']}")

    print("\n" + "=" * 75)

if __name__ == "__main__":
    main()
