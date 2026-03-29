import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Landlord Portfolio Tracker: Track Rent, Yield & Capital Growth | PropertyBrief',
  description: 'Track rental income, mortgage payments, net yield, and capital growth across every property you own. Includes rental yield formula, gross vs net explained, and Section 24 impact.',
  openGraph: {
    title: 'Landlord Portfolio Tracker: Track Rent, Yield & Capital Growth',
    description: 'Track rental income, mortgage payments, net yield, and capital growth across every property you own. Rental yield formula, gross vs net, Section 24 impact explained.',
    type: 'article',
  },
}

export default function LandlordPortfolioTrackerPage() {
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
            Guide &mdash; Portfolio Management
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-6" style={{ fontSize: '52px', lineHeight: 1.05 }}>
            Landlord Portfolio Tracker: Track Rent, Yield &amp; Capital Growth
          </h1>
          <p className="text-xl text-[#7A6A5A] leading-relaxed font-light">
            A serious landlord tracks more than just rent collected. Net cashflow, yield per property, LTV movement,
            and capital growth are the numbers that tell you whether your portfolio is actually working. Here is
            everything you need to track — and the formulas to do it properly.
          </p>
        </div>

        <div className="h-px bg-[#DDD4C5] my-10" />

        <div className="space-y-10">

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              The nine columns every landlord tracker needs
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-6">
              Most landlord spreadsheets collapse because they track too little. These are the nine data points that
              matter — not as nice-to-haves, but as the minimum viable dataset to understand portfolio health.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#3D2B1F] text-[#FAF6F0]">
                    <th className="text-left px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Column</th>
                    <th className="text-left px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { col: 'Purchase price', why: 'Baseline for capital growth calculation and original LTV.' },
                    { col: 'Current valuation', why: 'Required for accurate LTV and net yield. Update annually or after refurb.' },
                    { col: 'Monthly rent', why: 'Gross income before any deductions. Use contracted rent, not actual collected.' },
                    { col: 'Mortgage payment', why: 'Total monthly payment including capital repayment (or interest-only amount).' },
                    { col: 'Monthly costs', why: 'Management fees, insurance, maintenance reserve, service charge, ground rent.' },
                    { col: 'Net monthly cashflow', why: 'Monthly rent minus mortgage payment minus monthly costs. The real number.' },
                    { col: 'Gross yield', why: 'Annual rent ÷ current value × 100. Quick benchmark for comparing properties.' },
                    { col: 'Net yield', why: 'Annual profit ÷ current value × 100. What you actually earn on equity deployed.' },
                    { col: 'LTV (loan-to-value)', why: 'Current mortgage balance ÷ current valuation × 100. Tracks financing risk.' },
                  ].map((row, i) => (
                    <tr key={row.col} className={i % 2 === 0 ? 'bg-[#FAF6F0]' : 'bg-[#F0EBE1]'}>
                      <td className="px-4 py-3 font-[family-name:var(--font-heading)] text-[#3D2B1F]">{row.col}</td>
                      <td className="px-4 py-3 text-[#7A6A5A]">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Rental yield formula explained
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-6">
              Yield is the most-quoted number in property investing, and the most misunderstood. There are two
              versions and they tell very different stories.
            </p>

            <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-xl mb-3">Gross yield</h3>
            <div className="bg-[#3D2B1F] rounded-xl px-6 py-5 mb-4">
              <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-lg mb-2">
                Gross Yield = (Monthly Rent &times; 12) &divide; Property Value &times; 100
              </p>
              <p className="text-[#DDD4C5] text-sm">
                Example: £1,200/month rent &divide; £220,000 value = 6.5% gross yield
              </p>
            </div>
            <p className="text-[#7A6A5A] leading-relaxed mb-8">
              Gross yield is the quick filter. It tells you whether a property is worth investigating further.
              In the UK, residential BTL properties yielding below 4% gross rarely cover costs when you factor
              in mortgage interest at current rates.
            </p>

            <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-xl mb-3">Net yield</h3>
            <div className="bg-[#3D2B1F] rounded-xl px-6 py-5 mb-4">
              <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-lg mb-2">
                Net Yield = (Annual Rent &minus; Annual Costs) &divide; Property Value &times; 100
              </p>
              <p className="text-[#DDD4C5] text-sm">
                Annual costs include: mortgage interest, management fees (typically 10-15%), insurance (£200-400/yr),
                maintenance reserve (1% of value), void periods
              </p>
            </div>
            <p className="text-[#7A6A5A] leading-relaxed">
              Net yield is the real number. A property generating 6.5% gross often delivers only 3.2% net once
              management, maintenance, voids, and mortgage interest are factored in. If that 3.2% is below your
              cost of capital, you are losing money on a leveraged basis.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Capital growth calculation
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Income return and capital return are both part of total return. A property yielding 3% net but growing
              at 7% annually may outperform a 6% yielder in a flat market. Track both.
            </p>
            <div className="bg-[#3D2B1F] rounded-xl px-6 py-5 mb-6">
              <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-lg mb-2">
                Capital Growth % = (Current Value &minus; Purchase Price) &divide; Purchase Price &times; 100
              </p>
              <p className="text-[#DDD4C5] text-sm">
                Example: bought for £180,000, now worth £235,000 = 30.6% capital growth
              </p>
            </div>
            <p className="text-[#7A6A5A] leading-relaxed">
              For a leveraged investment, the return on equity deployed is higher. If you put £45,000 deposit
              into a property that grew by £55,000, your return on equity is over 100% — before rental income.
              This is why portfolio landlords track total return on cash invested, not just yield.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Section 24 and its impact on your real profit
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-4">
              Since April 2020, individual landlords can no longer deduct mortgage interest as a business expense.
              Instead, you receive a 20% tax credit on mortgage interest paid. This has a dramatic impact on
              higher-rate taxpayers — what looked like a profitable property pre-2020 may now be cash-flow negative
              after tax.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#7A6A5A] mb-3">Pre-Section 24</p>
                <div className="space-y-2 text-sm font-[family-name:var(--font-figures)]">
                  <div className="flex justify-between"><span className="text-[#7A6A5A]">Annual rent</span><span className="text-[#3D2B1F]">£14,400</span></div>
                  <div className="flex justify-between"><span className="text-[#7A6A5A]">Mortgage interest</span><span className="text-[#7A6A5A]">&minus; £9,000</span></div>
                  <div className="flex justify-between"><span className="text-[#7A6A5A]">Other costs</span><span className="text-[#7A6A5A]">&minus; £2,400</span></div>
                  <div className="h-px bg-[#DDD4C5]" />
                  <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Taxable profit</span><span className="text-[#4A7A52]">£3,000</span></div>
                  <div className="flex justify-between text-xs text-[#7A6A5A]"><span>Tax at 40%</span><span>&minus;£1,200</span></div>
                  <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Net profit</span><span className="text-[#4A7A52]">£1,800</span></div>
                </div>
              </div>
              <div className="bg-[#FBF0EE] border border-[#EECDC8] rounded-xl p-5">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#B84040] mb-3">Post-Section 24</p>
                <div className="space-y-2 text-sm font-[family-name:var(--font-figures)]">
                  <div className="flex justify-between"><span className="text-[#7A6A5A]">Annual rent</span><span className="text-[#3D2B1F]">£14,400</span></div>
                  <div className="flex justify-between"><span className="text-[#7A6A5A]">Other costs</span><span className="text-[#7A6A5A]">&minus; £2,400</span></div>
                  <div className="h-px bg-[#EECDC8]" />
                  <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Taxable profit</span><span className="text-[#B84040]">£12,000</span></div>
                  <div className="flex justify-between text-xs text-[#7A6A5A]"><span>Tax at 40%</span><span>&minus;£4,800</span></div>
                  <div className="flex justify-between text-xs text-[#7A6A5A]"><span>20% mortgage credit</span><span>+£1,800</span></div>
                  <div className="flex justify-between font-semibold"><span className="text-[#3D2B1F]">Net profit</span><span className="text-[#B84040]">&minus;£600</span></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#7A6A5A] mt-3">
              Example: £1,200/month rent, £750/month interest-only mortgage, 40% taxpayer. Section 24 turns a
              £1,800 annual profit into a £600 annual loss. This is why incorporating into a limited company
              has become popular — companies still deduct mortgage interest in full.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Related guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { href: '/guides/property-portfolio-report', label: 'Property Portfolio Report', desc: 'How to present your portfolio to banks, investors, and solicitors professionally.' },
                { href: '/guides/buy-to-let-mortgage-portfolio', label: 'Portfolio Landlord Mortgages', desc: 'What lenders need from you when you hold 4 or more mortgaged properties.' },
                { href: '/guides/rental-yield-calculator', label: 'Rental Yield Calculator', desc: 'Gross and net yield explained with worked examples and UK benchmarks.' },
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
            From spreadsheet to professional portfolio report
          </h2>
          <p className="text-[#DDD4C5] mb-8 max-w-[420px] mx-auto font-light text-sm">
            Upload your CSV and PropertyBrief calculates yield, capital growth, and cashflow for every property
            &mdash; then generates a bank-ready PDF. Free for up to 3 properties.
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
