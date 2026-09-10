// ── Drawers ──
function openDrawer(drawerId) {
  document.querySelectorAll('.drawer').forEach(function(d){ d.classList.remove('open'); });
  document.getElementById(drawerId).classList.add('open');
  document.getElementById('drawer-backdrop').classList.add('open');
  document.getElementById(drawerId).querySelector('[aria-label="Close"]').focus();
}

function closeDrawer() {
  document.querySelectorAll('.drawer').forEach(function(d){ d.classList.remove('open'); });
  document.getElementById('drawer-backdrop').classList.remove('open');
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeDrawer();
});

function openDeliverableDrawer(id) {
  var d = DELIVERABLES.find(function(x){ return x.id === id; });
  if (!d) return;
  var ws = WORKSTREAMS.find(function(w){ return w.id === d.workstreamId; });
  var accountable = ROLES.find(function(r){ return r.id === d.accountableRoleId; });

  document.getElementById('dd-id').textContent = d.id;
  document.getElementById('dd-name').textContent = d.name;
  document.getElementById('dd-chips').innerHTML = phaseChip(d.phaseId) + ' ' + statusChip(d.status) + ' ' + confidenceChip(d.confidence) + (ws ? ' <span class="chip chip-proposed">' + ws.shortName + '</span>' : '');
  document.getElementById('dd-summary').textContent = d.executiveSummary;
  document.getElementById('dd-dod').innerHTML = d.definitionOfDone.map(function(item){ return '<li class="dod-item"><i class="ti ti-circle-check"></i>' + item + '</li>'; }).join('');

  if (d.decisionRequired) {
    document.getElementById('dd-dec-wrap').style.display = 'block';
    document.getElementById('dd-dec').textContent = d.decisionRequired;
  } else {
    document.getElementById('dd-dec-wrap').style.display = 'none';
  }

  var rolesHtml = accountable ? '<div style="margin-bottom:8px"><strong>Accountable:</strong> <span style="cursor:pointer;color:var(--blue-dark);text-decoration:underline" onclick="openRoleDrawer(\'' + accountable.id + '\')">' + accountable.title + '</span></div>' : '';
  var supporting = d.supportingRoleIds.map(function(rid){ var r=ROLES.find(function(x){return x.id===rid;}); return r?r.title:rid; });
  if (supporting.length) rolesHtml += '<div><strong>Supporting:</strong> ' + supporting.join(', ') + '</div>';
  document.getElementById('dd-roles').innerHTML = rolesHtml;

  var depsHtml = d.dependencies.length ? d.dependencies.map(function(dep){ return '<span style="cursor:pointer;color:var(--blue-dark);text-decoration:underline" onclick="openDeliverableDrawer(\'' + dep + '\')">' + dep + '</span>'; }).join(', ') : 'None';
  document.getElementById('dd-deps').innerHTML = depsHtml;

  openDrawer('del-drawer');
}

function openRoleDrawer(id) {
  var role = ROLES.find(function(r){ return r.id === id; });
  if (!role) return;
  var pod = PODS.find(function(p){ return p.id === role.pod; });

  document.getElementById('rd-pod').textContent = pod ? pod.name : '';
  document.getElementById('rd-name').textContent = role.title;

  var sideLabel = role.side === 'client' ? 'Client' : role.side === 'accenture' ? 'Accenture' : 'Shared';
  var sideCls = role.side === 'client' ? 'chip-client' : role.side === 'accenture' ? 'chip-accenture' : 'chip-shared';
  document.getElementById('rd-chips').innerHTML = '<span class="chip ' + sideCls + '">' + sideLabel + '</span><span class="chip chip-proposed">Mobilisation: ' + role.priority + '</span>';
  document.getElementById('rd-mission').textContent = role.mission;
  document.getElementById('rd-skills').innerHTML = role.skills.map(function(s){ return '<span class="chip chip-proposed">' + s + '</span>'; }).join('');

  var dels = role.deliverableIds.map(function(did){
    var del = DELIVERABLES.find(function(d){ return d.id===did; });
    return del ? '<div style="margin-bottom:6px"><span style="cursor:pointer;color:var(--blue-dark);text-decoration:underline" onclick="openDeliverableDrawer(\'' + did + '\')">' + did + ' - ' + del.name + '</span></div>' : '';
  });
  document.getElementById('rd-deliverables').innerHTML = dels.join('') || '<span style="color:var(--text-muted)">No standalone deliverables assigned.</span>';

  document.getElementById('rd-fte').innerHTML = [
    {label:'Phase 1', val:role.fte.phase1, color:'var(--phase-1)'},
    {label:'Phase 2', val:role.fte.phase2, color:'var(--phase-2)'},
    {label:'Phase 3', val:role.fte.phase3, color:'var(--phase-3)'}
  ].map(function(f) {
    return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
      '<div style="width:80px;font-size:12px">' + f.label + '</div>' +
      '<div style="flex:1;height:6px;background:var(--line);border-radius:3px">' +
        '<div style="height:100%;width:' + (f.val/2*100).toFixed(0) + '%;background:' + f.color + ';border-radius:3px"></div>' +
      '</div>' +
      '<div style="width:40px;text-align:right;font-size:12px;font-weight:600">' + f.val.toFixed(2) + '</div>' +
    '</div>';
  }).join('') + '<div style="font-size:11px;color:var(--text-muted);margin-top:4px">Illustrative FTE allocation</div>';

  openDrawer('role-drawer');
}

