import { useState } from 'react'
import { RUNS, EXECUTION_MECHANISMS } from '../../data/runs.js'
import { useStore } from '../store/index'

const runs = RUNS as any[]
const execMechs = EXECUTION_MECHANISMS as any[]

const EXEC_META: Record<string, { label: string; color: string; abbr: string; shape: string }> = {
  'deterministic-automation': { label: 'Automated', color: '#1D4ED8', abbr: 'AUTO', shape: 'square' },
  'generative-ai':            { label: 'Generative AI', color: '#7C3AED', abbr: 'GEN-AI', shape: 'circle' },
  'agentic-execution':        { label: 'Agentic', color: '#0891B2', abbr: 'AGENT', shape: 'hex' },
  'human-gate':               { label: 'Human Gate', color: '#059669', abbr: 'GATE', shape: 'diamond' },
  'human':                    { label: 'Human Action', color: '#6B7280', abbr: 'HUMAN', shape: 'rect' },
}

function ShapeIcon({ type, size = 28 }: { type: string; size?: number }) {
  const m = EXEC_META[type] ?? EXEC_META['human']
  const c = m.color
  if (m.shape === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="12" fill={c + '22'} stroke={c} strokeWidth="2" />
        <text x="14" y="18" textAnchor="middle" fontSize="7" fontWeight="800" fill={c} fontFamily="Inter,sans-serif">{m.abbr.slice(0,3)}</text>
      </svg>
    )
  }
  if (m.shape === 'hex') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28">
        <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill={c + '22'} stroke={c} strokeWidth="2" />
        <text x="14" y="17.5" textAnchor="middle" fontSize="6.5" fontWeight="800" fill={c} fontFamily="Inter,sans-serif">{m.abbr.slice(0,5)}</text>
      </svg>
    )
  }
  if (m.shape === 'diamond') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28">
        <rect x="4" y="4" width="20" height="20" fill={c + '22'} stroke={c} strokeWidth="2" rx="2" transform="rotate(45 14 14)" />
        <text x="14" y="17.5" textAnchor="middle" fontSize="7" fontWeight="800" fill={c} fontFamily="Inter,sans-serif">H</text>
      </svg>
    )
  }
  if (m.shape === 'square') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28">
        <rect x="2" y="2" width="24" height="24" fill={c + '22'} stroke={c} strokeWidth="2" rx="3" />
        <text x="14" y="17.5" textAnchor="middle" fontSize="6.5" fontWeight="800" fill={c} fontFamily="Inter,sans-serif">AUTO</text>
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 28 28">
      <rect x="2" y="6" width="24" height="16" fill={c + '22'} stroke={c} strokeWidth="2" rx="3" />
      <text x="14" y="17" textAnchor="middle" fontSize="6" fontWeight="800" fill={c} fontFamily="Inter,sans-serif">HUMAN</text>
    </svg>
  )
}

function StepDrawerContent({ step }: { step: any }) {
  const m = EXEC_META[step.executionMechanism] ?? EXEC_META['human']
  return (
    <div className="runs-drawer-body">
      <div className="runs-drawer-meta">
        <span className="chip" style={{ background: m.color + '22', color: m.color }}>{m.label}</span>
        {step.agentName && (
          <span className="chip">{step.agentName} {step.agentNote ? `(${step.agentNote})` : ''}</span>
        )}
        {step.isHumanGate && <span className="chip" style={{ background: '#D1FAE5', color: '#065F46' }}>Human gate</span>}
      </div>
      <p className="runs-drawer-desc">{step.detail}</p>
      <div className="runs-drawer-fields">
        <div className="runs-drawer-field"><span className="runs-field-label">System</span><span>{step.system}</span></div>
        {step.modelTier && <div className="runs-drawer-field"><span className="runs-field-label">Model tier</span><span>{step.modelTier}</span></div>}
        {step.lod && <div className="runs-drawer-field"><span className="runs-field-label">Line of Defence</span><span>{step.lod}</span></div>}
        {step.authorityRule && <div className="runs-drawer-field"><span className="runs-field-label">Authority rule</span><span>{step.authorityRule}</span></div>}
        {step.elapsedTime && <div className="runs-drawer-field"><span className="runs-field-label">Elapsed time</span><span>{step.elapsedTime}</span></div>}
      </div>
    </div>
  )
}

export default function Runs() {
  const [activeRun, setActiveRun] = useState<string>('run-a')
  const openDrawer = useStore((s) => s.openDrawer)

  const run = runs.find((r: any) => r.id === activeRun) ?? runs[0]

  function handleStep(step: any) {
    openDrawer(`Step: ${step.label}`, <StepDrawerContent step={step} />)
  }

  return (
    <section className="section active" id="runs">
      <div className="section-header">
        <div className="section-label">Obligation Chain and Runs</div>
        <h1 className="section-title">What happens when a requirement changes?</h1>
        <p className="section-tagline">
          Three execution runs show how the agentic platform handles a regulatory change from
          detection through to DDCR update. Human approval gates are preserved at every
          accountable decision point.
        </p>
      </div>

      {/* Run selector */}
      <div className="runs-selector">
        {runs.map((r: any) => (
          <button
            key={r.id}
            className={`tab-btn${activeRun === r.id ? ' active' : ''}`}
            onClick={() => setActiveRun(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Run summary */}
      <div className="runs-summary-card">
        <div className="runs-summary-row">
          <div>
            <div className="runs-summary-trigger-label">Trigger</div>
            <div className="runs-summary-trigger">{run.trigger}</div>
          </div>
          <div>
            <div className="runs-summary-trigger-label">Output system</div>
            <div className="runs-summary-trigger">{run.outputSystem}</div>
          </div>
          <div>
            <div className="runs-summary-trigger-label">Output</div>
            <div className="runs-summary-trigger">{run.outputArtifact}</div>
          </div>
        </div>
        <p className="runs-summary-desc">{run.description}</p>
      </div>

      {/* Step chain */}
      <div className="runs-chain-scroll">
        <div className="runs-chain">
          {(run.steps as any[]).map((step: any, i: number) => {
            const m = EXEC_META[step.executionMechanism] ?? EXEC_META['human']
            return (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  className="runs-step"
                  onClick={() => handleStep(step)}
                  style={{ borderColor: m.color }}
                >
                  <div className="runs-step-shape">
                    <ShapeIcon type={step.executionMechanism} size={32} />
                  </div>
                  <div className="runs-step-num" style={{ color: m.color }}>Step {i + 1}</div>
                  <div className="runs-step-label">{step.label}</div>
                  {step.agentName && (
                    <div className="runs-step-agent" style={{ color: m.color }}>
                      {step.agentName}
                    </div>
                  )}
                  <div
                    className="runs-step-type"
                    style={{ background: m.color + '22', color: m.color }}
                  >
                    {m.label}
                  </div>
                </button>
                {i < run.steps.length - 1 && (
                  <div className="runs-step-arrow">
                    <svg width="24" height="16" viewBox="0 0 24 16">
                      <path d="M0 8 H18 M14 3 L20 8 L14 13" stroke="#D1D5DB" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Execution type legend */}
      <div className="runs-legend">
        {Object.entries(EXEC_META).map(([key, m]) => (
          <div key={key} className="runs-legend-item">
            <ShapeIcon type={key} size={20} />
            <span>{m.label}</span>
          </div>
        ))}
        <span className="runs-legend-note">Click any step for detail. Human approval gates are non-bypassable.</span>
      </div>
    </section>
  )
}
