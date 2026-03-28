'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/auth-provider'

export default function BillingSettingsPage() {
  const { tier, profile } = useAuth()
  const [loading, setLoading] = useState(false)

  const openPortal = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/billing-portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false)
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

      <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg p-6 max-w-[500px]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-[#3D2B1F]">
              {tier === 'pro' ? 'Professional' : tier === 'trial' ? 'Free Trial' : 'No active plan'}
            </p>
            <p className="text-xs text-[#7A6A5A]">
              {tier === 'pro' ? '£29/month (Pro) or £79/month (Agency)' : tier === 'trial' ? '7-day trial' : 'Upgrade to unlock full features'}
            </p>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            tier === 'pro' ? 'bg-[#4A7A52]/10 text-[#4A7A52]' :
            tier === 'trial' ? 'bg-[#7C5C3A]/10 text-[#7C5C3A]' :
            'bg-[#C47A2B]/10 text-[#C47A2B]'
          }`}>
            {tier === 'pro' ? 'Active' : tier === 'trial' ? 'Trial' : 'Inactive'}
          </span>
        </div>

        {profile?.stripe_customer_id ? (
          <button
            onClick={openPortal}
            disabled={loading}
            className="text-sm font-medium text-[#7C5C3A] hover:underline disabled:opacity-50"
          >
            {loading ? 'Opening...' : 'Manage subscription'}
          </button>
        ) : tier !== 'pro' ? (
          <a
            href="/api/checkout"
            className="inline-block bg-[#7C5C3A] text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-[#664B2E] transition-colors"
          >
            Upgrade to Professional — £29/month
          </a>
        ) : null}
      </div>
    </div>
  )
}
