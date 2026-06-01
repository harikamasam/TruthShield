from dataclasses import dataclass
from typing import Dict, List

from .text_utils import normalize


@dataclass(frozen=True)
class SourceProfile:
    name: str
    category: str
    trust_level: str
    url: str
    publisher: str
    article_title: str
    published_date: str
    source_type: str
    citation_note: str
    is_live_source: bool
    evidence_type: str
    why_this_matters: str
    keywords: List[str]
    refutation_patterns: List[str]
    support_patterns: List[str]


TRUSTED_SOURCES: List[SourceProfile] = [
    SourceProfile(
        name="WHO",
        category="Health",
        trust_level="Very High",
        url="https://www.who.int/",
        publisher="World Health Organization",
        article_title="WHO Health Topics and Public Health Guidance",
        published_date="Reference source",
        source_type="Public health reference",
        citation_note="Reference hub link; no live web search was performed.",
        is_live_source=False,
        evidence_type="Health",
        why_this_matters="This source is considered highly reliable and is commonly used for fact verification in health-related misinformation investigations.",
        keywords=["health", "medical", "vaccine", "virus", "cure", "disease", "medicine", "doctor"],
        refutation_patterns=["miracle cure", "hidden cure", "secret cure", "vaccine cure", "suppressed cure"],
        support_patterns=["who", "world health organization", "public health guidance", "official health guidance"],
    ),
    SourceProfile(
        name="CDC",
        category="Health",
        trust_level="Very High",
        url="https://www.cdc.gov/",
        publisher="Centers for Disease Control and Prevention",
        article_title="CDC Public Health Guidance",
        published_date="Reference source",
        source_type="Government / Public health",
        citation_note="Reference hub link; no live web search was performed.",
        is_live_source=False,
        evidence_type="Government",
        why_this_matters="This government public-health source publishes evidence-based guidance used to evaluate medical and vaccine-related claims.",
        keywords=["health", "medical", "vaccine", "virus", "cure", "disease", "infection", "doctor"],
        refutation_patterns=["miracle cure", "hidden cure", "secret cure", "vaccine cure", "suppressed cure"],
        support_patterns=["cdc", "centers for disease control", "public health data", "official health report"],
    ),
    SourceProfile(
        name="PubMed",
        category="Health",
        trust_level="High",
        url="https://pubmed.ncbi.nlm.nih.gov/",
        publisher="PubMed",
        article_title="PubMed Biomedical Literature Index",
        published_date="Reference source",
        source_type="Research index",
        citation_note="Reference hub link; no live literature search was performed.",
        is_live_source=False,
        evidence_type="Research",
        why_this_matters="This research index is commonly used to check whether medical claims are supported by peer-reviewed clinical literature.",
        keywords=["study", "clinical", "medicine", "medical", "vaccine", "virus", "treatment", "disease"],
        refutation_patterns=["miracle cure", "guaranteed cure", "doctors confirmed", "scientists proved"],
        support_patterns=["pubmed", "peer-reviewed", "clinical trial", "published study", "medical journal"],
    ),
    SourceProfile(
        name="Nature",
        category="Science",
        trust_level="High",
        url="https://www.nature.com/",
        publisher="Nature",
        article_title="Nature Research Publications",
        published_date="Reference source",
        source_type="Research publisher",
        citation_note="Reference hub link; no live web search was performed.",
        is_live_source=False,
        evidence_type="Research",
        why_this_matters="This research publisher is used to evaluate whether scientific claims are supported by credible peer-reviewed evidence.",
        keywords=["science", "study", "research", "scientists", "climate", "biology", "physics"],
        refutation_patterns=["scientists proved", "secret study", "hidden research", "suppressed study"],
        support_patterns=["nature", "peer-reviewed", "published in nature", "research article"],
    ),
    SourceProfile(
        name="ScienceDirect",
        category="Science",
        trust_level="High",
        url="https://www.sciencedirect.com/",
        publisher="ScienceDirect",
        article_title="ScienceDirect Research Database",
        published_date="Reference source",
        source_type="Research database",
        citation_note="Reference hub link; no live database search was performed.",
        is_live_source=False,
        evidence_type="Research",
        why_this_matters="This research platform helps assess whether technical or scientific claims align with published academic literature.",
        keywords=["science", "study", "research", "scientists", "technology", "data"],
        refutation_patterns=["scientists proved", "secret study", "hidden research", "suppressed study"],
        support_patterns=["sciencedirect", "peer-reviewed", "published study", "research article"],
    ),
    SourceProfile(
        name="Reuters",
        category="General",
        trust_level="High",
        url="https://www.reuters.com/fact-check/",
        publisher="Reuters Fact Check",
        article_title="Reuters Fact Check Hub",
        published_date="Reference source",
        source_type="Fact-check / News",
        citation_note="Reference hub link; no live web search was performed.",
        is_live_source=False,
        evidence_type="News",
        why_this_matters="This wire-service source is widely used for cross-checking whether major public claims appear in verified reporting.",
        keywords=["breaking", "officials", "government", "election", "court", "market", "media"],
        refutation_patterns=["secret sources", "mainstream media", "hidden truth", "everyone knows"],
        support_patterns=["reuters", "reported by reuters", "news agency", "official statement"],
    ),
    SourceProfile(
        name="AP News",
        category="General",
        trust_level="High",
        url="https://apnews.com/hub/ap-fact-check",
        publisher="AP Fact Check",
        article_title="AP Fact Check Hub",
        published_date="Reference source",
        source_type="Fact-check / News",
        citation_note="Reference hub link; no live web search was performed.",
        is_live_source=False,
        evidence_type="News",
        why_this_matters="This wire-service source is commonly used to validate public-interest claims against independent verified reporting.",
        keywords=["breaking", "officials", "government", "election", "court", "market", "media"],
        refutation_patterns=["secret sources", "mainstream media", "hidden truth", "everyone knows"],
        support_patterns=["ap news", "associated press", "reported by ap", "official statement"],
    ),
]


def find_relevant_sources(claim: str) -> List[SourceProfile]:
    lower = normalize(claim)
    matches = [source for source in TRUSTED_SOURCES if any(keyword in lower for keyword in source.keywords)]
    return matches[:4] if matches else TRUSTED_SOURCES[-2:]


def _refuted_summary(source: SourceProfile, claim: str) -> str:
    lower = normalize(claim)

    if source.name == "WHO":
        if "vaccine" in lower and "cure" in lower:
            return "WHO has not published evidence supporting the existence of a hidden miracle vaccine cure."
        return "WHO guidance does not support this extraordinary health claim based on the submitted evidence."
    if source.name == "CDC":
        if "vaccine" in lower or "cure" in lower:
            return "CDC guidance requires peer-reviewed clinical validation for extraordinary vaccine effectiveness claims."
        return "CDC public-health guidance does not provide support for this medical assertion."
    if source.name == "PubMed":
        return "No peer-reviewed publication was identified that supports the submitted claim."
    if source.name == "Reuters":
        if "official" in lower or "suppress" in lower or "hidden" in lower:
            return "No verified Reuters reporting supports the claim that officials are suppressing a vaccine cure."
        return "No verified Reuters reporting supports the submitted claim."
    if source.name == "AP News":
        return "No AP News verification signal supports the claim based on the submitted evidence pattern."
    if source.name == "Nature":
        return "No Nature research signal supports this extraordinary scientific assertion."
    if source.name == "ScienceDirect":
        return "No ScienceDirect research signal supports the submitted scientific claim."

    return f"No trusted {source.category.lower()} evidence supports this claim."


def _supported_summary(source: SourceProfile) -> str:
    if source.evidence_type == "News":
        return f"The claim references {source.name}-style attribution, which is a useful starting point for verification."
    if source.evidence_type == "Research":
        return f"The claim uses research-style attribution associated with {source.name}, but primary-source review is still required."
    return f"The claim includes source-style language associated with {source.name}; external confirmation is still recommended."


def retrieve_evidence_for_claim(claim: str) -> List[Dict[str, object]]:
    """Simulate trusted-source evidence retrieval using transparent source profiles.

    This is deliberately conservative: it reports matching evidence patterns and absence
    of support signals without pretending to browse live sources.
    """
    lower = normalize(claim)
    evidence = []

    for source in find_relevant_sources(claim):
        support_hits = [pattern for pattern in source.support_patterns if pattern in lower]
        refute_hits = [pattern for pattern in source.refutation_patterns if pattern in lower]

        if support_hits and not refute_hits:
            status = "Supported"
            confidence = 84 if source.trust_level == "Very High" else 78
            evidence_strength = 82 if source.trust_level == "Very High" else 76
            summary = _supported_summary(source)
            reasoning = (
                f"The submitted text references source-style language that maps to {source.category.lower()} evidence profiles, "
                "and no strong contradiction pattern was detected."
            )
        elif refute_hits:
            status = "Refuted"
            confidence = 92 if source.trust_level == "Very High" else 86
            evidence_strength = 92 if source.trust_level == "Very High" else 86
            summary = _refuted_summary(source, claim)
            reasoning = (
                f"The claim uses high-impact assertion language while lacking verified backing from {source.name}'s trusted-source profile."
            )
        else:
            status = "Unverified"
            confidence = 64 if source.trust_level == "Very High" else 58
            evidence_strength = 54 if source.trust_level == "Very High" else 48
            summary = f"{source.name} did not provide a direct trusted-source style match for the submitted claim."
            reasoning = (
                "The trusted-source profile was relevant to the claim topic, but the submitted text did not include enough "
                "source attribution or evidence detail to support a stronger verdict."
            )

        evidence.append(
            {
                "source_name": source.name,
                "source_category": source.category,
                "source_url": source.url,
                "publisher": source.publisher,
                "article_title": source.article_title,
                "published_date": source.published_date,
                "source_type": source.source_type,
                "citation_note": source.citation_note,
                "is_live_source": source.is_live_source,
                "evidence_type": source.evidence_type,
                "evidence_strength": evidence_strength,
                "evidence_summary": summary,
                "reasoning": reasoning,
                "why_this_matters": source.why_this_matters,
                "confidence": confidence,
                "trust_level": source.trust_level,
                "verification_status": status,
                # Backward-compatible keys for existing UI consumers.
                "source": source.name,
                "category": source.category,
                "summary": summary,
            }
        )

    return evidence
