"use client"

import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Canvas, Textbox, Rect, Circle, Line, FabricImage, FabricObject } from 'fabric'
import { useCertificateStore } from './store'
import type { CertificateTemplate, TemplateElement, SelectedProps } from './types'

export interface CanvasHandle {
  getCanvas: () => Canvas | null
  loadTemplate: (template: CertificateTemplate) => void
  addText: (text?: string) => void
  addRect: () => void
  addCircle: () => void
  addLine: () => void
  addImage: (url: string) => void
  deleteSelected: () => void
  duplicateSelected: () => void
  exportPNG: () => void
  exportPDF: () => void
  toJSON: () => string
  loadJSON: (json: string) => void
  saveHistory: () => void
}

function readSelectedProps(obj: FabricObject): SelectedProps {
  const isText = obj.type === 'textbox'
  const tb = obj as Textbox

  return {
    type: obj.type === 'textbox' ? 'text' : obj.type === 'rect' ? 'rect' : obj.type === 'circle' ? 'circle' : obj.type === 'line' ? 'line' : 'image',
    left: Math.round(obj.left ?? 0),
    top: Math.round(obj.top ?? 0),
    width: Math.round((obj.width ?? 0) * (obj.scaleX ?? 1)),
    height: Math.round((obj.height ?? 0) * (obj.scaleY ?? 1)),
    angle: Math.round(obj.angle ?? 0),
    opacity: obj.opacity ?? 1,
    fill: (typeof obj.fill === 'string' ? obj.fill : '#000000'),
    stroke: (typeof obj.stroke === 'string' ? obj.stroke : ''),
    strokeWidth: obj.strokeWidth ?? 0,
    fontSize: isText ? (tb.fontSize ?? 24) : 0,
    fontFamily: isText ? (tb.fontFamily ?? 'Open Sans') : '',
    fontWeight: isText ? (tb.fontWeight ?? 'normal') : 'normal',
    fontStyle: isText ? (tb.fontStyle ?? 'normal') : 'normal',
    textAlign: isText ? (tb.textAlign ?? 'left') : 'left',
    charSpacing: isText ? (tb.charSpacing ?? 0) : 0,
    lineHeight: isText ? (tb.lineHeight ?? 1.16) : 1.16,
    underline: isText ? (tb.underline ?? false) : false,
    text: isText ? (tb.text ?? '') : '',
  }
}

const CertificateCanvas = forwardRef<CanvasHandle, { width: number; height: number }>(
  function CertificateCanvas({ width, height }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fabricRef = useRef<Canvas | null>(null)
    const { setSelectedProps, pushHistory, setActiveTool, backgroundColor, setBackgroundColor } = useCertificateStore()

    const saveHistory = useCallback(() => {
      if (!fabricRef.current) return
      const json = JSON.stringify(fabricRef.current.toJSON())
      pushHistory(json)
    }, [pushHistory])

    const syncSelection = useCallback(() => {
      const c = fabricRef.current
      if (!c) return
      const active = c.getActiveObject()
      if (active) {
        setSelectedProps(readSelectedProps(active))
      } else {
        setSelectedProps(null)
      }
    }, [setSelectedProps])

    useEffect(() => {
      if (!canvasRef.current || fabricRef.current) return

      const c = new Canvas(canvasRef.current, {
        width,
        height,
        backgroundColor: '#FFFFFF',
        selection: true,
        preserveObjectStacking: true,
      })

      c.on('selection:created', syncSelection)
      c.on('selection:updated', syncSelection)
      c.on('selection:cleared', () => setSelectedProps(null))
      c.on('object:modified', () => { syncSelection(); saveHistory() })
      c.on('text:changed', syncSelection)

      fabricRef.current = c
      saveHistory()

      return () => {
        c.dispose()
        fabricRef.current = null
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (!fabricRef.current) return
      fabricRef.current.backgroundColor = backgroundColor
      fabricRef.current.requestRenderAll()
    }, [backgroundColor])

    const createFabricElement = useCallback((el: TemplateElement): FabricObject | null => {
      const common = {
        left: el.left,
        top: el.top,
        opacity: el.opacity ?? 1,
        angle: el.angle ?? 0,
        selectable: el.selectable !== false,
      }

      switch (el.type) {
        case 'text': {
          const tb = new Textbox(el.text ?? 'Text', {
            ...common,
            width: el.width ?? 400,
            fontSize: el.fontSize ?? 24,
            fontFamily: el.fontFamily ?? 'Open Sans',
            fontWeight: el.fontWeight ?? 'normal',
            fontStyle: el.fontStyle ?? 'normal',
            fill: el.fill ?? '#000000',
            textAlign: el.textAlign ?? 'center',
            charSpacing: el.charSpacing ?? 0,
            lineHeight: el.lineHeight ?? 1.16,
            underline: el.underline ?? false,
            editable: el.editable !== false,
            originX: el.textAlign === 'center' ? 'center' : el.textAlign === 'right' ? 'right' : 'left',
          })
          return tb
        }
        case 'rect': {
          return new Rect({
            ...common,
            width: el.width ?? 100,
            height: el.height ?? 100,
            fill: el.fill ?? '#000000',
            stroke: el.stroke ?? '',
            strokeWidth: el.strokeWidth ?? 0,
            rx: el.rx ?? 0,
            ry: el.ry ?? 0,
          })
        }
        case 'circle': {
          return new Circle({
            ...common,
            radius: el.radius ?? 50,
            fill: el.fill ?? '#000000',
            stroke: el.stroke ?? '',
            strokeWidth: el.strokeWidth ?? 0,
            originX: 'center',
            originY: 'center',
          })
        }
        case 'line': {
          return new Line([el.x1 ?? 0, el.y1 ?? 0, el.x2 ?? (el.width ?? 100), el.y2 ?? 0], {
            ...common,
            stroke: el.stroke ?? '#000000',
            strokeWidth: el.strokeWidth ?? 1,
          })
        }
        default:
          return null
      }
    }, [])

    useImperativeHandle(ref, () => ({
      getCanvas: () => fabricRef.current,

      loadTemplate: (template: CertificateTemplate) => {
        const c = fabricRef.current
        if (!c) return
        c.clear()
        c.backgroundColor = template.canvas.backgroundColor
        setBackgroundColor(template.canvas.backgroundColor)

        for (const el of template.elements) {
          const obj = createFabricElement(el)
          if (obj) c.add(obj)
        }
        c.requestRenderAll()
        saveHistory()
      },

      addText: (text?: string) => {
        const c = fabricRef.current
        if (!c) return
        const tb = new Textbox(text ?? 'Your Text', {
          left: width / 2,
          top: height / 2,
          width: 300,
          fontSize: 28,
          fontFamily: 'Open Sans',
          fill: '#000000',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
        })
        c.add(tb)
        c.setActiveObject(tb)
        c.requestRenderAll()
        setActiveTool('select')
        saveHistory()
      },

      addRect: () => {
        const c = fabricRef.current
        if (!c) return
        const rect = new Rect({
          left: width / 2 - 75,
          top: height / 2 - 50,
          width: 150,
          height: 100,
          fill: 'transparent',
          stroke: '#333333',
          strokeWidth: 2,
          rx: 4,
          ry: 4,
        })
        c.add(rect)
        c.setActiveObject(rect)
        c.requestRenderAll()
        setActiveTool('select')
        saveHistory()
      },

      addCircle: () => {
        const c = fabricRef.current
        if (!c) return
        const circle = new Circle({
          left: width / 2,
          top: height / 2,
          radius: 60,
          fill: 'transparent',
          stroke: '#333333',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center',
        })
        c.add(circle)
        c.setActiveObject(circle)
        c.requestRenderAll()
        setActiveTool('select')
        saveHistory()
      },

      addLine: () => {
        const c = fabricRef.current
        if (!c) return
        const line = new Line([0, 0, 200, 0], {
          left: width / 2 - 100,
          top: height / 2,
          stroke: '#333333',
          strokeWidth: 2,
        })
        c.add(line)
        c.setActiveObject(line)
        c.requestRenderAll()
        setActiveTool('select')
        saveHistory()
      },

      addImage: (url: string) => {
        const c = fabricRef.current
        if (!c) return
        FabricImage.fromURL(url, { crossOrigin: 'anonymous' }).then((img) => {
          const maxW = width * 0.4
          const maxH = height * 0.4
          const scale = Math.min(maxW / (img.width ?? 1), maxH / (img.height ?? 1), 1)
          img.set({ left: width / 2, top: height / 2, scaleX: scale, scaleY: scale, originX: 'center', originY: 'center' })
          c.add(img)
          c.setActiveObject(img)
          c.requestRenderAll()
          setActiveTool('select')
          saveHistory()
        })
      },

      deleteSelected: () => {
        const c = fabricRef.current
        if (!c) return
        const active = c.getActiveObject()
        if (active) {
          c.remove(active)
          c.discardActiveObject()
          c.requestRenderAll()
          setSelectedProps(null)
          saveHistory()
        }
      },

      duplicateSelected: () => {
        const c = fabricRef.current
        if (!c) return
        const active = c.getActiveObject()
        if (!active) return
        active.clone().then((cloned: FabricObject) => {
          cloned.set({ left: (cloned.left ?? 0) + 20, top: (cloned.top ?? 0) + 20 })
          c.add(cloned)
          c.setActiveObject(cloned)
          c.requestRenderAll()
          saveHistory()
        })
      },

      exportPNG: () => {
        const c = fabricRef.current
        if (!c) return
        c.discardActiveObject()
        c.requestRenderAll()
        const dataUrl = c.toDataURL({ format: 'png', multiplier: 2, quality: 1 })
        const link = document.createElement('a')
        link.download = 'certificate.png'
        link.href = dataUrl
        link.click()
      },

      exportPDF: () => {
        const c = fabricRef.current
        if (!c) return
        c.discardActiveObject()
        c.requestRenderAll()

        import('jspdf').then(({ jsPDF }) => {
          const dataUrl = c.toDataURL({ format: 'png', multiplier: 2, quality: 1 })
          const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [width, height] })
          pdf.addImage(dataUrl, 'PNG', 0, 0, width, height)
          pdf.save('certificate.pdf')
        })
      },

      toJSON: () => {
        if (!fabricRef.current) return '{}'
        return JSON.stringify(fabricRef.current.toJSON())
      },

      loadJSON: (json: string) => {
        const c = fabricRef.current
        if (!c) return
        c.loadFromJSON(json).then(() => {
          c.requestRenderAll()
        })
      },

      saveHistory,
    }), [width, height, createFabricElement, saveHistory, setActiveTool, setSelectedProps, setBackgroundColor])

    return (
      <canvas ref={canvasRef} />
    )
  }
)

export default CertificateCanvas
