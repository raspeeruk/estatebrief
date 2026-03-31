import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Message Sent | PropertyBrief' }

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-[#F0EBE1] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg p-8 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#3D2B1F] mb-2">Thanks for reaching out</h1>
        <p className="text-sm text-[#7A6A5A] mb-6">We've received your message and will get back to you within 24 hours.</p>
        <Link href="/" className="text-sm font-medium bg-[#7C5C3A] text-white px-6 py-2.5 rounded-lg hover:bg-[#664B2E] transition-colors inline-block">Back to homepage</Link>
      </div>
    </div>
  )
}
