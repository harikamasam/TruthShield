from typing import Dict, List

from .text_utils import clamp, find_phrase_hits, normalize


CREDIBILITY_RULES = {
    "sensational wording": ["shocking", "bombshell", "explosive", "miracle", "secret", "exposed", "breaking"],
    "urgency manipulation": ["share now", "before it is removed", "before they delete", "act now", "do not wait"],
    "emotional exaggeration": ["terrified", "outrage", "betrayed", "panic", "wake up", "devastating"],
    "unsupported authority claims": ["experts say", "doctors confirmed", "officials admit", "scientists proved", "insider says"],
    "conspiracy-style phrasing": ["cover-up", "hidden truth", "they don't want you to know", "secret agenda", "silenced"],
    "clickbait patterns": ["you won't believe", "what happened next", "mainstream media won't", "everyone is talking"],
    "source absence": ["sources say", "many people are saying", "anonymous insider", "forwarded as received"],
}

SOURCE_ATTRIBUTION = [
    "according to",
    "reported by",
    "published by",
    "data from",
    "study in",
    "official report",
    "peer-reviewed",
    "court filing",
]


def analyze_credibility_signals(text: str) -> Dict[str, object]:
    lower = normalize(text)
    signals: List[Dict[str, object]] = []

    for category, phrases in CREDIBILITY_RULES.items():
        hits = find_phrase_hits(lower, phrases)
        if hits:
            signals.append(
                {
                    "category": category,
                    "severity": "High" if len(hits) > 1 else "Medium",
                    "evidence": hits[:5],
                    "explanation": f"Detected {category} patterns that can reduce credibility.",
                }
            )

    has_source_attribution = any(source in lower for source in SOURCE_ATTRIBUTION)
    if not has_source_attribution and len(lower.split()) > 25:
        signals.append(
            {
                "category": "source absence",
                "severity": "High",
                "evidence": ["No clear source attribution found"],
                "explanation": "The content makes claims without naming verifiable sources or primary evidence.",
            }
        )

    sensational_score = clamp(
        sum(len(signal["evidence"]) * 12 for signal in signals if signal["category"] in {"sensational wording", "clickbait patterns", "emotional exaggeration"})
    )
    source_absence_score = 75 if not has_source_attribution and len(lower.split()) > 25 else 12

    return {
        "signals": signals,
        "has_source_attribution": has_source_attribution,
        "sensational_score": sensational_score,
        "source_absence_score": source_absence_score,
        "explanation": "Credibility analysis evaluates source transparency, manipulative wording, authority claims, and clickbait patterns.",
    }


def analyze_credibility(
    text: str,
    claims: List[Dict[str, object]],
    toxicity: Dict[str, object],
    bias: Dict[str, object],
    manipulation: Dict[str, object] | None = None,
    scoring: Dict[str, object] | None = None,
) -> Dict[str, object]:
    credibility_signals = analyze_credibility_signals(text)
    red_flags = credibility_signals["signals"]

    if scoring is None:
        suspicious_claims = sum(1 for claim in claims if claim["status"] == "Suspicious")
        uncertain_claims = sum(1 for claim in claims if claim["status"] == "Uncertain")
        manipulation_score = int((manipulation or {}).get("manipulation_score", 0))
        penalty = len(red_flags) * 8 + suspicious_claims * 12 + uncertain_claims * 5
        penalty += int(toxicity["toxicity_score"] * 0.16) + int(bias["bias_score"] * 0.18) + int(manipulation_score * 0.12)
        trust_score = clamp(92 - penalty, 5, 96)

        if trust_score >= 75:
            risk_level = "Low"
            credibility_label = "Trustworthy"
        elif trust_score >= 50:
            risk_level = "Medium"
            credibility_label = "Suspicious"
        elif trust_score >= 30:
            risk_level = "High"
            credibility_label = "Misleading"
        else:
            risk_level = "Critical"
            credibility_label = "Likely Fake or Harmful"

        recommendation = "Safe" if trust_score >= 72 and toxicity["severity"] != "High" else "Verify Before Sharing" if trust_score >= 42 else "High Risk"
        scoring = {
            "trust_score": trust_score,
            "confidence_score": 70,
            "risk_level": risk_level,
            "credibility_label": credibility_label,
            "recommendation": recommendation,
            "signals": {},
            "weights": {},
        }

    return {
        "trust_score": scoring["trust_score"],
        "confidence_score": scoring["confidence_score"],
        "risk_level": scoring["risk_level"],
        "credibility_label": scoring["credibility_label"],
        "red_flags": red_flags,
        "recommendation": scoring["recommendation"],
        "summary": "Trust score combines weighted source transparency, manipulation, toxicity, propaganda, AI suspicion, and claim reliability signals.",
        "detected_manipulation_signals": credibility_signals,
        "scoring_signals": scoring["signals"],
        "scoring_weights": scoring["weights"],
    }
