var KPIS = [
  {
    id: 'kpi-group-1', group: 'Efficiency', icon: 'ti-clock',
    kpis: [
      {
        id: 'K01', name: 'End-to-End Cycle Time',
        measure: 'Days from obligation receipt to DDCR-reported compliance status',
        baseline: 'Baseline pending', target: 'To confirm at Gate 1', unit: 'days',
        note: 'Working assumption: measurable reduction expected through orchestration'
      },
      {
        id: 'K02', name: 'Manual Effort per Case',
        measure: 'FTE hours of human effort per Backup and Restore compliance case',
        baseline: 'Baseline pending', target: 'Directional: 13.8% reduction (to validate)', unit: 'hours',
        note: 'Directional value, specific to affected use-case scope, subject to validation through operational data'
      },
      {
        id: 'K03', name: 'Handover Events per Case',
        measure: 'Number of manual system-to-system handovers per compliance case',
        baseline: 'Baseline pending', target: 'Measurement active in Phase 2', unit: 'count'
      }
    ]
  },
  {
    id: 'kpi-group-2', group: 'Speed', icon: 'ti-bolt',
    kpis: [
      {
        id: 'K04', name: 'Evidence Collection Lead Time',
        measure: 'Time from evidence request to verified evidence receipt',
        baseline: 'Baseline pending', target: 'Actual pending (Phase 2)', unit: 'days'
      },
      {
        id: 'K05', name: 'Assessment Throughput',
        measure: 'Cases assessed per month across the Backup and Restore scope',
        baseline: 'Baseline pending', target: 'Actual pending (Phase 2)', unit: 'cases/month'
      },
      {
        id: 'K06', name: 'Compliance Lag',
        measure: 'Days between obligation approval and confirmed product implementation',
        baseline: 'Baseline pending', target: 'Target to approve', unit: 'days'
      }
    ]
  },
  {
    id: 'kpi-group-3', group: 'Quality', icon: 'ti-medal',
    kpis: [
      {
        id: 'K07', name: 'Evidence Completeness Rate',
        measure: 'Percentage of cases with complete, verified evidence at first submission',
        baseline: 'Baseline pending', target: 'Target to approve', unit: '%'
      },
      {
        id: 'K08', name: 'Rework Rate',
        measure: 'Percentage of cases requiring rework after initial assessment',
        baseline: 'Baseline pending', target: 'Target to approve', unit: '%'
      },
      {
        id: 'K09', name: 'Exception Volume',
        measure: 'Number of cases requiring human exception handling per month',
        baseline: 'Baseline pending', target: 'Target to approve', unit: 'count/month'
      }
    ]
  },
  {
    id: 'kpi-group-4', group: 'Control and Trust', icon: 'ti-shield-check',
    kpis: [
      {
        id: 'K10', name: 'Audit Trail Completeness',
        measure: 'Percentage of cases with complete, traceable audit records',
        baseline: 'Baseline pending', target: '100%', unit: '%'
      },
      {
        id: 'K11', name: 'Human Approval Rate',
        measure: 'Percentage of cases where human approval is required and captured',
        baseline: 'Not applicable pre-programme', target: '100% where applicable', unit: '%'
      },
      {
        id: 'K12', name: 'Model Evaluation Pass Rate',
        measure: 'Percentage of agent outputs meeting the agreed evaluation criteria',
        baseline: 'Not applicable pre-programme', target: 'To confirm at Gate 1', unit: '%'
      }
    ]
  },
  {
    id: 'kpi-group-5', group: 'Adoption and Scale', icon: 'ti-users',
    kpis: [
      {
        id: 'K13', name: 'Pilot User Adoption',
        measure: 'Percentage of trained pilot users actively using the system',
        baseline: 'Not applicable pre-programme', target: 'Target to approve', unit: '%'
      },
      {
        id: 'K14', name: 'Applications Onboarded',
        measure: 'Number of applications with connected evidence sources',
        baseline: '0', target: 'Phase 1: pilot selection; Phase 3: to confirm', unit: 'count'
      },
      {
        id: 'K15', name: 'Service Cost per Case',
        measure: 'Operational cost per compliance case processed through the service',
        baseline: 'Baseline pending', target: 'Scale economics to agree in Phase 3', unit: 'per case'
      }
    ]
  }
];

// ES module export for Vite/React
export { KPIS };
