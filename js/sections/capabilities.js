// ── Section 3: Workstreams and Deliverables ──
function switchTab(tabId, tabName) {
  document.querySelectorAll('.tab-content').forEach(function(t){ t.classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(function(b){
    var isActive = b.dataset.tab === tabId;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  document.getElementById(tabId).classList.add('active');
  activeDelTab = tabName;
  if (tabName === 'deliverables')    renderDeliverables();
  if (tabName === 'capability-map')  renderCapabilityMap();
  if (tabName === 'om-crosswalk')    renderOMCrosswalk();
  if (tabName === 'workstreams')     _renderWorkstreamAccordion();
}

function renderCapabilities() {
  var sel = document.getElementById('del-ws-filter');
  if (sel && sel.options.length <= 1) {
    WORKSTREAMS.forEach(function(ws){ sel.innerHTML += '<option value="' + ws.id + '">' + ws.name + '</option>'; });
  }
  renderCapabilityMap();
}

function _renderWorkstreamAccordion() {
  var el = document.getElementById('ws-accordion');
  if (!el || el.querySelector('.ws-card')) return;
  el.innerHTML = WORKSTREAMS.map(function(ws, i) {
    var dels = DELIVERABLES.filter(function(d){ return d.workstreamId === ws.id; });
    return '<div class="ws-card" id="ws-card-' + i + '">' +
      '<div class="ws-header" onclick="toggleWs(' + i + ')" role="button" tabindex="0" aria-expanded="false" onkeydown="if(event.key===\'Enter\'||event.key===\' \')toggleWs(' + i + ')">' +
        '<div class="ws-accent" style="background:' + ws.color + '"></div>' +
        '<i class="ws-icon ti ' + ws.icon + '" style="color:' + ws.color + '"></i>' +
        '<div><div class="ws-name">' + ws.name + '</div><div class="ws-purpose">' + ws.purpose + '</div></div>' +
        '<div class="ws-meta">' +
          ws.phases.map(function(p){ return phaseChip(p); }).join('') +
          '<span style="font-size:12px;color:var(--text-muted)">' + dels.length + ' deliverable' + (dels.length!==1?'s':'') + '</span>' +
          '<i class="ti ti-chevron-down ws-expand-icon"></i>' +
        '</div>' +
      '</div>' +
      '<div class="ws-body">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding-top:16px">' +
          '<div><h3>Core activities</h3><ul style="list-style:none;display:flex;flex-direction:column;gap:5px">' +
            ws.activities.map(function(a){ return '<li style="font-size:12px;color:var(--ink);display:flex;gap:6px"><i class="ti ti-point" style="font-size:10px;color:' + ws.color + ';margin-top:3px"></i>' + a + '</li>'; }).join('') +
          '</ul></div>' +
          '<div><h3>Deliverables</h3>' +
            (dels.length ? dels.map(function(d){ return '<div style="margin-bottom:8px;padding:10px;border:1px solid var(--line);border-radius:8px;cursor:pointer" onclick="openDeliverableDrawer(\'' + d.id + '\')">' +
              '<div style="font-size:10px;font-weight:700;color:var(--blue-dark)">' + d.id + '</div>' +
              '<div style="font-size:13px;font-weight:600;color:var(--ink);margin:2px 0">' + d.name + '</div>' +
              '<div style="font-size:11px;color:var(--text-muted)">' + d.targetMonth + '</div></div>'; }).join('') : '<p style="font-size:12px;color:var(--text-muted)">No standalone deliverables - outputs embedded in programme delivery.</p>') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function renderCapabilityMap() {
  var el = document.getElementById('cap-map-container');
  if (!el) return;

  var DOMAINS = [
    {
      name: 'Regulatory Intelligence',
      color: '#3456C5',
      desc: 'Translating external regulation into an actionable internal obligation model ready for agent execution.',
      workstreamIds: ['ws-2', 'ws-3'],
      capabilities: [
        'Regulatory inventory and obligation mapping',
        'Applicability rules and scoping logic',
        'Compliance object model and norm definitions',
        'Framework interpretation and approval workflow',
        'Wave prioritisation and regulation onboarding factory'
      ]
    },
    {
      name: 'Agentic Compliance Execution',
      color: '#A100FF',
      desc: 'Bounded agent tasks under deterministic workflow control, with mandatory human gates at every decision point.',
      workstreamIds: ['ws-4'],
      capabilities: [
        'Workflow engine and case orchestration',
        'Agent runtime and tool registry',
        'Human-gate and approval management',
        'Model routing and versioning',
        'Evaluation and structured output enforcement'
      ]
    },
    {
      name: 'Evidence and Technology',
      color: '#059669',
      desc: 'Collecting, verifying and reporting compliance evidence from application source systems at scale.',
      workstreamIds: ['ws-5', 'ws-6', 'ws-8'],
      capabilities: [
        'Application integration tiers (Tier 0 through Tier 3)',
        'Evidence connectors and source provenance',
        'Technical verification and DDCR output',
        'Platform, security and Responsible AI controls',
        'Infrastructure, deployment and access management'
      ]
    },
    {
      name: 'Service and Delivery',
      color: '#D97706',
      desc: 'Governing programme delivery, measuring value and transitioning to a sustainable BAU operating model.',
      workstreamIds: ['ws-1', 'ws-7'],
      capabilities: [
        'Programme governance and RAID management',
        'Operating model design and team structure',
        'Training, adoption and change enablement',
        'Value measurement, tokenomics and reporting',
        'Service transition and BAU handover'
      ]
    }
  ];

  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:8px">Capability map: four delivery domains</h2>';
  h += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:20px">The programme delivers through four capability domains, each mapped to one or more workstreams. Click a workstream view tab to see detailed activities and deliverables.</p>';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px">';

  DOMAINS.forEach(function(domain) {
    var wss = domain.workstreamIds.map(function(wid) {
      var ws = WORKSTREAMS.find(function(w){ return w.id === wid; });
      return ws ? ws.name : wid;
    });
    var dels = DELIVERABLES.filter(function(d){ return domain.workstreamIds.indexOf(d.workstreamId) !== -1; });

    h += '<div style="background:var(--white);border:1px solid var(--line);border-top:4px solid ' + domain.color + ';border-radius:10px;padding:18px">';
    h += '<div style="font-size:15px;font-weight:700;color:' + domain.color + ';margin-bottom:6px">' + domain.name + '</div>';
    h += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;line-height:1.4">' + domain.desc + '</p>';
    h += '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:6px">Core capabilities</div>';
    h += '<ul style="list-style:none;display:flex;flex-direction:column;gap:5px;margin-bottom:14px">';
    domain.capabilities.forEach(function(cap) {
      h += '<li style="display:flex;align-items:flex-start;gap:7px;font-size:12px">';
      h += '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:' + domain.color + ';margin-top:4px;flex-shrink:0"></span>';
      h += cap + '</li>';
    });
    h += '</ul>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">';
    wss.forEach(function(wsName) {
      h += '<span style="font-size:10px;background:' + domain.color + '15;color:' + domain.color + ';border:1px solid ' + domain.color + '40;padding:2px 8px;border-radius:8px;font-weight:600">' + wsName + '</span>';
    });
    h += '<span style="font-size:10px;color:var(--text-muted);margin-left:auto">' + dels.length + ' deliverable' + (dels.length !== 1 ? 's' : '') + '</span>';
    h += '</div></div>';
  });

  h += '</div>';
  el.innerHTML = h;
}

function renderOMCrosswalk() {
  var el = document.getElementById('om-crosswalk-container');
  if (!el) return;

  var DIMS = OM_DIMENSIONS.filter(function(d){ return d.id !== 'all'; });
  var shortLabels = {
    'product-service-portfolio': 'Product and Service',
    'organisation-processes':    'Organisation',
    'technology-platforms':      'Technology',
    'value-management':          'Value',
    'people':                    'People'
  };
  var phaseColors = { 'phase-1': '#3456C5', 'phase-2': '#5A1E96', 'phase-3': '#A100FF' };
  var phaseLabels = { 'phase-1': 'Ph.1', 'phase-2': 'Ph.2', 'phase-3': 'Ph.3' };

  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:8px">Operating model crosswalk</h2>';
  h += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Each deliverable maps to one or more Purple Plus operating model dimensions. Filled circles indicate a direct impact on that dimension.</p>';
  h += '<div style="overflow-x:auto"><table style="border-collapse:collapse;font-size:11px;min-width:560px">';

  // Header
  h += '<thead><tr style="background:var(--panel)">';
  h += '<th style="padding:8px 10px;text-align:left;font-weight:700;border:1px solid var(--line);min-width:220px;font-size:11px">Deliverable</th>';
  h += '<th style="padding:8px 10px;text-align:center;font-weight:700;border:1px solid var(--line);font-size:10px;white-space:nowrap">Phase</th>';
  DIMS.forEach(function(dim) {
    h += '<th style="padding:8px 10px;text-align:center;font-weight:700;border:1px solid var(--line);color:' + dim.color + ';font-size:10px;white-space:nowrap">' + shortLabels[dim.id] + '</th>';
  });
  h += '</tr></thead><tbody>';

  DELIVERABLES.forEach(function(d, idx) {
    var bg = idx % 2 === 0 ? 'var(--white)' : 'var(--panel)';
    var pc = phaseColors[d.phaseId] || '#6B7280';
    var pl = phaseLabels[d.phaseId] || d.phaseId;
    h += '<tr style="background:' + bg + '">';
    h += '<td style="padding:7px 10px;border:1px solid var(--line)"><span style="font-weight:700;color:var(--blue-dark)">' + d.id + '</span> ' + d.name + '</td>';
    h += '<td style="padding:7px 10px;border:1px solid var(--line);text-align:center"><span style="font-size:9px;font-weight:700;background:' + pc + '20;color:' + pc + ';padding:1px 5px;border-radius:6px">' + pl + '</span></td>';
    DIMS.forEach(function(dim) {
      var has = Array.isArray(d.operatingModelDimension) && d.operatingModelDimension.indexOf(dim.id) !== -1;
      h += '<td style="padding:7px 10px;border:1px solid var(--line);text-align:center">';
      if (has) h += '<span style="display:inline-block;width:12px;height:12px;background:' + dim.color + ';border-radius:50%"></span>';
      h += '</td>';
    });
    h += '</tr>';
  });

  h += '</tbody></table></div>';
  h += '<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:14px;align-items:center">';
  h += '<span style="font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em">Dimensions:</span>';
  DIMS.forEach(function(dim) {
    h += '<div style="display:flex;align-items:center;gap:5px">';
    h += '<span style="display:inline-block;width:10px;height:10px;background:' + dim.color + ';border-radius:50%"></span>';
    h += '<span style="font-size:11px;color:var(--ink)">' + shortLabels[dim.id] + '</span>';
    h += '</div>';
  });
  h += '</div>';
  el.innerHTML = h;
}

function toggleWs(idx) {
  var card = document.getElementById('ws-card-' + idx);
  var header = card.querySelector('.ws-header');
  var open = card.classList.toggle('open');
  header.setAttribute('aria-expanded', open ? 'true' : 'false');
}

var activeOMFilter = 'all';

var OM_DIMENSIONS = [
  { id: 'all', label: 'All dimensions', color: '#6B7280' },
  { id: 'product-service-portfolio', label: 'Product and Service Portfolio', color: '#A100FF' },
  { id: 'organisation-processes', label: 'Organisation and Processes', color: '#3456C5' },
  { id: 'technology-platforms', label: 'Technology and Platforms', color: '#059669' },
  { id: 'value-management', label: 'Value Management', color: '#D97706' },
  { id: 'people', label: 'People', color: '#DC2626' }
];

function renderOMFilterChips() {
  var el = document.getElementById('del-om-filter');
  if (!el) return;
  el.innerHTML = OM_DIMENSIONS.map(function(dim) {
    var isActive = activeOMFilter === dim.id;
    return '<button onclick="selectOMFilter(\'' + dim.id + '\')" style="padding:5px 12px;border-radius:20px;border:1px solid ' + (isActive ? dim.color : 'var(--line)') + ';background:' + (isActive ? dim.color + '18' : '#fff') + ';color:' + (isActive ? dim.color : 'var(--text-muted)') + ';font-size:11px;font-weight:' + (isActive ? '700' : '500') + ';cursor:pointer;">' + dim.label + '</button>';
  }).join('');
}

function selectOMFilter(dimId) {
  activeOMFilter = dimId;
  renderOMFilterChips();
  renderDeliverables();
}

function renderDeliverables() {
  renderOMFilterChips();
  var phaseFilter = document.getElementById('del-phase-filter').value;
  var wsFilter = document.getElementById('del-ws-filter').value;
  var filtered = DELIVERABLES.filter(function(d){
    var phaseOk = phaseFilter === 'all' || d.phaseId === phaseFilter;
    var wsOk = wsFilter === 'all' || d.workstreamId === wsFilter;
    var omOk = activeOMFilter === 'all' || (Array.isArray(d.operatingModelDimension) && d.operatingModelDimension.includes(activeOMFilter));
    return phaseOk && wsOk && omOk;
  });
  document.getElementById('del-count').textContent = 'Showing ' + filtered.length + ' of ' + DELIVERABLES.length + ' deliverables';

  var omDimLabels = {};
  OM_DIMENSIONS.forEach(function(d){ omDimLabels[d.id] = d.label; });
  var omDimColors = {};
  OM_DIMENSIONS.forEach(function(d){ omDimColors[d.id] = d.color; });

  document.getElementById('del-grid').innerHTML = filtered.map(function(d) {
    var ws = WORKSTREAMS.find(function(w){ return w.id === d.workstreamId; });
    var omChips = Array.isArray(d.operatingModelDimension) ? d.operatingModelDimension.map(function(dim) {
      var c = omDimColors[dim] || '#6B7280';
      return '<span style="font-size:10px;padding:1px 6px;border-radius:8px;background:' + c + '18;color:' + c + ';border:1px solid ' + c + '33;font-weight:600;">' + (omDimLabels[dim] || dim) + '</span>';
    }).join(' ') : '';
    return '<div class="del-card" onclick="openDeliverableDrawer(\'' + d.id + '\')" tabindex="0" role="button" onkeydown="if(event.key===\'Enter\')openDeliverableDrawer(\'' + d.id + '\')" aria-label="' + d.id + ' - ' + d.name + '">' +
      '<div class="del-id">' + d.id + '</div>' +
      '<div class="del-name">' + d.name + '</div>' +
      '<div class="del-summary">' + d.executiveSummary + '</div>' +
      '<div class="del-meta">' + phaseChip(d.phaseId) + ' ' + statusChip(d.status) + ' ' + confidenceChip(d.confidence) + (d.decisionRequired ? ' ' + chip('Decision required','decision-required') : '') + '</div>' +
      (omChips ? '<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px;">' + omChips + '</div>' : '') +
      (ws ? '<div style="margin-top:6px;font-size:11px;color:var(--text-muted)">' + ws.name + '</div>' : '') +
    '</div>';
  }).join('') || '<div style="padding:24px;text-align:center;color:var(--text-muted)">No deliverables match the selected filters.</div>';
}

