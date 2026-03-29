import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Landlord Guides: Property Portfolio, Tax, HMO & Mortgages | PropertyBrief',
  description: 'Free guides for UK landlords on rental yield, BTL ROI, portfolio tax, HMO licensing, portfolio mortgages, and refinancing. Written for landlords with 2–20 properties.',
  openGraph: {
    title: 'Landlord Guides: Property Portfolio, Tax, HMO & Mortgages',
    description: 'Free reference guides for UK landlords. Section 24, CGT, HMO licensing, portfolio mortgages, yield calculation, and more.',
    type: 'website',
  },
}

const guides = [
  {
    href: '/guides/rental-yield-calculator',
    category: 'Yield & Returns',
    title: 'Rental Yield Calculator: Gross & Net Yield Explained',
    desc: 'Calculate gross and net rental yield correctly. UK benchmarks by city, stamp duty impact on returns, and yield vs capital growth.',
    time: '8 min read',
  },
  {
    href: '/guides/buy-to-let-roi-guide',
    category: 'Returns & Analysis',
    title: 'Buy-to-Let ROI: How to Calculate Whether a Property Is Worth Buying',
    desc: 'Gross yield, net yield, cash-on-cash return, and total return with a full worked example on a £220,000 property.',
    time: '9 min read',
  },
  {
    href: '/guides/property-portfolio-tax-guide',
    category: 'Tax & Compliance',
    title: 'Property Portfolio Tax Guide: What UK Landlords Must Know in 2025',
    desc: 'Section 24, CGT rates (18%/24%), 60-day reporting, SDLT surcharge, allowable expenses, and the incorporation question.',
    time: '10 min read',
  },
  {
    href: '/guides/hmo-portfolio-management',
    category: 'HMO & Licensing',
    title: 'HMO Portfolio Management: Higher Yields, More Complexity',
    desc: 'Mandatory licensing, Article 4 directions, room size minimums, fire safety, and how to manage voids across an HMO portfolio.',
    time: '9 min read',
  },
  {
    href: '/guides/refinancing-a-property-portfolio',
    category: 'Mortgages & Finance',
    title: 'Refinancing Your Property Portfolio: When, Why, and How',
    desc: 'Equity release, fixed-rate expiry timing, portfolio mortgages, ERC break-even analysis, and limited company refinancing.',
    time: '10 min read',
  },
  {
    href: '/guides/buy-to-let-mortgage-portfolio',
    category: 'Mortgages & Finance',
    title: 'Buy-to-Let Mortgage Portfolio: What Lenders Need',
    desc: 'ICR requirements, background portfolio declarations, stress testing, and what changes when you hold 4+ mortgaged properties.',
    time: '7 min read',
  },
  {
    href: '/guides/property-portfolio-report',
    category: 'Portfolio Management',
    title: 'Property Portfolio Report: How to Present Your Portfolio Professionally',
    desc: 'What banks, investors, and solicitors need to see — and how to structure a portfolio report that commands serious attention.',
    time: '6 min read',
  },
  {
    href: '/guides/landlord-portfolio-tracker',
    category: 'Portfolio Management',
    title: 'Landlord Portfolio Tracker: From Spreadsheet to Dashboard',
    desc: 'What to track, when to review it, and how to spot underperformers before they become problems.',
    time: '7 min read',
  },
]

export default function GuidesHubPage() {
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

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-[640px] mb-14">
          <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[#7C5C3A] mb-5">
            Landlord Guides
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-5" style={{ fontSize: '52px', lineHeight: 1.05 }}>
            Guides for UK landlords who take their portfolio seriously
          </h1>
          <p className="text-lg text-[#7A6A5A] leading-relaxed font-light">
            Written for landlords with 2–20 properties. Yield, tax, mortgages, HMO licensing, and everything
            else that determines whether your portfolio actually makes money.
          </p>
        </div>

        <div className="h-px bg-[#DDD4C5] mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map(guide => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group block bg-[#FAF6F0] border border-[#DDD4C5] rounded-2xl p-7 hover:border-[#7C5C3A] transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-[family-name:var(--font-body)] text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7C5C3A]">
                  {guide.category}
                </p>
                <p className="text-[10px] text-[#7A6A5A] font-[family-name:var(--font-body)]">{guide.time}</p>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-3 group-hover:text-[#7C5C3A] transition-colors" style={{ fontSize: '20px', lineHeight: 1.2 }}>
                {guide.title}
              </h2>
              <p className="text-sm text-[#7A6A5A] leading-relaxed mb-5">
                {guide.desc}
              </p>
              <div className="flex items-center gap-1.5 text-sm font-medium text-[#7C5C3A]">
                Read guide
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="h-px bg-[#DDD4C5] my-16" />

        <section className="bg-[#3D2B1F] rounded-2xl p-12 text-center" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(124,92,58,0.2) 0%, transparent 60%)' }}>
          <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[#DDD4C5] mb-4">
            PropertyBrief
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-[#FAF6F0] mb-4" style={{ fontSize: '40px', lineHeight: 1.1 }}>
            Put your whole portfolio in one place
          </h2>
          <p className="text-[#DDD4C5] mb-8 max-w-[460px] mx-auto font-light text-sm">
            Upload your portfolio CSV. PropertyBrief calculates yield, tracks equity positions, flags underperformers,
            and generates an investor-ready PDF report. Free for up to 3 properties.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-[#7C5C3A] text-[#FAF6F0] px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-[#664B2E] transition-colors"
            >
              Start free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center text-[#DDD4C5] text-sm hover:text-[#FAF6F0] transition-colors"
            >
              Already have an account? Log in
            </Link>
          </div>
        </section>
      </div>

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
