# OrgBrief — Next Actions

## Done This Session
- [x] PDF export (jspdf) — cover, chart, stats, people table
- [x] PowerPoint export (pptxgenjs) — title, chart, departments, metrics
- [x] Chart capture via html-to-image (2x retina)
- [x] forwardRef on OrgChart for DOM capture
- [x] Export page: chart preview + real download handlers
- [x] Pushed to GitHub → Netlify auto-deploy

## Next Up

### High Priority
- [ ] **Shareable link** — export page still has a stubbed "Generate shareable link" button. Needs: generate a `shareId`, store it, make `/share/[shareId]` work. Session store is in-memory so share links won't survive a redeploy — either persist to file/DB or accept ephemeral links for v1.
- [ ] **Remove dead API routes** — `api/export/pdf/route.ts` and `api/export/html/route.ts` return 501 and are unused now that export is client-side. Delete them.
- [ ] **Commit demo CSV** — `public/demo-messy-corp.csv` is untracked. Decide if it ships as a demo file or stays local.

### Medium Priority
- [ ] **Session persistence** — sessions are in-memory (`Map`). Every Netlify deploy or serverless cold start wipes them. Options: Supabase, or lean into files-first with JSON on disk (but Netlify is serverless so disk won't persist either). Supabase is probably needed here since users write data.
- [ ] **Domain & GSC** — no custom domain set up yet. Need to pick a domain, point DNS, verify in GSC, submit sitemap.
- [ ] **GA4** — no analytics tracking. Add measurement ID.
- [ ] **Error handling on large charts** — html-to-image can choke on very large DOMs (500+ nodes). May need to chunk or use a different capture strategy.

### Low Priority
- [ ] **HTML export** — could generate a standalone HTML file with embedded styles for email/intranet sharing.
- [ ] **Logo upload** — `ExportSettings` has a `clientLogo` field but the UI doesn't expose it. Add drag-drop logo that appears on cover page.
- [ ] **Custom colors** — `ExportSettings` has `primaryColor`/`accentColor` fields for branded-report template. Wire up color pickers.
- [ ] **Monetisation** — pricing page, Stripe checkout, free tier limits (e.g. 20 people free, unlimited paid).
