import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Property Portfolio Tax Guide: What UK Landlords Must Know in 2025 | PropertyBrief',
  description: 'Section 24 mortgage interest restriction, CGT rates on rental property (18%/24%), 60-day reporting, SDLT surcharge, allowable expenses, and whether to incorporate your portfolio.',
  openGraph: {
    title: 'Property Portfolio Tax Guide: What UK Landlords Must Know in 2025',
    description: 'Section 24 explained, CGT on rental property, SDLT surcharges, allowable expenses, and the incorporation question — everything a UK landlord needs to stay compliant and tax-efficient.',
    type: 'article',
  },
}

export default function PropertyPortfolioTaxGuidePage() {
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
            Guide &mdash; Tax &amp; Compliance
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-6" style={{ fontSize: '52px', lineHeight: 1.05 }}>
            Property Portfolio Tax Guide: What UK Landlords Must Know in 2025
          </h1>
          <p className="text-xl text-[#7A6A5A] leading-relaxed font-light">
            Tax is the single biggest drag on landlord returns — and it has got significantly harder since 2020.
            Section 24, the CGT rate change, and the 60-day reporting window have all shifted the landscape.
            Here is what you actually need to know, with worked numbers.
          </p>
        </div>

        <div className="h-px bg-[#DDD4C5] my-10" />

        <div className="space-y-10">

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Section 24: the mortgage interest restriction
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Before 2017, landlords could deduct mortgage interest as a cost against rental income. Section 24 of
              the Finance Act phased that out entirely. Since April 2020, you cannot deduct mortgage interest at all
              — instead you receive a basic rate (20%) tax credit on the interest paid. For higher-rate taxpayers,
              this is a massive difference.
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6 mb-5">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base mb-4">
                Worked example: Higher-rate taxpayer before vs after Section 24
              </p>
              <p className="text-xs text-[#7A6A5A] mb-4">
                Assumptions: £2,000/month rent (£24,000/year), £800/month mortgage interest (£9,600/year),
                other costs £3,000/year. Higher-rate taxpayer (40%).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#F0EBE1] rounded-lg p-4">
                  <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.12em] uppercase text-[#7A6A5A] mb-3">Before Section 24</p>
                  <div className="space-y-1.5 text-sm font-[family-name:var(--font-figures)]">
                    <div className="flex justify-between"><span className="text-[#7A6A5A]">Annual rent</span><span className="text-[#3D2B1F]">£24,000</span></div>
                    <div className="flex justify-between"><span className="text-[#7A6A5A]">Mortgage interest</span><span className="text-[#7A6A5A]">&minus; £9,600</span></div>
                    <div className="flex justify-between"><span className="text-[#7A6A5A]">Other costs</span><span className="text-[#7A6A5A]">&minus; £3,000</span></div>
                    <div className="h-px bg-[#DDD4C5]" />
                    <div className="flex justify-between"><span className="text-[#3D2B1F]">Taxable profit</span><span className="text-[#3D2B1F]">£11,400</span></div>
                    <div className="flex justify-between"><span className="text-[#7A6A5A]">Tax at 40%</span><span className="text-[#B84040]">&minus; £4,560</span></div>
                    <div className="h-px bg-[#DDD4C5]" />
                    <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Net profit</span><span className="text-[#4A7A52]">£6,840</span></div>
                  </div>
                </div>
                <div className="bg-[#F0EBE1] rounded-lg p-4">
                  <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.12em] uppercase text-[#7A6A5A] mb-3">After Section 24 (2025)</p>
                  <div className="space-y-1.5 text-sm font-[family-name:var(--font-figures)]">
                    <div className="flex justify-between"><span className="text-[#7A6A5A]">Annual rent</span><span className="text-[#3D2B1F]">£24,000</span></div>
                    <div className="flex justify-between"><span className="text-[#7A6A5A]">Other costs only</span><span className="text-[#7A6A5A]">&minus; £3,000</span></div>
                    <div className="flex justify-between"><span className="text-[#7A6A5A]">Mortgage interest</span><span className="text-[#7A6A5A]">not deducted</span></div>
                    <div className="h-px bg-[#DDD4C5]" />
                    <div className="flex justify-between"><span className="text-[#3D2B1F]">Taxable profit</span><span className="text-[#3D2B1F]">£21,000</span></div>
                    <div className="flex justify-between"><span className="text-[#7A6A5A]">Tax at 40%</span><span className="text-[#B84040]">&minus; £8,400</span></div>
                    <div className="flex justify-between"><span className="text-[#7A6A5A]">20% credit on interest</span><span className="text-[#4A7A52]">+ £1,920</span></div>
                    <div className="h-px bg-[#DDD4C5]" />
                    <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Net profit</span><span className="text-[#B84040]">£3,420</span></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#7A6A5A] mt-4">
                Section 24 has more than halved net profit on this property — from £6,840 to £3,420 — without any
                change in rent, costs, or mortgage rate. Basic-rate taxpayers are unaffected; the impact falls
                entirely on higher and additional-rate taxpayers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Capital Gains Tax on residential property
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              From October 2024, CGT rates on residential property changed. The main rates are now 18% for basic-rate
              taxpayers and 24% for higher-rate taxpayers. The previous rates (18%/28%) were reduced on the higher
              rate band. You also need to know about the annual exemption and the 60-day reporting rule.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#3D2B1F] text-[#FAF6F0]">
                    <th className="text-left px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Taxpayer Band</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">CGT Rate (from Oct 2024)</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Previous Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { band: 'Basic rate (up to £50,270)', rate: '18%', prev: '18%' },
                    { band: 'Higher rate (£50,270–£125,140)', rate: '24%', prev: '28%' },
                    { band: 'Additional rate (over £125,140)', rate: '24%', prev: '28%' },
                  ].map((row, i) => (
                    <tr key={row.band} className={i % 2 === 0 ? 'bg-[#FAF6F0]' : 'bg-[#F0EBE1]'}>
                      <td className="px-4 py-3 text-[#3D2B1F] font-[family-name:var(--font-body)]">{row.band}</td>
                      <td className="px-4 py-3 text-right font-[family-name:var(--font-figures)] text-[#4A7A52] font-semibold">{row.rate}</td>
                      <td className="px-4 py-3 text-right text-[#7A6A5A] font-[family-name:var(--font-figures)]">{row.prev}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#3D2B1F] rounded-xl px-6 py-5 mb-5">
              <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-lg mb-2">
                Annual CGT exemption 2024/25: £3,000
              </p>
              <p className="text-[#DDD4C5] text-sm">
                Down from £12,300 in 2022/23. The dramatic reduction means almost all property sales now generate
                a CGT liability. The exemption is per person — couples can use both allowances (£6,000 combined)
                if the property is jointly owned.
              </p>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-3" style={{ fontSize: '22px' }}>
              The 60-day CGT reporting deadline
            </h3>
            <p className="text-[#7A6A5A] leading-relaxed mb-4">
              Since April 2020, you must report and pay any CGT owed on a residential property sale within 60 days
              of completion. This applies even if your total tax return is not yet due. Missing the deadline results
              in automatic penalties starting at £100, rising the longer you wait. Your solicitor should flag this
              at completion — but many do not. The report is filed through HMRC&apos;s online Capital Gains Tax service.
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-2">Key CGT rules for landlords</p>
              <ul className="space-y-1.5 text-sm text-[#7A6A5A]">
                {[
                  'Report and pay within 60 days of completion (not exchange)',
                  'Deduct purchase costs, SDLT, legal fees, and genuine capital improvement costs',
                  'Deduct selling costs: estate agent fees, legal fees',
                  'Private Residence Relief (PRR) may apply if you ever lived in the property',
                  'Lettings Relief has been severely restricted since April 2020',
                  'Capital losses from other assets can be offset against gains',
                ].map(pt => (
                  <li key={pt} className="flex gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#7C5C3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Stamp Duty Land Tax on investment property
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              From April 2025, the SDLT surcharge on second homes and investment properties increased from 3% to 5%.
              This applies to every band on top of the standard residential rates. On a £250,000 property, the
              additional SDLT cost is approximately £12,500 compared to a primary residence purchase.
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base mb-4">SDLT calculation on a £220,000 BTL purchase</p>
              <div className="space-y-2 text-sm font-[family-name:var(--font-figures)]">
                <div className="flex justify-between"><span className="text-[#7A6A5A]">£0–£125,000 at 5% (0% standard + 5% surcharge)</span><span className="text-[#3D2B1F]">£6,250</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">£125,001–£220,000 at 10% (5% standard + 5% surcharge)</span><span className="text-[#3D2B1F]">£9,500</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Total SDLT</span><span className="text-[#B84040]">£15,750</span></div>
              </div>
              <p className="text-xs text-[#7A6A5A] mt-3">
                For a first-time buyer purchasing the same property as a primary residence, SDLT would be £0 (first-time
                buyer relief applies up to £300,000). The £15,750 is pure acquisition cost that cannot be recovered
                unless you sell above purchase price.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Allowable expenses landlords can claim
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Allowable expenses reduce your taxable rental income. They do not reduce your mortgage interest
              deduction — that is calculated separately as a 20% tax credit under Section 24. Allowable expenses
              must be wholly and exclusively for the rental business.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {[
                { category: 'Letting agent fees', detail: 'Finding tenants, rent collection, management — all allowable. Typically 8–15% of rent.' },
                { category: 'Repairs and maintenance', detail: 'Fixing what exists — roof repairs, boiler servicing, redecorating between tenancies. Improvements are not allowable.' },
                { category: 'Buildings and contents insurance', detail: 'Landlord-specific policies. Standard home insurance is not valid and cannot be claimed.' },
                { category: 'Professional fees', detail: 'Accountant fees, solicitor fees for tenancy agreements (not property purchase), surveyor costs.' },
                { category: 'Furniture replacement relief', detail: 'Replaced furniture, appliances, or furnishings in furnished lettings. The old wear-and-tear allowance no longer applies.' },
                { category: 'Utility and service costs', detail: 'When you pay utilities during void periods, or service charges on leasehold properties.' },
              ].map(item => (
                <div key={item.category} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                  <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-2">{item.category}</p>
                  <p className="text-xs text-[#7A6A5A] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#F0EBE1] border border-[#DDD4C5] rounded-xl p-5">
              <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.12em] uppercase text-[#B84040] mb-2">Not allowable</p>
              <p className="text-sm text-[#7A6A5A]">
                Capital expenditure (extensions, loft conversions, new kitchens that improve rather than restore),
                private use costs, clothing, and personal travel to view potential purchases. HMRC draws a clear
                line between repairs (allowable) and improvements (not allowable) — and they will challenge grey areas.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Incorporation: should you move your portfolio to a limited company?
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Section 24 only applies to individuals. A limited company can still deduct mortgage interest in full
              before calculating corporation tax. For higher-rate taxpaying landlords with large mortgaged portfolios,
              this creates a compelling case for incorporation. But the entry costs are significant.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-lg mb-3">Pros of incorporating</h3>
                <ul className="space-y-2">
                  {[
                    'Full mortgage interest deductible against corporation tax',
                    'Corporation tax (25%) lower than higher-rate income tax (40%)',
                    'Retain profits in company at lower rate for reinvestment',
                    'Easier to bring in business partners or family members',
                    'Inheritance tax planning opportunities',
                  ].map(pt => (
                    <li key={pt} className="text-sm text-[#7A6A5A] flex gap-2">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#4A7A52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-lg mb-3">Cons of incorporating</h3>
                <ul className="space-y-2">
                  {[
                    'SDLT on full market value at transfer (major upfront cost)',
                    'CGT on any gain at time of transfer (treated as a disposal)',
                    'Company BTL mortgages carry higher rates (0.5–1% premium)',
                    'Annual accountancy costs increase (£1,000–£3,000/year)',
                    'Extracting profits incurs dividend tax on top of corporation tax',
                  ].map(pt => (
                    <li key={pt} className="text-sm text-[#7A6A5A] flex gap-2">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#B84040]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-[#7A6A5A] leading-relaxed text-sm">
              The SDLT and CGT on transfer means incorporation rarely makes sense for existing portfolios with
              low mortgage balances or significant capital gains. It tends to make sense when: you are starting
              fresh, you have a large mortgaged portfolio, and you are a higher or additional rate taxpayer planning
              to hold long-term without extracting income regularly.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Self-assessment for landlords
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              If you earn rental income, you must file a self-assessment tax return each year — even if you are
              a PAYE employee. HMRC expects you to register within 6 months of the end of the first tax year in
              which you receive rental income. The online deadline is 31 January following the tax year end.
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-3">Self-assessment checklist for landlords</p>
              <ul className="space-y-2 text-sm text-[#7A6A5A]">
                {[
                  'Register for self-assessment by 5 October following your first rental year',
                  'Keep records of all rent received — bank statements are the primary evidence',
                  'Keep receipts for every expense you intend to claim',
                  'Record start/end dates for each tenancy and any void periods',
                  'If you use an agent, request a year-end statement showing all income and fees',
                  'Submit by 31 January online (or 31 October for paper returns)',
                  'Payment on account: HMRC may require advance payments if your tax bill exceeds £1,000',
                ].map(pt => (
                  <li key={pt} className="flex gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#7C5C3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Frequently asked questions
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: 'Does Section 24 apply to limited companies?',
                  a: 'No. Section 24 only applies to individual landlords. A limited company can still deduct mortgage interest in full before calculating corporation tax. This is the primary reason higher-rate taxpaying landlords consider incorporation.',
                },
                {
                  q: 'What is the CGT deadline after selling a rental property?',
                  a: 'You must report the gain and pay any tax owed within 60 days of the completion date — not the exchange date. File through HMRC\'s online Capital Gains Tax service. Missing this deadline triggers automatic penalties, starting at £100.',
                },
                {
                  q: 'Can I claim travel costs to visit my rental properties?',
                  a: 'HMRC allows travel costs to manage existing lettings — for example, travelling to inspect the property or meet a contractor. Travel to view potential purchases is not allowable. Keep mileage logs or transport receipts as evidence.',
                },
                {
                  q: 'Should I incorporate my property portfolio?',
                  a: 'Only if you are a higher/additional rate taxpayer, have a large mortgaged portfolio, and plan to hold for the long term without extracting income regularly. The SDLT and potential CGT on transfer are significant entry costs that take years to recoup through the tax saving. Always get specialist advice before transferring.',
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
                { href: '/guides/buy-to-let-roi-guide', label: 'Buy-to-Let ROI Guide', desc: 'How to calculate gross yield, net yield, and cash-on-cash return on any property.' },
                { href: '/guides/refinancing-a-property-portfolio', label: 'Refinancing Your Portfolio', desc: 'When to remortgage, how stress tests work, and which lenders offer portfolio products.' },
                { href: '/guides/rental-yield-calculator', label: 'Rental Yield Calculator', desc: 'Gross and net yield explained with UK city benchmarks.' },
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
            Your accountant will love your income summary
          </h2>
          <p className="text-[#DDD4C5] mb-8 max-w-[420px] mx-auto font-light text-sm">
            PropertyBrief generates an annual income and expense summary broken down by property — ready to hand
            to your accountant at self-assessment time. Free for up to 3 properties.
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
