import type { Property, PortfolioDTO, PropertyType, TenancyStatus } from '@/types'
import { parseCSV, csvToRecords } from './csv-parser'
import { nanoid } from 'nanoid'
import Anthropic from '@anthropic-ai/sdk'

export interface PropertyColumnMapping {
  address: string
  propertyType?: string
  purchasePrice: string
  currentValue?: string
  monthlyRent: string
  monthlyMortgage?: string
  otherMonthlyCosts?: string
  tenancyStatus?: string
  purchaseDate?: string
  notes?: string
}

export interface PipelineProgress {
  step: string
  progress: number
  detail?: string
}

// ── Helpers ──────────────────────────────────────────────

function parseNumber(val: string | undefined): number {
  if (!val) return 0
  // Strip £, $, commas, spaces
  const cleaned = val.replace(/[£$,\s]/g, '').trim()
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

function parseNullableNumber(val: string | undefined): number | null {
  if (!val || val.trim() === '') return null
  return parseNumber(val)
}

function normalisePropertyType(val: string | undefined): PropertyType {
  if (!val) return 'unknown'
  const v = val.toLowerCase().trim()
  if (v.includes('hmo') || v.includes('house in multiple')) return 'hmo'
  if (v.includes('commercial') || v.includes('office') || v.includes('retail')) return 'commercial'
  if (v.includes('holiday') || v.includes('airbnb') || v.includes('serviced')) return 'holiday-let'
  if (v.includes('develop') || v.includes('land') || v.includes('plot')) return 'development'
  if (v.includes('residential') || v.includes('flat') || v.includes('house') ||
      v.includes('apartment') || v.includes('terrace') || v.includes('detach') ||
      v.includes('semi') || v.includes('bungalow') || v.includes('studio')) return 'residential'
  return 'unknown'
}

function normaliseTenancyStatus(val: string | undefined): TenancyStatus {
  if (!val) return 'let'
  const v = val.toLowerCase().trim()
  if (v.includes('vacant') || v.includes('empty') || v.includes('void')) return 'vacant'
  if (v.includes('offer') || v.includes('under')) return 'under-offer'
  if (v.includes('sale') || v.includes('selling') || v.includes('sold')) return 'for-sale'
  return 'let'
}

function calculateMetrics(prop: Omit<Property, 'grossYield' | 'netYield' | 'capitalGrowth' | 'annualProfit' | 'isUnderperforming'>): {
  grossYield: number
  netYield: number
  capitalGrowth: number | null
  annualProfit: number
  isUnderperforming: boolean
} {
  const annualRent = prop.monthlyRent * 12
  const annualMortgage = (prop.monthlyMortgage ?? 0) * 12
  const annualOtherCosts = prop.monthlyOtherCosts * 12
  const totalAnnualCosts = annualMortgage + annualOtherCosts
  const annualProfit = annualRent - totalAnnualCosts
  const valuation = prop.currentValue ?? prop.purchasePrice

  const grossYield = valuation > 0 ? (annualRent / valuation) * 100 : 0
  const netYield = valuation > 0 ? ((annualRent - annualOtherCosts) / valuation) * 100 : 0
  const capitalGrowth = (prop.currentValue !== null && prop.purchasePrice > 0)
    ? ((prop.currentValue - prop.purchasePrice) / prop.purchasePrice) * 100
    : null

  // UK residential: <4% gross yield is concerning; vacant properties are underperforming
  const isUnderperforming = grossYield < 4 || prop.tenancyStatus === 'vacant'

  return { grossYield, netYield, capitalGrowth, annualProfit, isUnderperforming }
}

// ── AI Enrichment ─────────────────────────────────────────

interface AIAnalysis {
  underperformingIds: string[]
  recommendations: string[]
  executiveSummary: string
  flaggedForReview: { id: string; reason: string }[]
}

async function runAIAnalysis(properties: Property[]): Promise<AIAnalysis> {
  const client = new Anthropic()

  const propertyList = properties.map(p => ({
    id: p.id,
    address: p.address,
    type: p.propertyType,
    status: p.tenancyStatus,
    grossYield: `${p.grossYield.toFixed(2)}%`,
    netYield: `${p.netYield.toFixed(2)}%`,
    capitalGrowth: p.capitalGrowth !== null ? `${p.capitalGrowth.toFixed(2)}%` : 'N/A',
    annualProfit: `£${p.annualProfit.toFixed(0)}`,
    currentValue: p.currentValue ? `£${p.currentValue.toLocaleString()}` : 'Unknown',
    purchasePrice: `£${p.purchasePrice.toLocaleString()}`,
  }))

  const prompt = `You are a UK property investment analyst. Here is a property portfolio:
${JSON.stringify(propertyList, null, 2)}

1. For each property, assess whether it is underperforming (gross yield <4% is concerning for UK residential)
2. Generate 3-5 specific recommendations for the portfolio (e.g., remortgage, sell underperformer, increase rent)
3. Write a 3-sentence executive summary highlighting portfolio strengths and key actions needed
4. Flag any properties with unusually high or low yields that need review

Return JSON: { "underperformingIds": string[], "recommendations": string[], "executiveSummary": string, "flaggedForReview": {"id": string, "reason": string}[] }`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : '{}'
  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('AI did not return valid JSON')

  return JSON.parse(jsonMatch[0]) as AIAnalysis
}

// ── Main Pipeline ─────────────────────────────────────────

export async function runPropertyPipeline(
  csvContent: string,
  columnMapping: PropertyColumnMapping,
  ownerName: string,
  onProgress?: (p: PipelineProgress) => void,
): Promise<PortfolioDTO> {
  // Step 1: Parse CSV
  onProgress?.({ step: 'Parsing CSV', progress: 10 })
  const parsed = parseCSV(csvContent)
  const records = csvToRecords(parsed)

  // Step 2: Build raw property records
  onProgress?.({ step: 'Building property records', progress: 25, detail: `${records.length} rows found` })

  const partialProperties: Omit<Property, 'grossYield' | 'netYield' | 'capitalGrowth' | 'annualProfit' | 'isUnderperforming'>[] = []

  for (const record of records) {
    const address = record[columnMapping.address]?.trim()
    if (!address) continue

    const monthlyRent = parseNumber(record[columnMapping.monthlyRent])
    if (monthlyRent === 0 && !address) continue

    partialProperties.push({
      id: nanoid(10),
      address,
      propertyType: normalisePropertyType(columnMapping.propertyType ? record[columnMapping.propertyType] : undefined),
      purchasePrice: parseNumber(columnMapping.purchasePrice ? record[columnMapping.purchasePrice] : undefined),
      currentValue: parseNullableNumber(columnMapping.currentValue ? record[columnMapping.currentValue] : undefined),
      monthlyRent,
      monthlyMortgage: parseNullableNumber(columnMapping.monthlyMortgage ? record[columnMapping.monthlyMortgage] : undefined),
      monthlyOtherCosts: parseNumber(columnMapping.otherMonthlyCosts ? record[columnMapping.otherMonthlyCosts] : undefined),
      tenancyStatus: normaliseTenancyStatus(columnMapping.tenancyStatus ? record[columnMapping.tenancyStatus] : undefined),
      purchaseDate: (columnMapping.purchaseDate ? record[columnMapping.purchaseDate]?.trim() : null) || null,
      notes: '',
    })
  }

  // Step 3: Calculate yields and capital growth
  onProgress?.({ step: 'Calculating yields & capital growth', progress: 45 })

  const properties: Property[] = partialProperties.map(p => ({
    ...p,
    ...calculateMetrics(p),
  }))

  // Step 4: AI enrichment
  onProgress?.({ step: 'Running AI analysis', progress: 65, detail: 'Identifying underperformers & generating recommendations' })

  let aiAnalysis: AIAnalysis
  try {
    aiAnalysis = await runAIAnalysis(properties)
    // Apply AI underperforming flags
    for (const prop of properties) {
      if (aiAnalysis.underperformingIds.includes(prop.id)) {
        prop.isUnderperforming = true
      }
    }
  } catch {
    // Fallback: use purely numerical thresholds
    aiAnalysis = {
      underperformingIds: properties.filter(p => p.isUnderperforming).map(p => p.id),
      recommendations: [
        'Review properties with gross yield below 4% — consider rent reviews or refinancing.',
        'Ensure all vacant properties have a lettings strategy in place.',
        'Consider remortgaging properties purchased before 2020 to benefit from current rates.',
      ],
      executiveSummary: 'Portfolio analysis complete. Review underperforming properties and consider yield optimisation strategies.',
      flaggedForReview: [],
    }
  }

  // Step 5: Build summary
  onProgress?.({ step: 'Building portfolio summary', progress: 85 })

  const propsById: Record<string, Property> = {}
  for (const p of properties) {
    propsById[p.id] = p
  }

  const totalPortfolioValue = properties.reduce((s, p) => s + (p.currentValue ?? p.purchasePrice), 0)
  const totalAnnualRent = properties.reduce((s, p) => s + p.monthlyRent * 12, 0)
  const totalAnnualProfit = properties.reduce((s, p) => s + p.annualProfit, 0)
  const avgGrossYield = properties.length > 0
    ? properties.reduce((s, p) => s + p.grossYield, 0) / properties.length
    : 0
  const avgNetYield = properties.length > 0
    ? properties.reduce((s, p) => s + p.netYield, 0) / properties.length
    : 0
  const propertiesWithGrowth = properties.filter(p => p.capitalGrowth !== null)
  const totalCapitalGrowth = propertiesWithGrowth.length > 0
    ? propertiesWithGrowth.reduce((s, p) => s + (p.capitalGrowth ?? 0), 0) / propertiesWithGrowth.length
    : null
  const vacantProperties = properties.filter(p => p.tenancyStatus === 'vacant').length
  const underperformingProperties = properties.filter(p => p.isUnderperforming).length

  onProgress?.({ step: 'Complete', progress: 100 })

  const now = new Date()
  const reportDate = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return {
    id: nanoid(12),
    ownerName,
    reportDate,
    properties: propsById,
    summary: {
      totalProperties: properties.length,
      totalPortfolioValue,
      totalAnnualRent,
      totalAnnualProfit,
      averageGrossYield: avgGrossYield,
      averageNetYield: avgNetYield,
      totalCapitalGrowth,
      vacantProperties,
      underperformingProperties,
    },
    executiveSummary: aiAnalysis.executiveSummary,
    recommendations: aiAnalysis.recommendations,
  }
}

/**
 * Auto-detect CSV column mapping from header names
 */
export function autoDetectPropertyColumns(headers: string[]): Partial<PropertyColumnMapping> {
  const mapping: Partial<PropertyColumnMapping> = {}

  const patterns: { field: keyof PropertyColumnMapping; regex: RegExp }[] = [
    { field: 'address', regex: /^(address|property|property\s*address|location|street|addr)$/i },
    { field: 'propertyType', regex: /^(type|property\s*type|prop\s*type|category|kind)$/i },
    { field: 'purchasePrice', regex: /^(purchase\s*price|buy\s*price|acquisition\s*price|bought\s*for|cost|purchase\s*cost)$/i },
    { field: 'currentValue', regex: /^(current\s*value|value|valuation|market\s*value|estimated\s*value|worth|mrkt\s*val)$/i },
    { field: 'monthlyRent', regex: /^(monthly\s*rent|rent|rental\s*income|pcm|rent\s*pcm|monthly\s*income|income)$/i },
    { field: 'monthlyMortgage', regex: /^(mortgage|monthly\s*mortgage|mortgage\s*payment|repayment|mortgage\s*pcm)$/i },
    { field: 'otherMonthlyCosts', regex: /^(other\s*costs|costs|monthly\s*costs|expenses|other\s*expenses|outgoings|other)$/i },
    { field: 'tenancyStatus', regex: /^(status|tenancy\s*status|let\s*status|occupancy|tenant\s*status)$/i },
    { field: 'purchaseDate', regex: /^(purchase\s*date|bought\s*date|acquisition\s*date|date\s*purchased|date\s*bought)$/i },
    { field: 'notes', regex: /^(notes|comments|remarks|notes\/comments)$/i },
  ]

  for (const header of headers) {
    for (const { field, regex } of patterns) {
      if (regex.test(header.trim()) && !mapping[field]) {
        mapping[field] = header
        break
      }
    }
  }

  return mapping
}
