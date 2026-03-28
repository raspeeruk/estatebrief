import { createClient } from '@/lib/supabase/server'
import type { PortfolioDTO } from '@/types'

// ────── PORTFOLIOS ──────

export async function getPortfolio(id: string): Promise<PortfolioDTO | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('portfolios')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) {
    return getDemoPortfolio(id)
  }

  return data.portfolio_data as PortfolioDTO
}

export async function setPortfolio(portfolio: PortfolioDTO, userId?: string): Promise<void> {
  if (!userId) {
    await setDemoPortfolio(portfolio.id, portfolio)
    return
  }

  const supabase = await createClient()
  await supabase.from('portfolios').upsert({
    id: portfolio.id,
    user_id: userId,
    owner_name: portfolio.ownerName,
    report_date: portfolio.reportDate,
    portfolio_data: portfolio,
    total_properties: portfolio.summary.totalProperties,
    total_value: portfolio.summary.totalPortfolioValue,
    average_gross_yield: portfolio.summary.averageGrossYield,
    updated_at: new Date().toISOString(),
  })
}

export async function deletePortfolio(id: string): Promise<void> {
  const supabase = await createClient()
  await supabase.from('portfolios').delete().eq('id', id)
}

export async function getUserPortfolios(userId: string): Promise<PortfolioDTO[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (!data) return []
  return data.map(d => d.portfolio_data as PortfolioDTO)
}

// ────── DEMO (anonymous, 2hr TTL) ──────

async function setDemoPortfolio(id: string, portfolio: PortfolioDTO): Promise<void> {
  const supabase = await createClient()
  await supabase.from('demo_sessions').upsert({
    id,
    data: portfolio,
    type: 'portfolio',
    expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  })
}

async function getDemoPortfolio(id: string): Promise<PortfolioDTO | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('demo_sessions')
    .select('*')
    .eq('id', id)
    .eq('type', 'portfolio')
    .gt('expires_at', new Date().toISOString())
    .single()

  if (!data) return null
  return data.data as PortfolioDTO
}
