import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Executive from './sections/Executive'
import Roadmap from './sections/Roadmap'
import Runs from './sections/Runs'
import Architecture from './sections/Architecture'
import Portfolio from './sections/Portfolio'
import OM from './sections/OM'
import Team from './sections/Team'
import Scale from './sections/Scale'
import Control from './sections/Control'

export default function Router() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/executive" replace />} />
        <Route path="/executive" element={<Executive />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/runs" element={<Runs />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/om" element={<OM />} />
        <Route path="/team" element={<Team />} />
        <Route path="/scale" element={<Scale />} />
        <Route path="/control" element={<Control />} />
        <Route path="*" element={<Navigate to="/executive" replace />} />
      </Routes>
    </Layout>
  )
}
