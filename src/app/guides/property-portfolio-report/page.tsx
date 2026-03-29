import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Property Portfolio Report Template: What Banks & Investors Expect | PropertyBrief',
  description: 'A professional property portfolio report covers rental schedule, LTV per property, void history, and net yield. Here\'s exactly what banks, mortgage brokers, and solicitors want to see.',
  openGraph: {
    title: 'Property Portfolio Report Template: What Banks & Investors Expect',
    description: 'A professional property portfolio report covers rental schedule, LTV per property, void history, and net yield. Here\'s what lenders and investors actually want to see.',
    type: 'article',
  },
}

export default function PropertyPortfolioReportPage() {
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
            Guide &mdash; Portfolio Documentation
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-6" style={{ fontSize: '52px', lineHeight: 1.05 }}>
            Property Portfolio Report Template: What Banks &amp; Investors Expect
          </h1>
          <p className="text-xl text-[#7A6A5A] leading-relaxed font-light">
            Whether you are refinancing, bringing in a joint-venture partner, or preparing for inheritance, the quality
            of your portfolio documentation can be the difference between approval and rejection. Here is exactly what
            professional property portfolio reports contain — and how to produce one.
          </p>
        </div>

        <div className="h-px bg-[#DDD4C5] my-10" />

        <div className="prose-estatebrief space-y-10">

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Why you need a property portfolio report
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-4">
              Most landlords keep their portfolio in a rough spreadsheet — purchase price, monthly rent, maybe a
              mortgage balance. That is fine for personal bookkeeping. It is not fine when you sit down with a
              commercial mortgage broker, a solicitor dealing with your estate, or a co-investor looking for assurance
              that you know what you are doing.
            </p>
            <p className="text-[#7A6A5A] leading-relaxed mb-4">
              The four situations that demand a professional portfolio report:
            </p>
            <ul className="space-y-3 ml-4">
              {[
                { title: 'Mortgage applications and refinancing', desc: 'Portfolio lenders require a full asset and liability schedule, ICR calculations per property, and a rental income schedule. Without this, the underwriter cannot assess risk.' },
                { title: 'Selling part or all of your portfolio', desc: 'Buyers and their solicitors want to see a clean property schedule, historic void periods, and capital growth since purchase. A professional pack speeds up conveyancing.' },
                { title: 'Bringing in investors or JV partners', desc: 'Private investors back people who are organised. A well-presented portfolio report with yield benchmarking and an executive summary tells them you operate at a professional level.' },
                { title: 'Inheritance and estate planning', desc: 'Solicitors and executors need a clear asset schedule. A portfolio report with current valuations, outstanding mortgages, and net equity per property is the most useful document you can leave behind.' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0 text-[#4A7A52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-[#7A6A5A] leading-relaxed">
                    <strong className="text-[#3D2B1F]">{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              What a professional property portfolio report should include
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-6">
              Lenders and investors are looking for eight core components. Missing any of them sends a signal that
              your record-keeping is incomplete.
            </p>
            <div className="space-y-6">
              {[
                { num: '01', title: 'Executive summary', desc: 'Total portfolio value, aggregate gross and net yield, total annual rental income, total mortgage debt, and net equity. One page. This is what a busy underwriter reads first.' },
                { num: '02', title: 'Full property schedule', desc: 'Every property listed with: address, tenure (freehold/leasehold), purchase date, purchase price, current valuation, current mortgage balance, LTV, monthly rent, monthly mortgage payment, and net monthly cash flow.' },
                { num: '03', title: 'Rental income schedule', desc: 'A 12-month table showing actual rent received vs. expected rent for each property. This gives lenders a clean view of void periods and collection reliability.' },
                { num: '04', title: 'Yield analysis', desc: 'Gross yield and net yield per property. Flag any properties below the 4% UK residential benchmark. Lenders want to see you understand which properties are working and which are not.' },
                { num: '05', title: 'LTV by property', desc: 'Loan-to-value for each property and for the portfolio as a whole. Portfolio lenders will assess your aggregate LTV — most want to see below 65-75% for new lending.' },
                { num: '06', title: 'Void period history', desc: 'Average void periods per property over the last 12 months. Acceptable is under 3 weeks per year. Anything over 6 weeks needs an explanation.' },
                { num: '07', title: 'Capital growth analysis', desc: 'Capital growth from purchase price to current valuation for each property, expressed as both a monetary gain and a percentage. Shows total return, not just income return.' },
                { num: '08', title: 'Lender and mortgage schedule', desc: 'List every mortgage: lender name, outstanding balance, rate, type (fixed/tracker), and expiry date. Shows the underwriter exactly what debt is secured on what asset.' },
              ].map(item => (
                <div key={item.num} className="flex gap-5 p-5 bg-[#FAF6F0] rounded-xl border border-[#DDD4C5]">
                  <span className="font-[family-name:var(--font-figures)] text-[#DDD4C5] text-2xl font-semibold flex-shrink-0 w-8">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-[#7A6A5A] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              How to format for different audiences
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-6">
              The same underlying data needs to be presented differently depending on who is reading it.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  audience: 'Bank or mortgage lender',
                  colour: '#3D2B1F',
                  points: [
                    'Lead with ICR and stress test results',
                    'Include full rental schedule with void history',
                    'Show aggregate LTV prominently',
                    'Include AST tenancy details',
                  ],
                },
                {
                  audience: 'Private investor or JV partner',
                  colour: '#7C5C3A',
                  points: [
                    'Lead with total return (income + capital)',
                    'Show upside on underperforming properties',
                    'Include management costs and net cashflow',
                    'Present a brief investment thesis',
                  ],
                },
                {
                  audience: 'Solicitor or executor',
                  colour: '#4A7A52',
                  points: [
                    'Lead with net equity per property',
                    'List all mortgage charges clearly',
                    'Include freehold/leasehold tenure',
                    'Current valuation with date of assessment',
                  ],
                },
              ].map(col => (
                <div key={col.audience} className="bg-[#FAF6F0] rounded-xl border border-[#DDD4C5] overflow-hidden">
                  <div className="px-5 py-4" style={{ background: col.colour }}>
                    <p className="text-white font-[family-name:var(--font-heading)] text-sm">{col.audience}</p>
                  </div>
                  <ul className="p-5 space-y-2">
                    {col.points.map(pt => (
                      <li key={pt} className="text-xs text-[#7A6A5A] flex gap-2">
                        <span className="text-[#DDD4C5] flex-shrink-0">&mdash;</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Common mistakes landlords make
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-4">
              Even experienced landlords make these errors when preparing portfolio documentation:
            </p>
            <ul className="space-y-3">
              {[
                'Using purchase price as the current valuation — lenders want an up-to-date figure',
                'Listing gross rent rather than rent actually received — void periods matter',
                'Omitting properties held in a limited company alongside personal holdings',
                'No capital growth data — total return tells the full story, income return alone does not',
                'PDF exports from Excel with formatting that breaks over page boundaries — unprofessional',
                'Missing the aggregate summary — underwriters will not calculate it themselves',
              ].map(mistake => (
                <li key={mistake} className="flex gap-3 text-[#7A6A5A] text-sm">
                  <span className="text-[#B84040] flex-shrink-0 font-semibold mt-0.5">&#x2715;</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Related guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { href: '/guides/landlord-portfolio-tracker', label: 'Landlord Portfolio Tracker', desc: 'Track rent, yield, and capital growth across your whole portfolio.' },
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
            Generate a professional portfolio report in 3 minutes
          </h2>
          <p className="text-[#DDD4C5] mb-8 max-w-[420px] mx-auto font-light text-sm">
            Upload your CSV. PropertyBrief calculates yield, LTV, capital growth, and void periods &mdash; then
            generates a bank-ready PDF. Free for up to 3 properties.
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
