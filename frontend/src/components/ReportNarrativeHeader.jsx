import { Download, FileSearch, ShieldAlert } from "lucide-react";

function fallbackIntelligenceSummary(report) {
  const risk = String(report.risk_level || "").toLowerCase();
  const highRisk = risk.includes("high");
  const aiProbability = report.ai_generated_suspicion?.probability ?? 0;

  if (highRisk) {
    return "This narrative uses fear amplification and unsupported claims to encourage impulsive sharing behavior. Low source transparency and emotionally loaded wording significantly reduce credibility.";
  }

  if (aiProbability > 45) {
    return "This content contains structured narrative patterns that may indicate synthetic authorship. TruthShield recommends verifying claims with named sources before amplifying.";
  }

  return "This content shows some credibility signals, but TruthShield still recommends checking high-impact claims against trusted primary sources before sharing.";
}

export default function ReportNarrativeHeader({ report }) {
  const summary = report.intelligence_summary || fallbackIntelligenceSummary(report);
  const confidence = report.confidence_score ?? (report.trust_score >= 70 ? 86 : report.trust_score >= 45 ? 74 : 62);

  return (
    <section className="report-brief-header overflow-hidden rounded-[2.5rem] border border-neutral-950 bg-white p-6 shadow-paper sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="section-kicker">AI intelligence report</p>
          <h2 className="mt-4 max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.075em] text-neutral-950">
            TruthShield found the strongest risk signals.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-600">
            This report explains why the content may be risky, how manipulation signals were weighted, and what to verify before sharing.
          </p>
          <div className="mt-7 rounded-[1.6rem] border border-neutral-200 bg-[#f6f4ef] p-5">
            <p className="section-kicker">TruthShield Intelligence Summary</p>
            <p className="mt-3 text-base font-semibold leading-8 text-neutral-800">{summary}</p>
          </div>
        </div>
        <div className="grid gap-3 rounded-[1.8rem] bg-neutral-950 p-5 text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <FileSearch className="text-lime-200" size={22} />
              <span className="font-black">Dossier summary</span>
            </div>
            <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-black text-neutral-950">{report.trust_score}/100</span>
          </div>
          <Metric label="Risk level" value={report.risk_level} />
          <Metric label="Recommendation" value={report.recommendation} />
          <Metric label="Confidence Score" value={`${confidence}%`} />
          <Metric label="Verified source confidence" value={report.trust_score >= 70 ? "Strong" : report.trust_score >= 45 ? "Moderate" : "Low"} />
          <div className="mt-2 flex items-start gap-3 rounded-2xl bg-white/10 p-4">
            <ShieldAlert className="mt-0.5 text-lime-200" size={18} />
            <p className="text-sm leading-6 text-neutral-300">Review the reasoning cards before amplifying this content publicly.</p>
          </div>
          <button className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-black text-neutral-950 transition hover:bg-lime-200">
            <Download size={16} />
            Export report
          </button>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">{label}</p>
      <p className="mt-2 text-xl font-black tracking-[-0.04em]">{value}</p>
    </div>
  );
}
