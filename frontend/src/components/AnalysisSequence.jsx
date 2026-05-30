import { BrainCircuit, CheckCircle2, ScanLine } from "lucide-react";

export default function AnalysisSequence({ loading, progress, stage, report, stages = [] }) {
  const activeProgress = loading || report ? progress : 0;
  const displayStages = report?.analysis_steps?.length ? report.analysis_steps : stages;

  return (
    <section className={`ai-scan-panel overflow-hidden p-6 ${loading ? "is-scanning" : ""}`}>
      <div className="scan-beam" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">{loading ? "Live AI scan" : "Live analysis"}</p>
          <h2 className="mt-3 text-3xl font-black leading-none tracking-[-0.05em] text-neutral-950">
            {loading ? stage : report ? "Trust intelligence report ready" : "Engine ready"}
          </h2>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-full bg-neutral-950 text-white">
          {loading ? <ScanLine className="animate-pulse" size={23} /> : report ? <CheckCircle2 size={23} /> : <BrainCircuit size={23} />}
        </div>
      </div>

      <div className="relative z-10 mt-8">
        <div className="mb-3 flex items-center justify-between text-sm font-black uppercase tracking-[0.18em] text-neutral-500">
          <span>Trust intelligence engine</span>
          <span>{Math.round(activeProgress)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white">
          <div className="h-full rounded-full bg-neutral-950 transition-all duration-500" style={{ width: `${activeProgress}%` }} />
        </div>
      </div>

      <div className="relative z-10 mt-6 grid gap-3">
        {displayStages.map((item, index) => {
          const threshold = ((index + 1) / displayStages.length) * 100;
          const active = loading && item === stage;
          const done = activeProgress >= threshold || Boolean(report);
          return (
            <div key={item} className={`scan-step ${active ? "active" : ""} ${done ? "done" : ""}`}>
              <span className="scan-dot" />
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
