// ── State ──
var activeSection = 'executive';
var activePhaseFilter = 'all';
var roadmapView = 'full';
var activeRaidFilter = 'all';
var activeDelTab = 'workstreams';

// ── Navigation ──
function navigate(sectionId) {
  document.querySelectorAll('.nav-item').forEach(function(el) {
    el.classList.toggle('active', el.dataset.section === sectionId);
    el.setAttribute('aria-current', el.dataset.section === sectionId ? 'page' : 'false');
  });
  document.querySelectorAll('.section').forEach(function(el) {
    el.classList.toggle('active', el.id === sectionId);
  });
  activeSection = sectionId;
  closeSidebar();
  window.scrollTo(0, 0);

  if (sectionId === 'roadmap') renderRoadmap();
  if (sectionId === 'architecture' && !document.querySelector('#arch-layers .arch-layer')) renderArchitecture();
  if (sectionId === 'runs' && !document.querySelector('#runs-content .run-flow')) renderRuns();
  if (sectionId === 'portfolio') renderPortfolio();
  if (sectionId === 'capabilities' && !document.querySelector('#ws-accordion .ws-card')) renderCapabilities();
  if (sectionId === 'team' && !document.querySelector('#pod-grid .pod-card')) renderTeam();
  if (sectionId === 'control' && !document.querySelector('#gate-cards .gate-card')) renderControl();
  if (sectionId === 'scale' && !document.querySelector('#addon-grid-rec .addon-card')) renderScale();
}

function toggleSidebar() {
  var sb = document.getElementById('sidebar');
  var btn = document.getElementById('hamburger');
  var open = sb.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('hamburger').setAttribute('aria-expanded','false');
}

