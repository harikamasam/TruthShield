from typing import Dict, List


BIAS_SIGNALS = {
    "fear appeal": ["dangerous", "threat", "panic", "destroy", "collapse", "invasion"],
    "emotional manipulation": ["shocking", "heartbreaking", "outrage", "betrayed", "wake up"],
    "one-sided claims": ["everyone knows", "no one can deny", "only explanation", "all experts agree"],
    "political/social bias": ["radical", "corrupt elite", "mainstream media", "propaganda machine"],
    "sensational language": ["explosive", "bombshell", "secret", "exposed", "you won't believe"],
    "divisive identity framing": ["real citizens", "patriots", "traitors", "enemy within", "us vs them"],
    "institutional distrust framing": ["they are hiding", "media won't tell you", "official narrative", "silenced"],
}


def detect_bias(text: str) -> Dict[str, object]:
    lower = text.lower()
    detected: List[Dict[str, object]] = []

    for label, phrases in BIAS_SIGNALS.items():
        hits = [phrase for phrase in phrases if phrase in lower]
        if hits:
            detected.append({"type": label, "signals": hits})

    score = min(100, len(detected) * 18 + sum(len(item["signals"]) for item in detected) * 7)
    if score >= 65:
        level = "High"
    elif score >= 30:
        level = "Medium"
    else:
        level = "Low"

    explanations = [
        f"{item['type']} detected through signals: {', '.join(item['signals'][:3])}."
        for item in detected
    ]

    return {
        "level": level,
        "bias_score": score,
        "patterns": detected,
        "explanations": explanations,
        "summary": "Propaganda or bias patterns are present." if detected else "No major propaganda patterns detected.",
    }
