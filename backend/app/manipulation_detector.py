from typing import Dict, List

from .text_utils import clamp, score_hits


MANIPULATION_RULES = {
    "fear appeal": ["dangerous", "threat", "panic", "terrified", "protect your family", "before it is too late"],
    "outrage amplification": ["outrage", "betrayed", "corrupt", "scandal", "traitor", "they are hiding"],
    "emotional coercion": ["share now", "wake up", "do not ignore", "everyone must know", "silence us"],
    "one-sided framing": ["everyone knows", "no one can deny", "only explanation", "real citizens", "the truth is obvious"],
    "propaganda language": ["mainstream media", "cover-up", "hidden truth", "exposed", "secret agenda", "propaganda machine"],
    "divisive wording": ["us vs them", "enemy", "corrupt elite", "radical", "patriots", "traitors"],
    "psychological trigger patterns": ["breaking", "shocking", "bombshell", "you won't believe", "before they delete"],
}


TACTIC_EXPLANATIONS = {
    "fear appeal": "Uses threat or safety language to trigger urgency-driven reactions.",
    "outrage amplification": "Frames the narrative to provoke anger and increase sharing pressure.",
    "emotional coercion": "Pushes the reader toward immediate action before independent verification.",
    "one-sided framing": "Presents a complex issue as if only one interpretation is possible.",
    "propaganda language": "Uses institutional distrust or cover-up framing common in propaganda narratives.",
    "divisive wording": "Creates in-group/out-group pressure that reduces neutral evaluation.",
    "psychological trigger patterns": "Uses high-arousal wording associated with clickbait or viral manipulation.",
}


def detect_manipulation(text: str) -> Dict[str, object]:
    detected = score_hits(text, MANIPULATION_RULES)
    tactics: List[Dict[str, object]] = []

    for item in detected:
        tactic = item["type"]
        hits = item["signals"]
        tactics.append(
            {
                "tactic": tactic,
                "signals": hits[:5],
                "severity": "High" if len(hits) >= 2 else "Medium",
                "explanation": TACTIC_EXPLANATIONS[tactic],
            }
        )

    score = clamp(sum(14 + len(item["signals"]) * 6 for item in detected))
    if score >= 70:
        level = "High"
    elif score >= 35:
        level = "Medium"
    else:
        level = "Low"

    explanations = [item["explanation"] for item in tactics]
    if not explanations:
        explanations = ["No strong manipulation tactics were detected from the current heuristic signal set."]

    return {
        "level": level,
        "manipulation_score": score,
        "detected_tactics": tactics,
        "explanations": explanations,
        "summary": "Manipulation tactics are present." if tactics else "No major manipulation tactics detected.",
    }
