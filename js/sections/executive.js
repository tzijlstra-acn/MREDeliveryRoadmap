// ── Section 1: Executive Decision ──

function renderExecutive() {
  renderDecisionStrip();
  renderExecJourney();
  renderScaleRibbon();
  renderPurplePlusCallout();
  renderThreeScaleDimensions();
  renderKpiStrip();
  renderExecPhaseSummary();
  renderExecScenarioChips();
  renderTransformStrip();
  renderFoundation();
  renderActions();
  renderDecisions();
}

function renderDecisionStrip() {
  var el = document.getElementById('exec-decision-strip');
  if (!el) return;
  el.innerHTML = [
    '<div style="display:grid;grid-template-columns:auto 1fr;border:2px solid var(--warning);border-radius:10px;overflow:hidden;background:var(--warning-pale)">',
    '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 20px;background:var(--warning);gap:6px;min-width:112px">',
    '<i class="ti ti-alert-triangle" style="color:#fff;font-size:22px"></i>',
    '<div style="font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#fff;text-align:center">Decision<br>Required</div>',
    '</div>',
    '<div style="padding:16px 24px;display:grid;grid-template-columns:1fr auto;gap:16px;align-items:center;flex-wrap:wrap">',
    '<div>',
    '<div style="font-size:15px;font-weight:700;color:var(--ink);margin-bottom:6px">Mobilise Phase 1: Foundation and Proof (October 2026 - March 2027)</div>',
    '<div style="font-size:13px;color:var(--text-muted);line-height:1.5">Confirm Executive Sponsor, approve Phase 1 funding, and name the Agentic Compliance Product Owner before October 2026 to maintain the programme start date.</div>',
    '</div>',
    '<div style="display:flex;flex-direction:column;gap:6px;min-width:170px">',
    '<div style="display:flex;align-items:center;gap:8px;font-size:12px"><i class="ti ti-calendar" style="color:var(--warning);flex-shrink:0"></i><span><strong>Oct 2026 - Mar 2027</strong></span></div>',
    '<div style="display:flex;align-items:center;gap:8px;font-size:12px"><i class="ti ti-flag" style="color:var(--warning);flex-shrink:0"></i><span>Gate G2 - March 2027</span></div>',
    '<div style="display:flex;align-items:center;gap:8px;font-size:12px"><i class="ti ti-user" style="color:var(--warning);flex-shrink:0"></i><span>Owner: Executive Sponsor</span></div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');
}

function renderExecJourney() {
  var el = document.getElementById('exec-journey');
  if (!el) return;

  var stages = [
    {
      num: '1', label: 'Prove', sub: 'Phase 1 - Integrate',
      months: 'Oct 2026 - Mar 2027', colorHex: '#3456C5',
      gate: 'Gate G2 - March 2027',
      bullets: [
        'Backup and Restore: one obligation set within DORA',
        'Proves the full obligation-to-evidence chain end to end',
        'Real applications and Product Teams in scope',
        'Establishes measurable baseline for value tracking',
        'Governance and human gate structure operational'
      ]
    },
    {
      num: '2', label: 'Build once', sub: 'Phase 2 - Orchestrate',
      months: 'Apr 2027 - Sep 2027', colorHex: '#5C4FC5',
      gate: 'Gate G3 - September 2027',
      bullets: [
        'Shared agents, orchestration and evidence connectors',
        'Regulatory onboarding factory: reusable per regulation',
        'Hub-to-hub integration automated and governed',
        'Wave 1 regulations onboarded repeatably',
        'Operating model and service controls established'
      ]
    },
    {
      num: '3', label: 'Scale', sub: 'Phase 3 - Industrialise',
      months: 'Oct 2027 onwards', colorHex: '#7A3EB1',
      gate: 'Gate G4 - March 2028',
      bullets: [
        'North Star target: 24 regulations',
        'Compliance as a Service across the portfolio',
        'Prioritised waves selected at each gate decision',
        'Application onboarding scales via the factory',
        'Committed Month 18 coverage: decision required'
      ]
    }
  ];

  var parts = [];
  stages.forEach(function(s, i) {
    var bullets = s.bullets.map(function(b) {
      return '<li style="display:flex;align-items:flex-start;gap:7px;margin-bottom:5px">' +
        '<i class="ti ti-point-filled" style="font-size:9px;color:' + s.colorHex + ';margin-top:4px;flex-shrink:0"></i>' +
        '<span style="font-size:12px;color:var(--ink);line-height:1.45">' + b + '</span></li>';
    }).join('');

    parts.push(
      '<div style="flex:1;min-width:220px;border:1px solid var(--line);border-top:4px solid ' + s.colorHex + ';border-radius:10px;padding:18px;background:var(--white)">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">' +
      '<div style="width:26px;height:26px;border-radius:50%;background:' + s.colorHex + ';display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
      '<span style="font-size:12px;font-weight:700;color:#fff">' + s.num + '</span></div>' +
      '<div><div style="font-size:14px;font-weight:700;color:var(--ink)">' + s.label + '</div>' +
      '<div style="font-size:10px;font-weight:600;color:' + s.colorHex + ';text-transform:uppercase;letter-spacing:0.08em">' + s.sub + '</div></div></div>' +
      '<div style="font-size:11px;color:var(--text-muted);margin-bottom:10px">' + s.months + '</div>' +
      '<ul style="list-style:none;margin-bottom:12px">' + bullets + '</ul>' +
      '<div style="font-size:11px;font-weight:700;color:' + s.colorHex + ';background:' + s.colorHex + '18;padding:4px 10px;border-radius:6px;display:inline-block">' + s.gate + '</div>' +
      '</div>'
    );

    if (i < stages.length - 1) {
      parts.push('<div style="display:flex;align-items:center;padding:0 6px;color:var(--text-muted);font-size:22px;flex-shrink:0" aria-hidden="true">&#8594;</div>');
    }
  });

  el.innerHTML = '<div style="display:flex;align-items:stretch;gap:0;flex-wrap:wrap">' + parts.join('') + '</div>';
}

function renderScaleRibbon() {
  var el = document.getElementById('exec-scale-ribbon');
  if (!el) return;

  var items = [
    { val: '24', label: 'North Star regulations', sub: 'Target portfolio', icon: 'ti-books', color: '#3456C5' },
    { val: '45+', label: 'Regulatory guidelines', sub: 'Mapped obligations', icon: 'ti-file-text', color: '#5C4FC5' },
    { val: '80+', label: 'Work Products', sub: 'Defined artefacts', icon: 'ti-file-check', color: '#7A3EB1' },
    { val: '~3,900', label: 'Applications in scope', sub: 'LeanIX view, August 2026', icon: 'ti-app-window', color: '#059669' },
    { val: '13.8%', label: 'Capacity hypothesis', sub: 'Directional - to validate', icon: 'ti-chart-bar', color: '#B97912', highlight: true }
  ];

  var cells = items.map(function(item) {
    var bg = item.highlight ? 'var(--warning-pale)' : 'var(--white)';
    var border = item.highlight ? 'var(--warning)' : 'var(--line)';
    return '<div style="flex:1;min-width:130px;padding:14px 12px;border:1px solid ' + border + ';border-radius:8px;background:' + bg + ';text-align:center">' +
      '<div style="font-size:22px;font-weight:700;color:' + item.color + ';font-family:Space Grotesk,sans-serif;margin-bottom:4px">' + item.val + '</div>' +
      '<div style="font-size:11px;font-weight:600;color:var(--ink);line-height:1.3;margin-bottom:3px">' + item.label + '</div>' +
      '<div style="font-size:10px;color:var(--text-muted)">' + item.sub + '</div>' +
      '</div>';
  });

  el.innerHTML =
    '<div style="display:flex;gap:8px;flex-wrap:wrap">' + cells.join('') + '</div>' +
    '<div style="margin-top:8px;font-size:11px;color:var(--text-muted);font-style:italic">' +
    '13.8% is a directional working assumption: capacity freed within the affected scope (14 GTRF role types, 2,864 FTE - working assumption subject to GTRF validation). Capacity freed is not headcount reduction. To validate through operational pilot at Gate 2.' +
    '</div>';
}

function renderPurplePlusCallout() {
  var el = document.getElementById('purple-plus-callout');
  if (!el) return;
  el.innerHTML = [
    '<div style="background:linear-gradient(135deg,#F4EBFF 0%,#EAF3FA 100%);border:1px solid #D8B4FE;border-radius:10px;padding:16px 20px;display:flex;align-items:flex-start;gap:16px;">',
    '<div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#A100FF,#5A1E96);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="ti ti-sparkles" style="color:#fff;font-size:18px;"></i></div>',
    '<div>',
    '<div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5A1E96;margin-bottom:4px;">Purple Plus transformation</div>',
    '<div style="font-size:13px;font-weight:600;color:#1A1A1A;margin-bottom:4px;">UC3 is one of three flagship use cases spanning build, run and govern</div>',
    '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;">',
    '<div style="font-size:12px;padding:6px 12px;border-radius:20px;background:#fff;border:1px solid #D8B4FE;color:#5A1E96;font-weight:600;">UC1 - Agentic SDLC (build) ~3,000 FTE</div>',
    '<div style="font-size:12px;padding:6px 12px;border-radius:20px;background:#fff;border:1px solid #D8B4FE;color:#5A1E96;font-weight:600;">UC2 - Agentic IT Operations (run) ~800 FTE</div>',
    '<div style="font-size:12px;padding:6px 12px;border-radius:20px;background:#A100FF;border:1px solid #A100FF;color:#fff;font-weight:700;">UC3 - Agentic Compliance (govern) ~2,864 FTE affected</div>',
    '</div>',
    '<div style="font-size:11px;color:#6B7280;margin-top:6px;">FTE figures represent affected workforce populations, not delivery team sizes. Source: StratC Purple Plus v0.99, September 2026. 2,864 FTE is a working assumption subject to GTRF validation.</div>',
    '</div>',
    '</div>'
  ].join('');
}

function renderThreeScaleDimensions() {
  var el = document.getElementById('three-scale-dimensions');
  if (!el) return;
  var dims = [
    {
      icon: 'ti-brain', color: '#7A3EB1', title: 'Capability maturity',
      levels: [
        { label: 'Stage 1: Automate', desc: 'Targeted automation and AI within individual compliance processes. Phase 1.' },
        { label: 'Stage 2: Orchestrate', desc: 'AI connects processes, systems and LoD through a shared data layer. Phase 2.' },
        { label: 'Stage 3: Transform', desc: 'Highly automated AI ecosystem. Humans retain oversight. Phase 3 and beyond.' }
      ]
    },
    {
      icon: 'ti-books', color: '#3456C5', title: 'Regulatory coverage',
      levels: [
        { label: 'Wave 1: DORA B&R', desc: 'DORA Backup and Restore as the reference scenario. Gate 1 proof of mechanism.' },
        { label: 'Wave 2+: Decision required', desc: 'Additional regulations selected at Gate 2. Count and scope: decision required.' },
        { label: 'North Star: 24 regulations', desc: 'Target portfolio. Committed Month 18 coverage: decision required at Gate 3.' }
      ]
    },
    {
      icon: 'ti-building', color: '#059669', title: 'Functional expansion',
      levels: [
        { label: 'IT Compliance (in scope)', desc: 'UC3 covers IT Compliance as the initial vertical. Proven through Backup and Restore.' },
        { label: 'Cross-IT risk functions', desc: 'Extend to related IT risk and control functions. Phase 3 and beyond.' },
        { label: 'Enterprise compliance', desc: 'North Star horizon: full enterprise coverage across all risk and compliance verticals.' }
      ]
    }
  ];
  var html = '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;">Three scale dimensions</div>';
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">';
  dims.forEach(function(d) {
    html += '<div style="border:1px solid ' + d.color + '44;border-radius:10px;padding:16px;background:#fff;">';
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">';
    html += '<div style="width:32px;height:32px;border-radius:8px;background:' + d.color + '18;display:flex;align-items:center;justify-content:center;flex-shrink:0;">';
    html += '<i class="ti ' + d.icon + '" style="color:' + d.color + ';font-size:16px;"></i></div>';
    html += '<div style="font-size:13px;font-weight:700;color:#1A1A1A;">' + d.title + '</div>';
    html += '</div>';
    d.levels.forEach(function(l, i) {
      html += '<div style="display:flex;gap:10px;margin-bottom:' + (i < d.levels.length - 1 ? '8' : '0') + 'px;">';
      html += '<div style="width:18px;height:18px;border-radius:50%;background:' + d.color + (i === 0 ? '' : (i === 1 ? '99' : '44')) + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;font-weight:700;color:#fff;margin-top:1px;">' + (i + 1) + '</div>';
      html += '<div><div style="font-size:12px;font-weight:600;color:#1A1A1A;">' + l.label + '</div>';
      html += '<div style="font-size:11px;color:var(--text-muted);line-height:1.4;">' + l.desc + '</div></div>';
      html += '</div>';
    });
    html += '</div>';
  });
  html += '</div>';
  el.innerHTML = html;
}

function renderKpiStrip() {
  var html = [
    '<div class="kpi-card"><div class="kpi-val">18</div><div class="kpi-label">Months<br>Oct 2026 - Mar 2028</div></div>',
    '<div class="kpi-card"><div class="kpi-val">3</div><div class="kpi-label">Delivery phases<br>6 months each</div></div>',
    '<div class="kpi-card"><div class="kpi-val">16</div><div class="kpi-label">Core deliverables<br>All with definitions of done</div></div>',
    '<div class="kpi-card"><div class="kpi-val">3</div><div class="kpi-label">Existing hubs<br>Foundation in place</div></div>',
    '<div class="kpi-card"><div class="kpi-val">1</div><div class="kpi-label">Compliance vertical<br>Backup and Restore first</div></div>',
    '<div class="kpi-card tooltip-rel"><div class="kpi-val" style="color:var(--blue-dark)">13.8%</div><div class="kpi-label">Directional effort reduction<br>affected scope</div><span class="kpi-badge">To validate</span><div class="tooltip-box">Directional working assumption specific to the affected Backup and Restore use-case scope. Subject to validation through real implementation data. Capacity released, not automatic headcount reduction.</div></div>'
  ].join('');
  document.getElementById('kpi-strip').innerHTML = html;
}

function renderExecPhaseSummary() {
  var phaseData = [
    {
      id: 'phase-1', label: 'Phase 1', sub: 'Integrate and Prove', color: '#3456C5',
      months: 'Oct 2026 - Mar 2027',
      outcome: 'Foundation established and mechanism proven through the Backup and Restore DORA reference segment',
      deliverables: ['D01', 'D02', 'D03', 'D04', 'D05', 'D06'], gate: 'Gate G2 - Mar 2027'
    },
    {
      id: 'phase-2', label: 'Phase 2', sub: 'Orchestrate and Build the Factory', color: '#5C4FC5',
      months: 'Apr 2027 - Sep 2027',
      outcome: 'Handovers, applicability, evidence and reporting connected through governed workflow; first regulation wave onboarded repeatably',
      deliverables: ['D07', 'D08', 'D09', 'D10', 'D13', 'D14'], gate: 'Gate G3 - Sep 2027'
    },
    {
      id: 'phase-3', label: 'Phase 3', sub: 'Scale and Operate', color: '#7A3EB1',
      months: 'Oct 2027 - Mar 2028',
      outcome: 'Agentic Compliance operates as a supported service with reusable assets, rollout waves and transparent path to 24 regulations',
      deliverables: ['D11', 'D12', 'D15', 'D16'], gate: 'Gate G4 - Mar 2028'
    }
  ];
  var html = '<h2 style="font-size:15px;font-weight:700;margin-bottom:12px">What each phase delivers</h2>';
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">';
  phaseData.forEach(function(ph) {
    html += '<div style="border:1px solid var(--line);border-top:4px solid ' + ph.color + ';border-radius:10px;padding:16px;background:var(--white)">';
    html += '<div style="font-size:11px;font-weight:700;color:' + ph.color + ';margin-bottom:4px">' + ph.label + ': ' + ph.sub + '</div>';
    html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">' + ph.months + '</div>';
    html += '<p style="font-size:13px;color:var(--ink);line-height:1.5;margin-bottom:12px">' + ph.outcome + '</p>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">';
    ph.deliverables.forEach(function(did) {
      html += '<span onclick="openDeliverableDrawer(\'' + did + '\')" style="cursor:pointer;font-size:10px;background:var(--panel);border:1px solid var(--line);padding:2px 7px;border-radius:8px;font-weight:600" title="Click to view DoD">' + did + '</span>';
    });
    html += '</div>';
    html += '<div style="font-size:11px;font-weight:700;color:var(--purple);background:var(--purple-pale);padding:4px 10px;border-radius:6px;display:inline-block">' + ph.gate + '</div>';
    html += '</div>';
  });
  html += '</div>';
  document.getElementById('exec-phase-summary').innerHTML = html;
}

function renderExecScenarioChips() {
  if (typeof SCENARIOS === 'undefined') return;
  var html = '<h2 style="font-size:15px;font-weight:700;margin-bottom:8px">Resource delivery scenarios</h2>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">Illustrative planning assumption, not a commercial estimate. Select the scenario that matches your appetite for speed and investment.</p>';
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">';
  SCENARIOS.forEach(function(s) {
    var isRec = s.id === 'recommended';
    html += '<div style="border:' + (isRec ? '2px solid var(--blue-dark)' : '1px solid var(--line)') + ';border-radius:10px;padding:16px;background:' + (isRec ? '#EAF3FA' : 'var(--white)') + ';position:relative">';
    if (isRec) html += '<div style="position:absolute;top:-10px;left:16px;font-size:10px;font-weight:700;background:var(--blue-dark);color:#fff;padding:2px 10px;border-radius:10px">Recommended</div>';
    html += '<div style="font-weight:700;font-size:14px;margin-bottom:4px">' + s.name + '</div>';
    html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">' + s.description + '</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;font-size:12px">';
    html += '<div><div style="font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em">Core FTE</div>' + s.persistentCoreFTE.min + ' - ' + s.persistentCoreFTE.max + '</div>';
    html += '<div><div style="font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em">Squads</div>' + s.onboardingSquads.min + ' - ' + s.onboardingSquads.max + '</div>';
    html += '</div>';
    html += '<div style="font-size:12px;color:var(--ink);margin-bottom:8px"><strong>Month 18 outcome:</strong> ' + s.month18Outcome + '</div>';
    html += '<button onclick="navigate(\'team\')" style="font-size:11px;background:none;border:1px solid var(--line);padding:4px 12px;border-radius:8px;cursor:pointer;color:var(--blue-dark);font-weight:600">View full scenario</button>';
    html += '</div>';
  });
  html += '</div>';
  document.getElementById('exec-scenario-chips').innerHTML = html;
}

function renderTransformStrip() {
  var stages = [
    { color: '#6B7280', name: 'Today', desc: 'Siloed agent support and manual handovers' },
    { color: 'var(--phase-1)', name: 'Phase 1 - Integrate', desc: 'Specialist AI support across the three hubs' },
    { color: 'var(--phase-2)', name: 'Phase 2 - Orchestrate', desc: 'Automated obligation-to-evidence flow' },
    { color: 'var(--phase-3)', name: 'Phase 3 - Industrialise', desc: 'Compliance-as-a-Service v1' },
    { color: 'var(--text-muted)', name: 'Beyond Month 18', desc: 'Enterprise-scale continuous compliance', dashed: true }
  ];
  var html = '';
  stages.forEach(function(s, i) {
    html += '<div class="transform-stage' + (s.dashed ? ' dashed' : '') + '">';
    html += '<div class="ts-phase-label" style="color:' + s.color + '">' + s.name + '</div>';
    html += '<div class="ts-desc">' + s.desc + '</div></div>';
    if (i < stages.length - 1) html += '<div class="transform-arrow" aria-hidden="true"><i class="ti ti-chevron-right"></i></div>';
  });
  document.getElementById('transform-strip').innerHTML = html;
}

function renderFoundation() {
  var hubs = [
    {
      color: '#3456C5', name: 'Compliance Hub / OMA', sub: 'Requirements Integration',
      desc: 'Translates regulatory obligations into structured requirements and control mappings. The entry point for new compliance obligations.',
      bullets: ['Regulatory framework management', 'Obligation and control mapping', 'Applicability rules engine', 'Scope and exception management'],
      agent: { name: 'MITRA', note: 'Provisionally assigned', phase: 'Phase 1' }
    },
    {
      color: '#7A3EB1', name: 'Product Hub', sub: 'Workflow and Evidencing',
      desc: 'Manages product documentation, Work Products and compliance workflow. MAYA provides bounded AI assistance.',
      bullets: ['Product documentation workflow', 'Work Product management', 'Assessor and reviewer journeys', 'MAYA AI assistance (bounded)'],
      agent: { name: 'MAYA', note: 'Provisionally assigned', phase: 'Phase 1+' }
    },
    {
      color: '#059669', name: 'Reporting Hub / DDCR', sub: 'Conformance and RACE Reporting',
      desc: 'Provides the final compliance and assurance view. DDCR is the verified compliance evidence, not merely reporting.',
      bullets: ['RACE assessment preparation', 'DDCR conformance reporting', 'Evidence assurance and lineage', 'Compliance status view'],
      agent: null
    }
  ];

  var hubCards = hubs.map(function(h) {
    var agentTag = h.agent
      ? '<div style="margin-top:10px;padding:6px 10px;border:1px dashed ' + h.color + ';border-radius:6px;background:' + h.color + '08">' +
        '<div style="font-size:10px;font-weight:700;color:' + h.color + ';text-transform:uppercase;letter-spacing:0.08em">' + h.agent.name + ' agent</div>' +
        '<div style="font-size:10px;color:var(--text-muted)">' + h.agent.note + ' - added ' + h.agent.phase + '</div>' +
        '</div>'
      : '';
    return '<div class="foundation-card">' +
      '<div class="foundation-accent" style="background:' + h.color + '"></div>' +
      '<div style="font-size:15px;font-weight:700;color:var(--ink);margin-bottom:3px">' + h.name + '</div>' +
      '<div style="font-size:11px;font-weight:600;color:' + h.color + ';text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">' + h.sub + '</div>' +
      '<p style="font-size:12px;color:var(--text-muted);margin-bottom:10px;line-height:1.5">' + h.desc + '</p>' +
      '<ul style="list-style:none;display:flex;flex-direction:column;gap:5px">' +
      h.bullets.map(function(b) {
        return '<li style="font-size:12px;color:var(--ink);display:flex;align-items:flex-start;gap:6px"><i class="ti ti-point-filled" style="font-size:10px;color:' + h.color + ';margin-top:3px;flex-shrink:0"></i>' + b + '</li>';
      }).join('') +
      '</ul>' + agentTag +
      '<div style="margin-top:10px;font-size:11px;color:var(--text-muted);font-style:italic">Existing capability - not greenfield</div>' +
      '</div>';
  });

  var newLayers = [
    { color: '#3456C5', icon: 'ti-git-merge', name: 'Orchestration Layer', phase: 'Phase 2', desc: 'Automates hub-to-hub handovers. Manages the compliance case state machine. Deterministic, not agentic.' },
    { color: '#5C4FC5', icon: 'ti-building-factory', name: 'Regulatory Onboarding Factory', phase: 'Phase 2', desc: 'Reusable process and tooling to onboard each new regulation without bespoke engineering work.' },
    { color: '#7A3EB1', icon: 'ti-database', name: 'Common Compliance Knowledge Model', phase: 'Phase 1', desc: 'Shared obligation, norm and control data model spanning all three hubs and agent interactions.' }
  ];

  var newLayerCards = newLayers.map(function(l) {
    return '<div style="flex:1;min-width:200px;border:1px dashed ' + l.color + ';border-radius:10px;padding:14px;background:' + l.color + '06">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">' +
      '<div style="width:28px;height:28px;border-radius:6px;background:' + l.color + '18;display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
      '<i class="ti ' + l.icon + '" style="color:' + l.color + ';font-size:14px"></i></div>' +
      '<div><div style="font-size:12px;font-weight:700;color:var(--ink)">' + l.name + '</div>' +
      '<div style="font-size:10px;color:' + l.color + ';font-weight:600">New in ' + l.phase + '</div>' +
      '</div></div>' +
      '<div style="font-size:11px;color:var(--text-muted);line-height:1.4">' + l.desc + '</div>' +
      '</div>';
  }).join('');

  document.getElementById('foundation-grid').innerHTML =
    hubCards.join('') +
    '<div style="grid-column:1/-1;margin-top:8px">' +
    '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:10px">Net-new capability layers (dashed = not yet built)</div>' +
    '<div style="display:flex;gap:12px;flex-wrap:wrap">' + newLayerCards + '</div>' +
    '</div>';
}

function renderActions() {
  var actions = [
    'Name sponsor, Product Owner and programme leadership',
    'Lock the Backup and Restore scope',
    'Select applications and Product Teams',
    'Confirm system access and evidence sources',
    'Establish baseline KPIs',
    'Mobilise the architecture and delivery squads'
  ];
  document.getElementById('action-list').innerHTML = actions.map(function(a, i) {
    return '<li class="action-item"><span class="action-num">' + (i + 1) + '</span>' + a + '</li>';
  }).join('');
}

function renderDecisions() {
  var decisions = [
    'Pilot scope confirmation',
    'Pilot population selection',
    'Accountable owners named',
    'Environments and system access',
    'Data and evidence availability confirmed',
    'Phase 1 funding approved',
    'Success measures agreed'
  ];
  document.getElementById('decision-chips').innerHTML = decisions.map(function(d) {
    return '<span class="decision-chip">' + d + '</span>';
  }).join('');
}
