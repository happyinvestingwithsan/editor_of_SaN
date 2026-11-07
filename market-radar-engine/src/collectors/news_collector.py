import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import re
from typing import List, Dict, Any

class NewsCollector:
    def __init__(self, sources_config: Dict[str, Any], timeout: int = 8):
        self.sources = sources_config.get("rss_feeds", [])
        self.timeout = timeout
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }

    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        clean = re.sub(r'<[^>]+>', '', text)
        clean = re.sub(r'\s+', ' ', clean).strip()
        return clean

    def fetch_feed(self, url: str, source_name: str, category: str = "General") -> List[Dict[str, Any]]:
        items = []
        try:
            req = urllib.request.Request(url, headers=self.headers)
            with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                xml_data = resp.read()
                root = ET.fromstring(xml_data)
                
                raw_items = root.findall('.//item')
                if not raw_items:
                    raw_items = root.findall('.//{http://www.w3.org/2005/Atom}entry')

                for it in raw_items:
                    title_elem = it.find('title') if it.find('title') is not None else it.find('{http://www.w3.org/2005/Atom}title')
                    link_elem = it.find('link') if it.find('link') is not None else it.find('{http://www.w3.org/2005/Atom}link')
                    pub_elem = it.find('pubDate') or it.find('published') or it.find('{http://www.w3.org/2005/Atom}published')
                    desc_elem = it.find('description') or it.find('summary') or it.find('{http://www.w3.org/2005/Atom}summary')

                    title = self.clean_text(title_elem.text) if title_elem is not None and title_elem.text else ""
                    if link_elem is not None:
                        link = link_elem.text if link_elem.text else link_elem.attrib.get('href', '')
                    else:
                        link = ""
                    published = pub_elem.text if pub_elem is not None and pub_elem.text else ""
                    description = self.clean_text(desc_elem.text) if desc_elem is not None and desc_elem.text else ""

                    if title and len(title) > 10:
                        items.append({
                            "title": title,
                            "link": link,
                            "published": published,
                            "description": description,
                            "source": source_name,
                            "category": category
                        })
        except Exception:
            pass
        return items

    def fetch_all_standard_feeds(self) -> List[Dict[str, Any]]:
        all_news = []
        for src in self.sources:
            feed_items = self.fetch_feed(src["url"], src["name"], src.get("category", "General"))
            all_news.extend(feed_items)
        return all_news

    def query_google_news(self, search_query: str, category: str = "Watchlist Target") -> List[Dict[str, Any]]:
        encoded_query = urllib.parse.quote(search_query)
        url = f"https://news.google.com/rss/search?q={encoded_query}&hl=en-IN&gl=IN&ceid=IN:en"
        return self.fetch_feed(url, source_name="Google News Search", category=category)

    def scan_watchlist_stocks(self, stocks: List[Dict[str, Any]], chunk_size: int = 5) -> List[Dict[str, Any]]:
        """
        Actively scans Google News RSS in batches of 5 stocks over the last 3 days
        to ensure every single stock in the active watchlist is probed.
        """
        all_stock_news = []
        # Filter out very generic short words if needed
        for i in range(0, len(stocks), chunk_size):
            chunk = stocks[i:i + chunk_size]
            terms = []
            for s in chunk:
                # Use quoted company name or explicit ticker if distinctive
                name = s["name"]
                ticker = s["ticker"]
                terms.append(f'"{name}"')

            batch_query = f"({' OR '.join(terms)}) when:3d"
            items = self.query_google_news(batch_query, category="Active Watchlist Probe")
            all_stock_news.extend(items)

        return all_stock_news
