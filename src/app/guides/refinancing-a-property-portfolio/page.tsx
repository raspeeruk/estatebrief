import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refinancing Your Property Portfolio: When, Why, and How | PropertyBrief',
  description: 'When to remortgage your BTL properties, how portfolio stress tests work, ERC calculations, product transfer vs remortgage, and limited company refinancing explained for UK landlords.',
  openGraph: {
    title: 'Refinancing Your Property Portfolio: When, Why, and How',
    description: 'Portfolio mortgage lenders, stress test calculations, ERC break-even analysis, and a worked example of releasing £80K equity from a £500K portfolio.',
    type: 'article',
  },
}

export default function RefinancingPropertyPortfolioPage() {
  return (
    <div className="min-h-screen bg-[#F0EBE1]">
      <nav className="max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="font-[family-name:var(--font-heading)] text-2xl text-[#3D2B1F]">
          PropertyBrief
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/auth/login" className="text-sm font-medium text-[#7A6A5A] hover:text-[#3D2B1F] transition-colors">
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="text-sm font-medium bg-[#7C5C3A] text-[#FAF6F0] px-5 py-2 rounded-lg hover:bg-[#664B2E] transition-colors"
          >
            Start free
          </Link>
        </div>
      </nav>

      <article className="max-w-[780px] mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[#7C5C3A] mb-5">
            Guide &mdash; Mortgages &amp; Finance
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-6" style={{ fontSize: '52px', lineHeight: 1.05 }}>
            Refinancing Your Property Portfolio: When, Why, and How
          </h1>
          <p className="text-xl text-[#7A6A5A] leading-relaxed font-light">
            Refinancing is how experienced landlords grow without selling. Release equity from appreciated properties
            to fund the next acquisition. Reduce rates as fixed terms expire. Restructure for tax efficiency. Here
            is how to do each one without getting caught out by ERCs, stress tests, or the wrong lender.
          </p>
        </div>

        <div className="h-px bg-[#DDD4C5] my-10" />

        <div className="space-y-10">

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Why landlords refinance
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-6">
              There are four main reasons to refinance, and each requires a different strategy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  reason: 'Release equity for further purchases',
                  detail: 'If a property has grown in value, refinancing to 75% LTV releases cash you can use as a deposit on the next property. The equity is extracted tax-free (it is a loan, not income).',
                  priority: 'Most common reason for growing investors',
                },
                {
                  reason: 'Reduce mortgage rate',
                  detail: 'Fixed terms typically run 2–5 years. When a deal ends, lenders move you to the SVR (usually 2–3% higher). Refinancing before this happens is essential.',
                  priority: 'Highest urgency: set calendar reminders',
                },
                {
                  reason: 'Restructure to limited company',
                  detail: 'Moving a portfolio from personal to company ownership. Requires full remortgage of every property — see tax considerations before proceeding.',
                  priority: 'Complex — specialist broker required',
                },
                {
                  reason: 'Consolidate multiple mortgages',
                  detail: 'Some landlords move from individual BTL mortgages to a single portfolio mortgage covering multiple properties. Can simplify admin and may improve LTV across the portfolio.',
                  priority: 'Limited to portfolio landlords (4+ properties)',
                },
              ].map(card => (
                <div key={card.reason} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                  <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-2">{card.reason}</p>
                  <p className="text-xs text-[#7A6A5A] leading-relaxed mb-3">{card.detail}</p>
                  <p className="text-[10px] font-[family-name:var(--font-body)] font-semibold tracking-wider uppercase text-[#7C5C3A]">{card.priority}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              When to refinance: timing matters
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              The single most expensive mistake is letting a fixed rate expire without acting. Most lenders give you
              a 3–6 month window to lock in a new rate before your deal ends — and you can often apply 6 months
              early without paying any early repayment charge.
            </p>
            <div className="bg-[#3D2B1F] rounded-xl px-6 py-5 mb-5">
              <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-lg mb-2">
                Set reminders 6 months before each fixed rate expires
              </p>
              <p className="text-[#DDD4C5] text-sm">
                Mortgage SVRs are typically 6–8% vs fixed rates of 4–5.5% (as of 2025). On a £150,000 mortgage,
                that is an extra £2,250–£3,750/year in interest if you miss the window.
              </p>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-3" style={{ fontSize: '22px' }}>
              Product transfer vs full remortgage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-2">Product transfer</p>
                <p className="text-xs text-[#7A6A5A] leading-relaxed mb-3">
                  Switching to a new deal with your existing lender. No new application, no new valuation, no legal
                  fees. Fast (sometimes instant online). Cannot borrow more or change LTV.
                </p>
                <p className="text-[10px] font-[family-name:var(--font-body)] font-semibold tracking-wider uppercase text-[#4A7A52]">Best when: rate is competitive, no equity release needed</p>
              </div>
              <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-2">Full remortgage</p>
                <p className="text-xs text-[#7A6A5A] leading-relaxed mb-3">
                  Full application with a new (or existing) lender. New valuation, new stress test, legal fees apply.
                  Takes 4–8 weeks. Allows equity release, LTV restructuring, change of ownership structure.
                </p>
                <p className="text-[10px] font-[family-name:var(--font-body)] font-semibold tracking-wider uppercase text-[#7C5C3A]">Best when: equity release needed or better rate available elsewhere</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Portfolio mortgages vs individual BTL mortgages
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Most landlords start with individual BTL mortgages from high-street lenders. When your portfolio grows
              past 4 properties, some lenders restrict further lending — and that is when a portfolio mortgage
              becomes worth investigating.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#3D2B1F] text-[#FAF6F0]">
                    <th className="text-left px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Feature</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Individual BTL</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Portfolio Mortgage</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feat: 'Properties covered', btl: 'One per mortgage', port: 'Multiple properties, one loan' },
                    { feat: 'Underwriting', btl: 'Property by property', port: 'Whole portfolio assessed together' },
                    { feat: 'Minimum portfolio size', btl: 'None', port: 'Usually 4+ properties' },
                    { feat: 'Typical lenders', btl: 'BM Solutions, Barclays, TMW', port: 'Paragon, Precise, Keystone' },
                    { feat: 'Rate premium', btl: 'Standard BTL rates', port: '+0.1–0.3% vs individual BTL' },
                    { feat: 'Flexibility', btl: 'Add/remove mortgages individually', port: 'Cross-collateralisation risk' },
                  ].map((row, i) => (
                    <tr key={row.feat} className={i % 2 === 0 ? 'bg-[#FAF6F0]' : 'bg-[#F0EBE1]'}>
                      <td className="px-4 py-3 text-[#3D2B1F]">{row.feat}</td>
                      <td className="px-4 py-3 text-right text-[#7A6A5A] text-xs">{row.btl}</td>
                      <td className="px-4 py-3 text-right font-[family-name:var(--font-figures)] text-[#3D2B1F] text-xs">{row.port}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#7A6A5A] leading-relaxed text-sm">
              Paragon is the largest dedicated portfolio lender. Precise Mortgages and Keystone Property Finance
              are also strong options for complex portfolios. Use a specialist BTL mortgage broker — the product
              landscape for portfolio landlords is not well served by comparison sites.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              The stress test challenge
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              BTL lenders do not assess affordability the same way as residential lenders. They use an ICR (interest
              coverage ratio) stress test: the rent must cover the mortgage payment at a hypothetical stress rate,
              by a set multiple. Failing this test means you cannot borrow the amount you want — or borrow at all.
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6 mb-5">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base mb-4">How the stress test works</p>
              <div className="space-y-2 text-sm font-[family-name:var(--font-figures)]">
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Loan amount</span><span className="text-[#3D2B1F]">£160,000</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Stress rate (lender uses 5.5% typically)</span><span className="text-[#3D2B1F]">5.5%</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Annual interest at stress rate</span><span className="text-[#3D2B1F]">£8,800</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Monthly equivalent</span><span className="text-[#3D2B1F]">£733</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between"><span className="text-[#7A6A5A]">ICR required (basic rate taxpayer)</span><span className="text-[#3D2B1F]">125%</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">ICR required (higher rate taxpayer)</span><span className="text-[#3D2B1F]">145%</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Monthly rent required (higher rate)</span><span className="text-[#7C5C3A]">£1,063/month minimum</span></div>
              </div>
              <p className="text-xs text-[#7A6A5A] mt-3">
                If your rent is £950/month and the lender requires £1,063, you must either reduce the loan
                (put more equity in) or find a lender with a lower ICR requirement. Stress rates and ICR ratios
                vary significantly between lenders — always compare through a broker.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Early Repayment Charges: is refinancing worth the fee?
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              ERCs are typically 1–5% of the outstanding mortgage balance, declining over the fixed term. If you
              are 2 years into a 5-year fix, breaking early could cost £3,000–£8,000 on a £160,000 mortgage.
              The break-even test is straightforward: does the saving on the new rate, over the remaining term,
              exceed the ERC?
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6 mb-4">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base mb-4">ERC break-even worked example</p>
              <div className="space-y-2 text-sm font-[family-name:var(--font-figures)]">
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Current rate</span><span className="text-[#3D2B1F]">6.2%</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">New available rate</span><span className="text-[#3D2B1F]">4.8%</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Mortgage balance</span><span className="text-[#3D2B1F]">£160,000</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Annual saving at new rate</span><span className="text-[#3D2B1F]">£2,240</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Monthly saving</span><span className="text-[#3D2B1F]">£187</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between"><span className="text-[#7A6A5A]">ERC (2% of balance)</span><span className="text-[#B84040]">£3,200</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Legal/valuation fees</span><span className="text-[#B84040]">£800</span></div>
                <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Total break-even cost</span><span className="text-[#B84040]">£4,000</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-[#3D2B1F]">Break-even period</span>
                  <span className="text-[#4A7A52]">21 months</span>
                </div>
              </div>
              <p className="text-xs text-[#7A6A5A] mt-3">
                If there are more than 21 months remaining on the new product, it makes financial sense to break
                early and pay the ERC. With 3 years remaining, you save £3,040 net of all fees.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Worked example: £500K portfolio releasing £80K equity
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              This is the most common scenario: a portfolio that has grown in value, with mortgages taken out at
              original purchase price. Refinancing to 75% LTV on the new values releases capital to redeploy.
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6">
              <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.12em] uppercase text-[#7A6A5A] mb-4">
                Portfolio: 3 properties, total portfolio value now £500,000
              </p>
              <div className="space-y-2 text-sm font-[family-name:var(--font-figures)]">
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Current total mortgage balances</span><span className="text-[#3D2B1F]">£295,000</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Current blended LTV</span><span className="text-[#3D2B1F]">59%</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">75% LTV on current values</span><span className="text-[#3D2B1F]">£375,000</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Equity available to release (75% LTV)</span><span className="text-[#4A7A52]">£80,000</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between"><span className="text-[#7A6A5A]">New total mortgage balance</span><span className="text-[#3D2B1F]">£375,000</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Additional annual interest (5% on £80K)</span><span className="text-[#B84040]">£4,000</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">£80K as deposit = 25% on £320K property</span><span className="text-[#3D2B1F]">4th property</span></div>
              </div>
              <p className="text-xs text-[#7A6A5A] mt-4">
                Tax note: the £80,000 released is a loan, not income — no immediate income tax arises. The additional
                £4,000/year interest qualifies for the 20% Section 24 credit (£800 tax credit). Net additional cost
                is £4,000 minus the tax credit, assuming standard mortgage interest relief treatment.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Limited company refinancing
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Company BTL mortgages have grown significantly since Section 24 made individual ownership more expensive
              for higher-rate taxpayers. The mechanics differ from personal mortgages in important ways.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                {
                  title: 'Rate premium',
                  body: 'Company BTL mortgages carry a rate premium of typically 0.3–0.7% over comparable personal BTL products. The Section 24 saving often more than compensates for higher-rate taxpayers with larger mortgages.',
                },
                {
                  title: 'Personal guarantee',
                  body: 'Most company BTL lenders require personal guarantees from directors. You remain personally liable — the limited company structure does not eliminate lender recourse against you.',
                },
                {
                  title: 'Director salary / dividend',
                  body: 'Lenders assess company income differently. Some use director income, some use portfolio rental income from the company. Broker knowledge of individual lender policies is essential.',
                },
                {
                  title: 'SPV structure',
                  body: 'Most specialist lenders prefer loans to Special Purpose Vehicles (SPVs) set up solely for property — SIC code 68100. Mixed-business companies complicate underwriting.',
                },
              ].map(card => (
                <div key={card.title} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                  <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-2">{card.title}</p>
                  <p className="text-xs text-[#7A6A5A] leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Frequently asked questions
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: 'How long does a BTL remortgage take?',
                  a: 'A straightforward product transfer can complete in days. A full remortgage with a new lender takes 4–8 weeks typically: 1–2 weeks for the application and credit check, 1–2 weeks for valuation, 1–2 weeks for legal work. Complex portfolio cases can take 10–12 weeks. Start the process 3–4 months before your fixed rate expires.',
                },
                {
                  q: 'Can I remortgage to fund a deposit on a new property?',
                  a: 'Yes — this is equity release and it is one of the most common growth strategies for portfolio landlords. You need sufficient equity in the property (lenders typically want to stay at or below 75% LTV) and the rental income must pass the stress test at the higher loan amount. The cash you receive is a loan, not income, so no income tax arises on the release.',
                },
                {
                  q: 'What LTV can I get as a portfolio landlord?',
                  a: 'Most BTL lenders offer up to 75% LTV. Some specialist lenders go to 80% for strong portfolio cases, but at a significant rate premium. Since the PRA rules in 2017, lenders must assess the whole portfolio when a landlord holds 4+ mortgaged properties — which means one weak property can cap borrowing across the whole portfolio.',
                },
                {
                  q: 'Should I use a mortgage broker?',
                  a: 'Yes, for portfolio cases. The BTL market has significant variation in stress test rates, ICR requirements, and acceptable portfolio structures between lenders. A broker who specialises in portfolio BTL (not just any broker) will access lenders not available on the high street — and will know which lender is most likely to approve your specific case before you apply, saving both time and credit file impact from rejections.',
                },
              ].map(item => (
                <div key={item.q} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6">
                  <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base mb-2">{item.q}</p>
                  <p className="text-sm text-[#7A6A5A] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Related guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { href: '/guides/buy-to-let-mortgage-portfolio', label: 'Portfolio Landlord Mortgages', desc: 'What lenders need when you hold 4 or more mortgaged properties.' },
                { href: '/guides/buy-to-let-roi-guide', label: 'Buy-to-Let ROI Guide', desc: 'Calculate net yield, cash-on-cash return, and total return before buying.' },
                { href: '/guides/property-portfolio-tax-guide', label: 'Property Tax Guide', desc: 'Section 24, CGT, and whether incorporation makes sense for your portfolio.' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5 hover:border-[#7C5C3A] transition-colors"
                >
                  <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base mb-2">{link.label}</p>
                  <p className="text-xs text-[#7A6A5A]">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="h-px bg-[#DDD4C5] my-14" />

        <section className="bg-[#3D2B1F] rounded-2xl p-12 text-center" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(124,92,58,0.2) 0%, transparent 60%)' }}>
          <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[#DDD4C5] mb-4">
            PropertyBrief
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-[#FAF6F0] mb-4" style={{ fontSize: '36px', lineHeight: 1.1 }}>
            See LTV and equity across your whole portfolio
          </h2>
          <p className="text-[#DDD4C5] mb-8 max-w-[440px] mx-auto font-light text-sm">
            PropertyBrief shows LTV, equity position, and mortgage maturity dates across every property &mdash;
            so you know exactly when and where to refinance next.
          </p>
          <Link
            href="https://estatebrief.com/app/upload"
            className="inline-flex items-center gap-2 bg-[#7C5C3A] text-[#FAF6F0] px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-[#664B2E] transition-colors"
          >
            Upload your portfolio
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </section>
      </article>

      <footer className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="h-px bg-[#DDD4C5] mb-8" />
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-heading)] text-lg text-[#7A6A5A]">PropertyBrief</span>
          <div className="flex items-center gap-6 text-sm text-[#7A6A5A]">
            <Link href="/auth/login" className="hover:text-[#3D2B1F] transition-colors">Login</Link>
            <Link href="/privacy" className="hover:text-[#3D2B1F] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#3D2B1F] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
