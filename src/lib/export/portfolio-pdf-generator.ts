import type { PortfolioDTO, Property } from '@/types'

// PropertyBrief colour palette
const COLOURS = {
  stoneBg: '#F0EBE1',
  warmBrown: '#3D2B1F',
  terracotta: '#7C5C3A',
  cream: '#FAF6F0',
  muted: '#DDD4C5',
  textSecondary: '#7A6A5A',
  sageGreen: '#4A7A52',
  warmAmber: '#C47A2B',
  mutedRed: '#B84040',
}

function formatGBP(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}k`
  return `£${n.toFixed(0)}`
}

function formatPct(n: number): string {
  return `${n.toFixed(1)}%`
}

function yieldColour(y: number): string {
  if (y >= 6) return COLOURS.sageGreen
  if (y >= 4) return COLOURS.warmBrown
  return COLOURS.mutedRed
}

export async function generatePortfolioPdf(portfolio: PortfolioDTO): Promise<Blob> {
  const { jsPDF } = await import('jspdf')

  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
  const W = 595
  const margin = 48

  // ── Cover page ────────────────────────────────────────────────────────────────

  // Dark brown header band
  doc.setFillColor(COLOURS.warmBrown)
  doc.rect(0, 0, W, 180, 'F')

  // Terracotta accent stripe
  doc.setFillColor(COLOURS.terracotta)
  doc.rect(0, 175, W, 5, 'F')

  // Wordmark
  doc.setTextColor('#FAF6F0')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('PROPERTYBRIEF', margin, 36)

  // Report title
  doc.setFontSize(28)
  doc.setFont('helvetica', 'normal')
  doc.text(portfolio.ownerName, margin, 100)

  doc.setFontSize(11)
  doc.setTextColor(COLOURS.muted)
  doc.text(`Portfolio Report — ${portfolio.reportDate}`, margin, 128)
  doc.text(`${portfolio.summary.totalProperties} properties`, margin, 148)

  // Summary metrics row on cream background
  doc.setFillColor(COLOURS.cream)
  doc.rect(0, 185, W, 90, 'F')

  const metricCols = [margin, margin + 125, margin + 260, margin + 400]
  const metrics = [
    { label: 'Portfolio Value', val: formatGBP(portfolio.summary.totalPortfolioValue) },
    { label: 'Annual Rent', val: formatGBP(portfolio.summary.totalAnnualRent) },
    { label: 'Avg Gross Yield', val: formatPct(portfolio.summary.averageGrossYield) },
    { label: 'Annual Profit', val: formatGBP(portfolio.summary.totalAnnualProfit) },
  ]

  metrics.forEach((m, i) => {
    const x = metricCols[i]
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(COLOURS.warmBrown)
    doc.text(m.val, x, 230)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(COLOURS.textSecondary)
    doc.text(m.label.toUpperCase(), x, 248)
  })

  // Divider
  doc.setDrawColor(COLOURS.muted)
  doc.setLineWidth(0.5)
  doc.line(margin, 278, W - margin, 278)

  // Executive summary
  let y = 302
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(COLOURS.terracotta)
  doc.text('EXECUTIVE SUMMARY', margin, y)
  y += 16

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(COLOURS.warmBrown)
  const summaryLines = doc.splitTextToSize(portfolio.executiveSummary || 'Portfolio analysis complete.', W - margin * 2)
  doc.text(summaryLines, margin, y)
  y += summaryLines.length * 14 + 20

  // Recommendations
  if (portfolio.recommendations.length > 0) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(COLOURS.terracotta)
    doc.text('RECOMMENDATIONS', margin, y)
    y += 14

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(COLOURS.warmBrown)
    portfolio.recommendations.forEach((rec, i) => {
      const lines = doc.splitTextToSize(`${i + 1}. ${rec}`, W - margin * 2 - 10)
      doc.text(lines, margin, y)
      y += lines.length * 13 + 4
    })
  }

  // ── Property table page ───────────────────────────────────────────────────────

  doc.addPage()

  // Page header
  doc.setFillColor(COLOURS.warmBrown)
  doc.rect(0, 0, W, 50, 'F')
  doc.setTextColor('#FAF6F0')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('PROPERTYBRIEF', margin, 22)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(COLOURS.muted)
  doc.text(portfolio.ownerName, margin, 38)

  y = 80

  // Table header
  doc.setFillColor(COLOURS.cream)
  doc.rect(margin - 6, y - 14, W - margin * 2 + 12, 18, 'F')

  const cols = {
    address: margin,
    type: margin + 170,
    value: margin + 240,
    grossYield: margin + 300,
    netYield: margin + 356,
    capGrowth: margin + 410,
    profit: margin + 460,
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(COLOURS.textSecondary)
  doc.text('ADDRESS', cols.address, y)
  doc.text('TYPE', cols.type, y)
  doc.text('VALUE', cols.value, y, { align: 'right' })
  doc.text('GROSS', cols.grossYield, y, { align: 'right' })
  doc.text('NET', cols.netYield, y, { align: 'right' })
  doc.text('CAP GRWTH', cols.capGrowth, y, { align: 'right' })
  doc.text('PROFIT', cols.profit, y, { align: 'right' })

  y += 8
  doc.setDrawColor(COLOURS.muted)
  doc.setLineWidth(0.5)
  doc.line(margin - 6, y, W - margin + 6, y)
  y += 10

  // Table rows
  const properties = Object.values(portfolio.properties)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)

  properties.forEach((prop: Property) => {
    if (y > 780) {
      doc.addPage()
      y = 60
    }

    // Row background for underperformers
    if (prop.isUnderperforming) {
      doc.setFillColor('#FBF0EE')
      doc.rect(margin - 6, y - 10, W - margin * 2 + 12, 16, 'F')
    }

    // Address (truncated)
    doc.setTextColor(COLOURS.warmBrown)
    const addrTrunc = prop.address.length > 30 ? prop.address.substring(0, 28) + '…' : prop.address
    doc.text(addrTrunc, cols.address, y)

    // Type
    doc.setTextColor(COLOURS.textSecondary)
    doc.setFontSize(8)
    doc.text(prop.propertyType, cols.type, y)

    // Value
    doc.setFontSize(8.5)
    doc.setTextColor(COLOURS.warmBrown)
    doc.text(prop.currentValue ? formatGBP(prop.currentValue) : '—', cols.value, y, { align: 'right' })

    // Gross yield
    doc.setTextColor(yieldColour(prop.grossYield))
    doc.setFont('helvetica', 'bold')
    doc.text(formatPct(prop.grossYield), cols.grossYield, y, { align: 'right' })

    // Net yield
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(yieldColour(prop.netYield))
    doc.text(formatPct(prop.netYield), cols.netYield, y, { align: 'right' })

    // Capital growth
    const cg = prop.capitalGrowth
    doc.setTextColor(cg !== null ? (cg >= 0 ? COLOURS.sageGreen : COLOURS.mutedRed) : COLOURS.textSecondary)
    doc.text(cg !== null ? (cg >= 0 ? '+' : '') + formatPct(cg) : '—', cols.capGrowth, y, { align: 'right' })

    // Annual profit
    doc.setTextColor(prop.annualProfit >= 0 ? COLOURS.sageGreen : COLOURS.mutedRed)
    doc.text(formatGBP(prop.annualProfit), cols.profit, y, { align: 'right' })

    doc.setDrawColor('#EEE8E0')
    doc.setLineWidth(0.3)
    doc.line(margin - 6, y + 5, W - margin + 6, y + 5)

    y += 16
  })

  // Footer on last page
  y += 20
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(COLOURS.textSecondary)
  doc.text(`Generated by PropertyBrief · propertybrief.co.uk · ${portfolio.reportDate}`, margin, y)

  return doc.output('blob')
}
