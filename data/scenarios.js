var SCENARIOS = [
  {
    id: 'lean',
    name: 'Lean',
    description: 'Prioritises the shared foundation and reference proof with a minimal persistent team. One regulation workstream active at a time.',
    persistentCoreFTE: { min: 7, max: 9 },
    onboardingSquads: { min: 0, max: 1 },
    clientFTE: { min: 2, max: 4 },
    totalFTEBand: { min: 9, max: 14 },
    parallelism: 'One workstream at a time. Regulation onboarding starts only after the shared platform is stable.',
    month18Outcome: 'Foundation proven, one regulation wave underway, scale case developing. Remaining route to 24 regulations subject to investment decision.',
    principalRisks: [
      'Key-person dependency across combined roles',
      'Slower path to 24-regulation coverage',
      'Higher coordination cost per regulation due to sequential workstreams',
      'Less capacity to absorb scope changes or regulatory surprises'
    ],
    successConditions: [
      'Strong, available executive sponsor and Product Owner',
      'High-quality source documents and obligation registers available early',
      'Dedicated client SME input during Phase 1',
      'No major scope additions during Phase 1'
    ],
    notIncluded: [
      'Parallel regulation onboarding',
      'Accelerated SDLC integration',
      'Multiple simultaneous evidence connectors',
      'Dedicated change management resource'
    ],
    phaseShape: {
      phase1: 'Core team only: 7-9 FTE persistent core',
      phase2: 'Core team plus 1 onboarding squad when Wave 1 regulation is ready',
      phase3: 'Core team plus up to 1 squad; sequential regulation processing'
    }
  },
  {
    id: 'recommended',
    name: 'Recommended',
    description: 'Balances speed to value with cost efficiency. Platform build and regulatory onboarding run in parallel from Phase 2.',
    persistentCoreFTE: { min: 9, max: 12 },
    onboardingSquads: { min: 1, max: 2 },
    clientFTE: { min: 4, max: 6 },
    totalFTEBand: { min: 13, max: 20 },
    parallelism: 'Platform build and first regulation onboarding run in parallel from Phase 2. Up to 2 regulation waves active simultaneously from Phase 3.',
    month18Outcome: 'Shared platform live, Wave 1 and Wave 2 regulations onboarded, scale case validated. Route to further regulation coverage defined and costed.',
    principalRisks: [
      'Dependency on Wave 1 regulation source documents being available on schedule',
      'Client capacity constraints during concurrent platform and onboarding work',
      'Agent quality issues delaying evidence automation'
    ],
    successConditions: [
      'Client SME capacity available for both platform design and regulation onboarding in parallel',
      'Wave 1 regulation documents, obligation registers and control owners confirmed by Gate 1',
      'Integration access to evidence source systems confirmed by Month 4'
    ],
    notIncluded: [
      'Three or more simultaneous regulation waves',
      'Full SDLC integration from Phase 1',
      'Dedicated large-scale change management programme'
    ],
    phaseShape: {
      phase1: 'Core team: 9-12 FTE persistent core',
      phase2: 'Core team plus 1-2 onboarding squads for Wave 1 regulations',
      phase3: 'Core team plus 1-2 squads; Wave 2 onboarding in parallel with Wave 1 live operations'
    }
  },
  {
    id: 'accelerated',
    name: 'Accelerated',
    description: 'Maximises speed to coverage. Multiple regulation waves onboarded in parallel from Phase 2 alongside platform build.',
    persistentCoreFTE: { min: 12, max: 15 },
    onboardingSquads: { min: 2, max: 3 },
    clientFTE: { min: 6, max: 9 },
    totalFTEBand: { min: 18, max: 27 },
    parallelism: 'Two or more regulation waves onboarded simultaneously from Phase 2. Shared platform and regulation coverage accelerated.',
    month18Outcome: 'Wave 1 and Wave 2 regulations fully live, Wave 3 onboarding underway. Scale economics confirmed. Remaining route to 24 regulations funded and sequenced.',
    principalRisks: [
      'High coordination overhead across simultaneous workstreams',
      'Client SME bottleneck if subject-matter experts must serve multiple regulation squads',
      'Platform stability risk if hardening is compressed',
      'Higher upfront investment before value is validated'
    ],
    successConditions: [
      'Multiple regulation SMEs available from Phase 2',
      'Integration access and evidence source systems confirmed for Wave 1 and Wave 2 by Gate 1',
      'Platform architecture confirmed stable by Month 4',
      'Executive sponsor with appetite for front-loaded investment'
    ],
    notIncluded: [
      'Sequential regulation processing',
      'Extended incubation period before scaling'
    ],
    phaseShape: {
      phase1: 'Core team: 12-15 FTE persistent core with accelerated architecture and agent build',
      phase2: 'Core team plus 2-3 onboarding squads; Wave 1 and Wave 2 in parallel',
      phase3: 'Core team plus 2-3 squads; Wave 3 begins; operations team ramping'
    }
  }
];

var SQUAD_TEMPLATE = [
  { role: 'Regulation and Legal SME', fteMin: 0.5, fteMax: 1.0, side: 'shared', note: 'Client or shared; must understand the regulatory text and control intent' },
  { role: 'Control and Work Product Analyst', fteMin: 1.0, fteMax: 1.0, side: 'shared', note: 'Maps obligations to controls and Work Products; defines evidence requirements' },
  { role: 'Applicability Analyst', fteMin: 0.5, fteMax: 0.5, side: 'accenture', note: 'Configures and tests applicability rules for the regulation in scope' },
  { role: 'Knowledge and Configuration Engineer', fteMin: 1.0, fteMax: 1.0, side: 'accenture', note: 'Loads obligations, configures interpretation workflow, builds reusable assets' },
  { role: 'Evidence or Integration Engineer', fteMin: 1.0, fteMax: 1.0, side: 'accenture', note: 'Builds or configures evidence connectors; implements verification rules' },
  { role: 'QA and Assurance', fteMin: 0.5, fteMax: 0.5, side: 'accenture', note: 'Tests the end-to-end case; validates evidence and status correctness' },
  { role: 'Product Team or system representative', fteMin: 0.5, fteMax: 0.5, side: 'client', note: 'Provides application and integration context; accepts evidence configuration' }
];

var PERSISTENT_CORE = [
  { role: 'Programme and Product Lead', fteMin: 1.0, fteMax: 1.0, side: 'accenture', guardrail: true, note: 'Accountable product ownership cannot be vacated' },
  { role: 'Compliance and Control Lead', fteMin: 1.0, fteMax: 1.5, side: 'shared', guardrail: true, note: 'Regulatory expertise is always required; cannot be substituted by AI' },
  { role: 'Solution and Agentic AI Architect', fteMin: 1.0, fteMax: 1.0, side: 'accenture', guardrail: true, note: 'Architecture decisions at scale require a dedicated senior architect' },
  { role: 'Integration and Workflow Engineers', fteMin: 1.5, fteMax: 2.0, side: 'accenture', guardrail: true, note: 'Hub connectors and durable workflow require dedicated engineering' },
  { role: 'AI and Knowledge Engineer', fteMin: 0.75, fteMax: 1.0, side: 'accenture', guardrail: false, note: 'Builds and maintains specialist agents and the compliance knowledge store' },
  { role: 'Evidence and Data Engineer', fteMin: 0.75, fteMax: 1.0, side: 'accenture', guardrail: false, note: 'Operates evidence connectors, verification rules and DDCR integration' },
  { role: 'QA, Security and Responsible AI', fteMin: 0.75, fteMax: 1.0, side: 'accenture', guardrail: true, note: 'Security and responsible AI controls cannot be removed; QA prevents defect accumulation' },
  { role: 'UX, Change, Value and PMO support', fteMin: 0.5, fteMax: 0.75, side: 'accenture', guardrail: false, note: 'Can be reduced in Lean scenario but not eliminated entirely' }
];

var COST_LEVERS = [
  {
    id: 'cl-1', label: 'Reuse existing enterprise infrastructure',
    description: 'Prioritise reuse of existing BPM, observability, CI/CD, IAM and data integration platforms before procuring new tooling.',
    saving: 'High  -  eliminates licensing and infrastructure setup cost',
    risk: 'Low  -  reuse is the default; only avoided where a confirmed gap exists'
  },
  {
    id: 'cl-2', label: 'Start with the lowest integration tier',
    description: 'Default to Tier 0 or Tier 1 for all applications. Upgrade to Tier 2 or Tier 3 only where lower tiers demonstrably cannot provide sufficient evidence.',
    saving: 'High  -  Tier 3 integrations are 5-10x more expensive to build and maintain than Tier 0',
    risk: 'Low  -  evidence sufficiency must be confirmed, but most controls can be proved centrally'
  },
  {
    id: 'cl-3', label: 'Sequence regulations; do not onboard simultaneously unless ready',
    description: 'Only activate a regulation onboarding squad when source documents, SMEs and system access are confirmed. Premature activation creates rework and context-switching cost.',
    saving: 'Moderate  -  avoids squad idle time and rework from incomplete readiness',
    risk: 'Low  -  sequencing is the default in Lean and Recommended scenarios'
  },
  {
    id: 'cl-4', label: 'Build the connector library from Phase 2',
    description: 'Invest in reusable connectors rather than one-off integrations. Each reused connector eliminates build cost for subsequent regulations that share the same evidence source.',
    saving: 'High  -  connector reuse drives down cost-per-regulation over time',
    risk: 'Low  -  requires connector registry discipline from Phase 2'
  },
  {
    id: 'cl-5', label: 'Use client SME input efficiently',
    description: 'Structure compliance SME input as structured reviews and sign-offs rather than embedded daily presence. Poorly structured SME sessions create rework.',
    saving: 'Moderate  -  reduces client resource cost and avoids extended engagement dependency',
    risk: 'Low  -  requires clear agenda and pre-read materials for each session'
  },
  {
    id: 'cl-6', label: 'Lean scenario role consolidation',
    description: 'In the Lean scenario, five combined roles cover the persistent core: Programme and Product Lead; Compliance and Control Lead; Solution and Agentic AI Architect; QA, Security and Responsible AI; UX, Change, Value and PMO support.',
    saving: 'Moderate  -  reduces headcount by 3-4 FTE versus the Recommended scenario',
    risk: 'Moderate  -  combined roles increase key-person dependency; cover plan required'
  },
  {
    id: 'cl-7', label: 'Validate the 13.8% assumption before committing to full scale',
    description: 'The 13.8% effort-reduction figure is directional and must be validated with operational data from the live pilot. Gate 2 is the right point to confirm or recalibrate before committing to full regulation coverage.',
    saving: 'High  -  avoids scaling an unvalidated business case',
    risk: 'Low  -  validation is built into the programme design at Gate 2'
  },
  {
    id: 'cl-8', label: 'Defer Tier 3 integrations until ROI is confirmed',
    description: 'Tier 3 controlled implementation integrations (SDLC agents, platform config changes) are high-cost and carry operational risk. Confirm ROI from the Tier 0 and Tier 2 baseline before committing Tier 3 scope.',
    saving: 'High  -  Tier 3 development is the most expensive component of the integration facade',
    risk: 'Low  -  Tier 3 is optional for most regulations; DORA Backup and Restore can be served by Tier 2'
  },
  {
    id: 'cl-9', label: 'Limit agent customisation in Phase 1',
    description: 'Use standard specialist agent configurations for the Phase 1 pilot. Avoid custom agent development for edge cases until the standard configuration is proven at scale.',
    saving: 'Moderate  -  agent customisation creates maintenance overhead',
    risk: 'Low  -  standard configurations cover the majority of Phase 1 use cases'
  },
  {
    id: 'cl-10', label: 'Transition to BAU operations at Gate 3',
    description: 'Plan the BAU operations model and service transition from Phase 2. Avoid extending the delivery team into the operational phase; a smaller BAU team with documented runbooks is lower-cost.',
    saving: 'High  -  BAU team is significantly smaller than delivery team',
    risk: 'Low  -  transition plan is a Phase 3 deliverable (D15)'
  }
];

var GUARDRAILS = [
  {
    id: 'gr-1', role: 'Accountable product ownership',
    why: 'Without a named Product Owner, backlog decisions default to the delivery team; this causes scope drift and misaligned prioritisation.',
    scenario: 'All scenarios  -  client or shared'
  },
  {
    id: 'gr-2', role: 'Regulatory and control expertise',
    why: 'An AI agent can propose an interpretation but cannot take accountability for it. A qualified Compliance Lead must own every approved interpretation and control configuration.',
    scenario: 'All scenarios  -  cannot be substituted by AI'
  },
  {
    id: 'gr-3', role: 'Solution architecture',
    why: 'Agentic systems at enterprise scale require consistent architectural decisions. Without a dedicated architect, integration contracts, layer boundaries and security design degrade.',
    scenario: 'All scenarios  -  one senior architect minimum'
  },
  {
    id: 'gr-4', role: 'Integration engineering',
    why: 'Connectors to Compliance Hub, Product Hub and Reporting Hub cannot be built without dedicated engineering capacity. Reusing existing integration staff without ringfencing creates delivery risk.',
    scenario: 'All scenarios  -  dedicated, not shared'
  },
  {
    id: 'gr-5', role: 'Testing and quality assurance',
    why: 'Agent outputs are non-deterministic; defects in interpretation or evidence verification are compliance failures. Continuous QA prevents defect accumulation.',
    scenario: 'All scenarios  -  cannot be deferred to go-live'
  },
  {
    id: 'gr-6', role: 'Security architecture',
    why: 'Agentic systems that access regulatory data, write to production systems or operate service accounts require design-time security architecture, not a post-deployment audit.',
    scenario: 'All scenarios  -  must be present from Phase 1'
  },
  {
    id: 'gr-7', role: 'Responsible AI controls',
    why: 'Human-in-the-Loop controls, prompt governance and evaluation frameworks are required for an agentic system operating in a regulated environment. These cannot be added retrospectively.',
    scenario: 'All scenarios  -  must be present from Phase 1'
  },
  {
    id: 'gr-8', role: 'Evidence provenance capability',
    why: 'Without provenance tracking, evidence packages are not auditable and DDCR status cannot be substantiated. Removing this capability creates a compliance liability, not a saving.',
    scenario: 'All scenarios  -  core to the value proposition'
  },
  {
    id: 'gr-9', role: 'Value measurement ownership',
    why: 'The 13.8% directional assumption must be validated or recalibrated with operational data. Without dedicated measurement ownership, the scale investment decision lacks an evidence base.',
    scenario: 'All scenarios  -  can be lean but must exist'
  }
];
