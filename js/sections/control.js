// ── Section 5: Execution Control ──
function renderControl() {
  renderNinetyDayRunway();
  renderStageGateStrip();
  // Gate cards
  var gates = PHASES.filter(function(p){ return p.gate; }).map(function(p){ return p.gate; });
  document.getElementById('gate-cards').innerHTML = gates.map(function(g, i) {
    var colors = ['#3456C5','#5C4FC5','#7A3EB1'];
    return '<div class="gate-card">' +
      '<div class="gate-header" style="background:' + colors[i] + '">' +
        '<i class="ti ti-flag"></i>' +
        '<div><div>' + g.name + '</div><div style="font-size:11px;opacity:0.7">' + g.month + '</div></div>' +
        '<span class="chip chip-proposed" style="margin-left:auto">Proposed</span>' +
      '</div>' +
      '<div class="gate-body"><ul class="gate-criteria">' +
        g.criteria.map(function(c){ return '<li>' + c + '</li>'; }).join('') +
      '</ul></div>' +
    '</div>';
  }).join('');

  // Governance forums
  document.getElementById('gov-grid').innerHTML = GOVERNANCE_FORUMS.map(function(gf) {
    return '<div class="gov-card">' +
      '<div class="gov-icon"><i class="ti ' + gf.icon + '" style="color:var(--blue-dark)"></i></div>' +
      '<div class="gov-name">' + gf.name + '</div>' +
      '<div class="gov-cadence">' + gf.cadence + '</div>' +
      '<div class="gov-participants"><strong>Lead:</strong> ' + gf.lead + '</div>' +
      '<div class="gov-purpose">' + gf.purpose + '</div>' +
    '</div>';
  }).join('');

  renderRaid();
  renderRiskHeatmap();
  renderDecisionLog();
}

function renderNinetyDayRunway() {
  var el = document.getElementById('ninety-day-runway');
  if (!el) return;

  var PERIODS = [
    { label: 'Next 30 days', month: '2026-10', subtitle: 'October 2026 - G0' },
    { label: '31-60 days',   month: '2026-11', subtitle: 'November 2026' },
    { label: '61-90 days',   month: '2026-12', subtitle: 'December 2026 - G1 prep' }
  ];

  var periodColors = ['#3456C5', '#5C4FC5', '#7A3EB1'];

  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:8px">90-day programme runway</h2>';
  h += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Key milestones, decisions and deliverables in the first 90 days. Dates are proposed; to be confirmed at Gate 0.</p>';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">';

  PERIODS.forEach(function(period, pi) {
    var col = periodColors[pi];
    var milestones = (typeof MILESTONES !== 'undefined') ? MILESTONES.filter(function(m){ return m.date === period.month; }) : [];
    var decisions = DECISIONS.filter(function(d){ return d.due === period.month || d.due === period.month.substring(0, 7); });

    h += '<div style="background:var(--white);border:1px solid var(--line);border-top:3px solid ' + col + ';border-radius:10px;padding:16px">';
    h += '<div style="font-size:12px;font-weight:700;color:' + col + ';margin-bottom:2px">' + period.label + '</div>';
    h += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:12px">' + period.subtitle + '</div>';

    if (milestones.length > 0) {
      h += '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:5px">Milestones</div>';
      milestones.forEach(function(m) {
        h += '<div style="display:flex;align-items:flex-start;gap:7px;margin-bottom:6px">';
        h += '<span style="width:6px;height:6px;border-radius:50%;background:' + col + ';margin-top:4px;flex-shrink:0"></span>';
        h += '<span style="font-size:11px;line-height:1.3">' + m.label + '</span>';
        h += '</div>';
      });
    }

    if (decisions.length > 0) {
      h += '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:5px;margin-top:8px">Decisions required</div>';
      decisions.forEach(function(d) {
        h += '<div style="display:flex;align-items:flex-start;gap:7px;margin-bottom:6px">';
        h += '<span style="display:inline-block;font-size:8px;font-weight:700;background:var(--warning-pale);color:var(--warning);padding:1px 4px;border-radius:4px;flex-shrink:0;margin-top:2px">DEC</span>';
        h += '<span style="font-size:11px;line-height:1.3">' + d.title + ' (' + d.owner + ')</span>';
        h += '</div>';
      });
    }

    if (milestones.length === 0 && decisions.length === 0) {
      h += '<div style="font-size:11px;color:var(--text-muted);font-style:italic">To be populated at Gate 0 (October 2026).</div>';
    }

    h += '</div>';
  });

  h += '</div>';
  el.innerHTML = h;
}

function renderStageGateStrip() {
  var el = document.getElementById('stage-gate-strip');
  if (!el) return;

  var GATES = [
    { id: 'G0', name: 'Mobilisation', month: 'Oct 2026', phase: 'Phase 1 start', status: 'decision-required', color: '#3456C5' },
    { id: 'G1', name: 'B&R Proven',   month: 'Mar 2027', phase: 'Phase 1 end',   status: 'future', color: '#5C4FC5' },
    { id: 'G2', name: 'Foundation',   month: 'Sep 2027', phase: 'Phase 2 end',   status: 'future', color: '#7A3EB1' },
    { id: 'G3', name: 'Scale',        month: 'Nov 2027', phase: 'Phase 2+',      status: 'future', color: '#9333EA' },
    { id: 'G4', name: 'Full Scale',   month: 'Mar 2028', phase: 'Phase 3 end',   status: 'future', color: '#A100FF' }
  ];

  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:12px">Stage-gate readiness</h2>';
  h += '<div style="overflow-x:auto">';
  h += '<div style="display:flex;align-items:flex-start;gap:0;min-width:560px">';

  GATES.forEach(function(gate, idx) {
    var isLast = idx === GATES.length - 1;
    var isDecReq = gate.status === 'decision-required';

    h += '<div style="display:flex;align-items:center;flex:1">';
    h += '<div style="flex:1;text-align:center">';
    // Diamond
    h += '<div style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;margin-bottom:6px">';
    h += '<div style="width:32px;height:32px;background:' + (isDecReq ? gate.color : '#F3F4F6') + ';transform:rotate(45deg);border:' + (isDecReq ? 'none' : '2px solid #D1D5DB') + ';display:flex;align-items:center;justify-content:center">';
    h += '<span style="transform:rotate(-45deg);font-size:10px;font-weight:700;color:' + (isDecReq ? '#fff' : '#9CA3AF') + '">' + gate.id + '</span>';
    h += '</div></div>';
    // Label
    h += '<div style="font-size:11px;font-weight:700;color:' + (isDecReq ? gate.color : 'var(--ink)') + '">' + gate.name + '</div>';
    h += '<div style="font-size:10px;color:var(--text-muted)">' + gate.month + '</div>';
    if (isDecReq) h += '<span style="font-size:9px;font-weight:700;background:var(--warning-pale);color:var(--warning);padding:1px 6px;border-radius:6px;margin-top:4px;display:inline-block">Decision required</span>';
    else h += '<span style="font-size:9px;color:var(--text-muted);margin-top:4px;display:inline-block">Future</span>';
    h += '</div>';

    if (!isLast) h += '<div style="flex-shrink:0;width:24px;height:2px;background:#D1D5DB;margin-bottom:24px"></div>';
    h += '</div>';
  });

  h += '</div></div>';
  el.innerHTML = h;
}

function renderRiskHeatmap() {
  if (typeof echarts === 'undefined') return;
  uc3ChartDestroy('risk-heatmap');

  var probMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
  var impactMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
  var risks = RISKS.filter(function(r){ return r.category === 'Risk' && r.probability && r.impact; });
  if (risks.length === 0) return;

  uc3Chart('risk-heatmap', {
    title: {
      text: 'Risk profile: probability x impact',
      left: 0,
      textStyle: { fontSize: 13, fontWeight: '700', color: '#1A1A1A' },
      subtext: 'Risks only (not assumptions, issues or dependencies). Hover for detail.',
      subtextStyle: { fontSize: 10, color: '#6B7280' }
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        var r = risks[params.dataIndex];
        return '<strong>' + r.id + '</strong>: ' + r.title + '<br>Impact: ' + r.impact + ' | Probability: ' + r.probability;
      }
    },
    grid: { top: 72, bottom: 40, left: 60, right: 20 },
    xAxis: {
      type: 'value', name: 'Probability', min: 0.5, max: 3.5, nameLocation: 'center', nameGap: 28,
      axisLabel: { formatter: function(v){ return {1:'Low',2:'Medium',3:'High'}[v]||''; } },
      splitLine: { lineStyle: { color: '#E5E7EB' } }
    },
    yAxis: {
      type: 'value', name: 'Impact', min: 0.5, max: 3.5, nameLocation: 'center', nameGap: 40,
      axisLabel: { formatter: function(v){ return {1:'Low',2:'Medium',3:'High'}[v]||''; } },
      splitLine: { lineStyle: { color: '#E5E7EB' } }
    },
    series: [{
      type: 'scatter',
      symbolSize: 30,
      data: risks.map(function(r){
        return {
          value: [probMap[r.probability] || 2, impactMap[r.impact] || 2],
          itemStyle: { color: r.impact === 'High' ? '#DC2626' : r.impact === 'Medium' ? '#D97706' : '#059669', opacity: 0.85 }
        };
      }),
      label: { show: true, formatter: function(params){ return risks[params.dataIndex].id; }, position: 'inside', fontSize: 9, color: '#fff', fontWeight: '700' }
    }]
  });
}

function filterRaid(cat) {
  activeRaidFilter = cat;
  document.querySelectorAll('[data-raid]').forEach(function(b){ b.classList.toggle('active', b.dataset.raid===cat); });
  renderRaid();
}

function renderRaid() {
  var rows = activeRaidFilter === 'all' ? RISKS : RISKS.filter(function(r){ return r.category === activeRaidFilter; });
  var catColors = {Risk:'risk',Assumption:'assumption',Issue:'issue',Dependency:'dependency'};
  document.getElementById('raid-body').innerHTML = rows.map(function(r) {
    var catCls = catColors[r.category] || 'assumption';
    return '<tr>' +
      '<td style="white-space:nowrap;font-weight:600">' + r.id + '</td>' +
      '<td><span class="cat-chip cat-' + catCls + '">' + r.category + '</span></td>' +
      '<td>' + r.title + '</td>' +
      '<td>' + (r.impact ? '<span class="' + (r.impact==='High'?'impact-high':'impact-medium') + '">' + r.impact + '</span>' : '-') + '</td>' +
      '<td>' + r.owner + '</td>' +
      '<td style="color:var(--text-muted);font-size:11px">' + r.mitigation + '</td>' +
      '<td style="white-space:nowrap;font-size:11px">' + r.due + '</td>' +
    '</tr>';
  }).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:20px">No items in this category.</td></tr>';
}

function renderDecisionLog() {
  var catChips = {'Governance':'chip-phase-1','Investment':'chip-phase-3','Scope':'chip-phase-2','Technical':'chip-accenture'};
  document.getElementById('decisions-body').innerHTML = DECISIONS.map(function(d) {
    return '<tr>' +
      '<td style="font-weight:600">' + d.id + '</td>' +
      '<td>' + d.title + '<div style="font-size:11px;color:var(--text-muted);margin-top:3px">' + d.description + '</div></td>' +
      '<td><span class="chip ' + (catChips[d.category]||'chip-proposed') + '">' + d.category + '</span></td>' +
      '<td>' + d.owner + '</td>' +
      '<td style="white-space:nowrap">' + d.due + '</td>' +
      '<td>' + (d.status === 'decision-required' ? statusChip('decision-required') : statusChip('proposed')) + '</td>' +
    '</tr>';
  }).join('');
}

