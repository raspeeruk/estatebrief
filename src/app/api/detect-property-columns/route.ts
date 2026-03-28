import { NextRequest } from 'next/server'
import { autoDetectPropertyColumns } from '@/lib/engine/property-pipeline'

export async function POST(req: NextRequest) {
  try {
    const { headers } = await req.json() as { headers: string[] }
    const mapping = autoDetectPropertyColumns(headers)
    return new Response(JSON.stringify({ mapping }), { headers: { 'Content-Type': 'application/json' } })
  } catch {
    return new Response(JSON.stringify({ mapping: {} }), { headers: { 'Content-Type': 'application/json' } })
  }
}
