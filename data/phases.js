var PHASES = [
  {
    id: 'as-is', name: 'As-Is', label: 'Siloed Support', color: '#6B7280',
    start: null, end: '2026-09-30',
    tagline: 'AI support is siloed; manual handovers dominate',
    objective: 'Existing landscape. Three capability hubs in operation. AI assistance is bounded to individual systems. Human handovers remain manual and context is not shared across systems.',
    operatingModel: 'Human-led with bounded AI assistance in Product Hub',
    technicalChange: 'No shared case model; systems operate independently',
    outcome: 'Validated North Star and approved implementation scope'
  },
  {
    id: 'phase-1', name: 'Phase 1', label: 'Integrate', color: '#3456C5',
    northStarStage: 'stage-1-automate',
    northStarStageLabel: 'Stage 1: Automate',
    start: '2026-10-01', end: '2027-03-31',
    tagline: 'Put AI support where the compliance work happens',
    months: ['2026-10','2026-11','2026-12','2027-01','2027-02','2027-03'],
    objective: 'Mobilise the implementation and introduce specialised AI support across Compliance Hub, Product Hub and Reporting Hub while retaining human-led handovers.',
    operatingModel: 'Human-led with specialist AI augmentation in each hub',
    technicalChange: 'Shared identifiers, agent tooling per hub, initial system connectors',
    outcome: 'Integrated pilot release; controlled Backup and Restore cases executed',
    gate: {
      id: 'gate-1', name: 'Integrated Pilot Gate', month: '2027-03',
      criteria: [
        'All three hubs support the selected Backup & Restore process',
        'A consistent case identifier and context are maintained',
        'Human approvals and audit trails work',
        'Pilot users can complete selected cases',
        'Data and integration gaps are documented',
        'Phase 2 scope and funding are confirmed'
      ]
    },
    workPackages: [
      {
        month: '2026-10', title: 'Mobilise',
        activities: [
          'Confirm executive sponsor, Product Owner and programme leadership',
          'Establish governance, delivery cadence and decision rights',
          'Lock the initial obligations, controls, Control Activities and Work Products',
          'Select the participating applications and Product Teams',
          'Confirm system owners and access requirements',
          'Establish the initial programme backlog'
        ]
      },
      {
        month: '2026-11', title: 'Baseline and Design',
        activities: [
          'Map current effort, cycle time, rework, handovers and evidence requests',
          'Document the current end-to-end Backup & Restore process',
          'Define the target process and human approval gates',
          'Confirm baseline KPIs and pilot success measures',
          'Complete the system and data-access assessment'
        ]
      },
      {
        month: '2026-12', title: 'Architecture and Control Design',
        activities: [
          'Define the target solution architecture',
          'Define the canonical compliance case and object model',
          'Specify system responsibilities and data ownership',
          'Define applicability rules and control acceptance criteria',
          'Confirm identity, access, audit and data-protection requirements'
        ]
      },
      {
        month: '2027-01', title: 'Build Specialist AI Support',
        activities: [
          'Implement Compliance Hub regulatory and framework support',
          'Extend Product Hub documentation and Work Product support',
          'Implement Reporting Hub evidence and assessment support',
          'Establish the prompt, tool, evaluation and release-management approach',
          'Build the first system connectors and integration services'
        ]
      },
      {
        month: '2027-02', title: 'Test and Govern',
        activities: [
          'Conduct functional, integration, security and model-evaluation testing',
          'Validate Human-in-the-Loop controls',
          'Test traceability from requirement to evidence',
          'Test error, exception and fallback scenarios',
          'Train the initial pilot users'
        ]
      },
      {
        month: '2027-03', title: 'Integrated Pilot Release',
        activities: [
          'Execute controlled Backup & Restore cases',
          'Capture operational feedback',
          'Compare initial performance against the baseline',
          'Confirm readiness for automated orchestration',
          'Complete the Phase 1 gate'
        ]
      }
    ]
  },
  {
    id: 'phase-2', name: 'Phase 2', label: 'Orchestrate', color: '#5C4FC5',
    northStarStage: 'stage-2-orchestrate',
    northStarStageLabel: 'Stage 2: Orchestrate',
    start: '2027-04-01', end: '2027-09-30',
    tagline: 'Connect the obligation-to-evidence chain',
    months: ['2027-04','2027-05','2027-06','2027-07','2027-08','2027-09'],
    objective: 'Automate handovers, evidence flow, status progression and exception routing across the complete Backup & Restore compliance process.',
    operatingModel: 'Automated orchestration with human approval gates and exception routing',
    technicalChange: 'Shared case-state model, event-driven handovers, evidence automation',
    outcome: 'End-to-end Backup & Restore cases run; value measured; scale gate passed',
    gate: {
      id: 'gate-2', name: 'End-to-End Proof Gate', month: '2027-09',
      criteria: [
        'Selected Backup & Restore cases run end to end',
        'System handovers are automated',
        'Human approvals and exceptions are traceable',
        'Evidence supports the reported compliance status',
        'Operational value is measured',
        'Production-hardening priorities are agreed'
      ]
    },
    workPackages: [
      {
        month: '2027-04', title: 'Orchestration Foundation',
        activities: [
          'Implement the end-to-end case-state model',
          'Build event-driven handovers between the hubs',
          'Introduce shared workflow queues and case ownership',
          'Define retry, timeout, escalation and fallback patterns',
          'Add role-based human approval gates'
        ]
      },
      {
        month: '2027-06', title: 'Applicability and Control Flow',
        activities: [
          'Operationalise applicability rules',
          'Trigger product and application impact assessments',
          'Generate structured findings and remediation actions',
          'Link obligations, controls, Work Products and affected applications'
        ]
      },
      {
        month: '2027-07', title: 'Evidence and Verification',
        activities: [
          'Connect relevant technical evidence sources',
          'Automate evidence collection where possible',
          'Validate evidence freshness, ownership and completeness',
          'Implement technical verification rules',
          'Establish end-to-end evidence lineage'
        ]
      },
      {
        month: '2027-08', title: 'Reporting and Assurance',
        activities: [
          'Integrate verified evidence into Reporting Hub and DDCR',
          'Support RACE and assessment preparation',
          'Automate status suggestions while retaining accountable approval',
          'Implement exception, risk-acceptance and overdue-action flows'
        ]
      },
      {
        month: '2027-09', title: 'Run and Prove',
        activities: [
          'Execute live or production-representative cases',
          'Measure effort, elapsed time, rework and evidence quality',
          'Test the target operating model',
          'Produce the measured value report',
          'Complete the Phase 2 scale gate'
        ]
      }
    ]
  },
  {
    id: 'phase-3', name: 'Phase 3', label: 'Industrialise', color: '#7A3EB1',
    northStarStage: 'stage-3-transform',
    northStarStageLabel: 'Stage 3: Transform (extends beyond Month 18)',
    start: '2027-10-01', end: '2028-03-31',
    tagline: 'Operate compliance as a reusable service',
    months: ['2027-10','2027-11','2027-12','2028-01','2028-02','2028-03'],
    objective: 'Production-harden the capability, establish the live operating model and package the implementation as a reusable Compliance-as-a-Service vertical.',
    operatingModel: 'Governed service with defined SLAs, support model and onboarding factory',
    technicalChange: 'Production-grade resilience, observability, reusable asset library',
    outcome: 'Compliance-as-a-Service v1 operational; scale business case approved',
    gate: {
      id: 'gate-3', name: 'Scale Gate', month: '2028-03',
      criteria: [
        'Backup & Restore is operational as a governed service',
        'The solution is supportable and auditable',
        'Reusable assets are documented and owned',
        'Scale economics are evidence based',
        'The next verticals and rollout waves are approved',
        'Compliance-as-a-Service v1 is ready for expansion'
      ]
    },
    workPackages: [
      {
        month: '2027-10', title: 'Production Hardening',
        activities: [
          'Implement resilience, observability, monitoring and operational controls',
          'Harden identity, secrets, access and data handling',
          'Establish agent-performance and model-quality monitoring',
          'Complete non-functional and audit-readiness testing',
          'Resolve material pilot defects and technical debt'
        ]
      },
      {
        month: '2027-12', title: 'Service Establishment',
        activities: [
          'Define the Compliance-as-a-Service product and service catalogue',
          'Confirm Product Owner, Service Owner and system responsibilities',
          'Define support, incident, change and release processes',
          'Establish service levels, control monitoring and management reporting',
          'Complete operating procedures and training materials'
        ]
      },
      {
        month: '2028-01', title: 'Reusable Vertical Pattern',
        activities: [
          'Package reusable compliance objects, agents, workflows and integration patterns',
          'Create a repeatable vertical-onboarding methodology',
          'Build an application-onboarding and data-readiness checklist',
          'Establish the controls-automation asset library'
        ]
      },
      {
        month: '2028-02', title: 'Selective Expansion',
        activities: [
          'Score future compliance verticals by value and readiness',
          'Select one or two next verticals',
          'Reuse the Backup & Restore pattern where appropriate',
          'Refine the effort and cost-to-scale model'
        ]
      },
      {
        month: '2028-03', title: 'Scale Decision',
        activities: [
          'Confirm measured value and lessons learned',
          'Produce the industrialisation business case',
          'Define the next rollout waves',
          'Confirm workforce and sourcing requirements',
          'Secure the executive funding and scale decision'
        ]
      }
    ]
  }
];
