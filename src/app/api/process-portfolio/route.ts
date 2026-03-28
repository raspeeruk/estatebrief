import { NextRequest } from 'next/server'
import { runPropertyPipeline } from '@/lib/engine/property-pipeline'
import { setPortfolio } from '@/lib/portfolio-store'
import { createClient } from '@/lib/supabase/server'
import type { PropertyColumnMapping } from '@/lib/engine/property-pipeline'

export async function POST(req: NextRequest) {
  try {
    const { csvContent, columnMapping, ownerName } = await req.json() as {
      csvContent: string
      columnMapping: Partial<PropertyColumnMapping>
      ownerName: string
    }

    if (!csvContent || !columnMapping) {
      return new Response(
        JSON.stringify({ error: 'csvContent and columnMapping required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get current user (optional — demo mode if no auth)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        const send = (data: Record<string, unknown>) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        }

        try {
          const portfolio = await runPropertyPipeline(
            csvContent,
            columnMapping as PropertyColumnMapping,
            ownerName || 'My Portfolio',
            (progress) => {
              send({ type: 'progress', ...progress })
            }
          )

          await setPortfolio(portfolio, user?.id)

          send({ type: 'progress', step: 'Complete', progress: 100 })
          send({ type: 'complete', portfolioId: portfolio.id })
        } catch (error) {
          send({ type: 'error', error: error instanceof Error ? error.message : 'Processing failed' })
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Processing failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
