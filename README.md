# UC3 — Agentic Compliance Delivery Blueprint

**From the validated Backup and Restore use case to Compliance as a Service**

An interactive consulting dashboard presenting the 18-month implementation roadmap for UC3: Agentic Compliance — October 2026 to March 2028.

---

## Purpose

This dashboard communicates the delivery blueprint for UC3 to senior stakeholders. It covers the three-phase programme (Integrate / Orchestrate / Industrialise), seven workstreams, twelve core deliverables, team model, delivery governance, and value measurement framework.

All figures are directional working assumptions based on the validated Backup and Restore use case. They are not commitments.

---

## Local preview

No build step required. Serve from the repo root:

```bash
npx serve .
# or
python -m http.server 8080
```

Open `http://localhost:8080` (or the port shown). You will see the gate page. Enter the access code configured by the owner.

---

## Setting the access code

The gate page uses SHA-256 hash comparison. The hash must be set before deployment. Replace `REPLACE_WITH_SHA256_HEX` in `index.html` with the hash of your chosen code:

```bash
node -e "const c=require('crypto');console.log(c.createHash('sha256').update('your-code-here').digest('hex'))"
```

Copy the output hex string into `index.html`:

```js
var ACCESS_HASH = 'paste-hex-here';
```

Never commit the plaintext code.

---

## Content verification

```bash
npm run verify
```

This runs a content audit (em dashes, forbidden values, placeholder tokens) and data integrity tests (cross-references, date ranges, content safeguards). It must exit 0 before any commit.

---

## Editing content

All business data lives in `data/*.js`. Each file uses `var NAME = [...]` declarations (not ES modules). Edit the relevant file and re-run `npm run verify`.

| File | Contains |
|---|---|
| `data/phases.js` | Phase objectives, gate criteria, monthly work packages |
| `data/workstreams.js` | 7 workstreams with purpose and lead |
| `data/deliverables.js` | 12 core deliverables D01-D12 with definition of done |
| `data/roles.js` | 29 roles across 6 pods, FTE by phase |
| `data/milestones.js` | 18 milestones including 3 gate reviews |
| `data/governance.js` | 6 governance forums, 5 decisions, 8 RAID entries |
| `data/kpis.js` | 5 KPI groups x 3 KPIs |
| `data/addons.js` | 10 optional add-ons A-J |

---

## GitHub Pages deployment

The repository is served via GitHub Actions. Push to `main` to trigger deployment. The workflow file is at `.github/workflows/deploy.yml`.

---

## Key assumptions

- **Start date**: October 2026, subject to sponsor and funding approval before September 2026.
- **13.8% effort reduction**: Directional working assumption derived from the validated Backup and Restore use case. It is scoped to affected use-case activities, not enterprise headcount. To be validated through real-case execution in Phase 1.
- **Staffing figures**: Illustrative. Phase-level FTE indicatives only. Actual resourcing will be confirmed at each gate review.
- **First vertical**: Backup and Restore. The platform is designed to extend to further verticals from Phase 2 onwards, subject to Gate 2 approval.
- **Three hubs**: Compliance Hub (OMA), Product Hub, Reporting Hub (DDCR). Existing foundation, not greenfield build.

---

## Conventions

- British English throughout
- No em dashes or en dashes (use hyphens, colons or semicolons)
- All deliverable statuses remain `proposed` until Gate 1 confirmation
- Staffing always labelled Illustrative
