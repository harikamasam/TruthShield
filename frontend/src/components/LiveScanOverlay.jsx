import { BrainCircuit, ScanLine } from "lucide-react";

const timeline = [
  { at: 12, label: "scanning credibility" },
  { at: 34, label: "detecting emotional manipulation" },
  { at: 57, label: "analyzing narrative structure" },
  { at: 81, label: "estimating AI-generation probability" },
  { at: 100, label: "trust report generated" }
];

export default function LiveScanOverlay({ loading, progress, stage, stages }) {
  if (!loading) return null;

  return (
    <section className="fixed inset-0 z-[80] grid place-items-center bg-neutral-950/70 px-4 py-8 backdrop-blur-md">
      <div className="live-dossier relative w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#f6f4ef] p-5 shadow-2xl sm:p-8">
        <div className="dossier-scan-line" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-neutral-500">Live AI scan</p>
            <h2 className="mt-4 text-5xl font-black leading-[0.9] tracking-[-0.07em] text-neutral-950 sm:text-6xl">
              Trust intelligence engine is thinking.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-neutral-600">
              TruthShield is reading the content like an intelligence brief: structure, emotional pressure, source quality,
              propaganda framing, and authorship patterns.
            </p>
          </div>

          <div className="rounded-[2rem] border border-neutral-950 bg-neutral-950 p-5 text-white">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-lime-200 text-neutral-950">
                  <BrainCircuit size={21} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">Current operation</p>
                  <p className="mt-1 font-black tracking-[-0.03em]">{stage}</p>
                </div>
              </div>
              <ScanLine className="animate-pulse text-lime-200" size={24} />
            </div>

            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between text-sm font-black">
                <span className="text-neutral-400">Analysis progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-lime-200 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="grid gap-2">
              {stages.map((item, index) => {
                const threshold = ((index + 1) / stages.length) * 100;
                const active = item === stage;
                const complete = progress >= threshold;
                return (
                  <div key={item} className={`dossier-step ${active ? "active" : ""} ${complete ? "complete" : ""}`}>
                    <span />
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-neutral-500">AI timeline</p>
              <div className="grid gap-3">
                {timeline.map((item) => (
                  <div key={item.at} className={`timeline-item ${progress >= item.at ? "active" : ""}`}>
                    <span>{item.at}%</span>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
