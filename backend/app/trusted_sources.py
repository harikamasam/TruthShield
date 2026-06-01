from dataclasses import dataclass
from typing import Dict, List

from .text_utils import normalize


@dataclass(frozen=True)
class SourceProfile:
    name: str
    category: str
    trust_level: str
    url: str
    keywords: List[str]
    refutation_patterns: List[str]
    support_patterns: List[str]


TRUSTED_SOURCES: List[SourceProfile] = [
    SourceProfile(
        name="WHO",
        category="Health",
        trust_level="Very High",
        url="https://www.who.int",
        keywords=["health", "medical", "vaccine", "virus", "cure", "disease", "medicine", "doctor"],
        refutation_patterns=["miracle cure", "hidden cure", "secret cure", "vaccine cure", "suppressed cure"],
        support_patterns=["who", "world health organization", "public health guidance", "official health guidance"],
    ),
    SourceProfile(
        name="CDC",
        category="Health",
        trust_level="Very High",
        url="https://www.cdc.gov",
        keywords=["health", "medical", "vaccine", "virus", "cure", "disease", "infection", "doctor"],
        refutation_patterns=["miracle cure", "hidden cure", "secret cure", "vaccine cure", "suppressed cure"],
        support_patterns=["cdc", "centers for disease control", "public health data", "official health report"],
    ),
    SourceProfile(
        name="PubMed",
        category="Health",
        trust_level="High",
        url="https://pubmed.ncbi.nlm.nih.gov",
        keywords=["study", "clinical", "medicine", "medical", "vaccine", "virus", "treatment", "disease"],
        refutation_patterns=["miracle cure", "guaranteed cure", "doctors confirmed", "scientists proved"],
        support_patterns=["pubmed", "peer-reviewed", "clinical trial", "published study", "medical journal"],
    ),
    SourceProfile(
        name="Nature",
        category="Science",
        trust_level="High",
        url="https://www.nature.com",
        keywords=["science", "study", "research", "scientists", "climate", "biology", "physics"],
        refutation_patterns=["scientists proved", "secret study", "hidden research", "suppressed study"],
        support_patterns=["nature", "peer-reviewed", "published in nature", "research article"],
    ),
    SourceProfile(
        name="ScienceDirect",
        category="Science",
        trust_level="High",
        url="https://www.sciencedirect.com",
        keywords=["science", "study", "research", "scientists", "technology", "data"],
        refutation_patterns=["scientists proved", "secret study", "hidden research", "suppressed study"],
        support_patterns=["sciencedirect", "peer-reviewed", "published study", "research article"],
    ),
    SourceProfile(
        name="Reuters",
        category="General",
        trust_level="High",
        url="https://www.reuters.com",
        keywords=["breaking", "officials", "government", "election", "court", "market", "media"],
        refutation_patterns=["secret sources", "mainstream media", "hidden truth", "everyone knows"],
        support_patterns=["reuters", "reported by reuters", "news agency", "official statement"],
    ),
    SourceProfile(
        name="AP News",
        category="General",
        trust_level="High",
        url="https://apnews.com",
        keywords=["breaking", "officials", "government", "election", "court", "market", "media"],
        refutation_patterns=["secret sources", "mainstream media", "hidden truth", "everyone knows"],
        support_patterns=["ap news", "associated press", "reported by ap", "official statement"],
    ),
]


def find_relevant_sources(claim: str) -> List[SourceProfile]:
    lower = normalize(claim)
    matches = [source for source in TRUSTED_SOURCES if any(keyword in lower for keyword in source.keywords)]
    return matches[:4] if matches else TRUSTED_SOURCES[-2:]


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
            summary = f"Claim includes attribution patterns associated with {source.name}; external confirmation is still recommended."
            reasoning = (
                f"The submitted text references source-style language that maps to {source.category.lower()} evidence profiles, "
                "and no strong contradiction pattern was detected."
            )
        elif refute_hits:
            status = "Refuted"
            confidence = 92 if source.trust_level == "Very High" else 86
            summary = f"No trusted {source.category.lower()} evidence signal supports this claim pattern."
            reasoning = (
                f"The claim uses wording commonly associated with unsupported assertions while lacking verified backing from {source.name}."
            )
        else:
            status = "Unverified"
            confidence = 64 if source.trust_level == "Very High" else 58
            summary = f"No direct trusted-source style evidence was available from {source.name} for this claim."
            reasoning = (
                "The trusted-source profile was relevant to the claim topic, but the submitted text did not include enough "
                "source attribution or evidence detail to support a stronger verdict."
            )

        evidence.append(
            {
                "source_name": source.name,
                "source_category": source.category,
                "source_url": source.url,
                "evidence_summary": summary,
                "reasoning": reasoning,
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
