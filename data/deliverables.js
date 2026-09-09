var DELIVERABLES = [
  {
    id: 'D01', name: 'Programme Mobilisation and Integrated Plan',
    executiveSummary: 'Establish governance, confirm leadership, build the integrated plan and stand up the delivery machine.',
    phaseId: 'phase-1', workstreamId: 'ws-1', accountableRoleId: 'programme-director',
    supportingRoleIds: ['pmo-lead','delivery-lead','business-analyst'],
    targetMonth: '2026-10', dependencies: [],
    definitionOfDone: [
      'Sponsor and Product Owner named',
      'Scope and governance agreed',
      'Integrated plan approved',
      'Programme backlog established',
      'RAID and decision processes operational'
    ],
    status: 'proposed', confidence: 'working-assumption',
    decisionRequired: 'Executive sponsor confirmation and Phase 1 funding approval'
  },
  {
    id: 'D02', name: 'Backup & Restore Scope and Baseline',
    executiveSummary: 'Define the precise scope, measure the current-state effort and establish the success baseline.',
    phaseId: 'phase-1', workstreamId: 'ws-2', accountableRoleId: 'compliance-lead',
    supportingRoleIds: ['control-wp-sme','br-domain-sme','business-analyst'],
    targetMonth: '2026-11', dependencies: ['D01'],
    definitionOfDone: [
      'Obligations, controls and Work Products agreed',
      'Applications and owners selected',
      'Current effort, cycle time and rework measured',
      'Evidence sources identified',
      'Success measures approved'
    ],
    status: 'proposed', confidence: 'working-assumption',
    decisionRequired: 'Pilot scope and application selection'
  },
  {
    id: 'D03', name: 'Target Architecture and Compliance Object Model',
    executiveSummary: 'Define the system boundaries, shared data model and integration contracts for the three hubs.',
    phaseId: 'phase-1', workstreamId: 'ws-5', accountableRoleId: 'solution-architect',
    supportingRoleIds: ['agentic-architect','integration-lead','security-architect'],
    targetMonth: '2026-12', dependencies: ['D01','D02'],
    definitionOfDone: [
      'System responsibilities agreed',
      'Target architecture approved',
      'Common identifiers defined',
      'Data and event contracts documented',
      'Security boundaries agreed'
    ],
    status: 'proposed', confidence: 'working-assumption',
    decisionRequired: 'System access and environment confirmation'
  },
  {
    id: 'D04', name: 'Compliance Design and Applicability Rules',
    executiveSummary: 'Translate obligation-to-control mapping into actionable applicability logic and evidence requirements.',
    phaseId: 'phase-1', workstreamId: 'ws-2', accountableRoleId: 'compliance-lead',
    supportingRoleIds: ['irm-sme','control-wp-sme','br-domain-sme'],
    targetMonth: '2026-12', dependencies: ['D02'],
    definitionOfDone: [
      'Obligation-to-control mapping approved',
      'Applicability logic agreed',
      'Human approval points confirmed',
      'Evidence requirements defined',
      'Exception rules documented'
    ],
    status: 'proposed', confidence: 'working-assumption'
  },
  {
    id: 'D05', name: 'Integrated Specialist Agent Set',
    executiveSummary: 'Build and deploy specialised AI agents for Compliance Hub, Product Hub and Reporting Hub.',
    phaseId: 'phase-1', workstreamId: 'ws-4', accountableRoleId: 'agentic-architect',
    supportingRoleIds: ['ai-engineer','compliance-lead','integration-lead'],
    targetMonth: '2027-01', dependencies: ['D03','D04'],
    definitionOfDone: [
      'Compliance Hub support implemented',
      'Product Hub support implemented',
      'Reporting Hub support implemented',
      'Prompts and tools version controlled',
      'Agent outputs are reviewable and traceable'
    ],
    status: 'proposed', confidence: 'working-assumption'
  },
  {
    id: 'D06', name: 'Governance, Security and Evaluation Framework',
    executiveSummary: 'Implement Human-in-the-Loop controls, security architecture and model-evaluation criteria.',
    phaseId: 'phase-1', workstreamId: 'ws-6', accountableRoleId: 'security-architect',
    supportingRoleIds: ['responsible-ai-lead','platform-engineer','qa-lead'],
    targetMonth: '2027-02', dependencies: ['D03','D05'],
    definitionOfDone: [
      'Human-in-the-Loop controls operational',
      'Segregation of duties defined',
      'Security review completed',
      'Model-evaluation criteria agreed',
      'Release and rollback controls tested'
    ],
    status: 'proposed', confidence: 'working-assumption'
  },
  {
    id: 'D07', name: 'End-to-End Orchestration and Case Management',
    executiveSummary: 'Build the shared case-state model and automate handovers between hubs.',
    phaseId: 'phase-2', workstreamId: 'ws-4', accountableRoleId: 'agentic-architect',
    supportingRoleIds: ['orchestration-engineer','integration-lead','platform-engineer'],
    targetMonth: '2027-06', dependencies: ['D05','D06'],
    definitionOfDone: [
      'Common case state operational',
      'Handovers automated',
      'Queues and ownership visible',
      'Exceptions and retries managed',
      'All actions auditable'
    ],
    status: 'proposed', confidence: 'working-assumption'
  },
  {
    id: 'D08', name: 'Evidence and Verification Automation',
    executiveSummary: 'Connect evidence sources, implement verification rules and establish evidence lineage.',
    phaseId: 'phase-2', workstreamId: 'ws-5', accountableRoleId: 'integration-lead',
    supportingRoleIds: ['evidence-automation-engineer','data-engineer','compliance-lead'],
    targetMonth: '2027-07', dependencies: ['D07','D04'],
    definitionOfDone: [
      'Evidence sources connected',
      'Verification rules implemented',
      'Evidence freshness checked',
      'Evidence lineage retained',
      'Failed verification initiates an exception'
    ],
    status: 'proposed', confidence: 'working-assumption'
  },
  {
    id: 'D09', name: 'Hub-to-Hub Compliance Flow',
    executiveSummary: 'Demonstrate end-to-end traceability from approved obligation to DDCR-reported compliance status.',
    phaseId: 'phase-2', workstreamId: 'ws-5', accountableRoleId: 'integration-lead',
    supportingRoleIds: ['compliance-hub-sme','product-hub-sme','reporting-hub-sme'],
    targetMonth: '2027-08', dependencies: ['D07','D08'],
    definitionOfDone: [
      'Approved obligation change enters the Compliance Hub',
      'Product Hub receives the required action',
      'Technical evidence is collected',
      'Reporting Hub reflects the supported compliance status',
      'End-to-end traceability is demonstrable'
    ],
    status: 'proposed', confidence: 'working-assumption'
  },
  {
    id: 'D10', name: 'Live Pilot and Adoption Release',
    executiveSummary: 'Execute real cases with trained pilot users; capture feedback and confirm operational readiness.',
    phaseId: 'phase-2', workstreamId: 'ws-3', accountableRoleId: 'om-lead',
    supportingRoleIds: ['training-lead','change-lead','pmo-lead'],
    targetMonth: '2027-09', dependencies: ['D09','D06'],
    definitionOfDone: [
      'Selected users trained',
      'Real or production-representative cases executed',
      'Support process operational',
      'User feedback captured',
      'Operational issues prioritised'
    ],
    status: 'proposed', confidence: 'working-assumption'
  },
  {
    id: 'D11', name: 'Measured Value Case',
    executiveSummary: 'Validate or recalibrate the 13.8% effort-reduction hypothesis with operational data.',
    phaseId: 'phase-3', workstreamId: 'ws-7', accountableRoleId: 'om-lead',
    supportingRoleIds: ['value-analyst','compliance-lead','pmo-lead'],
    targetMonth: '2028-01', dependencies: ['D10'],
    definitionOfDone: [
      'Before-and-after metrics available',
      'Effort, cycle time, rework and evidence quality assessed',
      '13.8% assumption validated or recalibrated with operational data',
      'Benefit-confidence level documented',
      'Scale economics agreed'
    ],
    status: 'proposed', confidence: 'working-assumption'
  },
  {
    id: 'D12', name: 'Compliance-as-a-Service v1 and Scale Blueprint',
    executiveSummary: 'Production service operational; reusable assets catalogued; next verticals funded and sequenced.',
    phaseId: 'phase-3', workstreamId: 'ws-7', accountableRoleId: 'om-lead',
    supportingRoleIds: ['programme-director','agentic-architect','integration-lead'],
    targetMonth: '2028-03', dependencies: ['D11','D07','D08'],
    definitionOfDone: [
      'Production service operational',
      'Reusable assets catalogued',
      'Onboarding playbook completed',
      'Next verticals prioritised',
      'Investment and rollout decision prepared'
    ],
    status: 'proposed', confidence: 'working-assumption',
    decisionRequired: 'Scale investment approval and next-vertical selection'
  }
];
