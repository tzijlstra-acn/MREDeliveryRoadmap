import { DELIVERABLES } from '../../data/deliverables.js'
import { STAGE_GATES } from '../../data/governance.js'
import { VALUE_BRIDGE } from '../../data/value-assumptions.js'
import { useStore } from '../store/index'

const deliverables = DELIVERABLES as any[]
const gates = STAGE_GATES as any[]
const bridge = VALUE_BRIDGE as any[]

const THREE_ACT = [
  {
    act: 'Act 1',
    phase: 'Phase 1 -- 6 months',
    color: '#3456C5',
    headline: 'Prove',
    subhead: 'DORA Backup and Restore reference scenario',
    narrative: 'Build the common agentic compliance capability using a single end-to-end use case. Prove that automation, AI-assisted interpretation and evidence assembly can reduce cycle time while preserving human approval gates at every accountable decision point.',
    gate: 'Gate 1: Integrated Pilot (Month 6)',
    decision: 'Executive Sponsor confirmation and Phase 1 funding',
  },
  {
    act: 'Act 2',
    phase: 'Phase 2 -- 6 months',
    color: '#5C4FC5',
    headline: 'Replicate',
    subhead: 'Wave 1 regulations via onboarding factory',
    narrative: 'Use the proven mechanism to onboard Wave 1 regulations through a repeatable factory process. Automate orchestration, evidence assembly and DDCR reporting at scale. Measure value and validate the 13.8% hypothesis with operational data.',
    gate: 'Gate 2: End-to-End Proof (Month 12)',
    decision: 'Wave 1 regulation selection and Phase 2 funding -- decision required at Gate 1',
  },
  {
    act: 'Act 3',
    phase: 'Phase 3 -- 6 months',
    color: '#7A3EB1',
    headline: 'Scale',
    subhead: 'Compliance-as-a-Service with path to 24 regulations',
    narrative: 'Harden the platform for production, establish the live operating model and publish Compliance-as-a-Service v1. Define the remaining path to 24-regulation portfolio coverage. Scale investment decision at Gate 3.',
    gate: 'Gate 3: Scale Decision (Month 18)',
    decision: 'Scale investment approval -- decision required at Gate 2',
  },
]

const DECISIONS = [
  { id: 'D1', timing: 'Now', label: 'Executive Sponsor and Product Owner', detail: 'Name and confirm the executive sponsor with mandate and budget authority, and the Product Owner who will own backlog prioritisation and acceptance decisions. Required before programme mobilisation.', urgency: 'critical' },
  { id: 'D2', timing: 'Gate 1 (Mar 2027)', label: 'Phase 2 funding and Wave 1 regulation selection', detail: 'Approve Phase 2 funding and confirm which regulations enter the Wave 1 onboarding factory. The factory design depends on Wave 1 scope being confirmed before Phase 2 begins.', urgency: 'gate-1' },
  { id: 'D3', timing: 'Gate 2 (Sep 2027)', label: 'Phase 3 funding and Wave 2 scope', detail: 'Approve Phase 3 scale investment based on measured value evidence. Confirm Wave 2 regulation scope based on onboarding factory throughput. Wave 2 count is decision required -- not fixed.', urgency: 'gate-2' },
  { id: 'D4', timing: 'Gate 3 (Mar 2028)', label: 'Scale investment for remaining 24-regulation path', detail: 'Approve the remaining route to 24-regulation portfolio coverage. Based on measured Wave 1 and 2 economics. North Star: 24 regulations -- committed Month 18 coverage: decision required.', urgency: 'gate-3' },
]

const URGENCY_META = {
  critical: { label: 'Required now', color: '#991B1B', bg: '#FEE2E2' },
  'gate-1': { label: 'Gate 1 decision', color: '#1E40AF', bg: '#DBEAFE' },
  'gate-2': { label: 'Gate 2 decision', color: '#5B21B6', bg: '#EDE9FE' },
  'gate-3': { label: 'Gate 3 decision', color: '#7A3EB1', bg: '#F3EEF8' },
}

export default function Executive() {
  const openDrawer = useStore((s) => s.openDrawer)

  const bridgeResult = bridge.reduce((acc: number, b: any) => acc * b.base, 1)

  function openDecision(d: typeof DECISIONS[0]) {
    openDrawer(d.label, (
      <div style={{ fontSize: 13, lineHeight: 1.6 }}>
        <div style={{ marginBottom: 10 }}>
          <span className="chip" style={{
            background: URGENCY_META[d.urgency as keyof typeof URGENCY_META].bg,
            color: URGENCY_META[d.urgency as keyof typeof URGENCY_META].color
          }}>
            {URGENCY_META[d.urgency as keyof typeof URGENCY_META].label}
          </span>
        </div>
        <p>{d.detail}</p>
      </div>
    ))
  }

  return (
    <section className="section active" id="executive">
      <div className="section-header">
        <div className="section-label">Executive Decision</div>
        <h1 className="section-title">What should Munich Re approve?</h1>
        <p className="section-tagline">
          One platform. Prove it through DORA. Replicate through Wave 1. Scale to 24 regulations.
        </p>
      </div>

      {/* Proof-to-capability-to-portfolio visual */}
      <div className="exec-proposition">
        <div className="exec-prop-item exec-prop-proof">
          <div className="exec-prop-icon">◎</div>
          <div className="exec-prop-content">
            <div className="exec-prop-tag">Reference scenario</div>
            <div className="exec-prop-title">DORA Backup &amp; Restore</div>
            <div className="exec-prop-desc">One compliance segment. Proves the end-to-end mechanism. Not the full DORA scope.</div>
          </div>
        </div>
        <div className="exec-prop-arrow">→</div>
        <div className="exec-prop-item exec-prop-capability">
          <div className="exec-prop-icon">⬡</div>
          <div className="exec-prop-content">
            <div className="exec-prop-tag">Built once, reused everywhere</div>
            <div className="exec-prop-title">Agentic Compliance Capability</div>
            <div className="exec-prop-desc">Shared platform. Compliance Hub, Product Hub, DDCR remain the user experiences. Headless execution behind them.</div>
          </div>
        </div>
        <div className="exec-prop-arrow">→</div>
        <div className="exec-prop-item exec-prop-portfolio">
          <div className="exec-prop-icon">▦</div>
          <div className="exec-prop-content">
            <div className="exec-prop-tag">North Star target</div>
            <div className="exec-prop-title">24-Regulation Portfolio</div>
            <div className="exec-prop-desc">Compliance-as-a-Service. Not 24 bespoke builds. One capability, scaled. Coverage: decision required at Gate 3.</div>
          </div>
        </div>
      </div>

      {/* Three-act narrative */}
      <div className="exec-acts">
        {THREE_ACT.map((act) => (
          <div key={act.act} className="exec-act-card" style={{ borderTopColor: act.color }}>
            <div className="exec-act-label" style={{ color: act.color }}>{act.act}</div>
            <div className="exec-act-phase">{act.phase}</div>
            <div className="exec-act-headline" style={{ color: act.color }}>{act.headline}</div>
            <div className="exec-act-subhead">{act.subhead}</div>
            <p className="exec-act-narrative">{act.narrative}</p>
            <div className="exec-act-gate">
              <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0, marginTop: 1 }}>
                <polygon points="6,0 12,6 6,12 0,6" fill="none" stroke={act.color} strokeWidth="1.5" />
              </svg>
              <span>{act.gate}</span>
            </div>
            <div className="exec-act-decision">Decision required: {act.decision}</div>
          </div>
        ))}
      </div>

      {/* Value hypothesis strip */}
      <div className="exec-value-strip">
        <div className="exec-value-head">Value hypothesis (directional working assumption)</div>
        <div className="exec-value-items">
          {bridge.map((b: any, i: number) => (
            <div key={b.id} className="exec-value-item">
              <span className="exec-value-sym">{b.symbol}</span>
              <span className="exec-value-val">{b.label}</span>
              <span className="exec-value-name">{b.component}</span>
            </div>
          ))}
          <div className="exec-value-item exec-value-result">
            <span className="exec-value-sym">=</span>
            <span className="exec-value-val exec-value-result-val">{(bridgeResult * 100).toFixed(1)}%</span>
            <span className="exec-value-name">Capacity freed (directional)</span>
          </div>
        </div>
        <div className="exec-value-qual">
          Directional working assumption. Represents capacity freed from directly addressed
          compliance work. Capacity released, not a headcount cut.
          Illustrative planning assumption, not a commercial estimate.
          To validate at Gate 2 (September 2027).
        </div>
      </div>

      {/* Key decisions */}
      <div className="exec-section-head">Key decisions required</div>
      <div className="exec-decisions">
        {DECISIONS.map((d) => {
          const u = URGENCY_META[d.urgency as keyof typeof URGENCY_META]
          return (
            <button
              key={d.id}
              className="exec-decision-card"
              onClick={() => openDecision(d)}
            >
              <div className="exec-decision-timing" style={{ background: u.bg, color: u.color }}>
                {u.label}
              </div>
              <div className="exec-decision-label">{d.label}</div>
              <div className="exec-decision-when">{d.timing}</div>
            </button>
          )
        })}
      </div>

      {/* North Star note */}
      <div className="exec-north-star-note">
        North Star target: 24 regulations as a governed Compliance-as-a-Service.
        Committed Month 18 coverage: decision required at Gate 2.
        Wave 2 and Wave 3 regulation counts are not fixed.
      </div>
    </section>
  )
}
