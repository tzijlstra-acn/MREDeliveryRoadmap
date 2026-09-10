import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ARCH_LAYERS, ARCH_EVOLUTION } from '../../data/architecture.js'
import { useStore } from '../store/index'

type PhaseKey = 'today' | 'phase-1' | 'phase-2' | 'phase-3' | 'north-star'

const SCRUBBER: { id: PhaseKey; label: string; color: string }[] = [
  { id: 'today',      label: 'Today',       color: '#6B7280' },
  { id: 'phase-1',   label: 'Phase 1',      color: '#3456C5' },
  { id: 'phase-2',   label: 'Phase 2',      color: '#5C4FC5' },
  { id: 'phase-3',   label: 'Phase 3',      color: '#7A3EB1' },
  { id: 'north-star', label: 'North Star',  color: '#C53A7B' },
]

type LayerStatus = { status: string; note: string }

// Per-layer status derived from ARCH_EVOLUTION and architecture design
const LAYER_STATUS: Record<string, Record<PhaseKey, LayerStatus>> = {
  'layer-1': {
    today:       { status: 'Existing',    note: 'Three separate hubs with no shared case context; status assembled manually' },
    'phase-1':   { status: 'Augmented',   note: 'AI assistance in Compliance Hub and Product Hub for Backup and Restore scope' },
    'phase-2':   { status: 'Enhanced',    note: 'Shared case status visible in existing hubs; handovers automated' },
    'phase-3':   { status: 'CaaS view',   note: 'Compliance-as-a-Service experience across all live regulations' },
    'north-star': { status: 'Unified',    note: 'Full CaaS interface; 24-regulation portfolio with consistent status' },
  },
  'layer-2': {
    today:       { status: 'Manual',      note: 'Point-to-point integrations; manual status reconciliation; no shared ID' },
    'phase-1':   { status: 'Prototyped',  note: 'Integration facade designed and prototyped for pilot scope' },
    'phase-2':   { status: 'Live',        note: 'Integration facade live for all three hubs; common case ID operational' },
    'phase-3':   { status: 'Scaled',      note: 'Extended to Wave 2 and 3 regulations; connector library reusable' },
    'north-star': { status: 'Platform',   note: 'Fully automated integration layer serving 24 regulations' },
  },
  'layer-3': {
    today:       { status: 'None',        note: 'No durable workflow; approvals in email and spreadsheets' },
    'phase-1':   { status: 'Designed',    note: 'Approval gates and human-task model designed; pilot workflow tested' },
    'phase-2':   { status: 'Live',        note: 'Durable workflow engine live; automated handovers; exception queues' },
    'phase-3':   { status: 'Production',  note: 'Full orchestration at scale; BAU service operations running' },
    'north-star': { status: 'Automated',  note: 'Exception-driven operations; 24-regulation concurrent orchestration' },
  },
  'layer-4': {
    today:       { status: 'None',        note: 'No specialist AI agents; LLM use is ad hoc and ungoverned' },
    'phase-1':   { status: 'Deployed',    note: 'Three specialist agents with governed prompts and evaluation framework' },
    'phase-2':   { status: 'Extended',    note: 'Agents extended for applicability, evidence assembly and DDCR preparation' },
    'phase-3':   { status: 'Scaled',      note: 'Agent runtime at scale; multi-regulation; cost-per-regulation understood' },
    'north-star': { status: 'Optimised',  note: 'Continuous optimisation; economics validated across all 24 regulations' },
  },
  'layer-5': {
    today:       { status: 'Documents',   note: 'Regulations in documents and email; no canonical object model' },
    'phase-1':   { status: 'Initialised', note: 'Backup and Restore obligations in knowledge store; object model defined' },
    'phase-2':   { status: 'Wave 1 live', note: 'Wave 1 regulations loaded; interpretation workflow; reuse library growing' },
    'phase-3':   { status: 'Wave 1 + 2', note: 'Onboarding factory operational; Wave 1 and Wave 2 fully configured' },
    'north-star': { status: '24 regs',   note: 'Full portfolio coverage; automated onboarding factory proven' },
  },
  'layer-6': {
    today:       { status: 'Manual',      note: 'Evidence assembled manually; no provenance; freshness unknown' },
    'phase-1':   { status: 'Partial',     note: 'Priority sources connected for Backup and Restore; provenance tracked' },
    'phase-2':   { status: 'Automated',   note: 'Automated evidence assembly; verification rules live; DDCR status linked' },
    'phase-3':   { status: 'Full',        note: 'Connector library reusable; DDCR reporting operational across all live regs' },
    'north-star': { status: 'Continuous', note: 'Always-on evidence monitoring; real-time compliance status' },
  },
  'layer-7': {
    today:       { status: 'Existing',    note: 'Enterprise platform in place; AI-specific governance not yet defined' },
    'phase-1':   { status: 'Secured',     note: 'Identity, access, audit and data protection confirmed for pilot scope' },
    'phase-2':   { status: 'Monitored',   note: 'Agent and model quality monitoring; operational dashboards live' },
    'phase-3':   { status: 'Production',  note: 'Full service operations: SLAs, incident management, change control' },
    'north-star': { status: 'Enterprise', note: 'Fully governed AI service; continuous security and compliance posture' },
  },
}

const STATUS_MATURITY: Record<string, number> = {
  None: 0, Documents: 0, Manual: 0,
  Designed: 1, Prototyped: 1, Partial: 1, Initialised: 1,
  Augmented: 2, Deployed: 2, 'Wave 1 live': 2, Secured: 2, Live: 3,
  Extended: 3, Automated: 3, Enhanced: 3, Monitored: 3,
  Scaled: 4, Production: 4, CaaS: 4, Full: 4, 'Wave 1 + 2': 4,
  'CaaS view': 4,
  Optimised: 5, Platform: 5, '24 regs': 5, Continuous: 5, Unified: 5, Enterprise: 5,
  Existing: 2,
}

function maturityColor(status: string): { bg: string; color: string } {
  const m = STATUS_MATURITY[status] ?? 2
  if (m === 0) return { bg: '#FEE2E2', color: '#991B1B' }
  if (m === 1) return { bg: '#FEF3C7', color: '#92400E' }
  if (m === 2) return { bg: '#EFF6FF', color: '#1E40AF' }
  if (m === 3) return { bg: '#D1FAE5', color: '#065F46' }
  if (m === 4) return { bg: '#EDE9FE', color: '#5B21B6' }
  return { bg: '#FCE7F3', color: '#9D174D' }
}

const LAYER_ABBR: Record<string, string> = {
  experience: 'UX', integration: 'INT', workflow: 'WF',
  agent: 'AI', knowledge: 'KB', evidence: 'EV', platform: 'PLT',
}

const PHASE_INTERVAL_MS = 2800

function LayerDrawerContent({ layer, phase }: { layer: any; phase: PhaseKey }) {
  const st = LAYER_STATUS[layer.id]?.[phase]
  const { bg, color } = maturityColor(st?.status ?? '')
  return (
    <div className="arch-drawer-body">
      <div className="arch-drawer-meta">
        <span className="chip" style={{ background: bg, color }}>{st?.status ?? '--'}</span>
        <span className="chip">{layer.layer}</span>
      </div>
      <p className="arch-drawer-desc">{st?.note}</p>
      <p className="arch-drawer-desc" style={{ marginTop: 6 }}>{layer.description}</p>
      {layer.constraint && (
        <div className="arch-drawer-constraint">
          <strong>Design constraint:</strong> {layer.constraint}
        </div>
      )}
      <div className="arch-drawer-components">
        <div className="arch-drawer-comp-label">Components</div>
        <ul>
          {(layer.components as string[]).map((c: string) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Architecture() {
  const [phase, setPhase] = useState<PhaseKey>('today')
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const openDrawer = useStore((s) => s.openDrawer)

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setPhase((prev) => {
          const idx = SCRUBBER.findIndex((p) => p.id === prev)
          if (idx >= SCRUBBER.length - 1) { setPlaying(false); return prev }
          return SCRUBBER[idx + 1].id
        })
      }, PHASE_INTERVAL_MS)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [playing])

  const activePhaseConfig = SCRUBBER.find((p) => p.id === phase)!

  function handleLayerClick(layer: any) {
    openDrawer(layer.name, <LayerDrawerContent layer={layer} phase={phase} />)
  }

  // ARCH_EVOLUTION column for current phase
  const evoKey = phase === 'today' ? 'today'
    : phase === 'phase-1' ? 'phase1'
    : phase === 'phase-2' ? 'phase2'
    : phase === 'phase-3' ? 'phase3'
    : 'phase3'  // north-star reuses phase3 text as directional

  const layers = ARCH_LAYERS as any[]
  const evo = ARCH_EVOLUTION as any[]

  return (
    <section className="section active" id="architecture">
      <div className="section-header">
        <div className="section-label">Architecture Evolution</div>
        <h1 className="section-title">How does the infrastructure evolve?</h1>
        <p className="section-tagline">
          Seven-layer target architecture evolving from today through three delivery phases.
          Click any layer for detail. Use the phase scrubber to animate the evolution.
        </p>
      </div>

      {/* Phase scrubber */}
      <div className="arch-scrubber">
        {SCRUBBER.map((p) => (
          <button
            key={p.id}
            className={`arch-phase-btn${phase === p.id ? ' active' : ''}`}
            style={phase === p.id ? { background: p.color, color: '#fff', borderColor: p.color } : {}}
            onClick={() => { setPhase(p.id); setPlaying(false) }}
          >
            {p.label}
          </button>
        ))}
        <button
          className={`arch-play-btn${playing ? ' playing' : ''}`}
          onClick={() => setPlaying((v) => !v)}
          title={playing ? 'Pause' : 'Play animation'}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="2" width="4" height="12" rx="1" fill="currentColor"/><rect x="9" y="2" width="4" height="12" rx="1" fill="currentColor"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="3,2 13,8 3,14" fill="currentColor"/></svg>
          )}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Phase progress dots */}
      <div className="arch-progress">
        {SCRUBBER.map((p, i) => (
          <div
            key={p.id}
            className={`arch-progress-dot${phase === p.id ? ' active' : ''}`}
            style={phase === p.id ? { background: p.color } : {}}
          />
        ))}
        <div className="arch-progress-label" style={{ color: activePhaseConfig.color }}>
          {activePhaseConfig.label}
        </div>
      </div>

      {/* Architecture canvas */}
      <div className="arch-canvas">
        <div className="arch-layers-col">
          {layers.map((layer) => {
            const st = LAYER_STATUS[layer.id]?.[phase]
            const { bg, color } = maturityColor(st?.status ?? '')
            return (
              <motion.button
                key={layer.id}
                layout
                className="arch-layer-card"
                onClick={() => handleLayerClick(layer)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.18 }}
              >
                <div className="arch-layer-abbr">{LAYER_ABBR[layer.layer] ?? '?'}</div>
                <div className="arch-layer-info">
                  <div className="arch-layer-name">{layer.name}</div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phase + layer.id}
                      className="arch-layer-status"
                      style={{ background: bg, color }}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22 }}
                    >
                      {st?.status ?? '--'}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phase + layer.id + '-note'}
                    className="arch-layer-note"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {st?.note}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>

        {/* Evolution panel */}
        <div className="arch-evo-panel">
          <div className="arch-evo-header" style={{ borderLeftColor: activePhaseConfig.color }}>
            What changes in {activePhaseConfig.label}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {evo.map((row: any) => (
                <div key={row.area} className="arch-evo-row">
                  <div className="arch-evo-area">{row.area}</div>
                  <div className="arch-evo-text">
                    {phase === 'north-star' ? row.phase3 : (row as any)[evoKey] ?? row.phase3}
                  </div>
                </div>
              ))}
              {phase === 'north-star' && (
                <div className="arch-north-star-note">
                  North Star: all 24 regulations operational as a governed Compliance-as-a-Service.
                  Specific timing is subject to portfolio decisions at Gate 3 and Gate 4.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
