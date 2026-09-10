import { useState } from 'react'
import Runs from './Runs'
import Architecture from './Architecture'

type Tab = 'runs' | 'architecture'

export default function ObligationRun() {
  const [tab, setTab] = useState<Tab>('runs')
  return (
    <div className="combined-section-wrap">
      <div className="combined-tab-bar">
        <button
          className={`combined-tab${tab === 'runs' ? ' active' : ''}`}
          onClick={() => setTab('runs')}
        >
          Obligation Chain and Runs
        </button>
        <button
          className={`combined-tab${tab === 'architecture' ? ' active' : ''}`}
          onClick={() => setTab('architecture')}
        >
          Architecture Evolution
        </button>
      </div>
      {tab === 'runs' ? <Runs /> : <Architecture />}
    </div>
  )
}
