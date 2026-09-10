import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Executive from './sections/Executive'
import Roadmap from './sections/Roadmap'
import ObligationRun from './sections/ObligationRun'
import Portfolio from './sections/Portfolio'
import OperatingModel from './sections/OperatingModel'
import Scale from './sections/Scale'
import Control from './sections/Control'

export default function Router() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/executive" replace />} />
        <Route path="/executive" element={<Executive />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/obligation-run" element={<ObligationRun />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/operating-model" element={<OperatingModel />} />
        <Route path="/scale" element={<Scale />} />
        <Route path="/control" element={<Control />} />
        {/* Legacy redirects */}
        <Route path="/runs" element={<Navigate to="/obligation-run" replace />} />
        <Route path="/architecture" element={<Navigate to="/obligation-run" replace />} />
        <Route path="/om" element={<Navigate to="/operating-model" replace />} />
        <Route path="/team" element={<Navigate to="/operating-model" replace />} />
        <Route path="*" element={<Navigate to="/executive" replace />} />
      </Routes>
    </Layout>
  )
}
