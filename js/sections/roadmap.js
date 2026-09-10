// ── Section 2: Roadmap ──
var MONTHS = ['Oct 26','Nov 26','Dec 26','Jan 27','Feb 27','Mar 27','Apr 27','May 27','Jun 27','Jul 27','Aug 27','Sep 27','Oct 27','Nov 27','Dec 27','Jan 28','Feb 28','Mar 28'];
var MONTH_KEYS = ['2026-10','2026-11','2026-12','2027-01','2027-02','2027-03','2027-04','2027-05','2027-06','2027-07','2027-08','2027-09','2027-10','2027-11','2027-12','2028-01','2028-02','2028-03'];

// Roadmap bar definitions: [workstreamIdx, startMonthIdx(0-based), endMonthIdx(0-based, exclusive), phaseId]
var BARS = [
  // WS-1 Programme - all 18 months
  [0, 0, 6, 'phase-1'], [0, 6, 12, 'phase-2'], [0, 12, 18, 'phase-3'],
  // WS-2 Compliance
  [1, 0, 4, 'phase-1'], [1, 6, 9, 'phase-2'], [1, 12, 15, 'phase-3'],
  // WS-3 Process
  [2, 1, 4, 'phase-1'], [2, 9, 12, 'phase-2'], [2, 14, 16, 'phase-3'],
  // WS-4 AI and Orch
  [3, 2, 6, 'phase-1'], [3, 6, 12, 'phase-2'], [3, 12, 16, 'phase-3'],
  // WS-5 Data and Integration
  [4, 2, 6, 'phase-1'], [4, 6, 12, 'phase-2'], [4, 12, 18, 'phase-3'],
  // WS-6 Platform and Security
  [5, 2, 6, 'phase-1'], [5, 6, 10, 'phase-2'], [5, 12, 17, 'phase-3'],
  // WS-7 Operating Model
  [6, 1, 6, 'phase-1'], [6, 9, 12, 'phase-2'], [6, 12, 18, 'phase-3'],
  // WS-8 Evidence, Verification and Reporting
  [7, 6, 12, 'phase-2'], [7, 12, 18, 'phase-3']
];

var PHASE_COLORS = {'phase-1':'#3456C5','phase-2':'#5C4FC5','phase-3':'#7A3EB1'};

function setPhaseFilter(phase) {
  activePhaseFilter = phase;
  document.querySelectorAll('[data-phase]').forEach(function(b){ b.classList.toggle('active', b.dataset.phase===phase); });
  renderRoadmap();
}
function setRoadmapView(view) {
  roadmapView = view;
  document.querySelectorAll('[data-view]').forEach(function(b){ b.classList.toggle('active', b.dataset.view===view); });
  renderRoadmap();
}

function renderRoadmap() {
  var phaseFilter = activePhaseFilter;
  var showDetail = roadmapView === '6mo';

  var rowDefs = [
    { id: 'regulatoryPortfolio', label: 'Regulatory portfolio', track: 'B', color: '#059669', trackLabel: 'Track B' },
    { id: 'complianceContent', label: 'Compliance content and controls', track: 'A', color: '#3456C5', trackLabel: 'Track A' },
    { id: 'platformIntegration', label: 'Platform and integration', track: 'A', color: '#5C4FC5', trackLabel: 'Track A' },
    { id: 'userWorkflow', label: 'User workflow and adoption', track: 'C', color: '#A100FF', trackLabel: 'Track C' },
    { id: 'evidenceReporting', label: 'Evidence, reporting and operations', track: 'A', color: '#7A3EB1', trackLabel: 'Track A' }
  ];

  var phaseConf = [
    { id: 'phase-1', label: 'Phase 1', sub: 'Integrate and Prove', color: '#3456C5', months: ROADMAP_CONTENT.filter(function(m){return m.phase==='phase-1';}) },
    { id: 'phase-2', label: 'Phase 2', sub: 'Orchestrate and Build the Factory', color: '#5C4FC5', months: ROADMAP_CONTENT.filter(function(m){return m.phase==='phase-2';}) },
    { id: 'phase-3', label: 'Phase 3', sub: 'Scale and Operate', color: '#7A3EB1', months: ROADMAP_CONTENT.filter(function(m){return m.phase==='phase-3';}) }
  ];

  var phases = phaseFilter === 'all' ? phaseConf : phaseConf.filter(function(p){return p.id===phaseFilter;});
  var html = '';

  if (!showDetail) {
    // Summary view: 3-phase columns
    html += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px;min-width:700px">';
    html += '<colgroup><col style="width:170px">';
    phases.forEach(function(){ html += '<col>'; });
    html += '</colgroup>';
    html += '<thead><tr><th style="padding:8px 12px;background:var(--panel);border:1px solid var(--line);text-align:left;font-size:11px;color:var(--text-muted)">Track / Row</th>';
    phases.forEach(function(ph) {
      html += '<th style="padding:10px 12px;background:' + ph.color + ';color:#fff;border:1px solid ' + ph.color + ';text-align:left">';
      html += '<div style="font-weight:700;font-size:13px">' + ph.label + '</div>';
      html += '<div style="font-size:11px;opacity:0.85">' + ph.sub + '</div></th>';
    });
    html += '</tr></thead><tbody>';

    rowDefs.forEach(function(row) {
      var isTrackC = row.track === 'C';
      var rowBg = isTrackC ? '#F8F4FF' : 'var(--white)';
      html += '<tr>';
      html += '<td style="padding:10px 12px;border:1px solid var(--line);background:var(--panel);vertical-align:top">';
      html += '<div style="font-size:10px;font-weight:700;color:' + row.color + ';letter-spacing:0.06em">' + row.trackLabel + '</div>';
      html += '<div style="font-weight:600;font-size:12px;margin-top:2px">' + row.label + '</div>';
      html += '</td>';
      phases.forEach(function(ph) {
        var actions = ph.months.map(function(m){ return m[row.id] ? m[row.id].action : ''; }).filter(Boolean);
        var outputs = ph.months.map(function(m){ return m[row.id] ? m[row.id].output : ''; }).filter(Boolean);
        var pods = ph.months.map(function(m){ return m[row.id] ? m[row.id].pod : ''; }).filter(Boolean);
        var uniquePods = pods.filter(function(p,i,a){return a.indexOf(p)===i;});

        var firstAction = actions[0] || '';
        var lastOutput = outputs[outputs.length-1] || '';

        html += '<td style="padding:10px 12px;border:1px solid var(--line);vertical-align:top;background:' + rowBg + '">';
        html += '<div style="font-size:12px;font-weight:500;margin-bottom:4px">' + firstAction + '</div>';
        if (actions.length > 1) {
          html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">through to: ' + lastOutput + '</div>';
        }
        uniquePods.forEach(function(pod) {
          html += '<span style="font-size:10px;background:var(--panel);border:1px solid var(--line);padding:2px 7px;border-radius:10px;display:inline-block;margin:2px 2px 0 0">' + pod + '</span>';
        });
        html += '</td>';
      });
      html += '</tr>';
    });

    // Deliverable strip
    html += '<tr><td style="padding:8px 12px;border:1px solid var(--line);background:var(--panel);font-size:11px;font-weight:700;color:var(--text-muted)">Key deliverables</td>';
    var delsByPhase = { 'phase-1': [], 'phase-2': [], 'phase-3': [] };
    DELIVERABLES.forEach(function(d){ if (delsByPhase[d.phaseId]) delsByPhase[d.phaseId].push(d); });
    phases.forEach(function(ph) {
      html += '<td style="padding:8px 12px;border:1px solid var(--line);background:var(--panel)">';
      delsByPhase[ph.id].forEach(function(d) {
        html += '<span onclick="openDeliverableDrawer(\'' + d.id + '\')" style="cursor:pointer;font-size:10px;background:var(--white);border:1px solid var(--line);padding:2px 7px;border-radius:10px;display:inline-block;margin:2px 2px 0 0;font-weight:600" title="' + d.name + '">' + d.id + '</span>';
      });
      html += '</td>';
    });
    html += '</tr>';

    // Stage gate strip
    html += '<tr><td style="padding:8px 12px;border:1px solid var(--line);background:var(--panel);font-size:11px;font-weight:700;color:var(--text-muted)">Stage gates</td>';
    var gatesByPhase = { 'phase-1': [], 'phase-2': [], 'phase-3': [] };
    MILESTONES.filter(function(m){return m.type==='gate' && m.id !== 'G0';}).forEach(function(g){
      if (gatesByPhase[g.phase]) gatesByPhase[g.phase].push(g);
    });
    phases.forEach(function(ph) {
      html += '<td style="padding:8px 12px;border:1px solid var(--line);background:var(--panel)">';
      var g0 = ph.id === 'phase-1' ? MILESTONES.find(function(m){return m.id==='G0';}) : null;
      if (g0) {
        html += '<span style="font-size:10px;background:var(--purple);color:#fff;padding:2px 8px;border-radius:10px;font-weight:700;display:inline-block;margin:2px 2px 0 0" title="' + g0.date + '">' + g0.id + ' ' + g0.date + '</span>';
      }
      (gatesByPhase[ph.id] || []).forEach(function(g) {
        html += '<span style="font-size:10px;background:var(--purple);color:#fff;padding:2px 8px;border-radius:10px;font-weight:700;display:inline-block;margin:2px 2px 0 0" title="' + g.date + '">' + g.id + ' ' + g.date + '</span>';
      });
      html += '</td>';
    });
    html += '</tr>';

    html += '</tbody></table></div>';

  } else {
    // Monthly detail view: show months for selected phase (default Phase 1)
    var detailPhase = phaseFilter === 'all' ? 'phase-1' : phaseFilter;
    var detailMonths = ROADMAP_CONTENT.filter(function(m){return m.phase===detailPhase;});
    var phMeta = phaseConf.find(function(p){return p.id===detailPhase;}) || phaseConf[0];

    html += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px;min-width:900px">';
    html += '<colgroup><col style="width:150px">';
    detailMonths.forEach(function(){ html += '<col style="min-width:140px">'; });
    html += '</colgroup>';
    html += '<thead><tr><th style="padding:8px 12px;background:' + phMeta.color + ';color:#fff;border:1px solid ' + phMeta.color + '" colspan="' + (detailMonths.length+1) + '">' + phMeta.label + ': ' + phMeta.sub + '</th></tr>';
    html += '<tr><th style="padding:8px 12px;background:var(--panel);border:1px solid var(--line);text-align:left;font-size:11px;color:var(--text-muted)">Track / Row</th>';
    detailMonths.forEach(function(m) {
      html += '<th style="padding:8px 10px;background:var(--panel);border:1px solid var(--line);text-align:left;font-size:11px;font-weight:700">' + m.monthLabel;
      if (m.clientDecision) html += '<br><span style="background:var(--warning-pale);color:var(--warning);padding:1px 5px;border-radius:4px;font-size:10px;font-weight:600">Decision</span>';
      html += '</th>';
    });
    html += '</tr></thead><tbody>';

    rowDefs.forEach(function(row) {
      var isTrackC = row.track === 'C';
      var rowBg = isTrackC ? '#F8F4FF' : 'var(--white)';
      html += '<tr>';
      html += '<td style="padding:8px 10px;border:1px solid var(--line);background:var(--panel);vertical-align:top">';
      html += '<div style="font-size:10px;font-weight:700;color:' + row.color + '">' + row.trackLabel + '</div>';
      html += '<div style="font-weight:600;font-size:11px">' + row.label + '</div>';
      html += '</td>';
      detailMonths.forEach(function(month) {
        var track = month[row.id] || {};
        html += '<td style="padding:8px 10px;border:1px solid var(--line);vertical-align:top;background:' + rowBg + '">';
        if (track.action) {
          html += '<div style="font-size:11px;font-weight:600;margin-bottom:3px">' + track.action + '</div>';
          html += '<div style="font-size:10px;color:var(--text-muted);font-style:italic;margin-bottom:4px">' + (track.output || '') + '</div>';
          if (track.pod) html += '<span style="font-size:10px;background:var(--panel);border:1px solid var(--line);padding:1px 6px;border-radius:8px">' + track.pod + '</span>';
        }
        html += '</td>';
      });
      html += '</tr>';
    });

    // Core output row
    html += '<tr><td style="padding:8px 10px;border:1px solid var(--line);background:var(--panel);font-size:11px;font-weight:700;color:var(--text-muted)">Core output</td>';
    detailMonths.forEach(function(month) {
      html += '<td style="padding:8px 10px;border:1px solid var(--line);background:var(--panel);font-size:11px;font-weight:600">';
      html += (month.coreOutput || '');
      if (month.clientDecision) html += '<div style="margin-top:4px;font-size:10px;background:var(--warning-pale);color:var(--warning);padding:2px 6px;border-radius:4px">' + month.clientDecision + '</div>';
      html += '</td>';
    });
    html += '</tr></tbody></table></div>';
  }

  document.getElementById('roadmap-container').innerHTML = html;
}

function _renderRoadmapGanttLegacy() {
  var showMonths = roadmapView === '6mo' ? 6 : 18;
  var cols = MONTHS.slice(0, showMonths);

  var phaseRanges = [
    {id:'phase-1',name:'Phase 1 - Integrate',color:'#3456C5',start:0,end:6},
    {id:'phase-2',name:'Phase 2 - Orchestrate',color:'#5C4FC5',start:6,end:12},
    {id:'phase-3',name:'Phase 3 - Industrialise',color:'#7A3EB1',start:12,end:18}
  ].filter(function(p){ return p.start < showMonths; });

  var html = '<table class="gantt" aria-label="Programme Gantt chart"><colgroup><col class="gantt-label-col">';
  cols.forEach(function(){ html += '<col class="gantt-month">'; });
  html += '</colgroup><thead><tr><th class="gantt-ws-label" style="background:var(--panel);color:var(--ink)">Workstream</th>';

  // Phase band headers
  phaseRanges.forEach(function(pr) {
    var span = Math.min(pr.end, showMonths) - pr.start;
    if (span <= 0) return;
    html += '<th colspan="' + span + '" style="background:' + pr.color + '">' + pr.name + '</th>';
  });
  html += '</tr><tr><th class="gantt-ws-label" style="background:var(--panel);color:var(--text-muted);font-size:10px">Month</th>';
  cols.forEach(function(m) { html += '<th>' + m + '</th>'; });
  html += '</tr></thead><tbody>';

  WORKSTREAMS.forEach(function(ws, wsIdx) {
    if (activePhaseFilter !== 'all' && !ws.phases.includes(activePhaseFilter)) return;

    html += '<tr>';
    html += '<td class="gantt-ws-label" style="background:' + ws.color + '14;border-left:3px solid ' + ws.color + '">';
    html += '<span style="font-size:10px;font-weight:700;color:' + ws.color + '">' + ws.shortName + '</span></td>';

    // Build a map of bars for this workstream
    var bars = BARS.filter(function(b){ return b[0] === wsIdx; });

    for (var m = 0; m < showMonths; m++) {
      var bar = null;
      bars.forEach(function(b) {
        if (m >= b[1] && m < b[2]) bar = b;
      });
      if (bar) {
        if (activePhaseFilter !== 'all' && bar[3] !== activePhaseFilter) {
          html += '<td class="phase-band-' + bar[3].replace('phase-','') + '"></td>';
        } else {
          var phColor = PHASE_COLORS[bar[3]] || '#888';
          var isFirst = m === bar[1];
          var barWidth = bar[2] - bar[1];
          if (isFirst) {
            html += '<td colspan="' + Math.min(barWidth, showMonths - m) + '" style="padding:4px">';
            html += '<div class="gantt-bar" style="background:' + phColor + ';min-width:0" onclick="openWpDrawer(' + wsIdx + ',' + m + ')" title="' + ws.name + ' - click for details">';
            if (barWidth >= 3) html += '<span>' + ws.shortName + '</span>';
            html += '</div></td>';
            m += Math.min(barWidth, showMonths - m) - 1;
          }
        }
      } else {
        var phaseBg = '';
        if (m < 6) phaseBg = ' class="phase-band-1"';
        else if (m < 12) phaseBg = ' class="phase-band-2"';
        else phaseBg = ' class="phase-band-3"';
        html += '<td' + phaseBg + '></td>';
      }
    }
    html += '</tr>';
  });

  // Milestone row
  html += '<tr class="gantt-milestone-row"><td class="gantt-ws-label" style="font-size:10px;color:var(--text-muted)">Milestones</td>';
  for (var m2 = 0; m2 < showMonths; m2++) {
    var key = MONTH_KEYS[m2];
    var milestone = MILESTONES.find(function(ml){ return ml.date === key; });
    if (milestone) {
      var isGate = milestone.type === 'gate';
      var color = isGate ? '#A100FF' : PHASE_COLORS[milestone.phase] || '#888';
      html += '<td style="position:relative" title="' + milestone.label + '">';
      html += '<div class="' + (isGate?'gantt-gate':'gantt-diamond') + '" style="background:' + color + '" aria-label="' + milestone.label + '"></div>';
      html += '</td>';
    } else {
      html += '<td></td>';
    }
  }
  html += '</tr></tbody></table>';
  document.getElementById('roadmap-container').innerHTML = html;
}

function openWpDrawer(wsIdx, monthIdx) {
  var ws = WORKSTREAMS[wsIdx];
  var phase = PHASES.find(function(p){ return monthIdx >= 0 && monthIdx < 6 ? p.id==='phase-1' : monthIdx < 12 ? p.id==='phase-2' : p.id==='phase-3'; });
  if (!phase) return;
  var wp = (phase.workPackages || []).find(function(w){ return MONTH_KEYS[monthIdx] === w.month; });

  document.getElementById('dd-id').textContent = ws.shortName + ' - ' + (wp ? wp.title : phase.label);
  document.getElementById('dd-name').textContent = ws.name;
  document.getElementById('dd-chips').innerHTML = phaseChip(phase.id) + ' ' + statusChip('proposed');
  document.getElementById('dd-summary').textContent = ws.purpose;

  var dod = document.getElementById('dd-dod');
  if (wp) {
    dod.innerHTML = wp.activities.map(function(a){ return '<li class="dod-item"><i class="ti ti-circle-check"></i>' + a + '</li>'; }).join('');
  } else {
    dod.innerHTML = ws.coreDeliverables.map(function(d){ return '<li class="dod-item"><i class="ti ti-circle-check"></i>' + d + '</li>'; }).join('');
  }

  document.getElementById('dd-dec-wrap').style.display = 'none';
  document.getElementById('dd-roles').innerHTML = '<strong>Lead:</strong> ' + ws.lead;
  document.getElementById('dd-deps').textContent = 'Deliverables: ' + ws.deliverableIds.join(', ');

  openDrawer('del-drawer');
}

