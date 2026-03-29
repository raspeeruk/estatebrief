'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/auth-provider'

const PLANS = [
  {
    id: 'pro',
    name: 'Professional',
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
    highlight: true,
  },
  {
    id: 'agency',
    name: 'Agency',
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
    highlight: false,
  },
]

export default function BillingSettingsPage() {
  const { tier, profile } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  const openPortal = async () => {
    setLoading('portal')
    try {
      const res = await fetch('/api/billing-portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      // silent fail
    } finally {
      setLoading(null)
    }
  }

  const startCheckout = async (plan: string) => {
    setLoading(plan)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      // silent fail
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-normal text-[#3D2B1F] mb-1">
        Billing
      </h2>
      <p className="text-sm text-[#7A6A5A] mb-8">
        Manage your subscription and payment method.
      </p>

      {/* Current plan status */}
      <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg p-6 max-w-[500px] mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-[#3D2B1F]">
              {tier === 'pro' ? 'Professional' : tier === 'agency' ? 'Agency' : tier === 'trial' ? 'Free Trial' : 'Free plan'}
            </p>
            <p className="text-xs text-[#7A6A5A]">
              {tier === 'pro'
                ? '£29/month'
                : tier === 'agency'
                ? '£79/month'
                : tier === 'trial'
                ? '7-day trial active'
                : 'Up to 3 properties'}
            </p>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            tier === 'pro' || tier === 'agency' ? 'bg-[#4A7A52]/10 text-[#4A7A52]' :
            tier === 'trial' ? 'bg-[#7C5C3A]/10 text-[#7C5C3A]' :
            'bg-[#C47A2B]/10 text-[#C47A2B]'
          }`}>
            {tier === 'pro' || tier === 'agency' ? 'Active' : tier === 'trial' ? 'Trial' : 'Free'}
          </span>
        </div>

        {profile?.stripe_customer_id ? (
          <button
            onClick={openPortal}
            disabled={loading === 'portal'}
            className="text-sm font-medium text-[#7C5C3A] hover:underline disabled:opacity-50"
          >
            {loading === 'portal' ? 'Opening...' : 'Manage subscription'}
          </button>
        ) : null}
      </div>

      {/* Upgrade options — shown when not on a paid plan */}
      {tier !== 'pro' && tier !== 'agency' && (
        <div>
          <h3 className="text-sm font-semibold text-[#3D2B1F] mb-4 uppercase tracking-wide">
            Upgrade your plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[720px]">
            {PLANS.map(plan => (
              <div
                key={plan.id}
                className="rounded-xl p-6 relative"
                style={{
                  background: plan.highlight ? '#3D2B1F' : '#FAF6F0',
                  border: plan.highlight ? '2px solid #7C5C3A' : '1px solid #DDD4C5',
                }}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-6 bg-[#7C5C3A] text-[#FAF6F0] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-2"
                   style={{ color: plan.highlight ? '#DDD4C5' : '#7A6A5A' }}>
                  {plan.name}
                </p>
                <div className="mb-1 flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-figures)] text-3xl font-semibold"
                        style={{ color: plan.highlight ? '#FAF6F0' : '#3D2B1F' }}>
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ color: plan.highlight ? '#DDD4C5' : '#7A6A5A' }}>
                    {plan.period}
                  </span>
                </div>
                <p className="text-xs mb-4" style={{ color: plan.highlight ? '#DDD4C5' : '#7A6A5A' }}>
                  {plan.desc}
                </p>
                <ul className="space-y-2 mb-5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs"
                        style={{ color: plan.highlight ? '#FAF6F0' : '#3D2B1F' }}>
                      <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#4A7A52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => startCheckout(plan.id)}
                  disabled={loading === plan.id}
                  className="w-full text-center text-sm font-medium rounded-lg px-5 py-2.5 transition-colors disabled:opacity-60"
                  style={{ background: plan.highlight ? '#7C5C3A' : '#3D2B1F', color: '#FAF6F0' }}
                >
                  {loading === plan.id ? 'Redirecting...' : `Start 7-day trial — ${plan.price}/mo`}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
