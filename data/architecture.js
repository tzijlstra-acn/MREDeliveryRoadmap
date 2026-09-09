var ARCH_LAYERS = [
  {
    id: 'layer-1', order: 1, name: 'Existing user experiences',
    description: 'Users stay in their existing systems. No new portal is required.',
    components: ['Compliance Hub / OMA', 'Product Hub', 'Reporting Hub / DDCR', 'Engineering and SDLC tools', 'Existing assessment and collaboration tools'],
    isNew: false, layer: 'experience',
    constraint: null,
    note: 'Existing hubs remain the primary user interface. Agentic Compliance surfaces information into them via the integration facade.'
  },
  {
    id: 'layer-2', order: 2, name: 'Integration facade',
    description: 'Controlled, validated access layer between existing systems and the new agentic capability.',
    components: ['APIs and event adapters', 'System connectors', 'Identity propagation', 'Common case ID', 'Request and response validation', 'API management and throttling'],
    isNew: true, layer: 'integration',
    constraint: 'Write via supported APIs and events only. No direct database writes to source systems.',
    note: null
  },
  {
    id: 'layer-3', order: 3, name: 'Workflow and case orchestration',
    description: 'Owns process state. Deterministic. Does not delegate state decisions to an LLM.',
    components: ['Durable workflow engine', 'Case-state store', 'Human-task service', 'Retries, timeouts and exception queues', 'Event routing', 'Status synchronisation', 'Audit event emission'],
    isNew: true, layer: 'workflow',
    constraint: 'This layer owns official business process state. LLM outputs are inputs to decisions here, not state themselves.',
    note: null
  },
  {
    id: 'layer-4', order: 4, name: 'Agent runtime',
    description: 'Bounded, governed task execution. Agents return controlled outputs to Layer 3.',
    components: ['Specialist agent execution', 'Tool and prompt registry', 'Model routing and versioning', 'Structured output enforcement', 'Confidence scoring and escalation', 'Evaluation and quality management'],
    isNew: true, layer: 'agent',
    constraint: 'Agents do not independently approve interpretations or change official compliance status.',
    note: null
  },
  {
    id: 'layer-5', order: 5, name: 'Compliance knowledge and rules',
    description: 'Regulation store, canonical object model, approved mappings, applicability rules and reusable configurations.',
    components: ['Regulation and obligation store', 'Canonical compliance object model', 'Mappings to norms, controls and Work Products', 'Applicability rules', 'Source citations and version history', 'Approved interpretation status', 'Reusable regulation configurations'],
    isNew: true, layer: 'knowledge',
    constraint: null,
    note: 'Reuse existing GRC tooling for regulation inventory where possible. The object model layer is always new.'
  },
  {
    id: 'layer-6', order: 6, name: 'Evidence and verification',
    description: 'Evidence ingestion, provenance, freshness checking, technical verification, and DDCR output.',
    components: ['Source-system connectors (Tier 2 and Tier 3)', 'Evidence ingestion and provenance', 'Technical verification rules', 'Evidence package assembly', 'Exception generation and tracking', 'DDCR and RACE output', 'Evidence quality monitoring'],
    isNew: true, layer: 'evidence',
    constraint: null,
    note: null
  },
  {
    id: 'layer-7', order: 7, name: 'Platform control',
    description: 'Enterprise-grade security, identity, observability and deployment underpinning all layers.',
    components: ['Enterprise identity and service accounts', 'Encryption and access control', 'Policy enforcement', 'Immutable audit logs', 'Model and agent performance monitoring', 'Deployment pipelines', 'Backup and recoverability'],
    isNew: false, layer: 'platform',
    constraint: null,
    note: 'Reuse existing enterprise platform capabilities first. Avoid net-new infrastructure where not justified by a confirmed gap.'
  }
];

var ARCH_EVOLUTION = [
  {
    area: 'User interface',
    today: 'Separate system experiences; compliance status assembled manually across systems',
    phase1: 'AI assistance embedded in Compliance Hub and Product Hub for Backup and Restore scope',
    phase2: 'Shared case status visible in existing hubs; handovers automated across hub boundaries',
    phase3: 'Consistent Compliance-as-a-Service experience across all live regulations'
  },
  {
    area: 'Integration',
    today: 'Point-to-point integrations; no shared case identity; manual status reconciliation',
    phase1: 'Integration facade designed and prototyped for Backup and Restore pilot scope',
    phase2: 'Integration facade live for Compliance Hub, Product Hub and Reporting Hub; common case ID',
    phase3: 'Integration facade extended to Wave 2 and Wave 3 regulations; connector library reusable'
  },
  {
    area: 'Process control',
    today: 'Manual case tracking; no durable state; approvals managed in email and spreadsheets',
    phase1: 'Approval gates and human-task model designed; pilot workflow tested manually',
    phase2: 'Durable workflow engine live; automated handovers; retries and exception queues',
    phase3: 'Full case orchestration at scale; exception-driven operations; BAU service operations'
  },
  {
    area: 'Agent capability',
    today: 'No specialist AI agents; LLM use is ad hoc and ungoverned',
    phase1: 'Three specialist agents deployed (Compliance Hub, Product Hub, Reporting Hub); governed prompts',
    phase2: 'Agents extended for applicability, evidence assembly and DDCR preparation; evaluation live',
    phase3: 'Agent runtime at scale; multi-regulation support; cost-per-regulation economics understood'
  },
  {
    area: 'Knowledge',
    today: 'Regulations stored in documents and email; no canonical object model',
    phase1: 'Backup and Restore obligations in knowledge store; compliance object model defined',
    phase2: 'Wave 1 regulations loaded; interpretation approval workflow; reusable configuration library',
    phase3: 'Onboarding factory operational; knowledge store covers Wave 1 and Wave 2 regulations'
  },
  {
    area: 'Evidence',
    today: 'Evidence assembled manually from multiple systems; no provenance; freshness unknown',
    phase1: 'Priority evidence sources connected for Backup and Restore; provenance tracked',
    phase2: 'Automated evidence assembly; verification rules live; DDCR status linked to evidence',
    phase3: 'Evidence connector library reusable; DDCR reporting operational across all live regulations'
  },
  {
    area: 'Operations',
    today: 'No defined operating model for AI-assisted compliance; no service levels',
    phase1: 'Security and Responsible AI controls live; evaluation framework agreed',
    phase2: 'Monitoring dashboards; agent quality metrics; exception management; support model draft',
    phase3: 'Full service operations: incident management, change control, SLAs, BAU team trained'
  }
];

var APP_TIERS = [
  {
    id: 'tier-0', name: 'Tier 0: Central evidence only',
    description: 'No change to the application. Compliance evidence comes from central sources already available: Product Hub data, central backup-system reporting, enterprise inventory or central monitoring.',
    applicationChange: 'None required',
    suitableWhen: 'Central systems already provide sufficient evidence to prove the control without application-level data',
    examples: ['Backup platform centralised reporting', 'CMDB or enterprise inventory', 'Central network or security monitoring'],
    effort: 'Minimal  -  configuration of central evidence sources only',
    default: true
  },
  {
    id: 'tier-1', name: 'Tier 1: Metadata and applicability only',
    description: 'The application provides metadata to confirm applicability. No technical integration connector is required. Data is provided through a form, registry update or structured submission.',
    applicationChange: 'Provide: application ID, owner, criticality classification, platform, service classification, applicable regulations',
    suitableWhen: 'Applicability must be confirmed at application level but all evidence can be sourced from central systems',
    examples: ['Application registry update with regulation applicability', 'Owner confirmation via structured form', 'Business criticality attestation'],
    effort: 'Low  -  data collection and registry update',
    default: true
  },
  {
    id: 'tier-2', name: 'Tier 2: Read-only evidence integration',
    description: 'The agent reads approved evidence from the application or its supporting platform. The agent cannot modify the application. All access is read-only via approved APIs or data exports.',
    applicationChange: 'Open read access to approved evidence endpoints or data exports; register evidence source in connector library',
    suitableWhen: 'Control evidence exists in a source system with a supported API or data export, but is not available centrally',
    examples: ['Backup system API for backup job results', 'CI/CD pipeline result exports', 'Cloud platform compliance metrics', 'Monitoring system API'],
    effort: 'Moderate  -  connector build and evidence schema mapping',
    default: false
  },
  {
    id: 'tier-3', name: 'Tier 3: Controlled implementation integration',
    description: 'Used only when compliance specifically requires a technical change to the application or platform configuration. Every proposed change requires: policy checks, human approval, change traceability, post-change verification and rollback capability.',
    applicationChange: 'SDLC agent raises a merge request, platform config request, or approved automation trigger  -  all subject to existing change management processes',
    suitableWhen: 'Compliance requires a change to the application or platform and central or read-only evidence cannot prove the control',
    examples: ['Controlled configuration change routed through change management', 'SDLC merge request with compliance tag and approval gate', 'Platform parameter update with verification test'],
    effort: 'High  -  change management integration, approval workflow, verification test',
    default: false
  }
];

var APP_ONBOARDING_STEPS = [
  { step: 1, action: 'Identify application in Product Hub or enterprise CMDB', detail: 'Confirm the application record exists with a valid application ID, owner and platform classification. Create or update the record if missing.' },
  { step: 2, action: 'Confirm Product Team owner and Product Team lead', detail: 'Identify the accountable Product Team. Confirm the Product Team lead who will receive compliance work items and approve evidence requirements.' },
  { step: 3, action: 'Assess data and evidence readiness', detail: 'Review what evidence exists for the applicable controls. Identify evidence source systems, data quality and access method. Score evidence readiness.' },
  { step: 4, action: 'Determine applicability: which regulations and controls apply', detail: 'Run the applicability assessment. For each active regulation, determine which obligations and controls apply to this application based on criticality, platform and service classification.' },
  { step: 5, action: 'Select the lowest necessary integration tier for each evidence need', detail: 'For each control, assess whether Tier 0 (central), Tier 1 (metadata), Tier 2 (read-only) or Tier 3 (controlled change) is needed. Justify any Tier 3 selection explicitly.' },
  { step: 6, action: 'Reuse an existing connector where available', detail: 'Check the connector library before building anything new. If an existing connector covers the evidence source, reuse it with configuration-only changes.' },
  { step: 7, action: 'Configure evidence requirements and verification rules', detail: 'For each applicable control, configure the evidence type, source, freshness requirement, verification rule and exception threshold.' },
  { step: 8, action: 'Test the case end to end with a representative evidence cycle', detail: 'Execute a full test case: obligation in, applicability confirmed, evidence collected, verification run, status updated, exception generated if needed.' },
  { step: 9, action: 'Train the Product Team owner and relevant users', detail: 'Deliver role-appropriate training: Product Hub work items, how to review AI proposals, how to approve or escalate, how to interpret compliance status.' },
  { step: 10, action: 'Go live with the first real compliance cycle', detail: 'Activate the application in production. Monitor the first full cycle for exceptions, failed verification and user issues.' },
  { step: 11, action: 'Measure usage and evidence quality in the first cycle', detail: 'Capture: evidence collection rate, verification pass rate, exception count, user action time, escalation rate. Compare to baseline.' },
  { step: 12, action: 'Maintain metadata, evidence connections and applicability as landscape changes', detail: 'Update applicability when the application platform, criticality or ownership changes. Refresh evidence connectors when source systems change.' }
];

var TECH_DECISIONS = [
  {
    area: 'Durable workflow engine',
    existingCapability: 'Assess existing enterprise BPM in client landscape',
    gap: 'Durable case state with pause and resume; retries and timeouts; human-task management',
    reuseOption: 'Existing enterprise BPM platform (ServiceNow, IBM BPM, Pega) if available',
    extendOption: 'Camunda or Temporal if no suitable enterprise BPM exists',
    newOption: 'LangGraph  -  not recommended as a BPM replacement (insufficient durability guarantees)',
    costImplication: 'Reuse of existing BPM lowers cost and operational risk significantly',
    operationalImplication: 'Must support pause, resume, manual takeover and exception queues',
    recommendation: 'Assess existing enterprise BPM first. Adopt Camunda or Temporal only where no suitable durable engine exists.',
    decisionOwner: 'Solution Architect and CTO / Head of Architecture'
  },
  {
    area: 'Agent execution runtime',
    existingCapability: 'Assess existing ML platform or AI capability in client landscape',
    gap: 'Specialist agent execution; prompt and tool registry; structured output enforcement; model routing',
    reuseOption: 'Existing enterprise ML platform or AI gateway if capable',
    extendOption: 'LangGraph or equivalent lightweight agent orchestration layer',
    newOption: 'Custom build  -  not recommended given available options',
    costImplication: 'Reuse of existing ML platform avoids infrastructure cost; LangGraph is low-cost open source',
    operationalImplication: 'Must support version control for prompts and tools; evaluation framework required',
    recommendation: 'Assess existing ML or AI platform. Layer LangGraph or equivalent where a lightweight orchestration framework is needed.',
    decisionOwner: 'Solution Architect and Agentic AI Architect'
  },
  {
    area: 'Compliance knowledge store',
    existingCapability: 'Assess existing GRC tooling (Archer, ServiceNow GRC, MetricStream)',
    gap: 'Canonical compliance object model; obligation-to-control mappings; applicability rules; approved interpretation status',
    reuseOption: 'Existing GRC tool for regulation inventory and obligation storage where model allows',
    extendOption: 'Structured database with custom compliance object model schema',
    newOption: 'Purpose-built compliance knowledge graph  -  justified only if GRC tooling is absent or incompatible',
    costImplication: 'Reuse of existing GRC tooling avoids data migration and tooling cost',
    operationalImplication: 'The canonical object model is always new  -  existing GRC data must be mapped to it',
    recommendation: 'Use existing GRC tooling as the regulation source of truth. Build the canonical object model as a service layer on top.',
    decisionOwner: 'Compliance Lead and Solution Architect'
  },
  {
    area: 'Vector and semantic search',
    existingCapability: 'Assess existing enterprise search or knowledge management platforms',
    gap: 'Semantic retrieval of regulation content for agent grounding; similarity search for obligations',
    reuseOption: 'Existing enterprise search platform if vector-capable (Elasticsearch, Azure AI Search)',
    extendOption: 'Lightweight vector store (ChromaDB, Weaviate, pgvector) alongside existing search',
    newOption: 'Dedicated vector database  -  justified only for high-volume semantic retrieval',
    costImplication: 'Use existing search platform where possible; dedicated vector DB adds infrastructure overhead',
    operationalImplication: 'Embedding models require maintenance and version alignment with agent prompts',
    recommendation: 'Start with structured retrieval from the knowledge store. Add vector search only where semantic grounding is confirmed necessary.',
    decisionOwner: 'Solution Architect and Agentic AI Architect'
  },
  {
    area: 'Model gateway and proxy',
    existingCapability: 'Assess existing enterprise AI gateway or model access management',
    gap: 'Centralised model routing; access control for LLM calls; cost tracking; rate limiting; audit logging',
    reuseOption: 'Existing enterprise AI gateway (Azure API Management with APIM AI policies, LiteLLM)',
    extendOption: 'Dedicated model proxy (LiteLLM, Portkey) if no enterprise gateway exists',
    newOption: 'Direct model API calls  -  not recommended for enterprise scale (no governance)',
    costImplication: 'Centralised gateway enables cost visibility and prevents ungoverned model spend',
    operationalImplication: 'Must log all model calls with caller identity for audit and governance',
    recommendation: 'Route all model calls through a governed gateway from Phase 1. Reuse existing enterprise gateway where available.',
    decisionOwner: 'Solution Architect and CISO / Head of Security'
  },
  {
    area: 'Evidence connector framework',
    existingCapability: 'Assess existing ETL, data integration or API management platforms',
    gap: 'Reusable connectors to evidence source systems; schema mapping; freshness tracking; provenance',
    reuseOption: 'Existing data integration platform (Azure Data Factory, Informatica, MuleSoft) if available',
    extendOption: 'Lightweight connector framework built on top of the integration facade',
    newOption: 'Custom connectors per evidence source  -  not recommended due to maintenance overhead',
    costImplication: 'Reuse of existing data integration tooling reduces build cost per connector',
    operationalImplication: 'Connector failures must trigger exception workflows; freshness must be monitored',
    recommendation: 'Build connectors on top of existing integration platform where available. Establish a connector library from Phase 2.',
    decisionOwner: 'Integration Lead and Solution Architect'
  },
  {
    area: 'Enterprise identity for agents and services',
    existingCapability: 'Enterprise IAM (Active Directory, Azure AD, Okta)  -  present in most enterprise clients',
    gap: 'Service accounts for agents; scoped permissions per agent; identity propagation to audit logs',
    reuseOption: 'Existing enterprise IAM  -  always reuse',
    extendOption: 'Not applicable; extend existing IAM with service account provisioning',
    newOption: 'Standalone identity service  -  not recommended; creates identity silo',
    costImplication: 'Reuse of existing IAM avoids cost and consolidates identity management',
    operationalImplication: 'Service account lifecycle must be governed; credential rotation required',
    recommendation: 'Provision service accounts for all agents through existing enterprise IAM from Day 1.',
    decisionOwner: 'Security Architect and CISO'
  },
  {
    area: 'Observability and monitoring',
    existingCapability: 'Assess existing enterprise observability stack (Dynatrace, Datadog, Azure Monitor, Splunk)',
    gap: 'Agent performance metrics; model quality tracking; case flow monitoring; exception alerting',
    reuseOption: 'Existing enterprise observability platform  -  extend with AI-specific metrics',
    extendOption: 'Lightweight model monitoring layer (Langfuse, Arize) alongside existing observability',
    newOption: 'Purpose-built AI observability platform  -  justified only if enterprise tooling is absent',
    costImplication: 'Extending existing observability avoids tooling cost and consolidates dashboards',
    operationalImplication: 'Model quality metrics must be visible to operations alongside infrastructure metrics',
    recommendation: 'Extend existing enterprise observability with agent and model quality metrics. Add specialist AI monitoring only where gaps confirmed.',
    decisionOwner: 'Platform Engineer and Head of Operations'
  },
  {
    area: 'Deployment and CI/CD',
    existingCapability: 'Assess existing enterprise CI/CD platform (Azure DevOps, Jenkins, GitHub Actions)',
    gap: 'Automated deployment of agent configurations, prompt versions and workflow definitions',
    reuseOption: 'Existing enterprise CI/CD platform  -  always reuse',
    extendOption: 'Extend existing pipelines with prompt and workflow deployment stages',
    newOption: 'Separate AI deployment pipeline  -  not recommended; creates operational fragmentation',
    costImplication: 'Reuse of existing CI/CD avoids tooling cost',
    operationalImplication: 'Prompt and model version changes must be treated as deployments with rollback capability',
    recommendation: 'Extend existing enterprise CI/CD pipelines to cover agent and prompt deployments from Phase 1.',
    decisionOwner: 'Platform Engineer and Delivery Lead'
  }
];

var DEPLOYMENT_PRINCIPLES = [
  'Deploy on existing enterprise infrastructure. Do not provision new cloud accounts or standalone environments unless a confirmed gap makes it unavoidable.',
  'All data at rest is encrypted using enterprise-standard key management. All data in transit uses TLS 1.2 or higher.',
  'Agent service accounts are provisioned through enterprise IAM with least-privilege scoping. No shared credentials.',
  'All LLM calls are routed through a governed model gateway. Direct model API calls from application code are not permitted.',
  'Regulation content, approved interpretations and obligation records are classified as sensitive data. Access is role-based and logged.',
  'All agent actions that affect official compliance status are recorded in an immutable audit log with caller identity, timestamp and output captured.',
  'The workflow layer (Layer 3) maintains official process state. LLM outputs are never persisted as authoritative state without a deterministic approval step.',
  'All Tier 3 integration actions (changes to applications or platform configuration) require a human approval gate before execution.',
  'Rollback capability is required for all deployment stages, including agent configuration, prompt versions and workflow definitions.',
  'Model versions and prompt templates are version-controlled and traceable to the deployment that introduced them.',
  'The platform must support operation with no persistent internet access for the core compliance workflow. External model APIs may be called via an approved egress route; this must be documented and approved.',
  'Incident, change and problem management for the agentic compliance service follows the client enterprise ITSM process, not a parallel process.'
];

var USER_JOURNEYS = [
  {
    id: 'compliance-legal',
    title: 'Compliance and Legal',
    hub: 'Compliance Hub / OMA',
    summary: 'Review and approve proposed interpretations; track regulation status; no manual evidence assembly.',
    sees: [
      'Regulatory source and change detection',
      'Proposed interpretation with source citations',
      'Impacted norms and controls',
      'AI confidence indicator and reasoning',
      'Required human approval action',
      'Downstream impact on Product Teams',
      'Current regulation compliance status'
    ],
    doesNotNeed: ['Access to agent runtime', 'Manual evidence collection', 'Status reconciliation across systems']
  },
  {
    id: 'product-teams',
    title: 'Product Teams',
    hub: 'Product Hub',
    summary: 'One actionable work item per affected product; no system-switching required.',
    sees: [
      'Why the product is affected by this regulation',
      'What specifically must change or be evidenced',
      'The relevant control requirement',
      'AI-generated implementation proposal',
      'Required evidence and due date',
      'Accountable approver',
      'Current case status'
    ],
    doesNotNeed: ['Access to Compliance Hub or DDCR', 'Interpretation of regulatory text', 'Manual evidence packaging']
  },
  {
    id: 'engineering',
    title: 'Application and Engineering Teams',
    hub: 'Existing delivery tools (JIRA, ADO, GitHub)',
    summary: 'Compliance guidance arrives in normal tools; no separate compliance portal.',
    sees: [
      'Structured change request with compliance tag',
      'Relevant control requirement and standard',
      'AI-generated implementation proposal',
      'Approval state and required test criteria',
      'Required evidence type',
      'Status feedback after implementation'
    ],
    doesNotNeed: ['Access to Compliance Hub or Product Hub', 'Interpretation of regulation text', 'Separate compliance tooling']
  },
  {
    id: 'assessors',
    title: 'ITAC, Assessors and Assurance',
    hub: 'Reporting Hub / DDCR',
    summary: 'Review evidence packages and status rationale; no rebuilding of conformance files.',
    sees: [
      'Obligation and control requirement',
      'Control-to-norm mapping',
      'Collected evidence with source and provenance',
      'Verification result and timestamp',
      'Exceptions and resolution status',
      'Human approvals captured in audit trail',
      'Compliance status with rationale'
    ],
    doesNotNeed: ['Manual evidence assembly', 'Cross-system status reconciliation', 'Rebuilding conformance records']
  },
  {
    id: 'operations',
    title: 'Service Operations',
    hub: 'Operational monitoring view (exception-driven)',
    summary: 'Exception-driven visibility; routine cases run without intervention.',
    sees: [
      'Failed or stalled workflow cases',
      'Failed agent task executions',
      'Overdue human approvals',
      'Evidence source failures and staleness alerts',
      'Access or permission errors',
      'Model quality degradation alerts',
      'Cases requiring manual intervention'
    ],
    doesNotNeed: ['Visibility of routine cases', 'Access to compliance content', 'Manual case routing']
  }
];

var UX_MEASURES = [
  { metric: 'System switches per compliance case', target: 'Fewer than 2 per case (from baseline of 4+)' },
  { metric: 'Manual re-entry of data', target: 'Eliminated for Tier 0 and Tier 1 integrations' },
  { metric: 'Time to understand a required action', target: 'Under 2 minutes from notification to action clarity' },
  { metric: 'Evidence search time', target: 'Eliminated for connected evidence sources' },
  { metric: 'First-time-right rate', target: 'Greater than 80% of cases resolved without rework' },
  { metric: 'User override rate for AI proposals', target: 'Under 20% (proxy for proposal quality)' },
  { metric: 'Unresolved exception age', target: 'No exception unresolved for more than 5 business days' }
];
