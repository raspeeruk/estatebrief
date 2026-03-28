'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { StepIndicator } from '@/components/ui/step-indicator'
import { AuthProvider, useAuth } from '@/components/auth/auth-provider'
import type { Step } from '@/components/ui/step-indicator'

const PORTFOLIO_STEPS: Step[] = [
  { id: 'upload', label: 'Upload' },
  { id: 'report', label: 'Review Report' },
  { id: 'export', label: 'Export' },
]

function getCurrentStep(pathname: string): string {
  if (pathname.includes('/upload')) return 'upload'
  if (pathname.includes('/report')) return 'report'
  if (pathname.includes('/export')) return 'export'
  return 'upload'
}

function getCompletedSteps(current: string, steps: Step[]): string[] {
  const order = steps.map(s => s.id)
  const idx = order.indexOf(current)
  return order.slice(0, idx)
}

function AppNav() {
  const pathname = usePathname()
  const { user, tier, trialDaysLeft, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const isDashboard = pathname === '/app/dashboard'
  const isSettings = pathname.startsWith('/app/settings')
  const showSteps = !isDashboard && !isSettings

  const currentStep = getCurrentStep(pathname)
  const completedSteps = getCompletedSteps(currentStep, PORTFOLIO_STEPS)

  return (
    <nav className="bg-[#FAF6F0] border-b border-[#DDD4C5]">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/app/dashboard" className="font-[family-name:var(--font-heading)] text-xl text-[#3D2B1F]">
            PropertyBrief
          </Link>
          {user && (
            <Link href="/app/dashboard" className="text-sm text-[#7A6A5A] hover:text-[#3D2B1F] transition-colors">
              My Reports
            </Link>
          )}
        </div>

        {showSteps && (
          <StepIndicator
            steps={PORTFOLIO_STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        )}

        <div className="flex items-center gap-4">
          {tier === 'trial' && trialDaysLeft > 0 && (
            <span className="text-xs font-medium bg-[#7C5C3A]/10 text-[#7C5C3A] px-2.5 py-1 rounded-full">
              {trialDaysLeft}d trial
            </span>
          )}
          {tier === 'trial_expired' && (
            <span className="text-xs font-medium bg-[#C47A2B]/10 text-[#C47A2B] px-2.5 py-1 rounded-full">
              Trial ended
            </span>
          )}
          {tier === 'pro' && (
            <span className="text-xs font-medium bg-[#4A7A52]/10 text-[#4A7A52] px-2.5 py-1 rounded-full">
              Pro
            </span>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 rounded-full bg-[#7C5C3A] text-[#FAF6F0] text-xs font-semibold flex items-center justify-center hover:bg-[#664B2E] transition-colors"
              >
                {user.email?.charAt(0).toUpperCase() || '?'}
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-10 z-50 bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg shadow-lg py-1.5 w-52">
                    <div className="px-3 py-2 border-b border-[#DDD4C5]">
                      <p className="text-xs text-[#7A6A5A] truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/app/settings"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-[#3D2B1F] hover:bg-[#F0EBE1] transition-colors"
                    >
                      Account
                    </Link>
                    <Link
                      href="/app/settings/branding"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-[#3D2B1F] hover:bg-[#F0EBE1] transition-colors"
                    >
                      Branding
                    </Link>
                    <Link
                      href="/app/settings/billing"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-[#3D2B1F] hover:bg-[#F0EBE1] transition-colors"
                    >
                      Billing
                    </Link>
                    <div className="border-t border-[#DDD4C5] mt-1.5 pt-1.5">
                      <button
                        onClick={() => { setMenuOpen(false); signOut() }}
                        className="block w-full text-left px-3 py-2 text-sm text-[#B84040] hover:bg-[#F0EBE1] transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="text-sm text-[#7C5C3A] font-medium hover:underline">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F0EBE1]">
        <AppNav />
        <main className="max-w-[1200px] mx-auto px-6 py-10">
          {children}
        </main>
      </div>
    </AuthProvider>
  )
}
