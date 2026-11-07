# Happy Investing: Market Radar & Idea Generation Engine

A real-time intelligence system that automates daily trending idea generation for **Happy Investing** short-form reels and consolidates them into **weekend long-form YouTube deep dives**.

---

## 🌟 The Core Philosophy: "Cut Through The Noise"
Most financial social media survives on **Fear** (*"Market Crash! Doom!"*) or **Greed** (*"100x Multibagger!"*).  
**Happy Investing** operates on the exact opposite frequency:
- **Zero Fear:** Explain the factual structural reasons behind market dips without panic.
- **Zero Greed:** Highlight valuation multiples, margin safety, and risk reality.
- **Evidence-Based Proof:** Always cite the official source (SEBI circulars, company filings, platform UI).
- **Practical Utility:** Help retail investors understand what this means for their hard-earned money.

---

## 🚀 Quick Start

### 1. Run Daily Market Radar (Generates 3-5 Short Ideas)
Run this every morning at 8:30 AM:
```bash
python run_radar.py
```
- Scans real-time Indian financial news (Livemint, Economic Times, Google News Business, Moneycontrol).
- Scrapes official SEBI circulars and press releases.
- Scans focus watchlist stocks (`DMART`, `RELIANCE`, `HDFCBANK`, etc.) and fintech platforms (`Zerodha`, `Groww`).
- Filters out emotional clickbait using the **Happy Investing Filter**.
- Outputs ranked short concepts to: `output/daily_briefs/YYYY-MM-DD_ideas.md`.

### 2. Run Weekend Long-Form Consolidator
Run this on Friday evening or Saturday:
```bash
python run_weekend_synthesis.py
```
- Reads the week's daily briefs.
- Compiles the top themes into a **10–14 minute cohesive YouTube long-form video script**.
- Reuses the research and Remotion motion assets from the daily shorts.
- Outputs to: `output/weekly_briefs/YYYY-WW_weekend_longform.md`.

---

## 📂 Architecture & Directory Structure

```text
market-radar-engine/
├── config/
│   ├── watchlist.json          # Focus stocks, fintech keywords, macro regulatory terms
│   ├── sources.json            # RSS feed endpoints & SEBI scrape configurations
│   └── brand_voice.json        # Happy Investing guardrails, banned words, Remotion tokens
├── src/
│   ├── collectors/
│   │   ├── news_collector.py   # RSS & Google News search collector
│   │   └── sebi_collector.py   # Official SEBI circulars and press release scraper
│   ├── filters/
│   │   └── noise_filter.py     # Strips fear/greed & scores utility/fact density
│   ├── synthesizers/
│   │   └── short_idea_generator.py # Formulates 3-second hooks & visual Remotion recipes
│   └── consolidator/
│       └── weekend_longform.py # Synthesizes daily briefs into 12-min YouTube video blueprint
├── output/
│   ├── daily_briefs/           # Daily markdown idea files (YYYY-MM-DD_ideas.md)
│   └── weekly_briefs/          # Weekly YouTube long-form scripts (YYYY-WW_weekend_longform.md)
├── run_radar.py                # Daily morning CLI runner
└── run_weekend_synthesis.py    # Weekend consolidation CLI runner
```
