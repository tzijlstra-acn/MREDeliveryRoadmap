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

let PHASES, WORKSTREAMS, DELIVERABLES, ROLES, PODS, MILESTONES, GOVERNANCE_FORUMS, DECISIONS, RISKS, KPIS, ADDONS, REGULATIONS, WAVES, STAGE_GATES;

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
var allText = ['phases.js','workstreams.js','deliverables.js','roles.js','milestones.js','governance.js','kpis.js','addons.js','regulations.js','waves.js'].map(function(f) {
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
