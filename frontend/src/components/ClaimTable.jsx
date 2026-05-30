export default function ClaimTable({ claims }) {
  return (
    <section className="premium-card overflow-hidden">
      <div className="border-b border-neutral-200 p-6">
        <p className="section-kicker">Evidence</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-neutral-950">Claim verification simulation</h2>
        <p className="mt-3 text-sm leading-6 text-neutral-500">Extracted claims are compared against trusted-source style signals.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-[0.16em] text-neutral-400">
            <tr>
              <th className="px-5 py-4">Claim</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Confidence</th>
              <th className="px-5 py-4">Trusted-source simulation</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id} className="border-t border-neutral-100 transition hover:bg-neutral-50">
                <td className="px-5 py-5 font-semibold leading-6 text-neutral-900">{claim.claim}</td>
                <td className="px-5 py-5">
                  <span className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-black text-neutral-800">{claim.status}</span>
                </td>
                <td className="px-5 py-5 text-neutral-600">{claim.confidence}</td>
                <td className="px-5 py-5 text-neutral-600">{claim.source_result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
