import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F0EBE1]">
      {/* Nav */}
      <nav className="max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between">
        <span className="font-[family-name:var(--font-heading)] text-2xl text-[#3D2B1F]">
          PropertyBrief
        </span>
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

      {/* Hero — diagonal split */}
      <section className="relative overflow-hidden" style={{ minHeight: '580px' }}>
        <div className="absolute inset-0 grid grid-cols-2">
          {/* Left: warm stone */}
          <div className="bg-[#F0EBE1]" />
          {/* Right: deep brown */}
          <div className="bg-[#3D2B1F]" />
        </div>

        {/* Diagonal clip over right panel */}
        <div
          className="absolute inset-y-0 right-0 w-[58%] bg-[#3D2B1F]"
          style={{ clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        {/* Left content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[#7C5C3A] mb-6">
              For UK landlords &amp; property investors
            </p>
            <h1 className="hero-heading text-[#3D2B1F] mb-8">
              Your portfolio.<br />
              <em>Properly</em><br />
              presented.
            </h1>
            <p className="text-lg text-[#7A6A5A] leading-relaxed max-w-[420px] mb-10 font-[family-name:var(--font-body)] font-light">
              Upload a CSV. Get yield calculations, capital growth analysis,
              and an investor-ready PDF report in under 3 minutes.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/app/upload"
                className="inline-flex items-center gap-2 bg-[#7C5C3A] text-[#FAF6F0] px-7 py-3.5 rounded-lg font-medium text-sm hover:bg-[#664B2E] transition-colors"
              >
                Upload your portfolio
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <span className="text-sm text-[#7A6A5A]">Free for up to 3 properties</span>
            </div>
            <p className="text-sm text-[#7A6A5A] italic mt-6 font-[family-name:var(--font-heading)]">
              &ldquo;Property portfolio reports that look like Savills made them.&rdquo;
            </p>
          </div>

          {/* Right: PDF mock */}
          <div className="flex justify-center">
            <div className="bg-[#FAF6F0] rounded-xl shadow-2xl w-[320px] overflow-hidden">
              {/* Cover stripe */}
              <div className="bg-[#7C5C3A] px-6 py-5">
                <p className="text-[#FAF6F0] text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">
                  Portfolio Report — March 2026
                </p>
                <h3 className="font-[family-name:var(--font-heading)] text-[#FAF6F0] text-xl">
                  Blackstone Property Holdings
                </h3>
                <p className="text-[#DDD4C5] text-xs mt-1">12 properties &nbsp;&middot;&nbsp; £3.2M portfolio value</p>
              </div>
              {/* Summary metrics */}
              <div className="grid grid-cols-3 divide-x divide-[#DDD4C5] border-b border-[#DDD4C5]">
                {[
                  { label: 'Avg Gross Yield', val: '6.4%', color: '#4A7A52' },
                  { label: 'Annual Profit', val: '£84K', color: '#3D2B1F' },
                  { label: 'Capital Growth', val: '+22%', color: '#4A7A52' },
                ].map(m => (
                  <div key={m.label} className="px-3 py-3 text-center">
                    <p className="font-[family-name:var(--font-figures)] text-lg font-semibold" style={{ color: m.color }}>{m.val}</p>
                    <p className="text-[9px] text-[#7A6A5A] mt-0.5 leading-tight">{m.label}</p>
                  </div>
                ))}
              </div>
              {/* Property rows */}
              <div className="px-4 py-3 space-y-1.5">
                {[
                  { addr: '14 Acacia Road, SW4', yield: '7.2%', ok: true },
                  { addr: '8 Park View, N1', yield: '3.1%', ok: false },
                  { addr: '22 Queen Street, E1', yield: '5.8%', ok: true },
                  { addr: '3 Elm Close, SE13', yield: '6.4%', ok: true },
                ].map(p => (
                  <div
                    key={p.addr}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-[10px]"
                    style={{ background: p.ok ? '#F0EBE1' : '#FBF0EE', border: `1px solid ${p.ok ? '#DDD4C5' : '#EECDC8'}` }}
                  >
                    <span className="text-[#3D2B1F] font-medium truncate max-w-[160px]">{p.addr}</span>
                    <span className="font-[family-name:var(--font-figures)] font-semibold ml-2 flex-shrink-0" style={{ color: p.ok ? '#4A7A52' : '#B84040' }}>{p.yield}</span>
                    {!p.ok && <span className="ml-1 bg-[#B84040] text-white text-[8px] font-bold px-1.5 py-0.5 rounded flex-shrink-0">Low</span>}
                  </div>
                ))}
                <p className="text-[9px] text-[#7A6A5A] text-center pt-1">+ 8 more properties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-6" style={{ fontSize: '42px', lineHeight: 1.1 }}>
              From messy spreadsheet to Savills-quality PDF
            </h2>
            <p className="text-[#7A6A5A] text-lg leading-relaxed font-light">
              Most landlords track their portfolio in a spreadsheet with no calculations, no benchmarking,
              and nothing they could show a bank or solicitor.
              PropertyBrief fixes that in minutes.
            </p>
          </div>
          <div className="space-y-5">
            {[
              {
                num: '01',
                title: 'Gross & net yield per property',
                desc: 'Calculated automatically from rent, mortgage, and costs. Benchmarked against the 4% UK residential threshold.',
              },
              {
                num: '02',
                title: 'Capital growth since purchase',
                desc: 'Enter current valuations and we calculate total return. See which properties are working hardest.',
              },
              {
                num: '03',
                title: 'AI flags underperformers',
                desc: 'Claude AI reads your portfolio and identifies properties needing attention — low yield, vacancy, or poor total return.',
              },
              {
                num: '04',
                title: 'Investor-ready PDF report',
                desc: 'Executive summary, recommendations, and a full property table. Print-ready, bank-ready, solicitor-ready.',
              },
            ].map(item => (
              <div key={item.num} className="flex gap-5">
                <span className="font-[family-name:var(--font-figures)] text-[#DDD4C5] text-3xl font-semibold flex-shrink-0 w-10 pt-0.5">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-xl mb-1">{item.title}</h3>
                  <p className="text-sm text-[#7A6A5A] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6"><div className="h-px bg-[#DDD4C5]" /></div>

      {/* Who it is for */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-14 text-center" style={{ fontSize: '38px' }}>
          Built for everyone who owns property
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: 'Portfolio landlords',
              desc: '3-50 properties. Finally see your whole portfolio on one page with proper yield and profit numbers.',
            },
            {
              label: 'Property investors',
              desc: 'Present your portfolio to JV partners, lenders, or solicitors like you mean business.',
            },
            {
              label: 'Estate agents',
              desc: 'Generate professional portfolio reviews for landlord clients. White-label reports with your branding.',
            },
          ].map(c => (
            <div key={c.label} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-8">
              <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-xl mb-3">{c.label}</h3>
              <p className="text-sm text-[#7A6A5A] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6"><div className="h-px bg-[#DDD4C5]" /></div>

      {/* Pricing */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '38px' }}>
          Transparent pricing
        </h2>
        <p className="text-[#7A6A5A] mb-14 max-w-[500px] font-light">
          Start free. Pay when your portfolio gets serious.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px]">
          {([
            {
              tier: 'Free',
              price: '£0',
              period: 'forever',
              desc: 'Try it with a small portfolio.',
              features: [
                'Up to 3 properties',
                'Yield & profit calculations',
                'AI analysis & recommendations',
                'PDF report (PropertyBrief watermark)',
              ],
              cta: 'Start free',
              href: '/auth/signup',
              highlight: false,
            },
            {
              tier: 'Pro',
              price: '£29',
              period: '/month',
              desc: 'For serious landlords.',
              features: [
                'Unlimited properties',
                'Clean PDF — no watermark',
                'Capital growth tracking',
                'Save & revisit reports',
                'Priority AI processing',
              ],
              cta: 'Start 7-day trial',
              href: '/auth/signup?plan=pro',
              highlight: true,
            },
            {
              tier: 'Agency',
              price: '£79',
              period: '/month',
              desc: 'For estate agents & advisors.',
              features: [
                'Everything in Pro',
                'White-label branding (your logo)',
                'Custom accent colour',
                'Client management dashboard',
                'Bulk report generation',
              ],
              cta: 'Start 7-day trial',
              href: '/auth/signup?plan=agency',
              highlight: false,
            },
          ] as const).map(plan => (
            <div
              key={plan.tier}
              className="rounded-xl p-8 relative"
              style={{
                background: plan.highlight ? '#3D2B1F' : '#FAF6F0',
                border: plan.highlight ? '2px solid #7C5C3A' : '1px solid #DDD4C5',
              }}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7C5C3A] text-[#FAF6F0] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.12em] uppercase mb-3"
                 style={{ color: plan.highlight ? '#DDD4C5' : '#7A6A5A' }}>
                {plan.tier}
              </p>
              <div className="mb-1">
                <span className="font-[family-name:var(--font-figures)] text-4xl font-semibold"
                      style={{ color: plan.highlight ? '#FAF6F0' : '#3D2B1F' }}>
                  {plan.price}
                </span>
                <span className="text-sm ml-1" style={{ color: plan.highlight ? '#DDD4C5' : '#7A6A5A' }}>
                  {plan.period}
                </span>
              </div>
              <p className="text-xs mb-6" style={{ color: plan.highlight ? '#DDD4C5' : '#7A6A5A' }}>
                {plan.desc}
              </p>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm"
                      style={{ color: plan.highlight ? '#FAF6F0' : '#3D2B1F' }}>
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#4A7A52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className="block text-center text-sm font-medium rounded-lg px-5 py-3 transition-colors"
                style={{ background: plan.highlight ? '#7C5C3A' : '#3D2B1F', color: '#FAF6F0' }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6"><div className="h-px bg-[#DDD4C5]" /></div>

      {/* FAQ */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-12" style={{ fontSize: '38px' }}>
          Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-[900px]">
          {[
            { q: 'What CSV format do I need?', a: 'Any spreadsheet with columns for address, purchase price, monthly rent, and monthly costs. We auto-detect columns — headers don\'t need to be perfectly formatted.' },
            { q: 'How is yield calculated?', a: 'Gross yield = (annual rent / current value) × 100. Net yield = (annual rent − annual costs) / current value × 100. We use current value if you provide it, otherwise purchase price.' },
            { q: 'What counts as underperforming?', a: 'UK residential properties with gross yield below 4% are flagged as concerning. Vacant properties are also flagged. Claude AI applies additional analysis based on your specific portfolio.' },
            { q: 'Is my data secure?', a: 'Data is processed server-side and never stored beyond your session (unless you create an account). We never share or use your data for training.' },
            { q: 'Can I add my agency branding?', a: 'Yes — on the Agency plan, upload your logo and set your brand colour. Every PDF comes out looking like your firm produced it in-house.' },
            { q: 'Do you support commercial or HMO properties?', a: 'Yes. We detect property type from your data or you can specify it in the column mapping. Yield calculations work for all property types.' },
          ].map(faq => (
            <div key={faq.q}>
              <h3 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-lg mb-2">{faq.q}</h3>
              <p className="text-sm text-[#7A6A5A] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6"><div className="h-px bg-[#DDD4C5]" /></div>

      {/* Final CTA */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="bg-[#3D2B1F] rounded-2xl p-16 text-center" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(124,92,58,0.2) 0%, transparent 60%)' }}>
          <h2 className="font-[family-name:var(--font-heading)] text-[#FAF6F0] mb-4" style={{ fontSize: '48px', lineHeight: 1.1 }}>
            Your portfolio deserves better than a spreadsheet.
          </h2>
          <p className="text-[#DDD4C5] mb-10 max-w-[480px] mx-auto font-light">
            Free for up to 3 properties. No credit card required.
          </p>
          <Link
            href="/app/upload"
            className="inline-flex items-center gap-2 bg-[#7C5C3A] text-[#FAF6F0] px-10 py-4 rounded-lg text-base font-medium hover:bg-[#664B2E] transition-colors"
          >
            Upload your portfolio
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
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
