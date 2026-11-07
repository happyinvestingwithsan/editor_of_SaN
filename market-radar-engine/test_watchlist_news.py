import json
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import re

with open(r'D:\AI Projects\Editor_of_SaN\market-radar-engine\config\watchlist.json', 'r', encoding='utf-8') as f:
    wl = json.load(f)

stocks = wl['f40_stocks'] + wl['e40_stocks']
print(f"Total active stocks: {len(stocks)}")

found = {}
# Batch query in chunks of 5
for i in range(0, len(stocks), 5):
    chunk = stocks[i:i+5]
    # Build search terms using company names or tickers
    query_parts = []
    for s in chunk:
        query_parts.append(f"\"{s['name']}\"")
    query = " OR ".join(query_parts)
    url = f"https://news.google.com/rss/search?q={urllib.parse.quote(query)}+when:2d&hl=en-IN&gl=IN&ceid=IN:en"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as resp:
            tree = ET.fromstring(resp.read())
            items = tree.findall('.//item')
            for it in items:
                title = it.find('title').text
                for s in chunk:
                    # check match
                    if s['name'].lower() in title.lower() or re.search(r'\b' + re.escape(s['ticker']) + r'\b', title, re.IGNORECASE):
                        if s['ticker'] not in found:
                            found[s['ticker']] = {
                                'name': s['name'],
                                'list': 'F40' if s in wl['f40_stocks'] else 'E40',
                                'articles': []
                            }
                        found[s['ticker']]['articles'].append(title)
    except Exception as e:
        print(f"Error querying chunk {i}: {e}")

print(f"\nDistinct Watchlist Companies with Fresh News ({len(found)} companies):")
for t, data in found.items():
    print(f"[{data['list']}] {t} ({data['name']}): {len(data['articles'])} articles -> Latest: {data['articles'][0][:75]}...")
