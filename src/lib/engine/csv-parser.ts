import Papa from 'papaparse'
import type { ParsedCSV } from '@/types'

export function parseCSV(csvContent: string): ParsedCSV {
  const result = Papa.parse(csvContent, {
    header: false,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim(),
  })

  const rows = result.data as string[][]
  if (rows.length === 0) {
    throw new Error('CSV file is empty')
  }

  const headers = rows[0].map(h => (h || '').trim())
  const dataRows = rows.slice(1).filter(row => row.some(cell => cell && cell.trim()))

  if (dataRows.length === 0) {
    throw new Error('CSV file has headers but no data rows')
  }

  return {
    headers,
    rows: dataRows,
    totalRows: dataRows.length,
    preview: dataRows.slice(0, 5),
  }
}

export function csvToRecords(parsed: ParsedCSV): Record<string, string>[] {
  return parsed.rows.map(row => {
    const record: Record<string, string> = {}
    parsed.headers.forEach((header, i) => {
      record[header] = (row[i] || '').trim()
    })
    return record
  })
}
