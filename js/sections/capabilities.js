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
  if (tabName === 'deliverables') renderDeliverables();
}

function renderCapabilities() {
  // Populate ws filter dropdown
  var sel = document.getElementById('del-ws-filter');
  WORKSTREAMS.forEach(function(ws){ sel.innerHTML += '<option value="' + ws.id + '">' + ws.name + '</option>'; });

  document.getElementById('ws-accordion').innerHTML = WORKSTREAMS.map(function(ws, i) {
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

