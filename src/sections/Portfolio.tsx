import { useState } from 'react'
import { REGULATIONS } from '../../data/regulations.js'
import { useStore } from '../store/index'

const regs = REGULATIONS as any[]

const WAVE_META: Record<string, { label: string; color: string; bg: string }> = {
  'wave-1':   { label: 'Wave 1', color: '#065F46', bg: '#D1FAE5' },
  'wave-2':   { label: 'Wave 2', color: '#1E40AF', bg: '#DBEAFE' },
  'wave-3':   { label: 'Wave 3', color: '#5B21B6', bg: '#EDE9FE' },
  'wave-4':   { label: 'Wave 4', color: '#92400E', bg: '#FEF3C7' },
  'reference': { label: 'Reference', color: '#9D174D', bg: '#FCE7F3' },
}

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  'assessed':   { label: 'Assessed', color: '#065F46', bg: '#D1FAE5' },
  'inventoried': { label: 'Inventoried', color: '#1D4ED8', bg: '#DBEAFE' },
  'scoped':     { label: 'In Scope', color: '#7C3AED', bg: '#EDE9FE' },
}

const REGION_COLORS: Record<string, string> = {
  'Europe':       '#3456C5',
  'Asia':         '#7C3AED',
  'North America': '#0891B2',
  'Africa':       '#059669',
  'Latin America': '#D97706',
  'Other':        '#6B7280',
}

const FILTER_TABS = [
  { id: 'all',    label: 'All 24' },
  { id: 'reference', label: 'Reference' },
  { id: 'wave-1', label: 'Wave 1 (proposed)' },
  { id: 'tbd',    label: 'Wave TBD' },
]

function RegDrawerContent({ reg }: { reg: any }) {
  const wm = reg.proposedWave ? WAVE_META[reg.proposedWave] : null
  const sm = STATUS_META[reg.status]
  return (
    <div className="port-drawer-body">
      <div className="port-drawer-meta">
        {wm && (
          <span className="chip" style={{ background: wm.bg, color: wm.color }}>
            {wm.label} -- proposed
          </span>
        )}
        {!wm && (
          <span className="chip" style={{ background: '#FEF3C7', color: '#92400E' }}>
            Wave TBD -- decision required at Gate 2
          </span>
        )}
        {sm && <span className="chip" style={{ background: sm.bg, color: sm.color }}>{sm.label}</span>}
        <span className="chip">{reg.jurisdiction}</span>
        <span className="chip">{reg.domain}</span>
      </div>
      <div className="port-drawer-grid">
        <div className="port-drawer-field"><span className="port-field-label">Regulator</span><span>{reg.regulator}</span></div>
        <div className="port-drawer-field"><span className="port-field-label">Region</span><span>{reg.region}</span></div>
        <div className="port-drawer-field"><span className="port-field-label">Accountable function</span><span>{reg.accountableFunction}</span></div>
        <div className="port-drawer-field"><span className="port-field-label">Priority</span><span>{reg.priority} of 24</span></div>
        <div className="port-drawer-field"><span className="port-field-label">Evidence availability</span><span>{reg.evidenceAvailability}</span></div>
        <div className="port-drawer-field"><span className="port-field-label">Applicability complexity</span><span>{reg.applicabilityComplexity}</span></div>
      </div>
      {reg.referenceScenario && (
        <div className="port-drawer-ref">
          <strong>Reference scenario:</strong> {reg.referenceScenario}
          {reg.referenceScenarioNote && <p className="port-drawer-ref-note">{reg.referenceScenarioNote}</p>}
        </div>
      )}
      {reg.notes && <p className="port-drawer-notes">{reg.notes}</p>}
      {reg.nextDecision && (
        <div className="port-drawer-decision">
          <div className="port-field-label">Next decision required</div>
          <div>{reg.nextDecision}</div>
          {reg.targetDate && <div className="port-drawer-date">Target: {reg.targetDate}</div>}
        </div>
      )}
    </div>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const openDrawer = useStore((s) => s.openDrawer)

  const filtered = regs.filter((r) => {
    if (filter === 'all') return true
    if (filter === 'reference') return r.proposedWave === 'wave-1' && r.referenceScenario
    if (filter === 'wave-1') return r.proposedWave === 'wave-1'
    if (filter === 'tbd') return !r.proposedWave
    return true
  })

  function handleReg(reg: any) {
    openDrawer(reg.name, <RegDrawerContent reg={reg} />)
  }

  return (
    <section className="section active" id="portfolio">
      <div className="section-header">
        <div className="section-label">Regulatory Portfolio</div>
        <h1 className="section-title">Which regulations should be onboarded first?</h1>
        <p className="section-tagline">
          24-regulation portfolio across 8 regions and 12 domains. DORA is the anchor for Phase 1.
          Wave assignments for the remaining 23 regulations are provisional and subject to formal
          approval at Gate 2. All wave assignments are proposed -- client approval required.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="port-filter-tabs">
        {FILTER_TABS.map((t) => (
          <button
            key={t.id}
            className={`tab-btn${filter === t.id ? ' active' : ''}`}
            onClick={() => setFilter(t.id)}
          >
            {t.label}
          </button>
        ))}
        <span className="port-filter-note">Wave 2 and Wave 3 regulation counts are decision required at Gate 2</span>
      </div>

      {/* Wave labelling notice */}
      <div className="port-wave-notice">
        All wave assignments are provisional planning assumptions and require client approval at Gate 2.
        Wave 2 and Wave 3 regulation counts are not fixed -- they are subject to Gate 2 decision.
      </div>

      {/* Tile grid */}
      <div className="port-grid">
        {filtered.map((reg: any) => {
          const wm = reg.proposedWave ? WAVE_META[reg.proposedWave] : null
          const sm = STATUS_META[reg.status]
          const rc = REGION_COLORS[reg.region] ?? '#6B7280'
          const isRef = reg.referenceScenario != null
          return (
            <button
              key={reg.id}
              className={`port-tile${isRef ? ' port-tile-ref' : ''}`}
              onClick={() => handleReg(reg)}
            >
              {/* Wave badge */}
              {wm ? (
                <span className="port-wave-badge" style={{ background: wm.bg, color: wm.color }}>
                  {wm.label}
                </span>
              ) : (
                <span className="port-wave-badge port-wave-tbd">Wave TBD</span>
              )}

              {/* Region dot + ID */}
              <div className="port-tile-header">
                <span className="port-tile-id">{reg.id}</span>
                <span className="port-region-dot" style={{ background: rc }} title={reg.region} />
              </div>

              {/* Name */}
              <div className="port-tile-name">{reg.shortName}</div>

              {/* Domain chip */}
              <div className="port-tile-footer">
                <span className="port-tile-domain">{reg.domain}</span>
                <span className="port-tile-jur">{reg.jurisdiction}</span>
              </div>

              {/* Reference label */}
              {isRef && (
                <div className="port-tile-ref-label">Reference: {reg.referenceScenario}</div>
              )}

              {/* Status */}
              {sm && (
                <div className="port-tile-status" style={{ background: sm.bg, color: sm.color }}>
                  {sm.label}
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="port-count-note">
        Showing {filtered.length} of 24 regulations.
        Illustrative planning assumption -- not a commercial commitment.
      </div>
    </section>
  )
}
