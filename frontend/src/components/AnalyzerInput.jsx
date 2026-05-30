import { FileText, Loader2, ScanSearch } from "lucide-react";

export default function AnalyzerInput({ text, setText, onAnalyze, loading, error, onTrySample }) {
  const characterCount = text.trim().length;

  return (
    <section id="analyzer" className="demo-shell p-4 sm:p-5">
      <div className="rounded-[2rem] bg-neutral-950 p-5 text-white sm:p-7">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-lime-200">Product demo</p>
            <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.06em]">Run a Trust Intelligence Report.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-400">
              Paste suspicious content or start with the sample below. TruthShield will analyze narrative risk, credibility risk, and manipulation signals.
            </p>
            <button
              className="mt-5 inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-neutral-950"
              onClick={onTrySample}
              type="button"
            >
              Try Viral Misinformation Sample
            </button>
          </div>
          <div className="hidden h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white sm:grid">
            <FileText size={21} />
          </div>
        </div>

        <textarea
          className="min-h-80 w-full resize-y rounded-[1.6rem] border border-white/10 bg-white p-5 text-base leading-8 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-lime-200 focus:ring-4 focus:ring-lime-200/20"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Paste content here..."
        />

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-neutral-300">
            {characterCount} characters queued
          </span>
          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-lime-200 px-6 text-sm font-black text-neutral-950 transition duration-300 hover:-translate-y-0.5 hover:bg-lime-100 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onAnalyze}
            disabled={loading || characterCount < 10}
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <ScanSearch size={18} />}
            Analyze Trust Risk
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl border border-red-300/30 bg-red-500/10 p-4 text-sm font-semibold text-red-100">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
