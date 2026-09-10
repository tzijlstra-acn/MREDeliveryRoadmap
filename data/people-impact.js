var GTRF_ROLES = [
  {
    id: 'pr-01',
    roleType: 'IT Governance Manager',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Framework ownership, governance reporting, policy maintenance',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'Policy drafting and framework gap analysis augmented by MITRA. Governance reporting automated from DDCR. Senior oversight retained.',
    skillsInDecay: ['Manual policy compilation', 'Point-in-time gap assessment'],
    skillsTransforming: ['AI output review', 'Governance framework design', 'Exception decision-making'],
    newSkillsRequired: ['AI assurance review', 'Prompt governance', 'Agent-output interpretation'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-02',
    roleType: 'IT Risk and Compliance Officer',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Control testing, compliance assessment, RACE and A-CART preparation',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'MITRA prepares assessment content and evidence packages. Human retains review, sign-off and accountability. Exception handling becomes the primary value-adding activity.',
    skillsInDecay: ['Manual evidence collation', 'Spreadsheet-based control tracking'],
    skillsTransforming: ['Evidence quality judgement', 'Control design', 'Regulatory interpretation oversight'],
    newSkillsRequired: ['AI evidence review', 'Agent output challenge', 'Digital audit trail management'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-03',
    roleType: 'Product and Application Manager',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Product-level compliance, Work Product ownership, DDCR maintenance',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'MAYA proposes Work Product updates and documentation drafts for human review. Product-level accountability remains with the human owner. Application compliance status visible in near-real-time via DDCR.',
    skillsInDecay: ['Manual DDCR update cycles', 'Point-in-time applicability review'],
    skillsTransforming: ['AI-proposed change review', 'Product compliance design', 'Escalation judgement'],
    newSkillsRequired: ['Work Product verification against AI proposals', 'DDCR digital governance'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-04',
    roleType: 'Audit and Assurance Manager',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Independent assurance, evidence review, audit trail validation',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'Automated evidence retrieval and continuous monitoring provide always-on audit-ready state. Assurance focus shifts from evidence collection to evidence quality challenge and exception investigation.',
    skillsInDecay: ['Point-in-time evidence sampling', 'Manual audit trail assembly'],
    skillsTransforming: ['Continuous assurance monitoring', 'AI evidence integrity review', 'Exception root-cause analysis'],
    newSkillsRequired: ['Digital audit trail interpretation', 'AI output challenge methodology'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-05',
    roleType: 'Regulatory Affairs Specialist',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Regulatory monitoring, obligation extraction, interpretation sign-off',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'MITRA monitors regulatory sources and extracts structured obligations. The specialist reviews, refines and approves interpretations. Regulatory expertise becomes more strategic and less manual.',
    skillsInDecay: ['Manual regulatory source monitoring', 'Ad hoc obligation extraction'],
    skillsTransforming: ['AI interpretation oversight', 'Regulatory strategy', 'Obligation framework design'],
    newSkillsRequired: ['AI-assisted regulatory monitoring tooling', 'Interpretation approval governance'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-06',
    roleType: 'Control Testing Specialist',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Control effectiveness testing, evidence collection, deficiency reporting',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'Automated evidence collection and technical verification handle the retrieval and check cycle. Specialist focuses on exception handling, deficiency root-cause and control design improvement.',
    skillsInDecay: ['Manual evidence retrieval', 'Repetitive control testing cycles'],
    skillsTransforming: ['Exception investigation', 'Control design', 'Deficiency remediation oversight'],
    newSkillsRequired: ['Automated evidence review', 'Digital verification workflow management'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-07',
    roleType: 'Data and Reporting Analyst (IT Risk)',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'DDCR maintenance, KRI production, management reporting',
    futureTaskOutcome: 'automated',
    taskShiftSummary: 'DDCR status updates automatically from verified evidence. KRI dashboards draw from the canonical object model in near-real-time. Reporting becomes continuous rather than periodic.',
    skillsInDecay: ['Periodic manual data assembly', 'Point-in-time reporting cycles'],
    skillsTransforming: ['Reporting quality assurance', 'KRI design', 'Exception narrative development'],
    newSkillsRequired: ['Real-time data governance', 'Automated reporting validation', 'Dashboard-to-decision communication'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-08',
    roleType: 'IT Policy Owner',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Policy lifecycle, norm ownership, control framework maintenance',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'MITRA proposes norm and control updates from approved obligation changes. Policy owners review and approve changes. Framework maintenance becomes more proactive and less reactive.',
    skillsInDecay: ['Manual norm update cycles', 'Ad hoc control gap tracking'],
    skillsTransforming: ['AI-proposed policy review', 'Control framework design', 'Obligation-to-norm governance'],
    newSkillsRequired: ['AI content review workflow', 'Canonical object model governance'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-09',
    roleType: 'Third Party Risk Manager',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Vendor and third-party obligation coverage, outsourcing framework compliance',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'Applicability assessment extended to third-party product landscape by MAYA. Third Party Risk Manager reviews coverage gaps and approves outsourcing-specific obligation mappings.',
    skillsInDecay: ['Manual third-party obligation tracking', 'Point-in-time outsourcing register updates'],
    skillsTransforming: ['Third-party AI output review', 'Outsourcing risk framework design'],
    newSkillsRequired: ['Extended applicability governance', 'AI-assisted third-party monitoring'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-10',
    roleType: 'Change and Release Manager (IT Governance)',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Change management, release governance, compliance clearance for changes',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'Work Product change proposals from MAYA integrate with existing SDLC and change management workflows. Change Manager reviews compliance clearance based on automated evidence retrieval.',
    skillsInDecay: ['Manual compliance clearance cycles', 'Ad hoc change-to-control mapping'],
    skillsTransforming: ['Automated change compliance review', 'Change risk assessment with AI support'],
    newSkillsRequired: ['Digital change governance', 'AI-proposed change evaluation'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-11',
    roleType: 'Security and Architecture Reviewer',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Security control review, architecture compliance, design pattern validation',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'Security-relevant Work Product proposals from MAYA include architecture and configuration recommendations for human review. Security reviewers focus on design quality and edge-case risk.',
    skillsInDecay: ['Repetitive security checklist cycles', 'Manual configuration review at scale'],
    skillsTransforming: ['AI-proposed configuration review', 'Security design authority', 'Edge-case risk identification'],
    newSkillsRequired: ['AI architecture output review', 'Responsible AI in security context'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-12',
    roleType: 'Programme and Portfolio Manager (IT Compliance)',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Compliance programme management, remediation tracking, portfolio reporting',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'DDCR provides continuous portfolio-level compliance status. Programme Manager uses near-real-time data for prioritisation, escalation and board reporting rather than periodic status collection cycles.',
    skillsInDecay: ['Periodic status collection cycles', 'Manual remediation tracking spreadsheets'],
    skillsTransforming: ['Real-time portfolio governance', 'Exception-driven remediation focus', 'AI-supported reporting'],
    newSkillsRequired: ['Digital programme governance', 'Continuous compliance portfolio interpretation'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-13',
    roleType: 'Business Relationship Manager (IT / Compliance)',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Business-IT liaison for compliance, demand management, stakeholder communication',
    futureTaskOutcome: 'retained',
    taskShiftSummary: 'Relationship management, stakeholder communication and business context interpretation remain primarily human. AI tools support compliance status briefing preparation but do not replace the relationship function.',
    skillsInDecay: [],
    skillsTransforming: ['Compliance status communication using AI-generated data'],
    newSkillsRequired: ['AI-assisted stakeholder briefing preparation'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis.'
  },
  {
    id: 'pr-14',
    roleType: 'Internal Controls Advisor (2nd LoD)',
    gtMarker: '[3]',
    fteInScope: 'Included in 2,864 FTE (working assumption)',
    primaryObligation: 'Second-line oversight, control environment challenge, authority matrix enforcement',
    futureTaskOutcome: 'augmented',
    taskShiftSummary: 'The 2nd LoD retains all human gate authority as defined in the authority matrix (AM-003 and related rules). AI cannot bypass the 2nd LoD gate. The advisor focuses on exception review, control environment quality and strategic oversight rather than routine evidence processing.',
    skillsInDecay: ['Routine evidence collation for oversight purposes'],
    skillsTransforming: ['AI-augmented control environment oversight', 'Exception and escalation focus', 'Strategic risk advisory'],
    newSkillsRequired: ['AI governance review', 'Human gate authority in agentic workflows', 'Responsible AI oversight'],
    qualifierNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis. 2nd LoD human gate authority is non-negotiable and cannot be automated.'
  }
];

var WORKFORCE_IMPACT_SUMMARY = {
  affectedRoleTypes: 14,
  affectedRoleTypesNote: 'Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis (Phase 1, December 2026).',
  fteInScope: 2864,
  fteInScopeNote: 'Working assumption, subject to GTRF validation. Do not use as a validated headcount figure.',
  capacityFreed: 396,
  capacityFreedNote: 'At base case 13.8%. Capacity freed, not automatic headcount reduction. Value realised through redeployment, avoided hiring or backfill reduction.',
  futureTaskOutcomeDistribution: {
    retained: 1,
    augmented: 11,
    automated: 1,
    agentExecuted: 0,
    retired: 0
  },
  outcomeNote: 'Future task outcome distribution is directional. Based on initial role assessment, subject to GTRF validation.',
  populationDisclaimer: 'All workforce figures are illustrative planning assumptions, not commercial estimates.'
};

var FUTURE_TASK_OUTCOME_TAXONOMY = [
  { id: 'retained', label: 'Retained', description: 'The task continues to be performed by a human with no material change to the approach. AI tools may provide minor support.', color: '#3456C5' },
  { id: 'augmented', label: 'Augmented', description: 'A human performs the task with AI assistance. AI drafts, extracts or proposes; the human reviews, decides and remains accountable.', color: '#059669' },
  { id: 'automated', label: 'Automated', description: 'The task is executed by deterministic automation or AI with minimal human involvement. Outputs are reviewed periodically rather than per-instance.', color: '#7A3EB1' },
  { id: 'agent-executed', label: 'Agent-executed', description: 'An AI agent performs the multi-step task end-to-end. A human gate precedes and follows where required by the authority matrix.', color: '#B35000' },
  { id: 'retired', label: 'Retired', description: 'The task becomes unnecessary as the capability matures. No human or AI resource required.', color: '#6B7280' }
];

// ES module export for Vite/React
export { GTRF_ROLES, WORKFORCE_IMPACT_SUMMARY };
