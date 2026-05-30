import { ArrowRight, CheckCircle2, PlayCircle, ScanLine, ShieldAlert } from "lucide-react";

const previewSignals = [
  ["Manipulation signals", "High"],
  ["Source transparency", "Low"],
  ["AI narrative pattern", "68%"],
  ["Credibility risk", "42/100"]
];

export default function Hero({ onAnalyzeClick }) {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-[#f6f4ef]">
      <div className="hero-ink-block" />
      <div className="mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-16">
        <div className="relative z-10 pt-6 lg:pt-0">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-12 bg-neutral-950" />
            <p className="text-xs font-black uppercase tracking-[0.28em] text-neutral-600">AI trust intelligence</p>
          </div>
          <h1 className="max-w-4xl text-[4.6rem] font-black leading-[0.82] tracking-[-0.075em] text-neutral-950 sm:text-8xl lg:text-[7.7rem]">
            Detect Manipulation Before It Spreads.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-650">
            TruthShield analyzes online content for misinformation, propaganda, toxicity, and AI-generated narrative patterns.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button className="primary-button group" onClick={onAnalyzeClick}>
              Analyze Content
              <ArrowRight className="transition group-hover:translate-x-1" size={18} />
            </button>
            <a className="secondary-button-light" href="#social">
              <PlayCircle size={18} />
              View Social Demo
            </a>
          </div>
        </div>

        <div className="relative z-10 lg:pl-6">
          <div className="relative mx-auto max-w-[620px]">
            <div className="absolute -left-4 top-14 hidden w-40 rotate-[-8deg] rounded-[1.75rem] border border-neutral-200 bg-white p-4 shadow-paper md:block">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-400">Post sample</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-neutral-800">
                Share now before this is removed.
              </p>
            </div>
            <div className="absolute -right-3 bottom-16 hidden w-44 rotate-[6deg] rounded-[1.75rem] border border-neutral-950 bg-neutral-950 p-4 text-white shadow-paper md:block">
              <ShieldAlert size={20} />
              <p className="mt-4 text-3xl font-black tracking-[-0.05em]">High</p>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">Narrative risk</p>
            </div>

            <div className="product-frame relative overflow-hidden rounded-[2.4rem] border border-neutral-950 bg-white p-4 shadow-paper">
              <div className="rounded-[1.8rem] border border-neutral-200 bg-[#fbfaf7] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">TruthShield report</p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-neutral-950">Trust Intelligence Report</h2>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-neutral-950 text-white">
                    <ScanLine size={19} />
                  </div>
                </div>

                <div className="animated-analyzer rounded-[1.5rem] border border-neutral-200 bg-white p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-black tracking-[-0.02em] text-neutral-950">Live analyzer</p>
                    <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-black text-neutral-950">Scanning</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-11/12 rounded-full bg-neutral-200" />
                    <div className="h-3 w-8/12 rounded-full bg-neutral-200" />
                    <div className="h-3 w-10/12 rounded-full bg-neutral-200" />
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-neutral-100">
                    <div className="analyzer-progress h-full rounded-full bg-neutral-950" />
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {previewSignals.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-neutral-200 bg-white p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">{label}</p>
                      <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-neutral-950">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.5rem] bg-neutral-950 p-5 text-white">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} />
                    <p className="font-black tracking-[-0.03em]">Verify before sharing</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">
                    Suspicious urgency, weak sourcing, and manipulative framing detected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
