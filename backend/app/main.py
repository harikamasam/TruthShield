from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .ai_content_detector import detect_ai_content
from .bias_detector import detect_bias
from .claim_verifier import generate_verification_summary, verify_claims
from .claim_extractor import extract_claims
from .credibility_analyzer import analyze_credibility, analyze_credibility_signals
from .manipulation_detector import detect_manipulation
from .risk_scoring import score_trust
from .sample_content import SAMPLE_CONTENT
from .summary_generator import generate_intelligence_summary
from .toxicity_analyzer import analyze_toxicity


class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=10, max_length=12000)


app = FastAPI(
    title="TruthShield API",
    description="AI-powered trust and misinformation analysis platform.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "TruthShield API"}


@app.get("/health")
def health_check_alias():
    return health_check()


@app.get("/samples")
def get_samples():
    return {"samples": SAMPLE_CONTENT}


@app.post("/analyze")
def analyze_content(payload: AnalyzeRequest):
    text = payload.text.strip()
    if len(text) < 10:
        raise HTTPException(status_code=400, detail="Please provide at least 10 characters.")

    claims = extract_claims(text)
    verification_results = verify_claims(claims)
    verification_summary = generate_verification_summary(verification_results)
    toxicity = analyze_toxicity(text)
    bias = detect_bias(text)
    manipulation = detect_manipulation(text)
    ai_suspicion = detect_ai_content(text)
    credibility_signals = analyze_credibility_signals(text)
    scoring = score_trust(
        credibility_signals=credibility_signals,
        claims=claims,
        verification_results=verification_results,
        toxicity=toxicity,
        bias=bias,
        manipulation=manipulation,
        ai_suspicion=ai_suspicion,
    )
    credibility = analyze_credibility(text, claims, toxicity, bias, manipulation, scoring)
    intelligence_summary = generate_intelligence_summary(
        scoring=scoring,
        credibility_signals=credibility_signals,
        manipulation=manipulation,
        toxicity=toxicity,
        bias=bias,
        ai_suspicion=ai_suspicion,
        claims=claims,
    )
    analysis_steps = [
        "Scanning narrative structure",
        "Extracting checkable claims",
        "Comparing claims with trusted-source profiles",
        "Detecting emotional manipulation",
        "Checking credibility signals",
        "Analyzing propaganda indicators",
        "Estimating AI-generated probability",
        "Generating trust intelligence report",
    ]

    return {
        "input_length": len(text),
        "trust_score": credibility["trust_score"],
        "confidence_score": credibility["confidence_score"],
        "risk_level": credibility["risk_level"],
        "credibility_label": credibility["credibility_label"],
        "recommendation": credibility["recommendation"],
        "summary": intelligence_summary,
        "intelligence_summary": intelligence_summary,
        "verification_summary": verification_summary,
        "claim_verification": verification_results,
        "analysis_steps": analysis_steps,
        "key_claims": claims,
        "red_flags": credibility["red_flags"],
        "toxicity": toxicity,
        "bias": bias,
        "manipulation": manipulation,
        "ai_generated_suspicion": ai_suspicion,
        "scoring": {
            "signals": scoring["signals"],
            "weights": scoring["weights"],
        },
    }
