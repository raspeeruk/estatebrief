'use client'

import { useAuth } from '@/components/auth/auth-provider'

export default function AccountSettingsPage() {
  const { user, profile, tier } = useAuth()

  return (
    <div>
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#3D2B1F] mb-1">
        Account
      </h2>
      <p className="text-sm text-[#7A6A5A] mb-8">
        Your account details.
      </p>

      <div className="space-y-6 max-w-[400px]">
        <div>
          <label className="block text-xs font-medium text-[#7A6A5A] uppercase tracking-wide mb-1.5">
            Email
          </label>
          <p className="text-sm text-[#3D2B1F] bg-[#FAF6F0] border border-[#DDD4C5] rounded-md px-3 py-2">
            {user?.email || '—'}
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#7A6A5A] uppercase tracking-wide mb-1.5">
            Plan
          </label>
          <p className="text-sm text-[#3D2B1F] bg-[#FAF6F0] border border-[#DDD4C5] rounded-md px-3 py-2 capitalize">
            {tier === 'trial' ? 'Free Trial' : tier === 'trial_expired' ? 'Trial Expired' : tier === 'pro' ? 'Professional' : 'Demo'}
          </p>
        </div>

        {profile?.company_name && (
          <div>
            <label className="block text-xs font-medium text-[#7A6A5A] uppercase tracking-wide mb-1.5">
              Company
            </label>
            <p className="text-sm text-[#3D2B1F] bg-[#FAF6F0] border border-[#DDD4C5] rounded-md px-3 py-2">
              {profile.company_name}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
