"use client"

import { CERTIFICATE_TEMPLATES } from './templates'
import { useCertificateStore } from './store'
import type { CertificateTemplate } from './types'

function TemplateThumbnail({ template }: { template: CertificateTemplate }) {
  const p = template.preview
  return (
    <div
      className="w-full aspect-[1.3] rounded-lg overflow-hidden relative"
      style={{ backgroundColor: p.bg }}
    >
      {p.borderColor && (
        <div
          className="absolute inset-2 rounded border"
          style={{ borderColor: p.borderColor }}
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 gap-1.5">
        <div className="w-10 h-0.5 rounded-full" style={{ backgroundColor: p.accent }} />
        <div
          className="text-[10px] font-bold tracking-wider uppercase"
          style={{ color: p.accent }}
        >
          CERTIFICATE
        </div>
        <div
          className="text-sm font-bold leading-tight text-center"
          style={{ color: p.textColor }}
        >
          of Achievement
        </div>
        <div className="w-12 h-px mt-0.5" style={{ backgroundColor: p.accent, opacity: 0.5 }} />
        <div className="text-[9px] italic" style={{ color: p.textColor, opacity: 0.5 }}>
          Recipient Name
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="w-8 h-px" style={{ backgroundColor: p.textColor, opacity: 0.2 }} />
          <div className="w-8 h-px" style={{ backgroundColor: p.textColor, opacity: 0.2 }} />
        </div>
      </div>
    </div>
  )
}

export default function TemplateGallery() {
  const { setView, setActiveTemplate } = useCertificateStore()

  const handleSelectTemplate = (template: CertificateTemplate | null) => {
    setActiveTemplate(template)
    setView('editor')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-3">
            Certificate Generator
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Choose a template
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Pick a pre-designed template to get started quickly, or start from scratch for full creative control.
          </p>
        </div>

        {/* Start from scratch */}
        <div className="mb-10">
          <button
            type="button"
            onClick={() => handleSelectTemplate(null)}
            className="group flex items-center gap-4 w-full max-w-md mx-auto p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 transition-all"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-sm">Start from scratch</p>
              <p className="text-xs text-gray-500">Blank A4 landscape canvas with full customization</p>
            </div>
          </button>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATE_TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => handleSelectTemplate(template)}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all text-left"
            >
              <div className="p-4 bg-gray-50 group-hover:bg-gray-100 transition-colors">
                <TemplateThumbnail template={template} />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{template.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{template.category}</p>
                </div>
                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 px-2.5 py-1 rounded-md border border-gray-200 group-hover:border-gray-900 transition-colors">
                  Use
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
