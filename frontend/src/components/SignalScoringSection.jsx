const LABELS = {
  source_transparency: "Source transparency",
  emotional_manipulation: "Emotional manipulation",
  toxicity: "Toxicity",
  propaganda: "Propaganda",
  ai_generated_suspicion: "AI suspicion",
  claim_reliability: "Claim reliability",
  sensational_wording: "Sensational wording"
};

function fallbackSignals(report) {
  return {
    source_transparency: Math.max(0, report.trust_score),
    emotional_manipulation: report.manipulation?.manipulation_score ?? 0,
    toxicity: report.toxicity?.toxicity_score ?? 0,
    propaganda: report.bias?.bias_score ?? 0,
    ai_generated_suspicion: report.ai_generated_suspicion?.probability ?? 0,
    claim_reliability: Math.min(100, (report.key_claims || []).filter((claim) => claim.needs_verification).length * 18),
    sensational_wording: Math.min(100, (report.red_flags || []).length * 12)
  };
}

export default function SignalScoringSection({ report }) {
  const signals = report.scoring?.signals || fallbackSignals(report);
  const weights = report.scoring?.weights || {};
  const rows = Object.entries(LABELS).map(([key, label]) => ({
    key,
    label,
    value: Number(signals[key] ?? 0),
    weight: weights[key]
  }));

  return (
    <section className="report-section reveal-in p-6 sm:p-8">
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="section-kicker">Signal-Based Risk Scoring</p>
          <h2 className="mt-3 text-5xl font-black leading-[0.95] tracking-[-0.065em] text-neutral-950">
            Explainable signals behind every trust decision.
          </h2>
        </div>
        <p className="text-base leading-8 text-neutral-600">
          Each backend signal contributes to the trust score with an explainable weight, showing how the system reasons across credibility, manipulation, toxicity, propaganda, claims, and AI suspicion.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {rows.map((row, index) => (
          <article key={row.key} className="rounded-[1.5rem] border border-neutral-200 bg-[#f6f4ef] p-5" style={{ animationDelay: `${index * 70}ms` }}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-black tracking-[-0.03em] text-neutral-950">{row.label}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
                  {row.weight ? `${Math.round(row.weight * 100)}% scoring weight` : "Derived signal"}
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-neutral-700">{Math.round(row.value)}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white">
              <div className="signal-fill h-full rounded-full bg-neutral-950" style={{ width: `${Math.min(100, Math.max(0, row.value))}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
