import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-stone-50/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <a href="#" className="flex items-center gap-3 text-neutral-950">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 bg-white shadow-soft">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-lg font-black tracking-[-0.03em]">TruthShield</p>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Trust intelligence</p>
          </div>
        </a>
        <div className="hidden items-center gap-7 text-sm font-semibold text-neutral-600 sm:flex">
          <a href="#analyzer">Analyzer</a>
          <a href="#report">Report</a>
          <a href="#thinking">Method</a>
          <a href="#social">Demo</a>
        </div>
      </div>
    </nav>
  );
}
