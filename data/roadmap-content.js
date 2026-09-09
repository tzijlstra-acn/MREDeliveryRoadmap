var ROADMAP_CONTENT = [
  {
    month: '2026-10', monthLabel: 'Oct 2026', phase: 'phase-1', monthIdx: 0,
    regulatoryPortfolio: {
      action: 'Establish 24-regulation inventory and confirm owners',
      output: 'Portfolio register, regulation owner map',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Define pilot scope: Backup and Restore DORA reference segment',
      output: 'Scope statement, obligation list draft',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Mobilise programme, confirm governance and access plan',
      output: 'Programme charter, governance cadence, environment access',
      pod: 'Programme Leadership'
    },
    userWorkflow: {
      action: 'Identify pilot users and map current compliance workflow',
      output: 'Stakeholder map, current-state workflow, pilot scope',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Identify evidence sources for Backup and Restore controls',
      output: 'Evidence source inventory, data access requirements',
      pod: 'Compliance Design'
    },
    coreOutput: 'Programme charter, portfolio register, scope statement',
    clientDecision: 'Confirm Executive Sponsor, Product Owner and Phase 1 funding'
  },
  {
    month: '2026-11', monthLabel: 'Nov 2026', phase: 'phase-1', monthIdx: 1,
    regulatoryPortfolio: {
      action: 'Complete DORA Backup and Restore obligation baseline',
      output: 'Obligation register, control list, Work Product definitions',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Map obligations to controls and define applicability logic',
      output: 'Obligation-to-control mapping, applicability rules draft',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Define target architecture and hub integration contracts',
      output: 'Architecture decision records, API contracts draft',
      pod: 'Architecture'
    },
    userWorkflow: {
      action: 'Measure current effort, cycle time and rework baseline',
      output: 'Baseline metrics: effort hours, cycle time, rework rate',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Survey evidence quality and access for priority controls',
      output: 'Evidence readiness assessment, gap list',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Obligation register, architecture decision records, baseline metrics',
    clientDecision: 'Confirm pilot applications and application owners'
  },
  {
    month: '2026-12', monthLabel: 'Dec 2026', phase: 'phase-1', monthIdx: 2,
    regulatoryPortfolio: {
      action: 'Finalise applicability rules for Backup and Restore scope',
      output: 'Approved applicability logic, exception criteria',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Complete compliance object model and data structure design',
      output: 'Canonical compliance object model, field definitions',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Finalise target architecture; confirm security boundaries',
      output: 'Approved target architecture, security design, data contracts',
      pod: 'Architecture'
    },
    userWorkflow: {
      action: 'Design changed user journey for Compliance Hub and Product Hub',
      output: 'To-be user journey, role responsibilities, change plan',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Design evidence ingestion model and verification rules',
      output: 'Evidence schema, verification logic, provenance requirements',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Approved target architecture, compliance object model, change plan',
    clientDecision: 'System access and environment confirmation'
  },
  {
    month: '2027-01', monthLabel: 'Jan 2027', phase: 'phase-1', monthIdx: 3,
    regulatoryPortfolio: {
      action: 'Load Backup and Restore obligations into compliance knowledge store',
      output: 'Regulation and obligation records in knowledge store',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Configure interpretation workflow and approval gates',
      output: 'Interpretation workflow, approval configuration, human-task setup',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Build specialist AI agents: Compliance Hub, Product Hub, Reporting Hub',
      output: 'Three specialist agents deployed, tools registered',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Begin pilot user onboarding and training design',
      output: 'Training materials draft, pilot user communications',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Build initial evidence connectors for priority backup data sources',
      output: 'Evidence connectors deployed, provenance tracking operational',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Three specialist agents, evidence connectors, knowledge store loaded',
    clientDecision: null
  },
  {
    month: '2027-02', monthLabel: 'Feb 2027', phase: 'phase-1', monthIdx: 4,
    regulatoryPortfolio: {
      action: 'Validate Backup and Restore configuration end to end',
      output: 'Configuration test results, issue log, remediation plan',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Run interpretation review cycle with Compliance and Legal',
      output: 'Approved interpretations, clarification log',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Implement Human-in-the-Loop controls, security review and evaluation framework',
      output: 'HITL controls operational, security sign-off, evaluation criteria agreed',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Train pilot users; test case execution in Compliance Hub',
      output: 'Trained pilot cohort, test case results, support escalation path',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Test evidence verification and exception handling',
      output: 'Verification results, exception queue operational, audit log confirmed',
      pod: 'Evidence and Data'
    },
    coreOutput: 'HITL controls, security sign-off, trained pilot cohort, verification tested',
    clientDecision: null
  },
  {
    month: '2027-03', monthLabel: 'Mar 2027', phase: 'phase-1', monthIdx: 5,
    regulatoryPortfolio: {
      action: 'Confirm Gate 1: Backup and Restore pilot complete',
      output: 'Gate 1 decision pack, phase-exit report',
      pod: 'Programme Leadership'
    },
    complianceContent: {
      action: 'Document approved interpretation and control configuration',
      output: 'Interpretation library, configuration baseline, reuse register',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Release integrated pilot; prepare Phase 2 architecture plan',
      output: 'Pilot release in production, Phase 2 architecture plan',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Capture pilot feedback; agree Phase 2 user adoption scope',
      output: 'Pilot feedback report, Phase 2 adoption plan',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Baseline evidence quality metrics; plan DDCR integration',
      output: 'Evidence quality baseline, DDCR integration scope',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Gate 1 decision pack, pilot release, Phase 2 plans approved',
    clientDecision: 'Gate 1 approval and Phase 2 funding confirmation'
  },
  {
    month: '2027-04', monthLabel: 'Apr 2027', phase: 'phase-2', monthIdx: 6,
    regulatoryPortfolio: {
      action: 'Begin Wave 1 regulation readiness assessment',
      output: 'Wave 1 regulation shortlist, readiness scores, gaps',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Design regulation onboarding method and quality gates',
      output: 'Onboarding playbook draft, quality gate criteria',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Build durable workflow engine and shared case-state model',
      output: 'Workflow engine deployed, case-state store, common case ID',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Design cross-hub case visibility and status surfacing',
      output: 'Status display design, hub integration specification',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Build exception queue and retry management',
      output: 'Exception queue operational, retry logic, escalation rules',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Workflow engine, case-state store, Wave 1 shortlist, onboarding playbook draft',
    clientDecision: 'Wave 1 regulation selection for onboarding factory scope'
  },
  {
    month: '2027-05', monthLabel: 'May 2027', phase: 'phase-2', monthIdx: 7,
    regulatoryPortfolio: {
      action: 'Confirm Wave 1 regulation selection; begin obligation mapping',
      output: 'Wave 1 obligation register, mapping initiated',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Build obligation-to-norm and control mapping for Wave 1',
      output: 'Mapping templates, structured obligation records',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Connect Compliance Hub, Product Hub and Reporting Hub via integration facade',
      output: 'Hub-to-hub integration operational, event routing confirmed',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Deploy shared case status in Product Hub and Compliance Hub',
      output: 'Case status visible in both hubs, user training updated',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Expand evidence connectors for Wave 1 regulations',
      output: 'Additional evidence sources connected and verified',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Hub integration live, shared case status, Wave 1 obligation mapping',
    clientDecision: null
  },
  {
    month: '2027-06', monthLabel: 'Jun 2027', phase: 'phase-2', monthIdx: 8,
    regulatoryPortfolio: {
      action: 'Complete applicability rules for Wave 1 regulations',
      output: 'Approved applicability logic per regulation',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Run interpretation review for Wave 1 obligation set',
      output: 'Approved interpretations, configuration records',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Complete end-to-end case orchestration and handovers',
      output: 'Automated handovers, owned queues, exception management',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Extend user training to Wave 1 regulation scope',
      output: 'Training update, user support model expanded',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Implement technical verification rules for Wave 1 evidence',
      output: 'Verification rules live, freshness checks, provenance retained',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Full orchestration, approved Wave 1 interpretations, verification rules',
    clientDecision: null
  },
  {
    month: '2027-07', monthLabel: 'Jul 2027', phase: 'phase-2', monthIdx: 9,
    regulatoryPortfolio: {
      action: 'Test Wave 1 configuration end to end; resolve mapping gaps',
      output: 'Test results, issue log, approved configuration',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Refine applicability assessment capability and automation',
      output: 'Applicability automation tested, edge cases resolved',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Automate evidence assembly and evidence package generation',
      output: 'Evidence packages automated, lineage confirmed',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Test Product Hub work-item delivery for Wave 1 scope',
      output: 'Work item delivery confirmed, notification model validated',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Connect RACE assessment preparation to evidence packages',
      output: 'Assessment draft capability, evidence traceability confirmed',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Evidence automation, RACE preparation, Wave 1 configuration approved',
    clientDecision: null
  },
  {
    month: '2027-08', monthLabel: 'Aug 2027', phase: 'phase-2', monthIdx: 10,
    regulatoryPortfolio: {
      action: 'Finalise onboarding factory and quality gates for Wave 1',
      output: 'Onboarding factory operational, throughput measured',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Document reusable configurations and mapping templates',
      output: 'Configuration library, reuse catalogue, template register',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Demonstrate hub-to-hub compliance flow end to end',
      output: 'End-to-end traceability: obligation to DDCR status',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Deploy Wave 1 adoption plan; onboard Wave 1 product and compliance teams',
      output: 'Wave 1 users onboarded, adoption metrics baseline',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Validate DDCR conformance status reporting for Wave 1',
      output: 'DDCR status linked to verified evidence, audit trail complete',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Onboarding factory, hub-to-hub flow, DDCR status, Wave 1 users live',
    clientDecision: null
  },
  {
    month: '2027-09', monthLabel: 'Sep 2027', phase: 'phase-2', monthIdx: 11,
    regulatoryPortfolio: {
      action: 'Confirm Gate 2: end-to-end proof complete, Wave 1 onboarded',
      output: 'Gate 2 decision pack, scale recommendation',
      pod: 'Programme Leadership'
    },
    complianceContent: {
      action: 'Agree Wave 2 regulation scope based on onboarding factory throughput',
      output: 'Wave 2 regulation shortlist, capacity plan',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Harden platform: performance, security and operational readiness',
      output: 'Performance baseline, security sign-off, operational runbook',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Execute live pilot with real cases across Wave 1 regulations',
      output: 'Live case results, user feedback, operational issues log',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Operational DDCR and RACE reporting for Wave 1; exception handling live',
      output: 'DDCR reporting operational, RACE evidence packages, exception queue managed',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Gate 2 decision pack, live pilot results, DDCR operational, Wave 2 scope agreed',
    clientDecision: 'Gate 2 approval: Wave 2 regulation selection and Phase 3 funding'
  },
  {
    month: '2027-10', monthLabel: 'Oct 2027', phase: 'phase-3', monthIdx: 12,
    regulatoryPortfolio: {
      action: 'Begin Wave 2 regulation onboarding via the factory',
      output: 'Wave 2 regulations in onboarding pipeline, progress tracked',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Load Wave 2 obligations and initiate interpretation review',
      output: 'Wave 2 obligation records, interpretation workflow active',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Scale platform capacity for multiple simultaneous regulation workstreams',
      output: 'Multi-regulation workflow capacity confirmed, isolation tested',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Design service catalogue and self-service onboarding request',
      output: 'Service catalogue draft, request intake process',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Establish operational monitoring and model quality dashboards',
      output: 'Monitoring dashboards, agent quality metrics, alert thresholds',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Wave 2 onboarding started, scale capacity, monitoring dashboards',
    clientDecision: null
  },
  {
    month: '2027-11', monthLabel: 'Nov 2027', phase: 'phase-3', monthIdx: 13,
    regulatoryPortfolio: {
      action: 'Complete Wave 2 regulation mapping and configuration',
      output: 'Wave 2 approved configurations, reuse assets catalogued',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Validate interpretation and applicability for Wave 2 scope',
      output: 'Approved interpretations, applicability confirmed',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Deploy service operations capability: incident, change, exception management',
      output: 'Service operations model operational, runbooks published',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Roll out Wave 2 user training and adoption communications',
      output: 'Wave 2 users trained, adoption communications distributed',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Configure evidence and DDCR reporting for Wave 2 regulations',
      output: 'Wave 2 evidence connectors, DDCR reporting extended',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Wave 2 configured, service operations live, Wave 2 users trained',
    clientDecision: null
  },
  {
    month: '2027-12', monthLabel: 'Dec 2027', phase: 'phase-3', monthIdx: 14,
    regulatoryPortfolio: {
      action: 'Go live with Wave 2 regulations; confirm throughput per regulation',
      output: 'Wave 2 live, onboarding time-per-regulation measured',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Harden onboarding factory with Wave 2 learnings',
      output: 'Updated playbook, improved templates, reduced onboarding effort',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Optimise agent performance and reduce model costs per regulation',
      output: 'Performance improvements, cost-per-regulation data',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Publish service catalogue and enable self-service onboarding requests',
      output: 'Service catalogue live, intake process operational',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Automate Wave 2 DDCR reporting and exception resolution',
      output: 'Automated DDCR reports, exception resolution metrics',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Wave 2 live, factory improved, service catalogue, automation extended',
    clientDecision: null
  },
  {
    month: '2028-01', monthLabel: 'Jan 2028', phase: 'phase-3', monthIdx: 15,
    regulatoryPortfolio: {
      action: 'Analyse Wave 2 onboarding economics; plan Wave 3 scope',
      output: 'Wave economics data, Wave 3 regulation shortlist',
      pod: 'Compliance Design'
    },
    complianceContent: {
      action: 'Validate 13.8% effort-reduction assumption with operational data',
      output: 'Before-and-after metrics, validated or recalibrated assumption',
      pod: 'Compliance Design'
    },
    platformIntegration: {
      action: 'Operate production service; address operational debt',
      output: 'Incident log, resolved debt items, reliability metrics',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Measure user adoption rates and capture satisfaction feedback',
      output: 'Adoption metrics, satisfaction score, improvement backlog',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Compile evidence quality and verification metrics across all active regulations',
      output: 'Cross-regulation evidence quality report, improvement recommendations',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Value measurement, Wave 3 plan, adoption metrics, operational health report',
    clientDecision: null
  },
  {
    month: '2028-02', monthLabel: 'Feb 2028', phase: 'phase-3', monthIdx: 16,
    regulatoryPortfolio: {
      action: 'Confirm remaining route to 24-regulation portfolio coverage',
      output: 'Portfolio coverage plan: waves, timing, dependencies',
      pod: 'Programme Leadership'
    },
    complianceContent: {
      action: 'Finalise Target Operating Model and service ownership',
      output: 'Approved TOM, RACI, decision rights, service catalogue',
      pod: 'Operating Model'
    },
    platformIntegration: {
      action: 'Complete BAU transition: handover runbooks, support model, escalation paths',
      output: 'BAU handover pack, support model live, training complete',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Execute BAU transition for all live user groups',
      output: 'BAU operations confirmed, BAU team operational',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Establish ongoing service levels for evidence quality and DDCR reporting',
      output: 'SLA baseline, performance targets, monitoring thresholds',
      pod: 'Evidence and Data'
    },
    coreOutput: 'TOM approved, BAU transition, SLA baseline, coverage route confirmed',
    clientDecision: null
  },
  {
    month: '2028-03', monthLabel: 'Mar 2028', phase: 'phase-3', monthIdx: 17,
    regulatoryPortfolio: {
      action: 'Confirm Gate 4: Agentic Compliance in live operation; scale decision',
      output: 'Gate 4 decision pack, scale investment recommendation',
      pod: 'Programme Leadership'
    },
    complianceContent: {
      action: 'Publish portfolio scale plan with remaining route to 24 regulations',
      output: 'Portfolio scale plan, wave roadmap, investment case',
      pod: 'Programme Leadership'
    },
    platformIntegration: {
      action: 'Publish Compliance-as-a-Service v1: reusable assets catalogued',
      output: 'CaaS v1 service pack, asset catalogue, onboarding guide',
      pod: 'AI and Engineering'
    },
    userWorkflow: {
      action: 'Document service adoption outcomes and user experience improvements',
      output: 'Adoption summary, UX improvement evidence, feedback captured',
      pod: 'Operating Model'
    },
    evidenceReporting: {
      action: 'Deliver measured value case and scale economics report',
      output: 'Value case, 13.8% validation status, wave economics, scale recommendation',
      pod: 'Evidence and Data'
    },
    coreOutput: 'Gate 4 decision pack, CaaS v1, portfolio scale plan, measured value case',
    clientDecision: 'Gate 4 approval: scale investment and next-vertical selection'
  }
];
