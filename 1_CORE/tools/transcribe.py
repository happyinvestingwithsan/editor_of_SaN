"""
SaN Video Pipeline - Transcription & Brand Sanitization Module
Runs Faster-Whisper on CUDA, normalizes Indian financial terminology & brand names,
and packages word-level frame timings for Remotion kinetic captions.
"""

import json
import os
import re
from typing import Dict, Any, List, Optional

# Canonical dictionary for Indian financial terminology and brand names
BRAND_DICTIONARY = {
    r"\bsugi\b": "Swiggy",
    r"\bswigi\b": "Swiggy",
    r"\bzomato\b": "Zomato",
    r"\bzeroda\b": "Zerodha",
    r"\bzerodha\b": "Zerodha",
    r"\bgrow\b": "Groww",
    r"\bgroww\b": "Groww",
    r"\bindmoney\b": "INDmoney",
    r"\bpaytm\b": "Paytm",
    r"\bjio\b": "Jio",
    r"\bbharti\b": "Bharti",
    r"\bairtel\b": "Airtel",
    r"\bdrhp\b": "DRHP",
    r"\brhp\b": "RHP",
    r"\bofs\b": "OFS",
    r"\bsebi\b": "SEBI",
    r"\bebitda\b": "EBITDA",
    r"\broce\b": "ROCE",
    r"\broe\b": "ROE",
    r"\bpe\b": "P/E",
    r"\bdma\b": "200 DMA",
    r"\b200\s*dma\b": "200 DMA",
    r"\bf&o\b": "F&O",
    r"\bnifty\b": "Nifty",
    r"\bsensex\b": "Sensex",
}


def sanitize_financial_text(text: str) -> str:
    """Correct frequent STT misspellings of Indian financial terms."""
    result = text
    for pattern, replacement in BRAND_DICTIONARY.items():
        result = re.sub(pattern, replacement, result, flags=re.IGNORECASE)
    return result


def transcribe_and_align(
    audio_path: str,
    output_words_json: Optional[str] = None,
    output_blocks_json: Optional[str] = None,
    model_size: str = "base",
    fps: int = 30,
) -> Dict[str, Any]:
    """
    Transcribe audio with Faster-Whisper, extract word timings,
    sanitize brands, and compute exact frame numbers.
    """
    from faster_whisper import WhisperModel

    print(f">> Loading Faster-Whisper ({model_size}) on GPU/CPU...")
    try:
        model = WhisperModel(model_size, device="cuda", compute_type="float16")
    except Exception:
        print("   [!] CUDA unavailable, falling back to CPU float32...")
        model = WhisperModel(model_size, device="cpu", compute_type="int8")

    print(f">> Transcribing: {audio_path}")
    segments, info = model.transcribe(
        audio_path,
        beam_size=5,
        word_timestamps=True,
        language="en",
    )

    words_list: List[Dict[str, Any]] = []
    full_text_segments = []

    for seg in segments:
        full_text_segments.append(seg.text)
        if seg.words:
            for w in seg.words:
                cleaned_word = sanitize_financial_text(w.word.strip())
                words_list.append({
                    "word": cleaned_word,
                    "raw_word": w.word.strip(),
                    "start": round(w.start, 3),
                    "end": round(w.end, 3),
                    "startFrame": round(w.start * fps),
                    "endFrame": round(w.end * fps),
                    "probability": round(w.probability, 3),
                })

    # Group into punchy kinetic caption blocks (2-4 words per block)
    blocks: List[Dict[str, Any]] = []
    chunk_size = 3
    for i in range(0, len(words_list), chunk_size):
        chunk = words_list[i:i + chunk_size]
        if not chunk:
            continue
        text_block = " ".join([c["word"] for c in chunk])
        blocks.append({
            "id": f"block_{i // chunk_size + 1}",
            "text": text_block,
            "start": chunk[0]["startFrame"],
            "end": chunk[-1]["endFrame"] + 3,  # Slight pad for visual readability
            "words": chunk,
        })

    result = {
        "text": " ".join(full_text_segments).strip(),
        "total_words": len(words_list),
        "total_blocks": len(blocks),
        "words": words_list,
        "blocks": blocks,
    }

    if output_words_json:
        os.makedirs(os.path.dirname(os.path.abspath(output_words_json)), exist_ok=True)
        with open(output_words_json, "w", encoding="utf-8") as f:
            json.dump(words_list, f, indent=2, ensure_ascii=False)
        print(f"[OK] Saved words to: {output_words_json}")

    if output_blocks_json:
        os.makedirs(os.path.dirname(os.path.abspath(output_blocks_json)), exist_ok=True)
        with open(output_blocks_json, "w", encoding="utf-8") as f:
            json.dump(blocks, f, indent=2, ensure_ascii=False)
        print(f"[OK] Saved caption blocks to: {output_blocks_json}")

    return result
