from typing import Dict, List

from .text_utils import clamp


def _claim_risk(claims: List[Dict[str, object]]) -> int:
    suspicious = sum(1 for claim in claims if claim.get("status") == "Suspicious")
    uncertain = sum(1 for claim in claims if claim.get("status") == "Uncertain")
    verified = sum(1 for claim in claims if claim.get("status") == "Verified")
    return clamp(suspicious * 26 + uncertain * 12 - verified * 10)


def score_trust(
    *,
    credibility_signals: Dict[str, object],
    claims: List[Dict[str, object]],
    toxicity: Dict[str, object],
    bias: Dict[str, object],
    manipulation: Dict[str, object],
    ai_suspicion: Dict[str, object],
) -> Dict[str, object]:
    signal_scores = {
        "source_transparency": clamp(100 - int(credibility_signals["source_absence_score"])),
        "emotional_manipulation": int(manipulation["manipulation_score"]),
        "toxicity": int(toxicity["toxicity_score"]),
        "propaganda": int(bias["bias_score"]),
        "ai_generated_suspicion": int(ai_suspicion["probability"]),
        "claim_reliability": _claim_risk(claims),
        "sensational_wording": int(credibility_signals["sensational_score"]),
    }

    weights = {
        "source_transparency": 0.18,
        "emotional_manipulation": 0.18,
        "toxicity": 0.12,
        "propaganda": 0.17,
        "ai_generated_suspicion": 0.10,
        "claim_reliability": 0.17,
        "sensational_wording": 0.08,
    }

    risk_pressure = (
        (100 - signal_scores["source_transparency"]) * weights["source_transparency"]
        + signal_scores["emotional_manipulation"] * weights["emotional_manipulation"]
        + signal_scores["toxicity"] * weights["toxicity"]
        + signal_scores["propaganda"] * weights["propaganda"]
        + signal_scores["ai_generated_suspicion"] * weights["ai_generated_suspicion"]
        + signal_scores["claim_reliability"] * weights["claim_reliability"]
        + signal_scores["sensational_wording"] * weights["sensational_wording"]
    )

    trust_score = clamp(98 - risk_pressure * 1.45, 4, 98)
    confidence_score = clamp(
        58
        + len(claims) * 4
        + len(credibility_signals["signals"]) * 3
        + len(manipulation["detected_tactics"]) * 3
        + (8 if toxicity["signals"] else 0),
        45,
        96,
    )

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

    if trust_score >= 72 and toxicity["severity"] != "High":
        recommendation = "Safe"
    elif trust_score >= 42:
        recommendation = "Verify Before Sharing"
    else:
        recommendation = "High Risk"

    return {
        "trust_score": trust_score,
        "confidence_score": confidence_score,
        "risk_level": risk_level,
        "credibility_label": credibility_label,
        "recommendation": recommendation,
        "signals": signal_scores,
        "weights": weights,
    }
