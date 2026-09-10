# Context Reconciliation

This file maps every requirement that has been specified for the UC3 Agent Compliance dashboard against the current GitHub implementation. Each row identifies the gap and the change needed to close it. Items are prioritised High / Med / Low based on their impact on dashboard correctness and stakeholder readiness.

Last updated: September 2026

---

## Reconciliation Table

| Requirement | Source | Current GitHub implementation | Gap | Required change | Affected files | Priority |
|-------------|--------|-------------------------------|-----|-----------------|----------------|----------|
| Operating model dimensions on data | StratC slides 14, Hypotheses Deepdive slide 1 | Not present | No operating model fields on workstreams or deliverables; the five Purple Plus building blocks cannot be used as filters | Add `operatingModelDimension[]` array field to all workstream, deliverable, and addon data objects | workstreams.js, deliverables.js, addons.js | High |
| Run view (A / B / C) | User specification; automate.ts | Not present | No obligation-to-evidence flow visualisation; the agent run lifecycle from obligation trigger to evidence output is not shown | Add new Run View section with A/B/C classification logic and wire to new data/runs.js file | app.html, data/runs.js | High |
| 13.8% derivation bridge | UC3_Savings_Logic_Client_Slide.pptx | 13.8% result is shown; no bridge breakdown | Missing the 55% x 31% x 85% x 95% four-component derivation; users cannot trace the headline figure | Add a derivation table in the Value section showing all four bridge components with their ranges and the resulting net figure | app.html, data/value-assumptions.js | High |
| Three-level savings table | UC3_Savings_Logic_Client_Slide.pptx | Not present | The Prove / Replicate / Scale three-level structure for savings realisation is absent; only the headline figure is shown | Add a three-row savings table to the Value section with level name, scope, efficiency rate, and cumulative FTE freed for each level | app.html, data/value-assumptions.js | High |
| MITRA / MAYA agent names | MUNICH_RE_TERMINOLOGY.md | Generic "specialist agents" label used throughout | No named agents; stakeholders cannot associate specific agents with compliance and product domains | Replace generic agent labels with provisional MITRA (Compliance Hub) and MAYA (Product Hub) names in Architecture and Runs sections, with a "provisional" qualifier | app.html | Medium |
| Purple Plus context | StratC deck slides 20-21 | Not mentioned | No programme context explaining how UC3 sits within the Purple Plus operating model transformation; Executive page lacks this framing | Add a callout box on the Executive page summarising the Purple Plus programme context and UC3's role within it | app.html | Medium |
| Three-scale-dimension model | User specification | Not present | The three scaling dimensions (Capability, Regulatory, Functional) are mixed without a clear visual model; the Executive view cannot convey the scale-up logic | Add a three-dimension visual to the Executive section showing how Capability, Regulatory, and Functional dimensions combine to define scale | app.html | High |
| Application population context | StratC slides 2 and 30 | Not present | No enterprise scale context in the Architecture section; the ~3,900 / ~3,100 application estate figures are absent | Add an application population panel to the Architecture section sourced from SOT-08 and SOT-09, with LeanIX date stamp | app.html | Medium |
| 2,864 FTE affected population | UC3_Savings_Logic_Client_Slide.pptx | Not present | People section shows only the delivery team; the 2,864 FTE affected population (the savings denominator) is not displayed | Add a workforce impact panel to the People section showing the 2,864 FTE affected scope, role type count, and relationship to the savings calculation | app.html, data/people-impact.js | High |
| Tokenomics | Purple Plus requirement | Not present | No model catalogue or cost-per-run information; cost of AI inference is not surfaced alongside the value case | Add a Tokenomics subsection to the Value section with a model catalogue (MITRA, MAYA, orchestrator), estimated runs per regulation, and indicative cost-per-run ranges | app.html, data/models.js | High |
| Obligation chain backbone | Hypotheses Deepdive slide 5 | Described in text only | No visual representation of the obligation-to-evidence backbone; the core architectural concept is communicated only through prose | Add a visual obligation chain diagram to the Architecture section showing the backbone from regulatory obligation through agent processing to evidence output | app.html | Medium |
| executionMechanism classification | User specification | Not present | No AI vs deterministic vs human classification on runs or deliverables; users cannot distinguish which tasks are AI-executed, which are rule-based, and which require human decision | Add `executionMechanism` field with enum values (AI, deterministic, human) to all run and deliverable data objects; surface in drawer views | app.html, data/runs.js, data/workstreams.js | High |
| futureTaskOutcome on roles | User specification | Not present | No task outcome field on role data; the People section cannot show how each role's task mix changes as AI agents are introduced | Add `futureTaskOutcome` field to each role record and display it in role drawer views in the People section | data/roles.js, app.html | Medium |
| North Star stage labels on phases | North Star Definition pptx | Phases labelled Integrate / Orchestrate / Industrialise only | No Stage 1 / 2 / 3 Automate / Orchestrate / Transform labels aligned to the North Star narrative agreed with Daniel, Thomas, and Marcell | Add `northStarStage` field to each phase record with the corresponding Stage label and display it on phase cards | data/phases.js | Low |
| Navigation structure (9 sections) | User specification | 8 sections present | Missing Obligation Chain and Run View sections; 4 existing sections have incorrect labels relative to the agreed navigation specification | Rename 4 sections to match agreed labels and add Obligation Chain and Run View as new sections with correct nav anchors | app.html | High |

---

## Priority Summary

| Priority | Count | Notes |
|----------|-------|-------|
| High | 9 | Required for dashboard to correctly represent the value case and architecture; must be resolved before client review |
| Medium | 5 | Important for completeness and context; should be addressed in the sprint following High items |
| Low | 1 | Enhancement aligned to programme narrative; can be deferred without affecting accuracy |

---

## Implementation Order

Suggested sequencing for High items, based on data dependencies:

1. workstreams.js / deliverables.js / addons.js -- add `operatingModelDimension[]` and `executionMechanism` fields (data layer first, no UI dependency)
2. data/runs.js -- create file with run definitions and A/B/C classification
3. data/value-assumptions.js -- add bridge components and three-level savings data
4. data/people-impact.js -- add 2,864 FTE affected population data
5. data/models.js -- add model catalogue and tokenomics data
6. app.html -- add all new sections and rename navigation (requires data files to exist first)
