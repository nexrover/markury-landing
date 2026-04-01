"use client"

import { useState } from 'react'

function textToFormattedHtml(raw: string): string {
  const lines = raw.replace(/\r/g, '').split('\n')
  const parts: string[] = []

  for (const line of lines) {
    const t = line.trim()
    if (!t) {
      parts.push('<div style="height:8px"></div>')
      continue
    }

    const isSectionHeading =
      /^(Section\s+[A-Z0-9]+|SECTION\s+[A-Z0-9]+)/i.test(t) ||
      /^(Part\s+[A-Z0-9]+|PART\s+[A-Z0-9]+)/i.test(t)

    const isMajorHeading =
      /^#{1,3}\s/.test(t) ||
      /^(Exam Paper|Lesson Plan|Rubric|Objective|Objectives|Learning Objectives|Materials|Duration|Introduction|Warm[- ]?Up|Main Activity|Activities|Activity|Practice|Assessment|Closure|Wrap[- ]?Up|Homework|Extensions?|Differentiation|Reflection|Summary|Conclusion|Answer Key|Answers|Instructions|Time|Notes?|Resources|Standards|Prerequisites|Vocabulary|Key ?(Concepts|Terms|Points|Vocabulary)|Teaching Strategy|Procedure|Evaluation|General Instructions|Total Marks|Subject|Grade|Time Allowed|Criteria|Level)(\s*:|\s*$)/i.test(t)

    const isAnswer = /^(Answer|Ans|Correct Answer)\s*:/i.test(t)
    const isMarks = /^(Marks?)\s*:/i.test(t)
    const isQuestion = /^(Q\d+|Question\s+\d+|\d+[\.\)]\s)/i.test(t)
    const isBullet = /^[-•]\s/.test(t)
    const isOption = /^[A-D][\.\)]\s/.test(t)

    const escaped = t
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^#+\s*/, '')

    if (isSectionHeading) {
      parts.push(`<h2 style="font-size:16px;font-weight:700;margin:20px 0 8px;padding-bottom:6px;border-bottom:2px solid #e5e7eb;color:#111827">${escaped}</h2>`)
    } else if (isMajorHeading) {
      parts.push(`<h3 style="font-size:14px;font-weight:700;margin:16px 0 6px;color:#111827">${escaped}</h3>`)
    } else if (isAnswer) {
      parts.push(`<p style="font-size:13px;font-weight:600;color:#15803d;margin:4px 0 2px 20px">${escaped}</p>`)
    } else if (isMarks) {
      parts.push(`<p style="font-size:11px;color:#6b7280;margin:2px 0 2px 20px">${escaped}</p>`)
    } else if (isQuestion) {
      parts.push(`<p style="font-size:14px;font-weight:500;margin:12px 0 2px;color:#111827">${escaped}</p>`)
    } else if (isOption) {
      parts.push(`<p style="font-size:13px;color:#374151;margin:2px 0 2px 28px">${escaped}</p>`)
    } else if (isBullet) {
      const content = escaped.replace(/^[-•]\s*/, '')
      parts.push(`<li style="font-size:13px;color:#374151;margin:3px 0 3px 24px">${content}</li>`)
    } else {
      parts.push(`<p style="font-size:13px;color:#374151;margin:4px 0;line-height:1.6">${escaped}</p>`)
    }
  }

  return parts.join('\n')
}

export default function ToolResultActions({
  rawText,
  title,
  onRegenerate,
  isLoading,
  pdfHtml,
}: {
  rawText: string
  title: string
  onRegenerate: () => void
  isLoading: boolean
  pdfHtml?: string
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

    const formattedBody = pdfHtml || textToFormattedHtml(rawText)

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>${title} - Markury</title>
  <style>
    @page { margin: 18mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 0; color: #111827; line-height: 1.55; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    h1 { font-size: 22px; font-weight: 700; margin-bottom: 4px; color: #111827; }
    .subtitle { font-size: 12px; color: #6b7280; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #e5e7eb; }
    .content { padding: 0; }
    .footer { margin-top: 28px; padding-top: 10px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; display: flex; justify-content: space-between; }
    .footer a { color: #9ca3af; text-decoration: none; }
    li { list-style: disc inside; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div class="subtitle">Generated with Markury &middot; www.markury.app</div>
  <div class="content">${formattedBody}</div>
  <div class="footer">
    <span>Generated with Markury</span>
    <a href="https://www.markury.app">www.markury.app</a>
  </div>
</body>
</html>`)
    printWindow.document.close()
    printWindow.focus()
    window.setTimeout(() => printWindow.print(), 300)
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
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
    </div>
  )
}
