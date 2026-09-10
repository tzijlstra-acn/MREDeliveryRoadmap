import { useState } from 'react'
import { ROLES, PODS } from '../../data/roles.js'
import { useStore } from '../store/index'

const roles = ROLES as any[]
const pods = PODS as any[]

type PhaseKey = 'phase1' | 'phase2' | 'phase3'
const PHASES: { id: PhaseKey; label: string; color: string }[] = [
  { id: 'phase1', label: 'Phase 1', color: '#3456C5' },
  { id: 'phase2', label: 'Phase 2', color: '#5C4FC5' },
  { id: 'phase3', label: 'Phase 3', color: '#7A3EB1' },
]

const SIDE_META = {
  accenture: { label: 'Accenture External', color: '#3456C5', bg: '#EEF1FB' },
  client:    { label: 'Munich Re Dedicated', color: '#7A3EB1', bg: '#F3EEF8' },
}

const OUTCOME_META: Record<string, { label: string; color: string; bg: string }> = {
  retained:  { label: 'Retained', color: '#065F46', bg: '#D1FAE5' },
  augmented: { label: 'Augmented', color: '#1E40AF', bg: '#DBEAFE' },
  evolved:   { label: 'Evolved', color: '#7C3AED', bg: '#EDE9FE' },
  'decision-required': { label: 'Decision required', color: '#92400E', bg: '#FEF3C7' },
}

function totalFte(phase: PhaseKey) {
  return roles.reduce((sum: number, r: any) => sum + (r.fte?.[phase] ?? 0), 0)
}

function sideFte(side: string, phase: PhaseKey) {
  return roles
    .filter((r: any) => r.side === side)
    .reduce((sum: number, r: any) => sum + (r.fte?.[phase] ?? 0), 0)
}

function RoleDrawerContent({ role, phase }: { role: any; phase: PhaseKey }) {
  const side = SIDE_META[role.side as keyof typeof SIDE_META]
  const outcome = OUTCOME_META[role.futureTaskOutcome] ?? { label: role.futureTaskOutcome, color: '#6B7280', bg: '#F3F4F6' }
  return (
    <div className="team-drawer-body">
      <div className="team-drawer-meta">
        <span className="chip" style={{ background: side?.bg, color: side?.color }}>{side?.label}</span>
        <span className="chip" style={{ background: outcome.bg, color: outcome.color }}>{outcome.label}</span>
        <span className="chip">{role.priority}</span>
      </div>
      <p className="team-drawer-mission">{role.mission}</p>
      <div className="team-drawer-fte">
        <div className="team-drawer-fte-label">FTE by phase</div>
        <div className="team-drawer-fte-row">
          {PHASES.map((p) => (
            <div key={p.id} className="team-drawer-fte-cell">
              <div className="team-drawer-fte-val" style={{ color: p.color }}>{role.fte?.[p.id] ?? '--'}</div>
              <div className="team-drawer-fte-ph">{p.label}</div>
            </div>
          ))}
        </div>
      </div>
      {role.skills && (
        <div className="team-drawer-skills">
          <div className="team-drawer-skills-label">Skills</div>
          <div className="team-drawer-skills-chips">
            {(role.skills as string[]).map((s: string) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Team() {
  const [phase, setPhase] = useState<PhaseKey>('phase1')
  const openDrawer = useStore((s) => s.openDrawer)

  const totalAcn = sideFte('accenture', phase)
  const totalMR = sideFte('client', phase)
  const total = totalFte(phase)

  const byPod = pods.map((pod: any) => ({
    ...pod,
    roles: roles.filter((r: any) => r.pod === pod.id),
  }))

  return (
    <section className="section active" id="team">
      <div className="section-header">
        <div className="section-label">Team and Skills</div>
        <h1 className="section-title">Who is required and how does ownership transfer?</h1>
        <p className="section-tagline">
          Who builds it. Who runs it. How capability transfers from Accenture to Munich Re across 18 months.
        </p>
      </div>

      {/* Phase toggle */}
      <div className="team-phase-bar">
        {PHASES.map((p) => (
          <button
            key={p.id}
            className={`tab-btn${phase === p.id ? ' active' : ''}`}
            style={phase === p.id ? { color: p.color, borderBottomColor: p.color } : {}}
            onClick={() => setPhase(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* FTE summary */}
      <div className="team-fte-summary">
        <div className="team-fte-card" style={{ borderTopColor: '#3456C5' }}>
          <div className="team-fte-val" style={{ color: '#3456C5' }}>{totalAcn.toFixed(1)}</div>
          <div className="team-fte-lbl">Accenture External</div>
          <div className="team-fte-note">Building and enabling</div>
        </div>
        <div className="team-fte-card" style={{ borderTopColor: '#7A3EB1' }}>
          <div className="team-fte-val" style={{ color: '#7A3EB1' }}>{totalMR.toFixed(1)}</div>
          <div className="team-fte-lbl">Munich Re Dedicated</div>
          <div className="team-fte-note">Accountable and directing</div>
        </div>
        <div className="team-fte-card" style={{ borderTopColor: '#6B7280' }}>
          <div className="team-fte-val" style={{ color: '#6B7280' }}>{total.toFixed(1)}</div>
          <div className="team-fte-lbl">Total FTE</div>
          <div className="team-fte-note">Illustrative planning assumption</div>
        </div>
      </div>

      <div className="team-fte-qual">
        All FTE figures are illustrative planning assumptions, not commercial estimates.
        Part-time roles shown as fractional FTE reflect expected commitment, not 1.0 FTE equivalence.
        Exact resourcing is subject to commercial agreement.
      </div>

      {/* Role cards by pod */}
      {byPod.map((pod: any) => (
        <div key={pod.id} className="team-pod-section">
          <div className="team-pod-header">
            <div className="team-pod-name">{pod.name}</div>
            <div className="team-pod-fte">
              {pod.roles.reduce((s: number, r: any) => s + (r.fte?.[phase] ?? 0), 0).toFixed(1)} FTE
            </div>
          </div>
          <div className="team-roles-grid">
            {pod.roles.map((role: any) => {
              const side = SIDE_META[role.side as keyof typeof SIDE_META]
              const outcome = OUTCOME_META[role.futureTaskOutcome] ?? { label: role.futureTaskOutcome, color: '#6B7280', bg: '#F3F4F6' }
              const fte = role.fte?.[phase]
              return (
                <button
                  key={role.id}
                  className="team-role-card"
                  style={{ borderLeftColor: side?.color ?? '#6B7280' }}
                  onClick={() => openDrawer(role.title, <RoleDrawerContent role={role} phase={phase} />)}
                >
                  <div className="team-role-title">{role.title}</div>
                  <div className="team-role-meta">
                    <span className="chip" style={{ background: side?.bg, color: side?.color, fontSize: 9 }}>
                      {side?.label}
                    </span>
                  </div>
                  <div className="team-role-fte" style={{ color: PHASES.find((p) => p.id === phase)?.color }}>
                    {fte != null ? fte : '--'} FTE
                  </div>
                  <div className="team-role-outcome" style={{ background: outcome.bg, color: outcome.color }}>
                    {outcome.label}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
