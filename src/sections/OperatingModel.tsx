import { useState } from 'react'
import OM from './OM'
import Team from './Team'

type Tab = 'om' | 'team'

export default function OperatingModel() {
  const [tab, setTab] = useState<Tab>('om')
  return (
    <div className="combined-section-wrap">
      <div className="combined-tab-bar">
        <button
          className={`combined-tab${tab === 'om' ? ' active' : ''}`}
          onClick={() => setTab('om')}
        >
          Target Operating Model
        </button>
        <button
          className={`combined-tab${tab === 'team' ? ' active' : ''}`}
          onClick={() => setTab('team')}
        >
          Team and Skills
        </button>
      </div>
      {tab === 'om' ? <OM /> : <Team />}
    </div>
  )
}
