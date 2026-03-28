export interface ParsedCSV {
  headers: string[]
  rows: string[][]
  totalRows: number
  preview: string[][] // first 5 rows
}
