# Metric Dictionary

This file defines the exact meaning of every quantitative metric referenced by the UC3 Agent Compliance dashboard. Only metrics marked "Yes" in the Approved for display column may appear in the main dashboard view. Superseded metrics may appear only in the assumption history table, clearly labelled as superseded.

Last updated: September 2026

---

## Metric Definitions

| Metric | Exact meaning | Numerator | Denominator | Source | Status | Approved for display | Label required |
|--------|--------------|-----------|-------------|--------|--------|----------------------|----------------|
| 13.8% net effort reduction | Net reduction in total GTRF compliance effort achievable at full scale, after applying all four bridge adjustments | 396 FTE capacity freed | 2,864 FTE in scope | UC3_Savings_Logic_Client_Slide.pptx slide 1; bridge = 55% x 31% x 85% x 95% | Active -- current base case | Yes | "Net effort reduction (directional assumption)" |
| 396 FTE capacity freed | FTE-equivalent capacity released across 14 GTRF roles at full scale | 2,864 FTE x 13.8% | 2,864 FTE | Derived from SOT-01 and SOT-03 | Active -- current base case | Yes | "Estimated capacity freed (not headcount reduction)" |
| 2,864 FTE | Total headcount in UC3-affected GTRF roles; the population base for all savings calculations | Headcount in 14 role types | All GTRF staff | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Active working assumption | Yes | "Estimated GTRF roles in scope (working assumption)" |
| 14 roles | Number of distinct GTRF role types within the UC3 affected scope | Role type count | All GTRF role types | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Active working assumption | Yes | "Role types in scope (up to 14, subject to validation)" |
| 55% direct efficiency | Effort reduction achievable within a single end-to-end use case, for directly addressed active effort only | Hours saved within addressed effort | Total active effort within DORA B&R scope | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Active -- bridge component 1 | Yes, in derivation table only | "Direct efficiency -- single use case (range 45-65%)" |
| 28% replication efficiency | Effective efficiency rate across the full enterprise scope after replication of agent patterns across regulations | Replication-weighted hours saved | Full GTRF compliance effort | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Active -- bridge component at scale | Yes, in derivation table only | "Replication efficiency at scale (range 20-35%)" |
| 31% addressable work fraction | Fraction of total GTRF compliance effort that is directly addressable by AI agents in Phase 1 scope | Addressable hours | Total GTRF compliance hours | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Active -- bridge component 2 | Yes, in derivation table only | "Addressable work fraction (working assumption)" |
| 85% enterprise coverage fraction | Proportion of the enterprise estate that will be reached after full scale-up | Covered applications or roles | Total enterprise estate | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Active -- bridge component 3 | Yes, in derivation table only | "Enterprise coverage at scale (working assumption)" |
| 95% realisation fraction | Proportion of theoretical maximum benefit expected to be realised in practice, accounting for adoption and change | Realised benefit | Theoretical maximum benefit | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Active -- bridge component 4 | Yes, in derivation table only | "Benefit realisation rate (working assumption)" |
| 11-17% net effort reduction (range) | Sensitivity range around the 13.8% base case, reflecting low and high values of each bridge component | Range of outputs from sensitivity | 2,864 FTE | Derived from bridge component ranges | Active -- shown in sensitivity | Yes, in sensitivity panel only | "Directional range (sensitivity)" |
| 24 regulations | Total number of regulations in the North Star portfolio target at Month 18 | Confirmed regulation count | All applicable regulations | Client confirmation | Confirmed target | Yes | "Target regulatory portfolio (North Star)" |
| ~3,900 total GT applications | Approximate total number of Group Technology applications across all 10 delivery units | Total application count | n/a | StratC Purple Plus v0.99 slide 2; LeanIX 27.08.2026 | Data extract | Yes | "Approximate GT application estate (LeanIX, August 2026)" |
| ~3,100 business-owned applications | Approximate number of business-owned applications within the total GT estate | Business-owned application count | ~3,900 total | StratC Purple Plus v0.99 slide 30; LeanIX 27.08.2026 | Data extract | Yes | "Approximate business-owned applications (LeanIX, August 2026)" |
| 25-30% net effort reduction | Previous assumption range before bridge decomposition was adopted | n/a | n/a | Earlier working session | Superseded -- August 2026 | No -- assumption history table only | "SUPERSEDED: replaced by 13.8% bridge derivation" |
| 45-55% direct efficiency | Previous assumption range for direct efficiency before bridge methodology | n/a | n/a | Earlier working session | Superseded -- August 2026 | No -- assumption history table only | "SUPERSEDED: replaced by 55% (range 45-65%) in bridge" |

---

## Display Rules

1. The 13.8% figure must always appear alongside the label "directional working assumption" or equivalent. It must never be presented as a committed or audited figure.
2. The 396 FTE figure must always be qualified as "capacity freed" or "capacity released", never as "headcount reduction" or "jobs saved".
3. Bridge components (55%, 31%, 85%, 95%) appear only in the value derivation table. They must not appear in summary KPI tiles without the full bridge context.
4. Superseded values (25-30%, 45-55%) may only appear in an assumption history table with a clear "SUPERSEDED" label and a note of what replaced them.
5. The sensitivity range (11-17%) is shown only in a sensitivity or scenario panel, never as the headline figure.
