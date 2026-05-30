import { Bot, Fingerprint, Flame, SearchCheck } from "lucide-react";

export default function HowTruthShieldThinks({ report }) {
  const items = [
    {
      icon: SearchCheck,
      title: "Credibility signals",
      detail: `${report.key_claims.length} claim${report.key_claims.length === 1 ? "" : "s"} extracted and reviewed for source transparency.`
    },
    {
      icon: Fingerprint,
      title: "Manipulation patterns",
      detail: report.bias.summary
    },
    {
      icon: Flame,
      title: "Toxicity risks",
      detail: report.toxicity.summary
    },
    {
      icon: Bot,
      title: "AI-generated suspicion",
      detail: report.ai_generated_suspicion.summary
    }
  ];

  return (
    <section id="thinking" className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-soft sm:p-10">
      <div className="mb-10 max-w-3xl">
        <p className="section-kicker">Method</p>
        <h2 className="mt-4 text-5xl font-black tracking-[-0.06em] text-neutral-950">How TruthShield Thinks</h2>
        <p className="mt-5 text-base leading-8 text-neutral-600">
          The report combines credibility, manipulation, toxicity, and authorship-style signals into an explainable trust assessment.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-3xl border border-neutral-200 bg-stone-50 p-6">
              <div className="mb-8 grid h-12 w-12 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-800">
                <Icon size={21} />
              </div>
              <h3 className="text-2xl font-black tracking-[-0.04em] text-neutral-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{item.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
