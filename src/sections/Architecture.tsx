import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ARCH_LAYERS, ARCH_EVOLUTION } from '../../data/architecture.js'
import { useStore } from '../store/index'

type PhaseKey = 'today' | 'phase-1' | 'phase-2' | 'phase-3' | 'north-star'

const SCRUBBER: { id: PhaseKey; label: string; color: string }[] = [
  { id: 'today',       label: 'Today',      color: '#6B7280' },
  { id: 'phase-1',    label: 'Phase 1',     color: '#3456C5' },
  { id: 'phase-2',    label: 'Phase 2',     color: '#5C4FC5' },
  { id: 'phase-3',    label: 'Phase 3',     color: '#7A3EB1' },
  { id: 'north-star', label: 'North Star',  color: '#C53A7B' },
]

type LayerStatus = { status: string; note: string }

const LAYER_STATUS: Record<string, Record<PhaseKey, LayerStatus>> = {
  'layer-1': {
    today:        { status: 'Existing',    note: 'Three separate hubs with no shared case context; status assembled manually' },
    'phase-1':    { status: 'Augmented',   note: 'AI assistance in Compliance Hub and Product Hub for Backup and Restore scope' },
    'phase-2':    { status: 'Enhanced',    note: 'Shared case status visible in existing hubs; handovers automated' },
    'phase-3':    { status: 'CaaS view',   note: 'Compliance-as-a-Service experience across all live regulations' },
    'north-star': { status: 'Unified',     note: 'Full CaaS interface; 24-regulation portfolio with consistent status' },
  },
  'layer-2': {
    today:        { status: 'Manual',      note: 'Point-to-point integrations; manual status reconciliation; no shared ID' },
    'phase-1':    { status: 'Prototyped',  note: 'Integration facade designed and prototyped for pilot scope' },
    'phase-2':    { status: 'Live',        note: 'Integration facade live for all three hubs; common case ID operational' },
    'phase-3':    { status: 'Scaled',      note: 'Extended to Wave 2 and 3 regulations; connector library reusable' },
    'north-star': { status: 'Platform',    note: 'Fully automated integration layer serving 24 regulations' },
  },
  'layer-3': {
    today:        { status: 'None',        note: 'No durable workflow; approvals in email and spreadsheets' },
    'phase-1':    { status: 'Designed',    note: 'Approval gates and human-task model designed; pilot workflow tested' },
    'phase-2':    { status: 'Live',        note: 'Durable workflow engine live; automated handovers; exception queues' },
    'phase-3':    { status: 'Production',  note: 'Full orchestration at scale; BAU service operations running' },
    'north-star': { status: 'Automated',   note: 'Exception-driven operations; 24-regulation concurrent orchestration' },
  },
  'layer-4': {
    today:        { status: 'None',        note: 'No specialist AI agents; LLM use is ad hoc and ungoverned' },
    'phase-1':    { status: 'Deployed',    note: 'Three specialist agents with governed prompts and evaluation framework' },
    'phase-2':    { status: 'Extended',    note: 'Agents extended for applicability, evidence assembly and DDCR preparation' },
    'phase-3':    { status: 'Scaled',      note: 'Agent runtime at scale; multi-regulation; cost-per-regulation understood' },
    'north-star': { status: 'Optimised',   note: 'Continuous optimisation; economics validated across all 24 regulations' },
  },
  'layer-5': {
    today:        { status: 'Documents',   note: 'Regulations in documents and email; no canonical object model' },
    'phase-1':    { status: 'Initialised', note: 'Backup and Restore obligations in knowledge store; object model defined' },
    'phase-2':    { status: 'Wave 1 live', note: 'Wave 1 regulations loaded; interpretation workflow; reuse library growing' },
    'phase-3':    { status: 'Wave 1 + 2',  note: 'Onboarding factory operational; Wave 1 and Wave 2 fully configured' },
    'north-star': { status: '24 regs',     note: 'Full portfolio coverage; automated onboarding factory proven' },
  },
  'layer-6': {
    today:        { status: 'Manual',      note: 'Evidence assembled manually; no provenance; freshness unknown' },
    'phase-1':    { status: 'Partial',     note: 'Priority sources connected for Backup and Restore; provenance tracked' },
    'phase-2':    { status: 'Automated',   note: 'Automated evidence assembly; verification rules live; DDCR status linked' },
    'phase-3':    { status: 'Full',        note: 'Connector library reusable; DDCR reporting operational across all live regs' },
    'north-star': { status: 'Continuous',  note: 'Always-on evidence monitoring; real-time compliance status' },
  },
  'layer-7': {
    today:        { status: 'Existing',    note: 'Enterprise platform in place; AI-specific governance not yet defined' },
    'phase-1':    { status: 'Secured',     note: 'Identity, access, audit and data protection confirmed for pilot scope' },
    'phase-2':    { status: 'Monitored',   note: 'Agent and model quality monitoring; operational dashboards live' },
    'phase-3':    { status: 'Production',  note: 'Full service operations: SLAs, incident management, change control' },
    'north-star': { status: 'Enterprise',  note: 'Fully governed AI service; continuous security and compliance posture' },
  },
}

const STATUS_MATURITY: Record<string, number> = {
  None: 0, Documents: 0, Manual: 0,
  Designed: 1, Prototyped: 1, Partial: 1, Initialised: 1,
  Augmented: 2, Deployed: 2, 'Wave 1 live': 2, Secured: 2, Existing: 2, Live: 3,
  Extended: 3, Automated: 3, Enhanced: 3, Monitored: 3,
  Scaled: 4, Production: 4, Full: 4, 'Wave 1 + 2': 4, 'CaaS view': 4,
  Optimised: 5, Platform: 5, '24 regs': 5, Continuous: 5, Unified: 5, Enterprise: 5,
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

const LAYER_META = [
  { id: 'layer-1', abbr: 'UX',  name: 'Experience',  icon: '▤' },
  { id: 'layer-2', abbr: 'INT', name: 'Integration',  icon: '⇄' },
  { id: 'layer-3', abbr: 'WF',  name: 'Workflow',     icon: '↻' },
  { id: 'layer-4', abbr: 'AI',  name: 'Agent',        icon: '◈' },
  { id: 'layer-5', abbr: 'KB',  name: 'Knowledge',    icon: '◉' },
  { id: 'layer-6', abbr: 'EV',  name: 'Evidence',     icon: '✓' },
  { id: 'layer-7', abbr: 'PLT', name: 'Platform',     icon: '▣' },
]

const PHASE_INTERVAL_MS = 2200

/* ---------- visual flow diagram ---------- */
function ArchFlowDiagram({ phase, phaseColor, playing }: { phase: PhaseKey; phaseColor: string; playing: boolean }) {
  const layers = ARCH_LAYERS as any[]

  return (
    <div className="arch-flow-diagram">
      {LAYER_META.map((meta, i) => {
        const layer = layers.find((l: any) => l.id === meta.id) ?? {}
        const st = LAYER_STATUS[meta.id]?.[phase]
        const { bg, color } = maturityColor(st?.status ?? '')
        const maturityLevel = STATUS_MATURITY[st?.status ?? ''] ?? 0
        const fillPct = Math.min(100, maturityLevel * 20)
        const isLast = i === LAYER_META.length - 1

        return (
          <div key={meta.id} className="arch-flow-node-wrap">
            <motion.div
              className="arch-flow-node"
              key={phase + meta.id}
              layout
              initial={{ opacity: 0.5, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <div className="arch-flow-node-left">
                <div className="arch-flow-node-abbr" style={{ background: color, color: '#fff' }}>
                  {meta.abbr}
                </div>
                <div className="arch-flow-node-bar-track">
                  <motion.div
                    className="arch-flow-node-bar-fill"
                    key={phase + meta.id + '-fill'}
                    initial={{ width: '0%' }}
                    animate={{ width: `${fillPct}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                    style={{ background: phaseColor }}
                  />
                </div>
              </div>
              <div className="arch-flow-node-mid">
                <div className="arch-flow-node-name">{meta.name}</div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase + meta.id + '-st'}
                    className="arch-flow-status-chip"
                    style={{ background: bg, color }}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {st?.status ?? '--'}
                  </motion.span>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase + meta.id + '-note'}
                  className="arch-flow-node-note"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {st?.note}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            {!isLast && (
              <div className={`arch-flow-arrow${playing ? ' arch-flow-arrow-pulse' : ''}`}
                style={{ '--arrow-color': phaseColor } as React.CSSProperties}>
                <div className="arch-flow-arrow-line" style={{ background: phaseColor + '40' }} />
                <div className="arch-flow-packet" style={{ background: phaseColor }} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ---------- drawer content ---------- */
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

/* ---------- main component ---------- */
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
          return SCRUBBER[(idx + 1) % SCRUBBER.length].id
        })
      }, PHASE_INTERVAL_MS)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [playing])

  const activePhaseConfig = SCRUBBER.find((p) => p.id === phase)!
  const layers = ARCH_LAYERS as any[]
  const evo = ARCH_EVOLUTION as any[]

  const evoKey = phase === 'today' ? 'today'
    : phase === 'phase-1' ? 'phase1'
    : phase === 'phase-2' ? 'phase2'
    : 'phase3'

  function handleLayerClick(layer: any) {
    setPlaying(false)
    openDrawer(layer.name, <LayerDrawerContent layer={layer} phase={phase} />)
  }

  return (
    <section className="section active" id="architecture">
      <div className="section-header">
        <div className="section-label">Architecture Evolution</div>
        <h1 className="section-title">Seven layers. Five phases. One continuous transformation.</h1>
        <p className="section-tagline">
          Watch the stack evolve from manual to AI-native. Click any layer for detail.
        </p>
        <div className="arch-headless-callout">
          <span className="arch-headless-pill">Core design principle</span>
          Experience in existing hubs. Headless execution behind them. Transparent control throughout.
          Users remain in Compliance Hub, Product Hub, and DDCR. Orchestration and agents run behind those experiences.
        </div>
      </div>

      {/* Scrubber */}
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
          title={playing ? 'Pause' : 'Play continuous loop'}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 16 16"><rect x="3" y="2" width="4" height="12" rx="1" fill="currentColor"/><rect x="9" y="2" width="4" height="12" rx="1" fill="currentColor"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16"><polygon points="3,2 13,8 3,14" fill="currentColor"/></svg>
          )}
          {playing ? 'Pause' : 'Play loop'}
        </button>
      </div>

      {/* Phase progress dots */}
      <div className="arch-progress">
        {SCRUBBER.map((p) => (
          <div
            key={p.id}
            className={`arch-progress-dot${phase === p.id ? ' active' : ''}`}
            style={phase === p.id ? { background: p.color } : {}}
            onClick={() => { setPhase(p.id); setPlaying(false) }}
          />
        ))}
        <motion.div
          key={phase}
          className="arch-progress-label"
          style={{ color: activePhaseConfig.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activePhaseConfig.label}
        </motion.div>
      </div>

      {/* Main canvas: flow diagram + evolution panel */}
      <div className="arch-canvas">

        {/* Visual flow diagram */}
        <ArchFlowDiagram
          phase={phase}
          phaseColor={activePhaseConfig.color}
          playing={playing}
        />

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
                <div key={row.area} className="arch-evo-row"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const layer = layers.find((l: any) =>
                      (l.name?.toLowerCase() ?? '').includes(row.area.toLowerCase()) ||
                      row.area.toLowerCase().includes((l.layer ?? '').toLowerCase())
                    )
                    if (layer) handleLayerClick(layer)
                  }}
                >
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
              {playing && (
                <div className="arch-loop-note">
                  Loop playing -- {activePhaseConfig.label}. Click Pause to step manually.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
