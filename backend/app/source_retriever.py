from typing import Dict, List

from .trusted_sources import retrieve_evidence_for_claim


def retrieve_sources_for_claim(claim: str) -> List[Dict[str, object]]:
    """Return source metadata for a claim without calling external services.

    Future retrieval adapters can plug in here for Tavily, SerpAPI, Google
    Custom Search, News API, Gemini/OpenAI retrieval, or a RAG pipeline. The
    current implementation intentionally uses trusted-source reference mapping
    only, so it remains deploy-safe and does not imply live web verification.
    """
    return retrieve_evidence_for_claim(claim)
