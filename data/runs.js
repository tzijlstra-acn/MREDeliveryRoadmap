var RUNS = [
  {
    id: 'run-a',
    label: 'Run A: Regulatory Change',
    description: 'A regulatory source change is detected, obligations are extracted and interpreted, a human approves the framework impact, and norms, controls and Work Products are updated.',
    trigger: 'New or amended regulation published or notified',
    outputSystem: 'Compliance Hub',
    outputArtifact: 'Updated norm, control and Work Product set with approved interpretation',
    steps: [
      {
        id: 'a1', order: 1,
        label: 'Detect regulatory change',
        detail: 'Monitor regulatory feeds and sources for new or amended obligations relevant to the Munich Re portfolio.',
        system: 'External / Compliance Hub',
        executionMechanism: 'deterministic-automation',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Near real-time'
      },
      {
        id: 'a2', order: 2,
        label: 'Extract obligations',
        detail: 'MITRA reads the regulatory source and extracts structured obligation records linked to the canonical object model.',
        system: 'Compliance Hub',
        executionMechanism: 'generative-ai',
        agentName: 'MITRA',
        agentNote: 'Provisionally assigned',
        modelTier: 'efficient',
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Minutes'
      },
      {
        id: 'a3', order: 3,
        label: 'Prepare interpretation options',
        detail: 'MITRA drafts interpretation options with source citations, confidence indicators and a proposed norm and control mapping for human review.',
        system: 'Compliance Hub',
        executionMechanism: 'generative-ai',
        agentName: 'MITRA',
        agentNote: 'Provisionally assigned',
        modelTier: 'reasoning',
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Minutes to hours'
      },
      {
        id: 'a4', order: 4,
        label: 'Human review and approval',
        detail: 'Compliance officer reviews proposed interpretation. Authority matrix AM-003: approving a control change alters the control environment and requires accountable second-line risk and compliance sign-off.',
        system: 'Compliance Hub',
        executionMechanism: 'human-gate',
        agentName: null,
        modelTier: null,
        isHumanGate: true,
        lod: '2nd LoD',
        authorityRule: 'AM-003',
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Hours to days'
      },
      {
        id: 'a5', order: 5,
        label: 'Assess framework impact',
        detail: 'Determine which norms, controls and Work Products are affected by the approved obligation change. MITRA prepares the impact summary.',
        system: 'Compliance Hub',
        executionMechanism: 'agentic-execution',
        agentName: 'MITRA',
        agentNote: 'Provisionally assigned',
        modelTier: 'reasoning',
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Minutes'
      },
      {
        id: 'a6', order: 6,
        label: 'Publish updated norms and controls',
        detail: 'Approved norm and control changes are published to the canonical object model. Downstream applicability and Product Hub notifications are triggered.',
        system: 'Compliance Hub',
        executionMechanism: 'deterministic-automation',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Automated'
      }
    ]
  },
  {
    id: 'run-b',
    label: 'Run B: Application Impact',
    description: 'An approved obligation triggers applicability assessment across the application estate. Affected products receive structured work items. MAYA proposes Work Product updates. A human approves. Evidence is collected and DDCR is updated.',
    trigger: 'Approved obligation change published from Run A',
    outputSystem: 'DDCR / Reporting Hub',
    outputArtifact: 'Verified DDCR conformance status with evidence link and audit trail',
    steps: [
      {
        id: 'b1', order: 1,
        label: 'Trigger applicability assessment',
        detail: 'The published obligation change initiates an applicability check against the product and application estate using the configured applicability rules.',
        system: 'Compliance Hub / Workflow engine',
        executionMechanism: 'deterministic-automation',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Automated'
      },
      {
        id: 'b2', order: 2,
        label: 'Assess applicability',
        detail: 'MAYA determines which products and applications are in scope, assesses the gap between the current state and the control requirement, and prepares a structured finding.',
        system: 'Product Hub',
        executionMechanism: 'agentic-execution',
        agentName: 'MAYA',
        agentNote: 'Provisionally assigned',
        modelTier: 'efficient',
        isHumanGate: false,
        lod: null,
        authorityRule: 'AM-007',
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Minutes'
      },
      {
        id: 'b3', order: 3,
        label: 'Raise Product Hub work item',
        detail: 'A structured work item is created in Product Hub for the affected Product Team, including the approved control, required remediation action, and expected Work Products.',
        system: 'Product Hub',
        executionMechanism: 'deterministic-automation',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Automated'
      },
      {
        id: 'b4', order: 4,
        label: 'Propose Work Product updates',
        detail: 'MAYA drafts documentation updates and, where applicable, a technical configuration proposal for the affected Work Products. The proposal derives from the same approved control activity.',
        system: 'Product Hub',
        executionMechanism: 'generative-ai',
        agentName: 'MAYA',
        agentNote: 'Provisionally assigned',
        modelTier: 'reasoning',
        isHumanGate: false,
        lod: null,
        authorityRule: 'AM-008',
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Minutes'
      },
      {
        id: 'b5', order: 5,
        label: 'Product team review and approval',
        detail: 'The Product Team reviews documentation and configuration proposals. Human accountability is preserved. Both changes must be accepted and authorised before implementation.',
        system: 'Product Hub',
        executionMechanism: 'human-gate',
        agentName: null,
        modelTier: null,
        isHumanGate: true,
        lod: '1st LoD',
        authorityRule: 'AM-003',
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Hours to days'
      },
      {
        id: 'b6', order: 6,
        label: 'Remediate and implement',
        detail: 'The Product Team implements the approved configuration change or documentation update. Engineering tools, SDLC pipelines and change management processes are used as appropriate.',
        system: 'Engineering tools / SDLC',
        executionMechanism: 'human',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: '1st LoD',
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Days to weeks'
      },
      {
        id: 'b7', order: 7,
        label: 'Collect and verify evidence',
        detail: 'Evidence connectors retrieve technical evidence from authoritative source systems. Verification rules check freshness, completeness and provenance. Failed verification raises an exception.',
        system: 'Evidence layer',
        executionMechanism: 'deterministic-automation',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: null,
        authorityRule: 'AM-010',
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Automated'
      },
      {
        id: 'b8', order: 8,
        label: 'Update DDCR conformance status',
        detail: 'Verified evidence is linked to the DDCR conformance record. Status updates automatically when required conditions are met. Every change is auditable with a direct evidence link.',
        system: 'DDCR / Reporting Hub',
        executionMechanism: 'deterministic-automation',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Automated'
      }
    ]
  },
  {
    id: 'run-c',
    label: 'Run C: Evidence and Monitoring',
    description: 'Evidence is retrieved from source systems, verified against control rules, and used to prepare RACE and A-CART assessment content. Exceptions are handled by humans. DDCR status is maintained continuously.',
    trigger: 'Scheduled evidence cycle or control-monitoring event',
    outputSystem: 'DDCR / Reporting Hub',
    outputArtifact: 'Current DDCR conformance status with continuously available evidence and exception log',
    steps: [
      {
        id: 'c1', order: 1,
        label: 'Retrieve evidence from source systems',
        detail: 'Evidence connectors query authoritative source systems on a scheduled or event-driven basis. Evidence is retrieved with provenance metadata and stored in the evidence layer.',
        system: 'Evidence connectors',
        executionMechanism: 'deterministic-automation',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Automated / scheduled'
      },
      {
        id: 'c2', order: 2,
        label: 'Verify against control rules',
        detail: 'Technical verification rules check evidence against the accepted control criteria. Freshness, completeness and ownership are validated. A verification result is recorded for each evidence item.',
        system: 'Evidence layer',
        executionMechanism: 'deterministic-automation',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Automated'
      },
      {
        id: 'c3', order: 3,
        label: 'Handle exceptions',
        detail: 'Failed verification or incomplete evidence raises an exception routed to the accountable owner. Humans decide whether to accept the exception or trigger remediation.',
        system: 'Workflow engine',
        executionMechanism: 'human-gate',
        agentName: null,
        modelTier: null,
        isHumanGate: true,
        lod: '1st or 2nd LoD',
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Hours to days per exception'
      },
      {
        id: 'c4', order: 4,
        label: 'Prepare assessment content',
        detail: 'MITRA prepares RACE or A-CART assessment content using the verified evidence package, obligation chain and control mapping. The draft is ready for human review.',
        system: 'Compliance Hub',
        executionMechanism: 'agentic-execution',
        agentName: 'MITRA',
        agentNote: 'Provisionally assigned',
        modelTier: 'reasoning',
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Minutes'
      },
      {
        id: 'c5', order: 5,
        label: 'Update DDCR status',
        detail: 'DDCR conformance status is updated based on the verified evidence. The reason for every status change is visible and auditable. Human approval requirements are retained and captured.',
        system: 'DDCR / Reporting Hub',
        executionMechanism: 'deterministic-automation',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Automated'
      },
      {
        id: 'c6', order: 6,
        label: 'Continuous monitoring',
        detail: 'Control effectiveness, evidence freshness and exception volumes are monitored continuously. Alerts surface when evidence expires, controls drift or volumes exceed thresholds.',
        system: 'Platform / observability',
        executionMechanism: 'deterministic-automation',
        agentName: null,
        modelTier: null,
        isHumanGate: false,
        lod: null,
        activeEffort: 'Baseline in Phase 1',
        elapsedTime: 'Continuous'
      }
    ]
  }
];

var EXECUTION_MECHANISMS = [
  { id: 'human', label: 'Human', color: '#3456C5', description: 'Work performed entirely by a person. No automation or AI assistance.' },
  { id: 'deterministic-automation', label: 'Deterministic automation', color: '#059669', description: 'Rule-based or scripted execution. Outcome is fully predictable from inputs. No generative AI.' },
  { id: 'generative-ai', label: 'Generative AI', color: '#7A3EB1', description: 'An AI model produces a structured output - draft, summary, extraction or proposal - for human review.' },
  { id: 'agentic-execution', label: 'Agentic execution', color: '#B35000', description: 'An AI agent coordinates a multi-step task using tools, context and a goal. Returns a controlled output to the deterministic layer.' },
  { id: 'human-gate', label: 'Human gate', color: '#B30000', description: 'A named human must review and approve before the workflow proceeds. Cannot be bypassed.' }
];

var MODEL_TIERS = [
  { id: 'efficient', label: 'Efficient', description: 'Fast, cost-effective models for extraction, classification and structured summarisation.' },
  { id: 'reasoning', label: 'Reasoning', description: 'More capable models for complex mapping, drafting and multi-document analysis.' },
  { id: 'frontier', label: 'Frontier', description: 'Most capable models for ambiguous multi-step reasoning. Enterprise-approved contract required.' }
];
