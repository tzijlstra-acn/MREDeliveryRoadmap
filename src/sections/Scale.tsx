import { VALUE_BRIDGE, VALUE_SCENARIOS } from '../../data/value-assumptions.js'
import { useStore } from '../store/index'

const bridge = VALUE_BRIDGE as any[]
const scenarios = VALUE_SCENARIOS as any[]

const COMPONENT_COLORS = ['#3456C5', '#5C4FC5', '#7A3EB1', '#C53A7B', '#E24B5A']

function ScenarioCard({ scenario, active }: { scenario: any; active: boolean }) {
  const setScenario = useStore((s) => s.setActiveScenario)
  return (
    <button
      className={`scale-scenario-card${active ? ' active' : ''}`}
      onClick={() => setScenario(scenario.id)}
    >
      <div className="scale-scenario-name">{scenario.label}</div>
      <div className="scale-scenario-desc">{scenario.sublabel}</div>
      {active && <div className="scale-scenario-active-dot" />}
    </button>
  )
}

export default function Scale() {
  const activeScenario = useStore((s) => s.activeScenario)
  const scenario = scenarios.find((s: any) => s.id === activeScenario) ?? scenarios[1]

  const result = bridge.reduce((acc: number, b: any) => acc * b.base, 1)
  const resultPct = (result * 100).toFixed(1)

  return (
    <section className="section active" id="scale">
      <div className="section-header">
        <div className="section-label">Value and Tokenomics</div>
        <h1 className="section-title">What does this cost and what value does it create?</h1>
        <p className="section-tagline">
          The 13.8% capacity-freed hypothesis is a directional working assumption derived from
          a four-component model. Each component will be validated against operational data
          during Phase 1 and Phase 2. This is an illustrative planning assumption, not a
          commercial estimate.
        </p>
      </div>

      {/* Scenario selector */}
      <div className="scale-scenarios">
        {scenarios.map((s: any) => (
          <ScenarioCard key={s.id} scenario={s} active={s.id === activeScenario} />
        ))}
      </div>

      {/* Value bridge */}
      <div className="scale-bridge-header">
        <div className="scale-bridge-title">13.8% capacity freed -- directional working assumption</div>
        <div className="scale-bridge-qual">
          Capacity released from directly addressed compliance work. Not a headcount reduction figure.
          All components are working assumptions to validate with operational data.
          Illustrative planning assumption, not a commercial estimate.
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
              <span className="scale-val-label">Validation point:</span> {component.validationPoint}
            </div>
          </div>
        ))}

        {/* Result card */}
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

      {/* Key disclaimers */}
      <div className="scale-disclaimers">
        <div className="scale-disclaimer-item">
          <strong>13.8%</strong> is a directional working assumption. It represents capacity
          freed from directly addressed compliance work, not an enterprise-wide headcount
          reduction. The figure will be validated or recalibrated with operational data at Gate 2
          (September 2027) and Gate 3 (March 2028).
        </div>
        <div className="scale-disclaimer-item">
          All cost and value figures are illustrative planning assumptions. They are not commercial
          estimates and are not binding on any commercial agreement. Model pricing figures are not
          shown without an as-of date and commercial contract reference.
        </div>
        <div className="scale-disclaimer-item">
          2,864 FTE is a working assumption subject to GTRF validation and is used only as a
          denominator for capacity modelling. It is not a confirmed headcount figure.
        </div>
      </div>
    </section>
  )
}
