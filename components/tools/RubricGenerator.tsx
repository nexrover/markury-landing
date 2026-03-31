"use client"

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import ToolResultActions from '@/components/tools/ToolResultActions'
import { GRADES } from '@/components/tools/constants'

type Result = { rawText: string }

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

      setResult({ rawText: data.text })
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
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 space-y-6">
              <ToolResultActions
                rawText={result.rawText}
                title="Rubric"
                isLoading={isLoading}
                onRegenerate={() => generate(true)}
                cta={
                  <p className="text-sm sm:text-base text-gray-700">
                    Want to present and explain this rubric live?{' '}
                    <Link
                      href="/download"
                      className="font-semibold text-gray-900 underline underline-offset-4 hover:opacity-90"
                    >
                      → Use Markury
                    </Link>
                  </p>
                }
              />

              <div className="whitespace-pre-wrap text-sm sm:text-base text-gray-800 leading-relaxed">
                {result.rawText}
              </div>

              <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">Generated with Markury</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

