"use client"

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import ToolResultActions from '@/components/tools/ToolResultActions'
import { GRADES } from '@/components/tools/constants'

type McqItem = {
  question: string
  options: string[]
  answer: string
}

type Result = {
  rawText: string
  mcqs: McqItem[]
}

function parseQuizText(input: string): McqItem[] {
  const text = input.replace(/\r/g, '').trim()
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)

  let inMcqs = false
  let current: McqItem = { question: '', options: [], answer: '' }
  const mcqs: McqItem[] = []

  const pushCurrent = () => {
    const hasBasics = current.question && current.options.length >= 2
    if (hasBasics && current.answer) {
      mcqs.push(current)
    }
    current = { question: '', options: [], answer: '' }
  }

  for (const line of lines) {
    const lower = line.toLowerCase()
    if (lower.startsWith('mcqs')) {
      inMcqs = true
      continue
    }
    if (!inMcqs) continue

    const optionMatch = line.match(/^[A-D][\.\)]\s*(.+)$/i)
    const answerMatch = line.match(/^Answer:\s*(.+)$/i)

    if (answerMatch) {
      current.answer = answerMatch[1].trim()
      if (current.question) pushCurrent()
      continue
    }

    if (optionMatch) {
      current.options.push(optionMatch[1].trim())
      continue
    }

    // Treat as question line.
    // If we already have a question and some options, start fresh.
    if (current.question && current.options.length > 0) {
      if (current.answer) pushCurrent()
      else current = { question: line, options: [], answer: '' }
    } else {
      current.question = line
    }
  }

  // Handle case where the final MCQ doesn't end with an Answer line (rare but possible).
  if (current.question && current.options.length > 0 && current.answer) {
    mcqs.push(current)
  }

  return mcqs
}

export default function QuizGenerator() {
  const [topic, setTopic] = useState('')
  const [grade, setGrade] = useState('Class 5')
  const [mcqCount, setMcqCount] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [topicError, setTopicError] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const generate = async (forceRegenerate = false) => {
    const trimmedTopic = topic.trim()
    if (trimmedTopic.length < 3) {
      setTopicError('Please enter a topic with at least 3 characters.')
      return
    }

    setTopicError('')
    setError('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: trimmedTopic, grade, mcqCount, forceRegenerate }),
      })

      const data = (await response.json()) as { text?: string; error?: string }
      if (!response.ok || !data.text) throw new Error(data.error || 'Failed to generate quiz.')

      setResult({ rawText: data.text, mcqs: parseQuizText(data.text) })
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
    setTopic('')
    setGrade('Class 5')
    setMcqCount(5)
    setResult(null)
    setTopicError('')
    setError('')
  }

  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="container-narrow">
        <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Topic
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => {
                  const nextTopic = e.target.value
                  setTopic(nextTopic)
                  if (nextTopic.trim().length >= 3) {
                    setTopicError('')
                  }
                }}
                placeholder="e.g. Photosynthesis"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
              />
              {topicError && <p className="mt-2 text-sm font-medium text-red-600">{topicError}</p>}
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

              <div className="sm:col-span-2">
                <label htmlFor="mcqCount" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Number of questions
                </label>
                <input
                  id="mcqCount"
                  type="number"
                  min={1}
                  max={20}
                  value={mcqCount}
                  onChange={(e) => setMcqCount(Number(e.target.value) || 1)}
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
                {isLoading ? 'Generating...' : 'Generate Quiz'}
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
                      Want to teach this quiz visually on screen?
                    </span>{' '}
                    Annotate, highlight, and explain with Markury.
                  </p>
                </div>
                <Link
                  href="/download"
                  className="flex-shrink-0 inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Try Markury
                </Link>
              </div>
            </div>
          )}
          {result && (
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 space-y-6">
              <ToolResultActions
                rawText={result.rawText}
                title="Generated Quiz"
                isLoading={isLoading}
                onRegenerate={() => generate(true)}
              />

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">MCQs</h3>
                <div className="space-y-5">
                  {result.mcqs.length > 0 ? (
                    result.mcqs.map((item, index) => (
                      <article key={`${item.question}-${index}`} className="border border-gray-100 rounded-xl p-4">
                        <p className="font-medium text-gray-900 mb-3">
                          {index + 1}. {item.question}
                        </p>
                        <ul className="space-y-1 text-gray-700">
                          {item.options.map((option, optionIndex) => (
                            <li key={`${option}-${optionIndex}`}>
                              {String.fromCharCode(65 + optionIndex)}. {option}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-sm font-semibold text-green-700">Answer: {item.answer}</p>
                      </article>
                    ))
                  ) : (
                    <p className="text-gray-600">No MCQs found in generated content.</p>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-500 pt-2 border-t border-gray-100 flex items-center gap-2 justify-between">
                <span>
                  Generated with Markury
                </span>
                <span>
                  <Link
                    href="https://www.markury.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.markury.app
                  </Link>
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

