import { MessageSquareText, Newspaper, Send, ShieldAlert } from "lucide-react";

const feed = [
  {
    source: "Tweet",
    risk: "High risk",
    text: "BREAKING: They are hiding the truth. Share this before it disappears from the internet.",
    icon: MessageSquareText
  },
  {
    source: "WhatsApp forward",
    risk: "Verify",
    text: "Forwarded as received: doctors secretly confirmed this cure works, but officials will never admit it.",
    icon: Send
  },
  {
    source: "Reddit-style post",
    risk: "Review",
    text: "Anonymous insider here. The media is covering this up and everyone who questions it gets silenced.",
    icon: ShieldAlert
  },
  {
    source: "News article preview",
    risk: "Unclear",
    text: "Anonymous sources claim a dramatic policy shift with no public evidence or named documents.",
    icon: Newspaper
  }
];

export default function SocialIntelPreview({ onSelectSample }) {
  return (
    <section id="social" className="bg-[#f6f4ef] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="section-kicker">Real-world use</p>
            <h2 className="mt-4 text-6xl font-black leading-[0.9] tracking-[-0.07em] text-neutral-950">
              Click a post. Watch TruthShield think.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">
              Try realistic social, messaging, forum, and news-preview samples. Each one auto-fills the analyzer for a live Trust Intelligence Report.
            </p>
          </div>

          <div className="relative grid gap-4 lg:min-h-[540px]">
            {feed.map((item, index) => {
              const Icon = item.icon;
              const placement = [
                "lg:absolute lg:left-0 lg:top-0 lg:rotate-[-3deg]",
                "lg:absolute lg:right-0 lg:top-24 lg:rotate-[4deg]",
                "lg:absolute lg:left-8 lg:bottom-20 lg:rotate-[-1deg]",
                "lg:absolute lg:right-14 lg:bottom-0 lg:rotate-[2deg]"
              ][index];
              return (
                <button
                  key={item.text}
                  className={`social-mockup w-full text-left lg:w-[78%] lg:max-w-md ${placement}`}
                  onClick={() => onSelectSample?.(item.text)}
                >
                  <div className="flex gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-neutral-950 text-white">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black tracking-[-0.03em] text-neutral-950">{item.source}</p>
                        <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-black text-neutral-950">
                          {item.risk}
                        </span>
                      </div>
                      <p className="mt-4 text-base leading-7 text-neutral-700">{item.text}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
