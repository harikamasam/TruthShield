# TruthShield Backend

FastAPI service for explainable trust intelligence, misinformation risk analysis, manipulation detection, toxicity analysis, claim extraction, and AI-authorship suspicion.

## Run

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API docs: `http://localhost:8000/docs`

## Analysis Pipeline

`POST /analyze` runs a modular intelligence pipeline:

1. Claim extraction and simulated source-verification labels
2. Toxicity and harm analysis
3. Bias and propaganda pattern detection
4. Manipulation tactic detection
5. AI-generated content suspicion analysis
6. Weighted trust scoring
7. Analyst-style intelligence summary generation

The response preserves the original frontend fields while adding future-ready fields such as `confidence_score`, `analysis_steps`, `manipulation`, `scoring`, and `intelligence_summary`.
