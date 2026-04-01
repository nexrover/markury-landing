"use client"

import { useRef } from 'react'
import { useCertificateStore } from './store'
import type { ActiveTool } from './types'
import type { CanvasHandle } from './CertificateCanvas'

const tools: { id: ActiveTool; label: string; icon: React.ReactNode }[] = [
  {
    id: 'select',
    label: 'Select',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: 'text',
    label: 'Text',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 6v2m16-2v2M7 6v12m0 0h2m-2 0H5m12-12v12m0 0h2m-2 0h-2" />
      </svg>
    ),
  },
  {
    id: 'rect',
    label: 'Rectangle',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
      </svg>
    ),
  },
  {
    id: 'circle',
    label: 'Circle',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    id: 'line',
    label: 'Line',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" d="M4 20L20 4" />
      </svg>
    ),
  },
  {
    id: 'image',
    label: 'Image',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
]

export default function EditorToolbar({ canvasHandle }: { canvasHandle: React.RefObject<CanvasHandle | null> }) {
  const { activeTool, setActiveTool } = useCertificateStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleToolClick = (id: ActiveTool) => {
    if (id === 'text') {
      canvasHandle.current?.addText()
    } else if (id === 'rect') {
      canvasHandle.current?.addRect()
    } else if (id === 'circle') {
      canvasHandle.current?.addCircle()
    } else if (id === 'line') {
      canvasHandle.current?.addLine()
    } else if (id === 'image') {
      fileInputRef.current?.click()
    } else {
      setActiveTool(id)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      canvasHandle.current?.addImage(reader.result as string)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div className="flex flex-col items-center gap-1.5 bg-white border-r border-gray-200 px-2 py-4 w-14">
      {tools.map((tool) => (
        <button
          key={tool.id}
          type="button"
          onClick={() => handleToolClick(tool.id)}
          title={tool.label}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
            activeTool === tool.id
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {tool.icon}
        </button>
      ))}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  )
}
