# TruthShield

**AI Trust Intelligence Platform for misinformation, propaganda, toxicity, and AI-generated narrative analysis.**

TruthShield analyzes online content and produces an explainable **Trust Intelligence Report**. It is built to feel like a serious AI product: a cinematic scan flow on the frontend, a modular FastAPI analysis pipeline on the backend, weighted signal scoring, manipulation detection, claim extraction, claim verification, confidence scoring, and analyst-style summaries.

## Project Summary

TruthShield helps users evaluate risky narratives before sharing them. A user can paste a tweet, article, forwarded message, or headline, then receive a structured report covering:

- Credibility Risk
- Manipulation Signals
- Narrative Risk
- Toxicity
- Propaganda and bias patterns
- AI-generated content suspicion
- Claim reliability
- Claim Verification Engine with explainable verdicts
- Sources & Evidence Panel with trusted-source evidence mapping
- Final sharing recommendation

## Architecture

```text
TruthShield/
  backend/
    app/
      main.py
      claim_extractor.py
      claim_verifier.py
      trusted_sources.py
      source_retriever.py
      credibility_analyzer.py
      manipulation_detector.py
      toxicity_analyzer.py
      bias_detector.py
      ai_content_detector.py
      risk_scoring.py
      summary_generator.py
      sample_content.py
  frontend/
    src/
      App.jsx
      api.js
      components/
        AnalyzerInput.jsx
        LiveScanOverlay.jsx
        ClaimVerificationReport.jsx
        ReportNarrativeHeader.jsx
        SignalScoringSection.jsx
        ManipulationVisualizer.jsx
        SocialIntelPreview.jsx
```

## Backend Intelligence Modules

- **Claim Extraction**: extracts high-impact factual claims and assigns verification-style labels.
- **Claim Verification Engine**: classifies extracted claims as supported, refuted, unverified, or needing more evidence using conservative trusted-source style evidence mapping.
- **Trusted Source System**: maintains source profiles for WHO, CDC, PubMed, Reuters, AP News, Nature, and ScienceDirect, with category, trust level, source URL, evidence summaries, and explainable source-level reasoning.
- **Trusted Source Reference Links**: adds stable public reference hub links, source metadata, citation notes, and reference-source badges without claiming live article verification.
- **Source Retriever Interface**: exposes a deploy-safe `retrieve_sources_for_claim()` placeholder that can later connect to Tavily, SerpAPI, Google Custom Search, News API, Gemini/OpenAI retrieval, or RAG pipelines.
- **Credibility Engine**: detects source absence, sensational wording, urgency manipulation, unsupported authority claims, conspiracy phrasing, and clickbait.
- **Manipulation Engine**: detects fear appeal, outrage amplification, emotional coercion, one-sided framing, propaganda language, divisive wording, and psychological triggers.
- **Toxicity Engine**: detects harmful, abusive, threatening, and harassing language.
- **Bias and Propaganda Engine**: identifies one-sided claims, institutional distrust framing, political/social bias, and sensational framing.
- **AI-Generated Suspicion Engine**: analyzes repetitive structure, generic wording, low-specificity patterns, unnatural transitions, and synthetic sentence rhythm.
- **Risk Scoring Engine**: combines weighted signals into trust score, confidence score, risk level, and recommendation.
- **Summary Generator**: creates an analyst-style intelligence summary for the report.

## API Overview

### `POST /analyze`

Returns both compatibility fields and enhanced intelligence fields:

- `trust_score`
- `confidence_score`
- `risk_level`
- `credibility_label`
- `recommendation`
- `intelligence_summary`
- `verification_summary`
- `claim_verification`
- `analysis_steps`
- `key_claims`
- `red_flags`
- `toxicity`
- `bias`
- `manipulation`
- `ai_generated_suspicion`
- `scoring.signals`
- `scoring.weights`

### `GET /samples`

Returns realistic demo samples for misinformation, propaganda, AI-generated writing, toxic political content, and sensational narrative risk.

## Frontend Experience

- Premium product landing page
- Real-world content presets
- Live AI scan overlay with analysis timeline
- Trust score and confidence score
- Analyst-style intelligence summary
- Claim Verification Report
- Sources & Evidence Panel with grouped evidence cards, source metadata, citation notes, and clickable reference hub links
- Manipulation Intelligence section
- Signal-Based Risk Scoring section
- Claim verification table
- Explainable verification reasoning for each claim, source, and verdict
- Red flag explanations
- Before You Share recommendation panel
- Browser extension and narrative-risk product mockups



## Local Setup

Backend:

```bash
cd backend
python -m venv ../.venv
../.venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Build:

```bash
npm --prefix frontend run build
```

## Recruiter-Focused Technical Highlights

- Built a full-stack AI trust intelligence platform with React, Tailwind CSS, FastAPI, and modular Python analyzers.
- Designed an explainable weighted scoring pipeline for credibility risk, manipulation signals, toxicity, propaganda, claim reliability, claim verification, and AI-generated suspicion.
- Built a Claim Verification Engine and Evidence Intelligence Panel using modular trusted-source profiles, reference hub links, source metadata, source-level evidence summaries, and explainable citation notes.
- Implemented a dedicated manipulation detection engine for fear appeal, outrage amplification, emotional coercion, one-sided framing, and divisive language.
- Added confidence scoring, intelligence summaries, analysis timeline data, and realistic sample content endpoints.
- Created a polished product experience with live scan storytelling, signal visualizations, report export UI, and browser extension mockups.

## Future Improvements

- Gemini/OpenAI integration for deeper reasoning and claim decomposition
- Live source retrieval using Tavily, SerpAPI, Google Custom Search, News API, Gemini/OpenAI retrieval, or a RAG pipeline
- Real source verification using trusted medical, government, academic, and fact-checking sources
- Vector search for semantic source matching
- Browser extension content capture and webpage scanning
- Live narrative-risk monitoring
- Report history, user accounts, and PDF export
- Evaluation dataset for confidence calibration

## Disclaimer

TruthShield is decision-support software. It uses explainable heuristic scoring and trusted-source reference mapping today, not real-time web search. It is architected for deeper model-backed and live-retrieval analysis later, and should not be treated as a definitive truth oracle.
