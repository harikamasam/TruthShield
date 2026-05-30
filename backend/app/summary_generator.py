from typing import Dict, List


def generate_intelligence_summary(
    *,
    scoring: Dict[str, object],
    credibility_signals: Dict[str, object],
    manipulation: Dict[str, object],
    toxicity: Dict[str, object],
    bias: Dict[str, object],
    ai_suspicion: Dict[str, object],
    claims: List[Dict[str, object]],
) -> str:
    strongest = sorted(scoring["signals"].items(), key=lambda item: item[1], reverse=True)[:3]
    strongest_labels = [label.replace("_", " ") for label, value in strongest if value >= 35]

    if not strongest_labels:
        return (
            "This content contains limited high-risk manipulation signals. TruthShield still recommends checking "
            "important claims against trusted primary sources before sharing."
        )

    claim_phrase = (
        f"{len(claims)} extracted claims require verification"
        if any(claim.get("needs_verification") for claim in claims)
        else "the extracted claims include some source-style attribution"
    )
    manipulation_phrase = " and ".join(strongest_labels[:2])

    return (
        f"This narrative shows elevated {manipulation_phrase} signals. {claim_phrase}, while "
        f"{bias['summary'].lower()} {ai_suspicion['summary']} Overall, limited source transparency and "
        "emotionally loaded framing reduce credibility and justify verification before amplification."
    )
