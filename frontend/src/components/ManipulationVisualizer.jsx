function severityValue(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("high") || normalized.includes("severe")) return 86;
  if (normalized.includes("medium") || normalized.includes("moderate")) return 62;
  if (normalized.includes("low")) return 28;
  return 44;
}

function fallbackMetrics(report) {
  const redFlagBoost = Math.min(28, (report.red_flags?.length || 0) * 5);
  return [
    { label: "Fear Appeal", value: Math.min(95, 42 + redFlagBoost) },
    { label: "Emotional Manipulation", value: severityValue(report.toxicity.severity) + (redFlagBoost > 10 ? 8 : 0) },
    { label: "Source Credibility", value: Math.max(10, report.trust_score) },
    { label: "Propaganda Probability", value: Math.min(94, severityValue(report.bias.level) + redFlagBoost) },
    { label: "Toxicity", value: severityValue(report.toxicity.severity) },
    { label: "AI-generated Suspicion", value: report.ai_generated_suspicion.probability }
  ];
}

export default function ManipulationVisualizer({ report }) {
  const manipulation = report.manipulation;
  const tactics = manipulation?.detected_tactics || [];
  const metrics = fallbackMetrics(report);

  return (
    <section className="report-section reveal-in grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.72fr_1.28fr]">
      <div>
        <p className="section-kicker">Manipulation Intelligence</p>
        <h2 className="mt-3 text-5xl font-black leading-[0.95] tracking-[-0.065em] text-neutral-950">
          Manipulation Signal Breakdown
        </h2>
        <p className="mt-5 text-base leading-8 text-neutral-600">
          TruthShield separates generic risk from detected psychological tactics, making the report explainable rather than a simple label.
        </p>
        <div className="mt-6 rounded-[1.6rem] bg-neutral-950 p-5 text-white">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">Manipulation score</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="text-6xl font-black tracking-[-0.07em]">{manipulation?.manipulation_score ?? metrics[1].value}</p>
            <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-black text-neutral-950">
              {manipulation?.level || "Estimated"}
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-neutral-300">{manipulation?.summary || "Manipulation risk estimated from credibility, bias, and red-flag signals."}</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-5">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="signal-row" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="font-black tracking-[-0.03em] text-neutral-950">{metric.label}</p>
                <p className="text-sm font-black text-neutral-500">{Math.round(metric.value)}%</p>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
                <div className="signal-fill h-full rounded-full bg-neutral-950" style={{ width: `${Math.min(100, metric.value)}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {(tactics.length ? tactics : [{ tactic: "No dominant tactic", severity: "Low", explanation: "No strong manipulation tactic was isolated by the backend.", signals: [] }]).map((item) => (
            <article key={item.tactic} className="rounded-[1.4rem] border border-neutral-200 bg-[#f6f4ef] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-black capitalize tracking-[-0.03em] text-neutral-950">{item.tactic}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-600">{item.severity}</span>
              </div>
              <p className="text-sm leading-6 text-neutral-600">{item.explanation}</p>
              {item.signals?.length > 0 && (
                <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-neutral-400">{item.signals.join(", ")}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
