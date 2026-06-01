from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_analyze_returns_enhanced_intelligence_fields():
    response = client.post(
        "/analyze",
        json={
            "text": (
                "BREAKING: Secret sources say doctors confirmed a miracle cure is being hidden by corrupt officials. "
                "Share now before the mainstream media removes it."
            )
        },
    )

    assert response.status_code == 200
    data = response.json()

    assert "trust_score" in data
    assert "confidence_score" in data
    assert "analysis_steps" in data
    assert "intelligence_summary" in data
    assert "verification_summary" in data
    assert "claim_verification" in data
    assert "manipulation" in data
    assert "scoring" in data
    assert data["manipulation"]["manipulation_score"] > 0
    assert data["key_claims"]
    assert data["claim_verification"]
    assert data["claim_verification"][0]["status"] in {"Supported", "Refuted", "Unverified", "Needs More Evidence"}
    assert data["claim_verification"][0]["sources"]
    assert "source_name" in data["claim_verification"][0]["sources"][0]
    assert "evidence_summary" in data["claim_verification"][0]["sources"][0]
    assert "source_url" in data["claim_verification"][0]["sources"][0]
    assert "publisher" in data["claim_verification"][0]["sources"][0]
    assert "article_title" in data["claim_verification"][0]["sources"][0]
    assert "citation_note" in data["claim_verification"][0]["sources"][0]
    assert data["claim_verification"][0]["sources"][0]["is_live_source"] is False
    assert "claim_verification" in data["scoring"]["signals"]
    assert data["red_flags"]


def test_samples_endpoint_returns_realistic_presets():
    response = client.get("/samples")

    assert response.status_code == 200
    samples = response.json()["samples"]
    assert len(samples) >= 5
    assert {sample["id"] for sample in samples} >= {
        "medical-misinformation",
        "propaganda-tweet",
        "ai-generated-article",
    }
