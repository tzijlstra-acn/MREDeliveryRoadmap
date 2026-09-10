var ADDONS = [
  {
    id: 'A', letter: 'A', title: 'Compliance Vertical Prioritisation',
    classification: 'recommended', classLabel: 'Recommended accelerator', timing: 'Month 10+',
    operatingModelDimension: ['value-management', 'organisation-processes'],
    purpose: 'A scoring matrix to prioritise future compliance verticals based on regulatory importance, manual effort, data readiness and reuse potential.',
    value: 'Ensures the highest-value verticals are sequenced next, supported by evidence rather than opinion.',
    dependencies: ['D12 - Scale Blueprint', 'Gate 2 assessment data'],
    additionalRoles: ['Operating Model Lead', 'Compliance Lead', 'Value Realisation Analyst'],
    detail: ['Regulatory importance weighting','Current manual effort estimate','Repeatability and standardisation assessment','Data availability score','Technical verifiability rating','Affected application count','Exception rate history','Reuse potential from Backup and Restore pattern']
  },
  {
    id: 'B', letter: 'B', title: 'Application Onboarding Factory',
    classification: 'recommended', classLabel: 'Recommended accelerator', timing: 'Phase 3',
    operatingModelDimension: ['product-service-portfolio', 'technology-platforms'],
    purpose: 'A repeatable onboarding process enabling additional applications to join the Backup and Restore vertical with minimum engineering effort.',
    value: 'Transforms one-off integration work into a scalable onboarding capability.',
    dependencies: ['D12 - Scale Blueprint', 'D03 - Architecture'],
    additionalRoles: ['Integration Lead', 'Data Engineer', 'Business Analyst'],
    detail: ['Application eligibility check','Data readiness assessment','Ownership confirmation','Applicability assessment','Evidence-source connection','User training','Go-live','Benefits tracking']
  },
  {
    id: 'C', letter: 'C', title: 'Control Automation Asset Library',
    classification: 'recommended', classLabel: 'Recommended accelerator', timing: 'Phase 3',
    operatingModelDimension: ['technology-platforms', 'product-service-portfolio'],
    purpose: 'A catalogued library of reusable agents, prompts, orchestration components and evidence adapters applicable to new compliance verticals.',
    value: 'Reduces the engineering effort for each additional vertical by reusing proven components.',
    dependencies: ['D05 - Agent Set', 'D07 - Orchestration', 'D08 - Evidence'],
    additionalRoles: ['Agentic AI Architect', 'Integration Lead'],
    detail: ['Regulatory interpretation patterns','Applicability rules','Agent tools and prompts','Orchestration components','Evidence adapters','Technical verification rules','DDCR integration components','Test packs','Operating procedures']
  },
  {
    id: 'D', letter: 'D', title: 'Value and Benefits Cockpit',
    classification: 'recommended', classLabel: 'Recommended accelerator', timing: 'Phase 2+',
    operatingModelDimension: ['value-management'],
    purpose: 'A live benefits dashboard tracking effort, cycle time, rework, evidence quality and adoption against the directional 13.8% hypothesis.',
    value: 'Makes programme value visible to sponsors and provides the evidence base for the scale business case.',
    dependencies: ['D11 - Measured Value Case', 'Baseline established in D02'],
    additionalRoles: ['Value Realisation Analyst', 'Operating Model Lead'],
    detail: ['Active effort in FTE hours','Elapsed cycle time','Handover event count','Rework rate','Evidence completeness','Assessment throughput','Compliance lag','Exception volumes','Adoption rate','Service cost per case']
  },
  {
    id: 'E', letter: 'E', title: 'Responsible AI and Audit Pack',
    classification: 'recommended', classLabel: 'Recommended accelerator', timing: 'Phase 1+',
    operatingModelDimension: ['technology-platforms', 'organisation-processes'],
    purpose: 'A structured Responsible AI governance pack covering agent inventory, model governance, Human-in-the-Loop requirements and audit evidence.',
    value: 'Provides regulators, auditors and senior stakeholders with verifiable assurance on AI use.',
    dependencies: ['D06 - Governance Framework'],
    additionalRoles: ['Responsible AI / Model Risk Lead', 'Security Architect', 'Assurance SME'],
    detail: ['Agent inventory','Model and tool inventory','Approved-use boundaries','Human-in-the-Loop requirements','Access and data controls','Evaluation criteria','Monitoring approach','Incident response','Audit evidence package','Change history']
  },
  {
    id: 'F', letter: 'F', title: 'Workforce and Adoption Pack',
    classification: 'optional', classLabel: 'Optional extension', timing: 'Phase 2+',
    operatingModelDimension: ['people', 'organisation-processes'],
    purpose: 'A structured programme covering role-impact assessment, training paths, new service roles and Works Council considerations where applicable.',
    value: 'Ensures workforce readiness and manages the human side of the transition to agentic compliance support.',
    dependencies: ['D10 - Adoption Release', 'Target Operating Model'],
    additionalRoles: ['Change and Adoption Lead', 'Training Lead', 'Workforce / Works Council SME'],
    detail: ['Role-impact assessment','Training paths by role','New service roles definition','Communications plan','Adoption measurement','Works Council considerations where applicable','Transition to BAU']
  },
  {
    id: 'G', letter: 'G', title: 'Additional Compliance Vertical - Priority A',
    classification: 'optional', classLabel: 'Optional extension', timing: 'Phase 3+',
    operatingModelDimension: ['product-service-portfolio'],
    purpose: 'Onboard the highest-scoring next compliance vertical identified at Gate 2, reusing the Backup and Restore implementation pattern.',
    value: 'Demonstrates that the Compliance-as-a-Service model scales beyond the initial vertical.',
    dependencies: ['D12 - Scale Blueprint', 'Add-on A scoring matrix', 'Gate 2 approval'],
    additionalRoles: ['Relevant Domain SME', 'Integration Lead', 'Compliance Lead'],
    note: 'Vertical identity to be confirmed at Gate 2. Not committed in Phase 1.'
  },
  {
    id: 'H', letter: 'H', title: 'Additional Compliance Vertical - Priority B',
    classification: 'optional', classLabel: 'Optional extension', timing: 'Beyond Month 18',
    operatingModelDimension: ['product-service-portfolio'],
    purpose: 'Onboard the second-priority compliance vertical following validation of Priority A.',
    value: 'Extends the asset base and builds further evidence for the enterprise scale business case.',
    dependencies: ['Add-on G - Priority Vertical A', 'Scale business case approval'],
    additionalRoles: ['Relevant Domain SME', 'Integration Lead'],
    note: 'Timing and vertical identity to be confirmed at Gate 3.'
  },
  {
    id: 'I', letter: 'I', title: 'SDLC Agent Layer Integration',
    classification: 'optional', classLabel: 'Optional extension', timing: 'Beyond Month 18',
    operatingModelDimension: ['technology-platforms'],
    purpose: 'Extend the compliance agent capability into the software delivery lifecycle so that compliance requirements are surfaced to engineering teams during development.',
    value: 'Moves compliance left into design and build, reducing late-stage remediation effort.',
    dependencies: ['D12 - Scale Blueprint', 'SDLC tooling access confirmation'],
    additionalRoles: ['Platform / DevSecOps Engineer', 'Agentic AI Architect'],
    note: 'North Star horizon item. Not in the initial 18-month delivery scope.'
  },
  {
    id: 'J', letter: 'J', title: 'Continuous Compliance Monitoring',
    classification: 'optional', classLabel: 'Optional extension', timing: 'Beyond Month 18',
    operatingModelDimension: ['technology-platforms', 'value-management'],
    purpose: 'Implement near-real-time compliance monitoring across the production vertical, surfacing drift, exceptions and emerging gaps automatically.',
    value: 'Transforms compliance from a periodic assessment to a continuous, evidence-based view.',
    dependencies: ['D09 - Hub-to-Hub Flow', 'D12 - Scale Blueprint'],
    additionalRoles: ['Platform / DevSecOps Engineer', 'Responsible AI / Model Risk Lead'],
    note: 'North Star horizon item. Requires an operational vertical as foundation.'
  }
];
