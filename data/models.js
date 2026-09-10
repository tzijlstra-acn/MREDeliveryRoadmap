var MODEL_CATALOGUE = [
  {
    id: 'tier-efficient',
    tier: 'efficient',
    label: 'Efficient',
    description: 'Fast, cost-effective models optimised for extraction, classification and structured summarisation where the task is well-defined and latency matters.',
    exampleTasks: ['Obligation extraction', 'Applicability classification', 'Evidence metadata parsing', 'Structured summarisation'],
    dataResidency: 'EU (subject to contract)',
    governanceStatus: 'Approved model class. Specific models to be confirmed through GT AI governance.',
    governanceNote: 'Approved model class',
    contextWindow: 'Standard (up to 128k tokens)',
    approvalAsOf: null,
    approvalNote: 'Approved model class to be confirmed with GT AI governance. Specific model and version subject to contract.'
  },
  {
    id: 'tier-reasoning',
    tier: 'reasoning',
    label: 'Reasoning',
    description: 'More capable models for complex multi-document analysis, norm-to-control mapping, interpretation drafting and multi-step reasoning.',
    exampleTasks: ['Interpretation drafting', 'Norm-to-control mapping', 'Work Product proposal', 'Gap analysis'],
    dataResidency: 'EU (subject to contract)',
    governanceStatus: 'Approved model class. Specific models to be confirmed through GT AI governance.',
    governanceNote: 'Approved model class',
    contextWindow: 'Extended (up to 200k tokens)',
    approvalAsOf: null,
    approvalNote: 'Approved model class to be confirmed with GT AI governance. Specific model and version subject to contract.'
  },
  {
    id: 'tier-frontier',
    tier: 'frontier',
    label: 'Frontier',
    description: 'Most capable models reserved for highly ambiguous multi-step reasoning, novel obligation analysis or escalated exception handling. Enterprise-approved contract required.',
    exampleTasks: ['Ambiguous regulatory interpretation', 'Novel obligation type analysis', 'Complex exception escalation'],
    dataResidency: 'Subject to approved data-processing agreement',
    governanceStatus: 'Enterprise-approved contract and GT AI governance sign-off required before use.',
    governanceNote: 'Governance sign-off required',
    contextWindow: 'Extended with large-context option',
    approvalAsOf: null,
    approvalNote: 'Not approved for use without separate enterprise contract. Do not deploy without explicit GT AI governance approval.'
  },
  {
    id: 'tier-embedding',
    tier: 'embedding',
    label: 'Embedding',
    description: 'Text embedding models for semantic search, obligation-to-norm retrieval, and document similarity within the vector store layer.',
    exampleTasks: ['Obligation-to-norm retrieval', 'Regulation similarity ranking', 'Evidence document search'],
    dataResidency: 'EU (subject to contract)',
    governanceStatus: 'Approved model class. Specific model to be confirmed.',
    governanceNote: 'Approved model class',
    contextWindow: 'N/A (embedding only)',
    approvalAsOf: null,
    approvalNote: 'Approved model class to be confirmed with GT AI governance.'
  },
  {
    id: 'tier-guardrail',
    tier: 'guardrail',
    label: 'Guardrail / Safety',
    description: 'Lightweight classification and content-safety models used to validate AI outputs before they are presented to human reviewers or published to the canonical object model.',
    exampleTasks: ['Output classification', 'Content safety check', 'Hallucination detection', 'Confidence scoring'],
    dataResidency: 'EU (subject to contract)',
    governanceStatus: 'Required on all generative-ai and agentic-execution step outputs before human gate.',
    governanceNote: 'Required on all AI outputs',
    contextWindow: 'Short (classification only)',
    approvalAsOf: null,
    approvalNote: 'Guardrail model type and version to be agreed with Responsible AI Lead and GT AI governance.'
  }
];

var TASK_MODEL_ROUTING = [
  {
    id: 'tmr-01',
    taskType: 'Obligation extraction',
    description: 'Extract structured obligation records from regulatory source text, including scope, requirement type and entity references.',
    recommendedTier: 'efficient',
    rationale: 'Well-defined extraction task with clear schema. Speed and cost matter at volume.',
    agentContext: 'MITRA (provisionally assigned)',
    humanGateBefore: false,
    humanGateAfter: false
  },
  {
    id: 'tmr-02',
    taskType: 'Interpretation drafting',
    description: 'Draft an interpretation of an obligation in the context of the Munich Re IT compliance framework, with source citations and confidence indicators.',
    recommendedTier: 'reasoning',
    rationale: 'Requires contextual understanding of the framework, cross-document reasoning and structured output for human review.',
    agentContext: 'MITRA (provisionally assigned)',
    humanGateBefore: false,
    humanGateAfter: true
  },
  {
    id: 'tmr-03',
    taskType: 'Norm-to-control mapping',
    description: 'Map an approved obligation interpretation to existing norms and control activities in the canonical object model. Identify gaps.',
    recommendedTier: 'reasoning',
    rationale: 'Multi-document reasoning across the full framework. Gap identification requires understanding of existing control coverage.',
    agentContext: 'MITRA (provisionally assigned)',
    humanGateBefore: false,
    humanGateAfter: false
  },
  {
    id: 'tmr-04',
    taskType: 'Applicability assessment',
    description: 'Determine which products and applications in the estate are in scope for an obligation change, and assess the gap between current and required state.',
    recommendedTier: 'efficient',
    rationale: 'Rule-based applicability logic with some AI-assisted gap scoring. Volume matters: runs against all in-scope products.',
    agentContext: 'MAYA (provisionally assigned)',
    humanGateBefore: false,
    humanGateAfter: false
  },
  {
    id: 'tmr-05',
    taskType: 'Work Product drafting',
    description: 'Draft documentation updates or technical configuration proposals for an affected Work Product, given the approved control activity.',
    recommendedTier: 'reasoning',
    rationale: 'Requires contextual understanding of the existing Work Product, the approved control, and the product context.',
    agentContext: 'MAYA (provisionally assigned)',
    humanGateBefore: false,
    humanGateAfter: true
  },
  {
    id: 'tmr-06',
    taskType: 'Evidence summarisation',
    description: 'Summarise and structure a retrieved evidence package into a human-readable assessment view for RACE or A-CART preparation.',
    recommendedTier: 'efficient',
    rationale: 'Structured summarisation of known evidence. Well-defined schema and lower reasoning requirement.',
    agentContext: 'MITRA (provisionally assigned)',
    humanGateBefore: false,
    humanGateAfter: false
  },
  {
    id: 'tmr-07',
    taskType: 'Semantic retrieval (obligations)',
    description: 'Retrieve the most relevant existing norms, controls and obligations from the canonical object model given a new regulatory source query.',
    recommendedTier: 'embedding',
    rationale: 'Embedding-based vector search is the right tool for semantic retrieval. No generative output at this step.',
    agentContext: 'Platform layer',
    humanGateBefore: false,
    humanGateAfter: false
  },
  {
    id: 'tmr-08',
    taskType: 'Output safety validation',
    description: 'Validate generative AI and agentic execution outputs before they are presented to a human reviewer or published to the canonical object model.',
    recommendedTier: 'guardrail',
    rationale: 'Guardrail models run fast, cheap and reliably on well-defined classification tasks. Required on all AI-generated outputs.',
    agentContext: 'Platform layer (Responsible AI)',
    humanGateBefore: false,
    humanGateAfter: false
  },
  {
    id: 'tmr-09',
    taskType: 'Novel or ambiguous obligation analysis',
    description: 'Handle regulatory obligations with no precedent in the existing framework. May require extended multi-document reasoning across the full portfolio of related norms.',
    recommendedTier: 'frontier',
    rationale: 'Frontier models are reserved for the genuinely hard cases. Requires enterprise-approved contract. Should be a small fraction of total runs.',
    agentContext: 'MITRA (provisionally assigned, with escalation flag)',
    humanGateBefore: true,
    humanGateAfter: true
  }
];

var COST_PER_RUN_COMPONENTS = [
  {
    id: 'cr-01',
    component: 'Model inference',
    description: 'Token cost for generative-ai and agentic-execution steps. Varies by model tier and input/output length.',
    driver: 'Tokens per run x model rate',
    note: 'Rates subject to contract and as-of date. Do not publish rates without an approved as-of date and "subject to contract" label.'
  },
  {
    id: 'cr-02',
    component: 'Vector retrieval',
    description: 'Embedding query cost for semantic retrieval steps (obligation-to-norm, evidence search).',
    driver: 'Retrieval calls per run x embedding rate',
    note: 'As-of date required. Subject to contract.'
  },
  {
    id: 'cr-03',
    component: 'Orchestration',
    description: 'Agent orchestration compute: workflow state management, tool call overhead, run coordination.',
    driver: 'Run duration x compute rate',
    note: 'Platform-specific. Requires capacity planning at scale.'
  },
  {
    id: 'cr-04',
    component: 'Platform and hosting',
    description: 'Shared platform infrastructure costs: Compliance Hub, Product Hub, evidence layer, DDCR hosting.',
    driver: 'Allocated per regulation per run cycle',
    note: 'Requires FinOps allocation model. Shared across all runs.'
  },
  {
    id: 'cr-05',
    component: 'Evidence storage',
    description: 'Storage cost for evidence packages, audit trails, and canonical object model state.',
    driver: 'GB stored per regulation x storage rate',
    note: 'Growth rate depends on regulation count and evidence frequency.'
  },
  {
    id: 'cr-06',
    component: 'Human review time',
    description: 'Fully-loaded cost of human review at human gate steps. This is the largest per-run cost component and the primary lever for value creation.',
    driver: 'Minutes per gate review x FTE rate x gate count',
    note: 'Illustrative planning assumption, not a commercial estimate. FTE rate based on Accenture planning day rates.'
  },
  {
    id: 'cr-07',
    component: 'Exception handling',
    description: 'Human time spent on evidence exceptions, verification failures, and escalated interpretations.',
    driver: 'Exception rate x average resolution time x FTE rate',
    note: 'Exception rate is a working assumption; to be baselined in Phase 1.'
  }
];
