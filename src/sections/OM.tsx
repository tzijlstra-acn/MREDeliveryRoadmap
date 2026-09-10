import { useState } from 'react'
import { useStore } from '../store/index'
import type { OmDimension } from '../store/index'

type Stage = 'current' | 'phase-1' | 'phase-2' | 'phase-3' | 'north-star'

const STAGES: { id: Stage; label: string }[] = [
  { id: 'current',    label: 'Today' },
  { id: 'phase-1',   label: 'Month 6' },
  { id: 'phase-2',   label: 'Month 12' },
  { id: 'phase-3',   label: 'Month 18' },
  { id: 'north-star', label: 'North Star' },
]

const DIMENSIONS: {
  id: OmDimension
  label: string
  color: string
  journey: Record<Stage, { headline: string; detail: string }>
}[] = [
  {
    id: 'product-service-portfolio',
    label: 'Product and Service Portfolio',
    color: '#3456C5',
    journey: {
      current:    { headline: 'Manual compliance delivery', detail: 'Compliance managed through manual processes, email, spreadsheets. No shared case model. Evidence assembled per requirement.' },
      'phase-1':  { headline: 'Piloted for Backup and Restore', detail: 'Agentic compliance live for the DORA Backup and Restore reference scenario. Single end-to-end process automated with human gates.' },
      'phase-2':  { headline: 'Wave 1 regulations live', detail: 'Compliance-as-a-Service for Wave 1 regulation set. Onboarding factory operational. Reusable components in use.' },
      'phase-3':  { headline: 'Portfolio service established', detail: 'Compliance-as-a-Service covering all live regulations. Service catalogue published. Self-service regulation onboarding in operation.' },
      'north-star': { headline: 'CaaS for 24 regulations', detail: 'Full 24-regulation portfolio served as an automated compliance service. Scale economics validated and documented.' },
    }
  },
  {
    id: 'organization-processes',
    label: 'Organisation and Processes',
    color: '#5C4FC5',
    journey: {
      current:    { headline: 'Siloed, manual and reactive', detail: 'Three separate teams and processes. Compliance triggered by regulatory calendar, not event-driven. High manual handover effort.' },
      'phase-1':  { headline: 'Governance model established', detail: 'Programme governance running. Roles and decision rights confirmed. Human-in-the-Loop controls in place for pilot scope.' },
      'phase-2':  { headline: 'Automated orchestration', detail: 'Case-state model live. Automated handovers across all three hubs. Exception-driven human intervention. Service model drafted.' },
      'phase-3':  { headline: 'Governed service model', detail: 'Operating model embedded with confirmed SLAs, incident management and BAU team. Target operating model document approved.' },
      'north-star': { headline: 'Industrialised compliance ops', detail: 'Continuous event-driven compliance operations. Human effort concentrated on high-value interpretation and approval decisions.' },
    }
  },
  {
    id: 'technology-platforms',
    label: 'Technology and Platforms',
    color: '#7A3EB1',
    journey: {
      current:    { headline: 'Separate systems, no shared state', detail: 'Three hubs with no shared case identity. Evidence assembled manually. No agent capability. Ad hoc LLM use ungoverned.' },
      'phase-1':  { headline: 'Integration facade and agents', detail: 'Integration facade prototyped. Three specialist agents deployed. Human-task model and audit logging live.' },
      'phase-2':  { headline: 'End-to-end orchestration live', detail: 'Durable workflow engine operational. Evidence automation live. Shared case state across all hubs. DDCR integration complete.' },
      'phase-3':  { headline: 'Production-grade platform', detail: 'Full production resilience, monitoring and observability. Agent runtime at scale. Compliance-as-a-Service v1 published.' },
      'north-star': { headline: 'Self-improving platform', detail: 'Continuous model optimisation. 24-regulation concurrent processing. Evidence connectors covering full application estate.' },
    }
  },
  {
    id: 'people',
    label: 'People and Skills',
    color: '#C53A7B',
    journey: {
      current:    { headline: 'Compliance expertise manual-dominant', detail: 'Compliance managed by experienced professionals with limited AI tooling. Capacity is the primary constraint. SME bottlenecks at interpretation and evidence review.' },
      'phase-1':  { headline: 'Pilot team trained', detail: 'Pilot user cohort trained on Compliance Hub and Product Hub with AI assistance. Governance roles confirmed. AI literacy programme started.' },
      'phase-2':  { headline: 'Wave 1 users onboarded', detail: 'Wave 1 user groups trained. Adoption metrics baseline established. Capability transfer plan in progress. SME time freed from manual tasks.' },
      'phase-3':  { headline: 'BAU team established', detail: 'BAU team operational. Service ownership confirmed. Internal capability growing. 13.8% capacity freed (directional / working assumption -- to validate with operational data).' },
      'north-star': { headline: 'AI-native compliance professionals', detail: 'Compliance professionals focused on interpretation, approval and exception decisions. Routine automation fully embedded.' },
    }
  },
  {
    id: 'value-management',
    label: 'Value Management',
    color: '#E24B5A',
    journey: {
      current:    { headline: 'No quantified value baseline', detail: 'Compliance cost and effort not formally measured. No benchmark for capacity freed by automation. Value case directional only.' },
      'phase-1':  { headline: 'Baseline established', detail: 'Effort, cycle time and rework baseline captured. Measurement framework defined. KPIs agreed with Executive Sponsor.' },
      'phase-2':  { headline: 'Early value evidence', detail: 'First operational data from pilot. Value hypothesis being tested. 13.8% directional assumption being validated with real cases.' },
      'phase-3':  { headline: 'Value case validated or recalibrated', detail: 'Before-and-after measurement completed. Value case published with validated or recalibrated assumption. Scale business case evidence-based.' },
      'north-star': { headline: 'Value realisation tracked as service SLA', detail: 'Ongoing value measurement embedded in service operations. Model economics and per-regulation ROI tracked continuously.' },
    }
  },
]

const STAGE_COLORS: Record<Stage, string> = {
  current:    '#6B7280',
  'phase-1':  '#3456C5',
  'phase-2':  '#5C4FC5',
  'phase-3':  '#7A3EB1',
  'north-star': '#C53A7B',
}

export default function OM() {
  const [activeStage, setActiveStage] = useState<Stage>('current')
  const [activeDim, setActiveDim] = useState<OmDimension>('all')

  const visibleDims = activeDim === 'all'
    ? DIMENSIONS
    : DIMENSIONS.filter((d) => d.id === activeDim)

  return (
    <section className="section active" id="om">
      <div className="section-header">
        <div className="section-label">Target Operating Model</div>
        <h1 className="section-title">How does the operating model change?</h1>
        <p className="section-tagline">
          Five-dimension transformation map showing the journey from today to North Star.
          Select a stage to see what changes across Product Portfolio, Organisation, Technology,
          People and Value Management.
        </p>
      </div>

      {/* Stage selector */}
      <div className="om-stage-bar">
        {STAGES.map((s) => (
          <button
            key={s.id}
            className={`om-stage-btn${activeStage === s.id ? ' active' : ''}`}
            style={activeStage === s.id ? { background: STAGE_COLORS[s.id], color: '#fff', borderColor: STAGE_COLORS[s.id] } : {}}
            onClick={() => setActiveStage(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Dimension filter */}
      <div className="om-dim-filter">
        <button
          className={`om-dim-btn${activeDim === 'all' ? ' active' : ''}`}
          onClick={() => setActiveDim('all')}
        >
          All dimensions
        </button>
        {DIMENSIONS.map((d) => (
          <button
            key={d.id}
            className={`om-dim-btn${activeDim === d.id ? ' active' : ''}`}
            style={activeDim === d.id ? { borderColor: d.color, color: d.color } : {}}
            onClick={() => setActiveDim(d.id as OmDimension)}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Transformation cards */}
      <div className="om-cards">
        {visibleDims.map((dim) => {
          const cell = dim.journey[activeStage]
          return (
            <div key={dim.id} className="om-card" style={{ borderTopColor: dim.color }}>
              <div className="om-card-header">
                <div className="om-card-label" style={{ color: dim.color }}>{dim.label}</div>
                <span className="om-card-stage" style={{ color: STAGE_COLORS[activeStage] }}>
                  {STAGES.find((s) => s.id === activeStage)?.label}
                </span>
              </div>
              <div className="om-card-headline">{cell.headline}</div>
              <div className="om-card-detail">{cell.detail}</div>

              {/* Mini journey strip */}
              <div className="om-mini-strip">
                {STAGES.map((s) => (
                  <button
                    key={s.id}
                    className={`om-mini-dot${activeStage === s.id ? ' active' : ''}`}
                    style={activeStage === s.id ? { background: dim.color } : {}}
                    onClick={() => setActiveStage(s.id)}
                    title={s.label + ': ' + dim.journey[s.id].headline}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {activeStage === 'phase-3' && (
        <div className="om-13pct-note">
          13.8% capacity freed is a directional working assumption -- to validate with operational data at Gate 3.
          It represents capacity freed, not headcount reduction.
          Illustrative planning assumption, not a commercial estimate.
        </div>
      )}
    </section>
  )
}
