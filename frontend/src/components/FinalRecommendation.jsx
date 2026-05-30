import { CheckCircle2, OctagonAlert, ShieldQuestion } from "lucide-react";

const icons = {
  Safe: CheckCircle2,
  "Verify Before Sharing": ShieldQuestion,
  "High Risk": OctagonAlert
};

export default function FinalRecommendation({ report }) {
  const Icon = icons[report.recommendation] || ShieldQuestion;
  const detected = [
    "emotional manipulation",
    "unsupported claims",
    "low source transparency",
    "outrage amplification tactics"
  ];

  return (
    <section className="before-share reveal-in overflow-hidden rounded-[2.4rem] border border-neutral-950 bg-neutral-950 text-white">
      <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_0.75fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-lime-200">Before You Share This Content</p>
          <h2 className="mt-5 max-w-4xl text-6xl font-black leading-[0.88] tracking-[-0.075em] sm:text-7xl">
            {report.recommendation}
          </h2>
          <p className="mt-7 max-w-3xl text-base leading-8 text-neutral-300">
            TruthShield detected signals that can make this content risky to amplify publicly.
          </p>
        </div>
        <div className="relative min-h-72">
          <div className="absolute right-0 top-0 grid h-44 w-44 place-items-center rounded-full border border-white/15 bg-white/10">
            <Icon size={64} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 rounded-[1.6rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">TruthShield detected</p>
            <ul className="mt-4 grid gap-2 text-sm font-semibold text-neutral-200">
              {detected.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-200" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/10 pt-4 text-base font-black tracking-[-0.03em]">
              Verify with trusted sources before sharing publicly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
