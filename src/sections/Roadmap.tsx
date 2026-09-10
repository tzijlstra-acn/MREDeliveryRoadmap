import { useState } from 'react'
import { ROADMAP_CONTENT } from '../../data/roadmap-content.js'
import { MILESTONES } from '../../data/milestones.js'
import { useStore } from '../store/index'

type ViewMode = '18m' | '6m'

const LABEL_COL_W = 180

const LANES = [
  { key: 'regulatoryPortfolio', label: 'Regulatory Portfolio and Interpretation', color: '#3456C5' },
  { key: 'complianceContent', label: 'Controls, Norms and Work Products', color: '#5C4FC5' },
  { key: 'userWorkflow', label: 'Product and Application Workflow', color: '#7B4AC5' },
  { key: 'platformIntegration', label: 'Platform, Data and Orchestration', color: '#9A3EB1' },
  { key: 'evidenceReporting', label: 'Evidence, Reporting and Assurance', color: '#C53A7B' },
]

const GOV_LANE = (ROADMAP_CONTENT as any[]).map((m) => ({
  action: m.clientDecision ?? 'Delivery governance and programme operations',
  output: m.coreOutput as string,
  pod: 'Programme Leadership',
}))

const PHASE_BG: Record<string, string> = {
  'phase-1': '#EEF1FB',
  'phase-2': '#EEEBf8',
  'phase-3': '#F3EEF8',
}

const PHASE_COLORS: Record<string, string> = {
  'phase-1': '#3456C5',
  'phase-2': '#5C4FC5',
  'phase-3': '#7A3EB1',
}

function MilestoneDrawerContent({ ms }: { ms: any }) {
  const phase = ms.phase as string
  const deliverableList = (ms.deliverableIds as string[]).join(', ')
  return (
    <div className="rdm-drawer-body">
      <div className="rdm-drawer-meta">
        <span className="chip" style={{ background: PHASE_COLORS[phase] + '22', color: PHASE_COLORS[phase] }}>
          {phase.replace('-', ' ').replace('phase', 'Phase')}
        </span>
        <span className="chip">{ms.date}</span>
        <span className={`chip chip-${ms.status}`}>{ms.status}</span>
      </div>
      <p className="rdm-drawer-desc">{ms.description}</p>
      {ms.type === 'gate' && (
        <div className="rdm-drawer-gate-note">
          Stage gate -- formal approval required before the next phase can begin.
        </div>
      )}
      {deliverableList && (
        <div className="rdm-drawer-field">
          <span className="rdm-drawer-field-label">Deliverables</span>
          <span>{deliverableList}</span>
        </div>
      )}
    </div>
  )
}

export default function Roadmap() {
  const [viewMode, setViewMode] = useState<ViewMode>('18m')
  const openDrawer = useStore((s) => s.openDrawer)

  const months = viewMode === '6m'
    ? (ROADMAP_CONTENT as any[]).slice(0, 6)
    : (ROADMAP_CONTENT as any[])

  const totalCols = months.length

  const visibleMilestones = (MILESTONES as any[]).filter((ms) =>
    viewMode === '6m' ? ms.monthIdx <= 6 : true
  )

  function handleMilestone(ms: any) {
    openDrawer(ms.label, <MilestoneDrawerContent ms={ms} />)
  }

  // governance spine bands
  const spineBands = viewMode === '18m'
    ? [
        { label: 'Phase 1 - Integrate', colStart: 2, colEnd: 8, color: '#3456C5' },
        { label: 'Phase 2 - Orchestrate', colStart: 8, colEnd: 14, color: '#5C4FC5' },
        { label: 'Phase 3 - Industrialise', colStart: 14, colEnd: 20, color: '#7A3EB1' },
      ]
    : [
        { label: 'Phase 1 - Integrate (Oct 2026 - Mar 2027)', colStart: 2, colEnd: 8, color: '#3456C5' },
      ]

  const gridCols = `${LABEL_COL_W}px repeat(${totalCols}, minmax(80px, 1fr))`

  return (
    <section className="section active" id="roadmap">
      <div className="section-header">
        <div className="section-label">Delivery Roadmap</div>
        <h1 className="section-title">What happens when, and what is delivered?</h1>
        <p className="section-tagline">
          18-month indicative delivery programme from October 2026 to March 2028.
          Six delivery lanes, governance spine, milestone rail and dependency rail.
          All timings subject to Gate approvals.
        </p>
      </div>

      <div className="rdm-controls">
        <div className="tab-group">
          <button
            className={`tab-btn${viewMode === '18m' ? ' active' : ''}`}
            onClick={() => setViewMode('18m')}
          >
            18-Month Overview
          </button>
          <button
            className={`tab-btn${viewMode === '6m' ? ' active' : ''}`}
            onClick={() => setViewMode('6m')}
          >
            Phase 1 Detail (6M)
          </button>
        </div>
      </div>

      <div className="rdm-outer">
        <div className="rdm-grid" style={{ gridTemplateColumns: gridCols }}>

          {/* ---- Governance spine ---- */}
          <div className="rdm-spine-label">Governance Spine</div>
          {spineBands.map((band) => (
            <div
              key={band.label}
              className="rdm-phase-band"
              style={{
                gridColumn: `${band.colStart} / ${band.colEnd}`,
                background: band.color,
              }}
            >
              {band.label}
            </div>
          ))}

          {/* ---- Month headers ---- */}
          <div className="rdm-col-hdr-spacer" />
          {months.map((m: any) => (
            <div key={m.month} className="rdm-month-hdr">
              {m.monthLabel}
            </div>
          ))}

          {/* ---- Delivery lanes ---- */}
          {LANES.map((lane) => (
            <div key={lane.key} style={{ display: 'contents' }}>
              <div
                className="rdm-lane-label"
                style={{ borderLeftColor: lane.color }}
              >
                {lane.label}
              </div>
              {months.map((m: any) => {
                const cell = (m as any)[lane.key]
                if (!cell) return <div key={m.month} className="rdm-cell" style={{ background: PHASE_BG[m.phase] }} />
                return (
                  <div
                    key={m.month}
                    className="rdm-cell"
                    style={{ background: PHASE_BG[m.phase] }}
                  >
                    <div className="rdm-cell-action">{cell.action}</div>
                    <div className="rdm-cell-output">{cell.output}</div>
                    <span
                      className="rdm-cell-pod"
                      style={{ background: lane.color + '22', color: lane.color }}
                    >
                      {cell.pod}
                    </span>
                  </div>
                )
              })}
            </div>
          ))}

          {/* ---- Governance, Adoption and Value lane ---- */}
          <div className="rdm-lane-label" style={{ borderLeftColor: '#E24B5A' }}>
            Governance, Adoption and Value
          </div>
          {months.map((m: any, i: number) => {
            const cell = GOV_LANE[i + (viewMode === '6m' ? 0 : 0)]
            return (
              <div
                key={m.month + '-gov'}
                className="rdm-cell rdm-cell-gov"
                style={{ background: PHASE_BG[m.phase] }}
              >
                <div className="rdm-cell-action">{cell.action}</div>
                <div className="rdm-cell-output">{cell.output}</div>
                <span className="rdm-cell-pod" style={{ background: '#E24B5A22', color: '#E24B5A' }}>
                  Programme Leadership
                </span>
              </div>
            )
          })}

        </div>{/* end rdm-grid */}

        {/* ---- Milestone rail ---- */}
        <div className="rdm-ms-rail">
          <div className="rdm-ms-rail-label">Milestones</div>
          <div className="rdm-ms-track">
            {visibleMilestones.map((ms: any) => {
              const trackIdx = ms.monthIdx - 1
              if (trackIdx < 0 || trackIdx >= totalCols) return null
              const pct = ((trackIdx + 0.5) / totalCols) * 100
              const phaseColor = PHASE_COLORS[ms.phase as string] ?? '#5C4FC5'
              return (
                <button
                  key={ms.id}
                  className="rdm-ms-marker"
                  style={{ left: `${pct}%` }}
                  onClick={() => handleMilestone(ms)}
                  title={ms.label}
                >
                  {ms.type === 'gate' ? (
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <polygon
                        points="9,1 17,9 9,17 1,9"
                        fill="#fff"
                        stroke={phaseColor}
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <circle cx="7" cy="7" r="5.5" fill="#fff" stroke={phaseColor} strokeWidth="2" />
                    </svg>
                  )}
                  <span className="rdm-ms-id">{ms.id}</span>
                </button>
              )
            })}
          </div>
        </div>

      </div>{/* end rdm-outer */}

      {/* Legend */}
      <div className="rdm-legend">
        <div className="rdm-legend-item">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="5.5" fill="#fff" stroke="#5C4FC5" strokeWidth="2" />
          </svg>
          <span>Milestone</span>
        </div>
        <div className="rdm-legend-item">
          <svg width="16" height="16" viewBox="0 0 18 18">
            <polygon points="9,1 17,9 9,17 1,9" fill="#fff" stroke="#5C4FC5" strokeWidth="2" />
          </svg>
          <span>Stage Gate</span>
        </div>
        <div className="rdm-legend-item">
          <span className="rdm-legend-dot" style={{ background: '#3456C5' }} />
          <span>Phase 1 - Integrate</span>
        </div>
        <div className="rdm-legend-item">
          <span className="rdm-legend-dot" style={{ background: '#5C4FC5' }} />
          <span>Phase 2 - Orchestrate</span>
        </div>
        <div className="rdm-legend-item">
          <span className="rdm-legend-dot" style={{ background: '#7A3EB1' }} />
          <span>Phase 3 - Industrialise</span>
        </div>
        <span className="rdm-legend-note">
          Click any milestone or gate to view detail.
        </span>
      </div>
    </section>
  )
}
