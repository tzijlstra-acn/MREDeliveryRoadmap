// ── Section 5: Execution Control ──
function renderControl() {
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
  renderDecisionLog();
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

