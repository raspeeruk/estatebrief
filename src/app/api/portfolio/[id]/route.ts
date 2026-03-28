import { NextRequest } from 'next/server'
import { getPortfolio, setPortfolio } from '@/lib/portfolio-store'
import { createClient } from '@/lib/supabase/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const portfolio = await getPortfolio(id)
  if (!portfolio) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
  }
  return new Response(JSON.stringify(portfolio), { headers: { 'Content-Type': 'application/json' } })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const portfolio = await req.json()
  portfolio.id = id
  await setPortfolio(portfolio, user?.id)

  return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
}
