// ── Section 2: Roadmap ──
var MONTHS = ['Oct 26','Nov 26','Dec 26','Jan 27','Feb 27','Mar 27','Apr 27','May 27','Jun 27','Jul 27','Aug 27','Sep 27','Oct 27','Nov 27','Dec 27','Jan 28','Feb 28','Mar 28'];
var MONTH_KEYS = ['2026-10','2026-11','2026-12','2027-01','2027-02','2027-03','2027-04','2027-05','2027-06','2027-07','2027-08','2027-09','2027-10','2027-11','2027-12','2028-01','2028-02','2028-03'];

// BARS: [workstreamIdx, startMonthIdx(0-based, inclusive), endMonthIdx(0-based, exclusive), phaseId]
var BARS = [
  [0, 0, 6, 'phase-1'], [0, 6, 12, 'phase-2'], [0, 12, 18, 'phase-3'],
  [1, 0, 4, 'phase-1'], [1, 6, 9, 'phase-2'], [1, 12, 15, 'phase-3'],
  [2, 1, 4, 'phase-1'], [2, 9, 12, 'phase-2'], [2, 14, 16, 'phase-3'],
  [3, 2, 6, 'phase-1'], [3, 6, 12, 'phase-2'], [3, 12, 16, 'phase-3'],
  [4, 2, 6, 'phase-1'], [4, 6, 12, 'phase-2'], [4, 12, 18, 'phase-3'],
  [5, 2, 6, 'phase-1'], [5, 6, 10, 'phase-2'], [5, 12, 17, 'phase-3'],
  [6, 1, 6, 'phase-1'], [6, 9, 12, 'phase-2'], [6, 12, 18, 'phase-3'],
  [7, 6, 12, 'phase-2'], [7, 12, 18, 'phase-3']
];

var PHASE_COLORS = { 'phase-1': '#3456C5', 'phase-2': '#5C4FC5', 'phase-3': '#7A3EB1' };

var WS_LABELS = [
  'Programme Management',
  'Regulatory Coverage',
  'Compliance Object Model',
  'AI Agents and Orchestration',
  'Data and Integration',
  'Platform and Security',
  'Operating Model',
  'Evidence, Verification and Reporting'
];

// Gate: monthIdx of the END of the month when the gate falls
var GATE_DEFS = [
  { id: 'G0', monthIdx: 0, label: 'G0' },
  { id: 'G1', monthIdx: 2, label: 'G1' },
  { id: 'G2', monthIdx: 5, label: 'G2' },
  { id: 'G3', monthIdx: 11, label: 'G3' },
  { id: 'G4', monthIdx: 17, label: 'G4' }
];

function setPhaseFilter(phase) {
  activePhaseFilter = phase;
  document.querySelectorAll('[data-phase]').forEach(function(b) { b.classList.toggle('active', b.dataset.phase === phase); });
  renderRoadmap();
}

function setRoadmapView(view) {
  roadmapView = view;
  document.querySelectorAll('[data-view]').forEach(function(b) { b.classList.toggle('active', b.dataset.view === view); });
  renderRoadmap();
}

function renderRoadmap() {
  if (roadmapView === '6mo') {
    _renderMonthlyDetail();
  } else {
    _renderGanttGrid();
  }
}

// ── CSS Grid Gantt ──
function _renderGanttGrid() {
  var phaseFilter = activePhaseFilter;

  // Grid: col 1 = label (160px) + 18 month cols
  // Rows: 1=phase headers, 2=month headers, 3=gates, 4-11=workstreams, 12=deliverables
  var LABEL_W = '160px';
  var gridCols = LABEL_W + ' repeat(18, minmax(44px, 1fr))';

  var html = '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch">';
  html += '<div style="display:grid;grid-template-columns:' + gridCols + ';min-width:840px;border:1px solid var(--line);border-radius:8px;overflow:hidden">';

  // ── Row 1: Phase headers ──
  html += '<div style="grid-column:1;grid-row:1;background:var(--panel);border-right:2px solid var(--line);border-bottom:1px solid var(--line);padding:7px 8px;display:flex;align-items:center">';
  html += '<span style="font-size:9px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em">Workstream</span></div>';

  var phaseSpans = [
    { id: 'phase-1', col: '2/8',  color: '#3456C5', label: 'Phase 1: Integrate and Prove', dates: 'Oct 2026 - Mar 2027' },
    { id: 'phase-2', col: '8/14', color: '#5C4FC5', label: 'Phase 2: Orchestrate',          dates: 'Apr 2027 - Sep 2027' },
    { id: 'phase-3', col: '14/20',color: '#7A3EB1', label: 'Phase 3: Industrialise',        dates: 'Oct 2027 - Mar 2028' }
  ];

  phaseSpans.forEach(function(ph) {
    var dim = (phaseFilter !== 'all' && phaseFilter !== ph.id) ? '0.35' : '1';
    html += '<div style="grid-column:' + ph.col + ';grid-row:1;background:' + ph.color + ';opacity:' + dim + ';padding:7px 10px;border-right:2px solid rgba(255,255,255,0.2);border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px">';
    html += '<div><div style="font-size:11px;font-weight:700;color:#fff">' + ph.label + '</div>';
    html += '<div style="font-size:10px;color:rgba(255,255,255,0.7)">' + ph.dates + '</div></div>';
    html += '</div>';
  });

  // ── Row 2: Month headers ──
  html += '<div style="grid-column:1;grid-row:2;background:var(--panel);border-right:2px solid var(--line);border-bottom:1px solid var(--line)"></div>';
  MONTHS.forEach(function(m, i) {
    var phColor = i < 6 ? '#3456C5' : (i < 12 ? '#5C4FC5' : '#7A3EB1');
    var dim = phaseFilter !== 'all' ? (
      (phaseFilter === 'phase-1' && i < 6) || (phaseFilter === 'phase-2' && i >= 6 && i < 12) || (phaseFilter === 'phase-3' && i >= 12) ? '1' : '0.35'
    ) : '1';
    var borderL = (i === 6 || i === 12) ? '2px solid var(--line)' : '1px solid var(--line)';
    html += '<div style="grid-column:' + (i + 2) + ';grid-row:2;background:var(--panel);border-bottom:1px solid var(--line);border-left:' + borderL + ';padding:4px 3px;text-align:center;opacity:' + dim + '">';
    html += '<div style="font-size:9px;font-weight:600;color:' + phColor + '">' + m + '</div></div>';
  });

  // ── Row 3: Gate diamonds ──
  html += '<div style="grid-column:1;grid-row:3;background:var(--white);border-right:2px solid var(--line);border-bottom:1px solid var(--line)"></div>';
  for (var ci = 2; ci <= 19; ci++) {
    html += '<div style="grid-column:' + ci + ';grid-row:3;background:var(--white);border-left:1px solid var(--line);border-bottom:1px solid var(--line);height:24px"></div>';
  }
  GATE_DEFS.forEach(function(g) {
    var col = g.monthIdx + 2;
    html += '<div style="grid-column:' + col + ';grid-row:3;display:flex;justify-content:center;align-items:center;pointer-events:none;z-index:2">';
    html += '<div title="' + g.id + '" style="display:flex;flex-direction:column;align-items:center;gap:0">';
    html += '<div style="width:10px;height:10px;background:var(--purple);transform:rotate(45deg)"></div>';
    html += '<div style="font-size:8px;font-weight:700;color:var(--purple);margin-top:1px">' + g.id + '</div>';
    html += '</div></div>';
  });

  // ── Rows 4-11: Workstream label + bars ──
  WS_LABELS.forEach(function(label, wsIdx) {
    var row = wsIdx + 4;
    var evenBg = wsIdx % 2 === 0 ? 'var(--white)' : 'var(--panel)';

    // Label cell
    html += '<div style="grid-column:1;grid-row:' + row + ';background:' + evenBg + ';border-right:2px solid var(--line);border-bottom:1px solid var(--line);padding:5px 8px;display:flex;align-items:center">';
    html += '<span style="font-size:10px;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;max-width:144px" title="WS-' + (wsIdx + 1) + ': ' + label + '">WS-' + (wsIdx + 1) + ' ' + label + '</span></div>';

    // Background cells for this WS row
    for (var mc = 2; mc <= 19; mc++) {
      var borderLBg = (mc === 8 || mc === 14) ? '2px solid var(--line)' : '1px solid rgba(217,220,225,0.4)';
      html += '<div style="grid-column:' + mc + ';grid-row:' + row + ';background:' + evenBg + ';border-left:' + borderLBg + ';border-bottom:1px solid rgba(217,220,225,0.6)"></div>';
    }

    // Bars for this workstream
    BARS.filter(function(b) { return b[0] === wsIdx; }).forEach(function(bar) {
      var phase = bar[3];
      if (phaseFilter !== 'all' && phase !== phaseFilter) return;
      var start = bar[1], end = bar[2];
      var colStart = start + 2;
      var colEnd = end + 2;
      var color = PHASE_COLORS[phase];
      var span = end - start;
      var borderL = (colStart === 8 || colStart === 14) ? '2px solid var(--line)' : '1px solid transparent';

      html += '<div style="grid-column:' + colStart + '/' + colEnd + ';grid-row:' + row + ';padding:4px 3px;display:flex;align-items:center;border-left:' + borderL + '">';
      html += '<div style="height:22px;width:100%;background:' + color + ';border-radius:4px;display:flex;align-items:center;padding:0 6px;overflow:hidden">';
      if (span >= 2) {
        html += '<span style="font-size:9px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + label + '</span>';
      }
      html += '</div></div>';
    });
  });

  // ── Row 12: Deliverable strip ──
  html += '<div style="grid-column:1;grid-row:12;background:var(--panel);border-right:2px solid var(--line);border-top:2px solid var(--line);padding:6px 8px;display:flex;align-items:center">';
  html += '<span style="font-size:9px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em">Deliverables</span></div>';

  var delsByPhase = { 'phase-1': [], 'phase-2': [], 'phase-3': [] };
  if (typeof DELIVERABLES !== 'undefined') {
    DELIVERABLES.forEach(function(d) { if (delsByPhase[d.phaseId]) delsByPhase[d.phaseId].push(d); });
  }

  phaseSpans.forEach(function(ph) {
    var dims = (phaseFilter !== 'all' && phaseFilter !== ph.id) ? '0.35' : '1';
    html += '<div style="grid-column:' + ph.col + ';grid-row:12;background:var(--panel);border-left:' + (ph.col === '2/8' ? '0' : '2px solid var(--line)') + ';border-top:2px solid var(--line);padding:5px 6px;display:flex;align-items:center;flex-wrap:wrap;gap:3px;opacity:' + dims + '">';
    (delsByPhase[ph.id] || []).forEach(function(d) {
      html += '<span onclick="openDeliverableDrawer(\'' + d.id + '\')" style="cursor:pointer;font-size:9px;background:var(--white);border:1px solid var(--line);padding:1px 6px;border-radius:8px;font-weight:600" title="' + d.name + '">' + d.id + '</span>';
    });
    html += '</div>';
  });

  html += '</div></div>';
  html += '<div style="margin-top:8px;font-size:11px;color:var(--text-muted)">Click a deliverable badge to view the full definition of done. &#9670; marks stage gates (G0-G4).</div>';

  document.getElementById('roadmap-container').innerHTML = html;
}

// ── Monthly detail view ──
function _renderMonthlyDetail() {
  var phaseFilter = activePhaseFilter;
  var detailPhase = phaseFilter === 'all' ? 'phase-1' : phaseFilter;
  var detailMonths = ROADMAP_CONTENT.filter(function(m) { return m.phase === detailPhase; });
  var phColors = { 'phase-1': '#3456C5', 'phase-2': '#5C4FC5', 'phase-3': '#7A3EB1' };
  var phColor = phColors[detailPhase];

  var rowDefs = [
    { id: 'regulatoryPortfolio', label: 'Regulatory portfolio', color: '#059669' },
    { id: 'complianceContent', label: 'Compliance content and controls', color: '#3456C5' },
    { id: 'platformIntegration', label: 'Platform and integration', color: '#5C4FC5' },
    { id: 'userWorkflow', label: 'User workflow and adoption', color: '#A100FF' },
    { id: 'evidenceReporting', label: 'Evidence, reporting and operations', color: '#7A3EB1' }
  ];

  var html = '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch">';
  html += '<table style="width:100%;border-collapse:collapse;font-size:12px;min-width:900px">';
  html += '<colgroup><col style="width:150px">';
  detailMonths.forEach(function() { html += '<col style="min-width:140px">'; });
  html += '</colgroup>';
  html += '<thead><tr><th colspan="' + (detailMonths.length + 1) + '" style="padding:8px 12px;background:' + phColor + ';color:#fff;text-align:left;font-size:13px;font-weight:700">Monthly detail view</th></tr>';
  html += '<tr><th style="padding:8px 12px;background:var(--panel);border:1px solid var(--line);text-align:left;font-size:11px;color:var(--text-muted)">Track</th>';
  detailMonths.forEach(function(m) {
    html += '<th style="padding:8px 10px;background:var(--panel);border:1px solid var(--line);text-align:left;font-size:11px;font-weight:700;color:' + phColor + '">' + m.monthLabel;
    if (m.clientDecision) html += '<br><span style="background:var(--warning-pale);color:var(--warning);padding:1px 5px;border-radius:4px;font-size:9px;font-weight:600">Decision</span>';
    html += '</th>';
  });
  html += '</tr></thead><tbody>';

  rowDefs.forEach(function(row) {
    html += '<tr>';
    html += '<td style="padding:8px 10px;border:1px solid var(--line);background:var(--panel);vertical-align:top">';
    html += '<div style="font-size:10px;font-weight:700;color:' + row.color + '">' + row.label + '</div></td>';
    detailMonths.forEach(function(month) {
      var track = month[row.id] || {};
      html += '<td style="padding:8px 10px;border:1px solid var(--line);vertical-align:top;background:var(--white)">';
      if (track.action) {
        html += '<div style="font-size:11px;font-weight:600;margin-bottom:3px;color:var(--ink)">' + track.action + '</div>';
        html += '<div style="font-size:10px;color:var(--text-muted);margin-bottom:4px">' + (track.output || '') + '</div>';
        if (track.pod) html += '<span style="font-size:9px;background:var(--panel);border:1px solid var(--line);padding:1px 6px;border-radius:8px">' + track.pod + '</span>';
      }
      html += '</td>';
    });
    html += '</tr>';
  });

  html += '<tr><td style="padding:7px 10px;border:1px solid var(--line);background:var(--panel);font-size:10px;font-weight:700;color:var(--text-muted)">Core output</td>';
  detailMonths.forEach(function(month) {
    html += '<td style="padding:7px 10px;border:1px solid var(--line);background:var(--panel);font-size:11px;font-weight:600;color:var(--ink)">';
    html += (month.coreOutput || '');
    if (month.clientDecision) html += '<div style="margin-top:4px;font-size:10px;background:var(--warning-pale);color:var(--warning);padding:2px 6px;border-radius:4px">' + month.clientDecision + '</div>';
    html += '</td>';
  });
  html += '</tr></tbody></table></div>';
  html += '<div style="margin-top:8px;font-size:11px;color:var(--text-muted)">Switch to Phase summary to see the full 18-month Gantt. Use the phase filter to select a different phase for detail.</div>';

  document.getElementById('roadmap-container').innerHTML = html;
}

function openWpDrawer(deliverableId) {
  if (typeof openDeliverableDrawer === 'function') openDeliverableDrawer(deliverableId);
}
