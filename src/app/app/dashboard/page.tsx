import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getUserPortfolios } from '@/lib/portfolio-store'
import { getUserTier, getTrialDaysLeft } from '@/lib/auth/tier'
import { redirect } from 'next/navigation'

function formatGBP(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}k`
  return `£${n.toFixed(0)}`
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const tier = getUserTier(profile)
  const trialDays = getTrialDaysLeft(profile)
  const portfolios = await getUserPortfolios(user.id)

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Trial banner */}
      {tier === 'trial' && (
        <div className="mb-6 bg-[#7C5C3A]/5 border border-[#7C5C3A]/20 rounded-xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#3D2B1F]">Free trial — {trialDays} day{trialDays !== 1 ? 's' : ''} remaining</p>
            <p className="text-xs text-[#7A6A5A]">PDF reports include a PropertyBrief watermark. Upgrade to remove it.</p>
          </div>
          <a href="/api/checkout" className="text-sm font-medium text-[#7C5C3A] hover:underline">Upgrade to Pro</a>
        </div>
      )}
      {tier === 'trial_expired' && (
        <div className="mb-6 bg-[#C47A2B]/5 border border-[#C47A2B]/20 rounded-xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#3D2B1F]">Your free trial has ended</p>
            <p className="text-xs text-[#7A6A5A]">PDF exports now include a watermark. Upgrade to restore clean exports.</p>
          </div>
          <a href="/api/checkout" className="bg-[#7C5C3A] text-[#FAF6F0] text-sm font-medium rounded-lg px-4 py-2 hover:bg-[#664B2E] transition-colors">
            Upgrade now
          </a>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-[#3D2B1F]">My Reports</h1>
          <p className="text-sm text-[#7A6A5A] mt-1">
            {portfolios.length === 0
              ? 'Upload your first portfolio to get started.'
              : `${portfolios.length} portfolio report${portfolios.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link
          href="/app/upload"
          className="bg-[#7C5C3A] text-[#FAF6F0] text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-[#664B2E] transition-colors"
        >
          New report
        </Link>
      </div>

      {/* Portfolios */}
      {portfolios.length > 0 ? (
        <div className="space-y-2">
          {portfolios.map(p => (
            <Link
              key={p.id}
              href={`/app/report/${p.id}`}
              className="block bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl px-5 py-4 hover:border-[#7C5C3A]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base text-[#3D2B1F]">{p.ownerName}</h3>
                  <p className="text-xs text-[#7A6A5A] mt-0.5">
                    {p.summary.totalProperties} properties &middot;{' '}
                    {formatGBP(p.summary.totalPortfolioValue)} value &middot;{' '}
                    {p.summary.averageGrossYield.toFixed(1)}% avg yield &middot;{' '}
                    {p.reportDate}
                  </p>
                </div>
                <svg className="w-4 h-4 text-[#7A6A5A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl">
          <div className="w-16 h-16 bg-[#7C5C3A]/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#7C5C3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-lg text-[#3D2B1F] mb-1">No reports yet</h3>
          <p className="text-sm text-[#7A6A5A] mb-5">Upload a property portfolio CSV to generate your first report.</p>
          <Link
            href="/app/upload"
            className="inline-block bg-[#7C5C3A] text-[#FAF6F0] text-sm font-medium rounded-lg px-6 py-2.5 hover:bg-[#664B2E] transition-colors"
          >
            Upload portfolio
          </Link>
        </div>
      )}
    </div>
  )
}
