"use client"

import { useCallback } from 'react'
import { useCertificateStore } from './store'
import { CERTIFICATE_FONTS } from './types'
import type { CanvasHandle } from './CertificateCanvas'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">{title}</h3>
      {children}
    </div>
  )
}

function ColorInput({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-600 w-14 flex-shrink-0">{label}</label>
      <div className="relative">
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded border border-gray-200 cursor-pointer p-0.5"
        />
      </div>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-w-0 text-xs border border-gray-200 rounded px-2 py-1 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
    </div>
  )
}

function NumberInput({ value, onChange, label, min, max, step }: { value: number; onChange: (v: number) => void; label: string; min?: number; max?: number; step?: number }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-600 w-14 flex-shrink-0">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step ?? 1}
        className="flex-1 min-w-0 text-xs border border-gray-200 rounded px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
    </div>
  )
}

export default function PropertiesPanel({ canvasHandle }: { canvasHandle: React.RefObject<CanvasHandle | null> }) {
  const { selectedProps, backgroundColor, setBackgroundColor } = useCertificateStore()

  const updateProp = useCallback((key: string, value: unknown) => {
    const c = canvasHandle.current?.getCanvas()
    if (!c) return
    const active = c.getActiveObject()
    if (!active) return
    active.set(key as keyof typeof active, value as never)
    c.requestRenderAll()
    canvasHandle.current?.saveHistory()

    const { setSelectedProps } = useCertificateStore.getState()
    const isText = active.type === 'textbox'
    if (isText || ['fill', 'stroke', 'strokeWidth', 'opacity', 'angle'].includes(key)) {
      setSelectedProps({
        ...useCertificateStore.getState().selectedProps!,
        [key]: value,
      })
    }
  }, [canvasHandle])

  const handleBgChange = useCallback((color: string) => {
    const c = canvasHandle.current?.getCanvas()
    if (!c) return
    c.backgroundColor = color
    c.requestRenderAll()
    setBackgroundColor(color)
    canvasHandle.current?.saveHistory()
  }, [canvasHandle, setBackgroundColor])

  const isText = selectedProps?.type === 'text'
  const isShape = selectedProps?.type === 'rect' || selectedProps?.type === 'circle' || selectedProps?.type === 'line'

  return (
    <div className="w-64 bg-white border-l border-gray-200 overflow-y-auto p-4 text-sm">
      <Section title="Background">
        <ColorInput label="Color" value={backgroundColor} onChange={handleBgChange} />
      </Section>

      {selectedProps && (
        <>
          <Section title="Position & Size">
            <div className="grid grid-cols-2 gap-2">
              <NumberInput label="X" value={selectedProps.left} onChange={(v) => updateProp('left', v)} />
              <NumberInput label="Y" value={selectedProps.top} onChange={(v) => updateProp('top', v)} />
              <NumberInput label="W" value={selectedProps.width} onChange={(v) => {
                const c = canvasHandle.current?.getCanvas()
                const active = c?.getActiveObject()
                if (active) {
                  active.set('scaleX', v / (active.width ?? 1))
                  c?.requestRenderAll()
                  canvasHandle.current?.saveHistory()
                }
              }} min={1} />
              <NumberInput label="H" value={selectedProps.height} onChange={(v) => {
                const c = canvasHandle.current?.getCanvas()
                const active = c?.getActiveObject()
                if (active) {
                  active.set('scaleY', v / (active.height ?? 1))
                  c?.requestRenderAll()
                  canvasHandle.current?.saveHistory()
                }
              }} min={1} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <NumberInput label="Angle" value={selectedProps.angle} onChange={(v) => updateProp('angle', v)} min={0} max={360} />
              <NumberInput label="Opacity" value={Math.round(selectedProps.opacity * 100)} onChange={(v) => updateProp('opacity', v / 100)} min={0} max={100} />
            </div>
          </Section>

          {isText && (
            <Section title="Text">
              <div className="space-y-2.5">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Font</label>
                  <select
                    value={selectedProps.fontFamily}
                    onChange={(e) => updateProp('fontFamily', e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
                  >
                    {CERTIFICATE_FONTS.map((f) => (
                      <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <NumberInput label="Size" value={selectedProps.fontSize} onChange={(v) => updateProp('fontSize', v)} min={8} max={200} />
                  <NumberInput label="Space" value={selectedProps.charSpacing} onChange={(v) => updateProp('charSpacing', v)} min={-200} max={2000} step={50} />
                </div>

                <NumberInput label="Height" value={Math.round(selectedProps.lineHeight * 100) / 100} onChange={(v) => updateProp('lineHeight', v)} min={0.5} max={3} step={0.05} />

                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Weight</label>
                  <select
                    value={String(selectedProps.fontWeight)}
                    onChange={(e) => updateProp('fontWeight', e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
                  >
                    <option value="normal">Regular</option>
                    <option value="500">Medium</option>
                    <option value="600">Semi Bold</option>
                    <option value="700">Bold</option>
                    <option value="800">Extra Bold</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateProp('fontStyle', selectedProps.fontStyle === 'italic' ? 'normal' : 'italic')}
                    className={`flex items-center justify-center w-8 h-8 rounded text-xs font-bold ${selectedProps.fontStyle === 'italic' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateProp('underline', !selectedProps.underline)}
                    className={`flex items-center justify-center w-8 h-8 rounded text-xs ${selectedProps.underline ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    title="Underline"
                  >
                    <span className="underline font-bold">U</span>
                  </button>

                  {['left', 'center', 'right'].map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => updateProp('textAlign', align)}
                      className={`flex items-center justify-center w-8 h-8 rounded text-xs ${selectedProps.textAlign === align ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      title={align}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                        {align === 'left' && <><rect x="1" y="2" width="14" height="1.5" rx=".5" /><rect x="1" y="6" width="10" height="1.5" rx=".5" /><rect x="1" y="10" width="12" height="1.5" rx=".5" /><rect x="1" y="14" width="8" height="1.5" rx=".5" /></>}
                        {align === 'center' && <><rect x="1" y="2" width="14" height="1.5" rx=".5" /><rect x="3" y="6" width="10" height="1.5" rx=".5" /><rect x="2" y="10" width="12" height="1.5" rx=".5" /><rect x="4" y="14" width="8" height="1.5" rx=".5" /></>}
                        {align === 'right' && <><rect x="1" y="2" width="14" height="1.5" rx=".5" /><rect x="5" y="6" width="10" height="1.5" rx=".5" /><rect x="3" y="10" width="12" height="1.5" rx=".5" /><rect x="7" y="14" width="8" height="1.5" rx=".5" /></>}
                      </svg>
                    </button>
                  ))}
                </div>

                <ColorInput label="Color" value={selectedProps.fill} onChange={(v) => updateProp('fill', v)} />
              </div>
            </Section>
          )}

          {isShape && (
            <Section title="Shape">
              <div className="space-y-2.5">
                <ColorInput label="Fill" value={selectedProps.fill} onChange={(v) => updateProp('fill', v)} />
                <ColorInput label="Stroke" value={selectedProps.stroke} onChange={(v) => updateProp('stroke', v)} />
                <NumberInput label="Border" value={selectedProps.strokeWidth} onChange={(v) => updateProp('strokeWidth', v)} min={0} max={20} />
              </div>
            </Section>
          )}

          <Section title="Actions">
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => canvasHandle.current?.duplicateSelected()}
                className="flex-1 text-xs px-2 py-1.5 rounded border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Duplicate
              </button>
              <button
                type="button"
                onClick={() => canvasHandle.current?.deleteSelected()}
                className="flex-1 text-xs px-2 py-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => {
                  const c = canvasHandle.current?.getCanvas()
                  const active = c?.getActiveObject()
                  if (active && c) {
                    const objects = c.getObjects()
                    const idx = objects.indexOf(active)
                    if (idx < objects.length - 1) {
                      c.moveObjectTo(active, idx + 1)
                      c.requestRenderAll()
                    }
                  }
                }}
                className="flex-1 text-xs px-2 py-1.5 rounded border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Forward
              </button>
              <button
                type="button"
                onClick={() => {
                  const c = canvasHandle.current?.getCanvas()
                  const active = c?.getActiveObject()
                  if (active && c) {
                    const objects = c.getObjects()
                    const idx = objects.indexOf(active)
                    if (idx > 0) {
                      c.moveObjectTo(active, idx - 1)
                      c.requestRenderAll()
                    }
                  }
                }}
                className="flex-1 text-xs px-2 py-1.5 rounded border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </Section>
        </>
      )}

      {!selectedProps && (
        <div className="text-center text-xs text-gray-400 py-8">
          Select an element to edit its properties
        </div>
      )}
    </div>
  )
}
