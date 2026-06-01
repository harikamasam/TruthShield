# TruthShield Backend

FastAPI service for explainable trust intelligence, misinformation risk analysis, manipulation detection, toxicity analysis, claim extraction, claim verification, trusted-source evidence mapping, and AI-authorship suspicion.

## Run

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API docs: `http://localhost:8000/docs`

## Analysis Pipeline

`POST /analyze` runs a modular intelligence pipeline:

1. Claim extraction and simulated source-verification labels
2. Claim Verification Engine with source-level evidence summaries
3. Trusted-source evidence mapping across WHO, CDC, PubMed, Reuters, AP News, Nature, and ScienceDirect profiles
4. Toxicity and harm analysis
5. Bias and propaganda pattern detection
6. Manipulation tactic detection
7. AI-generated content suspicion analysis
8. Weighted trust scoring
9. Analyst-style intelligence summary generation

The response preserves the original frontend fields while adding future-ready fields such as `confidence_score`, `analysis_steps`, `manipulation`, `scoring`, `intelligence_summary`, `verification_summary`, and `claim_verification`.
