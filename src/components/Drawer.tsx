import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { IconX } from '@tabler/icons-react'

interface DrawerProps {
  open: boolean
  title: string
  onClose: () => void
  children?: ReactNode
}

export default function Drawer({ open, title, onClose, children }: DrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      <div
        className={`drawer-backdrop${open ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`drawer${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="drawer-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Detail</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{title}</div>
          </div>
          <button ref={closeRef} className="drawer-close" onClick={onClose} aria-label="Close">
            <IconX size={20} />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
      </div>
    </>
  )
}
