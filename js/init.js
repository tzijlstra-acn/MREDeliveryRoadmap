// Initialise on page load
var _VALID_SECTIONS = ['executive','roadmap','architecture','runs','portfolio','capabilities','team','scale','control'];

renderExecutive();

// Navigate to hash section if present, else default to executive
(function() {
  var hash = location.hash.replace('#', '');
  if (hash && _VALID_SECTIONS.indexOf(hash) !== -1 && hash !== 'executive') {
    navigate(hash);
  } else {
    renderCapabilities();
  }
}());
