const enquiryHref =
  'mailto:propertybrief@rogergroup.xyz?subject=EstateBrief.com%20acquisition%20enquiry'

export default function HomePage() {
  return (
    <main>
      <div className="page-shell">
        <header className="masthead">
          <a className="wordmark" href="/" aria-label="EstateBrief.com home">
            EstateBrief<span>.com</span>
          </a>
          <p className="availability">
            <span className="availability-mark" aria-hidden="true" />
            Available for acquisition
          </p>
        </header>

        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">Property intelligence, named clearly</p>
            <h1 id="page-title">
              A strong .com for a<br />
              <em>property product.</em>
            </h1>
            <p className="lead">
              EstateBrief.com is available for acquisition—a concise category
              name for portfolio reporting, landlord software, valuation
              workflows or property-data products.
            </p>
            <a className="enquiry" href={enquiryHref}>
              Make an acquisition enquiry
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <aside className="folio" aria-label="Domain summary">
            <div className="folio-tab">Acquisition brief</div>
            <p className="folio-kicker">EstateBrief.com</p>
            <div className="folio-rule" />
            <dl>
              <div>
                <dt>Asset</dt>
                <dd>Registered .com domain</dd>
              </div>
              <div>
                <dt>Registered until</dt>
                <dd>28 March 2027</dd>
              </div>
              <div>
                <dt>Current use</dt>
                <dd>Acquisition enquiries only</dd>
              </div>
              <div>
                <dt>Asking price</dt>
                <dd>By direct discussion</dd>
              </div>
            </dl>
            <p className="folio-note">No accounts, uploads or payments are accepted.</p>
          </aside>
        </section>

        <section className="ledger" aria-label="Acquisition scope">
          <article>
            <p className="number">01</p>
            <h2>The domain</h2>
            <p>
              The name is direct, memorable and flexible enough for software,
              research, reporting or advisory work across the property sector.
            </p>
          </article>
          <article>
            <p className="number">02</p>
            <h2>The option</h2>
            <p>
              Enquiries are invited for the domain. Existing source code may be
              discussed separately, subject to technical review and an express
              written agreement.
            </p>
          </article>
          <article>
            <p className="number">03</p>
            <h2>The boundary</h2>
            <p>
              Customer, account, upload, mailing-list, payment and analytics
              data are not included in any sale. Only specifically agreed
              assets transfer.
            </p>
          </article>
        </section>

        <footer>
          <p>Former PropertyBrief product retired 28 August 2026</p>
          <a href={enquiryHref}>propertybrief@rogergroup.xyz</a>
        </footer>
      </div>
    </main>
  )
}
