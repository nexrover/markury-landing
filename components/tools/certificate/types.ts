export type ElementType = 'text' | 'rect' | 'line' | 'circle' | 'image'

export interface TemplateElement {
  type: ElementType
  left: number
  top: number
  width?: number
  height?: number
  text?: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: string | number
  fontStyle?: string
  fill?: string
  stroke?: string
  strokeWidth?: number
  textAlign?: string
  charSpacing?: number
  lineHeight?: number
  underline?: boolean
  opacity?: number
  angle?: number
  radius?: number
  rx?: number
  ry?: number
  scaleX?: number
  scaleY?: number
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  src?: string
  selectable?: boolean
  editable?: boolean
  hasControls?: boolean
  lockMovementX?: boolean
  lockMovementY?: boolean
  meta?: Record<string, string>
}

export interface CertificateTemplate {
  id: string
  name: string
  category: 'academic' | 'achievement' | 'completion' | 'appreciation'
  preview: {
    bg: string
    accent: string
    textColor: string
    borderColor?: string
  }
  canvas: {
    width: number
    height: number
    backgroundColor: string
  }
  elements: TemplateElement[]
}

export interface SelectedProps {
  type: ElementType | null
  left: number
  top: number
  width: number
  height: number
  angle: number
  opacity: number
  fill: string
  stroke: string
  strokeWidth: number
  fontSize: number
  fontFamily: string
  fontWeight: string | number
  fontStyle: string
  textAlign: string
  charSpacing: number
  lineHeight: number
  underline: boolean
  text: string
}

export const CERTIFICATE_FONTS = [
  'Playfair Display',
  'Cinzel',
  'Cormorant Garamond',
  'Lora',
  'Merriweather',
  'Great Vibes',
  'Dancing Script',
  'Montserrat',
  'Raleway',
  'Open Sans',
  'Roboto',
  'Poppins',
  'Inter',
  'Oswald',
] as const

export const CANVAS_WIDTH = 1056
export const CANVAS_HEIGHT = 816

export type ActiveTool = 'select' | 'text' | 'rect' | 'circle' | 'line' | 'image'
