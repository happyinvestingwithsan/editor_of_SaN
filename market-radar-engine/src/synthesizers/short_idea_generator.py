from typing import List, Dict, Any

class ShortIdeaGenerator:
    def __init__(self, brand_voice: Dict[str, Any]):
        self.brand_voice = brand_voice
        self.visual_elements = brand_voice.get("visual_motion_elements", {})

    def select_visual_recipe(self, item: Dict[str, Any]) -> Dict[str, str]:
        title = item.get("title", "").lower()
        matches = [m.lower() for m in item.get("watchlist_matches", [])]
        category = item.get("category", "").lower()

        if any(f in matches for f in ["zerodha", "groww", "angel one", "upstox", "indmoney"]) or "activate" in title or "feature" in title:
            return {
                "primary": "UIRippleHighlight.tsx + StepCalloutBadge.tsx",
                "description": "Phone B-roll scaled to 1.32x with pulsing ripple click guides and Step 1/2/3 pop-in badges."
            }
        elif "sebi" in matches or "regulatory" in category or "circular" in title:
            return {
                "primary": "NewspaperHeadline.tsx",
                "description": "3D tilted official SEBI document / press clipping with yellow marker highlighter sweeping across the key rule."
            }
        elif any(s in matches for s in ["dmart", "reliance", "hdfc", "tata", "infosys", "itc"]) or "earnings" in title or "profit" in title:
            return {
                "primary": "StockTickerBadge.tsx + FinancialLineChart.tsx",
                "description": "Floating company ticker badge + animated cubic bezier financial chart with milestone tags."
            }
        elif "vs" in title or "versus" in title or "compare" in title:
            return {
                "primary": "ComparisonVersus.tsx",
                "description": "Split-screen comparison layout with animated green checkmarks and red risk crosses."
            }
        else:
            return {
                "primary": "NewspaperHeadline.tsx + KineticWordCaptions.tsx",
                "description": "2.5D press clipping from Economic Times/Mint with camera push-in and kinetic word subtitles."
            }

    def generate_hook(self, item: Dict[str, Any]) -> str:
        title = item.get("title", "")
        matches = item.get("watchlist_matches", [])
        sentiment = item.get("sentiment_eval", {})

        if sentiment.get("fear_matches"):
            bad_word = sentiment["fear_matches"][0].title()
            return f"\"Why is everyone shouting '{bad_word}' today? Here is what actually happened.\""
        elif sentiment.get("greed_matches"):
            return f"\"Before you jump into the latest hype, look at these 2 numbers first.\""
        elif "sebi" in [m.lower() for m in matches]:
            return f"\"SEBI just issued a major update. Here is how it impacts your portfolio.\""
        elif any(f in matches for f in ["Zerodha", "Groww", "Angel One", "Upstox"]):
            platform = [f for f in ["Zerodha", "Groww", "Angel One", "Upstox"] if f in matches][0]
            return f"\"Finally, {platform} added a new feature. Here is how to activate it in 30 seconds.\""
        elif matches:
            stock = matches[0]
            return f"\"Huge news for {stock} investors today. Let's look at the real data.\""
        else:
            return f"\"Everyone is talking about this today, but nobody is showing the actual source.\""

    def generate_script_blueprint(self, item: Dict[str, Any], hook: str) -> List[str]:
        title = item.get("title", "")
        clean_angle = item.get("clean_angle", "")
        source = item.get("source", "Official Sources")
        matches = item.get("watchlist_matches", [])

        subject = matches[0] if matches else "today's market event"

        return [
            f"0:00 - 0:03 (The Hook): Spoken: {hook} -> [Punchy, zero pause]",
            f"0:03 - 0:10 (The Context): \"If you saw today's news about {subject}, don't panic or rush. Let's look at what the official filing actually says.\"",
            f"0:10 - 0:28 (The Breakdown): Spoken: \"{clean_angle}\" -> [Show source document / UI screen on Track 1 with Remotion overlay]",
            f"0:28 - 0:35 (Happy Investing Outro): \"Remember, smart investing is about cutting through daily noise and sticking to facts. Enjoy happy investing!\""
        ]

    def build_daily_short_ideas(self, ranked_items: List[Dict[str, Any]], count: int = 4) -> List[Dict[str, Any]]:
        ideas = []
        # Ensure diversity across categories
        used_categories = set()
        
        for item in ranked_items:
            category = item.get("category", "General")
            visual = self.select_visual_recipe(item)
            hook = self.generate_hook(item)
            script = self.generate_script_blueprint(item, hook)

            idea = {
                "rank": len(ideas) + 1,
                "title": item.get("title"),
                "source": item.get("source"),
                "link": item.get("link"),
                "category": category,
                "watchlist_matches": item.get("watchlist_matches", []),
                "clean_angle": item.get("clean_angle"),
                "hook": hook,
                "visual_recipe": visual,
                "script_blueprint": script,
                "raw_score": item.get("rank_score", 0.0)
            }
            ideas.append(idea)
            if len(ideas) >= count:
                break

        return ideas
