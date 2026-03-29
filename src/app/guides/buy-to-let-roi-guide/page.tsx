import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Buy-to-Let ROI: How to Calculate Whether a Property Is Worth Buying | PropertyBrief',
  description: 'Gross yield, net yield, cash-on-cash return, and total return explained with worked examples. Includes UK regional yield benchmarks and a full BTL ROI calculation on a £220,000 property.',
  openGraph: {
    title: 'Buy-to-Let ROI: How to Calculate Whether a Property Is Worth Buying',
    description: 'The four returns every landlord must calculate before buying. Worked example: £220,000 property, 25% deposit, £950/month rent. Regional yield table included.',
    type: 'article',
  },
}

export default function BuyToLetROIGuidePage() {
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
            Guide &mdash; Returns &amp; Analysis
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-6" style={{ fontSize: '52px', lineHeight: 1.05 }}>
            Buy-to-Let ROI: How to Calculate Whether a Property Is Worth Buying
          </h1>
          <p className="text-xl text-[#7A6A5A] leading-relaxed font-light">
            Most landlords buy on gross yield alone. That is a mistake. Gross yield ignores costs, leverage, voids,
            and tax — the four things that determine whether you actually make money. Here are the four returns that
            matter, and how to calculate each one before you commit to a purchase.
          </p>
        </div>

        <div className="h-px bg-[#DDD4C5] my-10" />

        <div className="space-y-10">

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              The four returns every landlord must calculate
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-6">
              Each metric tells you something different. Use all four together to build a complete picture of
              whether a property justifies the capital and management burden.
            </p>
            <div className="space-y-4">
              {[
                { name: 'Gross yield', formula: 'Annual rent ÷ purchase price × 100', use: 'Quick comparison tool. Ignores all costs. Use for shortlisting only.', caution: true },
                { name: 'Net yield', formula: '(Annual rent − all costs) ÷ purchase price × 100', use: 'Real income return before leverage. Includes voids, agent fees, maintenance, insurance.', caution: false },
                { name: 'Cash-on-cash return', formula: 'Net income after mortgage payments ÷ deposit paid × 100', use: 'The number that matters most for leveraged investors. Measures return on capital deployed.', caution: false },
                { name: 'Total return', formula: 'Cash-on-cash return + annual capital growth rate', use: 'Long-term measure. Accounts for appreciation. Requires assumptions about future growth.', caution: false },
              ].map(item => (
                <div key={item.name} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base">{item.name}</p>
                    {item.caution && (
                      <span className="shrink-0 text-[10px] font-[family-name:var(--font-body)] font-semibold tracking-wider uppercase bg-[#F0EBE1] text-[#B84040] px-2 py-1 rounded">
                        Not enough on its own
                      </span>
                    )}
                  </div>
                  <div className="bg-[#3D2B1F] rounded-lg px-4 py-2 mb-3">
                    <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-sm">{item.formula}</p>
                  </div>
                  <p className="text-sm text-[#7A6A5A]">{item.use}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Gross yield: the starting point
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Gross yield is quick and universal — every agent and listing site uses it. That makes it useful for
              filtering. A Manchester flat at 3% gross yield is worth no further analysis. One at 7.5% warrants
              deeper work. Nothing more.
            </p>
            <div className="bg-[#3D2B1F] rounded-xl px-6 py-5 mb-5">
              <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-lg mb-1">
                Gross Yield = (Annual Rent &divide; Purchase Price) &times; 100
              </p>
              <p className="text-[#DDD4C5] text-sm">
                Use purchase price, not market value — they are the same at acquisition but diverge as the property appreciates.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Net yield: accounting for the real costs
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Net yield strips out the costs that gross yield ignores. Voids are the most commonly underestimated.
              The UK average void period is around 3 weeks per year — that is roughly 6% of gross rent gone before
              anything else. Add agent fees, insurance, and a maintenance reserve and you lose another 15–20%.
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6 mb-4">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-3">Standard cost deductions for net yield</p>
              <div className="space-y-2 text-sm font-[family-name:var(--font-figures)]">
                {[
                  { item: 'Void allowance (8% of gross rent — approx. 4 weeks)', val: '−8%' },
                  { item: 'Letting agent management fee (10–15% inc. VAT)', val: '−12%' },
                  { item: 'Buildings and landlord insurance', val: '−1.5%' },
                  { item: 'Maintenance reserve (1% of property value/year)', val: '−varies' },
                  { item: 'Ground rent / service charges (leasehold)', val: '−varies' },
                ].map(row => (
                  <div key={row.item} className="flex justify-between">
                    <span className="text-[#7A6A5A]">{row.item}</span>
                    <span className="text-[#B84040] font-semibold">{row.val}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#7A6A5A] mt-3">
                Mortgage interest is excluded from net yield by convention. It goes into cash-on-cash return instead.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Cash-on-cash return: the number that actually matters
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Cash-on-cash return measures what your actual money earns. If you put down a £55,000 deposit and
              receive £4,000/year in net income after the mortgage payment, your cash-on-cash return is 7.3%.
              This is what you compare to other uses of that £55,000 — premium bonds, equities, other properties.
            </p>
            <div className="bg-[#3D2B1F] rounded-xl px-6 py-5 mb-6">
              <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-lg mb-1">
                Cash-on-Cash = Annual net income after mortgage ÷ Total cash invested &times; 100
              </p>
              <p className="text-[#DDD4C5] text-sm">
                Total cash invested = deposit + SDLT + legal fees + any refurbishment costs
              </p>
            </div>

            <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '26px' }}>
              Worked example: £220,000 property with 25% deposit
            </h3>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6 mb-4">
              <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.12em] uppercase text-[#7A6A5A] mb-4">
                Property details
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-[family-name:var(--font-figures)] mb-6">
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Purchase price</span><span className="text-[#3D2B1F]">£220,000</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Monthly rent</span><span className="text-[#3D2B1F]">£950</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Deposit (25%)</span><span className="text-[#3D2B1F]">£55,000</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">BTL mortgage rate</span><span className="text-[#3D2B1F]">6%</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Mortgage balance</span><span className="text-[#3D2B1F]">£165,000</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Interest only payment/month</span><span className="text-[#3D2B1F]">£825</span></div>
              </div>
              <div className="h-px bg-[#DDD4C5] mb-4" />
              <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.12em] uppercase text-[#7A6A5A] mb-3">
                ROI calculation
              </p>
              <div className="space-y-1.5 text-sm font-[family-name:var(--font-figures)]">
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Annual rent</span><span className="text-[#3D2B1F]">£11,400</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Gross yield on purchase price</span><span className="text-[#7A6A5A]">5.2%</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Void allowance (8%)</span><span className="text-[#B84040]">− £912</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Letting agent (12%)</span><span className="text-[#B84040]">− £1,368</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Insurance</span><span className="text-[#B84040]">− £300</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Maintenance reserve</span><span className="text-[#B84040]">− £800</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Net income before mortgage</span><span className="text-[#3D2B1F]">£8,020</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Net yield</span><span className="text-[#4A7A52]">3.6%</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Annual mortgage interest</span><span className="text-[#B84040]">− £9,900</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Annual cashflow after mortgage</span><span className="text-[#B84040]">− £1,880</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-[#3D2B1F]">Cash-on-cash return</span>
                  <span className="text-[#B84040]">−3.4%</span>
                </div>
              </div>
              <p className="text-xs text-[#7A6A5A] mt-4">
                This property is cashflow negative at a 6% mortgage rate. The investor is paying £157/month to hold
                it. This may still be rational if capital growth at 3–4%/year adds £6,600–£8,800 in equity annually
                — but it requires conviction in growth and the ability to absorb the monthly shortfall.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              UK regional yield benchmarks
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-6">
              Gross yield varies enormously by region. The trade-off is always yield vs. capital growth potential.
              Northern cities offer higher income; London and the South offer superior long-term appreciation.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#3D2B1F] text-[#FAF6F0]">
                    <th className="text-left px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Region</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Gross Yield</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Capital Growth</th>
                    <th className="text-left px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Investor verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { region: 'London (Prime)', gross: '3–4%', growth: 'High', verdict: 'Capital play only. Likely cashflow negative on any mortgage.' },
                    { region: 'London (Outer)', gross: '4–5.5%', growth: 'Moderate-high', verdict: 'Borderline cashflow. Long-term equity play.' },
                    { region: 'Bristol', gross: '4.5–6%', growth: 'Moderate-high', verdict: 'Good growth story, tight yields vs. North.' },
                    { region: 'Birmingham', gross: '5–7%', growth: 'Moderate', verdict: 'Large market — yield varies significantly by area.' },
                    { region: 'Leeds', gross: '5–7.5%', growth: 'Moderate', verdict: 'Strong student and professional demand. Reliable.' },
                    { region: 'Manchester', gross: '6–8%', growth: 'Strong', verdict: 'Best risk-adjusted return in UK for BTL investors.' },
                    { region: 'Liverpool', gross: '6–9%', growth: 'Moderate', verdict: 'Highest yields in major cities. Lower capital growth.' },
                  ].map((row, i) => (
                    <tr key={row.region} className={i % 2 === 0 ? 'bg-[#FAF6F0]' : 'bg-[#F0EBE1]'}>
                      <td className="px-4 py-3 font-[family-name:var(--font-heading)] text-[#3D2B1F]">{row.region}</td>
                      <td className="px-4 py-3 text-right font-[family-name:var(--font-figures)] text-[#4A7A52] font-semibold">{row.gross}</td>
                      <td className="px-4 py-3 text-right text-[#7A6A5A] text-xs">{row.growth}</td>
                      <td className="px-4 py-3 text-[#7A6A5A] text-xs">{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#7A6A5A] mt-3">
              Indicative figures for standard residential BTL. HMO yields are typically 2–4% higher but management-intensive.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Capital growth vs yield: the regional trade-off
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              The key insight: leverage amplifies both income return and capital return. A Manchester property with
              6.5% net yield and 3% annual capital growth outperforms a London property with 4% net yield and 5%
              capital growth over 10 years on a leveraged basis — because the Manchester mortgage is cheaper relative
              to income, so you retain more cashflow to deploy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-lg mb-3">Prioritise yield if&hellip;</h3>
                <ul className="space-y-2">
                  {[
                    'You need the income to live on or service other debt',
                    'You are a higher-rate taxpayer (rental income taxed at 40%)',
                    'You want to hold fewer properties with stronger cashflow',
                    'You are in the accumulation phase and plan to reinvest income',
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
                    'You have other income and do not need rent to cover costs',
                    'You want to refinance and extract equity over time',
                    'Your investment horizon is 15+ years',
                    'You are building for retirement wealth rather than income now',
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
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Frequently asked questions
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: 'What is a good rental yield in the UK?',
                  a: 'Gross yield above 6% is generally considered good for BTL. Net yield above 4% is solid. In Northern cities you can find properties at 7–9% gross; in London 4–5% gross is typical. The real benchmark is cash-on-cash return — anything positive after mortgage payments in the current rate environment is respectable.',
                },
                {
                  q: 'How does leverage affect ROI?',
                  a: 'Leverage amplifies returns in both directions. If you buy a £200,000 property with a £50,000 deposit and it grows 5% to £210,000, your £10,000 gain represents a 20% return on your £50,000 capital — not 5%. The same applies in reverse if values fall. This is why cash-on-cash return (return on capital deployed) tells a more complete story than yield alone.',
                },
                {
                  q: 'Is gross or net yield more important?',
                  a: 'Net yield is more important for understanding a single property\'s income return. Cash-on-cash return is most important for comparing leveraged investments. Use gross yield only as a quick filter — it will always overstate actual returns.',
                },
                {
                  q: 'How do I compare properties in different areas?',
                  a: 'Calculate the total return (cash-on-cash + realistic capital growth rate) for each property under identical assumptions. Use the same mortgage rate, the same void allowance (8%), the same management fee percentage. Varying these assumptions is a common mistake that makes cheap properties look better than they are.',
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
                { href: '/guides/rental-yield-calculator', label: 'Rental Yield Calculator', desc: 'Gross and net yield explained, with UK city yield benchmarks and SDLT impact.' },
                { href: '/guides/property-portfolio-tax-guide', label: 'Property Portfolio Tax Guide', desc: 'Section 24, CGT, SDLT, and whether to incorporate your portfolio.' },
                { href: '/guides/buy-to-let-mortgage-portfolio', label: 'Portfolio Landlord Mortgages', desc: 'What lenders need when you hold 4+ mortgaged properties.' },
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
            Calculate ROI for every property you own
          </h2>
          <p className="text-[#DDD4C5] mb-8 max-w-[420px] mx-auto font-light text-sm">
            PropertyBrief calculates net yield and cash-on-cash return for your full portfolio automatically &mdash;
            then generates a professional PDF report. Free for up to 3 properties.
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
