import { Bot, Flame, Gauge, Megaphone } from "lucide-react";

const story = [
  {
    label: "Problem",
    title: "Misinformation spreads faster than verification.",
    detail: "Social posts compress fear, urgency, and uncertainty into content people are pushed to share immediately.",
    icon: Flame
  },
  {
    label: "Solution",
    title: "TruthShield scans manipulation signals.",
    detail: "The product surfaces source quality, emotional pressure, and propaganda-style framing before amplification.",
    icon: Gauge
  },
  {
    label: "Report",
    title: "A readable intelligence brief.",
    detail: "Credibility, toxicity, propaganda, and AI suspicion are turned into an explainable trust recommendation.",
    icon: Megaphone
  },
  {
    label: "Authorship",
    title: "Narrative patterns are assessed.",
    detail: "AI-generated suspicion is treated as a probability signal, not a verdict, keeping the report responsible.",
    icon: Bot
  }
];

export default function StorytellingSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-kicker">Why it matters</p>
            <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.06em] text-neutral-950 sm:text-6xl">
              From viral claim to trust decision.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-neutral-600 lg:justify-self-end">
            TruthShield is designed like a product decision layer: it does not just score content, it explains what signals made the content risky.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {story.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={`story-card ${index % 2 ? "xl:mt-10" : ""}`}>
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">{item.label}</span>
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-white">
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="text-2xl font-black leading-none tracking-[-0.05em] text-neutral-950">{item.title}</h3>
                <p className="mt-5 text-sm leading-7 text-neutral-600">{item.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
