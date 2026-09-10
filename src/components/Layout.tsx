import { useState } from 'react'
import type { ReactNode } from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Drawer from './Drawer'
import { useStore } from '../store'

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { drawerOpen, drawerTitle, drawerContent, closeDrawer } = useStore()

  return (
    <>
      <Topbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(v => !v)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main" id="main" role="main">
        {children}
      </main>
      <Drawer open={drawerOpen} title={drawerTitle} onClose={closeDrawer}>
        {drawerContent}
      </Drawer>
    </>
  )
}
