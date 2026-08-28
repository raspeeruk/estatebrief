import { NextRequest, NextResponse } from 'next/server'

const publicPaths = new Set(['/', '/robots.txt', '/sitemap.xml', '/favicon.ico'])

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (publicPaths.has(pathname) || pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  return new NextResponse(
    'The PropertyBrief product has been retired. EstateBrief.com is available for acquisition.\n',
    {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, follow',
      },
    },
  )
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
