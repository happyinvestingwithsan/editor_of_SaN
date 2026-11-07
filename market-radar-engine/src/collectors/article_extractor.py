import urllib.request
import bs4
import re
from typing import Dict, Any, List

class ArticleExtractor:
    def __init__(self, timeout: int = 10):
        self.timeout = timeout
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }

    def fetch_full_snippet(self, url: str) -> Dict[str, Any]:
        """
        Fetches an article or circular URL and extracts the core textual paragraphs.
        """
        try:
            req = urllib.request.Request(url, headers=self.headers)
            with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                html = resp.read()
                soup = bs4.BeautifulSoup(html, 'html.parser')

                # Extract title
                page_title = soup.title.string.strip() if soup.title and soup.title.string else ""

                # Extract article body paragraphs
                paragraphs = []
                for p in soup.find_all('p'):
                    txt = p.get_text(strip=True)
                    if len(txt) > 40 and not any(skip in txt.lower() for skip in [
                        "cookie", "privacy policy", "all rights reserved", "subscribe now", "advertisement"
                    ]):
                        paragraphs.append(txt)

                main_body = " ".join(paragraphs[:8])
                
                # Find quantitative highlights (figures, percentages)
                key_figures = re.findall(r'(\d+(?:\.\d+)?%|₹\s*\d+(?:,\d+)*(?:\.\d+)?|\b\d+\s*(?:crore|lakh|cr)\b)', main_body)

                # Select the best snippet for Remotion Newspaper clipping
                best_snippet = paragraphs[0] if paragraphs else page_title

                return {
                    "success": True,
                    "page_title": page_title,
                    "lead_snippet": best_snippet[:250],
                    "key_figures": list(set(key_figures[:5])),
                    "full_paragraphs": paragraphs[:5]
                }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "lead_snippet": "Could not fetch direct page content (URL might require paywall/client-side JS).",
                "key_figures": []
            }

    def generate_short_script(self, item: Dict[str, Any], snippet_info: Dict[str, Any]) -> Dict[str, Any]:
        """
        Creates the complete 45-second conversational script and Remotion overlay blueprint.
        """
        title = item.get("title", "")
        entities = item.get("matched_entities", [])
        entity_name = entities[0]["name"] if entities else "this stock"
        list_badge = entities[0].get("list", "") if entities else ""
        lead_snippet = snippet_info.get("lead_snippet", title)

        hook = f"\"Did you see the big news about {entity_name} today? Everyone is reacting, but here is what the data actually says.\""

        script_steps = [
            {
                "time": "0:00 - 0:03",
                "speaker": hook,
                "visual": f"NewspaperHeadline.tsx (3D tilted press clipping with yellow highlighter sweeping across '{entity_name}')",
                "intent": "Instant curiosity hook, loss aversion, zero fluff"
            },
            {
                "time": "0:03 - 0:12",
                "speaker": f"\"Headlines are buzzing with: '{title[:70]}...'. Before making any emotional buy or sell decision, let's look at the source.\"",
                "visual": f"Phone or Desktop screen showing the article / filing on Track 1, zoomed to 1.32x",
                "intent": "Acknowledge the market noise and validate the viewer's curiosity"
            },
            {
                "time": "0:12 - 0:28",
                "speaker": f"\"Here is the core fact: {lead_snippet[:140]}... The key number to note here is {snippet_info.get('key_figures', ['the real fundamentals'])[0] if snippet_info.get('key_figures') else 'the business moat'}.\"",
                "visual": f"FinancialLineChart.tsx or StockTickerBadge.tsx showing price & valuation multiples",
                "intent": "Factual breakdown: deliver the objective truth and strip the hype"
            },
            {
                "time": "0:28 - 0:35",
                "speaker": f"\"For long-term investors in {entity_name}, this is why we don't panic or chase green candles. Stay calm, focus on compounding, and happy investing!\"",
                "visual": "OutroVerifiedBadge.tsx + +450ms natural smile loop retention",
                "intent": "Brand signature sign-off, empowering the viewer"
            }
        ]

        return {
            "hook": hook,
            "remotion_highlighter_phrase": entity_name,
            "script_steps": script_steps
        }
