// ── Portfolio section ──
var regSortCol = 'priority';
var regSortDir = 'asc';

function switchPortfolioTab(tabId) {
  var tabs = ['matrix-view', 'reg-register-view', 'wave-view', 'dod-view'];
  tabs.forEach(function(t) {
    var el = document.getElementById(t);
    if (el) el.classList.toggle('active', t === tabId);
  });
  document.querySelectorAll('#portfolio .tab-btn').forEach(function(btn, i) {
    btn.classList.toggle('active', tabs[i] === tabId);
    btn.setAttribute('aria-selected', tabs[i] === tabId ? 'true' : 'false');
  });
  if (tabId === 'matrix-view') renderMatrixView();
  if (tabId === 'wave-view') renderWaveView();
  if (tabId === 'dod-view') renderDodView();
}

function renderPortfolio() {
  var stagesForFunnel = [
    { label: 'In portfolio', statuses: ['not-inventoried','inventoried','assessed','prioritised','mapped','configured','validated','live','continuously-monitored'] },
    { label: 'Inventoried', statuses: ['inventoried','assessed','prioritised','mapped','configured','validated','live','continuously-monitored'] },
    { label: 'Assessed', statuses: ['assessed','prioritised','mapped','configured','validated','live','continuously-monitored'] },
    { label: 'Configured', statuses: ['configured','validated','live','continuously-monitored'] },
    { label: 'Live', statuses: ['live','continuously-monitored'] }
  ];

  var funnelData = stagesForFunnel.map(function(s) {
    return { name: s.label, value: REGULATIONS.filter(function(r){ return s.statuses.includes(r.status); }).length };
  });

  var overviewItems = [
    { label: 'Total portfolio', value: REGULATIONS.length, color: 'var(--blue-dark)' },
    { label: 'Inventoried+', value: funnelData[1].value, color: 'var(--blue-mid)' },
    { label: 'Assessed+', value: funnelData[2].value, color: 'var(--purple)' },
    { label: 'Configured+', value: funnelData[3].value, color: 'var(--success)' },
    { label: 'Live', value: funnelData[4].value, color: 'var(--success)' }
  ];

  var kpiCards = overviewItems.map(function(item) {
    return '<div style="background:var(--panel);border-radius:10px;padding:14px 18px;min-width:100px;flex:1">' +
      '<div style="font-size:24px;font-weight:700;color:' + item.color + '">' + item.value + '</div>' +
      '<div style="font-size:11px;color:var(--text-muted);margin-top:2px">' + item.label + '</div>' +
    '</div>';
  }).join('');

  var chartPanel = '<div style="flex:1;min-width:200px;max-width:260px;padding:14px 18px;background:var(--panel);border-radius:10px">' +
    '<div style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Coverage progress</div>' +
    '<div id="portfolio-funnel-chart" style="height:110px"></div>' +
    '</div>';

  document.getElementById('portfolio-overview').innerHTML = kpiCards + chartPanel;

  // ECharts funnel
  if (typeof uc3Chart === 'function') {
    uc3Chart('portfolio-funnel-chart', {
      tooltip: { trigger: 'item', formatter: '{b}: {c} of 24 regulations' },
      series: [{
        type: 'funnel', left: 0, right: 0, top: 0, bottom: 0,
        min: 0, max: 24, gap: 2,
        label: { show: true, position: 'inside', formatter: function(p) { return p.name + ' (' + p.value + ')'; }, fontSize: 10, color: '#fff' },
        itemStyle: { borderWidth: 0 },
        data: funnelData.map(function(d, i) {
          var colors = ['#3456C5', '#5C4FC5', '#7A3EB1', '#A100FF', '#059669'];
          return { name: d.name, value: d.value, itemStyle: { color: colors[i] } };
        })
      }]
    });
  }

  renderMatrixView();
}

function renderMatrixView() {
  var container = document.getElementById('matrix-view-container');
  if (!container) return;

  var STATUS_COLORS = {
    'not-inventoried': '#9CA3AF', 'inventoried': '#3456C5', 'assessed': '#A78BFA',
    'prioritised': '#F59E0B', 'mapped': '#5C4FC5', 'configured': '#8B5CF6',
    'validated': '#10B981', 'live': '#059669', 'continuously-monitored': '#065F46'
  };
  var STATUS_LABEL = {
    'not-inventoried': 'Not inventoried', 'inventoried': 'Inventoried', 'assessed': 'Assessed',
    'prioritised': 'Prioritised', 'mapped': 'Mapped', 'configured': 'Configured',
    'validated': 'Validated', 'live': 'Live', 'continuously-monitored': 'Monitored'
  };
  var WAVE_BADGE = {
    'wave-1': { label: 'Wave 1', color: '#3456C5', bg: '#EAF3FA' },
    'wave-2': { label: 'Wave 2', color: '#B97912', bg: 'var(--warning-pale)' },
    'wave-3': { label: 'Wave 3', color: '#B97912', bg: 'var(--warning-pale)' }
  };

  // Legend
  var legendPairs = [['not-inventoried','inventoried'], ['assessed','prioritised'], ['configured','validated'], ['live','']];
  var legendHtml = '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;align-items:center">';
  legendHtml += '<span style="font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-right:4px">Status</span>';
  Object.keys(STATUS_COLORS).forEach(function(s) {
    legendHtml += '<span style="display:flex;align-items:center;gap:4px;font-size:10px"><span style="width:10px;height:10px;border-radius:2px;background:' + STATUS_COLORS[s] + ';flex-shrink:0"></span>' + STATUS_LABEL[s] + '</span>';
  });
  legendHtml += '</div>';

  // 4x6 tile grid (sorted by priority)
  var sorted = REGULATIONS.slice().sort(function(a, b) {
    var ap = a.priority !== null && a.priority !== undefined ? a.priority : 999;
    var bp = b.priority !== null && b.priority !== undefined ? b.priority : 999;
    return ap - bp;
  });

  var tilesHtml = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">';
  sorted.forEach(function(r) {
    var sc = STATUS_COLORS[r.status] || '#9CA3AF';
    var sl = STATUS_LABEL[r.status] || r.status;
    var wave = r.proposedWave ? WAVE_BADGE[r.proposedWave] : null;
    var isRef = r.id === 'REG-01';

    tilesHtml += '<div onclick="openRegDrawer(\'' + r.id + '\')" style="border:1px solid var(--line);border-top:4px solid ' + sc + ';border-radius:8px;padding:12px;background:' + (isRef ? '#EAF3FA' : 'var(--white)') + ';cursor:pointer;transition:box-shadow 0.15s" onmouseover="this.style.boxShadow=\'0 2px 8px rgba(0,0,0,0.10)\'" onmouseout="this.style.boxShadow=\'\'">';
    tilesHtml += '<div style="font-size:9px;font-weight:700;color:var(--text-muted);font-family:monospace;margin-bottom:3px">' + r.id + '</div>';
    tilesHtml += '<div style="font-size:11px;font-weight:700;color:var(--ink);line-height:1.3;margin-bottom:6px">' + (r.shortName || r.name) + '</div>';
    if (isRef && r.referenceScenario) {
      tilesHtml += '<div style="font-size:9px;color:var(--blue-dark);font-weight:600;margin-bottom:5px">Ref: ' + r.referenceScenario + '</div>';
    }
    tilesHtml += '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px">';
    tilesHtml += '<span style="font-size:9px;font-weight:600;color:' + sc + '">' + sl + '</span>';
    if (wave) {
      tilesHtml += '<span style="font-size:9px;font-weight:600;color:' + wave.color + ';background:' + wave.bg + ';padding:1px 5px;border-radius:4px">' + wave.label + '</span>';
    }
    tilesHtml += '</div></div>';
  });
  tilesHtml += '</div>';

  tilesHtml += '<div style="margin-top:10px;font-size:11px;color:var(--text-muted)">Click any tile to view regulation detail. Wave 2 and Wave 3 assignments are subject to gate decisions. REG-01 (DORA, Backup and Restore reference) is the only confirmed Wave 1 regulation.</div>';

  container.innerHTML = legendHtml + tilesHtml;
}

function renderRegTable() {
  var statusFilter = document.getElementById('reg-status-filter') ? document.getElementById('reg-status-filter').value : 'all';
  var waveFilter = document.getElementById('reg-wave-filter') ? document.getElementById('reg-wave-filter').value : 'all';
  var regs = REGULATIONS.filter(function(r) {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (waveFilter !== 'all') {
      if (waveFilter === 'not-assigned' && r.proposedWave) return false;
      if (waveFilter !== 'not-assigned' && r.proposedWave !== waveFilter) return false;
    }
    return true;
  });
  regs.sort(function(a, b) {
    var av = a[regSortCol], bv = b[regSortCol];
    if (av === null || av === undefined) av = 9999;
    if (bv === null || bv === undefined) bv = 9999;
    if (typeof av === 'string') av = av.toLowerCase();
    if (typeof bv === 'string') bv = bv.toLowerCase();
    if (av < bv) return regSortDir === 'asc' ? -1 : 1;
    if (av > bv) return regSortDir === 'asc' ? 1 : -1;
    return 0;
  });
  var statusColors = { 'not-inventoried': '#9CA3AF', 'inventoried': '#60A5FA', 'assessed': '#A78BFA', 'prioritised': '#F59E0B', 'mapped': '#3B82F6', 'configured': '#8B5CF6', 'validated': '#10B981', 'live': '#059669', 'continuously-monitored': '#065F46' };
  var waveLabels = { 'wave-1': 'Wave 1', 'wave-2': 'Wave 2', 'wave-3': 'Wave 3+' };
  var tbody = document.getElementById('reg-table-body');
  if (!tbody) return;
  tbody.innerHTML = regs.map(function(r) {
    var isRef = r.id === 'REG-01';
    var statusColor = statusColors[r.status] || '#9CA3AF';
    var wave = r.proposedWave ? (waveLabels[r.proposedWave] || r.proposedWave) : '<span style="color:var(--text-muted)">Not assigned</span>';
    return '<tr onclick="openRegDrawer(\'' + r.id + '\')" style="border-bottom:1px solid var(--line);cursor:pointer;transition:background 0.12s" onmouseover="this.style.background=\'var(--panel)\'" onmouseout="this.style.background=\'\'">' +
      '<td style="padding:10px 12px;white-space:nowrap;font-family:monospace;font-size:12px;font-weight:600;color:var(--blue-dark)">' + r.id + '</td>' +
      '<td style="padding:10px 12px;max-width:280px">' +
        '<span style="font-weight:500">' + r.name + '</span>' +
        (isRef ? ' <span style="font-size:10px;background:#EAF3FA;color:var(--blue-dark);border-radius:4px;padding:1px 6px;font-weight:600;margin-left:4px">Reference scenario</span>' : '') +
        (r.name.includes('Name to confirm') ? ' <span style="font-size:10px;background:var(--warning-pale);color:var(--warning);border-radius:4px;padding:1px 6px;font-weight:600;margin-left:4px">Name to confirm</span>' : '') +
      '</td>' +
      '<td style="padding:10px 12px;white-space:nowrap"><span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:50%;background:' + statusColor + ';flex-shrink:0"></span>' + (r.status || 'not-inventoried').replace(/-/g,' ') + '</span></td>' +
      '<td style="padding:10px 12px;text-align:center">' + (r.priority || '') + '</td>' +
      '<td style="padding:10px 12px;white-space:nowrap">' + wave + '</td>' +
      '<td style="padding:10px 12px;white-space:nowrap">' + (r.jurisdiction || 'To assess') + '</td>' +
      '<td style="padding:10px 12px;font-size:12px;color:var(--text-muted)">' + (r.nextDecision || 'To define') + '</td>' +
    '</tr>';
  }).join('');
  if (regs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="padding:24px;text-align:center;color:var(--text-muted)">No regulations match the selected filters.</td></tr>';
  }
}

function sortRegTable(col) {
  if (regSortCol === col) { regSortDir = regSortDir === 'asc' ? 'desc' : 'asc'; }
  else { regSortCol = col; regSortDir = 'asc'; }
  renderRegTable();
}

function renderWaveView() {
  var container = document.getElementById('wave-view-container');
  if (!container || !WAVES) return;
  container.innerHTML = WAVES.map(function(wave) {
    var regs = REGULATIONS.filter(function(r){ return r.proposedWave === wave.id; });
    var isDecisionRequired = wave.status === 'decision-required';
    return '<div style="margin-bottom:24px;border:' + (isDecisionRequired ? '2px dashed ' + wave.color : '2px solid ' + wave.color) + ';border-radius:10px;overflow:hidden">' +
      '<div style="background:' + wave.color + ';padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px">' +
        '<div>' +
          '<div style="font-weight:700;color:#fff;font-size:14px">' + wave.name + '</div>' +
          '<div style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:3px">' + wave.startMonth + ' to ' + wave.endMonth + '</div>' +
        '</div>' +
        (isDecisionRequired ? '<span style="background:rgba(255,255,255,0.15);color:#fff;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:20px">Decision required</span>' : '') +
      '</div>' +
      '<div style="padding:16px 18px">' +
        '<p style="font-size:13px;color:var(--ink);margin-bottom:12px">' + wave.description + '</p>' +
        (wave.regulationCountNote ? '<p style="font-size:12px;color:var(--warning);background:var(--warning-pale);border-radius:6px;padding:8px 12px;margin-bottom:12px">' + wave.regulationCountNote + '</p>' : '') +
        (regs.length > 0
          ? regs.map(function(r){ return '<div style="display:inline-flex;align-items:center;gap:6px;background:var(--panel);border-radius:6px;padding:6px 12px;margin:4px;font-size:12px;font-weight:500">' + r.id + ': ' + r.name + '</div>'; }).join('')
          : '<span style="font-size:12px;color:var(--text-muted);font-style:italic">No regulations confirmed for this wave. Selection subject to gate decision.</span>'
        ) +
      '</div>' +
    '</div>';
  }).join('');
}

function renderDodView() {
  var container = document.getElementById('dod-container');
  if (!container || !REGULATION_ONBOARDING_DOD) return;
  container.innerHTML = '<div style="background:var(--panel);border-radius:10px;padding:20px 24px">' +
    '<h3 style="font-size:14px;font-weight:700;margin-bottom:4px">Regulation onboarding definition of done</h3>' +
    '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">A regulation is considered onboarded only when all 16 criteria below are confirmed. Criteria apply to each regulation independently.</p>' +
    '<ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:10px">' +
      REGULATION_ONBOARDING_DOD.map(function(item, i) {
        var text = typeof item === 'object' ? item.criterion : item;
        var note = typeof item === 'object' ? item.note : null;
        return '<li style="font-size:13px">' +
          '<span style="font-weight:500">' + text + '</span>' +
          (note ? '<div style="font-size:12px;color:var(--text-muted);margin-top:2px">' + note + '</div>' : '') +
        '</li>';
      }).join('') +
    '</ol>' +
  '</div>';
}

function openRegDrawer(regId) {
  var r = REGULATIONS.find(function(x){ return x.id === regId; });
  if (!r) return;
  var isRef = r.id === 'REG-01';
  var statusColors = { 'not-inventoried': '#9CA3AF', 'inventoried': '#60A5FA', 'assessed': '#A78BFA', 'prioritised': '#F59E0B', 'mapped': '#3B82F6', 'configured': '#8B5CF6', 'validated': '#10B981', 'live': '#059669', 'continuously-monitored': '#065F46' };
  var statusColor = statusColors[r.status] || '#9CA3AF';

  document.getElementById('dd-id').textContent = r.id + (r.regulator ? ' - ' + r.regulator : '');
  document.getElementById('dd-name').textContent = r.name;

  var chipsHtml = '<span style="background:' + statusColor + ';color:#fff;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700">' + r.status.replace(/-/g,' ') + '</span>';
  if (r.region) chipsHtml += ' <span style="background:var(--panel);border:1px solid var(--line);padding:3px 10px;border-radius:20px;font-size:11px">' + r.region + '</span>';
  if (r.domain) chipsHtml += ' <span style="background:var(--panel);border:1px solid var(--line);padding:3px 10px;border-radius:20px;font-size:11px">' + r.domain + '</span>';
  document.getElementById('dd-chips').innerHTML = chipsHtml;

  var summaryHtml = '';
  if (isRef && r.referenceScenario) {
    summaryHtml += '<div style="background:#EAF3FA;border-radius:8px;padding:12px 14px;margin-bottom:12px;border-left:3px solid var(--blue-dark)"><strong>Reference scenario:</strong> ' + r.referenceScenario + '</div>';
  }
  if (isRef && r.referenceScenarioNote) {
    summaryHtml += '<div style="font-size:12px;color:var(--text-muted)">' + r.referenceScenarioNote + '</div>';
  }
  if (!isRef) {
    summaryHtml += '<div style="font-size:12px;color:var(--text-muted);font-style:italic">This regulation has not yet been assessed. Detail fields will be completed during the portfolio inventory workstream in Phase 1.</div>';
  }
  document.getElementById('dd-summary').innerHTML = summaryHtml;

  var dodList = document.getElementById('dd-dod');
  dodList.innerHTML = '';
  var fields = [
    ['Jurisdiction', r.jurisdiction || 'To assess'],
    ['Regulator', r.regulator || 'To confirm'],
    ['Priority', r.priority !== null && r.priority !== undefined ? String(r.priority) : 'To assign'],
    ['Proposed wave', r.proposedWave || 'Not assigned'],
    ['Confidence', (r.confidence || 'to-assess').replace(/-/g,' ')],
    ['Owner', r.owner || 'To confirm'],
    ['Accountable function', r.accountableFunction || 'To confirm']
  ];
  fields.forEach(function(f) {
    var li = document.createElement('li');
    li.innerHTML = '<strong>' + f[0] + ':</strong> ' + f[1];
    dodList.appendChild(li);
  });
  if (isRef && Array.isArray(r.sourceDocuments) && r.sourceDocuments.length > 0) {
    var li2 = document.createElement('li');
    li2.innerHTML = '<strong>Source documents:</strong> ' + r.sourceDocuments.join('; ');
    dodList.appendChild(li2);
  }

  var decWrap = document.getElementById('dd-dec-wrap');
  var decEl = document.getElementById('dd-dec');
  if (r.nextDecision) {
    decWrap.style.display = '';
    decEl.textContent = r.nextDecision;
  } else {
    decWrap.style.display = 'none';
  }

  document.getElementById('dd-roles').innerHTML = '<span style="color:var(--text-muted)">Regulation SME and Compliance Lead</span>';
  document.getElementById('dd-deps').innerHTML = '<span style="color:var(--text-muted)">D02 Regulation baseline, D14 Onboarding factory</span>';

  openDrawer('del-drawer');
}

