var GLOSSARY = [
  {
    id: 'gl-01', term: 'Agentic Compliance',
    definition: 'The UC3 programme model in which specialist AI agents automate regulatory interpretation, applicability assessment, and evidence collection while humans retain decision authority at defined gate points.'
  },
  {
    id: 'gl-02', term: 'Backup and Restore',
    definition: 'The DORA reference segment selected as the proof-of-mechanism vertical for Phase 1. One specific obligation set within the DORA regulation, not a standalone regulation.'
  },
  {
    id: 'gl-03', term: 'Compliance Hub / OMA',
    definition: 'Existing Munich Re system that manages regulatory obligations, control mappings and the applicability rules engine. Remains the primary user experience for compliance and legal functions.'
  },
  {
    id: 'gl-04', term: 'Product Hub',
    definition: 'Existing Munich Re system that manages product documentation, Work Products and the assessment and review workflow. MAYA provides bounded AI assistance here.'
  },
  {
    id: 'gl-05', term: 'Reporting Hub / DDCR',
    definition: 'Existing Munich Re system that provides RACE assessment preparation, DDCR conformance reporting, and evidence assurance. The final compliance and assurance view.'
  },
  {
    id: 'gl-06', term: 'DDCR',
    definition: 'Digital Compliance Control Register. The authoritative conformance status system. DDCR status is the proof of compliance, not merely a report.'
  },
  {
    id: 'gl-07', term: 'Control Activity',
    definition: 'A defined action or process control that fulfils an internal obligation derived from a regulatory norm. The unit of automation within the obligation chain.'
  },
  {
    id: 'gl-08', term: 'Work Product',
    definition: 'A specific output or artefact required to demonstrate conformance with a control obligation. Managed through the Product Hub and verified against the DDCR.'
  },
  {
    id: 'gl-09', term: 'Human-in-the-Loop',
    definition: 'A mandatory human approval step at defined points in an automated process. All regulatory judgements, risk acceptances and formal decisions remain human responsibilities.'
  },
  {
    id: 'gl-10', term: 'MITRA',
    definition: 'Provisionally assigned name for the specialist agent operating within the Compliance Hub. Responsible for regulatory analysis, policy and control gap analysis.'
  },
  {
    id: 'gl-11', term: 'MAYA',
    definition: 'Provisionally assigned name for the specialist agent operating within the Product Hub. Responsible for work-product analysis, documentation updates and proposed product remediation.'
  },
  {
    id: 'gl-12', term: 'Regulatory Onboarding Factory',
    definition: 'The reusable process and tooling that enables additional regulations to be onboarded to the Agentic Compliance platform without bespoke engineering work for each one.'
  },
  {
    id: 'gl-13', term: 'Compliance as a Service',
    definition: 'The target operating model for Phase 3 in which regulatory compliance support is delivered as a repeatable, evidence-based shared service across the Munich Re portfolio.'
  },
  {
    id: 'gl-14', term: 'North Star',
    definition: 'The 24-regulation portfolio target that the Agentic Compliance platform is designed to reach. Full North Star coverage extends beyond the 18-month delivery roadmap.'
  },
  {
    id: 'gl-15', term: 'DORA reference segment',
    definition: 'The specific DORA obligation selected as the Phase 1 proof point: Backup and Restore. DORA contains multiple obligation sets; UC3 Phase 1 proves the pattern on one segment only.'
  },
  {
    id: 'gl-16', term: '13.8%',
    definition: 'Directional working assumption for capacity freed within the affected UC3 scope (14 GTRF role types, 2,864 FTE). Derived from four bridge components. To be validated through operational pilot at Gate 2.'
  },
  {
    id: 'gl-17', term: 'Bridge components',
    definition: 'The four multiplicative factors that produce the 13.8% net figure: A=55% direct efficiency, B=31% addressable work, C=85% coverage, D=95% realisation.'
  },
  {
    id: 'gl-18', term: 'Obligation chain',
    definition: 'The authoritative backbone sequence: External Obligation to Internal Obligation to Capability to Norm to Control Activity to Work Product to Fulfilment Data to Assurance.'
  },
  {
    id: 'gl-19', term: 'Deterministic automation',
    definition: 'Process steps executed by code following explicit rules with no model inference. State management, routing, approvals and audit events are owned by deterministic processes, not AI agents.'
  },
  {
    id: 'gl-20', term: 'Agentic execution',
    definition: 'Process steps where an AI agent reasons over a task, uses tools, and produces a structured output for human or system review. Never owns official process state.'
  },
  {
    id: 'gl-21', term: 'RACE',
    definition: 'Risk and Control Environment. The Munich Re framework for structured risk assessment preparation that feeds into the DDCR conformance reporting process.'
  },
  {
    id: 'gl-22', term: 'Purple Plus',
    definition: 'The Accenture transformation programme of which UC3 is one of three flagship use cases. The three use cases cover build (UC1 Agentic SDLC), run (UC2 Agentic IT Operations) and govern (UC3 Agentic Compliance).'
  },
  {
    id: 'gl-23', term: 'Tokenomics',
    definition: 'The model inference cost management framework covering model tier routing (efficient / general reasoning / escalation), cost per run tracking, and governance of model usage approvals.'
  },
  {
    id: 'gl-24', term: 'GTRF',
    definition: 'Group Technology Risk and Finance (or equivalent). The organisational function responsible for IT compliance and risk roles within Munich Re. The primary affected workforce population for UC3.'
  },
  {
    id: 'gl-25', term: 'Wave',
    definition: 'A group of regulations onboarded together onto the Agentic Compliance platform. Wave 1 contains DORA (Backup and Restore reference). Wave 2 onwards: decision required at Gate 2.'
  }
];
