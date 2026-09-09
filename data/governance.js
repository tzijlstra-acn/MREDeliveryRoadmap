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
  }
];
