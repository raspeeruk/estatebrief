'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setError(typeof data.error === 'string' ? data.error : 'Could not subscribe right now')
        return
      }
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Could not subscribe right now')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-sm font-medium text-[#3D2B1F]">
        You&apos;re in. Portfolio insights are on their way.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full sm:max-w-[420px]">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="you@company.com"
          aria-label="Email address"
          className="flex-1 text-sm border border-[#DDD4C5] rounded-lg px-3 py-2.5 bg-white text-[#3D2B1F] placeholder:text-[#7A6A5A]/50 focus:outline-none focus:ring-2 focus:ring-[#7C5C3A]"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-[#7C5C3A] text-[#FAF6F0] text-sm font-medium rounded-lg px-6 py-2.5 hover:bg-[#664B2E] transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === 'sending' ? 'Sending...' : 'Subscribe'}
        </button>
      </div>
      <input
        type="text"
        name="website"
        value={website}
        onChange={e => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />
      {status === 'error' && (
        <p className="text-xs text-[#A03D2E] mt-2" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
