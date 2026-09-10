import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from './Topbar'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <nav
      className={`sidebar${open ? ' open' : ''}`}
      id="sidebar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="sidebar-section-label">Navigation</div>
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          onClick={onClose}
          aria-current={undefined}
        >
          <Icon size={16} />
          {label}
        </NavLink>
      ))}
      <div className="sidebar-footer">
        <div style={{ marginBottom: 4, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>Status</div>
        <div>All content: Proposed</div>
        <div>Start: October 2026</div>
        <div>Staffing: Illustrative</div>
      </div>
    </nav>
  )
}
