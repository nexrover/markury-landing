"use client"

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import ToolResultActions from '@/components/tools/ToolResultActions'
import QuizDeck from '@/components/tools/QuizDeck'
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

    if (current.question && current.options.length > 0) {
      if (current.answer) pushCurrent()
      else current = { question: line, options: [], answer: '' }
    } else {
      current.question = line
    }
  }

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

  const [isSharing, setIsSharing] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [shareCopied, setShareCopied] = useState(false)

  const generate = async (forceRegenerate = false) => {
    const trimmedTopic = topic.trim()
    if (trimmedTopic.length < 3) {
      setTopicError('Please enter a topic with at least 3 characters.')
      return
    }

    setTopicError('')
    setError('')
    setIsLoading(true)
    setShareUrl('')
    setShareCopied(false)
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
    setShareUrl('')
    setShareCopied(false)
  }

  const handleShare = async () => {
    if (!result || result.mcqs.length === 0) return
    setIsSharing(true)
    try {
      const res = await fetch('/api/share-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), grade, mcqs: result.mcqs }),
      })
      const data = (await res.json()) as { id?: string; error?: string }
      if (!res.ok || !data.id) throw new Error(data.error || 'Failed to share quiz.')
      setShareUrl(`${window.location.origin}/shared/quiz/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not share quiz.')
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopyShareLink = async () => {
    if (!shareUrl) return
    await navigator.clipboard.writeText(shareUrl)
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 2000)
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <ToolResultActions
                  rawText={result.rawText}
                  title="Generated Quiz"
                  isLoading={isLoading}
                  onRegenerate={() => generate(true)}
                />
                <div className="flex items-center gap-2">
                  {shareUrl ? (
                    <button
                      type="button"
                      onClick={handleCopyShareLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {shareCopied ? 'Copied!' : 'Copy Link'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleShare}
                      disabled={isSharing}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      {isSharing ? 'Sharing...' : 'Share Quiz'}
                    </button>
                  )}
                </div>
              </div>

              {shareUrl && (
                <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-green-800 mb-0.5">Shareable link created!</p>
                    <p className="text-xs text-green-700 truncate">{shareUrl}</p>
                  </div>
                </div>
              )}

              <QuizDeck mcqs={result.mcqs} />

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
