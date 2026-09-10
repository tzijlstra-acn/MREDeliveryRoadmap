// ── Section 3b: Obligation Chain and Run View ──
function renderRuns() {
  var el = document.getElementById('runs-content');
  if (!el) return;

  var mechColors = {};
  EXECUTION_MECHANISMS.forEach(function(m){ mechColors[m.id] = m.color; });
  var mechLabels = {};
  EXECUTION_MECHANISMS.forEach(function(m){ mechLabels[m.id] = m.label; });

  var html = '';

  // Legend
  html += '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px;padding:16px;background:var(--panel);border-radius:10px;">';
  html += '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);width:100%;margin-bottom:6px;">Execution mechanism legend</div>';
  EXECUTION_MECHANISMS.forEach(function(m) {
    html += '<div style="display:flex;align-items:center;gap:6px;font-size:12px;">';
    html += '<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:' + m.color + ';flex-shrink:0;"></span>';
    html += '<span style="font-weight:600;color:#1A1A1A;">' + m.label + '</span>';
    html += '<span style="color:var(--text-muted)"> - ' + m.description + '</span>';
    html += '</div>';
  });
  html += '</div>';

  // Obligation chain backbone
  html += '<div style="margin-bottom:32px;">';
  html += '<div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;">Obligation chain backbone</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:0;align-items:center;padding:14px 16px;background:#F4EBFF;border:1px solid #D8B4FE;border-radius:10px;">';
  var chain = ['External Obligation','Internal Obligation','Capability','Norm','Control Activity','Work Product','Fulfilment Data','Assurance'];
  chain.forEach(function(node, i) {
    html += '<span style="font-size:12px;font-weight:600;color:#5A1E96;white-space:nowrap;">' + node + '</span>';
    if (i < chain.length - 1) {
      html += '<span style="margin:0 6px;color:#A100FF;font-weight:700;font-size:14px;">&#8594;</span>';
    }
  });
  html += '</div>';
  html += '<div style="font-size:11px;color:var(--text-muted);margin-top:6px;">Extended to: products, systems, risks, findings, actions, issues and fulfilment data. Source: UC3 Hypotheses Deepdive.</div>';
  html += '</div>';

  RUNS.forEach(function(run) {
    html += '<div class="run-flow" style="margin-bottom:36px;">';

    // Run header
    html += '<div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:16px;">';
    html += '<div>';
    html += '<div style="font-size:16px;font-weight:700;color:#1A1A1A;">' + run.label + '</div>';
    html += '<div style="font-size:13px;color:var(--text-muted);margin-top:3px;">' + run.description + '</div>';
    html += '<div style="display:flex;gap:16px;margin-top:8px;flex-wrap:wrap;">';
    html += '<span style="font-size:11px;color:var(--text-muted)"><strong>Trigger:</strong> ' + run.trigger + '</span>';
    html += '<span style="font-size:11px;color:var(--text-muted)"><strong>Output to:</strong> ' + run.outputSystem + '</span>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    // Steps - horizontal scrollable row
    html += '<div style="overflow-x:auto;padding-bottom:8px;">';
    html += '<div style="display:flex;gap:0;align-items:stretch;min-width:max-content;">';

    run.steps.forEach(function(step, idx) {
      var color = mechColors[step.executionMechanism] || '#6B7280';
      var isGate = step.isHumanGate;
      var borderStyle = isGate ? '3px solid ' + color : '1px solid ' + color + '44';
      var bg = isGate ? color + '12' : '#FAFAFA';

      html += '<div style="display:flex;align-items:center;">';

      html += '<div style="width:180px;flex-shrink:0;border:' + borderStyle + ';border-radius:8px;padding:12px;background:' + bg + ';position:relative;">';

      // Step number
      html += '<div style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:' + color + ';margin-bottom:4px;">Step ' + step.order + '</div>';

      // Label
      html += '<div style="font-size:12px;font-weight:600;color:#1A1A1A;line-height:1.3;margin-bottom:6px;">' + step.label + '</div>';

      // Mechanism badge
      html += '<div style="font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px;background:' + color + ';color:#fff;display:inline-block;margin-bottom:4px;">' + (mechLabels[step.executionMechanism] || step.executionMechanism) + '</div>';

      // Agent name
      if (step.agentName) {
        html += '<div style="font-size:10px;color:#5A1E96;font-weight:600;margin-top:3px;">' + step.agentName + ' <span style="font-weight:400;opacity:0.7;">(provisional)</span></div>';
      }

      // System
      html += '<div style="font-size:10px;color:var(--text-muted);margin-top:3px;">' + step.system + '</div>';

      // Model tier
      if (step.modelTier) {
        html += '<div style="font-size:10px;color:var(--text-muted);margin-top:2px;">Model: ' + step.modelTier + '</div>';
      }

      // Human gate flag
      if (isGate) {
        html += '<div style="font-size:10px;font-weight:700;color:' + color + ';margin-top:4px;border-top:1px solid ' + color + '44;padding-top:4px;">';
        html += '<i class="ti ti-user-check" style="margin-right:3px;"></i>Human gate';
        if (step.lod) html += ' - ' + step.lod;
        if (step.authorityRule) html += '<br><span style="font-weight:400;">' + step.authorityRule + '</span>';
        html += '</div>';
      }

      html += '</div>'; // step card

      // Arrow connector
      if (idx < run.steps.length - 1) {
        html += '<div style="width:24px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:18px;color:#9CA3AF;">&#8594;</div>';
      }

      html += '</div>'; // flex wrapper
    });

    html += '</div></div>'; // steps row + scroll wrapper

    // Output artifact
    html += '<div style="margin-top:10px;padding:10px 14px;background:var(--success-pale);border-left:3px solid var(--success);border-radius:0 6px 6px 0;font-size:12px;">';
    html += '<strong>Output:</strong> ' + run.outputArtifact;
    html += '</div>';

    html += '</div>'; // run-flow
  });

  // Footnote
  html += '<div style="font-size:11px;color:var(--text-muted);padding:12px;background:var(--panel);border-radius:8px;margin-top:8px;">';
  html += 'MITRA and MAYA are provisionally assigned agent names per programme terminology. Run B is based on the authoritative demo flow in ProReinsuranceAIWorkflow/lib/experience/automate.ts. Human gate authority rules (AM-003, AM-007, AM-008, AM-010) are non-negotiable and cannot be bypassed by AI execution.';
  html += '</div>';

  el.innerHTML = html;
}

