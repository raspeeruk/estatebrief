'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/app/settings', label: 'Account' },
  { href: '/app/settings/branding', label: 'Branding' },
  { href: '/app/settings/billing', label: 'Billing' },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-[#3D2B1F] mb-8">
        Settings
      </h1>

      <div className="flex items-center gap-1 mb-8 border-b border-[#DDD4C5]">
        {TABS.map(tab => {
          const active = tab.href === '/app/settings'
            ? pathname === '/app/settings'
            : pathname.startsWith(tab.href)

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                active
                  ? 'border-[#7C5C3A] text-[#7C5C3A]'
                  : 'border-transparent text-[#7A6A5A] hover:text-[#3D2B1F]'
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>

      {children}
    </div>
  )
}
