import re
from typing import Dict, Iterable, List


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower()).strip()


def tokenize(text: str) -> List[str]:
    return re.findall(r"\b[a-zA-Z][a-zA-Z'-]*\b", text.lower())


def split_sentences(text: str) -> List[str]:
    return [sentence.strip() for sentence in re.split(r"(?<=[.!?])\s+", text.strip()) if len(sentence.strip()) > 8]


def find_phrase_hits(text: str, phrases: Iterable[str]) -> List[str]:
    lower = normalize(text)
    return [phrase for phrase in phrases if phrase in lower]


def score_hits(text: str, rules: Dict[str, List[str]]) -> List[Dict[str, object]]:
    detected = []
    for label, phrases in rules.items():
        hits = find_phrase_hits(text, phrases)
        if hits:
            detected.append({"type": label, "signals": hits})
    return detected


def clamp(value: int, minimum: int = 0, maximum: int = 100) -> int:
    return max(minimum, min(maximum, int(value)))
