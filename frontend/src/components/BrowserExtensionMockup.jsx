import { Bell, Globe2, ShieldCheck, Zap } from "lucide-react";

export default function BrowserExtensionMockup() {
  return (
    <section className="bg-[#f6f4ef] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="section-kicker">Startup vision</p>
          <h2 className="mt-3 text-6xl font-black leading-[0.9] tracking-[-0.075em] text-neutral-950">
            TruthShield Browser Extension
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">
            A lightweight trust layer that can analyze webpages instantly, detect manipulation while browsing, and warn before sharing.
          </p>
        </div>

        <div className="extension-shell">
          <div className="mb-5 flex items-center justify-between border-b border-neutral-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-neutral-950 text-white">
                <Globe2 size={18} />
              </div>
              <div>
                <p className="font-black tracking-[-0.03em] text-neutral-950">TruthShield Extension</p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">Active on this page</p>
              </div>
            </div>
            <Bell size={20} />
          </div>

          <div className="rounded-[1.6rem] bg-neutral-950 p-5 text-white">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-neutral-400">Page risk</p>
              <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-black text-neutral-950">Warning</span>
            </div>
            <p className="mt-4 text-5xl font-black tracking-[-0.07em]">Verify first</p>
            <p className="mt-4 text-sm leading-7 text-neutral-300">
              Manipulative urgency, unsupported claims, and low source transparency detected on this webpage.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <ExtensionAction icon={Zap} label="Analyze webpage instantly" />
            <ExtensionAction icon={ShieldCheck} label="Detect manipulation while browsing" />
            <ExtensionAction icon={Bell} label="Warn before sharing content" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ExtensionAction({ icon: Icon, label }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <Icon size={18} />
      <p className="mt-4 text-sm font-black leading-5 text-neutral-950">{label}</p>
    </div>
  );
}
