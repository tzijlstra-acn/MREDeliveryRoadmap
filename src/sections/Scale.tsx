import { VALUE_BRIDGE, VALUE_SCENARIOS } from '../../data/value-assumptions.js'
import { useStore } from '../store/index'

const bridge = VALUE_BRIDGE as any[]
const scenarios = VALUE_SCENARIOS as any[]

const SCENARIO_COLORS = ['#3456C5', '#5C4FC5', '#7A3EB1']
const COMPONENT_COLORS = ['#3456C5', '#5C4FC5', '#7A3EB1', '#C53A7B', '#E24B5A']

export default function Scale() {
  const activeScenario = useStore((s) => s.activeScenario)
  const setScenario = useStore((s) => s.setActiveScenario)

  const scenarioIdx = Math.max(0, scenarios.findIndex((s: any) => s.id === activeScenario))
  const scenario = scenarios[scenarioIdx] ?? scenarios[2]
  const scenarioColor = SCENARIO_COLORS[scenarioIdx] ?? '#7A3EB1'

  const result = bridge.reduce((acc: number, b: any) => acc * b.base, 1)
  const resultPct = (result * 100).toFixed(1)

  return (
    <section className="section active" id="scale">
      <div className="section-header">
        <div className="section-label">Value and Tokenomics</div>
        <h1 className="section-title">55% on the pilot. 13.8% at scale. Directional. To validate.</h1>
        <p className="section-tagline">
          Three levels of value. Prove it on one use case, replicate at Wave 1, scale to the enterprise.
        </p>
      </div>

      {/* Scenario selector */}
      <div className="scale-scenarios">
        {scenarios.map((s: any, i: number) => (
          <button
            key={s.id}
            className={`scale-scenario-card${s.id === scenario.id ? ' active' : ''}`}
            onClick={() => setScenario(s.id)}
            style={s.id === scenario.id ? { borderColor: SCENARIO_COLORS[i], background: SCENARIO_COLORS[i] + '08' } : {}}
          >
            <div className="scale-scenario-name" style={s.id === scenario.id ? { color: SCENARIO_COLORS[i] } : {}}>
              {s.label}
            </div>
            <div className="scale-scenario-desc">{s.sublabel}</div>
            <div className="scale-scenario-figure" style={{ color: SCENARIO_COLORS[i] }}>
              {(s.base * 100 < 10 ? (s.base * 100).toFixed(1) : Math.round(s.base * 100))}%
              <span className="scale-scenario-range">({s.lowLabel}--{s.highLabel})</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected scenario detail */}
      <div className="scale-scenario-panel" style={{ borderLeftColor: scenarioColor }}>
        <div className="scale-scenario-panel-top">
          <div className="scale-scenario-panel-figure" style={{ color: scenarioColor }}>
            {scenario.base * 100 < 10 ? (scenario.base * 100).toFixed(1) : Math.round(scenario.base * 100)}%
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
          It is not a workforce reduction commitment. To be validated through the operational pilot at Gate 2
          (September 2027) and Gate 3 (March 2028).
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
