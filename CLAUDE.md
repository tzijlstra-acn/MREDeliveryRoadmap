# UC3 Agentic Compliance Delivery Blueprint — CLAUDE.md

## Commands

```bash
npm run verify          # content audit + data integrity (must pass before any commit)
npm run audit:content   # content audit only
npm run test            # data integrity tests only
```

No build step. Serve locally with `npx serve .` or `python -m http.server 8080` from the repo root.

## Architecture

Static site, GitHub Pages compatible. No build toolchain, no ES modules in data files.

```
UC3AgentCompliance/
  index.html            Gate page (SHA-256 hash auth, dark purple canvas)
  app.html              Main dashboard (single-file, all CSS and JS inline)
  data/
    phases.js           var PHASES = [...] — 4 objects (as-is + 3 delivery phases)
    workstreams.js      var WORKSTREAMS = [...] — 7 objects
    deliverables.js     var DELIVERABLES = [...] — 12 objects D01-D12
    roles.js            var ROLES = [...] + var PODS = [...] — 29 roles, 6 pods
    milestones.js       var MILESTONES = [...] — 18 objects
    governance.js       var GOVERNANCE_FORUMS + DECISIONS + RISKS
    kpis.js             var KPIS = [...] — 5 groups x 3 KPIs
    addons.js           var ADDONS = [...] — 10 add-on objects A-J
  scripts/
    content-audit.mjs   Scans .html/.js/.md for forbidden chars and values
    data-integrity.mjs  Cross-reference and content safeguard assertions
```

## Data file pattern

All data files use `var NAME = [...]` (not ES modules). Loaded in app.html via `<script src="data/file.js">` before the inline JS block. Do not convert to `import` or `export`.

## Auth gate

`index.html`: compares SHA-256 hash of entered code against `ACCESS_HASH` constant. Set the hash before deployment:

```bash
node -e "const c=require('crypto');console.log(c.createHash('sha256').update('yourcode').digest('hex'))"
```

`app.html` line 2 guard: `if(!sessionStorage.getItem('uc3_auth')){location.replace('index.html');}` — keep this as the first script tag in `<head>`.

## Sections (app.html)

| ID | Nav label |
|---|---|
| executive | Executive View |
| roadmap | 18-Month Roadmap |
| workstreams | Workstreams |
| team | Team and Skills |
| control | Delivery Governance |
| scale | Value and Scale |

## Design tokens

```css
--purple: #A100FF      /* Accenture accent */
--blue-dark: #3456C5   /* Phase 1 */
--phase-1: #3456C5
--phase-2: #5C4FC5
--phase-3: #7A3EB1
--sidebar-bg: #160029
```

## Typography

- Space Grotesk: headings (Google Fonts CDN)
- Inter: body (Google Fonts CDN)
- Tabler Icons webfont: `https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css`

## British English

Use British spellings throughout: Industrialise, mobilise, organisation, recognise, programme, modelled.

## Forbidden values (enforced by npm run verify)

- `52 FTE` — do not use
- `3.0%` — do not use
- Enterprise-wide headcount reduction claims
- Invented financial savings or case volume figures
- `13.8%` must always be qualified as a directional working assumption

## Forbidden characters

- Em dash (U+2014) `—` — use a hyphen, colon or semicolon instead
- En dash (U+2013) `–` — use a hyphen instead
- Unicode minus sign (U+2212) `−` — use ASCII hyphen-minus `-`

## Staffing

Always label staffing data as "Illustrative". FTE figures are phase-level indicatives, not committed headcount.

## Phases

| ID | Label | Dates |
|---|---|---|
| phase-1 | Integrate | Oct 2026 - Mar 2027 |
| phase-2 | Orchestrate | Apr 2027 - Sep 2027 |
| phase-3 | Industrialise | Oct 2027 - Mar 2028 |

## Deliverables

D01-D12 are the 12 core deliverables. All start with `status: 'proposed'`. Do not change status to 'committed' or 'completed' in data files.

## GitHub Pages

Paths in app.html must be relative (`src="data/phases.js"` not `/data/phases.js`). The deploy workflow uploads the entire repo root. Do not add a base tag.
