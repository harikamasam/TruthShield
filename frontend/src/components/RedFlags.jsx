import { AlertTriangle } from "lucide-react";

export default function RedFlags({ flags }) {
  return (
    <section className="premium-card p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-neutral-50">
          <AlertTriangle size={18} />
        </div>
        <div>
          <p className="section-kicker">Signals</p>
          <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-neutral-950">Red flags</h2>
        </div>
      </div>
      <div className="grid gap-3">
        {flags.length === 0 && <p className="text-sm text-neutral-600">No major red flags detected.</p>}
        {flags.map((flag) => (
          <article key={`${flag.category}-${flag.evidence.join("-")}`} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-black capitalize tracking-[-0.02em] text-neutral-950">{flag.category}</h3>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-600">{flag.severity}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-600">{flag.explanation}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">{flag.evidence.join(", ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
