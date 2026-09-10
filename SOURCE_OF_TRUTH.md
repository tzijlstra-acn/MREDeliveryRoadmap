# Source of Truth Register

This file records every material business statement used by the UC3 Agent Compliance dashboard, with full source attribution. All claims shown in the dashboard must trace to a row in this table. If a claim cannot be traced, it must not be displayed.

Last updated: September 2026

---

## Claim Register

| ID | Claim | Source file | Slide / section | Source type | Date | Scope | Denominator | Confidence | Dashboard location | Notes |
|----|-------|-------------|-----------------|-------------|------|-------|-------------|------------|--------------------|-------|
| SOT-01 | 13.8% net effort reduction | UC3_Savings_Logic_Client_Slide.pptx | Slide 1 | Internal working assumption | August 2026 | 14 GTRF roles in UC3 affected scope | 2,864 FTE | Directional working assumption | Value section | Bridge = 55% x 31% x 85% x 95%. Not headcount reduction. |
| SOT-02 | 396 FTE capacity freed | UC3_Savings_Logic_Client_Slide.pptx | Slide 1 | Derived calculation | August 2026 | 14 GTRF roles | 2,864 FTE | Derived from 13.8% assumption | Value section | Capacity released is not automatic headcount reduction. |
| SOT-03 | 2,864 FTE in UC3 scope | UC3_Savings_Logic_Client_Slide.pptx | Slide 1 | Working assumption | August 2026 | 14 GTRF role types | n/a | Working assumption | People section | Subject to GTRF analysis in Phase 1. |
| SOT-04 | 14 GTRF role types | UC3_Savings_Logic_Client_Slide.pptx | Slide 1 | Working assumption | August 2026 | UC3 affected scope | n/a | Working assumption | People section | Up to 14; exact list subject to GTRF validation. |
| SOT-05 | 55% direct efficiency for single E2E use case | UC3_Savings_Logic_Client_Slide.pptx | Slide 1 | Working assumption | August 2026 | Directly addressed active effort within DORA B&R scope | Single use case | Directional | Value derivation table | Range 45-65%. Applies only within directly addressed active effort. |
| SOT-06 | 28% replication efficiency (range 20-35%) | UC3_Savings_Logic_Client_Slide.pptx | Slide 1 | Working assumption | August 2026 | Same control pattern at scale | Full GTRF scope | Directional | Value derivation table | Range 20-35%. Reflects reuse of agent patterns across regulations. |
| SOT-07 | 24-regulation North Star portfolio | Client confirmed | n/a | Client confirmation | September 2026 | Full regulatory portfolio target | n/a | Confirmed target | Throughout | Committed Month 18 coverage is a decision required. |
| SOT-08 | ~3,900 total GT applications | StratC Purple Plus v0.99 | Slide 2 | LeanIX data extract | 27 August 2026 | All 10 delivery units | n/a | Data extract | Architecture section | Growing approximately 200 applications per annum. |
| SOT-09 | ~3,100 business-owned applications | StratC Purple Plus v0.99 | Slide 30 | LeanIX data extract | 27 August 2026 | Business-owned subset of total GT estate | n/a | Data extract | Architecture section | Subset of ~3,900 total. |
| SOT-10 | MITRA (Compliance Hub AI assistant) | MUNICH_RE_TERMINOLOGY.md | n/a | Internal terminology decision | September 2026 | UC3 compliance agent | n/a | Provisionally assigned | Architecture section, Runs section | Name is provisional; subject to client confirmation. |
| SOT-11 | MAYA (Product Hub AI assistant) | MUNICH_RE_TERMINOLOGY.md | n/a | Internal terminology decision | September 2026 | UC3 product agent | n/a | Provisionally assigned | Architecture section, Runs section | Name is provisional; subject to client confirmation. |
| SOT-12 | Five Purple Plus operating model building blocks | StratC slide 14; Hypotheses Deepdive slide 1 | Slides 14, 1 | Strategy deck | September 2026 | GT operating model | n/a | Agreed framework | Deliverables filter | Building blocks used as deliverable categorisation dimensions. |
| SOT-13 | Backup and Restore as reference scenario within DORA | Client confirmed correction | n/a | Client confirmation | September 2026 | DORA compliance scope | n/a | Confirmed | Throughout | Not the programme goal; one compliance segment within DORA. |
| SOT-14 | 31% addressable work fraction (bridge component) | UC3_Savings_Logic_Client_Slide.pptx | Slide 1 | Working assumption | August 2026 | Proportion of GTRF effort directly addressable | 2,864 FTE | Working assumption | Value derivation table | Bridge component 2 of 4. |
| SOT-15 | 85% enterprise coverage fraction (bridge component) | UC3_Savings_Logic_Client_Slide.pptx | Slide 1 | Working assumption | August 2026 | Proportion of enterprise covered after scale-up | 2,864 FTE | Working assumption | Value derivation table | Bridge component 3 of 4. |
| SOT-16 | 95% realisation fraction (bridge component) | UC3_Savings_Logic_Client_Slide.pptx | Slide 1 | Working assumption | August 2026 | Proportion of theoretical benefit realised in practice | 2,864 FTE | Working assumption | Value derivation table | Bridge component 4 of 4. |

---

## Forbidden Values

The following values and claims must not appear anywhere in the dashboard, in tooltips, in commentary, or in exported outputs. Their presence indicates an error in the data layer or a regression from a corrected assumption.

- **52 FTE** -- superseded headcount figure; replaced by 396 FTE capacity freed framing.
- **3.0%** -- superseded percentage; replaced by 13.8% net effort reduction.
- **Enterprise-wide headcount reduction claims** -- the programme releases capacity; it does not directly reduce headcount. Any wording that implies automatic or committed headcount reduction is forbidden.
- **Any specific regulation assigned to Wave 2 or Wave 3** -- wave assignments for regulations beyond the reference scenario have not been confirmed. No regulation may be labelled as Wave 2 or Wave 3 in the current dashboard.
