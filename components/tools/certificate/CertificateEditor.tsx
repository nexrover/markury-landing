"use client"

import { useRef, useEffect, useCallback, useState } from 'react'
import { useCertificateStore } from './store'
import EditorToolbar from './EditorToolbar'
import PropertiesPanel from './PropertiesPanel'
import TopBar from './TopBar'
import TemplateGallery from './TemplateGallery'
import CertificateCanvas from './CertificateCanvas'
import { CANVAS_WIDTH, CANVAS_HEIGHT, CERTIFICATE_FONTS } from './types'
import type { CanvasHandle } from './CertificateCanvas'

const GOOGLE_FONTS_URL = `https://fonts.googleapis.com/css2?${CERTIFICATE_FONTS.map(
  (f) => `family=${f.replace(/ /g, '+')}:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700`
).join('&')}&display=swap`

export default function CertificateEditorApp() {
  const { view, zoom, activeTemplate } = useCertificateStore()
  const canvasRef = useRef<CanvasHandle>(null)
  const templateLoadedRef = useRef(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (view !== 'editor' || templateLoadedRef.current) return

    const timer = setTimeout(() => {
      if (activeTemplate) {
        canvasRef.current?.loadTemplate(activeTemplate)
      }
      templateLoadedRef.current = true
    }, 100)

    return () => clearTimeout(timer)
  }, [view, activeTemplate])

  useEffect(() => {
    if (view === 'gallery') {
      templateLoadedRef.current = false
    }
  }, [view])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (view !== 'editor') return
    const { undo, redo } = useCertificateStore.getState()

    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault()
      const json = undo()
      if (json) canvasRef.current?.loadJSON(json)
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault()
      const json = redo()
      if (json) canvasRef.current?.loadJSON(json)
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const active = document.activeElement
      const isInput = active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA' || active?.getAttribute('contenteditable')
      const canvas = canvasRef.current?.getCanvas()
      const isEditing = canvas?.getActiveObject()?.type === 'textbox' && (canvas.getActiveObject() as { isEditing?: boolean })?.isEditing
      if (!isInput && !isEditing) {
        e.preventDefault()
        canvasRef.current?.deleteSelected()
      }
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
      e.preventDefault()
      canvasRef.current?.duplicateSelected()
    }
  }, [view])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (view === 'gallery') {
    return (
      <>
        <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
        <TemplateGallery />
      </>
    )
  }

  return (
    <>
      <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
      <div className="flex flex-col h-screen bg-gray-100">
        <TopBar canvasHandle={canvasRef} />
        <div className="flex flex-1 overflow-hidden">
          <EditorToolbar canvasHandle={canvasRef} />
          <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-[#E5E7EB]">
            <div
              className="shadow-2xl rounded-sm"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
            >
              {mounted && (
                <CertificateCanvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                />
              )}
            </div>
          </div>
          <PropertiesPanel canvasHandle={canvasRef} />
        </div>
      </div>
    </>
  )
}
