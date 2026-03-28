'use client'

import { useState } from 'react'
import { Button } from './button'

interface PaymentModalProps {
  sessionId: string
  onClose: () => void
}

export function PaymentModal({ sessionId, onClose }: PaymentModalProps) {
  const [loading, setLoading] = useState<'single' | 'pro' | null>(null)

  const handleCheckout = async (plan: 'single' | 'pro') => {
    setLoading(plan)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, sessionId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Something went wrong')
        setLoading(null)
      }
    } catch {
      alert('Could not connect to payment server')
      setLoading(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#FAFAF8] border border-[#E2E1DE] rounded-[6px] shadow-xl max-w-[520px] w-full mx-4 p-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="font-[family-name:var(--font-heading)] text-sm tracking-[0.15em] uppercase text-[#0D7377] mb-3">
          Export
        </p>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-[#1A1A1A] mb-2">
          Unlock your chart
        </h2>
        <p className="text-[#6B7280] text-sm mb-8">
          Upload and explore for free. Pay only when you export.
        </p>

        <div className="space-y-4">
          {/* Single chart */}
          <button
            onClick={() => handleCheckout('single')}
            disabled={loading !== null}
            className="w-full text-left bg-white border-2 border-[#E2E1DE] rounded-[6px] p-6 hover:border-[#0D7377] transition-colors disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#1A1A1A] mb-1">
                  This chart
                </h3>
                <p className="text-sm text-[#6B7280]">
                  PDF + PowerPoint export for this org chart
                </p>
              </div>
              <div className="text-right">
                <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#1A1A1A]">
                  £9
                </span>
                <p className="text-xs text-[#6B7280]">one-time</p>
              </div>
            </div>
            {loading === 'single' && (
              <div className="mt-3 flex items-center gap-2 text-sm text-[#0D7377]">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Redirecting to checkout…
              </div>
            )}
          </button>

          {/* Pro */}
          <button
            onClick={() => handleCheckout('pro')}
            disabled={loading !== null}
            className="w-full text-left bg-white border-2 border-[#0D7377] rounded-[6px] p-6 hover:bg-[#F0EFEC] transition-colors disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
          >
            <span className="absolute top-3 right-3 bg-[#0D7377] text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded">
              Best value
            </span>
            <div className="flex items-start justify-between pr-20">
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#1A1A1A] mb-1">
                  Pro
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Unlimited exports, all templates, shareable links
                </p>
              </div>
              <div className="text-right">
                <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#1A1A1A]">
                  £29
                </span>
                <p className="text-xs text-[#6B7280]">/month</p>
              </div>
            </div>
            {loading === 'pro' && (
              <div className="mt-3 flex items-center gap-2 text-sm text-[#0D7377]">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Redirecting to checkout…
              </div>
            )}
          </button>
        </div>

        <p className="text-xs text-[#6B7280] text-center mt-6">
          Secure payment via Stripe. Cancel Pro anytime.
        </p>
      </div>
    </div>
  )
}
