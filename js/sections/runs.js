// ── Section 3b: Obligation Chain and Run View ──

var activeRunId = 'run-a';

// Execution mechanism shape definitions
var MECH_SHAPES = {
  'human':                  { shape: 'rect',    label: 'Human',           abbr: 'H',    color: '#3456C5' },
  'deterministic-automation':{ shape: 'square',  label: 'Deterministic',   abbr: 'AUTO', color: '#059669' },
  'generative-ai':          { shape: 'circle',   label: 'Generative AI',   abbr: 'AI',   color: '#7A3EB1' },
  'agentic-execution':      { shape: 'hex',      label: 'Agentic',         abbr: 'AGT',  color: '#A100FF' },
  'human-gate':             { shape: 'diamond',  label: 'Human gate',      abbr: 'GATE', color: '#B97912' }
};

function _mechIcon(mechId, size) {
  size = size || 28;
  var m = MECH_SHAPES[mechId] || { shape: 'square', color: '#6B7280', abbr: '?' };
  var half = size / 2;
  var style = 'width:' + size + 'px;height:' + size + 'px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;font-size:' + Math.round(size * 0.3) + 'px;font-weight:700;color:#fff;';
  if (m.shape === 'circle')  style += 'border-radius:50%;background:' + m.color + ';';
  else if (m.shape === 'diamond') style += 'background:transparent;position:relative;';
  else if (m.shape === 'hex') {
    var pts = '50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%';
    style += 'clip-path:polygon(' + pts + ');background:' + m.color + ';';
  } else style += 'border-radius:3px;background:' + m.color + ';';

  if (m.shape === 'diamond') {
    return '<div style="' + style + '">' +
      '<div style="width:' + (size - 6) + 'px;height:' + (size - 6) + 'px;background:' + m.color + ';transform:rotate(45deg);display:flex;align-items:center;justify-content:center;">' +
      '<span style="transform:rotate(-45deg);font-size:' + Math.round(size * 0.28) + 'px;font-weight:700;color:#fff">' + m.abbr + '</span>' +
      '</div></div>';
  }
  return '<div style="' + style + '">' + m.abbr + '</div>';
}

function selectRun(runId) {
  activeRunId = runId;
  document.querySelectorAll('[data-run-btn]').forEach(function(b) {
    b.classList.toggle('active', b.dataset.runBtn === runId);
  });
  _renderRunDetail();
}

function renderRuns() {
  var el = document.getElementById('runs-content');
  if (!el) return;

  var html = '';

  // ── Obligation chain backbone ──
  html += '<div style="margin-bottom:24px;padding:14px 16px;background:#F4EBFF;border:1px solid #D8B4FE;border-radius:10px">';
  html += '<div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5A1E96;margin-bottom:8px">Obligation chain backbone</div>';
  html += '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:0">';
  var chain = ['External Obligation', 'Internal Obligation', 'Capability', 'Norm', 'Control Activity', 'Work Product', 'Fulfilment Data', 'Assurance'];
  chain.forEach(function(node, i) {
    html += '<span style="font-size:12px;font-weight:600;color:#5A1E96;white-space:nowrap">' + node + '</span>';
    if (i < chain.length - 1) html += '<span style="margin:0 6px;color:#A100FF;font-size:14px;font-weight:700">&#8594;</span>';
  });
  html += '</div>';
  html += '<div style="font-size:10px;color:var(--text-muted);margin-top:6px">Extended to: products, systems, risks, findings, actions, issues and fulfilment data. Source: UC3 Hypotheses Deepdive.</div>';
  html += '</div>';

  // ── Execution mechanism legend ──
  html += '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px;padding:14px 16px;background:var(--panel);border-radius:10px">';
  html += '<div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);width:100%;margin-bottom:4px">Execution mechanism legend</div>';
  Object.keys(MECH_SHAPES).forEach(function(mechId) {
    var m = MECH_SHAPES[mechId];
    html += '<div style="display:flex;align-items:center;gap:8px;font-size:12px">';
    html += _mechIcon(mechId, 22);
    html += '<span style="font-weight:600;color:var(--ink)">' + m.label + '</span>';
    html += '</div>';
  });
  html += '</div>';

  // ── Run selector ──
  html += '<div style="display:flex;gap:8px;margin-bottom:20px" role="tablist">';
  RUNS.forEach(function(run) {
    var isActive = run.id === activeRunId;
    html += '<button data-run-btn="' + run.id + '" onclick="selectRun(\'' + run.id + '\')" role="tab" aria-selected="' + isActive + '" ';
    html += 'style="padding:8px 16px;border-radius:20px;border:1.5px solid ' + (isActive ? 'var(--blue-dark)' : 'var(--line)') + ';';
    html += 'background:' + (isActive ? 'var(--blue-dark)' : 'var(--white)') + ';color:' + (isActive ? '#fff' : 'var(--ink)') + ';';
    html += 'font-size:12px;font-weight:600;cursor:pointer">' + run.label.split(':')[0] + '</button>';
  });
  html += '</div>';

  // ── Run detail container ──
  html += '<div id="run-detail-panel"></div>';

  el.innerHTML = html;
  _renderRunDetail();
}

function _renderRunDetail() {
  var panel = document.getElementById('run-detail-panel');
  if (!panel) return;

  var run = RUNS.find(function(r) { return r.id === activeRunId; });
  if (!run) return;

  var mechColors = {};
  if (typeof EXECUTION_MECHANISMS !== 'undefined') {
    EXECUTION_MECHANISMS.forEach(function(m) { mechColors[m.id] = m.color; });
  }

  var html = '';

  // Run header
  html += '<div style="margin-bottom:16px">';
  html += '<div style="font-size:16px;font-weight:700;color:var(--ink);margin-bottom:4px">' + run.label + '</div>';
  html += '<div style="font-size:13px;color:var(--text-muted);line-height:1.5;margin-bottom:8px">' + run.description + '</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:16px">';
  html += '<span style="font-size:12px;color:var(--text-muted)"><strong>Trigger:</strong> ' + run.trigger + '</span>';
  html += '<span style="font-size:12px;color:var(--text-muted)"><strong>Output to:</strong> ' + run.outputSystem + '</span>';
  html += '</div></div>';

  // Step cards (horizontal scroll)
  html += '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:8px;margin-bottom:24px">';
  html += '<div style="display:flex;gap:0;align-items:stretch;min-width:max-content">';

  run.steps.forEach(function(step, idx) {
    var m = MECH_SHAPES[step.executionMechanism] || MECH_SHAPES['human'];
    var isGate = step.isHumanGate;
    var border = isGate ? '2px solid ' + m.color : '1px solid ' + m.color + '55';
    var bg = isGate ? m.color + '10' : 'var(--white)';

    html += '<div style="display:flex;align-items:center">';
    html += '<div style="width:172px;flex-shrink:0;border:' + border + ';border-radius:8px;padding:12px;background:' + bg + '">';
    html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">';
    html += _mechIcon(step.executionMechanism, 26);
    html += '<div><div style="font-size:9px;font-weight:700;color:' + m.color + ';text-transform:uppercase;letter-spacing:0.08em">Step ' + step.order + '</div>';
    html += '<div style="font-size:10px;font-weight:600;color:' + m.color + '">' + m.label + '</div></div>';
    html += '</div>';
    html += '<div style="font-size:12px;font-weight:600;color:var(--ink);line-height:1.3;margin-bottom:6px">' + step.label + '</div>';
    if (step.agentName) {
      html += '<div style="font-size:10px;color:#5A1E96;font-weight:600">' + step.agentName + ' <span style="font-weight:400;opacity:0.7">(provisional)</span></div>';
    }
    if (step.lod) {
      html += '<div style="font-size:10px;background:var(--warning-pale);color:var(--warning);padding:1px 6px;border-radius:4px;display:inline-block;margin-top:4px">' + step.lod + '</div>';
    }
    if (step.system) {
      html += '<div style="font-size:10px;color:var(--text-muted);margin-top:4px">' + step.system + '</div>';
    }
    html += '</div>';

    if (idx < run.steps.length - 1) {
      html += '<div style="padding:0 5px;color:var(--text-muted);font-size:18px;flex-shrink:0">&#8594;</div>';
    }
    html += '</div>';
  });

  html += '</div></div>';

  // Run trace table
  html += '<div style="margin-bottom:8px">';
  html += '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:10px">Run trace</div>';
  html += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:11px;min-width:700px">';
  html += '<thead><tr style="background:var(--panel)">';
  ['Step', 'Label', 'Mechanism', 'System', 'Output', 'Model tier', 'Human gate', 'Elapsed'].forEach(function(h) {
    html += '<th style="padding:7px 10px;border:1px solid var(--line);text-align:left;font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em">' + h + '</th>';
  });
  html += '</tr></thead><tbody>';

  run.steps.forEach(function(step) {
    var m = MECH_SHAPES[step.executionMechanism] || MECH_SHAPES['human'];
    html += '<tr>';
    html += '<td style="padding:7px 10px;border:1px solid var(--line);font-weight:600;color:var(--text-muted)">' + step.order + '</td>';
    html += '<td style="padding:7px 10px;border:1px solid var(--line);font-weight:600;color:var(--ink)">' + step.label + '</td>';
    html += '<td style="padding:7px 10px;border:1px solid var(--line)">' +
      '<div style="display:flex;align-items:center;gap:6px">' + _mechIcon(step.executionMechanism, 18) +
      '<span style="font-size:10px;font-weight:600;color:' + m.color + '">' + m.label + '</span></div></td>';
    html += '<td style="padding:7px 10px;border:1px solid var(--line);color:var(--text-muted)">' + (step.system || '') + '</td>';
    var output = step.agentName ? (step.agentName + ' (provisional) output' ) : (step.isHumanGate ? 'Human decision' : 'Automated result');
    html += '<td style="padding:7px 10px;border:1px solid var(--line);color:var(--text-muted)">' + output + '</td>';
    html += '<td style="padding:7px 10px;border:1px solid var(--line);color:var(--text-muted)">' + (step.modelTier || 'None') + '</td>';
    html += '<td style="padding:7px 10px;border:1px solid var(--line);text-align:center">' + (step.isHumanGate ? '<span style="background:var(--warning-pale);color:var(--warning);padding:1px 6px;border-radius:4px;font-size:10px;font-weight:600">Yes</span>' : '') + '</td>';
    html += '<td style="padding:7px 10px;border:1px solid var(--line);color:var(--text-muted)">' + (step.elapsedTime || '') + '</td>';
    html += '</tr>';
  });

  html += '</tbody></table></div>';
  html += '<div style="margin-top:6px;font-size:11px;color:var(--text-muted);font-style:italic">All human gate steps are mandatory and non-negotiable. MITRA and MAYA are provisionally assigned agent names subject to confirmation.</div>';
  html += '</div>';

  panel.innerHTML = html;
}
