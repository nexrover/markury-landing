"use client"

import { useState } from 'react'

export default function ToolResultActions({
  rawText,
  title,
  onRegenerate,
  isLoading,
}: {
  rawText: string
  title: string
  onRegenerate: () => void
  isLoading: boolean
}) {
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState('')

  const handleCopy = async () => {
    setError('')
    try {
      await navigator.clipboard.writeText(rawText)
      setIsCopied(true)
      window.setTimeout(() => setIsCopied(false), 1500)
    } catch {
      setError('Copy failed. Please try again.')
    }
  }

  const handleDownloadPdf = () => {
    setError('')
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      setError('Popup blocked. Please allow popups to download PDF.')
      return
    }

    const escapedText = rawText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>')

    printWindow.document.write(`
      <html>
        <head>
          <title>${title} - Markury</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #111827; line-height: 1.55; }
            h1 { font-size: 20px; margin-bottom: 18px; }
            .watermark { margin-top: 24px; font-size: 12px; color: #6B7280; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div>${escapedText}</div>
          <div class="watermark"><span>Generated with Markury</span><span><a href="https://www.markury.app" target="_blank" rel="noopener noreferrer">www.markury.app</a></span></div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }

  return (
    
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 justify-end">
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50"
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50"
        >
          Download as PDF
        </button>
        {/* <button
          type="button"
          onClick={onRegenerate}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-60"
        >
          Regenerate
        </button> */}
      </div>

      

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
    </div>
  )
}

