function scoreLabel(score) {
  if (score >= 75) return "Low risk";
  if (score >= 50) return "Needs review";
  return "High risk";
}

export default function TrustScoreCard({ report, loading, progress = 0 }) {
  const score = loading ? Math.round(progress * 0.72) : report?.trust_score ?? 0;
  const confidence = report?.confidence_score ?? (loading ? Math.round(progress) : 0);

  return (
    <section id="report" className="report-sheet p-6 sm:p-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-neutral-200 pb-7 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-kicker">Intelligence brief</p>
          <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.06em] text-neutral-950">Trust report</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-500">Credibility, harm, bias, and verification signals.</p>
        </div>
        <span className="self-start rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-bold text-neutral-700">
          {loading ? "Analyzing" : report ? report.recommendation : "Ready"}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <div>
          <p className="text-sm font-semibold text-neutral-500">Trust Score</p>
          <p className="mt-1 text-[7rem] font-black leading-none tracking-[-0.08em] text-neutral-950">{score}</p>
          <p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-neutral-400">{scoreLabel(score)}</p>
        </div>
        <div className="rounded-[1.7rem] border border-neutral-200 bg-[#f6f4ef] p-5">
          <div className="mb-4 flex items-center justify-between text-sm font-bold text-neutral-500">
            <span>0</span>
            <span>100</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-neutral-950 transition-all duration-700" style={{ width: `${score}%` }} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Metric label="Risk" value={report?.risk_level || (loading ? "Scanning" : "--")} />
            <Metric label="Confidence Score" value={confidence ? `${confidence}%` : "--"} />
            <Metric label="Label" value={report?.credibility_label || "--"} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">{label}</p>
      <p className="mt-2 text-base font-black tracking-[-0.03em] text-neutral-950">{value}</p>
    </div>
  );
}
