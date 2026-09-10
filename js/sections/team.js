// ── Section 4: Team ──
var activeScenario = 'recommended';

function renderTeam() {
  renderWorkforceImpactPanel();
  renderTeamRampChart();
  renderScenarioSelector();
  renderPodGrid();
  renderSquadModel();
  renderCostLevers();
  renderGuardrails();
  renderSkillHeatmap();
}

function renderTeamRampChart() {
  if (typeof echarts === 'undefined' || typeof SCENARIOS === 'undefined') return;
  uc3ChartDestroy('team-ramp-chart');
  var sc = SCENARIOS.find(function(s){ return s.id === activeScenario; }) || SCENARIOS[1];
  var squadFtePerUnit = 4.5;
  var coreFte = (sc.persistentCoreFTE.min + sc.persistentCoreFTE.max) / 2;
  var clientFte = (sc.clientFTE.min + sc.clientFTE.max) / 2;
  var squadP1 = sc.onboardingSquads.min * squadFtePerUnit;
  var squadP2 = ((sc.onboardingSquads.min + sc.onboardingSquads.max) / 2) * squadFtePerUnit;
  var squadP3 = (sc.onboardingSquads.max + 1) * squadFtePerUnit;

  uc3Chart('team-ramp-chart', {
    title: {
      text: 'Team ramp: ' + sc.name + ' scenario',
      left: 0,
      textStyle: { fontSize: 13, fontWeight: '700', color: '#1A1A1A' },
      subtext: 'Illustrative planning assumption, not a commercial estimate. Figures directional only.',
      subtextStyle: { fontSize: 10, color: '#6B7280' }
    },
    tooltip: {
      trigger: 'axis', axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var total = 0;
        var html = '<strong>' + params[0].axisValue + '</strong><br>';
        params.forEach(function(p) { total += p.value; html += p.marker + ' ' + p.seriesName + ': ' + p.value.toFixed(1) + ' FTE<br>'; });
        return html + '<strong>Total: ' + total.toFixed(1) + ' FTE (directional)</strong>';
      }
    },
    legend: { bottom: 0, data: ['Core team', 'Regulation squads', 'Client SMEs'] },
    grid: { top: 72, bottom: 40, left: 46, right: 16 },
    xAxis: { type: 'category', data: ['Phase 1 (Oct 2026)', 'Phase 2 (Apr 2027)', 'Phase 3 (Oct 2027)'] },
    yAxis: { type: 'value', name: 'FTE', nameTextStyle: { fontSize: 11, color: '#6B7280' } },
    series: [
      { name: 'Core team',         type: 'bar', stack: 'total', data: [coreFte, coreFte, coreFte], itemStyle: { color: '#3456C5' } },
      { name: 'Regulation squads', type: 'bar', stack: 'total', data: [squadP1, squadP2, squadP3], itemStyle: { color: '#A100FF' } },
      { name: 'Client SMEs',       type: 'bar', stack: 'total', data: [clientFte * 0.75, clientFte, clientFte * 1.25], itemStyle: { color: '#D97706' } }
    ]
  });
}

function renderWorkforceImpactPanel() {
  var el = document.getElementById('workforce-impact-panel');
  if (!el) return;
  var s = WORKFORCE_IMPACT_SUMMARY;
  var html = '<div style="background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:20px;">';
  html += '<div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:16px;">Workforce impact context</div>';

  // Summary metrics row
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:16px;">';
  html += '<div style="padding:12px 14px;background:#fff;border-radius:8px;border:1px solid var(--line);">';
  html += '<div style="font-size:22px;font-weight:700;color:#1A1A1A;">Up to ' + s.affectedRoleTypes + '</div>';
  html += '<div style="font-size:12px;font-weight:600;margin-top:2px;">GTRF role types in scope</div>';
  html += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Subject to GTRF analysis</div>';
  html += '</div>';
  html += '<div style="padding:12px 14px;background:#fff;border-radius:8px;border:1px solid var(--line);">';
  html += '<div style="font-size:22px;font-weight:700;color:#1A1A1A;">~' + s.fteInScope.toLocaleString() + '</div>';
  html += '<div style="font-size:12px;font-weight:600;margin-top:2px;">FTE in potential scope</div>';
  html += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Working assumption, subject to GTRF validation</div>';
  html += '</div>';
  html += '<div style="padding:12px 14px;background:var(--success-pale);border-radius:8px;border:1px solid var(--success);">';
  html += '<div style="font-size:22px;font-weight:700;color:var(--success);">' + s.capacityFreed + ' FTE</div>';
  html += '<div style="font-size:12px;font-weight:600;color:var(--success);margin-top:2px;">Capacity freed at 13.8%</div>';
  html += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Capacity freed, not headcount reduction</div>';
  html += '</div>';
  html += '</div>';

  // Future task outcome distribution
  html += '<div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">Future task outcome (directional)</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">';
  FUTURE_TASK_OUTCOME_TAXONOMY.forEach(function(fto) {
    var count = GTRF_ROLES.filter(function(r){ return r.futureTaskOutcome === fto.id; }).length;
    if (count === 0) return;
    html += '<div style="padding:6px 12px;border-radius:20px;border:1px solid ' + fto.color + '44;background:' + fto.color + '12;display:flex;align-items:center;gap:6px;">';
    html += '<span style="font-size:14px;font-weight:700;color:' + fto.color + ';">' + count + '</span>';
    html += '<span style="font-size:11px;font-weight:600;color:' + fto.color + ';">' + fto.label + '</span>';
    html += '</div>';
  });
  html += '</div>';

  html += '<div style="font-size:11px;color:var(--text-muted);">' + s.populationDisclaimer + ' Future task outcome distribution is based on initial role assessment, subject to GTRF validation.</div>';
  html += '</div>';

  // GTRF roles table
  html += '<h2 style="margin-top:24px;margin-bottom:8px;">GTRF roles in UC3 scope</h2>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:14px;">Up to 14 GTRF role types identified for initial UC3 impact assessment. Subject to GTRF analysis (Phase 1, December 2026).</p>';
  html += '<div class="raid-table-wrap">';
  html += '<table class="raid-table" aria-label="GTRF roles in UC3 scope">';
  html += '<thead><tr><th>Role type</th><th>Future task outcome</th><th>Task shift summary</th><th>New skills required</th></tr></thead>';
  html += '<tbody>';
  GTRF_ROLES.forEach(function(r) {
    var fto = FUTURE_TASK_OUTCOME_TAXONOMY.find(function(f){ return f.id === r.futureTaskOutcome; });
    var ftoColor = fto ? fto.color : '#6B7280';
    html += '<tr>';
    html += '<td style="font-weight:600;">' + r.roleType + '</td>';
    html += '<td><span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px;background:' + ftoColor + '18;color:' + ftoColor + ';border:1px solid ' + ftoColor + '44;">' + (fto ? fto.label : r.futureTaskOutcome) + '</span></td>';
    html += '<td style="font-size:12px;color:var(--text-muted);">' + r.taskShiftSummary + '</td>';
    html += '<td style="font-size:12px;">' + r.newSkillsRequired.join(', ') + '</td>';
    html += '</tr>';
  });
  html += '</tbody></table></div>';

  el.innerHTML = html;
}

function renderScenarioSelector() {
  if (typeof SCENARIOS === 'undefined') return;
  var html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">';
  SCENARIOS.forEach(function(s) {
    var isActive = s.id === activeScenario;
    var colors = { lean: '#5A6475', recommended: '#3456C5', accelerated: '#7A3EB1' };
    var col = colors[s.id] || '#3456C5';
    html += '<div onclick="selectScenario(\'' + s.id + '\')" style="cursor:pointer;border:' + (isActive ? '2px solid ' + col : '1px solid var(--line)') + ';border-radius:10px;padding:16px;background:' + (isActive ? '#EAF3FA' : 'var(--white)') + ';position:relative;transition:border 0.15s">';
    if (isActive) html += '<div style="position:absolute;top:-10px;left:16px;font-size:10px;font-weight:700;background:' + col + ';color:#fff;padding:2px 10px;border-radius:10px">Selected</div>';
    html += '<div style="font-weight:700;font-size:15px;margin-bottom:4px;color:' + col + '">' + s.name + '</div>';
    html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">' + s.description + '</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">';
    html += '<div style="text-align:center"><div style="font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:2px">Core FTE</div><div style="font-size:16px;font-weight:700;color:var(--ink)">' + s.persistentCoreFTE.min + '-' + s.persistentCoreFTE.max + '</div></div>';
    html += '<div style="text-align:center"><div style="font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:2px">Squads</div><div style="font-size:16px;font-weight:700;color:var(--ink)">' + s.onboardingSquads.min + '-' + s.onboardingSquads.max + '</div></div>';
    html += '<div style="text-align:center"><div style="font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:2px">Client FTE</div><div style="font-size:16px;font-weight:700;color:var(--ink)">' + s.clientFTE.min + '-' + s.clientFTE.max + '</div></div>';
    html += '</div>';
    html += '<div style="font-size:12px;color:var(--ink);margin-bottom:8px;line-height:1.5"><strong>Month 18:</strong> ' + s.month18Outcome + '</div>';
    html += '<details style="margin-top:8px"><summary style="font-size:11px;font-weight:700;color:var(--blue-dark);cursor:pointer">Phase shape</summary>';
    html += '<div style="font-size:11px;color:var(--ink);margin-top:6px;line-height:1.7">';
    html += '<div><strong>Phase 1:</strong> ' + s.phaseShape.phase1 + '</div>';
    html += '<div><strong>Phase 2:</strong> ' + s.phaseShape.phase2 + '</div>';
    html += '<div><strong>Phase 3:</strong> ' + s.phaseShape.phase3 + '</div>';
    html += '</div></details>';
    if (s.principalRisks && s.principalRisks.length) {
      html += '<details style="margin-top:8px"><summary style="font-size:11px;font-weight:700;color:#B35000;cursor:pointer">Principal risks</summary>';
      html += '<ul style="font-size:11px;color:var(--ink);margin:6px 0 0 16px;line-height:1.7">';
      s.principalRisks.forEach(function(r) { html += '<li>' + r + '</li>'; });
      html += '</ul></details>';
    }
    html += '</div>';
  });
  html += '</div>';
  html += '<p style="font-size:11px;color:var(--text-muted);margin-top:10px"><i class="ti ti-info-circle" style="margin-right:4px"></i>Illustrative planning assumption, not a commercial estimate.</p>';
  document.getElementById('team-scenario-selector').innerHTML = html;
}

function selectScenario(id) {
  activeScenario = id;
  renderScenarioSelector();
  renderTeamRampChart();
}

function renderPodGrid() {
  document.getElementById('pod-grid').innerHTML = PODS.map(function(pod) {
    var maxFte = Math.max(pod.fte.phase1, pod.fte.phase2, pod.fte.phase3, 1);
    return '<div class="pod-card">' +
      '<div class="pod-header">' +
        '<div class="pod-icon" style="background:' + pod.color + '18;color:' + pod.color + '">' +
          '<i class="ti ' + pod.icon + '"></i>' +
        '</div>' +
        '<div><div class="pod-name">' + pod.name + '</div><div class="pod-purpose text-sm text-muted">' + pod.purpose + '</div></div>' +
      '</div>' +
      '<div class="pod-roles">' +
        pod.roleIds.map(function(rid) {
          var role = ROLES.find(function(r){ return r.id===rid; });
          if (!role) return '';
          var sideLabel = role.side === 'client' ? 'Client' : role.side === 'accenture' ? 'Accenture' : 'Shared';
          var sideCls = role.side === 'client' ? 'chip-client' : role.side === 'accenture' ? 'chip-accenture' : 'chip-shared';
          return '<div class="pod-role-item" onclick="openRoleDrawer(\'' + rid + '\')" tabindex="0" role="button" onkeydown="if(event.key===\'Enter\')openRoleDrawer(\'' + rid + '\')">' +
            '<span>' + role.title + '</span>' +
            '<span class="chip ' + sideCls + '" style="font-size:9px;padding:2px 6px">' + sideLabel + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div class="pod-fte-bars">' +
        ['phase1','phase2','phase3'].map(function(ph, idx) {
          var fte = pod.fte[ph];
          var label = 'P' + (idx+1);
          return '<div class="fte-bar-group"><div class="fte-bar-label">' + label + ': ' + fte.toFixed(1) + '</div>' +
            '<div class="fte-bar-track"><div class="fte-bar-fill" style="width:' + (fte/maxFte*100).toFixed(0) + '%;background:' + pod.color + '"></div></div></div>';
        }).join('') +
      '</div>' +
    '</div>';
  }).join('');
}

function renderSquadModel() {
  if (typeof SQUAD_TEMPLATE === 'undefined' || typeof PERSISTENT_CORE === 'undefined') return;
  var html = '<h2 style="margin-bottom:4px">Regulation Onboarding Squad</h2>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">One squad per active regulation wave. Activate only when source documents, SMEs and system access are confirmed. Illustrative planning assumption, not a commercial estimate.</p>';
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">';

  // Persistent Core compact list
  html += '<div style="border:1px solid var(--line);border-radius:10px;padding:16px;background:var(--white)">';
  html += '<div style="font-size:12px;font-weight:700;color:var(--blue-dark);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.08em">Persistent Core (all scenarios)</div>';
  PERSISTENT_CORE.forEach(function(r) {
    var sideCls = r.side === 'client' ? 'chip-client' : r.side === 'accenture' ? 'chip-accenture' : 'chip-shared';
    var sideLabel = r.side === 'client' ? 'Client' : r.side === 'accenture' ? 'Accenture' : 'Shared';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--panel);font-size:12px">';
    html += '<div style="flex:1"><span' + (r.guardrail ? ' style="font-weight:600"' : '') + '>' + r.role + '</span>';
    if (r.guardrail) html += ' <span style="font-size:10px;color:#B35000;font-weight:700">guardrail</span>';
    html += '<div style="font-size:10px;color:var(--text-muted)">' + r.note + '</div></div>';
    html += '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">';
    html += '<span class="chip ' + sideCls + '" style="font-size:9px;padding:2px 6px">' + sideLabel + '</span>';
    html += '<span style="font-size:11px;font-weight:600;color:var(--ink)">' + r.fteMin + '-' + r.fteMax + ' FTE</span>';
    html += '</div></div>';
  });
  html += '</div>';

  // Onboarding Squad
  html += '<div style="border:1px solid var(--line);border-radius:10px;padding:16px;background:var(--white)">';
  html += '<div style="font-size:12px;font-weight:700;color:#5C4FC5;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.08em">Per-Regulation Onboarding Squad</div>';
  SQUAD_TEMPLATE.forEach(function(r) {
    var sideCls = r.side === 'client' ? 'chip-client' : r.side === 'accenture' ? 'chip-accenture' : 'chip-shared';
    var sideLabel = r.side === 'client' ? 'Client' : r.side === 'accenture' ? 'Accenture' : 'Shared';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--panel);font-size:12px">';
    html += '<div style="flex:1"><span>' + r.role + '</span>';
    html += '<div style="font-size:10px;color:var(--text-muted)">' + r.note + '</div></div>';
    html += '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">';
    html += '<span class="chip ' + sideCls + '" style="font-size:9px;padding:2px 6px">' + sideLabel + '</span>';
    html += '<span style="font-size:11px;font-weight:600;color:var(--ink)">' + r.fteMin + '-' + r.fteMax + ' FTE</span>';
    html += '</div></div>';
  });
  html += '<div style="font-size:11px;color:var(--text-muted);margin-top:10px">Squad total: approx 5-6 FTE per active regulation wave.</div>';
  html += '</div>';

  html += '</div>';
  document.getElementById('squad-model').innerHTML = html;
}

function renderCostLevers() {
  if (typeof COST_LEVERS === 'undefined') return;
  var html = '<h2 style="margin-bottom:4px">Cost Levers</h2>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">Levers that can reduce total cost without compromising programme integrity. Apply before committing to a scenario.</p>';
  html += '<div style="border:1px solid var(--line);border-radius:10px;overflow:hidden">';
  COST_LEVERS.forEach(function(cl, i) {
    var bg = i % 2 === 0 ? 'var(--white)' : 'var(--panel)';
    html += '<details style="background:' + bg + '">';
    html += '<summary style="padding:12px 16px;cursor:pointer;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px">';
    html += '<span style="font-size:10px;font-weight:700;background:var(--blue-dark);color:#fff;padding:2px 7px;border-radius:8px;min-width:32px;text-align:center">' + cl.id.replace('cl-','CL') + '</span>';
    html += cl.label + '</summary>';
    html += '<div style="padding:0 16px 14px 16px;font-size:13px;color:var(--ink)">';
    html += '<p style="margin-bottom:8px">' + cl.description + '</p>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px">';
    html += '<div><strong style="color:#1A7A3E">Saving:</strong> ' + cl.saving + '</div>';
    html += '<div><strong style="color:#B35000">Risk:</strong> ' + cl.risk + '</div>';
    html += '</div></div>';
    html += '</details>';
  });
  html += '</div>';
  document.getElementById('cost-levers').innerHTML = html;
}

function renderGuardrails() {
  if (typeof GUARDRAILS === 'undefined') return;
  var html = '<h2 style="margin-bottom:4px">False-Economy Guardrails</h2>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">Roles and capabilities that cannot be removed in any scenario. Removing these creates a compliance liability or a delivery failure - not a saving.</p>';
  html += '<div style="border:1px solid #F0B429;border-radius:10px;overflow:hidden">';
  GUARDRAILS.forEach(function(g, i) {
    var bg = i % 2 === 0 ? '#FFFDF0' : '#FFF8E0';
    html += '<details style="background:' + bg + '">';
    html += '<summary style="padding:12px 16px;cursor:pointer;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px">';
    html += '<i class="ti ti-shield-check" style="color:#B35000;font-size:14px;flex-shrink:0"></i>';
    html += g.role + '</summary>';
    html += '<div style="padding:0 16px 14px 16px;font-size:13px;color:var(--ink)">';
    html += '<p style="margin-bottom:8px">' + g.why + '</p>';
    html += '<div style="font-size:11px;font-weight:700;color:#B35000">' + g.scenario + '</div>';
    html += '</div></details>';
  });
  html += '</div>';
  document.getElementById('guardrails-panel').innerHTML = html;
}

function renderSkillHeatmap() {
  var skills = [
    {name:'Regulatory interpretation', p1:'critical', p2:'important', p3:'bg'},
    {name:'Controls engineering', p1:'critical', p2:'important', p3:'bg'},
    {name:'Backup and Restore domain', p1:'critical', p2:'important', p3:'bg'},
    {name:'Product management', p1:'critical', p2:'critical', p3:'important'},
    {name:'Agentic AI', p1:'critical', p2:'critical', p3:'important'},
    {name:'Orchestration', p1:'important', p2:'critical', p3:'important'},
    {name:'Data and knowledge engineering', p1:'critical', p2:'critical', p3:'important'},
    {name:'Integration engineering', p1:'critical', p2:'critical', p3:'important'},
    {name:'Technical verification', p1:'bg', p2:'critical', p3:'important'},
    {name:'Cloud and DevSecOps', p1:'important', p2:'important', p3:'critical'},
    {name:'Responsible AI', p1:'critical', p2:'important', p3:'important'},
    {name:'Security', p1:'critical', p2:'important', p3:'important'},
    {name:'Test and assurance', p1:'important', p2:'critical', p3:'important'},
    {name:'Service management', p1:'bg', p2:'important', p3:'critical'},
    {name:'Change and adoption', p1:'bg', p2:'important', p3:'critical'},
    {name:'Value realisation', p1:'important', p2:'critical', p3:'critical'}
  ];
  var hmSymbol = {critical:'&#9679;', important:'&#9680;', bg:'&#9675;'};
  var hmLabel = {critical:'Critical', important:'Important', bg:'Not applicable'};
  document.getElementById('heatmap-body').innerHTML = skills.map(function(s) {
    return '<tr>' +
      '<td class="skill-name">' + s.name + '</td>' +
      ['p1','p2','p3'].map(function(ph) {
        return '<td class="hm-' + s[ph] + '" title="' + hmLabel[s[ph]] + '">' + hmSymbol[s[ph]] + '</td>';
      }).join('') +
    '</tr>';
  }).join('');
}

