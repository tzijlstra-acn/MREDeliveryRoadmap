import { HashRouter } from 'react-router-dom'
import AuthGate from './AuthGate'
import Router from './router'

export default function App() {
  return (
    <HashRouter>
      <AuthGate>
        <Router />
      </AuthGate>
    </HashRouter>
  )
}
