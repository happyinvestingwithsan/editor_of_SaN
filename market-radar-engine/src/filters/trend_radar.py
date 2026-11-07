import re
from typing import List, Dict, Any

class TrendRadar:
    """
    Ranks market news and circulars strictly focusing on the active watchlist
    (F40 & E40, extensible to S200) and official SEBI circulars/orders.

    Enforces STRICT TOPIC CLUSTERING:
    - Every slot in the Top 10 MUST represent a distinct company or distinct regulatory topic.
    - No single company (e.g. BSE or Angel One) can occupy multiple slots.
    - Additional articles on the same stock are clustered as secondary references.
    """
    def __init__(self, active_stocks: List[Dict[str, Any]]):
        self.active_stocks = active_stocks
        
        # Build strict lookup
        self.stock_lookup = {}
        for s in active_stocks:
            ticker = s["ticker"].upper()
            name = s["name"]
            self.stock_lookup[ticker] = s

        # Buzz triggers (used to gauge what retail is talking/panicking/celebrating about)
        self.buzz_triggers = {
            "panic_and_drawdown": [
                "crash", "bloodbath", "plunge", "slump", "tumble", "bleed", "bleeding",
                "wiped out", "freefall", "sell-off", "nosedive", "tank", "fall", "drop", "loss"
            ],
            "hype_and_rally": [
                "surge", "rally", "skyrocket", "jump", "record high", "all-time high",
                "52-week high", "soar", "gain", "breakout", "bull run", "multibagger"
            ],
            "regulatory_and_trouble": [
                "sebi", "rbi", "crackdown", "penalty", "show-cause", "ban", "order",
                "circular", "raid", "probe", "fraud", "irregularity", "scrutiny", "expiry", "cas", "f&o"
            ],
            "corporate_catalysts": [
                "q2 results", "q3 results", "q4 results", "q1 results", "quarterly profit",
                "revenue", "earnings", "dividend", "bonus", "split", "acquisition", "stake sale",
                "target cut", "downgrade", "upgrade", "ipo", "investor meet", "raise"
            ]
        }

    def match_item(self, text: str) -> Dict[str, Any]:
        """
        Matches text strictly against active watchlist stocks or SEBI.
        Returns the primary matched entity, or None if no active watchlist/SEBI match.
        """
        text_lower = text.lower()
        matched_stocks = []

        # 1. Match Active Watchlist Stocks
        for s in self.active_stocks:
            ticker = s["ticker"].lower()
            name = s["name"].lower()

            # Ticker boundary match (avoid 2-letter collisions like LT, unless distinct)
            if len(ticker) >= 3:
                ticker_hit = bool(re.search(r'\b' + re.escape(ticker) + r'\b', text_lower))
            elif ticker == "lt":
                ticker_hit = bool(re.search(r'\b(l&t|larson & toubro|larsen and toubro)\b', text_lower))
            else:
                ticker_hit = False

            name_hit = (len(name) > 3 and name in text_lower)

            if ticker_hit or name_hit:
                matched_stocks.append(s)

        # 2. Match SEBI Regulatory
        is_sebi = bool(re.search(r'\bsebi\b', text_lower))

        if matched_stocks:
            # Primary is the first/most prominent stock
            primary = matched_stocks[0]
            return {
                "entity_type": "STOCK",
                "primary_key": primary["ticker"],
                "stock_info": primary,
                "all_stocks": matched_stocks,
                "is_sebi_related": is_sebi
            }
        elif is_sebi:
            return {
                "entity_type": "SEBI",
                "primary_key": "SEBI_REGULATORY",
                "stock_info": None,
                "all_stocks": [],
                "is_sebi_related": True
            }

        return None

    def evaluate_velocity(self, text: str) -> Dict[str, Any]:
        text_lower = text.lower()
        detected_triggers = []
        score = 0.0

        for category, words in self.buzz_triggers.items():
            matches = [w for w in words if re.search(r'\b' + re.escape(w) + r'\b', text_lower)]
            if matches:
                detected_triggers.extend([(category, w) for w in matches])
                if category == "panic_and_drawdown":
                    score += len(matches) * 4.0
                elif category == "regulatory_and_trouble":
                    score += len(matches) * 5.0
                elif category == "hype_and_rally":
                    score += len(matches) * 3.5
                elif category == "corporate_catalysts":
                    score += len(matches) * 3.0

        figures = re.findall(r'(\d+(?:\.\d+)?%|₹\s*\d+(?:,\d+)*(?:\.\d+)?|\b\d+\s*(?:crore|lakh|cr|bps)\b)', text_lower)
        if figures:
            score += len(figures) * 2.0

        return {
            "score": round(score, 1),
            "triggers": detected_triggers,
            "figures": figures[:3]
        }

    def rank_top_diverse(self, items: List[Dict[str, Any]], top_n: int = 10) -> List[Dict[str, Any]]:
        """
        Groups articles by primary entity (Stock Ticker or SEBI topic),
        picks the best article per entity, and returns top_n DISTINCT stories.
        """
        seen_titles = set()
        clusters = {}  # primary_key -> list of articles

        for it in items:
            title = it.get("title", "").strip()
            if not title or len(title) < 12:
                continue

            # Deduplication key
            norm_key = re.sub(r'[^a-z0-9]', '', title.lower()[:50])
            if norm_key in seen_titles:
                continue
            seen_titles.add(norm_key)

            full_text = f"{title} {it.get('description', '')}"
            match_res = self.match_item(full_text)

            # Strict Rule: Drop anything not related to Watchlist or SEBI
            if not match_res:
                continue

            velocity = self.evaluate_velocity(full_text)
            
            # Base score: Stocks +15, SEBI +12
            base_score = 15.0 if match_res["entity_type"] == "STOCK" else 12.0
            if match_res["is_sebi_related"]:
                base_score += 5.0
            if "sebi" in it.get("source", "").lower() or it.get("category") == "Regulatory / SEBI":
                base_score += 8.0

            total_rank = base_score + velocity["score"]

            article_entry = {
                "title": title,
                "link": it.get("link", ""),
                "published": it.get("published", ""),
                "source": it.get("source", "Market Feed"),
                "description": it.get("description", ""),
                "match_res": match_res,
                "velocity": velocity,
                "rank_score": round(total_rank, 1)
            }

            pkey = match_res["primary_key"]
            if pkey not in clusters:
                clusters[pkey] = []
            clusters[pkey].append(article_entry)

        # For each cluster, pick the highest-ranked article as the primary feature
        distinct_stories = []
        for pkey, art_list in clusters.items():
            # Sort articles within the cluster
            art_list.sort(key=lambda x: x["rank_score"], reverse=True)
            lead = art_list[0]
            alternates = [a["title"] for a in art_list[1:3]]

            stock_info = lead["match_res"]["stock_info"]
            if stock_info:
                entity_label = f"{stock_info['ticker']} ({stock_info['list']}) - {stock_info['name']}"
            else:
                entity_label = "SEBI Regulatory / Circular"

            distinct_stories.append({
                "primary_key": pkey,
                "entity_label": entity_label,
                "stock_info": stock_info,
                "title": lead["title"],
                "link": lead["link"],
                "source": lead["source"],
                "published": lead["published"],
                "description": lead["description"],
                "rank_score": lead["rank_score"],
                "buzz_triggers": list(set([t[1].title() for t in lead["velocity"]["triggers"]])),
                "figures": lead["velocity"]["figures"],
                "alternate_headlines": alternates,
                "total_articles_found": len(art_list)
            })

        # Sort all distinct subjects by rank_score
        distinct_stories.sort(key=lambda x: x["rank_score"], reverse=True)
        return distinct_stories[:top_n]
