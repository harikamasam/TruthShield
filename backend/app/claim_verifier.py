from collections import Counter
from typing import Dict, List

from .text_utils import clamp, normalize
from .trusted_sources import retrieve_evidence_for_claim


REFUTATION_TERMS = [
    "miracle cure",
    "hidden cure",
    "secret cure",
    "vaccine cure",
    "cover-up",
    "they don't want you to know",
    "suppressed",
    "silenced",
]

MORE_EVIDENCE_TERMS = ["percent", "%", "study", "experts", "scientists", "doctors", "officials", "confirmed"]


def _verification_reasoning(claim: str, status: str, evidence: List[Dict[str, object]]) -> str:
    lower = normalize(claim)
    source_names = ", ".join(str(item["source_name"]) for item in evidence[:3])

    if status == "Refuted":
        if any(term in lower for term in ["medical", "vaccine", "cure", "doctor", "health"]):
            return (
                "This claim contains an unsupported medical assertion and uses secrecy or cure framing without "
                f"supporting signals from trusted public-health sources such as {source_names}."
            )
        return (
            "This claim relies on conspiracy-style or unsupported certainty language. Trusted-source profile "
            "matching found contradictory signals and no reliable attribution in the submitted text."
        )

    if status == "Supported":
        return (
            "The claim includes source-style attribution patterns and avoids high-risk manipulation language. "
            "TruthShield treats this as provisionally supported until live retrieval is connected."
        )

    if status == "Needs More Evidence":
        return (
            "The claim may be testable, but it depends on numbers, expert claims, or institutional statements "
            "that require direct evidence from primary or reputable reporting sources."
        )

    return (
        "The claim is not clearly supported or contradicted by the trusted-source profiles. More direct source "
        "retrieval is needed before making a stronger verification judgment."
    )


def verify_claims(claims: List[Dict[str, object]]) -> List[Dict[str, object]]:
    results = []

    for claim_item in claims:
        claim_text = str(claim_item.get("claim", "")).strip()
        lower = normalize(claim_text)
        sources = retrieve_evidence_for_claim(claim_text)
        contradictory = sum(1 for source in sources if source["verification_status"] == "Refuted")
        supporting = sum(1 for source in sources if source["verification_status"] == "Supported")

        if contradictory >= 2 or any(term in lower for term in REFUTATION_TERMS):
            status = "Refuted"
            confidence = clamp(70 + contradictory * 6 + int(claim_item.get("reliability_score", 50) < 30) * 6, 55, 88)
        elif supporting >= 1 and not any(term in lower for term in REFUTATION_TERMS):
            status = "Supported"
            confidence = clamp(62 + supporting * 8, 55, 86)
        elif any(term in lower for term in MORE_EVIDENCE_TERMS) or any(char.isdigit() for char in lower):
            status = "Needs More Evidence"
            confidence = clamp(58 + len(sources) * 3, 50, 78)
        else:
            status = "Unverified"
            confidence = clamp(48 + len(sources) * 2, 42, 68)

        results.append(
            {
                "claim": claim_text,
                "status": status,
                "confidence": confidence,
                "reasoning": _verification_reasoning(claim_text, status, sources),
                "sources": sources,
            }
        )

    return results


def generate_verification_summary(verification_results: List[Dict[str, object]]) -> str:
    if not verification_results:
        return "No clear factual claims were extracted, but TruthShield still analyzed manipulation and credibility signals."

    counts = {status: 0 for status in ["Supported", "Refuted", "Unverified", "Needs More Evidence"]}
    for result in verification_results:
        counts[str(result["status"])] = counts.get(str(result["status"]), 0) + 1

    category_counts: Counter[str] = Counter()
    for result in verification_results:
        for source in result.get("sources", []):
            if isinstance(source, dict):
                category_counts[str(source.get("source_category") or source.get("category") or "General")] += 1

    strongest_category = category_counts.most_common(1)[0][0] if category_counts else "General"
    checked = len(verification_results)
    fragments = [
        f"TruthShield checked {checked} extracted claim{'s' if checked != 1 else ''} against trusted-source profiles.",
        (
            f"{counts['Supported']} supported, {counts['Refuted']} refuted, "
            f"{counts['Needs More Evidence']} needed more evidence, and {counts['Unverified']} remained unverified."
        ),
        f"{strongest_category}-related evidence was the strongest source category in this pass.",
    ]

    if counts["Refuted"] or counts["Needs More Evidence"] or counts["Unverified"]:
        fragments.append("This content should be verified before sharing.")
    else:
        fragments.append("The content still benefits from primary-source review before broad amplification.")

    return " ".join(fragments)
