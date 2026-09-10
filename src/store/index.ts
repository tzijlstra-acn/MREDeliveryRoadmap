import { create } from 'zustand'

export type OmDimension =
  | 'all'
  | 'product-service-portfolio'
  | 'organization-processes'
  | 'technology-platforms'
  | 'people'
  | 'value-management'

export type PhaseFilter = 'all' | 'phase-1' | 'phase-2' | 'phase-3'

export type ScenarioId = 'lean' | 'recommended' | 'accelerated'

interface AppStore {
  activeOmDimension: OmDimension
  setActiveOmDimension: (d: OmDimension) => void

  activePhase: PhaseFilter
  setActivePhase: (p: PhaseFilter) => void

  activeScenario: ScenarioId
  setActiveScenario: (s: ScenarioId) => void

  drawerOpen: boolean
  drawerTitle: string
  drawerContent: React.ReactNode | null
  openDrawer: (title: string, content: React.ReactNode) => void
  closeDrawer: () => void
}

import type React from 'react'

export const useStore = create<AppStore>((set) => ({
  activeOmDimension: 'all',
  setActiveOmDimension: (d) => set({ activeOmDimension: d }),

  activePhase: 'all',
  setActivePhase: (p) => set({ activePhase: p }),

  activeScenario: 'recommended',
  setActiveScenario: (s) => set({ activeScenario: s }),

  drawerOpen: false,
  drawerTitle: '',
  drawerContent: null,
  openDrawer: (title, content) => set({ drawerOpen: true, drawerTitle: title, drawerContent: content }),
  closeDrawer: () => set({ drawerOpen: false, drawerContent: null }),
}))
