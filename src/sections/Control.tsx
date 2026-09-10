import { useState } from 'react'
import { GOVERNANCE_FORUMS, STAGE_GATES, DECISIONS, RISKS } from '../../data/governance.js'
import { MILESTONES } from '../../data/milestones.js'
import { useStore } from '../store/index'

const forums = GOVERNANCE_FORUMS as any[]
const gates = STAGE_GATES as any[]
const decisions = DECISIONS as any[]
const risks = RISKS as any[]
const milestones = MILESTONES as any[]

type ControlView = 'gates' | 'governance' | 'decisions' | 'risks'

const GATE_PHASE_COLORS: Record<string, string> = {
  'phase-1': '#3456C5',
  'phase-2': '#5C4FC5',
  'phase-3': '#7A3EB1',
}

const RISK_STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  'open':    { label: 'Open', color: '#92400E', bg: '#FEF3C7' },
  'closed':  { label: 'Closed', color: '#065F46', bg: '#D1FAE5' },
  'mitigated': { label: 'Mitigated', color: '#1E40AF', bg: '#DBEAFE' },
  'accepted': { label: 'Accepted', color: '#7C3AED', bg: '#EDE9FE' },
}

const DECISION_STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  'open':               { label: 'Open', color: '#92400E', bg: '#FEF3C7' },
  'made':               { label: 'Made', color: '#065F46', bg: '#D1FAE5' },
  'pending':            { label: 'Pending', color: '#6B7280', bg: '#F3F4F6' },
  'decision-required':  { label: 'Decision required', color: '#92400E', bg: '#FEF3C7' },
  'decided':            { label: 'Decided', color: '#065F46', bg: '#D1FAE5' },
}

function GateDrawerContent({ gate }: { gate: any }) {
  const color = GATE_PHASE_COLORS[gate.phase] ?? '#6B7280'
  return (
    <div className="ctrl-drawer-body">
      <div className="ctrl-drawer-meta">
        <span className="chip" style={{ background: color + '22', color }}>{gate.phase?.replace('-', ' ') ?? ''}</span>
        <span className="chip">{gate.month}</span>
      </div>
      <div className="ctrl-drawer-section-title">Exit criteria</div>
      <ul className="ctrl-criteria-list">
        {(gate.criteria as string[]).map((c: string) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <div className="ctrl-drawer-section-title">Approvers</div>
      <div className="ctrl-approvers">
        {(gate.approvers as string[]).map((a: string) => (
          <span key={a} className="chip">{a}</span>
        ))}
      </div>
      <div className="ctrl-drawer-section-title">Decision options</div>
      <ul className="ctrl-criteria-list">
        {(gate.decisionOptions as string[]).map((d: string) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Control() {
  const [view, setView] = useState<ControlView>('gates')
  const openDrawer = useStore((s) => s.openDrawer)

  const VIEWS: { id: ControlView; label: string }[] = [
    { id: 'gates',      label: 'Stage Gates' },
    { id: 'governance', label: 'Governance Forums' },
    { id: 'decisions',  label: 'Key Decisions' },
    { id: 'risks',      label: 'RAID' },
  ]

  return (
    <section className="section active" id="control">
      <div className="section-header">
        <div className="section-label">Execution Control</div>
        <h1 className="section-title">How will execution be managed?</h1>
        <p className="section-tagline">
          Three gates. Four decisions. Full RAID register. All programme execution, visible.
        </p>
      </div>

      {/* View tabs */}
      <div className="ctrl-tabs">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            className={`tab-btn${view === v.id ? ' active' : ''}`}
            onClick={() => setView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Stage gates */}
      {view === 'gates' && (
        <div className="ctrl-gates-grid">
          {gates.map((gate: any) => {
            const color = GATE_PHASE_COLORS[gate.phase] ?? '#6B7280'
            return (
              <button
                key={gate.id}
                className="ctrl-gate-card"
                style={{ borderTopColor: color }}
                onClick={() => openDrawer(gate.name, <GateDrawerContent gate={gate} />)}
              >
                <div className="ctrl-gate-id" style={{ color }}>{gate.id}</div>
                <div className="ctrl-gate-name">{gate.name}</div>
                <div className="ctrl-gate-month">{gate.month}</div>
                <div className="ctrl-gate-criteria-count">
                  {(gate.criteria as string[]).length} exit criteria
                </div>
                <div className="ctrl-gate-approvers">
                  {(gate.approvers as string[]).slice(0, 2).join(', ')}
                  {gate.approvers.length > 2 && ` +${gate.approvers.length - 2}`}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Governance forums */}
      {view === 'governance' && (
        <div className="ctrl-forums-list">
          {forums.map((forum: any) => (
            <div key={forum.id} className="ctrl-forum-row">
              <div className="ctrl-forum-head">
                <div className="ctrl-forum-name">{forum.name}</div>
                <span className="chip">{forum.cadence}</span>
              </div>
              <div className="ctrl-forum-lead">Lead: <strong>{forum.lead}</strong></div>
              <div className="ctrl-forum-purpose">{forum.purpose}</div>
              <div className="ctrl-forum-participants">
                {Array.isArray(forum.participants)
                  ? (forum.participants as string[]).map((p: string) => (
                    <span key={p} className="ctrl-participant-chip">{p}</span>
                  ))
                  : <span className="ctrl-participant-chip">{forum.participants}</span>
                }
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Key decisions */}
      {view === 'decisions' && (
        <div>
          {decisions && decisions.length > 0 ? (
            <div className="ctrl-decisions-list">
              {decisions.map((d: any) => {
                const sm = DECISION_STATUS_META[d.status] ?? DECISION_STATUS_META['pending']
                return (
                  <div key={d.id} className="ctrl-decision-row">
                    <div className="ctrl-decision-head">
                      <div className="ctrl-decision-title">{d.title}</div>
                      <span className="chip" style={{ background: sm.bg, color: sm.color }}>{sm.label}</span>
                    </div>
                    <div className="ctrl-decision-detail">{d.decision || d.description}</div>
                    {d.owner && <div className="ctrl-decision-meta">Owner: {d.owner} {d.targetDate ? `| Target: ${d.targetDate}` : ''}</div>}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="ctrl-empty">
              Decision register will be populated in Gate 1 preparation (October 2026).
            </div>
          )}
        </div>
      )}

      {/* RAID */}
      {view === 'risks' && (
        <div>
          {risks && risks.length > 0 ? (
            <div className="ctrl-raid-list">
              {risks.map((r: any) => {
                const sm = RISK_STATUS_META[r.status] ?? { label: r.status, color: '#6B7280', bg: '#F3F4F6' }
                return (
                  <div key={r.id} className="ctrl-risk-row">
                    <div className="ctrl-risk-head">
                      <span className="ctrl-risk-id">{r.id}</span>
                      <div className="ctrl-risk-title">{r.title || r.risk}</div>
                      <span className="chip" style={{ background: sm.bg, color: sm.color }}>{sm.label}</span>
                    </div>
                    <div className="ctrl-risk-desc">{r.description || r.mitigation}</div>
                    {r.owner && <div className="ctrl-risk-meta">Owner: {r.owner}</div>}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="ctrl-empty">
              RAID register will be populated in Gate 1 preparation (October 2026).
            </div>
          )}
        </div>
      )}
    </section>
  )
}
