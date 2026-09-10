# Assumption Register

This file records every quantitative assumption underpinning the UC3 Agent Compliance value case. Each assumption has an owner, a validation method, and a target validation date. Assumptions without a validation date are blocking items for Phase 1 sign-off.

Last updated: September 2026

---

## Assumption Table

| ID | Description | Low | Base | High | Owner | Source | Confidence | Validation method | Validation target date | Calculations affected | Status |
|----|-------------|-----|------|------|-------|--------|------------|------------------|------------------------|-----------------------|--------|
| A-01 | Direct efficiency rate for a single end-to-end use case within DORA Backup and Restore scope | 45% | 55% | 65% | UC3 Delivery Lead | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Directional -- based on analogous automation benchmarks | Pilot measurement during Phase 1 run of DORA B&R agent | End of Phase 1 (Month 6) | SOT-01, SOT-02, all bridge-derived metrics | Active |
| A-02 | Addressable work fraction -- proportion of total GTRF compliance effort directly addressable by AI in scope | 25% | 31% | 40% | UC3 Delivery Lead | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Working assumption -- not yet validated by time-and-motion | GTRF role mapping and time-and-motion study in Phase 1 | End of Phase 1 (Month 6) | SOT-01, SOT-02, SOT-14, all bridge-derived metrics | Active |
| A-03 | Enterprise coverage fraction -- proportion of GT estate reached after full scale-up | 75% | 85% | 92% | Programme Director | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Working assumption -- subject to architecture and adoption plan | Architecture review and adoption planning in Phase 2 | End of Phase 2 (Month 12) | SOT-01, SOT-02, SOT-15, all bridge-derived metrics | Active |
| A-04 | Benefit realisation fraction -- proportion of theoretical benefit realised in practice | 88% | 95% | 98% | Change Lead | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Working assumption -- subject to change management effectiveness | Post-go-live measurement at Month 18 | Month 18 | SOT-01, SOT-02, SOT-16, all bridge-derived metrics | Active |
| A-05 | Total GTRF headcount in UC3-affected scope | 2,600 | 2,864 | 3,100 | GTRF HR / Workforce Analytics | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Working assumption -- pending GTRF workforce data extract | GTRF headcount data extract and role mapping in Phase 1 | Month 2 | SOT-02, SOT-03, all FTE-denominated metrics | Active -- blocking |
| A-06 | Number of distinct GTRF role types within UC3 affected scope | 10 | 14 | 14 | GTRF HR / UC3 Delivery Lead | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Working assumption -- up to 14 identified; exact list unconfirmed | GTRF role taxonomy validation in Phase 1 | Month 2 | SOT-04, people section metrics | Active -- blocking |
| A-07 | Replication efficiency rate -- effective efficiency at scale across all regulations using shared agent patterns | 20% | 28% | 35% | UC3 Architect | UC3_Savings_Logic_Client_Slide.pptx slide 1 | Directional -- based on pattern-reuse assumptions | Measurement during Phase 2 replication across second regulation | End of Phase 2 (Month 12) | SOT-06, scale-level savings metrics | Active |
| A-08 | Total regulations in North Star portfolio | 20 | 24 | 24 | Programme Director | Client confirmation September 2026 | Confirmed target -- but Month 18 coverage commitment is a decision required | Client steering committee confirmation of Month 18 scope | Month 1 | SOT-07, timeline and roadmap displays | Active -- decision required |
| A-09 | Total GT application estate size | 3,700 | 3,900 | 4,100 | GT Architecture | StratC Purple Plus v0.99 slide 2; LeanIX 27.08.2026 | Data extract -- point in time; growing ~200 per annum | Annual LeanIX refresh; next update expected August 2027 | August 2027 | SOT-08, architecture section metrics | Active -- data extract |
| A-10 | Business-owned application subset of total GT estate | 2,900 | 3,100 | 3,300 | GT Architecture | StratC Purple Plus v0.99 slide 30; LeanIX 27.08.2026 | Data extract -- point in time | Annual LeanIX refresh; next update expected August 2027 | August 2027 | SOT-09, architecture section metrics | Active -- data extract |

---

## Assumption Status Definitions

| Status | Meaning |
|--------|---------|
| Active | In use in current dashboard; not yet validated |
| Active -- blocking | In use but must be validated before Phase 1 sign-off; escalation required if overdue |
| Active -- decision required | In use but depends on a client decision that has not yet been made |
| Active -- data extract | Sourced from a data system; will auto-update on next refresh cycle |
| Validated | Replaced by measured data; base value locked |
| Superseded | Replaced by a revised assumption; visible only in assumption history table |

---

## Sensitivity Summary

Applying low values to all four bridge assumptions simultaneously (A-01 low, A-02 low, A-03 low, A-04 low) produces the floor outcome. Applying high values produces the ceiling. The dashboard displays this as a 11-17% sensitivity range around the 13.8% base. The 2,864 FTE denominator (A-05) is held constant for this sensitivity; a separate FTE sensitivity is available on request.
