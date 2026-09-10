// ── Chip builder ──
function chip(text, cls) {
  return '<span class="chip chip-' + cls + '">' + text + '</span>';
}
function phaseChip(phaseId) {
  var p = PHASES.find(function(x){return x.id===phaseId;});
  if (!p) return '';
  var cls = phaseId === 'phase-1' ? 'phase-1' : phaseId === 'phase-2' ? 'phase-2' : 'phase-3';
  return '<span class="chip chip-' + cls + '">' + p.name + ' - ' + p.label + '</span>';
}
function statusChip(status) {
  var labels = {
    'proposed':'Proposed','mobilising':'Mobilising','in-progress':'In progress',
    'at-risk':'At risk','decision-required':'Decision required','complete':'Complete'
  };
  return chip(labels[status] || status, status);
}
function confidenceChip(conf) {
  var labels = {'validated':'Validated','working-assumption':'Working assumption','to-confirm':'To confirm'};
  return chip(labels[conf] || conf, conf);
}

