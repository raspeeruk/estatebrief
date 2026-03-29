'use client'

import { Suspense, useEffect, useState, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { PortfolioDTO } from '@/types'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reportId = searchParams.get('report_id')
  const sessionId = searchParams.get('session_id')

  const [status, setStatus] = useState<'loading' | 'downloading' | 'done' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const hasDownloaded = useRef(false)

  useEffect(() => {
    if (!reportId || !sessionId || hasDownloaded.current) return
    hasDownloaded.current = true

    async function downloadReports() {
      setStatus('downloading')

      try {
        // Try to get portfolio from sessionStorage first (fast path)
        let portfolio: PortfolioDTO | null = null
        const cached = sessionStorage.getItem(`propertybrief_report_${reportId}`)
        if (cached) {
          portfolio = JSON.parse(cached)
        }

        // Fall back to API
        if (!portfolio) {
          const res = await fetch(`/api/portfolio/${reportId}`)
          if (res.ok) {
            portfolio = await res.json()
          }
        }

        if (!portfolio) {
          throw new Error('Portfolio data not found. Please return to your report and try again.')
        }

        // Generate PDF
        const { generatePortfolioPdf } = await import('@/lib/export/portfolio-pdf-generator')
        const pdfBlob = await generatePortfolioPdf(portfolio)

        // Generate PPTX
        const { generatePortfolioPptx } = await import('@/lib/export/property-pptx-generator')
        const pptxBlob = await generatePortfolioPptx(portfolio)

        const safeName = portfolio.ownerName.replace(/[^a-zA-Z0-9]+/g, '-')

        // Trigger PDF download
        const pdfUrl = URL.createObjectURL(pdfBlob)
        const pdfLink = document.createElement('a')
        pdfLink.href = pdfUrl
        pdfLink.download = `${safeName}-PropertyBrief.pdf`
        document.body.appendChild(pdfLink)
        pdfLink.click()
        document.body.removeChild(pdfLink)
        URL.revokeObjectURL(pdfUrl)

        // Small delay between downloads to avoid browser blocking
        await new Promise(r => setTimeout(r, 500))

        // Trigger PPTX download
        const pptxUrl = URL.createObjectURL(pptxBlob)
        const pptxLink = document.createElement('a')
        pptxLink.href = pptxUrl
        pptxLink.download = `${safeName}-PropertyBrief.pptx`
        document.body.appendChild(pptxLink)
        pptxLink.click()
        document.body.removeChild(pptxLink)
        URL.revokeObjectURL(pptxUrl)

        setStatus('done')
      } catch (err) {
        console.error('Download failed:', err)
        setErrorMsg(err instanceof Error ? err.message : 'Download failed')
        setStatus('error')
      }
    }

    downloadReports()
  }, [reportId, sessionId])

  const handleRetry = () => {
    hasDownloaded.current = false
    setStatus('loading')
  }

  return (
    <div className="max-w-lg mx-auto pt-16 pb-24 text-center">
      {status === 'loading' && (
        <div>
          <div className="w-12 h-12 border-2 border-[#7C5C3A] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#3D2B1F] mb-2">
            Confirming payment…
          </h2>
          <p className="text-sm text-[#7A6A5A]">Please wait a moment.</p>
        </div>
      )}

      {status === 'downloading' && (
        <div>
          <div className="w-12 h-12 border-2 border-[#7C5C3A] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#3D2B1F] mb-2">
            Generating your reports…
          </h2>
          <p className="text-sm text-[#7A6A5A]">Building your PDF and PPTX. This takes a few seconds.</p>
        </div>
      )}

      {status === 'done' && (
        <div>
          {/* Success icon */}
          <div className="w-16 h-16 rounded-full bg-[#E8F2EA] flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#4A7A52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-[#3D2B1F] mb-3">
            Downloads started
          </h1>
          <p className="text-[#7A6A5A] mb-2">
            Your <strong className="text-[#3D2B1F]">PDF report</strong> and <strong className="text-[#3D2B1F]">PowerPoint deck</strong> are downloading now.
          </p>
          <p className="text-sm text-[#7A6A5A] mb-8">
            Check your downloads folder. If they didn&apos;t start, use the buttons below.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 bg-[#7C5C3A] text-[#FAF6F0] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#664B2E] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download again
            </button>
            {reportId && (
              <button
                onClick={() => router.push(`/app/report/${reportId}`)}
                className="inline-flex items-center gap-2 border border-[#DDD4C5] text-[#7A6A5A] px-5 py-2.5 rounded-lg text-sm hover:bg-[#F0EBE1] transition-colors"
              >
                Back to report
              </button>
            )}
          </div>

          <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-6 text-left">
            <h3 className="font-[family-name:var(--font-heading)] text-base text-[#3D2B1F] mb-3">
              What you received
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#B84040] text-lg leading-none mt-0.5">&#9632;</span>
                <div>
                  <p className="text-sm font-medium text-[#3D2B1F]">PDF Report</p>
                  <p className="text-xs text-[#7A6A5A]">Estate agency-style brochure. Print-ready, shareable with advisors.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C47A2B] text-lg leading-none mt-0.5">&#9632;</span>
                <div>
                  <p className="text-sm font-medium text-[#3D2B1F]">PowerPoint Deck</p>
                  <p className="text-xs text-[#7A6A5A]">6-slide presentation. Use in mortgage broker meetings, investor reviews, accountant briefings.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div>
          <div className="w-16 h-16 rounded-full bg-[#FBF0EE] flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#B84040]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#3D2B1F] mb-2">
            Download failed
          </h2>
          <p className="text-sm text-[#7A6A5A] mb-4">{errorMsg}</p>
          <p className="text-xs text-[#7A6A5A] mb-6">
            Your payment was successful. Please contact{' '}
            <a href="mailto:hello@estatebrief.com" className="underline text-[#7C5C3A]">hello@estatebrief.com</a>{' '}
            if this persists.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="bg-[#7C5C3A] text-[#FAF6F0] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#664B2E] transition-colors"
            >
              Try again
            </button>
            {reportId && (
              <button
                onClick={() => router.push(`/app/report/${reportId}`)}
                className="border border-[#DDD4C5] text-[#7A6A5A] px-5 py-2.5 rounded-lg text-sm hover:bg-[#F0EBE1] transition-colors"
              >
                Back to report
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-[#7C5C3A] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
