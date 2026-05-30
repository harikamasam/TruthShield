import re
from typing import Dict, List


CLAIM_TRIGGERS = [
    "causes",
    "cures",
    "proves",
    "confirmed",
    "breaking",
    "study",
    "experts",
    "government",
    "election",
    "vaccine",
    "virus",
    "always",
    "never",
    "everyone",
    "secret",
    "hidden",
    "confirmed",
    "officials",
    "media",
]


def split_sentences(text: str) -> List[str]:
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    return [sentence.strip() for sentence in sentences if len(sentence.strip()) > 12]


def extract_claims(text: str) -> List[Dict[str, str]]:
    """Extract important claims with simulated verification labels."""
    sentences = split_sentences(text)
    scored = []

    for sentence in sentences:
        lower = sentence.lower()
        trigger_hits = sum(1 for trigger in CLAIM_TRIGGERS if trigger in lower)
        has_number = bool(re.search(r"\d+|percent|%", lower))
        has_named_entity_style = bool(re.search(r"\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b", sentence))
        score = trigger_hits + int(has_number) + int(has_named_entity_style)

        if score > 0:
            scored.append((score, sentence))

    selected = [sentence for _, sentence in sorted(scored, reverse=True)[:6]]
    if not selected and sentences:
        selected = sentences[:3]

    claims = []
    for index, claim in enumerate(selected):
        lower = claim.lower()
        suspicious_terms = ["secret", "cover-up", "miracle", "shocking", "they don't want", "guaranteed", "hidden", "silenced"]
        source_terms = ["according to", "reported by", "published", "data from", "study in", "official report", "peer-reviewed"]
        authority_terms = ["experts", "doctors", "scientists", "officials", "insider"]

        if any(term in lower for term in suspicious_terms):
            status = "Suspicious"
            confidence = "Low"
            source_result = "Trusted-source simulation found no clear corroboration."
        elif any(term in lower for term in authority_terms) and not any(term in lower for term in source_terms):
            status = "Uncertain"
            confidence = "Low"
            source_result = "Authority claim appears without a named, verifiable source."
        elif any(term in lower for term in source_terms):
            status = "Verified"
            confidence = "Medium"
            source_result = "Trusted-source simulation found source-style attribution."
        elif re.search(r"\d+|percent|%", lower):
            status = "Uncertain"
            confidence = "Medium"
            source_result = "Numerical claim needs external evidence before sharing."
        else:
            status = "Uncertain"
            confidence = "Low"
            source_result = "Claim is plausible but requires independent verification."

        claims.append(
            {
                "id": index + 1,
                "claim": claim,
                "needs_verification": status != "Verified",
                "status": status,
                "confidence": confidence,
                "source_result": source_result,
                "reliability_score": 80 if status == "Verified" else 42 if status == "Uncertain" else 18,
            }
        )

    return claims
