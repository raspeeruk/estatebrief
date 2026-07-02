'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const website = (form.elements.namedItem('website') as HTMLInputElement)?.value || ''

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Could not subscribe right now')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Could not subscribe right now')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-sm text-[#4A7A52]">
        You&rsquo;re on the list. Yield insights, landing shortly.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="font-[family-name:var(--font-heading)] text-[#3D2B1F] text-lg mb-1">
        The Portfolio Brief
      </p>
      <p className="text-sm text-[#7A6A5A] mb-4">
        Yield benchmarks and landlord tax notes, once a month. No noise.
      </p>
      <div className="flex items-stretch gap-2 max-w-[380px]">
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          aria-label="Email address"
          className="flex-1 min-w-0 bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg px-4 py-2.5 text-sm text-[#3D2B1F] placeholder-[#7A6A5A]/60 focus:outline-none focus:border-[#7C5C3A] transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-[#7C5C3A] text-[#FAF6F0] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#664B2E] transition-colors disabled:opacity-60 shrink-0"
        >
          {status === 'sending' ? 'Joining…' : 'Join'}
        </button>
      </div>
      {/* Honeypot: humans never see or fill this */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none"
        style={{ position: 'absolute', left: '-9999px' }}
      />
      {status === 'error' && (
        <p className="text-sm text-[#B84040] mt-2">{errorMsg}</p>
      )}
    </form>
  )
}
