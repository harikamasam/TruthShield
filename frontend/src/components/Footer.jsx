export default function Footer() {
  return (
    <footer id="architecture" className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>TruthShield combines rule-based NLP scoring with an API-ready architecture for future model integrations.</p>
        <p className="font-semibold text-neutral-700">Built with React, Tailwind CSS, and FastAPI.</p>
      </div>
    </footer>
  );
}
