import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | PropertyBrief',
  description: 'The terms that govern your use of PropertyBrief.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#3D2B1F] mb-2">{title}</h2>
      <div className="text-sm text-[#7A6A5A] leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F0EBE1] px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#3D2B1F]">PropertyBrief</Link>
        </div>
        <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg p-8 sm:p-10">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#3D2B1F] mb-1">Terms of Service</h1>
          <p className="text-xs text-[#7A6A5A] uppercase tracking-wide mb-8">Last updated: 4 July 2026</p>

          <Section title="The service">
            <p>
              PropertyBrief (estatebrief.com) turns the property portfolio data you upload into
              presentable reports. The service is provided by Two Cores Operations Ltd, registered in
              England and Wales. By creating an account or using the site you agree to these terms.
            </p>
          </Section>

          <Section title="Plans and billing">
            <p>
              The free plan covers up to 3 properties. Paid plans (Professional and Agency) unlock
              larger portfolios and additional features; current prices are shown at checkout and on
              the billing page. Subscriptions renew automatically until cancelled. You can cancel any
              time from the billing page and keep access until the end of the paid period. Payments
              are processed by Stripe.
            </p>
          </Section>

          <Section title="Your account">
            <p>
              Keep your sign-in credentials to yourself and let us know straight away if you think
              someone else has access. You are responsible for activity on your account. You must be
              at least 18 and able to enter a contract to use the service.
            </p>
          </Section>

          <Section title="Your data and our IP">
            <p>
              You keep all rights to the portfolio data you upload and the reports generated from it.
              You confirm you have the right to upload the data you provide. We keep all rights to the
              PropertyBrief software, design, and brand. We process your data as described in the{' '}
              <Link href="/privacy" className="text-[#7C5C3A] underline">privacy policy</Link>.
            </p>
          </Section>

          <Section title="Acceptable use">
            <p>
              Do not use the service to break the law, infringe anyone's rights, probe or disrupt our
              infrastructure, or resell access without our written agreement. We may suspend accounts
              that do.
            </p>
          </Section>

          <Section title="No advice">
            <p>
              Reports are generated from the data you provide and are for information only. They are
              not financial, legal, tax, or investment advice. Check figures before relying on them in
              any transaction.
            </p>
          </Section>

          <Section title="Liability">
            <p>
              We provide the service with reasonable skill and care, but it is offered as is and we do
              not guarantee it will be uninterrupted or error free. To the extent the law allows, our
              total liability to you in any 12 month period is capped at the fees you paid us in that
              period. Nothing in these terms limits liability that cannot be limited under English
              law.
            </p>
          </Section>

          <Section title="Ending the agreement">
            <p>
              You can close your account at any time. We may suspend or end accounts that breach these
              terms, and we will give notice where reasonable. On closure we delete your data as set
              out in the privacy policy.
            </p>
          </Section>

          <Section title="Changes and law">
            <p>
              We may update these terms; if a change is material we will notify account holders by
              email before it takes effect. These terms are governed by the law of England and Wales,
              and the courts of England and Wales have exclusive jurisdiction. Questions? Use the{' '}
              <Link href="/contact" className="text-[#7C5C3A] underline">contact page</Link>.
            </p>
          </Section>

          <div className="h-px bg-[#DDD4C5] my-8" />
          <div className="flex items-center justify-between text-sm text-[#7A6A5A]">
            <Link href="/" className="hover:text-[#3D2B1F] transition-colors">Home</Link>
            <Link href="/privacy" className="hover:text-[#3D2B1F] transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
