import { useState } from 'react'
import {
  IconMenu2,
  IconPresentation,
  IconTimeline,
  IconGitBranch,
  IconCpu,
  IconBooks,
  IconLayoutGrid,
  IconUsers,
  IconChartBar,
  IconRocket,
} from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/executive',    icon: IconPresentation, label: 'Executive Decision' },
  { to: '/roadmap',      icon: IconTimeline,     label: 'Delivery Roadmap' },
  { to: '/runs',         icon: IconGitBranch,    label: 'Obligation Chain and Runs' },
  { to: '/architecture', icon: IconCpu,          label: 'Architecture Evolution' },
  { to: '/portfolio',    icon: IconBooks,        label: 'Regulatory Portfolio' },
  { to: '/om',           icon: IconLayoutGrid,   label: 'Target Operating Model' },
  { to: '/team',         icon: IconUsers,        label: 'Team and Skills' },
  { to: '/scale',        icon: IconRocket,       label: 'Value and Tokenomics' },
  { to: '/control',      icon: IconChartBar,     label: 'Execution Control' },
]

interface TopbarProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function Topbar({ sidebarOpen, onToggleSidebar }: TopbarProps) {
  return (
    <header className="topbar" role="banner">
      <div className="topbar-logo">
        <svg width="24" height="24" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <path d="M18 10 L58 50 L18 90 L32 90 L72 50 L32 10 Z" fill="url(#tv)" />
          <defs>
            <linearGradient id="tv" x1="18" y1="10" x2="72" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C77BFF" />
              <stop offset="100%" stopColor="#FF50C8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="topbar-title">Agentic Compliance Delivery Blueprint</span>
      <div className="topbar-divider" aria-hidden="true" />
      <span className="topbar-sub">UC3 | 18-Month Implementation Roadmap</span>
      <div className="topbar-spacer" />
      <span className="topbar-badge">Oct 2026 - Mar 2028</span>
      <button
        className="hamburger-btn"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation"
        aria-expanded={sidebarOpen}
      >
        <IconMenu2 size={20} />
      </button>
    </header>
  )
}

export { NAV_ITEMS }
