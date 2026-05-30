import { AlertTriangle, Bot, Flame, Megaphone, SearchX, Siren } from "lucide-react";

function buildCards(report) {
  return [
    {
      icon: Siren,
      title: "Fear-based manipulation detected",
      detail: "The content uses urgency and threat framing to push fast reactions before verification."
    },
    {
      icon: Flame,
      title: "Emotional outrage amplification found",
      detail: report.toxicity.summary || "Language patterns may increase emotional engagement over careful evaluation."
    },
    {
      icon: SearchX,
      title: "Missing credible evidence",
      detail: `${report.key_claims.length} extracted claim${report.key_claims.length === 1 ? "" : "s"} require independent source verification.`
    },
    {
      icon: Megaphone,
      title: "Propaganda-style framing identified",
      detail: report.bias.summary
    },
    {
      icon: Bot,
      title: "AI-generated narrative patterns detected",
      detail: report.ai_generated_suspicion.summary
    },
    {
      icon: AlertTriangle,
      title: "Suspicious sensational wording found",
      detail: report.red_flags?.[0]?.explanation || "Sensational language may be used to increase sharing and reduce skepticism."
    }
  ];
}

export default function SuspicionSection({ report }) {
  return (
    <section className="report-section reveal-in p-6 sm:p-8">
      <div className="mb-8 max-w-3xl">
        <p className="section-kicker">Reasoning layer</p>
        <h2 className="mt-3 text-5xl font-black leading-[0.95] tracking-[-0.065em] text-neutral-950">
          Why This Content Is Suspicious
        </h2>
        <p className="mt-5 text-base leading-8 text-neutral-600">
          TruthShield translates raw model signals into plain-language reasons a human can inspect before sharing.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {buildCards(report).map((card, index) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className="suspicion-card" style={{ animationDelay: `${index * 85}ms` }}>
              <div className="mb-7 grid h-12 w-12 place-items-center rounded-full bg-neutral-950 text-white">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-black leading-none tracking-[-0.04em] text-neutral-950">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{card.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
