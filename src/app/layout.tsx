import type { Metadata } from 'next'
import { Gloock, Bricolage_Grotesque, Spectral } from 'next/font/google'
import './globals.css'

const gloock = Gloock({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
})

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '600'],
})

const spectral = Spectral({
  subsets: ['latin'],
  variable: '--font-figures',
  display: 'swap',
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  title: 'PropertyBrief — Portfolio reports that look like Savills made them',
  description: 'Upload your property portfolio CSV. AI calculates yield, capital growth, flags underperformers. Get an investor-ready PDF report in minutes.',
  openGraph: {
    title: 'PropertyBrief — Portfolio reports that look like Savills made them',
    description: 'Upload your property portfolio CSV. AI calculates yield, capital growth, flags underperformers. Get an investor-ready PDF report in minutes.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${gloock.variable} ${bricolageGrotesque.variable} ${spectral.variable}`}>
      <body className="min-h-screen bg-[var(--color-stone-bg)] text-[var(--color-ink)] antialiased">
        {children}
      </body>
    </html>
  )
}
