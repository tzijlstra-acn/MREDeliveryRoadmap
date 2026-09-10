// ── Section 1: Executive Overview ──
function renderExecutive() {
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
      icon: 'ti-brain',
      color: '#7A3EB1',
      title: 'Capability maturity',
      levels: [
        { label: 'Stage 1: Automate', desc: 'Targeted automation and AI within individual compliance processes. Phase 1.' },
        { label: 'Stage 2: Orchestrate', desc: 'AI connects processes, systems and LoD through a shared data layer. Phase 2.' },
        { label: 'Stage 3: Transform', desc: 'Highly automated AI ecosystem. Humans retain oversight. Phase 3 and beyond.' }
      ]
    },
    {
      icon: 'ti-books',
      color: '#3456C5',
      title: 'Regulatory coverage',
      levels: [
        { label: 'Wave 1: DORA B&R', desc: 'DORA Backup and Restore as the reference scenario. Gate 1 proof of mechanism.' },
        { label: 'Wave 2+: Decision required', desc: 'Additional regulations selected at Gate 2. Count and scope: decision required.' },
        { label: 'North Star: 24 regulations', desc: 'Target portfolio. Committed Month 18 coverage: decision required at Gate 3.' }
      ]
    },
    {
      icon: 'ti-building',
      color: '#059669',
      title: 'Functional expansion',
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
      html += '<div style="width:18px;height:18px;border-radius:50%;background:' + d.color + (i === 0 ? '' : (i === 1 ? '99' : '44')) + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;font-weight:700;color:#fff;margin-top:1px;">' + (i+1) + '</div>';
      html += '<div><div style="font-size:12px;font-weight:600;color:#1A1A1A;">' + l.label + '</div>';
      html += '<div style="font-size:11px;color:var(--text-muted);line-height:1.4;">' + l.desc + '</div></div>';
      html += '</div>';
    });
    html += '</div>';
  });
  html += '</div>';
  el.innerHTML = html;
}

function renderExecPhaseSummary() {
  var phaseData = [
    { id: 'phase-1', label: 'Phase 1', sub: 'Integrate and Prove', color: '#3456C5', months: 'Oct 2026 - Mar 2027',
      outcome: 'Foundation established and mechanism proven through the Backup and Restore DORA reference segment',
      deliverables: ['D01','D02','D03','D04','D05','D06'], gate: 'Gate 1 - Mar 2027' },
    { id: 'phase-2', label: 'Phase 2', sub: 'Orchestrate and Build the Factory', color: '#5C4FC5', months: 'Apr 2027 - Sep 2027',
      outcome: 'Handovers, applicability, evidence and reporting connected through governed workflow; first regulation wave onboarded repeatably',
      deliverables: ['D07','D08','D09','D10','D13','D14'], gate: 'Gate 2 - Sep 2027' },
    { id: 'phase-3', label: 'Phase 3', sub: 'Scale and Operate', color: '#7A3EB1', months: 'Oct 2027 - Mar 2028',
      outcome: 'Agentic Compliance operates as a supported service with reusable assets, rollout waves and transparent path to 24 regulations',
      deliverables: ['D11','D12','D15','D16'], gate: 'Gate 4 - Mar 2028' }
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

function renderKpiStrip() {
  var html = [
    '<div class="kpi-card"><div class="kpi-val">18</div><div class="kpi-label">Months<br>Oct 2026 - Mar 2028</div></div>',
    '<div class="kpi-card"><div class="kpi-val">3</div><div class="kpi-label">Delivery phases<br>6 months each</div></div>',
    '<div class="kpi-card"><div class="kpi-val">12</div><div class="kpi-label">Core deliverables<br>All with definitions of done</div></div>',
    '<div class="kpi-card"><div class="kpi-val">3</div><div class="kpi-label">Existing hubs<br>Foundation in place</div></div>',
    '<div class="kpi-card"><div class="kpi-val">1</div><div class="kpi-label">Compliance vertical<br>Backup and Restore first</div></div>',
    '<div class="kpi-card tooltip-rel"><div class="kpi-val" style="color:var(--blue-dark)">13.8%</div><div class="kpi-label">Directional effort reduction<br>affected scope</div><span class="kpi-badge">To validate</span><div class="tooltip-box">Directional working assumption specific to the affected Backup and Restore use-case scope. Subject to validation through real implementation data. Capacity released, not automatic headcount reduction.</div></div>'
  ].join('');
  document.getElementById('kpi-strip').innerHTML = html;
}

function renderTransformStrip() {
  var stages = [
    {color:'#6B7280',name:'Today',desc:'Siloed agent support and manual handovers'},
    {color:'var(--phase-1)',name:'Phase 1 - Integrate',desc:'Specialist AI support across the three hubs'},
    {color:'var(--phase-2)',name:'Phase 2 - Orchestrate',desc:'Automated obligation-to-evidence flow'},
    {color:'var(--phase-3)',name:'Phase 3 - Industrialise',desc:'Compliance-as-a-Service v1'},
    {color:'var(--text-muted)',name:'Beyond Month 18',desc:'Enterprise-scale continuous compliance',dashed:true}
  ];
  var html = '';
  stages.forEach(function(s,i) {
    html += '<div class="transform-stage' + (s.dashed?' dashed':'') + '">';
    html += '<div class="ts-phase-label" style="color:' + s.color + '">' + s.name + '</div>';
    html += '<div class="ts-desc">' + s.desc + '</div></div>';
    if (i < stages.length-1) html += '<div class="transform-arrow" aria-hidden="true"><i class="ti ti-chevron-right"></i></div>';
  });
  document.getElementById('transform-strip').innerHTML = html;
}

function renderFoundation() {
  var hubs = [
    {color:'#3456C5',name:'Compliance Hub / OMA',sub:'Requirements Integration',desc:'Translates regulatory obligations into structured requirements and control mappings. The entry point for new compliance obligations.',bullets:['Regulatory framework management','Obligation and control mapping','Applicability rules engine','Scope and exception management']},
    {color:'#7A3EB1',name:'Product Hub',sub:'Workflow and Evidencing',desc:'Manages product documentation, Work Products and compliance workflow. Maya currently provides bounded AI assistance here.',bullets:['Product documentation workflow','Work Product management','Assessor and reviewer journeys','Maya AI assistance (bounded)']},
    {color:'#059669',name:'Reporting Hub / DDCR',sub:'Conformance and RACE Reporting',desc:'Provides the final compliance and assurance view. DDCR is positioned as verified compliance evidence, not merely reporting.',bullets:['RACE assessment preparation','DDCR conformance reporting','Evidence assurance and lineage','Compliance status view']}
  ];
  var html = hubs.map(function(h) {
    return '<div class="foundation-card">' +
      '<div class="foundation-accent" style="background:' + h.color + '"></div>' +
      '<div style="font-size:15px;font-weight:700;color:var(--ink);margin-bottom:3px">' + h.name + '</div>' +
      '<div style="font-size:11px;font-weight:600;color:' + h.color + ';text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">' + h.sub + '</div>' +
      '<p style="font-size:12px;color:var(--text-muted);margin-bottom:10px;line-height:1.5">' + h.desc + '</p>' +
      '<ul style="list-style:none;display:flex;flex-direction:column;gap:5px">' +
      h.bullets.map(function(b){ return '<li style="font-size:12px;color:var(--ink);display:flex;align-items:flex-start;gap:6px"><i class="ti ti-point-filled" style="font-size:10px;color:' + h.color + ';margin-top:3px;flex-shrink:0"></i>' + b + '</li>'; }).join('') +
      '</ul>' +
      '<div style="margin-top:12px;font-size:11px;color:var(--text-muted);font-style:italic">Existing capability - not greenfield</div>' +
      '</div>';
  }).join('');
  document.getElementById('foundation-grid').innerHTML = html;
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
  document.getElementById('action-list').innerHTML = actions.map(function(a,i) {
    return '<li class="action-item"><span class="action-num">' + (i+1) + '</span>' + a + '</li>';
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

