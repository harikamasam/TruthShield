import { Bot, Flame, Megaphone, Newspaper, Send } from "lucide-react";

const presets = [
  {
    title: "Viral WhatsApp forward",
    type: "Messaging",
    icon: Send,
    text: "Forwarded as received: doctors secretly confirmed this cure works, but officials will never admit it. Share with every family group before it is deleted."
  },
  {
    title: "Political propaganda tweet",
    type: "Social",
    icon: Megaphone,
    text: "The corrupt media is hiding the truth about this candidate. Real citizens know what is happening. Retweet before they silence us."
  },
  {
    title: "AI-generated article",
    type: "Article",
    icon: Bot,
    text: "Experts are increasingly concerned about a dramatic development that could reshape society. Many observers believe this trend proves a hidden pattern."
  },
  {
    title: "Fear-based medical misinformation",
    type: "Health claim",
    icon: Flame,
    text: "Parents are terrified after secret reports reveal a common treatment may be dangerous. Officials refuse to answer questions. Protect your family now."
  },
  {
    title: "Sensational breaking news headline",
    type: "News preview",
    icon: Newspaper,
    text: "BREAKING: Anonymous insiders expose a shocking cover-up that mainstream outlets will not touch. The public deserves to know immediately."
  }
];

export default function SamplePresetGrid({ onSelectSample }) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Real-world presets</p>
            <h2 className="mt-3 text-5xl font-black leading-none tracking-[-0.065em] text-neutral-950">
              Start with a risky narrative.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-neutral-600">
            Click a scenario to load the analyzer instantly. Each preset mirrors a real content format recruiters will recognize.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {presets.map((preset) => {
            const Icon = preset.icon;
            return (
              <button key={preset.title} className="preset-card text-left" onClick={() => onSelectSample?.(preset.text)}>
                <div className="mb-8 flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-neutral-950 text-white">
                    <Icon size={19} />
                  </div>
                  <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-black text-neutral-950">{preset.type}</span>
                </div>
                <h3 className="text-xl font-black leading-none tracking-[-0.04em] text-neutral-950">{preset.title}</h3>
                <p className="mt-4 line-clamp-4 text-sm leading-6 text-neutral-600">{preset.text}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
