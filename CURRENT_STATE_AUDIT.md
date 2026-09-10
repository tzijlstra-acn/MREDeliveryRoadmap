# Current State Audit — MRE Agentic Compliance Delivery Roadmap

**Audit date:** September 2026
**Live dashboard:** https://tzijlstra-acn.github.io/MREDeliveryRoadmap/
**Repository:** https://github.com/tzijlstra-acn/MREDeliveryRoadmap

---

## Executive audit questions

Can a first-time executive answer these within 30 seconds?

| Question | Current | Action |
|---|---|---|
| What is being proposed? | Partial - title visible but decision callout buried | Redesign Executive section as decision-led |
| Why is Backup & Restore shown? | Not clear - appears as the programme goal | Reframe as DORA reference scenario |
| What is the 24-regulation ambition? | Not shown at all | Add to Executive section and new Portfolio section |
| What is being built once and reused? | Not differentiated from B&R scope | Add proof-to-portfolio visual |
| What happens in the first six months? | Phase 1 shown in Gantt but not in executive view | Add first-viewport Phase 1 focus |
| What will exist after 18 months? | Claimed as CaaS v1 but relationship to 24 regs unclear | Clarify Month 18 outcome statement |
| Which decision is required now? | Amber chip exists but not in first viewport | Move decision callout above fold |
| Which people and skills are required? | Team section exists and is functional | Extend with onboarding squad model |
| What is already available today? | Foundation cards exist | Keep, make more prominent |
| What remains to be delivered? | Roadmap shows this | Improve with two-track view |

**Score: 4 of 10 questions answerable within 30 seconds**

---

## Section-by-section audit

### Executive section

**Current purpose:** Programme overview, KPI strip, maturity stages, hubs, decisions.
**What works:** Hub cards accurate, illustrative label present, 13.8% qualified.
**Issues:**
- Backup & Restore framed as the programme goal, not a reference scenario
- No reference to 24-regulation portfolio on landing page
- Decision callout not in first viewport at 1440px
- KPI strip uses six equal-weight cards without narrative hierarchy
- No proof-to-portfolio visual
- No maturity vs coverage matrix (single maturity arrow only)
- "We are here" label shows September 2026 which will age poorly

**Action:** Full redesign as decision-led first viewport with proof-to-portfolio visual and maturity x coverage matrix.

### Roadmap section

**Current purpose:** 18-month Gantt with 7 workstream bars and milestone row.
**What works:** Phase bands correct, month headers correct, Gantt bars clickable, milestone diamonds render.
**Issues:**
- Single track only - no regulation onboarding waves visible
- No Track B for regulation onboarding
- Only G1-G3 gates (missing G0 mobilisation gate and G4 scale decision gate)
- Work package drawer populated from phases.js workPackages - content is thin
- No North Star visual extension beyond March 2028
- Filter shows "All phases / Phase 1 / Phase 2 / Phase 3" but no wave or track filter

**Action:** Rebuild as two-track Gantt (capability build + regulation waves), add G0 and G4, add North Star row.

### Workstreams section (to become Capabilities)

**Current purpose:** Workstream accordion + deliverable register.
**What works:** Accordion functional, deliverable cards clickable, drawers open correctly.
**Issues:**
- Only 7 workstreams, WS-8 Evidence, Verification and Reporting is missing
- Only 12 deliverables (D01-D12), D13-D16 missing
- No existing vs net-new classification on deliverable cards
- No ownership matrix
- Section label "Workstreams" too narrow for 16-deliverable scope

**Action:** Rename to Capabilities, add WS-8, add D13-D16, add ownership matrix.

### Team section

**Current purpose:** FTE banner, pod grid, skill heatmap, role drawers.
**What works:** Pod cards functional, skill heatmap renders, role drawers open.
**Issues:**
- Core Capability Team only - no Regulation Onboarding Squad structure
- FTE ranges hardcoded ("14-18") not computed from data
- No phase shape table showing squad scaling across phases
- No team-to-deliverable ownership matrix

**Action:** Add squad model section, phase shape table, team-to-deliverable matrix.

### Control section (Execution Control)

**Current purpose:** Gate cards, governance forums, RAID register, decisions table.
**What works:** RAID table functional with category filter, decision log renders.
**Issues:**
- Only G1-G3 gates (missing G0 and G4)
- Only 6 governance forums (missing Regulation Wave Readiness Review)
- Only 8 RAID entries - thin for programme of this scale
- No 30/60/90-day view
- No environment or regulatory-content readiness panels

**Action:** Add G0 and G4, add wave readiness forum, expand RAID, add readiness panels.

### Scale section (Value and Scale)

**Current purpose:** 13.8% hero, KPI tabs, measurement table, add-ons.
**What works:** KPI tabs functional, add-on cards render, 13.8% correctly qualified.
**Issues:**
- No 4-dimension value equation (Effort x Speed x Quality x Coverage)
- No regulation-level value confidence model
- No wave economics table
- Add-ons not clearly labelled Core / Recommended / Optional

**Action:** Add value equation, regulation-level confidence model, wave economics table.

### Missing: Regulatory Portfolio section

**Current:** Does not exist.
**Required:**
- 24-regulation register with lifecycle status
- Portfolio overview strip
- Lifecycle funnel
- Wave view
- Readiness heatmap
- Definition of done panel

**Action:** Create entirely new section with new data file.

### Missing: Presenter Mode

**Current:** Does not exist.
**Required:** 6 full-screen executive slides from same data source.
**Action:** Add presenter overlay with 6 slides.

---

## Visual and design issues

| Issue | Severity | Action |
|---|---|---|
| Excessive purple in topbar and hero - dominates interface | Medium | Reduce to accent use, white/light backgrounds for most sections |
| Equal-weight KPI cards on Executive page lack narrative hierarchy | High | Replace with restrained scale ribbon + decision callout |
| Long text blocks in workstream accordions | Medium | Use structured bullets, reduce prose |
| Mobile layout overflows on Gantt section | Medium | Gantt already has overflow-x scroll - acceptable |
| Decision callout amber chip not visible without scrolling | High | Move to first viewport |
| Decorative canvas animation on gate page is fine, not distracting | Low | Keep |

---

## Content accuracy issues

| Issue | Severity | Correct treatment |
|---|---|---|
| B&R presented as programme goal | Critical | Reference scenario within DORA |
| No mention of 24-regulation portfolio | Critical | Add throughout |
| Month 18 outcome implies full 24-reg coverage | High | State as "status transparent, waves implemented per capacity" |
| Staffing FTE ranges hardcoded | Medium | Keep illustrative label, compute from data where possible |

---

## What to retain

- Gate page (index.html) with SHA-256 auth
- Dark topbar with gradient
- Sidebar navigation pattern
- Right-side drawer pattern for deliverable and role detail
- Hub cards (Compliance Hub, Product Hub, DDCR)
- Skill heatmap structure
- RAID register table with category filter
- KPI tabs structure (already rebuilt)
- Add-on cards pattern
- Data file `var NAME = [...]` loading pattern
- npm run verify scripts

## What to remove or rewrite

- Current Executive section KPI strip (replace with decision-led layout)
- Single-track Gantt (replace with two-track)
- Workstream section label and scope (rename and extend)
- G1-G3 gate cards (replace with G0-G4)
- Hardcoded FTE ranges (keep illustrative but improve)
