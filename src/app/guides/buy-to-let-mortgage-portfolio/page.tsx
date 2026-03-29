import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio Landlord Mortgages: What Lenders Need From You | PropertyBrief',
  description: 'Once you hold 4+ mortgaged properties, you become a portfolio landlord. Here\'s which lenders still do portfolio BTL, how ICR stress testing works, and the documentation you need.',
  openGraph: {
    title: 'Portfolio Landlord Mortgages: What Lenders Need From You',
    description: 'Once you hold 4+ mortgaged properties, you become a portfolio landlord. Paragon, Fleet, Precise, Foundation — ICR calculations, stress testing, and required documentation explained.',
    type: 'article',
  },
}

export default function BuyToLetMortgagePortfolioPage() {
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
            Guide &mdash; Mortgage &amp; Finance
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-6" style={{ fontSize: '52px', lineHeight: 1.05 }}>
            Portfolio Landlord Mortgages: What Lenders Need From You
          </h1>
          <p className="text-xl text-[#7A6A5A] leading-relaxed font-light">
            When you cross the threshold of four mortgaged buy-to-let properties, the mortgage market changes
            significantly. Most high-street lenders withdraw. A smaller group of specialist lenders takes over —
            and their requirements are considerably more demanding. Here is what you need to know.
          </p>
        </div>

        <div className="h-px bg-[#DDD4C5] my-10" />

        <div className="space-y-10">

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              What makes you a portfolio landlord?
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-4">
              Since the PRA&apos;s 2017 underwriting standards came into force, a portfolio landlord is defined as
              anyone with four or more mortgaged buy-to-let properties — whether those properties are in your
              personal name, a limited company, or a combination of both.
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6 mb-4">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-lg mb-2">The 4-property threshold</p>
              <p className="text-sm text-[#7A6A5A] leading-relaxed">
                At 4 or more mortgaged BTL properties, lenders must assess your entire portfolio — not just the
                property you are applying to mortgage. This means they need a full asset and liability statement,
                a business plan, and often a rental schedule for all existing properties. High-street lenders
                (Halifax, NatWest, Santander) generally exit at this point or impose much stricter criteria.
              </p>
            </div>
            <p className="text-[#7A6A5A] leading-relaxed">
              Properties you own outright (no mortgage) do not count towards the threshold, but lenders will still
              want to see them listed in your portfolio documentation for a full picture of your finances.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Which lenders still do portfolio BTL
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-6">
              The specialist portfolio landlord mortgage market is dominated by a handful of lenders. Each has
              different appetite, criteria, and pricing.
            </p>
            <div className="space-y-3">
              {[
                {
                  name: 'Paragon Bank',
                  max: 'No formal cap on portfolio size',
                  icr: '125% at 5.5% stress',
                  notes: 'Specialist BTL lender. Most experienced with large portfolios. Assess portfolio holistically. Often the first call for landlords with 10+ properties.',
                },
                {
                  name: 'Fleet Mortgages',
                  max: 'Up to £3M exposure per landlord',
                  icr: '125% at pay rate or 5.5% (whichever higher)',
                  notes: 'Strong appetite for HMO and MUBs. Limited company lending available. Good on complex structures.',
                },
                {
                  name: 'Precise Mortgages',
                  max: 'Up to £2M in BTL with them',
                  icr: '125% at 5.5% or pay rate',
                  notes: 'Part of OSB Group. Accepts most property types. Robust criteria but straightforward process for well-documented portfolios.',
                },
                {
                  name: 'Foundation Home Loans',
                  max: 'Up to £5M total BTL exposure',
                  icr: '125% at 5.5%',
                  notes: 'Good for complex income scenarios. Accepts limited companies. Slightly more flexible on credit history than some peers.',
                },
                {
                  name: 'Landbay',
                  max: 'Up to £3M with Landbay',
                  icr: '125% at 5.5% stress',
                  notes: 'Increasingly competitive rates. Strong on standard BTL. Process is tech-enabled which speeds things up significantly.',
                },
              ].map(lender => (
                <div key={lender.name} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-lg">{lender.name}</h3>
                    <span className="text-xs bg-[#3D2B1F] text-[#FAF6F0] px-2.5 py-1 rounded-full ml-3 flex-shrink-0">{lender.max}</span>
                  </div>
                  <p className="text-xs text-[#7C5C3A] font-semibold mb-2">ICR: {lender.icr}</p>
                  <p className="text-sm text-[#7A6A5A] leading-relaxed">{lender.notes}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#7A6A5A] mt-4">
              Rates, limits, and criteria change regularly. Always verify current terms with a specialist mortgage broker.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              ICR calculations and stress testing explained
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              The Interest Coverage Ratio (ICR) is the central metric portfolio lenders use. It tests whether
              rental income adequately covers mortgage interest payments at a stressed (higher) interest rate.
            </p>
            <div className="bg-[#3D2B1F] rounded-xl px-6 py-5 mb-5">
              <p className="font-[family-name:var(--font-figures)] text-[#FAF6F0] text-lg mb-2">
                ICR = Monthly Rent &divide; Stressed Monthly Interest Payment
              </p>
              <p className="text-[#DDD4C5] text-sm">
                Most portfolio lenders require ICR &ge; 125% at a stressed rate of 5.5% (or pay rate if higher).
                Some lenders require 145% for higher-rate taxpayers.
              </p>
            </div>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5 mb-5">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base mb-3">Worked example</p>
              <div className="space-y-2 text-sm font-[family-name:var(--font-figures)]">
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Monthly rent</span><span className="text-[#3D2B1F]">£1,200</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Loan amount</span><span className="text-[#3D2B1F]">£180,000</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Stressed rate</span><span className="text-[#3D2B1F]">5.5%</span></div>
                <div className="flex justify-between"><span className="text-[#7A6A5A]">Stressed monthly interest</span><span className="text-[#3D2B1F]">£825</span></div>
                <div className="h-px bg-[#DDD4C5]" />
                <div className="flex justify-between font-semibold">
                  <span className="text-[#3D2B1F]">ICR</span>
                  <span className="text-[#4A7A52]">145% ✓ Passes 125% minimum</span>
                </div>
              </div>
            </div>
            <p className="text-[#7A6A5A] leading-relaxed">
              Portfolio lenders apply this test to every property in your portfolio, not just the one you are
              applying for. If several properties fail the stress test, it affects your ability to borrow on any
              property in the portfolio — even those that individually pass.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Documentation portfolio lenders require
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-6">
              The step change from a single BTL application to a portfolio application is the documentation pack.
              Expect to provide all of the following:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Asset & liability statement',
                  desc: 'Every property you own: address, current value, outstanding mortgage, equity, and rental income. Personal assets and liabilities too.',
                },
                {
                  title: 'Rental income schedule',
                  desc: 'Monthly rent for every BTL property. Some lenders want 12 months of actual bank statements to verify income received.',
                },
                {
                  title: 'Business plan',
                  desc: 'A 1-2 page document covering: how you manage the portfolio, your growth strategy, void rate assumptions, and how you handle maintenance. A professional presentation matters.',
                },
                {
                  title: 'Mortgage schedule',
                  desc: 'Every existing mortgage: lender, outstanding balance, monthly payment, rate, type, and expiry date.',
                },
                {
                  title: 'Personal income evidence',
                  desc: 'SA302 tax returns for 2 years plus a tax year overview. If employed, last 3 months payslips and P60.',
                },
                {
                  title: 'Tenancy agreements',
                  desc: 'Current AST agreements for properties being used as security. Some lenders want all ASTs in the portfolio.',
                },
              ].map(doc => (
                <div key={doc.title} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                  <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base mb-2">{doc.title}</h3>
                  <p className="text-sm text-[#7A6A5A] leading-relaxed">{doc.desc}</p>
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
                { href: '/guides/property-portfolio-report', label: 'Property Portfolio Report', desc: 'How to present your portfolio to banks, investors, and solicitors professionally.' },
                { href: '/guides/landlord-portfolio-tracker', label: 'Landlord Portfolio Tracker', desc: 'Track rent, yield, and capital growth across your whole portfolio.' },
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
            Generate lender-ready portfolio documentation
          </h2>
          <p className="text-[#DDD4C5] mb-8 max-w-[420px] mx-auto font-light text-sm">
            PropertyBrief creates the asset and liability statement, rental schedule, and portfolio summary that
            portfolio mortgage lenders actually ask for. Upload a CSV and get a professional pack in minutes.
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
