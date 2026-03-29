import type { PortfolioDTO, Property } from '@/types'

// PropertyBrief palette (RGB arrays for pptxgenjs)
const C = {
  warmBrown: '3D2B1F',
  terracotta: '7C5C3A',
  sageGreen: '4A7A52',
  warmAmber: 'C47A2B',
  mutedRed: 'B84040',
  cream: 'FAF6F0',
  stoneBg: 'F0EBE1',
  muted: 'DDD4C5',
  textSecondary: '7A6A5A',
  white: 'FFFFFF',
}

function formatGBP(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}k`
  return `£${n.toFixed(0)}`
}

function formatPct(n: number): string {
  return `${n.toFixed(1)}%`
}

function yieldColor(y: number): string {
  if (y >= 6) return C.sageGreen
  if (y >= 4) return C.warmAmber
  return C.mutedRed
}

export async function generatePortfolioPptx(portfolio: PortfolioDTO): Promise<Blob> {
  const pptxgenjs = await import('pptxgenjs')
  const PptxGenJS = pptxgenjs.default || pptxgenjs

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pptx = new (PptxGenJS as any)()
  pptx.layout = 'LAYOUT_WIDE'  // 13.33" x 7.5"

  const W = 13.33
  const H = 7.5

  const properties = Object.values(portfolio.properties)
  const { summary } = portfolio

  // ── Slide 1: Cover ──────────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide()

    // Dark brown background (full slide)
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: H,
      fill: { color: C.warmBrown },
      line: { color: C.warmBrown },
    })

    // Terracotta accent bar (bottom)
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: H - 0.25, w: W, h: 0.25,
      fill: { color: C.terracotta },
      line: { color: C.terracotta },
    })

    // Terracotta accent bar (left)
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: 0.12, h: H,
      fill: { color: C.terracotta },
      line: { color: C.terracotta },
    })

    // Wordmark
    slide.addText('PROPERTYBRIEF', {
      x: 0.6, y: 0.4, w: 6, h: 0.4,
      fontSize: 11,
      bold: true,
      color: C.muted,
      fontFace: 'Arial',
    })

    // Owner name (large)
    slide.addText(portfolio.ownerName, {
      x: 0.6, y: 1.6, w: 9, h: 1.2,
      fontSize: 52,
      bold: false,
      color: C.cream,
      fontFace: 'Georgia',
    })

    // Subtitle
    slide.addText(`Portfolio Report — ${portfolio.reportDate}`, {
      x: 0.6, y: 2.9, w: 8, h: 0.4,
      fontSize: 16,
      color: C.muted,
      fontFace: 'Arial',
    })

    slide.addText(`${summary.totalProperties} properties  ·  ${formatGBP(summary.totalPortfolioValue)} portfolio value`, {
      x: 0.6, y: 3.35, w: 8, h: 0.35,
      fontSize: 12,
      color: C.textSecondary,
      fontFace: 'Arial',
    })

    // 4 metric boxes at bottom
    const metricData = [
      { label: 'Portfolio Value', val: formatGBP(summary.totalPortfolioValue) },
      { label: 'Annual Rent', val: formatGBP(summary.totalAnnualRent) },
      { label: 'Avg Gross Yield', val: formatPct(summary.averageGrossYield) },
      { label: 'Annual Profit', val: formatGBP(summary.totalAnnualProfit) },
    ]

    const boxW = 2.8
    const boxH = 1.4
    const boxY = H - boxH - 0.5
    const startX = 0.6
    const gap = (W - startX - 0.4 - boxW * 4) / 3

    metricData.forEach((m, i) => {
      const bx = startX + i * (boxW + gap)

      // Box background
      slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
        x: bx, y: boxY, w: boxW, h: boxH,
        fill: { color: C.terracotta, transparency: 70 },
        line: { color: C.terracotta, transparency: 50, pt: 1 },
      })

      // Value
      slide.addText(m.val, {
        x: bx + 0.2, y: boxY + 0.15, w: boxW - 0.4, h: 0.65,
        fontSize: 26,
        bold: true,
        color: C.cream,
        fontFace: 'Georgia',
      })

      // Label
      slide.addText(m.label.toUpperCase(), {
        x: bx + 0.2, y: boxY + 0.85, w: boxW - 0.4, h: 0.35,
        fontSize: 8,
        color: C.muted,
        fontFace: 'Arial',
      })
    })
  }

  // ── Slide 2: Portfolio Summary ───────────────────────────────────────────────
  {
    const slide = pptx.addSlide()

    // Cream background
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: H,
      fill: { color: C.stoneBg },
      line: { color: C.stoneBg },
    })

    // Dark header strip
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: 1.1,
      fill: { color: C.warmBrown },
      line: { color: C.warmBrown },
    })

    slide.addText('PROPERTYBRIEF', {
      x: 0.5, y: 0.15, w: 4, h: 0.3,
      fontSize: 9,
      bold: true,
      color: C.muted,
      fontFace: 'Arial',
    })

    slide.addText('Portfolio Summary', {
      x: 0.5, y: 0.45, w: 8, h: 0.55,
      fontSize: 24,
      color: C.cream,
      fontFace: 'Georgia',
    })

    // Terracotta accent line
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 1.1, w: W, h: 0.06,
      fill: { color: C.terracotta },
      line: { color: C.terracotta },
    })

    // Big 4 stat cards
    const stats = [
      { label: 'Total Portfolio Value', val: formatGBP(summary.totalPortfolioValue), sub: `${summary.totalProperties} properties` },
      { label: 'Total Annual Rent', val: formatGBP(summary.totalAnnualRent), sub: `${formatGBP(summary.totalAnnualRent / 12)}/month avg` },
      { label: 'Average Gross Yield', val: formatPct(summary.averageGrossYield), sub: `Net: ${formatPct(summary.averageNetYield)}` },
      { label: 'Annual Profit', val: formatGBP(summary.totalAnnualProfit), sub: summary.underperformingProperties > 0 ? `${summary.underperformingProperties} underperforming` : 'All profitable' },
    ]

    const cW = 2.9
    const cH = 2.0
    const cY = 1.6
    const cGap = (W - 0.6 - cW * 4) / 3

    stats.forEach((s, i) => {
      const cx = 0.3 + i * (cW + cGap)

      slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
        x: cx, y: cY, w: cW, h: cH,
        fill: { color: C.white },
        line: { color: C.muted, pt: 1 },
        shadow: { type: 'outer', color: '000000', opacity: 0.06, blur: 8, offset: 2, angle: 270 },
      })

      // Terracotta top border accent
      slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
        x: cx, y: cY, w: cW, h: 0.06,
        fill: { color: C.terracotta },
        line: { color: C.terracotta },
      })

      slide.addText(s.label.toUpperCase(), {
        x: cx + 0.2, y: cY + 0.2, w: cW - 0.4, h: 0.3,
        fontSize: 7.5,
        bold: true,
        color: C.textSecondary,
        fontFace: 'Arial',
      })

      slide.addText(s.val, {
        x: cx + 0.2, y: cY + 0.55, w: cW - 0.4, h: 0.8,
        fontSize: 32,
        bold: true,
        color: C.warmBrown,
        fontFace: 'Georgia',
      })

      slide.addText(s.sub, {
        x: cx + 0.2, y: cY + 1.45, w: cW - 0.4, h: 0.35,
        fontSize: 9,
        color: C.textSecondary,
        fontFace: 'Arial',
      })
    })

    // Additional stats row
    const extraStats = [
      { label: 'Properties', val: String(summary.totalProperties) },
      { label: 'Vacant', val: String(summary.vacantProperties) },
      { label: 'Underperforming', val: String(summary.underperformingProperties) },
      { label: 'Total Cap Growth', val: summary.totalCapitalGrowth !== null ? formatPct(summary.totalCapitalGrowth) : 'N/A' },
    ]

    extraStats.forEach((s, i) => {
      const ex = 0.3 + i * (cW + cGap)
      slide.addText(s.label.toUpperCase(), {
        x: ex + 0.2, y: 4.0, w: cW - 0.4, h: 0.28,
        fontSize: 7,
        color: C.textSecondary,
        fontFace: 'Arial',
      })
      slide.addText(s.val, {
        x: ex + 0.2, y: 4.25, w: cW - 0.4, h: 0.45,
        fontSize: 20,
        bold: true,
        color: C.warmBrown,
        fontFace: 'Georgia',
      })
    })

    // Footer
    slide.addText(`Generated by PropertyBrief · ${portfolio.reportDate}`, {
      x: 0.5, y: H - 0.35, w: W - 1, h: 0.28,
      fontSize: 7.5,
      color: C.textSecondary,
      fontFace: 'Arial',
    })
  }

  // ── Slide 3: AI Executive Summary ────────────────────────────────────────────
  {
    const slide = pptx.addSlide()

    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: H,
      fill: { color: C.white },
      line: { color: C.white },
    })

    // Header
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: 1.1,
      fill: { color: C.warmBrown },
      line: { color: C.warmBrown },
    })

    slide.addText('PROPERTYBRIEF', {
      x: 0.5, y: 0.15, w: 4, h: 0.3,
      fontSize: 9,
      bold: true,
      color: C.muted,
      fontFace: 'Arial',
    })

    slide.addText('AI Portfolio Analysis', {
      x: 0.5, y: 0.45, w: 8, h: 0.55,
      fontSize: 24,
      color: C.cream,
      fontFace: 'Georgia',
    })

    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 1.1, w: W, h: 0.06,
      fill: { color: C.terracotta },
      line: { color: C.terracotta },
    })

    // Two-column layout: summary left, recommendations right
    const colY = 1.4

    // Left: Executive Summary
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0.4, y: colY, w: 6.2, h: 5.4,
      fill: { color: C.stoneBg },
      line: { color: C.muted, pt: 1 },
    })

    slide.addText('EXECUTIVE SUMMARY', {
      x: 0.65, y: colY + 0.25, w: 5.7, h: 0.3,
      fontSize: 8.5,
      bold: true,
      color: C.terracotta,
      fontFace: 'Arial',
    })

    const summaryText = portfolio.executiveSummary || 'Portfolio analysis complete.'
    slide.addText(summaryText, {
      x: 0.65, y: colY + 0.65, w: 5.7, h: 4.5,
      fontSize: 11,
      color: C.warmBrown,
      fontFace: 'Arial',
      valign: 'top',
      wrap: true,
    })

    // Right: Recommendations
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 6.85, y: colY, w: 6.0, h: 5.4,
      fill: { color: C.white },
      line: { color: C.muted, pt: 1 },
    })

    slide.addText('RECOMMENDATIONS', {
      x: 7.1, y: colY + 0.25, w: 5.5, h: 0.3,
      fontSize: 8.5,
      bold: true,
      color: C.terracotta,
      fontFace: 'Arial',
    })

    const recs = portfolio.recommendations.length > 0
      ? portfolio.recommendations
      : ['No specific recommendations at this time.']

    let recY = colY + 0.65
    recs.slice(0, 6).forEach((rec, i) => {
      // Number badge
      slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
        x: 7.1, y: recY, w: 0.28, h: 0.28,
        fill: { color: C.terracotta },
        line: { color: C.terracotta },
      })
      slide.addText(String(i + 1), {
        x: 7.1, y: recY, w: 0.28, h: 0.28,
        fontSize: 9,
        bold: true,
        color: C.cream,
        fontFace: 'Arial',
        align: 'center',
        valign: 'middle',
      })

      // Rec text
      slide.addText(rec, {
        x: 7.5, y: recY, w: 5.2, h: 0.65,
        fontSize: 10,
        color: C.warmBrown,
        fontFace: 'Arial',
        valign: 'top',
        wrap: true,
      })
      recY += 0.75
    })

    slide.addText(`Generated by PropertyBrief · ${portfolio.reportDate}`, {
      x: 0.5, y: H - 0.35, w: W - 1, h: 0.28,
      fontSize: 7.5,
      color: C.textSecondary,
      fontFace: 'Arial',
    })
  }

  // ── Slide 4: Property Table ──────────────────────────────────────────────────
  {
    const slide = pptx.addSlide()

    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: H,
      fill: { color: C.white },
      line: { color: C.white },
    })

    // Header
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: 1.0,
      fill: { color: C.warmBrown },
      line: { color: C.warmBrown },
    })

    slide.addText('PROPERTYBRIEF', {
      x: 0.5, y: 0.12, w: 4, h: 0.3,
      fontSize: 9,
      bold: true,
      color: C.muted,
      fontFace: 'Arial',
    })

    slide.addText('Property Table', {
      x: 0.5, y: 0.42, w: 8, h: 0.5,
      fontSize: 24,
      color: C.cream,
      fontFace: 'Georgia',
    })

    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 1.0, w: W, h: 0.06,
      fill: { color: C.terracotta },
      line: { color: C.terracotta },
    })

    // Table using addTable
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableRows: any[][] = []

    // Header row
    tableRows.push([
      { text: 'ADDRESS', options: { bold: true, fontSize: 8, color: C.textSecondary, fontFace: 'Arial', fill: { color: C.stoneBg }, align: 'left' } },
      { text: 'TYPE', options: { bold: true, fontSize: 8, color: C.textSecondary, fontFace: 'Arial', fill: { color: C.stoneBg }, align: 'left' } },
      { text: 'VALUE', options: { bold: true, fontSize: 8, color: C.textSecondary, fontFace: 'Arial', fill: { color: C.stoneBg }, align: 'right' } },
      { text: 'GROSS YIELD', options: { bold: true, fontSize: 8, color: C.textSecondary, fontFace: 'Arial', fill: { color: C.stoneBg }, align: 'right' } },
      { text: 'NET YIELD', options: { bold: true, fontSize: 8, color: C.textSecondary, fontFace: 'Arial', fill: { color: C.stoneBg }, align: 'right' } },
      { text: 'CAP GROWTH', options: { bold: true, fontSize: 8, color: C.textSecondary, fontFace: 'Arial', fill: { color: C.stoneBg }, align: 'right' } },
      { text: 'STATUS', options: { bold: true, fontSize: 8, color: C.textSecondary, fontFace: 'Arial', fill: { color: C.stoneBg }, align: 'center' } },
    ])

    // Data rows (max 14 to fit slide)
    properties.slice(0, 14).forEach((prop: Property) => {
      const rowFill = prop.isUnderperforming ? 'FFF5F3' : C.white
      const grossYieldColor = yieldColor(prop.grossYield)
      const netYieldColor = yieldColor(prop.netYield)
      const capGrowthColor = prop.capitalGrowth !== null
        ? (prop.capitalGrowth >= 0 ? C.sageGreen : C.mutedRed)
        : C.textSecondary

      const addrShort = prop.address.length > 35 ? prop.address.substring(0, 33) + '…' : prop.address
      const statusText = prop.tenancyStatus === 'let' ? 'Let'
        : prop.tenancyStatus === 'vacant' ? 'Vacant'
        : prop.tenancyStatus === 'under-offer' ? 'Under Offer'
        : 'For Sale'

      tableRows.push([
        { text: addrShort, options: { fontSize: 8.5, color: C.warmBrown, fontFace: 'Arial', fill: { color: rowFill }, align: 'left' } },
        { text: prop.propertyType, options: { fontSize: 8, color: C.textSecondary, fontFace: 'Arial', fill: { color: rowFill }, align: 'left' } },
        { text: prop.currentValue ? formatGBP(prop.currentValue) : '—', options: { fontSize: 8.5, color: C.warmBrown, fontFace: 'Arial', fill: { color: rowFill }, align: 'right' } },
        { text: formatPct(prop.grossYield), options: { fontSize: 8.5, bold: true, color: grossYieldColor, fontFace: 'Arial', fill: { color: rowFill }, align: 'right' } },
        { text: formatPct(prop.netYield), options: { fontSize: 8.5, color: netYieldColor, fontFace: 'Arial', fill: { color: rowFill }, align: 'right' } },
        { text: prop.capitalGrowth !== null ? (prop.capitalGrowth >= 0 ? '+' : '') + formatPct(prop.capitalGrowth) : '—', options: { fontSize: 8.5, color: capGrowthColor, fontFace: 'Arial', fill: { color: rowFill }, align: 'right' } },
        { text: statusText, options: { fontSize: 8, color: C.warmBrown, fontFace: 'Arial', fill: { color: rowFill }, align: 'center' } },
      ])
    })

    slide.addTable(tableRows, {
      x: 0.4, y: 1.25,
      w: W - 0.8,
      rowH: 0.34,
      border: { type: 'solid', color: C.muted, pt: 0.5 },
      colW: [3.8, 1.2, 1.2, 1.2, 1.2, 1.2, 1.1],
    })

    if (properties.length > 14) {
      slide.addText(`+ ${properties.length - 14} more properties — see full PDF report`, {
        x: 0.5, y: H - 0.55, w: W - 1, h: 0.28,
        fontSize: 8.5,
        color: C.terracotta,
        fontFace: 'Arial',
        italic: true,
      })
    }

    slide.addText(`Generated by PropertyBrief · ${portfolio.reportDate}`, {
      x: 0.5, y: H - 0.3, w: W - 1, h: 0.25,
      fontSize: 7.5,
      color: C.textSecondary,
      fontFace: 'Arial',
    })
  }

  // ── Slide 5: Underperformers ─────────────────────────────────────────────────
  {
    const slide = pptx.addSlide()
    const underperformers = properties.filter((p: Property) => p.isUnderperforming)

    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: H,
      fill: { color: C.white },
      line: { color: C.white },
    })

    // Header
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: 1.0,
      fill: { color: C.warmBrown },
      line: { color: C.warmBrown },
    })

    slide.addText('PROPERTYBRIEF', {
      x: 0.5, y: 0.12, w: 4, h: 0.3,
      fontSize: 9,
      bold: true,
      color: C.muted,
      fontFace: 'Arial',
    })

    slide.addText('Underperformers', {
      x: 0.5, y: 0.42, w: 8, h: 0.5,
      fontSize: 24,
      color: C.cream,
      fontFace: 'Georgia',
    })

    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 1.0, w: W, h: 0.06,
      fill: { color: C.mutedRed },
      line: { color: C.mutedRed },
    })

    if (underperformers.length === 0) {
      slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
        x: 2.5, y: 2.5, w: 8.3, h: 1.5,
        fill: { color: 'E8F2EA' },
        line: { color: C.sageGreen, pt: 1 },
      })
      slide.addText('No underperforming properties detected', {
        x: 2.5, y: 2.7, w: 8.3, h: 0.6,
        fontSize: 18,
        color: C.sageGreen,
        fontFace: 'Georgia',
        align: 'center',
      })
      slide.addText('All properties are meeting or exceeding performance targets', {
        x: 2.5, y: 3.3, w: 8.3, h: 0.4,
        fontSize: 11,
        color: C.textSecondary,
        fontFace: 'Arial',
        align: 'center',
      })
    } else {
      let uy = 1.35
      const colWidth = (W - 1.0) / 2

      underperformers.slice(0, 8).forEach((prop: Property, i: number) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        const ux = 0.5 + col * (colWidth + 0.1)
        const cardY = uy + row * 1.55

        slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
          x: ux, y: cardY, w: colWidth, h: 1.4,
          fill: { color: 'FFF8F6' },
          line: { color: C.mutedRed, pt: 1 },
        })

        // Red left accent
        slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
          x: ux, y: cardY, w: 0.08, h: 1.4,
          fill: { color: C.mutedRed },
          line: { color: C.mutedRed },
        })

        slide.addText(prop.address, {
          x: ux + 0.2, y: cardY + 0.12, w: colWidth - 0.4, h: 0.35,
          fontSize: 10,
          bold: true,
          color: C.warmBrown,
          fontFace: 'Arial',
        })

        slide.addText(`${prop.propertyType.toUpperCase()} · Gross: ${formatPct(prop.grossYield)} · Net: ${formatPct(prop.netYield)}`, {
          x: ux + 0.2, y: cardY + 0.5, w: colWidth - 0.4, h: 0.28,
          fontSize: 8.5,
          color: C.textSecondary,
          fontFace: 'Arial',
        })

        const issue = prop.grossYield < 4
          ? 'Low yield — review rent pricing or consider selling'
          : prop.tenancyStatus === 'vacant'
          ? 'Property is currently vacant — urgent: find tenants or reassess'
          : prop.netYield < 2
          ? 'High running costs eroding net yield — review expenses'
          : 'Underperforming vs portfolio average — strategic review needed'

        slide.addText(issue, {
          x: ux + 0.2, y: cardY + 0.82, w: colWidth - 0.4, h: 0.45,
          fontSize: 8.5,
          color: C.mutedRed,
          fontFace: 'Arial',
          italic: true,
          wrap: true,
        })
      })
    }

    slide.addText(`Generated by PropertyBrief · ${portfolio.reportDate}`, {
      x: 0.5, y: H - 0.3, w: W - 1, h: 0.25,
      fontSize: 7.5,
      color: C.textSecondary,
      fontFace: 'Arial',
    })
  }

  // ── Slide 6: Action Plan ─────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide()

    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: H,
      fill: { color: C.stoneBg },
      line: { color: C.stoneBg },
    })

    // Header
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 0, w: W, h: 1.0,
      fill: { color: C.warmBrown },
      line: { color: C.warmBrown },
    })

    slide.addText('PROPERTYBRIEF', {
      x: 0.5, y: 0.12, w: 4, h: 0.3,
      fontSize: 9,
      bold: true,
      color: C.muted,
      fontFace: 'Arial',
    })

    slide.addText('Action Plan', {
      x: 0.5, y: 0.42, w: 8, h: 0.5,
      fontSize: 24,
      color: C.cream,
      fontFace: 'Georgia',
    })

    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: 1.0, w: W, h: 0.06,
      fill: { color: C.terracotta },
      line: { color: C.terracotta },
    })

    // Three priority columns: Immediate / 30-Day / 60-Day
    const cols = ['Immediate Actions', '30-Day Actions', '60-Day Actions']
    const recs = portfolio.recommendations

    // Distribute recommendations across columns
    const immediate = recs.slice(0, Math.ceil(recs.length / 3))
    const thirty = recs.slice(Math.ceil(recs.length / 3), Math.ceil(recs.length * 2 / 3))
    const sixty = recs.slice(Math.ceil(recs.length * 2 / 3))

    const colGroups = [immediate, thirty, sixty]
    const colColors = [C.mutedRed, C.warmAmber, C.sageGreen]
    const colLightColors = ['FFF5F3', 'FFFBF2', 'F0F7F2']

    const cW = 3.8
    const cH = 5.4
    const cY2 = 1.3

    cols.forEach((colTitle, ci) => {
      const cx = 0.4 + ci * (cW + 0.27)

      slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
        x: cx, y: cY2, w: cW, h: cH,
        fill: { color: C.white },
        line: { color: C.muted, pt: 1 },
      })

      // Colored top bar
      slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
        x: cx, y: cY2, w: cW, h: 0.42,
        fill: { color: colColors[ci] },
        line: { color: colColors[ci] },
      })

      slide.addText(colTitle, {
        x: cx + 0.15, y: cY2 + 0.05, w: cW - 0.3, h: 0.32,
        fontSize: 11,
        bold: true,
        color: C.white,
        fontFace: 'Arial',
      })

      const items = colGroups[ci]
      if (items.length === 0) {
        slide.addText('No immediate actions required', {
          x: cx + 0.2, y: cY2 + 0.65, w: cW - 0.4, h: 0.5,
          fontSize: 10,
          color: C.textSecondary,
          fontFace: 'Arial',
          italic: true,
        })
      } else {
        let itemY = cY2 + 0.6
        items.forEach((item, ii) => {
          slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
            x: cx + 0.15, y: itemY, w: cW - 0.3, h: 0.85,
            fill: { color: colLightColors[ci] },
            line: { color: 'E8E0D8', pt: 0.5 },
          })

          // Step number
          slide.addText(String(ii + 1), {
            x: cx + 0.2, y: itemY + 0.1, w: 0.3, h: 0.3,
            fontSize: 10,
            bold: true,
            color: colColors[ci],
            fontFace: 'Georgia',
          })

          slide.addText(item, {
            x: cx + 0.55, y: itemY + 0.05, w: cW - 0.8, h: 0.75,
            fontSize: 9.5,
            color: C.warmBrown,
            fontFace: 'Arial',
            valign: 'top',
            wrap: true,
          })

          itemY += 0.95
        })
      }
    })

    // Footer branding
    slide.addShape(pptx.ShapeType?.rect ?? 'rect', {
      x: 0, y: H - 0.5, w: W, h: 0.5,
      fill: { color: C.warmBrown },
      line: { color: C.warmBrown },
    })

    slide.addText('PropertyBrief  ·  propertybrief.co.uk', {
      x: 0.5, y: H - 0.42, w: 6, h: 0.32,
      fontSize: 9,
      color: C.muted,
      fontFace: 'Arial',
    })

    slide.addText(portfolio.reportDate, {
      x: W - 3, y: H - 0.42, w: 2.7, h: 0.32,
      fontSize: 9,
      color: C.muted,
      fontFace: 'Arial',
      align: 'right',
    })
  }

  // Write to ArrayBuffer then Blob
  const buffer = await pptx.write({ outputType: 'arraybuffer' }) as ArrayBuffer
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  })
}
