import re
from typing import List, Dict, Any, Tuple

class NoiseFilter:
    def __init__(self, brand_voice: Dict[str, Any], watchlist: Dict[str, Any]):
        self.brand_voice = brand_voice
        self.watchlist = watchlist
        
        fear_policy = brand_voice.get("emotional_guardrails", {}).get("zero_fear_policy", {})
        self.fear_words = set(fear_policy.get("banned_words", [])) | {
            "wiped out", "bleeding", "plunges", "slumps", "tumbles", "massacre", "fears", "worries"
        }
        
        greed_policy = brand_voice.get("emotional_guardrails", {}).get("zero_greed_policy", {})
        self.greed_words = set(greed_policy.get("banned_words", [])) | {
            "skyrocket", "jackpot", "secret stock", "buy now or regret", "hidden gem", "multibagger"
        }

        # Utility keywords (high value for retail investors)
        self.utility_keywords = {
            "activate", "feature", "rule", "circular", "deadline", "tax", "stcg", "ltcg",
            "results", "earnings", "profit", "revenue", "margin", "guidance", "order",
            "guidelines", "expiry", "margin requirement", "us investing", "direct mutual fund"
        }

    def evaluate_sentiment_and_utility(self, text: str) -> Dict[str, Any]:
        text_lower = text.lower()
        
        fear_matches = [w for w in self.fear_words if re.search(r'\b' + re.escape(w) + r'\b', text_lower)]
        greed_matches = [w for w in self.greed_words if re.search(r'\b' + re.escape(w) + r'\b', text_lower)]
        utility_matches = [w for w in self.utility_keywords if re.search(r'\b' + re.escape(w) + r'\b', text_lower)]
        
        # Check for quantitative data (numbers, percentages, currency)
        has_numbers = bool(re.search(r'(\d+(\.\d+)?%|₹\s*\d+|\b\d+\s*(crore|lakh|cr|bps)\b)', text_lower))

        fear_score = len(fear_matches) * 2.0
        greed_score = len(greed_matches) * 2.0
        utility_score = len(utility_matches) * 1.5 + (2.0 if has_numbers else 0.0)

        is_sensational = (fear_score > 0) or (greed_score > 0)

        return {
            "fear_matches": fear_matches,
            "greed_matches": greed_matches,
            "utility_matches": utility_matches,
            "has_numbers": has_numbers,
            "fear_score": fear_score,
            "greed_score": greed_score,
            "utility_score": utility_score,
            "is_sensational": is_sensational
        }

    def match_watchlist(self, text: str) -> List[str]:
        matched = []
        text_lower = text.lower()
        
        # Check stocks
        for stock in self.watchlist.get("focus_stocks", []):
            symbol = stock["symbol"].lower()
            name_parts = stock["name"].lower().split()
            if re.search(r'\b' + re.escape(symbol) + r'\b', text_lower) or any(p in text_lower for p in name_parts if len(p) > 3):
                matched.append(stock["name"])
        
        # Check fintech
        for ft in self.watchlist.get("fintech_and_platforms", []):
            kw = ft["keyword"].lower()
            if re.search(r'\b' + re.escape(kw) + r'\b', text_lower):
                matched.append(ft["keyword"])

        # Check macro / regulatory
        for reg in self.watchlist.get("regulatory_and_macro", []):
            kw = reg["keyword"].lower()
            if re.search(r'\b' + re.escape(kw) + r'\b', text_lower):
                matched.append(reg["keyword"])

        return list(set(matched))

    def filter_and_rank(self, items: List[Dict[str, Any]], top_n: int = 15) -> List[Dict[str, Any]]:
        seen_titles = set()
        scored_items = []

        for it in items:
            title = it.get("title", "").strip()
            if not title or len(title) < 10:
                continue

            # Normalized title key for deduplication
            norm_key = re.sub(r'[^a-z0-9]', '', title.lower()[:45])
            if norm_key in seen_titles:
                continue
            seen_titles.add(norm_key)

            full_text = f"{title} {it.get('description', '')}"
            eval_res = self.evaluate_sentiment_and_utility(full_text)
            matches = self.match_watchlist(full_text)

            # Ranking Formula:
            # - Base score from Watchlist match (+5 per match)
            # - High utility score (+1.5 to +5.0)
            # - Official regulatory boost (SEBI/RBI source: +6)
            # - Sensational items penalized slightly, but NOT discarded because they offer the BEST opportunity to "Cut Through the Noise"!
            rank_score = 1.0
            if matches:
                rank_score += len(matches) * 5.0
            rank_score += eval_res["utility_score"]
            if "sebi" in it.get("source", "").lower() or it.get("category") == "Regulatory / SEBI":
                rank_score += 6.0

            # Generate Clean "Happy Investing" Angle
            clean_angle = self.generate_clean_angle(title, eval_res, matches)

            enriched = dict(it)
            enriched.update({
                "sentiment_eval": eval_res,
                "watchlist_matches": matches,
                "rank_score": round(rank_score, 2),
                "clean_angle": clean_angle
            })
            scored_items.append(enriched)

        # Sort descending by rank score
        scored_items.sort(key=lambda x: x["rank_score"], reverse=True)
        return scored_items[:top_n]

    def generate_clean_angle(self, title: str, eval_res: Dict[str, Any], matches: List[str]) -> str:
        if eval_res["fear_matches"]:
            fear_str = ", ".join(eval_res["fear_matches"])
            return f"Demystify the panic ({fear_str}): Explain the exact factual reason behind the move and remind viewers why knee-jerk selling destroys compounding."
        elif eval_res["greed_matches"]:
            greed_str = ", ".join(eval_res["greed_matches"])
            return f"Counter the hype ({greed_str}): Breakdown valuation multiples, margin safety, and what realistic risk-adjusted expectations look like."
        elif any("sebi" in m.lower() for m in matches):
            return "Regulatory Clarity: What SEBI's rule actually changes for retail investors, timeline of effect, and exact action steps."
        elif any(f in matches for f in ["Zerodha", "Groww", "Angel One", "Upstox", "INDmoney"]):
            return "Platform Utility & Feature Guide: Step-by-step walkthrough of what this feature does and how to safely utilize it."
        else:
            return "Fact Check & Fundamentals: Cut through the day's market noise to present the verifiable numbers and business reality."
