// ── Section 6: Value, Tokenomics and Assumptions ──

function renderValueDerivationBridge() {
  var el = document.getElementById('value-derivation-bridge');
  if (!el) return;
  var html = '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;">Savings derivation bridge (13.8% derivation)</div>';
  html += '<div style="overflow-x:auto;"><div style="display:flex;align-items:center;gap:0;min-width:max-content;margin-bottom:12px;">';
  VALUE_BRIDGE.forEach(function(vb, i) {
    html += '<div style="background:#fff;border:1px solid var(--line);border-radius:8px;padding:14px;min-width:160px;text-align:center;">';
    html += '<div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px;">Component ' + vb.symbol + '</div>';
    html += '<div style="font-size:24px;font-weight:800;color:#1A1A1A;font-family:\'Space Grotesk\',sans-serif;">' + vb.label + '</div>';
    html += '<div style="font-size:10px;color:var(--text-muted);margin-top:2px;">' + vb.rangeLabel + ' range</div>';
    html += '<div style="font-size:11px;font-weight:600;color:#1A1A1A;margin-top:8px;line-height:1.3;">' + vb.component + '</div>';
    html += '<div style="font-size:10px;color:var(--text-muted);margin-top:4px;line-height:1.3;">' + vb.scope + '</div>';
    html += '</div>';
    if (i < VALUE_BRIDGE.length - 1) {
      html += '<div style="padding:0 8px;font-size:20px;color:#9CA3AF;font-weight:700;">x</div>';
    }
  });
  html += '<div style="padding:0 12px;font-size:20px;color:#3456C5;font-weight:700;">=</div>';
  html += '<div style="background:linear-gradient(135deg,#3456C5,#5C4FC5);border-radius:8px;padding:14px;min-width:140px;text-align:center;">';
  html += '<div style="font-size:11px;font-weight:700;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:4px;">Net result</div>';
  html += '<div style="font-size:28px;font-weight:800;color:#fff;font-family:\'Space Grotesk\',sans-serif;">13.8%</div>';
  html += '<div style="font-size:10px;color:rgba(255,255,255,0.65);margin-top:2px;">11-17% range</div>';
  html += '<div style="font-size:10px;font-weight:600;color:rgba(255,255,255,0.8);margin-top:8px;">396 FTE capacity freed</div>';
  html += '<div style="font-size:10px;color:rgba(255,255,255,0.55);margin-top:2px;">Not headcount reduction</div>';
  html += '</div>';
  html += '</div></div>';
  html += '<div style="font-size:11px;color:var(--text-muted);padding:10px 14px;background:var(--panel);border-radius:8px;">';
  html += 'Source: UC3_Savings_Logic_Client_Slide.pptx. All components are working assumptions to be validated through operational pilot at Gate 2 (March 2027). 396 FTE represents capacity freed, not automatic headcount reduction. Denominator: 14 GTRF role types, 2,864 FTE (working assumption, subject to GTRF validation).';
  html += '</div>';
  el.innerHTML = html;
}

function renderValueScenariosTable() {
  var el = document.getElementById('value-scenarios-table');
  if (!el) return;
  var html = '<h2 style="margin-bottom:6px;">Three scaling levels</h2>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:14px;">The same bridge components at three different denominators and adoption assumptions. All are working assumptions.</p>';
  html += '<div class="raid-table-wrap">';
  html += '<table class="raid-table" aria-label="Three scaling levels">';
  html += '<thead><tr><th>Level</th><th>Range</th><th>Base case</th><th>Denominator</th><th>Regulation scope</th><th>North Star stage</th><th>Gate target</th></tr></thead>';
  html += '<tbody>';
  VALUE_SCENARIOS.forEach(function(vs) {
    html += '<tr>';
    html += '<td style="font-weight:600;">' + vs.label + '</td>';
    html += '<td>' + vs.lowLabel + ' - ' + vs.highLabel + '</td>';
    html += '<td style="font-weight:700;">' + vs.baseLabel + '</td>';
    html += '<td style="font-size:12px;color:var(--text-muted);">' + vs.denominator + '</td>';
    html += '<td style="font-size:12px;">' + vs.regulationScope + '</td>';
    html += '<td style="font-size:12px;">' + vs.northStarStage + '</td>';
    html += '<td style="font-size:12px;">' + vs.gateTarget + '</td>';
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  el.innerHTML = html;
}

function renderAssumptionHistoryTable() {
  var el = document.getElementById('assumption-history-table');
  if (!el) return;
  var html = '<h2 style="margin-bottom:6px;">Assumption history</h2>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:14px;">Earlier estimates and their relationship to the current working assumption. Superseded figures are shown for audit purposes only.</p>';
  html += '<div class="raid-table-wrap">';
  html += '<table class="raid-table" aria-label="Assumption history">';
  html += '<thead><tr><th>Figure</th><th>Period</th><th>Scope</th><th>Status</th><th>Notes</th></tr></thead>';
  html += '<tbody>';
  ASSUMPTION_HISTORY.forEach(function(ah) {
    var statusColor = ah.status === 'current' ? 'var(--success)' : '#B97912';
    var statusBg = ah.status === 'current' ? 'var(--success-pale)' : 'var(--warning-pale)';
    html += '<tr>';
    html += '<td style="font-weight:700;">' + ah.figure + '</td>';
    html += '<td style="font-size:12px;">' + ah.period + '</td>';
    html += '<td style="font-size:12px;color:var(--text-muted);">' + ah.scope + '</td>';
    html += '<td><span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px;background:' + statusBg + ';color:' + statusColor + ';">' + ah.statusLabel + '</span></td>';
    html += '<td style="font-size:12px;color:var(--text-muted);">' + ah.notes + '</td>';
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  el.innerHTML = html;
}

function renderTokenomicsSection() {
  var el = document.getElementById('tokenomics-section');
  if (!el) return;
  var html = '<div style="border-top:1px solid var(--line);padding-top:24px;">';
  html += '<h2 style="margin-bottom:6px;">Tokenomics and model catalogue</h2>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Approved model classes for each execution type. Specific model versions and pricing are subject to enterprise AI governance approval and as-of-date pricing. All model recommendations require GT AI governance sign-off before deployment.</p>';

  // Model catalogue table
  html += '<h3 style="font-size:13px;font-weight:700;margin-bottom:10px;">Model catalogue (approved classes)</h3>';
  html += '<div class="raid-table-wrap" style="margin-bottom:24px;">';
  html += '<table class="raid-table">';
  html += '<thead><tr><th>Tier</th><th>Label</th><th>Example tasks</th><th>Data residency</th><th>Governance status</th></tr></thead>';
  html += '<tbody>';
  MODEL_CATALOGUE.forEach(function(m) {
    html += '<tr>';
    html += '<td style="font-weight:600;">' + m.tier + '</td>';
    html += '<td>' + m.label + '</td>';
    html += '<td style="font-size:12px;color:var(--text-muted);">' + m.exampleTasks.join(', ') + '</td>';
    html += '<td style="font-size:12px;">' + m.dataResidency + '</td>';
    html += '<td style="font-size:12px;"><span style="font-weight:600;">' + m.governanceNote + '</span></td>';
    html += '</tr>';
  });
  html += '</tbody></table></div>';

  // Cost per run components
  html += '<h3 style="font-size:13px;font-weight:700;margin-bottom:10px;">Cost-per-run structure</h3>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">Token cost is one component of the total cost of a compliance run. Human review time is typically the largest component. Do not present token cost alone as the total run cost.</p>';
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;">';
  COST_PER_RUN_COMPONENTS.forEach(function(c) {
    html += '<div style="padding:12px;background:var(--panel);border:1px solid var(--line);border-radius:8px;">';
    html += '<div style="font-size:12px;font-weight:700;margin-bottom:4px;">' + c.component + '</div>';
    html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">' + c.description + '</div>';
    html += '<div style="font-size:10px;color:#5A1E96;font-weight:600;">Driver: ' + c.driver + '</div>';
    html += '</div>';
  });
  html += '</div>';
  html += '<div style="font-size:11px;color:var(--text-muted);margin-top:12px;padding:10px;background:var(--warning-pale);border-radius:8px;">Model pricing figures must not be published without an as-of date and "subject to contract" label. Approved model catalogue to be confirmed with GT AI governance. All cost estimates are illustrative planning assumptions, not commercial estimates.</div>';
  html += '</div>';
  el.innerHTML = html;
}

function renderKpiTabs(activeGroupId) {
  var tabBar = document.getElementById('kpi-tab-bar');
  var content = document.getElementById('kpi-tab-content');
  tabBar.innerHTML = KPIS.map(function(g) {
    var active = g.id === activeGroupId ? ' active' : '';
    return '<button class="tab-btn' + active + '" role="tab" aria-selected="' + (active ? 'true' : 'false') + '" onclick="renderKpiTabs(\'' + g.id + '\')">' +
      '<i class="ti ' + g.icon + '" style="margin-right:5px"></i>' + g.group + '</button>';
  }).join('');

  var group = KPIS.find(function(g){ return g.id === activeGroupId; }) || KPIS[0];
  content.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;padding:20px 0">' +
    group.kpis.map(function(k) {
      var isDirectional = k.id === 'K02';
      return '<div style="border:1px solid var(--line);border-radius:10px;padding:16px;background:var(--white)">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">' +
          '<span style="font-size:10px;font-weight:700;color:var(--blue-dark)">' + k.id + '</span>' +
          (isDirectional ? '<span style="font-size:10px;padding:2px 8px;border-radius:10px;background:var(--warning-pale);color:var(--warning);font-weight:600">Directional</span>' : '') +
        '</div>' +
        '<div style="font-size:14px;font-weight:700;color:var(--ink);margin-bottom:6px">' + k.name + '</div>' +
        '<div style="font-size:12px;color:var(--text-muted);margin-bottom:12px;line-height:1.5">' + k.measure + '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
          '<div style="padding:8px;background:var(--panel);border-radius:6px"><div style="font-size:10px;font-weight:600;color:var(--text-muted);margin-bottom:3px">BASELINE</div><div style="font-size:12px;color:var(--ink)">' + k.baseline + '</div></div>' +
          '<div style="padding:8px;background:var(--blue-pale);border-radius:6px"><div style="font-size:10px;font-weight:600;color:var(--blue-dark);margin-bottom:3px">TARGET</div><div style="font-size:12px;color:var(--ink)">' + k.target + '</div></div>' +
        '</div>' +
        (k.note ? '<div style="margin-top:10px;font-size:11px;color:var(--text-muted);font-style:italic;border-top:1px solid var(--line);padding-top:8px">' + k.note + '</div>' : '') +
      '</div>';
    }).join('') +
  '</div>';
}

function renderKpiTable() {
  var allKpis = [];
  KPIS.forEach(function(g){ g.kpis.forEach(function(k){ allKpis.push(k); }); });
  document.getElementById('kpi-table-body').innerHTML = allKpis.map(function(k) {
    var directional = k.id === 'K02' ? ' <span style="font-size:10px;padding:1px 6px;border-radius:10px;background:var(--warning-pale);color:var(--warning);font-weight:600">Directional</span>' : '';
    return '<tr>' +
      '<td style="font-weight:600">' + k.id + ' ' + k.name + directional + '</td>' +
      '<td style="color:var(--text-muted);font-style:italic">' + k.baseline + '</td>' +
      '<td style="color:var(--text-muted);font-style:italic">' + (k.target.includes('Phase 2') ? k.target : 'Actual pending') + '</td>' +
      '<td style="color:var(--text-muted);font-style:italic">' + k.target + '</td>' +
      '<td><span style="font-size:10px;padding:2px 8px;border-radius:10px;background:var(--panel);color:var(--text-muted);font-weight:600">Baseline pending</span></td>' +
    '</tr>';
  }).join('');
}

function renderScaleDecisionCards() {
  var cards = [
    {
      icon: 'ti-stack', color: '#3456C5', title: 'Vertical scope',
      question: 'Which additional compliance verticals should be onboarded after Backup and Restore?',
      evidence: ['Phase 1 and 2 velocity metrics', 'Applications with connected evidence sources', 'Demand from Product Teams and Product Owners', 'Reusability of existing compliance assets']
    },
    {
      icon: 'ti-apps', color: '#5C4FC5', title: 'Application coverage',
      question: 'How many applications should be brought into scope in Phase 4 and beyond?',
      evidence: ['Number of applications in Phase 1 pilot', 'Evidence source connectivity rate', 'Support model capacity and cost per application', 'Hub maturity and self-service readiness']
    },
    {
      icon: 'ti-building-bank', color: '#7A3EB1', title: 'Enterprise integration',
      question: 'What integration with the wider SDLC agent layer and enterprise systems is appropriate?',
      evidence: ['Platform stability and security review outcomes', 'Data governance and Responsible AI sign-off', 'Operating model maturity score', 'Service economics and total cost of ownership']
    }
  ];
  document.getElementById('scale-decision-cards').innerHTML = cards.map(function(c) {
    return '<div style="border:1px solid var(--line);border-radius:10px;padding:20px;background:var(--white)">' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">' +
        '<div style="width:36px;height:36px;border-radius:8px;background:' + c.color + '18;display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
          '<i class="ti ' + c.icon + '" style="font-size:18px;color:' + c.color + '"></i>' +
        '</div>' +
        '<div style="font-size:15px;font-weight:700;color:var(--ink)">' + c.title + '</div>' +
      '</div>' +
      '<div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:10px;line-height:1.4">' + c.question + '</div>' +
      '<div style="font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px">Evidence required at Gate 3</div>' +
      '<ul style="list-style:none;display:flex;flex-direction:column;gap:6px">' +
        c.evidence.map(function(e){ return '<li style="font-size:12px;color:var(--ink);display:flex;gap:6px;align-items:flex-start"><i class="ti ti-point-filled" style="font-size:10px;color:' + c.color + ';margin-top:3px;flex-shrink:0"></i>' + e + '</li>'; }).join('') +
      '</ul>' +
    '</div>';
  }).join('');
}

function renderValueLogicTree() {
  var el = document.getElementById('value-logic-tree');
  if (!el) return;

  var nodes = [
    { label: 'Regulatory change',          sub: 'New or amended regulation requiring structured response',                        color: '#3456C5' },
    { label: 'Obligation extraction',      sub: 'MITRA extracts obligations from source documents (provisionally assigned)',     color: '#A100FF', agent: true },
    { label: 'Control and norm mapping',   sub: 'Map obligations to controls, norms and Work Products via canonical object model', color: '#5C4FC5' },
    { label: 'Application scoping',        sub: '~3,900 apps assessed for applicability. LeanIX view August 2026.',              color: '#5C4FC5' },
    { label: 'Effort baseline',            sub: 'Current effort per control activity measured in Phase 1. Baseline to validate.', color: '#374151' },
    { label: 'Automation and assistance',  sub: '13.8% directional effort reduction. Capacity released, not headcount reduction. To validate.', color: '#D97706', warn: true },
    { label: '396 FTE capacity freed',     sub: '14 GTRF role types, 2,864 FTE denominator. Working assumption, subject to GTRF validation.', color: '#059669', result: true }
  ];

  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:8px">Value logic chain</h2>';
  h += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:20px">How regulatory change converts into measurable capacity released through the agentic compliance chain.</p>';
  h += '<div style="display:flex;flex-direction:column;gap:0;max-width:640px">';

  nodes.forEach(function(node, idx) {
    var isLast = idx === nodes.length - 1;
    h += '<div style="display:flex;flex-direction:column;align-items:flex-start">';
    h += '<div style="background:' + (node.result ? node.color : 'var(--white)') + ';border:' + (node.warn ? '1.5px solid ' + node.color : (node.result ? 'none' : '1px solid var(--line)')) + ';border-left:4px solid ' + node.color + ';border-radius:8px;padding:12px 16px;width:100%;box-sizing:border-box">';
    h += '<div style="font-size:13px;font-weight:700;color:' + (node.result ? '#fff' : 'var(--ink)') + ';margin-bottom:3px">' + node.label + '</div>';
    if (node.agent) h += '<span style="font-size:9px;font-weight:700;background:#F4EBFF;color:#7C3AED;padding:1px 6px;border-radius:6px;border:1px dashed #A100FF;margin-bottom:4px;display:inline-block">Agent-assisted (provisional)</span> ';
    h += '<span style="font-size:11px;color:' + (node.result ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)') + ';line-height:1.4">' + node.sub + '</span>';
    h += '</div>';
    if (!isLast) h += '<div style="width:3px;height:14px;background:var(--line);margin-left:22px"></div>';
    h += '</div>';
  });

  h += '</div>';
  el.innerHTML = h;
}

function renderCostRunChart() {
  if (typeof echarts === 'undefined') return;
  uc3ChartDestroy('cost-run-chart');

  var components = [
    { name: 'Human review',       value: 50, color: '#3456C5' },
    { name: 'Exception handling', value: 20, color: '#5C4FC5' },
    { name: 'Platform / hosting', value: 12, color: '#374151' },
    { name: 'Model inference',    value: 10, color: '#A100FF' },
    { name: 'Orchestration',      value: 4,  color: '#059669' },
    { name: 'Vector retrieval',   value: 2,  color: '#6B7280' },
    { name: 'Evidence storage',   value: 2,  color: '#6B7280' }
  ];

  uc3Chart('cost-run-chart', {
    title: {
      text: 'Cost-per-run: relative component breakdown',
      left: 0,
      textStyle: { fontSize: 13, fontWeight: '700', color: '#1A1A1A' },
      subtext: 'Illustrative relative proportions only. No cost figures shown. To be baselined at Gate 1 (March 2027).',
      subtextStyle: { fontSize: 10, color: '#6B7280' }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) { return params[0].name + ': relative unit ' + params[0].value + ' (illustrative proportion, not a cost figure)'; }
    },
    grid: { top: 72, bottom: 20, left: 150, right: 60 },
    xAxis: { type: 'value', name: 'Relative scale (illustrative)', nameLocation: 'end', nameTextStyle: { fontSize: 10, color: '#9CA3AF' }, axisLabel: { show: false }, splitLine: { show: false } },
    yAxis: { type: 'category', data: components.map(function(c){ return c.name; }).reverse(), axisLabel: { fontSize: 11 } },
    series: [{
      type: 'bar',
      barMaxWidth: 32,
      data: components.map(function(c){ return { value: c.value, itemStyle: { color: c.color, borderRadius: [0, 4, 4, 0] } }; }).reverse(),
      label: { show: true, position: 'right', formatter: function(p){ return p.dataIndex === 0 ? 'Primary lever' : ''; }, color: '#6B7280', fontSize: 10 }
    }]
  });
}

function renderScale() {
  renderValueLogicTree();
  renderValueDerivationBridge();
  renderCostRunChart();
  renderKpiTabs(KPIS[0].id);
  renderKpiTable();
  renderValueScenariosTable();
  renderAssumptionHistoryTable();
  renderTokenomicsSection();
  renderScaleDecisionCards();

  var rec = ADDONS.filter(function(a){ return a.classification === 'recommended'; });
  var opt = ADDONS.filter(function(a){ return a.classification === 'optional'; });

  function addonCard(a) {
    var cls = a.classification === 'recommended' ? 'chip-in-progress' : 'chip-proposed';
    var bg = a.classification === 'recommended' ? 'rgba(52,86,197,0.1)' : 'var(--panel)';
    var color = a.classification === 'recommended' ? 'var(--blue-dark)' : 'var(--text-muted)';
    return '<div class="addon-card">' +
      '<div class="addon-header">' +
        '<div class="addon-letter" style="background:' + bg + ';color:' + color + '">' + a.letter + '</div>' +
        '<div class="addon-name">' + a.title + '</div>' +
        '<span class="chip ' + cls + '">' + a.classLabel + '</span>' +
      '</div>' +
      '<div class="addon-body">' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">' +
          '<span class="chip chip-proposed"><i class="ti ti-clock" style="margin-right:3px"></i>' + a.timing + '</span>' +
        '</div>' +
        '<div class="addon-purpose">' + a.purpose + '</div>' +
        '<div style="font-size:12px;color:var(--text-muted);margin-bottom:8px"><strong style="color:var(--ink)">Value:</strong> ' + a.value + '</div>' +
        (a.note ? '<div style="font-size:11px;color:var(--text-muted);font-style:italic;margin-bottom:6px">' + a.note + '</div>' : '') +
        '<div style="font-size:11px;color:var(--text-muted);margin-bottom:6px"><strong>Depends on:</strong> ' + (a.dependencies||[]).join(', ') + '</div>' +
        '<div class="addon-footer">Not in base scope</div>' +
      '</div>' +
    '</div>';
  }

  document.getElementById('addon-grid-rec').innerHTML = rec.map(addonCard).join('');
  document.getElementById('addon-grid-opt').innerHTML = opt.map(addonCard).join('');

  var nsItems = [
    'Broader coverage of regulations, norms and Work Products',
    'Progressive onboarding of applications and Product Teams',
    'Policy and control automation added piece by piece',
    'Continuous technical verification',
    'Reusable Compliance-as-a-Service verticals',
    'Integration into the wider SDLC agent layer',
    'Exception-led human oversight',
    'Continuous compliance monitoring'
  ];
  document.getElementById('ns-items').innerHTML = nsItems.map(function(item) {
    return '<div class="ns-item">' + item + '</div>';
  }).join('');
}

