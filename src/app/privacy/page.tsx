import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | PropertyBrief',
  description: 'How PropertyBrief collects, uses, and protects your data.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#3D2B1F] mb-2">{title}</h2>
      <div className="text-sm text-[#7A6A5A] leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F0EBE1] px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#3D2B1F]">PropertyBrief</Link>
        </div>
        <div className="bg-[#FAF6F0] border border-[#DDD4C5] rounded-lg p-8 sm:p-10">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#3D2B1F] mb-1">Privacy Policy</h1>
          <p className="text-xs text-[#7A6A5A] uppercase tracking-wide mb-8">Last updated: 4 July 2026</p>

          <Section title="Who we are">
            <p>
              PropertyBrief (estatebrief.com) is operated by Two Cores Operations Ltd, registered in
              England and Wales. We are the data controller for the personal data described in this
              policy. You can reach us any time through the <Link href="/contact" className="text-[#7C5C3A] underline">contact page</Link>.
            </p>
          </Section>

          <Section title="What we collect">
            <p>
              <strong className="text-[#3D2B1F]">Account data.</strong> When you create an account we store your email
              address and authentication records so you can sign in.
            </p>
            <p>
              <strong className="text-[#3D2B1F]">Portfolio data.</strong> The property information you upload
              (addresses, rents, values, tenancy details, and similar) is stored so we can generate
              your reports. It is your data. We process it only to run the service for you and never
              sell it or use it to build products for anyone else.
            </p>
            <p>
              <strong className="text-[#3D2B1F]">Billing data.</strong> Payments are handled by Stripe. Your card details
              go directly to Stripe and never touch our servers. We keep a reference to your Stripe
              customer record and your subscription status.
            </p>
            <p>
              <strong className="text-[#3D2B1F]">Usage data.</strong> We use Google Analytics 4 to understand how the
              site is used (pages visited, approximate location, device type). This is aggregated and
              not used to identify you.
            </p>
            <p>
              <strong className="text-[#3D2B1F]">Messages and signups.</strong> If you use the contact form or join the
              newsletter, we store what you submit (handled by Netlify Forms) so we can reply and send
              you the newsletter you asked for.
            </p>
          </Section>

          <Section title="Why we process it">
            <p>
              We process account and portfolio data to perform our contract with you, billing data to
              take payment, and usage data under our legitimate interest in improving the product.
              Newsletter emails are sent only with your consent, and every email includes a way to
              unsubscribe.
            </p>
          </Section>

          <Section title="Third parties we rely on">
            <p>
              Supabase (authentication and database hosting), Stripe (payments), Netlify (hosting and
              form handling), and Google Analytics (usage statistics). Each processes data on our
              behalf under their own security and data processing terms. We do not sell personal data
              to anyone.
            </p>
          </Section>

          <Section title="Retention">
            <p>
              We keep your account and portfolio data while your account is active. If you delete your
              account, or ask us to, we delete your personal data within 30 days except where we must
              keep records for tax or accounting law. Contact form messages are kept only as long as
              needed to handle your enquiry.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Under UK GDPR you can ask for a copy of your data, ask us to correct it, ask us to delete
              it, or object to how we process it. Email us via the <Link href="/contact" className="text-[#7C5C3A] underline">contact page</Link> and
              we will respond within one month. You also have the right to complain to the ICO
              (ico.org.uk) if you think we have handled your data badly.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If we change this policy we will update this page and the date at the top. Material
              changes will be flagged to account holders by email.
            </p>
          </Section>

          <div className="h-px bg-[#DDD4C5] my-8" />
          <div className="flex items-center justify-between text-sm text-[#7A6A5A]">
            <Link href="/" className="hover:text-[#3D2B1F] transition-colors">Home</Link>
            <Link href="/terms" className="hover:text-[#3D2B1F] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
