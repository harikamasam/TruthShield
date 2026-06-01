import { CheckCircle2, OctagonAlert, ShieldQuestion } from "lucide-react";

const icons = {
  Safe: CheckCircle2,
  "Verify Before Sharing": ShieldQuestion,
  "High Risk": OctagonAlert
};

export default function FinalRecommendation({ report }) {
  const Icon = icons[report.recommendation] || ShieldQuestion;
  const action =
    report.recommendation === "Safe"
      ? "The content shows comparatively low risk, but high-impact claims should still be checked against primary sources."
      : report.recommendation === "High Risk"
        ? "Do not amplify this content until unsupported claims and manipulation signals are independently verified."
        : "Verify the claim evidence and source links before sharing this content publicly.";

  return (
    <section className="before-share reveal-in overflow-hidden rounded-[2.4rem] border border-neutral-950 bg-neutral-950 text-white">
      <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_0.7fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-lime-200">Final Recommendation</p>
          <h2 className="mt-5 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-6xl">
            {report.recommendation}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-300">{action}</p>
        </div>
        <div className="grid gap-3 rounded-[1.7rem] border border-white/10 bg-white/10 p-5">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Risk Level</p>
              <p className="mt-2 text-3xl font-black tracking-[-0.05em]">{report.risk_level}</p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/10">
              <Icon size={26} />
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Suggested Action</p>
            <p className="mt-3 text-base font-black leading-7 tracking-[-0.03em] text-white">{action}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
