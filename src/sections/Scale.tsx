import { useState, useEffect, useRef } from 'react'
import { VALUE_BRIDGE, VALUE_SCENARIOS } from '../../data/value-assumptions.js'
import { useStore } from '../store/index'

const bridge = VALUE_BRIDGE as any[]
const scenarios = VALUE_SCENARIOS as any[]

const SCENARIO_COLORS = ['#3456C5', '#5C4FC5', '#7A3EB1']
const COMPONENT_COLORS = ['#3456C5', '#5C4FC5', '#7A3EB1', '#C53A7B', '#E24B5A']

// ── 1. Four cost layers ──────────────────────────────────────────────────────
const COST_LAYERS = [
  {
    letter: 'A',
    label: 'Fixed Implementation Investment',
    type: 'One-time',
    description:
      'Setup, integration, configuration, and onboarding. Incurred once at programme inception. Independent of usage volume.',
    color: '#3456C5',
  },
  {
    letter: 'B',
    label: 'Fixed Annual Service Cost',
    type: 'Ongoing annual',
    description:
      'Platform licensing, managed service, support, and monitoring. Billed annually regardless of usage volume.',
    color: '#5C4FC5',
  },
  {
    letter: 'C',
    label: 'User-linked Cost',
    type: 'Per active user / role',
    description:
      'Seat or role-based access fees that scale with the number of active users and roles in scope.',
    color: '#7A3EB1',
  },
  {
    letter: 'D',
    label: 'Usage-linked Cost',
    type: 'Per run / per token',
    description:
      'AI inference cost charged per workflow execution or per token consumed. The variable layer modelled in the DORA B&R scenario below.',
    color: '#C53A7B',
  },
]

// ── 2. DORA B&R animated scenario ───────────────────────────────────────────
const DORA_STEPS = [
  {
    id: 0,
    shortLabel: 'Receive',
    description: '1 regulatory change package received',
    costAdd: 0,
    runningTotal: 0.0,
    costNote: '',
    activeColor: '#6B7280',
  },
  {
    id: 1,
    shortLabel: 'Structure',
    description: '6 changed / interpreted requirements + 4 affected controls + 3 Work Products structured',
    costAdd: 0,
    runningTotal: 0.0,
    costNote: 'Deterministic -- no AI inference cost',
    activeColor: '#6B7280',
  },
  {
    id: 2,
    shortLabel: 'Screen Apps',
    description: '3,000 applications screened by deterministic automation',
    costAdd: 0,
    runningTotal: 0.0,
    costNote: 'Cost so far: $0.00 -- no AI inference used',
    activeColor: '#6B7280',
  },
  {
    id: 3,
    shortLabel: 'AI Analysis',
    description:
      'Central AI analysis complete -- extraction, interpretation, framework mapping, Work Product impact assessment',
    costAdd: 0.99,
    runningTotal: 0.99,
    costNote: '+$0.99 token-only (Tier 1/2/3 benchmark -- illustrative as of Sep 2026, subject to contract)',
    activeColor: '#3456C5',
  },
  {
    id: 4,
    shortLabel: 'Fan-out',
    description: '150 application-impact cases fan out (5% applicability rate applied to 3,000 apps)',
    costAdd: 0,
    runningTotal: 0.99,
    costNote: 'Routing step -- no additional token cost',
    activeColor: '#5C4FC5',
  },
  {
    id: 5,
    shortLabel: 'Standard',
    description: '127 standard cases processed automatically at $0.11 per case',
    costAdd: 13.97,
    runningTotal: 14.96,
    costNote: '+$13.97 (127 x $0.11 per case)',
    activeColor: '#7A3EB1',
  },
  {
    id: 6,
    shortLabel: 'Exceptions',
    description:
      '23 exception cases routed to human review with general-model AI reasoning and escalation handling',
    costAdd: 4.15,
    runningTotal: 19.11,
    costNote: '+$4.15 (23 exception cases: standard processing + escalation routing)',
    activeColor: '#C53A7B',
  },
  {
    id: 7,
    shortLabel: 'Complete',
    description: 'Evidence assembled, DDCR updated. Run complete.',
    costAdd: 0,
    runningTotal: 19.11,
    costNote: 'Total illustrative token-only cost: ~$19.11',
    activeColor: '#059669',
  },
]

// ── Model tier reference ─────────────────────────────────────────────────────
const MODEL_TIERS = [
  {
    tier: 'Tier 1 (Efficient)',
    purpose: 'Extraction, classification, summarisation',
    inputPrice: '$0.20/M tokens',
    outputPrice: '$1.20/M tokens',
  },
  {
    tier: 'Tier 2 (General)',
    purpose: 'Reasoning, mapping, drafting',
    inputPrice: '$2.00/M tokens',
    outputPrice: '$12.00/M tokens',
  },
  {
    tier: 'Tier 3 (Frontier)',
    purpose: 'Escalation, complex interpretation',
    inputPrice: '$4.00/M tokens',
    outputPrice: '$20.00/M tokens',
  },
]

export default function Scale() {
  const activeScenario = useStore((s) => s.activeScenario)
  const setScenario = useStore((s) => s.setActiveScenario)

  const scenarioIdx = Math.max(0, scenarios.findIndex((s: any) => s.id === activeScenario))
  const scenario = scenarios[scenarioIdx] ?? scenarios[2]
  const scenarioColor = SCENARIO_COLORS[scenarioIdx] ?? '#7A3EB1'

  const result = bridge.reduce((acc: number, b: any) => acc * b.base, 1)
  const resultPct = (result * 100).toFixed(1)

  // DORA animation state
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStep((prev) => {
          if (prev >= DORA_STEPS.length - 1) {
            setPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [playing])

  const handlePlay = () => {
    if (step >= DORA_STEPS.length - 1) {
      setStep(0)
    }
    setPlaying(true)
  }

  const handlePause = () => setPlaying(false)

  const handleNext = () => {
    setPlaying(false)
    setStep((prev) => Math.min(prev + 1, DORA_STEPS.length - 1))
  }

  const handleReset = () => {
    setPlaying(false)
    setStep(0)
  }

  const currentStep = DORA_STEPS[step]

  return (
    <section className="section active" id="scale">
      <div className="section-header">
        <div className="section-label">Value and Tokenomics</div>
        <h1 className="section-title">55% on the pilot. 13.8% at scale. Directional. To validate.</h1>
        <p className="section-tagline">
          Three levels of value. Prove it on one use case, replicate at Wave 1, scale to the programme.
        </p>
      </div>

      {/* ── 1. Four cost layers ── */}
      <div className="cost-layers-label">Cost structure -- four layers</div>
      <div className="cost-layers-strip">
        {COST_LAYERS.map((layer) => (
          <div key={layer.letter} className="cost-layer-card">
            <div className="cost-layer-letter" style={{ color: layer.color }}>
              {layer.letter}
            </div>
            <div className="cost-layer-type-badge" style={{ borderColor: layer.color, color: layer.color }}>
              {layer.type}
            </div>
            <div className="cost-layer-name">{layer.label}</div>
            <div className="cost-layer-desc">{layer.description}</div>
          </div>
        ))}
      </div>

      {/* ── 2. DORA B&R animated reference scenario ── */}
      <div className="dora-section">
        <div className="dora-section-head">
          <div className="dora-section-title">DORA B&R -- Illustrative Reference Scenario</div>
          <div className="dora-section-subtitle">
            Layer D (usage-linked cost) modelled end-to-end for a single regulatory change run.
            Illustrative planning scenario. Not client facts. Assumptions are editable inputs.
          </div>
        </div>

        {/* Scenario assumptions */}
        <div className="dora-assumptions">
          <div className="dora-assumptions-head">Scenario assumptions</div>
          <div className="dora-assumptions-grid">
            <div className="dora-assump-row">
              <span className="dora-assump-key">Change packages</span>
              <span className="dora-assump-val">1 material change package</span>
            </div>
            <div className="dora-assump-row">
              <span className="dora-assump-key">Requirements structured</span>
              <span className="dora-assump-val">6 changed / interpreted requirements</span>
            </div>
            <div className="dora-assump-row">
              <span className="dora-assump-key">Affected controls</span>
              <span className="dora-assump-val">4 controls</span>
            </div>
            <div className="dora-assump-row">
              <span className="dora-assump-key">Affected Work Products</span>
              <span className="dora-assump-val">3 Work Products</span>
            </div>
            <div className="dora-assump-row">
              <span className="dora-assump-key">Applications screened</span>
              <span className="dora-assump-val">3,000 (deterministic)</span>
            </div>
            <div className="dora-assump-row">
              <span className="dora-assump-key">Applicability rate</span>
              <span className="dora-assump-val">5% -- 150 application cases</span>
            </div>
            <div className="dora-assump-row">
              <span className="dora-assump-key">Product Teams in scope</span>
              <span className="dora-assump-val">75 Product Teams x 2 applicable apps each</span>
            </div>
            <div className="dora-assump-row">
              <span className="dora-assump-key">Exception rate</span>
              <span className="dora-assump-val">15% -- 23 exception cases</span>
            </div>
          </div>
          <div className="dora-assumptions-note">
            Illustrative planning scenario. Not client facts. Assumptions are editable inputs in the full model.
          </div>
        </div>

        {/* Animated step flow */}
        <div className="dora-flow-panel">
          <div className="dora-flow-head">Step-by-step run walkthrough</div>

          <div className="dora-flow-track">
            {DORA_STEPS.map((s, i) => (
              <>
                <div key={`node-${s.id}`} className="dora-flow-node">
                  <div
                    className={`dora-flow-circle${step === i ? ' dora-circle-current' : step > i ? ' dora-circle-done' : ''}`}
                    style={step >= i ? { background: s.activeColor, borderColor: s.activeColor } : {}}
                  >
                    {i}
                  </div>
                  <div className={`dora-flow-node-label${step >= i ? ' dora-node-label-active' : ''}`}>
                    {s.shortLabel}
                  </div>
                </div>
                {i < DORA_STEPS.length - 1 && (
                  <div
                    key={`line-${s.id}`}
                    className={`dora-flow-line${step > i ? ' dora-flow-line-done' : ''}`}
                    style={step > i ? { background: DORA_STEPS[i + 1].activeColor } : {}}
                  />
                )}
              </>
            ))}
          </div>

          {/* Current step detail card */}
          <div className="dora-step-detail" style={{ borderLeftColor: currentStep.activeColor }}>
            <div className="dora-step-detail-meta">
              <span className="dora-step-num" style={{ color: currentStep.activeColor }}>
                Step {currentStep.id} of {DORA_STEPS.length - 1}
              </span>
              <span className="dora-step-name">{currentStep.shortLabel}</span>
            </div>
            <div className="dora-step-desc">{currentStep.description}</div>
            {currentStep.costNote && (
              <div className="dora-step-cost-note">{currentStep.costNote}</div>
            )}
          </div>

          {/* Running cost counter */}
          <div className="dora-cost-counter">
            <div className="dora-cost-counter-label">Cumulative token-only cost (illustrative)</div>
            <div className="dora-cost-counter-value">${currentStep.runningTotal.toFixed(2)}</div>
            <div className="dora-cost-counter-qual">
              Excludes fixed costs, human review, workflow, retrieval, and storage.
            </div>
          </div>

          {/* Playback controls */}
          <div className="dora-controls">
            {!playing ? (
              <button className="dora-btn dora-btn-primary" onClick={handlePlay}>
                {step >= DORA_STEPS.length - 1 ? 'Replay' : step === 0 ? 'Play' : 'Resume'}
              </button>
            ) : (
              <button className="dora-btn dora-btn-secondary" onClick={handlePause}>Pause</button>
            )}
            <button
              className="dora-btn dora-btn-secondary"
              onClick={handleNext}
              disabled={step >= DORA_STEPS.length - 1}
            >
              Next
            </button>
            <button className="dora-btn dora-btn-ghost" onClick={handleReset}>Reset</button>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="dora-breakdown">
          <div className="dora-breakdown-title">Token-only cost breakdown (illustrative)</div>
          <div className="dora-breakdown-rows">
            <div className="dora-breakdown-row">
              <span>Central AI analysis</span>
              <span className="dora-breakdown-fig">~$0.99</span>
            </div>
            <div className="dora-breakdown-row">
              <span>150 application cases (token-only)</span>
              <span className="dora-breakdown-fig">~$16.65</span>
            </div>
            <div className="dora-breakdown-row">
              <span>23 exception cases (additional escalation)</span>
              <span className="dora-breakdown-fig">~$1.47</span>
            </div>
            <div className="dora-breakdown-row dora-breakdown-total-row">
              <span>Total token-only (illustrative)</span>
              <span className="dora-breakdown-fig">~$19.11</span>
            </div>
          </div>
          <div className="dora-breakdown-disclaimer">
            This is not the total run cost. Excludes human review, workflow, retrieval, storage, evidence
            connectors, monitoring, support, and fixed investment. Prices are public benchmark only
            (as of Sep 2026), subject to contract and applicable discounts.
          </div>
        </div>

        {/* Model tier reference */}
        <div className="dora-model-ref">
          <div className="dora-model-ref-title">Model tier reference</div>
          <div className="dora-model-table-wrapper">
            <table className="dora-model-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Purpose</th>
                  <th>Benchmark input price</th>
                  <th>Benchmark output price</th>
                </tr>
              </thead>
              <tbody>
                {MODEL_TIERS.map((t) => (
                  <tr key={t.tier}>
                    <td>{t.tier}</td>
                    <td>{t.purpose}</td>
                    <td>{t.inputPrice}</td>
                    <td>{t.outputPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dora-model-ref-note">
            Public benchmark pricing as of September 2026. Subject to contract, volume, and regional
            pricing. Munich Re should evaluate on a bespoke test set before model selection.
          </div>
        </div>
      </div>

      {/* ── 3. Phase 3 aggregate value hypothesis (existing bridge) ── */}
      <div className="scale-phase-bridge-label">
        Phase 3 aggregate value hypothesis -- directional working assumption
      </div>

      {/* Scenario selector */}
      <div className="scale-scenarios">
        {scenarios.map((s: any, i: number) => (
          <button
            key={s.id}
            className={`scale-scenario-card${s.id === scenario.id ? ' active' : ''}`}
            onClick={() => setScenario(s.id)}
            style={
              s.id === scenario.id
                ? { borderColor: SCENARIO_COLORS[i], background: SCENARIO_COLORS[i] + '08' }
                : {}
            }
          >
            <div
              className="scale-scenario-name"
              style={s.id === scenario.id ? { color: SCENARIO_COLORS[i] } : {}}
            >
              {s.label}
            </div>
            <div className="scale-scenario-desc">{s.sublabel}</div>
            <div className="scale-scenario-figure" style={{ color: SCENARIO_COLORS[i] }}>
              {s.base * 100 < 10
                ? (s.base * 100).toFixed(1)
                : Math.round(s.base * 100)}
              %
              <span className="scale-scenario-range">
                ({s.lowLabel}--{s.highLabel})
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected scenario detail */}
      <div className="scale-scenario-panel" style={{ borderLeftColor: scenarioColor }}>
        <div className="scale-scenario-panel-top">
          <div className="scale-scenario-panel-figure" style={{ color: scenarioColor }}>
            {scenario.base * 100 < 10
              ? (scenario.base * 100).toFixed(1)
              : Math.round(scenario.base * 100)}
            %
          </div>
          <div className="scale-scenario-panel-meta">
            <div className="scale-scenario-panel-label">{scenario.label}</div>
            <div className="scale-scenario-panel-denom">Denominator: {scenario.denominator}</div>
            <div className="scale-scenario-panel-gate">Validated at: {scenario.gateTarget}</div>
          </div>
        </div>
        <div className="scale-scenario-panel-desc">{scenario.description}</div>
        {scenario.regulationScope && (
          <div className="scale-scenario-panel-scope">
            Regulation scope: {scenario.regulationScope}
          </div>
        )}
        <div className="scale-scenario-panel-qual">{scenario.qualifier}</div>
      </div>

      {/* Value bridge */}
      <div className="scale-bridge-header">
        <div className="scale-bridge-title">How 13.8% is derived -- directional working assumption</div>
        <div className="scale-bridge-qual">
          Four components multiply to arrive at the enterprise-level figure.
          Each is a working assumption to validate with operational data.
          Capacity released, not a headcount reduction. Illustrative planning assumption, not a commercial estimate.
        </div>
      </div>

      <div className="scale-bridge-grid">
        {bridge.map((component: any, i: number) => (
          <div key={component.id} className="scale-bridge-card">
            <div className="scale-bridge-symbol" style={{ color: COMPONENT_COLORS[i] }}>
              {component.symbol}
            </div>
            <div className="scale-bridge-comp-name">{component.component}</div>
            <div className="scale-bridge-value" style={{ color: COMPONENT_COLORS[i] }}>
              {component.label}
            </div>
            <div className="scale-bridge-range">Range: {component.rangeLabel}</div>
            <div className="scale-bridge-desc">{component.description}</div>
            <div className="scale-bridge-qualifier">{component.qualifier}</div>
            <div className="scale-bridge-validation">
              <span className="scale-val-label">Validation:</span> {component.validationPoint}
            </div>
          </div>
        ))}
        <div className="scale-bridge-result">
          <div className="scale-bridge-formula">A x B x C x D</div>
          <div className="scale-result-pct">{resultPct}%</div>
          <div className="scale-result-label">Capacity freed</div>
          <div className="scale-result-qual">
            Directional / working assumption / to validate<br />
            Capacity released, not headcount reduction<br />
            Illustrative planning assumption, not a commercial estimate
          </div>
        </div>
      </div>

      {/* Disclaimers */}
      <div className="scale-disclaimers">
        <div className="scale-disclaimer-item">
          <strong>13.8%</strong> represents capacity freed from directly addressed compliance work.
          It is not a workforce reduction commitment. To be validated through the operational pilot at
          Gate 2 (September 2027) and Gate 3 (March 2028).
        </div>
        <div className="scale-disclaimer-item">
          All cost and value figures are illustrative planning assumptions. Not commercial estimates.
          Model pricing figures are not shown without an as-of date and commercial contract reference.
        </div>
        <div className="scale-disclaimer-item">
          2,864 FTE is a working assumption subject to GTRF validation. Not a confirmed headcount figure.
          Used only as a denominator for capacity modelling.
        </div>
      </div>
    </section>
  )
}
