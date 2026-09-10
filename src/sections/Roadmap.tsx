import { useState } from 'react'
import {
  IconPencil, IconHammer, IconCheckbox, IconEye, IconRocket,
  IconChartBar, IconShield, IconCircleDot, IconDiamond
} from '@tabler/icons-react'
import { ROADMAP_CONTENT } from '../../data/roadmap-content.js'
import { MILESTONES } from '../../data/milestones.js'
import { useStore } from '../store/index'

type ViewMode = '18m' | '6m'
type ActivityType = 'plan' | 'build' | 'test' | 'review' | 'release' | 'operate' | 'govern'

/* ---------- lane definitions ---------- */
const LANES = [
  { key: 'regulatoryPortfolio', label: 'Regulatory Portfolio and Interpretation', abbr: 'REG', color: '#3456C5' },
  { key: 'complianceContent',   label: 'Controls, Norms and Work Products',       abbr: 'CTRL', color: '#5C4FC5' },
  { key: 'userWorkflow',        label: 'Product and Application Workflow',         abbr: 'PROD', color: '#7B4AC5' },
  { key: 'platformIntegration', label: 'Platform, Data and Orchestration',         abbr: 'PLAT', color: '#9A3EB1' },
  { key: 'evidenceReporting',   label: 'Evidence, Reporting and Assurance',        abbr: 'EVID', color: '#C53A7B' },
  { key: '_gov',                label: 'Governance, Adoption and Value',           abbr: 'GOV',  color: '#E24B5A' },
]

const PHASE_COLORS: Record<string, string> = {
  'phase-1': '#3456C5', 'phase-2': '#5C4FC5', 'phase-3': '#7A3EB1',
}

/* ---------- activity-type classification ---------- */
function actType(action: string): ActivityType {
  const a = action.toLowerCase()
  if (/mobilise|establish|define|design|plan|confirm|scope|identify|assess|baseline|survey|map|invent/.test(a)) return 'plan'
  if (/build|implement|develop|configure|load|create|connect|extend|begin wave|begin onboard|deploy/.test(a)) return 'build'
  if (/test|validate|verify|trial|execute.*case|run.*case/.test(a)) return 'test'
  if (/review|approve|sign-off|gate/.test(a)) return 'review'
  if (/release|go live|publish|launch|complete bau|complete wave|transition/.test(a)) return 'release'
  if (/monitor|measure|track|capture|compile|analyse|optimise|report/.test(a)) return 'operate'
  return 'govern'
}

const ACT: Record<ActivityType, { Icon: any; label: string }> = {
  plan:    { Icon: IconPencil,   label: 'Design'  },
  build:   { Icon: IconHammer,   label: 'Build'   },
  test:    { Icon: IconCheckbox, label: 'Test'    },
  review:  { Icon: IconEye,      label: 'Review'  },
  release: { Icon: IconRocket,   label: 'Release' },
  operate: { Icon: IconChartBar, label: 'Operate' },
  govern:  { Icon: IconShield,   label: 'Govern'  },
}

/* ---------- gov-lane synthetic data ---------- */
const GOV_LANE = (ROADMAP_CONTENT as any[]).map((m) => ({
  action: m.clientDecision ?? 'Delivery governance and programme operations',
  output: m.coreOutput as string,
  pod: 'Programme Leadership',
}))

/* ---------- helper: get cell for a lane/month ---------- */
function getCell(month: any, laneKey: string, idx: number) {
  if (laneKey === '_gov') return GOV_LANE[idx]
  return month[laneKey] ?? null
}

/* ---------- detail panel ---------- */
function DetailPanel({ month, idx }: { month: any | null; idx: number }) {
  if (!month) {
    return (
      <div className="rdm-detail-empty">
        <IconCircleDot size={28} stroke={1.5} />
        <p>Click any bar or milestone to see detail</p>
      </div>
    )
  }
  const phaseColor = PHASE_COLORS[month.phase] ?? '#5C4FC5'
  const monthMs = (MILESTONES as any[]).filter((ms) => ms.monthIdx - 1 === idx)

  return (
    <div className="rdm-detail-content">
      <div className="rdm-detail-month-hdr">
        <div className="rdm-detail-month-name">{month.monthLabel}</div>
        <span className="chip" style={{ background: phaseColor + '22', color: phaseColor }}>
          {month.phase.replace('phase-', 'Phase ')}
        </span>
      </div>

      {month.coreOutput && (
        <div className="rdm-detail-block">
          <div className="rdm-detail-block-label">Core output</div>
          <div className="rdm-detail-block-text">{month.coreOutput}</div>
        </div>
      )}

      {month.clientDecision && (
        <div className="rdm-detail-block rdm-detail-block-decision">
          <div className="rdm-detail-block-label">Decision required</div>
          <div className="rdm-detail-block-text">{month.clientDecision}</div>
        </div>
      )}

      {monthMs.length > 0 && (
        <div className="rdm-detail-block">
          <div className="rdm-detail-block-label">Milestones this month</div>
          {monthMs.map((ms: any) => (
            <div key={ms.id} className="rdm-detail-ms-row">
              {ms.type === 'gate'
                ? <IconDiamond size={13} style={{ color: phaseColor, flexShrink: 0 }} />
                : <IconCircleDot size={13} style={{ color: phaseColor, flexShrink: 0 }} />
              }
              <span><strong>{ms.id}</strong> {ms.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="rdm-detail-lanes">
        {LANES.map((lane) => {
          const cell = getCell(month, lane.key, idx)
          if (!cell) return null
          const at = actType(cell.action)
          const { Icon } = ACT[at]
          return (
            <div key={lane.key} className="rdm-detail-lane-row">
              <div className="rdm-detail-lane-hdr">
                <Icon size={13} style={{ color: lane.color, flexShrink: 0 }} />
                <span className="rdm-detail-lane-name" style={{ color: lane.color }}>
                  {lane.label}
                </span>
                <span className="rdm-detail-lane-pod">{cell.pod}</span>
              </div>
              <div className="rdm-detail-lane-action">{cell.action}</div>
              {cell.output && (
                <div className="rdm-detail-lane-output">Output: {cell.output}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- main component ---------- */
export default function Roadmap() {
  const [viewMode, setViewMode] = useState<ViewMode>('18m')
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const openDrawer = useStore((s) => s.openDrawer)

  const months = viewMode === '6m'
    ? (ROADMAP_CONTENT as any[]).slice(0, 6)
    : (ROADMAP_CONTENT as any[])

  const totalCols = months.length

  const visibleMilestones = (MILESTONES as any[]).filter((ms) =>
    viewMode === '6m' ? ms.monthIdx <= 6 : true
  )

  const selectedMonth = selectedIdx !== null ? months[selectedIdx] ?? null : null

  // find the start index of each phase for the spine
  const spineBands = viewMode === '18m'
    ? [
        { label: 'Phase 1 - Integrate',     colStart: 2, colEnd: 8,  color: '#3456C5' },
        { label: 'Phase 2 - Orchestrate',    colStart: 8, colEnd: 14, color: '#5C4FC5' },
        { label: 'Phase 3 - Industrialise',  colStart: 14, colEnd: 20, color: '#7A3EB1' },
      ]
    : [{ label: 'Phase 1 - Integrate (Oct 2026 - Mar 2027)', colStart: 2, colEnd: 8, color: '#3456C5' }]

  const LABEL_W = 110
  const gridCols = `${LABEL_W}px repeat(${totalCols}, minmax(${viewMode === '6m' ? 80 : 52}px, 1fr))`

  function handleMilestone(ms: any) {
    // Find the month index for this milestone
    const monthIdx = ms.monthIdx - 1
    if (monthIdx >= 0 && monthIdx < months.length) setSelectedIdx(monthIdx)
    openDrawer(ms.label, (
      <div className="rdm-drawer-body">
        <div className="rdm-drawer-meta">
          <span className="chip" style={{ background: PHASE_COLORS[ms.phase] + '22', color: PHASE_COLORS[ms.phase] }}>
            {ms.phase.replace('phase-', 'Phase ')}
          </span>
          <span className="chip">{ms.date}</span>
          <span className={`chip chip-${ms.status}`}>{ms.status}</span>
        </div>
        <p className="rdm-drawer-desc">{ms.description}</p>
        {ms.type === 'gate' && (
          <div className="rdm-drawer-gate-note">Stage gate -- formal approval required before next phase.</div>
        )}
        <div className="rdm-drawer-field">
          <span className="rdm-drawer-field-label">Deliverables</span>
          <span>{(ms.deliverableIds as string[]).join(', ')}</span>
        </div>
      </div>
    ))
  }

  return (
    <section className="section active" id="roadmap">
      <div className="section-header">
        <div className="section-label">Delivery Roadmap</div>
        <h1 className="section-title">What happens when, and what is delivered?</h1>
        <p className="section-tagline">
          18 months. Six workstreams. Click any bar to see what changes and why.
        </p>
      </div>

      <div className="rdm-controls">
        <div className="tab-group">
          <button className={`tab-btn${viewMode === '18m' ? ' active' : ''}`} onClick={() => { setViewMode('18m'); setSelectedIdx(null) }}>18-Month Overview</button>
          <button className={`tab-btn${viewMode === '6m' ? ' active' : ''}`}  onClick={() => { setViewMode('6m');  setSelectedIdx(null) }}>Phase 1 Detail (6M)</button>
        </div>
        {selectedIdx !== null && (
          <button className="rdm-clear-btn" onClick={() => setSelectedIdx(null)}>Clear selection</button>
        )}
      </div>

      {/* ── Main split layout ── */}
      <div className="rdm-split">

        {/* LEFT: Gantt */}
        <div className="rdm-gantt-col">
          <div className="rdm-outer">
            <div className="rdm-grid" style={{ gridTemplateColumns: gridCols }}>

              {/* Governance spine */}
              <div className="rdm-spine-label">Spine</div>
              {spineBands.map((band) => (
                <div key={band.label} className="rdm-phase-band"
                  style={{ gridColumn: `${band.colStart} / ${band.colEnd}`, background: band.color }}>
                  {band.label}
                </div>
              ))}

              {/* Month headers */}
              <div className="rdm-col-hdr-spacer" />
              {months.map((m: any, mi: number) => (
                <div
                  key={m.month}
                  className={`rdm-month-hdr${selectedIdx === mi ? ' rdm-col-selected' : ''}`}
                  onClick={() => setSelectedIdx(mi)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="rdm-month-short">{m.monthLabel.split(' ')[0].slice(0, 3)}</span>
                  <span className="rdm-month-year">{m.monthLabel.split(' ')[1]?.slice(2)}</span>
                </div>
              ))}

              {/* Lane rows */}
              {LANES.map((lane) => (
                <div key={lane.key} style={{ display: 'contents' }}>
                  <div className="rdm-lane-label rdm-lane-label-compact" style={{ borderLeftColor: lane.color }}>
                    <span className="rdm-lane-abbr" style={{ color: lane.color }}>{lane.abbr}</span>
                    <span className="rdm-lane-full">{lane.label}</span>
                  </div>
                  {months.map((m: any, mi: number) => {
                    const cell = getCell(m, lane.key, mi)
                    const at = cell ? actType(cell.action) : 'plan'
                    const { Icon } = ACT[at]
                    const isSelected = selectedIdx === mi
                    const phaseColor = PHASE_COLORS[m.phase]
                    return (
                      <button
                        key={m.month}
                        className={`rdm-bar-cell${isSelected ? ' rdm-bar-cell-selected' : ''}`}
                        style={{
                          background: isSelected ? lane.color + '18' : undefined,
                          borderLeftColor: isSelected ? lane.color : undefined,
                        }}
                        onClick={() => setSelectedIdx(mi)}
                        title={cell?.action ?? ''}
                      >
                        <div
                          className="rdm-bar"
                          style={{
                            background: isSelected ? lane.color + '30' : phaseColor + '15',
                            borderColor: isSelected ? lane.color : phaseColor + '40',
                          }}
                        >
                          <Icon size={12} stroke={2} style={{ color: isSelected ? lane.color : phaseColor, flexShrink: 0 }} />
                          <span className="rdm-bar-label" style={{ color: isSelected ? lane.color : '#6B7280' }}>
                            {ACT[at].label}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ))}

            </div>{/* rdm-grid */}

            {/* Milestone rail */}
            <div className="rdm-ms-rail">
              <div className="rdm-ms-rail-label">MS</div>
              <div className="rdm-ms-track">
                {visibleMilestones.map((ms: any) => {
                  const trackIdx = ms.monthIdx - 1
                  if (trackIdx < 0 || trackIdx >= totalCols) return null
                  const pct = ((trackIdx + 0.5) / totalCols) * 100
                  const phaseColor = PHASE_COLORS[ms.phase as string] ?? '#5C4FC5'
                  return (
                    <button key={ms.id} className="rdm-ms-marker" style={{ left: `${pct}%` }}
                      onClick={() => handleMilestone(ms)} title={ms.label}>
                      {ms.type === 'gate'
                        ? <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 15,8 8,15 1,8" fill="#fff" stroke={phaseColor} strokeWidth="2" /></svg>
                        : <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="#fff" stroke={phaseColor} strokeWidth="2" /></svg>
                      }
                      <span className="rdm-ms-id">{ms.id}</span>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>{/* rdm-outer */}

          {/* Legend */}
          <div className="rdm-legend">
            {(Object.entries(ACT) as [ActivityType, { Icon: any; label: string }][]).map(([key, meta]) => (
              <div key={key} className="rdm-legend-item">
                <meta.Icon size={13} stroke={2} style={{ color: '#6B7280' }} />
                <span>{meta.label}</span>
              </div>
            ))}
            <div className="rdm-legend-item">
              <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="#fff" stroke="#5C4FC5" strokeWidth="2" /></svg>
              <span>Milestone</span>
            </div>
            <div className="rdm-legend-item">
              <svg width="14" height="14" viewBox="0 0 16 16"><polygon points="8,1 15,8 8,15 1,8" fill="#fff" stroke="#5C4FC5" strokeWidth="2" /></svg>
              <span>Gate</span>
            </div>
          </div>
        </div>{/* rdm-gantt-col */}

        {/* RIGHT: Detail panel */}
        <div className="rdm-detail-panel">
          <DetailPanel month={selectedMonth} idx={selectedIdx ?? 0} />
        </div>

      </div>{/* rdm-split */}
    </section>
  )
}
