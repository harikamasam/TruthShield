import re
from typing import Dict, List


TOXIC_PATTERNS = {
    "hate speech": ["inferior", "subhuman", "vermin", "go back"],
    "abusive language": ["idiot", "stupid", "moron", "trash", "pathetic"],
    "threats": ["kill", "destroy", "hurt", "attack", "wipe out"],
    "harassment": ["everyone should harass", "target them", "dox", "ruin their life"],
}


def analyze_toxicity(text: str) -> Dict[str, object]:
    lower = text.lower()
    categories: List[str] = []
    matches: List[str] = []

    for category, terms in TOXIC_PATTERNS.items():
        hits = [term for term in terms if re.search(rf"\b{re.escape(term)}\b", lower)]
        if hits:
            categories.append(category)
            matches.extend(hits)

    hit_count = len(matches)
    if hit_count >= 4 or "threats" in categories:
        severity = "High"
        score = 85
    elif hit_count >= 2:
        severity = "Medium"
        score = 55
    elif hit_count == 1:
        severity = "Low"
        score = 25
    else:
        severity = "Low"
        score = 5

    return {
        "severity": severity,
        "toxicity_score": score,
        "categories": categories,
        "signals": sorted(set(matches)),
        "summary": "Toxic or harmful wording detected." if matches else "No strong toxicity signals detected.",
    }
