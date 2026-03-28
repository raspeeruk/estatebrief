'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { PortfolioDTO, Property } from '@/types'

function formatGBP(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}k`
  return `£${n.toFixed(0)}`
}

function formatPct(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`
}

function yieldColor(y: number): string {
  if (y >= 6) return '#4A7A52'
  if (y >= 4) return '#3D2B1F'
  return '#B84040'
}

function statusBadge(status: Property['tenancyStatus']) {
  const map = {
    let: { bg: '#E8F2EA', text: '#4A7A52', label: 'Let' },
    vacant: { bg: '#FBF0EE', text: '#B84040', label: 'Vacant' },
    'under-offer': { bg: '#FEF6E4', text: '#C47A2B', label: 'Under Offer' },
    'for-sale': { bg: '#F0EBE1', text: '#7A6A5A', label: 'For Sale' },
  }
  return map[status] || map.let
}

export default function ReportPage() {
  const params = useParams()
  const router = useRouter()
  const portfolioId = params.id as string
  const [portfolio, setPortfolio] = useState<PortfolioDTO | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [editingSummary, setEditingSummary] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/portfolio/${portfolioId}`)
        if (res.ok) {
          const data = await res.json()
          setPortfolio(data)
        }
      } catch { /* ignore */ } finally { setLoading(false) }
    }
    load()
  }, [portfolioId])

  const updatePortfolio = useCallback((updater: (p: PortfolioDTO) => PortfolioDTO) => {
    setPortfolio(prev => prev ? updater(prev) : prev)
  }, [])

  const savePortfolio = async () => {
    if (!portfolio) return
    setSaving(true)
    try {
      await fetch(`/api/portfolio/${portfolioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolio),
      })
    } catch { /* ignore */ } finally { setSaving(false) }
  }

  const handleExport = async () => {
    if (!portfolio) return
    setExporting(true)
    try {
      await savePortfolio()
      const { generatePortfolioPdf } = await import('@/lib/export/portfolio-pdf-generator')
      const blob = await generatePortfolioPdf(portfolio)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${portfolio.ownerName.replace(/[^a-zA-Z0-9]+/g, '-')}-PropertyBrief.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF export failed:', err)
      alert('PDF export failed — check the console for details')
    } finally { setExporting(false) }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[#7C5C3A] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="text-center py-24">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#3D2B1F] mb-2">Report not found</h2>
        <Button onClick={() => router.push('/app/upload')}>Upload new portfolio</Button>
      </div>
    )
  }

  const { summary } = portfolio
  const properties = Object.values(portfolio.properties)

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* Report header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-[#3D2B1F] mb-1">
            {portfolio.ownerName}
          </h1>
          <p className="text-sm text-[#7A6A5A]">Portfolio Report — {portfolio.reportDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={savePortfolio} loading={saving}>Save</Button>
          <Button size="sm" onClick={handleExport} loading={exporting}>Export PDF</Button>
        </div>
      </div>

      {/* Portfolio summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Portfolio Value', val: formatGBP(summary.totalPortfolioValue), sub: `${summary.totalProperties} properties` },
          { label: 'Annual Rent Income', val: formatGBP(summary.totalAnnualRent), sub: formatGBP(summary.totalAnnualRent / 12) + '/mo' },
          { label: 'Avg Gross Yield', val: formatPct(summary.averageGrossYield), sub: 'Net: ' + formatPct(summary.averageNetYield) },
          { label: 'Annual Profit', val: formatGBP(summary.totalAnnualProfit), sub: summary.underperformingProperties > 0 ? `${summary.underperformingProperties} underperforming` : 'All properties profitable' },
        ].map(m => (
          <div key={m.label} className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-xl p-5">
            <p className="text-xs text-[#7A6A5A] uppercase tracking-wide font-semibold mb-2">{m.label}</p>
            <p className="font-[family-name:var(--font-figures)] text-2xl font-semibold text-[#3D2B1F]">{m.val}</p>
            <p className="text-xs text-[#7A6A5A] mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      {(portfolio.executiveSummary || portfolio.recommendations.length > 0) && (
        <Card padding="lg" className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-xl text-[#3D2B1F]">AI Portfolio Analysis</h2>
              <p className="text-xs text-[#7A6A5A] mt-0.5">Generated by Claude AI</p>
            </div>
            <button
              onClick={() => setEditingSummary(e => !e)}
              className="text-xs text-[#7C5C3A] hover:underline"
            >
              {editingSummary ? 'Done editing' : 'Edit'}
            </button>
          </div>

          {editingSummary ? (
            <textarea
              value={portfolio.executiveSummary}
              onChange={e => updatePortfolio(p => ({ ...p, executiveSummary: e.target.value }))}
              rows={4}
              className="w-full text-sm border border-[#DDD4C5] rounded-lg px-3 py-2 bg-white text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#7C5C3A] resize-y mb-4"
            />
          ) : (
            <p className="text-sm text-[#3D2B1F] leading-relaxed mb-4">{portfolio.executiveSummary}</p>
          )}

          {portfolio.recommendations.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-[#7A6A5A] uppercase tracking-wide mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {portfolio.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#3D2B1F]">
                    <span className="font-[family-name:var(--font-figures)] text-[#7C5C3A] font-semibold flex-shrink-0">{i + 1}.</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}

      {/* Underperformers warning */}
      {summary.underperformingProperties > 0 && (
        <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-sm text-orange-700">
            <strong>{summary.underperformingProperties} {summary.underperformingProperties === 1 ? 'property' : 'properties'}</strong> flagged as underperforming.
            {summary.vacantProperties > 0 && ` ${summary.vacantProperties} vacant.`} See highlighted rows below.
          </p>
        </div>
      )}

      {/* Properties table */}
      <Card padding="none" className="mb-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#DDD4C5]">
          <h2 className="font-[family-name:var(--font-heading)] text-xl text-[#3D2B1F]">
            Properties ({properties.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#DDD4C5] bg-[#FAF6F0]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#7A6A5A] uppercase tracking-wide">Address</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-[#7A6A5A] uppercase tracking-wide">Type</th>
                <th className="text-right py-3 px-3 text-xs font-semibold text-[#7A6A5A] uppercase tracking-wide">Value</th>
                <th className="text-right py-3 px-3 text-xs font-semibold text-[#7A6A5A] uppercase tracking-wide">Gross Yield</th>
                <th className="text-right py-3 px-3 text-xs font-semibold text-[#7A6A5A] uppercase tracking-wide">Net Yield</th>
                <th className="text-right py-3 px-3 text-xs font-semibold text-[#7A6A5A] uppercase tracking-wide">Cap Growth</th>
                <th className="text-right py-3 px-3 text-xs font-semibold text-[#7A6A5A] uppercase tracking-wide">Annual Profit</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#7A6A5A] uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(prop => {
                const badge = statusBadge(prop.tenancyStatus)
                return (
                  <tr
                    key={prop.id}
                    className="border-b border-[#DDD4C5]/60 last:border-0"
                    style={{ background: prop.isUnderperforming ? '#FBF8F5' : 'transparent' }}
                  >
                    <td className="py-3 px-4">
                      <span className="text-[#3D2B1F] font-medium">{prop.address}</span>
                      {prop.isUnderperforming && (
                        <span className="ml-2 inline-block bg-orange-100 text-orange-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                          Review
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-[#7A6A5A] capitalize">{prop.propertyType}</td>
                    <td className="py-3 px-3 text-right font-[family-name:var(--font-figures)] text-[#3D2B1F]">
                      {prop.currentValue ? formatGBP(prop.currentValue) : '—'}
                    </td>
                    <td className="py-3 px-3 text-right font-[family-name:var(--font-figures)] font-semibold"
                        style={{ color: yieldColor(prop.grossYield) }}>
                      {formatPct(prop.grossYield)}
                    </td>
                    <td className="py-3 px-3 text-right font-[family-name:var(--font-figures)]"
                        style={{ color: yieldColor(prop.netYield) }}>
                      {formatPct(prop.netYield)}
                    </td>
                    <td className="py-3 px-3 text-right font-[family-name:var(--font-figures)]"
                        style={{ color: prop.capitalGrowth !== null ? (prop.capitalGrowth >= 0 ? '#4A7A52' : '#B84040') : '#7A6A5A' }}>
                      {prop.capitalGrowth !== null ? (prop.capitalGrowth >= 0 ? '+' : '') + formatPct(prop.capitalGrowth) : '—'}
                    </td>
                    <td className="py-3 px-3 text-right font-[family-name:var(--font-figures)]"
                        style={{ color: prop.annualProfit >= 0 ? '#4A7A52' : '#B84040' }}>
                      {prop.annualProfit >= 0 ? '' : '-'}{formatGBP(Math.abs(prop.annualProfit))}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block text-xs font-medium px-2 py-1 rounded-full"
                            style={{ background: badge.bg, color: badge.text }}>
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer export bar */}
      <div className="flex items-center justify-between py-6 border-t border-[#DDD4C5]">
        <p className="text-sm text-[#7A6A5A]">
          {summary.totalProperties} properties &middot; {formatGBP(summary.totalPortfolioValue)} total value
        </p>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={savePortfolio} loading={saving}>Save draft</Button>
          <Button variant="secondary" onClick={handleExport} loading={exporting}>Export PDF</Button>
        </div>
      </div>

      {/* Upgrade modal placeholder */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#FAF6F0] rounded-xl shadow-xl max-w-md w-full mx-4 p-8">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[#3D2B1F] mb-2">Upgrade to Pro</h3>
            <p className="text-sm text-[#7A6A5A] mb-6">Remove the watermark and unlock unlimited properties.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 text-center border border-[#DDD4C5] text-[#7A6A5A] px-4 py-2.5 rounded-lg text-sm hover:bg-[#F0EBE1] transition-colors"
              >
                Maybe later
              </button>
              <a
                href="/app/settings/billing"
                className="flex-1 text-center bg-[#7C5C3A] text-[#FAF6F0] px-4 py-2.5 rounded-lg text-sm hover:bg-[#664B2E] transition-colors"
              >
                Upgrade now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
