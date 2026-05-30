const risks = [
  {
    title: "Fear-driven vaccine misinformation rising",
    risk: "High",
    type: "Fear appeal",
    trust: "31/100",
    source: "Messaging apps"
  },
  {
    title: "AI-generated political narratives detected",
    risk: "Medium",
    type: "Synthetic framing",
    trust: "48/100",
    source: "Social feeds"
  },
  {
    title: "Manipulative outrage content trending",
    risk: "High",
    type: "Outrage amplification",
    trust: "27/100",
    source: "Short posts"
  }
];

export default function TrendingNarrativeRisks() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-kicker">Live intelligence feed</p>
            <h2 className="mt-3 text-5xl font-black leading-none tracking-[-0.065em] text-neutral-950">
              Trending Narrative Risks
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-neutral-600 lg:justify-self-end">
            A product-level view of what TruthShield could monitor across social and news surfaces.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {risks.map((risk) => (
            <article key={risk.title} className="feed-risk-card">
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black text-white">{risk.risk} risk</span>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-neutral-400">{risk.source}</span>
              </div>
              <h3 className="text-2xl font-black leading-none tracking-[-0.05em] text-neutral-950">{risk.title}</h3>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <Meta label="Manipulation" value={risk.type} />
                <Meta label="Trust rating" value={risk.trust} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">{label}</p>
      <p className="mt-2 text-sm font-black text-neutral-950">{value}</p>
    </div>
  );
}
