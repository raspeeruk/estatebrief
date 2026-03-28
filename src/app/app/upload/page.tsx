'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { FileDropzone } from '@/components/ui/file-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import type { ParsedCSV } from '@/types'
import type { PropertyColumnMapping } from '@/lib/engine/property-pipeline'

const FIELD_OPTIONS: { value: keyof PropertyColumnMapping | 'ignore'; label: string }[] = [
  { value: 'address', label: 'Address (required)' },
  { value: 'propertyType', label: 'Property Type' },
  { value: 'purchasePrice', label: 'Purchase Price' },
  { value: 'currentValue', label: 'Current Value / Valuation' },
  { value: 'monthlyRent', label: 'Monthly Rent (required)' },
  { value: 'monthlyMortgage', label: 'Monthly Mortgage' },
  { value: 'otherMonthlyCosts', label: 'Other Monthly Costs' },
  { value: 'tenancyStatus', label: 'Tenancy Status' },
  { value: 'purchaseDate', label: 'Purchase Date' },
  { value: 'notes', label: 'Notes' },
  { value: 'ignore', label: 'Ignore this column' },
]

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [parsed, setParsed] = useState<ParsedCSV | null>(null)
  const [mapping, setMapping] = useState<Record<string, keyof PropertyColumnMapping | 'ignore'>>({})
  const [ownerName, setOwnerName] = useState('')
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState({ step: '', progress: 0, detail: '' })
  const [error, setError] = useState<string | null>(null)
  const [pasteText, setPasteText] = useState('')

  const parseCSVText = useCallback(async (text: string, fileName?: string) => {
    setError(null)
    const Papa = (await import('papaparse')).default
    const result = Papa.parse(text, { header: false, skipEmptyLines: true })
    const rows = result.data as string[][]
    if (rows.length < 2) {
      setError('CSV must have at least a header row and one data row')
      return
    }
    const headers = rows[0].map((h: string) => (h || '').trim())
    const dataRows = rows.slice(1).filter((r: string[]) => r.some((c: string) => c?.trim()))
    setParsed({ headers, rows: dataRows, totalRows: dataRows.length, preview: dataRows.slice(0, 5) })
    if (fileName) setFile(new File([text], fileName, { type: 'text/csv' }))

    // Auto-detect columns
    try {
      const res = await fetch('/api/detect-property-columns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headers }),
      })
      const data = await res.json()
      if (data.mapping) setMapping(data.mapping)
    } catch {
      const m: Record<string, 'ignore'> = {}
      headers.forEach(h => { m[h] = 'ignore' })
      setMapping(m)
    }
  }, [])

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile)
    const text = await selectedFile.text()
    await parseCSVText(text)
  }, [parseCSVText])

  const handlePaste = async () => {
    if (!pasteText.trim()) return
    await parseCSVText(pasteText, 'pasted-data.csv')
  }

  const updateMapping = (header: string, field: keyof PropertyColumnMapping | 'ignore') => {
    setMapping(prev => ({ ...prev, [header]: field }))
  }

  const resetData = () => {
    setFile(null)
    setParsed(null)
    setMapping({})
    setPasteText('')
  }

  // Validate: need at minimum address + monthlyRent mapped
  const addressCol = Object.entries(mapping).find(([, v]) => v === 'address')?.[0]
  const rentCol = Object.entries(mapping).find(([, v]) => v === 'monthlyRent')?.[0]
  const purchasePriceCol = Object.entries(mapping).find(([, v]) => v === 'purchasePrice')?.[0]
  const canProcess = !!(addressCol && (rentCol || purchasePriceCol))

  const handleProcess = async () => {
    if (!parsed) return
    setProcessing(true)
    setError(null)

    const csvContent = file ? await file.text() : pasteText

    // Build clean column mapping (only non-ignore values)
    const cleanMapping: Partial<PropertyColumnMapping> = {}
    for (const [header, field] of Object.entries(mapping)) {
      if (field !== 'ignore') {
        (cleanMapping as Record<string, string>)[field] = header
      }
    }

    try {
      const res = await fetch('/api/process-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvContent, columnMapping: cleanMapping, ownerName: ownerName.trim() || 'My Portfolio' }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Processing failed')
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let portfolioId = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const text = decoder.decode(value)
          const lines = text.split('\n').filter(l => l.startsWith('data: '))
          for (const line of lines) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.type === 'progress') {
                setProgress({ step: data.step, progress: data.progress, detail: data.detail || '' })
              } else if (data.type === 'complete') {
                portfolioId = data.portfolioId
              } else if (data.type === 'error') {
                throw new Error(data.error)
              }
            } catch (e) {
              if (e instanceof Error && e.message !== 'Unexpected end of JSON input') throw e
            }
          }
        }
      }

      if (portfolioId) {
        router.push(`/app/report/${portfolioId}`)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-10">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl text-[#3D2B1F] mb-3">
          Upload your portfolio
        </h1>
        <p className="text-[#7A6A5A]">
          Drop a CSV export of your property portfolio. We auto-detect columns.
        </p>
      </div>

      {/* Owner name */}
      <Card padding="lg" className="mb-6">
        <label className="block text-xs font-semibold text-[#7A6A5A] uppercase tracking-wide mb-2">
          Owner / Portfolio name
        </label>
        <input
          type="text"
          value={ownerName}
          onChange={e => setOwnerName(e.target.value)}
          placeholder="e.g. Smith Property Holdings"
          className="w-full text-sm border border-[#DDD4C5] rounded-lg px-3 py-2.5 bg-white text-[#3D2B1F] placeholder:text-[#7A6A5A]/50 focus:outline-none focus:ring-2 focus:ring-[#7C5C3A]"
        />
        <p className="text-xs text-[#7A6A5A] mt-1.5">This name appears in the header of the PDF report.</p>
      </Card>

      {!parsed && (
        <div className="space-y-6">
          <FileDropzone onFileSelect={handleFileSelect} disabled={processing} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#DDD4C5]" /></div>
            <div className="relative flex justify-center">
              <span className="bg-[#F0EBE1] px-3 text-sm text-[#7A6A5A]">or paste your CSV data</span>
            </div>
          </div>

          <div>
            <textarea
              value={pasteText}
              onChange={e => setPasteText(e.target.value)}
              placeholder={'Paste CSV data here...\n\nAddress,Purchase Price,Current Value,Monthly Rent,Monthly Mortgage,Other Costs,Status\n14 Acacia Road SW4,£320000,£410000,£1800,£900,£150,let'}
              className="w-full h-40 border border-[#DDD4C5] rounded-lg p-4 text-sm font-[family-name:var(--font-figures)] bg-white text-[#3D2B1F] placeholder:text-[#7A6A5A]/50 focus:outline-none focus:ring-2 focus:ring-[#7C5C3A] resize-y"
              disabled={processing}
            />
            {pasteText.trim() && (
              <div className="mt-3 flex justify-end">
                <Button size="sm" onClick={handlePaste}>Parse data</Button>
              </div>
            )}
          </div>

          {/* Expected columns guide */}
          <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg p-5">
            <h3 className="text-sm font-semibold text-[#3D2B1F] mb-2">Expected columns</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-[#7A6A5A]">
              <span><strong className="text-[#3D2B1F]">Address</strong> — required</span>
              <span><strong className="text-[#3D2B1F]">Monthly Rent</strong> — required</span>
              <span>Property Type</span>
              <span>Monthly Mortgage</span>
              <span>Purchase Price</span>
              <span>Other Monthly Costs</span>
              <span>Current Value</span>
              <span>Tenancy Status</span>
              <span>Purchase Date</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
      )}

      {parsed && !processing && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#3D2B1F]">{file?.name || 'Pasted data'}</p>
                <p className="text-sm text-[#7A6A5A]">{parsed.totalRows} properties, {parsed.headers.length} columns</p>
              </div>
              <Button variant="ghost" size="sm" onClick={resetData}>Change file</Button>
            </div>
          </Card>

          {/* Column mapping */}
          <Card padding="lg">
            <CardHeader>
              <CardTitle>Map your columns</CardTitle>
              <p className="text-sm text-[#7A6A5A] mt-1">
                We auto-detected these mappings. At minimum, map Address and Monthly Rent.
              </p>
            </CardHeader>
            <div className="mt-6 space-y-3">
              {parsed.headers.map(header => (
                <div key={header} className="flex items-center gap-4">
                  <span className="w-48 text-sm font-[family-name:var(--font-figures)] text-[#7A6A5A] truncate" title={header}>
                    {header}
                  </span>
                  <svg className="w-4 h-4 text-[#DDD4C5] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <select
                    value={mapping[header] || 'ignore'}
                    onChange={e => updateMapping(header, e.target.value as keyof PropertyColumnMapping | 'ignore')}
                    className="flex-1 text-sm border border-[#DDD4C5] rounded-lg px-3 py-2 bg-white text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#7C5C3A]"
                  >
                    {FIELD_OPTIONS.map(f => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </Card>

          {/* Data preview */}
          <Card padding="lg">
            <CardHeader>
              <CardTitle>Data preview</CardTitle>
              <p className="text-sm text-[#7A6A5A] mt-1">First 5 rows</p>
            </CardHeader>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#DDD4C5]">
                    {parsed.headers.map(h => (
                      <th key={h} className="text-left py-2 px-3 font-[family-name:var(--font-heading)] text-[#3D2B1F] whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsed.preview.map((row, i) => (
                    <tr key={i} className="border-b border-[#DDD4C5]/50">
                      {row.map((cell, j) => (
                        <td key={j} className="py-2 px-3 font-[family-name:var(--font-figures)] text-xs text-[#7A6A5A] whitespace-nowrap max-w-[200px] truncate">
                          {cell || '\u2014'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">{error}</div>
          )}

          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleProcess}
              disabled={!canProcess}
            >
              {canProcess ? 'Analyse portfolio' : 'Map Address and Rent columns first'}
            </Button>
          </div>
        </div>
      )}

      {processing && (
        <Card padding="lg">
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#7C5C3A]/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#7C5C3A] animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl text-[#3D2B1F] mb-2">
                {progress.step || 'Analysing portfolio...'}
              </h3>
              {progress.detail && <p className="text-sm text-[#7A6A5A]">{progress.detail}</p>}
            </div>
            <ProgressBar progress={progress.progress} />
          </div>
        </Card>
      )}
    </div>
  )
}
