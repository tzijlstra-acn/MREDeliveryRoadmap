var WORKSTREAMS = [
  {
    id: 'ws-1', name: 'Programme & Product Delivery', shortName: 'Programme', icon: 'ti-layout-kanban',
    color: '#3456C5', purpose: 'End-to-end programme governance, planning, backlog management and phase-gate execution.',
    operatingModelDimension: ['organisation-processes', 'value-management'],
    executionMechanism: 'human',
    lead: 'Programme Director', phases: ['phase-1','phase-2','phase-3'],
    deliverableIds: ['D01'],
    activities: [
      'Programme mobilisation',
      'Integrated planning',
      'Product backlog management',
      'Budget and resource management',
      'Governance and reporting',
      'Milestone and dependency management',
      'Phase-gate preparation'
    ],
    coreDeliverables: [
      'Programme charter',
      'Integrated delivery plan',
      'Governance structure',
      'Product Roadmap and backlog',
      'RAID log',
      'Decision log',
      'Dependency plan',
      'Monthly steering pack',
      'Phase-gate recommendations'
    ]
  },
  {
    id: 'ws-2', name: 'Compliance & Control Engineering', shortName: 'Compliance', icon: 'ti-shield-check',
    color: '#5C4FC5', purpose: 'Regulatory interpretation, obligation mapping, applicability rules and control acceptance criteria.',
    operatingModelDimension: ['technology-platforms', 'organisation-processes'],
    executionMechanism: 'generative-ai',
    lead: 'Regulatory Compliance Lead', phases: ['phase-1','phase-2','phase-3'],
    deliverableIds: ['D02','D04'],
    activities: [
      'Regulatory interpretation',
      'Framework impact assessment',
      'Obligation and control mapping',
      'Applicability assessment',
      'Work Product definition',
      'Control acceptance criteria',
      'Exception policy'
    ],
    coreDeliverables: [
      'Approved use-case scope',
      'Obligation-to-control mapping',
      'Applicable Norms and Work Products',
      'Applicability rules',
      'Control-automation backlog',
      'Evidence requirements',
      'Decision and approval matrix'
    ]
  },
  {
    id: 'ws-3', name: 'Process & Product Experience', shortName: 'Process & UX', icon: 'ti-sitemap',
    color: '#0891B2', purpose: 'End-to-end user journeys, Product Hub workflow design, human approvals and service design.',
    operatingModelDimension: ['organisation-processes', 'people'],
    executionMechanism: 'human',
    lead: 'UX / Service Designer', phases: ['phase-1','phase-2','phase-3'],
    deliverableIds: ['D10'],
    activities: [
      'End-to-end user journey mapping',
      'Product Hub workflow design',
      'Case ownership definition',
      'Human approval gate design',
      'Evidence preparation flows',
      'Exception handling design',
      'Service design'
    ],
    coreDeliverables: [
      'Current and target process maps',
      'Product and assessor journeys',
      'Product Hub workflow design',
      'Human-in-the-Loop design',
      'Exception and escalation process',
      'User acceptance criteria',
      'Training and adoption assets'
    ]
  },
  {
    id: 'ws-4', name: 'Agentic AI & Orchestration', shortName: 'AI & Orchestration', icon: 'ti-brain',
    color: '#7A3EB1', purpose: 'Specialised agents, orchestration design, case-state management and model evaluation.',
    operatingModelDimension: ['technology-platforms'],
    executionMechanism: 'agentic-execution',
    lead: 'Agentic AI Architect', phases: ['phase-1','phase-2','phase-3'],
    deliverableIds: ['D05','D07'],
    activities: [
      'Specialised agent design and build',
      'Tools and prompt engineering',
      'Workflow orchestration',
      'Case-state management',
      'Human handover design',
      'Confidence and materiality rules',
      'Model evaluation and governance'
    ],
    coreDeliverables: [
      'Agent catalogue',
      'Agent responsibility matrix',
      'Agent prompts and tool definitions',
      'Orchestration design',
      'Case-state and event model',
      'Model-evaluation framework',
      'Fallback and escalation patterns'
    ]
  },
  {
    id: 'ws-5', name: 'Data, Integration & Evidence', shortName: 'Data & Integration', icon: 'ti-database',
    color: '#059669', purpose: 'Hub integrations, canonical data model, evidence automation and traceability.',
    operatingModelDimension: ['technology-platforms'],
    executionMechanism: 'deterministic-automation',
    lead: 'Integration Lead', phases: ['phase-1','phase-2','phase-3'],
    deliverableIds: ['D03','D08','D09'],
    activities: [
      'Compliance Hub integration',
      'Product Hub integration',
      'Reporting Hub and DDCR integration',
      'Canonical object model design',
      'Data quality management'
    ],
    coreDeliverables: [
      'Common data and case model',
      'API and event contracts',
      'System connectors',
      'Evidence-source adapters',
      'Technical verification rules',
      'Evidence-lineage model',
      'DDCR and RACE integration'
    ]
  },
  {
    id: 'ws-6', name: 'Platform, Security & Responsible AI', shortName: 'Platform & Security', icon: 'ti-lock',
    color: '#D97706', purpose: 'Agent runtime, cloud platform, access control, observability, model governance and release controls.',
    operatingModelDimension: ['technology-platforms'],
    executionMechanism: 'deterministic-automation',
    lead: 'Platform / DevSecOps Engineer', phases: ['phase-1','phase-2','phase-3'],
    deliverableIds: ['D06'],
    activities: [
      'Agent runtime management',
      'Cloud and platform services',
      'Access control and IAM',
      'Secrets and data protection',
      'Observability and monitoring',
      'Model governance',
      'Auditability',
      'Release and rollback controls'
    ],
    coreDeliverables: [
      'Platform architecture',
      'Security architecture',
      'Identity and access model',
      'Audit-log design',
      'Responsible AI controls',
      'Deployment pipelines',
      'Operational monitoring',
      'Non-functional test results'
    ]
  },
  {
    id: 'ws-7', name: 'Operating Model, Adoption & Value', shortName: 'Operating Model', icon: 'ti-chart-arrows',
    color: '#DC2626', purpose: 'Roles, service ownership, BAU support, change management, value measurement and scale economics.',
    operatingModelDimension: ['people', 'value-management', 'organisation-processes'],
    executionMechanism: 'human',
    lead: 'Operating Model Lead', phases: ['phase-1','phase-2','phase-3'],
    deliverableIds: ['D11','D12'],
    activities: [
      'Roles and accountabilities design',
      'Service ownership definition',
      'BAU support model',
      'Change and adoption management',
      'Value measurement',
      'Workforce impact assessment',
      'Scale economics modelling'
    ],
    coreDeliverables: [
      'Target operating model',
      'RACI',
      'Service-management model',
      'Operating procedures',
      'Training and communications',
      'Value baseline and benefits dashboard',
      'Scale business case'
    ]
  },
  {
    id: 'ws-8',
    shortName: 'EVR',
    name: 'Evidence, Verification and Reporting',
    icon: 'ti-certificate',
    color: '#059669',
    purpose: 'Prove that regulatory requirements are implemented and remain fulfilled through automated evidence, technical verification and conformance reporting.',
    operatingModelDimension: ['technology-platforms', 'value-management'],
    executionMechanism: 'deterministic-automation',
    lead: 'Evidence and Verification Lead',
    phases: ['phase-2', 'phase-3'],
    activities: [
      'Design and implement evidence collection connectors',
      'Establish evidence provenance and lineage tracking',
      'Implement technical verification patterns',
      'Integrate verified evidence with DDCR',
      'Support RACE and A-CART assessment preparation',
      'Operate exception handling for failed verification',
      'Catalogue reusable evidence and verification components'
    ],
    coreDeliverables: ['D12 Evidence and Verification Connector Library', 'D13 DDCR and RACE Reporting Integration'],
    deliverableIds: ['D12', 'D13']
  }
];
