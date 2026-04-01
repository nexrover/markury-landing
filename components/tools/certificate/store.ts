import { create } from 'zustand'
import type { ActiveTool, CertificateTemplate, SelectedProps } from './types'

interface CertificateStore {
  view: 'gallery' | 'editor'
  setView: (v: 'gallery' | 'editor') => void

  activeTool: ActiveTool
  setActiveTool: (tool: ActiveTool) => void

  activeTemplate: CertificateTemplate | null
  setActiveTemplate: (t: CertificateTemplate | null) => void

  selectedProps: SelectedProps | null
  setSelectedProps: (p: SelectedProps | null) => void

  backgroundColor: string
  setBackgroundColor: (c: string) => void

  zoom: number
  setZoom: (z: number) => void

  historyStack: string[]
  historyIndex: number
  pushHistory: (json: string) => void
  undo: () => string | null
  redo: () => string | null
  canUndo: () => boolean
  canRedo: () => boolean
}

export const useCertificateStore = create<CertificateStore>((set, get) => ({
  view: 'gallery',
  setView: (v) => set({ view: v }),

  activeTool: 'select',
  setActiveTool: (tool) => set({ activeTool: tool }),

  activeTemplate: null,
  setActiveTemplate: (t) => set({ activeTemplate: t }),

  selectedProps: null,
  setSelectedProps: (p) => set({ selectedProps: p }),

  backgroundColor: '#FFFFFF',
  setBackgroundColor: (c) => set({ backgroundColor: c }),

  zoom: 1,
  setZoom: (z) => set({ zoom: Math.max(0.25, Math.min(2, z)) }),

  historyStack: [],
  historyIndex: -1,

  pushHistory: (json) => {
    const { historyStack, historyIndex } = get()
    const trimmed = historyStack.slice(0, historyIndex + 1)
    trimmed.push(json)
    if (trimmed.length > 50) trimmed.shift()
    set({ historyStack: trimmed, historyIndex: trimmed.length - 1 })
  },

  undo: () => {
    const { historyStack, historyIndex } = get()
    if (historyIndex <= 0) return null
    const newIndex = historyIndex - 1
    set({ historyIndex: newIndex })
    return historyStack[newIndex]
  },

  redo: () => {
    const { historyStack, historyIndex } = get()
    if (historyIndex >= historyStack.length - 1) return null
    const newIndex = historyIndex + 1
    set({ historyIndex: newIndex })
    return historyStack[newIndex]
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().historyStack.length - 1,
}))
