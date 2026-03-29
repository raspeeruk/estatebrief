import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HMO Portfolio Management: Higher Yields, More Complexity | PropertyBrief',
  description: 'HMO licensing requirements, yield advantages (8–12% gross), Article 4 directions, room size minimums, and how to manage compliance across a multi-property HMO portfolio.',
  openGraph: {
    title: 'HMO Portfolio Management: Higher Yields, More Complexity',
    description: 'Everything landlords need to know about running HMOs: mandatory licensing, selective licensing, Article 4 directions, per-room yield calculation, and compliance tracking.',
    type: 'article',
  },
}

export default function HMOPortfolioManagementPage() {
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
            Guide &mdash; HMO &amp; Licensing
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-6" style={{ fontSize: '52px', lineHeight: 1.05 }}>
            HMO Portfolio Management: Higher Yields, More Complexity
          </h1>
          <p className="text-xl text-[#7A6A5A] leading-relaxed font-light">
            HMOs generate 8–12% gross yield where standard BTL delivers 4–6%. The trade-off is real: more licensing,
            more compliance, more tenants, more voids. Here is what the HMO model actually requires — and how to
            manage it at scale.
          </p>
        </div>

        <div className="h-px bg-[#DDD4C5] my-10" />

        <div className="space-y-10">

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              What qualifies as an HMO?
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              A House in Multiple Occupation (HMO) is any residential property occupied by 3 or more people forming
              2 or more separate households, who share one or more basic amenities (kitchen, bathroom, or toilet).
              The definition catches most shared houses, bedsits, and converted flats with shared facilities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {[
                {
                  title: 'Qualifies as an HMO',
                  items: [
                    'Three friends (3 separate households) sharing a house with a shared kitchen',
                    'A bedsit property with 4 individual letting rooms and a shared bathroom',
                    'A converted house where 3 studios share a communal hallway',
                    'Converted flats where the conversion does not meet Building Regs 1991',
                  ],
                  color: '#4A7A52',
                },
                {
                  title: 'Does NOT qualify',
                  items: [
                    'A couple and their child (one household)',
                    'A purpose-built block of self-contained flats with own bathrooms and kitchens',
                    'Student halls managed by an educational institution',
                    'Live-in landlord with 2 lodgers (in most cases)',
                  ],
                  color: '#B84040',
                },
              ].map(col => (
                <div key={col.title} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                  <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-3">{col.title}</p>
                  <ul className="space-y-2">
                    {col.items.map(item => (
                      <li key={item} className="text-xs text-[#7A6A5A] flex gap-2">
                        <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: col.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Licensing: mandatory, additional, and selective
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              There are three licensing tiers for HMOs. Failing to licence a property that requires one is a criminal
              offence carrying unlimited fines. Tenants in unlicensed HMOs can also apply for a Rent Repayment Order
              — reclaiming up to 12 months of rent.
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  type: 'Mandatory Licensing',
                  applies: 'All HMOs with 5+ occupants from 2+ households, any storey count',
                  cost: '£200–£1,500 depending on council. Typically 5-year licence.',
                  notes: 'National requirement. No council opt-out. Apply before tenants move in.',
                },
                {
                  type: 'Additional Licensing',
                  applies: 'Smaller HMOs (3–4 occupants) in councils that have adopted an additional licensing scheme',
                  cost: '£100–£600 typically. Renewal on same cycle as mandatory.',
                  notes: 'Council-by-council — check your local authority. Schemes require 10 weeks\' public consultation before adoption.',
                },
                {
                  type: 'Selective Licensing',
                  applies: 'All privately rented properties (not just HMOs) in designated areas',
                  cost: '£300–£1,000 per property. Often 5-year schemes.',
                  notes: 'Area-based, not property-type based. Used to address low housing demand or anti-social behaviour hotspots.',
                },
              ].map(item => (
                <div key={item.type} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-base">{item.type}</p>
                    <span className="text-[10px] font-[family-name:var(--font-body)] font-semibold tracking-wider uppercase bg-[#F0EBE1] text-[#7C5C3A] px-2 py-1 rounded shrink-0">
                      {item.cost.split('.')[0]}
                    </span>
                  </div>
                  <p className="text-sm text-[#3D2B1F] mb-1">{item.applies}</p>
                  <p className="text-xs text-[#7A6A5A]">{item.notes}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              The HMO yield advantage: the numbers
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              The yield difference between HMO and standard BTL is significant — but so is the cost difference.
              The comparison below uses a 5-bedroom house in Leeds as the base case.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#3D2B1F] text-[#FAF6F0]">
                    <th className="text-left px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Metric</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Standard BTL</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Same House as HMO</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'Purchase price', btl: '£250,000', hmo: '£250,000' },
                    { metric: 'Monthly rent', btl: '£1,100 (whole house)', hmo: '£500 × 5 rooms = £2,500' },
                    { metric: 'Gross yield', btl: '5.3%', hmo: '12.0%' },
                    { metric: 'Management costs', btl: '~£2,200/yr (standard agent)', hmo: '~£6,000/yr (HMO specialist)' },
                    { metric: 'Maintenance', btl: '~£1,500/yr', hmo: '~£3,500/yr (5 individual tenancies)' },
                    { metric: 'Licensing cost (annualised)', btl: '£0', hmo: '~£250/yr' },
                    { metric: 'Net yield (estimated)', btl: '~4.0%', hmo: '~8.5%' },
                  ].map((row, i) => (
                    <tr key={row.metric} className={i % 2 === 0 ? 'bg-[#FAF6F0]' : 'bg-[#F0EBE1]'}>
                      <td className="px-4 py-3 text-[#7A6A5A]">{row.metric}</td>
                      <td className="px-4 py-3 text-right font-[family-name:var(--font-figures)] text-[#7A6A5A]">{row.btl}</td>
                      <td className="px-4 py-3 text-right font-[family-name:var(--font-figures)] text-[#4A7A52] font-semibold">{row.hmo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#7A6A5A]">
              The HMO net yield advantage is real but narrower than the gross yield gap suggests. The management
              overhead is 2–3x higher and void risk per room needs separate management.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Article 4 Directions: where you need planning permission
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Normally, converting a family home (C3 use class) to an HMO (C4 use class) is permitted development —
              no planning permission required. But many councils have introduced Article 4 Directions that remove
              this permitted development right in specific areas. In those areas, you need planning permission
              before converting to an HMO.
            </p>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5 mb-4">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-3">Councils with widespread Article 4 Directions include:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-[#7A6A5A]">
                {['Oxford', 'Cambridge', 'Bristol', 'Leeds', 'Manchester', 'Nottingham', 'Sheffield', 'Southampton', 'Brighton & Hove'].map(city => (
                  <div key={city} className="flex gap-2 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C5C3A] shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#7A6A5A] leading-relaxed text-sm">
              Always check with the local planning authority before purchasing with HMO conversion intent in a
              university city. Planning permission refusal — or retrospective enforcement — can destroy the
              investment thesis entirely.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Room size minimums and fire safety requirements
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              Since October 2018, minimum room size requirements apply to licensed HMOs nationally. Rooms that fail
              the minimum cannot be let as sleeping accommodation. This has forced some HMO operators to repurpose
              smaller rooms or reduce room counts.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#3D2B1F] text-[#FAF6F0]">
                    <th className="text-left px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Occupancy type</th>
                    <th className="text-right px-4 py-3 font-[family-name:var(--font-body)] font-semibold text-xs tracking-wider">Minimum floor area</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'One adult sleeping room', min: '6.51 m²' },
                    { type: 'Two adults sharing', min: '10.22 m²' },
                    { type: 'Child aged 10 or under', min: '4.64 m²' },
                  ].map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? 'bg-[#FAF6F0]' : 'bg-[#F0EBE1]'}>
                      <td className="px-4 py-3 text-[#3D2B1F]">{row.type}</td>
                      <td className="px-4 py-3 text-right font-[family-name:var(--font-figures)] text-[#7C5C3A] font-semibold">{row.min}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
              <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-sm mb-3">Fire safety requirements for licensed HMOs</p>
              <ul className="space-y-1.5 text-sm text-[#7A6A5A]">
                {[
                  'Interlinked smoke alarms in every room (mains-wired preferred, battery accepted)',
                  'Heat detector in kitchen',
                  'Carbon monoxide detector where there is a solid fuel appliance',
                  'Fire doors (FD30) on high-risk rooms — kitchen, sleeping rooms in most 3+ storey HMOs',
                  'Emergency lighting on escape routes in larger HMOs',
                  'Annual gas safety certificate and 5-yearly EICR',
                ].map(item => (
                  <li key={item} className="flex gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#7C5C3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-[#3D2B1F] mb-4" style={{ fontSize: '32px' }}>
              Managing voids and tenant turnover
            </h2>
            <p className="text-[#7A6A5A] leading-relaxed mb-5">
              HMO tenants tend to be younger and more mobile — students finish courses, professionals relocate,
              couples form and move out together. Average tenancy length in an HMO is 12–18 months versus 3+ years
              for a family home. This means higher marketing costs, more check-in/check-out admin, and lower income
              certainty.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Per-room void risk',
                  body: 'Each room has its own void cycle. A 5-room HMO might have one room vacant at any time — a 20% structural void. Budget for 10–15% void allowance per room (not the 8% used for standard BTL).',
                },
                {
                  title: 'Staggered ASTs',
                  body: 'Try to stagger tenancy start dates so all rooms do not come up for renewal simultaneously. Summer (June-September) is the worst time for HMO voids outside student areas.',
                },
                {
                  title: 'Room-by-room marketing',
                  body: 'List individual rooms on SpareRoom rather than the whole property on Rightmove. SpareRoom dominates the room rental market and reaches the right demographic.',
                },
                {
                  title: 'All-bills-included pricing',
                  body: 'Professional HMO tenants expect bills included. It simplifies letting, reduces disputes, and allows higher room rates. Budget £80–£120/room/month for utilities in a 5-bed.',
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
                  q: 'Do I need a licence for a 3-bed HMO?',
                  a: 'It depends on the council and the number of occupants. Mandatory licensing only applies from 5 occupants. A 3-bed with 3 unrelated occupants may require an additional licence if your council has adopted an additional licensing scheme. Check your local authority\'s licensing page — and remember selective licensing may apply regardless of HMO status.',
                },
                {
                  q: 'What are the room size requirements?',
                  a: 'The national minimum for a single adult sleeping room is 6.51 m² (70 sq ft). Two adults sharing need 10.22 m². Rooms under the minimum cannot be let as sleeping accommodation in licensed HMOs. Some councils have set higher minimums — always check locally.',
                },
                {
                  q: 'How do I find HMO tenants?',
                  a: 'SpareRoom.co.uk is the dominant platform for room rentals. Facebook Marketplace and local university accommodation portals are useful for student HMOs. The key difference from standard lettings is that you are marketing individual rooms, not the whole property, so individual room appeal matters more than kerb appeal.',
                },
                {
                  q: 'Is an HMO worth the extra management?',
                  a: 'For most landlords who have full-time jobs, self-managing an HMO is genuinely difficult. The higher yield (8–12% gross vs 5–6%) is real — but it comes with 3–5x the management overhead. The model works best when you use an HMO-specialist letting agent (expect 12–15% management fees vs 8–10% for standard BTL) or when you have enough properties to justify dedicated in-house management.',
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
                { href: '/guides/buy-to-let-roi-guide', label: 'Buy-to-Let ROI Guide', desc: 'How to calculate net yield and cash-on-cash return on any investment property.' },
                { href: '/guides/landlord-portfolio-tracker', label: 'Landlord Portfolio Tracker', desc: 'Track compliance dates, occupancy, and yield across all your properties.' },
                { href: '/guides/property-portfolio-tax-guide', label: 'Property Tax Guide', desc: 'Section 24, CGT, SDLT, and the case for incorporating your portfolio.' },
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
            Track HMO compliance across your portfolio
          </h2>
          <p className="text-[#DDD4C5] mb-8 max-w-[440px] mx-auto font-light text-sm">
            PropertyBrief tracks per-room occupancy, compliance certificate dates, and HMO licence renewals
            across your full portfolio &mdash; and puts them in one investor-ready report.
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
