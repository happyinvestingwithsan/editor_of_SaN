import urllib.request
import bs4
import re
from typing import List, Dict, Any

class SEBICollector:
    def __init__(self, sources_config: Dict[str, Any], timeout: int = 12):
        self.sources = sources_config.get("sebi_sources", [])
        self.timeout = timeout
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        }

    def fetch_sebi_listings(self, url: str, source_name: str) -> List[Dict[str, Any]]:
        items = []
        try:
            req = urllib.request.Request(url, headers=self.headers)
            with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                soup = bs4.BeautifulSoup(resp.read(), 'html.parser')
                table = soup.find('table')
                if not table:
                    return items
                
                rows = table.find_all('tr')
                for row in rows:
                    cols = row.find_all('td')
                    if len(cols) >= 2:
                        date_text = cols[0].get_text(strip=True)
                        link_elem = cols[1].find('a')
                        if link_elem:
                            title = link_elem.get_text(strip=True)
                            href = link_elem.get('href', '')
                            if href and not href.startswith('http'):
                                href = f"https://www.sebi.gov.in{href}"
                            
                            if title and len(title) > 5:
                                items.append({
                                    "title": title,
                                    "link": href,
                                    "published": date_text,
                                    "description": f"Official {source_name} issued on {date_text}: {title}",
                                    "source": source_name,
                                    "category": "Regulatory / SEBI"
                                })
        except Exception:
            pass
        return items

    def fetch_all_sebi(self) -> List[Dict[str, Any]]:
        all_items = []
        for src in self.sources:
            items = self.fetch_sebi_listings(src["url"], src["name"])
            all_items.extend(items)
        return all_items
