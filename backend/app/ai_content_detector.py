import re
from typing import Dict, List


GENERIC_PHRASES = [
    "in today's world",
    "it is important to note",
    "moreover",
    "furthermore",
    "in conclusion",
    "overall",
    "this highlights",
    "plays a crucial role",
    "rapidly evolving landscape",
    "it remains to be seen",
    "a growing number of",
    "experts emphasize",
]


def detect_ai_content(text: str) -> Dict[str, object]:
    lower = text.lower()
    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", text) if s.strip()]
    words = re.findall(r"\b\w+\b", lower)
    unique_ratio = len(set(words)) / max(len(words), 1)
    avg_sentence_length = sum(len(s.split()) for s in sentences) / max(len(sentences), 1)
    sentence_lengths = [len(sentence.split()) for sentence in sentences]
    rhythm_variance = (
        sum(abs(length - avg_sentence_length) for length in sentence_lengths) / max(len(sentence_lengths), 1)
        if sentence_lengths
        else 0
    )

    signals: List[str] = []
    phrase_hits = [phrase for phrase in GENERIC_PHRASES if phrase in lower]
    if phrase_hits:
        signals.append("Generic transition or summary phrasing")
    if 14 <= avg_sentence_length <= 26 and len(sentences) >= 4:
        signals.append("Very even sentence structure")
    if unique_ratio < 0.48 and len(words) > 80:
        signals.append("Repetitive vocabulary")
    if not re.search(r"\d|named|according to|reported by|quote|said", lower) and len(words) > 90:
        signals.append("Limited concrete details or attribution")
    if rhythm_variance < 4 and len(sentences) >= 5:
        signals.append("Synthetic sentence rhythm")
    if re.search(r"\b(this|these|such)\b.*\b(underscores|highlights|reflects|demonstrates)\b", lower):
        signals.append("Generic analytical framing")
    if len(words) > 120 and not re.search(r"\b[A-Z][a-z]+ [A-Z][a-z]+\b|\b\d{4}\b|https?://", text):
        signals.append("Low-specificity long-form narrative")

    probability = min(96, len(signals) * 18 + len(phrase_hits) * 5)
    if probability >= 65:
        level = "High"
    elif probability >= 35:
        level = "Medium"
    else:
        level = "Low"

    return {
        "suspicion_level": level,
        "probability": probability,
        "signals": signals,
        "summary": (
            "AI-style patterns detected: " + ", ".join(signals[:3]) + ". This remains a probabilistic authorship signal."
            if signals
            else "This is a stylistic estimate only, not proof of AI authorship."
        ),
        "reasoning": {
            "unique_word_ratio": round(unique_ratio, 2),
            "average_sentence_length": round(avg_sentence_length, 1),
            "sentence_rhythm_variance": round(rhythm_variance, 1),
            "generic_phrase_hits": phrase_hits,
        },
    }
