// ECharts shared configuration and helpers
var UC3_CHART_THEME = {
  color: ['#3456C5','#A100FF','#7A3EB1','#5C4FC5','#059669','#D97706','#DC2626','#6B7280'],
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, Arial, sans-serif', color: '#1A1A1A' },
  legend: { textStyle: { fontFamily: 'Inter, Arial, sans-serif', fontSize: 12 } },
  tooltip: { textStyle: { fontFamily: 'Inter, Arial, sans-serif', fontSize: 12 } }
};

function uc3Chart(containerId, option) {
  var el = document.getElementById(containerId);
  if (!el || typeof echarts === 'undefined') return null;
  var chart = echarts.init(el, null, { renderer: 'svg' });
  chart.setOption(Object.assign({ animation: false }, UC3_CHART_THEME, option));
  window.addEventListener('resize', function() { chart.resize(); });
  return chart;
}

function uc3ChartDestroy(containerId) {
  var el = document.getElementById(containerId);
  if (!el || typeof echarts === 'undefined') return;
  var existing = echarts.getInstanceByDom(el);
  if (existing) existing.dispose();
}
