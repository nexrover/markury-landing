"use client"

import { useCertificateStore } from './store'
import type { CanvasHandle } from './CertificateCanvas'

export default function TopBar({ canvasHandle }: { canvasHandle: React.RefObject<CanvasHandle | null> }) {
  const { zoom, setZoom, setView, canUndo, canRedo, undo, redo } = useCertificateStore()

  const handleUndo = () => {
    const json = undo()
    if (json) canvasHandle.current?.loadJSON(json)
  }

  const handleRedo = () => {
    const json = redo()
    if (json) canvasHandle.current?.loadJSON(json)
  }

  return (
    <div className="flex items-center justify-between h-12 px-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setView('gallery')}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors px-2 py-1.5 rounded hover:bg-gray-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Templates
        </button>
        <div className="w-px h-5 bg-gray-200" />
        <span className="text-xs font-medium text-gray-700">Certificate Editor</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handleUndo}
          disabled={!canUndo()}
          title="Undo (Ctrl+Z)"
          className="flex items-center justify-center w-8 h-8 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a5 5 0 015 5v2M3 10l4-4m-4 4l4 4" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleRedo}
          disabled={!canRedo()}
          title="Redo (Ctrl+Shift+Z)"
          className="flex items-center justify-center w-8 h-8 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a5 5 0 00-5 5v2m15-7l-4-4m4 4l-4 4" />
          </svg>
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />

        <button type="button" onClick={() => setZoom(zoom - 0.1)} className="flex items-center justify-center w-8 h-8 rounded text-gray-600 hover:bg-gray-100 transition-colors text-sm">−</button>
        <span className="text-xs font-medium text-gray-600 w-12 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
        <button type="button" onClick={() => setZoom(zoom + 0.1)} className="flex items-center justify-center w-8 h-8 rounded text-gray-600 hover:bg-gray-100 transition-colors text-sm">+</button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => canvasHandle.current?.exportPNG()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          PNG
        </button>
        <button
          type="button"
          onClick={() => canvasHandle.current?.exportPDF()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          PDF
        </button>
      </div>
    </div>
  )
}
