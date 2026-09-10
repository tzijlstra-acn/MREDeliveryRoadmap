var GOVERNANCE_FORUMS = [
  {
    id: 'gf-1', name: 'Weekly Delivery Review', cadence: 'Weekly', icon: 'ti-calendar-week',
    lead: 'Delivery Lead',
    participants: ['Delivery Lead','PMO Lead','Workstream Leads','Business Analyst'],
    purpose: 'Track sprint progress, blockers, dependencies and upcoming milestones. Surface impediments early.'
  },
  {
    id: 'gf-2', name: 'Fortnightly Product & Architecture Review', cadence: 'Fortnightly', icon: 'ti-building',
    lead: 'Agentic Compliance Product Owner',
    participants: ['Product Owner','Solution Architect','Agentic AI Architect','Compliance Lead'],
    purpose: 'Review backlog prioritisation, architecture decisions and integration dependencies. Ensure product direction stays aligned.'
  },
  {
    id: 'gf-3', name: 'Monthly Steering Committee', cadence: 'Monthly', icon: 'ti-crown',
    lead: 'Executive Sponsor',
    participants: ['Executive Sponsor','Programme Director','Product Owner','Compliance Lead','Operating Model Lead'],
    purpose: 'Programme status, investment decisions, risk escalation and phase-gate approval. The primary sponsor decision forum.'
  },
  {
    id: 'gf-4', name: 'Monthly Value & Benefits Review', cadence: 'Monthly', icon: 'ti-chart-bar',
    lead: 'Operating Model Lead',
    participants: ['Operating Model Lead','Value Realisation Analyst','Product Owner','Programme Director'],
    purpose: 'Track value realisation, KPI performance and benefits-measurement approach. Feed into scale business case.'
  },
  {
    id: 'gf-5', name: 'Phase-Gate Review', cadence: 'Months 6, 12, 18', icon: 'ti-flag',
    lead: 'Executive Sponsor',
    participants: ['Executive Sponsor','Programme Director','Product Owner','All Workstream Leads','Assurance SME'],
    purpose: 'Formal gate assessment against defined exit criteria. Approve continuation and confirm next-phase scope and funding.'
  },
  {
    id: 'gf-6', name: 'Ad Hoc Risk & Decision Forum', cadence: 'As required', icon: 'ti-alert-triangle',
    lead: 'Programme Director',
    participants: ['Programme Director','Relevant Workstream Leads','Security Architect','Compliance Lead'],
    purpose: 'Address regulatory, security or material risk decisions outside the standard cadence. Prevents decisions becoming blockers.'
  },
  {
    id: 'gf-7',
    name: 'Regulation Wave Readiness Review',
    icon: 'ti-checklist',
    cadence: 'Per wave, approximately monthly during Phase 2 and Phase 3',
    lead: 'Regulatory Coverage Lead',
    participants: 'Regulation Leads, SMEs, Data and Evidence owners, QA Lead',
    purpose: 'Confirm that each regulation meets the readiness criteria to enter the onboarding factory and progress through quality gates.',
    agenda: ['Source document availability', 'Interpretation and mapping progress', 'Owner and SME availability', 'Data and evidence readiness', 'System access and dependencies', 'Testing and release readiness']
  }
];

var STAGE_GATES = [
  {
    id: 'G0', name: 'Gate 0: Mobilisation Approved', month: '2026-10', phase: 'phase-1',
    criteria: ['Executive Sponsor confirmed and active', 'Agentic Compliance Product Owner named', 'Phase 1 funding formally approved', 'Core team mobilisation authorised', 'Programme governance established'],
    approvers: ['Executive Sponsor', 'Programme Director'],
    decisionOptions: ['Approve and mobilise', 'Defer pending funding decision', 'Reject']
  },
  {
    id: 'G1', name: 'Gate 1: Foundation Design Approved', month: '2026-12', phase: 'phase-1',
    criteria: ['Canonical compliance object model approved', 'Target architecture approved', 'Governance cadence operating', 'System access plan confirmed', '24-regulation portfolio inventory established (partial)'],
    approvers: ['Executive Sponsor', 'IT Compliance Lead', 'Solution Architect'],
    decisionOptions: ['Approve and continue Phase 1 build', 'Conditionally approve with documented gaps', 'Return for rework']
  },
  {
    id: 'G2', name: 'Gate 2: Reference Scenario Proven', month: '2027-03', phase: 'phase-1',
    criteria: ['Backup and Restore works end to end across all three hubs', 'Human approvals and audit trail are operational', 'Evidence supports DDCR conformance status', 'Baseline and actual measurements exist', 'First regulatory wave is proposed and approved', 'Phase 2 funding decided'],
    approvers: ['Executive Sponsor', 'Steering Committee'],
    decisionOptions: ['Approve Phase 2 and Wave 1', 'Approve Phase 2 with revised wave scope', 'Return for additional proof']
  },
  {
    id: 'G3', name: 'Gate 3: Regulatory Factory Operational', month: '2027-09', phase: 'phase-2',
    criteria: ['Hub-to-hub orchestration is automated and operational', 'Regulatory onboarding factory has been used for at least one regulation', 'Service controls are operating', 'Exception handling is operational', 'Value evidence is available and reviewed', 'Phase 3 scale approach approved'],
    approvers: ['Executive Sponsor', 'Steering Committee'],
    decisionOptions: ['Approve Phase 3 scale plan', 'Approve Phase 3 with revised wave scope', 'Return for factory validation']
  },
  {
    id: 'G4', name: 'Gate 4: Scale Decision', month: '2028-03', phase: 'phase-3',
    criteria: ['Production-grade service is operational', 'Status of all 24 regulations is transparent', 'Reusable components are proven and catalogued', 'Remaining path to full portfolio coverage is defined and costed', 'Value case has been validated or recalibrated', 'Next-wave investment is approved'],
    approvers: ['Executive Sponsor', 'Steering Committee', 'CIO or equivalent'],
    decisionOptions: ['Approve full portfolio scale investment', 'Approve phased extension', 'Pause and review']
  }
];

var DECISIONS = [
  {
    id: 'DEC-01', title: 'Executive Sponsor Confirmation', category: 'Governance', status: 'decision-required',
    owner: 'Client', due: '2026-09',
    description: 'Name and confirm the executive sponsor with mandate and investment authority for the 18-month programme.'
  },
  {
    id: 'DEC-02', title: 'Phase 1 Funding Approval', category: 'Investment', status: 'decision-required',
    owner: 'Client', due: '2026-09',
    description: 'Approve the Phase 1 budget to mobilise delivery and confirm the Accenture engagement terms.'
  },
  {
    id: 'DEC-03', title: 'Pilot Scope and Application Selection', category: 'Scope', status: 'decision-required',
    owner: 'Shared', due: '2026-10',
    description: 'Confirm the Backup & Restore obligations, applications, Product Teams and participating users for the Phase 1 pilot.'
  },
  {
    id: 'DEC-04', title: 'System and Environment Access', category: 'Technical', status: 'decision-required',
    owner: 'Client', due: '2026-10',
    description: 'Confirm access to Compliance Hub, Product Hub, Reporting Hub/DDCR and relevant evidence sources for the delivery team.'
  },
  {
    id: 'DEC-05', title: 'Phase 2 Funding and Scale Ambition', category: 'Investment', status: 'to-confirm',
    owner: 'Client', due: '2027-03',
    description: 'Approve Phase 2 budget and confirm scale ambition based on Phase 1 gate assessment and measured value.'
  }
];

var RISKS = [
  {
    id: 'R-01', category: 'Risk', title: 'System access delays block architecture and build',
    probability: 'Medium', impact: 'High', owner: 'Client', status: 'open',
    mitigation: 'Confirm access requirements in Month 1. Escalate to Executive Sponsor if not resolved by November 2026.', due: '2026-11'
  },
  {
    id: 'R-02', category: 'Risk', title: 'Scope creep beyond the Backup & Restore vertical',
    probability: 'Medium', impact: 'High', owner: 'Programme Director', status: 'open',
    mitigation: 'Enforce scope lock through Product Owner approval process. Change requests require gate-review impact assessment.', due: 'Ongoing'
  },
  {
    id: 'R-03', category: 'Risk', title: 'Evidence-source data quality below threshold',
    probability: 'High', impact: 'Medium', owner: 'Integration Lead', status: 'open',
    mitigation: 'Baseline data quality in Month 2. Define minimum quality threshold before evidence automation build.', due: '2026-11'
  },
  {
    id: 'A-01', category: 'Assumption', title: 'Existing hubs remain systems of record throughout',
    probability: null, impact: null, owner: 'Solution Architect', status: 'open',
    mitigation: 'Validate system responsibilities in architecture workshop during Month 2.', due: '2026-11'
  },
  {
    id: 'A-02', category: 'Assumption', title: 'Phase 1 begins October 2026 as planned',
    probability: null, impact: null, owner: 'Programme Director', status: 'open',
    mitigation: 'Confirm mobilisation date and funding approval before September 2026.', due: '2026-09'
  },
  {
    id: 'I-01', category: 'Issue', title: 'Implementation not yet mobilised: sponsor and funding outstanding',
    probability: null, impact: 'High', owner: 'Executive Sponsor', status: 'open',
    mitigation: 'Executive sponsor and funding decision required before October 2026 start.', due: '2026-09'
  },
  {
    id: 'D-01', category: 'Dependency', title: 'Client system access required for hub integrations',
    probability: null, impact: 'High', owner: 'Client', status: 'open',
    mitigation: 'Access provisioning must be complete by December 2026 for architecture build to proceed.', due: '2026-12'
  },
  {
    id: 'D-02', category: 'Dependency', title: 'Regulatory clarity on applicability rules from IRM / GCL',
    probability: null, impact: 'High', owner: 'Compliance Lead', status: 'open',
    mitigation: 'IRM / GCL sign-off required on applicability logic before Build phase in January 2027.', due: '2027-01'
  },
  {
    id: 'R-06', category: 'Risk', title: 'Regulatory SME availability constrains wave throughput',
    probability: 'Medium', impact: 'High', owner: 'Regulatory Coverage Lead', status: 'open',
    mitigation: 'Map SME availability to wave plan early. Build structured interpretation templates to reduce SME time per regulation.', due: '2027-01'
  },
  {
    id: 'R-04', category: 'Risk', title: 'Evidence source connectivity requires longer than planned',
    probability: 'Medium', impact: 'Medium', owner: 'Evidence and Verification Lead', status: 'open',
    mitigation: 'Inventory evidence sources in Phase 1 and identify blockers early. Prioritise Wave 1 sources.', due: '2027-02'
  },
  {
    id: 'A-03', category: 'Assumption', title: 'At least one additional regulation is ready for Wave 2',
    probability: null, impact: null, owner: 'Regulatory Coverage Lead', status: 'open',
    mitigation: 'Complete portfolio inventory by November 2026. Confirm Wave 2 candidate at Gate 2.', due: '2027-01'
  },
  {
    id: 'D-03', category: 'Dependency', title: 'DDCR integration requires access to current DDCR data model',
    probability: null, impact: 'High', owner: 'DDCR Specialist', status: 'open',
    mitigation: 'Confirm DDCR data model access by December 2026 as part of architecture approval.', due: '2026-12'
  },
  {
    id: 'D-04', category: 'Dependency', title: '24-regulation inventory requires input from Compliance and Legal owners',
    probability: null, impact: 'High', owner: 'Regulatory Coverage Lead', status: 'open',
    mitigation: 'Engage Compliance and Legal leads in October 2026 as part of programme mobilisation.', due: '2026-11'
  },
  {
    id: 'R-05', category: 'Risk', title: 'Agent evaluation framework not agreed before agent build begins',
    probability: 'Low', impact: 'High', owner: 'Responsible AI Lead', status: 'open',
    mitigation: 'Include evaluation framework in architecture approval Gate 1 criteria.', due: '2026-12'
  }
];

// ES module export for Vite/React
export { GOVERNANCE_FORUMS, DECISIONS, RISKS, STAGE_GATES };
