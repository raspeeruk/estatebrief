import type { Metadata } from 'next'
import { Bricolage_Grotesque, Gloock, Spectral } from 'next/font/google'
import './globals.css'

const display = Gloock({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: '400',
})

const sans = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const figures = Spectral({
  subsets: ['latin'],
  variable: '--font-figures',
  display: 'swap',
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://estatebrief.com'),
  title: 'EstateBrief.com — Domain available for acquisition',
  description:
    'EstateBrief.com is available for acquisition: a concise .com for property reporting, landlord software, valuation workflows or property data.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'EstateBrief.com — Domain available for acquisition',
    description:
      'A concise .com for property reporting, landlord software, valuation workflows or property data.',
    url: '/',
    siteName: 'EstateBrief.com',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${figures.variable}`}>
      <body>{children}</body>
    </html>
  )
}
