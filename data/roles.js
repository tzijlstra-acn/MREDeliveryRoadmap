var ROLES = [
  { id: 'exec-sponsor', title: 'Executive Sponsor', pod: 'pod-1', side: 'client',
    fte: { phase1: 0.1, phase2: 0.1, phase3: 0.1 }, priority: 'Day 1',
    mission: 'Accountable for the programme mandate, budget and regulatory positioning. Final decision authority for scope, investment and scale decisions.',
    skills: ['Executive stakeholder management','Regulatory accountability','Investment decisions'],
    deliverableIds: ['D01','D12'] },

  { id: 'product-owner', title: 'Agentic Compliance Product Owner', pod: 'pod-1', side: 'client',
    fte: { phase1: 0.5, phase2: 0.5, phase3: 0.5 }, priority: 'Day 1',
    mission: 'Owns the product vision, backlog and acceptance decisions. The primary bridge between business need and delivery.',
    skills: ['Product management','Agile delivery','Stakeholder alignment'],
    deliverableIds: ['D01','D02','D10'] },

  { id: 'programme-director', title: 'Programme Director', pod: 'pod-1', side: 'accenture',
    fte: { phase1: 1.0, phase2: 1.0, phase3: 1.0 }, priority: 'Day 1',
    mission: 'Leads integrated programme delivery, governance and phase-gate execution. Accountable for plan, RAID and steering materials.',
    skills: ['Large-scale transformation','Programme governance','Financial management','Executive reporting'],
    deliverableIds: ['D01','D11','D12'] },

  { id: 'delivery-lead', title: 'Delivery Lead', pod: 'pod-1', side: 'accenture',
    fte: { phase1: 1.0, phase2: 1.0, phase3: 0.75 }, priority: 'Day 1',
    mission: 'Manages day-to-day delivery, sprint cadence, dependencies and team throughput.',
    skills: ['Agile delivery','Dependency management','Team coaching'],
    deliverableIds: ['D01','D10'] },

  { id: 'pmo-lead', title: 'PMO Lead', pod: 'pod-1', side: 'accenture',
    fte: { phase1: 0.5, phase2: 0.5, phase3: 0.5 }, priority: 'Week 1',
    mission: 'Manages RAID, decisions, milestones and reporting cadence across the programme.',
    skills: ['Programme governance','RAID management','Reporting'],
    deliverableIds: ['D01'] },

  { id: 'business-analyst', title: 'Business Analyst', pod: 'pod-1', side: 'accenture',
    fte: { phase1: 1.0, phase2: 1.0, phase3: 0.5 }, priority: 'Week 1',
    mission: 'Translates business requirements into structured backlog items and acceptance criteria.',
    skills: ['Requirements analysis','Process mapping','Stakeholder facilitation'],
    deliverableIds: ['D02','D10'] },

  { id: 'compliance-lead', title: 'Regulatory Compliance Lead', pod: 'pod-2', side: 'accenture',
    fte: { phase1: 1.0, phase2: 1.0, phase3: 0.75 }, priority: 'Day 1',
    mission: 'Leads regulatory interpretation, obligation mapping and control design. Owns the compliance-scope decision.',
    skills: ['DORA and regulatory frameworks','NFR control frameworks','Norms and Work Products','A-CART and RACE'],
    deliverableIds: ['D02','D04','D09'] },

  { id: 'irm-sme', title: 'IRM / GCL Subject-Matter Expert', pod: 'pod-2', side: 'client',
    fte: { phase1: 0.3, phase2: 0.3, phase3: 0.2 }, priority: 'Week 2',
    mission: 'Provides regulatory and integrated risk-management expertise for control design and exception policy.',
    skills: ['Regulatory interpretation','Risk management','Control frameworks'],
    deliverableIds: ['D04'] },

  { id: 'control-wp-sme', title: 'Control and Work Product SME', pod: 'pod-2', side: 'shared',
    fte: { phase1: 0.5, phase2: 0.5, phase3: 0.25 }, priority: 'Week 2',
    mission: 'Defines Work Products, Control Activities and evidence requirements for the Backup & Restore scope.',
    skills: ['Control design','Work Product definition','Evidence criteria'],
    deliverableIds: ['D02','D04','D08'] },

  { id: 'br-domain-sme', title: 'Backup & Restore Domain SME', pod: 'pod-2', side: 'client',
    fte: { phase1: 0.5, phase2: 0.3, phase3: 0.1 }, priority: 'Week 2',
    mission: 'Provides deep Backup & Restore process knowledge for scope definition and applicability assessment.',
    skills: ['Backup & Restore processes','Application landscape','Evidence sources'],
    deliverableIds: ['D02','D04'] },

  { id: 'assurance-sme', title: 'Assurance / Audit SME', pod: 'pod-2', side: 'client',
    fte: { phase1: 0.2, phase2: 0.3, phase3: 0.3 }, priority: 'Month 2',
    mission: 'Confirms audit trail requirements and assurance standards for evidence lineage and reporting.',
    skills: ['Audit requirements','Evidence standards','RACE and DDCR'],
    deliverableIds: ['D06','D09'] },

  { id: 'solution-architect', title: 'Enterprise / Solution Architect', pod: 'pod-3', side: 'accenture',
    fte: { phase1: 1.0, phase2: 0.75, phase3: 0.5 }, priority: 'Day 1',
    mission: 'Defines target architecture, system responsibilities and integration contracts across the three hubs.',
    skills: ['Solution architecture','Event-driven architecture','System integration','API design'],
    deliverableIds: ['D03','D05','D07'] },

  { id: 'agentic-architect', title: 'Agentic AI Architect', pod: 'pod-3', side: 'accenture',
    fte: { phase1: 1.0, phase2: 1.0, phase3: 0.75 }, priority: 'Day 1',
    mission: 'Leads agent design, orchestration and model-evaluation framework. Accountable for the agentic capability.',
    skills: ['Agent architecture','Tool-using agents','Workflow orchestration','Prompt engineering','Human-in-the-Loop patterns'],
    deliverableIds: ['D05','D07','D12'] },

  { id: 'ai-engineer', title: 'AI / Agent Engineer', pod: 'pod-3', side: 'accenture',
    fte: { phase1: 2.0, phase2: 2.0, phase3: 1.5 }, priority: 'Month 1',
    mission: 'Implements agents, tools, prompts and the evaluation harness for each hub.',
    skills: ['Agent development','Prompt engineering','API integration','Model evaluation'],
    deliverableIds: ['D05','D07'] },

  { id: 'orchestration-engineer', title: 'Workflow / Orchestration Engineer', pod: 'pod-3', side: 'accenture',
    fte: { phase1: 0.5, phase2: 1.5, phase3: 1.0 }, priority: 'Month 2',
    mission: 'Builds and operates the orchestration layer, case-state model and event-driven handovers.',
    skills: ['Workflow orchestration','Event-driven systems','Case management'],
    deliverableIds: ['D07'] },

  { id: 'ux-designer', title: 'UX / Service Designer', pod: 'pod-3', side: 'accenture',
    fte: { phase1: 0.75, phase2: 0.5, phase3: 0.25 }, priority: 'Week 2',
    mission: 'Designs user journeys, Human-in-the-Loop interactions and the Product Hub workflow.',
    skills: ['Service design','User journey mapping','Interaction design','Accessibility'],
    deliverableIds: ['D10'] },

  { id: 'integration-lead', title: 'Integration Lead', pod: 'pod-4', side: 'accenture',
    fte: { phase1: 1.0, phase2: 1.0, phase3: 0.75 }, priority: 'Week 2',
    mission: 'Leads integration design and delivery across the three hubs and evidence sources.',
    skills: ['API design','Event integration','Data modelling','Integration testing'],
    deliverableIds: ['D03','D08','D09'] },

  { id: 'data-engineer', title: 'Data / Knowledge Engineer', pod: 'pod-4', side: 'accenture',
    fte: { phase1: 0.75, phase2: 1.0, phase3: 0.75 }, priority: 'Month 1',
    mission: 'Designs and implements the canonical data model, knowledge structures and traceability.',
    skills: ['Data modelling','Metadata and lineage','Knowledge engineering'],
    deliverableIds: ['D03','D08'] },

  { id: 'evidence-automation-engineer', title: 'Evidence Automation Engineer', pod: 'pod-4', side: 'accenture',
    fte: { phase1: 0.25, phase2: 1.5, phase3: 0.75 }, priority: 'Month 3',
    mission: 'Connects evidence sources, implements verification rules and establishes lineage.',
    skills: ['Evidence collection','Technical verification','Integration engineering'],
    deliverableIds: ['D08','D09'] },

  { id: 'compliance-hub-sme', title: 'Compliance Hub / OMA SME', pod: 'pod-4', side: 'client',
    fte: { phase1: 0.3, phase2: 0.3, phase3: 0.2 }, priority: 'Week 2',
    mission: 'Provides Compliance Hub / OMA system expertise for integration design and data access.',
    skills: ['Compliance Hub / OMA','Data access','Integration requirements'],
    deliverableIds: ['D03','D09'] },

  { id: 'product-hub-sme', title: 'Product Hub SME', pod: 'pod-4', side: 'client',
    fte: { phase1: 0.3, phase2: 0.3, phase3: 0.2 }, priority: 'Week 2',
    mission: 'Provides Product Hub system expertise for workflow integration and evidence preparation.',
    skills: ['Product Hub','Workflow design','Work Product management'],
    deliverableIds: ['D03','D09'] },

  { id: 'reporting-hub-sme', title: 'Reporting Hub / DDCR SME', pod: 'pod-4', side: 'client',
    fte: { phase1: 0.3, phase2: 0.3, phase3: 0.2 }, priority: 'Week 2',
    mission: 'Provides DDCR and RACE expertise for reporting integration and assurance evidence.',
    skills: ['Reporting Hub / DDCR','RACE reporting','Evidence assurance'],
    deliverableIds: ['D03','D09'] },

  { id: 'platform-engineer', title: 'Platform / DevSecOps Engineer', pod: 'pod-5', side: 'accenture',
    fte: { phase1: 0.75, phase2: 1.0, phase3: 1.0 }, priority: 'Month 1',
    mission: 'Manages delivery environments, CI/CD, secrets and infrastructure resilience.',
    skills: ['Cloud platform','CI/CD','Infrastructure as code','Secrets management'],
    deliverableIds: ['D06'] },

  { id: 'security-architect', title: 'Security Architect', pod: 'pod-5', side: 'accenture',
    fte: { phase1: 0.5, phase2: 0.5, phase3: 0.5 }, priority: 'Week 2',
    mission: 'Defines and reviews identity, access, data protection and security architecture.',
    skills: ['Security architecture','IAM','Data protection','Security testing'],
    deliverableIds: ['D03','D06'] },

  { id: 'responsible-ai-lead', title: 'Responsible AI / Model Risk Lead', pod: 'pod-5', side: 'accenture',
    fte: { phase1: 0.5, phase2: 0.5, phase3: 0.5 }, priority: 'Week 2',
    mission: 'Implements Responsible AI controls, model governance and auditability requirements.',
    skills: ['Responsible AI','Model risk','AI governance','Auditability'],
    deliverableIds: ['D06'] },

  { id: 'qa-lead', title: 'QA and Test Automation Lead', pod: 'pod-5', side: 'accenture',
    fte: { phase1: 0.75, phase2: 1.0, phase3: 0.5 }, priority: 'Month 2',
    mission: 'Leads functional, integration and security testing strategy and execution.',
    skills: ['Test automation','Integration testing','Security testing','Performance testing'],
    deliverableIds: ['D06','D10'] },

  { id: 'om-lead', title: 'Operating Model Lead', pod: 'pod-6', side: 'accenture',
    fte: { phase1: 0.5, phase2: 0.75, phase3: 1.0 }, priority: 'Month 2',
    mission: 'Designs the target operating model, service management and scale economics.',
    skills: ['Operating-model design','Service management','Business-case development'],
    deliverableIds: ['D10','D11','D12'] },

  { id: 'change-lead', title: 'Change and Adoption Lead', pod: 'pod-6', side: 'accenture',
    fte: { phase1: 0.25, phase2: 0.75, phase3: 0.5 }, priority: 'Month 2',
    mission: 'Manages user adoption, communications, training delivery and readiness assessment.',
    skills: ['Change management','Communications','Training delivery','Adoption measurement'],
    deliverableIds: ['D10'] },

  { id: 'training-lead', title: 'Training Lead', pod: 'pod-6', side: 'accenture',
    fte: { phase1: 0.25, phase2: 0.5, phase3: 0.25 }, priority: 'Month 3',
    mission: 'Designs and delivers training curricula for pilot users and ongoing BAU staff.',
    skills: ['Curriculum design','Training delivery','User enablement'],
    deliverableIds: ['D10'] },

  { id: 'value-analyst', title: 'Value Realisation Analyst', pod: 'pod-6', side: 'accenture',
    fte: { phase1: 0.25, phase2: 0.5, phase3: 0.5 }, priority: 'Month 2',
    mission: 'Designs and operates the value-measurement framework; produces the benefits tracker and scale economics.',
    skills: ['KPI design','Value measurement','Benefits tracking','Business-case modelling'],
    deliverableIds: ['D11','D12'] }
];

var PODS = [
  {
    id: 'pod-1', name: 'Programme Leadership & PMO', icon: 'ti-crown', color: '#3456C5',
    purpose: 'End-to-end programme governance, integrated planning and phase-gate execution.',
    roleIds: ['exec-sponsor','product-owner','programme-director','delivery-lead','pmo-lead','business-analyst'],
    fte: { phase1: 4.1, phase2: 4.1, phase3: 3.35 },
    skills: ['Large-scale transformation','Programme governance','Product management','Agile delivery','Executive stakeholder management','Financial and benefits management'],
    outputs: ['Programme charter','Integrated roadmap','Delivery backlog','Governance cadence','RAID and decisions','Steering materials','Phase gates']
  },
  {
    id: 'pod-2', name: 'Compliance & Control Design', icon: 'ti-shield-check', color: '#5C4FC5',
    purpose: 'Regulatory interpretation, obligation mapping, applicability rules and evidence design.',
    roleIds: ['compliance-lead','irm-sme','control-wp-sme','br-domain-sme','assurance-sme'],
    fte: { phase1: 2.5, phase2: 2.4, phase3: 1.6 },
    skills: ['DORA and regulatory frameworks','Regulatory interpretation','NFR control frameworks','Norms and Work Products','Applicability assessment','A-CART and RACE'],
    outputs: ['Compliance scope','Obligation-to-control mapping','Applicability rules','Control requirements','Evidence criteria','Exception and approval design']
  },
  {
    id: 'pod-3', name: 'Architecture & Agentic Engineering', icon: 'ti-cpu', color: '#7A3EB1',
    purpose: 'Target architecture, agent implementation, orchestration and user experience.',
    roleIds: ['solution-architect','agentic-architect','ai-engineer','orchestration-engineer','ux-designer'],
    fte: { phase1: 5.25, phase2: 5.75, phase3: 4.0 },
    skills: ['Agent architecture','Tool-using agents','Workflow orchestration','Prompt and context engineering','Human-in-the-Loop patterns','Model evaluation','Service and workflow design'],
    outputs: ['Target architecture','Agent catalogue','Agent implementations','Orchestration layer','Case-state model','User journeys','Evaluation harness']
  },
  {
    id: 'pod-4', name: 'Data, Integration & Evidence', icon: 'ti-database', color: '#059669',
    purpose: 'Hub integrations, canonical data model, evidence automation and traceability.',
    roleIds: ['integration-lead','data-engineer','evidence-automation-engineer','compliance-hub-sme','product-hub-sme','reporting-hub-sme'],
    fte: { phase1: 2.9, phase2: 4.4, phase3: 2.9 },
    skills: ['API and event integration','Data modelling','Metadata and lineage','Evidence collection','Technical control verification','Reporting integration'],
    outputs: ['Canonical data model','Integration contracts','Hub connectors','Evidence adapters','Verification rules','Traceability','DDCR and RACE flow']
  },
  {
    id: 'pod-5', name: 'Platform, Quality & Responsible AI', icon: 'ti-lock', color: '#D97706',
    purpose: 'Delivery environments, security, model governance, testing and production readiness.',
    roleIds: ['platform-engineer','security-architect','responsible-ai-lead','qa-lead'],
    fte: { phase1: 2.5, phase2: 3.0, phase3: 2.5 },
    skills: ['Cloud platform engineering','CI/CD','IAM and secrets','Security testing','Model-risk controls','AI observability','Functional and integration testing'],
    outputs: ['Delivery environments','Deployment pipeline','Security controls','Test strategy','Evaluation results','Monitoring','Production-readiness approval']
  },
  {
    id: 'pod-6', name: 'Operating Model, Change & Value', icon: 'ti-chart-arrows', color: '#DC2626',
    purpose: 'Operating model design, user adoption, training, value measurement and scale economics.',
    roleIds: ['om-lead','change-lead','training-lead','value-analyst'],
    fte: { phase1: 1.25, phase2: 2.5, phase3: 2.25 },
    skills: ['Operating-model design','Organisational change','Service management','Communications and training','Value measurement','KPI design','Business-case development'],
    outputs: ['Target operating model','RACI','BAU support model','Training and adoption','Benefits tracker','Workforce implications','Scale business case']
  }
];
