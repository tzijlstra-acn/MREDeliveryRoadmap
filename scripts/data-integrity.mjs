/**
 * Data integrity tests for UC3 Agentic Compliance Delivery Blueprint.
 * Validates cross-references, required fields, date ordering and content safeguards.
 * Run: node scripts/data-integrity.mjs
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');

// Load data files by extracting var declarations
function loadData(file, varName) {
  const content = readFileSync(join(ROOT, 'data', file), 'utf8');
  const match = content.match(new RegExp('var ' + varName + '\\s*=\\s*([\\s\\S]+?);\\s*$', 'm'));
  if (!match) {
    // Try last occurrence
    const idx = content.lastIndexOf('var ' + varName + ' =');
    if (idx === -1) throw new Error('Could not find var ' + varName + ' in ' + file);
    const snippet = content.slice(idx);
    return Function('return ' + snippet.replace('var ' + varName + ' =', '').replace(/;\s*$/, ''))();
  }
  return Function('return ' + match[1])();
}

let passes = 0;
let failures = 0;
const errors = [];

function assert(condition, message) {
  if (condition) {
    passes++;
  } else {
    failures++;
    errors.push('FAIL: ' + message);
    console.error('FAIL: ' + message);
  }
}

function section(name) {
  console.log('\n-- ' + name + ' --');
}

// -- Load all data --
console.log('UC3 Data Integrity Tests');
console.log('========================');

let PHASES, WORKSTREAMS, DELIVERABLES, ROLES, PODS, MILESTONES, GOVERNANCE_FORUMS, DECISIONS, RISKS, KPIS, ADDONS, REGULATIONS, WAVES, STAGE_GATES, ROADMAP_CONTENT, ARCH_LAYERS, APP_TIERS, SCENARIOS;
let RUNS, EXECUTION_MECHANISMS, MODEL_CATALOGUE, TASK_MODEL_ROUTING, VALUE_BRIDGE, VALUE_SCENARIOS, ASSUMPTION_HISTORY, GTRF_ROLES, WORKFORCE_IMPACT_SUMMARY;

try {
  PHASES = loadData('phases.js', 'PHASES');
  WORKSTREAMS = loadData('workstreams.js', 'WORKSTREAMS');
  DELIVERABLES = loadData('deliverables.js', 'DELIVERABLES');
  ROLES = loadData('roles.js', 'ROLES');
  PODS = loadData('roles.js', 'PODS');
  MILESTONES = loadData('milestones.js', 'MILESTONES');
  GOVERNANCE_FORUMS = loadData('governance.js', 'GOVERNANCE_FORUMS');
  DECISIONS = loadData('governance.js', 'DECISIONS');
  RISKS = loadData('governance.js', 'RISKS');
  KPIS = loadData('kpis.js', 'KPIS');
  ADDONS = loadData('addons.js', 'ADDONS');
  REGULATIONS = loadData('regulations.js', 'REGULATIONS');
  WAVES = loadData('waves.js', 'WAVES');
  ROADMAP_CONTENT = loadData('roadmap-content.js', 'ROADMAP_CONTENT');
  ARCH_LAYERS = loadData('architecture.js', 'ARCH_LAYERS');
  APP_TIERS = loadData('architecture.js', 'APP_TIERS');
  SCENARIOS = loadData('scenarios.js', 'SCENARIOS');
  RUNS = loadData('runs.js', 'RUNS');
  EXECUTION_MECHANISMS = loadData('runs.js', 'EXECUTION_MECHANISMS');
  MODEL_CATALOGUE = loadData('models.js', 'MODEL_CATALOGUE');
  TASK_MODEL_ROUTING = loadData('models.js', 'TASK_MODEL_ROUTING');
  VALUE_BRIDGE = loadData('value-assumptions.js', 'VALUE_BRIDGE');
  VALUE_SCENARIOS = loadData('value-assumptions.js', 'VALUE_SCENARIOS');
  ASSUMPTION_HISTORY = loadData('value-assumptions.js', 'ASSUMPTION_HISTORY');
  GTRF_ROLES = loadData('people-impact.js', 'GTRF_ROLES');
  WORKFORCE_IMPACT_SUMMARY = loadData('people-impact.js', 'WORKFORCE_IMPACT_SUMMARY');
  try {
    STAGE_GATES = loadData('governance.js', 'STAGE_GATES');
  } catch (e) {
    STAGE_GATES = null;
  }
  console.log('All data files loaded successfully.');
} catch (e) {
  console.error('ERROR loading data: ' + e.message);
  process.exit(1);
}

// -- Phases --
section('Phases');
assert(PHASES.length === 4, 'Must have 4 phases (As-Is + 3 delivery phases)');
assert(PHASES.find(function(p){return p.id==='as-is';}), 'As-Is phase must exist');
assert(PHASES.find(function(p){return p.id==='phase-1';}), 'Phase 1 must exist');
assert(PHASES.find(function(p){return p.id==='phase-2';}), 'Phase 2 must exist');
assert(PHASES.find(function(p){return p.id==='phase-3';}), 'Phase 3 must exist');

const p1 = PHASES.find(function(p){return p.id==='phase-1';});
const p2 = PHASES.find(function(p){return p.id==='phase-2';});
const p3 = PHASES.find(function(p){return p.id==='phase-3';});

assert(p1 && p1.start === '2026-10-01', 'Phase 1 must start 2026-10-01');
assert(p1 && p1.end === '2027-03-31', 'Phase 1 must end 2027-03-31');
assert(p2 && p2.start === '2027-04-01', 'Phase 2 must start 2027-04-01');
assert(p2 && p2.end === '2027-09-30', 'Phase 2 must end 2027-09-30');
assert(p3 && p3.start === '2027-10-01', 'Phase 3 must start 2027-10-01');
assert(p3 && p3.end === '2028-03-31', 'Phase 3 must end 2028-03-31');
assert(p1 && p1.label === 'Integrate', 'Phase 1 label must be Integrate');
assert(p2 && p2.label === 'Orchestrate', 'Phase 2 label must be Orchestrate');
assert(p3 && p3.label === 'Industrialise', 'Phase 3 label must be Industrialise');
assert(p1 && p1.gate, 'Phase 1 must have a gate');
assert(p2 && p2.gate, 'Phase 2 must have a gate');
assert(p3 && p3.gate, 'Phase 3 must have a gate');

// -- Workstreams --
section('Workstreams');
assert(WORKSTREAMS.length === 8, 'Must have exactly 8 workstreams');
var wsIds = WORKSTREAMS.map(function(w){return w.id;});
var uniqueWsIds = new Set(wsIds);
assert(wsIds.length === uniqueWsIds.size, 'All workstream IDs must be unique');
assert(WORKSTREAMS.find(function(w){return w.id==='ws-8';}), 'WS-8 Evidence, Verification and Reporting must exist');
WORKSTREAMS.forEach(function(ws) {
  assert(ws.id, 'Workstream must have an id: ' + JSON.stringify(ws.name));
  assert(ws.name, 'Workstream must have a name');
  assert(ws.purpose, 'Workstream ' + ws.id + ' must have a purpose');
  assert(ws.lead, 'Workstream ' + ws.id + ' must have a lead');
  assert(Array.isArray(ws.phases) && ws.phases.length > 0, 'Workstream ' + ws.id + ' must have phases');
});

// -- Deliverables --
section('Deliverables');
assert(DELIVERABLES.length === 16, 'Must have exactly 16 core deliverables');
var delIds = DELIVERABLES.map(function(d){return d.id;});
var uniqueDelIds = new Set(delIds);
assert(delIds.length === uniqueDelIds.size, 'All deliverable IDs must be unique');

// Confirm new deliverables exist
['D13','D14','D15','D16'].forEach(function(id) {
  assert(DELIVERABLES.find(function(d){return d.id===id;}), 'Deliverable ' + id + ' must exist');
});

DELIVERABLES.forEach(function(d) {
  assert(d.id, 'Deliverable must have id');
  assert(d.name, 'Deliverable ' + d.id + ' must have a name');
  assert(d.phaseId, 'Deliverable ' + d.id + ' must have a phaseId');
  assert(d.workstreamId, 'Deliverable ' + d.id + ' must have a workstreamId');
  assert(d.accountableRoleId, 'Deliverable ' + d.id + ' must have an accountableRoleId');
  assert(d.targetMonth, 'Deliverable ' + d.id + ' must have a targetMonth');
  assert(Array.isArray(d.definitionOfDone) && d.definitionOfDone.length > 0, 'Deliverable ' + d.id + ' must have a definition of done');
  assert(d.status === 'proposed', 'Deliverable ' + d.id + ' status must be proposed (not committed)');

  // Cross-reference checks
  assert(PHASES.find(function(p){return p.id===d.phaseId;}), 'Deliverable ' + d.id + ' phaseId ' + d.phaseId + ' must reference a valid phase');
  assert(WORKSTREAMS.find(function(w){return w.id===d.workstreamId;}), 'Deliverable ' + d.id + ' workstreamId ' + d.workstreamId + ' must reference a valid workstream');
  assert(ROLES.find(function(r){return r.id===d.accountableRoleId;}), 'Deliverable ' + d.id + ' accountableRoleId ' + d.accountableRoleId + ' must reference a valid role');
  if (Array.isArray(d.supportingRoleIds)) {
    d.supportingRoleIds.forEach(function(rid) {
      assert(ROLES.find(function(r){return r.id===rid;}), 'Deliverable ' + d.id + ' supportingRoleId ' + rid + ' must reference a valid role');
    });
  }
  if (Array.isArray(d.dependencies)) {
    d.dependencies.forEach(function(dep) {
      assert(DELIVERABLES.find(function(x){return x.id===dep;}), 'Deliverable ' + d.id + ' dependency ' + dep + ' must reference a valid deliverable');
    });
  }
});

// Phase boundary checks
DELIVERABLES.forEach(function(d) {
  var month = d.targetMonth;
  var phase = d.phaseId;
  if (phase === 'phase-1') {
    assert(month >= '2026-10' && month <= '2027-03', 'Deliverable ' + d.id + ' targetMonth ' + month + ' must be within Phase 1 (2026-10 to 2027-03)');
  } else if (phase === 'phase-2') {
    assert(month >= '2027-04' && month <= '2027-09', 'Deliverable ' + d.id + ' targetMonth ' + month + ' must be within Phase 2 (2027-04 to 2027-09)');
  } else if (phase === 'phase-3') {
    assert(month >= '2027-10' && month <= '2028-03', 'Deliverable ' + d.id + ' targetMonth ' + month + ' must be within Phase 3 (2027-10 to 2028-03)');
  }
});

// -- Roles --
section('Roles');
assert(ROLES.length > 0, 'Must have at least one role');
var roleIds = ROLES.map(function(r){return r.id;});
var uniqueRoleIds = new Set(roleIds);
assert(roleIds.length === uniqueRoleIds.size, 'All role IDs must be unique');

ROLES.forEach(function(r) {
  assert(r.id, 'Role must have id');
  assert(r.title, 'Role ' + r.id + ' must have a title');
  assert(r.pod, 'Role ' + r.id + ' must belong to a pod');
  assert(['client','accenture','shared'].includes(r.side), 'Role ' + r.id + ' side must be client, accenture or shared');
  assert(r.fte && r.fte.phase1 !== undefined, 'Role ' + r.id + ' must have phase1 FTE');
  assert(r.mission, 'Role ' + r.id + ' must have a mission');
  assert(Array.isArray(r.skills) && r.skills.length > 0, 'Role ' + r.id + ' must have skills');
  var allPodIds = PODS.map(function(p){return p.id;});
  assert(allPodIds.includes(r.pod), 'Role ' + r.id + ' pod ' + r.pod + ' must reference a valid pod');
});

assert(PODS.length >= 6, 'Must have at least 6 delivery pods');
PODS.forEach(function(p) {
  assert(p.id && p.name && p.purpose, 'Pod ' + p.id + ' must have id, name and purpose');
  p.roleIds.forEach(function(rid) {
    assert(ROLES.find(function(r){return r.id===rid;}), 'Pod ' + p.id + ' roleId ' + rid + ' must reference a valid role');
  });
});

// -- Milestones --
section('Milestones');
assert(MILESTONES.length > 0, 'Must have milestones');
MILESTONES.forEach(function(m) {
  assert(m.id, 'Milestone must have id');
  assert(m.label, 'Milestone ' + m.id + ' must have a label');
  assert(m.date, 'Milestone ' + m.id + ' must have a date');
  assert(m.phase, 'Milestone ' + m.id + ' must have a phase');
  assert(m.date >= '2026-10' && m.date <= '2028-03', 'Milestone ' + m.id + ' date ' + m.date + ' must be within programme range (2026-10 to 2028-03)');
  assert(PHASES.find(function(p){return p.id===m.phase || m.phase==='phase-1' || m.phase==='phase-2' || m.phase==='phase-3';}), 'Milestone ' + m.id + ' phase must be valid');
  m.deliverableIds.forEach(function(did) {
    assert(DELIVERABLES.find(function(d){return d.id===did;}), 'Milestone ' + m.id + ' deliverableId ' + did + ' must reference a valid deliverable');
  });
});

// Gate milestones - must have G0 through G4
var gates = MILESTONES.filter(function(m){return m.type==='gate';});
assert(gates.length === 5, 'Must have exactly 5 gate milestones (G0-G4)');
['G0','G1','G2','G3','G4'].forEach(function(gid) {
  assert(gates.find(function(g){return g.id===gid;}), 'Gate ' + gid + ' must exist in milestones');
});

// -- Regulations --
section('Regulations');
assert(Array.isArray(REGULATIONS), 'REGULATIONS must be an array');
assert(REGULATIONS.length === 24, 'Must have exactly 24 regulations');

var regIds = REGULATIONS.map(function(r){return r.id;});
var uniqueRegIds = new Set(regIds);
assert(regIds.length === uniqueRegIds.size, 'All regulation IDs must be unique');

// REG-01 must be DORA with correct framing
var reg01 = REGULATIONS.find(function(r){return r.id==='REG-01';});
assert(reg01, 'REG-01 must exist');
assert(reg01 && reg01.name && reg01.name.includes('DORA'), 'REG-01 must be DORA');
assert(reg01 && reg01.referenceScenario, 'REG-01 must have a referenceScenario field (Backup and Restore)');
assert(reg01 && reg01.referenceScenarioNote && reg01.referenceScenarioNote.length > 0, 'REG-01 must have a referenceScenarioNote clarifying B&R is a reference scenario, not the programme goal');
assert(reg01 && reg01.status === 'assessed', 'REG-01 status must be assessed');

// REG-02 through REG-24 must not be in Wave 1 (Wave 1 is reserved for DORA reference scenario)
REGULATIONS.filter(function(r){return r.id !== 'REG-01';}).forEach(function(r) {
  assert(
    r.proposedWave !== 'wave-1',
    'Regulation ' + r.id + ' must not be assigned to wave-1. Wave 1 is the DORA reference scenario only.'
  );
});

// All regulations must have required fields
REGULATIONS.forEach(function(r) {
  assert(r.id, 'Regulation must have id');
  assert(r.name, 'Regulation ' + r.id + ' must have a name');
  assert(r.status, 'Regulation ' + r.id + ' must have a status');
  assert(r.confidence, 'Regulation ' + r.id + ' must have a confidence field');
  // Priority must be numeric for inventoried regs; placeholder (not-inventoried) regs may defer priority
  if (r.status !== 'not-inventoried') {
    assert(typeof r.priority === 'number', 'Regulation ' + r.id + ' (status: ' + r.status + ') must have a numeric priority');
  }
});

// No invented regulation names (ensure no names beyond DORA without "to confirm")
var validStatuses = ['not-inventoried','inventoried','assessed','prioritised','mapped','configured','validated','live','continuously-monitored'];
REGULATIONS.forEach(function(r) {
  assert(validStatuses.includes(r.status), 'Regulation ' + r.id + ' status "' + r.status + '" must be a valid lifecycle status');
});

// -- Waves --
section('Waves');
assert(Array.isArray(WAVES), 'WAVES must be an array');
assert(WAVES.length >= 3, 'Must have at least 3 waves');

var wave1 = WAVES.find(function(w){return w.id==='wave-1';});
assert(wave1, 'wave-1 must exist');
assert(wave1 && wave1.regulationIds && wave1.regulationIds.includes('REG-01'), 'wave-1 must include REG-01');
assert(wave1 && wave1.status === 'proposed', 'wave-1 must have status proposed');

var wave2 = WAVES.find(function(w){return w.id==='wave-2';});
var wave3 = WAVES.find(function(w){return w.id==='wave-3';});
assert(wave2, 'wave-2 must exist');
assert(wave3, 'wave-3 must exist');
assert(wave2 && wave2.status === 'decision-required', 'wave-2 must have status decision-required');
assert(wave3 && wave3.status === 'decision-required', 'wave-3 must have status decision-required');
assert(wave2 && (wave2.regulationCount === null || wave2.regulationCount === undefined), 'wave-2 must not commit to a regulation count');
assert(wave3 && (wave3.regulationCount === null || wave3.regulationCount === undefined), 'wave-3 must not commit to a regulation count');

// -- Stage gates --
section('Stage gates');
if (STAGE_GATES) {
  assert(STAGE_GATES.length === 5, 'Must have exactly 5 stage gates (G0-G4)');
  ['G0','G1','G2','G3','G4'].forEach(function(gid) {
    var gate = STAGE_GATES.find(function(g){return g.id===gid;});
    assert(gate, 'Stage gate ' + gid + ' must exist in STAGE_GATES');
    if (gate) {
      assert(Array.isArray(gate.criteria) && gate.criteria.length > 0, 'Gate ' + gid + ' must have criteria');
      assert(Array.isArray(gate.approvers) && gate.approvers.length > 0, 'Gate ' + gid + ' must have approvers');
    }
  });
} else {
  console.log('  INFO: STAGE_GATES not yet defined in governance.js - skipping gate detail checks');
}

// -- Content safeguards --
section('Content safeguards');

// Load all data files as text for string search
var allText = ['phases.js','workstreams.js','deliverables.js','roles.js','milestones.js','governance.js','kpis.js','addons.js','regulations.js','waves.js','roadmap-content.js','architecture.js','scenarios.js','runs.js','models.js','value-assumptions.js','people-impact.js'].map(function(f) {
  return readFileSync(join(ROOT, 'data', f), 'utf8');
}).join('\n');

var appText = readFileSync(join(ROOT, 'app.html'), 'utf8');
var combined = allText + '\n' + appText;

assert(!/52 FTE/i.test(combined), 'Forbidden value "52 FTE" must not appear in any data or app file');
assert(!/3\.0%/.test(combined), 'Forbidden value "3.0%" must not appear in any data or app file');
assert(!/\b3\.0 per cent\b/i.test(combined), 'Forbidden value "3.0 per cent" must not appear');
assert(!/enterprise.{0,50}headcount reduction/i.test(combined), 'Enterprise-wide headcount reduction claim must not appear');
assert(/13\.8%/.test(combined), 'The 13.8% directional value must appear in app.html');
assert(/to validate|working assumption|directional/i.test(appText), 'The 13.8% value must be qualified as directional or working assumption');
assert(!/lorem ipsum/i.test(combined), 'Lorem ipsum placeholder text must not appear');

// Check Phase 1 label
assert(/Integrate/.test(combined), 'Phase 1 must be labelled Integrate');
assert(/Orchestrate/.test(combined), 'Phase 2 must be labelled Orchestrate');
assert(/Industrialise/.test(combined), 'Phase 3 must be labelled Industrialise');

// No em or en dashes in data files
assert(!/—/.test(allText), 'Unicode em dash must not appear in data files');
assert(!/–/.test(allText), 'Unicode en dash must not appear in data files');

// Human accountability
assert(/Human-in-the-Loop|human approval/i.test(combined), 'Human-in-the-Loop or human approval must be referenced');

// DDCR positioning
assert(/DDCR/.test(combined), 'DDCR must be referenced');

// Staffing labelled illustrative
assert(/[Ii]llustrative/.test(appText), 'Staffing must be labelled illustrative in app.html');

// Backup and Restore as reference scenario (not the goal)
assert(/Backup.{0,5}Restore/i.test(combined), 'Backup and Restore must be referenced');
assert(/reference scenario/i.test(combined), 'Backup and Restore must be framed as a reference scenario');

// No claim that all 24 regulations are live within 18 months
assert(!/all 24 regulations.{0,30}live/i.test(combined), 'Must not claim all 24 regulations are live within 18 months');
assert(!/24.{0,30}regulations.{0,30}complete/i.test(combined), 'Must not claim 24 regulations are complete within programme');

// North Star vs committed framing
assert(/North Star/i.test(combined) || /north.?star/i.test(combined) || /portfolio.{0,30}target/i.test(combined),
  'Programme must reference a portfolio target (North Star) framing for 24 regulations');

// Wave 2 and 3 must not commit to regulation count
assert(/decision required/i.test(allText), 'Wave 2 or 3 count must be flagged as "decision required"');

// All 16 deliverable IDs present in data files
['D01','D02','D03','D04','D05','D06','D07','D08','D09','D10','D11','D12','D13','D14','D15','D16'].forEach(function(id) {
  assert(allText.includes(id), 'Deliverable ' + id + ' must exist in data files');
});

// Regulation portfolio completeness check
var regText = readFileSync(join(ROOT, 'data', 'regulations.js'), 'utf8');
// All 24 regulation IDs must be present
for (var ri = 1; ri <= 24; ri++) {
  var rid = 'REG-' + (ri < 10 ? '0' : '') + ri;
  assert(regText.includes("'" + rid + "'"), 'Regulation ' + rid + ' must be defined in regulations.js');
}
// REG-01 must be DORA (checked above), and only REG-01 may be in wave-1
assert(
  REGULATIONS.filter(function(r){ return r.proposedWave === 'wave-1'; }).length === 1,
  'Exactly one regulation may be in wave-1 (the DORA reference scenario)'
);

// -- Roadmap content --
section('Roadmap content');
assert(Array.isArray(ROADMAP_CONTENT), 'ROADMAP_CONTENT must be an array');
assert(ROADMAP_CONTENT.length === 18, 'Must have exactly 18 monthly roadmap entries (Oct 2026 to Mar 2028)');
ROADMAP_CONTENT.forEach(function(m) {
  assert(m.month, 'Every roadmap month must have a month field');
  assert(m.phase, 'Every roadmap month must have a phase field');
  assert(m.regulatoryPortfolio && m.regulatoryPortfolio.action, 'Every roadmap month must have a regulatoryPortfolio.action: ' + m.month);
  assert(m.complianceContent && m.complianceContent.action, 'Every roadmap month must have a complianceContent.action: ' + m.month);
  assert(m.platformIntegration && m.platformIntegration.action, 'Every roadmap month must have a platformIntegration.action: ' + m.month);
  assert(m.userWorkflow && m.userWorkflow.action, 'Every roadmap month must have a userWorkflow.action: ' + m.month);
  assert(m.evidenceReporting && m.evidenceReporting.action, 'Every roadmap month must have a evidenceReporting.action: ' + m.month);
  assert(!/—/.test(JSON.stringify(m)), 'Roadmap month ' + m.month + ' must not contain an em dash');
  assert(!/–/.test(JSON.stringify(m)), 'Roadmap month ' + m.month + ' must not contain an en dash');
});
var phase1Months = ROADMAP_CONTENT.filter(function(m){return m.phase==='phase-1';});
var phase2Months = ROADMAP_CONTENT.filter(function(m){return m.phase==='phase-2';});
var phase3Months = ROADMAP_CONTENT.filter(function(m){return m.phase==='phase-3';});
assert(phase1Months.length === 6, 'Must have 6 Phase 1 months in ROADMAP_CONTENT');
assert(phase2Months.length === 6, 'Must have 6 Phase 2 months in ROADMAP_CONTENT');
assert(phase3Months.length === 6, 'Must have 6 Phase 3 months in ROADMAP_CONTENT');

// -- Architecture --
section('Architecture');
assert(Array.isArray(ARCH_LAYERS), 'ARCH_LAYERS must be an array');
assert(ARCH_LAYERS.length === 7, 'Must have exactly 7 architecture layers');
ARCH_LAYERS.forEach(function(l) {
  assert(l.id, 'Every arch layer must have an id');
  assert(l.name, 'Every arch layer ' + l.id + ' must have a name');
  assert(l.description, 'Every arch layer ' + l.id + ' must have a description');
  assert(Array.isArray(l.components) && l.components.length > 0, 'Every arch layer ' + l.id + ' must have components');
  assert(typeof l.isNew === 'boolean', 'Every arch layer ' + l.id + ' must have an isNew boolean');
});
assert(ARCH_LAYERS.find(function(l){return l.layer==='experience';}), 'Must have an experience layer');
assert(ARCH_LAYERS.find(function(l){return l.layer==='workflow';}), 'Must have a workflow layer');
assert(ARCH_LAYERS.find(function(l){return l.layer==='agent';}), 'Must have an agent layer');

assert(Array.isArray(APP_TIERS), 'APP_TIERS must be an array');
assert(APP_TIERS.length === 4, 'Must have exactly 4 application integration tiers');
['tier-0','tier-1','tier-2','tier-3'].forEach(function(tid) {
  assert(APP_TIERS.find(function(t){return t.id===tid;}), 'App tier ' + tid + ' must exist');
});
APP_TIERS.forEach(function(t) {
  assert(t.id, 'Every app tier must have an id');
  assert(t.name, 'Every app tier ' + t.id + ' must have a name');
  assert(t.description, 'Every app tier ' + t.id + ' must have a description');
  assert(t.suitableWhen, 'Every app tier ' + t.id + ' must have a suitableWhen field');
});

// -- Scenarios --
section('Scenarios');
assert(Array.isArray(SCENARIOS), 'SCENARIOS must be an array');
assert(SCENARIOS.length === 3, 'Must have exactly 3 resource scenarios');
['lean','recommended','accelerated'].forEach(function(sid) {
  assert(SCENARIOS.find(function(s){return s.id===sid;}), 'Scenario ' + sid + ' must exist');
});
SCENARIOS.forEach(function(s) {
  assert(s.id, 'Every scenario must have an id');
  assert(s.name, 'Every scenario ' + s.id + ' must have a name');
  assert(s.description, 'Every scenario ' + s.id + ' must have a description');
  assert(s.persistentCoreFTE && typeof s.persistentCoreFTE.min === 'number', 'Every scenario ' + s.id + ' must have persistentCoreFTE.min');
  assert(s.month18Outcome, 'Every scenario ' + s.id + ' must have a month18Outcome');
  assert(!/\d+ regulations live/i.test(s.month18Outcome), 'Scenario ' + s.id + ' must not claim a fabricated regulation count as live');
  assert(!/52 FTE/i.test(JSON.stringify(s)), 'Scenario ' + s.id + ' must not contain the forbidden value 52 FTE');
  assert(!/3\.0%/.test(JSON.stringify(s)), 'Scenario ' + s.id + ' must not contain the forbidden value 3.0%');
  assert(!/—/.test(JSON.stringify(s)), 'Scenario ' + s.id + ' must not contain an em dash');
  assert(!/–/.test(JSON.stringify(s)), 'Scenario ' + s.id + ' must not contain an en dash');
});

// -- New field assertions: phases northStarStage --
section('Phase northStarStage fields');
[p1, p2, p3].forEach(function(p) {
  if (!p) return;
  assert(p.northStarStage, 'Phase ' + p.id + ' must have a northStarStage field');
  assert(p.northStarStageLabel, 'Phase ' + p.id + ' must have a northStarStageLabel field');
});
assert(p1 && p1.northStarStage === 'stage-1-automate', 'Phase 1 northStarStage must be stage-1-automate');
assert(p2 && p2.northStarStage === 'stage-2-orchestrate', 'Phase 2 northStarStage must be stage-2-orchestrate');
assert(p3 && p3.northStarStage === 'stage-3-transform', 'Phase 3 northStarStage must be stage-3-transform');

// -- New field assertions: operatingModelDimension --
var validOMDims = ['product-service-portfolio','organisation-processes','technology-platforms','value-management','people'];
section('operatingModelDimension on workstreams, deliverables, addons');
WORKSTREAMS.forEach(function(ws) {
  assert(Array.isArray(ws.operatingModelDimension) && ws.operatingModelDimension.length > 0, 'Workstream ' + ws.id + ' must have operatingModelDimension');
  ws.operatingModelDimension.forEach(function(dim) {
    assert(validOMDims.includes(dim), 'Workstream ' + ws.id + ' operatingModelDimension "' + dim + '" must be a valid OM dimension');
  });
  assert(ws.executionMechanism, 'Workstream ' + ws.id + ' must have an executionMechanism field');
});
DELIVERABLES.forEach(function(d) {
  assert(Array.isArray(d.operatingModelDimension) && d.operatingModelDimension.length > 0, 'Deliverable ' + d.id + ' must have operatingModelDimension');
  d.operatingModelDimension.forEach(function(dim) {
    assert(validOMDims.includes(dim), 'Deliverable ' + d.id + ' operatingModelDimension "' + dim + '" must be a valid OM dimension');
  });
});
ADDONS.forEach(function(a) {
  assert(Array.isArray(a.operatingModelDimension) && a.operatingModelDimension.length > 0, 'Add-on ' + a.id + ' must have operatingModelDimension');
  a.operatingModelDimension.forEach(function(dim) {
    assert(validOMDims.includes(dim), 'Add-on ' + a.id + ' operatingModelDimension "' + dim + '" must be a valid OM dimension');
  });
});

// -- New field assertions: futureTaskOutcome on roles --
var validFTOs = ['retained','augmented','automated','agent-executed','retired'];
section('futureTaskOutcome on roles');
ROLES.forEach(function(r) {
  assert(r.futureTaskOutcome, 'Role ' + r.id + ' must have a futureTaskOutcome field');
  assert(validFTOs.includes(r.futureTaskOutcome), 'Role ' + r.id + ' futureTaskOutcome "' + r.futureTaskOutcome + '" must be a valid value');
});

// -- Runs data --
section('Runs (RUNS)');
assert(Array.isArray(RUNS), 'RUNS must be an array');
assert(RUNS.length === 3, 'Must have exactly 3 runs (A, B, C)');
['run-a','run-b','run-c'].forEach(function(rid) {
  assert(RUNS.find(function(r){return r.id===rid;}), 'Run ' + rid + ' must exist');
});
var validMechanisms = ['human','deterministic-automation','generative-ai','agentic-execution','human-gate'];
RUNS.forEach(function(run) {
  assert(run.id, 'Run must have an id');
  assert(run.label, 'Run ' + run.id + ' must have a label');
  assert(run.description, 'Run ' + run.id + ' must have a description');
  assert(run.trigger, 'Run ' + run.id + ' must have a trigger');
  assert(Array.isArray(run.steps) && run.steps.length > 0, 'Run ' + run.id + ' must have steps');
  run.steps.forEach(function(step) {
    assert(step.id, 'Run ' + run.id + ' step must have an id');
    assert(step.label, 'Run ' + run.id + ' step ' + step.id + ' must have a label');
    assert(validMechanisms.includes(step.executionMechanism), 'Run ' + run.id + ' step ' + step.id + ' executionMechanism must be valid');
    assert(typeof step.isHumanGate === 'boolean', 'Run ' + run.id + ' step ' + step.id + ' must have isHumanGate boolean');
    if (step.agentName) {
      assert(step.agentNote === 'Provisionally assigned', 'Run ' + run.id + ' step ' + step.id + ' agentName must have agentNote "Provisionally assigned"');
    }
  });
  // No em or en dashes
  assert(!/—/.test(JSON.stringify(run)), 'Run ' + run.id + ' must not contain an em dash');
  assert(!/–/.test(JSON.stringify(run)), 'Run ' + run.id + ' must not contain an en dash');
});
assert(Array.isArray(EXECUTION_MECHANISMS) && EXECUTION_MECHANISMS.length === 5, 'EXECUTION_MECHANISMS must have 5 entries');

// -- Model catalogue --
section('Model catalogue (MODEL_CATALOGUE)');
assert(Array.isArray(MODEL_CATALOGUE), 'MODEL_CATALOGUE must be an array');
assert(MODEL_CATALOGUE.length === 5, 'Must have exactly 5 model catalogue tiers');
['tier-efficient','tier-reasoning','tier-frontier','tier-embedding','tier-guardrail'].forEach(function(tid) {
  assert(MODEL_CATALOGUE.find(function(t){return t.id===tid;}), 'Model tier ' + tid + ' must exist');
});
MODEL_CATALOGUE.forEach(function(t) {
  assert(t.id, 'Model tier must have id');
  assert(t.label, 'Model tier ' + t.id + ' must have a label');
  assert(t.description, 'Model tier ' + t.id + ' must have a description');
  assert(t.governanceNote, 'Model tier ' + t.id + ' must have a governanceNote');
  assert(!/—/.test(JSON.stringify(t)), 'Model tier ' + t.id + ' must not contain an em dash');
  assert(!/–/.test(JSON.stringify(t)), 'Model tier ' + t.id + ' must not contain an en dash');
});
assert(Array.isArray(TASK_MODEL_ROUTING) && TASK_MODEL_ROUTING.length === 9, 'TASK_MODEL_ROUTING must have 9 entries');

// -- Value bridge --
section('Value bridge and scenarios (VALUE_BRIDGE, VALUE_SCENARIOS, ASSUMPTION_HISTORY)');
assert(Array.isArray(VALUE_BRIDGE) && VALUE_BRIDGE.length === 4, 'VALUE_BRIDGE must have exactly 4 components');
VALUE_BRIDGE.forEach(function(vb) {
  assert(vb.id, 'Value bridge component must have id');
  assert(vb.component, 'Value bridge ' + vb.id + ' must have a component name');
  assert(typeof vb.base === 'number', 'Value bridge ' + vb.id + ' must have a numeric base');
  assert(vb.qualifier, 'Value bridge ' + vb.id + ' must have a qualifier');
  assert(!/—/.test(JSON.stringify(vb)), 'Value bridge ' + vb.id + ' must not contain an em dash');
  assert(!/—/.test(JSON.stringify(vb)), 'Value bridge ' + vb.id + ' must not contain an en dash');
});
// Bridge formula check: A x B x C x D ~= 13.8%
var bridgeResult = VALUE_BRIDGE.reduce(function(acc, vb){ return acc * vb.base; }, 1);
assert(Math.abs(bridgeResult - 0.138) < 0.01, 'VALUE_BRIDGE base components must multiply to approximately 13.8% (got ' + (bridgeResult*100).toFixed(2) + '%)');

assert(Array.isArray(VALUE_SCENARIOS) && VALUE_SCENARIOS.length === 3, 'VALUE_SCENARIOS must have 3 entries (Prove, Replicate, Scale)');
['vs-prove','vs-replicate','vs-scale'].forEach(function(vid) {
  assert(VALUE_SCENARIOS.find(function(v){return v.id===vid;}), 'Value scenario ' + vid + ' must exist');
});
VALUE_SCENARIOS.forEach(function(vs) {
  assert(vs.qualifier, 'Value scenario ' + vs.id + ' must have a qualifier');
  assert(!/52 FTE/i.test(JSON.stringify(vs)), 'Value scenario ' + vs.id + ' must not contain forbidden 52 FTE');
  assert(!/3\.0%/.test(JSON.stringify(vs)), 'Value scenario ' + vs.id + ' must not contain forbidden 3.0%');
  assert(!/—/.test(JSON.stringify(vs)), 'Value scenario ' + vs.id + ' must not contain an em dash');
  assert(!/–/.test(JSON.stringify(vs)), 'Value scenario ' + vs.id + ' must not contain an en dash');
});
var scaleScenario = VALUE_SCENARIOS.find(function(v){return v.id==='vs-scale';});
assert(scaleScenario && scaleScenario.base === 0.138, 'Scale scenario base must be 0.138');
assert(scaleScenario && scaleScenario.capacityFreed === '396 FTE (capacity freed, not headcount reduction)', 'Scale scenario must label 396 FTE as capacity freed, not headcount reduction');

assert(Array.isArray(ASSUMPTION_HISTORY) && ASSUMPTION_HISTORY.length === 3, 'ASSUMPTION_HISTORY must have 3 entries');
var currentAssumption = ASSUMPTION_HISTORY.find(function(a){return a.status==='current';});
assert(currentAssumption, 'ASSUMPTION_HISTORY must have a current assumption entry');
assert(currentAssumption && currentAssumption.figure === '11-17% / 13.8%', 'Current assumption must be 11-17% / 13.8%');

// -- People impact --
section('People impact (GTRF_ROLES, WORKFORCE_IMPACT_SUMMARY)');
assert(Array.isArray(GTRF_ROLES) && GTRF_ROLES.length === 14, 'GTRF_ROLES must have exactly 14 entries');
GTRF_ROLES.forEach(function(r) {
  assert(r.id, 'GTRF role must have id');
  assert(r.roleType, 'GTRF role ' + r.id + ' must have a roleType');
  assert(r.futureTaskOutcome, 'GTRF role ' + r.id + ' must have a futureTaskOutcome');
  assert(validFTOs.includes(r.futureTaskOutcome), 'GTRF role ' + r.id + ' futureTaskOutcome must be valid');
  assert(r.qualifierNote && r.qualifierNote.includes('Subject to GTRF'), 'GTRF role ' + r.id + ' must have a qualifierNote referencing GTRF analysis');
  assert(!/—/.test(JSON.stringify(r)), 'GTRF role ' + r.id + ' must not contain an em dash');
  assert(!/–/.test(JSON.stringify(r)), 'GTRF role ' + r.id + ' must not contain an en dash');
});
assert(WORKFORCE_IMPACT_SUMMARY.fteInScope === 2864, 'WORKFORCE_IMPACT_SUMMARY fteInScope must be 2864');
assert(WORKFORCE_IMPACT_SUMMARY.capacityFreed === 396, 'WORKFORCE_IMPACT_SUMMARY capacityFreed must be 396');
assert(/working assumption|subject to GTRF/i.test(WORKFORCE_IMPACT_SUMMARY.fteInScopeNote), 'fteInScopeNote must label 2864 FTE as working assumption');
assert(/not automatic headcount reduction|not.*headcount reduction/i.test(WORKFORCE_IMPACT_SUMMARY.capacityFreedNote), 'capacityFreedNote must clarify capacity freed is not automatic headcount reduction');

// -- Extend content safeguards to new data files --
section('Content safeguards extended (new data files)');
var newDataText = ['runs.js','models.js','value-assumptions.js','people-impact.js'].map(function(f) {
  return readFileSync(join(ROOT, 'data', f), 'utf8');
}).join('\n');

assert(!/—/.test(newDataText), 'Unicode em dash must not appear in new data files');
assert(!/–/.test(newDataText), 'Unicode en dash must not appear in newDataFiles');
assert(!/52 FTE/i.test(newDataText), 'Forbidden value "52 FTE" must not appear in new data files');
assert(!/3\.0%/.test(newDataText), 'Forbidden value "3.0%" must not appear in new data files');
assert(!/enterprise.{0,50}headcount reduction/i.test(newDataText), 'Enterprise-wide headcount reduction claim must not appear in new data files');
assert(/Provisionally assigned/.test(newDataText), 'MITRA/MAYA must be labelled "Provisionally assigned" in runs.js');
assert(/working assumption/i.test(newDataText), 'Value assumptions must use working assumption language');
assert(/capacity freed/i.test(newDataText), '396 FTE must be framed as capacity freed in new data files');
assert(!/396 FTE.{0,60}headcount reduction target/i.test(newDataText), '396 FTE must not be framed as a headcount reduction target (must be capacity freed)');
assert(/Subject to GTRF/i.test(newDataText), 'GTRF role data must note subject to GTRF analysis');

// -- Summary --
console.log('\n========================');
console.log('Results: ' + passes + ' passed, ' + failures + ' failed');
if (failures > 0) {
  console.log('\nFailed assertions:');
  errors.forEach(function(e){ console.log('  ' + e); });
  process.exit(1);
} else {
  console.log('Result: PASS - All data integrity checks passed.');
  process.exit(0);
}
