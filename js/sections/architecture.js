// ── Section 3: Architecture and Application Onboarding ──
function renderArchitecture() {
  renderAppPopulationContext();
  renderArchEvolution();
  renderArchLayers();
  renderArchBoundary();
  renderArchHeadless();
  renderAppTiers();
  renderAppOnboarding();
  renderUserJourneys();
  renderTechDecisions();
  renderDeploymentPrinciples();
}

function renderAppPopulationContext() {
  var el = document.getElementById('app-population-context');
  if (!el) return;
  el.innerHTML = [
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:4px;">',
    '<div style="padding:14px 16px;background:var(--blue-pale);border:1px solid #B8D4F0;border-radius:8px;">',
    '<div style="font-size:22px;font-weight:700;color:var(--blue-dark);">~3,900</div>',
    '<div style="font-size:12px;font-weight:600;color:var(--blue-dark);margin-top:2px;">Total GT applications</div>',
    '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">LeanIX view August 2026. Across 10 delivery units.</div>',
    '</div>',
    '<div style="padding:14px 16px;background:var(--blue-pale);border:1px solid #B8D4F0;border-radius:8px;">',
    '<div style="font-size:22px;font-weight:700;color:var(--blue-dark);">~3,100</div>',
    '<div style="font-size:12px;font-weight:600;color:var(--blue-dark);margin-top:2px;">Business-owned applications</div>',
    '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">LeanIX view August 2026. Growing ~200 per year.</div>',
    '</div>',
    '<div style="padding:14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:8px;">',
    '<div style="font-size:22px;font-weight:700;color:#1A1A1A;">368 of 588</div>',
    '<div style="font-size:12px;font-weight:600;color:#1A1A1A;margin-top:2px;">Business capabilities</div>',
    '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Served by multiple apps from multiple units. Source: StratC deck slide 30.</div>',
    '</div>',
    '<div style="padding:14px 16px;background:#F4EBFF;border:1px solid #D8B4FE;border-radius:8px;">',
    '<div style="font-size:22px;font-weight:700;color:#5A1E96;">MITRA + MAYA</div>',
    '<div style="font-size:12px;font-weight:600;color:#5A1E96;margin-top:2px;">AI agents in the architecture</div>',
    '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">MITRA: Compliance Hub. MAYA: Product Hub. Both provisionally assigned names.</div>',
    '</div>',
    '</div>',
    '<div style="font-size:11px;color:var(--text-muted);">Application figures: LeanIX view August 2026. Source: StratC Purple Plus v0.99, September 2026.</div>'
  ].join('');
}

function renderArchEvolution() {
  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:16px">Architecture evolution: Today to Phase 3</h2>';
  h += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">';
  h += '<thead><tr style="background:var(--panel)">';
  h += '<th style="padding:10px 12px;text-align:left;font-weight:700;border:1px solid var(--line);width:130px">Area</th>';
  h += '<th style="padding:10px 12px;text-align:left;font-weight:700;border:1px solid var(--line)">Today</th>';
  h += '<th style="padding:10px 12px;text-align:left;font-weight:700;border:1px solid var(--line);color:var(--phase-1)">Phase 1</th>';
  h += '<th style="padding:10px 12px;text-align:left;font-weight:700;border:1px solid var(--line);color:var(--phase-2)">Phase 2</th>';
  h += '<th style="padding:10px 12px;text-align:left;font-weight:700;border:1px solid var(--line);color:var(--phase-3)">Phase 3</th>';
  h += '</tr></thead><tbody>';
  ARCH_EVOLUTION.forEach(function(row) {
    h += '<tr>';
    h += '<td style="padding:10px 12px;font-weight:600;border:1px solid var(--line);vertical-align:top;background:var(--panel)">' + row.area + '</td>';
    h += '<td style="padding:10px 12px;border:1px solid var(--line);vertical-align:top;color:var(--text-muted)">' + row.today + '</td>';
    h += '<td style="padding:10px 12px;border:1px solid var(--line);vertical-align:top;border-top:2px solid var(--phase-1)">' + row.phase1 + '</td>';
    h += '<td style="padding:10px 12px;border:1px solid var(--line);vertical-align:top;border-top:2px solid var(--phase-2)">' + row.phase2 + '</td>';
    h += '<td style="padding:10px 12px;border:1px solid var(--line);vertical-align:top;border-top:2px solid var(--phase-3)">' + row.phase3 + '</td>';
    h += '</tr>';
  });
  h += '</tbody></table></div>';
  document.getElementById('arch-evolution-table').innerHTML = h;
}

function renderArchLayers() {
  var layerColors = { experience: '#6B7280', integration: '#3456C5', workflow: '#5C4FC5', agent: '#7A3EB1', knowledge: '#A100FF', evidence: '#059669', platform: '#374151' };
  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:8px">Seven-layer on-premises architecture</h2>';
  h += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:20px">Users stay in their existing hubs. Agentic Compliance operates headlessly beneath them. No new end-user portal is required.</p>';
  h += '<div class="arch-layer-stack" style="display:flex;flex-direction:column;gap:8px">';
  ARCH_LAYERS.forEach(function(layer) {
    var color = layerColors[layer.layer] || '#6B7280';
    var isNewBadge = layer.isNew ? '<span style="font-size:10px;background:var(--success-pale);color:var(--success);padding:2px 8px;border-radius:10px;font-weight:600;margin-left:8px">New capability</span>' : '<span style="font-size:10px;background:var(--panel);color:var(--text-muted);padding:2px 8px;border-radius:10px;font-weight:600;margin-left:8px">Reuse existing</span>';
    h += '<div class="arch-layer" style="border-left:4px solid ' + color + ';background:var(--white);border:1px solid var(--line);border-left:4px solid ' + color + ';border-radius:8px;padding:14px 16px">';
    h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">';
    h += '<span style="font-size:11px;font-weight:700;background:' + color + ';color:#fff;padding:2px 8px;border-radius:10px">Layer ' + layer.order + '</span>';
    h += '<span style="font-weight:700;font-size:14px">' + layer.name + '</span>';
    h += isNewBadge;
    h += '</div>';
    h += '<p style="font-size:13px;color:var(--ink);margin-bottom:8px">' + layer.description + '</p>';
    if (layer.constraint) {
      h += '<div style="background:var(--warning-pale);border-radius:6px;padding:8px 12px;font-size:12px;color:var(--warning);font-weight:600;margin-bottom:8px">' + layer.constraint + '</div>';
    }
    h += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    layer.components.forEach(function(c) { h += '<span style="font-size:11px;background:var(--panel);padding:3px 8px;border-radius:4px;border:1px solid var(--line)">' + c + '</span>'; });
    h += '</div>';
    if (layer.note) h += '<p style="font-size:12px;color:var(--text-muted);margin-top:8px;font-style:italic">' + layer.note + '</p>';
    h += '</div>';
  });
  h += '</div>';
  document.getElementById('arch-layers').innerHTML = h;
}

function renderArchBoundary() {
  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:12px">Deterministic workflow and agent-runtime boundary</h2>';
  h += '<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:start">';
  h += '<div style="background:#EAF3FA;border:1px solid var(--blue-dark);border-radius:10px;padding:16px">';
  h += '<div style="font-weight:700;font-size:13px;color:var(--blue-dark);margin-bottom:10px">Layer 3: Workflow and case orchestration</div>';
  h += '<div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:6px">OWNS (deterministic):</div>';
  ['Case state and case ID', 'Routing and deadlines', 'Approval gates', 'Retries and exception queues', 'Access decisions', 'Status transitions', 'Audit events'].forEach(function(item) {
    h += '<div style="font-size:12px;padding:3px 0;display:flex;align-items:center;gap:6px"><span style="color:var(--success)">&#10003;</span> ' + item + '</div>';
  });
  h += '</div>';
  h += '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:16px 0">';
  h += '<div style="font-size:12px;color:var(--text-muted);text-align:center;max-width:100px">Controlled output</div>';
  h += '<div style="font-size:20px;color:var(--blue-dark)">&#8593;</div>';
  h += '<div style="font-size:12px;color:var(--text-muted);text-align:center;max-width:100px">Deterministic decision</div>';
  h += '</div>';
  h += '<div style="background:var(--purple-pale);border:1px solid var(--purple);border-radius:10px;padding:16px">';
  h += '<div style="font-weight:700;font-size:13px;color:var(--purple);margin-bottom:10px">Layer 4: Agent runtime</div>';
  h += '<div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:6px">PERFORMS (bounded tasks):</div>';
  ['Extract obligations from source documents', 'Prepare interpretation options', 'Suggest norm and control mappings', 'Summarise framework impact', 'Draft Work Product updates', 'Assemble evidence packages', 'Explain exceptions', 'Prepare assessment responses'].forEach(function(item) {
    h += '<div style="font-size:12px;padding:3px 0;display:flex;align-items:center;gap:6px"><span style="color:var(--purple)">&#8227;</span> ' + item + '</div>';
  });
  h += '</div>';
  h += '</div>';
  document.getElementById('arch-boundary').innerHTML = h;
}

function renderArchHeadless() {
  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:8px">Headless but transparent orchestration</h2>';
  h += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Users never enter the architecture layer directly. They see everything they need in their existing hubs via the integration facade.</p>';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin-bottom:16px">';
  ['Why am I affected?', 'What do I need to do?', 'What has already been prepared?', 'What still requires approval?', 'What proves the obligation has been fulfilled?'].forEach(function(q, i) {
    h += '<div style="background:var(--panel);border-radius:8px;padding:14px 16px;display:flex;align-items:flex-start;gap:12px">';
    h += '<span style="font-size:18px;font-weight:700;color:var(--purple);min-width:24px">' + (i + 1) + '</span>';
    h += '<div style="font-size:13px;font-weight:500">' + q + '</div>';
    h += '</div>';
  });
  h += '</div>';
  h += '<p style="font-size:12px;color:var(--text-muted)">These five questions must be answerable for every compliance case without the user accessing the agent runtime or workflow layer directly.</p>';
  document.getElementById('arch-headless').innerHTML = h;
}

function renderAppTiers() {
  var tierColors = ['#374151', '#3456C5', '#5C4FC5', '#7A3EB1'];
  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:8px">Application integration tiers</h2>';
  h += '<div style="background:var(--warning-pale);border-radius:8px;padding:10px 16px;font-size:13px;color:var(--warning);font-weight:600;margin-bottom:16px">Always select the lowest tier that provides reliable evidence. Tier 3 requires explicit justification.</div>';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">';
  APP_TIERS.forEach(function(tier, i) {
    var color = tierColors[i] || '#374151';
    h += '<div style="background:var(--white);border:1px solid var(--line);border-top:4px solid ' + color + ';border-radius:10px;padding:16px">';
    h += '<div style="font-size:11px;font-weight:700;color:#fff;background:' + color + ';display:inline-block;padding:3px 10px;border-radius:20px;margin-bottom:10px">' + tier.id.replace('-',' ').toUpperCase() + '</div>';
    h += '<div style="font-weight:700;font-size:14px;margin-bottom:8px">' + tier.name + '</div>';
    h += '<p style="font-size:13px;color:var(--ink);margin-bottom:10px">' + tier.description + '</p>';
    h += '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px">Suitable when</div>';
    h += '<p style="font-size:12px;color:var(--ink);margin-bottom:10px">' + tier.suitableWhen + '</p>';
    h += '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px">Examples</div>';
    h += '<ul style="font-size:12px;padding-left:16px;color:var(--ink)">';
    tier.examples.forEach(function(ex) { h += '<li>' + ex + '</li>'; });
    h += '</ul>';
    if (tier.default) h += '<div style="margin-top:10px;font-size:11px;background:var(--success-pale);color:var(--success);padding:4px 10px;border-radius:4px;font-weight:600;display:inline-block">Default starting point</div>';
    h += '</div>';
  });
  h += '</div>';
  document.getElementById('app-tiers').innerHTML = h;
}

function renderAppOnboarding() {
  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:8px">Application onboarding: 12-step method</h2>';
  h += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Each application follows this sequence when brought into the Agentic Compliance service. Steps 1-5 can be completed without any technical integration.</p>';
  h += '<div style="display:flex;flex-direction:column;gap:8px">';
  APP_ONBOARDING_STEPS.forEach(function(s) {
    h += '<div style="display:flex;align-items:flex-start;gap:12px;background:var(--white);border:1px solid var(--line);border-radius:8px;padding:12px 16px">';
    h += '<span style="font-size:13px;font-weight:700;color:var(--purple);min-width:24px;text-align:right">' + s.step + '.</span>';
    h += '<div><div style="font-weight:600;font-size:13px">' + s.action + '</div>';
    h += '<div style="font-size:12px;color:var(--text-muted);margin-top:2px">' + s.detail + '</div></div>';
    h += '</div>';
  });
  h += '</div>';
  document.getElementById('app-onboarding').innerHTML = h;
}

function renderUserJourneys() {
  if (typeof USER_JOURNEYS === 'undefined') return;
  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:8px">User journeys by persona</h2>';
  h += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Each persona works in their existing system. The primary content is visible without click-through. Agentic Compliance surfaces into their existing context.</p>';
  h += '<div style="display:flex;flex-direction:column;gap:8px">';
  USER_JOURNEYS.forEach(function(j) {
    h += '<details style="background:var(--white);border:1px solid var(--line);border-radius:8px;overflow:hidden">';
    h += '<summary style="padding:14px 16px;cursor:pointer;font-weight:600;font-size:13px;display:flex;align-items:center;gap:10px">';
    h += '<span style="font-weight:700">' + j.title + '</span>';
    h += ' <span style="font-size:12px;color:var(--text-muted);font-weight:400">via ' + j.hub + '</span>';
    h += ' <span style="font-size:12px;color:var(--text-muted);margin-left:auto;font-style:italic">' + j.summary + '</span>';
    h += '</summary>';
    h += '<div style="padding:0 16px 14px">';
    h += '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Sees in their existing hub:</div>';
    h += '<ul style="font-size:13px;padding-left:18px;margin-bottom:12px">';
    j.sees.forEach(function(s) { h += '<li style="margin-bottom:4px">' + s + '</li>'; });
    h += '</ul>';
    if (Array.isArray(j.doesNotNeed)) {
      h += '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Does not need:</div>';
      h += '<ul style="font-size:12px;padding-left:18px;color:var(--text-muted)">';
      j.doesNotNeed.forEach(function(s) { h += '<li>' + s + '</li>'; });
      h += '</ul>';
    }
    h += '</div></details>';
  });
  h += '</div>';
  document.getElementById('user-journeys').innerHTML = h;
}

function renderTechDecisions() {
  var h = '<h2 style="font-size:16px;font-weight:700;margin-bottom:8px">Technology decision register</h2>';
  h += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">For each component, assess existing enterprise capability before procuring or building new.</p>';
  h += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">';
  h += '<thead><tr style="background:var(--panel)">';
  ['Area', 'Existing capability', 'Gap', 'Recommended approach', 'Decision owner'].forEach(function(col) {
    h += '<th style="padding:8px 10px;text-align:left;font-weight:700;border:1px solid var(--line);white-space:nowrap">' + col + '</th>';
  });
  h += '</tr></thead><tbody>';
  TECH_DECISIONS.forEach(function(td) {
    h += '<tr>';
    h += '<td style="padding:8px 10px;font-weight:600;border:1px solid var(--line);vertical-align:top;white-space:nowrap">' + td.area + '</td>';
    h += '<td style="padding:8px 10px;border:1px solid var(--line);vertical-align:top">' + td.existingCapability + '</td>';
    h += '<td style="padding:8px 10px;border:1px solid var(--line);vertical-align:top">' + td.gap + '</td>';
    h += '<td style="padding:8px 10px;border:1px solid var(--line);vertical-align:top">' + td.recommendation + '</td>';
    h += '<td style="padding:8px 10px;border:1px solid var(--line);vertical-align:top;white-space:nowrap">' + td.decisionOwner + '</td>';
    h += '</tr>';
  });
  h += '</tbody></table></div>';
  document.getElementById('tech-decisions').innerHTML = h;
}

function renderDeploymentPrinciples() {
  var h = '<details style="background:var(--panel);border-radius:8px;overflow:hidden">';
  h += '<summary style="padding:14px 16px;cursor:pointer;font-weight:600;font-size:13px">On-premises deployment principles (12)</summary>';
  h += '<ul style="padding:0 16px 16px 32px;font-size:13px;display:flex;flex-direction:column;gap:8px">';
  DEPLOYMENT_PRINCIPLES.forEach(function(p) { h += '<li>' + p + '</li>'; });
  h += '</ul></details>';
  document.getElementById('deployment-principles').innerHTML = h;
}

