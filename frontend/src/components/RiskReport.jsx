import { Bot, Megaphone, ShieldAlert } from "lucide-react";

function MetricCard({ icon: Icon, title, value, detail }) {
  return (
    <article className="premium-card p-6">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500">{title}</h3>
        <div className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700">
          <Icon size={19} />
        </div>
      </div>
      <p className="text-4xl font-black tracking-[-0.05em] text-neutral-950">{value}</p>
      <p className="mt-4 text-sm leading-7 text-neutral-600">{detail}</p>
    </article>
  );
}

export default function RiskReport({ report }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <MetricCard icon={ShieldAlert} title="Toxicity" value={report.toxicity.severity} detail={report.toxicity.summary} />
      <MetricCard icon={Megaphone} title="Bias & Propaganda" value={report.bias.level} detail={report.bias.summary} />
      <MetricCard
        icon={Bot}
        title="AI-Generated Suspicion"
        value={`${report.ai_generated_suspicion.probability}%`}
        detail={report.ai_generated_suspicion.summary}
      />
    </div>
  );
}
