"use client"

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import ToolResultActions from '@/components/tools/ToolResultActions'
import { GRADES } from '@/components/tools/constants'

type RubricRow = { criteria: string; levels: string[] }
type Result = { rawText: string; rows: RubricRow[]; levelNames: string[] }

function parseRubric(text: string, expectedLevels: number): { rows: RubricRow[]; levelNames: string[] } {
  const lines = text.replace(/\r/g, '').split('\n').map((l) => l.trim()).filter(Boolean)
  const rows: RubricRow[] = []
  let current: RubricRow | null = null

  const defaultNames = Array.from({ length: expectedLevels }, (_, i) => {
    if (expectedLevels === 3) return ['Beginning', 'Developing', 'Proficient'][i]
    if (expectedLevels === 5) return ['Beginning', 'Developing', 'Proficient', 'Advanced', 'Exemplary'][i]
    return ['Beginning', 'Developing', 'Proficient', 'Advanced'][i]
  })
  const levelNames: string[] = [...defaultNames]

  for (const line of lines) {
    if (/^rubric:/i.test(line)) continue

    const criteriaMatch = line.match(/^Criteria\s*\d*\s*:\s*(.+)$/i)
    if (criteriaMatch) {
      if (current && current.criteria) rows.push(current)
      current = { criteria: criteriaMatch[1].trim(), levels: [] }
      continue
    }

    const levelMatch = line.match(/^Level\s*(\d+)\s*(?:\(([^)]+)\))?\s*:\s*(.+)$/i)
    if (levelMatch && current) {
      const idx = parseInt(levelMatch[1], 10) - 1
      if (levelMatch[2]) levelNames[idx] = levelMatch[2].trim()
      current.levels.push(levelMatch[3].trim())
      continue
    }

    if (current && !criteriaMatch) {
      const simpleLevel = line.match(/^(Excellent|Proficient|Advanced|Good|Developing|Basic|Beginning|Needs Improvement|Exemplary|Satisfactory|Unsatisfactory|Poor|Fair|Outstanding)\s*:\s*(.+)$/i)
      if (simpleLevel) {
        const idx = current.levels.length
        if (idx < expectedLevels) levelNames[idx] = simpleLevel[1].trim()
        current.levels.push(simpleLevel[2].trim())
      }
    }
  }

  if (current && current.criteria) rows.push(current)
  return { rows, levelNames: levelNames.slice(0, expectedLevels) }
}

const LEVEL_COLORS = [
  { bg: 'bg-red-50', border: 'border-red-100', header: 'bg-red-100 text-red-800' },
  { bg: 'bg-amber-50', border: 'border-amber-100', header: 'bg-amber-100 text-amber-800' },
  { bg: 'bg-sky-50', border: 'border-sky-100', header: 'bg-sky-100 text-sky-800' },
  { bg: 'bg-emerald-50', border: 'border-emerald-100', header: 'bg-emerald-100 text-emerald-800' },
  { bg: 'bg-violet-50', border: 'border-violet-100', header: 'bg-violet-100 text-violet-800' },
]

const LEVEL_PDF_COLORS = [
  { bg: '#fef2f2', header: '#fecaca', text: '#991b1b' },
  { bg: '#fffbeb', header: '#fde68a', text: '#92400e' },
  { bg: '#f0f9ff', header: '#bae6fd', text: '#075985' },
  { bg: '#ecfdf5', header: '#a7f3d0', text: '#065f46' },
  { bg: '#f5f3ff', header: '#ddd6fe', text: '#5b21b6' },
]

function buildRubricPdfHtml(rows: RubricRow[], levelNames: string[]): string {
  if (rows.length === 0) return ''

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const headerCells = levelNames
    .map((name, i) => {
      const c = LEVEL_PDF_COLORS[i % LEVEL_PDF_COLORS.length]
      return `<th style="text-align:center;padding:8px 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;background:${c.header};color:${c.text};border:1px solid #e5e7eb">${esc(name)}</th>`
    })
    .join('')

  const bodyRows = rows
    .map((row, ri) => {
      const rowBg = ri % 2 === 0 ? '#ffffff' : '#f9fafb'
      const cells = levelNames
        .map((_, li) => {
          const c = LEVEL_PDF_COLORS[li % LEVEL_PDF_COLORS.length]
          return `<td style="padding:8px 10px;font-size:12px;color:#374151;line-height:1.5;border:1px solid #e5e7eb;background:${c.bg};vertical-align:top">${esc(row.levels[li] || '—')}</td>`
        })
        .join('')
      return `<tr style="background:${rowBg}"><td style="padding:8px 10px;font-size:12px;font-weight:600;color:#111827;border:1px solid #e5e7eb;vertical-align:top">${esc(row.criteria)}</td>${cells}</tr>`
    })
    .join('')

  return `<table style="width:100%;border-collapse:collapse;margin-top:8px">
<thead><tr><th style="text-align:left;padding:8px 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;background:#f3f4f6;color:#111827;border:1px solid #e5e7eb;width:150px">Criteria</th>${headerCells}</tr></thead>
<tbody>${bodyRows}</tbody>
</table>`
}

export default function RubricGenerator() {
  const [assignment, setAssignment] = useState('')
  const [grade, setGrade] = useState('Class 5')
  const [criteriaCount, setCriteriaCount] = useState(4)
  const [levelsCount, setLevelsCount] = useState(4)
  const [isLoading, setIsLoading] = useState(false)
  const [assignmentError, setAssignmentError] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const generate = async (forceRegenerate = false) => {
    const trimmedAssignment = assignment.trim()
    if (trimmedAssignment.length < 3) {
      setAssignmentError('Please enter an assignment with at least 3 characters.')
      return
    }

    setAssignmentError('')
    setError('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-rubric', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment: trimmedAssignment, grade, criteriaCount, levelsCount, forceRegenerate }),
      })

      const data = (await response.json()) as { text?: string; error?: string }
      if (!response.ok || !data.text) throw new Error(data.error || 'Failed to generate rubric.')

      const { rows, levelNames } = parseRubric(data.text, levelsCount)
      setResult({ rawText: data.text, rows, levelNames })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await generate(false)
  }

  const handleReset = () => {
    setAssignment('')
    setGrade('Class 5')
    setCriteriaCount(4)
    setLevelsCount(4)
    setResult(null)
    setAssignmentError('')
    setError('')
  }

  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="container-narrow">
        <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="assignment" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Assignment
              </label>
              <input
                id="assignment"
                type="text"
                value={assignment}
                onChange={(e) => {
                  const nextAssignment = e.target.value
                  setAssignment(nextAssignment)
                  if (nextAssignment.trim().length >= 3) setAssignmentError('')
                }}
                placeholder="e.g. Write an essay on climate change"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
              />
              {assignmentError && <p className="mt-2 text-sm font-medium text-red-600">{assignmentError}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="grade" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Grade
                </label>
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                >
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="criteriaCount" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Criteria
                </label>
                <input
                  id="criteriaCount"
                  type="number"
                  min={2}
                  max={10}
                  value={criteriaCount}
                  onChange={(e) => setCriteriaCount(Number(e.target.value) || 2)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                />
              </div>

              <div>
                <label htmlFor="levelsCount" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Levels
                </label>
                <input
                  id="levelsCount"
                  type="number"
                  min={3}
                  max={5}
                  value={levelsCount}
                  onChange={(e) => setLevelsCount(Number(e.target.value) || 3)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-md border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md text-xs sm:text-sm font-semibold text-gray-900 bg-markury-yellow shadow-sm hover:opacity-95"
              >
                {isLoading ? 'Generating...' : 'Generate Rubric'}
              </button>
            </div>
          </form>

          {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

          {result && (
            <div className="rounded-2xl border border-markury-yellow/30 bg-gradient-to-r from-markury-yellow/20 via-markury-cyan/10 to-markury-purple/10 p-4 sm:p-5 shadow-sm mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-markury-yellow/40 text-base">
                    ✏️
                  </span>
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold text-gray-900">
                      Want to present this rubric visually on screen?
                    </span>{' '}
                    Annotate, highlight, and explain with Markury.
                  </p>
                </div>
                <Link
                  href="/download"
                  className="flex-shrink-0 inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Try Markury →
                </Link>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 space-y-6">
              <ToolResultActions
                rawText={result.rawText}
                title="Rubric"
                isLoading={isLoading}
                onRegenerate={() => generate(true)}
                pdfHtml={buildRubricPdfHtml(result.rows, result.levelNames)}
              />

              {result.rows.length > 0 ? (
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full border-collapse text-sm min-w-[600px]">
                    <thead>
                      <tr>
                        <th className="text-left px-3 py-2.5 bg-gray-100 text-gray-900 font-bold text-xs uppercase tracking-wider border border-gray-200 rounded-tl-lg w-[160px]">
                          Criteria
                        </th>
                        {result.levelNames.map((name, i) => (
                          <th
                            key={i}
                            className={`text-center px-3 py-2.5 font-bold text-xs uppercase tracking-wider border border-gray-200 ${LEVEL_COLORS[i % LEVEL_COLORS.length].header}`}
                          >
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="px-3 py-3 border border-gray-200 font-semibold text-gray-900 align-top">
                            {row.criteria}
                          </td>
                          {result.levelNames.map((_, li) => (
                            <td
                              key={li}
                              className={`px-3 py-3 border border-gray-200 text-gray-700 align-top text-[13px] leading-relaxed ${LEVEL_COLORS[li % LEVEL_COLORS.length].bg}`}
                            >
                              {row.levels[li] || '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm sm:text-base text-gray-800 leading-relaxed">
                  {result.rawText}
                </div>
              )}

              <p className="text-xs text-gray-500 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span>Generated with Markury</span>
                <Link href="https://www.markury.app" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                  www.markury.app
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
