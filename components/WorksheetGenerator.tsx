"use client"

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import ToolResultActions from '@/components/tools/ToolResultActions'

type McqItem = {
  question: string
  options: string[]
  answer: string
}

type ShortQuestionItem = {
  question: string
  answer: string
}

type WorksheetData = {
  mcqs: McqItem[]
  shortQuestions: ShortQuestionItem[]
  rawText: string
}

const GRADES = Array.from({ length: 8 }, (_, index) => `Class ${index + 5}`)

function parseWorksheetText(input: string): WorksheetData {
  const text = input.replace(/\r/g, '').trim()
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)

  let mode: 'mcq' | 'short' | null = null
  const mcqs: McqItem[] = []
  const shortQuestions: ShortQuestionItem[] = []

  let currentMcq: McqItem | null = null
  let currentShort: ShortQuestionItem | null = null

  for (const line of lines) {
    const lowerLine = line.toLowerCase()

    if (lowerLine.startsWith('mcqs')) {
      mode = 'mcq'
      continue
    }

    if (lowerLine.startsWith('short questions') || lowerLine.startsWith('short')) {
      if (currentMcq) {
        mcqs.push(currentMcq)
        currentMcq = null
      }
      mode = 'short'
      continue
    }

    if (mode === 'mcq') {
      const optionMatch = line.match(/^[A-D][\.\)]\s*(.+)$/i)
      const answerMatch = line.match(/^Answer:\s*(.+)$/i)

      if (optionMatch) {
        if (!currentMcq) {
          currentMcq = { question: 'Question', options: [], answer: '' }
        }
        currentMcq.options.push(optionMatch[1].trim())
        continue
      }

      if (answerMatch) {
        if (!currentMcq) {
          currentMcq = { question: 'Question', options: [], answer: '' }
        }
        currentMcq.answer = answerMatch[1].trim()
        mcqs.push(currentMcq)
        currentMcq = null
        continue
      }

      if (currentMcq && (currentMcq.options.length > 0 || currentMcq.answer)) {
        mcqs.push(currentMcq)
      }
      currentMcq = { question: line, options: [], answer: '' }
      continue
    }

    if (mode === 'short') {
      const answerMatch = line.match(/^Answer:\s*(.+)$/i)
      if (answerMatch) {
        if (!currentShort) {
          currentShort = { question: 'Question', answer: '' }
        }
        currentShort.answer = answerMatch[1].trim()
        shortQuestions.push(currentShort)
        currentShort = null
        continue
      }

      if (currentShort) {
        shortQuestions.push(currentShort)
      }
      currentShort = { question: line, answer: '' }
    }
  }

  if (currentMcq) {
    mcqs.push(currentMcq)
  }
  if (currentShort) {
    shortQuestions.push(currentShort)
  }

  return {
    mcqs: mcqs.filter((item) => item.question),
    shortQuestions: shortQuestions.filter((item) => item.question),
    rawText: text,
  }
}

export default function WorksheetGenerator() {
  const [topic, setTopic] = useState('')
  const [grade, setGrade] = useState('Class 5')
  const [mcqCount, setMcqCount] = useState(5)
  const [shortCount, setShortCount] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [topicError, setTopicError] = useState('')
  const [error, setError] = useState('')
  const [worksheet, setWorksheet] = useState<WorksheetData | null>(null)

  const callGenerator = async (forceRegenerate = false) => {
    const trimmedTopic = topic.trim()
    if (trimmedTopic.length < 3) {
      setTopicError('Please enter a topic with at least 3 characters.')
      return
    }

    setTopicError('')
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-worksheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: trimmedTopic,
          grade,
          mcqCount,
          shortCount,
          forceRegenerate,
        }),
      })

      const data = (await response.json()) as { text?: string; error?: string }
      if (!response.ok || !data.text) {
        throw new Error(data.error || 'Failed to generate worksheet.')
      }

      setWorksheet(parseWorksheetText(data.text))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await callGenerator(false)
  }

  const handleReset = () => {
    setTopic('')
    setGrade('Class 5')
    setMcqCount(5)
    setShortCount(3)
    setWorksheet(null)
    setTopicError('')
    setError('')
  }

  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="container-narrow">
        <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Topic
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(event) => {
                  const nextTopic = event.target.value
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
                  onChange={(event) => setGrade(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                >
                  {GRADES.map((gradeValue) => (
                    <option key={gradeValue} value={gradeValue}>
                      {gradeValue}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mcqCount" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  MCQ count
                </label>
                <input
                  id="mcqCount"
                  type="number"
                  min={1}
                  max={20}
                  value={mcqCount}
                  onChange={(event) => setMcqCount(Number(event.target.value) || 1)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                />
              </div>

              <div>
                <label htmlFor="shortCount" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Short count
                </label>
                <input
                  id="shortCount"
                  type="number"
                  min={1}
                  max={20}
                  value={shortCount}
                  onChange={(event) => setShortCount(Number(event.target.value) || 1)}
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
                {isLoading ? 'Generating...' : 'Generate Worksheet'}
              </button>
            </div>
          </form>

          {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
          {worksheet && (
            <div className="rounded-2xl border border-markury-yellow/30 bg-gradient-to-r from-markury-yellow/20 via-markury-cyan/10 to-markury-purple/10 p-4 sm:p-5 shadow-sm mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-markury-yellow/40 text-base">
                    ✏️
                  </span>
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold text-gray-900">
                      Want to teach this worksheet visually on screen?
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
          {worksheet && (
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 space-y-8">
              <ToolResultActions
                rawText={worksheet.rawText}
                title="Generated Worksheet"
                isLoading={isLoading}
                onRegenerate={() => callGenerator(true)}
              />

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">MCQs</h3>
                <div className="space-y-5">
                  {worksheet.mcqs.length > 0 ? (
                    worksheet.mcqs.map((item, index) => (
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
                        <p className="mt-3 text-sm font-semibold text-green-700">
                          Answer: {item.answer || 'Not specified'}
                        </p>
                      </article>
                    ))
                  ) : (
                    <p className="text-gray-600">No MCQs found in generated content.</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Short Questions</h3>
                <div className="space-y-5">
                  {worksheet.shortQuestions.length > 0 ? (
                    worksheet.shortQuestions.map((item, index) => (
                      <article key={`${item.question}-${index}`} className="border border-gray-100 rounded-xl p-4">
                        <p className="font-medium text-gray-900 mb-2">
                          {index + 1}. {item.question}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-gray-900">Answer:</span>{' '}
                          {item.answer || 'Not specified'}
                        </p>
                      </article>
                    ))
                  ) : (
                    <p className="text-gray-600">No short questions found in generated content.</p>
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
