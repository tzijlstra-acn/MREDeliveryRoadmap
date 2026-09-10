import { useEffect } from 'react'
import type { ReactNode } from 'react'

export default function AuthGate({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (sessionStorage.getItem('uc3_auth') !== '1') {
      window.location.replace(import.meta.env.BASE_URL + 'index.html')
    }
  }, [])

  if (sessionStorage.getItem('uc3_auth') !== '1') return null
  return <>{children}</>
}
