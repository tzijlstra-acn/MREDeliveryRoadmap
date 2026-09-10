# Technical Decisions — MRE Agentic Compliance Delivery Roadmap

---

## Stack decision: Vanilla HTML/JS retained

**Decision:** Keep the existing zero-dependency vanilla HTML/JS + Tabler Icons CDN stack.

**Rationale:**
- AIDataProcessing reference (the design benchmark) is 9,755 lines of zero-dependency HTML. It delivers the required quality level.
- GitHub Pages requires no build step. Adding React/TypeScript would require introducing a CI build pipeline, breaking the current deploy.yml pattern.
- Tabler Icons webfont (CDN) is the only external dependency. This is acceptable and already in use.
- The Gantt, drawers, tabs, accordions and tables in the existing dashboard are all functional in vanilla JS. The new features (regulation register, Presenter Mode, two-track Gantt) are buildable with the same approach.

**Not using:**
- React, Vue, Svelte - require bundler
- TypeScript - requires compiler
- Any npm package at runtime - incompatible with zero-build GitHub Pages deployment

---

## Referenced repository assessments

### RoadmapSnap (github.com/moises-prat-epm/RoadmapSnap)

**Use case fit:** Configuration-driven roadmap data model, milestone diamonds, dependency visibility, executive timeline structure.
**Decision:** Use as a pattern reference only. Adopt the idea of stable IDs, typed relationships and wave-based sequencing in the data files. Do not clone its visual design.
**Why not adopt directly:** Not designed as a consulting delivery asset. Requires React.

### SVAR React Gantt (github.com/svar-widgets/react-gantt)

**Use case fit:** Advanced Gantt with drag, dependencies, resource view.
**Decision:** Reject.
**Why:** React-only. Incompatible with zero-build GitHub Pages. The 18-month executive Gantt does not need drag-and-drop or resource levelling. A custom CSS Grid Gantt provides better accessibility, print behaviour and branding control at lower complexity.

### Konva Timeline (github.com/melfore/konva-timeline)

**Use case fit:** Canvas-based timeline with zoom and pan.
**Decision:** Reject.
**Why:** Canvas-based, heavy, poor accessibility, no print support, incompatible stack. Overkill for a bounded 18-month executive roadmap.

### TanStack Table (github.com/TanStack/table)

**Use case fit:** Sortable, filterable, groupable table with row expansion - ideal for the 24-regulation register.
**Decision:** Reject at runtime. Adopt concepts in vanilla JS implementation.
**Why not adopt directly:** Requires React or another framework adapter. Without a bundler, it cannot be used via CDN in a straightforward way.
**How to reuse concepts:** Implement column sorting (click th to toggle asc/desc), row filtering (select dropdowns), row expansion (click to open drawer), and column visibility (toggle button) in ~150 lines of vanilla JS.

### React Flow (github.com/xyflow/xyflow)

**Use case fit:** Interactive node-based diagrams for obligation-chain relationships, dependency maps, hub-to-hub flows.
**Decision:** Reject for main dashboard. Consider for optional obligation-chain SVG diagram if time and scope allow.
**Why:** React-only. The hub-to-hub flow can be represented as a static CSS flex diagram on the Executive page without an interactive canvas.

### shadcn/ui (github.com/shadcn-ui/ui)

**Use case fit:** Accessible component primitives for drawers, dialogs, tabs, tooltips, accordions.
**Decision:** Reject. Reuse its accessibility patterns (ARIA roles, keyboard navigation, focus management) in vanilla HTML.
**Why not adopt:** Requires React. The existing dashboard already implements drawers, tabs and accordions in vanilla JS with acceptable accessibility.

### Recharts (github.com/recharts/recharts)

**Use case fit:** Portfolio funnel, coverage trend, readiness distribution, staffing ramp charts.
**Decision:** Reject. Implement portfolio visualisations as vanilla CSS/SVG div bars.
**Why:** React-only. Simple percentage bars and funnel counts can be rendered as `div` elements with `width` set from data. A table communicates the regulation register better than a donut chart.

### Roadmapped (github.com/5e1y/roadmapped)

**Use case fit:** Internal task tracking and roadmap planning.
**Decision:** Internal reference only. Not exposed in the client-facing dashboard.

---

## Gantt implementation decision

**Decision:** CSS Grid, extended to two tracks.

Track A: 8 workstream rows, bars positioned with `grid-column: startMonth / endMonth`.
Track B: 3 regulation wave rows, styled with dashed border for Wave 2 and Wave 3 placeholders.
Gate row: G0-G4 diamonds at correct column positions.
North Star row: outline/dashed bar extending to column 22 (beyond Month 18).

This matches the AIDataProcessing Gantt pattern exactly and provides:
- Full accessibility (table-based fallback or ARIA grid)
- Print support (no canvas)
- No horizontal overflow on non-Gantt sections
- Phase-colour branding without external styling dependency

---

## 24-regulation register implementation

**Decision:** Vanilla JS sortable/filterable table with drawer expansion.

Implementation approach:
- Table rendered from `REGULATIONS` array via `renderPortfolio()`
- Column header click toggles sort state (asc/desc) stored in JS variable
- Filter dropdowns (Status, Wave, Domain) filter the array before render
- Row click opens the existing right-side drawer with regulation detail
- REG-01 (DORA) renders with a blue "Reference scenario" badge
- REG-02 through REG-24 render with amber "Name to confirm" badges

Approximately 150 lines of JS for full sort/filter/render logic.

---

## Presenter Mode implementation

**Decision:** CSS full-screen overlay with 6 slide divs.

- `#presenter-overlay` hidden by default (`display:none`)
- Triggered by "Present" button in topbar
- Each `.slide` is `position:absolute;inset:0;display:flex;flex-direction:column`
- Slide navigation: Prev/Next buttons, keyboard arrow keys, Escape to exit
- Content rendered from same data as main dashboard (no separate content)
- Print: presenter overlay hidden in `@media print`

---

## Data file conventions

All data files use `var NAME = [...]` (not ES modules). Loaded via `<script src="data/file.js">` in app.html before the inline JS block. This pattern is required for GitHub Pages CORS compatibility.

New files follow the same pattern:
- `data/regulations.js` → `var REGULATIONS = [...]`
- `data/waves.js` → `var WAVES = [...]`
