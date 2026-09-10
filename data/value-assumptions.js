var VALUE_BRIDGE = [
  {
    id: 'vb-01',
    order: 1,
    component: 'Direct effort reduction (single use case)',
    symbol: 'A',
    low: 0.45,
    base: 0.55,
    high: 0.65,
    label: '55%',
    rangeLabel: '45-65%',
    description: 'Effort reduction within the directly addressed active compliance work for a single end-to-end use case (DORA B&R baseline). Human review is retained at all human gate steps.',
    scope: 'Directly addressed active effort in DORA B&R scope',
    validationPoint: 'Gate 2, March 2027 -- operational pilot data',
    assumption: 'A-01',
    qualifier: 'Working assumption / Single use case only / Human review retained'
  },
  {
    id: 'vb-02',
    order: 2,
    component: 'Addressable work fraction',
    symbol: 'B',
    low: 0.25,
    base: 0.31,
    high: 0.40,
    label: '31%',
    rangeLabel: '25-40%',
    description: 'The fraction of total compliance effort that is both active (not waiting or blocked) and addressable by the automation and AI capability in scope.',
    scope: 'Active compliance effort across the full GTRF role population',
    validationPoint: 'Phase 1 baseline analysis, December 2026',
    assumption: 'A-02',
    qualifier: 'Working assumption / To validate in Phase 1'
  },
  {
    id: 'vb-03',
    order: 3,
    component: 'Enterprise coverage fraction',
    symbol: 'C',
    low: 0.70,
    base: 0.85,
    high: 0.95,
    label: '85%',
    rangeLabel: '70-95%',
    description: 'The fraction of the in-scope population that the capability will actually reach, accounting for adoption, product team compliance, and implementation completeness.',
    scope: '14 GTRF role types, 2,864 FTE working assumption (subject to GTRF validation)',
    validationPoint: 'Phase 2 adoption measurement, September 2027',
    assumption: 'A-03',
    qualifier: 'Working assumption / Adoption-dependent / Subject to GTRF validation'
  },
  {
    id: 'vb-04',
    order: 4,
    component: 'Realisation fraction',
    symbol: 'D',
    low: 0.80,
    base: 0.95,
    high: 1.00,
    label: '95%',
    rangeLabel: '80-100%',
    description: 'The fraction of addressable value that is actually captured as freed capacity, accounting for friction, exception handling, and residual manual effort.',
    scope: 'End-to-end delivery and adoption across all in-scope regulation runs',
    validationPoint: 'Phase 3 benefits tracking, March 2028',
    assumption: 'A-04',
    qualifier: 'Working assumption / Realisation tracking required in Phase 3'
  }
];

var VALUE_SCENARIOS = [
  {
    id: 'vs-prove',
    order: 1,
    level: 'Prove',
    label: 'Level 1: Prove',
    sublabel: 'Single E2E use case (DORA B&R)',
    low: 0.45,
    base: 0.55,
    high: 0.65,
    lowLabel: '45%',
    baseLabel: '55%',
    highLabel: '65%',
    denominator: 'Directly addressed active effort',
    regulationScope: 'DORA B&R (Wave 1 anchor)',
    northStarStage: 'Stage 1: Automate',
    gateTarget: 'Gate 2 (March 2027)',
    description: 'A single end-to-end use case demonstrates the automation and AI pattern on the DORA B&R obligation set. Human review retained at all gates. Proves the core approach and provides the first operational baseline.',
    qualifier: 'Working assumption / Human review retained / Narrowly scoped'
  },
  {
    id: 'vs-replicate',
    order: 2,
    level: 'Replicate',
    label: 'Level 2: Replicate',
    sublabel: 'Same control pattern at scale',
    low: 0.20,
    base: 0.28,
    high: 0.35,
    lowLabel: '20%',
    baseLabel: '28%',
    highLabel: '35%',
    denominator: 'Adjusted for applicability and adoption (within the covered regulation set)',
    regulationScope: 'Wave 1 + Wave 2 regulations (count: decision required at Gate 2)',
    northStarStage: 'Stage 2: Orchestrate',
    gateTarget: 'Gate 3 (September 2027)',
    description: 'The proven control pattern is replicated across comparable regulation types. The denominator widens to the full applicable population for the covered regulation set, accounting for variation in applicability and partial adoption.',
    qualifier: 'Working assumption / Wave 2 regulation count: decision required / Adoption-dependent'
  },
  {
    id: 'vs-scale',
    order: 3,
    level: 'Scale',
    label: 'Level 3: Scale',
    sublabel: 'Full UC3 North Star (enterprise)',
    low: 0.11,
    base: 0.138,
    high: 0.17,
    lowLabel: '11%',
    baseLabel: '13.8%',
    highLabel: '17%',
    denominator: '14 GTRF role types, 2,864 FTE in scope (working assumption, subject to GTRF validation)',
    capacityFreed: '396 FTE (capacity freed, not headcount reduction)',
    regulationScope: 'North Star target: 24 regulations. Committed Month 18 coverage: decision required.',
    northStarStage: 'Stage 3: Transform (extends beyond Month 18)',
    gateTarget: 'Gate 4 (March 2028)',
    description: 'Full-portfolio denominator across all 14 role types and 2,864 FTE. The 13.8% represents capacity freed. This is not an automatic reduction in workforce. Value is realised through redeployment, avoided hiring, and backfill reduction.',
    bridgeFormula: '55% x 31% x 85% x 95% = 13.8%',
    qualifier: 'Directional working assumption / Capacity freed not headcount reduction / To validate through pilot / Subject to GTRF validation'
  }
];

var ASSUMPTION_HISTORY = [
  {
    id: 'ah-01',
    order: 1,
    figure: '45-55%',
    label: '45-55% compliance portfolio effort reduction',
    period: 'Earlier UC3 hypothesis (pre-savings logic)',
    scope: 'Entire compliance portfolio effort',
    status: 'superseded',
    statusLabel: 'Superseded',
    notes: 'Pre-savings-logic estimate. Broad portfolio denominator without distinction between active effort, addressable fraction, or enterprise coverage. Not aligned to the three-level derivation model.',
    supersededBy: 'Three-level savings model (vs-prove, vs-replicate, vs-scale)'
  },
  {
    id: 'ah-02',
    order: 2,
    figure: '25-30%',
    label: '25-30% automated policy and control processing',
    period: 'Earlier UC3 hypothesis (pre-savings logic)',
    scope: 'Automated processing of policy and control tasks',
    status: 'superseded',
    statusLabel: 'Superseded',
    notes: 'Task-level automation estimate without a clear denominator or derivation pathway. Replaced by the 31% addressable work fraction (bridge component B) and the 28% replicate-level base case.',
    supersededBy: 'Bridge component B (addressable work fraction): 31% base; Level 2 Replicate: 28% base'
  },
  {
    id: 'ah-03',
    order: 3,
    figure: '11-17% / 13.8%',
    label: '13.8% net enterprise effort reduction (current)',
    period: 'Current working assumption (UC3_Savings_Logic_Client_Slide.pptx, September 2026)',
    scope: '14 GTRF role types, 2,864 FTE (working assumption, subject to GTRF validation)',
    status: 'current',
    statusLabel: 'Current working assumption',
    notes: 'Derived from four bridge components: 55% direct efficiency x 31% addressable work x 85% coverage x 95% realisation. Represents capacity freed, not a workforce reduction commitment. To be validated through operational pilot at Gate 2.',
    supersededBy: null
  }
];

var CAPACITY_FREED_NOTE = {
  figure: '396 FTE',
  label: 'Capacity freed at enterprise scale (13.8% x 2,864 FTE)',
  qualifier: 'Capacity freed is not automatic headcount reduction. Value is realised through redeployment, avoided hiring, or backfill reduction.',
  denominatorNote: '2,864 FTE is a working assumption subject to GTRF validation. The actual figure will be confirmed through Phase 1 baseline analysis.',
  headcountWarning: 'Do not use this figure as a headcount reduction target. It represents freed capacity available for redeployment, not a reduction commitment.',
  source: 'UC3_Savings_Logic_Client_Slide.pptx'
};
