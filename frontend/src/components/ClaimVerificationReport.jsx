import {
  Activity,
  Building2,
  CheckCircle2,
  CircleHelp,
  ExternalLink,
  FileSearch,
  FlaskConical,
  Newspaper,
  SearchCheck,
  ShieldCheck,
  ShieldX,
  Stethoscope
} from "lucide-react";

const STATUS_META = {
  Supported: {
    icon: CheckCircle2,
    labelClass: "border-emerald-200 bg-emerald-50 text-emerald-800",
    iconClass: "text-emerald-700"
  },
  Refuted: {
    icon: ShieldX,
    labelClass: "border-red-200 bg-red-50 text-red-800",
    iconClass: "text-red-700"
  },
  Unverified: {
    icon: CircleHelp,
    labelClass: "border-neutral-200 bg-neutral-50 text-neutral-700",
    iconClass: "text-neutral-600"
  },
  "Needs More Evidence": {
    icon: SearchCheck,
    labelClass: "border-amber-200 bg-amber-50 text-amber-800",
    iconClass: "text-amber-700"
  }
};

function statusMeta(status) {
  return STATUS_META[status] || STATUS_META.Unverified;
}

function evidenceStats(sources = []) {
  return sources.reduce(
    (stats, source) => {
      stats.checked += 1;
      const status = source.verification_status || "Unverified";
      if (status === "Supported") stats.supported += 1;
      else if (status === "Refuted") stats.refuted += 1;
      else stats.unverified += 1;
      return stats;
    },
    { checked: 0, supported: 0, refuted: 0, unverified: 0 }
  );
}

function sourceIcon(type, category) {
  const label = `${type || ""} ${category || ""}`.toLowerCase();
  if (label.includes("government")) return Building2;
  if (label.includes("research") || label.includes("science")) return FlaskConical;
  if (label.includes("news") || label.includes("general")) return Newspaper;
  if (label.includes("health")) return Stethoscope;
  return ShieldCheck;
}

export default function ClaimVerificationReport({ report }) {
  const results = report.claim_verification || [];
  const summary =
    report.verification_summary ||
    "TruthShield extracted claims and compared them with conservative trusted-source profiles.";

  if (!results.length) {
    return (
      <section className="report-section p-6 sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-kicker">Claim Verification Report</p>
            <h2 className="mt-3 text-5xl font-black leading-[0.95] tracking-[-0.065em] text-neutral-950">
              Evidence-aware checks for extracted claims.
            </h2>
          </div>
          <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f6f4ef] p-5">
            <p className="section-kicker">Verification Intelligence Summary</p>
            <p className="mt-3 text-sm font-semibold leading-7 text-neutral-700">
              No clear factual claims were extracted, but TruthShield still analyzed manipulation and credibility signals.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="report-section p-6 sm:p-8">
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="section-kicker">Claim Verification Report</p>
          <h2 className="mt-3 text-5xl font-black leading-[0.95] tracking-[-0.065em] text-neutral-950">
            Evidence-aware checks for extracted claims.
          </h2>
        </div>
        <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f6f4ef] p-5">
          <p className="section-kicker">Verification Intelligence Summary</p>
          <p className="mt-3 text-sm font-semibold leading-7 text-neutral-700">{summary}</p>
        </div>
      </div>

      <div className="grid gap-5">
        {results.map((result, index) => {
          const meta = statusMeta(result.status);
          const Icon = meta.icon;
          const stats = evidenceStats(result.sources || []);

          return (
            <article key={`${result.claim}-${index}`} className="rounded-[1.5rem] border border-neutral-200 bg-white p-5">
              <div className="grid gap-5 lg:grid-cols-[1fr_14rem]">
                <div>
                  <p className="section-kicker">Claim</p>
                  <h3 className="mt-2 text-xl font-black leading-7 tracking-[-0.03em] text-neutral-950">{result.claim}</h3>
                </div>
                <div className="rounded-[1.25rem] border border-neutral-200 bg-neutral-50 p-4">
                  <div className="flex items-center gap-2">
                    <Icon className={meta.iconClass} size={20} />
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${meta.labelClass}`}>{result.status}</span>
                  </div>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-neutral-400">Confidence</p>
                  <p className="mt-1 text-3xl font-black tracking-[-0.05em] text-neutral-950">{result.confidence}%</p>
                </div>
              </div>

              <div className="mt-5 rounded-[1.25rem] border border-neutral-200 bg-[#f6f4ef] p-4">
                <p className="section-kicker">Verdict Reasoning</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-neutral-700">{result.reasoning}</p>
              </div>

              <div className="mt-6">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="section-kicker">Sources & Evidence</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-neutral-500">
                      Trusted-source style evidence mapping. No real-time web search is implied.
                    </p>
                  </div>
                  <span className="self-start rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">
                    {stats.checked} sources
                  </span>
                </div>

                <div className="mb-4 grid gap-2 sm:grid-cols-4">
                  <SummaryMetric label="Sources Checked" value={stats.checked} />
                  <SummaryMetric label="Supported" value={stats.supported} />
                  <SummaryMetric label="Refuted" value={stats.refuted} />
                  <SummaryMetric label="Unverified" value={stats.unverified} />
                </div>

                {(result.sources || []).length ? (
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {(result.sources || []).map((source) => (
                      <EvidenceCard key={`${result.claim}-${source.source_name || source.source}`} source={source} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[1.25rem] border border-dashed border-neutral-300 bg-neutral-50 p-5 text-sm font-semibold leading-7 text-neutral-600">
                    No trusted-source style evidence was available for this claim.
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function EvidenceCard({ source }) {
  const sourceName = source.source_name || source.source;
  const sourceCategory = source.source_category || source.category || "General";
  const evidenceType = source.evidence_type || sourceCategory;
  const evidenceSummary = source.evidence_summary || source.summary || "No trusted-source style evidence was available for this claim.";
  const verificationStatus = source.verification_status || "Unverified";
  const confidence = source.confidence ?? 58;
  const evidenceStrength = source.evidence_strength ?? Math.max(35, Math.min(95, confidence - 4));
  const sourceUrl = source.source_url;
  const Icon = sourceIcon(evidenceType, sourceCategory);

  return (
    <article className="rounded-[1.25rem] border border-neutral-200 bg-[#fafaf9] p-4 shadow-[0_18px_45px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:bg-white hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-black tracking-[-0.03em] text-neutral-950">{sourceName}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
            {sourceCategory} Source · {source.trust_level} Trust
          </p>
        </div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-700">
          <Icon size={18} />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Badge label={source.is_live_source ? "Live Verified Source" : "Reference Source"} />
        <Badge label={verificationStatus} />
        <Badge label={`${confidence}% confidence`} dark />
        <Badge label={`${source.trust_level} trust`} />
      </div>

      <div className="mb-5 rounded-[1rem] border border-neutral-200 bg-white p-3">
        <div className="mb-3 flex flex-wrap gap-2">
          <MetadataPill label="Publisher" value={source.publisher || sourceName} />
          <MetadataPill label="Source Type" value={source.source_type || evidenceType} />
          <MetadataPill label="Published" value={source.published_date || "Reference source"} />
        </div>
        <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-neutral-400">Reference</p>
        <p className="mt-1 text-sm font-black leading-6 text-neutral-900">
          {source.article_title || `${sourceName} Reference Hub`}
        </p>
      </div>

      <div className="mb-5 rounded-[1rem] border border-neutral-200 bg-white p-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Activity size={15} className="text-neutral-500" />
            <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-500">Evidence Strength</p>
          </div>
          <span className="text-sm font-black text-neutral-950">{evidenceStrength}/100</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
          <div className="h-full rounded-full bg-neutral-950 transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, evidenceStrength))}%` }} />
        </div>
      </div>

      <div className="grid gap-4">
        <EvidenceBlock label="Evidence" value={evidenceSummary} />
        <EvidenceBlock label="Reasoning" value={source.reasoning || "This source profile did not provide enough signal for a stronger verdict."} />
        <EvidenceBlock label="Why this matters" value={source.why_this_matters || "This source is part of TruthShield's trusted-source mapping for analyst-style claim verification."} />
        <EvidenceBlock label="Citation Note" value={source.citation_note || "Reference hub link; no live web search was performed."} />
      </div>

      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex min-h-10 w-full items-center justify-between gap-3 rounded-[0.9rem] border border-neutral-200 bg-white px-3 py-2 text-sm font-black text-neutral-900 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
        >
          <span className="break-words text-left">Open Source</span>
          <ExternalLink className="shrink-0" size={15} />
        </a>
      )}
    </article>
  );
}

function SummaryMetric({ label, value }) {
  return (
    <div className="rounded-[1rem] border border-neutral-200 bg-neutral-50 px-4 py-3">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-neutral-400">{label}</p>
      <p className="mt-1 text-2xl font-black tracking-[-0.05em] text-neutral-950">{value}</p>
    </div>
  );
}

function MetadataPill({ label, value }) {
  return (
    <div className="rounded-[0.8rem] border border-neutral-200 bg-neutral-50 px-3 py-2">
      <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-neutral-400">{label}</p>
      <p className="mt-1 text-xs font-black text-neutral-800">{value}</p>
    </div>
  );
}

function Badge({ label, dark = false }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${dark ? "bg-neutral-950 text-white" : "border border-neutral-300 bg-white text-neutral-800"}`}>
      {label}
    </span>
  );
}

function EvidenceBlock({ label, value }) {
  return (
    <div>
      <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-neutral-400">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-neutral-700">{value}</p>
    </div>
  );
}
