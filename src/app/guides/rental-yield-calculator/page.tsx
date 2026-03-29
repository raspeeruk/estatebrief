import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Rental Yield Calculator: Gross & Net Yield Explained | PropertyBrief',
  description: 'Calculate gross and net rental yield with worked examples. Includes UK yield benchmarks by region (London, Manchester, Liverpool, Leeds), stamp duty impact, and yield vs capital growth.',
  openGraph: {
    title: 'Rental Yield Calculator: Gross & Net Yield Explained',
    description: 'Gross yield formula, net yield calculation, UK benchmarks by city, stamp duty impact on returns, and yield vs capital growth — everything a UK landlord needs.',
    type: 'article',
  },
}

export default function RentalYieldCalculatorPage() {
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
            Guide &mdash; Yield &amp; Returns
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-6" style={{ fontSize: '52px', lineHeight: 1.05 }}>
            Rental Yield Calculator: Gross &amp; Net Yield Explained
          </h1>
          <p className="text-xl text-[#7A6A5A] leading-relaxed font-light">
            Rental yield is the most-quoted metric in buy-to-let — and the most frequently misused. Gross yield
            and net yield tell you completely different things. Here is how to calculate both correctly, what counts
            as a good yield in different UK cities, and how stamp duty quietly erodes your returns.
          </p>
        </div>

        <div className="h-px bg-[#DDD4C5] my-10" />

        <div className="space-y-10">

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Gross yield formula with worked examples
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Gross yield is the starting point. It tells you the income return on a property before any costs are
              deducted. It is useful for quickly comparing investment opportunities — not for understanding whether
              a property is genuinely profitable.
            </p>
            <div className="bg-[#3D2B1F] rounded-xl px-6 py-5 mb-6">
              <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-lg mb-2">
                Gross Yield = (Annual Rent &divide; Property Value) &times; 100
              </p>
              <p className="text-[#DDD4C5] text-sm">
                Or equivalently: (Monthly Rent &times; 12) &divide; Property Value &times; 100
              </p>
            </div>
            <div className="space-y-4">
              {[
                { city: 'Manchester flat', rent: 1050, value: 175000, yield: 7.2 },
                { city: 'Leeds terrace', rent: 850, value: 145000, yield: 7.0 },
                { city: 'Liverpool semi', rent: 750, value: 130000, yield: 6.9 },
                { city: 'London (SE) flat', rent: 1800, value: 420000, yield: 5.1 },
                { city: 'London (SW) flat', rent: 2200, value: 650000, yield: 4.1 },
              ].map(ex => (
                <div key={ex.city} className="flex items-center gap-4 bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg px-5 py-3">
                  <div className="flex-1">
                    <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm">{ex.city}</p>
                    <p className="text-xs text-[#7A6A5A]">£{ex.rent.toLocaleString()}/month &middot; £{ex.value.toLocaleString()} value</p>
                  </div>
                  <div className="text-right">
                    <p
                      className="font-[family-name:var(--font-figures)] text-xl font-semibold"
                      style={{ color: ex.yield >= 6 ? '#4A7A52' : ex.yield >= 5 ? '#7C5C3A' : '#B84040' }}
                    >
                      {ex.yield}%
                    </p>
                    <p className="text-[9px] text-[#7A6A5A] uppercase tracking-wider">gross yield</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Net yield calculation
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Net yield is the honest number. It subtracts all of the costs that actually erode your income:
              mortgage interest, letting agent fees, insurance, maintenance, and void periods.
            </p>
            <div className="bg-[#3D2B1F] rounded-xl px-6 py-5 mb-6">
              <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-lg mb-2">
                Net Yield = (Annual Rent &minus; Annual Costs) &divide; Property Value &times; 100
              </p>
            </div>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6 mb-5">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base mb-4">Worked example: Manchester flat at 7.2% gross</p>
              <div className="space-y-2 text-sm font-[family-name:var(--font-figures)]">
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Annual rent (12 &times; £1,050)</span><span className="text-[#3D2B1F]">£12,600</span></div>
                <div className="h-px bg-[#DDD4C5] my-1" />
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Letting agent (12% inc. VAT)</span><span className="text-[#7A6A5A]">&minus; £1,512</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Landlord insurance</span><span className="text-[#7A6A5A]">&minus; £320</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Maintenance reserve (1%)</span><span className="text-[#7A6A5A]">&minus; £1,750</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Void allowance (3 weeks)</span><span className="text-[#7A6A5A]">&minus; £727</span></div>
                <div className="h-px bg-[#DDD4C5] my-1" />
                <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Net annual income</span><span className="text-[#3D2B1F]">£8,291</span></div>
                <div className="h-px bg-[#DDD4C5] my-1" />
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-[#3D2B1F]">Net yield</span>
                  <span className="text-[#4A7A52]">4.7%</span>
                </div>
              </div>
              <p className="text-xs text-[#7A6A5A] mt-3">
                Note: mortgage interest excluded here. If you have a £130,000 mortgage at 5%, that is a further
                £6,500 in costs — turning this into a negative cashflow property before tax.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              What counts as a good yield by UK region
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-6">
              &ldquo;Good yield&rdquo; is relative to property values in each market. In London, a 5% gross yield is considered
              solid. In Sunderland, you might demand 9% gross to justify the higher vacancy and management risk.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#3D2B1F] text-[#FAF6F0]">
                    <th className="text-left px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">City / Region</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Typical Gross Yield</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Capital Growth Profile</th>
                    <th className="text-left px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Investor Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { city: 'Liverpool', yield: '7–9%', growth: 'Moderate', profile: 'High income, lower growth — suits cashflow investors' },
                    { city: 'Manchester', yield: '6–8%', growth: 'Strong', profile: 'Best of both — high yield and solid capital growth' },
                    { city: 'Leeds', yield: '6–7.5%', growth: 'Moderate-strong', profile: 'Strong student and professional demand' },
                    { city: 'Birmingham', yield: '5.5–7%', growth: 'Moderate-strong', profile: 'Large market, lots of variability by area' },
                    { city: 'Sheffield', yield: '5.5–7%', growth: 'Moderate', profile: 'Reliable yields, lower entry prices than Manchester' },
                    { city: 'Bristol', yield: '4.5–6%', growth: 'Strong', profile: 'Strong growth story, tighter yields than North' },
                    { city: 'London (Outer)', yield: '4.5–5.5%', growth: 'Strong long-term', profile: 'Low cashflow, high capital growth potential' },
                    { city: 'London (Prime)', yield: '3–4.5%', growth: 'Historically strong', profile: 'Income-negative on leverage, capital preservation play' },
                  ].map((row, i) => (
                    <tr key={row.city} className={i % 2 === 0 ? 'bg-[#FAF6F0]' : 'bg-[#F0EBE1]'}>
                      <td className="px-4 py-3 font-[family-name:var(--font-heading)] text-[#3D2B1F]">{row.city}</td>
                      <td className="px-4 py-3 text-right font-[family-name:var(--font-figures)] text-[#4A7A52] font-semibold">{row.yield}</td>
                      <td className="px-4 py-3 text-right text-[#7A6A5A] text-xs">{row.growth}</td>
                      <td className="px-4 py-3 text-[#7A6A5A] text-xs">{row.profile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#7A6A5A] mt-3">
              Indicative figures based on residential BTL market conditions. HMO, commercial, and short-let yields vary significantly.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Yield vs capital growth: which matters more?
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              This debate never gets old because the right answer depends entirely on your financial position,
              tax situation, and time horizon. Here is a clear framework:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-lg mb-3">Prioritise yield if&hellip;</h3>
                <ul className="space-y-2">
                  {[
                    'You need the portfolio to generate income now',
                    'You are highly leveraged and cashflow is tight',
                    'You are a basic-rate taxpayer (Section 24 is less punishing)',
                    'You plan to hold properties for under 10 years',
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
                <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-lg mb-3">Prioritise capital growth if&hellip;</h3>
                <ul className="space-y-2">
                  {[
                    'You have other income and do not need rent to live on',
                    'You are building long-term wealth for retirement',
                    'You are a higher-rate taxpayer (rental income is heavily taxed)',
                    'You want to refinance and pull equity out over time',
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
            </div>
            <p className="text-[#7A6A5A] leading-relaxed text-sm">
              Total return — the combination of income return and capital return — is always the right metric for
              comparing across markets. A Manchester property at 7% gross and 4% annual capital growth can
              outperform a London property at 4% gross and 6% capital growth on a 10-year, leveraged basis
              depending on your mortgage cost of capital.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              How stamp duty reduces your effective yield
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Since April 2025, second-home and BTL buyers pay a 5% stamp duty surcharge on top of standard rates.
              This is a significant upfront cost that most yield calculations fail to account for — and it meaningfully
              changes the economics, especially at lower price points.
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6 mb-4">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base mb-4">Stamp duty impact on yield: £175,000 property</p>
              <div className="space-y-2 text-sm font-[family-name:var(--font-figures)]">
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Purchase price</span><span className="text-[#3D2B1F]">£175,000</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">SDLT (BTL surcharge)</span><span className="text-[#B84040]">£8,750</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Legal fees + survey</span><span className="text-[#7A6A5A]">£2,500</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Total cost basis</span><span className="text-[#3D2B1F]">£186,250</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Monthly rent</span><span className="text-[#3D2B1F]">£1,050</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Gross yield on purchase price</span><span className="text-[#4A7A52]">7.2%</span></div>
                <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Gross yield on total cost basis</span><span className="text-[#B84040]">6.8%</span></div>
              </div>
            </div>
            <p className="text-[#7A6A5A] leading-relaxed text-sm">
              The difference between 7.2% and 6.8% gross yield matters most when you are close to the ICR threshold
              for a mortgage application. Always calculate yield on total cost basis (purchase price + SDLT + costs)
              rather than purchase price alone for a realistic picture.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Related guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { href: '/guides/property-portfolio-report', label: 'Property Portfolio Report', desc: 'How to present your portfolio to banks, investors, and solicitors professionally.' },
                { href: '/guides/landlord-portfolio-tracker', label: 'Landlord Portfolio Tracker', desc: 'Track rent, yield, and capital growth across your whole portfolio.' },
                { href: '/guides/buy-to-let-mortgage-portfolio', label: 'Portfolio Landlord Mortgages', desc: 'What lenders need from you when you hold 4 or more mortgaged properties.' },
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
            Calculate yield for every property you own
          </h2>
          <p className="text-[#DDD4C5] mb-8 max-w-[420px] mx-auto font-light text-sm">
            Upload your portfolio CSV. PropertyBrief calculates gross yield, net yield, and total return for
            every property &mdash; then generates a professional PDF report. Free for up to 3 properties.
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
