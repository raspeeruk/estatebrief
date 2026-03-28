'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { company_name: companyName || undefined },
      },
    })

    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-[#F0EBE1] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg p-8 text-center">
          <div className="w-14 h-14 bg-[#7C5C3A]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-[#7C5C3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#3D2B1F] mb-2">
            Check your email
          </h1>
          <p className="text-sm text-[#7A6A5A] mb-1">
            We sent a magic link to <span className="font-medium text-[#3D2B1F]">{email}</span>
          </p>
          <p className="text-xs text-[#7A6A5A]">
            Click the link to activate your 7-day free trial. No card required.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F0EBE1] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#3D2B1F]">
            PropertyBrief
          </Link>
        </div>

        <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg p-8">
          <h1 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#3D2B1F] mb-1">
            Start your free trial
          </h1>
          <p className="text-sm text-[#7A6A5A] mb-6">
            7 days free. Clean PDF exports. No card required.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-xs font-medium text-[#7A6A5A] uppercase tracking-wide mb-1.5">
              Work email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="you@company.com"
              className="w-full text-sm border border-[#DDD4C5] rounded-lg px-3 py-2.5 bg-white text-[#3D2B1F] placeholder:text-[#7A6A5A]/50 focus:outline-none focus:ring-2 focus:ring-[#7C5C3A] mb-4"
            />

            <label className="block text-xs font-medium text-[#7A6A5A] uppercase tracking-wide mb-1.5">
              Company name <span className="text-[#7A6A5A]/50">(optional)</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="Acme Search Partners"
              className="w-full text-sm border border-[#DDD4C5] rounded-lg px-3 py-2.5 bg-white text-[#3D2B1F] placeholder:text-[#7A6A5A]/50 focus:outline-none focus:ring-2 focus:ring-[#7C5C3A] mb-4"
            />

            {error && (
              <p className="text-sm text-[#DC2626] mb-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-[#7C5C3A] text-white text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-[#664B2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send magic link'}
            </button>
          </form>

          <p className="text-xs text-[#7A6A5A] text-center mt-5">
            Already have an account? <Link href="/auth/login" className="text-[#7C5C3A] font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
