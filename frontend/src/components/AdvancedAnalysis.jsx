import { ChevronDown, SlidersHorizontal } from "lucide-react";
import ClaimTable from "./ClaimTable";
import HowTruthShieldThinks from "./HowTruthShieldThinks";
import ManipulationVisualizer from "./ManipulationVisualizer";
import RedFlags from "./RedFlags";
import RiskReport from "./RiskReport";
import SignalScoringSection from "./SignalScoringSection";
import SuspicionSection from "./SuspicionSection";

export default function AdvancedAnalysis({ report }) {
  return (
    <details className="group report-section overflow-hidden p-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-neutral-950 text-white">
            <SlidersHorizontal size={20} />
          </div>
          <div>
            <p className="section-kicker">Advanced Analysis</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-neutral-950">Detailed signal breakdown</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-neutral-500">
              Signal scoring, manipulation tactics, bias, toxicity, AI suspicion, narrative risk, and extracted red flags.
            </p>
          </div>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-neutral-200 bg-white transition group-open:rotate-180">
          <ChevronDown size={20} />
        </div>
      </summary>

      <div className="grid gap-8 border-t border-neutral-200 bg-white p-5 sm:p-8">
        <SignalScoringSection report={report} />
        <ManipulationVisualizer report={report} />
        <SuspicionSection report={report} />
        <RiskReport report={report} />
        <HowTruthShieldThinks report={report} />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <ClaimTable claims={report.key_claims} />
          <RedFlags flags={report.red_flags} />
        </div>
      </div>
    </details>
  );
}
