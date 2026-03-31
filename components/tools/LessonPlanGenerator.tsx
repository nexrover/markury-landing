"use client"

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import ToolResultActions from '@/components/tools/ToolResultActions'
import { GRADES } from '@/components/tools/constants'

type Result = { rawText: string }

export default function LessonPlanGenerator() {
  const [topic, setTopic] = useState('')
  const [grade, setGrade] = useState('Class 5')
  const [durationMinutes, setDurationMinutes] = useState(40)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const canGenerate = useMemo(() => topic.trim().length > 2 && !isLoading, [topic, isLoading])

  const generate = async (forceRegenerate = false) => {
    const trimmedTopic = topic.trim()
    if (trimmedTopic.length < 3) {
      setError('Please enter a topic with at least 3 characters.')
      return
    }

    setError('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: trimmedTopic, grade, durationMinutes, forceRegenerate }),
      })

      const data = (await response.json()) as { text?: string; error?: string }
      if (!response.ok || !data.text) throw new Error(data.error || 'Failed to generate lesson plan.')

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

  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="container-narrow">
        <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">
                Topic
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. The Water Cycle"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="grade" className="block text-sm font-semibold text-gray-700 mb-2">
                  Grade
                </label>
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                >
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="durationMinutes" className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  id="durationMinutes"
                  type="number"
                  min={15}
                  max={120}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value) || 15)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canGenerate}
              className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Lesson Plan'}
            </button>
          </form>

          {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

          {result && (
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 space-y-6">
              <ToolResultActions
                rawText={result.rawText}
                title="Lesson Plan"
                isLoading={isLoading}
                onRegenerate={() => generate(true)}
                cta={
                  <p className="text-sm sm:text-base text-gray-700">
                    Want to explain this lesson visually?{' '}
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

